<template>
  <section class="orders">
    <header class="orders__header">
      <h1 class="orders__title">All Orders</h1>
    </header>
    <div class="orders__table-box">
      <div v-if="!orders.length" class="orders__table-placeholder-box">
        <h2 class="orders__table-placeholder-title">
          You haven't made any orders yet!
        </h2>
      </div>

      <table class="orders-table" v-else>
        <thead>
          <tr>
            <th scope="coll" class="orders-table__head">Id</th>
            <th scope="coll" class="orders-table__head">Type</th>
            <th scope="coll" class="orders-table__head">Payment</th>
            <th scope="coll" class="orders-table__head">Item Amount</th>
            <th scope="coll" class="orders-table__head">Total</th>
            <th scope="coll" class="orders-table__head">Order Status</th>
            <th scope="coll" class="orders-table__head">Created</th>
            <th scope="coll" class="orders-table__head">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="order of orders" :key="order.id">
            <td class="orders-table__cell">
              <p class="orders-table__text">
                {{ order.id }}
              </p>
            </td>
            <td class="orders-table__cell">
              <p class="orders-table__text">
                {{ order.orderType }}
              </p>
            </td>
            <td class="orders-table__cell">
              <p class="orders-table__text">
                {{ order.paymentMethod }}
              </p>
            </td>
            <td class="orders-table__cell">
              <p class="orders-table__text">
                {{ JSON.parse(order.orderItems).length }}
              </p>
            </td>
            <td class="orders-table__cell">
              <p class="orders-table__text">{{ order.orderTotal }} uzs</p>
            </td>

            <td class="orders-table__cell">
              <p class="orders-table__text">
                {{ getOrderStatus(order.orderStatus) }}
              </p>
            </td>
            <td class="orders-table__cell">
              <p class="orders-table__text">
                {{
                  DateTime.fromISO(order.created).toFormat("dd/MM/yy hh:mma")
                }}
              </p>
            </td>
            <td class="orders-table__cell">
              <NuxtLink
                title="Track Order Live"
                :to="`/live-order/${order.id}`"
                class="orders-table__text"
              >
                <Icon name="gg:track" class="orders-table__icon"
              /></NuxtLink>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>
<script setup lang="ts">
import { DateTime } from "luxon";
import { IOrder } from "~/types/order";
import { useCustomerStore } from "~/stores/useCustomerStore";
import { getAllCustomerOrders } from "~/api/all-api-handlers";

const customerStore = useCustomerStore();
const orders = ref<IOrder[]>([]);

watchEffect(async () => {
  const customerOrdersResp = await getAllCustomerOrders(
    customerStore.customer.id
  );
  orders.value = [...customerOrdersResp.data.data];
});
</script>
<style scoped>
.orders {
  margin: 100px 0;
}
.orders__header {
  text-align: center;
  margin: 35px 0;
}
.orders__title {
  font-size: clamp(1.4rem, calc(1.5vw + 1rem), 2rem);
  font-weight: 600;
}
.orders__table-box {
  overflow-y: hidden;
  overflow-x: auto;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
.orders__table-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px 20px;
  border-top-left-radius: inherit;
  border-top-right-radius: inherit;
  background: #f2f2f2;
}
.orders__search-box {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 12px;
  border-radius: 5px;
  background: #fff;
}
.orders__search-input {
  border: 0;
  outline: 0;
}
.orders__table-placeholder-box {
  padding: 25px 0;
  text-align: center;
}
.orders__table-placeholder-title {
  font-size: clamp(1.2rem, calc(1.5vw + 1rem), 1.5rem);
}

.orders__table-icon {
  font-size: 22px;
}
.orders__table-header-right {
  display: flex;
  align-items: center;
  gap: 15px;
}
.orders__table-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #fc8019;
  color: #fff;
}
.orders-table {
  width: 300%;
  table-layout: fixed;
  font-size: 15px;
}
.orders-table__head,
.orders-table__cell {
  padding: 25px;
  text-align: left;
}
.orders-table__cell {
  padding: 15px 25px;
  vertical-align: middle;
  border-top: 1px solid #e0e0e0;
  color: #444;
}
.orders-table__photo-cell {
  display: flex;
  gap: 5px;
}
.orders-table__photo {
  width: 45px;
  height: 45px;
  border-radius: 50%;
  object-fit: cover;
}
.orders-table__text {
  font-size: 14px;
  font-weight: 600;
  color: #333;
}
.orders-table__btns-box {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
}
.orders-table__view-icon {
  color: rgb(59, 59, 237);
}
.orders-table__icon {
  font-size: 24px;
}

@media (min-width: 992px) {
  .orders-table {
    width: 200%;
  }
}
@media (min-width: 1350px) {
  .orders__table-box {
    overflow-x: hidden;
  }
  .orders-table {
    width: 100%;
    table-layout: normal;
  }
}
</style>