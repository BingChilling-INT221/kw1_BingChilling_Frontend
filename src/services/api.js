// import router from "../router/index.js";

// export const fetched_api = async (role, category, mode, page, pageSize) => {
//     const token = localStorage.getItem("token");
//     if (token === null) {
//         if (await reToken()) {
//             return await fetched_api(role, category, mode, page, pageSize);
//         }
//     }
//     try {
//         const selectCategory = () => {
//             return category !== "" ? `&category=${category}` : "";
//         };
//         const modeFetch = () => {
//             if (role === "admin") {
//                 return "";
//             }
//             return mode !== "" ? `&mode=${mode}` : "";
//         };
//         const response = await fetch(
//             `${
//                 import.meta.env.VITE_BASE_URL
//             }announcements/pages?${modeFetch()}&page=${page}&size=${pageSize}${selectCategory()}`,
//             {
//                 headers: {
//                     Authorization: `${token}`,
//                 },
//             }
//         );
//         if (response.status === 200) {
//             console.log("200");
//             return response;
//         } else if (response.status === 401) {
//             console.log("401");
//             if (await reToken()) {
//                 return await fetched_api(role, category, mode, page, pageSize);
//             }
//             return router.push({name: "login"});
//         } else {
//             console.log("else");
//             const errorResponse = await response.json();
//             throw new Error(errorResponse.message);
//         }
//     } catch (err) {
//         console.log("ยังหาข้อมูลไม่พบโปรดรีเฟรชหน้าอีกครั้งครับ");
//         return false;
//     }
// };

// export const fetchCate = async () => {
//     const token = localStorage.getItem("token");
//     if (token === null) {
//         if (await reToken()) {
//             return await fetchCate();
//         }
//     }
//     try {
//         console.log("cat", token);
//         const response = await fetch(`${import.meta.env.VITE_BASE_URL}categories`, {
//             headers: {
//                 Authorization: `${token}`,
//             },
//         });
//         console.log(response.status, token);
//         if (response.status === 200) {
//             console.log("200 cate");
//             return response;
//         } else if (response.status === 401) {
//             console.log("401 cate");
//             if (await reToken()) {

//                 return await fetchCate();
//             }
//             return router.push({name: "login"});
//         } else {
//             const errorResponse = await response.json();
//             throw new Error(errorResponse.message);
//         }
//     } catch (err) {
//         throw err;
//     }
// };

// export const fetchCountParam = async (route, count) => {
//     const token = localStorage.getItem("token");
//     if (token === null) {
//         if (await reToken()) {
//             return await fetchCountParam(route, count);
//         }
//     }
//     try {
//         console.log(token);
//         const response = await fetch(
//             `${import.meta.env.VITE_BASE_URL}announcements/${route}?count=${count}`,
//             {
//                 headers: {
//                     Authorization: `${token}`,
//                 },
//             }
//         );
//         if (response.status === 200) {
//             return response;
//         } else if (response.status === 401) {
//             if (await reToken()) {
//                 return await fetchCountParam(route, count);
//             }
//             return router.push({name: "login"});
//         } else {
//             const errorResponse = await response.json();
//             throw new Error(errorResponse.message);
//         }
//     } catch (err) {
//         console.log(err);
//         throw err;
//     }
// };

// export const fetchCateForMod = async () => {
//     const token = localStorage.getItem("token");
//     if (token === null) {
//         if (await reToken()) {
//             return await fetchCateForMod();
//         }
//     }
//     try {
//         const response = await fetch(`${import.meta.env.VITE_BASE_URL}categories`, {
//             headers: {
//                 Authorization: `${token}`,
//             },
//         });
//         if (response.status === 200) {
//             return response;
//         } else if (response.status === 401) {
//             if (await reToken()) {
//                 return await fetchCateForMod();
//             }
//             return router.push({name: "login"});
//         } else {
//             const errorResponse = await response.json();
//             throw new Error(errorResponse.message);
//         }
//     } catch (err) {
//         throw err;
//     }
// };

