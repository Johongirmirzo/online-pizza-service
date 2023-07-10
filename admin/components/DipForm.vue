<template>
  <Form
    @submit="handleSubmitForm"
    :validation-schema="validationSchema"
    :initial-values="initialValues"
    class="add-dip-form"
  >
    <div class="add-dip-form__control">
      <img
        v-if="initialValues.photo"
        :src="initialValues.photo"
        :alt="initialValues?.type"
        class="add-dip-form__img"
      />
      <label for="dip-photo" class="add-dip-form__label"
        >Upload Dip Photo</label
      >
      <Field
        type="file"
        name="dip-photo"
        id="dip-photo"
        class="add-dip-form__input"
      />
      <ErrorMessage name="dip-photo" class="add-dip-form__error-message" />
    </div>
    <div class="add-dip-form__row">
      <div class="add-dip-form__control">
        <label for="categoryId" class="add-dip-form__label"
          >Choose Category</label
        >
        <Field
          as="select"
          name="categoryId"
          id="categoryId"
          class="add-dip-form__input"
        >
          <option value="">Select Category</option>
          <option
            v-for="category in categories"
            :key="category.id"
            :value="category.id"
          >
            {{ category.name }}
          </option>
        </Field>
        <ErrorMessage name="categoryId" class="add-dip-form__error-message" />
      </div>
      <div class="add-dip-form__control">
        <label for="type" class="add-dip-form__label">Dip Type</label>
        <Field
          type="text"
          name="type"
          id="type"
          class="add-dip-form__input"
          placeholder="Enter Dip Type..."
        />
        <ErrorMessage name="type" class="add-dip-form__error-message" />
      </div>
    </div>
    <div class="add-dip-form__row">
      <div class="add-dip-form__control">
        <label for="weight" class="add-dip-form__label">Weight</label>
        <Field
          type="number"
          name="weight"
          id="weight"
          class="add-dip-form__input"
          placeholder="Please Enter weight..."
          @keydown="handlePreventNonNumbers"
        />
        <ErrorMessage name="weight" class="add-dip-form__error-message" />
      </div>
      <div class="add-dip-form__control">
        <label for="price" class="add-dip-form__label">Price</label>
        <Field
          type="number"
          name="price"
          id="price"
          class="add-dip-form__input"
          placeholder="Please Enter Price..."
          @keydown="handlePreventNonNumbers"
        />
        <ErrorMessage name="price" class="add-dip-form__error-message" />
      </div>
    </div>
    <div class="add-dip-form__radio-box">
      <p class="add-dip-form__radio-title">Choose Either Vegan or Non-Vegan</p>
      <div class="add-dip-form__radio-text-box">
        <label for="vegan" class="add-dip-form__radio-label"
          >Vegan
          <Field
            type="radio"
            class="add-dip-form__radio-input"
            id="vegan"
            name="vegan"
            :value="true"
          />
        </label>
        <label for="non-vegan" class="add-dip-form__radio-label"
          >Non-Vegan
          <Field
            type="radio"
            class="add-dip-form__radio-input"
            id="non-vegan"
            name="vegan"
            :value="false"
          />
        </label>
      </div>
      <ErrorMessage name="vegan" class="add-dip-form__error-message" />
    </div>
    <div class="add-dip-form__nutritional-value-box">
      <h5 class="add-dip-form__nutritional-value-title">
        Provide Nutritional Value for per 100g
      </h5>
    </div>
    <div class="add-dip-form__row">
      <div class="add-dip-form__control">
        <label for="calorie" class="add-dip-form__label">Calorie</label>
        <Field
          type="number"
          name="calorie"
          id="calorie"
          class="add-dip-form__input"
          placeholder="Please Enter Calories Amount..."
          @keydown="handlePreventNonNumbers"
        />
        <ErrorMessage name="calorie" class="add-dip-form__error-message" />
      </div>
      <div class="add-dip-form__control">
        <label for="fats" class="add-dip-form__label">Fats</label>
        <Field
          type="number"
          name="fats"
          id="fats"
          class="add-dip-form__input"
          placeholder="Please Enter Fats Amount..."
          @keydown="handlePreventNonNumbers"
        />
        <ErrorMessage name="fats" class="add-dip-form__error-message" />
      </div>
    </div>
    <div class="add-dip-form__row">
      <div class="add-dip-form__control">
        <label for="proteins" class="add-dip-form__label">Proteins</label>
        <Field
          type="number"
          name="proteins"
          id="proteins"
          class="add-dip-form__input"
          placeholder="Please Enter Proteins Amount..."
          @keydown="handlePreventNonNumbers"
        />
        <ErrorMessage name="proteins" class="add-dip-form__error-message" />
      </div>
      <div class="add-dip-form__control">
        <label for="carbohydrates" class="add-dip-form__label"
          >Carbohydrates</label
        >
        <Field
          type="number"
          name="carbohydrates"
          id="carbohydrates"
          class="add-dip-form__input"
          placeholder="Please Enter Carbohydrates Amount..."
          @keydown="handlePreventNonNumbers"
        />
        <ErrorMessage
          name="carbohydrates"
          class="add-dip-form__error-message"
        />
      </div>
    </div>

    <div class="add-dip-form__btns-box">
      <button
        type="submit"
        class="add-dip-form__btn add-dip-form__create-btn"
        :disabled="isLoading"
        :class="{ active: isLoading }"
      >
        <span v-if="isLoading">
          <span v-if="isCreatingDip"> Creating Dip... </span>
          <span v-else>Editing Dip...</span>
        </span>
        <span v-else>
          <span v-if="isCreatingDip"> Create Dip </span>
          <span v-else> Edit Dip </span>
        </span>
      </button>
      <button
        type="reset"
        class="add-dip-form__btn add-dip-form__reset-btn"
        :disabled="isLoading"
        :class="{ active: isLoading }"
      >
        Reset
      </button>
    </div>
  </Form>
