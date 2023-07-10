<template>
  <header class="header">
    <NuxtLink class="header__redirect-link" :to="redirectLink">
      <slot name="header-icon"></slot>
      {{ redirectText }}
    </NuxtLink>
    <h1 class="header__title">
      {{ title }}
    </h1>
  </header>
</template>
<script setup lang="ts">
defineProps(["redirectLink", "redirectText", "title"]);
</script>
<style scoped>
.header {
  margin-bottom: 45px;
}
.header__redirect-link {
  margin-bottom: 25px;
}
.header__title {
  text-align: center;
  font-size: clamp(1.4rem, calc(1.5vw + 1rem), 2rem);
}
@media (min-width: 768px) {
  .header__redirect-link {
    margin-bottom: 15px;
  }
}
</style>