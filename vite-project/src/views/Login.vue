<template>
  <el-form :inline="true" :model="login_req" class="demo-form-inline">
    <el-form-item label="Email">
      <el-input v-model="login_req.user.email" placeholder="请输入邮箱" clearable />
    </el-form-item>
    
    <el-form-item label="Password">
      <el-input v-model="login_req.user.password" type="password" placeholder="请输入密码" clearable />
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click.prevent="Login()">登录</el-button>
    </el-form-item>
  </el-form>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import type{ LoginRsp, LoginReq } from '../models';
import axios from '../utils/request';
import { useUserStore } from '../store/user';
import router from '../router';
import { RouterLink } from 'vue-router';

let store = useUserStore();
let {setUserInfo} = store;

let login_req=ref<LoginReq>({
  user: {
    email: '',
    password: ''
  }
})

let login_rsp=ref<LoginRsp>({
  user: {
    email: '',
    token: '',
    username: '',
    bio: ''
  }
})

function Login(){
  axios.post('/users/login',login_req.value).then(res =>{
    login_rsp.value=res.data;
    setUserInfo(login_rsp.value.user);
    router.push({name:'home'});
  })
}

</script>
<style scoped>
  .demo-form-inline .el-input {
  --el-input-width: 220px;
}

.demo-form-inline .el-select {
  --el-select-width: 220px;
}
</style>


