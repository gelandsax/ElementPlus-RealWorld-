<template>
  <div class="auth-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Sign in</h1>
          <p class="text-xs-center">
            <RouterLink to="/register">Need an account?</RouterLink>
            
          </p>

          <ul class="error-messages">
            <li>That email is already taken</li>
          </ul>

          <form>
            <fieldset class="form-group">
              <input
                class="form-control form-control-lg"
                type="text"
                placeholder="Email"
                v-model="login_req.user.email"
              />
            </fieldset>
            <fieldset class="form-group">
              <input
                class="form-control form-control-lg"
                type="password"
                placeholder="Password"
                v-model="login_req.user.password"
              />
            </fieldset>
            <button class="btn btn-lg btn-primary pull-xs-right" @click.prevent="Login()">
              Sign in
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
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

</style>


