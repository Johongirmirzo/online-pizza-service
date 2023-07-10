<template>
  <div v-if="isModelOpen && menuData.name" class="modal-wrapper">
    <div
      class="modal"
      :class="{ active: isModelOpen && menuData.name, closed: isModalClosed }"
    >
      <button @click.stop="handleCloseModalClick" class="modal__close-btn">
        <Icon name="maki:cross" />
      </button>
      <figure class="modal__img-box">
        <img
          :src="menuData.pieces[menuItemPieceIndex]?.photo"
          :alt="menuData.name"
          :title="menuData.name"
          class="modal__img"
          :class="[
            isMenuPiecePhotoSmaller
              ? 'modal__img--smaller'
              : 'modal__img--bigger',
            currentMenuPieceSize === 'SMALL'
              ? 'modal__img--small'
              : currentMenuPieceSize === 'MEDIUM'
              ? 'modal__img--medium'
              : 'modal__img--large',
          ]"
        />
      </figure>
      <div class="modal__text-box">
        <div class="modal__top-text">
          <header class="modal__header">
            <h2 class="modal__title">
              {{ menuData.name }}
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
                      {{ menuData.pieces[menuItemPieceIndex]?.weight }} g
                    </p>
                  </li>
                </ul>
              </div>
            </div>
          </header>
          <p v-if="menuData.pieces.length > 1" class="modal__description">
            {{ menuData.description }}
          </p>
          <div>
            <div
              v-if="menuData?.pieces?.length > 1"
              class="modal__menu-size-btns-box"
              ref="btnBoxSize"
            >
              <button
                v-for="(piece, idx) in menuData.pieces"
                :key="piece.id"
                :class="{ active: menuItemPieceIndex === idx }"
                @click="handleChangeMenuBtn(idx)"
                class="modal__menu-change-size-btn"
              >
                {{ piece.amount }}
              </button>
              <span ref="spanEl" class="modal__btn-wrapper-text"> </span>
            </div>
            <div v-else>
              <p class="modal__menu-item-piece-amount">
                {{ menuData?.pieces[0]?.amount }}
              </p>
              <p v-if="menuData.pieces.length < 2" class="modal__description">
                {{ menuData.description }}
              </p>
            </div>
          </div>
        </div>
        <footer class="modal__bottom-text">
          <p class="modal__price-text">
            {{ menuData.pieces[menuItemPieceIndex]?.price }} sum
          </p>
        </footer>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
const props = defineProps(["menuData", "isModelOpen", "closeModal"]);

const menuItemPieceIndex = ref(0);
const isNutrionalValueBoxOpen = ref(false);
const isModalClosed = ref(false);
const previousIndex = ref(0);
const currentIndex = ref(0);
const boxWidth = ref(0);
const spanEl = ref<HTMLElement>();
const btnBoxSize = ref<HTMLElement>();

const toggleNutrionalValueBox = () => {
  isNutrionalValueBoxOpen.value = !isNutrionalValueBoxOpen.value;
};

const currentMenuPieceSize = computed(
  () => props.menuData.pieces[menuItemPieceIndex.value].size
);
const isMenuPiecePhotoSmaller = computed(() => {
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

watchEffect(() => {
  if (btnBoxSize.value && spanEl.value) {
    boxWidth.value = btnBoxSize.value.clientWidth;
    const boxElWidth = boxWidth.value;

    spanEl.value.style = `transform: translateX(${
      Math.floor(boxElWidth / props.menuData.pieces.length) * currentIndex.value
    }px); background: #fff; width: ${Math.floor(
      boxWidth.value / props.menuData.pieces.length
    )}px`;
  }
});

const handleCloseModalClick = () => {
  isModalClosed.value = true;
  isNutrionalValueBoxOpen.value = false;
  setTimeout(() => {
    props.closeModal();
  }, 400);
};

const handleChangeMenuBtn = (idx: number) => {
  previousIndex.value = currentIndex.value;
  currentIndex.value = idx;
  menuItemPieceIndex.value = idx;
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
  z-index: 9;
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
  padding: 25px 40px;
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
  font-size: clamp(1.2rem, calc(1.5vw + 1rem), 1.5rem);
  color: #333;
}
.nutritional-value {
  position: absolute;
  top: 70px;
  opacity: 0;
  right: -10px;
  z-index: -1;
  padding: 15px;
  width: 220px;
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
  .modal__close-btn {
    position: absolute;
    top: -45px;
    right: 0;
    z-index: 9;
    color: #fff;
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