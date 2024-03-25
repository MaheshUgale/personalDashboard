<template>
  <div class="task-container">
    <div class="form-container">
      <input
        type="text"
        v-model="newTask.title"
        placeholder="Task Title"
        class="input-field"
        required
      />
      <textarea
        type="text"
        v-model="newTask.description"
        placeholder="Task Description"
        class="input-field"
        rows="3"
        required
      ></textarea>
      <input
        type="date"
        v-model="newTask.dueDate"
        class="input-field"
        required
      />
      <select v-model="newTask.priority" class="input-field" required>
        <option value="" disabled>Select a priority</option>
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>
      <p v-if="validationMessage" class="validation-message">
        {{ validationMessage }}
      </p>
      <button @click="validateAndAddTask" class="btn add-btn">Add Task</button>
    </div>

    <div v-if="tasks.length > 0" class="tasks-container">
      <h2>Tasks:</h2>
      <ul class="task-list">
        <li v-for="(task, index) in tasks" :key="index" class="task-item">
          <div class="task-details">
            <p><strong>Title: </strong>{{ task.title }}</p>
            <p><strong>Description: </strong>{{ task.description }}</p>
            <p><strong>Due Date: </strong>{{ task.dueDate }}</p>
            <p :class="getPriorityClass(task.priority)">
              <strong>Priority: </strong>{{ task.priority }}
            </p>
          </div>
          <div class="task-actions">
            <button @click="editTask(index)" class="btn edit-btn">Edit</button>
            <button @click="deleteTask(index)" class="btn delete-btn">
              Delete
            </button>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import { taskState } from "../../stores/TaskState";
import "vue3-toastify/dist/index.css";
import { toast } from "vue3-toastify";

const store = taskState();
const validationMessage = ref("");
const newTask = {
  title: "",
  description: "",
  dueDate: "",
  priority: "",
};

function validateAndAddTask() {
  if (isValidForm()) {
    store.createTask({ ...newTask });
    toast.success("Your task is added", {
      autoClose: 3000,
    });
    clearFields();
    validationMessage.value = ""; // Clear any previous validation message
  } else {
    validationMessage.value = "Please fill out all the required fields.";
  }
}
function getPriorityClass(priority) {
  switch (priority) {
    case "Low":
      return "priority-low";
    case "Medium":
      return "priority-medium";
    case "High":
      return "priority-high";
    default:
      return "";
  }
}
function isValidForm() {
  return (
    newTask.title && newTask.description && newTask.dueDate && newTask.priority
  );
}
const tasks = computed(() => store.tasks);

function editTask(index) {
  newTask.title = tasks.value[index].title;
  newTask.description = tasks.value[index].description;
  newTask.dueDate = tasks.value[index].dueDate;
  newTask.priority = tasks.value[index].priority;
  deleteTask(index);
}

function deleteTask(index) {
  toast.warn("Your task is deleted!", {
    autoClose: 3000,
  });
  store.deleteTask(index);
}

function clearFields() {
  newTask.title = "";
  newTask.description = "";
  newTask.dueDate = "";
  newTask.priority = "";
}
</script>

<style scoped>
.container {
  max-width: 600px;
  margin: 0 auto;
}
.validation-message {
  color: red;
  margin-block: 10px;
}
.form-container {
  width: 50%;
  max-width: 580px;
}

.priority-low {
  background-color: green;
  width: fit-content;
  color: #fff;
  padding: 10px;
  border: 1px solid green;
  border-radius: 11px;
}

.priority-medium {
  background-color: yellow;
  width: fit-content;
  padding: 10px;
  border: 1px solid green;
  border-radius: 11px;
}

.priority-high {
  background-color: red;
  color: #fff;
  width: fit-content;
  padding: 10px;
  border: 1px solid green;
  border-radius: 11px;
}
.input-field {
  font-size: 20px;
}

.btn {
  padding: 8px 16px;
  cursor: pointer;
}

input[type="text"],
textarea {
  width: 95%;
  padding: 12px;
  margin: 8px 0;
  box-sizing: border-box;
  border: 1px solid #ccc;
  border-radius: 4px;
}

input[type="date"] {
  width: 95%;
  padding: 12px;
  box-sizing: border-box;
  margin: 8px 0;
  border: 1px solid #ccc;
  border-radius: 4px;
}

select {
  width: 95%;
  padding: 12px;
  margin: 8px 0;
  box-sizing: border-box;
  border: 1px solid #ccc;
  border-radius: 4px;
}

input[type="text"]:focus,
textarea:focus,
input[type="date"]:focus,
select:focus {
  border-color: #007bff;
  outline: none;
  box-sizing: border-box;
}

input[type="submit"] {
  background-color: #007bff;
  color: white;
  padding: 14px 20px;
  margin: 8px 0;
  border: none;
  box-sizing: border-box;
  border-radius: 4px;
  cursor: pointer;
}

input[type="submit"]:hover {
  background-color: #0056b3;
}

.add-btn {
  background-color: #007bff;
  color: white;
  border: none;
}

.edit-btn {
  background-color: #ffc107;
  color: black;
  border: none;
}

.delete-btn {
  background-color: #f44336;
  color: white;
  border: none;
}

.tasks-container {
  padding: 10px;
  width: 50%;
}
.tasks-container h2 {
  font-size: 30px;
  text-align: center;
  margin-bottom: 11px;
  color: #fff;
}

.task-list {
  list-style-type: none;
  padding: 0;
}
.task-item {
  margin-bottom: 20px;
  padding: 15px;
  border: 1px solid #eee;
  border-radius: 18px;
  display: flex;
  background: #fff;
  justify-content: space-between;
}

.task-details {
  width: 350px;
}
.task-details p {
  margin-bottom: 10px;
  font-size: 20px;
}

.task-actions {
  display: flex;
  gap: 10px;
  align-items: center;
}

.btn {
  padding: 8px 16px;
  cursor: pointer;
}

.edit-btn {
  background-color: #ffc107;
  color: black;
  border: none;
}

.delete-btn {
  background-color: #f44336;
  color: white;
  border: none;
}
</style>
