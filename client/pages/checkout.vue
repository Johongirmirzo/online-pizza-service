<template>
  <section class="checkout">
    <header class="checkout__header">
      <h1 class="checkout__title">
        {{
          customerAddressStore.currentOrderType === "Delivery"
            ? customerAddressStore.currentOrderType
            : "Pick Up"
        }}
        Order
      </h1>
    </header>
    <ChooseAddressModal
      :isAddressModalOpen="isAddressModalOpen"
      :closeAddressModal="closeAddressModal"
      :openAddressModalForm="openAddressModalForm"
      :getAddressId="getAddressId"
    />
    <CustomerAddressModal
      :isAddressModalFormOpen="isAddressModalFormOpen"
      :closeAddressModalForm="closeAddressModalForm"
      :openAddressModal="openAddressModal"
      :editAddressId="editAddressId"
      :resetEditAddressId="resetEditAddressId"
    />

    <OrderTimeModal
      v-if="isTimeModalOpen"
      :isModalOpen="isTimeModalOpen"
      :closeModal="closeTimeModal"
      :orderType="customerAddressStore.currentOrderType"
      :getSelectedOrderTime="getSelectedOrderTime"
      :selectedOrderTime="selectedOrderTime"
      :defaultOrderTime="defaultOrderTime"
      :pickupTimes="pickupTimes"
      :deliveryTimes="deliveryTimes"
    />
    <div class="checkout__wrapper">
      <div class="checkout__order-box">
        <div class="checkout__row">
          <p class="checkout__order-text-label">Name</p>
          <div class="checkout__input-box">
            <p class="checkout__input-text">
              {{ customerStore.customer.name }}
            </p>
          </div>
        </div>
        <div class="checkout__row">
          <p class="checkout__order-text-label">Phone Number</p>
          <div class="checkout__input-box">
            <p class="checkout__input-text">
              {{ customerStore.customer.phone }}
            </p>
          </div>
        </div>
        <div class="checkout__row">
          <p class="checkout__order-text-label">
            {{
              customerAddressStore.currentOrderType === "Delivery"
                ? customerAddressStore.currentOrderType
                : "Pickup"
            }}
            Address
          </p>
          <div class="checkout__input-box checkout__delivery-type-box">
            <p
              v-if="
                customerAddressStore.currentOrderType === 'Pickup' ||
                !customerAddressStore.currentOrderType
              "
              class="checkout__address-text"
            >
              123 Margilon Street, Pizzeria
            </p>
            <p
              v-if="
                customerAddressStore.currentOrderType === 'Delivery' &&
                Object.keys(customerAddressStore.currentActiveCustomerAddress)
                  .length
              "
              class="checkout__address-text"
            >
              street.
              {{
                customerAddressStore.currentActiveCustomerAddress.streetName
              }}, approach.
              {{ customerAddressStore.currentActiveCustomerAddress.approach }},
              floor.
              {{ customerAddressStore.currentActiveCustomerAddress.floor }},
              doorcode.
              {{ customerAddressStore.currentActiveCustomerAddress.doorCode }},
              apartment number.
              {{
                customerAddressStore.currentActiveCustomerAddress
                  .apartmentNumber
              }}
            </p>
            <div class="checkout__address-btns-box">
              <button @click="openAddressModal" class="checkout__address-btn">
                Change
              </button>
              <button @click="openAddressModal" class="checkout__address-btn">
                Choose
                {{
                  customerAddressStore.currentOrderType === "Delivery"
                    ? "Pick Up"
                    : "Delivery"
                }}
              </button>
            </div>
          </div>
        </div>

        <div class="checkout__row">
          <p class="checkout__order-text-label">
            {{
              customerAddressStore.currentOrderType === "Delivery"
                ? customerAddressStore.currentOrderType
                : "Pickup"
            }}
            Time
          </p>
          <div
            v-if="customerAddressStore.currentOrderType === 'Pickup'"
            class="checkout__order-time-box checkout__order-time-pickup-box"
          >
            <button
              @click="setCurrentOrderTime(defaultOrderTime)"
              class="checkout__order-time-btn"
              :class="{
                active:
                  selectedOrderTime === defaultOrderTime || !selectedOrderTime,
              }"
            >
              After 15 min
            </button>
            <button
              v-for="(orderTime, idx) of pickupTimes.slice(0, 2)"
              :key="idx"
              @click="setCurrentOrderTime(orderTime)"
              class="checkout__order-time-btn"
              :class="{ active: orderTime === selectedOrderTime }"
            >
              {{ orderTime }}
            </button>
            <button
              v-if="
                isSelectedFromTimeModal &&
                !pickupTimes.slice(0, 2).includes(selectedOrderTime)
              "
              class="checkout__order-time-btn active"
              :class="{ active: orderTime === selectedOrderTime }"
            ></button>
            <button
              @click="openTimeModal"
              class="checkout__order-time-btn checkout__order-change-time-btn"
            >
              Change Time
            </button>
          </div>
          <div
            v-if="customerAddressStore.currentOrderType === 'Delivery'"
            class="checkout__order-time-box checkout__order-time-pickup-box"
          >
            <button
              @click="setCurrentOrderTime(defaultOrderTime)"
              class="checkout__order-time-btn"
              :class="{
                active:
                  selectedOrderTime === defaultOrderTime || !selectedOrderTime,
              }"
            >
              After 45 min
            </button>
            <button
              v-for="(orderTime, idx) of deliveryTimes.slice(0, 2)"
              :key="idx"
              @click="setCurrentOrderTime(orderTime)"
              class="checkout__order-time-btn"
              :class="{ active: orderTime === selectedOrderTime }"
            >
              {{ orderTime }}
            </button>
            <button
              v-if="
                isSelectedFromTimeModal &&
                defaultOrderTime !== selectedOrderTime &&
                !deliveryTimes.slice(0, 2).includes(selectedOrderTime)
              "
              class="checkout__order-time-btn active"
              :class="{ active: orderTime === selectedOrderTime }"
            >
              {{ selectedOrderTime }}
            </button>
            <button
              @click="openTimeModal"
              class="checkout__order-time-btn checkout__order-change-time-btn"
            >
              Change Time
            </button>
          </div>
        </div>
        <div class="checkout__order-note-box">
          <header class="checkout__order-note-header">
            <h5 class="checkout__order-note-title">Order Note</h5>
          </header>
          <textarea
            class="checkout__order-note-textarea"
            placeholder="Enter order note"
            v-model.trim="orderNote"
            :class="{ disabled: isOrderNoteSaved }"
            :disabled="isOrderNoteSaved"
          >
          </textarea>
          <p
            class="checkout__order-note-error-message"
            v-if="orderNoteErrorMessage"
          >
            {{ orderNoteErrorMessage }}
          </p>

          <div class="checkout__order-note-btns-box">
            <button
              v-if="isOrderNoteSaved"
              @click="handleSaveOrderNoteClick"
              class="checkout__order-note-btn checkout__order-note-btn--edit"
            >
              Change
            </button>
            <button
              v-if="!isOrderNoteSaved"
              @click="handleSaveOrderNoteClick"
              class="checkout__order-note-btn checkout__order-note-btn--save"
            >
              Save
            </button>
          </div>
        </div>
        <OrderPaymentOption
          :totalSum="cartStore.calculateTotal()"
          :isWithChange="isWithChange"
          :toggleWithChange="toggleWithChange"
          v-model:changeAmount="changeAmount"
          v-model:paymentMethod="paymentMethod"
        />
        <footer class="checkout__footer">
          <NuxtLink to="/cart" class="checkout__go-back-link">
            <Icon name="ant-design:left-outlined" />
            Go Back to Cart
          </NuxtLink>
          <button
            @click="handleMakeOrderClick"
            class="checkout__make-order-btn"
          >
            Place an order for {{ cartStore.calculateTotal() }} uzs
            <Icon name="ant-design:right-outlined" />
          </button>
        </footer>
      </div>

      <aside class="checkout__details">
        <div class="checkout__details-box">
          <header class="checkout__details-header">
            <h5 class="checkout__details-title">Order Items</h5>
          </header>
          <ul class="checkout__order-list">
            <li
              v-for="cartItem of cartStore.cartItems"
              :key="cartItem.id"
              class="checkout__order-item"
            >
              <div class="checkout__order-item-left">
                <img
                  class="checkout__order-item-photo"
                  :src="cartItem.photo"
                  :alt="cartItem.name"
                />
                <div>
                  <p class="checkout__order-item-name">
                    {{ cartItem.name }} x {{ cartItem.amount }}
                  </p>
                  <p class="checkout__order-item-description">
                    {{ cartItem.type }}
                  </p>
                </div>
              </div>
              <p class="checkout__order-item-right">{{ cartItem.total }} uzs</p>
            </li>
          </ul>
          <div class="checkout__products-amount-box">
            <span
              >{{
                cartStore.cartItems.reduce((prev, cur) => prev + cur.amount, 0)
              }}

              Products</span
            >
            <span> {{ cartStore.calculateTotal() }} uzs </span>
          </div>
          <div class="checkout__total-sum-box">
            <span>Order Total</span>
            <span>{{ cartStore.calculateTotal() }} uzs</span>
          </div>
          <footer
            v-if="customerAddressStore.currentOrderType === 'Delivery'"
            class="checkout__order-footer"
          >
            <span>Free Delivery</span>
          </footer>
        </div>
      </aside>
    </div>
  </section>
