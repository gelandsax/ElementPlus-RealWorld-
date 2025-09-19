<template>
    <div class="settings-page">
  <div class="container page">
    <div class="row">
      <div class="col-md-6 offset-md-3 col-xs-12">
        <h1 class="text-xs-center">Your Settings</h1>

        <ul class="error-messages">
          <li>That name is required</li>
        </ul>

        <form>
          <fieldset>
            <fieldset class="form-group">
              <input class="form-control" type="text" placeholder="URL of profile picture" v-model="updateUser_info.user.image"/>
            </fieldset>
            <fieldset class="form-group">
              <input class="form-control form-control-lg" type="text" placeholder="Your Name" v-model="updateUser_info.user.username"/>
            </fieldset>
            <fieldset class="form-group">
              <textarea
                class="form-control form-control-lg"
                rows="8"
                placeholder="Short bio about you"
                v-model="updateUser_info.user.bio"
              ></textarea>
            </fieldset>
            <fieldset class="form-group">
              <input class="form-control form-control-lg" type="text" placeholder="Email" v-model="updateUser_info.user.email"/>
            </fieldset>
            <fieldset class="form-group">
              <input
                class="form-control form-control-lg"
                type="password"
                placeholder="New Password"
                v-model="updateUser_info.user.password"
              />
            </fieldset>
            <button class="btn btn-lg btn-primary pull-xs-right" @click.prevent="updateUser()">Update Settings</button>
          </fieldset>
        </form>
        <hr />
        <button class="btn btn-outline-danger" @click="logout()">Or click here to logout.</button>
      </div>
    </div>
  </div>
</div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import type { updateUserReq, updateUserRsp } from '../models';
import axios from '../utils/request';
import { useRouter } from 'vue-router';
import { useUserStore } from '../store/user';
const router = useRouter();
const store = useUserStore();

let updateUser_info=ref<updateUserReq>({
  user: {
    email: '',
    bio: '',
    image: '',
    username: '',
    password: ''
  }
})

let updateUser_rsp=ref<updateUserRsp>({
  user: {
    email: null,
    token: null,
    username: null,
    bio: null,
    image: null
  }
})

function updateUser(){
    axios.put('/user', updateUser_info.value).then(res => {
    updateUser_rsp.value = res.data;
    router.push({name:'profile'});
  })
}


function logout() {
  store.clearUserInfo()
  localStorage.removeItem('user')
  router.push({ name: 'login' })
}
</script>
<style scoped>
</style>
