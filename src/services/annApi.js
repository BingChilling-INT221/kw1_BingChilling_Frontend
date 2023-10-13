import {reToken} from "@/services/authorizationApi";
import router from "@/router";

export const fetched_api = async (role, category, mode, page, pageSize, auth) => {
    const token = localStorage.getItem("token");
    // if (token === null) {
    //   if (await reToken()) {
    //     return await fetched_api(role, category, mode, page, pageSize);
    //   }
    // }

    try {
        const selectCategory = () => {
            return category !== "" ? `&category=${category}` : "";
        };
        const modeFetch = () => {
            console.log(role);
            if (role === "admin") {
                return "";
            }
            console.log("modeFetch");
            return mode !== "" ? `&mode=${mode}` : "";
        };
        let response;
        if (auth) {
            console.log("auth");
            console.log(token);
            response = await fetch(
                `${
                    import.meta.env.VITE_BASE_URL
                }announcements/pages?${modeFetch()}&page=${page}&size=${pageSize}${selectCategory()}`
                ,
                {
                    headers: {
                        Authorization: `${token}`,
                    },
                }
            );
            console.log(response, "response");
            // console.log(token);
        } else {
            console.log("not auth");
            response = await fetch(
                `${
                    import.meta.env.VITE_BASE_URL
                }announcements/pages?${modeFetch()}&page=${page}&size=${pageSize}${selectCategory()}`
            );
        }
        if (response.status === 200) {
            // console.log("200");
            return response;
        } else if (response.status === 401) {
            console.log("401");
            if (await reToken()) {
                return await fetched_api(role, category, mode, page, pageSize);
            }
            return router.push({name: "login"});
        } else {
            console.log("else");
            const errorResponse = await response.json();
            throw new Error(errorResponse.message);
        }
    } catch (err) {
        console.log("ยังหาข้อมูลไม่พบโปรดรีเฟรชหน้าอีกครั้งครับ");
        return false;
    }
};

export const fetchCountParam = async (route, count) => {
    const token = localStorage.getItem("token");
    // if (token === null) {
    //   if (await reToken()) {
    //     return await fetchCountParam(route, count);
    //   }
    // }
    try {
        console.log(token);
        const response = await fetch(
            `${import.meta.env.VITE_BASE_URL}announcements/${route}?count=${count}`
            //   ,
            // {
            //   headers: {
            //     Authorization: `${token}`,
            //   },
            // }
        );
        if (response.status === 200) {
            return response;
        } else if (response.status === 401) {
            if (await reToken()) {
                return await fetchCountParam(route, count);
            }
            return router.push({name: "login"});
        } else {
            const errorResponse = await response.json();
            throw new Error(errorResponse.message);
        }
    } catch (err) {
        console.log(err);
    }
};

export const fetchCreate = async (sendPackage) => {
    const token = localStorage.getItem("token");
    if (token === null) {
        if (await reToken()) {
            return await fetchCreate(sendPackage);
        }
    }
    try {
        const response = await fetch(
            `${import.meta.env.VITE_BASE_URL}announcements`,
            {
                method: "POST",
                headers: {
                    Authorization: `${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(sendPackage),
            }
        );
        console.log(response);
        if (response.status === 200) {
            return response;
        } else if (response.status === 401) {
            if (await reToken()) {
                return await fetchCreate(sendPackage);
            }
            // return router.push({ name: "login" });
        } else {
            const errorResponse = await response.json();
            throw new Error(errorResponse.message);
        }
    } catch (err) {
        console.log(err);
    }
};
export const fetchUpdate = async (sendPackage, route) => {
    const token = localStorage.getItem("token");
    if (token === null) {
        if (await reToken()) {
            return await fetchUpdate(sendPackage, route);
        }
    }
    try {
        const response = await fetch(
            `${import.meta.env.VITE_BASE_URL}announcements/${route.params.id}`, {
                method: "PUT",
                headers: {
                    Authorization: `${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(sendPackage),
            });
        if (response.status === 200) {
            return response;
        } else if (response.status === 401) {
            if (await reToken()) {
                return await fetchUpdate(sendPackage, route);
            }
            return router.push({name: "login"});
        } else {
            const errorResponse = await response.json();
            throw new Error(errorResponse.message);
        }
    } catch (err) {
        throw err;
    }
};
export const fetchShowEdit = async (route) => {
    const token = localStorage.getItem("token");
    if (token === null) {
        if (await reToken()) {
            return await fetchShowEdit(route);
        }
    }
    const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}announcements/${route}`,
        {
            headers: {
                Authorization: `${token}`,
            },
        }
    );

    if (response.status === 200) {
        return response;
    } else if (response.status === 401) {
        if (await reToken()) {
            return await fetchShowEdit(route);
        }
        return router.push({name: "login"});
    } else {
        const errorResponse = await response.json();
        throw new Error(errorResponse.message);
    }
};
export const fetchDelete = async (id) => {
    const token = localStorage.getItem("token");
    if (token === null) {
        if (await reToken()) {
            return await fetchDelete(id);
        }
    }
    const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}announcements/${id}`,
        {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `${token}`,
            },
        }
    );
    if (response.status === 200) {
        return response;
    } else if (response.status === 401) {
        if (await reToken()) {
            return await fetchDelete(id);
        }
        return router.push({name: "login"});
    } else {
        const errorResponse = await response.json();
        throw new Error(errorResponse.message);
    }
};