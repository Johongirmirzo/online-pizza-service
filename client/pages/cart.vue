<template>
  <section class="cart">
    <header class="cart__header">
      <h1 v-if="cartStore.cartItems.length" class="cart__title">View Cart</h1>
      <h1 v-else class="cart__title">Your Cart Is Empty!</h1>
    </header>
    <EmptyCartModal :isModalOpen="isModalOpen" :closeModal="closeModal" />
    <Login
      :isModalOpen="isLoginModalOpen"
      :closeModal="closeLoginModal"
      :openRegisterModal="openRegisterModal"
    />
    <Register
      :isModalOpen="isRegisterModalOpen"
      :closeModal="closeRegisterModal"
      :openLoginModal="openLoginModal"
    />
    <div class="cart__row">
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
      <div v-if="cartStore.cartItems.length" class="cart__checkout-btn-box">
        <div class="cart__checkout-btns-wrapper">
          <div class="cart__checkout-text-box">
            <p class="cart__checkout-text">Delivery is Free</p>
            <p class="cart__total-price">
              <span>TOTAL</span>
              <strong> {{ cartStore.calculateTotal() }} uzs </strong>
            </p>
          </div>
          <button
            @click="handleNavitoCheckoutClick"
            class="cart__checkout-link btn-shadow"
          >
            Go To Checkout Page
            <Icon
              class="cart__checkout-icon"
              name="material-symbols:shopping-cart-checkout-rounded"
            />
          </button>
          <button @click="openModal" class="cart__empty-cart-btn">
            Empty Cart
          </button>
        </div>
      </div>
    </div>
  </section>
</template>
<script setup lang="ts">
import { useCustomerStore } from "~/stores/useCustomerStore";
import { useCartStore } from "~/stores/useCartStore";

const cartStore = useCartStore();
const customerStore = useCustomerStore();
const removedItemId = ref("");
const { $toast } = useNuxtApp();

const { isModalOpen, closeModal, openModal } = useModal();
const {
  isModalOpen: isLoginModalOpen,
  closeModal: closeLoginModal,
  openModal: openLoginModal,
} = useModal();
const {
  isModalOpen: isRegisterModalOpen,
  closeModal: closeRegisterModal,
  openModal: openRegisterModal,
} = useModal();

const handleNavitoCheckoutClick = () => {
  if (customerStore.customer.id) {
    navigateTo("/checkout");
  } else {
    openLoginModal();
  }
};

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
.cart {
  margin: 100px 0;
}
.cart__header {
  margin-bottom: 25px;
  text-align: center;
}
.cart__title {
  font-size: clamp(1.4rem, calc(2vw + 1rem), 2rem);
}
.cart__row {
  display: flex;
  flex-wrap: wrap;
  gap: 35px;
}
.cart-list {
  flex: 1;
  padding: 10px;
}
.cart-list__item {
  position: relative;
  display: flex;
  padding-bottom: 15px;
  transition: all 0.75s ease-out;
  border-bottom: 1px solid #e7e7e7e7;
}
.cart-list__item.remove {
  transform: translateX(3000px);
  opacity: 0;
}
.cart-list__img {
  width: 250px;
}
.cart-list__item {
  display: flex;
  justify-content: space-between;
}
.cart-list__item:not(:last-child) {
  margin-bottom: 30px;
}
.cart-list__left {
  display: flex;
  align-items: center;
  gap: 10px;
}
.cart-list__text-box {
  margin-top: -10px;
  padding-right: 50px;
}
.cart-list__header {
  margin-bottom: 10px;
}
.cart-list__title {
  margin-bottom: 15px;
  font-size: 20px;
  font-weight: 600;
}
.cart-list__description {
  margin-bottom: 50px;
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
  height: 42px;
  width: 42px;
  text-align: center;
  background: #d6d6d6;
  vertical-align: middle;
  font-weight: 600;
  font-size: 18px;
  color: #fff;
}
.cart__btns-box > span {
  border: 1px solid #9c9494;
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
  top: 50px;
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
  font-size: clamp(1.1rem, calc(1.5vw + 1rem), 1.5rem);
  color: #333;
  font-weight: 600;
}
.cart__checkout-btns-wrapper {
  position: sticky;
  top: 150px;
}
.cart__checkout-text-box {
  margin-bottom: 20px;
}
.cart__checkout-text {
  font-size: 16px;
  font-weight: 500;
}
.cart__total-price {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 10px;
  font-weight: 600;
  font-size: 20px;
  color: #333;
}

.cart__checkout-link {
  padding: 15px 25px;
  background: #fc8019;
  border-radius: 5px;
  color: #fff;
  font-size: 17px;
}
.cart__empty-cart-btn {
  display: block;
  width: 100%;
  margin-top: 25px;
  font-size: 20px;
  font-weight: 600;
  text-align: center;
  color: red;
}
</style>