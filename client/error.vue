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
  padding: 0 15px;
}
.not-found__img-box {
  display: flex;
  align-items: center;
  gap: 5px;
  height: 150px;
}
.not-found__img {
  width: 120px;
}
.not-found__number {
  font-size: 140px;
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
@media (min-width: 560px) {
  .not-found__img-box {
    height: 190px;
  }
  .not-found__img {
    width: 160px;
  }
  .not-found__number {
    font-size: 190px;
  }
}
@media (min-width: 768px) {
  .not-found__img-box {
    height: 220px;
  }
  .not-found__img {
    width: 190px;
  }
  .not-found__number {
    font-size: 220px;
  }
}
@media (min-width: 992px) {
  .not-found__img-box {
    height: 350px;
  }
  .not-found__img {
    width: 300px;
  }
  .not-found__number {
    font-size: 350px;
  }
}
</style>