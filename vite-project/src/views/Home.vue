<template>
  <el-table :data="article_info.articles" style="width: 100%">
    <el-table-column prop="slug" label="slug" width="180" />
    <el-table-column prop="title" label="title" width="180" />
    <el-table-column prop="author.username" label="作者" />
  </el-table>
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
