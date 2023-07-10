<template>
  <tr class="messages__table-row messages-table__body-row">
    <td class="messages-table__cell">
      <p class="messages-table__text">
        {{ review.id }}
      </p>
    </td>
    <td class="messages-table__cell">
      <p class="message-table__text">
        {{ review.reviewSubject }}
      </p>
    </td>
    <td class="messages-table__cell">
      <p class="messages-table__text">
        {{ review.message }}
      </p>
    </td>
    <td class="messages-table__cell">
      <p class="messages-table__text">
        {{ review.stars }}
      </p>
    </td>
    <td class="messages-table__cell messages-table__status-cell">
      <button
        @click.stop="handleToggleStatusDropdown(review.id)"
        class="messages-table__toggle-status-btn"
        :class="[
          review.status === 'PUBLIC'
            ? 'messages-table__toggle-status-btn--accepted-active'
            : 'messages-table__toggle-status-btn--rejected-active',
        ]"
      >
        <Icon
          name="fontisto:radio-btn-active"
          class="messages-table__status-icon"
        />
        {{ review.status }}
        <Icon name="teenyicons:down-solid" class="messages-table__down-icon" />
      </button>
      <ul
        class="messages-table__dropdown"
        :class="{
          active: isStatusDropdownOpen && review.id === activeRowId,
          'messages-table__dropdown--last-row': isLastRow,
        }"
      >
        <li class="messages-table__dropdown-item">
          <button
            class="messages-table__status--accepted-btn"
            :class="{ active: review.status === 'PUBLIC' }"
            :disabled="review.status === 'PUBLIC'"
            @click.stop="handleChangeReviewStatus(review.id, 'PUBLIC')"
          >
            <Icon
              name="fontisto:radio-btn-active"
              class="messages-table__status-icon"
            />
            Public
          </button>
        </li>
        <li class="messages-table__dropdown-item">
          <button
            class="messages-table__status--rejected-btn"
            :class="{ active: review.status === 'PRIVATE' }"
            :disabled="review.status === 'PRIVATE'"
            @click.stop="handleChangeReviewStatus(review.id, 'PRIVATE')"
          >
            <Icon
              name="fontisto:radio-btn-active"
              class="messages-table__status-icon"
            />
            Private
          </button>
        </li>
      </ul>
    </td>

    <td class="messages-table__cell">
      <p class="messages-table__text">
        {{ DateTime.fromISO(review.date).toFormat("dd/MM/yyyy") }}
      </p>
    </td>
  </tr>
</template>
<script setup lang="ts">
import { DateTime } from "luxon";
const props = defineProps([
  "review",
  "isLastRow",
  "isStatusDropdownOpen",
  "activeRowId",
  "getActiveRowId",
  "toggleStatusDropdown",
  "toggleReviewStatus",
]);

const handleToggleStatusDropdown = (reviewId: number) => {
  props.getActiveRowId(reviewId);
  props.toggleStatusDropdown();
};

const handleChangeReviewStatus = (reviewId: number, status: string) => {
  props.toggleReviewStatus(reviewId, status);
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
.messages-table__cell {
  padding: 26px;
  text-align: left;
}
.messages-table__cell {
  padding: 5px 25px;
  vertical-align: middle;
  border-top: 1px solid #e0e0e0;
  color: #444;
}
.messages-table__status-cell {
  position: relative;
  font-size: 18px;
}
.messages-table__dropdown {
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

.messages-table__dropdown--last-row.active,
.messages-table__dropdown.active {
  opacity: 1;
  z-index: 1;
}
.messages-table__dropdown.active {
  top: 50px;
}
.messages-table__dropdown--last-row.active {
  top: -110px;
}
.messages-table__dropdown-item:not(:last-child) {
  padding-bottom: 15px;
}
.messages-table__toggle-status-btn {
  display: flex;
  align-items: center;
  padding: 8px 15px;
  gap: 5px;
  border-radius: 30px;
  font-size: 12px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
  background: #fff;
}
.messages-table__toggle-status-btn--pending-active,
.messages-table__status--pending-btn,
.messages-table__status--pending-btn.active {
  color: orange;
}

.messages-table__toggle-status-btn--accepted-active,
.messages-table__status--accepted-btn,
.messages-table__status--accepted-btn.active {
  color: green;
}

.messages-table__toggle-status-btn--rejected-active,
.messages-table__status--rejected-btn,
.messages-table__status--rejected-btn.active {
  color: red;
}
.messages-table__status--pending-btn:disabled,
.messages-table__status--accepted-btn:disabled,
.messages-table__status--rejected-btn:disabled {
  opacity: 0.9;
  cursor: not-allowed;
}
.messages-table__btns-box {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
}
.messages-table__delete-message-btn > *,
.messages-table__view-employee-btn > * {
  font-size: 18px;
}

.messages-table__delete-message-btn {
  color: red;
}
.messages-table__view-employee-btn {
  color: rgb(85, 85, 214);
}
@media (min-width: 760px) {
  .messages-table {
    width: 200%;
  }
}
@media (min-width: 1350px) {
  .messages__table-box {
    overflow-x: hidden;
  }
  .messages-table {
    width: 100%;
    table-layout: normal;
  }
}
</style>