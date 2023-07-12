<template>
  <section class="track-order">
    <header class="track-order__header">
      <h1 class="track-order__title">Track Order</h1>
    </header>
  </section>
  <div class="track-order__box">
    <input
      type="number"
      v-model="orderNumber"
      @keydown="handlePreventNonNumbers"
      class="track-order__input"
      placeholder="Enter order id to track it"
    />
    <button @click="handleTrackOrderClick" class="track-order__btn">
      Submit
    </button>
  </div>
</template>
<script setup lang="ts">
import { handlePreventNonNumbers } from "~/utils/handlePreventNonNumbers";

const orderNumber = ref();
const { $toast } = useNuxtApp();

const handleTrackOrderClick = () => {
  if (!orderNumber.value) {
    $toast.error("Please provide an order number");
  } else {
    navigateTo(`/live-order/${orderNumber.value}`);
  }
};
</script>
<style scoped>
.track-order {
  margin: 50px 0;
}
.track-order__header {
  text-align: center;
  margin-bottom: 35px;
}
.track-order__title {
  font-size: clamp(1.4rem, calc(1.5vw + 1rem), 2rem);
  font-weight: 600;
}
.track-order__box {
  max-width: 560px;
  width: 90%;
  margin: 25px auto;
  padding: 25px;
  display: flex;
  align-items: center;
  gap: 10px;
  background: #e7e7e7;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
.track-order__input {
  flex: 1;
  padding: 10px 5px;
  border-radius: 5px;
  border: 2px solid #999;
  transition: all 0.3s ease-out;
}
.track-order__input:focus {
  border: 2px solid #fc8019;
}
.track-order__btn {
  padding: 10px 20px;
  font-weight: 600;
  border-radius: 5px;
  background: #fc8019;
  color: #fff;
}
.track-order__btn:focus {
  outline: 2px solid #fc8019;
  outline-offset: 2px;
}
</style>