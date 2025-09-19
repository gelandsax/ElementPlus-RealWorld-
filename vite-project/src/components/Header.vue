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
        <RouterLink class="nav-link" to="/login">Sign in</RouterLink>
      </li>
      <li class="nav-item">
        <RouterLink class="nav-link" to="/users">Sign up</RouterLink>
      </li>
    </ul>
  </div>
</nav>
</template>
<script setup lang="ts">

</script>
<style scoped>
</style>
