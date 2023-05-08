import {ref} from 'vue'
import {defineStore} from 'pinia'


export const useRoleStore = defineStore('role', () => {
    const currentRole = ref('user')
    const allRoles = ['user', 'admin']

    // const isAdmin = computed(() => currentRole.value === 'admin')
    function setRole(newRole) {
        if (allRoles.includes(newRole)) {
            currentRole.value = newRole
        }
    }

    return {currentRole, setRole}
})
