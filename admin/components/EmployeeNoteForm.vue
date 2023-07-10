<template>
  <Form
    @submit="handleSubmitForm"
    :validation-schema="validationSchema"
    :initial-values="initialValues"
    class="employee-note-form"
  >
    <div class="employee-note-form__control">
      <label for="employee" class="employee-note-form__label"
        >Select Employee For Note</label
      >
      <Field
        as="select"
        :disabled="!isCreatingNote"
        :value="initialValues.employeeId"
        name="employeeId"
        id="employee"
        class="employee-note-form__input"
      >
        <option value="">Select Employee</option>
        <option
          v-for="employee in employees"
          :key="employee.id"
          :value="employee.id"
        >
          {{ employee.firstname }} {{ employee.lastname }} - {{ employee.role }}
        </option>
      </Field>
      <ErrorMessage
        name="employeeId"
        class="employee-note-form__error-message"
      />
    </div>
    <div class="employee-note-form__control">
      <label for="date" class="employee-note-form__label">Note Date</label>
      <Field
        type="date"
        name="date"
        id="date"
        class="employee-note-form__input"
      />
      <ErrorMessage name="date" class="employee-note-form__error-message" />
    </div>
    <div class="employee-note-form__control">
      <label for="note" class="employee-note-form__label">Note</label>
      <Field
        as="textarea"
        type="textarea"
        name="note"
        id="note"
        class="employee-note-form__input employee-note-form__textarea"
        placeholder="Add Employee Note..."
      />
      <ErrorMessage name="note" class="employee-note-form__error-message" />
    </div>
    <div class="employee-note-form__btns-box">
      <button
        type="submit"
        class="employee-note-form__btn employee-note-form__create-btn"
        :disabled="isLoading"
        :class="{ active: isLoading }"
      >
        <span v-if="isLoading">
          <span v-if="isCreatingNote"> Creating Note... </span>
          <span v-else>Editing Note...</span>
        </span>
        <span v-else>
          <span v-if="isCreatingNote"> Create Note </span>
          <span v-else> Edit Note </span>
        </span>
      </button>
      <button
        type="reset"
        class="employee-note-form__btn employee-note-form__reset-btn"
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
defineProps([
  "handleSubmitForm",
  "validationSchema",
  "initialValues",
  "isCreatingNote",
  "isLoading",
  "employees",
]);
</script>
<style scoped>
.employee-note-form__control {
  position: relative;
  margin-bottom: 15px;
}
.employee-note-form__label {
  font-size: 13px;
  color: #333;
  display: block;
  padding-bottom: 5px;
}
.employee-note-form__input {
  display: block;
  width: 100%;
  padding: 8px 3px;
  border-radius: 5px;
  border: 2px solid #999;
}
.employee-note-form__textarea:focus,
.employee-note-form__input:focus {
  border: 2px solid #fc8019;
}
.employee-note-form__textarea {
  height: 70px;
  word-break: break-word;
  outline-color: #fc8019;
}

.employee-note-form__error-message {
  font-size: 14px;
  color: rgb(247, 63, 63);
  font-weight: 600;
}
.employee-note-form__btns-box {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin-top: 40px;
}
.employee-note-form__btn {
  padding: 10px 15px;
  border-radius: 5px;
  font-size: 14px;
  font-weight: 600;
}
.employee-note-form__create-btn {
  background: #fc8019;
  border: 2px solid #fc8019;
  color: #fff;
}
.employee-note-form__create-btn:not(.active):hover {
  background: hsl(27, 97%, 50%);
}
.employee-note-form__create-btn.active,
.employee-note-form__reset-btn.active {
  opacity: 0.5;
  cursor: not-allowed;
}
.employee-note-form__reset-btn {
  border: 2px solid #dedede;
}
.employee-note-form__reset-btn:not(.active):hover {
  background: #e7e7e7;
  color: #333;
}

@media (min-width: 992px) {
  .employee-note-form__control {
    margin-bottom: 25px;
  }
  .employee-note-form__label {
    font-size: 15px;
  }
  .employee-note-form__input {
    padding: 15px 5px;
  }
  .employee-note-form__btn {
    padding: 10px 20px;
    font-size: 16px;
  }
  .employee-note-form__error-message {
    position: absolute;
  }
}
</style>