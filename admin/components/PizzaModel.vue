<template>
  <div v-if="isModelOpen && pizzaData.name" class="modal-wrapper">
    <ToppingModal
      :isToppingModelOpen="isToppingModelOpen"
      :topping="activeTopping"
      :closeToppingModal="closeToppingModal"
    />
    <div
      class="modal"
      :class="{ active: isModelOpen && pizzaData.name, closed: isModalClosed }"
    >
      <button @click.stop="handleCloseModalClick" class="modal__close-btn">
        <Icon name="maki:cross" />
      </button>
      <figure class="modal__img-box">
        <img
          :src="pizzaData.pizzaSizes[pizzaPieceIndex]?.photo"
          :alt="pizzaData.name"
          :title="pizzaData.name"
          ref="pizzaPhoto"
          class="modal__img"
          :class="[
            isPizzaPhotoSmaller ? 'modal__img--smaller' : 'modal__img--bigger',
            currentPizzaSize === 'SMALL'
              ? 'modal__img--small'
              : currentPizzaSize === 'MEDIUM'
              ? 'modal__img--medium'
              : 'modal__img--large',
          ]"
        />
      </figure>
      <div class="modal__text-box">
        <div
          class="modal__header-text-box"
          :class="{ inactive: isToppingModelOpen }"
        >
          <header class="modal__header">
            <h2 class="modal__title">
              {{ pizzaData.name }}
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
                      {{
                        pizzaData.pizzaSizes[pizzaPieceIndex].nutritionalValue
                          ?.calories
                      }}
                      ccal
                    </p>
                  </li>
                  <li class="nutritional-value__item">
                    <p class="nutritional-value__text">Fats</p>
                    <p class="nutritional-value__text">
                      {{
                        pizzaData.pizzaSizes[pizzaPieceIndex].nutritionalValue
                          ?.fats
                      }}
                      g
                    </p>
                  </li>
                  <li class="nutritional-value__item">
                    <p class="nutritional-value__text">Proteins</p>
                    <p class="nutritional-value__text">
                      {{
                        pizzaData.pizzaSizes[pizzaPieceIndex].nutritionalValue
                          ?.proteins
                      }}
                      g
                    </p>
                  </li>
                  <li class="nutritional-value__item">
                    <p class="nutritional-value__text">Carbohydrates</p>
                    <p class="nutritional-value__text">
                      {{
                        pizzaData.pizzaSizes[pizzaPieceIndex].nutritionalValue
                          .carbohydrates
                      }}
                      g
                    </p>
                  </li>
                  <li
                    class="nutritional-value__item nutritional-value__item-weight"
                  >
                    <p class="nutritional-value__text">Circumfarance</p>
                    <p class="nutritional-value__text">
                      {{ pizzaData.pizzaSizes[pizzaPieceIndex].circumfarance }}
                      cm
                    </p>
                  </li>
                  <li
                    class="nutritional-value__item nutritional-value__item-weight"
                  >
                    <p class="nutritional-value__text">Weight</p>
                    <p class="nutritional-value__text">
                      {{ pizzaData.pizzaSizes[pizzaPieceIndex].weight }}
                      g
                    </p>
                  </li>
                </ul>
              </div>
            </div>
          </header>
          <ul class="modal__pizza-topping-list">
            <li
              v-for="topping in pizzaData.pizzaSizes[pizzaPieceIndex]
                .standardToppings"
              :key="topping.id"
              class="modal__pizza-topping-item"
            >
              {{ topping.name }},
            </li>
          </ul>

          <p class="modal__pizza-price">
            {{ pizzaData.pizzaSizes[pizzaPieceIndex].price }} sum
          </p>
        </div>
        <div class="modal__body">
          <div class="modal__pizza-size-box">
            <h5 class="modal__pizza-size-title">Select Pizza Size</h5>
            <ul
              class="modal__pizza-size-list"
              ref="btnBoxSize"
              :class="{ inactive: isToppingModelOpen }"
            >
              <li
                v-for="(pizzaSize, idx) in pizzaData.pizzaSizes"
                :key="pizzaSize.id"
                class="modal__pizza-size-item"
              >
                <button
                  class="modal__pizza-size-btn"
                  @click="handleChangeMenuBtn(idx)"
                  :class="{ active: idx === currentIndex }"
                >
                  {{ pizzaSize.size }}
                </button>
              </li>
              <span ref="spanEl" class="modal__btn-wrapper-text"> </span>
            </ul>
          </div>
          <div class="modal__standard-toppings-box">
            <header class="modal__standard-toppings-header">
              <h5 class="modal__standard-topppings-title">Standard Toppings</h5>
            </header>
            <ul class="modal__standard-toppings-list">
              <li
                v-for="topping in pizzaData.pizzaSizes[pizzaPieceIndex]
                  .standardToppings"
                :key="topping.id"
                class="modal__standard-toppings-item"
              >
                <button @click="getTopping(topping)" class="modal__topping-btn">
                  {{ topping.name }},
                </button>
              </li>
            </ul>
          </div>
          <div class="modal__extra-toppings-box">
            <header class="modal__extra-toppings-header">
              <h5 class="modal__extra-topppings-title">Extra Toppings</h5>
            </header>
            <ul class="modal__extra-toppings-list">
              <li
                v-for="topping in pizzaData.pizzaSizes[pizzaPieceIndex]
                  .extraToppings"
                :key="topping.id"
                class="modal__extra-toppings-item"
              >
                <button @click="getTopping(topping)" class="modal__topping-btn">
                  {{ topping.name }},
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
  <script setup lang="ts">
const props = defineProps(["pizzaData", "isModelOpen", "closeModal"]);

