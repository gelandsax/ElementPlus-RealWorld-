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
        <el-tag class="r-tag" v-for="tag in scope.row.tagList">{{ tag }}</el-tag>
      </template>
    </el-table-column>

  </el-table>

  <el-pagination
      v-model:current-page="pageIndex"
      v-model:page-size="pageSize"
      :page-sizes="[5, 10, 15, 20]"
      layout="total, sizes, prev, pager, next, jumper"
      :total="article_info.articlesCount"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue';
import axios from '../utils/request'
import type { MultiArticles, Tags } from '../models';


const pageIndex = ref<number>(1)
const pageSize = ref<number>(10)

interface QueryParam{
  author: string;
  tag_name: string;
}

let query_param = ref<QueryParam>({
  author: '',
  tag_name: ''
})

let tag_info = ref<Tags>({
  tags: []
})

let article_info = ref<MultiArticles>({
  articles: [],
  articlesCount: 0
})

const handleSizeChange = (val: number) => {
  pageSize.value = val;
  getArticles(pageIndex.value, pageSize.value, query_param.value.author,query_param.value.tag_name);
  // console.log(`${val} items per page`)
}

const handleCurrentChange = (val: number) => {
  pageIndex.value = val;
  getArticles(pageIndex.value, pageSize.value, query_param.value.author,query_param.value.tag_name);
  // console.log(`current page: ${val}`)
}

function getArticles(pageIndex: number, pageSize: number, 
author: string, tag_name:string)

{
  let url = `/articles`;

  let limit = pageSize;
  let offset = (pageIndex - 1) * pageSize

  if(tag_name!==''&&author!==''){ 
    url += `?tag=${tag_name}&author=${author}&limit=${limit}&offset=${offset}`
  }
  else if(tag_name!==''){
    url += `?tag=${tag_name}&limit=${limit}&offset=${offset}`
  }
  else if(author!==''){
    url+=`?author=${author}&limit=${limit}&offset=${offset}`
  }
  else{
    url+=`?limit=${limit}&offset=${offset}`
  }

  axios.get(url).then(res => {
    article_info.value = res.data;
  });
}

function doQuery(){
  pageIndex.value = 1; 
  getArticles(pageIndex.value, pageSize.value, query_param.value.author, query_param.value.tag_name);
}

onMounted(() => {
  axios.get('/tags').then(res => {
    tag_info.value = res.data;
  })



//   axios.get('/articles').then(res => {
//     article_info.value = res.data;
//   })
  getArticles(pageIndex.value, pageSize.value, query_param.value.author, query_param.value.tag_name);
})


</script>
<style scoped>
.r-tag{
  margin: 0 6px;
}
.demo-form-inline .el-select {
  --el-select-width: 220px;
}
</style>
