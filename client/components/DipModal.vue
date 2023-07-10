<template>
  <div v-if="isModelOpen && menuData.type" class="modal-wrapper">
    <div
      class="modal"
      :class="{ active: isModelOpen && menuData.type, closed: isModalClosed }"
    >
      <button @click.stop="handleCloseModalClick" class="modal__close-btn">
        <Icon name="maki:cross" />
      </button>
      <figure class="modal__img-box">
        <img
          :src="menuData.photo"
          :alt="menuData.type"
          :title="menuData.type"
          class="modal__img"
        />
      </figure>
      <div class="modal__text-box">
        <div class="modal__top-text">
          <header class="modal__header">
            <h2 class="modal__title">
              {{ menuData.type }}
            </h2>
            <div class="modal__nutritional-info-box">
              <button
                class="modal__btn modal__nutritional-info-btn"
                @click="toggleNutrionalValueBox"
              >
                <Icon
                  class="modal__icon modal__info-icon"
                  name="material-symbols:info-outline"
                />
              </button>
              <div
                class="nutritional-value"
                :class="{ active: isNutrionalValueBoxOpen }"
              >
                <header class="nutritional-value__header">
                  <h5 class="nutritional-value__title">
                    Nutritional value for 100 gramms
                  </h5>
                </header>
                <ul class="nutrional-value__list">
                  <li class="nutritional-value__item">
                    <p class="nutritional-value__text">Calories</p>
                    <p class="nutritional-value__text">
                      {{ menuData.calories }} ccal
                    </p>
                  </li>
                  <li class="nutritional-value__item">
                    <p class="nutritional-value__text">Fats</p>
                    <p class="nutritional-value__text">{{ menuData.fats }} g</p>
                  </li>
                  <li class="nutritional-value__item">
                    <p class="nutritional-value__text">Proteins</p>
                    <p class="nutritional-value__text">
                      {{ menuData.proteins }} g
                    </p>
                  </li>
                  <li class="nutritional-value__item">
                    <p class="nutritional-value__text">Carbohydrates</p>
                    <p class="nutritional-value__text">
                      {{ menuData.carbohydrates }} g
                    </p>
                  </li>
                  <li
                    class="nutritional-value__item nutritional-value__item-weight"
                  >
                    <p class="nutritional-value__text">Weight</p>
                    <p class="nutritional-value__text">
                      {{ menuData.weight }} g
                    </p>
                  </li>
                </ul>
              </div>
            </div>
          </header>
          <div class="modal__cart-btn-box">
            <div v-if="menuData.status === 'ACTIVE'" class="modal__btns-box">
              <button
                @click="decrementDipAmount"
                class="modal__btn modal__decrement-item-btn"
                :class="{ active: itemAmount > 1 }"
              >
                -
              </button>
              <span class="modal__item">{{ itemAmount }}</span>
              <button
                @click="incrementDipAmount"
                class="modal__btn modal__increment-item-btn"
              >
                +
              </button>
            </div>
            <strong class="modal__price-text">
              {{ totalItemPrice }} uzs
            </strong>
            <button
              @click="handleAddToCartBtn"
              class="modal__add-to-cart-btn"
              :disabled="menuData.status !== 'ACTIVE'"
            >
              <span v-if="menuData.status !== 'ACTIVE'">TO BE LATER</span>
              <span v-else>ADD TO CART</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
    <script setup lang="ts">
import { useCartStore } from "~/stores/useCartStore";
import { v4 as uuid } from "uuid";
const props = defineProps(["menuData", "isModelOpen", "closeModal"]);

const isNutrionalValueBoxOpen = ref(false);
const isModalClosed = ref(false);
const itemAmount = ref(1);
const totalItemPrice = ref(0);
const { $toast } = useNuxtApp();

const cartStore = useCartStore();

const toggleNutrionalValueBox = () => {
  isNutrionalValueBoxOpen.value = !isNutrionalValueBoxOpen.value;
};

