<template>
  <tr class="employee-leave-days__table-row">
    <td class="employee-leave-days__table-cell">
      {{ leaveDay.employeeId }}
    </td>
    <td class="employee-leave-days__table-cell">
      {{ leaveDay.fullname }}
    </td>
    <td class="employee-leave-days__table-cell">
      {{ leaveDay.leaveType }}
    </td>

    <td
      class="employee-leave-days__table-cell employee-leave-days__table-reason-cell"
    >
      {{ leaveDay.reason }}
    </td>
    <td class="employee-leave-days__table-cell">
      {{ formatDate(leaveDay.from) }}
    </td>
    <td class="employee-leave-days__table-cell">
      {{ formatDate(leaveDay.to) }}
    </td>
    <td
      class="employee-leave-days__table-cell employee-leave-days__tabel-status-cell"
    >
      <button
        v-if="leaveDay.status"
        @click.stop="toggleStatusDropdown"
        class="employee-leave-days__toggle-status-btn"
        :class="[
          leaveDay.status === 'NEW'
            ? 'employee-leave-days__toggle-status-new-btn'
            : leaveDay.status === 'ACCEPTED'
            ? 'employee-leave-days__toggle-status-active-btn'
            : 'employee-leave-days__toggle-status-block-btn',
        ]"
      >
        <Icon
          name="fontisto:radio-btn-active"
          class="employee-leave-days__status-icon"
        />
        {{
          leaveDay.status.slice(0, 1).toUpperCase() +
          leaveDay.status.slice(1).toLowerCase()
        }}
        <Icon
          name="teenyicons:down-solid"
          class="employee-leave-days__down-icon"
        />
      </button>
      <ul
        class="employee-leave-days__dropdown"
        :class="{ active: isStatusDropdownOpen }"
      >
        <li class="employee-leave-days__dropdown-item">
          <button
            class="employee-leave-days__status--new-btn"
            :class="{ active: leaveDay.status === 'NEW' }"
            :disabled="leaveDay.status === 'NEW'"
            @click.stop="
              handleChangeLeaveDayStatus(
                leaveDay.leaveDayId,
                leaveDay.employeeId,
                'NEW'
              )
            "
          >
            <Icon
              name="fontisto:radio-btn-active"
              class="employee-leave-days__status-icon"
            />
            New
          </button>
        </li>
        <li class="employee-leave-days__dropdown-item">
          <button
            class="employee-leave-days__status--activate-btn"
            :class="{ active: leaveDay.status === 'ACCEPTED' }"
            :disabled="leaveDay.status === 'ACCEPTED'"
            @click.stop="
              handleChangeLeaveDayStatus(
                leaveDay.leaveDayId,
                leaveDay.employeeId,
                'ACCEPTED'
              )
            "
          >
            <Icon
              name="fontisto:radio-btn-active"
              class="employee-leave-days__status-icon"
            />
            Accepted
          </button>
        </li>
        <li class="employee-leave-days__dropdown-item">
          <button
            class="employee-leave-days__status--block-btn"
            :class="{ active: leaveDay.status === 'DECLINED' }"
            :disabled="leaveDay.status === 'DECLINED'"
            @click.stop="
              handleChangeLeaveDayStatus(
                leaveDay.leaveDayId,
                leaveDay.employeeId,
                'DECLINED'
              )
            "
          >
            <Icon
              name="fontisto:radio-btn-active"
              class="employee-leave-days__status-icon"
            />
            Declined
          </button>
        </li>
      </ul>
    </td>
    <td class="employee-leave-days__table-cell">
      <div
        v-if="leaveDay.leaveDayId"
        class="employee-leave-days__table-btns-box"
      >
        <NuxtLink
          title="Edit Leave Day"
          :to="`/employee/edit-leave-day/${leaveDay.leaveDayId}/${leaveDay.employeeId}`"
          class="employee-leave-days__table-btn employee-leave-days__table-edit-leave-day-btn"
        >
          <Icon class="employee-leave-days___table-icon" name="lucide:edit" />
        </NuxtLink>
        <button
          @click="getDeleteItemId(leaveDay.leaveDayId, leaveDay.employeeId)"
          title="Delete Leave Day"
          class="employee-leave-days__table-btn employee-leave-days__table-delete-leave-day-btn"
        >
          <Icon class="employee-leave-days___table-icon" name="jam:trash" />
        </button>
      </div>
    </td>
  </tr>
