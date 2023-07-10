<template>
  <section class="dips">
    <header class="dips__header">
      <h1 class="dips__title">All Dips</h1>
    </header>
  </section>
  <PizzaLoader v-if="isLoadingDip" />
  <div class="dips__table-box">
    <HeaderAction
      :routeTo="routeTo"
      :dataList="dips"
      :csv="csv"
      :dataType="'Dips'"
      :downloadCSVFilename="downloadCSVFilename"
      :fetchAllData="fetchAllDips"
      :handleDownloadCSVClick="handleDownloadCSVClick"
      :handleDownloadExcelClick="handleDownloadExcelClick"
      :handleDownloadPdfClick="handleDownloadPdfClick"
      @update-search-data="handleUpdateSearchData"
    />
    <div v-if="!dips.length" class="dips__table-placeholder-box">
      <h2 class="dips__table-placeholder-title">
        No Dips have been created yet!
      </h2>
    </div>
    <table v-else class="dips-table">
      <thead>
        <tr>
          <th class="dips-table__head" scope="col">Id</th>
          <th class="dips-table__head" scope="col">Photo</th>
          <th class="dips-table__head" scope="col">Type</th>
          <th class="dips-table__head" scope="col">Price</th>
          <th class="dips-table__head" scope="col">Vegan</th>
          <th class="dips-table__head" scope="col">Sold Amount</th>
          <th class="dips-table__head" scope="col">Status</th>
          <th class="dips-table__head" scope="col">Created</th>
          <th class="dips-table__head" scope="col">Actions</th>
        </tr>
      </thead>
      <tbody>
        <DipTableRow
          v-for="(dip, idx) in getFilteredDips(searchData)"
          :key="dip.id"
          :dip="dip"
          :isLastRow="idx === dips.length - 1 || idx === dips.length - 2"
          :activeRowId="activeRowId"
          :handleDeleteDipClick="handleDeleteDipClick"
          :toggleDipStatus="toggleDipStatus"
          :toggleStatusDropdown="toggleStatusDropdown"
          :getActiveRowId="getActiveRowId"
          :isStatusDropdownOpen="isStatusDropdownOpen"
        />
      </tbody>
    </table>
  </div>
</template>
<script setup lang="ts">
import { useLoading } from "~/composables/useLoading";
import { getAllDips, deleteDip, changeDipStatus } from "~/api/menu";
import { IDip } from "~/types/menu";

const dips = ref<IDip[]>([]);
const isLoading = ref(false);
const searchData = ref("");
const dipsPdfTable = ref<HTMLElement | undefined>(undefined);
const routeTo = "/menu/add-dip";
const downloadCSVFilename = "all-dips.csv";
const { $toast } = useNuxtApp();

const { csv, generateCSV, generatePDF, generateExcel } = useHeaderAction();
const { isLoading: isLoadingDip, startLoading, stopLoading } = useLoading();

const handleUpdateSearchData = (val: string) => {
  searchData.value = val;
};

const {
  isStatusDropdownOpen,
  activeRowId,
  getActiveRowId,
  toggleStatusDropdown,
} = useStatusDropdown();

const handleDownloadCSVClick = () => {
  generateCSV<IDip>(dips.value);
};

const toggleDipStatus = async (dipId: number, status: string) => {
  try {
    await changeDipStatus(dipId, status);
    dips.value = dips.value.map((dip: IDip) =>
      dip.id === dipId ? { ...dip, status } : dip
    );

    $toast.success(`Dip status is changed to ${status} successfully!`);
  } catch (err) {
    console.log(err);
  }
};

const handleDownloadExcelClick = () => {
  generateExcel(dipsPdfTable.value, "dips", "dips");
};
const handleDownloadPdfClick = () => {
  generatePDF("dips-table", dipsPdfTable.value);
};

const fetchAllDips = async () => {
  startLoading();
  dips.value = [];
  isLoading.value = true;
  const dipsResp = await getAllDips();
  dips.value = [...dipsResp.data.data];
  isLoading.value = false;
  stopLoading();
};
fetchAllDips();

const getFilteredDips = (searchData: string) => {
  return dips.value.filter((dip: IDip) =>
    !searchData.length
      ? true
      : dip.type.toLowerCase().includes(searchData.toLowerCase())
  );
};

const handleDeleteDipClick = async (id: number) => {
  await deleteDip(id);
  $toast.success("Dip is deleted successfully!");
  fetchAllDips();
};
</script>
<style scoped>
.dips__header {
  text-align: center;
  margin-bottom: 35px;
}
.dips__title {
  font-size: clamp(1.4rem, calc(1.5vw + 1rem), 2rem);
  font-weight: 600;
}
.dips__table-placeholder-box {
  padding: 25px 0;
  text-align: center;
}
.dips__table-placeholder-title {
  font-size: clamp(1.2rem, calc(1.5vw + 1rem), 1.5rem);
}
.dips__table-box {
  overflow-y: hidden;
  overflow-x: auto;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.dips-table {
  width: 250%;
  table-layout: fixed;
  font-size: 14px;
}
.dips-table__head,
.dips-table__cell {
  padding: 25px;
  text-align: left;
}
@media (min-width: 992px) {
  .dips-table {
    width: 200%;
  }
}
@media (min-width: 1350px) {
  .dips__table-box {
    overflow: hidden;
  }
  .dips-table {
    width: 100%;
    table-layout: normal;
  }
}
</style>