</template>
<script setup lang="ts">
import { socket } from "~/config/socketIo";
import { generateDeliveryTimes } from "~/utils/generateDeliveryTimes";
import { generateOrderPickupTimes } from "~/utils/generatePickupTimes";
import { useCustomerStore } from "~/stores/useCustomerStore";
import { useCustomerAddress } from "~/stores/useCustomerAddress";
import { useCartStore } from "~/stores/useCartStore";

const cartStore = useCartStore();
const customerStore = useCustomerStore();
const customerAddressStore = useCustomerAddress();
const orderTime = ref("");
const isSelectedFromTimeModal = ref(false);
const defaultOrderTime = ref<string>("");
const selectedOrderTime = ref<string>("");
const editAddressId = ref(-1);
const pickupTimes = ref<string[]>([]);
const deliveryTimes = ref<string[]>([]);
const orderNote = ref("");
const isOrderNoteSaved = ref(false);
const { $toast } = useNuxtApp();

const paymentMethod = ref("CASH");
const changeAmount = ref("");
const isWithChange = ref(false);

const toggleWithChange = () => {
  isWithChange.value = !isWithChange.value;
};

const orderNoteErrorMessage = computed(() =>
  orderNote.value.length > 250 ? "Maximum allowed order note length is 250" : ""
);
const {
  isModalOpen: isAddressModalOpen,
  closeModal: closeAddressModal,
  openModal: openAddressModal,
} = useModal();
const {
  isModalOpen: isAddressModalFormOpen,
  closeModal: closeAddressModalForm,
  openModal: openAddressModalForm,
} = useModal();
const {
  isModalOpen: isTimeModalOpen,
  closeModal: closeTimeModal,
  openModal: openTimeModal,
} = useModal();

