<template>
  <section class="feedbacks">
    <header class="feedbacks__header">
      <h1 class="feedbacks__title">All Feedbacks</h1>
    </header>
    <PizzaLoader v-if="isLoadingFeedbacks" />
    <DeleteItemModal
      v-if="deleteItemId > -1"
      :isModalOpen="isModalOpen"
      :closeModal="toggleModal"
      :handleDeleteClick="handleDeleteCustomerFeedbackClick"
      deleteItem="Feedback"
    />
    <div class="feedbacks__table-box">
      <HeaderAction
        :routeTo="null"
        :dataList="feedbacks"
        :csv="csv"
        :dataType="'Feedbacks'"
        :downloadCSVFilename="downloadCSVFilename"
        :fetchAllData="fetchAllFeedbacks"
        :handleDownloadCSVClick="handleDownloadCSVClick"
        :handleDownloadExcelClick="handleDownloadExcelClick"
        :handleDownloadPdfClick="handleDownloadPdfClick"
        @update-search-data="handleUpdateSearchData"
      />
      <div v-if="!feedbacks.length" class="feedbacks__table-placeholder-box">
        <h2 class="feedbacks__table-placeholder-text">
          There are no feedbacks yet!
        </h2>
      </div>
      <table v-else class="feedbacks-table" ref="feedbacksPdfTable">
        <thead>
          <tr class="feedbacks-table__row feedbacks-table__head-row">
            <th scope="col" class="feedbacks-table__head">Id</th>
            <th scope="col" class="feedbacks-table__head">Feedback Type</th>
            <th scope="col" class="feedbacks-table__head">Fullname</th>
            <th scope="col" class="feedbacks-table__head">Phone Number</th>
            <th scope="col" class="feedbacks-table__head">Email</th>
            <th scope="col" class="feedbacks-table__head">Rating</th>
            <th scope="col" class="feedbacks-table__head">Feedback</th>
            <th scope="col" class="feedbacks-table__head">Date</th>
            <th scope="col" class="feedbacks-table__head">Actions</th>
          </tr>
        </thead>
        <tbody v-if="feedbacks.length">
          <tr
            v-for="feedback in getFilteredFeedbacks(searchData)"
            :key="feedback.id"
            class="feedbacks__table-row feedbacks-table__body-row"
          >
            <td class="feedbacks-table__cell">
              <p class="feedbacks-table__text">
                {{ feedback.id }}
              </p>
            </td>
            <td class="feedbacks-table__cell">
              <p class="feedback-table__text">
                {{ feedback.type }}
              </p>
            </td>
            <td class="feedbacks-table__cell">
              <p class="feedbacks-table__text">
                {{ feedback.fullName }}
              </p>
            </td>
            <td class="feedbacks-table__cell">
              <p class="feedbacks-table__text">
                {{ feedback.mobileNumber }}
              </p>
            </td>
            <td class="feedbacks-table__cell">
              <p class="feedbacks-table__text">
                {{ feedback.email }}
              </p>
            </td>

            <td class="feedbacks-table__cell">
              <p class="feedbacks-table__text">
                {{ feedback.rating }}
              </p>
            </td>
            <td class="feedbacks-table__cell">
              <p :title="feedback.feedback" class="feedbacks-table__text">
                {{ truncateText(feedback.feedback) }}
              </p>
            </td>
            <td class="feedbacks-table__cell">
              <p class="feedbacks-table__text">
                {{ DateTime.fromISO(feedback.created).toFormat("dd/MM/yyyy") }}
              </p>
            </td>
            <td class="feedbacks-table__cell">
              <div class="feedbacks-table__btns-box">
                <button
                  title="Delete feedback"
                  @click="getDeleteItemId(feedback.id)"
                  class="feedbacks-table__btn feedbacks-table__delete-feedback-btn"
                >
                  <Icon
                    size="18"
                    class="feedbacks__table-icon"
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
import { DateTime } from "luxon";
import { truncateText } from "~/utils/truncateText";
import {
  getAllFeedbacks,
  deleteFeedback,
  changeFeedbackStatus,
} from "~/api/feedback";
import { IFeedback } from "~/types/feedback";

