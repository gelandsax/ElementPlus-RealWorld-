<template>
<div class="auth-page">
  <div class="container page">
    <div class="row">
      <div class="col-md-6 offset-md-3 col-xs-12">
        <h1 class="text-xs-center">Sign up</h1>
        <p class="text-xs-center">
          <RouterLink to="/login">Have an account?</RouterLink>
        </p>

        <ul class="error-messages">
          <li>That email is already taken</li>
        </ul>

        <form>
          <fieldset class="form-group">
            <input class="form-control form-control-lg" type="text" placeholder="Username" v-model="register_req.user.username"/>
          </fieldset>
          <fieldset class="form-group">
            <input class="form-control form-control-lg" type="text" placeholder="Email" v-model="register_req.user.email"/>
          </fieldset>
          <fieldset class="form-group">
            <input class="form-control form-control-lg" type="password" placeholder="Password" v-model="register_req.user.password"/>
          </fieldset>
          <button class="btn btn-lg btn-primary pull-xs-right" @click.prevent="Register()">Sign up</button>
        </form>
      </div>
    </div>
  </div>
</div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import type{ RegisterRsp, RegisterReq } from '../models';
import axios from '../utils/request';
import { useUserStore } from '../store/user';
import router from '../router';

let store = useUserStore();
let {setUserRegInfo} = store;


let register_req=ref<RegisterReq>({
  user: {
      username: '',
      email: '',
      password: ''
  }
})

let register_rsp=ref<RegisterRsp>({
  user: {
      email: '',
      token: '',
      username: '',
      bio: ''
  }
})

function Register(){
  axios.post('/users',register_req.value).then(res =>{
    register_rsp.value=res.data;
    setUserRegInfo(register_rsp.value.user);
    router.push({name:'home'});
  })
}
</script>
<style scoped>
</style>
