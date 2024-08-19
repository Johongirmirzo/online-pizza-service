<template>
  <section class="edit-menu-item">
    <SectionHeader
      :redirectLink="redirectLink"
      :redirectText="redirectText"
      :title="title"
    >
      <template #header-icon>
        <Icon name="bx:food-menu" />
      </template>
    </SectionHeader>
    <PizzaLoader v-if="isLoadingMenuItem" />
    <MenuItemForm
      v-if="initialValus.name"
      :handleFormSubmit="handleEditMenuItemSubmit"
      :validationSchema="editMenuItemData"
      :categories="categories"
      :initialValues="initialValus"
      :isCreatingMenuItem="isCreatingMenuItem"
      :isLoading="isLoading"
    />
  </section>
</template>
<script setup lang="ts">
import { useLoading } from '~/composables/useLoading'
import { v4 as uuid } from 'uuid'
import { hasPhotoFileError } from '~/utils/hasPhotoFileError'
import { ICategory } from '~/types/category'
import { getAllCategories } from '~/api/category'
import { editMenuItem, getMenuItem } from '~/api/menu'
import { IMenuItemFormData } from '~/types/menu'
import { editMenuItemData } from '~/validations'

const redirectLink = '/menu/menu-items'
const redirectText = 'Go Back To Menu Items'
const title = 'Edit a Menu Item'

const { $toast } = useNuxtApp()
const { params } = useRoute()
const categories = ref<ICategory[]>([])
const isLoading = ref(false)

const { isLoading: isLoadingMenuItem, startLoading, stopLoading } = useLoading()

const isCreatingMenuItem = false
const initialValus = ref({
  name: '',
  description: '',
  type: '',
  vegan: null,
  categoryId: null,
  calories: null,
  fats: null,
  proteins: null,
  carbohydrates: null,
  pieces: [],
})

const fetchAllCategories = async () => {
  try {
    const categoriesResponse = await getAllCategories()
    categories.value = categoriesResponse.data.data
  } catch (err) {
    console.log(err)
  }
}
fetchAllCategories()

watchEffect(async () => {
  try {
    startLoading()
    const menuItemResponse = await getMenuItem(params.id[0])
    const parsedPieces = menuItemResponse.data.data.pieces.map(
      (piece: string) => JSON.parse(piece)
    )
    initialValus.value = {
      ...menuItemResponse.data.data,
      pieces: parsedPieces[0],
    }
    stopLoading()
  } catch (err) {
    stopLoading()
  }
})

const handleEditMenuItemSubmit = async (dipData: IMenuItemFormData) => {
  const formData = new FormData()
  const errors = []
  for (const piece of dipData.pieces) {
    const photoType = typeof piece.photo
    if (photoType === 'object') {
      const error = hasPhotoFileError(piece.photo)
      if (error) {
        errors.push(error)
      }
    }
    if (piece.size === 'SMALL' && photoType === 'object') {
      formData.append('small', piece.photo)
    }
    if (piece.size === 'MEDIUM' && photoType === 'object') {
      formData.append('medium', piece.photo)
    }
    if (piece.size === 'LARGE' && photoType === 'object') {
      formData.append('large', piece.photo)
    }
  }

  if (errors.length) {
    for (const error of errors) {
      $toast.error(error)
    }
  }

  formData.append('name', dipData.name)
  formData.append('description', dipData.description)
  formData.append('categoryId', dipData.categoryId)
  formData.append('calories', dipData.calories)
  formData.append('type', dipData.type)
  formData.append('fats', dipData.fats)
  formData.append('proteins', dipData.proteins)
  formData.append('carbohydrates', dipData.carbohydrates)
  formData.append('vegan', dipData.vegan)
  formData.append('pieces', JSON.stringify(dipData.pieces))
  ;(async () => {
    try {
      isLoading.value = true
      await editMenuItem(params.id[0], formData)
      navigateTo('/menu/menu-items')
      isLoading.value = false
    } catch (err: any) {
      if (err?.response?.data?.errors) {
        $toast.error(err.response?.data?.errors)
      }
      isLoading.value = false
    }
  })()
}
</script>
<style scoped></style>
