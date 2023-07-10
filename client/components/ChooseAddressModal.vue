<template>
  <div v-if="isAddressModalOpen" class="modal-wrapper">
    <section
      class="choose-address"
      :class="{ active: isAddressModalOpen, closed: isAddressModalClosed }"
    >
      <button
        @click.stop="handleCloseModalClick"
        class="choose-address__close-btn"
      >
        <Icon name="maki:cross" />
      </button>
      <header class="choose-address__header">
        <h2 class="choose-address__title">My Addresses</h2>
        <div>
          <div ref="btnBox" class="choose-address__change-address-type-box">
            <button
              @click="handleChangeOrderTypeClick(0)"
              class="choose-address__change-address-btn"
            >
              Delivery
            </button>
            <button
              @click="handleChangeOrderTypeClick(1)"
              class="choose-address__change-address-btn"
            >
              Pickup
            </button>
            <span ref="spanEl" class="choose-address__btn-wrapper-text"> </span>
          </div>
        </div>
      </header>
      <div
        v-if="currentOrderType === 'Delivery'"
        class="choose-address__delivery-box"
      >
        <ul
          v-if="customerAddressStore.customerAddresses.length"
          class="choose-address__customer-address-list"
        >
          <li
            v-for="customerAddress of customerAddressStore.customerAddresses"
            :key="customerAddress.id"
            class="choose-address__customer-address-item"
            :class="{
              active:
                focussedAddressId === customerAddress.id ||
                customerAddressStore.currentActiveCustomerAddress.id ===
                  customerAddress.id,
            }"
            @click="setFocusedAddressId(customerAddress.id)"
          >
            <div class="choose-address__customer-address-box">
              <Icon
                class="choose-address__customer-address-icon"
                name="gridicons:location"
              />
              <div class="choose-address__customer-address-text-box">
                <p class="choose-address__customer-address-text">
                  street. {{ customerAddress.streetName }}, approach.
                  {{ customerAddress.approach }}, floor.
                  {{ customerAddress.floor }}, doorcode.
                  {{ customerAddress.doorCode }}, apartment number.
                  {{ customerAddress.apartmentNumber }}
                </p>
              </div>
              <Icon
                @click="getAddressId(customerAddress.id)"
                class="choose-address__customer-address-icon choose-address__customer-edit-icon"
                name="ic:round-edit"
              />
            </div>
          </li>
        </ul>
        <div v-else class="choose-address__img-box">
          <img
            class="choose-address__empty-address-img"
            src="~/assets/images/location.png"
            alt="geolocation"
          />
          <p class="choose-address__customer-address-empty-text">
            There are not addresses yet
          </p>
        </div>
        <div
          class="choose-address__customer-address-btns-box"
          :class="{
            'empty-addresses': !customerAddressStore.customerAddresses.length,
          }"
        >
          <button
            @click="handleAddAddressClick"
            class="choose-address__customer-address-btn choose-address__customer-address-btn--add-address"
          >
            Add Address</button
          ><button
            v-if="
              customerAddressStore.customerAddresses.length &&
              focussedAddressId >= 0
            "
            class="choose-address__customer-address-btn"
            @click="handleSetCurrentOrderTypeClick('Delivery')"
          >
            Choose
          </button>
        </div>
      </div>
      <div v-else class="choose-address__pickup-box">
        <header class="choose-address__pickup-header">
          <h4 class="choose-address__pickup-title">
            123 Margilon Street, Pizzeria
          </h4>
        </header>
        <button
          @click="handleSetCurrentOrderTypeClick('Pickup')"
          class="choose-address__customer-address-btn choose-address__set-pickup-btn"
        >
          Choose
        </button>
      </div>
    </section>
  </div>
</template>
<script setup lang="ts">
import { useCustomerStore } from "~/stores/useCustomerStore";
import { useCustomerAddress } from "~/stores/useCustomerAddress";
import { getUserOrderType, storeUserOrderType } from "~/utils/helperStorage";
import { ICustomerAddress } from "~/types/customer-address";
import { getAllAddresses } from "~/api/all-api-handlers";

const props = defineProps([
  "isAddressModalOpen",
  "closeAddressModal",
  "openAddressModalForm",
  "getAddressId",
]);

const userOrderType = getUserOrderType();

const customerAddresses = ref<ICustomerAddress[]>([]);
const customerAddressStore = useCustomerAddress();
const customerStore = useCustomerStore();
const currentOrderType = ref("");
const focussedAddressId = ref(-1);
const currentOrderTypeIndex = ref(userOrderType === "Delivery" ? 0 : 1);
const isAddressModalClosed = ref(false);
const spanEl = ref<HTMLElement>();
const btnBox = ref<HTMLElement>();

const handleChangeOrderTypeClick = (idx: number) => {
  currentOrderTypeIndex.value = idx;
};

const handleCloseModalClick = () => {
  isAddressModalClosed.value = true;
  setTimeout(() => {
    props.closeAddressModal();
  }, 400);
};

const handleSetCurrentOrderTypeClick = (orderType: string) => {
  if (orderType === "Pickup") {
    customerAddressStore.setCurrentOrderType("Pickup");
    handleCloseModalClick();
  } else {
    customerAddressStore.setCurrentOrderType("Delivery");
    customerAddressStore.setCurrentActiveCustomerAddress(
      focussedAddressId.value
    );
    handleCloseModalClick();
  }
};

const handleAddAddressClick = () => {
  props.closeAddressModal();
  props.openAddressModalForm();
};

