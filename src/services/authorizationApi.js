import router from "../router/index.js";
export const fetchMatch = async (sendData) => {
    const token = localStorage.getItem("token");
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
    }
    else if (response.status === 401) {
        if (await reToken()) {
            return await fetchMatch(sendData);
        }
        return router.push({name: "login"});
    }
    else {
        const errorResponse = await response.json();
        throw new Error(errorResponse.message);
    }
};
export const fetchCreateToken = async (sendData) => {
    return await fetch(`${import.meta.env.VITE_BASE_URL}token`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(sendData),
    });
};

export const reToken = async () => {
    const refreshToken = localStorage.getItem("refreshToken");
    if (refreshToken === null) {
        router.push({name: "login"});
    }
    const response = await fetch(`${import.meta.env.VITE_BASE_URL}token`, {
        method: "GET",
        headers: {
            Authorization: `${refreshToken}`,
        },
    });

    if (response.status === 200) {
        const data = await response.json();
        console.log(data);
        localStorage.setItem("token", `Bearer ${data.token}`);
        console.log("token new");
        return true;
    }
    router.push({name: "login"});
};