<template>
  <div>
    <el-icon size="40" color=red>
      <Service />
    </el-icon>
    <!-- 或者独立使用它，不从父级获取属性 -->
    
  </div>
</template>

<script setup lang="ts">
import Footer from "./components/Footer.vue";
import Header from "./components/Header.vue";
import AuthHeader from "./components/AuthHeader.vue";
import { useUserStore } from "./store/user";
import { storeToRefs } from "pinia";

let store = useUserStore();
const { userinfo } = storeToRefs(store);

import {
  Check,
  Delete,
  Edit,
  Message,
  Search,
  Star,
} from '@element-plus/icons-vue'

</script>


<style scoped>
 
</style>
