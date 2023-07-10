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
    <PizzaLoader v-if="isLoadingEmployeeLeaveDay" />
    <div class="add-employee-leave-day__form-box">
      <EmployeeLeaveDayForm
        :handleSubmitForm="handleEditEmployeeLeaveDaySubmit"
        :validationSchema="editEmployeeLeaveDaySchema"
        :initialValues="initialValues"
        :isCreatingLeaveDay="false"
        :employees="employees"
        :isLoading="isLoading"
      />
    </div>
  </section>
</template>
<script setup lang="ts">
import { useLoading } from "~/composables/useLoading";
import { IEmployeeLeaveDayFormData, IEmployee } from "~/types/employee";
import {
  editEmployeeLeaveDay,
  getAllEmployees,
  getEmployeeLeaveDay,
} from "~/api/employee";
import { editEmployeeLeaveDay as editEmployeeLeaveDaySchema } from "~/validations";

const redirectLink = "/employee/employee-leave-days";
const redirectText = "Go Back to Employee Leave Days";
const title = "Edit an Employee Leave Day";

const { $toast } = useNuxtApp();
const { params } = useRoute();
const employees = ref<IEmployee[]>([]);
const isLoading = ref(false);
const {
  isLoading: isLoadingEmployeeLeaveDay,
  startLoading,
  stopLoading,
} = useLoading();

const initialValues = ref({
  leaveType: "",
  from: "",
  to: "",
  reason: "",
});

watchEffect(async () => {
  try {
    startLoading();
    const leaveDayResponse = await getEmployeeLeaveDay(
      params.id[0],
      params.id[1]
    );
    initialValues.value = leaveDayResponse.data.data;
    stopLoading();
  } catch (err) {
    stopLoading();
    console.log("Error", err);
  }
});

const fetchAllEmployees = async () => {
  try {
    const employeesResponse = await getAllEmployees();
    employees.value = employeesResponse.data.data;
  } catch (err) {
    console.log("Error", err);
  }
};
fetchAllEmployees();

const handleEditEmployeeLeaveDaySubmit = async (
  employeeNote: IEmployeeLeaveDayFormData
) => {
  try {
    isLoading.value = true;
    await editEmployeeLeaveDay(
      params.id[0],
      Number(params.id[1]),
      employeeNote
    );
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
