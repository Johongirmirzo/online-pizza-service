<template>
  <div class="category__form-box">
    <Form
      class="category-form"
      @submit="handleCategoryFormSubmit"
      :validation-schema="validationSchema"
      :initial-values="initialValues"
    >
      <figure class="category-form__img-box">
        <img
          v-if="initialValues.photo"
          class="category-form__img"
          :src="initialValues.photo"
          :alt="initialValues.name"
        />
      </figure>
      <div class="category-form__control category-form__box">
        <label for="category-photo" class="category-form__label"
          >Upload Category Photo</label
        >
        <Field
          type="file"
          id="category-photo"
          name="category-photo"
          class="category-form__input category-form__file-input"
          placeholder="Category Name"
        />
        <ErrorMessage
          name="category-photo"
          class="category-form__error-message"
        />
      </div>
      <div class="category-form__row">
        <div class="category-form__control">
          <label for="name" class="category-form__label">Category Name</label>
          <Field
            type="text"
            id="name"
            name="name"
            class="category-form__input"
            placeholder="Category Name"
          />
          <ErrorMessage name="name" class="category-form__error-message" />
        </div>
        <div class="category-form__control category-form__box">
          <label for="description" class="category-form__label"
            >Category Description</label
          >
          <Field
            name="description"
            class="category-form__description"
            id="description"
            placeholder="Category Description"
          />
          <ErrorMessage
            name="description"
            class="category-form__error-message"
          />
        </div>
      </div>
      <div class="category-form__btns-box">
        <button
          :disabled="isLoading"
          type="submit"
          class="category-form__btn category-form__submit-btn"
        >
          <span v-if="isLoading">
            <span v-if="isCreatingCategory"> Creating Category... </span>
            <span v-else>Editing Category...</span>
          </span>
          <span v-else>
            <span v-if="isCreatingCategory"> Create Category </span>
            <span v-else>Edit Category</span>
          </span>
        </button>
        <button
          :disabled="isLoading"
          type="reset"
          class="category-form__btn category-form__reset-btn"
        >
          Reset
        </button>
      </div>
    </Form>
  </div>
</template>
<script setup lang="ts">
import { Form, Field, ErrorMessage } from "vee-validate";
defineProps([
  "handleCategoryFormSubmit",
  "validationSchema",
  "isLoading",
  "initialValues",
  "isCreatingCategory",
]);
</script>
<style scoped>
.category__form-box {
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
.category-form__img {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 5px;
  cursor: pointer;
}

.category-form__row > * {
  flex: 1;
}
.category-form__control {
  position: relative;
  margin-bottom: 15px;
}
.category-form__file-box {
  margin-bottom: 30px;
}
.category-form__label {
  font-size: 13px;
  color: #333;
  display: block;
  padding-bottom: 5px;
}
.category-form__input,
.category-form__file-input,
.category-form__description {
  display: block;
  width: 100%;
  padding: 8px 3px;
  border-radius: 5px;
  border: 2px solid #999;
}
.category-form__description {
  resize: none;
  transition: all 0.3s ease-out;
}
.category-form__description:focus {
  outline: #fc8019;
  border: 2px solid #fc8019;
}
.category-form__input:not(.category-form__select):focus {
  border: 2px solid #fc8019;
}

.category-form__error-message {
  font-size: 14px;
  color: rgb(247, 63, 63);
  font-weight: 600;
}
.category-form__btns-box {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: flex-start;
  align-items: center;
  margin-top: 35px;
}
.category-form__btn {
  padding: 10px 15px;
  border-radius: 5px;
  font-size: 14px;
  font-weight: 600;
}
.category-form__btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
.category-form__submit-btn {
  background: #fc8019;
  border: 2px solid #fc8019;
  color: #fff;
}
.category-form__submit-btn:not(.active, :disabled):hover {
  background: hsl(27, 97%, 50%);
}
.category-form__submit-btn.active,
.category-form__reset-btn.active {
  opacity: 0.5;
  cursor: not-allowed;
}
.category-form__reset-btn {
  border: 2px solid #dedede;
}
.category-form__reset-btn:not(.active, :disabled):hover {
  background: #e7e7e7;
  color: #333;
}
@media (min-width: 992px) {
  .category-form__row {
    display: flex;
    align-items: center;
    gap: 25px;
    margin-bottom: 30px;
  }
  .category-form__control {
    margin-bottom: 25px;
  }
  .category-form__label {
    font-size: 15px;
  }
  .category-form__input,
  .category-form__file-input,
  .category-form__description {
    padding: 15px 5px;
  }
  .category-form__btn {
    padding: 15px 25px;
    font-size: 15px;
  }
  .category-form__error-message {
    position: absolute;
  }
}
</style>