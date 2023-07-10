<template>
  <section class="dashboard">
    <div class="dashboard__statistics-box">
      <header class="dashboard__statistics-header">
        <div class="dashboard__statistics-row">
          <h2 class="dashbaord__statisitcs-title">Order Line Chart</h2>
          <div>
            <select
              id="statistics"
              class="dashboard__statistics-select"
              v-model="orderTime"
            >
              <option value="today" selected>Today's Total Orders</option>
              <option value="week">This Week's Total Orders</option>
              <option value="month">This Month's Total Orders</option>
              <option value="year">This Year's Total Orders</option>
            </select>
          </div>
        </div>
      </header>
      <SaleLineChart :orders="allOrders" :orderTime="orderTime" />
    </div>
    <div class="dashboard__row">
      <div class="dashboard__table-box">
        <header class="dashboard__table-header">
          <h2 class="dashboard__title">Latest Orders</h2>
          <NuxtLink to="/orders/all-orders" class="dashboard__link">
            <Icon name="material-symbols:order-approve-outline" />
            Go To Orders</NuxtLink
          >
        </header>
        <div
          v-if="!latestOrders.length"
          class="dashboard__table-placeholder-box"
        >
          <h2 class="dashboard__table-placeholder-title">
            No orders have been made yet!
          </h2>
        </div>
        <table v-else class="dashboard-table">
          <thead>
            <tr class="dashboard-table__tr">
              <th scope="col" class="dashboard-table__head">Id</th>
              <th scope="col" class="dashboard-table__head">Payment Type</th>
              <th scope="col" class="dashboard-table__head">Payment Status</th>
              <th scope="col" class="dashboard-table__head">Order Type</th>
              <th scope="col" class="dashboard-table__head">Order Total</th>
              <th scope="col" class="dashboard-table__head">Order Date</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="order of latestOrders"
              :key="order.id"
              class="dashboard-table__tr"
            >
              <td class="dashboard-table__cell">
                <p class="dashboard-table__text">
                  {{ order.id }}
                </p>
              </td>
              <td class="dashboard-table__cell">
                <p class="dashboard-table__text">
                  {{ order.paymentMethod }}
                </p>
              </td>
              <td class="dashboard-table__cell">
                <p class="dashboard-table__text">
                  {{ order.paymentStatus }}
                </p>
              </td>
              <td class="dashboard-table__cell">
                <p class="dashboard-table__text">
                  {{ order.orderType }}
                </p>
              </td>
              <td class="dashboard-table__cell">
                <p class="dashboard-table__text">{{ order.orderTotal }} uzs</p>
              </td>
              <td class="dashboard-table__cell">
                <p class="dashboard-table__text">
                  {{ DateTime.fromISO(order.created).toFormat("dd/MM/yyyy") }}
                </p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="dashboard__row">
      <div class="dashboard__table-box">
        <header class="dashboard__table-header">
          <h2 class="dashboard__title">Latest Applicants</h2>
          <NuxtLink to="/applicant/applicants" class="dashboard__link">
            <Icon name="mdi:resume" />
            Go To Applicants</NuxtLink
          >
        </header>
        <div
          v-if="!latestApplicants.length"
          class="dashboard__table-placeholder-box"
        >
          <h2 class="dashboard__table-placeholder-title">
            None has applied for job yet!
          </h2>
        </div>
        <table v-else class="dashboard-table">
          <thead>
            <tr class="dashboard-table__tr">
              <th scope="col" class="dashboard-table__head">Id</th>
              <th scope="col" class="dashboard-table__head">Photo</th>
              <th scope="col" class="dashboard-table__head">Name</th>
              <th scope="col" class="dashboard-table__head">Number</th>
              <th scope="col" class="dashboard-table__head">Gender</th>
              <th scope="col" class="dashboard-table__head">Date</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="applicant of latestApplicants"
              :key="applicant.id"
              class="dashboard-table__tr"
            >
              <td class="dashboard-table__cell">
                <p class="dashboard-table__text">
                  {{ applicant.id }}
                </p>
              </td>
              <td class="dashboard-table__cell">
                <img
                  :src="applicant.photoUrl"
                  class="dashboard-table__photo"
                  :alt="`${applicant.firstname} ${applicant.lastname}`"
                />
              </td>
              <td class="dashboard-table__cell">
                <p class="dashboard-table__text">
                  {{ applicant.firstname }}
                  {{ applicant.lastname }}
                </p>
              </td>
              <td class="dashboard-table__cell">
                <p class="dashboard-table__text">
                  {{ applicant.phoneNumber }}
                </p>
              </td>
              <td class="dashboard-table__cell">
                <p class="dashboard-table__text">
                  {{ applicant.gender }}
                </p>
              </td>
              <td class="dashboard-table__cell">
                <p class="dashboard-table__text">
                  {{
                    DateTime.fromISO(applicant.created).toFormat("dd/MM/yyyy")
                  }}
                </p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="dashboard__row">
      <div class="dashboard__table-box">
        <header class="dashboard__table-header">
          <h2 class="dashboard__title">Latest Messages</h2>
          <NuxtLink to="/message" class="dashboard__link">
            <Icon name="wpf:message" />
            Go To Messages</NuxtLink
          >
        </header>
        <div
          v-if="!latestMessages.length"
          class="dashboard__table-placeholder-box"
        >
          <h2 class="dashboard__table-placeholder-title">
            No messages have been sent yet!
          </h2>
        </div>
        <table v-else class="dashboard-table">
          <thead>
            <tr class="dashboard-table__tr">
              <th scope="col" class="dashboard-table__head">Id</th>
              <th scope="col" class="dashboard-table__head">Firstname</th>
              <th scope="col" class="dashboard-table__head">Lastname</th>
              <th scope="col" class="dashboard-table__head">Subject</th>
              <th scope="col" class="dashboard-table__head">Message</th>
              <th scope="col" class="dashboard-table__head">Created</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="message of latestMessages"
              :key="message.id"
              class="dashboard-table__tr"
            >
              <td class="dashboard-table__cell">
                <p class="dashboard-table__text">
                  {{ message.id }}
                </p>
              </td>
              <td class="dashboard-table__cell">
                <p class="dashboard-table__text">
                  {{ message.firstname }}
                </p>
              </td>
              <td class="dashboard-table__cell">
                <p class="dashboard-table__text">
                  {{ message.lastname }}
                </p>
              </td>
              <td class="dashboard-table__cell">
                <p class="dashboard-table__text">
                  {{ message.subject }}
                </p>
              </td>
              <td class="dashboard-table__cell">
                <p class="dashboard-table__text">{{ message.message }}</p>
              </td>
              <td class="dashboard-table__cell">
                <p class="dashboard-table__text">
                  {{ DateTime.fromISO(message.date).toFormat("dd/MM/yyyy") }}
                </p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="dashboard__row">
      <div class="dashboard__table-box">
        <header class="dashboard__table-header">
          <h2 class="dashboard__title">Latest Reviews</h2>
          <NuxtLink to="/reviews" class="dashboard__link">
            <Icon name="material-symbols:rate-review-outline-rounded" />
            Go To Reviews</NuxtLink
          >
        </header>
        <div
          v-if="!latestReviews.length"
          class="dashboard__table-placeholder-box"
        >
          <h2 class="dashboard__table-placeholder-title">
            No reviews have been given yet!
          </h2>
        </div>
        <table v-else class="dashboard-table">
          <thead>
            <tr class="dashboard-table__tr">
              <th scope="col" class="dashboard-table__head">Id</th>
              <th scope="col" class="dashboard-table__head">Subject</th>
              <th scope="col" class="dashboard-table__head">Stars</th>
              <th scope="col" class="dashboard-table__head">Message</th>
              <th scope="col" class="dashboard-table__head">Status</th>
              <th scope="col" class="dashboard-table__head">Date</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="review of latestReviews"
              :key="review.id"
              class="dashboard-table__tr"
            >
              <td class="dashboard-table__cell">
                <p class="dashboard-table__text">
                  {{ review.id }}
                </p>
              </td>
              <td class="dashboard-table__cell">
                <p class="dashboard-table__text">
                  {{ review.reviewSubject }}
                </p>
              </td>
              <td class="dashboard-table__cell">
                <p class="dashboard-table__text">
                  {{ review.stars }}
                </p>
              </td>
              <td class="dashboard-table__cell">
                <p class="dashboard-table__text">
                  {{ review.message }}
                </p>
              </td>
              <td class="dashboard-table__cell">
                <p class="dashboard-table__text">
                  {{ review.status }}
                </p>
              </td>
              <td class="dashboard-table__cell">
                <p class="dashboard-table__text">
                  {{ DateTime.fromISO(review.date).toFormat("dd/MM/yyyy") }}
                </p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </section>
