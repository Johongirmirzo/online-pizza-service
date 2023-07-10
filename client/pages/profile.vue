<template>
  <section class="profile">
    <header class="profile__header">
      <h1 class="profile__title">Update A Profile</h1>
    </header>

    <div class="profile__form-box" v-if="initialValues.id">
      <Form
        @submit="handleUpdateCustomerInfoSubmit"
        :validation-schema="editCustomerSchema"
        :initial-values="initialValues"
        class="profile-form"
      >
        <div class="profile-form__row">
          <div class="profile-form__control">
            <label for="name" class="profile-form__label">Name</label>
            <Field
              class="profile-form__input"
              id="name"
              name="name"
              placeholder="Enter Your Name..."
            />
            <ErrorMessage name="name" class="profile-form__error-message" />
          </div>
          <div class="profile-form__control">
            <label for="email" class="profile-form__label">Email</label>
            <Field
              class="profile-form__input"
              type="email"
              id="email"
              name="email"
              placeholder="Enter Your Email..."
            />
            <ErrorMessage name="email" class="profile-form__error-message" />
          </div>
        </div>
        <div class="profile-form__row">
          <div class="profile-form__control">
            <label for="birthDate" class="profile-form__label"
              >Birth Date</label
            >
            <Field
              class="profile-form__input"
              type="date"
              id="birthDate"
              name="birthDate"
              placeholder="Enter Your Birthdate..."
            />
            <ErrorMessage
              name="birthDate"
              class="profile-form__error-message"
            />
          </div>
          <div class="profile-form__control">
            <label for="phone" class="profile-form__label">Phone</label>
            <Field
              class="profile-form__input"
              type="phone"
              id="phone"
              name="phone"
              placeholder="Enter Your phone..."
            />
            <ErrorMessage name="phone" class="profile-form__error-message" />
          </div>
        </div>
        <div class="profile-form__row">
          <div class="profile-form__control">
            <label for="password" class="profile-form__label"
              >Old Password</label
            >
            <Field
              class="profile-form__input"
              type="password"
              id="password"
              name="password"
              placeholder="Enter Your Old Password..."
            />
            <ErrorMessage name="password" class="profile-form__error-message" />
          </div>
          <div class="profile-form__control">
            <label for="newPassword" class="profile-form__label"
              >New Password</label
            >
            <Field
              class="profile-form__input"
              type="password"
              id="newPassword"
              name="newPassword"
              placeholder="Enter Your New Password..."
            />
            <ErrorMessage
              name="newPassword"
              class="profile-form__error-message"
            />
          </div>
          <div class="profile-form__control">
            <label for="newConfirmPassword" class="profile-form__label"
              >New Confirm Password</label
            >
            <Field
              class="profile-form__input"
              type="password"
              id="newConfirmPassword"
              name="newConfirmPassword"
              placeholder="Enter Your New Confirm Password..."
            />
            <ErrorMessage
              name="newConfirmPassword"
              class="profile-form__error-message"
            />
          </div>
        </div>
        <div class="profile-form__radio-box">
          <p class="profile-form__radio-text">Choose Gender</p>
          <div class="profile-form__control">
            <label for="male" class="profile-form__radio-label">
              <Field
                class="profile-form__radio-input"
                type="radio"
                name="gender"
                id="male"
                value="MALE"
              />
              Male
            </label>
            <label for="female" class="profile-form__radio-label">
              <Field
                class="profile-form__radio-input"
                type="radio"
                name="gender"
                id="female"
                value="FEMALE"
              />
              Female
            </label>
          </div>
          <ErrorMessage name="gender" class="profile-form__error-message" />
        </div>

        <button type="submit" class="profile-form__btn">Update Profile</button>
      </Form>
    </div>
  </section>
</template>
<script setup lang="ts">
import { editCustomer, getCustomer } from "~/api/all-api-handlers";
import { editCustomer as editCustomerSchema } from "~/validations/customer";
import { useCustomerStore } from "~/stores/useCustomerStore";
import { Form, Field, ErrorMessage } from "vee-validate";

const initialValues = ref({});
const customerStore = useCustomerStore();
const { $toast } = useNuxtApp();

const { isLoading, startLoading, stopLoading } = useLoading();

watchEffect(async () => {
  const customerResp = await getCustomer(customerStore.customer.id);
  initialValues.value = {
    ...customerResp.data.data,
    password: "",
  };
});

const handleUpdateCustomerInfoSubmit = async (customerData: any) => {
  try {
    startLoading();
    await editCustomer(customerStore.customer.id, customerData);
    stopLoading();
    $toast.success("Your profile is updated successfully!");
  } catch (err: any) {
    if (err?.response?.data?.errors) {
      $toast.error(err?.response?.data?.errors);
    }
    stopLoading();
  }
};
</script>
<style scoped>
.profile {
  max-width: 960px;
  width: 95%;
  margin: 50px auto 100px auto;
}
.profile__header {
  text-align: center;
  margin-bottom: 35px;
}
.profile__title {
  font-size: clamp(1.4rem, calc(1.5vw + 1rem), 2rem);
  font-weight: 600;
}

.profile-form__row {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 25px;
}
.profile-form__row > * {
  flex: 1;
}
.profile-form__control {
  position: relative;
}
.profile-form__radio-box {
  margin-bottom: 35px;
}
.profile-form__radio-text {
  margin-bottom: 10px;
  font-size: 17px;
}
.profile-form__label {
  font-size: 13px;
  color: #333;
  display: block;
  padding-bottom: 5px;
}

.profile-form__input {
  display: block;
  width: 100%;
  padding: 10px 5px;
  border-radius: 5px;
  border: 2px solid #999;
}
.profile-form__input:not(.profile-form__select):focus {
  border: 2px solid #fc8019;
}
.profile-form__select:focus {
  outline-color: #fc8019;
}
.profile-form__error-message {
  position: absolute;
  font-size: 14px;
  color: rgb(247, 63, 63);
  font-weight: 600;
}

.profile-form__radio-label {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  margin-right: 35px;
}
.profile-form__radio-input {
  transform: scale(1.2);
  margin-right: 8px;
}
.profile-form__radio-input:after {
  width: 18px;
  height: 18px;
  border-radius: 18px;
  top: -2px;
  left: -2px;
  position: relative;
  background-color: #d1d3d1;
  content: "";
  display: inline-block;
  visibility: visible;
  border: 2px solid transparent;
}
.profile-form__radio-input:checked:after {
  width: 18px;
  height: 18px;
  border-radius: 18px;
  top: -2px;
  left: -2px;
  position: relative;
  background-color: #ffa500;
  content: "";
  display: inline-block;
  visibility: visible;
  border: 2px solid #fc8019;
}

.profile-form__btn {
  padding: 10px 20px;
  border-radius: 5px;
  font-size: 14px;
  font-weight: 600;
  background: #fc8019;
  border: 2px solid #fc8019;
  color: #fff;
}
</style>