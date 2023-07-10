<template>
  <div v-if="isToppingModelOpen && topping.name" class="modal-wrapper">
    <div
      class="modal"
      :class="{
        active: isToppingModelOpen && topping.name,
        closed: isModalClosed,
      }"
    >
      <button @click.stop="handleCloseModalClick" class="modal__close-btn">
        <Icon name="maki:cross" />
      </button>
      <div class="modal__body">
        <header class="modal__header">
          <h3 class="modal__title">
            {{ topping.name }}
            {{ topping.type }}
          </h3>
        </header>
        <div class="modal__text-box">
          <div
            @click="handleToppingModalClick('Light', topping.light)"
            class="modal__checkbox-box"
          >
            <PizzaCheckbox
              :isCheckingFromToppingModal="true"
              :isCheckingFromPizzaModel="false"
              :value="topping"
              :checked="
                currentTopping && currentTopping.toppingAmount === 'Light'
              "
            />
            <div class="modal__checkbox-text-box">
              <p class="modal__topping-type">Light</p>
              <p class="modal__topping-price">{{ topping.light }} sum</p>
            </div>
          </div>
          <div
            @click="handleToppingModalClick('Standard', topping.standard)"
            class="modal__checkbox-box"
          >
            <PizzaCheckbox
              :isCheckingFromToppingModal="true"
              :isCheckingFromPizzaModel="false"
              :value="topping"
              :checked="
                currentTopping && currentTopping.toppingAmount === 'Standard'
              "
            />
            <div class="modal__checkbox-text-box">
              <p class="modal__topping-type">Standard</p>
              <p class="modal__topping-price">{{ topping.standard }} sum</p>
            </div>
          </div>
          <div
            @click="handleToppingModalClick('Extra', topping.extra)"
            class="modal__checkbox-box"
          >
            <PizzaCheckbox
              :isCheckingFromToppingModal="true"
              :isCheckingFromPizzaModel="false"
              :value="topping"
              :checked="
                currentTopping && currentTopping.toppingAmount === 'Extra'
              "
            />
            <div class="modal__checkbox-text-box">
              <p class="modal__topping-type">Extra</p>
              <p class="modal__topping-price">{{ topping.extra }} sum</p>
            </div>
          </div>
          <div
            @click="handleToppingModalClick('Double', topping.double)"
            class="modal__checkbox-box"
          >
            <PizzaCheckbox
              :isCheckingFromToppingModal="true"
              :isCheckingFromPizzaModel="false"
              :value="topping"
              :checked="
                currentTopping && currentTopping.toppingAmount === 'Double'
              "
            />
            <div class="modal__checkbox-text-box">
              <p class="modal__topping-type">Double</p>
              <p class="modal__topping-price">{{ topping.double }} sum</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
  <script setup lang="ts">
const props = defineProps([
  "isToppingModelOpen",
  "topping",
  "closeToppingModal",
  "getSelectedStandardTopping",
  "getSelectedExtraTopping",
  "selectedStandardToppings",
  "selectedExtraToppings",
  "currentPizzaSize",
]);

const isModalClosed = ref(false);
const currentTopping = ref({});

const handleCloseModalClick = () => {
  isModalClosed.value = true;
  setTimeout(() => {
    props.closeToppingModal();
    isModalClosed.value = false;
  }, 350);
};

watchEffect(() => {
  if (props.topping.type === "STANDARD") {
    switch (props.topping.forPizzaSize) {
      case "SMALL":
        currentTopping.value = {
          ...props.selectedStandardToppings.smallToppings.filter(
            (topp) => topp.id === props.topping.id
          )[0],
        };
        break;
      case "MEDIUM":
        currentTopping.value = {
          ...props.selectedStandardToppings.mediumToppings.filter(
            (topp) => topp.id === props.topping.id
          )[0],
        };
        break;
      default:
        currentTopping.value = {
          ...props.selectedStandardToppings.largeToppings.filter(
            (topp) => topp.id === props.topping.id
          )[0],
        };
    }
  } else {
    switch (props.topping.forPizzaSize) {
      case "SMALL":
        currentTopping.value = {
          ...props.selectedExtraToppings.smallToppings.filter(
            (topp) => topp.id === props.topping.id
          )[0],
        };
        break;
      case "MEDIUM":
        currentTopping.value = {
          ...props.selectedExtraToppings.mediumToppings.filter(
            (topp) => topp.id === props.topping.id
          )[0],
        };
        break;
      default:
        currentTopping.value = {
          ...props.selectedExtraToppings.largeToppings.filter(
            (topp) => topp.id === props.topping.id
          )[0],
        };
    }
  }
});

const handleToppingModalClick = (
  toppingAmount: string,
  toppingPrice: number
) => {
  const selectedTopping = {
    id: props.topping.id,
    type: props.topping.type,
    name: props.topping.name,
    toppingAmount,
    toppingPrice,
  };
  if (props.topping.type === "STANDARD") {
    props.getSelectedStandardTopping(selectedTopping);
  } else {
    props.getSelectedExtraTopping(selectedTopping);
  }
  handleCloseModalClick();
};
</script>
  <style scoped>
.modal-wrapper {
  position: fixed;
  inset: 0;
  display: grid;
  place-content: center;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1;
}

.modal {
  position: relative;
  border-radius: 20px;
  background: #fff;
}
.modal__header {
  text-align: center;
  margin-bottom: 15px;
}
.modal__title {
  font-size: clamp(1.2rem, calc(1.5vw + 1rem), 1.5rem);
  font-weight: 600;
  color: #333;
}
.modal__body {
  padding: 25px;
}
.modal__text-box {
  display: grid;
  grid-template-columns: 1fr 1fr;
  justify-content: space-between;
  gap: 15px;
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
.modal__checkbox-box {
  display: flex;
  align-items: center;
  gap: 20px;
  cursor: pointer;
}

.modal__topping-type {
  font-weight: 600;
  color: #333;
  font-size: 16px;
}
.modal__topping-price {
  font-size: 12px;
}
.modal__close-btn {
  position: absolute;
  top: -50px;
  right: 0;
  font-size: 30px;
  color: #fff;
  transition: transform 0.3s ease-out;
}
.modal__close-btn:hover {
  transform: scale(1.1);
}

@media (min-width: 768px) {
  .modal {
    width: 280px;
  }
  .modal__close-btn {
    top: 0;
    right: -45px;
  }
}
</style>