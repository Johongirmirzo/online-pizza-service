<template>
  <section class="between-dates">
    <header class="between-dates__header">
      <h1 class="between-dates__title">Search Order Reports Between Dates</h1>
    </header>
    <div class="between-dates__box">
      <div class="between-dates__row">
        <div class="between-dates__input-box">
          <label for="fromDate" class="between-dates__label">From Date</label>
          <input
            v-model="fromDate"
            type="date"
            id="fromDate"
            class="between-dates__input"
          />
          <p v-if="fromDateErrorMessage" class="between-dates__error-message">
            {{ fromDateErrorMessage }}
          </p>
        </div>
        <div class="between-dates__input-box">
          <label for="toDate" class="between-dates__label">To Date</label>
          <input
            v-model="toDate"
            type="date"
            id="toDate"
            class="between-dates__input"
          />
          <p v-if="toDateErrorMessage" class="between-dates__error-message">
            {{ toDateErrorMessage }}
          </p>
        </div>
      </div>
      <div>
        <p class="between-dates__checkbox-text">Order Type</p>
        <div class="between-dates__checkbox-box">
          <label for="all" class="between-dates__checkbox-label">
            <input
              v-model="orderStatus"
              id="all"
              type="radio"
              name="order"
              value="ALL"
              class="between-dates__checkbox"
            />
            All
          </label>
          <label for="not-confirmed" class="between-dates__checkbox-label">
            <input
              v-model="orderStatus"
              id="not-confirmed"
              type="radio"
              name="order"
              value="ORDER_NOT_CONFIRMED"
              class="between-dates__checkbox"
            />
            Not Confirmed
          </label>
          <label for="confirmed" class="between-dates__checkbox-label">
            <input
              v-model="orderStatus"
              id="confirmed"
              type="radio"
              name="order"
              value="ORDER_CONFIRMED"
              class="between-dates__checkbox"
            />
            Confirmed
          </label>
          <label for="cancelled" class="between-dates__checkbox-label">
            <input
              v-model="orderStatus"
              id="cancelled"
              type="radio"
              name="order"
              value="ORDER_CANCELLED"
              class="between-dates__checkbox"
            />
            Cancelled
          </label>
          <label for="being-prepared" class="between-dates__checkbox-label">
            <input
              v-model="orderStatus"
              id="being-prepared"
              type="radio"
              name="order"
              value="ORDER_BEING_PREPARED"
              class="between-dates__checkbox"
            />
            Being Prepared
          </label>
          <label for="boxed" class="between-dates__checkbox-label">
            <input
              v-model="orderStatus"
              id="boxed"
              type="radio"
              name="order"
              value="ORDER_BOXED"
              class="between-dates__checkbox"
            />
            Boxed
          </label>
          <label for="pickedup" class="between-dates__checkbox-label">
            <input
              v-model="orderStatus"
              id="pickedup"
              type="radio"
              name="order"
              value="ORDER_PICKED_UP"
              class="between-dates__checkbox"
            />
            Picked Up
          </label>
          <label for="delivered" class="between-dates__checkbox-label">
            <input
              v-model="orderStatus"
              id="delivered"
              type="radio"
              name="order"
              value="ORDER_DELIVERED"
              class="between-dates__checkbox"
            />
            Delivered
          </label>
        </div>
        <p v-if="orderStatusErrorMessage" class="between-dates__error-message">
          {{ orderStatusErrorMessage }}
        </p>
      </div>
      <button
        @click="handleFindOrderReportClick"
        class="between-dates__btn"
        :disabled="isLoading"
      >
        Find Reports
      </button>
    </div>
    <div v-if="hasFetchedData" class="between-dates__report-box">
      <header v-if="hasFetchedData" class="between-dates__report-header">
        <h2 class="between-dates__report-title">
          Report from {{ fromDate }} to {{ toDate }}
        </h2>
      </header>
      <div v-if="hasFetchedData" class="between-dates__table-placeholder-box">
        <h2 class="between-dates__table-placeholder-title">
          No orders exist between these dates!
        </h2>
      </div>
      <table v-if="orders.length" class="between-dates-table">
        <thead>
          <tr>
            <th scope="coll" class="between-dates-table__head">Id</th>
            <th scope="coll" class="between-dates-table__head">Type</th>
            <th scope="coll" class="between-dates-table__head">Payment</th>
            <th scope="coll" class="between-dates-table__head">
              Payment Status
            </th>
            <th scope="coll" class="between-dates-table__head">Item Amount</th>
            <th scope="coll" class="between-dates-table__head">Total</th>
            <th scope="coll" class="between-dates-table__head">Order Status</th>
            <th scope="coll" class="between-dates-table__head">Created</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="order of orders" :key="order.id">
            <td class="between-dates-table__cell">
              <p class="between-dates-table__text">
                {{ order.id }}
              </p>
            </td>
            <td class="between-dates-table__cell">
              <p class="between-dates-table__text">
                {{ order.orderType }}
              </p>
            </td>
            <td class="between-dates-table__cell">
              <p class="between-dates-table__text">
                {{ order.paymentMethod }}
              </p>
            </td>
            <td class="between-dates-table__cell">
              <p class="between-dates-table__text">
                {{ order.paymentStatus }}
              </p>
            </td>
            <td class="between-dates-table__cell">
              <p class="between-dates-table__text">
                {{ JSON.parse(order.orderItems).length }}
              </p>
            </td>
            <td class="between-dates-table__cell">
              <p class="between-dates-table__text">
                {{ order.orderTotal }}
              </p>
            </td>
            <td class="between-dates-table__cell">
              <p class="between-dates-table__text">
                {{ getOrderStatus(order.orderStatus) }}
              </p>
            </td>
            <td class="between-dates-table__cell">
              <p class="between-dates-table__text">
                {{ DateTime.fromISO(order.created).toFormat("dd/MM/yyyy") }}
              </p>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>
