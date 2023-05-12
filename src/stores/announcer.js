import {ref} from 'vue'
import {defineStore} from 'pinia'

export const useAnnouncerStore = defineStore('announcer ', () => {
    const mode = ref('Active')
    const category = ref('')
    const page = ref(0)
    const darkMode = ref(true)

    function setMode(setMode) {
        mode.value = setMode
    }

    function setCategory(setCategory) {
        category.value = setCategory
    }

    function setPage(setPage) {
        page.value = setPage
    }

    function setDarkMode() {
        console.log('darkMode.value', darkMode.value)
        darkMode.value = !darkMode.value
    }

    return {mode, category, page, setMode, setCategory, setPage, darkMode, setDarkMode}

})
