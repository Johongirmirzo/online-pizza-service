<template>
  <tr class="users__table-row users-table__body-row">
    <td class="users-table__cell">
      <p class="users-table__text">
        {{ user.id }}
      </p>
    </td>
    <td class="users-table__cell">
      <img class="users-table__img" :src="user.photo" :alt="user.name" />
    </td>
    <td class="users-table__cell">
      <p class="users-table__text">
        {{ user.name }}
      </p>
    </td>
    <td class="users-table__cell">
      <p class="users-table__text">
        {{ user.phoneNumber }}
      </p>
    </td>
    <td class="users-table__cell">
      <p class="users-table__text">
        {{ user.email }}
      </p>
    </td>
    <td class="users-table__cell">
      <p class="users-table__text">
        {{ user.role }}
      </p>
    </td>
    <td class="users-table__cell users-table__status-cell">
      <button
        @click.stop="handleToggleStatusDropdown(user.id)"
        class="users-table__toggle-status-btn"
        :class="[
          user.status === 'PENDING'
            ? 'users-table__toggle-status-btn--pending-active'
            : user.status === 'ACTIVE'
            ? 'users-table__toggle-status-btn--active-active'
            : 'users-table__toggle-status-btn--rejected-active',
        ]"
      >
        <Icon
          name="fontisto:radio-btn-active"
          class="users-table__status-icon"
        />
        {{ user.status }}
        <Icon name="teenyicons:down-solid" class="users-table__down-icon" />
      </button>
      <ul
        class="users-table__dropdown"
        :class="{
          active: activeRowId === user.id && isStatusDropdownOpen,
          'users-table__dropdown--last-row': isLastRow,
        }"
      >
        <li class="users-table__dropdown-item">
          <button
            class="users-table__status--pending-btn"
            :class="{ active: user.status === 'PENDING' }"
            :disabled="user.status === 'PENDING'"
            @click.stop="handleChangeUserStatus(user.id, 'PENDING')"
          >
            <Icon
              name="fontisto:radio-btn-active"
              class="users-table__status-icon"
            />
            Pending
          </button>
        </li>
        <li class="users-table__dropdown-item">
          <button
            class="users-table__status--active-btn"
            :class="{ active: user.status === 'ACTIVE' }"
            :disabled="user.status === 'ACTIVE'"
            @click.stop="handleChangeUserStatus(user.id, 'ACTIVE')"
          >
            <Icon
              name="fontisto:radio-btn-active"
              class="users-table__status-icon"
            />
            Active
          </button>
        </li>
        <li class="users-table__dropdown-item">
          <button
            class="users-table__status--rejected-btn"
            :class="{ active: user.status === 'BLOCKED' }"
            :disabled="user.status === 'BLOCKED'"
            @click.stop="handleChangeUserStatus(user.id, 'BLOCKED')"
          >
            <Icon
              name="fontisto:radio-btn-active"
              class="users-table__status-icon"
            />
            Inactive
          </button>
        </li>
      </ul>
    </td>
    <td class="users-table__cell">
      <div class="users-table__btns-box">
        <NuxtLink
          title="Edit user"
          :to="`/edit-user/${user.id}`"
          class="users-table__btn users-table__edit-user-btn"
        >
          <Icon class="users__table-icon" name="lucide:edit" />
        </NuxtLink>
        <button
          title="Delete user"
          @click="getUser(user)"
          class="users-table__btn users-table__delete-user-btn"
        >
          <Icon class="users__table-icon" name="jam:trash" />
        </button>
      </div>
    </td>
  </tr>
</template>
<script setup lang="ts">
const props = defineProps([
  "user",
  "isLastRow",
  "getUser",
  "toggleUserStatus",
  "isStatusDropdownOpen",
  "activeRowId",
  "getActiveRowId",
  "toggleStatusDropdown",
]);

const handleToggleStatusDropdown = (userId: number) => {
  props.getActiveRowId(userId);
  props.toggleStatusDropdown();
};

const handleChangeUserStatus = (userId: number, status: string) => {
  props.toggleUserStatus(userId, status);
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
.users-table__cell {
  padding: 25px;
  text-align: left;
}
.users-table__cell {
  padding: 5px 25px;
  vertical-align: middle;
  border-top: 1px solid #e0e0e0;
  color: #444;
}
.users-table__img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
}
.users-table__btns-box {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
}
.users-table__status-cell {
  position: relative;
}
.users-table__dropdown {
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
.users-table__dropdown--last-row.active,
.users-table__dropdown.active {
  opacity: 1;
  z-index: 1;
}
.users-table__dropdown.active {
  top: 50px;
}
.users-table__dropdown--last-row.active {
  top: -110px;
}
.users-table__dropdown-item:not(:last-child) {
  padding-bottom: 15px;
}
.users-table__dropdown-item {
  font-size: 15px;
}
.users-table__toggle-status-btn {
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 8px 15px;
  border-radius: 30px;
  font-size: 12px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
  background: #fff;
}
.users-table__toggle-status-btn--pending-active,
.users-table__status--pending-btn,
.users-table__status--pending-btn.active {
  color: orange;
}

.users-table__toggle-status-btn--active-active,
.users-table__status--active-btn,
.users-table__status--active-btn.active {
  color: green;
}

.users-table__toggle-status-btn--rejected-active,
.users-table__status--rejected-btn,
.users-table__status--rejected-btn.active {
  color: red;
}
.users-table__status--pending-btn:disabled,
.users-table__status--active-btn:disabled,
.users-table__status--rejected-btn:disabled {
  opacity: 0.9;
  cursor: not-allowed;
}

.users-table__edit-user-btn,
.users-table__delete-user-btn {
  font-size: 18px;
}
.users-table__edit-user-btn {
  color: #fc8019;
}
.users-table__delete-user-btn {
  color: red;
}
</style>