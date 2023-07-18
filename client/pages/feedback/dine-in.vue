<template>
  <section class="dine-in">
    <header class="dine-in__header">
      <NuxtLink to="/feedback">
        <Icon name="icon-park-outline:left" />
        Go Back</NuxtLink
      >
      <h1 class="dine-in__title">Dine In Feedback</h1>
    </header>
    <div class="dine-in__form-box">
      <Form
        @submit="handleGiveDineInFeedbackSubmit"
        :validation-schema="createDineInFeedbackSchema"
        class="dine-in-form"
      >
        <div class="dine-in-form__row">
          <div class="dine-in-form__control">
            <label class="dine-in-form__label" for="fullName">Fullname</label>
            <Field
              type="text"
              name="fullName"
              id="fullName"
              class="dine-in-form__input"
              placeholder="Enter Fullname..."
            />
            <ErrorMessage name="fullName" class="dine-in-form__error-message" />
          </div>
          <div class="dine-in-form__control">
            <label class="dine-in-form__label" for="email">Email</label>
            <Field
              type="email"
              name="email"
              id="email"
              class="dine-in-form__input"
              placeholder="Enter Email..."
            />
            <ErrorMessage name="email" class="dine-in-form__error-message" />
          </div>
        </div>
        <div class="dine-in-form__row">
          <div class="dine-in-form__control">
            <label class="dine-in-form__label" for="mobileNumber"
              >Phone Number</label
            >
            <Field
              type="number"
              name="mobileNumber"
              id="mobileNumber"
              class="dine-in-form__input"
              placeholder="Enter Phone Number..."
            />
            <ErrorMessage
              name="mobileNumber"
              class="dine-in-form__error-message"
            />
          </div>
          <div class="dine-in-form__control">
            <label class="dine-in-form__label" for="feedback">Feedback</label>
            <Field
              type="text"
              name="feedback"
              id="feedback"
              class="dine-in-form__input"
              placeholder="Enter Feedback..."
            />
            <ErrorMessage name="feedback" class="dine-in-form__error-message" />
          </div>
        </div>
        <div class="dine-in-form__row">
          <div class="dine-in-form__control">
            <label class="dine-in-form__label" for="rating">Rating</label>
            <Field
              type="number"
              name="rating"
              id="rating"
              class="dine-in-form__input"
              placeholder="Enter rating..."
              @keydown="handlePreventNonNumbers"
            />
            <ErrorMessage name="rating" class="dine-in-form__error-message" />
          </div>
          <div class="dine-in-form__control">
            <label class="dine-in-form__label" for="experience"
              >Experience</label
            >
            <Field
              name="experience"
              id="experience"
              class="dine-in-form__input"
              placeholder="Enter Experience..."
            />
            <ErrorMessage
              name="experience"
              class="dine-in-form__error-message"
            />
          </div>
        </div>
        <div class="dine-in-form__row">
          <div class="dine-in-form__control">
            <label class="dine-in-form__label" for="dateOfVisit"
              >Date Of Visit</label
            >
            <Field
              type="date"
              name="dateOfVisit"
              id="dateOfVisit"
              class="dine-in-form__input"
              placeholder="Enter Visit Date..."
            />
            <ErrorMessage
              name="dateOfVisit"
              class="dine-in-form__error-message"
            />
          </div>
          <div class="dine-in-form__control">
            <label class="dine-in-form__label" for="timeOfVisit"
              >Time Of Visit</label
            >
            <Field
              type="time"
              name="timeOfVisit"
              id="timeOfVisit"
              class="dine-in-form__input"
              placeholder="Enter Visit Time..."
            />
            <ErrorMessage
              name="timeOfVisit"
              class="dine-in-form__error-message"
            />
          </div>
        </div>
        <div class="dine-in-form__row">
          <div class="dine-in-form__control">
            <label class="dine-in-form__label" for="visitAmount"
              >Visit Amount</label
            >
            <Field
              as="select"
              class="dine-in-form__input"
              name="visitAmount"
              id="visitAmount"
            >
              <option value="">Seelct Visit Amount</option>
              <option value="WEEKLY">Weekly</option>
              <option value="MONTHLY">Monthly</option>
              <option value="OCCASIONALY">Occasionaly</option>
              <option value="FIRST_TIME">First Time</option>
            </Field>
            <ErrorMessage
              name="visitAmount"
              class="dine-in-form__error-message"
            />
          </div>
        </div>
        <div class="dine-in-form__radio-box">
          <p class="dine-in-form__radio-title">Please Choose a Gender</p>
          <label for="male" class="dine-in-form__radio-label"
            >Male
            <Field
              type="radio"
              class="dine-in-form__radio-input"
              id="male"
              name="gender"
              value="MALE"
            />
          </label>
          <label for="female" class="dine-in-form__radio-label"
            >Female
            <Field
              type="radio"
              class="dine-in-form__radio-input"
              id="female"
              name="gender"
              value="FEMALE"
            />
          </label>
          <p>
            <ErrorMessage name="gender" class="dine-in-form__error-message" />
          </p>
        </div>
        <div class="dine-in-form__btns-box">
          <button
            type="reset"
            class="dine-in-form__btn dine-in-form__btn--reset"
          >
            Reset
          </button>
          <button
            type="submit"
            class="dine-in-form__btn dine-in-form__btn--submit"
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
import { createDineInFeedbackSchema } from "~/validations";
import { IFeedback, IDineIn } from "~/types/feedback";
import { Form, Field, ErrorMessage } from "vee-validate";

