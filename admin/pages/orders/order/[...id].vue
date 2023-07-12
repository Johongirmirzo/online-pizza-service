<template>
  <section class="order">
    <SectionHeader
      :redirectLink="redirectLink"
      :redirectText="redirectText"
      :title="title"
    >
      <template #header-icon>
        <Icon name="material-symbols:order-approve" />
      </template>
    </SectionHeader>
    <OrderPizzaModel
      v-if="isModelOpen"
      :pizzaData="pizza"
      :isModelOpen="isModelOpen"
      :closeModal="closeModal"
    />

    <ul class="order-list">
      <li
        v-for="orderItem of order.orderItems"
        :key="orderItem.id"
        class="order-list__item"
        :class="{ remove: removedItemId === orderItem.itemId }"
        @click="handleOpenPizzaModel(orderItem.itemType, orderItem)"
      >
        <figure class="order-list__img-box">
          <img
            :src="orderItem.photo"
            :alt="orderItem.name"
            :title="orderItem.name"
            class="order-list__img"
          />
        </figure>
        <div class="order-list__text-box">
          <header class="order-list__header">
            <h3 class="order-list__title">
              {{ orderItem.name }}
            </h3>
          </header>
          <p class="order-list__description">
            {{ orderItem.size }},
            <span v-if="orderItem.itemType === 'Pizza'">
              {{ getPizzaCrust(orderItem.crustType.crustType) }},
              {{ getPizzaEdge(orderItem.edgeType.edgeType) }}
            </span>
          </p>
          <p class="order-list__text">
            <Icon name="grommet-icons:money" />
            Total {{ orderItem.total }} uzs
          </p>
          <p class="order-list__text">Order Amount {{ orderItem.amount }}</p>
        </div>
      </li>
    </ul>
  </section>
</template>
<script setup lang="ts">
import { IOrder } from "~/types/order";
import { getOrder } from "~/api/order";
const redirectLink = "/orders/all-orders";
const redirectText = "Go Back To Orders";
const title = "Order Items";

const order = ref({} as IOrder);
const route = useRoute();

const isModelOpen = ref(false);
const pizza = ref({});

const openModal = () => {
  isModelOpen.value = true;
  console.log(isModelOpen.value);
};
const closeModal = () => {
  isModelOpen.value = false;
};

const handleOpenPizzaModel = (orderItemType: string, pizzaData: any) => {
  if (orderItemType === "Pizza") {
    openModal();
    pizza.value = pizzaData;
  }
};

watchEffect(async () => {
  const orderResp = await getOrder(Number(route.params.id));

  order.value = {
    ...orderResp.data.data,
    orderItems: JSON.parse(orderResp.data.data.orderItems),
  };
});

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
</script>
<style scoped>
.order-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 25px;
}
.order-list__item {
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
  border-radius: 10px;
  overflow: hidden;
  transition: transform 0.5s ease-out;
  cursor: pointer;
}
.order-list__item:hover {
  transform: scale(1.05);
}
.order-list__img-box {
  overflow: inherit;
}
.order-list__img {
  height: 200px;
  object-fit: cover;
  transition: transform 0.5s ease-out;
}
.order-list__item:hover .order-list__img {
  transform: scale(1.2);
}
.order-list__header {
  margin-bottom: 20px;
}
.order-list__title {
  font-size: clamp(1.1rem, calc(1vw + 1rem), 1.4rem);
}
.order-list__description {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  color: #555;
}
.order-list__text {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 10px;
  font-weight: 600;
  font-size: 20px;
  color: #333;
}
</style>
