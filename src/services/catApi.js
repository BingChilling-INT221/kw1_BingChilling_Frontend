import {reToken} from "@/services/authorizationApi";
import router from "@/router";

export const fetchCate = async () => {
    const token = localStorage.getItem("token");
    // if (token === null) {
    //     if (await reToken()) {
    //         return await fetchCate();
    //     }
    // }
    try {
        // console.log("cat", token);
        const response = await fetch(`${import.meta.env.VITE_BASE_URL}categories`
            // , {
            // headers: {
            //     Authorization: `${token}`,
            // },
        // }
    );
        // console.log(response.status, token);
        if (response.status === 200) {
            // console.log("200 cate");
            const data = await response.json();
            return data;
        } else if (response.status === 401) {
            console.log("401 cate");
            if (await reToken()) {
                return await fetchCate();
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
export const fetchCateForMod = async () => {
    const token = localStorage.getItem("token");
    if (token === null) {
        if (await reToken()) {
            return await fetchCateForMod();
        }
    }
    try {
        const response = await fetch(`${import.meta.env.VITE_BASE_URL}categories`, {
            headers: {
                Authorization: `${token}`,
            },
        });
        if (response.status === 200) {
            return response;
        } else if (response.status === 401) {
            if (await reToken()) {
                return await fetchCateForMod();
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

