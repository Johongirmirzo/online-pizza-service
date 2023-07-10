<template>
  <section class="delivery">
    <header class="delivery__header">
      <NuxtLink to="/feedback">
        <Icon name="icon-park-outline:left" />
        Go Back</NuxtLink
      >
      <h1 class="delivery__title">Dine In Feedback</h1>
    </header>
    <div class="delivery__form-box">
      <Form
        @submit="handleGiveDeliveryFeedbackSubmit"
        :validation-schema="createDeliveryFeedbackSchema"
        class="delivery-form"
      >
        <div class="delivery-form__row">
          <div class="delivery-form__control">
            <label class="delivery-form__label" for="fullName">Fullname</label>
            <Field
              type="text"
              name="fullName"
              id="fullName"
              class="delivery-form__input"
              placeholder="Enter Fullname..."
            />
            <ErrorMessage
              name="fullName"
              class="delivery-form__error-message"
            />
          </div>
          <div class="delivery-form__control">
            <label class="delivery-form__label" for="email">Email</label>
            <Field
              type="email"
              name="email"
              id="email"
              class="delivery-form__input"
              placeholder="Enter Email..."
            />
            <ErrorMessage name="email" class="delivery-form__error-message" />
          </div>
        </div>
        <div class="delivery-form__row">
          <div class="delivery-form__control">
            <label class="delivery-form__label" for="mobileNumber"
              >Phone Number</label
            >
            <Field
              type="number"
              name="mobileNumber"
              id="mobileNumber"
              class="delivery-form__input"
              placeholder="Enter Phone Number..."
            />
            <ErrorMessage
              name="mobileNumber"
              class="delivery-form__error-message"
            />
          </div>
          <div class="delivery-form__control">
            <label class="delivery-form__label" for="feedback">Feedback</label>
            <Field
              type="text"
              name="feedback"
              id="feedback"
              class="delivery-form__input"
              placeholder="Enter Feedback..."
            />
            <ErrorMessage
              name="feedback"
              class="delivery-form__error-message"
            />
          </div>
        </div>
        <div class="delivery-form__row">
          <div class="delivery-form__control">
            <label class="delivery-form__label" for="rating">Rating</label>
            <Field
              type="number"
              name="rating"
              id="rating"
              class="delivery-form__input"
              placeholder="Enter rating..."
              @keydown="handlePreventNonNumbers"
            />
            <ErrorMessage name="rating" class="delivery-form__error-message" />
          </div>
          <div class="delivery-form__control">
            <label class="delivery-form__label" for="experience"
              >Experience</label
            >
            <Field
              name="experience"
              id="experience"
              class="delivery-form__input"
              placeholder="Enter Experience..."
            />
            <ErrorMessage
              name="experience"
              class="delivery-form__error-message"
            />
          </div>
        </div>
        <div class="delivery-form__row">
          <div class="delivery-form__control">
            <label class="delivery-form__label" for="dateOfOrder"
              >Date Of Order</label
            >
            <Field
              type="date"
              name="dateOfOrder"
              id="dateOfOrder"
              class="delivery-form__input"
              placeholder="Enter Order Date..."
            />
            <ErrorMessage
              name="dateOfOrder"
              class="delivery-form__error-message"
            />
          </div>
          <div class="delivery-form__control">
            <label class="delivery-form__label" for="timeOfOrder"
              >Time Of Order</label
            >
            <Field
              type="time"
              name="timeOfOrder"
              id="timeOfOrder"
              class="delivery-form__input"
              placeholder="Enter Visit Time..."
            />
            <ErrorMessage
              name="timeOfOrder"
              class="delivery-form__error-message"
            />
          </div>
        </div>
        <div class="delivery-form__row">
          <div class="delivery-form__control">
            <label class="delivery-form__label" for="feedbackOn"
              >Feedback Type</label
            >
            <Field
              as="select"
              class="delivery-form__input"
              name="feedbackOn"
              id="feedbackOn"
            >
              <option value="">Seelct Feedback Type</option>
              <option value="HOSPITALITY">Hospitality</option>
              <option value="ACCURACY">Accuracy</option>
              <option value="SPEED">Speed</option>
              <option value="CALL_CENTRE">Call Centre</option>
              <option value="PRODUCT_QUALITY">Product Quality</option>
              <option value="ONLINE_ORDER">Online Order</option>
            </Field>
            <ErrorMessage
              name="feedbackOn"
              class="delivery-form__error-message"
            />
          </div>
          <div class="delivery-form__control">
            <label class="delivery-form__label" for="feedbackOnChoice"
              >Feedback Type Explanation</label
            >
            <Field
              type="text"
              class="delivery-form__input"
              name="feedbackOnChoice"
              id="feedbackOnChoice"
            />
            <ErrorMessage
              name="feedbackOnChoice"
              class="delivery-form__error-message"
            />
          </div>
        </div>
        <div class="delivery-form__radio-box">
          <p class="delivery-form__radio-title">Please Choose a Gender</p>
          <label for="male" class="delivery-form__radio-label"
            >Male
            <Field
              type="radio"
              class="delivery-form__radio-input"
              id="male"
              name="gender"
              value="MALE"
            />
          </label>
          <label for="female" class="delivery-form__radio-label"
            >Female
            <Field
              type="radio"
              class="delivery-form__radio-input"
              id="female"
              name="gender"
              value="FEMALE"
            />
          </label>
          <p>
            <ErrorMessage name="gender" class="delivery-form__error-message" />
          </p>
        </div>
        <div class="delivery-form__btns-box">
          <button
            type="reset"
            class="delivery-form__btn delivery-form__btn--reset"
          >
            Reset
          </button>
          <button
            type="submit"
            class="delivery-form__btn delivery-form__btn--submit"
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
import { createDeliveryFeedbackSchema } from "~/validations";
import { IFeedback, IDineIn } from "~/types/feedback";
import { Form, Field, ErrorMessage } from "vee-validate";

