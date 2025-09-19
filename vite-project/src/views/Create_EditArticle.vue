<template>
<div class="editor-page">
  <div class="container page">
    <div class="row">
      <div class="col-md-10 offset-md-1 col-xs-12">
        <ul class="error-messages">
          <li>That title is required</li>
        </ul>

        <form>
          <fieldset>
            <fieldset class="form-group">
              <input type="text" class="form-control form-control-lg" placeholder="Article Title" v-model="article_info.article.title"/>
            </fieldset>
            <fieldset class="form-group">
              <input type="text" class="form-control" placeholder="What's this article about?" v-model="article_info.article.description"/>
            </fieldset>
            <fieldset class="form-group">
              <textarea
                class="form-control"
                rows="8"
                placeholder="Write your article (in markdown)"
                v-model="article_info.article.body"
              ></textarea>
            </fieldset>
            <fieldset class="form-group">
              <input type="text" class="form-control" placeholder="Enter tags" v-model="current_tag" @keyup.enter="addTag()"/>
              <div class="tag-list">
                <span v-for="(tag,index) in article_info.article.tagList" :key="index" class="tag-default tag-pill" @click="delTag(index)"> <i class="ion-close-round"></i> {{ tag }} </span>
              </div>
            </fieldset>
            <button class="btn btn-lg pull-xs-right btn-primary" type="button" @click.prevent="createArticle()">
              Publish Article
            </button>
          </fieldset>
        </form>
      </div>
    </div>
  </div>
</div>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue';
import type { CreateArticleReq, SingleArticleInfo } from '../models';
import axios from '../utils/request';
import { useRouter, useRoute } from 'vue-router';

const router = useRouter();
const route = useRoute();

let article_info = ref<CreateArticleReq>({
  article: {
    title: '',
    description: '',
    body: '',
    tagList: []
  }
})

let article_rsp=ref<SingleArticleInfo>({
  article: {
    slug: '',
    title: '',
    description: '',
    body:'',
    tagList: [],
    createdAt: '',
    updatedAt: '',
    favorited: false,
    favoritesCount: 0,
    author: {
      username: '',
      bio: '',
      image: '',
      following: false
    }
  }
})

let article_detail_info = ref<SingleArticleInfo>({
  article: {
    slug: '',
    title: '',
    description: '',
    body: '',
    tagList: [],
    createdAt: '',
    updatedAt: '',
    favorited: false,
    favoritesCount: 0,
    author: {
      username: '',
      bio: '',
      image: '',
      following: false
    }
  }
})

function createArticle(){
 if (route.params.slug != undefined) {
    axios.put(`/articles/${route.params.slug}`, article_info.value).then(res => {
      article_rsp.value = res.data;
      router.push({ name: 'article', params: { slug: article_rsp.value.article.slug } });
    })
  }
  else {
    axios.post('/articles', article_info.value).then(res => {
      article_rsp.value = res.data;
      router.push({ name: 'article', params: { slug: article_rsp.value.article.slug } });
    })
  }
}

let current_tag = ref<string>('');
function addTag(){
  let index = article_info.value.article.tagList.findIndex(x => x === current_tag.value);
  if (index < 0) {
    article_info.value.article.tagList.push(current_tag.value);
    current_tag.value = "";
  }
}

function delTag(index:number){
   article_info.value.article.tagList.splice(index, 1);
}
onMounted(() => {
  //编辑文章
  if (route.params.slug != undefined) {
    axios.get(`/articles/${route.params.slug}`).then(res => {
      article_detail_info.value = res.data;
      article_info.value.article.title = article_detail_info.value.article.title;
      article_info.value.article.description = article_detail_info.value.article.description;
      article_info.value.article.body = article_detail_info.value.article.body;
      article_info.value.article.tagList = article_detail_info.value.article.tagList;
    })
  }
})
</script>
<style scoped>
</style>
