<template>
  <section class="edit-profile">
    <header class="edit-profile__header">
      <h1 class="edit-profile__title">Change Profile Info</h1>
    </header>
    <div class="edit-profile__form-box">
      <Form
        @submit="handleEditProfileSubmit"
        class="edit-profile-form"
        :validation-schema="userEditFormData"
        :initial-values="initialValues"
      >
        <div class="edit-profile-form__file-box">
          <img
            v-if="userStore.user.photo"
            :src="userStore.user.photo"
            class="edit-profile-form__img"
            :alt="userStore.user.name"
          />
          <label for="edit-profile-photo" class="edit-profile-form__label"
            >Upload Profile Photo</label
          >
          <Field
            type="file"
            class="edit-profile-form__input edit-profile-form__file-input"
            id="edit-profile-photo"
            name="user-photo"
            placeholder="Add edit-profile photo..."
          />
          <ErrorMessage
            name="edit-profile-photo"
            class="edit-profile-form__error-message"
          />
        </div>
        <div class="edit-profile-form__row">
          <div class="edit-profile-form__control">
            <label for="name" class="edit-profile-form__label">Name</label>
            <Field
              type="text"
              class="edit-profile-form__input"
              id="name"
              name="name"
              placeholder="Add Name..."
            />
            <ErrorMessage
              name="name"
              class="edit-profile-form__error-message"
            />
          </div>
          <div class="edit-profile-form__control">
            <label for="email" class="edit-profile-form__label">Email</label>
            <Field
              type="email"
              class="edit-profile-form__input"
              id="email"
              name="email"
              placeholder="Add Email..."
            />
            <ErrorMessage
              name="email"
              class="edit-profile-form__error-message"
            />
          </div>
        </div>
        <div class="edit-profile-form__row">
          <div class="edit-profile-form__control">
            <label for="phoneNumber" class="edit-profile-form__label"
              >Phone Number</label
            >
            <Field
              type="text"
              class="edit-profile-form__input"
              id="phoneNumber"
              name="phoneNumber"
              placeholder="Add Phone..."
            />
            <ErrorMessage
              name="phoneNumber"
              class="edit-profile-form__error-message"
            />
          </div>
        </div>
        <div class="edit-profile-form__row">
          <div class="edit-profile-form__control">
            <label for="password" class="edit-profile-form__label"
              >Old Password</label
            >
            <Field
              type="password"
              class="edit-profile-form__input"
              id="password"
              name="password"
              placeholder="Add Old Password..."
            />
            <ErrorMessage
              name="password"
              class="edit-profile-form__error-message"
            />
          </div>
          <div class="edit-profile-form__control">
            <label for="newPassword" class="edit-profile-form__label"
              >New Password</label
            >
            <Field
              type="password"
              class="edit-profile-form__input"
              id="newPassword"
              name="newPassword"
              placeholder="New Password..."
            />
            <ErrorMessage
              name="newPassword"
              class="edit-profile-form__error-message"
            />
          </div>
          <div class="edit-profile-form__control">
            <label for="newConfirmPassword" class="edit-profile-form__label"
              >Confirm Password</label
            >
            <Field
              type="password"
              class="edit-profile-form__input"
              id="newConfirmPassword"
              name="newConfirmPassword"
              placeholder="New Confirm Password..."
            />
            <ErrorMessage
              name="newConfirmPassword"
              class="edit-profile-form__error-message"
            />
          </div>
        </div>

        <div class="edit-profile-form__btns-box">
          <button
            type="submit"
            class="edit-profile-form__btn edit-profile-form__create-btn"
            :disabled="isLoading"
            :class="{ active: isLoading }"
          >
            <span v-if="isLoading"> Updating Profile... </span>
            <span v-else>Update Profile</span>
          </button>
          <button
            type="reset"
            class="edit-profile-form__btn edit-profile-form__reset-btn"
            :disabled="isLoading"
            :class="{ active: isLoading }"
          >
            Reset
          </button>
        </div>
      </Form>
    </div>
  </section>
</template>
<script setup lang="ts">
import { Form, Field, ErrorMessage } from "vee-validate";
import { useUserStore } from "~/stores/user";
import { hasPhotoFileError } from "~/utils/hasPhotoFileError";
import { IUser, IEditUserFormData } from "~/types/user";
import { userEditFormData } from "~/validations";
import { getUser, editUser } from "~/api/user";

