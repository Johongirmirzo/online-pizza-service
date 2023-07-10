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
            <th scope="col" class="toppings-table__head">
              Id
              <!-- <button class="toppings-table__sort-btn">
                <Icon
                  class="toppings-table__sort-icon"
                  name="ph:arrow-up-bold"
                />
              </button>
              <button class="toppings-table__sort-btn">
                <Icon
                  class="toppings-table__sort-icon"
                  name="ph:arrow-down-bold"
                />
              </button> -->
            </th>
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