<template>
  <tr class="dips-table__cell-row">
    <td class="dips-table__cell">
      <p class="dips-table__text">
        {{ dip.id }}
      </p>
    </td>
    <td class="dips-table__cell">
      <img :src="dip.photo" :alt="dip.type" class="dips-table__img" />
    </td>
    <td class="dips-table__cell">
      <p class="dips-table__text">
        {{ dip.type }}
      </p>
    </td>
    <td class="dips-table__cell">
      <p class="dips-table__text">
        {{ dip.price }}
      </p>
    </td>
    <td class="dips-table__cell">
      <p class="dips-table__text">
        {{ dip.vegan }}
      </p>
    </td>
    <td class="dips-table__cell">
      <p class="dips-table__text">
        {{ dip.soldAmount }}
      </p>
    </td>
    <td class="dips-table__cell dips-table__status-cell">
      <button
        @click.stop="handleToggleStatusDropdown(dip.id)"
        class="dips-table__toggle-status-btn"
        :class="[
          dip.status === 'PENDING'
            ? 'dips-table__toggle-status-btn--pending-active'
            : dip.status === 'ACTIVE'
            ? 'dips-table__toggle-status-btn--active-active'
            : 'dips-table__toggle-status-btn--rejected-active',
        ]"
      >
        <Icon
          name="fontisto:radio-btn-active"
          class="dips-table__status-icon"
        />
        {{ dip.status }}
        <Icon name="teenyicons:down-solid" class="dips-table__down-icon" />
      </button>
      <ul
        class="dips-table__dropdown"
        :class="{
          active: activeRowId === dip.id && isStatusDropdownOpen,
          'dips-table__dropdown--last-row-list': isLastRow,
        }"
      >
        <li class="dips-table__dropdown-item">
          <button
            class="dips-table__status--pending-btn"
            :class="{ active: dip.status === 'PENDING' }"
            :disabled="dip.status === 'PENDING'"
            @click.stop="handleChangedipstatus(dip.id, 'PENDING')"
          >
            <Icon
              name="fontisto:radio-btn-active"
              class="dips-table__status-icon"
            />
            Pending
          </button>
        </li>
        <li class="dips-table__dropdown-item">
          <button
            class="dips-table__status--active-btn"
            :class="{ active: dip.status === 'ACTIVE' }"
            :disabled="dip.status === 'ACTIVE'"
            @click.stop="handleChangedipstatus(dip.id, 'ACTIVE')"
          >
            <Icon
              name="fontisto:radio-btn-active"
              class="dips-table__status-icon"
            />
            Active
          </button>
        </li>
        <li class="dips-table__dropdown-item">
          <button
            class="dips-table__status--rejected-btn"
            :class="{ active: dip.status === 'INACTIVE' }"
            :disabled="dip.status === 'INACTIVE'"
            @click.stop="handleChangedipstatus(dip.id, 'INACTIVE')"
          >
            <Icon
              name="fontisto:radio-btn-active"
              class="dips-table__status-icon"
            />
            Inactive
          </button>
        </li>
      </ul>
    </td>
    <td class="dips-table__cell">
      <p class="dips-table__text">
        {{ DateTime.fromISO(dip.created).toFormat("dd/MM/yyyy") }}
      </p>
    </td>
    <td class="dips-table__cell">
      <div class="dips-table__btns-box">
        <NuxtLink
          title="Edit dips"
          :to="`/menu/edit-dip/${dip.id}`"
          class="dips-table__btn dips-table__edit-btn"
        >
          <Icon class="dips-table__icon" name="lucide:edit" />
        </NuxtLink>
        <button
          @click="handleDeleteDipClick(dip.id)"
          title="Delete dips"
          class="dips-table__btn dips-table__delete-btn"
        >
          <Icon class="dips-table__icon" name="jam:trash" />
        </button>
      </div>
    </td>
  </tr>
</template>
<script setup lang="ts">
import { DateTime } from "luxon";
const props = defineProps([
  "dip",
  "isLastRow",
  "isStatusDropdownOpen",
  "activeRowId",
  "toggleStatusDropdown",
  "handleDeleteDipClick",
  "getActiveRowId",
  "toggleDipStatus",
]);

const handleToggleStatusDropdown = (dipId: number) => {
  props.getActiveRowId(dipId);
  props.toggleStatusDropdown();
};

const handleChangedipstatus = (dipId: number, status: string) => {
  props.toggleDipStatus(dipId, status);
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
.dips-table__cell {
  padding: 5px 25px;
  vertical-align: middle;
  border-top: 1px solid #e0e0e0;
  color: #444;
}
.dips-table__img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
}
.dips-table__btns-box {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
}
.dips-table__status-cell {
  position: relative;
}
.dips-table__dropdown {
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
.dips-table__dropdown.active {
  top: 50px;
  opacity: 1;
  z-index: 1;
}
.dips-table__dropdown--last-row-list.active {
  top: -100px;
  opacity: 1;
  z-index: 1;
}

.dips-table__dropdown-item:not(:last-child) {
  padding-bottom: 15px;
}
.dips-table__dropdown-item {
  font-size: 15px;
}
.dips-table__toggle-status-btn {
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 8px 15px;
  border-radius: 30px;
  font-size: 12px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
  background: #fff;
}
.dips-table__toggle-status-btn--pending-active,
.dips-table__status--pending-btn,
.dips-table__status--pending-btn.active {
  color: orange;
}

.dips-table__toggle-status-btn--active-active,
.dips-table__status--active-btn,
.dips-table__status--active-btn.active {
  color: green;
}

.dips-table__toggle-status-btn--rejected-active,
.dips-table__status--rejected-btn,
.dips-table__status--rejected-btn.active {
  color: red;
}
.dips-table__status--pending-btn:disabled,
.dips-table__status--active-btn:disabled,
.dips-table__status--rejected-btn:disabled {
  opacity: 0.9;
  cursor: not-allowed;
}
.dips-table__edit-btn,
.dips-table__delete-btn {
  font-size: 17px;
}
.dips-table__edit-btn {
  color: #fc8019;
}
.dips-table__delete-btn {
  color: red;
}
</style>