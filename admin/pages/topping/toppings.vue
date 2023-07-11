<template>
  <section class="toppings">
    <header class="toppings__header">
      <h1 class="toppings__title">All Toppings</h1>
    </header>
    <PizzaLoader v-if="isLoading" />
    <div class="toppings__table-box">
      <HeaderAction
        :routeTo="routeTo"
        :dataList="toppings"
        :csv="csv"
        :dataType="'Topping'"
        :downloadCSVFilename="downloadCSVFilename"
        :fetchAllData="fetchAllToppings"
        :handleDownloadCSVClick="handleDownloadCSVClick"
        :handleDownloadExcelClick="handleDownloadExcelClick"
        :handleDownloadPdfClick="handleDownloadPdfClick"
        @update-search-data="handleUpdateSearchData"
      />
      <div v-if="!toppings.length" class="toppings__table-placeholder-box">
        <h2 class="toppings__table-placeholder-title">
          No toppings have been created yet!
        </h2>
      </div>
      <table v-else class="toppings-table" ref="toppingsPdfTable">
        <thead>
          <tr class="toppings-table__row toppings-table__head-row">
            <th scope="col" class="toppings-table__head">Id</th>
            <th scope="col" class="toppings-table__head">Name</th>
            <th scope="col" class="toppings-table__head">Topping Type</th>
            <th scope="col" class="toppings-table__head">For Pizza Size</th>
            <th scope="col" class="toppings-table__head">Light</th>
            <th scope="col" class="toppings-table__head">Standard</th>
            <th scope="col" class="toppings-table__head">Extra</th>
            <th scope="col" class="toppings-table__head">Double</th>
            <th scope="col" class="toppings-table__head">Action</th>
          </tr>
        </thead>
        <tbody v-if="toppings.length">
          <tr
            v-for="topping in getFilteredToppings(searchData)"
            :key="topping.id"
            class="toppings__table-row toppings-table__body-row"
          >
            <td class="toppings-table__cell">
              <p class="toppings-table__text">
                {{ topping.id }}
              </p>
            </td>
            <td class="toppings-table__cell">
              <p class="toppings-table__text">
                {{ topping.name }}
              </p>
            </td>
            <td class="toppings-table__cell">
              <p class="toppings-table__text">
                {{ topping.type }}
              </p>
            </td>
            <td class="toppings-table__cell">
              <p class="toppings-table__text">
                {{ topping.forPizzaSize }}
              </p>
            </td>
            <td class="toppings-table__cell">
              <p class="toppings-table__text">
                {{ topping.light }}
              </p>
            </td>
            <td class="toppings-table__cell">
              <p class="toppings-table__text">
                {{ topping.standard }}
              </p>
            </td>
            <td class="toppings-table__cell">
              <p class="toppings-table__text">
                {{ topping.extra }}
              </p>
            </td>
            <td class="toppings-table__cell">
              <p class="toppings-table__text">
                {{ topping.double }}
              </p>
            </td>
            <td class="toppings-table__cell">
              <div class="toppings-table__btns-box">
                <NuxtLink
                  title="Edit topping"
                  :to="`/edit-topping/${topping.id}`"
                  class="toppings-table__btn toppings-table__edit-topping-btn"
                >
                  <Icon
                    size="18"
                    class="toppings__table-icon"
                    name="lucide:edit"
                  />
                </NuxtLink>
                <button
                  title="Delete topping"
                  @click="handleDeleteToppingClick(topping.id)"
                  class="toppings-table__btn toppings-table__delete-topping-btn"
                >
                  <Icon
                    size="18"
                    class="toppings__table-icon"
                    name="jam:trash"
                  />
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>
<script setup lang="ts">
import { useLoading } from "~/composables/useLoading";
import { deleteTopping, getAllToppings, createTopping } from "~/api/topping";
import { ITopping } from "~/types/topping";

const { $toast } = useNuxtApp();
const searchData = ref("");
const toppingsPdfTable = ref<HTMLElement>();
const toppings = ref<ITopping[]>([]);
const routeTo = "/topping/add-topping";
const downloadCSVFilename = "all-toppings.csv";

const { isLoading, startLoading, stopLoading } = useLoading();

