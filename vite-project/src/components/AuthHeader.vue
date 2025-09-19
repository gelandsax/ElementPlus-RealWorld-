<template>
  <nav class="navbar navbar-light">
    <div class="container">
      <a class="navbar-brand" href="/">conduit</a>
      <ul class="nav navbar-nav pull-xs-right">
        <li class="nav-item">
          <!-- Add "active" class when you're on that page" -->
          <RouterLink class="nav-link active" to="/">Home</RouterLink>
        </li>
        <li class="nav-item">
          <RouterLink class="nav-link" to="/editor">
            <i class="ion-compose"></i>&nbsp;New Article
          </RouterLink>
        </li>
        <li class="nav-item">
          <RouterLink class="nav-link" to="/settings">
            <i class="ion-gear-a"></i>&nbsp;Settings
          </RouterLink>
        </li>
        <li class="nav-item">
          <RouterLink class="nav-link" to="/profiles">
            <img :pic="userinfo?.image" class="user-pic" />
            {{ userinfo?.username }}
          </RouterLink>
        </li>
      </ul>
    </div>
  </nav>
</template>
<script setup lang="ts">
import { useUserStore } from "../store/user";
import { storeToRefs } from "pinia";
let store = useUserStore();
const { userinfo } = storeToRefs(store);
</script>
<style scoped></style>