// export const fetchCreate = async (sendPackage) => {
//     const token = localStorage.getItem("token");
//     if (token === null) {
//         if (await reToken()) {
//             return await fetchCreate(sendPackage);
//         }
//     }
//     try {
//         const response = await fetch(
//             `${import.meta.env.VITE_BASE_URL}announcements`,
//             {
//                 method: "POST",
//                 headers: {
//                     Authorization: `${token}`,
//                     "Content-Type": "application/json",
//                 },
//                 body: JSON.stringify(sendPackage),
//             }
//         );
//         if (response.status === 200) {
//             return response;
//         }
//         else if (response.status === 401) {
//             if (await reToken()) {
//                 return await fetchCreate(sendPackage);
//             }
//             return router.push({name: "login"});
//         }
//         else {
//             const errorResponse = await response.json();
//             throw new Error(errorResponse.message);
//         }
//     } catch (err) {
//         throw err;
//     }
// };

// export const fetchCreateUser = async (sendPackage) => {
//     const token = localStorage.getItem("token");
//     if (token === null) {
//         if (await reToken()) {
//             return await fetchCreateUser(sendPackage);
//         }
//     }
//     try {
//         const response = await fetch(`${import.meta.env.VITE_BASE_URL}users`, {
//             method: "POST",
//             headers: {
//                 Authorization: `${token}`,
//                 "Content-Type": "application/json",
//             },
//             body: JSON.stringify(sendPackage),
//         });
//         if (response.status === 200) {
//             console.log(response);
//             return response;
//         }
//         else if (response.status === 401) {
//             if (await reToken()) {
//                 return await fetchCreateUser(sendPackage);
//             }
//             return router.push({name: "login"});
//         }
//         else {
//             const errorResponse = await response.json();
//             throw new Error(errorResponse.message);
//         }
//     } catch (err) {
//         throw err;
//     }
// };

// export const fetchUpdate = async (sendPackage, route) => {
//     const token = localStorage.getItem("token");
//     if (token === null) {
//         if (await reToken()) {
//             return await fetchUpdate(sendPackage, route);
//         }
//     }
//     try {
//         const response = await fetch(
//             `${import.meta.env.VITE_BASE_URL}announcements/${route.params.id}`, {
//                 method: "PUT",
//                 headers: {
//                     Authorization: `${token}`,
//                     "Content-Type": "application/json",
//                 },
//                 body: JSON.stringify(sendPackage),
//             });
//         if (response.status === 200) {
//             return response;
//         } else if (response.status === 401) {
//             if (await reToken()) {
//                 return await fetchUpdate(sendPackage, route);
//             }
//             return router.push({ name: "login" });
//         } else {
//             const errorResponse = await response.json();
//             throw new Error(errorResponse.message);
//         }
//     } catch (err) {
//         throw err;
//     }
// };

// export const fetchUpdateUser = async (sendPackage, route) => {
//     const token = localStorage.getItem("token");
//     if (token === null) {
//         if (await reToken()) {
//             return await fetchUpdateUser(sendPackage, route);
//         }
//     }
//     try {
//         const response = fetch(
//             `${import.meta.env.VITE_BASE_URL}users/${route.params.id}`, {
//                 method: "PUT",
//                 headers: {
//                     Authorization: `${token}`,
//                     "Content-Type": "application/json",
//                 },
//                 body: JSON.stringify(sendPackage),
//             });
//         if (response.status === 200) {
//             return response;
//         } else if (response.status === 401) {
//             if (await reToken()) {
//                 return await fetchUpdateUser(sendPackage, route);
//             }
//             return router.push({name: "login"});
//         } else {
//             const errorResponse = await response.json();
//             throw new Error(errorResponse.message);
//         }
//     } catch (err) {
//         throw err;
//     }
// };

// export const fetchShowEdit = async (route) => {
//     const token = localStorage.getItem("token");
//     if (token === null) {
//         if (await reToken()) {
//             return await fetchShowEdit(route);
//         }
//     }
//     const response = await fetch(
//         `${import.meta.env.VITE_BASE_URL}announcements/${route}`,
//         {
//             headers: {
//                 Authorization: `${token}`,
//             },
//         }
//     );

//     if (response.status === 200) {
//         return response;
//     } else if (response.status === 401) {
//         if (await reToken()) {
//             return await fetchShowEdit(route);
//         }
//         return router.push({name: "login"});
//     } else {
//         const errorResponse = await response.json();
//         throw new Error(errorResponse.message);
//     }
// };

