import {ref} from 'vue'
import {defineStore} from 'pinia'

export const useAnnouncerStore = defineStore('announcer ', () => {
    const mode = ref('active')
    const category = ref('')
    const page = ref(0)
    const pageSize = ref(5)
    const count = ref(false)
    const darkMode = ref(true)
    const baseColour = ref(darkMode.value ? 'blackCustom' : 'whiteCustom');
    const textColour = ref(!darkMode.value ? 'blackCustom' : 'whiteCustom');
    function setDarkMode() {
        darkMode.value = !darkMode.value
    }
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

    function setCount(setCount) {
        count.value = setCount
    }


    return {
        mode,
        category,
        page,
        pageSize,
        count,
        setMode,
        setCategory,
        setPage,
        darkMode,
        baseColour,
        textColour,
        setPageSize,
        setCount,
        setDarkMode
    }

})
