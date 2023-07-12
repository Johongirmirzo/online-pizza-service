<template>
  {{ isModelOpen }}
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
          :src="pizzaData.photo"
          :alt="pizzaData.name"
          :title="pizzaData.name"
          ref="pizzaPhoto"
          class="modal__img"
        />
      </figure>
      <div class="modal__text-box">
        <header class="modal__header">
          <h2 class="modal__title">
            {{ pizzaData.name }} x {{ pizzaData.amount }}
          </h2>
        </header>
        <div class="modal__pizza-size-box">
          <h5 class="modal__pizza-size-title">Pizza Size</h5>
          <p class="modal__pizza-size-text">{{ pizzaData.size }}</p>
        </div>
        <div class="modal__pizza-size-box">
          <h5 class="modal__pizza-size-title">Pizza Slice Amount</h5>
          <p class="modal__pizza-size-text">
            {{ getPizzaSlice(pizzaData.sliceType.sliceType) }}
            - {{ pizzaData.sliceType.sliceAmount }} slices
          </p>
        </div>
        <div class="modal__pizza-size-box">
          <h5 class="modal__pizza-size-title">Pizza Crust</h5>
          <p class="modal__pizza-size-text">
            {{ getPizzaCrust(pizzaData.crustType.crustType) }} -
            {{ pizzaData.crustType.crustPrice }} uzs
          </p>
        </div>

        <div class="modal__pizza-size-box">
          <h5 class="modal__pizza-size-title">Pizza Edge</h5>
          <p v-if="pizzaData.edgeType.edgeType" class="modal__pizza-size-text">
            {{ getPizzaEdge(pizzaData.edgeType.edgeType) }} -
            {{ pizzaData.edgeType.edgePrice }} uzs
          </p>
          <p v-else class="modal__pizza-size-text">
            No pizza edge has been selected!
          </p>
        </div>
        <div class="modal__standard-toppings-box">
          <header class="modal__standard-toppings-header">
            <h5 class="modal__standard-topppings-title">Standard Toppings</h5>
          </header>

          <ul class="modal__standard-toppings-list">
            <li
              v-for="topping in pizzaData.standardToppings"
              :key="topping.id"
              class="modal__standard-toppings-item"
            >
              <p class="modal__topping-name-text">
                <span>
                  {{ topping.name }}
                </span>
                <span class="modal__topping-price-text">
                  {{
                    getToppingAmount(topping.id, "STANDARD")?.toppingAmount
                      ? `( ${
                          getToppingAmount(topping.id, "STANDARD")
                            ?.toppingAmount
                        } )`
                      : ""
                  }}
                </span>
              </p>
              <p
                class="modal__topping-price-text"
                v-if="getToppingAmount(topping.id, 'STANDARD')?.toppingPrice"
              >
                (
                {{ getToppingAmount(topping.id, "STANDARD")?.toppingPrice }}
                uzs )
              </p>
            </li>
          </ul>
        </div>
        <div class="modal__standard-toppings-box">
          <header class="modal__standard-toppings-header">
            <h5 class="modal__standard-topppings-title">Extra Toppings</h5>
          </header>

          <ul class="modal__standard-toppings-list">
            <li
              v-for="topping in pizzaData.extraToppings"
              :key="topping.id"
              class="modal__standard-toppings-item"
            >
              <p class="modal__topping-name-text">
                <span>
                  {{ topping.name }}
                </span>
                <span class="modal__topping-price-text">
                  {{
                    getToppingAmount(topping.id, "EXTRA")?.toppingAmount
                      ? `( ${
                          getToppingAmount(topping.id, "EXTRA")?.toppingAmount
                        } )`
                      : ""
                  }}
                </span>
              </p>
              <p
                class="modal__topping-price-text"
                v-if="getToppingAmount(topping.id, 'EXTRA')?.toppingPrice"
              >
                (
                {{ getToppingAmount(topping.id, "EXTRA")?.toppingPrice }}
                uzs )
              </p>
            </li>
          </ul>
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

const getToppingAmount = (toppingId: number, toppingType: string) => {
  const standardTopping = props.pizzaData.standardToppings.find(
    (top) => top.id === toppingId
  );
  const extraTopping = props.pizzaData.extraToppings.find(
    (top) => top.id === toppingId
  );

  if (toppingType === "STANDARD") {
    if (!standardTopping) return;
    const toppingAmount = standardTopping.toppingAmount;
    return toppingAmount === "Light"
      ? { toppingPrice: standardTopping.toppingPrice, toppingAmount: "LT" }
      : toppingAmount === "Extra"
      ? { toppingPrice: standardTopping.toppingPrice, toppingAmount: "EX" }
      : toppingAmount === "Double"
      ? { toppingPrice: standardTopping.toppingPrice, toppingAmount: "2X" }
      : "";
  } else {
    if (!extraTopping) return;
    const toppingAmount = extraTopping.toppingAmount;
    return toppingAmount === "Light"
      ? { toppingPrice: extraTopping.toppingPrice, toppingAmount: "LT" }
      : toppingAmount === "Extra"
      ? { toppingPrice: extraTopping.toppingPrice, toppingAmount: "EX" }
      : toppingAmount === "Double"
      ? { toppingPrice: extraTopping.toppingPrice, toppingAmount: "2X" }
      : { toppingPrice: extraTopping.toppingPrice, toppingAmount: "" };
  }
};

const openToppingModal = () => {
  isToppingModelOpen.value = true;
};
const closeToppingModal = () => {
  console.log("Closing");
  isToppingModelOpen.value = false;
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

const getPizzaSlice = (pizzaSlice: string) => {
  switch (pizzaSlice) {
    case "regularCut":
      return "Regular Cut";
    case "doubleCut":
      return "Double Cut";
    case "squareCut":
      return "Square Cut";
  }
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
  padding: 25px 30px 25px 30px;
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
.modal__header {
  padding-top: 25px;
  padding-bottom: 15px;
  border-bottom: 1px solid #999;
}

.modal__pizza-size-box {
  margin-top: 20px;
  padding-bottom: 15px;
  border-bottom: 1px solid #999;
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

.modal__topping-price-text {
  font-weight: 600;
}
.modal__pizza-size-text {
  font-weight: 600;
  color: #444;
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
  display: flex;
  align-items: center;
  gap: 5px;
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