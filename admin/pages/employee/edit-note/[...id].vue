<template>
  <section class="edit-employee-note">
    <SectionHeader
      :redirectLink="redirectLink"
      :redirectText="redirectText"
      :title="title"
    >
      <template #header-icon>
        <Icon name="wpf:note" />
      </template>
    </SectionHeader>
    <PizzaLoader v-if="isLoadingNote" />
    <div class="edit-employee-note__form-box">
      <EmployeeNoteForm
        :handleSubmitForm="handleEditEmployeeNoteSubmit"
        :validationSchema="editEmployeeNoteSchema"
        :initialValues="initialValues"
        :isCreatingNote="false"
        :employees="employees"
        :isLoading="isLoading"
      />
    </div>
  </section>
</template>
<script setup lang="ts">
import { useLoading } from "~/composables/useLoading";
import { IEmployeeNoteFormData, IEmployee } from "~/types/employee";
import {
  editEmployeeNote,
  getEmployeeNote,
  getAllEmployees,
} from "~/api/employee";
import { editEmployeeNote as editEmployeeNoteSchema } from "~/validations";

const redirectLink = "/employee/employee-notes";
const redirectText = "Go Back to Notes";
const title = "Add an Employee Note";

const { params } = useRoute();
const employees = ref<IEmployee[]>([]);
const isLoading = ref(false);

const { isLoading: isLoadingNote, startLoading, stopLoading } = useLoading();

const initialValues = ref({
  note: "",
  date: "",
  employeeId: null,
});

watchEffect(async () => {
  try {
    startLoading();
    const employeeNoteResponse = await getEmployeeNote(params.id[1]);
    initialValues.value = employeeNoteResponse.data.data.employeeNotes.filter(
      (note: any) => note.id === params.id[0]
    )[0];
    stopLoading();
  } catch (err) {
    stopLoading();
    console.log("Fetch employee note err: ", err);
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

const handleEditEmployeeNoteSubmit = async (
  employeeNote: IEmployeeNoteFormData
) => {
  try {
    isLoading.value = true;
    await editEmployeeNote(params.id[0], employeeNote.employeeId, employeeNote);
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
