<template>
  <section class="driver">
    <header class="driver__header">
      <NuxtLink to="/careers">
        <Icon name="icon-park-outline:left" />
        Go Back</NuxtLink
      >
      <h1 class="driver__title">Driver Application Form</h1>
    </header>
    <div class="driver__form-box">
      <Form
        :validation-schema="createDriver"
        @submit="handleApplyForDriverRoleSubmit"
        class="driver-form"
        v-slot="{ values }"
      >
        <h3 class="driver-form__title">Personal Information</h3>
        <div class="driver-form__row">
          <div class="driver-form__control driver-form__file-box">
            <label for="applicantPhoto" class="driver-form__label"
              >Upload Your Photo</label
            >
            <Field
              type="file"
              class="driver-form__input driver-form__file-input"
              id="applicantPhoto"
              name="applicantPhoto"
            />
            <ErrorMessage
              name="applicantPhoto"
              class="driver-form__error-message"
            />
          </div>
          <div class="driver-form__control driver-form__file-box">
            <label for="passportPhoto" class="driver-form__label"
              >Upload Passport Photo</label
            >
            <Field
              type="file"
              class="driver-form__input driver-form__file-input"
              id="passportPhoto"
              name="passportPhoto"
            />
            <ErrorMessage
              name="passportPhoto"
              class="driver-form__error-message"
            />
          </div>
          <div class="driver-form__control driver-form__file-box">
            <label for="resume" class="driver-form__label"
              >Upload Resume Photo</label
            >
            <Field
              type="file"
              class="driver-form__input driver-form__file-input"
              id="resume"
              name="resume"
            />
            <ErrorMessage name="resume" class="driver-form__error-message" />
          </div>
        </div>
        <div class="driver-form__row">
          <div class="driver-form__control">
            <label for="firstname" class="driver-form__label">Firstname</label>
            <Field
              type="text"
              name="firstname"
              class="driver-form__input"
              id="firstname"
              placeholder="Enter Firstname..."
            />
            <ErrorMessage name="firstname" class="driver-form__error-message" />
          </div>
          <div class="driver-form__control">
            <label for="lastname" class="driver-form__label">Lastname</label>
            <Field
              type="text"
              name="lastname"
              class="driver-form__input"
              id="lastname"
              placeholder="Enter Lastname..."
            />
            <ErrorMessage name="lastname" class="driver-form__error-message" />
          </div>
          <div class="driver-form__control">
            <label for="email" class="driver-form__label">Email</label>
            <Field
              type="email"
              name="email"
              class="driver-form__input"
              id="email"
              placeholder="Enter Email..."
            />
            <ErrorMessage name="email" class="driver-form__error-message" />
          </div>
        </div>
        <div class="driver-form__row">
          <div class="driver-form__control">
            <label for="phoneNumber" class="driver-form__label"
              >Phone Number</label
            >
            <Field
              type="number"
              name="phoneNumber"
              class="driver-form__input"
              id="phoneNumber"
              placeholder="Enter Phone Number..."
            />
            <ErrorMessage
              name="phoneNumber"
              class="driver-form__error-message"
            />
          </div>
          <div class="driver-form__control">
            <label for="birthDate" class="driver-form__label">Birth Date</label>
            <Field
              type="date"
              name="birthDate"
              class="driver-form__input"
              id="birthDate"
              placeholder="Enter Birth Date..."
            />
            <ErrorMessage name="birthDate" class="driver-form__error-message" />
          </div>
        </div>
        <div class="driver-form__row">
          <div class="driver-form__radio-box">
            <p class="driver-form__radio-title">Please Choose a Gender</p>
            <label for="male" class="driver-form__radio-label"
              >Male
              <Field
                type="radio"
                class="driver-form__radio-input"
                id="male"
                name="gender"
                value="MALE"
              />
            </label>
            <label for="female" class="driver-form__radio-label"
              >Female
              <Field
                type="radio"
                class="driver-form__radio-input"
                id="female"
                name="gender"
                value="FEMALE"
              />
            </label>
            <p>
              <ErrorMessage name="gender" class="driver-form__error-message" />
            </p>
          </div>
          <div class="driver-form__radio-box">
            <p class="driver-form__radio-title">
              Please Choose a Marital Status
            </p>
            <label for="married" class="driver-form__radio-label"
              >Married
              <Field
                type="radio"
                class="driver-form__radio-input"
                id="married"
                name="martialStatus"
                value="MARRIED"
              />
            </label>
            <label for="single" class="driver-form__radio-label"
              >Single
              <Field
                type="radio"
                class="driver-form__radio-input"
                id="single"
                name="martialStatus"
                value="SINGLE"
              />
            </label>
            <p>
              <ErrorMessage
                name="martialStatus"
                class="driver-form__error-message"
              />
            </p>
          </div>
        </div>
        <div class="driver-form__row"></div>
        <div class="driver-form__row">
          <div class="driver-form__control">
            <label for="passportNumber" class="driver-form__label"
              >Passport Number</label
            >
            <Field
              type="text"
              name="passportNumber"
              class="driver-form__input"
              id="passportNumber"
              placeholder="Enter Passport Number..."
            />
            <ErrorMessage
              name="passportNumber"
              class="driver-form__error-message"
            />
          </div>
          <div class="driver-form__control">
            <label for="noticePeriod" class="driver-form__label"
              >Notice Period</label
            >
            <Field
              type="text"
              name="noticePeriod"
              class="driver-form__input"
              id="noticePeriod"
              placeholder="Enter Notice Period..."
            />
            <ErrorMessage
              name="noticePeriod"
              class="driver-form__error-message"
            />
          </div>
          <div class="driver-form__control">
            <label for="dateOfJoining" class="driver-form__label"
              >Date Of Joining</label
            >
            <Field
              type="date"
              name="dateOfJoining"
              class="driver-form__input"
              id="dateOfJoining"
              placeholder="Enter Date of Joining..."
            />
            <ErrorMessage
              name="dateOfJoining"
              class="driver-form__error-message"
            />
          </div>
        </div>
        <div class="driver-form__row">
          <div class="driver-form__control">
            <label for="education" class="driver-form__label">Education</label>
            <Field
              as="select"
              name="education"
              class="driver-form__input"
              id="education"
            >
              <option value="">Select Education</option>
              <option value="NO_EDUCATION">No Education</option>
              <option value="HIGH_SCHOOL">High School</option>
              <option value="GRADUATE">Graduate</option>
              <option value="POST_GRADUATE">Post Graduate</option>
            </Field>
            <ErrorMessage name="education" class="driver-form__error-message" />
          </div>
          <div class="driver-form__control">
            <label for="employmentType" class="driver-form__label"
              >Employment Type</label
            >
            <Field
              as="select"
              name="employmentType"
              class="driver-form__input"
              id="employmentType"
              placeholder="Enter Date of Joining..."
            >
              <option value="">Select Employment Type</option>
              <option value="FULL_TIME">Full Time</option>
              <option value="PART_TIME">Part Time</option>
            </Field>
            <ErrorMessage
              name="employmentType"
              class="driver-form__error-message"
            />
          </div>
        </div>
        <div class="driver-form__row">
          <div class="driver-form__control">
            <label for="drivingLicence" class="driver-form__label"
              >Driving Licence</label
            >
            <Field
              as="select"
              name="drivingLicence"
              class="driver-form__input"
              id="drivingLicence"
              placeholder="Enter Driving Licence..."
            >
              <option value="">Select Driving License</option>
              <option value="A1">A1</option>
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>
            </Field>
            <ErrorMessage
              name="drivingLicence"
              class="driver-form__error-message"
            />
          </div>
          <div class="driver-form__control">
            <label for="licenseNumber" class="driver-form__label"
              >Licence Number</label
            >
            <Field
              type="text"
              name="licenseNumber"
              class="driver-form__input"
              id="licenseNumber"
              placeholder="Enter Licence Number..."
            />
            <ErrorMessage
              name="licenseNumber"
              class="driver-form__error-message"
            />
          </div>
        </div>
        <h3 class="driver-form__title">Additional Details</h3>

        <div class="driver-form__row">
          <div class="driver-form__control">
            <fieldset class="driver-form__fieldset">
              <legend class="driver-form__legend">Computer Skills</legend>
              <label for="excel" class="driver-form__checkbox-label">
                <Field
                  class="driver-form__checkbox-input"
                  type="checkbox"
                  id="excel"
                  name="computerSkills"
                  value="EXCEL"
                />
                EXCEL
              </label>
              <label for="word" class="driver-form__checkbox-label">
                <Field
                  class="driver-form__checkbox-input"
                  type="checkbox"
                  id="word"
                  name="computerSkills"
                  value="WORD"
                />
                WORD
              </label>
              <label for="powerpoint" class="driver-form__checkbox-label">
                <Field
                  class="driver-form__checkbox-input"
                  type="checkbox"
                  id="powerpoint"
                  name="computerSkills"
                  value="POWERPOINT"
                />
                POWERPOINT
              </label>
              <label for="outlook" class="driver-form__checkbox-label">
                <Field
                  class="driver-form__checkbox-input"
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
        <div class="driver-form__row">
          <div class="driver-form__radio-box">
            <p class="driver-form__radio-title">Do you have a bank account?</p>
            <label for="yes" class="driver-form__radio-label"
              >Yes
              <Field
                type="radio"
                class="driver-form__radio-input"
                id="yes"
                name="hasBankAccount"
                value="true"
              />
            </label>
            <label for="no" class="driver-form__radio-label"
              >No
              <Field
                type="radio"
                class="driver-form__radio-input"
                id="no"
                name="hasBankAccount"
                value="false"
              />
            </label>
            <p>
              <ErrorMessage
                name="hasBankAccount"
                class="driver-form__error-message"
              />
            </p>
          </div>
          <div
            v-if="values.hasBankAccount === 'true'"
            class="driver-form__control"
          >
            <label for="bankAccountName" class="driver-form__label"
              >Bank Name</label
            >
            <Field
              type="text"
              name="bankAccountName"
              class="driver-form__input"
              id="bankAccountName"
              placeholder="Enter Bank Name..."
            />
            <ErrorMessage
              name="bankAccountName"
              class="driver-form__error-message"
            />
          </div>
          <div class="driver-form__control">
            <label for="source" class="driver-form__label">Source</label>
            <Field
              as="select"
              name="source"
              class="driver-form__input"
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
            <ErrorMessage name="source" class="driver-form__error-message" />
          </div>
        </div>

        <div class="driver-form__row">
          <fieldset class="driver-form__fieldset">
            <legend class="driver-form__legend">LANGUAGES</legend>
            <div class="driver-form__language-box">
              <p class="driver-form__language-text">UZBEK</p>
              <div>
                <div class="driver-form__language-checkbox-box">
                  <label for="basic.uzbek" class="driver-form__language-label">
                    <Field
                      class="driver-form__radio-input"
                      type="radio"
                      name="languages.uzbek"
                      id="basic.uzbek"
                      value="BASIC"
                    />
                    BASIC
                  </label>
                  <label
                    for="intermediate.uzbek"
                    class="driver-form__language-label"
                  >
                    <Field
                      class="driver-form__radio-input"
                      type="radio"
                      name="languages.uzbek"
                      id="intermediate.uzbek"
                      value="INTERMEDIATE"
                    />
                    INTERMEDIATE
                  </label>
                  <label for="fluent.uzbek" class="driver-form__language-label">
                    <Field
                      class="driver-form__radio-input"
                      type="radio"
                      name="languages.uzbek"
                      id="fluent.uzbek"
                      value="FLUENT"
                    />
                    FLUENT
                  </label>
                  <label for="native.uzbek" class="driver-form__language-label">
                    <Field
                      class="driver-form__radio-input"
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
                  class="driver-form__error-message driver-form__language-error-message"
                />
              </div>
            </div>
            <div class="driver-form__language-box">
              <p class="driver-form__language-text">ENGLISH</p>
              <div>
                <div class="driver-form__language-checkbox-box">
                  <label
                    for="basic.english"
                    class="driver-form__language-label"
                  >
                    <Field
                      class="driver-form__radio-input"
                      type="radio"
                      name="languages.english"
                      id="basic.english"
                      value="BASIC"
                    />
                    BASIC
                  </label>
                  <label
                    for="intermediate.english"
                    class="driver-form__language-label"
                  >
                    <Field
                      class="driver-form__radio-input"
                      type="radio"
                      name="languages.english"
                      id="intermediate.english"
                      value="INTERMEDIATE"
                    />
                    INTERMEDIATE
                  </label>
                  <label
                    for="fluent.english"
                    class="driver-form__language-label"
                  >
                    <Field
                      class="driver-form__radio-input"
                      type="radio"
                      name="languages.english"
                      id="fluent.english"
                      value="FLUENT"
                    />
                    FLUENT
                  </label>
                  <label
                    for="native.english"
                    class="driver-form__language-label"
                  >
                    <Field
                      class="driver-form__radio-input"
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
                  class="driver-form__error-message driver-form__language-error-message"
                />
              </div>
            </div>
            <div class="driver-form__language-box">
              <p class="driver-form__language-text">RUSSIAN</p>
              <div>
                <div class="driver-form__language-checkbox-box">
                  <label
                    for="basic.russian"
                    class="driver-form__language-label"
                  >
                    <Field
                      class="driver-form__radio-input"
                      type="radio"
                      name="languages.russian"
                      id="basic.russian"
                      value="BASIC"
                    />
                    BASIC
                  </label>
                  <label
                    for="intermediate.russian"
                    class="driver-form__language-label"
                  >
                    <Field
                      class="driver-form__radio-input"
                      type="radio"
                      name="languages.russian"
                      id="intermediate.russian"
                      value="INTERMEDIATE"
                    />
                    INTERMEDIATE
                  </label>
                  <label
                    for="fluent.russian"
                    class="driver-form__language-label"
                  >
                    <Field
                      class="driver-form__radio-input"
                      type="radio"
                      name="languages.russian"
                      id="fluent.russian"
                      value="FLUENT"
                    />
                    FLUENT
                  </label>
                  <label
                    for="native.russian"
                    class="driver-form__language-label"
                  >
                    <Field
                      class="driver-form__radio-input"
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
                  class="driver-form__error-message driver-form__language-error-message"
                />
              </div>
            </div>
          </fieldset>
        </div>
        <div class="driver-form__experience-box">
          <div class="driver-form__experience-header">
            <p class="driver-form__experience-title">JOB TITLE</p>
            <p class="driver-form__experience-title">COMPANY NAME</p>
            <p class="driver-form__experience-title">START DATE</p>
            <p class="driver-form__experience-title">END DATE</p>
          </div>
          <FieldArray name="experiences" v-slot="{ fields, push, remove }">
            <div
              v-for="(experience, idx) of fields"
              :key="experience.key"
              class="driver-form__experience-input-box"
            >
              <Field
                class="driver-form__experience-input driver-form__input"
                type="text"
                :name="`experiences[${idx}].jobTitle`"
                placeholder="Enter Your Job Title"
              />
              <Field
                class="driver-form__experience-input driver-form__input"
                type="text"
                :name="`experiences[${idx}].companyName`"
                placeholder="Enter Company Name"
              />
              <Field
                class="driver-form__experience-input driver-form__input"
                type="date"
                :name="`experiences[${idx}].startDate`"
                placeholder="Enter Your Job Title"
              />
              <Field
                class="driver-form__experience-input driver-form__input"
                type="date"
                :name="`experiences[${idx}].endDate`"
                placeholder="Enter Your Job Title"
              />
              <button
                @click="remove(idx)"
                title="delete"
                class="driver-form__experience-delete-btn"
              >
                <Icon name="mdi:trash" />
              </button>
            </div>

            <div class="driver-form__experience-footer">
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
                class="driver-form__add-experience-btn"
              >
                ADD ANOTHER EXPERIENCE
              </button>
            </div>
          </FieldArray>
        </div>
        <div class="driver-form__btns-box">
          <button
            type="reset"
            class="driver-form__btn driver-form__btn--reset"
            :disabled="isLoading"
            :class="{ active: isLoading }"
          >
            Reset
          </button>
          <button
            type="submit"
            class="driver-form__btn driver-form__btn--submit"
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
import { hasPhotoFileError } from "~/utils/hasPhotoFileError";
import { createApplicant } from "~/api/career";
import { createDriver } from "~/validations";
import { Form, Field, FieldArray, ErrorMessage } from "vee-validate";

