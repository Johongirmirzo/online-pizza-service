<template>
  <div v-if="isModalOpen" class="modal-wrapper">
    <div class="modal">
      <header class="modal__header">
        <h3 class="modal__title">Delete {{ deleteModalData.data }}</h3>
        <button @click="toggleModal" class="modal__cancel-btn">
          <Icon name="maki:cross" />
        </button>
      </header>
      <div
        v-if="currentActiveScreen === 1"
        class="modal__screen modal__screen--1"
      >
        <div class="modal__body">
          <p class="modal__text">
            Are you absolutely sure you want to delete
            <strong class="modal__strong"
              >{{ deleteModalData.type }}: {{ deleteModalData.data }}</strong
            >?
          </p>
        </div>
        <footer class="modal__footer">
          <button @click="moveToNextScreen" class="modal__btn modal__btn--1">
            I want to delete this data
          </button>
        </footer>
      </div>
      <div
        v-else-if="currentActiveScreen === 2"
        class="modal__screen modal__screen--2"
      >
        <div class="modal__body">
          <p class="modal__text">
            Once you delete this data, all the data that's associated with it,
            will also be deleted. And data can't be restored
          </p>
        </div>
        <footer class="modal__footer">
          <button @click="moveToNextScreen" class="modal__btn modal__btn--2">
            I've read and understand consequences
          </button>
        </footer>
      </div>
      <div v-else class="modal__screen modal__screen--3">
        <div class="modal__body">
          <strong class="modal__strong">
            <Icon name="solar:danger-triangle-bold" class="modal__icon" />
            This action can't be undone
          </strong>
        </div>
        <footer class="modal__footer">
          <p class="modal__confirmation-text">
            To confirm, type "I'm sure that I want to delete this data" in the
            box below
          </p>
          <input
            v-model.trim="userConfirmationText"
            type="text"
            class="modal__input"
          />
          <button
            @click="handleDeleteData(deleteModalData.id)"
            :disabled="confirmationText !== userConfirmationText"
            class="modal__btn modal__delete-btn modal__btn--3"
            :class="{ disabled: confirmationText !== userConfirmationText }"
          >
            <span v-if="isDeletingData">Deleting Data...</span>
            <span>Delete Data</span>
          </button>
        </footer>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
const props = defineProps([
  "isModalOpen",
  "isDeletingData",
  "currentActiveScreen",
  "toggleModal",
  "moveToNextScreen",
  "deleteModalData",
  "deleteData",
]);

const userConfirmationText = ref("");
const confirmationText = ref("I'm sure that I want to delete this data");

const handleDeleteData = (id: number) => {
  userConfirmationText.value = "";
  props.deleteData(id);
};
</script>
<style scoped>
.modal-wrapper {
  position: fixed;
  inset: 0;
  display: grid;
  place-items: center;
  background: rgba(0, 0, 0, 0.8);
  z-index: 9999;
}
.modal {
  padding: 15px 0;
  max-width: 660px;
  width: 90%;
  background: #fff;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(255, 255, 255, 0.1);
}
.modal__header {
  position: relative;
  border-bottom: 2px solid #e7e7e7;
}
.modal__title {
  padding: 0 20px;
  font-size: clamp(1.3rem, calc(1.5vw + 1rem), 1.8rem);
  word-break: break-word;
}
.modal__cancel-btn {
  position: absolute;
  top: 10px;
  right: 10px;
}
.modal__body {
  padding: 20px;
}
.modal__text {
  color: #555;
}
.modal__strong {
  word-break: break-word;
  font-weight: 600;
}
.modal__footer {
  padding: 20px 20px 0 20px;
  border-top: 1px solid #ccc;
}
.modal__btn {
  padding: 10px 0;
  display: block;
  width: 100%;
  border-radius: 5px;
  background: #ebebeb;
  font-weight: 600;
  color: #444;
  border: 2px solid transparent;
  transition: all 0.3s ease-out;
}
.modal__btn:hover {
  outline: 2px solid rgb(224, 224, 224) beb;
  background: hsl(0, 0%, 85%);
}
.modal__screen--3 .modal__strong {
  display: block;
  color: #444;
}
.modal__confirmation-text {
  font-weight: 600;
  color: #444;
}
.modal__input {
  display: block;
  margin-bottom: 10px;
  padding: 8px 5px;
  width: 100%;
  border-radius: 5px;
  border: 0;
  border: 1px solid red;
}
.modal__delete-btn {
  background: hsl(0, 90%, 50%);
  color: #fff;
}
.modal__delete-btn:hover {
  background: hsl(0, 90%, 55%);
}
.modal__delete-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>