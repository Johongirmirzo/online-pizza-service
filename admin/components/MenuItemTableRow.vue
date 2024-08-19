<template>
  <tr>
    <td class="menu-items-table__cell">
      <p class="menu-items-table__text">
        {{ menuItem.id?.slice(-10) }}
      </p>
    </td>
    <td class="menu-items-table__cell">
      <p class="menu-items-table__text">
        {{ menuItem.name }}
      </p>
    </td>
    <td class="menu-items-table__cell">
      <p class="menu-items-table__text">
        {{ menuItem.vegan }}
      </p>
    </td>
    <td class="menu-items-table__cell">
      <p class="menu-items-table__text">
        {{ menuItem.soldAmount }}
      </p>
    </td>
    <td class="menu-items-table__cell menu-items-table__status-cell">
      <button
        @click.stop="handleToggleStatusDropdown(menuItem.id)"
        class="menu-items-table__toggle-status-btn"
        :class="[
          menuItem.status === 'PENDING'
            ? 'menu-items-table__toggle-status-btn--pending-active'
            : menuItem.status === 'ACTIVE'
            ? 'menu-items-table__toggle-status-btn--active-active'
            : 'menu-items-table__toggle-status-btn--inactive-active',
        ]"
      >
        <Icon
          name="fontisto:radio-btn-active"
          class="menu-items-table__status-icon"
        />
        {{ menuItem.status }}
        <Icon
          name="teenyicons:down-solid"
          class="menu-items-table__down-icon"
        />
      </button>
      <ul
        class="menu-items-table__dropdown"
        :class="{
          active: isStatusDropdownOpen && activeRowId === menuItem.id,
          'menu-items-table__dropdown--last-row': isLastRow,
        }"
      >
        <li class="menu-items-table__dropdown-item">
          <button
            class="menu-items-table__status--pending-btn"
            :class="{ active: menuItem.status === 'PENDING' }"
            :disabled="menuItem.status === 'PENDING'"
            @click.stop="handleChangeMenuItemStatus(menuItem.id, 'PENDING')"
          >
            <Icon
              name="fontisto:radio-btn-active"
              class="menu-items-table__status-icon"
            />
            Pending
          </button>
        </li>
        <li class="menu-items-table__dropdown-item">
          <button
            class="menu-items-table__status--active-btn"
            :class="{ active: menuItem.status === 'ACTIVE' }"
            :disabled="menuItem.status === 'ACTIVE'"
            @click.stop="handleChangeMenuItemStatus(menuItem.id, 'ACTIVE')"
          >
            <Icon
              name="fontisto:radio-btn-active"
              class="menu-items-table__status-icon"
            />
            Active
          </button>
        </li>
        <li class="menu-items-table__dropdown-item">
          <button
            class="menu-items-table__status--inactive-btn"
            :class="{ active: menuItem.status === 'INACTIVE' }"
            :disabled="menuItem.status === 'INACTIVE'"
            @click.stop="handleChangeMenuItemStatus(menuItem.id, 'INACTIVE')"
          >
            <Icon
              name="fontisto:radio-btn-active"
              class="menu-items-table__status-icon"
            />
            Inactive
          </button>
        </li>
      </ul>
    </td>
    <td class="menu-items-table__cell">
      <p class="menu-items-table__text">
        {{ DateTime.fromISO(menuItem.created).toFormat('dd/MM/yy') }}
      </p>
    </td>
    <td class="menu-items-table__cell">
      <div class="menu-items-table__btns-box">
        <NuxtLink
          title="Edit Menu Item"
          :to="`/menu/edit-menu-item/${menuItem.id}`"
          class="menu-items-table__btn menu-items-table__edit-menu-item-btn"
        >
          <Icon class="menu-items-table__table-icon" name="lucide:edit" />
        </NuxtLink>
        <NuxtLink
          title="View Menu Item"
          :to="`/menu/menu-item/${menuItem.id}`"
          class="menu-items-table__btn menu-items-table__view-employee-btn"
        >
          <Icon class="menu-items__table-icon" name="teenyicons:eye-outline" />
        </NuxtLink>
        <button
          title="Delete Menu Item"
          @click="getDeleteItemId(menuItem.id)"
          class="menu-items-table__btn menu-items-table__delete-menu-item-btn"
        >
          <Icon class="menu-items-table__table-icon" name="jam:trash" />
        </button>
      </div>
    </td>
  </tr>
</template>
<script setup lang="ts">
import { DateTime } from 'luxon'
const props = defineProps([
  'isLastRow',
  'menuItem',
  'toggleMenuItemStatus',
  'isStatusDropdownOpen',
  'activeRowId',
  'getActiveRowId',
  'toggleStatusDropdown',
  'getDeleteItemId',
])

const handleToggleStatusDropdown = (menuItemId: number) => {
  props.getActiveRowId(menuItemId)
  props.toggleStatusDropdown()
}

const handleChangeMenuItemStatus = (menuItemId: number, status: string) => {
  props.toggleMenuItemStatus(menuItemId, status)
  props.toggleStatusDropdown()
}

const closeStatusDropdown = () => {
  if (props.isStatusDropdownOpen) {
    props.toggleStatusDropdown()
  }
}
window.addEventListener('click', closeStatusDropdown)
</script>
<style scoped>
.menu-items-table__cell {
  padding: 25px;
  text-align: left;
}
.menu-items-table__cell {
  padding: 15px 25px;
  vertical-align: middle;
  border-top: 1px solid #e0e0e0;
  color: #444;
}

.menu-items-table__btns-box {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
  width: 90px;
}
.menu-items-table__view-employee-btn {
  color: rgb(85, 85, 214);
}
.menu-items-table__edit-menu-item-btn,
.menu-items-table__delete-menu-item-btn {
  font-size: 18px;
}
.menu-items-table__edit-menu-item-btn {
  color: #fc8019;
}
.menu-items-table__delete-menu-item-btn {
  color: red;
}

.menu-items-table__status-cell {
  position: relative;
}
.menu-items-table__dropdown {
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
.menu-items-table__dropdown--last-row.active,
.menu-items-table__dropdown.active {
  opacity: 1;
  z-index: 1;
}
.menu-items-table__dropdown.active {
  top: 50px;
}
.menu-items-table__dropdown--last-row.active {
  top: -110px;
}
.menu-items-table__dropdown-item:not(:last-child) {
  padding-bottom: 15px;
}
.menu-items-table__toggle-status-btn {
  display: flex;
  align-items: center;
  padding: 8px 15px;
  border-radius: 30px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
  background: #fff;
  font-size: 12px;
}
.menu-items-table__toggle-status-btn--pending-active,
.menu-items-table__status--pending-btn,
.menu-items-table__status--pending-btn.active {
  color: orange;
}

.menu-items-table__toggle-status-btn--active-active,
.menu-items-table__status--active-btn,
.menu-items-table__status--active-btn.active {
  color: green;
}

.menu-items-table__toggle-status-btn--inactive-active,
.menu-items-table__status--inactive-btn,
.menu-items-table__status--inactive-btn.active {
  color: red;
}
.menu-items-table__status--pending-btn:disabled,
.menu-items-table__status--active-btn:disabled,
.menu-items-table__status--inactive-btn:disabled {
  opacity: 0.9;
  cursor: not-allowed;
}
.menu-items-table__status-icon {
  margin-right: 5px;
}
.menu-items-table__down-icon {
  margin-left: 5px;
  font-size: 10px;
}
</style>
