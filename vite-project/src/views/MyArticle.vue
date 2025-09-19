<template>
     <el-button type="primary" class="!ml-0" plain @click="dialogFormVisible = true">
      Open a Form nested Dialog
  </el-button>

  <el-dialog v-model="dialogFormVisible" title="Shipping address" width="500">
    <el-form :model="article_info_req">
      <el-form-item label="title" label-width="200px">
        <el-input v-model="article_info_req.article.title" autocomplete="off" />
      </el-form-item>
      <el-form-item label="description" label-width="200px">
        <el-input v-model="article_info_req.article.description" autocomplete="off" />
      </el-form-item>
      <el-form-item label="body" label-width="200px">
        <el-input v-model="article_info_req.article.body" autocomplete="off" />
      </el-form-item>
      <el-form-item label="tagList" label-width="200px">
        <el-input v-model="article_info_req.article.tagList" autocomplete="off" />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogFormVisible = false">Cancel</el-button>
        <el-button type="primary" @click="addArticle()">
          Confirm
        </el-button>
      </div>
    </template>
  </el-dialog>

  <el-table :data="article_info.articles" style="width: 100%">
    <el-table-column prop="slug" label="Slug" width="180" />
    <el-table-column prop="title" label="Title" width="180" />
    <el-table-column prop="author.username" label="Author" />

    <el-table-column label="Tag" width="180">
      <template #default="scope">
        <el-tag class="r-tag" v-for="tag in scope.row.tagList">{{ tag }}</el-tag>
      </template>
    </el-table-column>

    <el-table-column label="Operations">
      <template #default="scope">
        <el-button size="small" @click="handleEdit(scope.row)">
          Edit
        </el-button>
        <el-button
          size="small"
          type="danger"
          @click="handleDelete(scope.row)"
        >
          Delete
        </el-button>
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
import type { Article, CreateArticleReq, MultiArticles, Tags } from '../models';
import { ElMessage, ElMessageBox } from 'element-plus'
import { useUserStore } from '../store/user'
import { storeToRefs } from 'pinia'

let store = useUserStore();
const { userinfo } = storeToRefs(store)

const pageIndex = ref<number>(1)
const pageSize = ref<number>(10)

let dialogFormVisible = ref<boolean>(false);

let article_info_req = ref<CreateArticleReq>({
  article: {
    title: '',
    description: '',
    body: '',
    tagList: []
  }
})

function addArticle(){
  dialogFormVisible.value = false;
  axios.post('/articles', article_info_req.value).then(res => {
      getArticles(pageIndex.value, pageSize.value);
      article_info_req.value.article.title = '';
      article_info_req.value.article.description = '';
      article_info_req.value.article.body = '';
      article_info_req.value.article.tagList = [];
    })
}

function handleDelete(article: Article){
  ElMessageBox.confirm(
    'proxy will permanently delete the file. Continue?',
    'Warning',
    {
      confirmButtonText: 'OK',
      cancelButtonText: 'Cancel',
      type: 'warning',
    }
  )
    .then(() => {
      axios.delete(`/articles/${article.slug}`).then(res=>{
      getArticles(pageIndex.value, pageSize.value);
  })
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: 'Delete canceled',
      })
    })
  
}
function handleEdit(article: Article){

}


let tag_info = ref<Tags>({
  tags: []
})

let article_info = ref<MultiArticles>({
  articles: [],
  articlesCount: 0
})

const handleSizeChange = (val: number) => {
  // pageSize.value = val;
  getArticles(pageIndex.value, val);
  // console.log(`${val} items per page`)
}

const handleCurrentChange = (val: number) => {
  // pageIndex.value = val;
  getArticles(val, pageSize.value);
  // console.log(`current page: ${val}`)
}

function getArticles(pageIndex: number, pageSize: number)
{
  let url = `/articles?author=${userinfo.value?.username}`;

  let limit = pageSize;
  let offset = (pageIndex - 1) * pageSize

 
  url+=`&limit=${limit}&offset=${offset}`


  axios.get(url).then(res => {
    article_info.value = res.data;
  });
}



onMounted(() => {
  axios.get('/tags').then(res => {
    tag_info.value = res.data;
  })


  getArticles(pageIndex.value, pageSize.value);
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
