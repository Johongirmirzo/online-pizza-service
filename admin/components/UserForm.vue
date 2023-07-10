<template>
  <div class="user__form-box">
    <Form
      @submit="handleUserFormSubmit"
      class="user-form"
      :validation-schema="validationSchema"
      :initial-values="initialValues"
    >
      <div class="user-form__file-box">
        <img
          v-if="initialValues?.photo"
          :src="initialValues.photo"
          class="user-form__img"
          :alt="initialValues.name"
        />
        <label for="user-photo" class="user-form__label"
          >Upload User Photo</label
        >
        <Field
          type="file"
          class="user-form__input user-form__file-input"
          id="user-photo"
          name="user-photo"
          placeholder="Add User photo..."
        />
        <ErrorMessage name="user-photo" class="user-form__error-message" />
      </div>
      <div class="user-form__row">
        <div class="user-form__control">
          <label for="name" class="user-form__label">Name</label>
          <Field
            type="text"
            class="user-form__input"
            id="name"
            name="name"
            placeholder="Add User name..."
          />
          <ErrorMessage name="name" class="user-form__error-message" />
        </div>
        <div class="user-form__control">
          <label for="email" class="user-form__label">Email</label>
          <Field
            type="email"
            class="user-form__input"
            id="email"
            name="email"
            placeholder="Add User email..."
          />
          <ErrorMessage name="email" class="user-form__error-message" />
        </div>
      </div>
      <div v-if="isCreatingUser" class="user-form__row">
        <div class="user-form__control">
          <label for="password" class="user-form__label">Password</label>
          <Field
            type="password"
            class="user-form__input"
            id="password"
            name="password"
            placeholder="Add User password..."
          />
          <ErrorMessage name="password" class="user-form__error-message" />
        </div>
        <div class="user-form__control">
          <label for="c_password" class="user-form__label"
            >Confirm Password</label
          >
          <Field
            type="password"
            class="user-form__input"
            id="c_password"
            name="c_password"
            placeholder="Confirm password..."
          />
          <ErrorMessage name="c_password" class="user-form__error-message" />
        </div>
      </div>
      <div class="user-form__row">
        <div class="user-form__control">
          <label for="phoneNumber" class="user-form__label">Phone Number</label>
          <Field
            type="text"
            class="user-form__input"
            id="phoneNumber"
            name="phoneNumber"
            placeholder="Add User phone..."
          />
          <ErrorMessage name="phoneNumber" class="user-form__error-message" />
        </div>
        <div class="user-form__control">
          <label for="role" class="user-form__label">Select User Role</label>
          <Field
            as="select"
            class="user-form__input user-form__select"
            id="role"
            name="role"
            placeholder="Confirm password..."
          >
            <option value="SUB_ADMIN">Sub Admin</option>
            <option value="DRIVER">Driver</option>
          </Field>
          <ErrorMessage name="role" class="user-form__error-message" />
        </div>
      </div>
      <div v-if="initialValues.status" class="user-form__control">
        <label for="status" class="user-form__label">Change User Status</label>
        <Field
          as="select"
          class="user-form__input user-form__select"
          id="status"
          name="status"
          placeholder="Confirm password..."
        >
          <option value="PENDING">Pending</option>
          <option value="ACTIVE">Active</option>
          <option value="BLOCKED">Blocked</option>
        </Field>
        <ErrorMessage name="status" class="user-form__error-message" />
      </div>
      <div class="user-form__btns-box">
        <button
          type="submit"
          class="user-form__btn user-form__create-btn"
          :disabled="isLoading"
          :class="{ active: isLoading }"
        >
          <span v-if="isLoading">
            <span v-if="isCreatingUser"> Creating User... </span>
            <span v-else>Editing User...</span>
          </span>
          <span v-else>
            <span v-if="isCreatingUser"> Create User </span>
            <span v-else> Edit User </span>
          </span>
        </button>
        <button
          type="reset"
          class="user-form__btn user-form__reset-btn"
          :disabled="isLoading"
          :class="{ active: isLoading }"
        >
          Reset
        </button>
      </div>
    </Form>
  </div>
</template>
<script setup lang="ts">
import { Form, Field, ErrorMessage } from "vee-validate";
defineProps([
  "handleUserFormSubmit",
  "validationSchema",
  "isLoading",
  "isCreatingUser",
  "initialValues",
]);
</script>
<style scoped>
.user__form-box {
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
.user-form__img {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 5px;
  cursor: pointer;
}
.user-form__row > * {
  flex: 1;
}
.user-form__control {
  position: relative;
  margin-bottom: 15px;
}
.user-form__file-box {
  margin-bottom: 30px;
}
.user-form__label {
  font-size: 13px;
  color: #333;
  display: block;
  padding-bottom: 5px;
}
.user-form__input,
.user-form__file-input {
  display: block;
  width: 100%;
  padding: 8px 3px;
  border-radius: 5px;
  border: 2px solid #999;
}
.user-form__input:not(.user-form__select):focus {
  border: 2px solid #fc8019;
}
.user-form__select:focus {
  outline-color: #fc8019;
}
.user-form__error-message {
  font-size: 14px;
  color: rgb(247, 63, 63);
  font-weight: 600;
}
.user-form__btns-box {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin-top: 35px;
}
.user-form__btn {
  padding: 10px 15px;
  border-radius: 5px;
  font-size: 14px;
  font-weight: 600;
}
.user-form__create-btn {
  background: #fc8019;
  border: 2px solid #fc8019;
  color: #fff;
}
.user-form__create-btn:not(.active):hover {
  background: hsl(27, 97%, 50%);
}
.user-form__create-btn.active,
.user-form__reset-btn.active {
  opacity: 0.5;
  cursor: not-allowed;
}
.user-form__reset-btn {
  border: 2px solid #dedede;
}
.user-form__reset-btn:not(.active):hover {
  background: #e7e7e7;
  color: #333;
}
@media (min-width: 992px) {
  .user-form__row {
    display: flex;
    align-items: center;
    gap: 25px;
    margin-bottom: 30px;
  }
  .user-form__control {
    margin-bottom: 0;
  }
  .user-form__label {
    font-size: 15px;
  }
  .user-form__input,
  .user-form__file-input {
    padding: 15px 5px;
  }
  .user-form__btn {
    padding: 15px 25px;
  }
  .user-form__error-message {
    position: absolute;
  }
}
</style>