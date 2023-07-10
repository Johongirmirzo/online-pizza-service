<template>
  <section class="add-menu-item">
    <SectionHeader
      :redirectLink="redirectLink"
      :redirectText="redirectText"
      :title="title"
    >
      <template #header-icon>
        <Icon name="bx:food-menu" />
      </template>
    </SectionHeader>
    <MenuItemForm
      :handleFormSubmit="handleCreateMenuItemSubmit"
      :validationSchema="createMenuItemData"
      :categories="categories"
      :initialValues="initialValus"
      :isCreatingMenuItem="isCreatingMenuItem"
      :isLoading="isLoading"
    />
  </section>
</template>
<script setup lang="ts">
import { useLoading } from "~/composables/useLoading";
import { v4 as uuid } from "uuid";
import { hasPhotoFileError } from "~/utils/hasPhotoFileError";
import { getAllCategories } from "~/api/category";
import { createMenuItem } from "~/api/menu";
import { ICategory } from "~/types/category";
import { IMenuItemFormData } from "~/types/menu";
import { createMenuItemData } from "~/validations";

const redirectLink = "/menu/menu-items";
const redirectText = "Go Back To Menu Items";
const title = "Add a New Menu Item";

const { $toast } = useNuxtApp();
const categories = ref<ICategory[]>([]);
const isLoading = ref(false);

const {
  isLoading: isLoadingPizzaData,
  startLoading,
  stopLoading,
} = useLoading();

const isCreatingMenuItem = true;
const initialValus = {
  name: "",
  description: "",
  type: "",
  vegan: null,
  categoryId: null,
  calories: null,
  fats: null,
  proteins: null,
  carbohydrates: null,
  pieces: [
    {
      id: uuid(),
      size: "",
      amount: "",
      price: "",
      weight: "",
      photo: "",
    },
  ],
};

watchEffect(async () => {
  try {
    const categoriesResponse = await getAllCategories();
    categories.value = categoriesResponse.data.data;
  } catch (err) {
    console.log(err);
  }
});

const handleCreateMenuItemSubmit = async (dipData: IMenuItemFormData) => {
  const formData = new FormData();

  const errors = [];
  for (const piece of dipData.pieces) {
    const error = hasPhotoFileError(piece.photo);
    if (error) {
      errors.push(error);
    }
    if (piece.size === "SMALL") {
      formData.append("small", piece.photo);
    }
    if (piece.size === "MEDIUM") {
      formData.append("medium", piece.photo);
    }
    if (piece.size === "LARGE") {
      formData.append("large", piece.photo);
    }
  }

  if (errors.length) {
    for (const error of errors) {
      $toast.error(error);
    }
  }
  const photoRemovedPieces = dipData.pieces.map((piece: any) => {
    if (piece.photo) {
      delete piece.photo;
    }
    return piece;
  });

  formData.append("name", dipData.name);
  formData.append("type", dipData.type);
  formData.append("spiceLevel", dipData.spiceLevel);
  formData.append("description", dipData.description);
  formData.append("categoryId", dipData.categoryId);
  formData.append("calories", dipData.calories);
  formData.append("fats", dipData.fats);
  formData.append("proteins", dipData.proteins);
  formData.append("carbohydrates", dipData.carbohydrates);
  formData.append("vegan", dipData.vegan);
  formData.append("pieces", JSON.stringify(photoRemovedPieces));

  (async () => {
    try {
      startLoading();
      isLoading.value = true;
      const menuItemResponse = await createMenuItem(formData);
      console.log(menuItemResponse);
      navigateTo("/menu/menu-items");
      isLoading.value = false;
      stopLoading();
    } catch (err: any) {
      if (err?.response?.data?.errors) {
        $toast.error(err.response?.data?.errors);
      }
      stopLoading();
      isLoading.value = false;
    }
  })();
};
</script>
<style scoped>
</style>