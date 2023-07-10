<template>
  <section class="login">
    <div class="login__box">
      <div class="login__form-box">
        <header class="login__header">
          <h1 class="login__title">Login</h1>
        </header>
        <Form
          @submit="handleLoginUserSubmit"
          class="login-form"
          :validation-schema="userLogin"
        >
          <div class="login-form__control">
            <label for="email" class="login-form__label">Email</label>
            <Field
              type="email"
              id="email"
              name="email"
              class="login-form__input"
              placeholder="Enter email"
            />
            <ErrorMessage name="email" class="login-form__error-message" />
          </div>
          <div class="login-form__control">
            <label for="password" class="login-form__label">Password</label>
            <Field
              type="password"
              id="password"
              name="password"
              class="login-form__input"
              placeholder="Enter password"
            />
            <ErrorMessage name="password" class="login-form__error-message" />
          </div>
          <button class="login-form__btn">Login</button>
        </Form>
      </div>
    </div>
    <figure class="login__img-box">
      <img
        src="~/assets/images/pizza-img.png"
        class="login-form__img"
        alt="pizza img"
      />
    </figure>
  </section>
</template>
 
<script setup>
import { Form, Field, ErrorMessage } from "vee-validate";
import { useUserStore } from "~/stores/user";
import { userLogin } from "~/validations";
import { storeTokenToLocalStorage } from "~/utils/tokenStorage";

definePageMeta({
  auth: {
    unauthenticatedOnly: true,
    navigateAuthenticatedTo: "/",
  },
});

const userStore = useUserStore();

const { signIn, data } = useAuth();
const { $toast } = useNuxtApp();

const handleLoginUserSubmit = async (values) => {
  const { url, error } = await signIn("credentials", {
    redirect: false,
    email: values.email,
    password: values.password,
  });
  if (error) {
    $toast.error(error);
  } else {
    const userData = {
      id: data.value.userId,
      name: data.value.user.name,
      email: data.value.user.email,
      role: data.value.role,
      photo: data.value.userPhoto,
    };
    storeTokenToLocalStorage({
      accessToken: data.value.accessToken,
      refreshToken: data.value.refreshToken,
    });
    userStore.loginUser(userData);
    location.href = "/";
  }
};
</script>
<style scoped>
.login__box {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
}
.login__form-box {
  max-width: 560px;
  width: 90%;
  padding: 15px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
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
.login-form__btn {
  display: block;
  width: 100%;
  padding: 10px 0;
  border-radius: 5px;
  background: #fc8019;
  color: #fff;
  font-size: 16px;
  transition: background 0.3s ease-out;
}
.login-form__btn:hover {
  background: hsl(27, 97%, 50%);
}
.login__img-box {
  display: none;
}
@media (min-width: 960px) {
  .login {
    display: flex;
    gap: 35px;
  }
  .login__box,
  .login__img-box {
    flex: 1;
    padding: 15px;
  }
  .login__img-box {
    background: #fc8019;
  }
  .login__img-box {
    display: block;
  }
}
</style>