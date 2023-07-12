<template>
  <section class="employee-notes">
    <header class="employee-notes__header">
      <h1 class="employee-notes__title">All Employee Notes</h1>
    </header>
    <PizzaLoader v-if="isLoading" />
    <DeleteItemModal
      v-if="noteId"
      :isModalOpen="isModalOpen"
      :closeModal="toggleModal"
      :handleDeleteClick="handleDeleteEmployeeNoteClick"
      deleteItem="Employee Note"
    />
    <div class="employee-notes__table-box">
      <div class="employee-notes__action-header">
        <NuxtLink
          class="employee-notes__add-note-link"
          to="/employee/add-employee-note"
        >
          <Icon name="wpf:note" class="employee-notes__add-note-icon" />
          Add a New Note
        </NuxtLink>
        <button
          @click="fetchAllNotes"
          title="Refetch Notes"
          class="employee-notes__refetch-notes-btn"
        >
          <Icon name="ooui:reload" class="employee-notes__refetch-data-icon" />
        </button>
      </div>
      <div class="employee-notes__missing-notes-box" v-if="!notes.length">
        <header class="employee-notes__header">
          <h2 class="employee-notes__secondary-title">
            Please Create an Employee to Add a Note
          </h2>
        </header>
      </div>
      <table v-else class="employee-notes__table">
        <thead>
          <tr class="employee-notes__table-row">
            <th scope="col" class="employee-notes__table-head">Id</th>
            <th scope="col" class="employee-notes__table-head">Employee</th>
            <th scope="col" class="employee-notes__table-head">Note</th>
            <th scope="col" class="employee-notes__table-head">Note Date</th>
            <th scope="col" class="employee-notes__table-head">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr
            class="employee-notes__table-row"
            v-for="note in notes"
            :key="note.employeeId"
          >
            <td class="employee-notes__table-cell">
              {{ note.employeeId }}
            </td>
            <td class="employee-notes__table-cell">
              {{ note.fullname }}
            </td>
            <td
              class="employee-notes__table-cell employee-notes__table-note-cell"
            >
              <span v-if="note.note">
                {{ truncateStr(note.note, 20) }}
              </span>
              <span v-else> No Note Created </span>
            </td>

            <td class="employee-notes__table-cell">
              <span v-if="note.date">{{
                DateTime.fromISO(note.date).toFormat("dd/MM/yyyy")
              }}</span>
              <span v-else> No Note Created </span>
            </td>
            <td class="employee-notes__table-cell">
              <div v-if="note.noteId" class="employee-notes__table-btns-box">
                <NuxtLink
                  title="Edit note"
                  :to="`/employee/edit-note/${note.noteId}/${note.employeeId}`"
                  class="employee-notes__table-btn employee-notes__table-edit-note-btn"
                >
                  <Icon
                    class="employee-notes___table-icon"
                    name="lucide:edit"
                  />
                </NuxtLink>
                <button
                  @click="getDeleteItemId(note.noteId, note.employeeId)"
                  title="Delete Note"
                  class="employee-notes__table-btn employee-notes__table-delete-note-btn"
                >
                  <Icon class="employee-notes___table-icon" name="jam:trash" />
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>
<script setup lang="ts">
import { useLoading } from "~/composables/useLoading";
import { DateTime } from "luxon";
import { getAllEmployeeNotes, deleteEmployeeNote } from "~/api/employee";
import { INote } from "~/types/employee";

const { $toast } = useNuxtApp();
const noteId = ref("");
const employeeId = ref(-1);
const notes = ref<INote[]>([]);

const { isLoading, startLoading, stopLoading } = useLoading();
const { isModalOpen, toggleModal } = useModal();

const truncateStr = (text: string, truncateAmount = 50) => {
  return `${text.slice(0, truncateAmount)}...`;
};

const fetchAllNotes = async () => {
  try {
    startLoading();
    let noteArr: INote[] = [];
    const employeesResponse = await getAllEmployeeNotes();
    notes.value = employeesResponse.data.data
      .map((note: any) => {
        if (note.employeeNotes.length) {
          note.employeeNotes = note.employeeNotes.map(
            (employeeNote: INote) => ({
              ...employeeNote,
              fullname: `${note.firstname} ${note.lastname}`,
              noteId: employeeNote.id,
              employeeId: note.id,
            })
          );
          noteArr.push(...note.employeeNotes);
          return note.employeeNotes;
        } else {
          return {
            fullname: `${note.firstname} ${note.lastname}`,
            note: "",
            employeeId: note.id,
            date: "",
          };
        }
      })
      .filter((note: any) => !Array.isArray(note));

    for (const noteVal of noteArr) {
      notes.value.push(noteVal);
    }
    stopLoading();
  } catch (err) {
    stopLoading();
    console.log("Error", err);
  }
};
fetchAllNotes();

const getDeleteItemId = (nId: number, eId: number) => {
  noteId.value = nId.toString();
  employeeId.value = eId;
  toggleModal();
};

const handleDeleteEmployeeNoteClick = async () => {
  try {
    await deleteEmployeeNote(noteId.value, employeeId.value);
    $toast.success(`Employee note is deleted successfully!`);
    fetchAllNotes();
  } catch (err) {
    console.log("Delete note error", err);
  }
};
</script>
<style scoped>
.employee-notes__header {
  text-align: center;
  margin-bottom: 35px;
}
.employee-notes__title {
  font-size: clamp(1.4rem, calc(1.5vw + 1rem), 2rem);
  font-weight: 600;
}
.employee-notes__action-header {
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #f5f5f5;
  padding: 15px 20px;
}
.employee-notes__add-note-link {
  padding: 10px 20px;
  border-radius: 5px;
  background: #fc8019;
  color: #fff;
}
.employee-notes__refetch-notes-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #fc8019;
  color: #fff;
  font-size: 22px;
}
.employee-notes__table-box {
  overflow-y: hidden;
  overflow-x: auto;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
.employee-notes__missing-notes-box {
  padding: 40px 0 20px 0;
}
.employee-notes__secondary-title {
  font-size: clamp(1.2rem, calc(1.5vw + 1rem), 1.6rem);
  font-weight: 600;
}
.employee-notes__table {
  width: 300%;
  table-layout: fixed;
  font-size: 14px;
}
.employee-notes__table-head,
.employee-notes__table-cell {
  padding: 25px;
  text-align: left;
}
.employee-notes__table-cell {
  padding: 15px 25px;
  vertical-align: middle;
  border-top: 1px solid #e0e0e0;
  color: #444;
}
.employee-notes__table-note-cell > * {
  word-break: break-all;
}
.employee-notes__table-row {
  display: flex;
}
.employee-notes__table-row > .employee-notes__table-cell,
.employee-notes__table-head {
  flex: 1;
}
.employee-notes__table-btns-box {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
}

.employee-notes__table-edit-note-btn > *,
.employee-notes__table-delete-note-btn > * {
  font-size: 18px;
}

.employee-notes__table-edit-note-btn {
  color: #fc8019;
  font-size: 22px;
}
.employee-notes__table-delete-note-btn {
  color: red;
  font-size: 22px;
}

@media (min-width: 1350px) {
  .employee-notes__table {
    width: 100%;
  }
}
</style>