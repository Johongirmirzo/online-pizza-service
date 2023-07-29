<template>
  <section class="customers">
    <header class="customers__header">
      <h1 class="customers__title">All customers</h1>
    </header>
    <DeleteModal
      :isModalOpen="isModalOpen"
      :currentActiveScreen="currentActiveScreen"
      :toggleModal="toggleModal"
      :moveToNextScreen="moveToNextScreen"
      :deleteModalData="deleteModalData"
      :deleteData="handleDeleteUserClick"
    />
    <PizzaLoader v-if="isLoadingCustomer" />
    <div class="customers__table-box">
      <HeaderAction
        :routeTo="null"
        :dataList="customers"
        :csv="csv"
        :dataType="'Category'"
        :downloadCSVFilename="downloadCSVFilename"
        :fetchAllData="fetchAllCustomers"
        :handleDownloadCSVClick="handleDownloadCSVClick"
        :handleDownloadExcelClick="handleDownloadExcelClick"
        :handleDownloadPdfClick="handleDownloadPdfClick"
        @update-search-data="handleUpdateSearchData"
      />
      <div v-if="!customers.length" class="customers__table-placeholder-box">
        <h2 class="customers__table-placeholder-text">
          <!-- There are no customers yet! -->
        </h2>
      </div>
      <table v-else class="customers-table" ref="customersPdfTable">
        <thead>
          <tr class="customers-table__row customers-table__head-row">
            <th scope="col" class="customers-table__head">Customer Id</th>
            <th scope="col" class="customers-table__head">Name</th>
            <th scope="col" class="customers-table__head">Phone Number</th>
            <th scope="col" class="customers-table__head">Email</th>
            <th scope="col" class="customers-table__head">Gender</th>
            <th scope="col" class="customers-table__head">Birth Date</th>
            <th
              v-if="data?.role === 'ADMIN'"
              scope="col"
              class="customers-table__head"
            >
              Status
            </th>
          </tr>
        </thead>
        <tbody v-if="customers.length">
          <CustomerTableRow
            v-for="(customer, idx) in getFilteredCustomers(searchData)"
            :key="customer.id"
            :isLastRow="
              idx === customers.length - 1 || idx === customers.length - 2
            "
            :customer="customer"
            :getCustomer="getCustomer"
            :toggleCustomerStatus="toggleCustomerStatus"
            :isStatusDropdownOpen="isStatusDropdownOpen"
            :activeRowId="activeRowId"
            :getActiveRowId="getActiveRowId"
            :toggleStatusDropdown="toggleStatusDropdown"
            :userRole="data.role"
          />
        </tbody>
      </table>
    </div>
  </section>
</template>
  <script setup lang="ts">
import { exportToPDF } from "#imports";
import { pdfOptions } from "~/config/pdfOptions";
import { utils, writeFileXLSX } from "xlsx";
import { ICustomer, CustomerStatus } from "~/types/customer";
import {
  getAllCustomers,
  deleteCustomer,
  changeCustomerStatus,
} from "~/api/customer";

const customers = ref<ICustomer[]>([]);
const isLoading = ref(false);
const searchData = ref("");
const deleteModalData = ref({});
const customersPdfTable = ref<HTMLElement | undefined>(undefined);
const downloadCSVFilename = "all-customers.csv";
const csv = ref();
const { $toast } = useNuxtApp();
const { data } = useAuth();

const handleUpdateSearchData = (val: string) => {
  searchData.value = val;
};
const {
  isStatusDropdownOpen,
  activeRowId,
  getActiveRowId,
  toggleStatusDropdown,
} = useStatusDropdown();
const {
  isLoading: isLoadingCustomer,
  startLoading,
  stopLoading,
} = useLoading();

const handleDownloadCSVClick = () => {
  const worksheetHeader = Object.keys(
    customers.value.reduce((t, el) => ({ ...t, ...el }), {})
  );
  const worksheetBody = customers.value.map((customer) => {
    const userVals = Object.values(customer);
    const arrUserItems = [];
    for (const userVal of userVals) {
      arrUserItems.push(userVal);
    }
    return arrUserItems;
  });

  const ws = utils.aoa_to_sheet([worksheetHeader, ...worksheetBody]);
  const CSV = utils.sheet_to_csv(ws, {
    RS: "\n",
  });
  csv.value = CSV;
};

const handleDownloadExcelClick = () => {
  writeFileXLSX(
    utils.table_to_book(customersPdfTable.value),
    "customers-table.xlsx",
    {
      sheet: "customers-table",
      cellDates: true,
    }
  );
};
const handleDownloadPdfClick = () => {
  exportToPDF("customers-table.pdf", customersPdfTable.value, pdfOptions);
};

const { isModalOpen, currentActiveScreen, toggleModal, moveToNextScreen } =
  useModal();

const fetchAllCustomers = async () => {
  startLoading();
  customers.value = [];
  isLoading.value = true;
  const customersResp = await getAllCustomers();
  customers.value = [...customersResp.data.data];
  isLoading.value = false;
  stopLoading();
};
fetchAllCustomers();

const getFilteredCustomers = (searchData: string) => {
  return customers.value.filter((customer: ICustomer) => {
    return !searchData.length
      ? true
      : customer.name
      ? customer.name.toLowerCase().includes(searchData.toLowerCase())
      : false;
  });
};

const getCustomer = (customer: ICustomer) => {
  deleteModalData.value = {
    id: customer.id,
    type: "User",
    data: customer.phone,
  };
  toggleModal();
};

const toggleCustomerStatus = async (customerId: number, status: string) => {
  try {
    await changeCustomerStatus(customerId, status);
    customers.value = customers.value.map((customer) =>
      customer.id === customerId
        ? { ...customer, status: CustomerStatus[status] }
        : customer
    );
    $toast.success(`Customer status is changed to [${status}] successfully`);
  } catch (err: any) {
    if (err?.response?.data?.errors) {
      $toast.error(err.response?.data?.errors);
    }
  }
};

const handleDeleteUserClick = async (id: string) => {
  let customer = customers.value.find((customer) => customer.id === Number(id));
  await deleteCustomer(id);
  fetchAllCustomers();
  toggleModal();
  $toast.success(
    `Customer with phone number: ${customer?.phone} is deleted successfully!`
  );
  customer = null!;
};
</script>
  <style scoped>
.customers__header {
  text-align: center;
  margin-bottom: 35px;
}
.customers__title {
  font-size: clamp(1.4rem, calc(1.5vw + 1rem), 2rem);
  font-weight: 600;
}
.customers__table-box {
  overflow-y: hidden;
  overflow-x: auto;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
.customers__table-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px 20px;
  border-top-left-radius: inherit;
  border-top-right-radius: inherit;
  background: #f2f2f2;
}
.customers__search-box {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 12px;
  border-radius: 5px;
  background: #fff;
}
.customers__search-input {
  border: 0;
  outline: 0;
}
.customers__table-icon {
  font-size: 22px;
}
.customers__table-header-right {
  display: flex;
  align-items: center;
  gap: 15px;
}
.customers__table-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #fc8019;
  color: #fff;
}
.customers-table {
  width: 250%;
  table-layout: fixed;
  font-size: 15px;
}
.customers-table__head {
  padding: 25px;
  text-align: left;
}
@media (min-width: 992px) {
  .customers-table {
    width: 200%;
  }
}
@media (min-width: 1350px) {
  .customers__table-box {
    overflow-x: hidden;
  }
  .customers-table {
    width: 100%;
    table-layout: normal;
  }
}
</style>