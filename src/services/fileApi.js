

export const fetchPreview = async (id) => {
    const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}files/${id}`
    );
    if (response.status === 200) {
        console.log(response);
        return response;
    } else {
        const errorResponse = await response.json();
        console.log(errorResponse);
    }
};
export const uploadFiles = async (id, files) =>{
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
        formData.append('file', files[i]);
    }

    try {
        const response = await fetch(`${import.meta.env.VITE_BASE_URL}files/${id}`, {
            method: 'POST',
            body: formData,
        });

        if (response.ok) {
            const data = await response.text();
            console.log('Upload successful:', data);
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

export const updateFiles= async  (id, files, oldFiles)=> {
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
        formData.append('file', files[i]);
    }
    formData.append('oldFile', oldFiles);

    try {
        const response = await fetch(`${import.meta.env.VITE_BASE_URL}files/${id}`, {
            method: 'PUT',
            body: formData,
        });

        if (response.ok) {
            const data = await response.text();
            console.log('Update successful:', data);
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