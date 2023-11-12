import { ref } from "vue";
import { defineStore } from "pinia";
import jwtDecode from "jwt-decode";
export const useUsersStore = defineStore("users", () => {
  const username = ref("");
  const role = ref("");
  const token = ref("");
  const refreshToken = ref("");

  function setUsername(setUsername) {
    username.value = setUsername;
  }

  function setRole(setRole) {
    role.value = setRole;
  }

  function setToken(setToken) {
    token.value = setToken;
    localStorage.setItem("token", setToken);
  }

  function setRefreshToken(setRefreshToken) {
    refreshToken.value = setRefreshToken;
  }

  function logout() {
    username.value = "";
    role.value = "";
    token.value = "";
    refreshToken.value = "";
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
  }

function recall() {
    const storedToken = localStorage.getItem("token");
    const storedRefreshToken = localStorage.getItem("refreshToken");
    if (storedToken && storedRefreshToken) {
        if (!token.value) {
            token.value = storedToken;
            refreshToken.value = storedRefreshToken;
            const { username: storedUsername, role: storedRole } = jwtDecode(token.value);
            username.value = storedUsername;
            role.value = storedRole;
        }
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
    logout,
  };
});
