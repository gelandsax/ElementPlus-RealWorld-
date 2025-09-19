<template>
  <el-form :inline="true" :model="query_param" class="demo-form-inline">
    <el-form-item label="author">
      <el-input v-model="query_param.author" placeholder="author" clearable />
    </el-form-item>
    <el-form-item label="tag">
      <el-select
        v-model="query_param.tag_name"
        placeholder="choose tag"
        clearable
      >
        <el-option v-for="tag in tag_info.tags" :label="tag" :value="tag" />
      </el-select>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click.prevent="doQuery()">Query</el-button>
    </el-form-item>
  </el-form>

  <el-table :data="article_info.articles" style="width: 100%">
    <el-table-column prop="slug" label="Slug" width="180" />
    <el-table-column prop="title" label="Title" width="180" />
    <el-table-column prop="author.username" label="Author" />

    <el-table-column label="Tag" width="180">
      <template #default="scope">
        <el-tag class="r-tag" v-for="tag in scope.row.tagList">{{
          tag
        }}</el-tag>
      </template>
    </el-table-column>
  </el-table>
</template>
<script setup lang="ts">
import { onMounted, ref } from "vue";
import axios from "../utils/request";
import type { MultiArticles, Tags } from "../models";

interface QueryParam {
  author: string;
  tag_name: string;
}

let query_param = ref<QueryParam>({
  author: "",
  tag_name: "",
});

let tag_info = ref<Tags>({
  tags: [],
});

let article_info = ref<MultiArticles>({
  articles: [],
  articlesCount: 0,
});

function doQuery(){

  // 
  let url = `/articles`;
  if(query_param.value.tag_name!==''&&query_param.value.author!==''){
    url += `?tag=${query_param.value.tag_name}&author=${query_param.value.author}`
  }
  else if(query_param.value.tag_name!==''){
    url += `?tag=${query_param.value.tag_name}`
  }
  else{
    url+=`?author=${query_param.value.author}`
  }

  axios.get(url).then(res => {
    article_info.value = res.data;
  })
}

onMounted(() => {
  axios.get("/tags").then((res) => {
    tag_info.value = res.data;
  });

  axios.get("/articles").then((res) => {
    article_info.value = res.data;
  });
});
</script>
<style scoped>
.r-tag {
  margin: 0 6px;
}
.demo-form-inline .el-select {
  --el-select-width: 220px;
}
</style>