const setFocusedAddressId = (id: number) => {
  focussedAddressId.value = id;
};

watchEffect(() => {
  console.log(focussedAddressId.value);
  if (props.isAddressModalOpen) {
    isAddressModalClosed.value = false;
  }
});

watchEffect(() => {
  currentOrderType.value =
    currentOrderTypeIndex.value === 0 ? "Delivery" : "Pickup";
});

watchEffect(() => {
  if (btnBox.value) {
    const btnBoxWidth = btnBox.value.clientWidth;
    spanEl.value.style = `transform: translateX(${
      Math.floor(btnBoxWidth / 2) * currentOrderTypeIndex.value
    }px); background: #fff; width: ${Math.floor(
      btnBox.value.clientWidth / 2
    )}px`;
  }
});

onMounted(async () => {
  try {
    const customerAddressesResp = await getAllAddresses(
      customerStore.customer.id
    );
    customerAddresses.value = customerAddressesResp.data.data;
    console.log(customerAddressesResp.data.data);
  } catch (err) {
    console.log(err);
  }
});
</script>
<style scoped>
.modal-wrapper {
  position: fixed;
  inset: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.5);
  z-index: 9999;
}
.choose-address {
  position: relative;
  max-width: 560px;
  width: 95%;
  height: 500px;
  overflow-x: hidden;
  overflow-y: scroll;
  padding: 50px 25px;
  border-radius: 20px;
  background: #fff;
}
.choose-address::-webkit-scrollbar {
  height: 10px;
  width: 5px;
}
.choose-address::-webkit-scrollbar-track {
  margin-top: 150px;
  margin-bottom: 50px;
  background: transparent;
}
.choose-address::-webkit-scrollbar-thumb {
  background: #999;
}

.choose-address.active {
  animation: open 0.5s;
}
.choose-address.closed {
  animation: closed 0.5s;
}
@keyframes open {
  from {
    transform: scale(0.1);
  }
  to {
    transform: scale(1);
  }
}
@keyframes closed {
  from {
    transform: scale(1);
  }
  to {
    transform: scale(0.1);
  }
}
.choose-address__header {
  position: sticky;
  top: -50px;
  padding: 10px 0;
  text-align: center;
  background: #fff;
  box-shadow: 0 10px 20px rgba(255, 255, 255, 0.5);
}
.choose-address__title {
  margin: 10px 0;
  font-size: clamp(1.2rem, calc(1.2vw + 1rem), 1.5rem);
}

.choose-address__close-btn {
  position: sticky;
  top: -30px;
  right: 20px;
  font-size: 30px;
  color: #333;
  transition: transform 0.3s ease-out;
  z-index: 9999;
}
.choose-address__close-btn:hover {
  transform: scale(1.1);
}
.choose-address__change-address-type-box {
  position: relative;
  display: flex;
  align-items: center;
  width: 250px;
  margin: 25px auto;
  border-radius: 30px;
  background: rgb(243, 243, 247);
  z-index: 0;
}

.choose-address__change-address-btn {
  display: block;
  width: 100%;
  padding: 10px 0;
  margin: 5px;
  z-index: 2;
  background: transparent;
  border-radius: inherit;
  flex: 1;
  z-index: 2;
  font-size: 16px;
  text-align: center;
}
.choose-address__btn-wrapper-text {
  position: absolute;
  inset: 0;
  margin: 2px;
  border-radius: inherit;
  z-index: 1;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
  background: #fff;
}
.choose-address__img-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 25px 0;
}
.choose-address__empty-address-img {
  width: 150px;
}
.choose-address__customer-address-empty-text {
  margin-top: 10px;
  font-size: 19px;
  font-weight: 600;
  color: #999;
}
.choose-address__customer-address-btns-box {
  position: sticky;
  bottom: -50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #fff;
  padding: 20px 0;
  box-shadow: 0 0 10px 20px rgba(255, 255, 255, 0.5);
}
.choose-address__customer-address-btn--add-address {
  background: hsl(27, 97%, 74%);
}
.choose-address__customer-address-btns-box.empty-addresses {
  justify-content: center;
}
.choose-address__customer-address-item {
  display: flex;
  justify-content: space-between;
  margin-bottom: 25px;
  padding: 15px;
  transition: border 0.3s ease-out;
  border: 3px solid#e7e7e7e7;
  cursor: pointer;
  border-radius: 10px;
}
.choose-address__customer-address-item.active {
  border: 3px solid #fc8019;
}
.choose-address__customer-address-box {
  display: flex;
  gap: 15px;
}
.choose-address__customer-address-icon {
  font-size: 50px;
  color: #fc8019;
}
.choose-address__customer-address-text {
  font-weight: 600;
  color: #333;
}

.choose-address__customer-address-btn {
  padding: 15px 35px;
  border-radius: 30px;
  background: hsl(27, 97%, 64%);
  color: #fff;
  font-size: 16px;
  font-weight: 600;
  transition: background 0.3s ease-out;
}
.choose-address__customer-address-btn:hover {
  background: hsl(27, 97%, 60%);
}

.choose-address__pickup-box {
  text-align: center;
}
.choose-address__pickup-header {
  margin: 35px 0 15px 0;
  padding: 10px;
  border: 2px solid #fc8019;
  border-radius: 10px;
  cursor: pointer;
}
.choose-address__pickup-title {
  font-size: 25px;
}
.choose-address__set-pickup-btn {
  margin-top: 25px;
}
</style>