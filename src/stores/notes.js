import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useNotes = defineStore('notes', () => {

const notes = ref([])
function updateNote(note){
notes.value.push(note)
}

return{notes, updateNote}
})
