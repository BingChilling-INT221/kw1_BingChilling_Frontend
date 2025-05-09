import router from "../router/index.js";
import jwtDecode from "jwt-decode";
import { useUsersStore } from "@/stores/user";

export const fetchMatch = async (sendData) => {
  const usersStore = useUsersStore();
  const token = usersStore.token;
  if (token === null) {
    if (await reToken()) {
      return await fetchMatch(sendData);
    }
  }
  const response = await fetch(`${import.meta.env.VITE_BASE_URL}users/match`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${token}`,
    },
    body: JSON.stringify(sendData),
  });
  if (response.status === 200) {
    return response;
  } else if (response.status === 401) {
    if (await reToken()) {
      return await fetchMatch(sendData);
    }
    return router.push({ name: "login" });
  } else {
    const errorResponse = await response.json();
    throw new Error(errorResponse.message);
  }
};
export const fetchCreateToken = async (sendData) => {
  const usersStore = useUsersStore();
  const response = await fetch(`${import.meta.env.VITE_BASE_URL}token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(sendData),
  });
  if (response.status === 200) {
    const data = await response.json();
    localStorage.setItem("token", `Bearer ${data.token}`);
    localStorage.setItem("refreshToken", `${data.refreshToken}`);
    usersStore.setToken(`Bearer ${data.token}`);
    usersStore.setRefreshToken(`${data.refreshToken}`);
    usersStore.setUsername(jwtDecode(data.token).username);
    usersStore.setRole(jwtDecode(data.token).role);
    return response;
  }
  return response;
};

export const reToken = async () => {
  // console.log("reToken");
  const usersStore = useUsersStore();
  // console.log(usersStore.token, "token");
  const token = usersStore.token;
  const refreshToken = usersStore.refreshToken;
  // console.log(token, "token");
  if (token != "") {
    // console.log(
    //   jwtDecode(token).exp > Date.now() / 1000,
    //   "jwtDecode(token).exp > Date.now() / 1000"
    // );
    if (jwtDecode(token).exp > Date.now() / 1000) {
      return false;
    }
  }
  // console.log("reToken2");
  // console.log(`"Bearer "+${refreshToken}`);
  const response = await fetch(`${import.meta.env.VITE_BASE_URL}token`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${refreshToken}`,
    },
  });
  // console.log(response, "response");
  if (response.status === 200) {
    const data = await response.json();
    // console.log(data);
    localStorage.setItem("token", `Bearer ${data.token}`);
    usersStore.setToken(`Bearer ${data.token}`);
    // console.log("token new");
    return true;
  }
  // console.log("token new error");
  localStorage.clear();
  await router.push({ name: "login" });
};
export const sendTokenToSpringBoot = async (token) => {
  const usersStore = useUsersStore();
  try {
    const url = `${import.meta.env.VITE_BASE_URL}azure/token `; // URL ของ Spring Boot backend
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token }),
    });

    if (response.ok) {
      const data = await response.json();
      localStorage.setItem("token", `Bearer ${data.token}`);
      localStorage.setItem("refreshToken", `${data.refreshToken}`);
      usersStore.setToken(`Bearer ${data.token}`);
      usersStore.setRefreshToken(`${data.refreshToken}`);
      usersStore.setUsername(jwtDecode(data.token).username);
      usersStore.setRole(jwtDecode(data.token).role);
      // console.log(data); // หากต้องการดำเนินการเพิ่มเติมกับข้อมูลที่ได้จาก backend
      return response;
    } else {
      console.error("Failed to send token to Spring Boot");
    }
  } catch (error) {
    console.error(error);
  }
};
