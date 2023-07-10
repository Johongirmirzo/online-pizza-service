<template>
  <header class="header">
    <NuxtLink to="/" class="header__logo">Pizzeria</NuxtLink>
    <div class="header__order-stage-box">
      <div class="header__order-stage--active header__order-stage--1">
        <span class="header__order-stage--circle">
          <Icon name="line-md:confirm" class="header__order-stage-icon" />
        </span>
        <p class="header__order-stage-text">Basket</p>
      </div>
      <div class="header__order-stage--active--line"></div>
      <div class="header__order-stage--active">
        <span class="header__order-stage--circle">
          <Icon
            v-if="currentStage > 2"
            name="line-md:confirm"
            class="header__order-stage-icon"
          />
          <span v-else>2</span>
        </span>
        <p class="header__order-stage-text">Create Order</p>
      </div>
      <div class="header__order-stage--inactive--dotted"></div>
      <div class="header__order-stage--inactive">
        <span class="header__order-stage--circle">
          <Icon
            v-if="currentStage > 3"
            name="line-md:confirm"
            class="header__order-stage-icon"
          />
          <span v-else>3</span>
        </span>
        <p class="header__order-stage-text">Order Accepted</p>
      </div>
    </div>
  </header>
</template>
<script setup lang="ts">
const currentStage = ref(1);
const route = useRoute();

watchEffect(() => {
  if (route.name === "checkout") {
    currentStage.value = 2;
  }
});
</script>
  <style scoped>
.header {
  max-width: 1260px;
  margin: 0 auto;
  padding: 25px 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.header__logo {
  font-size: clamp(1.2rem, calc(1.5vw + 1rem), 2rem);
}
.header__order-stage-box {
  position: relative;
  display: flex;
  align-items: center;
}
.header__order-stage-box::before {
  position: absolute;
  content: "";
  top: 15px;
  left: 42px;
  width: 30%;
  border-top: 1px solid #222;
}
.header__order-stage-box::after {
  position: absolute;
  content: "";
  top: 15px;
  right: 75px;
  width: 35%;
  border-top: 1px solid #222;
  opacity: 0.5;
}
.header__order-stage--active,
.header__order-stage--inactive {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.header__order-stage--1 {
  position: relative;
}

.header__order-stage--inactive {
  opacity: 0.5;
}
.header__order-stage--circle {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #222;
}

.header__order-stage--active--line,
.header__order-stage--inactive--dotted {
  width: 120px;
}

.header__order-stage-text {
  font-size: 14px;
  color: #222;
}
</style>