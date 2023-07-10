<template>
  <div v-if="isModalOpen" class="modal-wrapper">
    <div class="modal" :class="{ active: isModalOpen, closed: isModalClosed }">
      <header class="modal__header">
        <button @click.stop="handleCloseModalClick" class="modal__close-btn">
          <Icon name="maki:cross" />
        </button>
        <h1 class="modal__title">{{ orderType }} Time</h1>
      </header>
      <div class="modal__body">
        <ul class="modal__time-list">
          <li class="modal__time-item">
            <button
              @click="handleSelectOrderTimeClick(defaultOrderTime)"
              class="modal__time-btn"
              :class="{ active: defaultOrderTime === selectedOrderTime }"
            >
              <span v-if="orderType === 'Pickup'"> After 15 min </span>
              <span v-else> After 45 Min </span>
            </button>
          </li>
          <li
            v-for="(orderTime, idx) of pickupTimes.length
              ? pickupTimes
              : deliveryTimes"
            :key="idx"
            class="modal__time-item"
          >
            <button
              @click="handleSelectOrderTimeClick(orderTime)"
              class="modal__time-btn"
              :class="{ active: selectedOrderTime === orderTime }"
            >
              {{ orderTime }}
            </button>
          </li>
        </ul>
        <footer class="modal__btns-box">
          <button
            @click="handleCloseModalClick"
            class="modal__btn modal__btn--cancel btn-shadow"
          >
            CANCEL
          </button>
        </footer>
      </div>
    </div>
  </div>
</template>
  <script setup lang="ts">
const props = defineProps([
  "isModalOpen",
  "closeModal",
  "orderType",
  "getSelectedOrderTime",
  "selectedOrderTime",
  "defaultOrderTime",
  "pickupTimes",
  "deliveryTimes",
]);

const isModalClosed = ref(false);

watchEffect(() => {
  if (props.isModalOpen) {
    isModalClosed.value = false;
  }
});

const handleCloseModalClick = () => {
  isModalClosed.value = true;

  setTimeout(() => {
    props.closeModal();
  }, 400);
};

const handleSelectOrderTimeClick = (orderTime: string) => {
  props.getSelectedOrderTime(orderTime);
  handleCloseModalClick();
};
</script>
  <style scoped>
.modal-wrapper {
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.5);
  z-index: 9999;
}
.modal {
  position: relative;
  max-width: 560px;
  width: 90%;
  height: 500px;
  overflow-y: scroll;
  overflow-x: hidden;
  position: relative;
  background: #fff;
  padding: 25px;
  border-radius: 20px;
  background: #f1f1f1;
}
.modal::-webkit-scrollbar {
  height: 10px;
  width: 5px;
}
.modal::-webkit-scrollbar-track {
  margin-top: 50px;
  margin-bottom: 50px;
  background: transparent;
}
.modal::-webkit-scrollbar-thumb {
  background: #999;
}
.modal.active {
  animation: open 0.5s;
}
.modal.closed {
  animation: closed 0.5s;
}
@keyframes open {
  from {
    transform: scale(0.1);
  }
  to {
    transform: scale(1);
  }
}
@keyframes closed {
  from {
    transform: scale(1);
  }
  to {
    transform: scale(0.1);
  }
}

.modal__header {
  position: sticky;
  top: -25px;
  margin-bottom: 25px;
  padding: 15px 0;
  text-align: center;
  background: inherit;
}
.modal__title {
  margin-bottom: 10px;
  font-size: clamp(1.3rem, calc(1.5vw + 1rem), 1.7rem);
  font-weight: 600;
  color: #333;
}
.modal__time-list {
  display: grid;
  grid-template-columns: 1fr;
  gap: 15px;
  margin-bottom: 25px;
}
.modal__time-btn {
  display: block;
  padding: 15px;
  width: 100%;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  font-size: 16px;
  font-weight: 600;
  color: #222;
  background: #fff;
  border: 2px solid transparent;
}
.modal__time-btn.active {
  border: 2px solid #fc8019;
  box-shadow: inset;
}
.modal__description {
  color: #555;
  font-size: 18px;
}
.modal__btns-box {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 20px;
  margin-top: 15px;
}
.modal__btn {
  flex: 1;
  margin-top: 25px;
  padding: 15px 25px;
  font-weight: 600;
  font-size: 17px;
  border-radius: 5px;
  transition: box-shadow 0.3s ease-out;
}
.modal__btn--cancel {
  background: rgb(216, 216, 216);
}
.modal__btn--empty {
  background: rgb(223, 47, 47);
  color: #fff;
}
.modal__close-btn {
  position: absolute;
  top: 15px;
  left: 0;
  font-size: 30px;
  color: #333;
  transition: transform 0.3s ease-out;
  z-index: 9999;
}
.modal__close-btn:hover {
  transform: scale(1.1);
}

@media (min-width: 768px) {
  .modal__time-list {
    grid-template-columns: 1fr 1fr;
  }
}
</style>