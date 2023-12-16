import {reToken} from "@/services/authorizationApi";
import router from "@/router";
import {useUsersStore} from "@/stores/user";

export const fetchUpdateUser = async (sendPackage, route) => {
    const usersStore = useUsersStore();
    const token = usersStore.token
    if (token === null) {
        if (await reToken()) {
            return await fetchUpdateUser(sendPackage, route);
        }
    }
    try {
        const response = await fetch(
            `${import.meta.env.VITE_BASE_URL}users/${route.params.id}`, {
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
                return await fetchUpdateUser(sendPackage, route);
            }
            return router.push({name: "login"});
        } else {
            const errorResponse = await response.json();
            console.log(errorResponse);
        }
    } catch (err) {
        throw err;
    }
};
export const fetchCreateUser = async (sendPackage) => {
    const usersStore = useUsersStore();
    const token = usersStore.token
    if (token === null) {
        if (await reToken()) {
            return await fetchCreateUser(sendPackage);
        }
    }
    try {
        const response = await fetch(`${import.meta.env.VITE_BASE_URL}users`, {
            method: "POST",
            headers: {
                Authorization: `${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(sendPackage),
        });
        if (response.status === 200) {
            // console.log(response);
            return response;
        } else if (response.status === 401) {
            if (await reToken()) {
                return await fetchCreateUser(sendPackage);
            } else {
                await router.push({name: "login"});
            }

        } else if(response.status === 400){
            return response;
        }else {
            const errorResponse = await response.json();
            console.log(errorResponse);
        }
    } catch (err) {
        throw err;
    }
};
export const fetchDeleteUser = async (id) => {
    const usersStore = useUsersStore();
    const token = usersStore.token
    if (token === null) {
        if (await reToken()) {
            return await fetchDeleteUser(id);
        }
    }
    const response = await fetch(`${import.meta.env.VITE_BASE_URL}users/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`,
        },
    });
    if (response.status === 200) {
        return response;
    } else if (response.status === 401) {
        if (await reToken()) {
            return await fetchDeleteUser(id);
        }
        return router.push({name: "login"});
    } else if (response.status === 403) {
        alert("You are not allowed to delete this user");
    } else {
        const errorResponse = await response.json();
        throw new Error(errorResponse.message);
    }
};
export const fetchUser = async () => {
    const usersStore = useUsersStore();
    const token = usersStore.token
    if (token === null) {
        if (await reToken()) {
            return await fetchUser();
        }
    }
    const response = await fetch(`${import.meta.env.VITE_BASE_URL}users`, {
        headers: {
            Authorization: `${token}`,
        },
    });
    if (response.status === 200) {
        return response;
    } else if (response.status === 401) {
        if (await reToken()) {
            return await fetchUser();
        }
        return router.push({name: "login"});
    } else if (response.status === 403) {
        await router.push({name: "403"});
    } else {
        const errorResponse = await response.json();
        throw new Error(errorResponse.message);
    }
};
export const fetchUserEdit = async (route) => {
    const usersStore = useUsersStore();
    const token = usersStore.token
    if (token === null) {
        if (await reToken()) {
            return await fetchUserEdit(route);
        }
    }
    const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}users/${route}`,
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
            return await fetchUserEdit(route);
        }
        return router.push({name: "login"});
    } else if (response.status === 403) {
        await router.push({name: "403"});
    } else if (response.status === 404) {
        await router.push({name: "adminuserpage"});

    } else {

        const errorResponse = await response.json();
        throw new Error(errorResponse.message);
    }
};
export const fetchCreateUserAnnouncer = async (sendPackage) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_BASE_URL}users/announcer`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(sendPackage),
        });
        if (response.status === 200) {
            return response;
        } else  if (response.status ===400){

            return response
        } {
            const errorResponse = await response.json();
            console.log(errorResponse.detail);
        }
    } catch (err) {
        console.log(err);
    }
}

export const fetchUserDetail = async (userId) => {
    const usersStore = useUsersStore();
    const token = usersStore.token;
    if (token === null) {
        if (await reToken()) {
            return await fetchUserDetail(userId);
        }
    }
    try {
        const response = await fetch(
            `${import.meta.env.VITE_BASE_URL}users/${userId}`,
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
                return await fetchUserDetail(userId);
            }
            return router.push({ name: "login" });
        } 
        else {
            const errorResponse = await response.json();
            throw new Error(errorResponse.message);
        }
    } catch (err) {
        throw err;
    }
};