</template>
<script setup lang="ts">
import { DateTime } from "luxon";
import { getAllApplicants } from "~/api/applicant";
import { getAllOrders } from "~/api/order";
import { getAllReviews } from "~/api/review";
import { getAllMessages } from "~/api/message";

const orderTime = ref("today");

const latestApplicants = ref([]);
const latestOrders = ref([]);
const latestReviews = ref([]);
const latestMessages = ref([]);
const allOrders = ref([]);

watchEffect(async () => {
  const applicantsResp = await getAllApplicants();
  latestApplicants.value = applicantsResp.data.data.slice(0, 5);
  const latestOrdersResp = await getAllOrders();
  allOrders.value = latestOrdersResp.data.data;
  latestOrders.value = latestOrdersResp.data.data.slice(0, 5);
  const latestReviewsResp = await getAllReviews();
  latestReviews.value = latestReviewsResp.data.data.slice(0, 5);
  const latestMessagesResp = await getAllMessages();
  latestMessages.value = latestMessagesResp.data.data.slice(0, 5);
});
</script>
<style scoped>
.dashboard__row {
  display: flex;
  gap: 50px;
  margin-bottom: 50px;
}

.dashboard__statistics-row {
  display: flex;
  align-items: center;
  gap: 50px;
}

.dashbaord__statisitcs-title,
.dashboard__title {
  font-size: 22px;
  font-weight: 600;
  margin-bottom: 10px;
  padding: 15px;
}
.dashboard__statistics-label {
  display: block;
}

