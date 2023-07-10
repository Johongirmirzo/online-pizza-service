<template>
  <section class="add-topping">
    <SectionHeader
      :redirectLink="redirectLink"
      :redirectText="redirectText"
      :title="title"
    >
      <template #header-icon>
        <Icon name="bx:food-menu" />
      </template>
    </SectionHeader>
    <ToppingForm
      :handleFormSubmit="handleCreateToppingSubmit"
      :validationSchema="createToppingData"
      :isLoading="isLoading"
      :isCreatingTopping="true"
      :initialValues="initialValues"
    />
  </section>
</template>
<script setup lang="ts">
import { IToppingFormData } from "~/types/topping";
import { createToppingData } from "~/validations";
import { createTopping } from "~/api/topping";

const redirectLink = "/topping/toppings";
const redirectText = "Go Back To Toppings";
const title = "Create a New Topping";

const { $toast } = useNuxtApp();

const isLoading = ref(false);
const initialValues = {
  type: "",
  forPizzaSize: "",
  name: "",
  light: null,
  standard: null,
  double: null,
  extra: null,
};

const handleCreateToppingSubmit = (toppingData: IToppingFormData) => {
  toppingData["light"] = Number(toppingData["light"]);
  toppingData["standard"] = Number(toppingData["standard"]);
  toppingData["double"] = Number(toppingData["double"]);
  toppingData["extra"] = Number(toppingData["extra"]);

  (async () => {
    try {
      isLoading.value = true;
      const data = await createTopping(toppingData);
      isLoading.value = false;
      navigateTo("/toppings");
    } catch (err: any) {
      if (err?.response?.data?.errors) {
        $toast.error(err.response?.data.errors);
      }
      isLoading.value = false;
    }
  })();
};
</script>