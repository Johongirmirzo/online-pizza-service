<template>
  <div v-if="isModalOpen" class="modal-wrapper">
    <div class="modal" :class="{ active: isModalOpen, closed: isModalClosed }">
      <header class="modal__header">
        <h1 class="modal__title">EMPTY CART</h1>
        <p class="modal__description">Are you sure?</p>
      </header>
      <div class="modal__btns-box">
        <button
          @click="handleCloseModalClick"
          class="modal__btn modal__btn--cancel btn-shadow"
        >
          CANCEL
        </button>
        <button
          @click="handleClearCartClick"
          class="modal__btn modal__btn--empty btn-shadow"
        >
          EMPTY
        </button>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useCartStore } from "~/stores/useCartStore";
const props = defineProps(["isModalOpen", "closeModal"]);

const cartStore = useCartStore();
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

const handleClearCartClick = () => {
  handleCloseModalClick();
  cartStore.clearCart();
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
  background: #fff;
  padding: 15px;
  border-radius: 20px;
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
  text-align: center;
}
.modal__title {
  margin-bottom: 10px;
  font-size: clamp(1.2rem, calc(1.5vw + 1rem), 1.5rem);
  font-weight: 600;
  color: #333;
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
</style>