<template>
  <tr>
    <td class="orders-table__cell">
      <p class="orders-table__text">
        {{ orderItem.id }}
      </p>
    </td>
    <td class="orders-table__cell">
      <button
        class="orders-table__text orders-table__order-type-text"
        :class="{
          'orders-table__text--delivery': orderItem.orderType === 'DELIVERY',
        }"
        @click="
          handleGetCustomerIdClick(orderItem.customerId, orderItem.orderType)
        "
      >
        <Icon
          v-if="orderItem.orderType === 'DELIVERY'"
          class="orders-table__location-icon"
          name="akar-icons:location"
        />
        {{ orderItem.orderType }}
      </button>
    </td>
    <td class="orders-table__cell">
      <p class="orders-table__text">
        {{ orderItem.paymentMethod }}
      </p>
    </td>
    <td class="orders-table__cell orders-table__status--cell">
      <button
        @click.stop="handleTogglePaymentStatusDropdown(orderItem.id)"
        class="orders-table__toggle-status-btn"
        :class="[
          orderItem.paymentStatus === 'PENDING'
            ? 'orders-table__toggle-status-btn--pending-active'
            : orderItem.paymentStatus === 'APPROVED'
            ? 'orders-table__toggle-status-btn--active-active'
            : 'orders-table__toggle-status-btn--inactive-active',
        ]"
      >
        <Icon
          name="fontisto:radio-btn-active"
          class="orders-table__status-icon"
        />
        {{ orderItem.paymentStatus }}
        <Icon name="teenyicons:down-solid" class="orders-table__down-icon" />
      </button>

      <ul
        class="orders-table__payment-dropdown"
        :class="{
          active:
            paymentActiveRowId === orderItem.id && isPaymentStatusDropdownOpen,
          'orders-table__dropdown--last-row-list': isLastRow,
        }"
      >
        <li class="orders-table__dropdown-item">
          <button
            class="orders-table__status--pending-btn"
            :class="{ active: orderItem.paymentStatus === 'PENDING' }"
            :disabled="orderItem.paymentStatus === 'PENDING'"
            @click.stop="
              handleChangeOrderPaymentStatus(orderItem.id, 'PENDING')
            "
          >
            <Icon
              name="fontisto:radio-btn-active"
              class="orders-table__status-icon"
            />
            Pending
          </button>
        </li>
        <li class="orders-table__dropdown-item">
          <button
            class="orders-table__status--active-btn"
            :class="{ active: orderItem.paymentStatus === 'APPROVED' }"
            :disabled="orderItem.paymentStatus === 'APPROVED'"
            @click.stop="
              handleChangeOrderPaymentStatus(orderItem.id, 'APPROVED')
            "
          >
            <Icon
              name="fontisto:radio-btn-active"
              class="orders-table__status-icon"
            />
            Approved
          </button>
        </li>
        <li class="orders-table__dropdown-item">
          <button
            class="orders-table__status--inactive-btn"
            :class="{ active: orderItem.paymentStatus === 'DECLINED' }"
            :disabled="orderItem.paymentStatus === 'DECLINED'"
            @click.stop="
              handleChangeOrderPaymentStatus(orderItem.id, 'DECLINED')
            "
          >
            <Icon
              name="fontisto:radio-btn-active"
              class="orders-table__status-icon"
            />
            Declined
          </button>
        </li>
      </ul>
    </td>
    <td class="orders-table__cell">
      <p class="orders-table__text">
        {{ JSON.parse(orderItem.orderItems).length }}
      </p>
    </td>
    <td class="orders-table__cell">
      <p class="orders-table__text">{{ orderItem.orderTotal }} uzs</p>
    </td>
    <td class="orders-table__cell orders-table__status--cell">
      <button
        @click.stop="handleToggleStatusDropdown(orderItem.id)"
        class="orders-table__toggle-status-btn"
      >
        <Icon
          name="fontisto:radio-btn-active"
          class="orders-table__status-icon"
        />
        {{ getOrderStatus(orderItem.orderStatus) }}
        <Icon name="teenyicons:down-solid" class="orders-table__down-icon" />
      </button>

      <ul
        class="orders-table__dropdown"
        :class="{
          active: activeRowId === orderItem.id && isStatusDropdownOpen,
          'orders-table__dropdown--first-row': isFirstRow,
        }"
      >
        <li class="orders-table__dropdown-item">
          <button
            class="orders-table__status-btn"
            :class="{
              active: getOrderStatus(orderItem.orderStatus) === 'Not Confirmed',
            }"
            :disabled="
              getOrderStatus(orderItem.orderStatus) === 'Not Confirmed'
            "
            @click.stop="
              handleChangeOrderStatus(orderItem.id, 'ORDER_NOT_CONFIRMED')
            "
          >
            <Icon
              name="fontisto:radio-btn-active"
              class="orders-table__status-icon"
            />
            Not Confirmed
          </button>
        </li>
        <li class="orders-table__dropdown-item">
          <button
            class="orders-table__status-btn"
            :class="{
              active: getOrderStatus(orderItem.orderStatus) === 'Confirmed',
            }"
            :disabled="getOrderStatus(orderItem.orderStatus) === 'Confirmed'"
            @click.stop="
              handleChangeOrderStatus(orderItem.id, 'ORDER_CONFIRMED')
            "
          >
            <Icon
              name="fontisto:radio-btn-active"
              class="orders-table__status-icon"
            />
            Confirmed
          </button>
        </li>
        <li class="orders-table__dropdown-item">
          <button
            class="orders-table__status-btn"
            :class="{
              active: getOrderStatus(orderItem.orderStatus) === 'Cancelled',
            }"
            :disabled="getOrderStatus(orderItem.orderStatus) === 'Cancelled'"
            @click.stop="
              handleChangeOrderStatus(orderItem.id, 'ORDER_CANCELLED')
            "
          >
            <Icon
              name="fontisto:radio-btn-active"
              class="orders-table__status-icon"
            />
            Cancelled
          </button>
        </li>
        <li class="orders-table__dropdown-item">
          <button
            class="orders-table__status-btn"
            :class="{
              active:
                getOrderStatus(orderItem.orderStatus) === 'Being Prepared',
            }"
            :disabled="
              getOrderStatus(orderItem.orderStatus) === 'Being Prepared'
            "
            @click.stop="
              handleChangeOrderStatus(orderItem.id, 'ORDER_BEING_PREPARED')
            "
          >
            <Icon
              name="fontisto:radio-btn-active"
              class="orders-table__status-icon"
            />
            Being Prepared
          </button>
        </li>
        <li class="orders-table__dropdown-item">
          <button
            class="orders-table__status-btn"
            :class="{
              active: getOrderStatus(orderItem.orderStatus) === 'Boxed',
            }"
            :disabled="getOrderStatus(orderItem.orderStatus) === 'Boxed'"
            @click.stop="handleChangeOrderStatus(orderItem.id, 'ORDER_BOXED')"
          >
            <Icon
              name="fontisto:radio-btn-active"
              class="orders-table__status-icon"
            />
            Boxed
          </button>
        </li>
        <li
          v-if="orderItem.orderType === 'DELIVERY'"
          class="orders-table__dropdown-item"
        >
          <button
            class="orders-table__status-btn"
            :class="{
              active: getOrderStatus(orderItem.orderStatus) === 'Delivered',
            }"
            :disabled="getOrderStatus(orderItem.orderStatus) === 'Delivered'"
            @click.stop="
              handleChangeOrderStatus(orderItem.id, 'ORDER_DELIVERED')
            "
          >
            <Icon
              name="fontisto:radio-btn-active"
              class="orders-table__status-icon"
            />
            Delivered
          </button>
        </li>
        <li
          v-if="orderItem.orderType === 'PICKUP'"
          class="orders-table__dropdown-item"
        >
          <button
            class="orders-table__status-btn"
            :class="{
              active: getOrderStatus(orderItem.orderStatus) === 'Picked Up',
            }"
            :disabled="getOrderStatus(orderItem.orderStatus) === 'Picked Up'"
            @click.stop="
              handleChangeOrderStatus(orderItem.id, 'ORDER_PICKED_UP')
            "
          >
            <Icon
              name="fontisto:radio-btn-active"
              class="orders-table__status-icon"
            />
            Picked Up
          </button>
        </li>
      </ul>
    </td>
    <td class="orders-table__cell">
      <p class="orders-table__text">
        {{ DateTime.fromISO(orderItem.created).toFormat("dd/MM/yy hh:mma") }}
      </p>
    </td>
    <td class="orders-table__cell">
      <NuxtLink :to="`/orders/order/${orderItem.id}`">
        <Icon class="orders-table__view-icon" name="teenyicons:eye-outline" />
      </NuxtLink>
    </td>
  </tr>
