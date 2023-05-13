import {ref} from 'vue'
import {defineStore} from 'pinia'

export const useAnnouncerStore = defineStore('announcer ', () => {
    const mode = ref('Active')
    const category = ref('')
    const page = ref(0)
    const pageSize = ref(3)
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

    function setPageSize(setPageSize) {
        pageSize.value = setPageSize
    }


    function setDarkMode() {
        console.log('darkMode.value', darkMode.value)
        darkMode.value = !darkMode.value
    }

    return {mode, category, page, pageSize, setMode, setCategory, setPage, darkMode, setDarkMode, setPageSize}

})
