<template>
  <section class="add-pizza">
    <SectionHeader
      :redirectLink="redirectLink"
      :redirectText="redirectText"
      :title="title"
    >
      <template #header-icon>
        <Icon name="bx:food-menu" />
      </template>
    </SectionHeader>
    <PizzaLoader v-if="!isDataFetched" />
    <PizzaForm
      v-if="isDataFetched"
      :categories="categories"
      :handleFormSubmit="handleCreatePizzaSubmit"
      :toppings="toppings"
      :initialValues="initialValues"
      :validationSchema="createPizzaData"
      :isCreatingPizza="isCreatingPizza"
      :isLoading="isLoading"
    />
  </section>
</template>
<script setup lang="ts">
import { v4 as uuid } from 'uuid'
import { ICategory } from '~/types/category'
import { ITopping } from '~/types/topping'
import { IPizzaFormData } from '~/types/pizza'
import { hasPhotoFileError } from '~/utils/hasPhotoFileError'
import { getAllCategories } from '~/api/category'
import { getAllToppings } from '~/api/topping'
import { createPizza } from '~/api/pizza'
import { createPizzaData } from '~/validations'

const isCreatingPizza = true

const categories = ref<ICategory[]>([])
const toppings = ref<ITopping[]>([])
const isLoading = ref(false)
const isDataFetched = ref(false)
const { $toast } = useNuxtApp()

const initialValues = ref({
  name: '',
  spiceLevel: '',
  categoryId: null,
  vegan: null,
  pizzaSizes: [
    {
      size: '',
      price: null,
      photo: '',
      circumfarance: '',
      weight: null,
      nutritionalValue: {
        calories: '',
        fats: '',
        proteins: '',
        carbohydrates: '',
      },
      slices: {
        regularCut: null,
        squareCut: null,
        doubleCut: null,
      },
      crusts: {
        classicCrust: null,
        thinCrust: null,
        thinnestCrust: null,
        duplexCrustMozarella: null,
        duplexCrustCheddar: null,
      },
      edges: {
        mozarellaEdge: null,
        saucageEdge: null,
        parmesanEdge: null,
        garlicSaucageEdge: null,
      },
      standardToppings: [],
      extraToppings: [],
    },
    {
      size: '',
      price: null,
      photo: '',
      circumfarance: '',
      weight: null,
      nutritionalValue: {
        calories: '',
        fats: '',
        proteins: '',
        carbohydrates: '',
      },
      slices: {
        regularCut: null,
        squareCut: null,
        doubleCut: null,
      },
      crusts: {
        classicCrust: null,
        thinCrust: null,
        thinnestCrust: null,
        duplexCrustMozarella: null,
        duplexCrustCheddar: null,
      },
      edges: {
        mozarellaEdge: null,
        saucageEdge: null,
        parmesanEdge: null,
        garlicSaucageEdge: null,
      },
      standardToppings: [],
      extraToppings: [],
    },
    {
      size: '',
      price: null,
      photo: '',
      circumfarance: '',
      weight: null,
      nutritionalValue: {
        calories: '',
        fats: '',
        proteins: '',
        carbohydrates: '',
      },
      slices: {
        regularCut: null,
        squareCut: null,
        doubleCut: null,
      },
      crusts: {
        classicCrust: null,
        thinCrust: null,
        thinnestCrust: null,
        duplexCrustMozarella: null,
        duplexCrustCheddar: null,
      },
      edges: {
        mozarellaEdge: null,
        saucageEdge: null,
        parmesanEdge: null,
        garlicSaucageEdge: null,
      },
      standardToppings: [],
      extraToppings: [],
    },
  ],
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

const fetchAllToppings = async () => {
  try {
    const toppingsResponse = await getAllToppings()
    console.log('Toppings', toppingsResponse.data.data)
    toppings.value = toppingsResponse.data.data
    isDataFetched.value = true
  } catch (err) {
    console.log(err)
  }
}
fetchAllToppings()

const redirectLink = '/menu/pizzas'
const redirectText = 'Go Back To Pizzas'
const title = 'Add a New Pizza'

const handleCreatePizzaSubmit = (pizzaData: IPizzaFormData) => {
  const formData = new FormData()
  const errors = []
  let error: string
  for (const pizzaSize of pizzaData.pizzaSizes) {
    switch (pizzaSize.size) {
      case 'SMALL':
        error = hasPhotoFileError(pizzaSize.photo)
        if (error) {
          errors.push(error)
        } else {
          formData.append('small', pizzaSize.photo)
        }
        break
      case 'MEDIUM':
        error = hasPhotoFileError(pizzaSize.photo)
        if (error) {
          errors.push(error)
        } else {
          formData.append('medium', pizzaSize.photo)
        }
        break
      case 'LARGE':
        error = hasPhotoFileError(pizzaSize.photo)
        if (error) {
          errors.push(error)
        } else {
          formData.append('large', pizzaSize.photo)
        }
        break
    }
  }

  if (errors.length) {
    errors.forEach((err) => $toast.error(err))
  }
  formData.append('name', pizzaData.name)
  formData.append('categoryId', pizzaData.categoryId)
  formData.append('vegan', pizzaData.vegan)
  formData.append('spiceLevel', pizzaData.spiceLevel)
  formData.append('pizzaSizes', JSON.stringify(pizzaData.pizzaSizes))
  ;(async () => {
    try {
      isLoading.value = true
      await createPizza(formData)
      navigateTo('/menu/pizzas')
      isLoading.value = false
    } catch (err: any) {
      if (err?.response?.data?.errors) {
        $toast.error(err?.response?.data?.errors)
        isLoading.value = false
      }
    }
  })()
}
</script>
<style scoped></style>