const getAddressId = (id: number) => {
  editAddressId.value = id;
  openAddressModalForm();
};
const resetEditAddressId = () => {
  editAddressId.value = -1;
};

const setCurrentOrderTime = (time: string) => {
  selectedOrderTime.value = time;
  isSelectedFromTimeModal.value = false;
};

const getSelectedOrderTime = (time: string) => {
  selectedOrderTime.value = time;
  isSelectedFromTimeModal.value = true;
};

const isRestaurantClosed = () => {
  const date = new Date();
  const hour = date.getHours();
  const minutes = date.getMinutes();
  return hour < 9 || (hour === 23 && minutes > 45);
};
const printRestaurantClosedErrorMessage = () => {
  $toast.warn(
    "Sorry our restaurant is currently close!. We can't take any orders!. Opening hours are in between 9:00-23:45"
  );
  setTimeout(() => navigateTo("/"), 2000);
};

onMounted(() => {
  if (isRestaurantClosed()) {
    printRestaurantClosedErrorMessage();
  }
});

onMounted(() => {
  if (!cartStore.cartItems.length) {
    navigateTo("/");
  }
});

const hasCustomerChosenAddressType = () =>
  customerAddressStore.currentActiveCustomerAddress.id;

const handleMakeOrderClick = () => {
  if (
    !hasCustomerChosenAddressType() &&
    customerAddressStore.currentOrderType === "Delivery"
  ) {
    return $toast.error("Please choose either pickup or delivery address!");
  }
  if (isRestaurantClosed()) {
    printRestaurantClosedErrorMessage();
  }
  const date = new Date();
  const orderReceivingTime = `${padZero(
    date.getHours().toString(),
    2
  )}:${padZero(date.getMinutes().toString(), 2)}`;
  const order = {
    paymentMethod: paymentMethod.value,
    change: changeAmount.value,
    orderNote: orderNote.value,
    orderItems: JSON.stringify(cartStore.cartItems),
    orderTotal: cartStore.calculateTotal(),
    orderType: customerAddressStore.currentOrderType.toUpperCase(),
    customerId: customerStore.customer.id,
    orderChosenTime: selectedOrderTime.value || defaultOrderTime.value,
    orderReceivingTime,
  };
  if (
    customerAddressStore.currentOrderType === "Delivery" &&
    cartStore.calculateTotal() < 50000
  ) {
    $toast.error("Minimum delivery price is 50000 uzs");
  } else {
    socket.emit("create-order", order);
    socket.on("create-order-order", (err: string) => {
      alert(err);
    });

    cartStore.clearCart();
    socket.on("new-order", (order: any) => {
      navigateTo(`/live-order/${order.id}`);
    });
  }
};