const { isLoading, startLoading, stopLoading } = useLoading();
const { $toast } = useNuxtApp();

const handleApplyForDriverRoleSubmit = async (driverData: any) => {
  console.log(driverData);
  const formData = new FormData();
  const errors = [];
  if (hasPhotoFileError(driverData.applicantPhoto)) {
    errors.push(hasPhotoFileError(driverData.applicantPhoto));
  }
  if (hasPhotoFileError(driverData.passportPhoto)) {
    errors.push(hasPhotoFileError(driverData.passportPhoto));
  }
  if (hasPhotoFileError(driverData.resume)) {
    errors.push(hasPhotoFileError(driverData.resume));
  }
  for (const error of errors) {
    $toast.error(error);
  }
  if (!errors.length) {
    formData.append("role", "DRIVER");
    formData.append("applicantPhoto", driverData.applicantPhoto);
    formData.append("resume", driverData.resume);
    formData.append("passportPhoto", driverData.passportPhoto);
    formData.append("bankAccountName", driverData.bankAccountName ?? "");
    formData.append("birthDate", driverData.birthDate);
    formData.append("dateOfJoining", driverData.dateOfJoining);
    formData.append("education", driverData.education);
    formData.append("email", driverData.email);
    formData.append("firstname", driverData.firstname);
    formData.append("lastname", driverData.lastname);
    formData.append("gender", driverData.gender);
    formData.append("hasBankAccount", JSON.parse(driverData.hasBankAccount));
    formData.append("martialStatus", driverData.martialStatus);
    formData.append("noticePeriod", driverData.noticePeriod);
    formData.append("passportNumber", driverData.passportNumber);
    formData.append("phoneNumber", driverData.phoneNumber.toString());
    formData.append("source", driverData.source);
    formData.append(
      "computerSkills",
      JSON.stringify(driverData.computerSkills)
    );
    formData.append(
      "experiences",
      JSON.stringify(driverData.experiences ?? [])
    );
    formData.append("languages", JSON.stringify(driverData.languages));
    formData.append(
      "applicant",
      JSON.stringify({
        employmentType: driverData.employmentType,
        drivingLicence: driverData.drivingLicence,
        licenseNumber: driverData.licenseNumber,
      })
    );

    try {
      startLoading();
      await createApplicant(formData);
      stopLoading();
      $toast.success("Your Application is received!");
      setTimeout(() => navigateTo("/careers"), 2000);
    } catch (err: any) {
      if (err?.response?.data?.errors) {
        $toast.error(err?.response?.data?.errors);
      }
      stopLoading();
    }
  }
};
</script>
<style scoped>
.driver {
  margin: 50px 0 150px 0;
}
.driver__header {
  margin-bottom: 20px;
}
.driver__title {
  text-align: center;
  font-size: clamp(1.7rem, calc(1.7vw + 1rem), 2.2rem);
}
.driver__form-box {
  max-width: 960px;
  width: 95%;
  margin: 0 auto;
  padding: 25px;
  border-radius: 10px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
}
.driver-form__row {
  display: flex;
  align-items: center;
  gap: 25px;
}
.driver-form__row > * {
  flex: 1;
}
.driver-form__title {
  font-size: clamp(1.4rem, calc(2vw + 1rem), 2rem);
  margin: 0 0 25px 0;
}
.driver-form__control {
  position: relative;
  margin-bottom: 20px;
}
.driver-form__label {
  font-size: 13px;
  color: #333;
  display: block;
  padding-bottom: 5px;
}
.driver-form__input {
  display: block;
  width: 100%;
  padding: 10px 5px;
  border-radius: 5px;
  border: 2px solid #999;
}
.driver-form__textarea {
  height: 80px;
  resize: none;
}
.driver-form__textarea:focus {
  outline: 1px solid #fc8019;
}