.dashboard__statistics-box {
  margin-bottom: 50px;
  padding-bottom: 25px;
}
.dashboard__statistics-select {
  padding: 10px 5px;
}
.dashboard__statistics-select:focus {
  outline-color: #fc8019;
}

.dashboard__statistics-box,
.dashboard__table-box {
  flex: 1;
  overflow-y: hidden;
  overflow-x: auto;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
.dashboard__table-box::-webkit-scrollbar {
  height: 5px;
  width: 5px;
}
.dashboard__table-box::-webkit-scrollbar-track {
  background: transparent;
}
.dashboard__table-box::-webkit-scrollbar-thumb {
  background: #999;
}
.dashboard__item-box {
  width: 350px;
  background: lightgreen;
}

.dashboard__statistics-header,
.dashboard__table-header {
  position: sticky;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px 20px;
  border-top-left-radius: inherit;
  border-top-right-radius: inherit;
  background: #f2f2f2;
}
.dashboard__link {
  color: rgb(43, 43, 243);
}
.dashboard__table-placeholder-box {
  padding: 25px 0;
  text-align: center;
}
.dashboard__table-placeholder-title {
  font-size: clamp(1.2rem, calc(1.5vw + 1rem), 1.5rem);
}

.dashboard__table-icon {
  font-size: 22px;
}
.dashboard__table-header-right {
  display: flex;
  align-items: center;
  gap: 15px;
}
.dashboard__table-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #fc8019;
  color: #fff;
}
.dashboard-table {
  width: 250%;
  table-layout: fixed;
  font-size: 15px;
}
.dashboard-table__head,
.dashboard-table__cell {
  padding: 25px;
  text-align: left;
}
.dashboard-table__cell {
  padding: 15px 25px;
  vertical-align: middle;
  border-top: 1px solid #e0e0e0;
  word-break: break-all;
  color: #444;
}
.dashboard-table__photo {
  width: 50px;
}

@media (min-width: 768px) {
  .dashboard-table {
    width: 150%;
  }
}
@media (min-width: 992px) {
  .dashboard-table {
    width: 100%;
  }
}
</style>