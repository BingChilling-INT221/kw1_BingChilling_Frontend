import {reToken} from "@/services/authorizationApi";
import router from "@/router";
import {useUsersStore} from "@/stores/user";

const usersStore = useUsersStore();
export const fetchCate = async () => {
    try {
        const response = await fetch(`${import.meta.env.VITE_BASE_URL}categories`
        );
        // console.log(response.status, token);
        if (response.status === 200) {
            // console.log("200 cate");
            return await response.json();
        } else if (response.status === 401) {
            console.log("401 cate");
            if (await reToken()) {
                return await fetchCate();
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
export const fetchCateForMod = async () => {
    const token = usersStore.token;
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
            console.log(errorResponse);
        }
    } catch (err) {
        throw err;
    }
};

