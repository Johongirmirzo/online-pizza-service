<template>
  <article @click="handleClick()" class="menu-card">
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
          {{ truncateText(menuItem.name || menuItem.type, 20) }}
        </h2>
      </header>
      <p class="menu-card__description">
        {{ truncateText(menuItem.description, 45) }}
      </p>
      <footer class="menu-card__footer">
        <strong class="menu-card__price-text">
          {{ menuItem.pieces[0]?.price }}uzs
        </strong>
        <div class="menu-card__btn-box">
          <button
            class="menu-card__add-menu-btn"
            :disabled="menuItem.status !== 'ACTIVE'"
          >
            <span v-if="menuItem.status !== 'ACTIVE'">TO BE LATER</span>
            <span v-else>
              {{ menuItem.pieces.length > 1 ? "CHOOSE" : "ADD TO CART" }}
            </span>
          </button>
        </div>
      </footer>
    </div>
  </article>
</template>
<script setup lang="ts">
import { truncateText } from "~/utils/truncateText";
const props = defineProps(["menuItem", "getMenuItem", "openModal"]);

const handleClick = () => {
  props.getMenuItem(props.menuItem);
  props.openModal();
};
</script>
<style scoped>
.menu-card {
  margin: 0 auto;
  width: 100%;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
  border-radius: 5px;
  cursor: pointer;
  transition: transform 0.3s ease-out;
}
.menu-card:hover {
  transform: scale(1.025);
}

.menu-card__img-box {
  position: relative;
  overflow: hidden;
}

.menu-card__img {
  transition: transform 0.5s ease-out;
}
.menu-card:hover .menu-card__img {
  transform: scale(1.025);
}

.menu-card__add-to-favourites-btn {
  position: absolute;
  top: 10px;
  left: 10px;
  z-index: 1;
}
.menu-card__favourites-icon {
  font-size: 35px;
  color: #666;
}
.menu-card__text-box {
  padding: 20px;
}
.menu-card__header {
  margin-bottom: 15px;
}
.menu-card__title {
  font-size: clamp(1.2rem, calc(1.5vw + 1rem), 1.4rem);
}
.menu-card__description {
  min-height: 50px;
  color: rgb(92, 99, 112);
}
.menu-card__footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 25px;
}
.menu-card__price-text {
  font-size: clamp(1rem, calc(1.5vw + 1rem), 1.3rem);
  font-weight: 600;
  color: #444;
}
.menu-card__add-menu-btn {
  padding: 10px 15px;
  background: #fc8019;
  color: #fff;
  font-size: 16px;
  border-radius: 5px;
  text-transform: uppercase;
  font-weight: 600;
  font-size: 14px;
}
.menu-card__add-menu-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>