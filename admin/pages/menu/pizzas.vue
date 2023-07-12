<template>
  <section class="pizzas">
    <header class="pizzas__header">
      <h1 class="pizzas__title">All Pizzas</h1>
    </header>
    <PizzaLoader v-if="isLoading" />
    <DeleteItemModal
      v-if="deleteItemId > -1"
      :isModalOpen="isModalOpen"
      :closeModal="toggleModal"
      :handleDeleteClick="handleDeletePizzaClick"
      deleteItem="Pizza"
    />
    <div class="pizzas__table-box">
      <HeaderAction
        :routeTo="routeTo"
        :dataList="pizzas"
        :csv="csv"
        :dataType="'Pizzas'"
        :downloadCSVFilename="downloadCSVFilename"
        :fetchAllData="fetchAllPizzas"
        :handleDownloadCSVClick="handleDownloadCSVClick"
        :handleDownloadExcelClick="handleDownloadExcelClick"
        :handleDownloadPdfClick="handleDownloadPdfClick"
        @update-search-data="handleUpdateSearchData"
      />
      <div v-if="!pizzas.length" class="pizzas__table-placeholder-box">
        <h2 class="pizzas__table-placeholder-title">
          No Pizzas have been created yet!
        </h2>
      </div>
      <table v-else class="pizzas-table">
        <thead>
          <tr>
            <th scope="col" class="pizzas-table__head">Id</th>
            <th scope="col" class="pizzas-table__head">Name</th>
            <th scope="col" class="pizzas-table__head">Vegan</th>
            <th scope="col" class="pizzas-table__head">Sold Amount</th>
            <th scope="col" class="pizzas-table__head">Status</th>
            <th scope="col" class="pizzas-table__head">Spice Level</th>
            <th scope="col" class="pizzas-table__head">Created</th>
            <th scope="col" class="pizzas-table__head">Actions</th>
          </tr>
        </thead>
        <tbody>
          <PizzaTableRow
            v-for="(pizza, idx) in getFilteredPIzzas(searchData)"
            :key="pizza.id"
            :pizza="pizza"
            :isLastRow="idx === pizzas.length - 1 || idx === pizzas.length - 2"
            :togglePizzaStatus="togglePizzaStatus"
            :isStatusDropdownOpen="isStatusDropdownOpen"
            :activeRowId="activeRowId"
            :getActiveRowId="getActiveRowId"
            :toggleStatusDropdown="toggleStatusDropdown"
            :isDeletingPizza="isDeletingPizza"
            :getDeleteItemId="getDeleteItemId"
          />
        </tbody>
      </table>
    </div>
  </section>
</template>
<script setup lang="ts">
import { useLoading } from "~/composables/useLoading";
import { IPizza, Status } from "~/types/pizza";
import { deletePizza, getAllPizzas, changePizzaStatus } from "~/api/pizza";

const pizzas = ref<IPizza[]>([]);
const deleteItemId = ref(-1);
const isDeletingPizza = ref(false);
const searchData = ref("");
const pizzasPdfTable = ref<HTMLElement | undefined>(undefined);
const { $toast } = useNuxtApp();
const routeTo = "/menu/add-pizza";
const downloadCSVFilename = "all-pizzas.csv";

const { csv, generateCSV, generatePDF, generateExcel } = useHeaderAction();
const {
  isStatusDropdownOpen,
  activeRowId,
  getActiveRowId,
  toggleStatusDropdown,
} = useStatusDropdown();
const { isLoading, startLoading, stopLoading } = useLoading();
const { isModalOpen, toggleModal } = useModal();

const fetchAllPizzas = async () => {
  try {
    startLoading();
    const pizzasResponse = await getAllPizzas();
    pizzas.value = pizzasResponse.data.data;
    console.log(pizzasResponse.data.data, 1);
    stopLoading();
  } catch (err) {
    stopLoading();
    console.log(err);
  }
};
fetchAllPizzas();

const getDeleteItemId = (toppingId: number) => {
  deleteItemId.value = toppingId;
  toggleModal();
};

const handleDeletePizzaClick = async () => {
  isDeletingPizza.value = true;
  await deletePizza(deleteItemId.value);
  $toast.success("Pizza is deleted successfully!");
  fetchAllPizzas();
  isDeletingPizza.value = false;
};

const handleUpdateSearchData = (val: string) => {
  searchData.value = val;
};

const handleDownloadCSVClick = () => {
  generateCSV<IPizza>(pizzas.value);
};

const handleDownloadExcelClick = () => {
  generateExcel(pizzasPdfTable.value, "pizzas", "pizzas");
};
const handleDownloadPdfClick = () => {
  generatePDF("pizzas-table", pizzasPdfTable.value);
};

const togglePizzaStatus = async (pizzaId: number, status: Status) => {
  try {
    await changePizzaStatus(pizzaId, status);
    pizzas.value = pizzas.value.map((pizza: IPizza) =>
      pizza.id === pizzaId ? { ...pizza, status } : pizza
    );
    $toast.success(`Pizza is changed to ${status} status successfully!`);
  } catch (err) {
    console.log("Error", err);
  }
};

const getFilteredPIzzas = (searchData: string) => {
  return pizzas.value.filter((pizza: IPizza) =>
    !searchData.length
      ? true
      : pizza.name.toLowerCase().includes(searchData.toLowerCase())
  );
};
</script>
<style scoped>
.pizzas__header {
  text-align: center;
  margin-bottom: 35px;
}
.pizzas__title {
  font-size: clamp(1.4rem, calc(1.5vw + 1rem), 2rem);
  font-weight: 600;
}
.pizzas__table-box {
  overflow-y: hidden;
  overflow-x: auto;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
.pizzas__table-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px 20px;
  border-top-left-radius: inherit;
  border-top-right-radius: inherit;
  background: #f2f2f2;
}
.pizzas__search-box {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 12px;
  border-radius: 5px;
  background: #fff;
}
.pizzas__table-placeholder-box {
  padding: 25px 0;
  text-align: center;
}
.pizzas__table-placeholder-title {
  font-size: clamp(1.2rem, calc(1.5vw + 1rem), 1.5rem);
}
.pizzas__search-input {
  border: 0;
  outline: 0;
}
.pizzas__table-icon {
  font-size: 22px;
}
.pizzas__table-header-right {
  display: flex;
  align-items: center;
  gap: 15px;
}
.pizzas__table-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #fc8019;
  color: #fff;
}
.pizzas-table {
  width: 250%;
  table-layout: fixed;
  font-size: 15px;
}
.pizzas-table__head,
.pizzas-table__cell {
  padding: 25px;
  text-align: left;
}
.pizzas-table__cell {
  padding: 5px 25px;
  vertical-align: middle;
  border-top: 1px solid #e0e0e0;
  color: #444;
}
.pizzas-table__img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
}
.pizzas-table__btns-box {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
}
.pizzas-table__edit-pizza-btn > *,
.pizzas-table__delete-pizza-btn > * {
  font-size: 19px;
}
.pizzas-table__edit-pizza-btn {
  color: #fc8019;
}
.pizzas-table__delete-pizza-btn {
  color: red;
}

@media (min-width: 990px) {
  .pizzas-table {
    width: 200%;
  }
}

@media (min-width: 1350px) {
  .pizzas__table-box {
    overflow-x: hidden;
  }
  .pizzas-table {
    width: 100%;
    table-layout: normal;
  }
}
</style>