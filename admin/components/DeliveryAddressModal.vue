<template>
  <div v-if="isAddressModalOpen" class="modal-wrapper">
    <section
      class="delivery-address"
      :class="{ active: isAddressModalOpen, closed: isAddressModalClosed }"
    >
      <button
        @click.stop="handleCloseModalClick"
        class="delivery-address__close-btn"
      >
        <Icon name="maki:cross" />
      </button>

      <header class="delivery-address__header">
        <h2 class="delivery-address__title">
          <span v-if="customerDeliveryAddress.orderType === 'DELIVERY'"
            >Delivery Address</span
          >
          <span v-else>Pickup</span>
        </h2>
      </header>
      <div class="delivery-address__body">
        <div>
          <p class="delivery-address__text">
            <span class="delivery-address__bold">
              <Icon class="delivery-address__icon" name="uil:user" />
              Customer Name</span
            >
            {{ customerDeliveryAddress.name }}
          </p>
          <p class="delivery-address__text">
            <span class="delivery-address__bold">
              <Icon class="delivery-address__icon" name="solar:phone-linear" />
              Customer Phone</span
            >
            <a :href="`tel:${customerDeliveryAddress.phone}`"
              >+{{ customerDeliveryAddress.phone }}</a
            >
          </p>
          <p class="delivery-address__text">
            <span class="delivery-address__bold">
              <Icon class="delivery-address__icon" name="grommet-icons:money" />
              Change Amount</span
            >
            <span v-if="customerDeliveryAddress.change">
              {{ customerDeliveryAddress.change }}
            </span>
            <span v-else>No change required</span>
          </p>
          <p class="delivery-address__text">
            <span class="delivery-address__bold">
              <Icon class="delivery-address__icon" name="grommet-icons:money" />
              Order Total</span
            >
            {{ customerDeliveryAddress.orderTotal }} uzs
          </p>
          <p class="delivery-address__text">
            <span class="delivery-address__bold">
              <Icon class="delivery-address__icon" name="ph:note" />
              Order Note</span
            >
            <span v-if="customerDeliveryAddress.orderNote">
              {{ customerDeliveryAddress.orderNote }}
            </span>
            <span v-else> Customer hasn't written any note </span>
          </p>
          <p class="delivery-address__text">
            <span class="delivery-address__bold">
              <Icon
                class="delivery-address__icon"
                name="icon-park-outline:time"
              />
              Order Chosen Time</span
            >
            {{ customerDeliveryAddress.orderChosenTime }}
          </p>
        </div>
        <div v-if="customerDeliveryAddress.orderType === 'DELIVERY'">
          <p class="delivery-address__text">
            <span class="delivery-address__bold">
              <Icon
                class="delivery-address__icon"
                name="solar:streets-map-point-outline"
              />
              Street Name</span
            >
            {{ customerDeliveryAddress.streetName }}
          </p>
          <p class="delivery-address__text">
            <span class="delivery-address__bold">
              <Icon
                class="delivery-address__icon"
                name="solar:point-on-map-broken"
              />
              Approach</span
            >
            {{ customerDeliveryAddress.approach }}
          </p>
          <p class="delivery-address__text">
            <span class="delivery-address__bold">
              <Icon class="delivery-address__icon" name="octicon:location-16" />
              Floor</span
            >
            {{ customerDeliveryAddress.floor }}
          </p>
          <p class="delivery-address__text">
            <span class="delivery-address__bold">
              <Icon
                class="delivery-address__icon"
                name="teenyicons:password-outline"
              />
              Door Code</span
            >
            {{ customerDeliveryAddress.doorCode }}
          </p>
          <p class="delivery-address__text">
            <span class="delivery-address__bold">
              <Icon
                class="delivery-address__icon"
                name="ant-design:number-outlined"
              />
              Apartment Number</span
            >
            {{ customerDeliveryAddress.apartmentNumber }}
          </p>
          <p class="delivery-address__text">
            <span class="delivery-address__bold">
              <Icon
                class="delivery-address__icon"
                name="majesticons:comment-line"
              />
              Comment</span
            >
            {{ customerDeliveryAddress.comment }}
          </p>
        </div>
      </div>
    </section>
  </div>
</template>
  <script setup lang="ts">
const props = defineProps([
  "isAddressModalOpen",
  "toggleModal",
  "customerDeliveryAddress",
  "isLoading",
]);

const isAddressModalClosed = ref(false);

watchEffect(() => {
  if (props.isAddressModalOpen) {
    isAddressModalClosed.value = false;
  }
});

const handleCloseModalClick = () => {
  isAddressModalClosed.value = true;
  setTimeout(() => {
    props.toggleModal();
  }, 400);
};
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
.delivery-address {
  position: relative;
  max-width: 560px;
  width: 95%;
  border-radius: 10px;
  background: #fff;
}

.delivery-address.active {
  animation: open 0.5s;
}
.delivery-address.closed {
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
.delivery-address__body,
.delivery-address__header {
  padding: 10px 15px;
}
.delivery-address__header {
  border-top-left-radius: inherit;
  border-top-right-radius: inherit;
  text-align: center;
  background: #fff;
  border-bottom: 1px solid #e5e5e5;
  box-shadow: 0 5px 25px rgba(0, 0, 0, 0.2);
}
.delivery-address__title {
  font-size: clamp(1.2rem, calc(1.2vw + 1rem), 1.5rem);
}

.delivery-address__close-btn {
  position: absolute;
  top: -50px;
  right: 10px;
  font-size: 30px;
  color: #fff;
  transition: transform 0.3s ease-out;
  z-index: 9999;
}
.delivery-address__close-btn:hover {
  transform: scale(1.1);
}

.delivery-address__body {
  padding: 25px 15px;
  height: 450px;
  overflow-x: hidden;
  overflow-y: scroll;
}
.delivery-address__body::-webkit-scrollbar {
  height: 10px;
  width: 5px;
}
.delivery-address__body::-webkit-scrollbar-track {
  background: transparent;
}
.delivery-address__body::-webkit-scrollbar-thumb {
  background: #999;
}

.delivery-address__text {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 25px;
  padding-bottom: 15px;
  font-size: 1.1rem;
  border-bottom: 1px solid #e7e7e7;
  color: #555;
}
.delivery-address__text:not(:last-child) {
  margin-bottom: 10px;
}
.delivery-address__bold {
  width: 200px;
  margin-right: 0;
  font-weight: bold;
  color: #333;
}

@media (min-width: 768px) {
  .delivery-address__close-btn {
    position: absolute;
    top: 0;
    right: -45px;
  }
}
</style>