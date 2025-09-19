import { defineStore } from 'pinia'
import type { UserLoginRsp, UserRegisterRsp } from '../models'
import { ref } from 'vue'

export const useUserStore = defineStore('user', () => {

  const userinfo = ref<UserLoginRsp|UserRegisterRsp|null>(null);

  function setUserInfo(user: UserLoginRsp){
    userinfo.value = user;
  }

  function setUserRegInfo(user: UserRegisterRsp){
    userinfo.value=user;
  }

  function clearUserInfo() {
    userinfo.value = null
  }
  return { userinfo, setUserInfo ,setUserRegInfo,clearUserInfo}
},{
  persist: true,
})