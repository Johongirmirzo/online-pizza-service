<template>
  <div v-if="isModelOpen && pizzaData.name" class="modal-wrapper">
    <ToppingModal
      v-if="isToppingModelOpen"
      :isToppingModelOpen="isToppingModelOpen"
      :topping="activeTopping"
      :closeToppingModal="closeModal"
      :getSelectedStandardTopping="getSelectedStandardTopping"
      :getSelectedExtraTopping="getSelectedExtraTopping"
      :selectedStandardToppings="selectedStandardToppings"
      :selectedExtraToppings="selectedExtraToppings"
      :currentPizzaSize="currentPizzaSize"
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

          <div class="modal__cart-btn-box">
            <div class="modal__btns-box" v-if="pizzaData.status === 'ACTIVE'">
              <button
                @click="decrementPizzaAmount"
                class="modal__btn modal__decrement-item-btn"
                :class="{ active: pizzaAmount > 1 }"
              >
                -
              </button>
              <span class="modal__item">{{ pizzaAmount }}</span>
              <button
                @click="incrementPizzaAmount"
                class="modal__btn modal__increment-item-btn"
              >
                +
              </button>
            </div>
            <strong class="modal__price-text">
              {{ pizzaTotalPrice }} uzs
            </strong>
            <button
              @click="handleAddToCartClick"
              class="modal__add-to-cart-btn"
              :disabled="pizzaData.status !== 'ACTIVE'"
            >
              <span v-if="pizzaData.status !== 'ACTIVE'">TO BE LATER</span>
              <span v-else> ADD TO CART </span>
            </button>
          </div>
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
                :key="idx"
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
          <div class="modal__pizza-size-box">
            <h5 class="modal__pizza-size-title">Select Pizza Slice</h5>
            <ul
              class="modal__pizza-size-list"
              ref="btnSliceBoxSize"
              :class="{ inactive: isToppingModelOpen }"
            >
              <li
                v-for="(pizzaSlice, idx) in getSortedSlices(
                  Object.entries(
                    pizzaData.pizzaSizes[pizzaPieceIndex].slices[0]
                  )
                )"
                :key="idx"
                class="modal__pizza-size-item"
              >
                <button
                  class="modal__pizza-size-btn"
                  @click="handleChangePizzaSlice(idx)"
                  :class="{ active: idx === currentSliceIndex }"
                >
                  {{ getPizzaSlice(pizzaSlice[0]) }}

                  <p>{{ pizzaSlice[1] }}</p>
                </button>
              </li>
              <span ref="spanElSlice" class="modal__btn-wrapper-text"> </span>
            </ul>
          </div>
          <div class="modal__pizza-size-box modal__pizza-crust-box">
            <h5 class="modal__pizza-size-title">Select Pizza Crusts</h5>
            <ul
              class="modal__pizza-size-list modal__pizza-crust-list"
              ref="btnCrustBoxSize"
              :class="{ inactive: isToppingModelOpen }"
            >
              <li
                v-for="(pizzaCrust, idx) in getSortedCrusts(
                  Object.entries(
                    pizzaData.pizzaSizes[pizzaPieceIndex].crusts[0]
                  )
                )"
                :key="idx"
                class="modal__pizza-size-item"
              >
                <button
                  class="modal__pizza-size-btn"
                  @click="handleChangePizzaCrust(idx)"
                  :class="{ active: idx === currentPizzaCrustIndex }"
                >
                  {{ getPizzaCrust(pizzaCrust[0]) }}

                  <p>{{ pizzaCrust[1] }}</p>
                </button>
              </li>
              <span ref="spanElCrust" class="modal__btn-wrapper-text"> </span>
            </ul>
          </div>
          <div
            class="modal__pizza-size-box modal__pizza-edge-box"
            :class="{ active: currentPizzaCrust.crustType === 'classicCrust' }"
          >
            <h5
              class="modal__pizza-size-title"
              v-if="currentPizzaCrust.crustType === 'classicCrust'"
            >
              Select Pizza Edges
            </h5>
            <ul
              class="modal__pizza-size-list modal__pizza-crust-list"
              ref="btnEdgeBoxSize"
              :class="{ inactive: isToppingModelOpen }"
            >
              <li
                v-for="(pizzaEdge, idx) in Object.entries(
                  pizzaData.pizzaSizes[pizzaPieceIndex].edges[0]
                )"
                :key="idx"
                class="modal__pizza-size-item"
              >
                <button
                  v-if="currentPizzaCrust.crustType === 'classicCrust'"
                  class="modal__pizza-size-btn"
                  @click="handleChangePizzaEdge(idx)"
                  :class="{ active: idx === currentPizzaEdgeIndex }"
                >
                  {{ getPizzaEdge(pizzaEdge[0]) }}

                  <p>{{ pizzaEdge[1] }}</p>
                </button>
              </li>
              <span ref="spanElEdge" class="modal__btn-wrapper-text"> </span>
            </ul>
          </div>
          <div class="modal__standard-toppings-box">
            <header
              @click="toggleStandardTopping"
              class="modal__standard-toppings-header"
            >
              <h5 class="modal__standard-topppings-title">Standard Toppings</h5>
              <button
                class="modal__topping-toggle-btn modal__standard-toppings-toggle-btn"
                :class="{ active: isStandardToppingToggled }"
              >
                <Icon class="modal__topping-icon" name="ci:chevron-up" />
              </button>
            </header>
            <ul
              v-if="
                selectedStandardToppings[
                  `${currentPizzaSize.toLowerCase()}Toppings`
                ].length
              "
              class="modal__standard-toppings-list"
              :class="{ hide: isStandardToppingToggled }"
            >
              <li
                v-for="topping in pizzaData.pizzaSizes[pizzaPieceIndex]
                  .standardToppings"
                :key="topping.id"
                class="modal__standard-toppings-item"
              >
                <div @click="getTopping(topping)" class="modal__checkbox-box">
                  <PizzaCheckbox
                    :id="topping.id"
                    :isCheckingFromPizzaModal="true"
                    :isCheckingFromToppingModal="false"
                    :value="topping"
                    :checked="
                      selectedStandardToppings[
                        `${currentPizzaSize.toLowerCase()}Toppings`
                      ].filter((top) => top.id === topping.id).length === 1
                    "
                  />

                  <div class="modal__checkbox-text-box">
                    <button class="modal__topping-btn">
                      <p class="modal__topping-name-text">
                        <span>
                          {{ topping.name }}
                        </span>
                        <span class="modal__topping-amount-text">
                          {{
                            getToppingAmount(topping.id, "STANDARD")
                              ?.toppingAmount
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
                        v-if="
                          getToppingAmount(topping.id, 'STANDARD')?.toppingPrice
                        "
                      >
                        (
                        {{
                          getToppingAmount(topping.id, "STANDARD")?.toppingPrice
                        }}
                        uzs )
                      </p>
                    </button>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <div class="modal__extra-toppings-box">
            <header
              @click="toggleExtraTopping"
              class="modal__extra-toppings-header"
            >
              <h5 class="modal__extra-topppings-title">Extra Toppings</h5>
              <button
                class="modal__topping-toggle-btn modal__extra-toppings-toggle-btn"
                :class="{ active: isExtraToppingToggled }"
              >
                <Icon class="modal__topping-icon" name="ci:chevron-up" />
              </button>
            </header>
            <ul
              class="modal__extra-toppings-list"
              :class="{ hide: isExtraToppingToggled }"
            >
              <li
                v-for="topping in pizzaData.pizzaSizes[pizzaPieceIndex]
                  .extraToppings"
                :key="topping.id"
                class="modal__extra-toppings-item"
              >
                <div @click="getTopping(topping)" class="modal__checkbox-box">
                  <PizzaCheckbox
                    :id="topping.id"
                    :isCheckingFromPizzaModal="true"
                    :isCheckingFromToppingModal="false"
                    :value="topping"
                    :checked="
                      selectedExtraToppings[
                        `${currentPizzaSize.toLowerCase()}Toppings`
                      ].filter((top) => top.id === topping.id).length === 1
                    "
                  />
                  <div class="modal__checkbox-text-box">
                    <button class="modal__topping-btn">
                      <p class="modal__topping-name-text">
                        <span>
                          {{ topping.name }}
                        </span>
                        <span class="modal__topping-amount-text">
                          {{
                            getToppingAmount(topping.id, "EXTRA")?.toppingAmount
                              ? `( ${
                                  getToppingAmount(topping.id, "EXTRA")
                                    ?.toppingAmount
                                } )`
                              : ""
                          }}
                        </span>
                      </p>
                      <p
                        class="modal__topping-price-text"
                        v-if="
                          getToppingAmount(topping.id, 'EXTRA')?.toppingPrice
                        "
                      >
                        (
                        {{
                          getToppingAmount(topping.id, "EXTRA")?.toppingPrice
                        }}
                        uzs )
                      </p>
                    </button>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { v4 as uuid } from "uuid";
import { useCartStore } from "~/stores/useCartStore";
const props = defineProps(["pizzaData", "isModelOpen", "closeModal"]);

const pizzaPieceIndex = ref(0);
const isNutrionalValueBoxOpen = ref(false);
const isModalClosed = ref(false);
const pizzaAmount = ref(1);
const pizzaTotalPrice = ref(
  props.pizzaData.pizzaSizes[pizzaPieceIndex.value].price
);
const cartStore = useCartStore();

const boxWidth = ref(0);
const sliceBoxWidth = ref(0);
const crustBoxWidth = ref(0);
const edgeBoxWidth = ref(0);
const previousIndex = ref(0);
const currentIndex = ref(0);
const currentSliceIndex = ref(0);
const currentPizzaCrustIndex = ref(0);
const currentPizzaEdgeIndex = ref(0);
const spanEl = ref<HTMLElement>();
const spanElSlice = ref<HTMLElement>();
const spanElCrust = ref<HTMLElement>();
const spanElEdge = ref<HTMLElement>();
const btnBoxSize = ref<HTMLElement>();
const btnSliceBoxSize = ref<HTMLElement>();
const btnCrustBoxSize = ref<HTMLElement>();
const btnEdgeBoxSize = ref<HTMLElement>();

const { $toast } = useNuxtApp();

const selectedStandardToppings = ref({
  smallToppings: [],
  mediumToppings: [],
  largeToppings: [],
});
const selectedExtraToppings = ref({
  smallToppings: [],
  mediumToppings: [],
  largeToppings: [],
});

const activeTopping = ref({});
const isStandardToppingToggled = ref(false);
const isExtraToppingToggled = ref(false);

const { isModalOpen: isToppingModelOpen, closeModal, openModal } = useModal();

const toggleNutrionalValueBox = () => {
  isNutrionalValueBoxOpen.value = !isNutrionalValueBoxOpen.value;
};

const toggleStandardTopping = () => {
  isStandardToppingToggled.value = !isStandardToppingToggled.value;
};
const toggleExtraTopping = () => {
  isExtraToppingToggled.value = !isExtraToppingToggled.value;
};

const getToppingAmount = (toppingId: number, toppingType: string) => {
  const standardTopping = selectedStandardToppings.value[
    currentPizzaSizeLowerCasedToppings.value
  ].find((top) => top.id === toppingId);
  const extraTopping = selectedExtraToppings.value[
    currentPizzaSizeLowerCasedToppings.value
  ].find((top) => top.id === toppingId);

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

onMounted(() => {
  let toppingData;
  props.pizzaData.pizzaSizes.forEach((pizzaSize) =>
    pizzaSize.standardToppings.forEach((topp) => {
      toppingData = {
        id: topp.id,
        type: topp.type,
        name: topp.name,
        toppingAmount: "Standard",
        toppingPrice: 0,
      };
      switch (topp.forPizzaSize) {
        case "SMALL":
          selectedStandardToppings.value.smallToppings.push(toppingData);
          break;
        case "MEDIUM":
          selectedStandardToppings.value.mediumToppings.push(toppingData);
          break;
        default:
          selectedStandardToppings.value.largeToppings.push(toppingData);
      }
    })
  );
});

const getSelectedStandardTopping = (topping: any) => {
  const pizzaSize = currentPizzaSize.value;
  let index = -1;
  let isThereDuplicateStanTopping;
  if (pizzaSize === "SMALL") {
    isThereDuplicateStanTopping =
      selectedStandardToppings.value.smallToppings.find(
        (topp) => topp.id === topping.id
      );
    if (!isThereDuplicateStanTopping) {
      selectedStandardToppings.value.smallToppings.push(topping);
    } else {
      selectedStandardToppings.value.smallToppings =
        selectedStandardToppings.value.smallToppings.map((topp, idx) => {
          if (
            topp.id === topping.id &&
            topping.type === topp.type &&
            topp.toppingAmount === topping.toppingAmount
          ) {
            index = idx;
          }
          if (topp.id === topping.id) {
            return topping;
          }
          return topp;
        });
      if (index > -1) {
        selectedStandardToppings.value.smallToppings.splice(index, 1);
      }
    }
  } else if (pizzaSize === "MEDIUM") {
    isThereDuplicateStanTopping =
      selectedStandardToppings.value.mediumToppings.find(
        (topp) => topp.id === topping.id
      );
    if (!isThereDuplicateStanTopping) {
      selectedStandardToppings.value.mediumToppings.push(topping);
    } else {
      selectedStandardToppings.value.mediumToppings =
        selectedStandardToppings.value.mediumToppings.map((topp, idx) => {
          if (
            topp.id === topping.id &&
            topping.type === topp.type &&
            topp.toppingAmount === topping.toppingAmount
          ) {
            index = idx;
          }
          if (topp.id === topping.id) {
            return topping;
          }
          return topp;
        });
      if (index > -1) {
        selectedStandardToppings.value.mediumToppings.splice(index, 1);
      }
    }
  } else {
    isThereDuplicateStanTopping =
      selectedStandardToppings.value.largeToppings.find(
        (topp) => topp.id === topping.id
      );
    if (!isThereDuplicateStanTopping) {
      selectedStandardToppings.value.largeToppings.push(topping);
    } else {
      selectedStandardToppings.value.largeToppings =
        selectedStandardToppings.value.largeToppings.map((topp, idx) => {
          if (
            topp.id === topping.id &&
            topping.type === topp.type &&
            topp.toppingAmount === topping.toppingAmount
          ) {
            index = idx;
          }
          if (topp.id === topping.id) {
            return topping;
          }
          return topp;
        });
      if (index > -1) {
        selectedStandardToppings.value.largeToppings.splice(index, 1);
      }
    }
  }
};
const getSelectedExtraTopping = (topping: any) => {
  const pizzaSize = props.pizzaData.pizzaSizes[pizzaPieceIndex.value].size;

  let index = -1;
  let isThereDuplicateStanTopping;
  if (pizzaSize === "SMALL") {
    isThereDuplicateStanTopping =
      selectedExtraToppings.value.smallToppings.find(
        (topp) => topp.id === topping.id
      );
    if (!isThereDuplicateStanTopping) {
      if (selectedExtraToppings.value.smallToppings.length > 5) {
        return $toast.error("Maximum allowed extra toppings are 6");
      }
      selectedExtraToppings.value.smallToppings.push(topping);
    } else {
      selectedExtraToppings.value.smallToppings =
        selectedExtraToppings.value.smallToppings.map((topp, idx) => {
          if (
            topp.id === topping.id &&
            topping.type === topp.type &&
            topp.toppingAmount === topping.toppingAmount
          ) {
            index = idx;
          }
          if (topp.id === topping.id) {
            return topping;
          }
          return topp;
        });
      if (index > -1) {
        selectedExtraToppings.value.smallToppings.splice(index, 1);
      }
    }
  } else if (pizzaSize === "MEDIUM") {
    isThereDuplicateStanTopping =
      selectedExtraToppings.value.mediumToppings.find(
        (topp) => topp.id === topping.id
      );
    if (!isThereDuplicateStanTopping) {
      if (selectedExtraToppings.value.mediumToppings.length > 5) {
        return $toast.error("Maximum allowed extra toppings are 6");
      }
      selectedExtraToppings.value.mediumToppings.push(topping);
    } else {
      selectedExtraToppings.value.mediumToppings =
        selectedExtraToppings.value.mediumToppings.map((topp, idx) => {
          if (
            topp.id === topping.id &&
            topping.type === topp.type &&
            topp.toppingAmount === topping.toppingAmount
          ) {
            index = idx;
          }
          if (topp.id === topping.id) {
            return topping;
          }
          return topp;
        });
      if (index > -1) {
        selectedExtraToppings.value.mediumToppings.splice(index, 1);
      }
    }
  } else {
    isThereDuplicateStanTopping =
      selectedExtraToppings.value.largeToppings.find(
        (topp) => topp.id === topping.id
      );
    if (!isThereDuplicateStanTopping) {
      if (selectedExtraToppings.value.largeToppings.length > 5) {
        return $toast.error("Maximum allowed extra toppings are 6");
      }
      selectedExtraToppings.value.largeToppings.push(topping);
    } else {
      selectedExtraToppings.value.largeToppings =
        selectedExtraToppings.value.largeToppings.map((topp, idx) => {
          if (
            topp.id === topping.id &&
            topping.type === topp.type &&
            topp.toppingAmount === topping.toppingAmount
          ) {
            index = idx;
          }
          if (topp.id === topping.id) {
            return topping;
          }
          return topp;
        });
      if (index > -1) {
        selectedExtraToppings.value.largeToppings.splice(index, 1);
      }
    }
  }
};

const getTopping = (topping: any) => {
  openModal();
  activeTopping.value = topping;
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
const getSortedSlices = (slices: any) => {
  return slices.sort((left, right) => {
    if (
      (left[0] === "squareCut" && right[0] === "doubleCut") ||
      (left[0] === "squareCut" && right[0] === "regularCut") ||
      (left[0] === "doubleCut" && right[0] === "regularCut")
    ) {
      return 1;
    } else {
      return -1;
    }
  });
};
const getSortedCrusts = (crusts: any) => {
  return crusts.sort((left, right) => {
    if (
      ((left[0] === "duplexCrustCheddar" ||
        left[0] === "duplexCrustMozarella") &&
        right[0] === "classicCrust") ||
      ((left[0] === "duplexCrustCheddar" ||
        left[0] === "duplexCrustMozarella") &&
        right[0] === "thinCrust") ||
      ((left[0] === "duplexCrustCheddar" ||
        left[0] === "duplexCrustMozarella") &&
        right[0] === "thinnestCrust") ||
      (left[0] === "thinnestCrust" && right[0] === "thinCrust") ||
      (left[0] === "thinnestCrust" && right[0] === "classicCrust") ||
      (left[0] === "thinCrust" && right[0] === "classicCrust")
    ) {
      return 1;
    } else {
      return -1;
    }
  });
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
  pizzaPieceIndex.value = 0;
  if (props.isModelOpen) {
    isModalClosed.value = false;
  }
});

const currentPizzaCrust = computed(() => {
  const pizzaCrust = getSortedCrusts(
    Object.entries(props.pizzaData.pizzaSizes[pizzaPieceIndex.value].crusts[0])
  )[currentPizzaCrustIndex.value];

  return {
    crustType: pizzaCrust[0],
    crustPrice: pizzaCrust[1],
    crustIndex: currentPizzaCrustIndex.value,
  };
});

const currentPizzaSlice = computed(() => {
  const pizzaSlice = getSortedSlices(
    Object.entries(props.pizzaData.pizzaSizes[pizzaPieceIndex.value].slices[0])
  )[currentSliceIndex.value];
  return {
    sliceType: pizzaSlice[0],
    sliceAmount: pizzaSlice[1],
    sliceIndex: currentSliceIndex.value,
  };
});
const currentPizzaEdge = computed(() => {
  if (currentPizzaCrust.value.crustType !== "classicCrust") {
    return {
      edgeType: "",
      edgePrice: 0,
      edgeIndex: currentPizzaEdgeIndex.value,
    };
  }
  const pizzaEdge = Object.entries(
    props.pizzaData.pizzaSizes[pizzaPieceIndex.value].edges[0]
  )[currentPizzaEdgeIndex.value];
  return {
    edgeType: pizzaEdge[0],
    edgePrice: pizzaEdge[1],
    edgeIndex: currentPizzaEdgeIndex.value,
  };
});

const handleChangePizzaSlice = (pizzaSliceIndex: number) => {
  currentSliceIndex.value = pizzaSliceIndex;
};
const handleChangePizzaCrust = (pizzaCrustIndex: number) => {
  currentPizzaCrustIndex.value = pizzaCrustIndex;
};
const handleChangePizzaEdge = (pizzaEdgeIndex: number) => {
  currentPizzaEdgeIndex.value = pizzaEdgeIndex;
};

const handleCloseModalClick = () => {
  isModalClosed.value = true;
  isNutrionalValueBoxOpen.value = false;

  setTimeout(() => {
    props.closeModal();
  }, 400);
};

const currentPizzaSize = computed(
  () => props.pizzaData.pizzaSizes[pizzaPieceIndex.value].size
);

const currentPizzaSizeLowerCasedToppings = computed(
  () => `${currentPizzaSize.value.toLowerCase()}Toppings`
);
const standardToppingsTotalPrice = computed(() =>
  selectedStandardToppings.value[
    currentPizzaSizeLowerCasedToppings.value
  ].reduce((total, currEl) => total + currEl.toppingPrice, 0)
);
const extraToppingsTotalPrice = computed(() =>
  selectedExtraToppings.value[currentPizzaSizeLowerCasedToppings.value].reduce(
    (total, currEl) => total + currEl.toppingPrice,
    0
  )
);

const incrementPizzaAmount = () => {
  if (
    pizzaTotalPrice.value +
      +props.pizzaData.pizzaSizes[pizzaPieceIndex.value].price +
      standardToppingsTotalPrice.value +
      Number(currentPizzaCrust.value.crustPrice) +
      Number(currentPizzaEdge.value.edgePrice) +
      extraToppingsTotalPrice.value >
    1200000
  ) {
    return $toast.error(
      "You're reached limit! Maximum amount allowed to order is 1.2 million"
    );
  }
  pizzaAmount.value += 1;
  pizzaTotalPrice.value =
    +props.pizzaData.pizzaSizes[pizzaPieceIndex.value].price +
    standardToppingsTotalPrice.value +
    Number(currentPizzaCrust.value.crustPrice) +
    Number(currentPizzaEdge.value.edgePrice) +
    extraToppingsTotalPrice.value;
};
const decrementPizzaAmount = () => {
  if (pizzaAmount.value > 1) {
    pizzaAmount.value -= 1;
    pizzaTotalPrice.value =
      pizzaAmount.value *
      (+props.pizzaData.pizzaSizes[pizzaPieceIndex.value].price +
        Number(currentPizzaCrust.value.crustPrice) +
        Number(currentPizzaEdge.value.edgePrice) +
        standardToppingsTotalPrice.value +
        extraToppingsTotalPrice.value);
  }
};

const isItemActive = () => props.pizzaData.status === "ACTIVE";

const handleAddToCartClick = () => {
  if (!isItemActive()) return;

  const cartItem = {
    id: props.pizzaData.id,
    itemType: "Pizza",
    type: "Pizza",
    activeIndex: pizzaPieceIndex.value,
    isEditable: true,
    itemId: uuid(),
    photo: props.pizzaData.pizzaSizes[pizzaPieceIndex.value].photo,
    name: props.pizzaData.name,
    total: pizzaTotalPrice.value,
    vegan: props.pizzaData.vegan,
    amount: pizzaAmount.value,
    size: props.pizzaData.pizzaSizes[pizzaPieceIndex.value].size,
    sliceType: currentPizzaSlice.value,
    edgeType: currentPizzaEdge.value,
    crustType: currentPizzaCrust.value,
    standardToppings:
      selectedStandardToppings.value[currentPizzaSizeLowerCasedToppings.value],
    extraToppings:
      selectedExtraToppings.value[currentPizzaSizeLowerCasedToppings.value],
  };

  if (cartStore.calculateTotal() + cartItem.total > 1200000) {
    return $toast.error(
      "You're reached limit! Maximum amount allowed to order is 1.2 million"
    );
  } else {
    $toast.success("Pizza is added to cart!");
    cartStore.addCartItem({ ...cartItem });
    handleCloseModalClick();
  }
};

watchEffect(() => {
  if (
    Number(pizzaTotalPrice.value) +
      standardToppingsTotalPrice.value +
      extraToppingsTotalPrice.value +
      Number(currentPizzaCrust.value.crustPrice) +
      Number(currentPizzaEdge.value.edgePrice) +
      Number(props.pizzaData.pizzaSizes[pizzaPieceIndex.value].price) >
    1200000
  ) {
    return;
  }
  pizzaTotalPrice.value =
    pizzaAmount.value *
    (+props.pizzaData.pizzaSizes[pizzaPieceIndex.value].price +
      Number(currentPizzaCrust.value.crustPrice) +
      Number(currentPizzaEdge.value.edgePrice) +
      standardToppingsTotalPrice.value +
      extraToppingsTotalPrice.value);
});

watchEffect(() => {
  if (
    btnBoxSize.value &&
    spanEl.value &&
    btnSliceBoxSize.value &&
    spanElSlice.value &&
    btnCrustBoxSize.value &&
    spanElCrust.value &&
    btnEdgeBoxSize.value &&
    spanElEdge.value
  ) {
    boxWidth.value = btnBoxSize.value.clientWidth;
    sliceBoxWidth.value = btnSliceBoxSize.value.clientWidth;
    crustBoxWidth.value = btnCrustBoxSize.value.clientWidth;
    edgeBoxWidth.value = btnEdgeBoxSize.value.clientWidth;
    const boxElWidth = boxWidth.value;
    const boxSliceWidth = sliceBoxWidth.value;
    const boxCrustWidth = crustBoxWidth.value;
    const boxEdgeWidth = edgeBoxWidth.value;

    spanEl.value.style = `transform: translateX(${
      Math.floor(boxElWidth / props.pizzaData.pizzaSizes.length) *
      currentIndex.value
    }px); background: #fff; width: ${Math.floor(
      boxWidth.value / props.pizzaData.pizzaSizes.length
    )}px`;

    spanElSlice.value.style = `transform: translateX(${
      Math.floor(
        boxSliceWidth /
          Object.entries(
            props.pizzaData.pizzaSizes[pizzaPieceIndex.value].slices[0]
          ).length
      ) * currentSliceIndex.value
    }px); background: #fff; width: ${Math.floor(
      sliceBoxWidth.value /
        Object.entries(
          props.pizzaData.pizzaSizes[pizzaPieceIndex.value].slices[0]
        ).length
    )}px`;

    spanElCrust.value.style = `transform: translateX(${
      Math.floor(
        boxCrustWidth /
          Object.entries(
            props.pizzaData.pizzaSizes[pizzaPieceIndex.value].crusts[0]
          ).length
      ) * currentPizzaCrustIndex.value
    }px); background: #fff; width: ${Math.floor(
      crustBoxWidth.value /
        Object.entries(
          props.pizzaData.pizzaSizes[pizzaPieceIndex.value].crusts[0]
        ).length
    )}px`;

    spanElEdge.value.style = `transform: translateX(${
      Math.floor(
        boxEdgeWidth /
          Object.entries(
            props.pizzaData.pizzaSizes[pizzaPieceIndex.value].edges[0]
          ).length
      ) * currentPizzaEdgeIndex.value
    }px); background: #fff; width: ${Math.floor(
      crustBoxWidth.value /
        Object.entries(
          props.pizzaData.pizzaSizes[pizzaPieceIndex.value].edges[0]
        ).length
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
  width: 95%;
  height: 600px;
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
  z-index: 9;
}
.modal__pizza-size-list.inactive {
  z-index: -1;
}
.modal__pizza-size-box {
  margin-top: 20px;
}
.modal__pizza-crust-box {
  overflow-x: auto;
}
.modal__pizza-edge-box {
  overflow-x: hidden;
}
.modal__pizza-edge-box.active {
  overflow-x: scroll;
}
.modal__pizza-edge-box::-webkit-scrollbar,
.modal__pizza-crust-box::-webkit-scrollbar {
  height: 5px;
  width: 5px;
}
.modal__pizza-edge-box::-webkit-scrollbar-track,
.modal__pizza-crust-box::-webkit-scrollbar-track {
  background: transparent;
}
.modal__pizza-edge-box::-webkit-scrollbar-thumb,
.modal__pizza-crust-box::-webkit-scrollbar-thumb {
  background: #aeaeae;
}
.modal__pizza-crust-list {
  width: 200%;
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
  z-index: 9999;
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
  z-index: 9;
}
.modal__extra-toppings-header,
.modal__standard-toppings-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 25px;
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
  transition: all 0.3s ease-out;
}
.modal__extra-toppings-list.hide,
.modal__standard-toppings-list.hide {
  overflow: hidden;
  height: 0;
}

.modal__extra-toppings-item,
.modal__standard-toppings-item {
  z-index: 1;
}
.modal__extra-toppings-item > *,
.modal__standard-toppings-item > * {
  font-size: 16px;
}

.modal__extra-toppings-list,
.modal__standard-toppings-list {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
}
.modal__topping-btn {
  color: #555;
}
.modal__topping-amount-text {
  margin: 5px 0;
  font-weight: 600;
  font-size: 16px;
}
.modal__topping-price-text {
  font-weight: 600;
}
.modal__checkbox-box {
  display: flex;
  align-items: center;
  gap: 20px;
  font-size: 16px;
  color: #555;
  cursor: pointer;
}

.modal__topping-toggle-btn {
  width: 23px;
  height: 23px;
  border-radius: 50%;
  background: #c8c8c8;
  font-weight: 600;
  transition: transform 0.3s ease-out;
}
.modal__standard-toppings-toggle-btn.active,
.modal__extra-toppings-toggle-btn.active {
  transform: rotate(180deg);
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
}

.modal__btns-box {
  display: flex;
  align-items: center;
  width: 120px;
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
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  cursor: auto;
}
.modal__decrement-item-btn.active,
.modal__increment-item-btn {
  background: #fc8019;
  cursor: pointer;
}

.modal__add-to-cart-btn,
.modal__decrement-item-btn.active,
.modal__increment-item-btn {
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.3);
  transition: box-shadow 0.3s ease-out;
}
.modal__add-to-cart-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
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
  padding: 10px 5px;
  background: #fc8019;
  color: #fff;
  font-size: 13px;
  font-weight: 600;
  border-radius: 5px;
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

@media (min-width: 810px) {
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
  .modal__img-box {
    width: 45%;
  }
  .modal__text-box {
    width: 55%;
  }
  .modal__price-text {
    font-size: clamp(1.1rem, calc(1.5vw + 1rem), 1.5rem);
  }
  .modal__add-to-cart-btn {
    padding: 15px 10px;
    font-size: 14px;
  }

  .modal__btns-box > * {
    width: 40px;
    height: 40px;
  }
}
</style>