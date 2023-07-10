<template>
  <section class="menu-items">
    <header class="menu-items__header">
      <h1 class="menu-items__title">All Menu Items</h1>
    </header>
    <PizzaLoader v-if="isLoadingMenuItem" />
    <div class="menu-items__table-box">
      <HeaderAction
        :routeTo="routeTo"
        :dataList="menuItems"
        :csv="csv"
        :dataType="'Menu Items'"
        :downloadCSVFilename="downloadCSVFilename"
        :fetchAllData="fetchAllMenus"
        :handleDownloadCSVClick="handleDownloadCSVClick"
        :handleDownloadExcelClick="handleDownloadExcelClick"
        :handleDownloadPdfClick="handleDownloadPdfClick"
        @update-search-data="handleUpdateSearchData"
      />
      <div v-if="!menuItems.length" class="menu-items__table-placeholder-box">
        <h2 class="menu-items__table-placeholder-title">
          No Menu Items have been created yet!
        </h2>
      </div>
      <table v-else class="menu-items-table" ref="menu-itemsPdfTable">
        <thead>
          <tr>
            <th scope="col" class="menu-items-table__head">Id</th>
            <th scope="col" class="menu-items-table__head">Name</th>
            <th scope="col" class="menu-items-table__head">Vegan</th>
            <th scope="col" class="menu-items-table__head">Sold Amount</th>
            <th scope="col" class="menu-items-table__head">Status</th>
            <th scope="col" class="menu-items-table__head">Created</th>
            <th scope="col" class="menu-items-table__head">Actions</th>
          </tr>
        </thead>
        <tbody>
          <MenuItemTableRow
            v-for="(menuItem, idx) in getFilteredMenuItems(searchData)"
            :key="menuItem.id"
            :isLastRow="
              idx === menuItems.length - 1 || idx === menuItems.length - 2
            "
            :menuItem="menuItem"
            :handleDeleteMenuItemClick="handleDeleteMenuItemClick"
            :toggleMenuItemStatus="toggleMenuItemStatus"
            :isStatusDropdownOpen="isStatusDropdownOpen"
            :activeRowId="activeRowId"
            :getActiveRowId="getActiveRowId"
            :toggleStatusDropdown="toggleStatusDropdown"
          />
        </tbody>
      </table>
    </div>
  </section>
</template>
<script setup lang="ts">
import { useLoading } from "~/composables/useLoading";
import {
  getAllMenuItems,
  deleteMenuItem,
  changeMenuItemStatus,
} from "~/api/menu";
import { IMenuItem, Status } from "~/types/menu";

const { $toast } = useNuxtApp();
const menuItems = ref<IMenuItem[]>([]);
const isLoading = ref(false);
const searchData = ref("");
const menuItemsPdfTable = ref<HTMLElement | undefined>(undefined);
const routeTo = "/menu/add-menu-item";
const downloadCSVFilename = "all menu-items.csv";

const {
  isLoading: isLoadingMenuItem,
  startLoading,
  stopLoading,
} = useLoading();
const {
  isStatusDropdownOpen,
  activeRowId,
  getActiveRowId,
  toggleStatusDropdown,
} = useStatusDropdown();

const handleUpdateSearchData = (val: string) => {
  searchData.value = val;
};

const { csv, generateCSV, generatePDF, generateExcel } = useHeaderAction();

const handleDownloadCSVClick = () => {
  generateCSV<IMenuItem>(menuItems.value);
};

const handleDownloadExcelClick = () => {
  generateExcel(menuItemsPdfTable.value, "menu-items", "menu-items");
};
const handleDownloadPdfClick = () => {
  generatePDF("menu-items-table", menuItemsPdfTable.value);
};

const fetchAllMenus = async () => {
  startLoading();
  menuItems.value = [];
  isLoading.value = true;
  const menusResp = await getAllMenuItems();
  menuItems.value = [...menusResp.data.data];
  isLoading.value = false;
  stopLoading();
};
fetchAllMenus();

const toggleMenuItemStatus = async (menuItemId: number, status: Status) => {
  try {
    await changeMenuItemStatus(menuItemId, status);
    menuItems.value = menuItems.value.map((menuItem: IMenuItem) =>
      menuItem.id === menuItemId ? { ...menuItem, status } : menuItem
    );
    $toast.success(`Menu item is changed to ${status} status successfully!`);
  } catch (err) {
    console.log("Error", err);
  }
};

const getFilteredMenuItems = (searchData: string) => {
  return menuItems.value.filter((menuItem: IMenuItem) =>
    !searchData.length
      ? true
      : menuItem.name.toLowerCase().includes(searchData.toLowerCase())
  );
};

const handleDeleteMenuItemClick = async (id: number) => {
  await deleteMenuItem(id);
  $toast.success("Menu item is deleted successfully!");
  fetchAllMenus();
};
</script>
<style scoped>
.menu-items__header {
  text-align: center;
  margin-bottom: 35px;
}
.menu-items__title {
  font-size: clamp(1.4rem, calc(1.5vw + 1rem), 2rem);
  font-weight: 600;
}
.menu-items__table-box {
  overflow-y: hidden;
  overflow-x: auto;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
.menu-items__table-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px 20px;
  border-top-left-radius: inherit;
  border-top-right-radius: inherit;
  background: #f2f2f2;
}
.menu-items__search-box {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 12px;
  border-radius: 5px;
  background: #fff;
}
.menu-items__search-input {
  border: 0;
  outline: 0;
}
.menu-items__table-icon {
  font-size: 22px;
}
.menu-items__table-header-right {
  display: flex;
  align-items: center;
  gap: 15px;
}
.menu-items__table-placeholder-box {
  padding: 25px 0;
  text-align: center;
}
.menu-items__table-placeholder-title {
  font-size: clamp(1.2rem, calc(1.5vw + 1rem), 1.5rem);
}
.menu-items__table-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #fc8019;
  color: #fff;
}
.menu-items-table {
  width: 250%;
  table-layout: fixed;
  font-size: 15px;
}
.menu-items-table__head {
  padding: 25px;
  text-align: left;
}

@media (min-width: 992px) {
  .menu-items-table {
    width: 200%;
  }
}
@media (min-width: 1350px) {
  .menu-items__table-box {
    overflow-x: hidden;
  }
  .menu-items-table {
    width: 100%;
    table-layout: normal;
  }
}
</style>