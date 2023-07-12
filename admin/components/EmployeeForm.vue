<template>
  <div class="employee__form-box">
    <Form
      @submit="handleFormSubmit"
      class="employee-form"
      :validation-schema="validationSchema"
      :initial-values="initialValues"
    >
      <div class="employee-form__file-box">
        <img
          v-if="initialValues?.photo"
          :src="initialValues.photo"
          class="employee-form__img"
          :alt="initialValues.name"
        />
        <label for="employeePhoto" class="employee-form__label"
          >Upload Employee Photo</label
        >
        <Field
          type="file"
          class="employee-form__input employee-form__file-input"
          id="employeePhoto"
          name="employeePhoto"
          placeholder="Add employee photo..."
        />
        <ErrorMessage
          name="employeePhoto"
          class="employee-form__error-message"
        />
      </div>
      <div class="employee-form__row">
        <div class="employee-form__control">
          <label for="firstname" class="employee-form__label">First Name</label>
          <Field
            type="text"
            class="employee-form__input"
            id="firstname"
            name="firstname"
            placeholder="Add employee firstname..."
          />
          <ErrorMessage name="firstname" class="employee-form__error-message" />
        </div>
        <div class="employee-form__control">
          <label for="lastname" class="employee-form__label">Last Name</label>
          <Field
            type="text"
            class="employee-form__input"
            id="lastname"
            name="lastname"
            placeholder="Add employee lastname..."
          />
          <ErrorMessage name="lastname" class="employee-form__error-message" />
        </div>
      </div>
      <div class="employee-form__row">
        <div class="employee-form__control">
          <label for="email" class="employee-form__label">Email</label>
          <Field
            type="email"
            class="employee-form__input"
            id="email"
            name="email"
            placeholder="Add employee email..."
          />
          <ErrorMessage name="email" class="employee-form__error-message" />
        </div>
        <div class="employee-form__control">
          <label for="phoneNumber" class="employee-form__label"
            >Phone Number</label
          >
          <Field
            type="number"
            @keydown="handleEnableCorrectInput"
            class="employee-form__input"
            id="phoneNumber"
            name="phoneNumber"
            placeholder="Add employee phoneNumber..."
          />
          <ErrorMessage
            name="phoneNumber"
            class="employee-form__error-message"
          />
        </div>
      </div>
      <div class="employee-form__row">
        <div class="employee-form__control">
          <label for="salary" class="employee-form__label">Salary</label>
          <Field
            type="number"
            class="employee-form__input"
            id="salary"
            name="salary"
            placeholder="Add employee salary..."
            @keydown="handlePreventNonNumbers"
          />
          <ErrorMessage name="salary" class="employee-form__error-message" />
        </div>
        <div class="employee-form__control">
          <label for="city" class="employee-form__label">City</label>
          <Field
            type="text"
            class="employee-form__input"
            id="city"
            name="city"
            placeholder="Add employee city..."
          />
          <ErrorMessage name="city" class="employee-form__error-message" />
        </div>
      </div>
      <div class="employee-form__row">
        <div class="employee-form__control">
          <label for="addressLine1" class="employee-form__label"
            >Address Line 1</label
          >
          <Field
            type="text"
            class="employee-form__input"
            id="addressLine1"
            name="addressLine1"
            placeholder="Add employee addressLine1..."
          />
          <ErrorMessage
            name="addressLine1"
            class="employee-form__error-message"
          />
        </div>
        <div class="employee-form__control">
          <label for="addressLine2" class="employee-form__label"
            >Address Line 2</label
          >
          <Field
            type="text"
            class="employee-form__input"
            id="addressLine2"
            name="addressLine2"
            placeholder="Add employee addressLine2..."
          />
          <ErrorMessage
            name="addressLine2"
            class="employee-form__error-message"
          />
        </div>
      </div>
      <div class="employee-form__row">
        <div class="employee-form__control">
          <label for="birthDate" class="employee-form__label">Birth Date</label>
          <Field
            type="date"
            class="employee-form__input"
            id="birthDate"
            name="birthDate"
            placeholder="Add employee phone..."
          />

          <ErrorMessage name="birthDate" class="employee-form__error-message" />
        </div>
        <div class="employee-form__control">
          <label for="role" class="employee-form__label"
            >Select Employee Role</label
          >
          <Field
            as="select"
            class="employee-form__input employee-form__select"
            id="role"
            name="role"
          >
            <option value="TEAM_MEMBER">Team Member</option>
            <option value="DRIVER">Driver</option>
            <option value="MANAGER">Manager</option>
            <option value="AREA_COACH">Area Coach</option>
          </Field>
          <ErrorMessage name="role" class="employee-form__error-message" />
        </div>
      </div>
      <div class="employee-form__row">
        <div class="employee-form__radio-box">
          <p class="employee-form__radio-title">
            Please Choose Employee Gender
          </p>
          <label for="male" class="employee-form__radio-label"
            >Male
            <Field
              type="radio"
              class="employee-form__radio-input"
              id="male"
              name="gender"
              value="MALE"
            />
          </label>
          <label for="female" class="employee-form__radio-label"
            >Female
            <Field
              type="radio"
              class="employee-form__radio-input"
              id="female"
              name="gender"
              value="FEMALE"
            />
          </label>
          <ErrorMessage name="gender" class="employee-form__error-message" />
        </div>
        <div class="employee-form__radio-box">
          <p class="employee-form__radio-title">
            Please Choose Employee Marital Status
          </p>
          <label for="married" class="employee-form__radio-label"
            >Married
            <Field
              type="radio"
              class="employee-form__radio-input"
              id="married"
              name="maritalStatus"
              value="MARRIED"
            />
          </label>
          <label for="single" class="employee-form__radio-label"
            >Single
            <Field
              type="radio"
              class="employee-form__radio-input"
              id="single"
              name="maritalStatus"
              value="SINGLE"
            />
          </label>
          <ErrorMessage
            name="maritalStatus"
            class="employee-form__error-message"
          />
        </div>
      </div>
      <div class="employee-form__control">
        <p class="employee-form__emergency-title">
          Add an employee emergancy contact
        </p>
        <FieldArray name="emergancyContacts" v-slot="{ fields, push, remove }">
          <div
            v-for="(employee, idx) in fields"
            :key="employee.key"
            class="employee-form__emergency-box"
          >
            <fieldset>
              <figcaption class="employee-form__emergency-caption">
                Employee Emergency Contact
              </figcaption>
              <div class="employee-form__row">
                <div class="employee-form__control">
                  <label :for="`fullname_${idx}`" class="employee-form__label"
                    >Fullname</label
                  >

                  <Field
                    type="text"
                    class="employee-form__input"
                    :id="`fullname_${idx}`"
                    :name="`emergancyContacts[${idx}].fullname`"
                    placeholder="Contact name"
                    @keydown="handlePreventFormSubmission('', $event)"
                  />
                  <ErrorMessage
                    class="employee-form__error-message"
                    :name="`emergancyContacts[${idx}].fullname`"
                  />
                </div>
                <div class="employee-form__control">
                  <div class="employee-form__control">
                    <label
                      :for="`relationship_${idx}`"
                      class="employee-form__label"
                      >Relationship</label
                    >
                    <Field
                      type="text"
                      class="employee-form__input"
                      :id="`relationship_${idx}`"
                      :name="`emergancyContacts[${idx}].relationship`"
                      placeholder="Relationship"
                      @keydown="handlePreventFormSubmission('', $event)"
                    />
                    <ErrorMessage
                      class="employee-form__error-message"
                      :name="`emergancyContacts[${idx}].relationship`"
                    />
                  </div>
                </div>
              </div>
              <div class="employee-form__row">
                <div class="employee-form__control">
                  <label
                    :for="`phoneNumber_${idx}`"
                    class="employee-form__label"
                    >Phone Number</label
                  >
                  <Field
                    type="number"
                    class="employee-form__input"
                    :id="`phoneNumber_${idx}`"
                    :name="`emergancyContacts[${idx}].phoneNumber`"
                    placeholder="Phone number"
                    @keydown="handlePreventFormSubmission('number', $event)"
                  />
                  <ErrorMessage
                    class="employee-form__error-message"
                    :name="`emergancyContacts[${idx}].phoneNumber`"
                  />
                </div>
                <div class="employee-form__control">
                  <div class="employee-form__control">
                    <label
                      :for="`workPhone_${idx}`"
                      class="employee-form__label"
                      >Work Phone</label
                    >
                    <Field
                      type="number"
                      class="employee-form__input"
                      :id="`workPhone_${idx}`"
                      :name="`emergancyContacts[${idx}].workPhone`"
                      placeholder="Work Phone"
                      @keydown="handlePreventFormSubmission('number', $event)"
                    />
                    <ErrorMessage
                      class="employee-form__error-message"
                      :name="`emergancyContacts[${idx}].workPhone`"
                    />
                  </div>
                </div>
              </div>
              <div class="employee-form__row">
                <div class="employee-form__control">
                  <label :for="`notes_${idx}`" class="employee-form__label"
                    >Notes</label
                  >
                  <Field
                    type="text"
                    class="employee-form__input"
                    :id="`notes_${idx}`"
                    :name="`emergancyContacts[${idx}].notes`"
                    placeholder="Note"
                    @keydown="handlePreventFormSubmission('', $event)"
                  />
                  <ErrorMessage
                    class="employee-form__error-message"
                    :name="`emergancyContacts[${idx}].notes`"
                  />
                </div>
                <div class="employee-form__control">
                  <div class="employee-form__control">
                    <label
                      :for="`contactType_${idx}`"
                      class="employee-form__label"
                      >Contact Type</label
                    >
                    <Field
                      as="select"
                      class="employee-form__input"
                      :id="`contactType_${idx}`"
                      :name="`emergancyContacts[${idx}].contactType`"
                      placeholder="Contact Type"
                      @keydown="handlePreventFormSubmission('', $event)"
                    >
                      <option value="PRIMARY">Primary</option>
                      <option value="SECONDARY">Secondary</option>
                      <option value="LEAST_IMPORTANT">Least Important</option>
                    </Field>
                    <ErrorMessage
                      class="employee-form__error-message"
                      :name="`emergancyContacts[${idx}].contactType`"
                    />
                  </div>
                </div>
              </div>
              <div class="employee-form__row">
                <div class="employee-form__control">
                  <label
                    :for="`addressLine1_${idx}`"
                    class="employee-form__label"
                    >Address Line 1</label
                  >
                  <Field
                    type="text"
                    class="employee-form__input"
                    :id="`adressLine1_${idx}`"
                    :name="`emergancyContacts[${idx}].addressLine1`"
                    placeholder="Adress Line 1"
                    @keydown="handlePreventFormSubmission('', $event)"
                  />
                  <ErrorMessage
                    class="employee-form__error-message"
                    :name="`emergancyContacts[${idx}].addressLine1`"
                  />
                </div>
                <div class="employee-form__control">
                  <div class="employee-form__control">
                    <label
                      :for="`addressLine2_${idx}`"
                      class="employee-form__label"
                      >Address Line 2</label
                    >
                    <Field
                      type="text"
                      class="employee-form__input"
                      :id="`addressLine2_${idx}`"
                      :name="`emergancyContacts[${idx}].addressLine2`"
                      placeholder="Work Phone"
                      @keydown="handlePreventFormSubmission('', $event)"
                    />
                    <ErrorMessage
                      class="employee-form__error-message"
                      :name="`emergancyContacts[${idx}].addressLine2`"
                    />
                  </div>
                </div>
              </div>
              <div class="employee-form__control">
                <div class="employee-form__control">
                  <label :for="`email_${idx}`" class="employee-form__label"
                    >Email</label
                  >
                  <Field
                    type="email"
                    class="employee-form__input"
                    :id="`email_${idx}`"
                    :name="`emergancyContacts[${idx}].email`"
                    placeholder="Email"
                    @keydown="handlePreventFormSubmission('', $event)"
                  />
                  <ErrorMessage
                    class="employee-form__error-message"
                    :name="`emergancyContacts[${idx}].email`"
                  />
                </div>
              </div>
            </fieldset>
            <button
              @click="remove(idx)"
              class="employee-form__emergency-btn employee-form__remove-emergency-btn"
            >
              Remove
            </button>
          </div>
          <div class="employee-form__emergency-btns-box">
            <button
              v-if="fields.length < 4"
              class="employee-form__emergency-btn employee-form__add-emergency-btn"
              @click.stop="
                push({
                  id: uuid(),
                  name: '',
                  relationship: '',
                  phoneNumber: '',
                  workPhone: '',
                  email: '',
                  addressLine1: '',
                  addressLine2: '',
                  notes: '',
                  contactType: '',
                })
              "
            >
              Add Emergency Contact
            </button>
          </div>
        </FieldArray>
      </div>
      <div class="employee-form__btns-box">
        <button
          type="submit"
          class="employee-form__btn employee-form__create-btn"
          :disabled="isLoading"
          :class="{ active: isLoading }"
        >
          <span v-if="isLoading">
            <span v-if="isCreatingEmployee"> Creating employee... </span>
            <span v-else>Editing employee...</span>
          </span>
          <span v-else>
            <span v-if="isCreatingEmployee"> Create employee </span>
            <span v-else> Edit employee </span>
          </span>
        </button>
        <button
          type="reset"
          class="employee-form__btn employee-form__reset-btn"
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
import { Form, Field, ErrorMessage, FieldArray } from "vee-validate";
import { v4 as uuid } from "uuid";
import { handlePreventNonNumbers } from "~/utils/handlePreventNumbers";
defineProps([
  "handleFormSubmit",
  "validationSchema",
  "isLoading",
  "isCreatingEmployee",
  "initialValues",
]);