// watchEffect(async () => {
//   const toppings = [
//     {
//       type: "STANDARD",
//       forPizzaSize: "SMALL",
//       name: "Turkey Meat",
//       light: 0,
//       standard: 0,
//       extra: 3000,
//       double: 5000,
//     },
//     {
//       type: "EXTRA",
//       forPizzaSize: "SMALL",
//       name: "Turkey Meat",
//       light: 3000,
//       standard: 4000,
//       extra: 5000,
//       double: 7000,
//     },
//     {
//       type: "STANDARD",
//       forPizzaSize: "MEDIUM",
//       name: "Turkey Meat",
//       light: 0,
//       standard: 0,
//       extra: 4000,
//       double: 5000,
//     },
//     {
//       type: "EXTRA",
//       forPizzaSize: "MEDIUM",
//       name: "Turkey Meat",
//       light: 5000,
//       standard: 7000,
//       extra: 9000,
//       double: 11000,
//     },
//     {
//       type: "STANDARD",
//       forPizzaSize: "LARGE",
//       name: "Turkey Meat",
//       light: 0,
//       standard: 0,
//       extra: 6000,
//       double: 7000,
//     },
//     {
//       type: "EXTRA",
//       forPizzaSize: "LARGE",
//       name: "Turkey Meat",
//       light: 6000,
//       standard: 7000,
//       extra: 8000,
//       double: 11000,
//     },
//     {
//       type: "STANDARD",
//       forPizzaSize: "SMALL",
//       name: "Cheddar Cheese",
//       light: 0,
//       standard: 0,
//       extra: 2000,
//       double: 3000,
//     },
//     {
//       type: "STANDARD",
//       forPizzaSize: "SMALL",
//       name: "Parmesan Cheese",
//       light: 0,
//       standard: 0,
//       extra: 2000,
//       double: 3000,
//     },
//     {
//       type: "STANDARD",
//       forPizzaSize: "SMALL",
//       name: "Feta Cheese",
//       light: 0,
//       standard: 0,
//       extra: 2000,
//       double: 3000,
//     },
//     {
//       type: "STANDARD",
//       forPizzaSize: "SMALL",
//       name: "Mozarella Cheese",
//       light: 0,
//       standard: 0,
//       extra: 2000,
//       double: 3000,
//     },
//     {
//       type: "STANDARD",
//       forPizzaSize: "SMALL",
//       name: "Sausage",
//       light: 0,
//       standard: 0,
//       extra: 2000,
//       double: 4000,
//     },
//     {
//       type: "STANDARD",
//       forPizzaSize: "SMALL",
//       name: "Sausage Cube",
//       light: 0,
//       standard: 0,
//       extra: 2000,
//       double: 4000,
//     },
//     {
//       type: "STANDARD",
//       forPizzaSize: "SMALL",
//       name: "Sliced Sausage",
//       light: 0,
//       standard: 0,
//       extra: 2000,
//       double: 4000,
//     },
//     {
//       type: "STANDARD",
//       forPizzaSize: "SMALL",
//       name: "Mangal Sujuk",
//       light: 0,
//       standard: 0,
//       extra: 2000,
//       double: 4000,
//     },
//     {
//       type: "STANDARD",
//       forPizzaSize: "SMALL",
//       name: "Beef Ham",
//       light: 0,
//       standard: 0,
//       extra: 2000,
//       double: 4000,
//     },
//     {
//       type: "STANDARD",
//       forPizzaSize: "SMALL",
//       name: "Meat Ball",
//       light: 0,
//       standard: 0,
//       extra: 3000,
//       double: 5000,
//     },
//     {
//       type: "STANDARD",
//       forPizzaSize: "SMALL",
//       name: "Smoked Chicken Breast",
//       light: 0,
//       standard: 0,
//       extra: 2000,
//       double: 4000,
//     },
//     {
//       type: "STANDARD",
//       forPizzaSize: "SMALL",
//       name: "Beef Doner Meat",
//       light: 0,
//       standard: 0,
//       extra: 3000,
//       double: 5000,
//     },
//     {
//       type: "STANDARD",
//       forPizzaSize: "SMALL",
//       name: "Tuna Fish",
//       light: 0,
//       standard: 0,
//       extra: 2000,
//       double: 4000,
//     },
//     {
//       type: "STANDARD",
//       forPizzaSize: "SMALL",
//       name: "Chicken Slices",
//       light: 0,
//       standard: 0,
//       extra: 2000,
//       double: 4000,
//     },
//     {
//       type: "STANDARD",
//       forPizzaSize: "SMALL",
//       name: "Mayonnaise",
//       light: 0,
//       standard: 0,
//       extra: 1500,
//       double: 2500,
//     },
//     {
//       type: "STANDARD",
//       forPizzaSize: "SMALL",
//       name: "BBQ Sauce",
//       light: 0,
//       standard: 0,
//       extra: 1500,
//       double: 2500,
//     },
//     {
//       type: "STANDARD",
//       forPizzaSize: "SMALL",
//       name: "Roasted Red Pepper",
//       light: 0,
//       standard: 0,
//       extra: 1500,
//       double: 2500,
//     },
//     {
//       type: "STANDARD",
//       forPizzaSize: "SMALL",
//       name: "Red Pepper Flakes",
//       light: 0,
//       standard: 0,
//       extra: 0,
//       double: 0,
//     },
//     {
//       type: "STANDARD",
//       forPizzaSize: "SMALL",
//       name: "Green Peppers",
//       light: 0,
//       standard: 0,
//       extra: 1500,
//       double: 2500,
//     },
//     {
//       type: "STANDARD",
//       forPizzaSize: "SMALL",
//       name: "Black Olives",
//       light: 0,
//       standard: 0,
//       extra: 1500,
//       double: 2500,
//     },
//     {
//       type: "STANDARD",
//       forPizzaSize: "SMALL",
//       name: "Sweetcorn",
//       light: 0,
//       standard: 0,
//       extra: 1500,
//       double: 2500,
//     },
//     {
//       type: "STANDARD",
//       forPizzaSize: "SMALL",
//       name: "Tomatoes",
//       light: 0,
//       standard: 0,
//       extra: 1500,
//       double: 2500,
//     },
//     {
//       type: "STANDARD",
//       forPizzaSize: "SMALL",
//       name: "Pineapple",
//       light: 0,
//       standard: 0,
//       extra: 1500,
//       double: 2500,
//     },
//     {
//       type: "STANDARD",
//       forPizzaSize: "SMALL",
//       name: "Onions",
//       light: 0,
//       standard: 0,
//       extra: 1500,
//       double: 2500,
//     },
//     {
//       type: "STANDARD",
//       forPizzaSize: "SMALL",
//       name: "Sesame",
//       light: 0,
//       standard: 0,
//       extra: 0,
//       double: 0,
//     },
//     {
//       type: "STANDARD",
//       forPizzaSize: "SMALL",
//       name: "Oregano",
//       light: 0,
//       standard: 0,
//       extra: 0,
//       double: 0,
//     },
//     {
//       type: "STANDARD",
//       forPizzaSize: "SMALL",
//       name: "Mushrooms",
//       light: 0,
//       standard: 0,
//       extra: 1500,
//       double: 2500,
//     },
//     {
//       type: "STANDARD",
//       forPizzaSize: "SMALL",
//       name: "Jalapeno Peppers",
//       light: 0,
//       standard: 0,
//       extra: 1500,
//       double: 2500,
//     },
//     {
//       type: "STANDARD",
//       forPizzaSize: "SMALL",
//       name: "Pizza Sauce",
//       light: 0,
//       standard: 0,
//       extra: 1500,
//       double: 2500,
//     },
//     {
//       type: "EXTRA",
//       forPizzaSize: "SMALL",
//       name: "Cheddar Cheese",
//       light: 2000,
//       standard: 3000,
//       extra: 4000,
//       double: 6000,
//     },
//     {
//       type: "EXTRA",
//       forPizzaSize: "SMALL",
//       name: "Parmesan Cheese",
//       light: 2000,
//       standard: 3000,
//       extra: 4000,
//       double: 6000,
//     },
//     {
//       type: "EXTRA",
//       forPizzaSize: "SMALL",
//       name: "Feta Cheese",
//       light: 2000,
//       standard: 3000,
//       extra: 4000,
//       double: 6000,
//     },
//     {
//       type: "EXTRA",
//       forPizzaSize: "SMALL",
//       name: "Mozarella Cheese",
//       light: 2000,
//       standard: 3000,
//       extra: 4000,
//       double: 6000,
//     },
//     {
//       type: "EXTRA",
//       forPizzaSize: "SMALL",
//       name: "Sausage",
//       light: 2000,
//       standard: 3000,
//       extra: 4000,
//       double: 6000,
//     },
//     {
//       type: "EXTRA",
//       forPizzaSize: "SMALL",
//       name: "Sausage Cube",
//       light: 2000,
//       standard: 3000,
//       extra: 4000,
//       double: 6000,
//     },
//     {
//       type: "EXTRA",
//       forPizzaSize: "SMALL",
//       name: "Sliced Sausage",
//       light: 2000,
//       standard: 3000,
//       extra: 4000,
//       double: 6000,
//     },
//     {
//       type: "EXTRA",
//       forPizzaSize: "SMALL",
//       name: "Mangal Sujuk",
//       light: 2000,
//       standard: 3000,
//       extra: 4000,
//       double: 6000,
//     },
//     {
//       type: "EXTRA",
//       forPizzaSize: "SMALL",
//       name: "Beef Ham",
//       light: 3000,
//       standard: 4000,
//       extra: 5000,
//       double: 7000,
//     },
//     {
//       type: "EXTRA",
//       forPizzaSize: "SMALL",
//       name: "Meat Ball",
//       light: 3000,
//       standard: 4000,
//       extra: 5000,
//       double: 7000,
//     },
//     {
//       type: "EXTRA",
//       forPizzaSize: "SMALL",
//       name: "Smoked Chicken Breast",
//       light: 2000,
//       standard: 3000,
//       extra: 4000,
//       double: 6000,
//     },
//     {
//       type: "EXTRA",
//       forPizzaSize: "SMALL",
//       name: "Beef Doner Meat",
//       light: 3000,
//       standard: 4000,
//       extra: 6000,
//       double: 7000,
//     },
//     {
//       type: "EXTRA",
//       forPizzaSize: "SMALL",
//       name: "Tuna Fish",
//       light: 2000,
//       standard: 3000,
//       extra: 4000,
//       double: 5000,
//     },
//     {
//       type: "EXTRA",
//       forPizzaSize: "SMALL",
//       name: "Chicken Slices",
//       light: 2000,
//       standard: 3000,
//       extra: 4000,
//       double: 6000,
//     },
//     {
//       type: "EXTRA",
//       forPizzaSize: "SMALL",
//       name: "Mayonnaise",
//       light: 1500,
//       standard: 2500,
//       extra: 3000,
//       double: 4000,
//     },
//     {
//       type: "EXTRA",
//       forPizzaSize: "SMALL",
//       name: "BBQ Sauce",
//       light: 1000,
//       standard: 2000,
//       extra: 3000,
//       double: 4000,
//     },
//     {
//       type: "EXTRA",
//       forPizzaSize: "SMALL",
//       name: "Roasted Red Pepper",
//       light: 1500,
//       standard: 2500,
//       extra: 3500,
//       double: 4000,
//     },
//     {
//       type: "EXTRA",
//       forPizzaSize: "SMALL",
//       name: "Red Pepper Flakes",
//       light: 0,
//       standard: 0,
//       extra: 0,
//       double: 0,
//     },
//     {
//       type: "EXTRA",
//       forPizzaSize: "SMALL",
//       name: "Green Peppers",
//       light: 1500,
//       standard: 2500,
//       extra: 3500,
//       double: 4000,
//     },
//     {
//       type: "EXTRA",
//       forPizzaSize: "SMALL",
//       name: "Black Olives",
//       light: 1500,
//       standard: 2500,
//       extra: 3500,
//       double: 4000,
//     },
//     {
//       type: "EXTRA",
//       forPizzaSize: "SMALL",
//       name: "Sweetcorn",
//       light: 1500,
//       standard: 2500,
//       extra: 3500,
//       double: 4000,
//     },
//     {
//       type: "EXTRA",
//       forPizzaSize: "SMALL",
//       name: "Tomatoes",
//       light: 1500,
//       standard: 2500,
//       extra: 3500,
//       double: 4000,
//     },
//     {
//       type: "EXTRA",
//       forPizzaSize: "SMALL",
//       name: "Pineapple",
//       light: 1500,
//       standard: 2500,
//       extra: 3500,
//       double: 4000,
//     },
//     {
//       type: "EXTRA",
//       forPizzaSize: "SMALL",
//       name: "Onions",
//       light: 1500,
//       standard: 2500,
//       extra: 3500,
//       double: 4000,
//     },
//     {
//       type: "EXTRA",
//       forPizzaSize: "SMALL",
//       name: "Sesame",
//       light: 0,
//       standard: 0,
//       extra: 0,
//       double: 0,
//     },
//     {
//       type: "EXTRA",
//       forPizzaSize: "SMALL",
//       name: "Oregano",
//       light: 0,
//       standard: 0,
//       extra: 0,
//       double: 0,
//     },
//     {
//       type: "EXTRA",
//       forPizzaSize: "SMALL",
//       name: "Mushrooms",
//       light: 1500,
//       standard: 2500,
//       extra: 3500,
//       double: 4000,
//     },
//     {
//       type: "EXTRA",
//       forPizzaSize: "SMALL",
//       name: "Jalapeno Peppers",
//       light: 1500,
//       standard: 2500,
//       extra: 3500,
//       double: 4000,
//     },
//     {
//       type: "EXTRA",
//       forPizzaSize: "SMALL",
//       name: "Pizza Sauce",
//       light: 1500,
//       standard: 2500,
//       extra: 3500,
//       double: 4000,
//     },
//     {
//       type: "STANDARD",
//       forPizzaSize: "MEDIUM",
//       name: "Cheddar Cheese",
//       light: 0,
//       standard: 0,
//       extra: 4000,
//       double: 6000,
//     },
//     {
//       type: "STANDARD",
//       forPizzaSize: "MEDIUM",
//       name: "Parmesan Cheese",
//       light: 0,
//       standard: 0,
//       extra: 4000,
//       double: 6000,
//     },
//     {
//       type: "STANDARD",
//       forPizzaSize: "MEDIUM",
//       name: "Feta Cheese",
//       light: 0,
//       standard: 0,
//       extra: 4000,
//       double: 6000,
//     },
//     {
//       type: "STANDARD",
//       forPizzaSize: "MEDIUM",
//       name: "Mozarella Cheese",
//       light: 0,
//       standard: 0,
//       extra: 4000,
//       double: 6000,
//     },
//     {
//       type: "STANDARD",
//       forPizzaSize: "MEDIUM",
//       name: "Sausage",
//       light: 0,
//       standard: 0,
//       extra: 4000,
//       double: 6000,
//     },
//     {
//       type: "STANDARD",
//       forPizzaSize: "MEDIUM",
//       name: "Sausage Cube",
//       light: 0,
//       standard: 0,
//       extra: 4000,
//       double: 6000,
//     },
//     {
//       type: "STANDARD",
//       forPizzaSize: "MEDIUM",
//       name: "Sliced Sausage",
//       light: 0,
//       standard: 0,
//       extra: 4000,
//       double: 6000,
//     },
//     {
//       type: "STANDARD",
//       forPizzaSize: "MEDIUM",
//       name: "Mangal Sujuk",
//       light: 0,
//       standard: 0,
//       extra: 4000,
//       double: 6000,
//     },
//     {
//       type: "STANDARD",
//       forPizzaSize: "MEDIUM",
//       name: "Beef Ham",
//       light: 0,
//       standard: 0,
//       extra: 4000,
//       double: 6000,
//     },
//     {
//       type: "STANDARD",
//       forPizzaSize: "MEDIUM",
//       name: "Meat Ball",
//       light: 0,
//       standard: 0,
//       extra: 4000,
//       double: 6000,
//     },
//     {
//       type: "STANDARD",
//       forPizzaSize: "MEDIUM",
//       name: "Smoked Chicken Breast",
//       light: 0,
//       standard: 0,
//       extra: 4000,
//       double: 6000,
//     },
//     {
//       type: "STANDARD",
//       forPizzaSize: "MEDIUM",
//       name: "Beef Doner Meat",
//       light: 0,
//       standard: 0,
//       extra: 4000,
//       double: 6000,
//     },
//     {
//       type: "STANDARD",
//       forPizzaSize: "MEDIUM",
//       name: "Tuna Fish",
//       light: 0,
//       standard: 0,
//       extra: 4000,
//       double: 6000,
//     },
//     {
//       type: "STANDARD",
//       forPizzaSize: "MEDIUM",
//       name: "Chicken Slices",
//       light: 0,
//       standard: 0,
//       extra: 4000,
//       double: 6000,
//     },
//     {
//       type: "STANDARD",
//       forPizzaSize: "MEDIUM",
//       name: "Mayonnaise",
//       light: 0,
//       standard: 0,
//       extra: 3000,
//       double: 4000,
//     },
//     {
//       type: "STANDARD",
//       forPizzaSize: "MEDIUM",
//       name: "BBQ Sauce",
//       light: 0,
//       standard: 0,
//       extra: 3000,
//       double: 5000,
//     },
//     {
//       type: "STANDARD",
//       forPizzaSize: "MEDIUM",
//       name: "Roasted Red Pepper",
//       light: 0,
//       standard: 0,
//       extra: 3000,
//       double: 5000,
//     },
//     {
//       type: "STANDARD",
//       forPizzaSize: "MEDIUM",
//       name: "Red Pepper Flakes",
//       light: 0,
//       standard: 0,
//       extra: 0,
//       double: 0,
//     },
//     {
//       type: "STANDARD",
//       forPizzaSize: "MEDIUM",
//       name: "Green Peppers",
//       light: 0,
//       standard: 0,
//       extra: 3000,
//       double: 5000,
//     },
//     {
//       type: "STANDARD",
//       forPizzaSize: "MEDIUM",
//       name: "Black Olives",
//       light: 0,
//       standard: 0,
//       extra: 3000,
//       double: 5000,
//     },
//     {
//       type: "STANDARD",
//       forPizzaSize: "MEDIUM",
//       name: "Sweetcorn",
//       light: 0,
//       standard: 0,
//       extra: 3000,
//       double: 5000,
//     },
//     {
//       type: "STANDARD",
//       forPizzaSize: "MEDIUM",
//       name: "Tomatoes",
//       light: 0,
//       standard: 0,
//       extra: 3000,
//       double: 5000,
//     },
//     {
//       type: "STANDARD",
//       forPizzaSize: "MEDIUM",
//       name: "Pineapple",
//       light: 0,
//       standard: 0,
//       extra: 3000,
//       double: 5000,
//     },
//     {
//       type: "STANDARD",
//       forPizzaSize: "MEDIUM",
//       name: "Onions",
//       light: 0,
//       standard: 0,
//       extra: 3000,
//       double: 5000,
//     },
//     {
//       type: "STANDARD",
//       forPizzaSize: "MEDIUM",
//       name: "Sesame",
//       light: 0,
//       standard: 0,
//       extra: 0,
//       double: 0,
//     },
//     {
//       type: "STANDARD",
//       forPizzaSize: "MEDIUM",
//       name: "Oregano",
//       light: 0,
//       standard: 0,
//       extra: 0,
//       double: 0,
//     },
//     {
//       type: "STANDARD",
//       forPizzaSize: "MEDIUM",
//       name: "Mushrooms",
//       light: 0,
//       standard: 0,
//       extra: 3000,
//       double: 5000,
//     },
//     {
//       type: "STANDARD",
//       forPizzaSize: "MEDIUM",
//       name: "Jalapeno Peppers",
//       light: 0,
//       standard: 0,
//       extra: 3000,
//       double: 5000,
//     },
//     {
//       type: "STANDARD",
//       forPizzaSize: "MEDIUM",
//       name: "Pizza Sauce",
//       light: 0,
//       standard: 0,
//       extra: 3000,
//       double: 5000,
//     },
//     {
//       type: "EXTRA",
//       forPizzaSize: "MEDIUM",
//       name: "Cheddar Cheese",
//       light: 4000,
//       standard: 5000,
//       extra: 7000,
//       double: 9000,
//     },
//     {
//       type: "EXTRA",
//       forPizzaSize: "MEDIUM",
//       name: "Parmesan Cheese",
//       light: 4000,
//       standard: 5000,
//       extra: 7000,
//       double: 9000,
//     },
//     {
//       type: "EXTRA",
//       forPizzaSize: "MEDIUM",
//       name: "Feta Cheese",
//       light: 4000,
//       standard: 5000,
//       extra: 7000,
//       double: 9000,
//     },
//     {
//       type: "EXTRA",
//       forPizzaSize: "MEDIUM",
//       name: "Mozarella Cheese",
//       light: 4000,
//       standard: 5000,
//       extra: 7000,
//       double: 9000,
//     },
//     {
//       type: "EXTRA",
//       forPizzaSize: "MEDIUM",
//       name: "Sausage",
//       light: 4000,
//       standard: 5000,
//       extra: 7000,
//       double: 9000,
//     },
//     {
//       type: "EXTRA",
//       forPizzaSize: "MEDIUM",
//       name: "Sausage Cube",
//       light: 4000,
//       standard: 5000,
//       extra: 7000,
//       double: 9000,
//     },
//     {
//       type: "EXTRA",
//       forPizzaSize: "MEDIUM",
//       name: "Sliced Sausage",
//       light: 4000,
//       standard: 5000,
//       extra: 7000,
//       double: 9000,
//     },
//     {
//       type: "EXTRA",
//       forPizzaSize: "MEDIUM",
//       name: "Mangal Sujuk",
//       light: 4000,
//       standard: 5000,
//       extra: 7000,
//       double: 9000,
//     },
//     {
//       type: "EXTRA",
//       forPizzaSize: "MEDIUM",
//       name: "Beef Ham",
//       light: 4000,
//       standard: 5000,
//       extra: 7000,
//       double: 9000,
//     },
//     {
//       type: "EXTRA",
//       forPizzaSize: "MEDIUM",
//       name: "Meat Ball",
//       light: 4000,
//       standard: 5000,
//       extra: 8000,
//       double: 10000,
//     },
//     {
//       type: "EXTRA",
//       forPizzaSize: "MEDIUM",
//       name: "Smoked Chicken Breast",
//       light: 4000,
//       standard: 5000,
//       extra: 7000,
//       double: 9000,
//     },
//     {
//       type: "EXTRA",
//       forPizzaSize: "MEDIUM",
//       name: "Beef Doner Meat",
//       light: 4000,
//       standard: 5000,
//       extra: 8000,
//       double: 10000,
//     },
//     {
//       type: "EXTRA",
//       forPizzaSize: "MEDIUM",
//       name: "Tuna Fish",
//       light: 4000,
//       standard: 5000,
//       extra: 7000,
//       double: 9000,
//     },
//     {
//       type: "EXTRA",
//       forPizzaSize: "MEDIUM",
//       name: "Chicken Slices",
//       light: 4000,
//       standard: 5000,
//       extra: 7000,
//       double: 9000,
//     },
//     {
//       type: "EXTRA",
//       forPizzaSize: "MEDIUM",
//       name: "Mayonnaise",
//       light: 2000,
//       standard: 3000,
//       extra: 4000,
//       double: 6000,
//     },
//     {
//       type: "EXTRA",
//       forPizzaSize: "MEDIUM",
//       name: "BBQ Sauce",
//       light: 2000,
//       standard: 3000,
//       extra: 4000,
//       double: 6000,
//     },
//     {
//       type: "EXTRA",
//       forPizzaSize: "MEDIUM",
//       name: "Roasted Red Pepper",
//       light: 2000,
//       standard: 3000,
//       extra: 4000,
//       double: 6000,
//     },
//     {
//       type: "EXTRA",
//       forPizzaSize: "MEDIUM",
//       name: "Red Pepper Flakes",
//       light: 0,
//       standard: 0,
//       extra: 0,
//       double: 0,
//     },
//     {
//       type: "EXTRA",
//       forPizzaSize: "MEDIUM",
//       name: "Green Peppers",
//       light: 2000,
//       standard: 2000,
//       extra: 4000,
//       double: 6000,
//     },
//     {
//       type: "EXTRA",
//       forPizzaSize: "MEDIUM",
//       name: "Black Olives",
//       light: 2000,
//       standard: 3000,
//       extra: 4000,
//       double: 6000,
//     },
//     {
//       type: "EXTRA",
//       forPizzaSize: "MEDIUM",
//       name: "Sweetcorn",
//       light: 2000,
//       standard: 3000,
//       extra: 4000,
//       double: 6000,
//     },
//     {
//       type: "EXTRA",
//       forPizzaSize: "MEDIUM",
//       name: "Tomatoes",
//       light: 2000,
//       standard: 3000,
//       extra: 4000,
//       double: 6000,
//     },
//     {
//       type: "EXTRA",
//       forPizzaSize: "MEDIUM",
//       name: "Pineapple",
//       light: 2000,
//       standard: 3000,
//       extra: 4000,
//       double: 6000,
//     },
//     {
//       type: "EXTRA",
//       forPizzaSize: "MEDIUM",
//       name: "Onions",
//       light: 2000,
//       standard: 3000,
//       extra: 4000,
//       double: 6000,
//     },
//     {
//       type: "EXTRA",
//       forPizzaSize: "MEDIUM",
//       name: "Sesame",
//       light: 0,
//       standard: 0,
//       extra: 0,
//       double: 0,
//     },
//     {
//       type: "EXTRA",
//       forPizzaSize: "MEDIUM",
//       name: "Oregano",
//       light: 0,
//       standard: 0,
//       extra: 0,
//       double: 0,
//     },
//     {
//       type: "EXTRA",
//       forPizzaSize: "MEDIUM",
//       name: "Mushrooms",
//       light: 2000,
//       standard: 3000,
//       extra: 4000,
//       double: 6000,
//     },
//     {
//       type: "EXTRA",
//       forPizzaSize: "MEDIUM",
//       name: "Jalapeno Peppers",
//       light: 2000,
//       standard: 3000,
//       extra: 4000,
//       double: 6000,
//     },
//     {
//       type: "EXTRA",
//       forPizzaSize: "MEDIUM",
//       name: "Pizza Sauce",
//       light: 2000,
//       standard: 3000,
//       extra: 4000,
//       double: 6000,
//     },
//     {
//       type: "STANDARD",
//       forPizzaSize: "LARGE",
//       name: "Cheddar Cheese",
//       light: 0,
//       standard: 0,
//       extra: 4000,
//       double: 7000,
//     },
//     {
//       type: "STANDARD",
//       forPizzaSize: "LARGE",
//       name: "Parmesan Cheese",
//       light: 0,
//       standard: 0,
//       extra: 4000,
//       double: 7000,
//     },
//     {
//       type: "STANDARD",
//       forPizzaSize: "LARGE",
//       name: "Feta Cheese",
//       light: 0,
//       standard: 0,
//       extra: 4000,
//       double: 7000,
//     },
//     {
//       type: "STANDARD",
//       forPizzaSize: "LARGE",
//       name: "Mozarella Cheese",
//       light: 0,
//       standard: 0,
//       extra: 4000,
//       double: 7000,
//     },
//     {
//       type: "STANDARD",
//       forPizzaSize: "LARGE",
//       name: "Sausage",
//       light: 0,
//       standard: 0,
//       extra: 4000,
//       double: 7000,
//     },
//     {
//       type: "STANDARD",
//       forPizzaSize: "LARGE",
//       name: "Sausage Cube",
//       light: 0,
//       standard: 0,
//       extra: 4000,
//       double: 7000,
//     },
//     {
//       type: "STANDARD",
//       forPizzaSize: "LARGE",
//       name: "Sliced Sausage",
//       light: 0,
//       standard: 0,
//       extra: 4000,
//       double: 7000,
//     },
//     {
//       type: "STANDARD",
//       forPizzaSize: "LARGE",
//       name: "Mangal Sujuk",
//       light: 0,
//       standard: 0,
//       extra: 4000,
//       double: 7000,
//     },
//     {
//       type: "STANDARD",
//       forPizzaSize: "LARGE",
//       name: "Beef Ham",
//       light: 0,
//       standard: 0,
//       extra: 4000,
//       double: 7000,
//     },
//     {
//       type: "STANDARD",
//       forPizzaSize: "LARGE",
//       name: "Meat Ball",
//       light: 0,
//       standard: 0,
//       extra: 5000,
//       double: 8000,
//     },
//     {
//       type: "STANDARD",
//       forPizzaSize: "LARGE",
//       name: "Smoked Chicken Breast",
//       light: 0,
//       standard: 0,
//       extra: 4000,
//       double: 7000,
//     },
//     {
//       type: "STANDARD",
//       forPizzaSize: "LARGE",
//       name: "Beef Doner Meat",
//       light: 0,
//       standard: 0,
//       extra: 4000,
//       double: 7000,
//     },
//     {
//       type: "STANDARD",
//       forPizzaSize: "LARGE",
//       name: "Tuna Fish",
//       light: 0,
//       standard: 0,
//       extra: 4000,
//       double: 7000,
//     },
//     {
//       type: "STANDARD",
//       forPizzaSize: "LARGE",
//       name: "Chicken Slices",
//       light: 0,
//       standard: 0,
//       extra: 4000,
//       double: 7000,
//     },
//     {
//       type: "STANDARD",
//       forPizzaSize: "LARGE",
//       name: "Mayonnaise",
//       light: 0,
//       standard: 0,
//       extra: 3000,
//       double: 4000,
//     },
//     {
//       type: "STANDARD",
//       forPizzaSize: "LARGE",
//       name: "BBQ Sauce",
//       light: 0,
//       standard: 0,
//       extra: 3000,
//       double: 4000,
//     },
//     {
//       type: "STANDARD",
//       forPizzaSize: "LARGE",
//       name: "Roasted Red Pepper",
//       light: 0,
//       standard: 0,
//       extra: 3000,
//       double: 4000,
//     },
//     {
//       type: "STANDARD",
//       forPizzaSize: "LARGE",
//       name: "Red Pepper Flakes",
//       light: 0,
//       standard: 0,
//       extra: 0,
//       double: 0,
//     },
//     {
//       type: "STANDARD",
//       forPizzaSize: "LARGE",
//       name: "Green Peppers",
//       light: 0,
//       standard: 0,
//       extra: 3000,
//       double: 4000,
//     },
//     {
//       type: "STANDARD",
//       forPizzaSize: "LARGE",
//       name: "Black Olives",
//       light: 0,
//       standard: 0,
//       extra: 3000,
//       double: 4000,
//     },
//     {
//       type: "STANDARD",
//       forPizzaSize: "LARGE",
//       name: "Sweetcorn",
//       light: 0,
//       standard: 0,
//       extra: 3000,
//       double: 4000,
//     },
//     {
//       type: "STANDARD",
//       forPizzaSize: "LARGE",
//       name: "Tomatoes",
//       light: 0,
//       standard: 0,
//       extra: 3000,
//       double: 4000,
//     },
//     {
//       type: "STANDARD",
//       forPizzaSize: "LARGE",
//       name: "Pineapple",
//       light: 0,
//       standard: 0,
//       extra: 3000,
//       double: 4000,
//     },
//     {
//       type: "STANDARD",
//       forPizzaSize: "LARGE",
//       name: "Onions",
//       light: 0,
//       standard: 0,
//       extra: 3000,
//       double: 4000,
//     },
//     {
//       type: "STANDARD",
//       forPizzaSize: "LARGE",
//       name: "Sesame",
//       light: 0,
//       standard: 0,
//       extra: 0,
//       double: 0,
//     },
//     {
//       type: "STANDARD",
//       forPizzaSize: "LARGE",
//       name: "Oregano",
//       light: 0,
//       standard: 0,
//       extra: 0,
//       double: 0,
//     },
//     {
//       type: "STANDARD",
//       forPizzaSize: "LARGE",
//       name: "Mushrooms",
//       light: 0,
//       standard: 0,
//       extra: 3000,
//       double: 4000,
//     },
//     {
//       type: "STANDARD",
//       forPizzaSize: "LARGE",
//       name: "Jalapeno Peppers",
//       light: 0,
//       standard: 0,
//       extra: 3000,
//       double: 4000,
//     },
//     {
//       type: "STANDARD",
//       forPizzaSize: "LARGE",
//       name: "Pizza Sauce",
//       light: 0,
//       standard: 0,
//       extra: 3000,
//       double: 4000,
//     },
//     {
//       type: "EXTRA",
//       forPizzaSize: "LARGE",
//       name: "Cheddar Cheese",
//       light: 4000,
//       standard: 5000,
//       extra: 8000,
//       double: 12000,
//     },
//     {
//       type: "EXTRA",
//       forPizzaSize: "LARGE",
//       name: "Parmesan Cheese",
//       light: 4000,
//       standard: 5000,
//       extra: 8000,
//       double: 12000,
//     },
//     {
//       type: "EXTRA",
//       forPizzaSize: "LARGE",
//       name: "Feta Cheese",
//       light: 4000,
//       standard: 5000,
//       extra: 8000,
//       double: 12000,
//     },
//     {
//       type: "EXTRA",
//       forPizzaSize: "LARGE",
//       name: "Mozarella Cheese",
//       light: 4000,
//       standard: 5000,
//       extra: 8000,
//       double: 12000,
//     },
//     {
//       type: "EXTRA",
//       forPizzaSize: "LARGE",
//       name: "Sausage",
//       light: 4000,
//       standard: 5000,
//       extra: 8000,
//       double: 12000,
//     },
//     {
//       type: "EXTRA",
//       forPizzaSize: "LARGE",
//       name: "Sausage Cube",
//       light: 4000,
//       standard: 5000,
//       extra: 8000,
//       double: 12000,
//     },
//     {
//       type: "EXTRA",
//       forPizzaSize: "LARGE",
//       name: "Sliced Sausage",
//       light: 4000,
//       standard: 5000,
//       extra: 8000,
//       double: 12000,
//     },
//     {
//       type: "EXTRA",
//       forPizzaSize: "LARGE",
//       name: "Mangal Sujuk",
//       light: 4000,
//       standard: 5000,
//       extra: 8000,
//       double: 12000,
//     },
//     {
//       type: "EXTRA",
//       forPizzaSize: "LARGE",
//       name: "Beef Ham",
//       light: 4000,
//       standard: 5000,
//       extra: 8000,
//       double: 12000,
//     },
//     {
//       type: "EXTRA",
//       forPizzaSize: "LARGE",
//       name: "Meat Ball",
//       light: 5000,
//       standard: 7000,
//       extra: 11000,
//       double: 14000,
//     },
//     {
//       type: "EXTRA",
//       forPizzaSize: "LARGE",
//       name: "Smoked Chicken Breast",
//       light: 4000,
//       standard: 5000,
//       extra: 8000,
//       double: 12000,
//     },
//     {
//       type: "EXTRA",
//       forPizzaSize: "LARGE",
//       name: "Beef Doner Meat",
//       light: 4000,
//       standard: 5000,
//       extra: 8000,
//       double: 12000,
//     },
//     {
//       type: "EXTRA",
//       forPizzaSize: "LARGE",
//       name: "Tuna Fish",
//       light: 4000,
//       standard: 5000,
//       extra: 8000,
//       double: 12000,
//     },
//     {
//       type: "EXTRA",
//       forPizzaSize: "LARGE",
//       name: "Chicken Slices",
//       light: 4000,
//       standard: 5000,
//       extra: 8000,
//       double: 12000,
//     },
//     {
//       type: "EXTRA",
//       forPizzaSize: "LARGE",
//       name: "Mayonnaise",
//       light: 3000,
//       standard: 4000,
//       extra: 5000,
//       double: 6000,
//     },
//     {
//       type: "EXTRA",
//       forPizzaSize: "LARGE",
//       name: "BBQ Sauce",
//       light: 3000,
//       standard: 4000,
//       extra: 5000,
//       double: 6000,
//     },
//     {
//       type: "EXTRA",
//       forPizzaSize: "LARGE",
//       name: "Roasted Red Pepper",
//       light: 3000,
//       standard: 4000,
//       extra: 5000,
//       double: 6000,
//     },
//     {
//       type: "EXTRA",
//       forPizzaSize: "LARGE",
//       name: "Red Pepper Flakes",
//       light: 0,
//       standard: 0,
//       extra: 0,
//       double: 0,
//     },
//     {
//       type: "EXTRA",
//       forPizzaSize: "LARGE",
//       name: "Green Peppers",
//       light: 3000,
//       standard: 4000,
//       extra: 5000,
//       double: 6000,
//     },
//     {
//       type: "EXTRA",
//       forPizzaSize: "LARGE",
//       name: "Black Olives",
//       light: 3000,
//       standard: 4000,
//       extra: 5000,
//       double: 6000,
//     },
//     {
//       type: "EXTRA",
//       forPizzaSize: "LARGE",
//       name: "Sweetcorn",
//       light: 3000,
//       standard: 4000,
//       extra: 5000,
//       double: 6000,
//     },
//     {
//       type: "EXTRA",
//       forPizzaSize: "LARGE",
//       name: "Tomatoes",
//       light: 3000,
//       standard: 4000,
//       extra: 5000,
//       double: 6000,
//     },
//     {
//       type: "EXTRA",
//       forPizzaSize: "LARGE",
//       name: "Pineapple",
//       light: 3000,
//       standard: 4000,
//       extra: 5000,
//       double: 6000,
//     },
//     {
//       type: "EXTRA",
//       forPizzaSize: "LARGE",
//       name: "Onions",
//       light: 3000,
//       standard: 4000,
//       extra: 5000,
//       double: 6000,
//     },
//     {
//       type: "EXTRA",
//       forPizzaSize: "LARGE",
//       name: "Sesame",
//       light: 0,
//       standard: 0,
//       extra: 0,
//       double: 0,
//     },
//     {
//       type: "EXTRA",
//       forPizzaSize: "LARGE",
//       name: "Oregano",
//       light: 0,
//       standard: 0,
//       extra: 0,
//       double: 0,
//     },
//     {
//       type: "EXTRA",
//       forPizzaSize: "LARGE",
//       name: "Mushrooms",
//       light: 3000,
//       standard: 4000,
//       extra: 5000,
//       double: 6000,
//     },
//     {
//       type: "EXTRA",
//       forPizzaSize: "LARGE",
//       name: "Jalapeno Peppers",
//       light: 3000,
//       standard: 4000,
//       extra: 5000,
//       double: 6000,
//     },
//     {
//       type: "EXTRA",
//       forPizzaSize: "LARGE",
//       name: "Pizza Sauce",
//       light: 3000,
//       standard: 3000,
//       extra: 4000,
//       double: 15000,
//     },
//   ];
//   for (const topping of toppings) {
//     await createTopping(topping);
//   }
// });

