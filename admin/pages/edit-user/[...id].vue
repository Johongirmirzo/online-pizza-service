<template>
  <section class="edit-user">
    <SectionHeader
      :redirectLink="redirectLink"
      :redirectText="redirectText"
      :title="title"
    >
      <template #header-icon>
        <Icon name="fa-solid:users" />
      </template>
    </SectionHeader>
    <PizzaLoader v-if="isLoadingUser" />
    <UserForm
      :handleUserFormSubmit="handleEditUserSubmit"
      :validationSchema="userEditFormData"
      :isLoading="isLoading"
      :isCreatingUser="false"
      :isEditingUser="true"
      :initialValues="initialValues"
    />
  </section>
</template>
<script setup lang="ts">
import { useLoading } from "~/composables/useLoading";
import { hasPhotoFileError } from "~/utils/hasPhotoFileError";
import { userEditFormData } from "~/validations";
import { ICreateUserFormData, IUser } from "~/types/user";
import { editUser, getUser } from "~/api/user";

const redirectLink = "/user/users";
const redirectText = "Go Back to Users";
const title = "Edit a User";

const isLoading = ref(false);
const { $toast } = useNuxtApp();
const { params } = useRoute();
const initialValues = ref<IUser>({});

const { isLoading: isLoadingUser, startLoading, stopLoading } = useLoading();

watchEffect(async () => {
  startLoading();
  const userResp = await getUser(params.id[0]);
  initialValues.value = userResp.data.data;
  stopLoading();
});

const handleEditUserSubmit = async (values: ICreateUserFormData) => {
  const formData = new FormData();
  const error = hasPhotoFileError(values["user-photo"]);
  if (error) {
    $toast.error(error);
  } else {
    if (values["user-photo"]) {
      formData.append("user-photo", values["user-photo"]);
    }
  }
  if (values.name) {
    formData.append("name", values.name);
  }
  if (values.email) {
    formData.append("email", values.email);
  }
  if (values.phoneNumber) {
    formData.append("phoneNumber", values.phoneNumber);
  }
  if (values.role) {
    formData.append("role", values.role);
  }
  if (values.status) {
    formData.append("status", values.status);
  }

  (async () => {
    try {
      isLoading.value = true;
      const data = await editUser(formData, params.id[0]);
      isLoading.value = false;
      navigateTo("/users");
    } catch (err: any) {
      console.log(err);
      if (err.response.data?.errors) {
        $toast.error(err.response.data.errors);
      }
      isLoading.value = false;
    }
  })();
};
</script>
<style scoped>
.edit-user__header {
  margin-bottom: 45px;
}
.edit-user__title {
  font-size: clamp(1.4rem, calc(1.5vw + 1rem), 2rem);
  text-align: center;
}
.edit-user__form-box {
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
.edit-user-form__row {
  display: flex;
  align-items: center;
  gap: 25px;
  margin-bottom: 30px;
}
.edit-user-form__row > * {
  flex: 1;
}
.edit-user-form__control {
  position: relative;
}
.edit-user-form__file-box {
  margin-bottom: 30px;
}
.edit-user-form__img {
  width: 100px;
  height: 100px;
  object-fit: cover;
}
.edit-user-form__label {
  font-size: 15px;
  color: #333;
  display: block;
  padding-bottom: 5px;
}
.edit-user-form__input,
.edit-user-form__file-input {
  display: block;
  width: 100%;
  padding: 15px 5px;
  border-radius: 5px;
  border: 2px solid #999;
}
.edit-user-form__input:not(.edit-user-form__select):focus {
  border: 2px solid #fc8019;
}
.edit-user-form__select:focus {
  outline-color: #fc8019;
  border: 2 solid transparent;
}
.edit-user-form__error-message {
  position: absolute;
  font-size: 14px;
  color: rgb(247, 63, 63);
  font-weight: 600;
}
.edit-user-form__btns-box {
  margin-top: 35px;
}
.edit-user-form__btn {
  padding: 15px 25px;
  border-radius: 5px;
  font-size: 16px;
  font-weight: 600;
}
.edit-user-form__create-btn {
  background: #fc8019;
  border: 2px solid #fc8019;
  color: #fff;
}
.edit-user-form__create-btn:not(.active):hover {
  background: hsl(27, 97%, 50%);
}
.edit-user-form__create-btn.active,
.edit-user-form__reset-btn.active {
  opacity: 0.5;
  cursor: not-allowed;
}
.edit-user-form__reset-btn {
  margin-left: 25px;
  border: 2px solid #dedede;
}
.edit-user-form__reset-btn:not(.active):hover {
  background: #e7e7e7;
  color: #333;
}
</style>