</template>
<script setup lang="ts">
import { DateTime } from "luxon";
const props = defineProps([
  "leaveDay",
  "toggleEmployeeLeaveDayStatus",
  "getDeleteItemId",
]);

const isStatusDropdownOpen = ref(false);
const toggleStatusDropdown = () => {
  isStatusDropdownOpen.value = !isStatusDropdownOpen.value;
};

const formatDate = (date: string) =>
  date ? DateTime.fromISO(date).toFormat("dd/MM/yy") : "";

const handleChangeLeaveDayStatus = (
  leaveDayId: string,
  employeeId: number,
  status: string
) => {
  props.toggleEmployeeLeaveDayStatus(leaveDayId, employeeId, status);
  toggleStatusDropdown();
};

const closeStatusDropdown = () => {
  if (isStatusDropdownOpen.value) {
    toggleStatusDropdown();
  }
};
window.addEventListener("click", closeStatusDropdown);
</script>
<style scoped>
.employee-leave-days__table-cell {
  padding: 15px;
  text-align: left;
}
.employee-leave-days__table-cell {
  padding: 10px 15px;
  vertical-align: middle;
  border-top: 1px solid #e0e0e0;
  color: #444;
}
.employee-leave-days__table-reason-cell {
  word-break: break-all;
}
.employee-leave-days__table-note-cell > * {
  word-break: break-all;
}
.employee-leave-days__table-row {
  display: flex;
}
.employee-leave-days__table-row > .employee-leave-days__table-cell,
.employee-leave-days__table-head {
  flex: 1;
}
.employee-leave-days__table-btns-box {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
}
.employee-leave-days__table-edit-leave-day-btn {
  color: #fc8019;
  font-size: 22px;
}
.employee-leave-days__table-delete-leave-day-btn {
  color: red;
  font-size: 22px;
}
.employee-leave-days__tabel-status-cell {
  position: relative;
}
.employee-leave-days__dropdown {
  position: absolute;
  top: 70px;
  padding: 10px;
  width: 130px;
  border-radius: 5px;
  background: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease-out;
  opacity: 0;
  z-index: -1;
}
.employee-leave-days__dropdown.active {
  top: 60px;
  opacity: 1;
  z-index: 1;
}
.employee-leave-days__dropdown-item:not(:last-child) {
  padding-bottom: 15px;
}
.employee-leave-days__toggle-status-btn {
  display: flex;
  align-items: center;
  padding: 8px 15px;
  border-radius: 30px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
  background: #fff;
}

.employee-leave-days__toggle-status-new-btn,
.employee-leave-days__status--new-btn,
.employee-leave-days__status--new-btn .employee-leave-days__status-icon {
  color: orange;
}
.employee-leave-days__toggle-status-active-btn,
.employee-leave-days__status--activate-btn,
.employee-leave-days__status--activate-btn .employee-leave-days__status-icon {
  color: green;
}
.employee-leave-days__toggle-status-block-btn,
.employee-leave-days__status--block-btn,
.employee-leave-days__status--block-btn .employee-leave-days__status-icon {
  color: red;
}
.employee-leave-days__status--new-btn:disabled
  .employee-leave-days__status--activate-btn:disabled,
.employee-leave-days__status--block-btn:disabled {
  opacity: 0.9;
  cursor: not-allowed;
}
.employee-leave-days__status-icon {
  margin-right: 5px;
}
.employee-leave-days__down-icon {
  margin-left: 5px;
  font-size: 10px;
}
.employee-leave-days__img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
}
.employee-leave-days__btns-box {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
  font-size: 18px;
}
.employee-leave-days__delete-customer-btn {
  color: red;
}
.employee-leave-days__table-edit-leave-day-btn,
.employee-leave-days__table-delete-leave-day-btn {
  font-size: 18px;
}
</style>