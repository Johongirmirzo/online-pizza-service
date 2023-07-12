<template>
  <section class="payment-option">
    <header class="payment-option__header">
      <h2 class="payment-option__title">Payment Options</h2>
    </header>
    <div class="payment-option__box">
      <label for="card" class="payment-option__label">
        <input
          type="radio"
          class="payment-option__input"
          name="paymentOption"
          id="card"
          value="CARD"
          @change="$emit('update:paymentMethod', $event.target.value)"
        />
        Card
      </label>
      <label for="cash" class="payment-option__label">
        <input
          type="radio"
          class="payment-option__input"
          name="paymentOption"
          id="cash"
          value="CASH"
          :checked="paymentMethod === 'CASH'"
          @change="$emit('update:paymentMethod', $event.target.value)"
        />
        Cash
      </label>
      <div v-if="paymentMethod === 'CASH'" class="payment-option__change-box">
        <p class="payment-option__change-text">
          How much change should be prepared?
        </p>
        <div class="payment-option__change-box">
          <div v-if="!isWithChange" class="payment-option__with-change-box">
            <input
              @keydown="handlePreventNonNumbers"
              :value="changeAmount"
              @input="$emit('update:changeAmount', $event.target.value)"
              class="payment-option__change-input"
              type="number"
            />
            uzs
          </div>

          <div v-if="!!isWithChange" class="payment-option__without-change-box">
            <span class="payment-option__total">
              {{ totalSum }}
            </span>

            uzs
          </div>
        </div>
        <label for="change">
          <input
            @change="toggleWithChange"
            type="checkbox"
            id="change"
            class="payment-option__change-checkbox"
            :class="{ active: isWithChange }"
          />
          Without Change</label
        >
      </div>
    </div>
  </section>
</template>
<script setup lang="ts">
import { handlePreventNonNumbers } from "~/utils/handlePreventNonNumbers";
defineProps([
  "paymentMethod",
  "changeAmount",
  "totalSum",
  "isWithChange",
  "toggleWithChange",
]);
</script>
<style scoped>
.payment-option {
  background: #e9e9e9;
  padding: 25px;
  border-radius: 10px;
}
.payment-option__header {
  margin-bottom: 25px;
}
.payment-option__title {
  font-size: clamp(1.7rem, calc(1.7vw + 1rem), 2.2rem);
}
.payment-option__label {
  display: block;
  width: 100px;
  cursor: pointer;
  font-weight: 600;
  color: #333;
  font-size: 20px;
}
.payment-option__label:not(:last-child) {
  margin-bottom: 25px;
}

.payment-option__input {
  margin-right: 15px;
  background: #fc8019;
  transform: scale(1.5);
}

.payment-option__input[type="radio"]:after {
  width: 18px;
  height: 18px;
  border-radius: 18px;
  top: -1px;
  left: -1px;
  position: relative;
  background-color: #e9e9e9;
  content: "";
  display: inline-block;
  visibility: visible;
  border: 2px solid #d3d3d3;
}

.payment-option__input[type="radio"]:checked:after {
  width: 18px;
  height: 18px;
  border-radius: 18px;
  top: -1px;
  left: -1px;
  position: relative;
  background-color: #ffa500;
  content: "";
  display: inline-block;
  visibility: visible;
  border: 2px solid #fc8019;
}
.payment-option__change-box {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 25px;
}
.payment-option__change-text {
  color: #333;
}
.payment-option__without-change-box {
  cursor: not-allowed;
  font-size: 18px;
  font-weight: 600;
  color: #333;
}

.payment-option__with-change-box {
  background: #fff;
  padding: 5px;
  border-radius: 5px;
}
.payment-option__change-input {
  width: 100px;
  padding: 10px 0;
  background: transparent;
  border: transparent;
}

.payment-option__change-checkbox {
  transform: scale(1.5);
  margin-right: 5px;
}

.payment-option__change-checkbox:after {
  width: 18px;
  height: 18px;
  border-radius: 2px;
  top: 0;
  left: 0;
  position: relative;
  background-color: #fc8019;
  content: "";
  display: inline-block;
  visibility: visible;
  border: 3px solid #fc8019;
  font-size: 10px;
  z-index: 1;
  cursor: pointer;
}

.payment-option__change-checkbox.active:after {
  content: "✔";
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 1;
}

@media (min-width: 768px) {
}
</style>