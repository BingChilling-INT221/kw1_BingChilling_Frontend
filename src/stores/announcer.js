import { computed, ref } from 'vue'
import { defineStore } from 'pinia'

export const useAnnouncerStore = defineStore('announcer ', () => {
    const mode = ref('Active')
    const category = ref('')
    const page = ref(1)
    function setMode(mode) {
        mode.value = mode
    }
    function setCategory(category) {
        category.value = category
    }
    function setPage(page) {
        page.value = page
    }
    return { mode, category, page, setMode, setCategory, setPage }
})
