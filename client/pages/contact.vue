<template>
  <section class="contact">
    <header class="contact__header">
      <h1 class="contact__title">Send a Message</h1>
    </header>
    <div class="contact__form-box">
      <Form
        @submit="handleSendMessageSubmit"
        :validation-schema="message"
        class="concat-form"
      >
        <div class="contact-form__row">
          <div class="contact-form__control">
            <label for="firstname" class="contact-form__label">Firstname</label>
            <Field
              type="text"
              name="firstname"
              id="firstname"
              class="contact-form__input"
              placeholder="Enter Firstname..."
            />
            <ErrorMessage
              name="firstname"
              class="contact-form__error-message"
            />
          </div>
          <div class="contact-form__control">
            <label for="lastname" class="contact-form__label">Lastname</label>
            <Field
              type="text"
              name="lastname"
              id="lastname"
              class="contact-form__input"
              placeholder="Enter Lastname..."
            />
            <ErrorMessage name="lastname" class="contact-form__error-message" />
          </div>
        </div>
        <div class="contact-form__row">
          <div class="contact-form__control">
            <label for="phoneNumber" class="contact-form__label"
              >Phone Number</label
            >
            <Field
              type="number"
              name="phoneNumber"
              id="phoneNumber"
              class="contact-form__input"
              placeholder="Enter Phone Number..."
              @keydown="handlePreventNonNumbers"
            />
            <ErrorMessage
              name="phoneNumber"
              class="contact-form__error-message"
            />
          </div>
          <div class="contact-form__control">
            <label for="email" class="contact-form__label">Email</label>
            <Field
              type="email"
              name="email"
              id="email"
              class="contact-form__input"
              placeholder="Enter Email..."
            />
            <ErrorMessage name="email" class="contact-form__error-message" />
          </div>
        </div>
        <div class="contact-form__row">
          <div class="contact-form__control">
            <label for="subject" class="contact-form__label">Subject</label>
            <Field
              name="subject"
              id="subject"
              class="contact-form__input"
              placeholder="Enter Subject..."
            />
            <ErrorMessage name="subject" class="contact-form__error-message" />
          </div>
        </div>
        <div class="contact-form__row">
          <div class="contact-form__control">
            <label for="message" class="contact-form__label">Message</label>
            <Field
              as="textarea"
              name="message"
              id="message"
              class="contact-form__input contact-form__textarea"
              placeholder="Enter Message..."
            />
            <ErrorMessage name="message" class="contact-form__error-message" />
          </div>
        </div>
        <div class="contact-form__btns-box">
          <button
            type="reset"
            class="contact-form__btn contact-form__btn--reset"
            :disabled="isLoading"
            :class="{ active: isLoading }"
          >
            Reset
          </button>
          <button
            type="submit"
            class="contact-form__btn contact-form__btn--submit"
            :disabled="isLoading"
            :class="{ active: isLoading }"
          >
            Send
          </button>
        </div>
      </Form>
    </div>
  </section>
</template>
<script setup lang="ts">
import { socket } from "~/config/socketIo";
import { handlePreventNonNumbers } from "~/utils/handlePreventNonNumbers";
import { Form, Field, ErrorMessage } from "vee-validate";
import { message } from "~/validations";
import { IMessage } from "~/types/message";

const { isLoading, startLoading, stopLoading } = useLoading();
const { $toast } = useNuxtApp();

const handleSendMessageSubmit = (messageData: IMessage, { resetForm }) => {
  startLoading();
  socket.emit("create-message", {
    ...messageData,
    phoneNumber: messageData.phoneNumber.toString(),
  });
  socket.on("new-message", (message: IMessage) => {
    stopLoading();
    $toast.success("Your message is sent successfully!");
    resetForm();
  });
};
</script>
<style scoped>
.contact {
  margin: 50px 0 150px 0;
}
.contact__header {
  margin-bottom: 20px;
  text-align: center;
}
.contact__title {
  font-size: clamp(1.7rem, calc(1.7vw + 1rem), 2.2rem);
}
.contact__form-box {
  max-width: 960px;
  width: 95%;
  margin: 0 auto;
  padding: 25px;
  border-radius: 10px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
}

.contact-form__row > * {
  flex: 1;
}
.contact-form__control {
  position: relative;
  margin-bottom: 20px;
}
.contact-form__label {
  font-size: 13px;
  color: #333;
  display: block;
  padding-bottom: 5px;
}
.contact-form__input {
  display: block;
  width: 100%;
  padding: 10px 5px;
  border-radius: 5px;
  border: 2px solid #999;
}
.contact-form__textarea {
  height: 80px;
  resize: none;
}
.contact-form__textarea:focus {
  outline: 1px solid #fc8019;
}

.contact-form__input:focus {
  border: 2px solid #fc8019;
}

.contact-form__error-message {
  position: absolute;

  font-size: 14px;
  color: rgb(247, 63, 63);
  font-weight: 600;
}
.contact-form__btns-box {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin-top: 25px;
}
.contact-form__btn {
  padding: 10px 20px;
  border-radius: 5px;
  font-size: 14px;
  font-weight: 600;
}
.contact-form__btn--submit {
  background: #fc8019;
  border: 2px solid #fc8019;
  color: #fff;
}
.contact-form__btn--reset {
  border: 2px solid #dedede;
}
.contact-form__btn--submit:not(.active):hover {
  background: hsl(27, 97%, 50%);
}
.contact-form__btn--reset.active,
.contact-form__btn--submit.active {
  opacity: 0.5;
  cursor: not-allowed;
}
.contact-form__btn--reset:not(.active):hover {
  background: #e7e7e7;
  color: #333;
}
@media (min-width: 768px) {
  .contact-form__row {
    display: flex;
    align-items: center;
    gap: 25px;
  }
  .contact-form__label {
    font-size: 15px;
  }
  .contact-form__input {
    padding: 15px 5px;
  }
}
</style>