const { $toast } = useNuxtApp();

const handleGiveDineInFeedbackSubmit = (dineInFeedback: IFeedback) => {
  console.log(dineInFeedback);

  const feedbackData = {
    type: "DINE_IN",
    fullName: dineInFeedback.fullName,
    email: dineInFeedback.email,
    mobileNumber: dineInFeedback.mobileNumber.toString(),
    feedback: dineInFeedback.feedback,
    rating: dineInFeedback.rating,
    experience: dineInFeedback.experience,
    gender: dineInFeedback.gender,
    feedbackTypeData: {
      dateOfVisit: dineInFeedback.dateOfVisit,
      timeOfVisit: dineInFeedback.timeOfVisit,
      visitAmount: dineInFeedback.visitAmount,
    },
  };

  socket.emit("create-feedback", feedbackData);
  socket.on("new-feedback", () => {
    $toast.success("Your Feedback is Received!");
    setTimeout(() => navigateTo("/feedback"), 2000);
  });

  console.log(feedbackData);
};
</script>
<style scoped>
.dine-in {
  margin: 50px 0 100px 0;
}
.dine-in__header {
  margin-bottom: 35px;
}
.dine-in__title {
  text-align: center;
  font-size: clamp(1.4rem, calc(1.5vw + 1rem), 2rem);
  font-weight: 600;
}
.dine-in__form-box {
  max-width: 960px;
  width: 95%;
  margin: 0 auto;
  padding: 25px;
  border-radius: 10px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
}

.dine-in-form__row > * {
  flex: 1;
}
.dine-in-form__control {
  position: relative;
  margin-bottom: 20px;
}
.dine-in-form__label {
  font-size: 13px;
  color: #333;
  display: block;
  padding-bottom: 5px;
}
.dine-in-form__input {
  display: block;
  width: 100%;
  padding: 10px 5px;
  border-radius: 5px;
  border: 2px solid #999;
}
.dine-in-form__textarea {
  height: 80px;
  resize: none;
}
.dine-in-form__textarea:focus {
  outline: 1px solid #fc8019;
}

.dine-in-form__input:focus {
  border: 2px solid #fc8019;
}

.dine-in-form__error-message {
  font-size: 14px;
  color: rgb(247, 63, 63);
  font-weight: 600;
}
.dine-in-form__btns-box {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin-top: 50px;
}
.dine-in-form__btn {
  padding: 10px 20px;
  border-radius: 5px;
  font-size: 14px;
  font-weight: 600;
}
.dine-in-form__btn--submit {
  background: #fc8019;
  border: 2px solid #fc8019;
  color: #fff;
}
.dine-in-form__btn--reset {
  border: 2px solid #dedede;
}
.dine-in-form__btn--submit:not(.active):hover {
  background: hsl(27, 97%, 50%);
}
.dine-in-form__btn--reset.active,
.dine-in-form__btn--submit.active {
  opacity: 0.5;
  cursor: not-allowed;
}
.dine-in-form__btn--reset:not(.active):hover {
  background: #e7e7e7;
  color: #333;
}

.dine-in-form__radio-box {
  margin-bottom: 25px;
}
.dine-in-form__radio-title {
  margin-bottom: 10px;
  font-size: 17px;
  color: #333;
}
.dine-in-form__radio-label {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  margin-right: 15px;
}
.dine-in-form__radio-input {
  transform: scale(1.2);
}
.dine-in-form__radio-input:after {
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

.dine-in-form__radio-input:checked:after {
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

@media (min-width: 768px) {
  .dine-in-form__row {
    display: flex;
    align-items: center;
    gap: 25px;
  }
  .dine-in-form__error-message {
    position: absolute;
  }
  .dine-in-form__label {
    font-size: 15px;
  }
  .dine-in-form__input {
    padding: 15px 5px;
  }
}
</style>