watchEffect(() => {
  if (props.isModelOpen) {
    isModalClosed.value = false;
  }
});

const handleCloseModalClick = () => {
  isModalClosed.value = true;
  isNutrionalValueBoxOpen.value = false;
  setTimeout(() => {
    props.closeModal();
  }, 400);
};

watchEffect(() => {
  totalItemPrice.value = itemAmount.value * Number(props.menuData.price);
});

const incrementDipAmount = () => {
  if (totalItemPrice.value + Number(props.menuData.price) > 1200000) {
    return $toast.error(
      "You're reached limit! Maximum amount allowed to order is 1.2 million"
    );
  }
  itemAmount.value += 1;
  totalItemPrice.value = itemAmount.value * Number(props.menuData.price);
};
const decrementDipAmount = () => {
  if (itemAmount.value > 1) {
    itemAmount.value -= 1;
    totalItemPrice.value -= Number(props.menuData.price);
    console.log(totalItemPrice.value, Number(props.menuData.price));
  }
};
const isItemActive = () => props.menuData.status === "ACTIVE";

const handleAddToCartBtn = () => {
  if (!isItemActive()) return;
  const cartItem = {
    id: props.menuData.id,
    itemType: "Dip",
    type: "Dip",
    isEditable: false,
    itemId: uuid(),
    photo: props.menuData.photo,
    name: props.menuData.type,
    total: totalItemPrice.value,
    amount: itemAmount.value,
    vegan: props.menuData.vegan,
    size: "",
  };
  if (cartStore.calculateTotal() + cartItem.total >= 1200000) {
    return $toast.error(
      "You're reached limit! Maximum amount allowed to order is 1.2 million"
    );
  } else {
    cartStore.addCartItem({ ...cartItem });
    $toast.success("Dip is added to cart!");
    handleCloseModalClick();
  }
};
</script>
    <style scoped>
.modal-wrapper {
  position: fixed;
  inset: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.5);
  z-index: 9999;
}

.modal {
  position: relative;
  width: 90%;
  height: 500px;
  overflow-y: scroll;
  overflow-x: hidden;
  border-radius: 20px;
  background: #fff;
}
.modal::-webkit-scrollbar {
  height: 10px;
  width: 5px;
}
.modal::-webkit-scrollbar-track {
  margin-top: 150px;
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
.modal__img-box,
.modal__text-box {
  padding: 10px;
}

.modal__img {
  transition: width 0.3s ease-out;
}
.modal__img--small {
  width: 70%;
}
.modal__img--medium {
  width: 85%;
}
.modal__img--large {
  width: 100%;
}
.modal__img--small.modal__img--smaller {
  width: 70%;
}
.modal__img--medium.modal__img--smaller {
  width: 85%;
}
.modal__img--medium.modal__img--bigger {
  width: 85%;
}
.modal__img--large.modal__img--bigger {
  width: 100%;
}
.modal__img-box {
  display: flex;
  align-items: center;
  justify-content: center;
}
.modal__close-btn {
  position: sticky;
  top: 10px;
  right: 0;
  font-size: 30px;
  color: #555;
  transition: transform 0.3s ease-out;
}
.modal__close-btn:hover {
  transform: scale(1.1);
}
.modal__text-box {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 1;
  border-top-right-radius: inherit;
  border-bottom-right-radius: inherit;
  background: rgb(252, 252, 252);
}
.modal__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}
.modal__title {
  font-size: clamp(1.2rem, calc(1.5vw + 1rem), 1.5rem);
  font-weight: 600;
  color: #333;
}
.modal__nutritional-info-box {
  position: relative;
}
.modal__info-icon {
  transition: transform 0.3s ease-out;
}
.modal__info-icon:hover {
  transform: scale(1.05);
}
.modal__info-icon {
  font-size: 25px;
}
.modal__description {
  color: #555;
}
.modal__menu-item-piece-amount {
  margin: 15px 0;
  color: #777;
}
.modal__menu-size-btns-box {
  position: relative;
  display: flex;
  align-items: center;
  margin-top: 25px;
  border-radius: 30px;
  background: rgb(243, 243, 247);
}
.modal__menu-change-size-btn {
  padding: 8px 0;
  margin: 3px;
  flex: 1;
  background: transparent;
  border-radius: inherit;
  z-index: 2;
}

