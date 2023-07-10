<template>
  <section class="dip-photo">
    <SectionHeader
      :redirectLink="redirectLink"
      :redirectText="redirectText"
      :title="title"
    >
      <template #header-icon>
        <Icon name="bx:food-menu" />
      </template>
    </SectionHeader>
    <DipForm
      :handleSubmitForm="handleCreateDipSubmit"
      :validationSchema="createDipData"
      :categories="categories"
      :initialValues="initialValus"
      :isCreatingDip="isCreatingDip"
      :isLoading="isLoading"
    />
  </section>
</template>
<script setup lang="ts">
import { hasPhotoFileError } from "~/utils/hasPhotoFileError";
import { IDipFormData } from "~/types/menu";
import { ICategory } from "~/types/category";
import { createDipData } from "~/validations";
import { getAllCategories } from "~/api/category";
import { createDip } from "~/api/menu";

const redirectLink = "/menu/dips";
const redirectText = "Go Back To Dips";
const title = "Add a New Dip";

const { $toast } = useNuxtApp();
const categories = ref<ICategory[]>([]);
const isLoading = ref(false);

const isCreatingDip = true;
const initialValus = {
  type: "",
  price: null,
  vegan: null,
  weight: null,
  "dip-photo": "",
  calorie: null,
  proteins: null,
  fats: null,
  carbohydrates: null,
};

watchEffect(async () => {
  try {
    const categoriesResponse = await getAllCategories();
    categories.value = categoriesResponse.data.data;
  } catch (err) {
    console.log(err);
  }
});

const handleCreateDipSubmit = (dipData: IDipFormData) => {
  const formData = new FormData();
  const error = hasPhotoFileError(dipData["dip-photo"]);
  if (error) {
    $toast.error(error);
  } else {
    formData.append("dip-photo", dipData["dip-photo"]);
  }

  const nutritionalValue = {
    calorie: dipData.calorie,
    fats: dipData.fats,
    proteins: dipData.proteins,
    carbohydrates: dipData.carbohydrates,
  };

  formData.append("type", dipData.type);
  formData.append("price", dipData.price);
  formData.append("categoryId", dipData.categoryId);
  formData.append("weight", dipData.weight);
  formData.append("vegan", dipData.vegan);
  formData.append("nutritionalValue", JSON.stringify(nutritionalValue));

  (async () => {
    try {
      isLoading.value = true;
      await createDip(formData);
      navigateTo("/menu/dips");
      isLoading.value = false;
    } catch (err: any) {
      if (err?.response?.data?.errors) {
        $toast.error(err.response?.data?.errors);
      }
      isLoading.value = false;
      console.log(err);
    }
  })();

  console.log(dipData);
};
</script>
<style scoped>
</style>