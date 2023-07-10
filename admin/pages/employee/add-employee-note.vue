<template>
  <section class="add-employee-note">
    <SectionHeader
      :redirectLink="redirectLink"
      :redirectText="redirectText"
      :title="title"
    >
      <template #header-icon>
        <Icon name="wpf:note" />
      </template>
    </SectionHeader>
    <div class="add-employee-note__form-box">
      <EmployeeNoteForm
        :handleSubmitForm="handleAddEmployeeNoteSubmit"
        :validationSchema="createEmployeeNoteSchema"
        :initialValues="initialValues"
        :isCreatingNote="true"
        :employees="employees"
        :isLoading="isLoading"
      />
    </div>
  </section>
</template>
<script setup lang="ts">
import { IEmployeeNoteFormData, IEmployee } from "~/types/employee";
import { createEmployeeNote, getAllEmployees } from "~/api/employee";
import { createEmployeeNote as createEmployeeNoteSchema } from "~/validations";

const redirectLink = "/employee/employee-notes";
const redirectText = "Go Back to Notes";
const title = "Add an Employee Note";

const employees = ref<IEmployee[]>([]);
const isLoading = ref(false);

const initialValues = {
  note: "",
  date: "",
  employeeId: null,
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

const handleAddEmployeeNoteSubmit = async (
  employeeNote: IEmployeeNoteFormData
) => {
  try {
    isLoading.value = true;
    await createEmployeeNote(employeeNote.employeeId, employeeNote);
    isLoading.value = false;
    navigateTo("/employee/employee-notes");
  } catch (err) {
    isLoading.value = true;
    console.log("Error", err);
  }
};
</script>
<style scoped>
.add-employee-note__form-box {
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
</style>
