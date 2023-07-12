<template>
  <section class="live-order">
    <NuxtLink to="/orders">
      <Icon name="material-symbols:order-approve" />

      Go Back To Orders</NuxtLink
    >

    <header class="live-order__header">
      <p class="live-order__sub--title">
        You Ordered For:

        {{
          order.created &&
          DateTime.fromISO(order.created).toFormat("dd.MM.yyyy")
        }}
        {{ order.orderChosenTime }}
      </p>
      <h1 class="live-order__title">Live Order Status</h1>
    </header>
    <div class="live-order__countdown">
      <p class="live-order__countdown-text">
        {{ orderCountdown }}
      </p>
    </div>

    <div class="live-order__row">
      <ul class="live-order__tracker-list">
        <li
          class="live-order__tracker-item"
          :class="{ active: currentOrderStage >= 1 }"
        >
          <p class="live-order__tracker-text">CONFIRMED</p>
          <div class="live-order__tracker-status--line"></div>
          <div class="live-order__tracker-status">1</div>
        </li>
        <li
          class="live-order__tracker-item"
          :class="{ active: currentOrderStage >= 2 }"
        >
          <p class="live-order__tracker-text">PREP</p>
          <div class="live-order__tracker-status--line"></div>
          <div class="live-order__tracker-status">2</div>
        </li>
        <li
          class="live-order__tracker-item"
          :class="{ active: currentOrderStage >= 3 }"
        >
          <p class="live-order__tracker-text">BOX</p>
          <div class="live-order__tracker-status--line"></div>
          <div class="live-order__tracker-status">3</div>
        </li>
        <li
          class="live-order__tracker-item"
          :class="{ active: currentOrderStage >= 4 }"
        >
          <p class="live-order__tracker-text">
            {{ order.orderType === "DELIVERY" ? "DELIVERED" : "PICKED UP" }}
          </p>
          <div class="live-order__tracker-status--line"></div>
          <div class="live-order__tracker-status">4</div>
        </li>
      </ul>
      <div
        v-if="!isReviewSubmitted && !isOrderDue() && currentOrderStage !== 4"
        class="live-order__review-box"
      >
        <header class="live-order__review-header">
          <h2 class="live-order__review-title">Please Leave A Review</h2>
        </header>

        <div class="live-order__input-box">
          <div>
            <div class="live-order__stars-box">
              <button
                v-for="rating of starRating"
                :key="rating.id"
                :title="rating.text"
                @mouseover="handleReviewStarMouseOver(rating.id)"
                @mouseleave="handleClearStarReview"
                @click="handleSetOrderReviewStarClick(rating.rating)"
                class="live-order__star-btn"
                :class="{
                  active:
                    ratingHoverId >= rating.id ||
                    reviewInput.stars >= rating.rating,
                }"
              >
                <Icon
                  name="iconamoon:star-fill"
                  class="live-order__star-icon"
                />
              </button>
            </div>
            <p
              v-if="reviewStarsErrorMessage"
              class="live-order__review-error-message"
            >
              {{ reviewStarsErrorMessage }}
            </p>
          </div>
          <div class="live-order__input-control">
            <label for="subject" class="live-order__label">Subject</label>
            <select
              v-model="reviewInput.reviewSubject"
              class="live-order__input"
              id="subject"
            >
              <option value="FOOD">Food</option>
              <option value="DRIVER">Driver</option>
              <option value="STUFF">Stuff</option>
              <option value="MANAGER">Manager</option>
              <option value="RESTAURANT">Restaurant</option>
              <option value="OTHER">Other</option>
            </select>
            <p
              v-if="reviewSubjectErrorMessage"
              class="live-order__review-error-message"
            >
              {{ reviewSubjectErrorMessage }}
            </p>
          </div>
          <div class="live-order__input-control">
            <label for="review" class="live-order__label">Review</label>
            <textarea
              v-model="reviewInput.message"
              id="review"
              class="live-order__input live-order__textarea"
            ></textarea>
            <p
              v-if="reviewErrorMessage"
              class="live-order__review-error-message"
            >
              {{ reviewErrorMessage }}
            </p>
          </div>
          <button
            @click="handleSubmitReviewClick"
            class="live-reder__input-btn"
          >
            Leave Review
          </button>
        </div>
      </div>
    </div>
  </section>
</template>
<script setup lang="ts">
import { socket } from "~/config/socketIo";
import { DateTime } from "luxon";
import { useCustomerStore } from "~/stores/useCustomerStore";
import { padZero } from "~/utils/padZero";
import { getOrder } from "~/api/all-api-handlers";
import { IOrder, OrderStatus } from "~/types/order";

