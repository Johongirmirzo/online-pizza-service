<template>
  <section class="employees">
    <header class="employees__header">
      <h1 class="employees__title">All Employees</h1>
    </header>
    <DeleteModal
      :isModalOpen="isModalOpen"
      :currentActiveScreen="currentActiveScreen"
      :toggleModal="toggleModal"
      :moveToNextScreen="moveToNextScreen"
      :deleteModalData="deleteModalData"
      :deleteData="handleDeleteEmployeeClick"
    />
    <PizzaLoader v-if="isLoadingEmployees" />
    <div class="employees__table-box">
      <HeaderAction
        :routeTo="routeTo"
        :dataList="employees"
        :csv="csv"
        :dataType="'employees'"
        :downloadCSVFilename="downloadCSVFilename"
        :fetchAllData="fetchAllemployees"
        :handleDownloadCSVClick="handleDownloadCSVClick"
        :handleDownloadExcelClick="handleDownloadExcelClick"
        :handleDownloadPdfClick="handleDownloadPdfClick"
        @update-search-data="handleUpdateSearchData"
      />
      <div v-if="!employees.length" class="employees__table-placeholder-box">
        <h2 class="employees__table-placeholder-text">
          <!-- There are no employees yet! -->
        </h2>
      </div>
      <table v-else class="employees-table" ref="employeesPdfTable">
        <thead>
          <tr class="employees-table__row employees-table__head-row">
            <th scope="col" class="employees-table__head">Id</th>
            <th scope="col" class="employees-table__head">Image</th>
            <th scope="col" class="employees-table__head">Full Name</th>
            <th scope="col" class="employees-table__head">Phone Number</th>
            <th scope="col" class="employees-table__head">Email</th>
            <th scope="col" class="employees-table__head">Role</th>
            <th scope="col" class="employees-table__head">Salary</th>
            <th scope="col" class="employees-table__head">City</th>
            <th scope="col" class="employees-table__head">Actions</th>
          </tr>
        </thead>
        <tbody v-if="employees.length">
          <tr
            v-for="employee in getFilteredemployees(searchData)"
            :key="employee.id"
            class="employees__table-row employees-table__body-row"
          >
            <td class="employees-table__cell">
              <p class="employees-table__text">
                {{ employee.id }}
              </p>
            </td>
            <td class="employees-table__cell">
              <img
                class="employees-table__img"
                :src="employee.photo"
                :alt="employee.name"
              />
            </td>
            <td class="employees-table__cell">
              <p class="employees-table__text">
                {{ employee.firstname }}
                {{ employee.lastname }}
              </p>
            </td>
            <td class="employees-table__cell">
              <p class="employees-table__text">
                {{ employee.phoneNumber }}
              </p>
            </td>
            <td class="employees-table__cell">
              <p class="employees-table__text">
                {{ employee.email }}
              </p>
            </td>
            <td class="employees-table__cell">
              <p class="employees-table__text">
                {{ employee.role }}
              </p>
            </td>
            <td class="employees-table__cell">
              <p class="employees-table__text">${{ employee.salary }}</p>
            </td>
            <td class="employees-table__cell">
              <p class="employees-table__text">
                {{ employee.city }}
              </p>
            </td>
            <td class="employees-table__cell">
              <div class="employees-table__btns-box">
                <NuxtLink
                  title="Edit employee"
                  :to="`/employee/edit-employee/${employee.id}`"
                  class="employees-table__btn employees-table__edit-employee-btn"
                >
                  <Icon class="employees__table-icon" name="lucide:edit" />
                </NuxtLink>
                <NuxtLink
                  title="View employee"
                  :to="`/employee/employee/${employee.id}`"
                  class="employees-table__btn employees-table__view-employee-btn"
                >
                  <Icon
                    class="employees__table-icon"
                    name="teenyicons:eye-outline"
                  />
                </NuxtLink>
                <button
                  title="Delete employee"
                  @click="getemployee(employee)"
                  class="employees-table__btn employees-table__delete-employee-btn"
                >
                  <Icon class="employees__table-icon" name="jam:trash" />
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
import { getAllEmployees, deleteEmployee } from "~/api/employee";
import { IEmployee } from "~/types/employee";