.driver-form__input:focus {
  border: 2px solid #fc8019;
}
.driver-form__file-input {
  display: block;
  width: 100%;
  padding: 8px 3px;
  border-radius: 5px;
  border: 2px solid #999;
}

.driver-form__radio-box {
  margin-bottom: 25px;
}
.driver-form__radio-title {
  margin-bottom: 10px;
  font-size: 17px;
  color: #333;
}
.driver-form__checkbox-label,
.driver-form__radio-label {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  margin-right: 25px;
}
.driver-form__radio-input {
  transform: scale(1.2);
}

.driver-form__checkbox-input:after,
.driver-form__radio-input:after {
  top: -2px;
  left: -2px;
  position: relative;
  background-color: #d1d3d1;
  content: "";
  display: inline-block;
  visibility: visible;
  border: 2px solid white;
}
.driver-form__checkbox-input:checked:after,
.driver-form__radio-input:checked:after {
  top: -2px;
  left: -2px;
  position: relative;
  background-color: #ffa500;
  content: "";
  visibility: visible;
  border: 2px solid white;
}

.driver-form__radio-input:after,
.driver-form__radio-input:checked:after {
  border-radius: 18px;
  width: 18px;
  height: 18px;
}

.driver-form__checkbox-input:after,
.driver-form__checkbox-input:checked:after {
  width: 20px;
  height: 20px;
}
.driver-form__fieldset {
  padding: 15px;
  border: 1px solid #999;
}
.driver-form__language-fieldset {
  max-width: 95%;
  width: 95%;
}
.driver-form__legend {
  padding: 0 10px;
}
.driver-form__language-box {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.driver-form__language-box:not(:last-child) {
  margin-bottom: 25px;
}
.driver-form__language-checkbox-box {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 25px;
}
.driver-form__language-label {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
}
.driver-form__experience-box {
  margin-top: 25px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
}
.driver-form__experience-header,
.driver-form__experience-input-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.driver-form__experience-input-box {
  margin-top: 20px;
  gap: 15px;
}
.driver-form__experience-header > *,
.driver-form__experience-input-box > .driver-form__experience-input {
  flex: 1;
}
.driver-form__experience-header {
  padding: 10px 0;
  color: #333;
  font-weight: 600;
  background: #e2e2e2;
}
.driver-form__experience-input-box {
  padding: 0 10px;
}
.driver-form__experience-delete-btn {
  font-size: clamp(1.2rem, calc(1.5vw + 1rem), 1.8rem);
  color: rgb(245, 43, 43);
}
.driver-form__experience-footer {
  padding: 20px;
  margin-top: 20px;
  border-top: 1px solid #999;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
}
.driver-form__add-experience-btn {
  border: 1px solid #fc8019;
  padding: 10px 15px;
  border-radius: 5px;
  color: #fc8019;
  font-weight: 600;
  font-size: 15px;
}
.driver-form__experience-title {
  text-align: center;
}
.driver-form__error-message {
  position: absolute;
  font-size: 14px;
  color: rgb(247, 63, 63);
  font-weight: 600;
}
.driver-form__language-error-message {
  position: relative;
}
.driver-form__btns-box {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin-top: 25px;
}
.driver-form__btn {
  padding: 10px 20px;
  border-radius: 5px;
  font-size: 14px;
  font-weight: 600;
}
.driver-form__btn--submit {
  background: #fc8019;
  border: 2px solid #fc8019;
  color: #fff;
}
.driver-form__btn--reset {
  border: 2px solid #dedede;
}
.driver-form__btn--submit:not(.active):hover {
  background: hsl(27, 97%, 50%);
}
.driver-form__btn--reset.active,
.driver-form__btn--submit.active {
  opacity: 0.5;
  cursor: not-allowed;
}
.driver-form__btn--reset:not(.active):hover {
  background: #e7e7e7;
  color: #333;
}

@media (min-width: 768px) {
  .driver-form__label {
    font-size: 15px;
  }

  .driver-form__file-input,
  .driver-form__input {
    padding: 15px 5px;
  }
}
</style>