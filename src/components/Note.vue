<template>
  <div :class="noteTileClass" class="note-tile">
    <div class="note-header">{{ note.noteHeader }}</div>
    <div class="note-description">{{ note.noteInfo }}</div>
    <div class="button-group">
      <button class="edit-button" @click="$emit('editNote', index)">
        Edit
      </button>
      <button class="delete-button" @click="$emit('deleteNote', index)">
        Delete
      </button>
    </div>
  </div>
</template>

<script setup>
import { defineProps, computed } from "vue";

const { note, index } = defineProps({
  note: {
    required: true,
    type: Object,
  },
  index: {
    required: true,
    type: Number,
  },
});

const noteTileClass = computed(() => {
  const colors = ["#a3d7ff", "#ffd966", "#ff9999", "#c2f0c2", "#e0e0e0"];
  return "note-tile-" + (index % colors.length);
});
</script>
<style scoped>
/* Note Tile */
.note-tile {
  background-color: #a3d7ff;
  padding: 27px;
  border-radius: 16px;
  margin-bottom: 10px;
  box-shadow: inset -5px -12px 8px rgba(0, 0, 0, 0.1);
}

.note-header {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 10px;
}

/* Note Description */
.note-description {
  font-size: 16px;
  margin-bottom: 10px;
}

/* Button Group */
.button-group {
  display: flex;
}

/* Edit Button */
.edit-button,
.delete-button {
  padding: 8px 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.edit-button {
  background-color: #007bff;
  color: white;
  margin-right: 10px;
}

.edit-button:hover {
  background-color: #0056b3;
}

/* Delete Button */
.delete-button {
  background-color: #dc3545;
  color: white;
}

.delete-button:hover {
  background-color: #c82333;
}

/* Note Tile Colors */
.note-tile-0 {
  background-color: #a3d7ff;
}

.note-tile-1 {
  background-color: #ffd966;
}

.note-tile-2 {
  background-color: #ff9999;
}

.note-tile-3 {
  background-color: #c2f0c2;
}

.note-tile-4 {
  background-color: #e0e0e0;
}
</style>
