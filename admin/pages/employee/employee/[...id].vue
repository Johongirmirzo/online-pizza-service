<template>
  <section class="employee" v-if="employee">
    <SectionHeader
      :redirectLink="redirectLink"
      :redirectText="redirectText"
      :title="title"
    >
      <template #header-icon>
        <Icon name="fa-solid:users" />
      </template>
    </SectionHeader>
    <PizzaLoader v-if="isLoadingEmployee" />
    <div class="employee__profile-box">
      <figure class="employee__profile-img-box">
        <img
          :src="employee.photo"
          :alt="`Image of ${fullname(employee.firstname, employee.lastname)}`"
          class="employee__profile-img"
        />
      </figure>
      <div class="employee__profile-text-box">
        <div class="employee__profile-card">
          <ul class="employee__profile-list">
            <li class="employee__profile-item">
              <srong class="employee__profile-strong"> Job Title </srong>
              <p class="employee__profile-text">
                {{ employee.role }}
              </p>
            </li>
            <li class="employee__profile-item">
              <srong class="employee__profile-strong"> Salary </srong>
              <p class="employee__profile-text">${{ employee.salary }}</p>
            </li>
            <li class="employee__profile-item">
              <srong class="employee__profile-strong"> Email </srong>
              <p class="employee__profile-text">
                {{ employee.email }}
              </p>
            </li>
            <li class="employee__profile-item">
              <srong class="employee__profile-strong"> City </srong>
              <p class="employee__profile-text">
                {{ employee.city }}
              </p>
            </li>
            <li class="employee__profile-item">
              <srong class="employee__profile-strong"> Phone Number </srong>
              <p class="employee__profile-text">
                {{ employee.phoneNumber }}
              </p>
            </li>
            <li class="employee__profile-item">
              <srong class="employee__profile-strong"> Gender </srong>
              <p class="employee__profile-text">
                {{ employee.gender }}
              </p>
            </li>
            <li class="employee__profile-item">
              <srong class="employee__profile-strong"> Marital Status </srong>
              <p class="employee__profile-text">
                {{ employee.maritalStatus }}
              </p>
            </li>
            <li class="employee__profile-item">
              <srong class="employee__profile-strong"> Birth Date </srong>
              <p class="employee__profile-text">
                {{
                  DateTime.fromISO(employee.birthDate).toFormat("dd/MM/yyyy")
                }}
              </p>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="employee__navigate-tab-box">
      <ul class="employee__navigate-list">
        <li
          class="employee__navigate-item"
          :class="{ active: currentActiveTab === 'employee-info' }"
        >
          <button
            @click="handleGetActiveTab('employee-info')"
            class="employee__navigate-btn"
          >
            Employee Info
          </button>
        </li>
        <li
          class="employee__navigate-item"
          :class="{ active: currentActiveTab === 'employee-notes' }"
        >
          <button
            @click="handleGetActiveTab('employee-notes')"
            class="employee__navigate-btn"
          >
            Employee Notes
          </button>
        </li>
        <li
          class="employee__navigate-item"
          :class="{ active: currentActiveTab === 'employee-leave-days' }"
        >
          <button
            @click="handleGetActiveTab('employee-leave-days')"
            class="employee__navigate-btn"
          >
            Employee Leave Days
          </button>
        </li>
      </ul>
    </div>
    <section class="employee__info" v-if="currentActiveTab === 'employee-info'">
      <div class="employee__emergancy-contact-box">
        <header class="employee__emergancy-contact-header">
          <h2
            v-if="employee.emergancyContacts.length"
            class="employee__emrgancy-contact-title"
          >
            Emergancy Contact
          </h2>
          <h2 v-else class="employee__emrgancy-contact-title">
            Employer's No Emergancy Contacts
          </h2>
        </header>
        <div
          v-for="(emergancyContact, idx) in employee.emergancyContacts"
          :key="emergancyContact.id"
          class="employee__emergancy-contacts"
        >
          <h3 class="employee__emergancy-tertiary-title">
            Emergancy Contact: {{ idx + 1 }}
          </h3>
          <div class="employee__emergancy-row">
            <div>
              <strong class="employee__emergancy-strong">Relationship</strong>
              <p class="employee__emergancy-text">
                {{ emergancyContact.relationship }}
              </p>
            </div>
            <div>
              <strong class="employee__emergancy-strong">Full Name</strong>
              <p class="employee__emergancy-text">
                {{ emergancyContact.fullname }}
              </p>
            </div>
          </div>
          <div class="employee__emergancy-row">
            <div>
              <strong class="employee__emergancy-strong">Phone Number</strong>
              <p class="employee__emergancy-text">
                {{ emergancyContact.phoneNumber }}
              </p>
            </div>
            <div>
              <strong class="employee__emergancy-strong">Work Phone</strong>
              <p class="employee__emergancy-text">
                {{ emergancyContact.workPhone }}
              </p>
            </div>
          </div>
          <div class="employee__emergancy-row">
            <div>
              <strong class="employee__emergancy-strong">Email</strong>
              <p class="employee__emergancy-text">
                {{ emergancyContact.email }}
              </p>
            </div>
            <div>
              <strong class="employee__emergancy-strong">Contact Type</strong>
              <p class="employee__emergancy-text">
                {{ emergancyContact.contactType }}
              </p>
            </div>
          </div>
          <div class="employee__emergancy-row">
            <div>
              <strong class="employee__emergancy-strong">Address Line1</strong>
              <p class="employee__emergancy-text">
                {{ emergancyContact.addressLine1 }}
              </p>
            </div>
            <div>
              <strong class="employee__emergancy-strong">Address Line2</strong>
              <p class="employee__emergancy-text">
                {{ emergancyContact.addressLine2 }}
              </p>
            </div>
          </div>
          <div class="employee__emergancy-row">
            <div>
              <strong class="employee__emergancy-strong">Notes</strong>
              <p class="employee__emergancy-text">
                {{ emergancyContact.notes }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section
      class="employee__notes"
      v-if="currentActiveTab === 'employee-notes'"
    >
      <header
        v-if="!employee.employeeNotes.length"
        class="employee__notes-header"
      >
        <h2 class="employee__notes-title">
          There are no notes for this employee yet!
        </h2>
      </header>
      <ul v-else class="employee-note-card-list">
        <li
          v-for="note in employee.employeeNotes"
          :key="note.id"
          class="employee-note-card-list__item"
        >
          <div class="employee-note-card-list__body">
            <h5 class="employee-note-card-list__title">Employee Note</h5>
            <p class="employee-note-card-list__note-text">
              {{ note.note }}
            </p>

            <footer class="employee-note-card-list__footer">
              <time
                :datetime="note.date"
                class="employee-note-card-list__date-text"
              >
                <Icon
                  class="employee-note-card-list__icon"
                  name="fluent-mdl2:date-time"
                />
                {{ note.date }}
              </time>
            </footer>
          </div>
        </li>
      </ul>
    </section>
    <section
      class="employee__leave-days"
      v-if="currentActiveTab === 'employee-leave-days'"
    >
      <header
        v-if="!employee.leaveDays.length"
        class="employee__leave-days-header"
      >
        <h2 class="employee__leave-days-title">
          There are no leaves of this employee yet!
        </h2>
      </header>
      <ul class="employee-leave-day-card-list">
        <li
          v-for="leaveDay in employee.leaveDays"
          :key="leaveDay.id"
          class="employee-leave-day-card-list__item"
        >
          <div class="employee-leave-day-card-list__text-box">
            <div class="employee-leave-day-card-list__header">
              <h3 class="employee-leave-day-card-list__title">
                Employee Leave Day Info
              </h3>
            </div>
            <div class="employee-leave-day-card-list__body">
              <div class="employee-leave-day-card-list__row">
                <p>
                  <strong> From </strong>
                  {{ DateTime.fromISO(leaveDay.from).toFormat("dd/MM/yyyy") }}
                </p>
                <p>
                  <strong> To </strong>
                  {{ DateTime.fromISO(leaveDay.to).toFormat("dd/MM/yyyy") }}
                </p>
              </div>
              <div class="employee-leave-day-card-list__row">
                <p>
                  <strong> Status </strong>
                  {{ leaveDay.status }}
                </p>
              </div>
              <p></p>
              <div class="employee-leave-day-card-list__row">
                <p>
                  <strong> Leave Type </strong>
                  {{ leaveDay.leaveType }}
                </p>
              </div>
              <div class="employee-leave-day-card-list__row">
                <p>
                  <strong> Reason </strong>
                  {{ leaveDay.reason }}
                </p>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </section>
  </section>
</template>
<script setup lang="ts">
import { useLoading } from "~/composables/useLoading";
import { DateTime } from "luxon";
import { getEmployee } from "~/api/employee";

const redirectLink = "/employee/employees";
const redirectText = "Go Back To Employees";
const title = ref("Employee");

const { params } = useRoute();
const employee = ref();

const currentActiveTab = ref("employee-info");

const {
  isLoading: isLoadingEmployee,
  startLoading,
  stopLoading,
} = useLoading();

const fullname = (firstname: string, lastname: string) =>
  `${firstname} ${lastname}`;

watchEffect(async () => {
  try {
    startLoading();
    const employeeResponse = await getEmployee(params.id[0]);
    employee.value = employeeResponse.data.data;
    title.value = `Employee: ${fullname(
      employee.value.firstname,
      employee.value.lastname
    )}`;
    stopLoading();
  } catch (err) {
    stopLoading();
    console.log(err);
  }
});

const handleGetActiveTab = (activeTab: string) => {
  currentActiveTab.value = activeTab;
};
</script>
<style scoped>
.employee__profile-text-box {
  flex: 1;
}
.employee__profile-img-box {
  line-height: 0;
  margin-bottom: 25px;
}
.employee__profile-img {
  width: 300px;
  height: 200px;
  object-fit: cover;
}
.employee__profile-card {
  padding: 20px;
  height: 100%;
  border: 2px solid #b5b5b5;
}
.employee__profile-list {
  height: 100%;
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
  align-content: space-between;
}

.employee__profile-strong {
  font-weight: 600;
  font-size: 1.2rem;
}
.employee__profile-text {
  color: #444;
  font-size: 0.9rem;
}

.employee__navigate-tab-box {
  margin: 80px 0 50px 0;
}
.employee__navigate-list {
  display: flex;
  gap: 25px;
  border-bottom: 3px solid #e6e6e6;
}
.employee__navigate-item {
  position: relative;
  margin-bottom: 10px;
  border-radius: 5px;
  background: rgba(0, 0, 0, 0.04);
  transition: all 0.3s ease-out;
}
.employee__navigate-item:hover {
  background: rgba(0, 0, 0, 0.08);
}
.employee__navigate-item.active {
  background: transparent;
}
.employee__navigate-item.active::before {
  content: "";
  position: absolute;
  bottom: -15px;
  right: 0;
  height: 8px;
  width: 100%;
  background: #fc8019;
}
.employee__navigate-btn {
  padding: 11px;
  font-size: clamp(1rem, calc(1.5vw + 1rem), 1.05rem);
}
.employee__emergancy-contact-box {
  max-width: 760px;
  width: 90%;
}
.employee__emergancy-contact-header {
  margin-bottom: 25px;
}
.employee__emrgancy-contact-title {
  font-size: clamp(1rem, calc(1.5vw + 1rem), 1.5rem);
}
.employee__emergancy-tertiary-title {
  margin-bottom: 15px;
  font-size: 18px;
}
.employee__emergancy-row {
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
}
.employee__emergancy-strong {
  font-weight: 600;
  font-size: 19px;
}
.employee__emergancy-text {
  color: #444;
}

.employee__notes-header,
.employee__leave-days-header {
  margin: 50px 0;
  text-align: center;
}
.employee__notes-title,
.employee__leave-days-title {
  font-size: clamp(1.2rem, calc(1.5vw + 1rem), 1.5rem);
}

.employee-leave-day-card-list,
.employee-note-card-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 30px;
}
.employee-note-card-list__item {
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  padding: 15px;
  border-radius: 5px;
  cursor: pointer;
}
.employee-note-card-list__title {
  text-align: center;
  font-size: 1.2rem;
}
.employee-note-card-list__note-text {
  margin: 15px 0;
  color: #333;
}
.employee-note-card-list__footer {
  margin-top: 10px;
  padding-top: 10px;
  border-top: 1px solid #e7e7e7;

  font-size: 15px;
}

.employee-leave-day-card-list__title {
  margin-bottom: 15px;
  font-size: 1.2rem;
  text-align: center;
}
.employee-leave-day-card-list__item {
  padding: 15px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
}
.employee-leave-day-card-list__row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  margin-bottom: 15px;
  font-size: 15px;
}
.employee-leave-day-card-list__row strong {
  font-weight: 600;
  color: #222;
}

@media (min-width: 768px) {
  .employee__profile-img-box {
    margin-bottom: 0;
  }
  .employee__profile-list {
    grid-template-columns: 1fr 1fr;
  }
}
@media (min-width: 992px) {
  .employee__profile-box {
    display: flex;
    flex-wrap: wrap;
    gap: 50px;
  }
  .employee__profile-list {
    grid-template-columns: repeat(4, 1fr);
  }
}
</style>