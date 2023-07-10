<template>
  <section class="manager">
    <header class="manager__header">
      <NuxtLink to="/careers">
        <Icon name="icon-park-outline:left" />
        Go Back</NuxtLink
      >
      <h1 class="manager__title">{{ title }}</h1>
    </header>
    <div class="manager__form-box">
      <Form
        :validation-schema="validationSchema"
        @submit="handleFormSubmit"
        class="manager-form"
        v-slot="{ values }"
      >
        <h3 class="manager-form__title">Personal Information</h3>
        <div class="manager-form__row">
          <div class="manager-form__control manager-form__file-box">
            <label for="applicantPhoto" class="manager-form__label"
              >Upload Your Photo</label
            >
            <Field
              type="file"
              class="manager-form__input manager-form__file-input"
              id="applicantPhoto"
              name="applicantPhoto"
            />
            <ErrorMessage
              name="applicantPhoto"
              class="manager-form__error-message"
            />
          </div>
          <div class="manager-form__control manager-form__file-box">
            <label for="passportPhoto" class="manager-form__label"
              >Upload Passport Photo</label
            >
            <Field
              type="file"
              class="manager-form__input manager-form__file-input"
              id="passportPhoto"
              name="passportPhoto"
            />
            <ErrorMessage
              name="passportPhoto"
              class="manager-form__error-message"
            />
          </div>
        </div>
        <div class="manager-form__row">
          <div class="manager-form__control manager-form__file-box">
            <label for="panPhoto" class="manager-form__label"
              >Upload Pan Photo</label
            >
            <Field
              type="file"
              class="manager-form__input manager-form__file-input"
              id="panPhoto"
              name="panPhoto"
            />
            <ErrorMessage name="panPhoto" class="manager-form__error-message" />
          </div>
          <div class="manager-form__control manager-form__file-box">
            <label for="resume" class="manager-form__label"
              >Upload Resume Photo</label
            >
            <Field
              type="file"
              class="manager-form__input manager-form__file-input"
              id="resume"
              name="resume"
            />
            <ErrorMessage name="resume" class="manager-form__error-message" />
          </div>
        </div>
        <div class="manager-form__row">
          <div class="manager-form__control">
            <label for="firstname" class="manager-form__label">Firstname</label>
            <Field
              type="text"
              name="firstname"
              class="manager-form__input"
              id="firstname"
              placeholder="Enter Firstname..."
            />
            <ErrorMessage
              name="firstname"
              class="manager-form__error-message"
            />
          </div>
          <div class="manager-form__control">
            <label for="lastname" class="manager-form__label">Lastname</label>
            <Field
              type="text"
              name="lastname"
              class="manager-form__input"
              id="lastname"
              placeholder="Enter Lastname..."
            />
            <ErrorMessage name="lastname" class="manager-form__error-message" />
          </div>
          <div class="manager-form__control">
            <label for="email" class="manager-form__label">Email</label>
            <Field
              type="email"
              name="email"
              class="manager-form__input"
              id="email"
              placeholder="Enter Email..."
            />
            <ErrorMessage name="email" class="manager-form__error-message" />
          </div>
        </div>
        <div class="manager-form__row">
          <div class="manager-form__control">
            <label for="phoneNumber" class="manager-form__label"
              >Phone Number</label
            >
            <Field
              type="number"
              name="phoneNumber"
              class="manager-form__input"
              id="phoneNumber"
              placeholder="Enter Phone Number..."
            />
            <ErrorMessage
              name="phoneNumber"
              class="manager-form__error-message"
            />
          </div>
          <div class="manager-form__control">
            <label for="birthDate" class="manager-form__label"
              >Birth Date</label
            >
            <Field
              type="date"
              name="birthDate"
              class="manager-form__input"
              id="birthDate"
              placeholder="Enter Birth Date..."
            />
            <ErrorMessage
              name="birthDate"
              class="manager-form__error-message"
            />
          </div>
        </div>
        <div class="manager-form__row">
          <div class="manager-form__radio-box">
            <p class="manager-form__radio-title">Please Choose a Gender</p>
            <label for="male" class="manager-form__radio-label"
              >Male
              <Field
                type="radio"
                class="manager-form__radio-input"
                id="male"
                name="gender"
                value="MALE"
              />
            </label>
            <label for="female" class="manager-form__radio-label"
              >Female
              <Field
                type="radio"
                class="manager-form__radio-input"
                id="female"
                name="gender"
                value="FEMALE"
              />
            </label>
            <p>
              <ErrorMessage name="gender" class="manager-form__error-message" />
            </p>
          </div>
          <div class="manager-form__radio-box">
            <p class="manager-form__radio-title">
              Please Choose a Marital Status
            </p>
            <label for="married" class="manager-form__radio-label"
              >Married
              <Field
                type="radio"
                class="manager-form__radio-input"
                id="married"
                name="martialStatus"
                value="MARRIED"
              />
            </label>
            <label for="single" class="manager-form__radio-label"
              >Single
              <Field
                type="radio"
                class="manager-form__radio-input"
                id="single"
                name="martialStatus"
                value="SINGLE"
              />
            </label>
            <p>
              <ErrorMessage
                name="martialStatus"
                class="manager-form__error-message"
              />
            </p>
          </div>
        </div>
        <div class="manager-form__row"></div>
        <div class="manager-form__row">
          <div class="manager-form__control">
            <label for="passportNumber" class="manager-form__label"
              >Passport Number</label
            >
            <Field
              type="text"
              name="passportNumber"
              class="manager-form__input"
              id="passportNumber"
              placeholder="Enter Passport Number..."
            />
            <ErrorMessage
              name="passportNumber"
              class="manager-form__error-message"
            />
          </div>
          <div class="manager-form__control">
            <label for="noticePeriod" class="manager-form__label"
              >Notice Period</label
            >
            <Field
              type="text"
              name="noticePeriod"
              class="manager-form__input"
              id="noticePeriod"
              placeholder="Enter Notice Period..."
            />
            <ErrorMessage
              name="noticePeriod"
              class="manager-form__error-message"
            />
          </div>
          <div class="manager-form__control">
            <label for="dateOfJoining" class="manager-form__label"
              >Date Of Joining</label
            >
            <Field
              type="date"
              name="dateOfJoining"
              class="manager-form__input"
              id="dateOfJoining"
              placeholder="Enter Date of Joining..."
            />
            <ErrorMessage
              name="dateOfJoining"
              class="manager-form__error-message"
            />
          </div>
        </div>
        <div class="manager-form__row">
          <div class="manager-form__control">
            <label for="education" class="manager-form__label">Education</label>
            <Field
              as="select"
              name="education"
              class="manager-form__input"
              id="education"
            >
              <option value="">Select Education</option>
              <option value="NO_EDUCATION">No Education</option>
              <option value="HIGH_SCHOOL">High School</option>
              <option value="GRADUATE">Graduate</option>
              <option value="POST_GRADUATE">Post Graduate</option>
            </Field>
            <ErrorMessage
              name="education"
              class="manager-form__error-message"
            />
          </div>
          <div class="manager-form__control">
            <label for="employmentType" class="manager-form__label"
              >Employment Type</label
            >
            <Field
              as="select"
              name="employmentType"
              class="manager-form__input"
              id="employmentType"
              placeholder="Enter Date of Joining..."
            >
              <option value="">Select Employment Type</option>
              <option value="FULL_TIME">Full Time</option>
              <option value="PART_TIME">Part Time</option>
            </Field>
            <ErrorMessage
              name="employmentType"
              class="manager-form__error-message"
            />
          </div>
        </div>
        <h3 class="manager-form__title">Additional Details</h3>

        <div class="manager-form__row">
          <div class="manager-form__control">
            <label for="panNumber" class="manager-form__label"
              >Pan Number</label
            >
            <Field
              type="text"
              name="panNumber"
              class="manager-form__input"
              id="panNumber"
              placeholder="Enter Pan Number..."
            />
            <ErrorMessage
              name="panNumber"
              class="manager-form__error-message"
            />
          </div>
          <div class="manager-form__control">
            <label for="currentEmployer" class="manager-form__label"
              >Current Employer</label
            >
            <Field
              type="text"
              name="currentEmployer"
              class="manager-form__input"
              id="currentEmployer"
              placeholder="Enter Current Employer..."
            />
            <ErrorMessage
              name="currentEmployer"
              class="manager-form__error-message"
            />
          </div>
          <div class="manager-form__control">
            <label for="currentRole" class="manager-form__label"
              >Current Role</label
            >
            <Field
              type="text"
              name="currentRole"
              class="manager-form__input"
              id="currentRole"
              placeholder="Enter Current Role..."
            />
            <ErrorMessage
              name="currentRole"
              class="manager-form__error-message"
            />
          </div>
        </div>
        <div class="manager-form__row">
          <div class="manager-form__control">
            <label for="currentLocation" class="manager-form__label"
              >Current Location</label
            >
            <Field
              type="text"
              name="currentLocation"
              class="manager-form__input"
              id="currentLocation"
              placeholder="Enter Current Location..."
            />
            <ErrorMessage
              name="currentLocation"
              class="manager-form__error-message"
            />
          </div>
          <div class="manager-form__control">
            <label for="currentCTC" class="manager-form__label"
              >Current CTC</label
            >
            <Field
              type="text"
              name="currentCTC"
              class="manager-form__input"
              id="currentCTC"
              placeholder="Enter Current CTC..."
            />
            <ErrorMessage
              name="currentCTC"
              class="manager-form__error-message"
            />
          </div>
        </div>
        <div class="manager-form__row">
          <div class="manager-form__control">
            <fieldset class="manager-form__fieldset">
              <legend class="manager-form__legend">Computer Skills</legend>
              <label for="excel" class="manager-form__checkbox-label">
                <Field
                  class="manager-form__checkbox-input"
                  type="checkbox"
                  id="excel"
                  name="computerSkills"
                  value="EXCEL"
                />
                EXCEL
              </label>
              <label for="word" class="manager-form__checkbox-label">
                <Field
                  class="manager-form__checkbox-input"
                  type="checkbox"
                  id="word"
                  name="computerSkills"
                  value="WORD"
                />
                WORD
              </label>
              <label for="powerpoint" class="manager-form__checkbox-label">
                <Field
                  class="manager-form__checkbox-input"
                  type="checkbox"
                  id="powerpoint"
                  name="computerSkills"
                  value="POWERPOINT"
                />
                POWERPOINT
              </label>
              <label for="outlook" class="manager-form__checkbox-label">
                <Field
                  class="manager-form__checkbox-input"
                  type="checkbox"
                  id="outlook"
                  name="computerSkills"
                  value="OUTLOOK"
                />
                OUTLOOK
              </label>
            </fieldset>
          </div>
        </div>
        <div class="manager-form__row">
          <div class="manager-form__radio-box">
            <p class="manager-form__radio-title">Do you have a bank account?</p>
            <label for="yes" class="manager-form__radio-label"
              >Yes
              <Field
                type="radio"
                class="manager-form__radio-input"
                id="yes"
                name="hasBankAccount"
                value="true"
              />
            </label>
            <label for="no" class="manager-form__radio-label"
              >No
              <Field
                type="radio"
                class="manager-form__radio-input"
                id="no"
                name="hasBankAccount"
                value="false"
              />
            </label>
            <p>
              <ErrorMessage
                name="hasBankAccount"
                class="manager-form__error-message"
              />
            </p>
          </div>
          <div
            v-if="values.hasBankAccount === 'true'"
            class="manager-form__control"
          >
            <label for="bankAccountName" class="manager-form__label"
              >Bank Name</label
            >
            <Field
              type="text"
              name="bankAccountName"
              class="manager-form__input"
              id="bankAccountName"
              placeholder="Enter Bank Name..."
            />
            <ErrorMessage
              name="bankAccountName"
              class="manager-form__error-message"
            />
          </div>
          <div class="manager-form__control">
            <label for="source" class="manager-form__label">Source</label>
            <Field
              as="select"
              name="source"
              class="manager-form__input"
              id="source"
              placeholder="Enter Bank Name..."
            >
              <option value="">Select Source</option>
              <option value="Walk In">Walk In</option>
              <option value="Friend Inside Pizzeria">
                Friend Inside Pizzeria
              </option>
              <option value="Friend Outside Pizzeria">
                Friend Outside Pizzeria
              </option>
              <option value="Social Media">Social Media</option>
              <option value="Other">Other</option>
            </Field>
            <ErrorMessage name="source" class="manager-form__error-message" />
          </div>
        </div>

        <div class="manager-form__row">
          <fieldset class="manager-form__fieldset">
            <legend class="manager-form__legend">LANGUAGES</legend>
            <div class="manager-form__language-box">
              <p class="manager-form__language-text">UZBEK</p>
              <div>
                <div class="manager-form__language-checkbox-box">
                  <label for="basic.uzbek" class="manager-form__language-label">
                    <Field
                      class="manager-form__radio-input"
                      type="radio"
                      name="languages.uzbek"
                      id="basic.uzbek"
                      value="BASIC"
                    />
                    BASIC
                  </label>
                  <label
                    for="intermediate.uzbek"
                    class="manager-form__language-label"
                  >
                    <Field
                      class="manager-form__radio-input"
                      type="radio"
                      name="languages.uzbek"
                      id="intermediate.uzbek"
                      value="INTERMEDIATE"
                    />
                    INTERMEDIATE
                  </label>
                  <label
                    for="fluent.uzbek"
                    class="manager-form__language-label"
                  >
                    <Field
                      class="manager-form__radio-input"
                      type="radio"
                      name="languages.uzbek"
                      id="fluent.uzbek"
                      value="FLUENT"
                    />
                    FLUENT
                  </label>
                  <label
                    for="native.uzbek"
                    class="manager-form__language-label"
                  >
                    <Field
                      class="manager-form__radio-input"
                      type="radio"
                      name="languages.uzbek"
                      id="native.uzbek"
                      value="NATIVE"
                    />
                    NATIVE
                  </label>
                </div>
                <ErrorMessage
                  name="languages.uzbek"
                  class="manager-form__error-message manager-form__language-error-message"
                />
              </div>
            </div>
            <div class="manager-form__language-box">
              <p class="manager-form__language-text">ENGLISH</p>
              <div>
                <div class="manager-form__language-checkbox-box">
                  <label
                    for="basic.english"
                    class="manager-form__language-label"
                  >
                    <Field
                      class="manager-form__radio-input"
                      type="radio"
                      name="languages.english"
                      id="basic.english"
                      value="BASIC"
                    />
                    BASIC
                  </label>
                  <label
                    for="intermediate.english"
                    class="manager-form__language-label"
                  >
                    <Field
                      class="manager-form__radio-input"
                      type="radio"
                      name="languages.english"
                      id="intermediate.english"
                      value="INTERMEDIATE"
                    />
                    INTERMEDIATE
                  </label>
                  <label
                    for="fluent.english"
                    class="manager-form__language-label"
                  >
                    <Field
                      class="manager-form__radio-input"
                      type="radio"
                      name="languages.english"
                      id="fluent.english"
                      value="FLUENT"
                    />
                    FLUENT
                  </label>
                  <label
                    for="native.english"
                    class="manager-form__language-label"
                  >
                    <Field
                      class="manager-form__radio-input"
                      type="radio"
                      name="languages.english"
                      id="native.english"
                      value="NATIVE"
                    />
                    NATIVE
                  </label>
                </div>
                <ErrorMessage
                  name="languages.english"
                  class="manager-form__error-message manager-form__language-error-message"
                />
              </div>
            </div>
            <div class="manager-form__language-box">
              <p class="manager-form__language-text">RUSSIAN</p>
              <div>
                <div class="manager-form__language-checkbox-box">
                  <label
                    for="basic.russian"
                    class="manager-form__language-label"
                  >
                    <Field
                      class="manager-form__radio-input"
                      type="radio"
                      name="languages.russian"
                      id="basic.russian"
                      value="BASIC"
                    />
                    BASIC
                  </label>
                  <label
                    for="intermediate.russian"
                    class="manager-form__language-label"
                  >
                    <Field
                      class="manager-form__radio-input"
                      type="radio"
                      name="languages.russian"
                      id="intermediate.russian"
                      value="INTERMEDIATE"
                    />
                    INTERMEDIATE
                  </label>
                  <label
                    for="fluent.russian"
                    class="manager-form__language-label"
                  >
                    <Field
                      class="manager-form__radio-input"
                      type="radio"
                      name="languages.russian"
                      id="fluent.russian"
                      value="FLUENT"
                    />
                    FLUENT
                  </label>
                  <label
                    for="native.russian"
                    class="manager-form__language-label"
                  >
                    <Field
                      class="manager-form__radio-input"
                      type="radio"
                      name="languages.russian"
                      id="native.russian"
                      value="NATIVE"
                    />
                    NATIVE
                  </label>
                </div>
                <ErrorMessage
                  name="languages.russian"
                  class="manager-form__error-message manager-form__language-error-message"
                />
              </div>
            </div>
          </fieldset>
        </div>
        <div class="manager-form__experience-box">
          <div class="manager-form__experience-header">
            <p class="manager-form__experience-title">JOB TITLE</p>
            <p class="manager-form__experience-title">COMPANY NAME</p>
            <p class="manager-form__experience-title">START DATE</p>
            <p class="manager-form__experience-title">END DATE</p>
          </div>
          <FieldArray name="experiences" v-slot="{ fields, push, remove }">
            <div
              v-for="(experience, idx) of fields"
              :key="experience.key"
              class="manager-form__experience-input-box"
            >
              <Field
                class="manager-form__experience-input manager-form__input"
                type="text"
                :name="`experiences[${idx}].jobTitle`"
                placeholder="Enter Your Job Title"
              />
              <Field
                class="manager-form__experience-input manager-form__input"
                type="text"
                :name="`experiences[${idx}].companyName`"
                placeholder="Enter Company Name"
              />
              <Field
                class="manager-form__experience-input manager-form__input"
                type="date"
                :name="`experiences[${idx}].startDate`"
                placeholder="Enter Your Job Title"
              />
              <Field
                class="manager-form__experience-input manager-form__input"
                type="date"
                :name="`experiences[${idx}].endDate`"
                placeholder="Enter Your Job Title"
              />
              <button
                @click="remove(idx)"
                title="delete"
                class="manager-form__experience-delete-btn"
              >
                <Icon name="mdi:trash" />
              </button>
            </div>

            <div class="manager-form__experience-footer">
              <button
                @click="
                  push({
                    id: uuid(),
                    jobTitle: '',
                    companyName: '',
                    startDate: '',
                    endDate: '',
                  })
                "
                class="manager-form__add-experience-btn"
              >
                ADD ANOTHER EXPERIENCE
              </button>
            </div>
          </FieldArray>
        </div>
        <div class="manager-form__btns-box">
          <button
            type="reset"
            class="manager-form__btn manager-form__btn--reset"
            :disabled="isLoading"
            :class="{ active: isLoading }"
          >
            Reset
          </button>
          <button
            type="submit"
            class="manager-form__btn manager-form__btn--submit"
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
import { v4 as uuid } from "uuid";
import { Form, Field, FieldArray, ErrorMessage } from "vee-validate";
defineProps(["isLoading", "validationSchema", "title", "handleFormSubmit"]);
</script>
  <style scoped>
