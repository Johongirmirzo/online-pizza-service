<template>
  <section class="edit-employee">
    <SectionHeader
      :redirectLink="redirectLink"
      :redirectText="redirectText"
      :title="title"
    >
      <template #header-icon>
        <Icon name="fa-solid:users" />
      </template>
    </SectionHeader>
    <PizzaLoader v-if="isLoadingEmployee" />
    <EmployeeForm
      :handleFormSubmit="handleEditEmployeeSubmit"
      :validationSchema="editEmployeeSchema"
      :isLoading="isLoading"
      :isCreatingEmployee="false"
      :initialValues="initialValues"
    />
  </section>
</template>
<script setup lang="ts">
import { useLoading } from "~/composables/useLoading";
import { hasPhotoFileError } from "~/utils/hasPhotoFileError";
import { v4 as uuid } from "uuid";
import { DateTime } from "luxon";
import { editEmployee as editEmployeeSchema } from "~/validations";
import { IEmployeeFormData } from "~/types/employee";
import { getEmployee, editEmployee } from "~/api/employee";

const redirectLink = "/employee/employees";
const redirectText = "Go Back To Employees";
const title = "Edit an Employee";

const { params } = useRoute();
const isLoading = ref(false);
const { $toast } = useNuxtApp();
const {
  isLoading: isLoadingEmployee,
  startLoading,
  stopLoading,
} = useLoading();

const initialValues = ref({
  employeePhoto: "",
  firstname: "",
  lastname: "",
  email: "",
  phoneNumber: "",
  role: "",
  addressLine1: "",
  addressLine2: "",
  birthDate: "",
  emergancyContacts: [
    {
      id: uuid(),
      fullname: "",
      relationship: "",
      phoneNumber: "",
      workPhone: "",
      email: "",
      addressLine1: "",
      addressLine2: "",
      notes: "",
      contactType: "",
    },
  ],
});

watchEffect(async () => {
  try {
    startLoading();
    const employeeResponse = await getEmployee(params.id[0]);
    const employeeData = employeeResponse.data.data;
    initialValues.value = {
      ...employeeData,
      birthDate: DateTime.fromISO(employeeData.birthDate).toFormat(
        "yyyy-MM-dd"
      ),
    };
    stopLoading();
  } catch (err) {
    stopLoading();
    console.log("Error", err);
  }
});

const handleEditEmployeeSubmit = async (employeeData: IEmployeeFormData) => {
  const formData = new FormData();
  const error = hasPhotoFileError(employeeData["employeePhoto"]);
  if (error) {
    $toast.error(error);
  } else {
    if (employeeData["employeePhoto"]) {
      formData.append("employeePhoto", employeeData["employeePhoto"]);
    }
  }
  formData.append("firstname", employeeData.firstname);
  formData.append("lastname", employeeData.lastname);
  formData.append("email", employeeData.email);
  formData.append("phoneNumber", employeeData.phoneNumber);
  formData.append("role", employeeData.role);
  formData.append("birthDate", employeeData.birthDate);
  formData.append("salary", employeeData.salary);
  formData.append("city", employeeData.city);
  formData.append("gender", employeeData.gender);
  formData.append("maritalStatus", employeeData.maritalStatus);
  formData.append("addressLine1", employeeData.addressLine1);
  formData.append("addressLine2", employeeData.addressLine2 || "");
  formData.append(
    "emergancyContacts",
    JSON.stringify(employeeData.emergancyContacts)
  );

  (async () => {
    try {
      isLoading.value = true;
      await editEmployee(params.id[0], formData);
      isLoading.value = false;
      navigateTo("/employee/employees");
    } catch (err: any) {
      console.log("Errr", err);
      if (err.response.data?.errors) {
        $toast.error(err.response.data.errors);
      }
      isLoading.value = false;
    }
  })();
};
</script>
<style scoped>
.edit-employee__form-box {
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
</style>