const { $toast } = useNuxtApp();

const handleGiveDeliveryFeedbackSubmit = (deliveryFeedback: IFeedback) => {
  const feedbackData = {
    type: "DELIVERY",
    fullName: deliveryFeedback.fullName,
    email: deliveryFeedback.email,
    mobileNumber: deliveryFeedback.mobileNumber.toString(),
    feedback: deliveryFeedback.feedback,
    rating: deliveryFeedback.rating,
    experience: deliveryFeedback.experience,
    gender: deliveryFeedback.gender,
    feedbackTypeData: {
      dateOfOrder: deliveryFeedback.dateOfOrder,
      timeOfOrder: deliveryFeedback.timeOfOrder,
      feedbackOn: deliveryFeedback.feedbackOn,
      feedbackOnChoice: deliveryFeedback.feedbackOnChoice,
    },
  };

  socket.emit("create-feedback", feedbackData);
  socket.on("new-feedback", () => {
    $toast.success("Your Feedback is Received!");
    setTimeout(() => navigateTo("/feedback"), 2000);
  });
};
</script>
<style scoped>
.delivery {
  margin: 50px 0 100px 0;
}
.delivery__header {
  margin-bottom: 35px;
}
.delivery__title {
  text-align: center;
  font-size: clamp(1.4rem, calc(1.5vw + 1rem), 2rem);
  font-weight: 600;
}
.delivery__form-box {
  max-width: 960px;
  width: 95%;
  margin: 0 auto;
  padding: 25px;
  border-radius: 10px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
}
.delivery-form__row {
  display: flex;
  align-items: center;
  gap: 25px;
}
.delivery-form__row > * {
  flex: 1;
}
.delivery-form__control {
  position: relative;
  margin-bottom: 20px;
}
.delivery-form__label {
  font-size: 13px;
  color: #333;
  display: block;
  padding-bottom: 5px;
}
.delivery-form__input {
  display: block;
  width: 100%;
  padding: 10px 5px;
  border-radius: 5px;
  border: 2px solid #999;
}
.delivery-form__textarea {
  height: 80px;
  resize: none;
}
.delivery-form__textarea:focus {
  outline: 1px solid #fc8019;
}

.delivery-form__input:focus {
  border: 2px solid #fc8019;
}

.delivery-form__error-message {
  position: absolute;
  font-size: 14px;
  color: rgb(247, 63, 63);
  font-weight: 600;
}
.delivery-form__btns-box {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin-top: 50px;
}
.delivery-form__btn {
  padding: 10px 20px;
  border-radius: 5px;
  font-size: 14px;
  font-weight: 600;
}
.delivery-form__btn--submit {
  background: #fc8019;
  border: 2px solid #fc8019;
  color: #fff;
}
.delivery-form__btn--reset {
  border: 2px solid #dedede;
}
.delivery-form__btn--submit:not(.active):hover {
  background: hsl(27, 97%, 50%);
}
.delivery-form__btn--reset.active,
.delivery-form__btn--submit.active {
  opacity: 0.5;
  cursor: not-allowed;
}
.delivery-form__btn--reset:not(.active):hover {
  background: #e7e7e7;
  color: #333;
}

.delivery-form__radio-box {
  margin-bottom: 25px;
}
.delivery-form__radio-title {
  margin-bottom: 10px;
  font-size: 17px;
  color: #333;
}
.delivery-form__radio-label {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  margin-right: 15px;
}
.delivery-form__radio-input {
  transform: scale(1.2);
}
.delivery-form__radio-input:after {
  width: 18px;
  height: 18px;
  border-radius: 18px;
  top: -2px;
  left: -2px;
  position: relative;
  background-color: #d1d3d1;
  content: "";
  display: inline-block;
  visibility: visible;
  border: 2px solid white;
}

.delivery-form__radio-input:checked:after {
  width: 18px;
  height: 18px;
  border-radius: 18px;
  top: -2px;
  left: -2px;
  position: relative;
  background-color: #ffa500;
  content: "";
  display: inline-block;
  visibility: visible;
  border: 2px solid white;
}
</style>