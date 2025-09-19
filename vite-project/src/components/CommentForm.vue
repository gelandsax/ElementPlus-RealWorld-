<template>
  <form class="card comment-form">
    <div class="card-block">
      <textarea
        v-model="comment_req.comment.body"
        class="form-control"
        placeholder="Write a comment..."
        rows="3"
      ></textarea>
    </div>
    <div class="card-footer">
      <img src="http://i.imgur.com/Qr71crq.jpg" class="comment-author-img" />
      <button @click.prevent="addComment()" class="btn btn-sm btn-primary">
        Post Comment
      </button>
    </div>
  </form>
</template>
<script setup lang="ts">
import { ref } from "vue";
import type { CommentReqBody, CommentRsp, CommentRspBody } from "../models";
import axios from "../utils/request";

const { slug } = defineProps<{
  slug: string;
}>();
const emit = defineEmits<{
  (e: "create_comment", comment: CommentRsp): void;
}>();

let comment_req = ref<CommentReqBody>({
  comment: {
    body: "",
  },
});

let comment_rsp = ref<CommentRspBody>({
  comment: {
    id: 0,
    createdAt: "",
    updatedAt: "",
    body: "",
    author: {
      username: "",
      bio: "",
      image: "",
      following: false,
    },
  },
});


// function addComment(){
//   axios.post(`/articles/${slug}/comments`, comment_req.value).then(res=>{
//     comment_rsp.value = res.data;
//     // console.log(res.data);
//     emit('create_comment', comment_rsp.value.comment)
//     // all_comments.value.comments.push(comment_rsp.value.comment);
//     comment_req.value.comment.body = ''
//   })
// }
function addComment(){
  axios.post(`/articles/${slug}/comments`, comment_req.value, {
    headers: { 'Content-Type': 'application/json' }
  })
  .then(res=>{
    comment_rsp.value = res.data as CommentRspBody;
    emit('create_comment', comment_rsp.value.comment)
    comment_req.value.comment.body = ''
  })
  .catch(err => {
    console.error('Add comment failed:', err);
    alert('Failed to add comment');
  })
}

</script>
<style scoped></style>
