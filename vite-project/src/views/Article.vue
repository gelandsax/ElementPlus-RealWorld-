<template>
<div class="article-page">
  <div class="banner">
    <div class="container">
      <h1>{{ article_info.article.title }}</h1>

      <div class="article-meta">
        <a href="/profile/eric-simons"><img :src="article_info.article.author.image" /></a>
        <div class="info">
          <a :href="`/profile/${article_info.article.author.username}`">{{ article_info.article.author.username }}</a>
          <span class="date">{{ article_info.article.updatedAt }}</span>
        </div>
        <span v-if="article_info.article.author.username != userinfo?.username">
        <button v-if="article_info.article.author.following === false"  class="btn btn-sm btn-outline-secondary" @click="Follow()">
          <i class="ion-plus-round"></i>
          <span>Follow {{article_info.article.author.username}}</span>  
        </button>

        <button v-else class="btn btn-sm btn-outline-secondary" @click="unFollow()">
          <i class="ion-plus-round"></i>
          
          <span>unFollow {{article_info.article.author.username}}</span>  
        </button>
        </span>
        &nbsp;&nbsp;
        <button v-if="article_info.article.author.username != userinfo?.username" class="btn btn-sm btn-outline-primary">
          <i class="ion-heart"></i>
          &nbsp; Favorite Post <span class="counter">{{ article_info.article.favoritesCount }}</span>
        </button>
        <RouterLink :to="{name:'editor',params:{slug:article_info.article.slug}}" v-if="article_info.article.author.username == userinfo?.username" class="btn btn-sm btn-outline-secondary">
          <i class="ion-edit"></i> Edit Article
        </RouterLink>
        <button v-if="article_info.article.author.username == userinfo?.username" class="btn btn-sm btn-outline-danger" @click="delArticle()">
          <i class="ion-trash-a"></i> Delete Article
        </button>
      </div>
    </div>
  </div>

  <div class="container page">
    <div class="row article-content">
      <div class="col-md-12">
        <p>
          {{ article_info.article.description }}
        </p>
       
        <ul class="tag-list">
          <li class="tag-default tag-pill tag-outline" v-for="(tag,index) in article_info.article.tagList" :key="index">{{ tag }}</li>
          
        </ul>
      </div>
    </div>

    <hr />

    

    <div class="row">
      <div class="col-xs-12 col-md-8 offset-md-2">
        <CommentForm :slug="article_info.article.slug" @create_comment = "addComment">

        </CommentForm>

        <CommentItem v-for="(item,index) in sorted_comments" :comment="item" :slug="article_info.article.slug" @del_comment = "delComment" :key="index">
        </CommentItem>
      </div>
    </div>
  </div>
</div>
</template>
<script setup lang="ts">
import axios from '../utils/request'
import { computed, onMounted, ref, watch } from 'vue';
import { RouterLink, useRoute } from 'vue-router';
import type {  CommentRsp, CommentRspBody, FollowResult, MultiComments, SingleArticleInfo } from '../models';

import { useUserStore } from '../store/user';
import { storeToRefs } from 'pinia';

import CommentItem from '../components/CommentItem.vue';
import CommentForm from '../components/CommentForm.vue';
import router from '../router';
const store = useUserStore();
const {userinfo} = storeToRefs(store)
let route = useRoute();

let article_info=ref<SingleArticleInfo>({
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
let follow_result = ref<FollowResult>({
  profile: {
    username: '',
    bio: '',
    image: '',
    following: false
  }
});
let all_comments = ref<MultiComments>({
  comments: []
})

let sorted_comments = computed(() => {
  return all_comments.value.comments.slice().sort((a,b) => {
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  })
})
function Follow(){
  axios.post(`/profiles/${article_info.value.article.author.username}/follow`).then(res => {
    follow_result.value = res.data;
    article_info.value.article.author.following = follow_result.value.profile.following;
  })
}

function unFollow(){
  axios.delete(`/profiles/${article_info.value.article.author.username}/follow`).then(res => {
    follow_result.value = res.data;
    article_info.value.article.author.following = follow_result.value.profile.following;
  })
}

function addComment(comment: CommentRsp){
 all_comments.value.comments.push(comment);
}
function delComment(comment_id: number){
  all_comments.value.comments = all_comments.value.comments.filter(comment => comment.id !== comment_id);
}

function delArticle(){
   axios.delete(`/articles/${article_info.value.article.slug}`).then(() => {
      router.push({name:'home'});
    }
   )
   
}
watch(
  () => route.params.slug,
  (new_slug) => {
    axios.get(`/articles/${new_slug}`).then(res => {
        article_info.value = res.data;
    })
  }
)

onMounted(() => {
  axios.get(`/articles/${route.params.slug}`).then(res => {
    article_info.value = res.data;

    axios.get(`/articles/${article_info.value.article.slug}/comments`).then(res => {
    all_comments.value = res.data;
  });
  });
})
</script>
<style scoped>
</style>
