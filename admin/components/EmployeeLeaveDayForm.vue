<template>
  <Form
    @submit="handleSubmitForm"
    :validation-schema="validationSchema"
    :initial-values="initialValues"
    class="employee-leave-day-form"
  >
    <div class="employee-leave-day-form__control">
      <label for="employeeId" class="employee-leave-day-form__label"
        >Select Employee For Leave</label
      >
      <Field
        as="select"
        :disabled="!isCreatingLeaveDay"
        name="employeeId"
        id="employeeId"
        class="employee-leave-day-form__input"
        placeholder="Leave day employee..."
      >
        <option value="">Select Employee For Leave</option>
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
        class="employee-leave-day-form__error-message"
      />
    </div>
    <div class="employee-leave-day-form__row">
      <div class="employee-leave-day-form__control">
        <label for="reason" class="employee-leave-day-form__label"
          >Reason</label
        >
        <Field
          type="text"
          name="reason"
          id="reason"
          class="employee-leave-day-form__input"
          placeholder="Leave day reason..."
        />
        <ErrorMessage
          name="reason"
          class="employee-leave-day-form__error-message"
        />
      </div>
      <div class="employee-leave-day-form__control">
        <label for="leaveType" class="employee-leave-day-form__label"
          >Leave Type</label
        >
        <Field
          as="select"
          name="leaveType"
          id="leaveType"
          class="employee-leave-day-form__input"
        >
          <option value="">Select Leave Type</option>
          <option value="CASUAL_LEAVE">Casual Leave</option>
          <option value="HOSPITALIZATION">Hospitalization</option>
          <option value="LOP">Lop</option>
          <option value="PATERNITY_LEAVE">Paternity Leave</option>
          <option value="MEDICAL_LEAVE">Medical Leave</option>
          <option value="FAMILY">Family</option>
          <option value="OTHER">Other</option>
        </Field>
        <ErrorMessage
          name="leaveType"
          class="employee-leave-day-form__error-message"
        />
      </div>
    </div>

    <div class="employee-leave-day-form__row">
      <div class="employee-leave-day-form__control">
        <label for="from" class="employee-leave-day-form__label">From</label>
        <Field
          type="date"
          name="from"
          id="from"
          class="employee-leave-day-form__input"
        />
        <ErrorMessage
          name="from"
          class="employee-leave-day-form__error-message"
        />
      </div>
      <div class="employee-leave-day-form__control">
        <label for="to" class="employee-leave-day-form__label">To</label>
        <Field
          type="date"
          name="to"
          id="to"
          class="employee-leave-day-form__input"
        />
        <ErrorMessage
          name="to"
          class="employee-leave-day-form__error-message"
        />
      </div>
    </div>
    <div class="employee-leave-day-form__btns-box">
      <button
        type="submit"
        class="employee-leave-day-form__btn employee-leave-day-form__create-btn"
        :disabled="isLoading"
        :class="{ active: isLoading }"
      >
        <span v-if="isLoading">
          <span v-if="isCreatingLeaveDay"> Creating Leave Day... </span>
          <span v-else>Editing Leave Day...</span>
        </span>
        <span v-else>
          <span v-if="isCreatingLeaveDay"> Create Leave Day </span>
          <span v-else> Edit Leave Day </span>
        </span>
      </button>
      <button
        type="reset"
        class="employee-leave-day-form__btn employee-leave-day-form__reset-btn"
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
  "initialValues",
  "isCreatingLeaveDay",
  "isLoading",
  "employees",
]);
</script>
  <style scoped>
.employee-leave-day-form__row > * {
  flex: 1;
}
.employee-leave-day-form__control {
  position: relative;
  margin-bottom: 15px;
}
.employee-leave-day-form__label {
  font-size: 13px;
  color: #333;
  display: block;
  padding-bottom: 5px;
}
.employee-leave-day-form__input {
  display: block;
  width: 100%;
  padding: 8px 3px;
  border-radius: 5px;
  border: 2px solid #999;
}
.employee-leave-day-form__textarea:focus,
.employee-leave-day-form__input:focus {
  border: 2px solid #fc8019;
}
.employee-leave-day-form__textarea {
  height: 70px;
  word-break: break-word;
  outline-color: #fc8019;
}

.employee-leave-day-form__error-message {
  font-size: 14px;
  color: rgb(247, 63, 63);
  font-weight: 600;
}
.employee-leave-day-form__btns-box {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin-top: 40px;
}
.employee-leave-day-form__btn {
  padding: 10px 15px;
  border-radius: 5px;
  font-size: 14px;
  font-weight: 600;
}
.employee-leave-day-form__create-btn {
  background: #fc8019;
  border: 2px solid #fc8019;
  color: #fff;
}
.employee-leave-day-form__create-btn:not(.active):hover {
  background: hsl(27, 97%, 50%);
}
.employee-leave-day-form__create-btn.active,
.employee-leave-day-form__reset-btn.active {
  opacity: 0.5;
  cursor: not-allowed;
}
.employee-leave-day-form__reset-btn {
  border: 2px solid #dedede;
}
.employee-leave-day-form__reset-btn:not(.active):hover {
  background: #e7e7e7;
  color: #333;
}

@media (min-width: 992px) {
  .employee-leave-day-form__row {
    display: flex;
    align-items: center;
    gap: 25px;
  }
  .employee-leave-day-form__control {
    margin-bottom: 25px;
  }
  .employee-leave-day-form__label {
    font-size: 15px;
  }
  .employee-leave-day-form__input {
    padding: 15px 5px;
  }
  .employee-leave-day-form__btns-box {
    margin-top: 40px;
  }
  .employee-leave-day-form__btn {
    padding: 10px 20px;
    font-size: 16px;
  }
  .employee-leave-day-form__error-message {
    position: absolute;
  }
}
</style>