<template>
  <section class="not-found">
    <div class="not-found__text-box">
      <div class="not-found__img-box">
        <span class="not-found__number">4</span>
        <img
          src="~/assets/images/pizza-img.png"
          class="not-found__img"
          alt="pizza img"
        />
        <span class="not-found__number">4</span>
      </div>
      <div class="not-found__btn-box">
        <NuxtLink class="not-found__link" to="/">
          <Icon class="not-found__icon" name="ant-design:home-outlined" />
          Go Back</NuxtLink
        >
      </div>
    </div>
  </section>
</template>
<script setup lang="ts">
</script>
<style scoped>
.not-found {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #fc8019;
}
.not-found__img-box {
  display: flex;
  align-items: center;
}
.not-found__img {
  width: 250px;
}
.not-found__number {
  font-size: 350px;
  color: hsl(0, 0%, 92%);
  line-height: 0;
}
.not-found__btn-box {
  margin-top: 50px;
  text-align: center;
}
.not-found__link {
  padding: 10px 0;
  display: block;
  color: #fff;
  background: hsl(27, 97%, 64%);
  transition: background 0.3s ease-out;
}
.not-found__link:hover {
  background: hsl(27, 97%, 60%);
}
</style>