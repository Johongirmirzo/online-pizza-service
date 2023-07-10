<template>
  <section class="dropdown" :class="{ active: isCartOnHover }">
    <div class="dropdown__box">
      <h4 v-if="!cartStore.cartItems.length" class="dropdown__empty-cart-title">
        You Cart Is Empty!
      </h4>

      <ul class="cart-list">
        <li
          v-for="cartItem of cartStore.cartItems"
          :key="cartItem.id"
          class="cart-list__item"
          :class="{ remove: removedItemId === cartItem.itemId }"
        >
          <div class="cart-list__left">
            <figure class="cart-list__img-box">
              <img
                :src="cartItem.photo"
                :alt="cartItem.name"
                :title="cartItem.name"
                class="cart-list__img"
              />
            </figure>
            <div class="cart-list__text-box">
              <header class="cart-list__header">
                <h3 class="cart-list__title">
                  {{ cartItem.name }}
                </h3>
                <p class="cart-list__description">
                  {{ cartItem.size }},
                  <span v-if="cartItem.itemType === 'Pizza'">
                    {{ getPizzaCrust(cartItem.crustType.crustType) }},
                    {{ getPizzaEdge(cartItem.edgeType.edgeType) }}
                  </span>
                </p>
              </header>
              <div class="cart__cart-btn-box">
                <div class="cart__btns-box">
                  <button
                    @click="decrementItemAmount(cartItem.itemId)"
                    class="cart__btn cart__decrement-item-btn"
                    :class="{ active: cartItem.amount > 1 }"
                  >
                    -
                  </button>
                  <span class="cart__item">{{ cartItem.amount }}</span>
                  <button
                    @click="incrementItemAmount(cartItem.itemId)"
                    class="cart__btn cart__increment-item-btn"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div class="cart-list__right">
            <div class="cart-list__actions-box">
              <button
                @click="removeItem(cartItem.itemId)"
                class="cart-list__action-btn cart-list__delete-btn"
              >
                <Icon class="cart-list__action-icon" name="maki:cross" />
              </button>
            </div>
            <strong class="cart-list__price-text">
              {{ cartItem.total }}uzs
            </strong>
          </div>
        </li>
      </ul>
    </div>
    <footer class="dropdown__footer">
      <div class="dropdown__footer-left">
        <NuxtLink to="/cart" class="dropdown__view-cart-btn"
          >VIEW CART</NuxtLink
        >
      </div>
      <strong class="dropdown__total-price-text">
        <span> TOTAL </span> {{ cartStore.calculateTotal() }} uzs
      </strong>
    </footer>
  </section>
</template>
<script setup lang="ts">
import { useCartStore } from "~/stores/useCartStore";

defineProps(["isCartOnHover"]);

const pizza = ref({});
const cartStore = useCartStore();
const removedItemId = ref("");
const { $toast } = useNuxtApp();

const {
  isModalOpen: isPizzaModalOpen,
  closeModal: closePizzaModal,
  openModal: openPizzaModal,
} = useModal();

const incrementItemAmount = (itemId: number) => {
  const item = cartStore.cartItems.find(
    (cartItem) => cartItem.itemId == itemId
  );
  if (cartStore.calculateTotal() + item.total / item.amount > 1200000) {
    return $toast.error(
      "You've exceeded the limit! Maximum amount of allowed to order is 1.2 million!."
    );
  } else {
    cartStore.incrementItemAmount(itemId);
  }
};
const decrementItemAmount = (itemId: number) => {
  const item = cartStore.cartItems.find(
    (cartItem) => cartItem.itemId == itemId
  );
  if (item.amount > 1) {
    cartStore.decrementItemAmount(itemId);
  }
};

const removeItem = (itemId: string) => {
  removedItemId.value = itemId;
  setTimeout(() => cartStore.removeCartItem(itemId), 500);
};

