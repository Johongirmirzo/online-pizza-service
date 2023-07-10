<template>
  <section class="messages">
    <header class="messages__header">
      <h1 class="messages__title">All Reviews</h1>
    </header>
    <PizzaLoader v-if="isLoading" />
    <div class="messages__table-box">
      <HeaderAction
        :routeTo="null"
        :dataList="reviews"
        :csv="csv"
        :dataType="'reviews'"
        :downloadCSVFilename="downloadCSVFilename"
        :fetchAllData="fetchAllReviews"
        :handleDownloadCSVClick="handleDownloadCSVClick"
        :handleDownloadExcelClick="handleDownloadExcelClick"
        :handleDownloadPdfClick="handleDownloadPdfClick"
        @update-search-data="handleUpdateSearchData"
      />
      <div v-if="!reviews.length" class="messages__table-placeholder-box">
        <h2 class="messages__table-placeholder-text">
          There are no reviews yet!
        </h2>
      </div>
      <table v-else class="messages-table" ref="reviewsPdfTable">
        <thead>
          <tr class="messages-table__row messages-table__head-row">
            <th scope="col" class="messages-table__head">Id</th>
            <th scope="col" class="messages-table__head">Subject</th>
            <th scope="col" class="messages-table__head">Message</th>
            <th scope="col" class="messages-table__head">Stars</th>
            <th scope="col" class="messages-table__head">Status</th>
            <th scope="col" class="messages-table__head">Date</th>
          </tr>
        </thead>
        <tbody v-if="reviews.length">
          <ReviewTableRow
            v-for="(review, idx) of getFilteredReviews(searchData)"
            :key="review.id"
            :review="review"
            :isLastRow="
              idx === reviews.length - 1 || idx === reviews.length - 2
            "
            :isStatusDropdownOpen="isStatusDropdownOpen"
            :activeRowId="activeRowId"
            :getActiveRowId="getActiveRowId"
            :toggleStatusDropdown="toggleStatusDropdown"
            :toggleReviewStatus="toggleReviewStatus"
          />
        </tbody>
      </table>
    </div>
  </section>
</template>
  <script setup lang="ts">
import { useLoading } from "~/composables/useLoading";
import { getAllReviews, changeReviewStatus } from "~/api/review";
import { IReview, ReviewStatus } from "~/types/review";

const reviews = ref<IReview[]>([]);
const isLoading = ref(false);
const searchData = ref("");
const reviewsPdfTable = ref<HTMLElement | undefined>(undefined);
const { $toast } = useNuxtApp();
const downloadCSVFilename = "all-reviews.csv";

const {
  isLoading: isLoadingMessages,
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
  generateCSV<IReview>(reviews.value);
};

const handleDownloadExcelClick = () => {
  generateExcel(reviewsPdfTable.value, "reviews", "reviews");
};
const handleDownloadPdfClick = () => {
  generatePDF("reviews-table", reviewsPdfTable.value);
};

const fetchAllReviews = async () => {
  startLoading();
  reviews.value = [];
  isLoading.value = true;
  const reviewsResp = await getAllReviews();
  reviews.value = [...reviewsResp.data.data];
  isLoading.value = false;
  stopLoading();
};
fetchAllReviews();

const getFilteredReviews = (searchData: string) => {
  return reviews.value.filter((review: IReview) =>
    !searchData.length
      ? true
      : review.reviewSubject.toLowerCase().includes(searchData.toLowerCase())
  );
};

const toggleReviewStatus = async (reviewId: number, status: ReviewStatus) => {
  try {
    await changeReviewStatus(reviewId, status);
    reviews.value = reviews.value.map((revjew: IReview) =>
      revjew.id === reviewId
        ? { ...revjew, status: ReviewStatus[status] }
        : revjew
    );
    $toast.success(`Review status changed to ${status} successfully!`);
  } catch (err: any) {
    if (err?.response?.data?.errors) {
      $toast.error(err.response?.data?.errors);
    }
  }
};
</script>
  <style scoped>
.messages__header {
  text-align: center;
  margin-bottom: 35px;
}
.messages__title {
  font-size: clamp(1.4rem, calc(1.5vw + 1rem), 2rem);
  font-weight: 600;
}
.messages__table-placeholder-box {
  margin: 25px 0;
}
.messages__table-placeholder-text {
  font-size: clamp(1.4rem, calc(1.5vw + 1rem), 1.6rem);
  text-align: center;
}
.messages__table-box {
  overflow-y: hidden;
  overflow-x: auto;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
.messages__table-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px 20px;
  border-top-left-radius: inherit;
  border-top-right-radius: inherit;
  background: #f2f2f2;
}
.messages__search-box {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 12px;
  border-radius: 5px;
  background: #fff;
}
.messages__search-input {
  border: 0;
  outline: 0;
}
.messages__table-icon {
  font-size: 22px;
}
.messages__table-header-right {
  display: flex;
  align-items: center;
  gap: 15px;
}
.messages__table-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #fc8019;
  color: #fff;
}
.messages-table {
  width: 300%;
  table-layout: fixed;
  font-size: 14px;
}
.messages-table__head,
.messages-table__cell {
  padding: 26px;
  text-align: left;
}
.messages-table__cell {
  padding: 5px 25px;
  vertical-align: middle;
  border-top: 1px solid #e0e0e0;
  color: #444;
}

.messages-table__btns-box {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
}
.messages-table__delete-message-btn > *,
.messages-table__view-employee-btn > * {
  font-size: 18px;
}

.messages-table__delete-message-btn {
  color: red;
}
.messages-table__view-employee-btn {
  color: rgb(85, 85, 214);
}
@media (min-width: 760px) {
  .messages-table {
    width: 200%;
  }
}
@media (min-width: 1350px) {
  .messages__table-box {
    overflow-x: hidden;
  }
  .messages-table {
    width: 100%;
    table-layout: normal;
  }
}
</style>