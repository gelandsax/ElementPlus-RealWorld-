<template>
  <div class="card">
    <div class="card-block">
      <p class="card-text">
        {{ comment.body }}
      </p>
    </div>
    <div class="card-footer">
      <a href="/profile/author" class="comment-author">
        <img :src="comment.author.image" class="comment-author-img" />
      </a>
      &nbsp;
      <a href="/profile/jacob-schmidt" class="comment-author">{{
        comment.author.username
      }}</a>
      <span class="date-posted">{{ comment.updatedAt }}</span>
      <span class="mod-options" @click="delComment()">
        <i class="ion-trash-a"></i>
      </span>
    </div>
  </div>
</template>
<script setup lang="ts">
import type { CommentRsp } from "../models";
import axios from '../utils/request'

const _comment = defineProps<{
  comment: CommentRsp, 
  slug: string
}>()

const emit = defineEmits<{
  (e: 'del_comment', comment_id: number): void
}>()

function delComment(){
  axios.delete(`articles/${_comment.slug}/comments/${_comment.comment.id}`).then( res =>{
    emit('del_comment', _comment.comment.id);
  })


}


</script>
<style scoped></style>
