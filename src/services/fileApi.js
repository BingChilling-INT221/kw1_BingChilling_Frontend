import {da} from "vuetify/locale";
import {reToken} from "@/services/authorizationApi";
import router from "@/router";
import {useUsersStore} from "@/stores/user";

export const fetchPreview = async (id) => {
    try {
        const response = await fetch(
            `${import.meta.env.VITE_BASE_URL}files/${id}`
        );
        // console.log(response);
        if (response.status === 200) {
            return response;
        } else if (response.status === 404) {
            console.log('Not Found');
            return null;
        } else {
            const errorResponse = await response.json();
            console.log(errorResponse);
        }
    }
    catch (error) {
        console.log(error);
    }
};
export const uploadFiles = async (id, files) => {
    const usersStore = useUsersStore();
    const token = usersStore.token
    if (token === null) {
        if (await reToken()) {
            return await uploadFiles(id, files);
        }
    }

    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
        formData.append('file', files[i]);
    }

    try {
        const response = await fetch(`${import.meta.env.VITE_BASE_URL}files/${id}`, {
            method: 'POST',
            body: formData,
            headers: {
                Authorization: `${token}`,
            },
        });

        if (response.ok) {
            const data = await response.text();
            // console.log('Upload successful:', data);
            return response;
            // ทำสิ่งที่ต้องการเมื่ออัปโหลดสำเร็จ
        } else {
            const error = await response.text();
            console.error('Upload failed:', error);
            // ทำสิ่งที่ต้องการเมื่อเกิดข้อผิดพลาดในการอัปโหลด
        }
    } catch (error) {
        console.error('Upload failed:', error);
        // ทำสิ่งที่ต้องการเมื่อเกิดข้อผิดพลาดที่ไม่ได้มาจาก Response
    }
}

export const updateFiles = async (id, files, oldFiles) => {
    // console.log(files);
    // console.log(oldFiles);
    // console.log(id);
    const usersStore = useUsersStore();
    const token = usersStore.token
    if (token === null) {
        if (await reToken()) {
            return await updateFiles(id, files, oldFiles);
        }
    }
    const formData = new FormData();
    if (files.length > 0)
    {
    for (let i = 0; i < files.length; i++) {
        formData.append('file', files[i]);
    }}
    else {
        formData.append('file', new File([""], "empty"));
    }
    formData.append('oldFile', oldFiles);
    // for (var pair of formData.entries()) {
    //     console.log(pair[0]+ ', ' + pair[1]);
    // }
    try {
        const response = await fetch(`${import.meta.env.VITE_BASE_URL}files/${id}`, {
            method: 'PUT',
            body: formData,
            headers: {
                Authorization: `${token}`,
            },
        });

        if (response.ok) {
            const data = await response.text();
            // console.log('Update successful:', data);
            return response;
            // ทำสิ่งที่ต้องการเมื่ออัพเดทสำเร็จ
        } else {
            const error = await response.text();
            console.error('Update failed:', error);
            // ทำสิ่งที่ต้องการเมื่อเกิดข้อผิดพลาดในการอัพเดท
        }
    } catch (error) {
        console.error('Update failed:', error);
        // ทำสิ่งที่ต้องการเมื่อเกิดข้อผิดพลาดที่ไม่ได้มาจาก Response
    }
}