// export const fetchDelete = async (id) => {
//     const token = localStorage.getItem("token");
//     if (token === null) {
//         if (await reToken()) {
//             return await fetchDelete(id);
//         }
//     }
//     const response = await fetch(
//         `${import.meta.env.VITE_BASE_URL}announcements/${id}`,
//         {
//             method: "DELETE",
//             headers: {
//                 "Content-Type": "application/json",
//                 Authorization: `${token}`,
//             },
//         }
//     );
//     if (response.status === 200) {
//         return response;
//     } else if (response.status === 401) {
//         if (await reToken()) {
//             return await fetchDelete(id);
//         }
//         return router.push({name: "login"});
//     } else {
//         const errorResponse = await response.json();
//         throw new Error(errorResponse.message);
//     }
// };

// export const fetchDeleteUser = async (id) => {
//     const token = localStorage.getItem("token");
//     if (token === null) {
//         if (await reToken()) {
//             return await fetchDeleteUser(id);
//         }
//     }
//     const response = await fetch(`${import.meta.env.VITE_BASE_URL}users/${id}`, {
//         method: "DELETE",
//         headers: {
//             "Content-Type": "application/json",
//             Authorization: `${token}`,
//         },
//     });
//     if (response.status === 200) {
//         return response;
//     } else if (response.status === 401) {
//         if (await reToken()) {
//             return await fetchDeleteUser(id);
//         }
//         return router.push({name: "login"});
//     } else {
//         const errorResponse = await response.json();
//         throw new Error(errorResponse.message);
//     }
// };

// export const fetchUser = async () => {
//     const token = localStorage.getItem("token");
//     if (token === null) {
//         if (await reToken()) {
//             return await fetchUser();
//         }
//     }
//     const response = await fetch(`${import.meta.env.VITE_BASE_URL}users`, {
//         headers: {
//             Authorization: `${token}`,
//         },
//     });
//     if (response.status === 200) {
//         return response;
//     } else if (response.status === 401) {
//         if (await reToken()) {
//             return await fetchUser();
//         }
//         return router.push({name: "login"});
//     } else {
//         const errorResponse = await response.json();
//         throw new Error(errorResponse.message);
//     }
// };

// export const fetchUserEdit = async (route) => {
//     const token = localStorage.getItem("token");
//     if (token === null) {
//         if (await reToken()) {
//             return await fetchUserEdit(route);
//         }
//     }
//     const response = await fetch(
//         `${import.meta.env.VITE_BASE_URL}users/${route}`,
//         {
//             headers: {
//                 Authorization: `${token}`,
//             },
//         }
//     );
//     if (response.status === 200) {
//         return response;
//     } else if (response.status === 401) {
//         if (await reToken()) {
//             return await fetchUserEdit(route);
//         }
//         return router.push({name: "login"});
//     } else {
//         const errorResponse = await response.json();
//         throw new Error(errorResponse.message);
//     }
// };

// export const fetchMatch = async (sendData) => {
//     const token = localStorage.getItem("token");
//     if (token === null) {
//         if (await reToken()) {
//             return await fetchMatch(sendData);
//         }
//     }
//     const response = await fetch(`${import.meta.env.VITE_BASE_URL}users/match`, {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json",
//             Authorization: `${token}`,
//         },
//         body: JSON.stringify(sendData),
//     });
//     if (response.status === 200) {
//         return response;
//     }
//     else if (response.status === 401) {
//         if (await reToken()) {
//             return await fetchMatch(sendData);
//         }
//         return router.push({name: "login"});
//     }
//     else {
//         const errorResponse = await response.json();
//         throw new Error(errorResponse.message);
//     }
// };
// export const fetchCreateToken = async (sendData) => {
//     return await fetch(`${import.meta.env.VITE_BASE_URL}token`, {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json",
//         },
//         body: JSON.stringify(sendData),
//     });
// };

// export const reToken = async () => {
//     const refreshToken = localStorage.getItem("refreshToken");
//     if (refreshToken === null) {
//         router.push({name: "login"});
//     }
//     const response = await fetch(`${import.meta.env.VITE_BASE_URL}token`, {
//         method: "GET",
//         headers: {
//             Authorization: `${refreshToken}`,
//         },
//     });

//     if (response.status === 200) {
//         const data = await response.json();
//         console.log(data);
//         localStorage.setItem("token", `Bearer ${data.token}`);
//         console.log("token new");
//         return true;
//     }
//     router.push({name: "login"});
// };
