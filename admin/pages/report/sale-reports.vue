<template>
  <section class="between-dates">
    <header class="between-dates__header">
      <h1 class="between-dates__title">Search Sale Reports</h1>
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
          Sales Reports from {{ fromDate }} to {{ toDate }}
        </h2>
      </header>
      <div v-if="hasFetchedData" class="between-dates__table-placeholder-box">
        <h2 class="between-dates__table-placeholder-title">
          No orders exist between these dates!
        </h2>
      </div>

      <table v-if="totalOrders.totalIncome" class="between-dates-table">
        <thead>
          <tr>
            <th scope="coll" class="between-dates-table__head">S.NO</th>
            <th scope="coll" class="between-dates-table__head">
              Between Dates
            </th>
            <th scope="coll" class="between-dates-table__head">
              Total Items Sold
            </th>
            <th scope="coll" class="between-dates-table__head">Total Income</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="between-dates-table__cell">
              <p class="between-dates-table__text">1</p>
            </td>
            <td class="between-dates-table__cell">
              <p class="between-dates-table__text">
                {{ fromDate }}
                -
                {{ toDate }}
              </p>
            </td>
            <td class="between-dates-table__cell">
              <p class="between-dates-table__text">
                {{ totalOrders.totalItemsSold }}
              </p>
            </td>
            <td class="between-dates-table__cell">
              <p class="between-dates-table__text">
                {{ totalOrders.totalIncome }} uzs
              </p>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    {{ orders }}
  </section>
</template>
  <script setup lang="ts">
import { DateTime } from "luxon";
import { getAllOrders } from "~/api/order";
import { IOrder } from "~/types/order";

const totalOrders = ref<IOrder[]>([]);
const { $toast } = useNuxtApp();

const fromDate = ref("");
const toDate = ref("");

const fromDateErrorMessage = ref("");
const toDateErrorMessage = ref("");
const hasFetchedData = ref(false);

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
});

const hasError = () =>
  !fromDateErrorMessage.value.length && !toDateErrorMessage.value.length;

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

    totalOrders.value = ordersResp.data.data
      .filter((order: IOrder) => {
        const orderDateParsed = DateTime.fromISO(order.created).toMillis();
        return (
          orderDateParsed >= fromDateParsed && orderDateParsed <= toDateParsed
        );
      })
      .reduce((prev, curr) => {
        return {
          ...prev,
          totalIncome: (prev.totalIncome ?? 0) + curr.orderTotal,
          totalItemsSold:
            (prev.totalItemsSold ?? 0) + JSON.parse(curr.orderItems).length,
        };
      }, {});

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