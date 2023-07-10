<template>
  <section class="message">
    <SectionHeader
      :redirectLink="redirectLink"
      :redirectText="redirectText"
      :title="title"
    >
      <template #header-icon>
        <Icon name="bx:food-menu" />
      </template>
    </SectionHeader>

    <div v-if="messages.length" class="message__row">
      <div v-for="message of messages" :key="message.id" class="message-box">
        <header class="message-box__header">
          <h2 class="message-box__title">
            {{ message.subject }}
          </h2>
          <button
            @click="handleDeleteMessageClick(message.id)"
            title="Delete Message"
            class="message__delete-btn"
          >
            <Icon class="message__icon" name="jam:trash" />
          </button>
        </header>
        <div class="message-box__body">
          <p class="message-box__message">
            {{ message.message }}
          </p>
          <div class="message-box__row">
            <p class="message-box__text">
              <Icon class="message-box__icon" name="octicon:person-16" />
              {{ message.firstname }} {{ message.lastname }}
            </p>
            <p class="message-box__text">
              <Icon class="message-box__icon" name="fluent-mdl2:date-time" />
              {{ DateTime.fromISO(message.date).toFormat("yyyy-MM-dd") }}
            </p>
          </div>
          <div class="message-box__row">
            <a class="message-box__link" :href="`tel:${message.phoneNumber}`">
              <Icon class="message-box__icon" name="ph:phone" />
              {{ message.phoneNumber }}
            </a>
            <a class="message-box__link" :href="`mailto:${message.email}`">
              <Icon class="message-box__icon" name="ic:outline-email" />
              {{ message.email }}
            </a>
          </div>
        </div>
      </div>
    </div>
    <h2 v-else class="message__404-title">There are no messages</h2>
  </section>
</template>
  <script setup lang="ts">
import { DateTime } from "luxon";
import { useMessageStore } from "~/stores/useMessageStore";
import { IMessage } from "~/types/message";

const redirectLink = "/messages";
const redirectText = "Go Back To All Messages";
const title = "All Messages";
const messageStore = useMessageStore();

const { $toast } = useNuxtApp();
const messages = ref<IMessage[]>([]);

watchEffect(() => {
  messages.value = messageStore.messages;
});

const handleDeleteMessageClick = (messageId: number) => {
  messageStore.deleteMessage(messageId);
  messages.value = messages.value.filter(
    (message: IMessage) => message.id !== messageId
  );
  $toast.success(`Message with id ${messageId} is deleted!`);
};
</script>
  <style scoped>
.message__404-title {
  font-size: clamp(1.4rem, calc(1.5vw + 1rem), 1.8rem);
  text-align: center;
}

.message__row {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 25px;
  word-break: break-all;
}
.message-box {
  width: 100%;
  margin: 0 auto;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  padding: 20px 0;
}
.message-box__header {
  position: relative;
  padding: 0 20px;
  text-align: center;
  border-bottom: 1px solid #e7e7e7;
}

.message__delete-btn {
  position: absolute;
  top: -15px;
  right: 15px;
  font-size: 20px;
  color: red;
}
.message__delete-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
.message-box__title {
  font-size: clamp(1.2rem, calc(1.5vw + 1rem), 1.5rem);
  padding-bottom: 15px;
}

.message-box__body {
  padding: 20px;
}
.message-box__message {
  color: #333;
  margin-bottom: 35px;
}
.message-box__row {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
}
.message-box__row:not(:first-child) {
  margin-top: 20px;
}
.message-box__link {
  color: rgb(60, 60, 199);
  transition: all 0.3s ease-out;
}
.message-box__icon {
  color: #555;
}
.message-box__link:hover {
  text-underline-offset: 2px;
  text-decoration: underline;
}
@media (min-width: 768px) {
  .message-box__row:not(:first-child) {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>