const starRating = [
  { id: 1, rating: 1, text: "Terrible" },
  { id: 2, rating: 2, text: "Bad" },
  { id: 3, rating: 3, text: "Average" },
  { id: 4, rating: 4, text: "Good" },
  { id: 5, rating: 5, text: "Excellent" },
];

const customerStore = useCustomerStore();
const route = useRoute();
const order = ref({} as IOrder);
const orderCountdown = ref("");
const date = new Date();
const hour = date.getHours();
const ratingHoverId = ref(0);
const minutes = date.getMinutes();
const reviewInput = ref({ stars: 0, message: "", reviewSubject: "" });

const { $toast } = useNuxtApp();

const reviewErrorMessage = ref("");
const reviewSubjectErrorMessage = ref("");
const reviewStarsErrorMessage = ref("");

const isReviewSubmitted = ref(false);
let intervalId;

const doesOrderBelongToCustomer = (
  customerId: number,
  orderCustomerId: number
) => customerId === orderCustomerId;

watchEffect(async () => {
  const orderResponse = await getOrder(Number(route.params.id));
  if (!orderResponse.data.data.id) {
    $toast.error("No order exists with this id!");
    setTimeout(() => {
      navigateTo("/orders");
    }, 2000);
    return;
  }
  if (
    !doesOrderBelongToCustomer(
      customerStore.customer.id,
      orderResponse.data.data.customerId
    )
  ) {
    $toast.error("This order does not belong to you!");
    setTimeout(() => {
      navigateTo("/orders");
    }, 2000);
  }

  order.value = orderResponse.data.data;
  socket.on(
    "new-order-status",
    (orderData: { orderId: number; status: OrderStatus }) => {
      order.value =
        order.value.id === orderData.orderId
          ? { ...order.value, orderStatus: orderData.status }
          : order.value;
      clearInterval(intervalId);
    }
  );
});

watchEffect(() => {
  if (reviewInput.value.message.length >= 250) {
    reviewErrorMessage.value = "Maximum allowed review length is 250";
  } else {
    reviewErrorMessage.value = "";
  }

  if (reviewInput.value.reviewSubject.length) {
    reviewSubjectErrorMessage.value = "";
  }

  if (reviewInput.value.stars >= 1) {
    reviewStarsErrorMessage.value = "";
  }
});

const isOrderDue = () => {
  const orderSetTime = order.value.orderChosenTime;
  if (order.value?.created && orderSetTime) {
    let setTimeHour;
    let setTimeMinutes;
    const setYear = DateTime.fromISO(order.value.created).year;
    const setMonth = DateTime.fromISO(order.value.created).month;
    const setDay = DateTime.fromISO(order.value.created).day;
    const currentYear = date.getFullYear();
    const currentMonth = date.getMonth() + 1;
    const currentDay = date.getDate();
    const currentHour = date.getHours();
    const currentMinutes = date.getMinutes();

    if (order.value.orderType === "PICKUP") {
      setTimeHour = Number(orderSetTime.split(":")[0]);
      setTimeMinutes = Number(orderSetTime.split(":")[1]);
    } else {
      setTimeHour = Number(orderSetTime.split("-")[1].split(":")[0]);
      setTimeMinutes = Number(orderSetTime.split("-")[1].split(":")[1]);
    }

    if (
      currentYear !== setYear ||
      currentMonth !== setMonth ||
      currentDay !== setDay ||
      currentHour > setTimeHour ||
      (setTimeHour === currentHour && currentMinutes >= setTimeMinutes)
    ) {
      return true;
    }
    return false;
  }
};

watchEffect(() => {
  if (isOrderDue()) {
    return;
  }
  console.log(route.params.id);
  console.log(order.value);
  if (order?.value?.id) {
    let setTimeMinutes;
    let setTimeHour;
    const orderSetTime = order.value.orderChosenTime;
    if (order.value.orderType === "PICKUP") {
      setTimeHour = Number(orderSetTime.split(":")[0]);
      setTimeMinutes = Number(orderSetTime.split(":")[1]);
    } else {
      setTimeHour = Number(orderSetTime.split("-")[1].split(":")[0]);
      setTimeMinutes = Number(orderSetTime.split("-")[1].split(":")[1]);
    }
    const setTimeSeconds = setTimeHour * 60 * 60 + setTimeMinutes * 60;
    const curSeconds = hour * 60 * 60 + minutes * 60;
    let substSeconds = setTimeSeconds - curSeconds;
    if (substSeconds > 0) {
      intervalId = setInterval(() => {
        substSeconds -= 1;
        console.log(intervalId);
        const hour = Math.floor(substSeconds / 3600);
        const minutes = Math.floor(substSeconds / 60) % 60;
        const seconds = substSeconds % 60;
        orderCountdown.value = `${padZero(hour.toString(), 2)}:${padZero(
          minutes.toString(),
          2
        )}:${padZero(seconds.toString(), 2)}`;
      }, 1000);
    }
  }
});