.manager {
  margin: 50px 0 150px 0;
}
.manager__header {
  margin-bottom: 20px;
}
.manager__title {
  text-align: center;
  font-size: clamp(1.7rem, calc(1.7vw + 1rem), 2.2rem);
}
.manager__form-box {
  max-width: 960px;
  width: 95%;
  margin: 0 auto;
  padding: 25px;
  border-radius: 10px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
}
.manager-form__row {
  display: flex;
  align-items: center;
  gap: 25px;
}
.manager-form__row > * {
  flex: 1;
}
.manager-form__title {
  font-size: clamp(1.4rem, calc(2vw + 1rem), 2rem);
  margin: 0 0 25px 0;
}
.manager-form__control {
  position: relative;
  margin-bottom: 20px;
}
.manager-form__label {
  font-size: 13px;
  color: #333;
  display: block;
  padding-bottom: 5px;
}
.manager-form__input {
  display: block;
  width: 100%;
  padding: 10px 5px;
  border-radius: 5px;
  border: 2px solid #999;
}
.manager-form__textarea {
  height: 80px;
  resize: none;
}
.manager-form__textarea:focus {
  outline: 1px solid #fc8019;
}

.manager-form__input:focus {
  border: 2px solid #fc8019;
}
.manager-form__file-input {
  display: block;
  width: 100%;
  padding: 8px 3px;
  border-radius: 5px;
  border: 2px solid #999;
}

