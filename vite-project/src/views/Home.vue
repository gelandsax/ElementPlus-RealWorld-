<template>
  <el-container class="layout-container-demo" style="height: 500px">
    <el-header style="text-align: right; font-size: 12px">
      <span class="logo">RealWorld</span>
      <div class="toolbar">
        <el-dropdown>
          <el-icon style="margin-right: 8px; margin-top: 1px">
            <setting />
          </el-icon>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item>View</el-dropdown-item>
              <el-dropdown-item>Add</el-dropdown-item>
              <el-dropdown-item>Delete</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
        <span>Tom</span>
      </div>
    </el-header>

    <el-container class="bottom">
      <el-aside width="200px">
        <el-scrollbar>
          <el-menu
            router
            background-color="black"
            text-color="orange"
            :default-openeds="['1', '3']"
          >
            <el-sub-menu index="1">
              <template #title>
                <el-icon><message /></el-icon>文章管理
              </template>
              <el-menu-item index="/articles/all_article"
                >全部文章</el-menu-item
              >
              <el-menu-item index="/articles/my_article">我的文章</el-menu-item>
            </el-sub-menu>

            <el-sub-menu index="2">
              <template #title>
                <el-icon><service /></el-icon>商品管理
              </template>
              <el-menu-item index="2-1">全部商品</el-menu-item>
              <el-menu-item index="2-2">我的商品</el-menu-item>
            </el-sub-menu>
            <el-sub-menu index="3">
              <template #title>
                <el-icon> <setting /> </el-icon>个人设置
              </template>
              <el-menu-item index="3-3">个人信息</el-menu-item>
            </el-sub-menu>
          </el-menu>
        </el-scrollbar>
      </el-aside>

      <el-main>
        <RouterView></RouterView>
      </el-main>

    </el-container>
  </el-container>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";

import axios from "../utils/request";

import type { Tags, MultiArticles } from "../models";

import { RouterLink, RouterView } from 'vue-router';
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

function OnFeedClick() {
  isFeedActive.value = true;
  isGlobalActive.value = false;

  axios.get("/articles/feed").then((res) => {
    article_info.value = res.data;
  });
}

function OnGlobalClick() {
  isFeedActive.value = false;
  isGlobalActive.value = true;

  axios.get("/articles").then((res) => {
    article_info.value = res.data;
  });
}

onMounted(() => {
  axios.get("/tags").then((res) => {
    tag_info.value = res.data;
  });

  axios.get("/articles").then((res) => {
    article_info.value = res.data;
  });
});

const item = {
  date: "2016-05-02",
  name: "Tom",
  address: "No. 189, Grove St, Los Angeles",
};
const tableData = ref(Array.from({ length: 5 }).fill(item));
</script>

<style scoped>
.layout-container-demo {
  height: 100vh;
}
.layout-container-demo .el-header {
  position: relative;
  background-color: black;
  color: orange;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.logo {
  font-size: 40px;
}
.layout-container-demo .bottom{
  height: 100vh;
}
.layout-container-demo .el-aside {
  height: 100vh;
  color: white;
  background: black;
}
.layout-container-demo .el-menu {
  height: 100vh;
  border-right: none;
}
.layout-container-demo .el-main {
  padding: 0;
}
.layout-container-demo .toolbar {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  right: 20px;
}
</style>
