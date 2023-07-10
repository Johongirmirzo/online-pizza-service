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
    <MenuCategoryForm
      :handleCategoryFormSubmit="handleCreateCategorySubmit"
      :validationSchema="createCategoryData"
      :initialValues="initialValues"
      :isLoading="isLoading"
      :isCreatingCategory="true"
    />
  </section>
</template>
<script setup lang="ts">
import { createCategory } from "~/api/category";
import { hasPhotoFileError } from "~/utils/hasPhotoFileError";
import { ICreateCategoryFormData } from "~/types/category";
import { createCategoryData } from "~/validations";

const redirectLink = "/category/categories";
const redirectText = "Go Back to Categories";
const title = "Add a New Category";

const isLoading = ref(false);
const { $toast } = useNuxtApp();

const initialValues = {
  name: "",
  description: "",
  photo: "",
};

const handleCreateCategorySubmit = (categoryData: ICreateCategoryFormData) => {
  const error = hasPhotoFileError(categoryData["category-photo"]);
  const formData = new FormData();
  if (error) {
    $toast.error(error);
    isLoading.value = false;
  } else {
    console.log(categoryData["category-photo"]);
    formData.append("category-photo", categoryData["category-photo"]);
  }

  formData.append("name", categoryData.name);
  formData.append("description", categoryData.description);

  // create a new category
  (async () => {
    try {
      isLoading.value = true;
      await createCategory(formData);
      isLoading.value = false;
      navigateTo("/category/categories");
    } catch (err: any) {
      if (err.response?.data?.errors) {
        $toast.error(err.response.data.errors);
      }
      isLoading.value = false;
    }
  })();
};
</script>
<style scoped>
</style>
