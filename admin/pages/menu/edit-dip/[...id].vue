<template>
  <section class="edit-dip">
    <SectionHeader
      :redirectLink="redirectLink"
      :redirectText="redirectText"
      :title="title"
    >
      <template #header-icon>
        <Icon name="bx:food-menu" />
      </template>
    </SectionHeader>
    <PizzaLoader v-if="isLoadingDip" />
    <DipForm
      :handleSubmitForm="handleEditDipSubmit"
      :validationSchema="editDipData"
      :categories="categories"
      :initialValues="initialValus"
      :isCreatingDip="isCreatingDip"
      :isLoading="isLoading"
    />
  </section>
</template>
<script setup lang="ts">
import { useLoading } from "~/composables/useLoading";
import { hasPhotoFileError } from "~/utils/hasPhotoFileError";
import { IDipFormData } from "~/types/menu";
import { ICategory } from "~/types/category";
import { editDipData } from "~/validations";
import { getAllCategories } from "~/api/category";
import { editDip, getDip } from "~/api/menu";

const redirectLink = "/menu/dips";
const redirectText = "Go Back To Dips";
const title = "Edit a Dip";

const { $toast } = useNuxtApp();
const { params } = useRoute();
const categories = ref<ICategory[]>([]);
const isLoading = ref(false);

const isCreatingDip = false;
const initialValus = ref({
  type: "",
  price: null,
  vegan: null,
  weight: null,
  photo: null,
  "dip-photo": "",
  calorie: null,
  proteins: null,
  fats: null,
  carbohydrates: null,
});
const { isLoading: isLoadingDip, startLoading, stopLoading } = useLoading();

watchEffect(async () => {
  try {
    startLoading();
    const categoriesResponse = await getAllCategories();
    categories.value = categoriesResponse.data.data;
    stopLoading();
  } catch (err) {
    console.log(err);
    stopLoading();
  }
});

watchEffect(async () => {
  try {
    startLoading();

    const dipResponse = await getDip(params.id[0]);
    initialValus.value = {
      ...dipResponse.data.data,
      ...dipResponse.data.data.nutritionalValue,
    };
    stopLoading();
  } catch (err) {
    console.log(err);
    stopLoading();
  }
});

const handleEditDipSubmit = (dipData: IDipFormData) => {
  const formData = new FormData();

  if (dipData["dip-photo"]) {
    const error = hasPhotoFileError(dipData["dip-photo"]);
    if (error) {
      $toast.error(error);
    } else {
      formData.append("dip-photo", dipData["dip-photo"]);
    }
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
      await editDip(params.id[0], formData);
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
};
</script>
<style scoped>
</style>