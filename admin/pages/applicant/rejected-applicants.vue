<template>
  <section class="applicants">
    <header class="applicants__header">
      <h1 class="applicants__title">Rejected Applicants</h1>
    </header>
    <DeleteModal
      :isModalOpen="isModalOpen"
      :currentActiveScreen="currentActiveScreen"
      :toggleModal="toggleModal"
      :moveToNextScreen="moveToNextScreen"
      :deleteModalData="deleteModalData"
      :deleteData="handleDeleteApplicantClick"
    />
    <PizzaLoader v-if="isLoadingApplicant" />
    <div class="applicants__table-box">
      <HeaderAction
        :routeTo="null"
        :dataList="applicants"
        :csv="csv"
        :dataType="'Applicants'"
        :downloadCSVFilename="downloadCSVFilename"
        :fetchAllData="fetchAllApplicants"
        :handleDownloadCSVClick="handleDownloadCSVClick"
        :handleDownloadExcelClick="handleDownloadExcelClick"
        :handleDownloadPdfClick="handleDownloadPdfClick"
        @update-search-data="handleUpdateSearchData"
      />
      <div v-if="!applicants.length" class="applicants__table-placeholder-box">
        <h2 class="applicants__table-placeholder-text">
          <!-- There are no applicants yet! -->
        </h2>
      </div>
      <table v-else class="applicants-table" ref="applicantsPdfTable">
        <thead>
          <tr class="applicants-table__row applicants-table__head-row">
            <th scope="col" class="applicants-table__head">Id</th>
            <th scope="col" class="applicants-table__head">Image</th>
            <th scope="col" class="applicants-table__head">Fullname</th>
            <th scope="col" class="applicants-table__head">Phone Number</th>
            <th scope="col" class="applicants-table__head">Email</th>
            <th scope="col" class="applicants-table__head">Applied Role</th>
            <th scope="col" class="applicants-table__head">Status</th>
            <th scope="col" class="applicants-table__head">Resume</th>
            <th scope="col" class="applicants-table__head">Actions</th>
          </tr>
        </thead>
        <tbody v-if="applicants.length">
          <ApplicantTableRow
            v-for="(applicant, idx) in getFilteredApplicants(searchData)"
            :key="applicant.id"
            :applicant="applicant"
            :isLastRow="
              idx === applicants.length - 1 || idx === applicants.length - 2
            "
            :getApplicant="getApplicant"
            :toggleApplicantStatus="toggleApplicantStatus"
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
  getAllApplicants,
  deleteApplicant,
  changeApplicantStatus,
} from "~/api/applicant";
import { IApplicant, ApplicantStatus } from "~/types/applicant";

const applicants = ref<IApplicant[]>([]);
const isLoading = ref(false);
const searchData = ref("");
const deleteModalData = ref({});
const { $toast } = useNuxtApp();
const applicantsPdfTable = ref<HTMLElement | undefined>(undefined);
const downloadCSVFilename = "rejected-applicants.csv";

const handleUpdateSearchData = (val: string) => {
  searchData.value = val;
};

const { isModalOpen, currentActiveScreen, toggleModal, moveToNextScreen } =
  useModal();
const { csv, generateCSV, generatePDF, generateExcel } = useHeaderAction();
const {
  isStatusDropdownOpen,
  activeRowId,
  getActiveRowId,
  toggleStatusDropdown,
} = useStatusDropdown();
const {
  isLoading: isLoadingApplicant,
  startLoading,
  stopLoading,
} = useLoading();

const handleDownloadCSVClick = () => {
  generateCSV<IApplicant>(applicants.value);
};

const handleDownloadExcelClick = () => {
  generateExcel(applicantsPdfTable.value, "rejected-applicants", "applicants");
};
const handleDownloadPdfClick = () => {
  generatePDF("rejected-applicants-table", applicantsPdfTable.value);
};

const fetchAllApplicants = async () => {
  startLoading();
  applicants.value = [];
  isLoading.value = true;
  const applicantsResp = await getAllApplicants();
  applicants.value = [
    ...applicantsResp.data.data.filter(
      (applicant: IApplicant) => applicant.applicationStatus === "REJECTED"
    ),
  ];
  isLoading.value = false;
  stopLoading();
};
fetchAllApplicants();

const getFilteredApplicants = (searchData: string) => {
  return applicants.value.filter((applicant: IApplicant) =>
    !searchData.length
      ? true
      : applicant.firstname.toLowerCase().includes(searchData.toLowerCase())
  );
};

const getApplicant = (applicant: IApplicant) => {
  deleteModalData.value = {
    id: applicant.id,
    type: "Applicant",
    data: applicant.firstname,
  };
  toggleModal();
};

const toggleApplicantStatus = async (
  applicantId: number,
  status: ApplicantStatus
) => {
  try {
    await changeApplicantStatus(applicantId, status);
    applicants.value = applicants.value.map((applicant: IApplicant) =>
      applicant.id === applicantId
        ? { ...applicant, applicationStatus: ApplicantStatus[status] }
        : applicant
    );
    $toast.success(`Application status changed to ${status} successfully!`);
    status === "ACCEPTED"
      ? navigateTo("/applicant/accepted-applicants")
      : navigateTo("/applicant/applicants");
  } catch (err: any) {
    if (err?.response?.data?.errors) {
      $toast.error(err.response?.data?.errors);
    }
  }
};

const handleDeleteApplicantClick = async (id: number) => {
  let applicant = applicants.value.find(
    (applicant: IApplicant) => applicant.id === id
  );
  await deleteApplicant(id);
  fetchAllApplicants();
  toggleModal();
  $toast.success(
    `Applicant ${applicant?.firstname} ${applicant?.lastname} has been deleted successfully!`
  );
};
</script>
<style scoped>
.applicants__header {
  text-align: center;
  margin-bottom: 35px;
}
.applicants__title {
  font-size: clamp(1.4rem, calc(1.5vw + 1rem), 2rem);
  font-weight: 600;
}
.applicants__table-box {
  overflow-y: hidden;
  overflow-x: auto;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
.applicants__table-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px 20px;
  border-top-left-radius: inherit;
  border-top-right-radius: inherit;
  background: #f2f2f2;
}
.applicants__search-box {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 12px;
  border-radius: 5px;
  background: #fff;
}
.applicants__search-input {
  border: 0;
  outline: 0;
}
.applicants__table-icon {
  font-size: 22px;
}
.applicants__table-header-right {
  display: flex;
  align-items: center;
  gap: 15px;
}
.applicants__table-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #fc8019;
  color: #fff;
}
.applicants-table {
  width: 300%;
  table-layout: fixed;
}
.applicants-table__head {
  padding: 25px;
  text-align: left;
}
@media (min-width: 992px) {
  .applicants-table {
    width: 200%;
  }
}
@media (min-width: 1350px) {
  .applicants__table-box {
    overflow-x: hidden;
  }
  .applicants-table {
    width: 100%;
    table-layout: normal;
  }
}
</style>