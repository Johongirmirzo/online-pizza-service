<template>
  <section class="messages">
    <header class="messages__header">
      <h1 class="messages__title">All messages</h1>
    </header>
    <PizzaLoader v-if="isLoading" />
    <div class="messages__table-box">
      <HeaderAction
        :routeTo="null"
        :dataList="messages"
        :csv="csv"
        :dataType="'messages'"
        :downloadCSVFilename="downloadCSVFilename"
        :fetchAllData="fetchAllmessages"
        :handleDownloadCSVClick="handleDownloadCSVClick"
        :handleDownloadExcelClick="handleDownloadExcelClick"
        :handleDownloadPdfClick="handleDownloadPdfClick"
        @update-search-data="handleUpdateSearchData"
      />
      <div v-if="!messages.length" class="messages__table-placeholder-box">
        <h2 class="messages__table-placeholder-text">
          There are no messages yet!
        </h2>
      </div>
      <table v-else class="messages-table" ref="messagesPdfTable">
        <thead>
          <tr class="messages-table__row messages-table__head-row">
            <th scope="col" class="messages-table__head">Id</th>
            <th scope="col" class="messages-table__head">Fullname</th>
            <th scope="col" class="messages-table__head">Subject</th>
            <th scope="col" class="messages-table__head">Message</th>
            <th scope="col" class="messages-table__head">Phone Number</th>
            <th scope="col" class="messages-table__head">Email</th>
            <th scope="col" class="messages-table__head">Date</th>
            <th scope="col" class="messages-table__head">Actions</th>
          </tr>
        </thead>
        <tbody v-if="messages.length">
          <tr
            v-for="message in getFilteredMessages(searchData)"
            :key="message.id"
            class="messages__table-row messages-table__body-row"
          >
            <td class="messages-table__cell">
              <p class="messages-table__text">
                {{ message.id }}
              </p>
            </td>
            <td class="messages-table__cell">
              <p class="message-table__text">
                {{ getFullname(message.firstname, message.lastname) }}
              </p>
            </td>
            <td class="messages-table__cell">
              <p class="messages-table__text">
                {{ message.subject }}
              </p>
            </td>
            <td class="messages-table__cell">
              <p class="messages-table__text">
                {{ truncateText(message.message, 40) }}
              </p>
            </td>
            <td class="messages-table__cell">
              <p class="messages-table__text">
                {{ message.phoneNumber }}
              </p>
            </td>
            <td class="messages-table__cell">
              <p class="messages-table__text">
                {{ message.email }}
              </p>
            </td>
            <td class="messages-table__cell">
              <p class="messages-table__text">
                {{ DateTime.fromISO(message.date).toFormat("dd/MM/yyyy") }}
              </p>
            </td>
            <td class="messages-table__cell">
              <div class="messages-table__btns-box">
                <button
                  v-if="data.role === 'ADMIN'"
                  title="Delete message"
                  @click="handleDeleteMessageClick(message.id)"
                  class="messages-table__btn messages-table__delete-message-btn"
                >
                  <Icon class="messages__table-icon" name="jam:trash" />
                </button>
                <NuxtLink
                  title="View Message"
                  :to="`/messages/notifications/${message.id}`"
                  class="messages-table__btn messages-table__view-employee-btn"
                >
                  <Icon
                    class="messages-items__table-icon"
                    name="teenyicons:eye-outline"
                  />
                </NuxtLink>
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
import { getAllMessages, deleteMessage } from "~/api/message";
import { IMessage } from "~/types/message";

const messages = ref<IMessage[]>([]);
const isLoading = ref(false);
const searchData = ref("");
const { $toast } = useNuxtApp();
const messagesPdfTable = ref<HTMLElement | undefined>(undefined);
const downloadCSVFilename = "all-messages.csv";
const { data } = useAuth();

const {
  isLoading: isLoadingMessages,
  startLoading,
  stopLoading,
} = useLoading();

const handleUpdateSearchData = (val: string) => {
  searchData.value = val;
};

const getFullname = (firstname: string, lastname: string) =>
  `${firstname} ${lastname}`;

const { csv, generateCSV, generatePDF, generateExcel } = useHeaderAction();

const handleDownloadCSVClick = () => {
  generateCSV<IMessage>(messages.value);
};

const handleDownloadExcelClick = () => {
  generateExcel(messagesPdfTable.value, "messages", "messages");
};
const handleDownloadPdfClick = () => {
  generatePDF("messages-table", messagesPdfTable.value);
};

const fetchAllmessages = async () => {
  startLoading();
  messages.value = [];
  isLoading.value = true;
  const messagesResp = await getAllMessages();
  messages.value = [...messagesResp.data.data];
  isLoading.value = false;
  stopLoading();
};
fetchAllmessages();

const getFilteredMessages = (searchData: string) => {
  return messages.value.filter((message: IMessage) =>
    !searchData.length
      ? true
      : getFullname(message.firstname, message.lastname)
          .toLowerCase()
          .includes(searchData.toLowerCase())
  );
};

const handleDeleteMessageClick = async (id: number) => {
  await deleteMessage(id);
  $toast.success("Message is deleted successfully!");
  fetchAllmessages();
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
  word-break: break-all;
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
.messages-table__img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
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