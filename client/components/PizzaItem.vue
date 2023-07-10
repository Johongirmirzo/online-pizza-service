<template>
  <article class="pizza-card" @click="handleClick">
    <figure class="pizza-card__img-box">
      <img
        :src="pizza.pizzaSizes[currentActivePizzaIndex].photo"
        :alt="pizza.name"
        :title="pizza.name"
        class="pizza-card__img"
      />
    </figure>
    <div class="pizza-card__body">
      <header class="pizza-card__header">
        <h3 class="pizza-card__title">
          {{ pizza.name }}
        </h3>
      </header>
      <p class="pizza-card__topping-text">
        {{
          truncateText(
            pizza.pizzaSizes[currentActivePizzaIndex].standardToppings
              .slice(0, 6)
              .map((t) => t.name)
              .join(", "),
            50
          )
        }}
      </p>

      <footer class="pizza-card__footer">
        <strong class="pizza-card__price">
          {{ pizza.pizzaSizes[0].price }} uzs
        </strong>
        <button
          class="pizza-card__add-menu-btn"
          :disabled="pizza.status !== 'ACTIVE'"
        >
          <span
            class="pizza-card__add-menu-text"
            v-if="pizza.status !== 'ACTIVE'"
            >TO BE LATER</span
          >
          <span class="pizza-card__add-menu-text" v-else>CHOOSE</span>
        </button>
      </footer>
    </div>
  </article>
</template>
<script setup lang="ts">
import { truncateText } from "~/utils/truncateText";
const props = defineProps(["pizza", "getPizza", "openModal"]);
const currentActivePizzaIndex = ref(1);

const isFavouriteClicked = ref(false);

const handleClick = () => {
  props.getPizza(props.pizza);
  props.openModal();
  if (!isFavouriteClicked.value) {
  }
};
</script>
<style scoped>
.pizza-card {
  width: 100%;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.15);
  border-radius: 10px;
  cursor: pointer;
  transition: transform 0.3s ease-out;
}
.pizza-card:hover {
  transform: scale(1.05);
}
.pizza-card__img-box {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  overflow: hidden;
  transition: transform 0.3s ease-out;
}
.pizza-card__add-to-favourites-btn {
  position: absolute;
  top: 10px;
  left: 10px;
  z-index: 1;
}
.pizza-card__favourites-icon {
  font-size: 35px;
  color: #666;
}
.pizza-card__img {
  max-width: 100%;
  transition: transform 0.3s ease-out;
}
.pizza-card:hover .pizza-card__img {
  transform: scale(1.025);
}
.pizza-card__body {
  padding: 15px;
}
.pizza-card__header {
  margin-bottom: 15px;
}
.pizza-card__title {
  font-size: clamp(1.1rem, calc(1.2vw + 1rem), 1.4rem);
}
.pizza-card__topping-text {
  color: #555;
}
.pizza-card__footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
}
.pizza-card__add-menu-btn {
  padding: 10px 15px;
  background: #fc801a;
  color: #fff;
  font-size: 16px;
  border-radius: 5px;
  text-transform: uppercase;
  font-weight: 600;
  font-size: 14px;
}

.pizza-card__add-menu-btn:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}
.pizza-card__footer span {
  margin-top: -5px;
  color: #555;
}
.pizza-card__add-menu-btn span {
  color: #fff;
}
.pizza-card__price {
  font-size: clamp(1rem, calc(1.5vw + 1rem), 1.3rem);
  font-weight: 600;
  color: #444;
}
</style>