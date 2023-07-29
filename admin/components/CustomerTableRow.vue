<template>
  <tr class="customers__table-row customers-table__body-row">
    <td class="customers-table__cell">
      <p class="customers-table__text">
        {{ customer?.id }}
      </p>
    </td>
    <td class="customers-table__cell">
      <p class="customers-table__text">
        {{ customer?.name }}
      </p>
    </td>
    <td class="customers-table__cell">
      <p class="customers-table__text">
        {{ customer?.phone }}
      </p>
    </td>
    <td class="customers-table__cell">
      <p class="customers-table__text">
        {{ customer?.email }}
      </p>
    </td>
    <td class="customers-table__cell">
      <p class="customers-table__text">
        {{ customer?.gender }}
      </p>
    </td>
    <td class="customers-table__cell">
      <p class="customers-table__text">
        {{ customer?.birthDate }}
      </p>
    </td>
    <td
      v-if="userRole === 'ADMIN'"
      class="customers-table__cell customers-table__status-cell"
    >
      <button
        @click.stop="handleToggleStatusDropdown(customer.id)"
        class="customers-table__toggle-status-btn"
        :class="[
          customer.status === 'ACTIVE'
            ? 'customers-table__toggle-status-active-btn'
            : 'customers-table__toggle-status-block-btn',
        ]"
      >
        <Icon
          name="fontisto:radio-btn-active"
          class="customers-table__status-icon"
        />
        {{
          customer.status.slice(0, 1).toUpperCase() +
          customer.status.slice(1).toLowerCase()
        }}
        <Icon name="teenyicons:down-solid" class="customers-table__down-icon" />
      </button>
      <ul
        class="customers-table__dropdown"
        :class="{
          active: isStatusDropdownOpen && customer.id === activeRowId,
          'customers-table__dropdown--last-row': isLastRow,
        }"
      >
        <li class="customers-table__dropdown-item">
          <button
            class="customers-table__status--activate-btn"
            :class="{ active: customer.status === 'ACTIVE' }"
            :disabled="customer.status === 'ACTIVE'"
            @click.stop="handleChangeCustomerStatus(customer.id, 'ACTIVE')"
          >
            <Icon
              name="fontisto:radio-btn-active"
              class="customers-table__status-icon"
            />
            Active
          </button>
        </li>
        <li class="customers-table__dropdown-item">
          <button
            class="customers-table__status--block-btn"
            :class="{ active: customer.status === 'BLOCKED' }"
            :disabled="customer.status === 'BLOCKED'"
            @click.stop="handleChangeCustomerStatus(customer.id, 'BLOCKED')"
          >
            <Icon
              name="fontisto:radio-btn-active"
              class="customers-table__status-icon"
            />
            Blocked
          </button>
        </li>
      </ul>
    </td>
  </tr>
</template>
<script setup lang="ts">
const props = defineProps([
  "isLastRow",
  "customer",
  "getCustomer",
  "toggleCustomerStatus",
  "userRole",
  "isStatusDropdownOpen",
  "activeRowId",
  "getActiveRowId",
  "toggleStatusDropdown",
]);

const handleToggleStatusDropdown = (customerId: number) => {
  props.getActiveRowId(customerId);
  props.toggleStatusDropdown();
};

const handleChangeCustomerStatus = (customerId: number, status: string) => {
  props.toggleCustomerStatus(customerId, status);
  props.toggleStatusDropdown();
};

const closeStatusDropdown = () => {
  if (props.isStatusDropdownOpen) {
    props.toggleStatusDropdown();
  }
};
window.addEventListener("click", closeStatusDropdown);
</script>
<style scoped>
.customers-table__cell {
  padding: 25px;
  text-align: left;
}
.customers-table__cell {
  padding: 8px 25px;
  vertical-align: middle;
  border-top: 1px solid #e0e0e0;
  color: #444;
}
.customers-table__status-cell {
  position: relative;
}
.customers-table__dropdown {
  position: absolute;
  top: 60px;
  padding: 10px;
  width: 130px;
  border-radius: 5px;
  background: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease-out;
  opacity: 0;
  z-index: -1;
}
.customers-table__dropdown--last-row.active,
.customers-table__dropdown.active {
  opacity: 1;
  z-index: 1;
}
.customers-table__dropdown.active {
  top: 50px;
}
.customers-table__dropdown--last-row.active {
  top: -80px;
}
.customers-table__dropdown-item:not(:last-child) {
  padding-bottom: 15px;
}
.customers-table__toggle-status-btn {
  display: flex;
  align-items: center;
  padding: 8px 15px;
  border-radius: 30px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
  background: #fff;
}
.customers-table__toggle-status-active-btn,
.customers-table__status--activate-btn .customers-table__status-icon {
  color: green;
}
.customers-table__toggle-status-block-btn,
.customers-table__status--block-btn .customers-table__status-icon {
  color: red;
}
.customers-table__status--activate-btn:disabled,
.customers-table__status--block-btn:disabled {
  opacity: 0.9;
  cursor: not-allowed;
}
.customers-table__status-icon {
  margin-right: 5px;
}
.customers-table__down-icon {
  margin-left: 5px;
  font-size: 10px;
}
.customers-table__img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
}
.customers-table__btns-box {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
}
.customers-table__delete-customer-btn {
  color: red;
}
</style>