<script setup lang="ts">
import { DateTime } from "luxon";
import { getAllOrders } from "~/api/order";
import { IOrder } from "~/types/order";

const orders = ref<IOrder[]>([]);
const { $toast } = useNuxtApp();

const fromDate = ref("");
const toDate = ref("");
const orderStatus = ref("");
const hasFetchedData = ref(false);

const fromDateErrorMessage = ref("");
const toDateErrorMessage = ref("");
const orderStatusErrorMessage = ref("");

const { isLoading, startLoading, stopLoading } = useLoading();

watchEffect(() => {
  if (!fromDate.value.length) {
    fromDateErrorMessage.value = "Please choose from date";
  } else {
    fromDateErrorMessage.value = "";
  }
  if (!toDate.value.length) {
    toDateErrorMessage.value = "Please choose to date";
  } else {
    toDateErrorMessage.value = "";
  }
  if (!orderStatus.value.length) {
    orderStatusErrorMessage.value = "Please choose order type";
  } else {
    orderStatusErrorMessage.value = "";
  }
});

const hasError = () =>
  !fromDateErrorMessage.value.length &&
  !toDateErrorMessage.value.length &&
  !orderStatusErrorMessage.value.length;

const handleFindOrderReportClick = async () => {
  if (!hasError()) {
    return $toast.error("Please select required fields!");
  }
  try {
    const fromDateParsed = DateTime.fromISO(fromDate.value).toMillis();
    const toDateParsed = DateTime.fromISO(toDate.value).toMillis();

    startLoading();
    const ordersResp = await getAllOrders();
    hasFetchedData.value = true;

    if (orderStatus.value !== "ALL") {
      orders.value = ordersResp.data.data.filter((order: IOrder) => {
        const orderDateParsed = DateTime.fromISO(order.created).toMillis();
        return (
          orderDateParsed >= fromDateParsed &&
          orderDateParsed <= toDateParsed &&
          order.orderStatus === orderStatus.value
        );
      });
    } else {
      orders.value = ordersResp.data.data.filter((order: IOrder) => {
        const orderDateParsed = DateTime.fromISO(order.created).toMillis();
        return (
          orderDateParsed >= fromDateParsed && orderDateParsed <= toDateParsed
        );
      });
    }

    stopLoading();
  } catch (err) {
    stopLoading();
  }
};
</script>
<style scoped>
.between-dates {
  margin: 25px 0;
}
.between-dates__header {
  margin-bottom: 25px;
  text-align: center;
}
.between-dates__title {
  font-size: clamp(1.4rem, calc(1.5vw + 1rem), 2rem);
}