</template>
  <script setup lang="ts">
import { Form, Field, ErrorMessage } from "vee-validate";
import { handlePreventNonNumbers } from "~/utils/handlePreventNumbers";

defineProps([
  "handleSubmitForm",
  "validationSchema",
  "categories",
  "initialValues",
  "isCreatingDip",
  "isLoading",
]);
</script>
  <style scoped>
.add-dip-form__row > * {
  flex: 1;
}
.add-dip-form__img {
  width: 100px;
  height: 100px;
  cursor: pointer;
}
.add-dip-form__control {
  position: relative;
  margin-bottom: 15px;
}
.add-dip-form__label {
  font-size: 13px;
  color: #333;
  display: block;
  padding-bottom: 5px;
}
.add-dip-form__input {
  display: block;
  width: 100%;
  padding: 8px 3px;
  border-radius: 5px;
  border: 2px solid #999;
}
.add-dip-form__radio-title {
  font-size: 17px;
  margin-bottom: 10px;
}
.add-dip-form__input:focus {
  border: 2px solid #fc8019;
}
.add-dip-form__radio-box {
  margin-bottom: 35px;
}
.add-dip-form__radio-text-box {
  display: flex;
  gap: 25px;
  align-items: center;
}
.add-dip-form__radio-input {
  transform: scale(1.2);
}
.add-dip-form__radio-input:after {
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

.add-dip-form__radio-input:checked:after {
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

.add-dip-form__nutritional-value-box {
  margin-bottom: 10px;
}
.add-dip-form__error-message {
  font-size: 14px;
  color: rgb(247, 63, 63);
  font-weight: 600;
}
.add-dip-form__btns-box {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin-top: 25px;
}
.add-dip-form__btn {
  padding: 10px 20px;
  border-radius: 5px;
  font-size: 14px;
  font-weight: 600;
}
.add-dip-form__create-btn {
  background: #fc8019;
  border: 2px solid #fc8019;
  color: #fff;
}
.add-dip-form__create-btn:not(.active):hover {
  background: hsl(27, 97%, 50%);
}
.add-dip-form__create-btn.active,
.add-dip-form__reset-btn.active {
  opacity: 0.5;
  cursor: not-allowed;
}
.add-dip-form__reset-btn {
  border: 2px solid #dedede;
}
.add-dip-form__reset-btn:not(.active):hover {
  background: #e7e7e7;
  color: #333;
}

@media (min-width: 992px) {
  .add-dip-form__row {
    display: flex;
    align-items: center;
    gap: 25px;
  }
  .add-dip-form__control {
    margin-bottom: 25px;
  }
  .add-dip-form__btn {
    font-size: 16px;
  }
  .add-dip-form__label {
    font-size: 15px;
  }
  .add-dip-form__input {
    padding: 15px 5px;
  }
  .add-dip-form__error-message {
    position: absolute;
  }
}
</style>