const fetchAllToppings = async () => {
  try {
    startLoading();
    toppings.value = [];
    const toppingsResponse = await getAllToppings();
    toppings.value = toppingsResponse.data.data;
    stopLoading();
  } catch (err) {
    stopLoading();
    console.log("Fetch topping error:", err);
  }
};
fetchAllToppings();

const handleUpdateSearchData = (val: string) => {
  searchData.value = val;
};

const { csv, generateCSV, generatePDF, generateExcel } = useHeaderAction();

const handleDownloadCSVClick = () => {
  generateCSV<ITopping>(toppings.value);
};

const handleDownloadExcelClick = () => {
  generateExcel(toppingsPdfTable.value, "toppings", "toppings");
};
const handleDownloadPdfClick = () => {
  generatePDF("toppings-table", toppingsPdfTable.value);
};
const getFilteredToppings = (searchData: string) => {
  return toppings.value.filter((topping: ITopping) =>
    !searchData.length
      ? true
      : topping.name.toLowerCase().includes(searchData.toLowerCase())
  );
};

const handleDeleteToppingClick = async (id: number) => {
  await deleteTopping(id);
  $toast.success("Topping is deleted successfully!");
  fetchAllToppings();
};
</script>
<style scoped>
.toppings__header {
  text-align: center;
  margin-bottom: 35px;
}
.toppings__title {
  font-size: clamp(1.4rem, calc(1.5vw + 1rem), 2rem);
  font-weight: 600;
}
.toppings__table-box {
  overflow-x: auto;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
.toppings__table-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px 20px;
  border-top-left-radius: inherit;
  border-top-right-radius: inherit;
  background: #f2f2f2;
}
.toppings__search-box {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 12px;
  border-radius: 5px;
  background: #fff;
}
.toppings__search-input {
  border: 0;
  outline: 0;
}
.toppings__table-icon {
  font-size: 22px;
}
.toppings__table-header-right {
  display: flex;
  align-items: center;
  gap: 15px;
}
.toppings__table-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #fc8019;
  color: #fff;
}
.toppings__table-placeholder-box {
  text-align: center;
  padding: 25px 0;
}
.toppings__table-placeholder-title {
  font-size: clamp(1.2rem, calc(1.5vw + 1rem), 1.5rem);
}
.toppings-table {
  width: 250%;
  table-layout: fixed;
  font-size: 14px;
}

.toppings-table__head,
.toppings-table__cell {
  padding: 25px;
  text-align: left;
}
.toppings-table__cell {
  padding: 10px 25px;
  vertical-align: middle;
  border-top: 1px solid #e0e0e0;
  color: #444;
}
.toppings-table__sort-btn {
  color: #777;
}

.toppings-table__btns-box {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
}
.toppings-table__edit-topping-btn {
  color: #fc8019;
}
.toppings-table__delete-topping-btn {
  color: red;
}
@media (min-width: 990px) {
  .toppings-table {
    width: 200%;
  }
}
@media (min-width: 1350px) {
  .toppings__table-box {
    overflow-x: hidden;
  }
  .toppings-table {
    width: 100%;
    table-layout: normal;
  }
}
</style>