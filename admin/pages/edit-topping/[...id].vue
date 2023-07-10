<template>
  <section class="edit-topping">
    <SectionHeader
      :redirectLink="redirectLink"
      :redirectText="redirectText"
      :title="title"
    >
      <template #header-icon>
        <Icon name="bx:food-menu" />
      </template>
    </SectionHeader>
    <PizzaLoader v-if="isToppingDataLoading" />
    <ToppingForm
      :handleFormSubmit="handleEditToppingSubmit"
      :validationSchema="editToppingData"
      :isLoading="isLoading"
      :isCreatingTopping="false"
      :initialValues="initialValues"
    />
  </section>
</template>
<script setup lang="ts">
import { useLoading } from "~/composables/useLoading";
import { editToppingData } from "~/validations";
import { IToppingFormData } from "~/types/topping";
import { editTopping, getTopping } from "~/api/topping";

const redirectLink = "/topping/toppings";
const redirectText = "Go Back To Toppings";
const title = "Edit a Topping";

const isLoading = ref(false);
const { $toast } = useNuxtApp();
const { params } = useRoute();
const initialValues = ref({});
const {
  isLoading: isToppingDataLoading,
  startLoading,
  stopLoading,
} = useLoading();

watchEffect(async () => {
  try {
    startLoading();
    const userResp = await getTopping(params.id[0]);
    initialValues.value = userResp.data.data;
    stopLoading();
  } catch (err) {
    stopLoading();
    console.log("Fetch topping error: ", err);
  }
});

const handleEditToppingSubmit = async (toppingFormData: IToppingFormData) => {
  toppingFormData["light"] = toppingFormData
    ? Number(toppingFormData["light"])
    : -1;
  toppingFormData["standard"] = toppingFormData
    ? Number(toppingFormData["standard"])
    : -1;
  toppingFormData["double"] = toppingFormData
    ? Number(toppingFormData["double"])
    : -1;
  toppingFormData["extra"] = toppingFormData
    ? Number(toppingFormData["extra"])
    : -1;

  (async () => {
    try {
      isLoading.value = true;
      await editTopping(params.id[0], toppingFormData);
      isLoading.value = false;
      navigateTo("/toppings");
    } catch (err: any) {
      if (err?.response?.data?.errors) {
        $toast.error(err.response?.data?.errors);
      }
      isLoading.value = false;
    }
  })();
};
</script>
<style scoped>
.edit-topping__header {
  margin-bottom: 45px;
}
.edit-topping__title {
  font-size: clamp(1.4rem, calc(1.5vw + 1rem), 2rem);
  text-align: center;
}
.edit-topping__form-box {
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
.edit-topping-form__row {
  display: flex;
  align-items: center;
  gap: 25px;
  margin-bottom: 30px;
}
.edit-topping-form__row > * {
  flex: 1;
}
.edit-topping-form__control {
  position: relative;
}
.edit-topping-form__file-box {
  margin-bottom: 30px;
}
.edit-topping-form__img {
  width: 100px;
  height: 100px;
  object-fit: cover;
}
.edit-topping-form__label {
  font-size: 15px;
  color: #333;
  display: block;
  padding-bottom: 5px;
}
.edit-topping-form__input,
.edit-topping-form__file-input {
  display: block;
  width: 100%;
  padding: 15px 5px;
  border-radius: 5px;
  border: 2px solid #999;
}
.edit-topping-form__input:not(.edit-topping-form__select):focus {
  border: 2px solid #fc8019;
}
.edit-topping-form__select:focus {
  outline-color: #fc8019;
  border: 2 solid transparent;
}
.edit-topping-form__error-message {
  position: absolute;
  font-size: 14px;
  color: rgb(247, 63, 63);
  font-weight: 600;
}
.edit-topping-form__btns-box {
  margin-top: 35px;
}
.edit-topping-form__btn {
  padding: 15px 25px;
  border-radius: 5px;
  font-size: 16px;
  font-weight: 600;
}
.edit-topping-form__create-btn {
  background: #fc8019;
  border: 2px solid #fc8019;
  color: #fff;
}
.edit-topping-form__create-btn:not(.active):hover {
  background: hsl(27, 97%, 50%);
}
.edit-topping-form__create-btn.active,
.edit-topping-form__reset-btn.active {
  opacity: 0.5;
  cursor: not-allowed;
}
.edit-topping-form__reset-btn {
  margin-left: 25px;
  border: 2px solid #dedede;
}
.edit-topping-form__reset-btn:not(.active):hover {
  background: #e7e7e7;
  color: #333;
}
</style>