<template>
  <tr>
    <td class="applicants-table__cell">
      <p class="applicants-table__text">
        {{ applicant.id }}
      </p>
    </td>
    <td class="applicants-table__cell">
      <img
        :src="applicant.photoUrl"
        :alt="applicant.firstname"
        class="applicants-table__img"
      />
    </td>
    <td class="applicants-table__cell">
      <p class="applicants-table__text">
        {{ applicant.firstname }}
        {{ applicant.lastname }}
      </p>
    </td>
    <td class="applicants-table__cell">
      <p class="applicants-table__text">
        {{ applicant.phoneNumber }}
      </p>
    </td>
    <td class="applicants-table__cell">
      <p class="applicants-table__text">
        {{ applicant.email }}
      </p>
    </td>
    <td class="applicants-table__cell">
      <p class="applicants-table__text">
        {{ applicant.role }}
      </p>
    </td>
    <td class="applicants-table__cell applicants-table__status-cell">
      <button
        @click.stop="handleToggleStatusDropdown(applicant.id)"
        class="applicants-table__toggle-status-btn"
        :class="[
          applicant.applicationStatus === 'PENDING'
            ? 'applicants-table__toggle-status-btn--pending-active'
            : applicant.applicationStatus === 'ACCEPTED'
            ? 'applicants-table__toggle-status-btn--accepted-active'
            : 'applicants-table__toggle-status-btn--rejected-active',
        ]"
      >
        <Icon
          name="fontisto:radio-btn-active"
          class="applicants-table__status-icon"
        />
        {{ applicant.applicationStatus }}
        <Icon
          name="teenyicons:down-solid"
          class="applicants-table__down-icon"
        />
      </button>
      <ul
        class="applicants-table__dropdown"
        :class="{
          active: isStatusDropdownOpen && applicant.id === activeRowId,
          'applicants-table__dropdown--last-row': isLastRow,
        }"
      >
        <li class="applicants-table__dropdown-item">
          <button
            class="applicants-table__status--pending-btn"
            :class="{ active: applicant.applicationStatus === 'PENDING' }"
            :disabled="applicant.applicationStatus === 'PENDING'"
            @click.stop="handleChangeCustomerStatus(applicant.id, 'PENDING')"
          >
            <Icon
              name="fontisto:radio-btn-active"
              class="applicants-table__status-icon"
            />
            Pending
          </button>
        </li>
        <li class="applicants-table__dropdown-item">
          <button
            class="applicants-table__status--accepted-btn"
            :class="{ active: applicant.applicationStatus === 'ACCEPTED' }"
            :disabled="applicant.applicationStatus === 'ACCEPTED'"
            @click.stop="handleChangeCustomerStatus(applicant.id, 'ACCEPTED')"
          >
            <Icon
              name="fontisto:radio-btn-active"
              class="applicants-table__status-icon"
            />
            Accepted
          </button>
        </li>
        <li class="applicants-table__dropdown-item">
          <button
            class="applicants-table__status--rejected-btn"
            :class="{ active: applicant.applicationStatus === 'REJECTED' }"
            :disabled="applicant.applicationStatus === 'REJECTED'"
            @click.stop="handleChangeCustomerStatus(applicant.id, 'REJECTED')"
          >
            <Icon
              name="fontisto:radio-btn-active"
              class="applicants-table__status-icon"
            />
            Rejected
          </button>
        </li>
      </ul>
    </td>
    <td class="applicants-table__cell">
      <p class="applicants-table__text">
        <a :href="applicant.resumeUrl" target="_blank">
          <img :src="applicant.resumeUrl" :alt="applicant.firstname" />
        </a>
      </p>
    </td>
    <td class="applicants-table__cell">
      <button
        title="Delete Applicant"
        @click="getApplicant(applicant)"
        class="applicants-table__btn applicants-table__delete-applicant-btn"
      >
        <Icon class="applicants__table-icon" name="jam:trash" />
      </button>
    </td>
  </tr>
</template>
<script setup lang="ts">
const props = defineProps([
  "applicant",
  "isLastRow",
  "getApplicant",
  "toggleApplicantStatus",
  "isStatusDropdownOpen",
  "activeRowId",
  "getActiveRowId",
  "toggleStatusDropdown",
]);

const handleToggleStatusDropdown = (applicantId: number) => {
  props.getActiveRowId(applicantId);
  props.toggleStatusDropdown();
};

const handleChangeCustomerStatus = (applicantId: number, status: string) => {
  props.toggleApplicantStatus(applicantId, status);
  props.toggleStatusDropdown();
};

const closeStatusDropdown = () => {
  if (props.isStatusDropdownOpen) {
    props.toggleStatusDropdown();
  }
};
window.addEventListener("click", closeStatusDropdown);
</script>
<style scoped>
.applicants-table__cell {
  padding: 25px;
  text-align: left;
}
.applicants-table__cell {
  padding: 8px 25px;
  vertical-align: middle;
  border-top: 1px solid #e0e0e0;
  color: #444;
}
.applicants-table__status-cell {
  position: relative;
  font-size: 18px;
}
.applicants-table__dropdown {
  position: absolute;
  top: 60px;
  padding: 10px;
  width: 130px;
  border-radius: 5px;
  background: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease-out;
  opacity: 0;
  z-index: -1;
}

.applicants-table__dropdown--last-row.active,
.applicants-table__dropdown.active {
  opacity: 1;
  z-index: 1;
}
.applicants-table__dropdown.active {
  top: 50px;
}
.applicants-table__dropdown--last-row.active {
  top: -110px;
}
.applicants-table__dropdown-item:not(:last-child) {
  padding-bottom: 15px;
}
.applicants-table__toggle-status-btn {
  display: flex;
  align-items: center;
  padding: 8px 15px;
  border-radius: 30px;
  font-size: 12px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
  background: #fff;
}
.applicants-table__toggle-status-btn--pending-active,
.applicants-table__status--pending-btn,
.applicants-table__status--pending-btn.active {
  color: orange;
}

.applicants-table__toggle-status-btn--accepted-active,
.applicants-table__status--accepted-btn,
.applicants-table__status--accepted-btn.active {
  color: green;
}

.applicants-table__toggle-status-btn--rejected-active,
.applicants-table__status--rejected-btn,
.applicants-table__status--rejected-btn.active {
  color: red;
}
.applicants-table__status--pending-btn:disabled,
.applicants-table__status--accepted-btn:disabled,
.applicants-table__status--rejected-btn:disabled {
  opacity: 0.9;
  cursor: not-allowed;
}
.applicants-table__status-icon {
  margin-right: 5px;
}
.applicants-table__down-icon {
  margin-left: 5px;
  font-size: 10px;
}
.applicants-table__img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
}
.applicants-table__btns-box {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
}
.applicants-table__delete-applicant-btn {
  font-size: 18px;
  color: red;
}
</style>