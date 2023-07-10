<template>
  <div class="topping__form-box">
    <Form
      @submit="handleFormSubmit"
      :validation-schema="validationSchema"
      :initial-values="initialValues"
      class="topping-form"
    >
      <div class="topping-form__control topping-form__name-box">
        <label for="name" class="topping-form__label">Topping Name</label>
        <Field
          type="text"
          class="topping-form__input"
          id="name"
          name="name"
          placeholder="Add topping phone..."
        />
        <ErrorMessage name="name" class="topping-form__error-message" />
      </div>
      <div class="topping-form__row">
        <div class="topping-form__control">
          <label for="light" class="topping-form__label">Light</label>
          <Field
            @keydown="handlePreventNonNumbers"
            type="number"
            pattern="[0-9]*"
            min="0"
            class="topping-form__input"
            id="light"
            name="light"
            placeholder="Add topping phone..."
          />
          <ErrorMessage name="light" class="topping-form__error-message" />
        </div>
        <div class="topping-form__control">
          <label for="standard" class="topping-form__label">Standard</label>
          <Field
            @keydown="handlePreventNonNumbers"
            type="number"
            min="0"
            class="topping-form__input"
            id="standard"
            name="standard"
            placeholder="Add topping phone..."
          />
          <ErrorMessage name="standard" class="topping-form__error-message" />
        </div>
      </div>
      <div class="topping-form__row">
        <div class="topping-form__control">
          <label for="extra" class="topping-form__label">Extra</label>
          <Field
            @keydown="handlePreventNonNumbers"
            type="number"
            min="0"
            class="topping-form__input"
            id="extra"
            name="extra"
            placeholder="Add topping phone..."
          />
          <ErrorMessage name="extra" class="topping-form__error-message" />
        </div>
        <div class="topping-form__control">
          <label for="double" class="topping-form__label">Double</label>
          <Field
            @keydown="handlePreventNonNumbers"
            type="number"
            min="0"
            class="topping-form__input"
            id="double"
            name="double"
            placeholder="Add topping phone..."
          />
          <ErrorMessage name="double" class="topping-form__error-message" />
        </div>
      </div>
      <div class="topping-form__row">
        <div class="topping-form__control">
          <label for="type" class="topping-form__label"
            >Change Topping Type</label
          >
          <Field
            as="select"
            class="topping-form__input topping-form__select"
            id="type"
            name="type"
          >
            <option value="STANDARD">Standard</option>
            <option value="EXTRA">Extra</option>
          </Field>
          <ErrorMessage name="type" class="topping-form__error-message" />
        </div>
        <div class="topping-form__control">
          <label for="forPizzaSize" class="topping-form__label"
            >Change Pizza Size</label
          >
          <Field
            as="select"
            class="topping-form__input topping-form__select"
            id="forPizzaSize"
            name="forPizzaSize"
          >
            <option value="SMALL">Small</option>
            <option value="MEDIUM">Medium</option>
            <option value="LARGE">Large</option>
          </Field>
          <ErrorMessage
            name="forPizzaSize"
            class="topping-form__error-message"
          />
        </div>
      </div>
      <div class="topping-form__btns-box">
        <button
          type="submit"
          class="topping-form__btn topping-form__create-btn"
          :disabled="isLoading"
          :class="{ active: isLoading }"
        >
          <span v-if="isLoading">
            <span v-if="isCreatingTopping"> Creating Topping... </span>
            <span v-else>Editing Topping...</span>
          </span>
          <span v-else>
            <span v-if="isCreatingTopping"> Create Topping </span>
            <span v-else> Edit Topping </span>
          </span>
        </button>
        <button
          type="reset"
          class="topping-form__btn topping-form__reset-btn"
          :disabled="isLoading"
          :class="{ active: isLoading }"
        >
          Reset
        </button>
      </div>
    </Form>
  </div>
</template>
<script setup lang="ts">
import { Form, Field, ErrorMessage } from "vee-validate";
import { handlePreventNonNumbers } from "~/utils/handlePreventNumbers";
defineProps([
  "handleFormSubmit",
  "validationSchema",
  "isLoading",
  "isCreatingTopping",
  "initialValues",
]);
</script>
<style scoped>
.topping__form-box {
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
.topping-form__img {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 5px;
  cursor: pointer;
}
.topping-form__control {
  position: relative;
  margin-bottom: 15px;
}
.topping-form__row,
.topping-form__name-box {
  margin-bottom: 25px;
}
.topping-form__row > * {
  flex: 1;
}

.topping-form__label {
  font-size: 13px;
  color: #333;
  display: block;
  padding-bottom: 5px;
}
.topping-form__input,
.topping-form__file-input {
  display: block;
  width: 100%;
  padding: 8px 3px;
  border-radius: 5px;
  border: 2px solid #999;
}
.topping-form__input:not(.topping-form__select):focus {
  border: 2px solid #fc8019;
}
.topping-form__select:focus {
  outline-color: #fc8019;
}
.topping-form__error-message {
  font-size: 14px;
  color: rgb(247, 63, 63);
  font-weight: 600;
}
.topping-form__btns-box {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin-top: 35px;
}
.topping-form__btn {
  padding: 10px 15px;
  border-radius: 5px;
  font-size: 14px;
  font-weight: 600;
}
.topping-form__create-btn {
  background: #fc8019;
  border: 2px solid #fc8019;
  color: #fff;
}
.topping-form__create-btn:not(.active):hover {
  background: hsl(27, 97%, 50%);
}
.topping-form__create-btn.active,
.topping-form__reset-btn.active {
  opacity: 0.5;
  cursor: not-allowed;
}
.topping-form__reset-btn {
  border: 2px solid #dedede;
}
.topping-form__reset-btn:not(.active):hover {
  background: #e7e7e7;
  color: #333;
}

@media (min-width: 992px) {
  .topping-form__row {
    display: flex;
    align-items: center;
    gap: 25px;
  }
  .topping-form__control {
    margin-bottom: 25px;
  }
  .topping-form__btn {
    padding: 15px 25px;
  }
  .topping-form__label {
    font-size: 15px;
  }
  .topping-form__input,
  .topping-form__file-input {
    padding: 15px 5px;
  }
  .topping-form__btn {
    font-size: 16px;
  }
  .topping-form__error-message {
    position: absolute;
  }
}
</style>