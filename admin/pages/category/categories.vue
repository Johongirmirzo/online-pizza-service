<template>
  <section class="categories">
    <header class="categories__header">
      <h1 class="categories__title">All Categories</h1>
    </header>
    <PizzaLoader v-if="isLoading" />
    <DeleteModal
      :isModalOpen="isModalOpen"
      :currentActiveScreen="currentActiveScreen"
      :toggleModal="toggleModal"
      :moveToNextScreen="moveToNextScreen"
      :deleteModalData="deleteModalData"
      :deleteData="handleDeleteCategoryClick"
    />
    <div class="categories__table-box">
      <HeaderAction
        :routeTo="routeTo"
        :dataList="categories"
        :csv="csv"
        :dataType="'Category'"
        :downloadCSVFilename="downloadCSVFilename"
        :fetchAllData="fetchAllCategories"
        :handleDownloadCSVClick="handleDownloadCSVClick"
        :handleDownloadExcelClick="handleDownloadExcelClick"
        :handleDownloadPdfClick="handleDownloadPdfClick"
        @update-search-data="handleUpdateSearchData"
      />
      <div v-if="!categories.length" class="categories__table-placeholder-box">
        <h2 class="categories__table-placeholder-title">
          No Categories have been created yet!
        </h2>
      </div>
      <table v-else class="categories-table" ref="categoriesPdfTable">
        <thead>
          <tr class="categories-table__row categories-table__head-row">
            <th scope="col" class="categories-table__head">Id</th>
            <th scope="col" class="categories-table__head">Image</th>
            <th scope="col" class="categories-table__head">Name</th>
            <th scope="col" class="categories-table__head">Description</th>
            <th scope="col" class="categories-table__head">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="category in getFilteredUsers(searchData)"
            :key="category.id"
            class="categories-table__cell-row"
          >
            <td class="categories-table__cell">
              <p class="categories-table__text">
                {{ category.id }}
              </p>
            </td>
            <td class="categories-table__cell">
              <img
                :src="category.photo"
                :alt="category.name"
                class="categories-table__img"
              />
            </td>
            <td class="categories-table__cell">
              <p class="categories-table__text">
                {{ category.name }}
              </p>
            </td>
            <td class="categories-table__cell">
              <p class="categories-table__text">
                {{ category.description }}
              </p>
            </td>
            <td class="categories-table__cell">
              <div class="categories-table__btns-box">
                <NuxtLink
                  title="Edit category"
                  :to="`category/edit-category/${category.id}`"
                  class="categories-table__btn categories-table__edit-btn"
                >
                  <Icon class="categories-table__icon" name="lucide:edit" />
                </NuxtLink>
                <button
                  @click="getCategory(category)"
                  title="Delete category"
                  class="categories-table__btn categories-table__delete-btn"
                >
                  <Icon class="categories-table__icon" name="jam:trash" />
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
import { ICategory } from "~/types/category";
import { getAllCategories, deleteCategory } from "~/api/category";

const { $toast } = useNuxtApp();
const categories = ref<ICategory[]>([]);
const searchData = ref("");
const deleteModalData = ref({});
const categoriesPdfTable = ref<HTMLElement | undefined>(undefined);
const routeTo = ref("/category/add-category");
const downloadCSVFilename = "all-categories.csv";
const isDeletingData = ref(false);

const { isModalOpen, currentActiveScreen, toggleModal, moveToNextScreen } =
  useModal();
const { isLoading, startLoading, stopLoading } = useLoading();

const fetchAllCategories = async () => {
  startLoading();
  categories.value = [];
  const categoryResponse = await getAllCategories();
  categories.value = [...categoryResponse.data.data];
  stopLoading();
};
fetchAllCategories();

const getFilteredUsers = (searchData: string) => {
  return categories.value.filter((user: ICategory) =>
    !searchData.length
      ? true
      : user.name.toLowerCase().includes(searchData.toLowerCase())
  );
};

const handleUpdateSearchData = (val: string) => {
  searchData.value = val;
};

const { csv, generateCSV, generatePDF, generateExcel } = useHeaderAction();

const handleDownloadCSVClick = () => {
  generateCSV<ICategory>(categories.value);
};

const handleDownloadExcelClick = () => {
  generateExcel(categoriesPdfTable.value, "categories", "categories");
};
const handleDownloadPdfClick = () => {
  generatePDF("categories-table", categoriesPdfTable.value);
};

const getCategory = (category: ICategory) => {
  deleteModalData.value = {
    id: category.id,
    type: "Category",
    data: category.name,
  };
  toggleModal();
};

const handleDeleteCategoryClick = async (id: number) => {
  isDeletingData.value = true;
  await deleteCategory(id);
  fetchAllCategories();
  toggleModal();
  $toast.success("Category is deleted successfully!");
  isDeletingData.value = false;
};
</script>
<style scoped>
.categories__header {
  text-align: center;
  margin-bottom: 35px;
}
.categories__title {
  font-size: clamp(1.4rem, calc(1.5vw + 1rem), 2rem);
  font-weight: 600;
}
.categories__table-box {
  overflow-x: auto;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.categories-table__icon {
  font-size: 19px;
}
.categories__table-header-right {
  display: flex;
  align-items: center;
  gap: 15px;
}
.categories__table-placeholder-box {
  padding: 25px 0;
  text-align: center;
}
.categories__table-placeholder-title {
  font-size: clamp(1.2rem, calc(1.5vw + 1rem), 1.5rem);
}

.categories-table {
  width: 150%;
  table-layout: fixed;
  font-size: 14px;
}
.categories-table__head,
.categories-table__cell {
  padding: 25px;
  text-align: left;
}
.categories-table__cell {
  padding: 5px 25px;
  vertical-align: middle;
  border-top: 1px solid #e0e0e0;
  color: #444;
}
.categories-table__img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
}
.categories-table__btns-box {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
}
.categories-table__edit-btn {
  color: #fc8019;
}
.categories-table__delete-btn {
  color: red;
}

@media (min-width: 1350px) {
  .categories__table-box {
    overflow-x: hidden;
  }
  .categories-table {
    width: 100%;
    table-layout: normal;
  }
}
</style>