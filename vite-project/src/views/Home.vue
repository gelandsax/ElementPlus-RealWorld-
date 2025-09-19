<template>
  <div class="home-page">
    <div class="banner">
      <div class="container">
        
        <h1 class="logo-font">conduit</h1>
        <p>A place to share your knowledge.</p>
      </div>
    </div>

    <div class="container page">
      <div class="row">
        <div class="col-md-9">
          <div class="feed-toggle">
            <ul class="nav nav-pills outline-active">
              <li class="nav-item" @click="OnFeedClick()">
                <a class="nav-link" :class="{active:isFeedActive}" href="">Your Feed</a>
              </li>
              <li class="nav-item" @click="OnGlobalClick()">
                <a class="nav-link " :class="{active:isGlobalActive}" href="">Global Feed</a>
              </li>
            </ul>
          </div>

          <div
            class="article-preview"
            v-for="(item, index) in article_info.articles"
            :key="index"
          >
            <div class="article-meta">
              <a href="/profile/eric-simons"
                ><img :src="item.author.image"
              /></a>
              <div class="info">
                <a href="/profile/eric-simons" class="author">{{
                  item.author.username
                }}</a>
                <span class="date">{{ item.updatedAt }}</span>
              </div>
              <button class="btn btn-outline-primary btn-sm pull-xs-right">
                <i class="ion-heart"></i> {{ item.favoritesCount }}
              </button>
            </div>
            <RouterLink
              :to="{name:'article',params:{slug:item.slug}}"
              class="preview-link"
            >
              <h1>{{ item.title }}</h1>
              <p>{{ item.description }}</p>
              <span>Read more...</span>
              <ul class="tag-list">
                <li
                  class="tag-default tag-pill tag-outline"
                  v-for="(tag, index_in) in item.tagList"
                  :key="index_in"
                >
                  {{ tag }}
                </li>
              </ul>
            </RouterLink>
          </div>

          <ul class="pagination">
            <li class="page-item active">
              <a class="page-link" href="">1</a>
            </li>
            <li class="page-item">
              <a class="page-link" href="">2</a>
            </li>
          </ul>
        </div>

        <div class="col-md-3">
          <div class="sidebar">
            <p>Popular Tags</p>

            <div class="tag-list">
              <a
                href=""
                class="tag-pill tag-default"
                v-for="(item, index) in tag_info.tags"
                :key="index"
                >{{ item }}</a
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";

import axios from "../utils/request";

import type { Tags, MultiArticles } from "../models";

import { useUserStore } from "../store/user";
import { storeToRefs } from "pinia";
let store = useUserStore();
const { userinfo } = storeToRefs(store);

let tag_info = ref<Tags>({
  tags: [],
});
let article_info = ref<MultiArticles>({
  articles: [],
  articlesCount: 0,
});

let isFeedActive = ref<boolean>(false);
let isGlobalActive = ref<boolean>(true);

function OnFeedClick(){
  isFeedActive.value = true;
  isGlobalActive.value = false;

  axios.get('/articles/feed').then(res => {
    article_info.value = res.data;
  })
}

function OnGlobalClick(){
  isFeedActive.value = false;
  isGlobalActive.value = true;

  axios.get('/articles').then(res => {
    article_info.value = res.data;
  })
}

onMounted(() => {
  axios.get("/tags").then((res) => {
    tag_info.value = res.data;
  })

  axios.get("/articles").then((res) => {
    article_info.value = res.data;
  })

})

</script>

<style scoped></style>