const employees = ref<IEmployee[]>([]);
const isLoading = ref(false);
const searchData = ref("");
const deleteModalData = ref({});
const employeesPdfTable = ref<HTMLElement | undefined>(undefined);
const { $toast } = useNuxtApp();
const routeTo = "/employee/add-employee";
const downloadCSVFilename = "all-employees.csv";

const handleUpdateSearchData = (val: string) => {
  searchData.value = val;
};

const { csv, generateCSV, generatePDF, generateExcel } = useHeaderAction();
const { isModalOpen, currentActiveScreen, toggleModal, moveToNextScreen } =
  useModal();
const {
  isLoading: isLoadingEmployees,
  startLoading,
  stopLoading,
} = useLoading();

const handleDownloadCSVClick = () => {
  generateCSV<IEmployee>(employees.value);
};

const handleDownloadExcelClick = () => {
  generateExcel(employeesPdfTable.value, "employees", "employees");
};
const handleDownloadPdfClick = () => {
  generatePDF("employees-table", employeesPdfTable.value);
};

const fetchAllemployees = async () => {
  startLoading();
  employees.value = [];
  isLoading.value = true;
  const employeesResp = await getAllEmployees();
  employees.value = [...employeesResp.data.data];
  isLoading.value = false;
  stopLoading();
};
fetchAllemployees();

const getFilteredemployees = (searchData: string) => {
  return employees.value.filter((employee: IEmployee) =>
    !searchData.length
      ? true
      : `${employee.firstname} ${employee.lastname}`
          .toLowerCase()
          .includes(searchData.toLowerCase())
  );
};

const getemployee = (employee: IEmployee) => {
  deleteModalData.value = {
    id: employee.id,
    type: "employee",
    data: `${employee.firstname} ${employee.lastname}`,
  };
  toggleModal();
};

const handleDeleteEmployeeClick = async (id: number) => {
  toggleModal();
  await deleteEmployee(id);
  $toast.success("Employee deleted successfully!");
  fetchAllemployees();
};
</script>
  <style scoped>
.employees__header {
  text-align: center;
  margin-bottom: 35px;
}
.employees__title {
  font-size: clamp(1.4rem, calc(1.5vw + 1rem), 2rem);
  font-weight: 600;
}
.employees__table-box {
  overflow-y: hidden;
  overflow-x: auto;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
.employees__table-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px 20px;
  border-top-left-radius: inherit;
  border-top-right-radius: inherit;
  background: #f2f2f2;
}
.employees__search-box {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 12px;
  border-radius: 5px;
  background: #fff;
}
.employees__search-input {
  border: 0;
  outline: 0;
}
.employees__table-icon {
  font-size: 22px;
}
.employees__table-header-right {
  display: flex;
  align-items: center;
  gap: 15px;
}
.employees__table-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #fc8019;
  color: #fff;
}
.employees-table {
  width: 350%;
  table-layout: fixed;
  font-size: 14px;
}
.employees-table__head,
.employees-table__cell {
  padding: 25px;
  text-align: left;
}
.employees-table__cell {
  padding: 5px 25px;
  vertical-align: middle;
  border-top: 1px solid #e0e0e0;
  color: #444;
}
.employees-table__img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
}
.employees-table__btns-box {
  display: flex;
  align-items: center;
  gap: 10px;
}

.employees-table__edit-employee-btn > *,
.employees-table__view-employee-btn > *,
.employees-table__delete-employee-btn > * {
  font-size: 18px;
}
.employees-table__edit-employee-btn {
  color: #fc8019;
}
.employees-table__view-employee-btn {
  color: rgb(85, 85, 214);
}
.employees-table__delete-employee-btn {
  color: red;
}
@media (min-width: 760px) {
  .employees-table {
    width: 200%;
  }
}
@media (min-width: 1350px) {
  .employees__table-box {
    overflow-x: hidden;
  }
  .employees-table {
    width: 100%;
    table-layout: normal;
  }
}
</style>