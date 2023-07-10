<template>
  <section class="edit-pizza">
    <SectionHeader
      :redirectLink="redirectLink"
      :redirectText="redirectText"
      :title="title"
    >
      <template #header-icon>
        <Icon name="bx:food-menu" />
      </template>
    </SectionHeader>
    <PizzaLoader v-if="isLoadingPizza" />
    <PizzaForm
      v-if="isDataFetched"
      :categories="categories"
      :handleFormSubmit="handleEditPizzaSubmit"
      :toppings="toppings"
      :initialValues="initialValues"
      :validationSchema="editPizzaData"
      :isCreatingPizza="isCreatingPizza"
      :isLoading="isLoading"
    />
  </section>
</template>
<script setup lang="ts">
import { useLoading } from "~/composables/useLoading";
import { ICategory } from "~/types/category";
import { ITopping } from "~/types/topping";
import { IPizzaFormData } from "~/types/pizza";
import { hasPhotoFileError } from "~/utils/hasPhotoFileError";
import { getAllCategories } from "~/api/category";
import { getAllToppings } from "~/api/topping";
import { getPizza, editPizza } from "~/api/pizza";
import { editPizzaData } from "~/validations";

const redirectLink = "/menu/pizzas";
const redirectText = "Go Back To Pizzas";
const title = "Edit a Pizza";
const isCreatingPizza = false;

const categories = ref<ICategory[]>([]);
const toppings = ref<ITopping[]>([]);
const isLoading = ref(false);
const isDataFetched = ref(false);
const { params } = useRoute();
const { $toast } = useNuxtApp();

const initialValues = ref({});
const { isLoading: isLoadingPizza, startLoading, stopLoading } = useLoading();

watchEffect(async () => {
  try {
    startLoading();
    const pizzaResponse = await getPizza(params.id[0]);
    initialValues.value = {
      ...pizzaResponse.data.data,
      pizzaSizes: pizzaResponse.data.data.pizzaSizes.map((pizzaSize: any) => {
        pizzaSize.crusts = pizzaSize.crusts[0];
        pizzaSize.edges = pizzaSize.edges[0];
        pizzaSize.slices = pizzaSize.slices[0];
        return pizzaSize;
      }),
    };
    stopLoading();
  } catch (err) {
    stopLoading();
    console.log(err);
  }
});

const fetchAllCategories = async () => {
  try {
    startLoading();
    const categoriesResponse = await getAllCategories();
    categories.value = categoriesResponse.data.data;
    stopLoading();
  } catch (err) {
    stopLoading();
    console.log(err);
  }
};
fetchAllCategories();

const fetchAllToppings = async () => {
  try {
    const toppingsResponse = await getAllToppings();
    toppings.value = toppingsResponse.data.data;
    isDataFetched.value = true;
  } catch (err) {
    console.log(err);
  }
};
fetchAllToppings();

const handleEditPizzaSubmit = (pizzaData: IPizzaFormData) => {
  const formData = new FormData();
  console.log(pizzaData);
  const errors = [];
  let error: string;
  for (const pizzaSize of pizzaData.pizzaSizes) {
    const pizzaPhotoType = typeof pizzaSize.photo;
    switch (pizzaSize.size) {
      case "SMALL":
        if (pizzaPhotoType === "object") {
          error = hasPhotoFileError(pizzaSize.photo) as string;
          if (error) {
            errors.push(error);
          } else {
            formData.append("small", pizzaSize.photo);
          }
        }
        break;
      case "MEDIUM":
        if (pizzaPhotoType === "object") {
          error = hasPhotoFileError(pizzaSize.photo) as string;
          if (error) {
            errors.push(error);
          } else {
            formData.append("medium", pizzaSize.photo);
          }
        }
        break;
      case "LARGE":
        if (pizzaPhotoType === "object") {
          error = hasPhotoFileError(pizzaSize.photo) as string;
          if (error) {
            errors.push(error);
          } else {
            formData.append("large", pizzaSize.photo);
          }
        }
        break;
    }
  }
  if (errors.length) {
    errors.forEach((err) => $toast.error(err));
  }
  formData.append("name", pizzaData.name);
  formData.append("categoryId", pizzaData.categoryId);
  formData.append("vegan", pizzaData.vegan);
  formData.append("spiceLevel", pizzaData.spiceLevel);
  formData.append("pizzaSizes", JSON.stringify(pizzaData.pizzaSizes));

  (async () => {
    try {
      isLoading.value = true;
      await editPizza(params.id[0], formData);
      navigateTo("/menu/pizzas");
      isLoading.value = false;
    } catch (err: any) {
      console.log(err);
      if (err?.response?.data?.errors) {
        $toast.error(err?.response?.data?.errors);
        isLoading.value = false;
      }
    }
  })();
};
</script>
<style scoped>
</style>