<template>
  <!-- <AuthHeader v-if = "userinfo"></AuthHeader>
  <CommonHeader v-else></CommonHeader> -->
  <RouterView></RouterView>
  <!-- <Footer></Footer> -->

</template>

<script setup lang="ts">
import Footer from "./components/Footer.vue";
import Header from "./components/Header.vue";
import AuthHeader from "./components/AuthHeader.vue";
import { useUserStore } from "./store/user";
import { storeToRefs } from "pinia";

let store = useUserStore();
const { userinfo } = storeToRefs(store);


</script>


<style scoped>
 
</style>
