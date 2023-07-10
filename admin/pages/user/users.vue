<template>
  <section class="users">
    <header class="users__header">
      <h1 class="users__title">All Users</h1>
    </header>
    <DeleteModal
      :isModalOpen="isModalOpen"
      :currentActiveScreen="currentActiveScreen"
      :toggleModal="toggleModal"
      :moveToNextScreen="moveToNextScreen"
      :deleteModalData="deleteModalData"
      :deleteData="handleDeleteUserClick"
    />
    <PizzaLoader v-if="isLoadingUsers" />
    <div class="users__table-box">
      <HeaderAction
        :routeTo="routeTo"
        :dataList="users"
        :csv="csv"
        :dataType="'Users'"
        :downloadCSVFilename="downloadCSVFilename"
        :fetchAllData="fetchAllUsers"
        :handleDownloadCSVClick="handleDownloadCSVClick"
        :handleDownloadExcelClick="handleDownloadExcelClick"
        :handleDownloadPdfClick="handleDownloadPdfClick"
        @update-search-data="handleUpdateSearchData"
      />
      <div v-if="!users.length" class="users__table-placeholder-box">
        <h2 class="users__table-placeholder-title">
          No Users have been created yet!
        </h2>
      </div>
      <table v-else class="users-table" ref="usersPdfTable">
        <thead>
          <tr class="users-table__row users-table__head-row">
            <th scope="col" class="users-table__head">Id</th>
            <th scope="col" class="users-table__head">Image</th>
            <th scope="col" class="users-table__head">Name</th>
            <th scope="col" class="users-table__head">Phone Number</th>
            <th scope="col" class="users-table__head">Email</th>
            <th scope="col" class="users-table__head">Role</th>
            <th scope="col" class="users-table__head">Status</th>
            <th scope="col" class="users-table__head">Actions</th>
          </tr>
        </thead>
        <tbody>
          <UserTableRow
            v-for="(user, idx) in getFilteredUsers(searchData)"
            :key="user.id"
            :user="user"
            :isLastRow="idx === users.length - 1 || idx === users.length - 2"
            :toggleUserStatus="toggleUserStatus"
            :getUser="getUser"
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
import { getAllUsers, deleteUser, changeUserStatus } from "~/api/user";
import { IUser, UserStatus } from "~/types/user";

const users = ref<IUser[]>([]);
const isLoading = ref(false);
const searchData = ref("");
const deleteModalData = ref({});
const { $toast } = useNuxtApp();
const usersPdfTable = ref<HTMLElement | undefined>(undefined);
const routeTo = "/user/add-user";
const downloadCSVFilename = "all-users.csv";

const handleUpdateSearchData = (val: string) => {
  searchData.value = val;
};

const { csv, generateCSV, generatePDF, generateExcel } = useHeaderAction();
const { isModalOpen, currentActiveScreen, toggleModal, moveToNextScreen } =
  useModal();
const {
  isStatusDropdownOpen,
  activeRowId,
  getActiveRowId,
  toggleStatusDropdown,
} = useStatusDropdown();
const { isLoading: isLoadingUsers, startLoading, stopLoading } = useLoading();

const handleDownloadCSVClick = () => {
  generateCSV<IUser>(users.value);
};

const handleDownloadExcelClick = () => {
  generateExcel(usersPdfTable.value, "users", "users");
};
const handleDownloadPdfClick = () => {
  generatePDF("users-table", usersPdfTable.value);
};

const fetchAllUsers = async () => {
  startLoading();
  users.value = [];
  isLoading.value = true;
  const usersResp = await getAllUsers();
  users.value = [...usersResp.data.data];
  isLoading.value = false;
  stopLoading();
};
fetchAllUsers();

const getFilteredUsers = (searchData: string) => {
  return users.value.filter((user: IUser) =>
    !searchData.length
      ? true
      : user.name.toLowerCase().includes(searchData.toLowerCase())
  );
};

const toggleUserStatus = async (userId: number, status: UserStatus) => {
  try {
    await changeUserStatus(userId, status);
    users.value = users.value.map((user: IUser) =>
      user.id === userId ? { ...user, status } : user
    );
    $toast.success(`User status is changed to ${status} successfully!`);
  } catch (err) {
    console.log("Error", err);
  }
};

const getUser = (user: IUser) => {
  deleteModalData.value = {
    id: user.id,
    type: "User",
    data: user.name,
  };
  toggleModal();
};

const handleDeleteUserClick = async (id: number) => {
  await deleteUser(id);
  fetchAllUsers();
  toggleModal();
  $toast.success("User is deleted successfully!");
};
</script>
<style scoped>
.users__header {
  text-align: center;
  margin-bottom: 35px;
}
.users__title {
  font-size: clamp(1.4rem, calc(1.5vw + 1rem), 2rem);
  font-weight: 600;
}
.users__table-box {
  overflow-y: hidden;
  overflow-x: auto;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
.users__table-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px 20px;
  border-top-left-radius: inherit;
  border-top-right-radius: inherit;
  background: #f2f2f2;
}
.users__search-box {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 12px;
  border-radius: 5px;
  background: #fff;
}
.users__search-input {
  border: 0;
  outline: 0;
}
.users__table-placeholder-box {
  padding: 25px 0;
  text-align: center;
}
.users__table-placeholder-title {
  font-size: clamp(1.2rem, calc(1.5vw + 1rem), 1.5rem);
}

.users__table-icon {
  font-size: 22px;
}
.users__table-header-right {
  display: flex;
  align-items: center;
  gap: 15px;
}
.users__table-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #fc8019;
  color: #fff;
}
.users-table {
  width: 300%;
  table-layout: fixed;
  font-size: 15px;
}
.users-table__head,
.users-table__cell {
  padding: 25px;
  text-align: left;
}
.users-table__cell {
  padding: 5px 25px;
  vertical-align: middle;
  border-top: 1px solid #e0e0e0;
  color: #444;
}
.users-table__img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
}
.users-table__btns-box {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
}
.users-table__edit-user-btn {
  color: #fc8019;
}
.users-table__delete-user-btn {
  color: red;
}

@media (min-width: 992px) {
  .users-table {
    width: 200%;
  }
}
@media (min-width: 1350px) {
  .users__table-box {
    overflow-x: hidden;
  }
  .users-table {
    width: 100%;
    table-layout: normal;
  }
}
</style>