<template>
  <section class="team-member">
    <header class="team-member__header">
      <NuxtLink to="/careers">
        <Icon name="icon-park-outline:left" />
        Go Back</NuxtLink
      >
      <h1 class="team-member__title">Team Member Application Form</h1>
    </header>
    <div class="team-member__form-box">
      <Form
        :validation-schema="createTeamMember"
        @submit="handleApplyForTeamMemberRoleSubmit"
        class="team-member-form"
        v-slot="{ values }"
      >
        <h3 class="team-member-form__title">Personal Information</h3>
        <div class="team-member-form__row">
          <div class="team-member-form__control team-member-form__file-box">
            <label for="applicantPhoto" class="team-member-form__label"
              >Upload Your Photo</label
            >
            <Field
              type="file"
              class="team-member-form__input team-member-form__file-input"
              id="applicantPhoto"
              name="applicantPhoto"
            />
            <ErrorMessage
              name="applicantPhoto"
              class="team-member-form__error-message"
            />
          </div>
          <div class="team-member-form__control team-member-form__file-box">
            <label for="passportPhoto" class="team-member-form__label"
              >Upload Passport Photo</label
            >
            <Field
              type="file"
              class="team-member-form__input team-member-form__file-input"
              id="passportPhoto"
              name="passportPhoto"
            />
            <ErrorMessage
              name="passportPhoto"
              class="team-member-form__error-message"
            />
          </div>
          <div class="team-member-form__control team-member-form__file-box">
            <label for="resume" class="team-member-form__label"
              >Upload Resume Photo</label
            >
            <Field
              type="file"
              class="team-member-form__input team-member-form__file-input"
              id="resume"
              name="resume"
            />
            <ErrorMessage
              name="resume"
              class="team-member-form__error-message"
            />
          </div>
        </div>
        <div class="team-member-form__row">
          <div class="team-member-form__control">
            <label for="firstname" class="team-member-form__label"
              >Firstname</label
            >
            <Field
              type="text"
              name="firstname"
              class="team-member-form__input"
              id="firstname"
              placeholder="Enter Firstname..."
            />
            <ErrorMessage
              name="firstname"
              class="team-member-form__error-message"
            />
          </div>
          <div class="team-member-form__control">
            <label for="lastname" class="team-member-form__label"
              >Lastname</label
            >
            <Field
              type="text"
              name="lastname"
              class="team-member-form__input"
              id="lastname"
              placeholder="Enter Lastname..."
            />
            <ErrorMessage
              name="lastname"
              class="team-member-form__error-message"
            />
          </div>
          <div class="team-member-form__control">
            <label for="email" class="team-member-form__label">Email</label>
            <Field
              type="email"
              name="email"
              class="team-member-form__input"
              id="email"
              placeholder="Enter Email..."
            />
            <ErrorMessage
              name="email"
              class="team-member-form__error-message"
            />
          </div>
        </div>
        <div class="team-member-form__row">
          <div class="team-member-form__control">
            <label for="phoneNumber" class="team-member-form__label"
              >Phone Number</label
            >
            <Field
              type="number"
              name="phoneNumber"
              class="team-member-form__input"
              id="phoneNumber"
              placeholder="Enter Phone Number..."
            />
            <ErrorMessage
              name="phoneNumber"
              class="team-member-form__error-message"
            />
          </div>
          <div class="team-member-form__control">
            <label for="birthDate" class="team-member-form__label"
              >Birth Date</label
            >
            <Field
              type="date"
              name="birthDate"
              class="team-member-form__input"
              id="birthDate"
              placeholder="Enter Birth Date..."
            />
            <ErrorMessage
              name="birthDate"
              class="team-member-form__error-message"
            />
          </div>
        </div>
        <div class="team-member-form__row">
          <div class="team-member-form__radio-box">
            <p class="team-member-form__radio-title">Please Choose a Gender</p>
            <label for="male" class="team-member-form__radio-label"
              >Male
              <Field
                type="radio"
                class="team-member-form__radio-input"
                id="male"
                name="gender"
                value="MALE"
              />
            </label>
            <label for="female" class="team-member-form__radio-label"
              >Female
              <Field
                type="radio"
                class="team-member-form__radio-input"
                id="female"
                name="gender"
                value="FEMALE"
              />
            </label>
            <p>
              <ErrorMessage
                name="gender"
                class="team-member-form__error-message"
              />
            </p>
          </div>
          <div class="team-member-form__radio-box">
            <p class="team-member-form__radio-title">
              Please Choose a Marital Status
            </p>
            <label for="married" class="team-member-form__radio-label"
              >Married
              <Field
                type="radio"
                class="team-member-form__radio-input"
                id="married"
                name="martialStatus"
                value="MARRIED"
              />
            </label>
            <label for="single" class="team-member-form__radio-label"
              >Single
              <Field
                type="radio"
                class="team-member-form__radio-input"
                id="single"
                name="martialStatus"
                value="SINGLE"
              />
            </label>
            <p>
              <ErrorMessage
                name="martialStatus"
                class="team-member-form__error-message"
              />
            </p>
          </div>
        </div>
        <div class="team-member-form__row"></div>
        <div class="team-member-form__row">
          <div class="team-member-form__control">
            <label for="passportNumber" class="team-member-form__label"
              >Passport Number</label
            >
            <Field
              type="text"
              name="passportNumber"
              class="team-member-form__input"
              id="passportNumber"
              placeholder="Enter Passport Number..."
            />
            <ErrorMessage
              name="passportNumber"
              class="team-member-form__error-message"
            />
          </div>
          <div class="team-member-form__control">
            <label for="noticePeriod" class="team-member-form__label"
              >Notice Period</label
            >
            <Field
              type="text"
              name="noticePeriod"
              class="team-member-form__input"
              id="noticePeriod"
              placeholder="Enter Notice Period..."
            />
            <ErrorMessage
              name="noticePeriod"
              class="team-member-form__error-message"
            />
          </div>
          <div class="team-member-form__control">
            <label for="dateOfJoining" class="team-member-form__label"
              >Date Of Joining</label
            >
            <Field
              type="date"
              name="dateOfJoining"
              class="team-member-form__input"
              id="dateOfJoining"
              placeholder="Enter Date of Joining..."
            />
            <ErrorMessage
              name="dateOfJoining"
              class="team-member-form__error-message"
            />
          </div>
        </div>
        <div class="team-member-form__row">
          <div class="team-member-form__control">
            <label for="education" class="team-member-form__label"
              >Education</label
            >
            <Field
              as="select"
              name="education"
              class="team-member-form__input"
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
              class="team-member-form__error-message"
            />
          </div>
          <div class="team-member-form__control">
            <label for="employmentType" class="team-member-form__label"
              >Employment Type</label
            >
            <Field
              as="select"
              name="employmentType"
              class="team-member-form__input"
              id="employmentType"
              placeholder="Enter Date of Joining..."
            >
              <option value="">Select Employment Type</option>
              <option value="FULL_TIME">Full Time</option>
              <option value="PART_TIME">Part Time</option>
            </Field>
            <ErrorMessage
              name="employmentType"
              class="team-member-form__error-message"
            />
          </div>
        </div>
        <h3 class="team-member-form__title">Additional Details</h3>

        <div class="team-member-form__row">
          <div class="team-member-form__control">
            <fieldset class="team-member-form__fieldset">
              <legend class="team-member-form__legend">Computer Skills</legend>
              <label for="excel" class="team-member-form__checkbox-label">
                <Field
                  class="team-member-form__checkbox-input"
                  type="checkbox"
                  id="excel"
                  name="computerSkills"
                  value="EXCEL"
                />
                EXCEL
              </label>
              <label for="word" class="team-member-form__checkbox-label">
                <Field
                  class="team-member-form__checkbox-input"
                  type="checkbox"
                  id="word"
                  name="computerSkills"
                  value="WORD"
                />
                WORD
              </label>
              <label for="powerpoint" class="team-member-form__checkbox-label">
                <Field
                  class="team-member-form__checkbox-input"
                  type="checkbox"
                  id="powerpoint"
                  name="computerSkills"
                  value="POWERPOINT"
                />
                POWERPOINT
              </label>
              <label for="outlook" class="team-member-form__checkbox-label">
                <Field
                  class="team-member-form__checkbox-input"
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
        <div class="team-member-form__row">
          <div class="team-member-form__radio-box">
            <p class="team-member-form__radio-title">
              Do you have a bank account?
            </p>
            <label for="yes" class="team-member-form__radio-label"
              >Yes
              <Field
                type="radio"
                class="team-member-form__radio-input"
                id="yes"
                name="hasBankAccount"
                value="true"
              />
            </label>
            <label for="no" class="team-member-form__radio-label"
              >No
              <Field
                type="radio"
                class="team-member-form__radio-input"
                id="no"
                name="hasBankAccount"
                value="false"
              />
            </label>
            <p>
              <ErrorMessage
                name="hasBankAccount"
                class="team-member-form__error-message"
              />
            </p>
          </div>
          <div
            v-if="values.hasBankAccount === 'true'"
            class="team-member-form__control"
          >
            <label for="bankAccountName" class="team-member-form__label"
              >Bank Name</label
            >
            <Field
              type="text"
              name="bankAccountName"
              class="team-member-form__input"
              id="bankAccountName"
              placeholder="Enter Bank Name..."
            />
            <ErrorMessage
              name="bankAccountName"
              class="team-member-form__error-message"
            />
          </div>
          <div class="team-member-form__control">
            <label for="source" class="team-member-form__label">Source</label>
            <Field
              as="select"
              name="source"
              class="team-member-form__input"
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
            <ErrorMessage
              name="source"
              class="team-member-form__error-message"
            />
          </div>
        </div>

        <div class="team-member-form__row">
          <fieldset class="team-member-form__fieldset">
            <legend class="team-member-form__legend">LANGUAGES</legend>
            <div class="team-member-form__language-box">
              <p class="team-member-form__language-text">UZBEK</p>
              <div>
                <div class="team-member-form__language-checkbox-box">
                  <label
                    for="basic.uzbek"
                    class="team-member-form__language-label"
                  >
                    <Field
                      class="team-member-form__radio-input"
                      type="radio"
                      name="languages.uzbek"
                      id="basic.uzbek"
                      value="BASIC"
                    />
                    BASIC
                  </label>
                  <label
                    for="intermediate.uzbek"
                    class="team-member-form__language-label"
                  >
                    <Field
                      class="team-member-form__radio-input"
                      type="radio"
                      name="languages.uzbek"
                      id="intermediate.uzbek"
                      value="INTERMEDIATE"
                    />
                    INTERMEDIATE
                  </label>
                  <label
                    for="fluent.uzbek"
                    class="team-member-form__language-label"
                  >
                    <Field
                      class="team-member-form__radio-input"
                      type="radio"
                      name="languages.uzbek"
                      id="fluent.uzbek"
                      value="FLUENT"
                    />
                    FLUENT
                  </label>
                  <label
                    for="native.uzbek"
                    class="team-member-form__language-label"
                  >
                    <Field
                      class="team-member-form__radio-input"
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
                  class="team-member-form__error-message team-member-form__language-error-message"
                />
              </div>
            </div>
            <div class="team-member-form__language-box">
              <p class="team-member-form__language-text">ENGLISH</p>
              <div>
                <div class="team-member-form__language-checkbox-box">
                  <label
                    for="basic.english"
                    class="team-member-form__language-label"
                  >
                    <Field
                      class="team-member-form__radio-input"
                      type="radio"
                      name="languages.english"
                      id="basic.english"
                      value="BASIC"
                    />
                    BASIC
                  </label>
                  <label
                    for="intermediate.english"
                    class="team-member-form__language-label"
                  >
                    <Field
                      class="team-member-form__radio-input"
                      type="radio"
                      name="languages.english"
                      id="intermediate.english"
                      value="INTERMEDIATE"
                    />
                    INTERMEDIATE
                  </label>
                  <label
                    for="fluent.english"
                    class="team-member-form__language-label"
                  >
                    <Field
                      class="team-member-form__radio-input"
                      type="radio"
                      name="languages.english"
                      id="fluent.english"
                      value="FLUENT"
                    />
                    FLUENT
                  </label>
                  <label
                    for="native.english"
                    class="team-member-form__language-label"
                  >
                    <Field
                      class="team-member-form__radio-input"
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
                  class="team-member-form__error-message team-member-form__language-error-message"
                />
              </div>
            </div>
            <div class="team-member-form__language-box">
              <p class="team-member-form__language-text">RUSSIAN</p>
              <div>
                <div class="team-member-form__language-checkbox-box">
                  <label
                    for="basic.russian"
                    class="team-member-form__language-label"
                  >
                    <Field
                      class="team-member-form__radio-input"
                      type="radio"
                      name="languages.russian"
                      id="basic.russian"
                      value="BASIC"
                    />
                    BASIC
                  </label>
                  <label
                    for="intermediate.russian"
                    class="team-member-form__language-label"
                  >
                    <Field
                      class="team-member-form__radio-input"
                      type="radio"
                      name="languages.russian"
                      id="intermediate.russian"
                      value="INTERMEDIATE"
                    />
                    INTERMEDIATE
                  </label>
                  <label
                    for="fluent.russian"
                    class="team-member-form__language-label"
                  >
                    <Field
                      class="team-member-form__radio-input"
                      type="radio"
                      name="languages.russian"
                      id="fluent.russian"
                      value="FLUENT"
                    />
                    FLUENT
                  </label>
                  <label
                    for="native.russian"
                    class="team-member-form__language-label"
                  >
                    <Field
                      class="team-member-form__radio-input"
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
                  class="team-member-form__error-message team-member-form__language-error-message"
                />
              </div>
            </div>
          </fieldset>
        </div>
        <div class="team-member-form__experience-box">
          <div class="team-member-form__experience-input-wrapper">
            <div class="team-member-form__experience-header">
              <p class="team-member-form__experience-title">JOB TITLE</p>
              <p class="team-member-form__experience-title">COMPANY NAME</p>
              <p class="team-member-form__experience-title">START DATE</p>
              <p class="team-member-form__experience-title">END DATE</p>
            </div>
            <FieldArray name="experiences" v-slot="{ fields, push, remove }">
              <div
                v-for="(experience, idx) of fields"
                :key="experience.key"
                class="team-member-form__experience-input-box"
              >
                <Field
                  class="team-member-form__experience-input team-member-form__input"
                  type="text"
                  :name="`experiences[${idx}].jobTitle`"
                  placeholder="Enter Your Job Title"
                />
                <Field
                  class="team-member-form__experience-input team-member-form__input"
                  type="text"
                  :name="`experiences[${idx}].companyName`"
                  placeholder="Enter Company Name"
                />
                <Field
                  class="team-member-form__experience-input team-member-form__input"
                  type="date"
                  :name="`experiences[${idx}].startDate`"
                  placeholder="Enter Your Job Title"
                />
                <Field
                  class="team-member-form__experience-input team-member-form__input"
                  type="date"
                  :name="`experiences[${idx}].endDate`"
                  placeholder="Enter Your Job Title"
                />
                <button
                  @click="remove(idx)"
                  title="delete"
                  class="team-member-form__experience-delete-btn"
                >
                  <Icon name="mdi:trash" />
                </button>
              </div>

              <div class="team-member-form__experience-footer">
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
                  class="team-member-form__add-experience-btn"
                >
                  ADD ANOTHER EXPERIENCE
                </button>
              </div>
            </FieldArray>
          </div>
        </div>
        <div class="team-member-form__btns-box">
          <button
            type="reset"
            class="team-member-form__btn team-member-form__btn--reset"
            :disabled="isLoading"
            :class="{ active: isLoading }"
          >
            Reset
          </button>
          <button
            type="submit"
            class="team-member-form__btn team-member-form__btn--submit"
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
import { createTeamMember } from "~/validations";
import { Form, Field, FieldArray, ErrorMessage } from "vee-validate";