const feedbacks = ref<IFeedback[]>([]);
const deleteItemId = ref(-1);
const isLoading = ref(false);
const searchData = ref("");
const { $toast } = useNuxtApp();
const feedbacksPdfTable = ref<HTMLElement | undefined>(undefined);
const downloadCSVFilename = "all-feedbacks.csv";

const {
  isLoading: isLoadingFeedbacks,
  startLoading,
  stopLoading,
} = useLoading();
const { csv, generateCSV, generatePDF, generateExcel } = useHeaderAction();
const { isModalOpen, toggleModal } = useModal();

const handleUpdateSearchData = (val: string) => {
  searchData.value = val;
};

const handleDownloadCSVClick = () => {
  generateCSV<IFeedback>(feedbacks.value);
};

const handleDownloadExcelClick = () => {
  generateExcel(feedbacksPdfTable.value, "feedbacks", "feedbacks");
};
const handleDownloadPdfClick = () => {
  generatePDF("feedbacks-table", feedbacksPdfTable.value);
};

const fetchAllFeedbacks = async () => {
  startLoading();
  feedbacks.value = [];
  isLoading.value = true;
  const feedbacksResp = await getAllFeedbacks();
  feedbacks.value = [...feedbacksResp.data.data];
  isLoading.value = false;
  stopLoading();
};
fetchAllFeedbacks();

const getFilteredFeedbacks = (searchData: string) => {
  return feedbacks.value.filter((feedback: IFeedback) =>
    !searchData.length
      ? true
      : feedback.fullName.toLowerCase().includes(searchData.toLowerCase())
  );
};

const getDeleteItemId = (feedbackId: number) => {
  deleteItemId.value = feedbackId;
  toggleModal();
};

const handleDeleteCustomerFeedbackClick = async () => {
  await deleteFeedback(deleteItemId.value);
  $toast.success("Feedback is deleted successfully!");
  fetchAllFeedbacks();
};
</script>
  <style scoped>
.feedbacks__header {
  text-align: center;
  margin-bottom: 35px;
}
.feedbacks__title {
  font-size: clamp(1.4rem, calc(1.5vw + 1rem), 2rem);
  font-weight: 600;
}
.feedbacks__table-placeholder-box {
  margin: 25px 0;
}
.feedbacks__table-placeholder-text {
  font-size: clamp(1.4rem, calc(1.5vw + 1rem), 1.6rem);
  text-align: center;
}
.feedbacks__table-box {
  overflow-y: hidden;
  overflow-x: auto;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
.feedbacks__table-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px 20px;
  border-top-left-radius: inherit;
  border-top-right-radius: inherit;
  background: #f2f2f2;
}
.feedbacks__search-box {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 12px;
  border-radius: 5px;
  background: #fff;
}
.feedbacks__search-input {
  border: 0;
  outline: 0;
}
.feedbacks__table-icon {
  font-size: 22px;
}
.feedbacks__table-header-right {
  display: flex;
  align-items: center;
  gap: 15px;
}
.feedbacks__table-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #fc8019;
  color: #fff;
}
.feedbacks-table {
  width: 300%;
  table-layout: fixed;
  font-size: 14px;
}
.feedbacks-table__head,
.feedbacks-table__cell {
  padding: 25px;
  text-align: left;
}
.feedbacks-table__cell {
  padding: 5px 25px;
  vertical-align: middle;
  border-top: 1px solid #e0e0e0;
  color: #444;
}
.feedbacks-table__img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
}
.feedbacks-table__btns-box {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
}
.feedbacks-table__edit-feedback-btn {
  color: rgb(85, 85, 214);
}
.feedbacks-table__delete-feedback-btn {
  color: red;
}
@media (min-width: 760px) {
  .feedbacks-table {
    width: 200%;
  }
}
@media (min-width: 1350px) {
  .feedbacks__table-box {
    overflow-x: hidden;
  }
  .feedbacks-table {
    width: 100%;
    table-layout: normal;
  }
}
</style>