const pizzaPieceIndex = ref(0);
const isNutrionalValueBoxOpen = ref(false);
const isModalClosed = ref(false);
const boxWidth = ref(0);
const previousIndex = ref(0);
const currentIndex = ref(0);
const spanEl = ref<HTMLElement>();
const btnBoxSize = ref<HTMLElement>();

const isToppingModelOpen = ref(false);
const activeTopping = ref({});

const toggleNutrionalValueBox = () => {
  isNutrionalValueBoxOpen.value = !isNutrionalValueBoxOpen.value;
};

const currentPizzaSize = computed(
  () => props.pizzaData.pizzaSizes[pizzaPieceIndex.value].size
);

const openToppingModal = () => {
  isToppingModelOpen.value = true;
};
const closeToppingModal = () => {
  console.log("Closing");
  isToppingModelOpen.value = false;
};

const getTopping = (topping: any) => {
  openToppingModal();
  activeTopping.value = topping;
};

const isPizzaPhotoSmaller = computed(() => {
  const val = currentIndex.value - previousIndex.value;
  if (val < 0) {
    return true;
  } else {
    return false;
  }
});

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
  if (btnBoxSize.value && spanEl.value) {
    boxWidth.value = btnBoxSize.value.clientWidth;
    const boxElWidth = boxWidth.value;

    spanEl.value.style = `transform: translateX(${
      Math.floor(boxElWidth / props.pizzaData.pizzaSizes.length) *
      currentIndex.value
    }px); background: #fff; width: ${Math.floor(
      boxWidth.value / props.pizzaData.pizzaSizes.length
    )}px`;
  }
});

const handleChangeMenuBtn = (idx: number) => {
  previousIndex.value = currentIndex.value;
  currentIndex.value = idx;
  pizzaPieceIndex.value = idx;
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
.modal > * {
  flex: 1;
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
  padding: 0 30px 25px 30px;
}
.modal__img-box {
  position: sticky;
  top: 0;
  z-index: 0;
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

.modal__text-box {
  overflow: hidden;
  overflow-y: scroll;
}
.modal__text-box::-webkit-scrollbar {
  height: 10px;
  width: 5px;
}
.modal__text-box::-webkit-scrollbar-track {
  margin-top: 150px;
  margin-bottom: 50px;
  background: transparent;
}
.modal__text-box::-webkit-scrollbar-thumb {
  background: #999;
}
.modal__header-text-box {
  padding-top: 25px;
  padding-bottom: 15px;
  border-bottom: 1px solid #777;
  position: sticky;
  top: 0;
  background: inherit;
  z-index: 9;
}
.modal__header-text-box:not(.inactive):has(.nutritional-value.active) {
  z-index: 9;
}
.modal__header-text-box.inactive {
  z-index: 0;
}
.modal__pizza-size-list.inactive {
  z-index: -1;
}
.modal__pizza-size-box {
  margin-top: 20px;
}
.modal__img-box {
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal__close-btn {
  position: sticky;
  top: 0;
  right: 0;
  font-size: 30px;
  color: #333;
  transition: transform 0.3s ease-out;
}
.modal__close-btn:hover {
  transform: scale(1.1);
}
.modal__text-box {
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

.modal__pizza-topping-list {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
  margin: 10px 0;
  color: #555;
  font-size: 16px;
}
.modal__standard-toppings-box {
  border-bottom: 1px solid #999;
  padding-bottom: 20px;
}

.modal__extra-toppings-box,
.modal__standard-toppings-box {
  margin-top: 35px;
}
.modal__extra-toppings-header,
.modal__standard-toppings-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  cursor: pointer;
}

.modal__pizza-size-title,
.modal__extra-topppings-title,
.modal__standard-topppings-title {
  font-size: clamp(1.1rem, calc(1.5vw + 1rem), 1.2rem);
  color: #444;
  z-index: 1;
}
.modal__extra-toppings-btn,
.modal__standard-toppings-btn {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #999;
  color: #fff;
}
.modal__extra-toppings-list,
.modal__standard-toppings-list {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
}
.modal__extra-toppings-item,
.modal__standard-toppings-item {
  z-index: 1;
}
.modal__extra-toppings-item > *,
.modal__standard-toppings-item > * {
  color: #555;
  font-size: 16px;
}
.modal__pizza-price {
  font-weight: 600;
  font-size: clamp(1.2rem, calc(1.5vw + 1rem), 1.5rem);
  color: #333;
}

.nutritional-value {
  position: absolute;
  top: 40px;
  opacity: 0;
  right: -10px;
  z-index: -1;
  transform: translateX(300px);
  padding: 15px;
  width: 220px;
  background: rgb(55, 53, 53);
  color: #fff;
  border-radius: 10px;
  font-size: 13px;
  transition: all 0.3s ease-out;
}
.nutritional-value.active {
  opacity: 1;
  z-index: 1;
  transform: translateX(0px);
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

.modal__pizza-size-list {
  position: relative;
  display: flex;
  align-items: center;
  margin-top: 25px;
  border-radius: 30px;
  background: rgb(243, 243, 247);
  z-index: 0;
}
.modal__pizza-size-item {
  flex: 1;
  z-index: 2;
  text-align: center;
}
.modal__pizza-size-btn {
  display: block;
  width: 100%;
  padding: 8px 0;
  margin: 3px;
  z-index: 2;
  background: transparent;
  border-radius: inherit;
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

@media (min-width: 560px) {
  .modal {
    display: flex;
    overflow: visible;
  }
  .modal__close-btn {
    position: absolute;
    top: -45px;
    right: 0;
    color: #fff;
  }
}
@media (min-width: 992px) {
  .modal {
    width: 900px;
  }
  .modal__img-box {
    position: static;
  }
  .modal__close-btn {
    top: 0;
    right: -45px;
  }
}
</style>