.manager-form__radio-box {
  margin-bottom: 25px;
}
.manager-form__radio-title {
  margin-bottom: 10px;
  font-size: 17px;
  color: #333;
}
.manager-form__checkbox-label,
.manager-form__radio-label {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  margin-right: 25px;
}
.manager-form__radio-input {
  transform: scale(1.2);
}

.manager-form__checkbox-input:after,
.manager-form__radio-input:after {
  top: -2px;
  left: -2px;
  position: relative;
  background-color: #d1d3d1;
  content: "";
  display: inline-block;
  visibility: visible;
  border: 2px solid white;
}
.manager-form__checkbox-input:checked:after,
.manager-form__radio-input:checked:after {
  top: -2px;
  left: -2px;
  position: relative;
  background-color: #ffa500;
  content: "";
  visibility: visible;
  border: 2px solid white;
}

.manager-form__radio-input:after,
.manager-form__radio-input:checked:after {
  border-radius: 18px;
  width: 18px;
  height: 18px;
}

.manager-form__checkbox-input:after,
.manager-form__checkbox-input:checked:after {
  width: 20px;
  height: 20px;
}
.manager-form__fieldset {
  padding: 15px;
  border: 1px solid #999;
}
.manager-form__language-fieldset {
  max-width: 95%;
  width: 95%;
}
.manager-form__legend {
  padding: 0 10px;
}
.manager-form__language-box {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.manager-form__language-box:not(:last-child) {
  margin-bottom: 25px;
}
.manager-form__language-checkbox-box {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 25px;
}
.manager-form__language-label {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
}
.manager-form__experience-box {
  margin-top: 25px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
}
.manager-form__experience-header,
.manager-form__experience-input-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.manager-form__experience-input-box {
  margin-top: 20px;
  gap: 15px;
}
.manager-form__experience-header > *,
.manager-form__experience-input-box > .manager-form__experience-input {
  flex: 1;
}
.manager-form__experience-header {
  padding: 10px 0;
  color: #333;
  font-weight: 600;
  background: #e2e2e2;
}
.manager-form__experience-input-box {
  padding: 0 10px;
}
.manager-form__experience-delete-btn {
  font-size: clamp(1.2rem, calc(1.5vw + 1rem), 1.8rem);
  color: rgb(245, 43, 43);
}
.manager-form__experience-footer {
  padding: 20px;
  margin-top: 20px;
  border-top: 1px solid #999;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
}
.manager-form__add-experience-btn {
  border: 1px solid #fc8019;
  padding: 10px 15px;
  border-radius: 5px;
  color: #fc8019;
  font-weight: 600;
  font-size: 15px;
}
.manager-form__experience-title {
  text-align: center;
}
.manager-form__error-message {
  position: absolute;
  font-size: 14px;
  color: rgb(247, 63, 63);
  font-weight: 600;
}
.manager-form__language-error-message {
  position: relative;
}
.manager-form__btns-box {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin-top: 25px;
}
.manager-form__btn {
  padding: 10px 20px;
  border-radius: 5px;
  font-size: 14px;
  font-weight: 600;
}
.manager-form__btn--submit {
  background: #fc8019;
  border: 2px solid #fc8019;
  color: #fff;
}
.manager-form__btn--reset {
  border: 2px solid #dedede;
}
.manager-form__btn--submit:not(.active):hover {
  background: hsl(27, 97%, 50%);
}
.manager-form__btn--reset.active,
.manager-form__btn--submit.active {
  opacity: 0.5;
  cursor: not-allowed;
}
.manager-form__btn--reset:not(.active):hover {
  background: #e7e7e7;
  color: #333;
}
</style>