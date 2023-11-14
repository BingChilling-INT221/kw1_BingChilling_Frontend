import { ref } from "vue";
import { defineStore } from "pinia";
import jwtDecode from "jwt-decode";
import {reToken} from "@/services/authorizationApi";
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

async function recall() {
    const storedToken = localStorage.getItem("token");
    const storedRefreshToken = localStorage.getItem("refreshToken");
    // console.log(storedToken, "storedToken");
    if ( storedRefreshToken) {
        // console.log("storedRefreshToken");
        refreshToken.value = storedRefreshToken;
        // console.log(refreshToken.value, "refreshToken.value");
        if (storedToken) {
            // console.log("storedToken");
            token.value = storedToken;
            const { username: storedUsername, role: storedRole } = jwtDecode(token.value);
            username.value = storedUsername;
            role.value = storedRole;
            return true;
        }
        else {
            console.log("reToken1");
            if (await reToken()) {
                console.log("reToken");
                return await recall();
            }
            console.log("reToken2");
        }
    }
    return false;

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
