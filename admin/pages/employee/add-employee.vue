<template>
  <section class="add-employee">
    <SectionHeader
      :redirectLink="redirectLink"
      :redirectText="redirectText"
      :title="title"
    >
      <template #header-icon>
        <Icon name="fa-solid:users" />
      </template>
    </SectionHeader>
    <EmployeeForm
      :handleFormSubmit="handleCreateEmployeeSubmit"
      :validationSchema="createEmployeeSchema"
      :isLoading="isLoading"
      :isCreatingEmployee="true"
      :initialValues="initialValues"
    />
  </section>
</template>
<script setup lang="ts">
import { hasPhotoFileError } from "~/utils/hasPhotoFileError";
import { v4 as uuid } from "uuid";
import { createEmployee as createEmployeeSchema } from "~/validations";
import { IEmployeeFormData } from "~/types/employee";
import { createEmployee } from "~/api/employee";

const redirectLink = "/employee/employees";
const redirectText = "Go Back To Employees";
const title = "Create a New Employer";

const isLoading = ref(false);
const { $toast } = useNuxtApp();

const initialValues = {
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
};

const handleCreateEmployeeSubmit = async (employeeData: IEmployeeFormData) => {
  console.log(employeeData);
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
      await createEmployee(formData);
      isLoading.value = false;
      navigateTo("/employee/employees");
    } catch (err: any) {
      if (err.response.data?.errors) {
        $toast.error(err.response.data.errors);
      }
      isLoading.value = false;
    }
  })();
};
</script>
<style scoped>
.add-employee__form-box {
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
</style>