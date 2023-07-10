<template>
  <section class="add-category">
    <SectionHeader
      :redirectLink="redirectLink"
      :redirectText="redirectText"
      :title="title"
    >
      <template #header-icon>
        <Icon name="bx:food-menu" />
      </template>
    </SectionHeader>
    <PizzaLoader v-if="isCategoryDataLoading" />
    <MenuCategoryForm
      :handleCategoryFormSubmit="handleCreateCategorySubmit"
      :isLoading="isLoading"
      :initialValues="initialValues"
      :validationSchema="editCategoryData"
      :isCreatingCategory="false"
    />
  </section>
</template>
  <script setup lang="ts">
import { useLoading } from "~/composables/useLoading";
import { getCategory, editCategory } from "~/api/category";
import { hasPhotoFileError } from "~/utils/hasPhotoFileError";
import { ICreateCategoryFormData } from "~/types/category";
import { editCategoryData } from "~/validations";

const redirectLink = "category/categories";
const redirectText = "Go Back to Categories";
const title = "Edit a Category";
const initialValues = ref({});
const { params } = useRoute();
const isLoading = ref(false);

const { $toast } = useNuxtApp();
const {
  isLoading: isCategoryDataLoading,
  startLoading,
  stopLoading,
} = useLoading();

watchEffect(async () => {
  startLoading();
  const categoryResponse = await getCategory(params.id[0]);
  initialValues.value = categoryResponse.data.data;
  stopLoading();
});

const handleCreateCategorySubmit = (categoryData: ICreateCategoryFormData) => {
  const error = hasPhotoFileError(categoryData["category-photo"]);
  const formData = new FormData();
  if (error) {
    $toast.error(error);
  } else {
    console.log(categoryData["category-photo"]);
    if (categoryData["category-photo"]) {
      formData.append("category-photo", categoryData["category-photo"]);
    }
  }

  formData.append("name", categoryData.name);
  formData.append("description", categoryData.description);

  (async () => {
    try {
      isLoading.value = true;
      await editCategory(Number(params.id[0]), formData);
      isLoading.value = false;
      navigateTo("/category/categories");
    } catch (err: any) {
      console.log(err);
      if (err.response.data?.errors) {
        $toast.error(err.response.data.errors);
      }
      isLoading.value = false;
    }
  })();
};
</script>
  