const { isLoading, startLoading, stopLoading } = useLoading();
const { $toast } = useNuxtApp();

const handleApplyForTeamMemberRoleSubmit = async (teamMemberData: any) => {
  console.log(teamMemberData);
  const formData = new FormData();
  const errors = [];
  if (hasPhotoFileError(teamMemberData.applicantPhoto)) {
    errors.push(hasPhotoFileError(teamMemberData.applicantPhoto));
  }
  if (hasPhotoFileError(teamMemberData.passportPhoto)) {
    errors.push(hasPhotoFileError(teamMemberData.passportPhoto));
  }
  if (hasPhotoFileError(teamMemberData.resume)) {
    errors.push(hasPhotoFileError(teamMemberData.resume));
  }
  for (const error of errors) {
    $toast.error(error);
  }
  if (!errors.length) {
    formData.append("role", "TEAM_MEMBER");
    formData.append("applicantPhoto", teamMemberData.applicantPhoto);
    formData.append("resume", teamMemberData.resume);
    formData.append("passportPhoto", teamMemberData.passportPhoto);
    formData.append("bankAccountName", teamMemberData.bankAccountName ?? "");
    formData.append("birthDate", teamMemberData.birthDate);
    formData.append("dateOfJoining", teamMemberData.dateOfJoining);
    formData.append("education", teamMemberData.education);
    formData.append("email", teamMemberData.email);
    formData.append("firstname", teamMemberData.firstname);
    formData.append("lastname", teamMemberData.lastname);
    formData.append("gender", teamMemberData.gender);
    formData.append(
      "hasBankAccount",
      JSON.parse(teamMemberData.hasBankAccount)
    );
    formData.append("martialStatus", teamMemberData.martialStatus);
    formData.append("noticePeriod", teamMemberData.noticePeriod);
    formData.append("passportNumber", teamMemberData.passportNumber);
    formData.append("phoneNumber", teamMemberData.phoneNumber.toString());
    formData.append("source", teamMemberData.source);
    formData.append(
      "computerSkills",
      JSON.stringify(teamMemberData.computerSkills)
    );
    formData.append(
      "experiences",
      JSON.stringify(teamMemberData.experiences ?? [])
    );
    formData.append("languages", JSON.stringify(teamMemberData.languages));
    formData.append(
      "applicant",
      JSON.stringify({
        employmentType: teamMemberData.employmentType,
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
.team-member {
  margin: 50px 0 150px 0;
}
.team-member__header {
  margin-bottom: 20px;
}
.team-member__title {
  text-align: center;
  font-size: clamp(1.7rem, calc(1.7vw + 1rem), 2.2rem);
}
.team-member__form-box {
  max-width: 960px;
  width: 100%;
  margin: 0 auto;
  padding: 25px;
  border-radius: 10px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
}

.team-member-form__row > * {
  flex: 1;
}
.team-member-form__title {
  font-size: clamp(1.4rem, calc(2vw + 1rem), 2rem);
  margin: 0 0 25px 0;
}
.team-member-form__control {
  position: relative;
  margin-bottom: 20px;
}
.team-member-form__label {
  font-size: 13px;
  color: #333;
  display: block;
  padding-bottom: 5px;
}
.team-member-form__input {
  display: block;
  width: 100%;
  padding: 10px 5px;
  border-radius: 5px;
  border: 2px solid #999;
}
.team-member-form__textarea {
  height: 80px;
  resize: none;
}
.team-member-form__textarea:focus {
  outline: 1px solid #fc8019;
}

.team-member-form__input:focus {
  border: 2px solid #fc8019;
}
.team-member-form__file-input {
  display: block;
  width: 100%;
  padding: 8px 3px;
  border-radius: 5px;
  border: 2px solid #999;
}

.team-member-form__radio-box {
  margin-bottom: 25px;
}
.team-member-form__radio-title {
  margin-bottom: 10px;
  font-size: 17px;
  color: #333;
}
.team-member-form__checkbox-label,
.team-member-form__radio-label {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  margin-right: 25px;
}
.team-member-form__radio-input {
  transform: scale(1.2);
}

.team-member-form__checkbox-input:after,
.team-member-form__radio-input:after {
  top: -2px;
  left: -2px;
  position: relative;
  background-color: #d1d3d1;
  content: "";
  display: inline-block;
  visibility: visible;
  border: 2px solid white;
}
.team-member-form__checkbox-input:checked:after,
.team-member-form__radio-input:checked:after {
  top: -2px;
  left: -2px;
  position: relative;
  background-color: #ffa500;
  content: "";
  visibility: visible;
  border: 2px solid white;
}

.team-member-form__radio-input:after,
.team-member-form__radio-input:checked:after {
  border-radius: 18px;
  width: 18px;
  height: 18px;
}

.team-member-form__checkbox-input:after,
.team-member-form__checkbox-input:checked:after {
  width: 20px;
  height: 20px;
}
.team-member-form__fieldset {
  padding: 15px;
  border: 1px solid #999;
}
.team-member-form__language-fieldset {
  max-width: 95%;
  width: 95%;
}
.team-member-form__legend {
  padding: 0 10px;
}
.team-member-form__language-box {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
}
.team-member-form__language-box:not(:last-child) {
  margin-bottom: 25px;
}
.team-member-form__language-checkbox-box {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 25px;
}
.team-member-form__language-label {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
}
.team-member-form__experience-box {
  overflow-x: scroll;
  margin-top: 25px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
}
.team-member-form__experience-box::-webkit-scrollbar {
  height: 10px;
  width: 5px;
}
.team-member-form__experience-box::-webkit-scrollbar-track {
  background: transparent;
}
.team-member-form__experience-box::-webkit-scrollbar-thumb {
  background: #999;
}

.team-member-form__experience-input-wrapper {
  width: 150%;
}

.team-member-form__experience-header,
.team-member-form__experience-input-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.team-member-form__experience-input-box {
  margin-top: 20px;
  gap: 15px;
}
.team-member-form__experience-header > *,
.team-member-form__experience-input-box > .team-member-form__experience-input {
  flex: 1;
}
.team-member-form__experience-header {
  padding: 10px 0;
  color: #333;
  font-weight: 600;
  background: #e2e2e2;
}
.team-member-form__experience-input-box {
  padding: 0 10px;
}
.team-member-form__experience-delete-btn {
  font-size: clamp(1.2rem, calc(1.5vw + 1rem), 1.8rem);
  color: rgb(245, 43, 43);
}
.team-member-form__experience-footer {
  padding: 20px;
  margin-top: 20px;
  border-top: 1px solid #999;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
}
.team-member-form__add-experience-btn {
  border: 1px solid #fc8019;
  padding: 10px 15px;
  border-radius: 5px;
  color: #fc8019;
  font-weight: 600;
  font-size: 15px;
}
.team-member-form__experience-title {
  text-align: center;
}
.team-member-form__error-message {
  position: absolute;
  font-size: 14px;
  color: rgb(247, 63, 63);
  font-weight: 600;
}
.team-member-form__language-error-message {
  position: relative;
}
.team-member-form__btns-box {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin-top: 25px;
}
.team-member-form__btn {
  padding: 10px 20px;
  border-radius: 5px;
  font-size: 14px;
  font-weight: 600;
}
.team-member-form__btn--submit {
  background: #fc8019;
  border: 2px solid #fc8019;
  color: #fff;
}
.team-member-form__btn--reset {
  border: 2px solid #dedede;
}
.team-member-form__btn--submit:not(.active):hover {
  background: hsl(27, 97%, 50%);
}
.team-member-form__btn--reset.active,
.team-member-form__btn--submit.active {
  opacity: 0.5;
  cursor: not-allowed;
}
.team-member-form__btn--reset:not(.active):hover {
  background: #e7e7e7;
  color: #333;
}

@media (min-width: 768px) {
  .team-member-form__row {
    display: flex;
    align-items: center;
    gap: 25px;
  }
  .team-member-form__language-box {
    flex-wrap: unset;
  }
  .team-member-form__experience-input-wrapper {
    width: auto;
  }
  .team-member-form__experience-box {
    overflow: unset;
  }
}
</style>