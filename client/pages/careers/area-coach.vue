<template>
  <ManagerCoachForm
    :isLoading="isLoading"
    :validationSchema="createManagerCoach"
    :title="formTitle"
    :handleFormSubmit="handleApplyForManagerRoleSubmit"
  />
</template>
<script setup lang="ts">
import { hasPhotoFileError } from "~/utils/hasPhotoFileError";
import { createApplicant } from "~/api/career";
import { createManagerCoach } from "~/validations";

const formTitle = "Apply For Area Coach Form";
const { isLoading, startLoading, stopLoading } = useLoading();
const { $toast } = useNuxtApp();

const handleApplyForManagerRoleSubmit = async (managerData: any) => {
  console.log(managerData);
  const formData = new FormData();
  const errors = [];
  if (hasPhotoFileError(managerData.applicantPhoto)) {
    errors.push(hasPhotoFileError(managerData.applicantPhoto));
  }
  if (hasPhotoFileError(managerData.passportPhoto)) {
    errors.push(hasPhotoFileError(managerData.passportPhoto));
  }
  if (hasPhotoFileError(managerData.resume)) {
    errors.push(hasPhotoFileError(managerData.resume));
  }
  if (hasPhotoFileError(managerData.panPhoto)) {
    errors.push(hasPhotoFileError(managerData.panPhoto));
  }
  for (const error of errors) {
    $toast.error(error);
  }
  if (!errors.length) {
    formData.append("role", "AREA_COACH");
    formData.append("applicantPhoto", managerData.applicantPhoto);
    formData.append("resume", managerData.resume);
    formData.append("passportPhoto", managerData.passportPhoto);
    formData.append("panPhoto", managerData.panPhoto);
    formData.append("bankAccountName", managerData.bankAccountName ?? "");
    formData.append("birthDate", managerData.birthDate);
    formData.append("dateOfJoining", managerData.dateOfJoining);
    formData.append("education", managerData.education);
    formData.append("email", managerData.email);
    formData.append("firstname", managerData.firstname);
    formData.append("lastname", managerData.lastname);
    formData.append("gender", managerData.gender);
    formData.append("hasBankAccount", JSON.parse(managerData.hasBankAccount));
    formData.append("martialStatus", managerData.martialStatus);
    formData.append("noticePeriod", managerData.noticePeriod);
    formData.append("passportNumber", managerData.passportNumber);
    formData.append("phoneNumber", managerData.phoneNumber.toString());
    formData.append("source", managerData.source);
    formData.append(
      "computerSkills",
      JSON.stringify(managerData.computerSkills)
    );
    formData.append(
      "experiences",
      JSON.stringify(managerData.experiences ?? [])
    );
    formData.append("languages", JSON.stringify(managerData.languages));
    formData.append(
      "applicant",
      JSON.stringify({
        panNumber: managerData.panNumber,
        currentEmployer: managerData.currentEmployer,
        currentRole: managerData.currentRole,
        currentLocation: managerData.currentLocation,
        currentCTC: managerData.currentCTC,
      })
    );

    try {
      startLoading();
      await createApplicant(formData);
      stopLoading();
      $toast.success("Your Application is received!");
      setTimeout(() => navigateTo("/careers"), 2000);
    } catch (err: any) {
      if (err?.response?.data?.errors) {
        $toast.error(err?.response?.data?.errors);
      }
      stopLoading();
    }
  }
};
</script>