.modal__btn-wrapper-text {
  position: absolute;
  inset: 0;
  margin: 2px;
  border-radius: inherit;
  z-index: 1;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
  background: #fff;
}
.modal__price-text {
  font-weight: 600;
  font-size: 1.1rem;
  color: #333;
}
.modal__cart-btn-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 25px 0;
}

.modal__btns-box {
  display: flex;
  align-items: center;
  border-radius: 10px;
}
.modal__btns-box > * {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 30px;
  width: 30px;
  text-align: center;
  background: #d6d6d6;
  vertical-align: middle;
  font-weight: 600;
  font-size: 18px;
  color: #fff;
}
.modal__btns-box > span {
  border: 1px solid #9c9494;
}
.modal__decrement-item-btn {
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
}

.modal__add-to-cart-btn,
.modal__decrement-item-btn.active,
.modal__increment-item-btn {
  background: #fc8019;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.4);
  transition: box-shadow 0.3s ease-out;
}
.modal__increment-item-btn {
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
}

.modal__add-to-cart-btn:hover,
.modal__decrement-item-btn.active:hover,
.modal__increment-item-btn:hover {
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.4);
}
.modal__add-to-cart-btn {
  display: block;
  background: #fc8019;
  color: #fff;
  padding: 10px 5px;
  font-size: 13px;
  font-weight: 600;
  border-radius: 5px;
}
.modal__add-to-cart-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.nutritional-value {
  position: absolute;
  top: 70px;
  opacity: 0;
  right: -10px;
  z-index: -1;
  padding: 15px;
  width: 190px;
  background: rgb(55, 53, 53);
  color: #fff;
  border-radius: 10px;
  font-size: 13px;
  transition: all 0.3s ease-out;
}
.nutritional-value.active {
  top: 40px;
  opacity: 1;
  z-index: 3;
}
.nutritional-value::after {
  position: absolute;
  content: "";
  top: -5px;
  right: 12px;
  z-index: 999;
  width: 20px;
  height: 20px;
  background: inherit;
  transform: rotate(45deg);
}
.nutritional-value__header {
  text-align: left;
  margin-bottom: 15px;
  color: #999;
}

.nutritional-value__item {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.nutritional-value__item:not(:last-child) {
  margin-bottom: 8px;
}
.nutritional-value__item-weight {
  margin-top: 16px;
}

@media (min-width: 768px) {
  .modal {
    display: flex;
    width: 700px;
    overflow: visible;
  }
  .modal__img-box,
  .modal__text-box {
    padding: 25px 40px;
  }
  .modal__img-box {
    width: 40%;
  }
  .modal__text-box {
    width: 60%;
  }
  .modal__close-btn {
    position: absolute;
    top: -45px;
    right: 0;
    z-index: 9;
    color: #fff;
  }
  .nutritional-value {
    width: 220px;
  }
  .modal__increment-item-btn {
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
  }
}
@media (min-width: 992px) {
  .modal {
    width: 800px;
  }
  .modal__img-box,
  .modal__text-box {
    padding: 25px 40px;
  }
  .modal__add-to-cart-btn {
    padding: 15px 10px;
    font-size: 14px;
  }
  .modal__price-text {
    font-size: clamp(1.2rem, calc(1.5vw + 1rem), 1.5rem);
  }
  .modal__btns-box {
    width: 120px;
  }
  .modal__btns-box > * {
    width: 40px;
    height: 40px;
  }
}

@media (min-width: 1032px) {
  .modal {
    width: 900px;
  }
  .modal__close-btn {
    position: absolute;
    top: 0;
    right: -45px;
  }
}
</style>