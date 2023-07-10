<template>
  <section class="menu-item">
    <SectionHeader
      :redirectLink="redirectLink"
      :redirectText="redirectText"
      :title="title"
    >
      <template #header-icon>
        <Icon name="bx:food-menu" />
      </template>
    </SectionHeader>
    <PizzaLoader v-if="isLoadingMenuItem" />
    <MenuModal
      :menuData="menuItem"
      :isModelOpen="isModelOpen"
      :closeModal="closeModal"
    />
    <div v-if="menuItem.name" class="menu-item__box">
      <article @click="openModal" class="menu-card">
        <div class="menu-card__body">
          <figure class="menu-card__img-box">
            <img
              class="menu-card__img"
              :src="menuItem.pieces[0]?.photo"
              :alt="menuItem.name"
            />
          </figure>
          <div class="menu-card__text-box">
            <header class="menu-card__header">
              <h2 class="menu-card__title">
                {{ menuItem.name }}
              </h2>
            </header>
            <p class="menu-card__description">
              {{ menuItem.description }}
            </p>
            <footer class="menu-card__footer">
              <strong class="menu-card__price-text">
                {{ menuItem.pieces[0]?.price }} sum
              </strong>
            </footer>
          </div>
        </div>
      </article>
    </div>
  </section>
</template>
<script setup lang="ts">
import { useLoadings } from "~/composables/useLoading";
import { IMenuItem } from "~/types/menu";
import { getMenuItem } from "~/api/menu";

const redirectLink = "/menu/menu-items";
const redirectText = "Go Back To Menu Items";
const title = "Menu Item";

const { params } = useRoute();
const isModelOpen = ref(false);
const menuItem = ref({} as IMenuItem);

const openModal = () => {
  isModelOpen.value = true;
};
const closeModal = () => {
  isModelOpen.value = false;
};

const {
  isLoading: isLoadingMenuItem,
  startLoading,
  stopLoading,
} = useLoading();

watchEffect(async () => {
  try {
    startLoading();
    const menuItemResponse = await getMenuItem(params.id[0]);
    const pieces = menuItemResponse.data.data.pieces.map((piece: string) =>
      JSON.parse(piece)
    )[0];
    const sortedPieces = pieces.sort((left, right) => {
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
    menuItem.value = {
      ...menuItemResponse.data.data,
      pieces: sortedPieces,
    };
    stopLoading();
  } catch (err) {
    stopLoading();
    console.log("Err", err);
  }
});
</script>
<style scoped>
.menu-item__box {
  max-width: 420px;
  width: 90%;
  margin: 0 auto;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.07);
  border-radius: 5px;
  cursor: pointer;
}
.menu-card__img-box {
  overflow: hidden;
}
.menu-card__img {
  transition: transform 0.5s ease-out;
}
.menu-card:hover .menu-card__img {
  transform: scale(1.05);
}
.menu-card__text-box {
  padding: 20px;
}
.menu-card__header {
  margin-bottom: 15px;
}
.menu-card__title {
  text-align: center;
  font-size: clamp(1.2rem, calc(1.5vw + 1rem), 1.5rem);
}
.menu-card__description {
  text-align: center;
  color: rgb(92, 99, 112);
}
.menu-card__footer {
  margin-top: 25px;
}
.menu-card__price-text {
  font-size: clamp(1.2rem, calc(1.5vw + 1rem), 1.6rem);
  font-weight: 600;
  color: #444;
}
</style>