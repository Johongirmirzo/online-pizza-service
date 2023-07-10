<template>
  <section class="home-page">
    <PizzaLoader v-if="isLoading" />
    <section id="pizzas" class="pizzas">
      <header class="home-page__header pizzas__header">
        <h2 class="home-page__title pizzas__title">Pizzas</h2>
      </header>
      <PizzaModel
        v-if="isPizzaModalOpen"
        :pizzaData="pizza"
        :isModelOpen="isPizzaModalOpen"
        :closeModal="closePizzaModal"
      />
      <div class="pizzas__row">
        <PizzaItem
          v-for="pizza of pizzas"
          :key="pizza.id"
          :pizza="pizza"
          :getPizza="getPizza"
          :openModal="openPizzaModal"
        />
      </div>
    </section>
    <section id="snacks" class="snacks">
      <header class="home-page__header snacks__header">
        <h2 class="home-page__title snacks__title">Snacks</h2>
      </header>
      <MenuItemModal
        v-if="isSnackModalOpen"
        :menuData="menuItem"
        :isModelOpen="isSnackModalOpen"
        :closeModal="closeSnackModal"
      />
      <div class="snacks__row">
        <MenuItem
          v-for="menuItem of menuItems.snacks"
          :key="menuItem.id"
          :menuItem="menuItem"
          :getMenuItem="getMenuItem"
          :openModal="openSnackModal"
        />
      </div>
    </section>
    <section id="desserts" class="desserts">
      <header class="home-page__header desserts__header">
        <h2 class="home-page__title desserts__title">Desserts</h2>
      </header>
      <MenuItemModal
        v-if="isDessertModalOpen"
        :menuData="menuItem"
        :isModelOpen="isDessertModalOpen"
        :closeModal="closeDessertModal"
      />
      <div class="desserts__row">
        <MenuItem
          v-for="menuItem of menuItems.desserts"
          :key="menuItem.id"
          :menuItem="menuItem"
          :getMenuItem="getMenuItem"
          :openModal="openDessertModal"
        />
      </div>
    </section>
    <section id="salads" class="salads">
      <header class="home-page__header salads__header">
        <h2 class="home-page__title salads__title">Salads</h2>
      </header>
      <MenuItemModal
        v-if="isSaladModalOpen"
        :menuData="menuItem"
        :isModelOpen="isSaladModalOpen"
        :closeModal="closeSaladModal"
      />
      <div class="salads__row">
        <MenuItem
          v-for="menuItem of menuItems.salads"
          :key="menuItem.id"
          :menuItem="menuItem"
          :getMenuItem="getMenuItem"
          :openModal="openSaladModal"
        />
      </div>
    </section>
    <section id="drinks" class="drinks">
      <header class="home-page__header drinks__header">
        <h2 class="home-page__title drinks__title">Drinks</h2>
      </header>
      <MenuItemModal
        v-if="isDrinkModalOpen"
        :menuData="menuItem"
        :isModelOpen="isDrinkModalOpen"
        :closeModal="closeDrinkModal"
      />
      <div class="drinks__row">
        <MenuItem
          v-for="menuItem of menuItems.drinks"
          :key="menuItem.id"
          :menuItem="menuItem"
          :getMenuItem="getMenuItem"
          :openModal="openDrinkModal"
        />
      </div>
    </section>
    <section id="dips" class="dips">
      <header class="home-page__header dips__header">
        <h2 class="home-page__title dips__title">Dips</h2>
      </header>
      <DipModal
        v-if="isDipModalOpen"
        :menuData="dip"
        :isModelOpen="isDipModalOpen"
        :closeModal="closeDipModal"
      />

      <div class="drinks__row">
        <DipItem
          v-for="dip of dips"
          :key="dip.id"
          :dip="dip"
          :openModal="openDipModal"
          :getDip="getDip"
        />
      </div>
    </section>
  </section>
</template>
<script setup lang="ts">
import { useCartStore } from "~/stores/useCartStore";
import { useLoading } from "~/composables/useLoading";
import {
  getAllPizzas,
  getAllMenuItems,
  getAllDips,
} from "~/api/all-api-handlers";

const { cartItems } = useCartStore();

const pizzas = ref([]);
const dips = ref([]);
const menuItems = ref({
  snacks: [],
  drinks: [],
  salads: [],
  desserts: [],
});
const pizza = ref({});
const menuItem = ref({});
const dip = ref({});

const getPizza = (pizzaData: any) => {
  pizza.value = pizzaData;
};
const getMenuItem = (menuItemData: any) => {
  menuItem.value = menuItemData;
};
const getDip = (dipData: any) => {
  dip.value = dipData;
};

const { data, signOut } = useAuth();

const { isLoading, startLoading, stopLoading } = useLoading();
const {
  isModalOpen: isPizzaModalOpen,
  closeModal: closePizzaModal,
  openModal: openPizzaModal,
} = useModal();
const {
  isModalOpen: isSnackModalOpen,
  closeModal: closeSnackModal,
  openModal: openSnackModal,
} = useModal();
const {
  isModalOpen: isDessertModalOpen,
  closeModal: closeDessertModal,
  openModal: openDessertModal,
} = useModal();
const {
  isModalOpen: isSaladModalOpen,
  closeModal: closeSaladModal,
  openModal: openSaladModal,
} = useModal();
const {
  isModalOpen: isDrinkModalOpen,
  closeModal: closeDrinkModal,
  openModal: openDrinkModal,
} = useModal();
const {
  isModalOpen: isDipModalOpen,
  closeModal: closeDipModal,
  openModal: openDipModal,
} = useModal();

onMounted(async () => {
  try {
    startLoading();
    const pizzasResponse = await getAllPizzas();
    const dipsResponse = await getAllDips();
    const menuItemsResponses = await getAllMenuItems();
    dips.value = dipsResponse.data.data;
    pizzas.value = {
      ...pizzasResponse.data.data.map((pizza: any) => {
        pizza.pizzaSizes.sort((left, right) => {
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
        });
        return pizza;
      }),
    };
    menuItemsResponses.data.data.forEach((menuItem: any) => {
      switch (menuItem.type) {
        case "SNACKS":
          menuItems.value.snacks.push({
            ...menuItem,
            pieces: JSON.parse(menuItem.pieces),
          });
          break;
        case "DRINKS":
          menuItems.value.drinks.push({
            ...menuItem,
            pieces: JSON.parse(menuItem.pieces),
          });

          break;
        case "SALADS":
          menuItems.value.salads.push({
            ...menuItem,
            pieces: JSON.parse(menuItem.pieces),
          });

          break;
        case "DESSERTS":
          menuItems.value.desserts.push({
            ...menuItem,
            pieces: JSON.parse(menuItem.pieces),
          });

          break;
      }
    });
    stopLoading();
  } catch (err) {
    console.log(err);
    stopLoading();
  }
});
</script>
<style scoped>
.home-page {
  margin-top: 50px;
}
.home-page__header {
  margin-bottom: 25px;
}
.home-page__title {
  font-size: clamp(1.7rem, calc(1.7vw + 1rem), 2.2rem);
}

.pizzas,
.snacks,
.desserts,
.dips,
.drinks,
.salads {
  margin-bottom: 70px;
}

.pizzas__row,
.snacks__row,
.desserts__row,
.dips__row,
.drinks__row,
.salads__row {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 25px;
}
</style>