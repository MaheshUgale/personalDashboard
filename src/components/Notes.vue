<template>
  <div class="notes-container">
    <form @submit.prevent="saveNotesData" class="notes-form">
      <div class="form-group">
        <input
          type="text"
          v-model.lazy="noteHeader"
          placeholder="Enter title"
          class="form-control"
          required
        />
      </div>
      <div class="form-group">
        <textarea
          v-model.lazy="noteInfo"
          placeholder="Enter notes"
          class="form-control"
          required
        ></textarea>
      </div>
      <button type="submit" class="btn btn-primary">Save</button>
    </form>

    <div class="note-list">
      <Note
        v-for="(note, index) in notes"
        :key="index"
        :note="note"
        :index="index"
        @editNote="editNote"
        @deleteNote="deleteNote"
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import Note from "@/components/Note.vue";
import { toast } from "vue3-toastify";

const noteHeader = ref("");
const noteInfo = ref("");
const notes = ref([]);
const editingNoteIndex = ref(-1);

const saveNotesData = () => {
  if (editingNoteIndex.value !== -1) {
    const editedNote = notes.value[editingNoteIndex.value];
    editedNote.noteHeader = noteHeader.value;
    editedNote.noteInfo = noteInfo.value;
    editingNoteIndex.value = -1;
  } else {
    notes.value.push({
      noteHeader: noteHeader.value,
      noteInfo: noteInfo.value,
    });
  }
  toast.success("You have added note!", {
    autoClose: 3000,
  });
  noteHeader.value = "";
  noteInfo.value = "";
};

const editNote = (index) => {
  editingNoteIndex.value = index;
  noteHeader.value = notes.value[index].noteHeader;
  noteInfo.value = notes.value[index].noteInfo;
};

const deleteNote = (index) => {
  notes.value.splice(index, 1);
  toast.warning("You have deleted the note successfully!", {
    autoClose: 3000,
  });
};
</script>

<style scoped>
.notes-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}

.notes-form {
  margin-bottom: 20px;
}

input[type="text"],
textarea {
  width: 100%;
  padding: 12px;
  margin: 8px 0;
  box-sizing: border-box;
  border: 1px solid #ccc;
  border-radius: 4px;
}
.form-label {
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
}
.note-list {
  height: 186px;
  overflow: auto;
}
.form-control {
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.btn {
  padding: 10px 20px;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.btn-primary {
  background-color: #007bff;
  color: #fff;
}

.btn-primary:hover {
  background-color: #0056b3;
}

.note-item {
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.note-item:hover {
  background-color: #f9f9f9;
}

@media (max-width: 768px) {
  input[type="text"],
  textarea,
  .form-control {
    font-size: 23px;
  }
}
</style>
