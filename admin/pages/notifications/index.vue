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

    <div v-if="orders.length" class="order__wrapper">
      <div class="order__box" v-for="currOrder of orders" :key="currOrder.id">
        <h3 class="order__box-title">
          Orders For Order Id "{{ currOrder.id }}"
        </h3>
        <div class="order__row">
          <div
            v-for="orderItem of JSON.parse(currOrder.orderItems)"
            :key="orderItem.id"
            class="order-list__item"
          >
            <figure class="order-list__img-box">
              <img
                :src="orderItem.photo"
                :alt="orderItem.name"
                :title="orderItem.name"
                class="order-list__img"
              />
              <button
                @click="handleDeleteOrderClick(currOrder.id)"
                title="Delete Order"
                class="order__delete-btn"
              >
                <Icon class="order__icon" name="jam:trash" />
              </button>
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
              <p class="order-list__text">
                Order Amount {{ orderItem.amount }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script setup lang="ts">
import { IOrder } from "~/types/order";
import { useOrderStore } from "~/stores/useOrderStore";

const redirectLink = "/orders/all-orders";
const redirectText = "Go Back To Orders";
const title = "Order Items";

const orderStore = useOrderStore();

const orders = ref<IOrder[]>();

const { $toast } = useNuxtApp();

watchEffect(() => {
  orders.value = orderStore.orders;
});

const handleDeleteOrderClick = (orderId: number) => {
  const isDeleteConfirmed = confirm(
    `Deleting current item on order id ${orderId} will delete all order items with this order id ${orderId} from notification but not from DATABASE`
  );
  if (isDeleteConfirmed) {
    orderStore.deleteOrder(orderId);
    orders.value = orders.value.filter((order: IOrder) => order.id !== orderId);
    $toast.success(
      `All order items with order id ${orderId} deleted from notification but not from DATABASE`
    );
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
</script>
<style scoped>
.order__row {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 25px;
  margin-bottom: 35px;
}
.order__box-title {
  margin-bottom: 15px;
  font-size: 22px;
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
  position: relative;
  overflow: hidden;
}
.order-list__img {
  height: 200px;
  object-fit: cover;
  transition: transform 0.5s ease-out;
}
.order__delete-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 9999;
  font-size: 25px;
  color: red;
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
