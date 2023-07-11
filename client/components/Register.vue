<template>
  <section v-if="isModalOpen" class="register">
    <div
      class="register__box"
      :class="{ active: isModalOpen, closed: isModalClosed }"
    >
      <header class="register__header">
        <h2 class="register__title">Register</h2>
      </header>
      <Form
        @submit="handleregisterSubmit"
        :validation-schema="registerCustomer"
        class="register-form"
      >
        <div class="register-form__control">
          <label for="name" class="register-form__label">Name</label>
          <Field
            type="text"
            id="name"
            name="name"
            class="register-form__input"
            placeholder="Enter Name..."
          />
          <ErrorMessage name="name" class="register-form__error-message" />
        </div>
        <div class="register-form__control">
          <label for="email" class="register-form__label">Email</label>
          <Field
            type="email"
            id="email"
            name="email"
            class="register-form__input"
            placeholder="Enter Email..."
          />
          <ErrorMessage name="email" class="register-form__error-message" />
        </div>
        <div class="register-form__control">
          <label for="phone" class="register-form__label">Phone Number</label>
          <Field
            type="number"
            id="phone"
            name="phone"
            class="register-form__input"
            placeholder="Enter Phone..."
            @keydown="handlePreventNonNumbers"
          />
          <ErrorMessage name="phone" class="register-form__error-message" />
        </div>
        <div class="register-form__control">
          <label for="password" class="register-form__label">Password</label>
          <Field
            type="password"
            id="password"
            name="password"
            class="register-form__input"
            placeholder="Enter Password..."
          />
          <ErrorMessage name="password" class="register-form__error-message" />
        </div>
        <div class="register-form__control">
          <label for="c_password" class="register-form__label"
            >Confirm Password</label
          >
          <Field
            type="password"
            id="c_password"
            name="c_password"
            class="register-form__input"
            placeholder="Enter Retry Password..."
          />
          <ErrorMessage
            name="c_password"
            class="register-form__error-message"
          />
        </div>
        <div class="register-form__btns-box">
          <button
            @click="handleCloseModalClick"
            type="button"
            class="register-form__btn register-form__btn--cancel btn-shadow"
            :class="{ active: isLoading }"
          >
            Cancel
          </button>
          <button
            type="submit"
            class="register-form__btn register-form__btn--register btn-shadow"
            :class="{ active: isLoading }"
          >
            <span v-if="isLoading">Registering...</span>
            <span v-else>Register</span>
          </button>
        </div>
      </Form>
      <div class="register__text-box">
        <p>
          Already have an account?
          <button
            @click="handleOpenLoginModalClick"
            class="register__change-to-register-btn"
          >
            Login
          </button>
        </p>
      </div>
    </div>
  </section>
</template>
<script setup lang="ts">
import { handlePreventNonNumbers } from "~/utils/handlePreventNonNumbers";
import { IRegisterFormData } from "~/types/customer";
import { registerCustomer } from "~/validations";
import { registerCustomer as createCustomer } from "~/api/all-api-handlers";
import { Form, Field, ErrorMessage } from "vee-validate";

const props = defineProps(["isModalOpen", "closeModal", "openLoginModal"]);

const { $toast } = useNuxtApp();
const isModalClosed = ref(false);

const { isLoading, startLoading, stopLoading } = useLoading();

watchEffect(() => {
  if (props.isModalOpen) {
    isModalClosed.value = false;
  }
});

const handleCloseModalClick = () => {
  isModalClosed.value = true;

  setTimeout(() => {
    props.closeModal();
  }, 400);
};

const handleOpenLoginModalClick = () => {
  handleCloseModalClick();
  props.openLoginModal();
};

const handleregisterSubmit = async (customerFormData: IRegisterFormData) => {
  try {
    startLoading();
    await createCustomer(customerFormData);
    handleOpenLoginModalClick();
    stopLoading();
  } catch (err: any) {
    if (err?.response?.data?.errors) {
      $toast.error(err?.response?.data?.errors);
    }
    if (err?.response?.data) {
      $toast.error(err?.response?.data);
    }
    stopLoading();
  }
};
</script>
<style scoped>
.register {
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  background: rgba(0, 0, 0, 0.5);
}

.register__box {
  max-width: 560px;
  height: 600px;
  overflow-y: scroll;
  width: 90%;
  padding: 25px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  background: #fff;
}
.register__box::-webkit-scrollbar {
  height: 10px;
  width: 5px;
}
.register__box::-webkit-scrollbar-track {
  background: transparent;
}
.register__box::-webkit-scrollbar-thumb {
  background: #999;
}
.register__box.active {
  animation: open 0.5s;
}
.register__box.closed {
  animation: closed 0.5s;
}
@keyframes open {
  from {
    transform: scale(0.1);
  }
  to {
    transform: scale(1);
  }
}
@keyframes closed {
  from {
    transform: scale(1);
  }
  to {
    transform: scale(0.1);
  }
}
.register__header {
  margin-bottom: 15px;
  text-align: center;
}
.register__title {
  font-size: clamp(1.5rem, calc(1.5vw + 1rem), 2rem);
}
.register-form__control {
  margin-bottom: 25px;
}
.register-form__label {
  display: block;
  padding-bottom: 5px;
  color: #333;
}
.register-form__input {
  display: block;
  padding: 10px 5px;
  width: 100%;
  border-radius: 5px;
  border: 2px solid #e7e7e7;
  transition: all 0.3s ease-out;
}
.register-form__input:focus {
  border: 2px solid #fc8019;
}
.register-form__error-message {
  color: red;
  font-size: 13px;
  font-weight: 600;
}

.register-form__btns-box {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
}
.register-form__btn {
  padding: 10px 15px;
  border-radius: 5px;
  font-size: 16px;
  transition: all 0.3s ease-out;
}
.register-form__btn--cancel {
  border: 1px solid #999;
}
.register-form__btn--register {
  color: #fff;
  background: #fc8019;
}
.register-form__btn--cancel.active,
.register-form__btn--register.active {
  cursor: not-allowed;
  opacity: 0.5;
}
.register-form__btn--register:hover {
  background: hsl(27, 97%, 50%);
}
.register__text-box {
  margin-top: 35px;
  font-weight: 600;
  color: #333;
}
.register__change-to-register-btn {
  margin-left: 10px;
  color: rgb(69, 69, 235);
  text-decoration: underline;
  font-size: 17px;
}

@media (min-width: 960px) {
  .register {
    display: flex;
    gap: 35px;
  }

  .register__img-box {
    background: #fc8019;
  }
  .register__img-box {
    display: block;
  }
  .register-form__input {
    padding: 15px 5px;
  }
  .register-form__error-message {
    font-size: 14px;
  }
}
</style>