const getPizzaEdge = (pizzaEdge: string) => {
  switch (pizzaEdge) {
    case "saucageEdge":
      return "Saucage Edge";
    case "parmesanEdge":
      return "Parmesan Edge";
    case "mozarellaEdge":
      return "Mozarella Edge";
    case "garlicSaucageEdge":
      return "Garlic Saucage Edge";
  }
};
const getPizzaCrust = (pizzaCrust: string) => {
  switch (pizzaCrust) {
    case "classicCrust":
      return "Classic Crust";
    case "thinCrust":
      return "Thin Crust";
    case "thinnestCrust":
      return "Thinnest Crust";
    case "duplexCrustCheddar":
      return "Duplex Crust Cheddar";
    case "duplexCrustMozarella":
      return "Duplex Crust Mozarella";
  }
};
</script>
<style scoped>
.dropdown {
  position: absolute;
  top: 77px;
  right: 0;
  background: #fff;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  visibility: hidden;
  opacity: 0;
  transition: all 0.3s ease-out;
}
.dropdown::after {
  position: absolute;
  top: -10px;
  right: 10px;
  content: "";
  width: 20px;
  height: 20px;
  transform: rotate(45deg);
  background: #fff;
}
.dropdown::before {
  position: absolute;
  content: "";
  top: 0;
  width: 100%;
  background: #fff;
  z-index: 9;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1);
}

.dropdown.active {
  z-index: 1;
  opacity: 1;
  visibility: visible;
}
.dropdown__box {
  position: relative;
  width: 400px;
  height: 350px;
  overflow-x: hidden;
  overflow-y: scroll;
}
.dropdown__box::-webkit-scrollbar {
  height: 10px;
  width: 5px;
}
.dropdown__box::-webkit-scrollbar-track {
  background: transparent;
}
.dropdown__box::-webkit-scrollbar-thumb {
  background: #e7e7e7;
}
.dropdown__empty-cart-title {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 50%;
  text-align: center;
  transform: translate(-50%, -50%);
  font-size: clamp(1.2rem, calc(1.5vw + 1rem), 1.6rem);
}

.cart-list {
  padding: 10px;
}
.cart-list__item {
  position: relative;
  display: flex;
  padding-bottom: 15px;
  transition: all 0.3s ease-out;
  border-bottom: 1px solid #e7e7e7e7;
}
.cart-list__item.remove {
  transform: translateX(1000px);
  opacity: 0;
}
.cart-list__img {
  width: 100px;
}
.cart-list__item {
  display: flex;
}
.cart-list__item:not(:last-child) {
  margin-bottom: 30px;
}
.cart-list__left {
  display: flex;
  gap: 10px;
}
.cart-list__text-box {
  padding-right: 50px;
}
.cart-list__header {
  margin-bottom: 10px;
}
.cart-list__title {
  font-weight: 600;
}
.cart-list__description {
  font-size: 12px;
  color: #666;
}

.cart__btns-box {
  display: flex;
  align-items: center;
  width: 120px;
  border-radius: 10px;
}
.cart__btns-box > * {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 24px;
  width: 28px;
  text-align: center;
  background: #d6d6d6;
  vertical-align: middle;
  font-weight: 600;
  font-size: 18px;
  color: #fff;
}
.cart__btns-box > span {
  border: 1px solid #9c9494;
  font-size: 13px;
}
.cart__decrement-item-btn {
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  cursor: auto;
}
.cart__decrement-item-btn.active,
.cart__increment-item-btn {
  background: #fc8019;
  cursor: pointer;
}

.cart__add-to-cart-btn,
.cart__decrement-item-btn.active,
.cart__increment-item-btn {
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.3);
  transition: box-shadow 0.3s ease-out;
}
.cart__increment-item-btn {
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
}

.cart__add-to-cart-btn:hover,
.cart__decrement-item-btn.active:hover,
.cart__increment-item-btn:hover {
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.4);
}
.cart-list__right {
  display: flex;
  align-items: flex-end;
}
.cart-list__actions-box {
  position: absolute;
  top: 0;
  right: 0;
  display: flex;
  align-items: center;
  gap: 10px;
}
.cart-list__action-btn {
  font-size: 18px;
}
.cart-list__edit-btn {
  font-size: 20px;
  color: #fc8019;
}
.cart-list__price-text {
  font-weight: 600;
}
.dropdown__footer {
  position: sticky;
  bottom: -1px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 20px 15px;
  background: #fff;
  box-shadow: 0 -10px 10px rgba(0, 0, 0, 0.1);
}
.dropdown__view-cart-btn {
  display: block;
  padding: 12px 20px;
  background: #fc8019;
  color: #fff;
  font-size: 13px;
  font-weight: 600;
  border-radius: 5px;
}
.dropdown__total-price-text {
  font-weight: 600;
}
.dropdown__total-price-text span {
  margin-right: 10px;
}

@media (min-width: 768px) {
}
</style>