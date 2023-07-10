<template>
  <Form
    :validation-schema="validationSchema"
    :initial-values="initialValues"
    @submit="handleSubmitForm"
    class="address-form"
  >
    <div class="address-form__control">
      <label for="streetName" class="address-form__label">Street & House</label>
      <Field
        class="address-form__input"
        name="streetName"
        id="streetName"
        placeholder="Enter street and house"
      />
      <ErrorMessage class="address-form__error-message" name="streetName" />
    </div>
    <div class="address-form__row">
      <div class="address-form__control">
        <label for="approach" class="address-form__label">Approach</label>
        <Field
          class="address-form__input"
          name="approach"
          id="approach"
          placeholder="Enter approach"
        />
        <ErrorMessage class="address-form__error-message" name="approach" />
      </div>
      <div class="address-form__control">
        <label for="doorCode" class="address-form__label">Door Code</label>
        <Field
          class="address-form__input"
          name="doorCode"
          id="doorCode"
          placeholder="Enter door code"
        />
        <ErrorMessage class="address-form__error-message" name="doorCode" />
      </div>
    </div>
    <div class="address-form__row">
      <div class="address-form__control">
        <label for="floor" class="address-form__label">Floor</label>
        <Field
          class="address-form__input"
          name="floor"
          id="floor"
          placeholder="Enter fllor"
        />
        <ErrorMessage class="address-form__error-message" name="floor" />
      </div>
      <div class="address-form__control">
        <label for="apartmentNumber" class="address-form__label"
          >Apartment Number</label
        >
        <Field
          class="address-form__input"
          name="apartmentNumber"
          id="apartmentNumber"
          placeholder="Enter street and house"
        />
        <ErrorMessage
          class="address-form__error-message"
          name="apartmentNumber"
        />
      </div>
    </div>
    <div class="address-form__control">
      <label for="comment" class="address-form__label">Comment</label>
      <Field
        class="address-form__input"
        name="comment"
        id="comment"
        placeholder="Enter street and house"
      />
      <ErrorMessage class="address-form__error-message" name="comment" />
    </div>
    <div class="address-form__btns-box">
      <button
        type="reset"
        class="address-form__btn address-form__btn--reset"
        :class="{ active: isLoading }"
      >
        Reset
      </button>
      <button
        type="button"
        v-if="editAddressId !== -1"
        @click="handleDeleteAddressClick(editAddressId)"
        class="address-form__btn address-form__btn--delete"
        :class="{ active: isLoading }"
      >
        Delete
      </button>
      <button
        type="submit"
        class="address-form__btn address-form__btn--add"
        :class="{ active: isLoading }"
      >
        <span v-if="isLoading">
          <span v-if="isCreatingAddress">Adding address...</span>
          <span v-else>Editing address...</span>
        </span>
        <span v-else>
          <span v-if="isCreatingAddress">Add address</span>
          <span v-else>Edit address</span>
        </span>
      </button>
    </div>
  </Form>
</template>
<script setup lang="ts">
import { Form, Field, ErrorMessage } from "vee-validate";
defineProps([
  "validationSchema",
  "initialValues",
  "handleSubmitForm",
  "isLoading",
  "isCreatingAddress",
  "handleDeleteAddressClick",
  "editAddressId",
]);
</script>
<style scoped>
.address-form__control {
  margin-bottom: 15px;
  position: relative;
}
.address-form__label {
  font-size: 13px;
  color: #333;
  display: block;
  padding-bottom: 5px;
}
.address-form__input {
  display: block;
  width: 100%;
  padding: 8px 3px;
  border-radius: 5px;
  border: 2px solid #999;
}
.address-form__radio-title {
  font-size: 17px;
  margin-bottom: 10px;
}
.address-form__input:focus {
  border: 2px solid #fc8019;
}
.address-form__radio-box {
  margin-bottom: 35px;
}
.address-form__radio-text-box {
  display: flex;
  gap: 25px;
  align-items: center;
}
.address-form__radio-input {
  transform: scale(1.2);
}
.address-form__radio-input:after {
  width: 20px;
  height: 20px;
  border-radius: 5px;
  top: -2px;
  left: -2px;
  position: relative;
  background-color: #d1d3d1;
  content: "";
  display: inline-block;
  visibility: visible;
  border: 2px solid white;
}

.address-form__radio-input:checked:after {
  width: 20px;
  height: 20px;
  border-radius: 5px;
  top: -2px;
  left: -2px;
  position: relative;
  background-color: #ffa500;
  content: "";
  display: inline-block;
  visibility: visible;
  border: 2px solid white;
}

.address-form__nutritional-value-box {
  margin-bottom: 10px;
}
.address-form__error-message {
  display: block;
  font-size: 14px;
  color: rgb(247, 63, 63);
  font-weight: 600;
  line-height: 1.2;
  margin-top: 5px;
}
.address-form__btns-box {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin-top: 35px;
}
.address-form__btn {
  padding: 10px 20px;
  border-radius: 5px;
  font-size: 14px;
  font-weight: 600;
}
.address-form__btn.active {
  opacity: 0.5;
  cursor: not-allowed;
}
.address-form__create-btn {
  background: #fc8019;
  border: 2px solid #fc8019;
  color: #fff;
}
.address-form__create-btn:not(.active):hover {
  background: hsl(27, 97%, 50%);
}
.address-form__create-btn.active,
.address-form__reset-btn.active {
  opacity: 0.5;
  cursor: not-allowed;
}
.address-form__reset-btn {
  border: 2px solid #dedede;
}
.address-form__reset-btn:not(.active):hover {
  background: #e7e7e7;
  color: #333;
}
.address-form__btns-box {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 15px;
}
.address-form__btn {
  padding: 12px 20px;
  font-size: 17px;
  border-radius: 5px;
  transition: all 0.3s ease-out;
}
.address-form__btn--reset {
  border: 1px solid #555;
  color: #333;
}
.address-form__btn--delete {
  background: rgb(230, 34, 34);
  color: #fff;
}
.address-form__btn--add {
  color: #fff;
  background: #fc8019;
}
.address-form__btn-add:hover {
  background: #e97211;
}

@media (min-width: 992px) {
  .address-form__row {
    display: flex;
    align-items: center;
    gap: 25px;
  }
  .address-form__control {
    margin-bottom: 30px;
    flex: 1;
  }
  .address-form__btn {
    font-size: 16px;
  }
  .address-form__label {
    font-size: 15px;
  }
  .address-form__input {
    padding: 15px 5px;
  }
  .address-form__error-message {
    position: absolute;
  }
}
</style>