const handleSaveOrderNoteClick = () => {
  isOrderNoteSaved.value = !isOrderNoteSaved.value;
};

watchEffect(() => {
  if (customerAddressStore.currentOrderType === "Pickup") {
    const date = new Date();
    const minutes = (date.getMinutes() + 15) % 60;
    const hour =
      date.getMinutes() + 15 > 59 ? date.getHours() + 1 : date.getHours();
    defaultOrderTime.value = `${hour}:${minutes.toString().padStart(2, "0")}`;
    pickupTimes.value = generateOrderPickupTimes();
  } else {
    const date = new Date();
    const minutes = (date.getMinutes() + 45) % 60;
    const hour = minutes > 59 ? date.getHours() + 1 : date.getHours();
    defaultOrderTime.value = `${padZero(
      date.getHours().toString(),
      2
    )}:${padZero(date.getMinutes().toString(), 2)} - ${
      date.getMinutes() + 45 > 59
        ? padZero((hour + 1).toString(), 2)
        : padZero(hour.toString(), 2)
    }:${padZero(minutes.toString(), 2)}`;
    deliveryTimes.value = generateDeliveryTimes();
  }
});

watchEffect(() => {
  setTimeout(() => {
    if (!customerStore.customer.id) {
      navigateTo("/");
    }
  }, 2000);
});
</script>
<style scoped>
.checkout {
  margin-top: 50px;
}
.checkout__header {
  margin-bottom: 50px;
}
.checkout__order-note-title,
.checkout__title {
  font-size: clamp(1.7rem, calc(1.7vw + 1rem), 2.2rem);
}
.checkout__wrapper {
  display: flex;
  flex-direction: column-reverse;
  gap: 50px;
}
.checkout__order-box {
  flex: 2;
  margin-bottom: 25px;
}