const handleSubmitReviewClick = () => {
  if (!reviewInput.value.message.length) {
    reviewErrorMessage.value = "Review can't be empty";
  } else if (!reviewInput.value.reviewSubject.length) {
    reviewSubjectErrorMessage.value = "Subject must be selected";
  } else if (reviewInput.value.stars < 1) {
    reviewStarsErrorMessage.value = "Rating must be selected";
  } else {
    const reviewData = {
      ...reviewInput.value,
      reviewSubject: reviewInput.value.reviewSubject,
      customerId: customerStore.customer.id,
    };
    socket.emit("create-review", reviewData);
    isReviewSubmitted.value = true;
    $toast.success("Thank you very much! You review is received!");
  }
};

const handleReviewStarMouseOver = (reviewId: number) => {
  ratingHoverId.value = reviewId;
};
const handleSetOrderReviewStarClick = (rating: number) => {
  reviewInput.value = {
    ...reviewInput.value,
    stars: rating,
  };
};
const handleClearStarReview = () => {
  ratingHoverId.value = 0;
};

const currentOrderStage = computed(() => {
  const orderStatus = order.value.orderStatus;
  switch (orderStatus) {
    case "ORDER_CONFIRMED":
      return 1;
    case "ORDER_BEING_PREPARED":
      return 2;
    case "ORDER_BOXED":
      return 3;
    case "ORDER_DELIVERED":
    case "ORDER_PICKED_UP":
      clearInterval(intervalId);
      orderCountdown.value = "";
      return 4;
  }
});
</script>
<style scoped>
.live-order {
  margin: 50px 0 100px 0;
}
.live-order__header {
  text-align: center;
  margin: 35px 0;
}
.live-order__title {
  font-size: clamp(1.5rem, calc(1.5vw + 1rem), 2rem);
  font-weight: 600;
}
.live-order__sub--title {
  margin-bottom: 15px;
  text-align: left;
}
.live-order__countdown {
  margin-bottom: 25px;
  text-align: center;
}
.live-order__countdown-text {
  font-size: clamp(3.5rem, calc(8vw + 1rem), 8rem);
  font-weight: 600;
  color: #333;
  line-height: 1;
}

.live-order__tracker-list {
  display: flex;
  align-items: center;
  flex: 1;
}
.live-order__tracker-item {
  flex: 1;
  transform: skewX(-10deg);
  transition: all 0.3s ease-out;
}

.live-order__tracker-item.active .live-order__tracker-status--line,
.live-order__tracker-item.active .live-order__tracker-status {
  background: #fc8019;
  color: #fff;
}

.live-order__tracker-text {
  margin-bottom: 10px;
  font-weight: 600;
  color: #333;
  text-align: center;
}
.live-order__tracker-status--line {
  height: 10px;
  width: 90%;
  margin-bottom: 8px;
  background: #999;
}
.live-order__tracker-status {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 90%;
  height: 80px;
  font-size: 35px;
  font-weight: 600;
  background: #e7e7e7;
}

.live-order__review-box {
  width: 350px;
  margin-top: 50px;
}
.live-order__review-title {
  margin-bottom: 10px;
  font-size: 20px;
  font-weight: 600;
  color: #333;
}
.live-order__stars-box {
  display: flex;
  align-items: center;

  margin-bottom: 20px;
}
.live-order__star-btn {
  font-size: 25px;
  padding: 0 10px;
}
.live-order__star-icon {
  color: #cbcbcb;
}
.live-order__star-btn.active .live-order__star-icon {
  color: #111;
}
.live-order__input-control {
  margin-bottom: 20px;
}
.live-order__label {
  display: block;
}
.live-order__input {
  display: block;
  width: 100%;
  padding: 10px 5px;
  border-radius: 5px;
  transition: all 0.3s ease-out;
}
.live-order__input:focus {
  outline: 2px solid #fc8019;
}
.live-order__textarea {
  height: 80px;
  resize: none;
}
.live-order__review-error-message {
  margin-top: 5px;
  color: rgb(244, 34, 34);
  font-size: 14px;
  font-weight: 600;
}
.live-reder__input-btn {
  padding: 10px 20px;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  font-weight: 600;
  color: #333;
  border: 1px solid #999;
}

@media (min-width: 992px) {
  .live-order__row {
    display: flex;
    gap: 50px;
  }
  .live-order__countdown {
    margin-bottom: 0;
  }
}
</style>