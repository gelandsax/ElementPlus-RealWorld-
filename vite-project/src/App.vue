<template>
  <div>
    <AuthHeader v-if = "userinfo"></AuthHeader>
    <Header v-else></Header>
    <RouterView></RouterView>
    <Footer></Footer>
  </div>
</template>

<script setup lang="ts">
import Footer from './components/Footer.vue'
import Header from './components/Header.vue'
import AuthHeader from './components/AuthHeader.vue'
import { useUserStore } from './store/user'
import { storeToRefs } from 'pinia'
let store = useUserStore();
const { userinfo } = storeToRefs(store)
</script>

<style scoped>

</style>
