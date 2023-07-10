<template>
  <section class="add-employee-leave-day">
    <SectionHeader
      :redirectLink="redirectLink"
      :redirectText="redirectText"
      :title="title"
    >
      <template #header-icon>
        <Icon name="wpf:note" />
      </template>
    </SectionHeader>
    <div class="add-employee-leave-day__form-box">
      <EmployeeLeaveDayForm
        :handleSubmitForm="handleAddEmployeeLeaveDaySubmit"
        :validationSchema="createEmployeeLeaveDaySchema"
        :initialValues="initialValues"
        :isCreatingLeaveDay="true"
        :employees="employees"
        :isLoading="isLoading"
      />
    </div>
  </section>
</template>
<script setup lang="ts">
import { IEmployeeLeaveDayFormData, IEmployee } from "~/types/employee";
import { createEmployeeLeaveDay, getAllEmployees } from "~/api/employee";
import { createEmployeeLeaveDay as createEmployeeLeaveDaySchema } from "~/validations";

const redirectLink = "/employee/employee-leave-days";
const redirectText = "Go Back to Employee Leave Days";
const title = "Add an Employee Leave Day";

const { $toast } = useNuxtApp();
const employees = ref<IEmployee[]>([]);
const isLoading = ref(false);

const initialValues = {
  leaveType: "",
  from: "",
  to: "",
  reason: "",
};

const fetchAllEmployees = async () => {
  try {
    const employeesResponse = await getAllEmployees();
    employees.value = employeesResponse.data.data;
  } catch (err) {
    console.log("Error", err);
  }
};
fetchAllEmployees();

const handleAddEmployeeLeaveDaySubmit = async (
  employeeNote: IEmployeeLeaveDayFormData
) => {
  try {
    isLoading.value = true;
    await createEmployeeLeaveDay(employeeNote.employeeId, employeeNote);
    isLoading.value = false;
    navigateTo("/employee/employee-leave-days");
  } catch (err: any) {
    isLoading.value = true;
    if (err?.response?.data?.errors) {
      $toast.error(err.response?.data?.errors);
    }
    isLoading.value = false;
  }
};
</script>
<style scoped>
.add-employee-leave-day__form-box {
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
</style>
