import { ref } from 'vue'
import { defineStore } from 'pinia'

export const taskState = defineStore('taskState', () => {

    const tasks = ref([])

    function createTask(task) {
        tasks.value.push(task)
    }

    function updateTask(index, updatedTask) {
        tasks.value[index] = updatedTask
    }

    function deleteTask(index) {
        tasks.value.splice(index, 1)
    }

    return { tasks, createTask, updateTask, deleteTask }
})