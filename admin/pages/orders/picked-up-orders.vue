<template>
  <section class="orders">
    <header class="orders__header">
      <h1 class="orders__title">Picked Up Orders</h1>
    </header>
    <OrderTableBox :csvFileName="csvFileName" :filterBy="filterBy" />
  </section>
</template>
<script setup lang="ts">
const csvFileName = "picked-up-orders.csv";
const filterBy = "ORDER_PICKED_UP";
</script>
<style scoped>
.orders__header {
  text-align: center;
  margin-bottom: 35px;
}
.orders__title {
  font-size: clamp(1.4rem, calc(1.5vw + 1rem), 2rem);
  font-weight: 600;
}
</style>