const handleEnableCorrectInput = (evt: any) =>
  ["-", "e", "E"].includes(evt.key) && evt.preventDefault();

const handlePreventFormSubmission = (inputType: string, evt: any) => {
  if (inputType === "number") {
    return handlePreventNonNumbers(evt);
  }
  if (evt.key === "Enter") {
    evt.preventDefault();
  }
};
</script>
<style scoped>
.employee__form-box {
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
.employee-form__img {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 5px;
  cursor: pointer;
}

.employee-form__row > * {
  flex: 1;
}
.employee-form__control {
  position: relative;
  margin-bottom: 15px;
}

.employee-form__file-box {
  margin-bottom: 30px;
}
.employee-form__label {
  font-size: 13px;
  color: #333;
  display: block;
  padding-bottom: 5px;
}
.employee-form__input,
.employee-form__file-input {
  display: block;
  width: 100%;
  padding: 8px 3px;
  border-radius: 5px;
  border: 2px solid #999;
}
.employee-form__input:not(.employee-form__select):focus {
  border: 2px solid #fc8019;
}
.employee-form__select:focus {
  outline-color: #fc8019;
}
.employee-form__radio-box {
  margin-bottom: 25px;
}
.employee-form__error-message {
  position: absolute;
  font-size: 14px;
  color: rgb(247, 63, 63);
  font-weight: 600;
}
.employee-form__radio-title {
  margin-bottom: 10px;
  font-size: 17px;
  color: #333;
}
.employee-form__radio-label {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  margin-right: 15px;
}
.employee-form__radio-input {
  transform: scale(1.2);
}
.employee-form__radio-input:after {
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

.employee-form__radio-input:checked:after {
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
.employee-form__emergency-box {
  margin-bottom: 25px;
}
.employee-form__btns-box {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin-top: 50px;
}
.employee-form__emergency-title {
  margin: 25px 0 15px 0;
  font-size: 17px;
}
.employee-form__emergency-btns-box {
  margin-top: 25px;
  display: flex;
  align-items: center;
  gap: 20px;
}
.employee-form__emergency-btn {
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
  border: 1px solid #333;
  font-size: 15px;
}
.employee-form__remove-emergency-btn {
  margin-top: 0;
  margin-bottom: 20px;
}
.employee-form__emergency-caption {
  margin-bottom: 10px;
}
.employee-form__emergency-btn {
  padding: 10px;
  border-radius: 5px;
  transition: all 0.3s ease-out;
}
.employee-form__remove-emergency-btn:hover,
.employee-form__add-emergency-btn:hover {
  background: rgba(0, 0, 0, 0.05);
}
.employee-form__btn {
  padding: 10px 15px;
  border-radius: 5px;
  font-size: 14px;
  font-weight: 600;
}
.employee-form__create-btn {
  background: #fc8019;
  border: 2px solid #fc8019;
  color: #fff;
}
.employee-form__create-btn:not(.active):hover {
  background: hsl(27, 97%, 50%);
}
.employee-form__create-btn.active,
.employee-form__reset-btn.active {
  opacity: 0.5;
  cursor: not-allowed;
}
.employee-form__reset-btn {
  border: 2px solid #dedede;
}
.employee-form__reset-btn:not(.active):hover {
  background: #e7e7e7;
  color: #333;
}

@media (min-width: 560px) {
  .employee-form__remove-emergency-btn {
    margin-top: 15px;
    margin-bottom: 25px;
  }
}
@media (min-width: 992px) {
  .employee-form__row {
    display: flex;
    align-items: center;
    gap: 25px;
    margin-bottom: 30px;
  }
  .employee-form__control {
    margin-bottom: 0;
  }
  .employee-form__label {
    font-size: 15px;
  }
  .employee-form__input,
  .employee-form__file-input {
    padding: 15px 5px;
  }
  .employee-form__emergency-title {
    font-size: 20px;
  }
  .employee-form__btn {
    padding: 15px 25px;
    font-size: 16px;
  }
  .employee-form__remove-emergency-btn {
    margin-top: 25px;
    margin-bottom: 15px;
  }
}
</style>