.checkout__row {
  margin-bottom: 50px;
}
.checkout__order-text-label {
  padding-bottom: 5px;
  width: 200px;
}
.checkout__input-box {
  flex: 1;
  border: 1px solid #999;
  padding: 10px;
  border-radius: 10px;
  background: rgb(243, 243, 247);
  cursor: not-allowed;
}
.checkout__delivery-type-box {
  display: flex;
  justify-content: space-between;
  min-height: 80px;
}
.checkout__delivery-type-box > * {
  flex: 1;
}
.checkout__address-btns-box {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  flex-wrap: wrap;
  justify-content: space-between;
}
.checkout__address-text {
  font-weight: 600;
  color: #333;
}
.checkout__address-btn {
  color: #fc8019;
  font-size: 16px;
  font-weight: 600;
}
.checkout__order-time-pickup-box {
  flex-wrap: wrap;
}
.checkout__order-time-btn {
  padding: 15px 20px;
  transition: box-shadow 0.3s ease-out;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
  font-weight: 600;
  color: #444;
  border: 2px solid transparent;
  transition: box-shadow 0.3s ease-out;
  border-radius: 10px;
}
.checkout__order-time-btn:hover {
  box-shadow: inset;
}
.checkout__order-time-btn.active {
  border: 2px solid #fc8019;
}
.checkout__order-time-box {
  display: flex;
  align-items: center;
  gap: 15px;
}

.checkout__order-note-box {
  margin-bottom: 50px;
  padding: 25px;
  background: #e9e9e9;
  border-radius: 10px;
}
.checkout__order-note-header {
  margin-bottom: 15px;
}

.checkout__order-note-textarea {
  display: block;
  width: 100%;
  padding: 10px;
  height: 80px;
  border-radius: 10px;
  resize: none;
}
.checkout__order-note-textarea.disabled {
  cursor: not-allowed;
  background: rgb(206, 206, 206);
}
.checkout__order-note-textarea:focus {
  outline-color: #fc8019;
}
.checkout__order-note-error-message {
  color: rgb(240, 44, 44);
  font-size: 15px;
  font-weight: 600;
}
.checkout__order-note-btns-box {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 25px;
}
.checkout__order-note-btn {
  padding: 10px 20px;
  font-size: 16px;
  background: #fc8019;
  color: #fff;
  border-radius: 10px;
}
.checkout__footer {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 20px;
  margin-top: 35px;
}
.checkout__go-back-link,
.checkout__make-order-btn {
  padding: 15px 20px;
  font-size: 16px;
  border-radius: 25px;
  font-weight: 600;
}
.checkout__go-back-link {
  background: #e9e9e9;
  color: #333;
}
.checkout__make-order-btn {
  background: #fc8019;
  color: #fff;
}

.checkout__details {
  flex: 1;
}
.checkout__details-box {
  position: sticky;
  top: 120px;
  padding: 15px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
}
.checkout__order-list {
  height: 350px;
  overflow-y: scroll;
}
.checkout__order-list::-webkit-scrollbar {
  height: 10px;
  width: 5px;
}
.checkout__order-list::-webkit-scrollbar-track {
  background: transparent;
}
.checkout__order-list::-webkit-scrollbar-thumb {
  background: #999;
}
.checkout__details-header {
  margin-bottom: 25px;
}
.checkout__details-title {
  font-size: 19px;
  font-weight: 600;
  color: #333;
}
.checkout__order-item-photo {
  width: 50px;
}
.checkout__order-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 25px;
}
.checkout__order-item-left {
  display: flex;
  align-items: center;
  gap: 10px;
}

.checkout__order-item-right,
.checkout__order-item-name {
  font-weight: 600;
  color: #333;
}

.checkout__total-sum-box,
.checkout__products-amount-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 0;
  border-top: 1px solid #e7e7e7;
  font-weight: 600;
  color: #333;
}
.checkout__products-amount-box {
  font-size: 14px;
}
.checkout__order-footer {
  text-align: center;
  color: #555;
}

@media (min-width: 768px) {
  .checkout__wrapper {
    display: flex;
    flex-direction: row;
    gap: 50px;
  }
  .checkout__row {
    display: flex;
  }
  .checkout__order-box {
    flex: 2;
    margin-bottom: 25px;
  }
  .checkout__details {
    width: 350px;
  }
  .checkout__footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>