export const fetched_api = async (role, category, mode, page, pageSize) => {
    const token = localStorage.getItem("token");
    const refreshToken = localStorage.getItem("refreshToken");
    console.log("fetched_api");
    try {
        const selectCategory = () => {
            return category !== "" ? `&category=${category}` : "";
        };
        const modeFetch = () => {
            if (role === "admin") {
                return "";
            }
            return mode !== "" ? `&mode=${mode}` : "";
        };
        console.log(token);
        return await fetch(
            `${
                import.meta.env.VITE_BASE_URL
            }announcements/pages?${modeFetch()}&page=${page}&size=${pageSize}${selectCategory()}`,
            {
                headers: {
                    Authorization: `${token}`,
                },
            }
        );
    } catch (err) {
        console.log(err);
        alert("ยังหาข้อมูลไม่พบโปรดรีเฟรชหน้าอีกครั้งครับ");
        // window.location.reload();
    }
};

export const fetchCate = async () => {
    const token = localStorage.getItem("token");
    const refreshToken = localStorage.getItem("refreshToken");
    try {
        console.log(token);
        const response = await fetch(`${import.meta.env.VITE_BASE_URL}categories`, {
            headers: {
                Authorization: `${token}`,
            },
        });
        if (response.status === 200) {
            return await response.json();
        } else {
            const errorResponse = await response.json();
            throw new Error(errorResponse.message);
        }
    } catch (err) {
        throw err;
    }
};

export const fetchCountParam = async (route, count) => {
    const token = localStorage.getItem("token");
    const refreshToken = localStorage.getItem("refreshToken");
    return await fetch(
        `${import.meta.env.VITE_BASE_URL}announcements/${route}?count=${count}`,
        {
            headers: {
                Authorization: `${token}`,
            },
        }
    );
};

export const fetchCateForMod = async () => {
    const token = localStorage.getItem("token");
    const refreshToken = localStorage.getItem("refreshToken");
    return fetch(`${import.meta.env.VITE_BASE_URL}categories`, {
        headers: {
            Authorization: `${token}`,
        },
    });
};

export const fetchCreate = async (sendPackage) => {
    const token = localStorage.getItem("token");
    const refreshToken = localStorage.getItem("refreshToken");
    return await fetch(`${import.meta.env.VITE_BASE_URL}announcements`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(sendPackage),
    });
};

export const fetchCreateUser = async (sendPackage) => {
    const token = localStorage.getItem("token");
    const refreshToken = localStorage.getItem("refreshToken");
    return await fetch(`${import.meta.env.VITE_BASE_URL}users`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(sendPackage),
    });
};

export const fetchUpdate = async (sendPackage, route) => {
    const token = localStorage.getItem("token");
    const refreshToken = localStorage.getItem("refreshToken");
    return await fetch(
        `${import.meta.env.VITE_BASE_URL}announcements/${route.params.id}`,
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(sendPackage),
        }
    );
};

export const fetchUpdateUser = async (sendPackage, route) => {
    const token = localStorage.getItem("token");
    const refreshToken = localStorage.getItem("refreshToken");
    return await fetch(
        `${import.meta.env.VITE_BASE_URL}users/${route.params.id}`,
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(sendPackage),
        }
    );
};

export const fetchShowEdit = async (route) => {
    const token = localStorage.getItem("token");
    const refreshToken = localStorage.getItem("refreshToken");
    return await fetch(`${import.meta.env.VITE_BASE_URL}announcements/${route}`);
};

export const fetchDelete = async (id) => {
    const token = localStorage.getItem("token");
    const refreshToken = localStorage.getItem("refreshToken");
    return await fetch(`${import.meta.env.VITE_BASE_URL}announcements/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    });
};

export const fetchDeleteUser = async (id) => {
    const token = localStorage.getItem("token");
    const refreshToken = localStorage.getItem("refreshToken");
    return await fetch(`${import.meta.env.VITE_BASE_URL}users/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    });
};

export const fetchUser = async () => {
    const token = localStorage.getItem("token");
    const refreshToken = localStorage.getItem("refreshToken");
    return await fetch(`${import.meta.env.VITE_BASE_URL}users`, {
        headers: {
            Authorization: `${token}`,
        },
    });
};

export const fetchUserEdit = async (route) => {
    const token = localStorage.getItem("token");
    const refreshToken = localStorage.getItem("refreshToken");
    return await fetch(`${import.meta.env.VITE_BASE_URL}users/${route}`, {
        headers: {
            Authorization: `${token}`,
        },
    });
};

export const fetchMatch = async (sendData) => {
    const token = localStorage.getItem("token");
    const refreshToken = localStorage.getItem("refreshToken");
    return await fetch(`${import.meta.env.VITE_BASE_URL}users/match`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`,
        },
        body: JSON.stringify(sendData),
    });
};
export const fetchCreateToken = async (sendData) => {
    const token = localStorage.getItem("token");
    const refreshToken = localStorage.getItem("refreshToken");
    return await fetch(`${import.meta.env.VITE_BASE_URL}token`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`,
        },
        body: JSON.stringify(sendData),
    });
};

export const reToken = async () =>{
    const refreshToken = localStorage.getItem("refreshToken");
    
    return await fetch(`${import.meta.env.VITE_BASE_URL}token`, {
        method: "GET",
        headers: {
            Authorization: `${refreshToken}`,
        },
    })
}


// export default fetched_api;