</template>
<script setup lang="ts">
import { DateTime } from "luxon";
const props = defineProps([
  "orderItem",
  "getOrderStatus",
  "isFirstRow",
  "rowIndex",
  "isLastRow",
  "toggleOrderStatus",
  "togglePaymentStatus",
  "isStatusDropdownOpen",
  "activeRowId",
  "getActiveRowId",
  "toggleStatusDropdown",
  "isPaymentStatusDropdownOpen",
  "paymentActiveRowId",
  "getPaymentActiveRowId",
  "togglePaymentStatusDropdown",
  "getCurrentOrderMakerId",
]);

const handleToggleStatusDropdown = (orderId: number) => {
  props.getActiveRowId(orderId);
  props.toggleStatusDropdown();
};
const handleTogglePaymentStatusDropdown = (orderId: number) => {
  props.getPaymentActiveRowId(orderId);
  props.togglePaymentStatusDropdown();
};

const handleChangeOrderStatus = (orderId: number, status: string) => {
  props.toggleOrderStatus(orderId, status);
  props.toggleStatusDropdown();
};
const handleChangeOrderPaymentStatus = (orderId: number, status: string) => {
  props.togglePaymentStatus(orderId, status);
  props.togglePaymentStatusDropdown();
};

const handleGetCustomerIdClick = (customerId: number, orderType: string) => {
  if (orderType == "DELIVERY") {
    props.getCurrentOrderMakerId(customerId);
  }
};

