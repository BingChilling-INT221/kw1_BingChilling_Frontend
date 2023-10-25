import {ref} from 'vue'
import {defineStore} from 'pinia'

export const useUsersStore = defineStore('users', () => {
    const username = ref('')
    const role = ref('')
    const token = ref('')
    const refreshToken = ref('')

    function setUsername(setUsername) {
        username.value = setUsername
    }

    function setRole(setRole) {
        role.value = setRole
    }

    function setToken(setToken) {
        token.value = setToken
    }

    function setRefreshToken(setRefreshToken) {
        refreshToken.value = setRefreshToken
    }

    function logout() {
        username.value = ''
        role.value = ''
        token.value = ''
        refreshToken.value = ''
        localStorage.removeItem('token')
        localStorage.removeItem('refreshToken')
    }

    function recall() {
        token.value = localStorage.getItem('token')
        refreshToken.value = localStorage.getItem('refreshToken')
        if (token.value === null) {
            // const data = JWTDecode(token.value)
            // username.value = data.username
            // role.value = data.role
        }
    }

    return {
        username,
        role,
        token,
        refreshToken,
        setUsername,
        recall,
        setRole,
        setToken,
        setRefreshToken,
        logout
    }
})