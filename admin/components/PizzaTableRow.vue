<template>
  <tr>
    <td class="pizza-table__cell">
      <p class="pizza-table__text">
        {{ pizza.id }}
      </p>
    </td>
    <td class="pizza-table__cell">
      <p class="pizza-table__text">
        {{ pizza.name }}
      </p>
    </td>
    <td class="pizza-table__cell">
      <p class="pizza-table__text">
        {{ pizza.vegan }}
      </p>
    </td>
    <td class="pizza-table__cell">
      <p class="pizza-table__text">
        {{ pizza.soldAmount }}
      </p>
    </td>
    <td class="pizza-table__cell pizza-table__status-cell">
      <button
        @click.stop="handleToggleStatusDropdown(pizza.id)"
        class="pizza-table__toggle-status-btn"
        :class="[
          pizza.status === 'PENDING'
            ? 'pizza-table__toggle-status-btn--pending-active'
            : pizza.status === 'ACTIVE'
            ? 'pizza-table__toggle-status-btn--active-active'
            : 'pizza-table__toggle-status-btn--inactive-active',
        ]"
      >
        <Icon
          name="fontisto:radio-btn-active"
          class="pizza-table__status-icon"
        />
        {{ pizza.status }}
        <Icon name="teenyicons:down-solid" class="pizza-table__down-icon" />
      </button>
      <ul
        class="pizza-table__dropdown"
        :class="{
          active: activeRowId === pizza.id && isStatusDropdownOpen,
          'pizza-table__dropdown--last-row-list': isLastRow,
        }"
      >
        <li class="pizza-table__dropdown-item">
          <button
            class="pizza-table__status--pending-btn"
            :class="{ active: pizza.status === 'PENDING' }"
            :disabled="pizza.status === 'PENDING'"
            @click.stop="handleChangePizzaStatus(pizza.id, 'PENDING')"
          >
            <Icon
              name="fontisto:radio-btn-active"
              class="pizza-table__status-icon"
            />
            Pending
          </button>
        </li>
        <li class="pizza-table__dropdown-item">
          <button
            class="pizza-table__status--active-btn"
            :class="{ active: pizza.status === 'ACTIVE' }"
            :disabled="pizza.status === 'ACTIVE'"
            @click.stop="handleChangePizzaStatus(pizza.id, 'ACTIVE')"
          >
            <Icon
              name="fontisto:radio-btn-active"
              class="pizza-table__status-icon"
            />
            Active
          </button>
        </li>
        <li class="pizza-table__dropdown-item">
          <button
            class="pizza-table__status--inactive-btn"
            :class="{ active: pizza.status === 'INACTIVE' }"
            :disabled="pizza.status === 'INACTIVE'"
            @click.stop="handleChangePizzaStatus(pizza.id, 'INACTIVE')"
          >
            <Icon
              name="fontisto:radio-btn-active"
              class="pizza-table__status-icon"
            />
            Inactive
          </button>
        </li>
      </ul>
    </td>
    <td class="pizza-table__cell">
      <p class="pizza-table__text">
        {{ pizza.spiceLevel }}
      </p>
    </td>
    <td class="pizza-table__cell">
      <p class="pizza-table__text">
        {{ DateTime.fromISO(pizza.created).toFormat("dd/MM/yy") }}
      </p>
    </td>
    <td class="pizza-table__cell">
      <div class="pizza-table__btns-box">
        <NuxtLink
          :class="{ inactive: isDeletingPizza }"
          title="Edit pizza Item"
          :to="`/menu/edit-pizza/${pizza.id}`"
          class="pizza-table__btn pizza-table__edit-pizza-item-btn"
        >
          <Icon
            class="pizza-table__table-icon"
            :class="{ inactive: isDeletingPizza }"
            name="lucide:edit"
          />
        </NuxtLink>
        <NuxtLink
          title="View pizza Item"
          :to="`/menu/pizza/${pizza.id}`"
          class="pizza-table__btn pizza-table__view-employee-btn"
          :class="{ inactive: isDeletingPizza }"
        >
          <Icon
            class="pizza-items__table-icon"
            :class="{ inactive: isDeletingPizza }"
            name="teenyicons:eye-outline"
          />
        </NuxtLink>
        <button
          :class="{ inactive: isDeletingPizza }"
          title="Delete pizza Item"
          @click="getDeleteItemId(pizza.id)"
          class="pizza-table__btn pizza-table__delete-pizza-item-btn"
        >
          <Icon
            class="pizza-table__table-icon"
            :class="{ inactive: isDeletingPizza }"
            name="jam:trash"
          />
        </button>
      </div>
    </td>
  </tr>
</template>
  <script setup lang="ts">
import { DateTime } from "luxon";
const props = defineProps([
  "pizza",
  "togglePizzaStatus",
  "isStatusDropdownOpen",
  "isLastRow",
  "isDeletingPizza",
  "activeRowId",
  "getActiveRowId",
  "toggleStatusDropdown",
  "getDeleteItemId",
]);

const handleToggleStatusDropdown = (dipId: number) => {
  props.getActiveRowId(dipId);
  props.toggleStatusDropdown();
};

const handleChangePizzaStatus = (pizzaId: number, status: string) => {
  props.togglePizzaStatus(pizzaId, status);
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
.pizza-table__cell {
  padding: 25px;
  text-align: left;
}
.pizza-table__cell {
  padding: 15px 25px;
  vertical-align: middle;
  border-top: 1px solid #e0e0e0;
  color: #444;
}

.pizza-table__btns-box {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
  width: 90px;
}
.pizza-table__btn.inactive {
  cursor: not-allowed;
  opacity: 0.5;
}
.pizza-table__view-employee-btn {
  color: rgb(85, 85, 214);
}
.pizza-table__edit-pizza-item-btn,
.pizza-table__delete-pizza-item-btn {
  font-size: 18px;
}
.pizza-table__edit-pizza-item-btn {
  color: #fc8019;
}
.pizza-table__delete-pizza-item-btn {
  color: red;
}

.pizza-table__status-cell {
  position: relative;
}
.pizza-table__dropdown {
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
.pizza-table__dropdown.active,
.pizza-table__dropdown--last-row-list.active {
  opacity: 1;
  z-index: 1;
}
.pizza-table__dropdown.active {
  top: 50px;
}
.pizza-table__dropdown--last-row-list.active {
  top: -100px;
}
.pizza-table__dropdown-item:not(:last-child) {
  padding-bottom: 15px;
}
.pizza-table__toggle-status-btn {
  display: flex;
  align-items: center;
  padding: 8px 15px;
  border-radius: 30px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
  background: #fff;
  font-size: 12px;
}
.pizza-table__toggle-status-btn--pending-active,
.pizza-table__status--pending-btn,
.pizza-table__status--pending-btn.active {
  color: orange;
}

.pizza-table__toggle-status-btn--active-active,
.pizza-table__status--active-btn,
.pizza-table__status--active-btn.active {
  color: green;
}

.pizza-table__toggle-status-btn--inactive-active,
.pizza-table__status--inactive-btn,
.pizza-table__status--inactive-btn.active {
  color: red;
}
.pizza-table__status--pending-btn:disabled,
.pizza-table__status--active-btn:disabled,
.pizza-table__status--inactive-btn:disabled {
  opacity: 0.9;
  cursor: not-allowed;
}
.pizza-table__status-icon {
  margin-right: 5px;
}
.pizza-table__down-icon {
  margin-left: 5px;
  font-size: 10px;
}
</style>