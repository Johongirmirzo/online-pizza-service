<template>
  <section class="dip" @click="handleClick">
    <div class="dip__box">
      <article class="dip-card">
        <figure class="dip-card__img-box">
          <img :src="dip.photo" alt="" class="dip-card__img" />
        </figure>
        <div class="dip-card__body">
          <header class="dip-card__header">
            <h3 class="dip-card__title">
              {{ truncateText(dip.type, 18) }}
            </h3>
          </header>
          <footer class="dip-card__footer">
            <strong class="dip-card__price"> {{ dip.price }} uzs </strong>
            <div class="dip-card__btn-box">
              <button
                class="dip-card__add-item-btn"
                :disabled="dip.status !== 'ACTIVE'"
              >
                <span v-if="dip.status !== 'ACTIVE'">To Be Later</span>
                <span v-else>Add to Cart</span>
              </button>
            </div>
          </footer>
        </div>
      </article>
    </div>
  </section>
</template>
<script setup lang="ts">
const props = defineProps(["dip", "getDip", "openModal"]);

const handleClick = () => {
  props.getDip(props.dip);
  props.openModal();
};
</script>
<style scoped>
.dip__box {
  margin: 0 auto;
  width: 100%;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
  border-radius: 5px;
  cursor: pointer;
  transition: transform 0.3s ease-out;
}
.dip__box:hover {
  transform: scale(1.025);
}

.dip-card__img-box {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}
.dip-card__img {
  width: 150px;
  transition: transform 0.5s ease-out;
}
.dip-card__add-to-favourites-btn {
  position: absolute;
  top: 10px;
  left: 10px;
  z-index: 1;
}
.dip-card__favourites-icon {
  font-size: 35px;
  color: #666;
}
.dip-card__body {
  padding: 20px;
}
.dip-card:hover .dip-card__img {
  transform: scale(1.025);
}
.dip-card__text-box {
  padding: 20px;
}
.dip-card__header {
  margin-bottom: 15px;
}
.dip-card__title {
  font-size: clamp(1.2rem, calc(1.5vw + 1rem), 1.5rem);
}

.dip-card__footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 25px;
}
.dip-card__price {
  font-size: clamp(1.2rem, calc(1.5vw + 1rem), 1.4rem);
  font-weight: 600;
  color: #444;
}
.dip-card__add-item-btn {
  padding: 10px 15px;
  background: #fc8019;
  color: #fff;
  font-size: 16px;
  border-radius: 5px;
  text-transform: uppercase;
  font-weight: 600;
  font-size: 14px;
}
.dip-card__add-item-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>