const closeStatusDropdown = () => {
  if (props.isStatusDropdownOpen) {
    props.toggleStatusDropdown();
  }
  if (props.isPaymentStatusDropdownOpen) {
    props.togglePaymentStatusDropdown();
  }
};
window.addEventListener("click", closeStatusDropdown);
</script>
<style scoped>
.orders-table__cell {
  padding: 25px;
  text-align: left;
}
.orders-table__cell {
  padding: 5px 25px;
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
  color: #333;
}

.orders-table__text--delivery {
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 10px 15px;
  margin-right: 8px;
  transition: all 0.3s ease-out;
  border-radius: 10px;
  background: #fc8019;
  color: #fff;
  font-weight: 600;
}
.orders-table__text--delivery:hover {
  background: #e97313;
}

.orders-table__location-icon {
  margin-left: -10px;
}
.orders-table__client-address {
  padding: 10px 12px;
  border-radius: 5px;
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

.orders-table__status--cell {
  position: relative;
}
.orders-table__payment-dropdown,
.orders-table__dropdown {
  position: absolute;
  bottom: 0;
  padding: 10px;
  border-radius: 5px;
  background: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease-out;
  opacity: 0;
  z-index: -1;
}
.orders-table__dropdown {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  width: 300px;
}
.orders-table__dropdown--first-row.active {
  bottom: 5px;
}
.orders-table__dropdown--last-row-list.active,
.orders-table__dropdown--first-row.active,
.orders-table__payment-dropdown.active,
.orders-table__dropdown.active {
  opacity: 1;
  z-index: 1;
}
.orders-table__dropdown.active {
  bottom: 10;
}

.orders-table__dropdown--last-row-list.active {
  top: -100px;
}

.orders-table__dropdown-item:not(:last-child) {
  padding-bottom: 15px;
}
.orders-table__dropdown-item {
  font-size: 15px;
}
.orders-table__toggle-status-btn {
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 8px 15px;
  border-radius: 30px;
  font-size: 12px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
  background: #fff;
}

.orders-table__status-btn:disabled {
  opacity: 1;
  cursor: not-allowed;
}

.orders-table__toggle-status-btn--pending-active,
.orders-table__status--pending-btn,
.orders-table__status--pending-btn.active {
  color: orange;
}

.orders-table__toggle-status-btn--active-active,
.orders-table__status--active-btn,
.orders-table__status--active-btn.active {
  color: green;
}

.orders-table__toggle-status-btn--inactive-active,
.orders-table__status--inactive-btn,
.orders-table__status--inactive-btn.active {
  color: red;
}
.orders-table__status--pending-btn:disabled,
.orders-table__status--active-btn:disabled,
.orders-table__status--inactive-btn:disabled {
  opacity: 0.9;
  cursor: not-allowed;
}
</style>