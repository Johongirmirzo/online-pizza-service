<template>
  <section v-if="isModalOpen" class="login">
    <div
      class="login__box"
      :class="{ active: isModalOpen, closed: isModalClosed }"
    >
      <header class="login__header">
        <h2 class="login__title">Login</h2>
      </header>
      <Form
        @submit="handleLoginSubmit"
        :validation-schema="loginCustomerSchema"
        class="login-form"
      >
        <div class="login-form__control">
          <label for="email" class="login-form__label">Email</label>
          <Field
            type="email"
            id="email"
            name="email"
            class="login-form__input"
            placeholder="Enter Email..."
          />
          <ErrorMessage name="email" class="login-form__error-message" />
        </div>
        <div class="login-form__control">
          <label for="phone" class="login-form__label">Phone Number</label>
          <Field
            type="number"
            id="phone"
            name="phone"
            class="login-form__input"
            placeholder="Enter Phone..."
            @keydown="handlePreventNonNumbers"
          />
          <ErrorMessage name="phone" class="login-form__error-message" />
        </div>
        <div class="login-form__control">
          <label for="password" class="login-form__label">Password</label>
          <Field
            type="password"
            id="password"
            name="password"
            class="login-form__input"
            placeholder="Enter Password..."
          />
          <ErrorMessage name="password" class="login-form__error-message" />
        </div>
        <div class="login-form__btns-box">
          <button
            @click="handleCloseModalClick"
            type="button"
            class="login-form__btn login-form__btn--cancel btn-shadow"
            :class="{ active: isLoading }"
          >
            Cancel
          </button>
          <button
            type="submit"
            class="login-form__btn login-form__btn--login btn-shadow"
            :class="{ active: isLoading }"
          >
            <span v-if="isLoading">Loggin in...</span>
            <span v-else>Login</span>
          </button>
        </div>
      </Form>
      <div class="login__text-box">
        <p>
          Don't have an account?
          <button
            @click="handleOpenRegisterModalClick"
            class="login__change-to-register-btn"
          >
            Register
          </button>
        </p>
      </div>
    </div>
  </section>
</template>
<script setup lang="ts">
import { handlePreventNonNumbers } from "~/utils/handlePreventNonNumbers";
import { ILoginCustomerFormData } from "~/types/customer";
import { loginCustomer as loginCustomerSchema } from "~/validations";
import { storeTokenToLocalStorage } from "~/utils/tokenStorage";
import {
  getAllAddresses,
  createaCustomerAddress,
  deleteCustomerAddress,
} from "~/api/all-api-handlers";
import { useCustomerStore } from "~/stores/useCustomerStore";
import { useCustomerAddress } from "~/stores/useCustomerAddress";
import { Form, Field, ErrorMessage } from "vee-validate";

const props = defineProps(["isModalOpen", "closeModal", "openRegisterModal"]);

const isModalClosed = ref(false);
const customerStore = useCustomerStore();
const customerAddressStore = useCustomerAddress();
const { $toast } = useNuxtApp();
const { data, signIn } = useAuth();
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

const handleOpenRegisterModalClick = () => {
  handleCloseModalClick();
  props.openRegisterModal();
};

const syncCustomerAddressWithDatabase = async (customerId: number) => {
  try {
    const allCustomerAddressesRes = await getAllAddresses(customerId);
    if (
      allCustomerAddressesRes.data.data.length <=
      customerAddressStore.customerAddresses.length
    ) {
      for (const previousCustomerAddress of allCustomerAddressesRes.data.data) {
        await deleteCustomerAddress(previousCustomerAddress.id);
      }
      for (const customerAddress of customerAddressStore.customerAddresses) {
        await createaCustomerAddress(customerId, customerAddress);
      }
    } else if (
      allCustomerAddressesRes.data.data.length >
      customerAddressStore.customerAddresses.length
    ) {
      for (const previousCustomerAddress of allCustomerAddressesRes.data.data) {
        await deleteCustomerAddress(previousCustomerAddress.id);
      }
    }
  } catch (err) {
    console.log("err", err);
  }
};

const handleLoginSubmit = async (customerData: ILoginCustomerFormData) => {
  startLoading();
  const { url, error } = await signIn("credentials", {
    redirect: false,
    email: customerData.email,
    phone: customerData.phone,
    password: customerData.password,
  });
  if (error) {
    $toast.error(error);
    stopLoading();
  } else {
    if (data.value) {
      const customerData = {
        id: data.value.userId,
        name: data.value.name,
        email: data.value.email,
        status: data.value.status,
        phone: data.value.phone,
      };
      storeTokenToLocalStorage({
        accessToken: data.value.accessToken,
        refreshToken: data.value.refreshToken,
      });
      customerStore.loginCustomer(customerData);
      stopLoading();
      await syncCustomerAddressWithDatabase(customerData.id);
      handleCloseModalClick();
      $toast.success("You've logged in successfully!");
    }
  }
};
</script>
<style scoped>
.login {
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  background: rgba(0, 0, 0, 0.5);
}

.login__box {
  max-width: 560px;
  width: 90%;
  padding: 25px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  background: #fff;
}

.login__box.active {
  animation: open 0.5s;
}
.login__box.closed {
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
.login__header {
  margin-bottom: 15px;
  text-align: center;
}
.login__title {
  font-size: clamp(1.5rem, calc(1.5vw + 1rem), 2rem);
}
.login-form__control {
  margin-bottom: 25px;
}
.login-form__label {
  display: block;
  padding-bottom: 5px;
  color: #333;
}
.login-form__input {
  display: block;
  padding: 10px 5px;
  width: 100%;
  border-radius: 5px;
  border: 2px solid #e7e7e7;
  transition: all 0.3s ease-out;
}
.login-form__input:focus {
  border: 2px solid #fc8019;
}
.login-form__error-message {
  color: red;
  font-size: 13px;
  font-weight: 600;
}

.login-form__btns-box {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
}
.login-form__btn {
  padding: 10px 15px;
  border-radius: 5px;
  font-size: 16px;
  transition: all 0.3s ease-out;
}
.login-form__btn--cancel {
  border: 1px solid #999;
}
.login-form__btn--login {
  color: #fff;
  background: #fc8019;
}

.login-form__btn--cancel.active,
.login-form__btn--login.active {
  opacity: 0.5;
  cursor: not-allowed;
}
.login-form__btn--login:hover {
  background: hsl(27, 97%, 50%);
}
.login__text-box {
  margin-top: 35px;
  font-weight: 600;
  color: #333;
}
.login__change-to-register-btn {
  margin-left: 10px;
  color: rgb(69, 69, 235);
  text-decoration: underline;
  font-size: 17px;
}

@media (min-width: 960px) {
  .login__img-box {
    background: #fc8019;
  }
  .login__img-box {
    display: block;
  }
  .login-form__input {
    padding: 15px 5px;
  }
  .login-form__error-message {
    font-size: 14px;
  }
}
</style>