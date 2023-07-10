<template>
  <section class="employee-leave-days">
    <header class="employee-leave-days__header">
      <h1 class="employee-leave-days__title">All Employee Leave Days</h1>
    </header>
    <PizzaLoader v-if="isLoading" />
    <div class="employee-leave-days__table-box">
      <div class="employee-leave-days__action-header">
        <NuxtLink
          class="employee-leave-days__add-note-link"
          to="/employee/add-employee-leave-day"
        >
          <Icon name="wpf:note" class="employee-leave-days__add-note-icon" />
          Add a New Leave Day
        </NuxtLink>
        <button
          @click="fetchAllEmployeeLeaveDays"
          title="Refetch Notes"
          class="employee-leave-days__refetch-notes-btn"
        >
          <Icon
            name="ooui:reload"
            class="employee-leave-days__refetch-data-icon"
          />
        </button>
      </div>
      <div
        class="employee-leave-days__missing-notes-box"
        v-if="!leaveDays.length"
      >
        <header class="employee-leave-days__header">
          <h2 class="employee-leave-days__secondary-title">
            Please Create an Employee to Add a Leave Day
          </h2>
        </header>
      </div>
      <table v-else class="employee-leave-days__table">
        <thead>
          <tr class="employee-leave-days__table-row">
            <th scope="col" class="employee-leave-days__table-head">Id</th>
            <th scope="col" class="employee-leave-days__table-head">
              Employee
            </th>
            <th scope="col" class="employee-leave-days__table-head">
              Leave Type
            </th>
            <th scope="col" class="employee-leave-days__table-head">Reason</th>
            <th scope="col" class="employee-leave-days__table-head">From</th>
            <th scope="col" class="employee-leave-days__table-head">To</th>
            <th scope="col" class="employee-leave-days__table-head">Status</th>
            <th scope="col" class="employee-leave-days__table-head">Actions</th>
          </tr>
        </thead>
        <tbody>
          <EmployeeLeaveDayTableRow
            v-for="leaveDay in leaveDays"
            :key="leaveDay.id"
            :leaveDay="leaveDay"
            :handleDeleteEmployeeLeaveDayClick="
              handleDeleteEmployeeLeaveDayClick
            "
            :toggleEmployeeLeaveDayStatus="toggleEmployeeLeaveDayStatus"
          />
        </tbody>
      </table>
    </div>
  </section>
</template>
<script setup lang="ts">
import { useLoading } from "~/composables/useLoading";
import {
  getAllEmployeeLeaveDays,
  deleteEmployeeLeaveDay,
  changeEmployeeLeaveStatus,
} from "~/api/employee";
import { IEmployeeLeaveDay } from "~/types/employee";

const { $toast } = useNuxtApp();
const leaveDays = ref<IEmployeeLeaveDay[]>([]);
const { isLoading, startLoading, stopLoading } = useLoading();

const handleDeleteEmployeeLeaveDayClick = async (
  leaveDayId: string,
  employeeId: number
) => {
  try {
    await deleteEmployeeLeaveDay(leaveDayId, employeeId);
    $toast.success(`Employee leave day is deleted successfully!`);
    fetchAllEmployeeLeaveDays();
  } catch (err) {
    console.log("Delete note error", err);
  }
};

const toggleEmployeeLeaveDayStatus = async (
  leaveDayId: string,
  employeeId: number,
  status: string
) => {
  try {
    await changeEmployeeLeaveStatus(leaveDayId, employeeId, status);
    leaveDays.value = leaveDays.value.map((leaveDay) =>
      leaveDay?.leaveDayId === leaveDayId && leaveDay.status
        ? { ...leaveDay, status }
        : leaveDay
    );

    $toast.success(
      `Employee leave day status is changed to ${status} successfully!`
    );
  } catch (err) {
    console.log("Change employee leave status error", err);
  }
};

const fetchAllEmployeeLeaveDays = async () => {
  try {
    startLoading();
    const leaveDaysArr: IEmployeeLeaveDay[] = [];
    const leaveDaysResponse = await getAllEmployeeLeaveDays();
    leaveDays.value = leaveDaysResponse.data.data
      .map((leaveDay: any) => {
        if (leaveDay.leaveDays.length) {
          leaveDay.leaveDays = leaveDay.leaveDays.map(
            (employeeleaveDay: IEmployeeLeaveDay) => ({
              ...employeeleaveDay,
              fullname: `${leaveDay.firstname} ${leaveDay.lastname}`,
              leaveDayId: employeeleaveDay.id,
              employeeId: leaveDay.id,
            })
          );
          leaveDaysArr.push(...leaveDay.leaveDays);
          return leaveDay.leaveDays;
        } else {
          return {
            fullname: `${leaveDay.firstname} ${leaveDay.lastname}`,
            from: "",
            to: "",
            reason: "",
            numberOfDays: "",
            leaveType: "",
            employeeId: leaveDay.id,
          };
        }
      })
      .filter((leaveDay: any) => !Array.isArray(leaveDay));

    for (const leaveDayVal of leaveDaysArr) {
      leaveDays.value.push(leaveDayVal);
    }
    stopLoading();
  } catch (err) {
    stopLoading();
    console.log(err);
  }
};
fetchAllEmployeeLeaveDays();
</script>
<style scoped>
.employee-leave-days__header {
  text-align: center;
  margin-bottom: 35px;
}
.employee-leave-days__title {
  font-size: clamp(1.4rem, calc(1.5vw + 1rem), 2rem);
  font-weight: 600;
}
.employee-leave-days__action-header {
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #f5f5f5;
  padding: 15px 20px;
}
.employee-leave-days__add-note-link {
  padding: 10px 20px;
  border-radius: 5px;
  background: #fc8019;
  color: #fff;
}
.employee-leave-days__refetch-notes-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #fc8019;
  color: #fff;
  font-size: 22px;
}
.employee-leave-days__table-box {
  overflow-y: hidden;
  overflow-x: auto;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
.employee-leave-days__missing-notes-box {
  padding: 40px 0 20px 0;
}
.employee-leave-days__secondary-title {
  font-size: clamp(1.2rem, calc(1.5vw + 1rem), 1.6rem);
  font-weight: 600;
}
.employee-leave-days__table {
  width: 300%;
  table-layout: fixed;
  font-size: 14px;
}
.employee-leave-days__table-head,
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

@media (min-width: 1350px) {
  .employee-leave-days__table {
    width: 100%;
  }
}
</style>