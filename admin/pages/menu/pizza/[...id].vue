<template>
  <section class="pizza">
    <SectionHeader
      :redirectLink="redirectLink"
      :redirectText="redirectText"
      :title="title"
    >
      <template #header-icon>
        <Icon name="bx:food-menu" />
      </template>
    </SectionHeader>
    <PizzaLoader v-if="isLoading" />
    <PizzaModel
      :pizzaData="pizza"
      :isModelOpen="isModelOpen"
      :closeModal="closeModal"
    />
    <div v-if="pizza.name" class="pizza__box">
      <article @click="openModal" class="pizza-card">
        <div class="pizza-card__body">
          <figure class="pizza-card__img-box">
            <img
              class="pizza-card__img"
              :src="pizza.pizzaSizes[0]?.photo"
              :alt="pizza.name"
            />
          </figure>
          <div class="pizza-card__text-box">
            <header class="pizza-card__header">
              <h2 class="pizza-card__title">
                {{ pizza.name }}
              </h2>
            </header>
            <ul class="pizza-card__list">
              <li
                v-for="pizzaSize in pizza.pizzaSizes[0].standardToppings.slice(
                  0,
                  7
                )"
                :key="pizzaSize.id"
                class="pizza-card__item"
              >
                {{ pizzaSize.name }}
              </li>
            </ul>
            <footer class="pizza-card__footer">
              <strong class="pizza-card__price-text">
                {{ pizza.pizzaSizes[0]?.price }} sum
              </strong>
            </footer>
          </div>
        </div>
      </article>
    </div>
  </section>
</template>
<script setup lang="ts">
import { useLoading } from "~/composables/useLoading";
import { IPizza } from "~/types/pizza";
import { getPizza } from "~/api/pizza";

const redirectLink = "/menu/pizzas";
const redirectText = "Go Back To Pizzas";
const title = ref("");

const { params } = useRoute();
const isModelOpen = ref(false);
const pizza = ref({} as IPizza);

const openModal = () => {
  isModelOpen.value = true;
};
const closeModal = () => {
  isModelOpen.value = false;
};

const { isLoading, startLoading, stopLoading } = useLoading();

watchEffect(async () => {
  try {
    startLoading();
    const pizzaResponse = await getPizza(params.id[0]);
    const sortedPizzaSizes = pizzaResponse.data.data.pizzaSizes.sort(
      (left, right) => {
        let leftPiece = left;
        let rightPiece = right;
        if (
          (leftPiece.size === "LARGE" && rightPiece.size === "MEDIUM") ||
          (leftPiece.size === "LARGE" && rightPiece.size === "SMALL") ||
          (leftPiece.size === "MEDIUM" && rightPiece.size === "SMALL")
        ) {
          return 1;
        } else {
          return -1;
        }
      }
    );
    pizza.value = {
      ...pizzaResponse.data.data,
      pizzaSizes: sortedPizzaSizes,
    };
    title.value = pizza.value.name;
    stopLoading();
  } catch (err) {
    stopLoading();
    console.log("Err", err);
  }
});
</script>
<style scoped>
.pizza__box {
  max-width: 420px;
  width: 90%;
  margin: 0 auto;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.07);
  border-radius: 5px;
  cursor: pointer;
}
.pizza-card__img-box {
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}
.pizza-card__img {
  transition: transform 0.5s ease-out;
}
.pizza-card:hover .pizza-card__img {
  transform: scale(1.05);
}
.pizza-card__text-box {
  background: hsla(0, 0%, 99%, 0.906);
  padding: 20px;
}
.pizza-card__header {
  margin-bottom: 15px;
}
.pizza-card__title {
  font-size: clamp(1.4rem, calc(1.5vw + 1rem), 1.6rem);
}
.pizza-card__list {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
  color: rgb(92, 99, 112);
}

.pizza-card__footer {
  margin-top: 25px;
}
.pizza-card__price-text {
  font-size: clamp(1.2rem, calc(1.5vw + 1rem), 1.6rem);
  font-weight: 600;
  color: #444;
}
</style>