const { params } = useRoute();
const isLoading = ref(false);
const initialValues = ref({} as IUser);
const { $toast } = useNuxtApp();
const userStore = useUserStore();

watchEffect(async () => {
  try {
    const userResponse = await getUser(params.id[0]);
    const userData = userResponse.data.data as IUser;
    console.log(userData, 999);
    initialValues.value = {
      "user-photo": userData.photo,
      name: userData.name,
      email: userData.email,
      phoneNumber: userData.phoneNumber,
    };
  } catch (err) {
    console.log(err);
  }
});

const handleEditProfileSubmit = (userData: IEditUserFormData) => {
  const formData = new FormData();
  let error;
  let photoType = typeof userData["user-photo"];
  if (photoType === "object") {
    error = hasPhotoFileError(userData["user-photo"]);
    if (!error) {
      formData.append("user-photo", userData["user-photo"]);
    }
  }
  if (error) {
    return $toast.error(error);
  }

  formData.append("name", userData.name ?? "");
  formData.append("email", userData.email ?? "");
  formData.append("phoneNumber", userData.phoneNumber ?? "");
  formData.append("password", userData.password ?? "");
  formData.append("newPassword", userData.newPassword ?? "");
  formData.append("newConfirmPassword", userData.newConfirmPassword ?? "");

  (async () => {
    try {
      isLoading.value = true;
      const userResponse = await editUser(params.id[0], formData);
      userStore.updateUserInfo(userResponse.data.data);
      isLoading.value = false;
      $toast.success("Profile is updated successfully!");
    } catch (err: any) {
      if (err?.response?.data?.errors) {
        $toast.error(err?.response?.data?.errors);
      }
      isLoading.value = false;
    }
  })();
};
</script>
<style scoped>
.edit-profile__header {
  text-align: center;
  margin-bottom: 35px;
}
.edit-profile__title {
  font-size: clamp(1.4rem, calc(1.5vw + 1rem), 2rem);
  font-weight: 600;
}
.edit-profile__form-box {
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
.edit-profile-form__img {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 5px;
  cursor: pointer;
}

.edit-profile-form__row > * {
  flex: 1;
}
.edit-profile-form__control {
  position: relative;
  margin-bottom: 35px;
}
.edit-profile-form__file-box {
  margin-bottom: 30px;
}
.edit-profile-form__label {
  font-size: 15px;
  color: #333;
  display: block;
  padding-bottom: 5px;
}
.edit-profile-form__input,
.edit-profile-form__file-input {
  display: block;
  width: 100%;
  padding: 15px 5px;
  border-radius: 5px;
  border: 2px solid #999;
}
.edit-profile-form__input:not(.edit-profile-form__select):focus {
  border: 2px solid #fc8019;
}
.edit-profile-form__select:focus {
  outline-color: #fc8019;
}
.edit-profile-form__error-message {
  position: absolute;
  font-size: 14px;
  color: rgb(247, 63, 63);
  font-weight: 600;
}
.edit-profile-form__btns-box {
  margin-top: 35px;
}
.edit-profile-form__btn {
  padding: 15px 25px;
  border-radius: 5px;
  font-size: 16px;
  font-weight: 600;
}
.edit-profile-form__create-btn {
  background: #fc8019;
  border: 2px solid #fc8019;
  color: #fff;
}
.edit-profile-form__create-btn:not(.active):hover {
  background: hsl(27, 97%, 50%);
}
.edit-profile-form__create-btn.active,
.edit-profile-form__reset-btn.active {
  opacity: 0.5;
  cursor: not-allowed;
}
.edit-profile-form__reset-btn {
  margin-left: 25px;
  border: 2px solid #dedede;
}
.edit-profile-form__reset-btn:not(.active):hover {
  background: #e7e7e7;
  color: #333;
}

@media (min-width: 992px) {
  .edit-profile-form__row {
    display: flex;
    align-items: center;
    gap: 25px;
    margin-bottom: 30px;
  }
  .edit-profile-form__control {
    margin-bottom: 0;
  }
}
</style>