.between-dates__report-box,
.between-dates__box {
  padding: 25px;
  border-radius: 10px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.15);
}
.between-dates__row {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 25px;
}
.between-dates__row > * {
  flex: 1;
}
.between-dates__label {
  display: block;
  padding-bottom: 5px;
}
.between-dates__input {
  display: block;
  width: 100%;
  padding: 10px 5px;
  border-radius: 5px;
  border: 1px solid #999;
  transition: all 0.3s ease-out;
}
.between-dates__input:focus {
  border: 1px solid #fc8019;
}
.between-dates__checkbox-box {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
  position: relative;
}
.between-dates__checkbox-text {
  margin-bottom: 10px;
  font-size: 18px;
}
.between-dates__checkbox-label {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  margin-right: 15px;
}
.between-dates__checkbox {
  margin-right: 5px;
  transform: scale(1.2);
}
.between-dates__checkbox:after {
  width: 18px;
  height: 18px;
  border-radius: 18px;
  top: -2px;
  left: -2px;
  position: relative;
  background-color: #d1d3d1;
  content: "";
  display: inline-block;
  visibility: visible;
  border: 2px solid white;
}

.between-dates__checkbox:checked:after {
  width: 18px;
  height: 18px;
  border-radius: 18px;
  top: -2px;
  left: -2px;
  position: relative;
  background-color: #ffa500;
  content: "";
  display: inline-block;
  visibility: visible;
  border: 2px solid white;
}
.between-dates__table-placeholder-box {
  padding: 25px 0;
  text-align: center;
}
.between-dates__table-placeholder-title {
  font-size: clamp(1.2rem, calc(1.5vw + 1rem), 1.5rem);
}

.between-dates__btn {
  margin-top: 25px;
  padding: 10px 20px;
  border-radius: 5px;
  background: #fc8019;
  color: #fff;
  font-weight: 600;
  transition: background 0.3s ease-out;
}
.between-dates__btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
.between-dates__error-message {
  position: absolute;
  color: rgb(243, 28, 28);
  font-weight: 600;
  font-size: 14px;
}
.between-dates__btn:hover {
  background: #ea7516;
}

.between-dates__report-box {
  margin-top: 50px;
}
.between-dates__report-header {
  margin-bottom: 20px;
  text-align: center;
}
.between-dates__report-title {
  font-size: clamp(1.2rem, calc(1.5vw + 1rem), 1.5rem);
}

.between-dates__report-box {
  padding: 25px 0;
  overflow-y: hidden;
  overflow-x: scroll;
}
.between-dates__report-box::-webkit-scrollbar {
  height: 6px;
  width: 5px;
}
.between-dates__report-box::-webkit-scrollbar-track {
  margin-top: 150px;
  margin-bottom: 50px;
  background: transparent;
}
.between-dates__report-box::-webkit-scrollbar-thumb {
  background: #999;
}

.between-dates-table {
  width: 250%;
  table-layout: fixed;
  font-size: 15px;
}
.between-dates-table__head,
.between-dates-table__cell {
  padding: 25px;
  text-align: left;
}
.between-dates-table__cell {
  padding: 15px 25px;
  vertical-align: middle;
  border-top: 1px solid #e0e0e0;
  color: #444;
}

@media (min-width: 768px) {
  .between-dates-table {
    width: 150%;
  }
}
@media (min-width: 968px) {
  .between-dates__report-box {
    overflow: hidden;
  }
  .between-dates-table {
    width: 100%;
  }
}
</style>