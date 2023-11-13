export const emailverification = async (sendData,email) => {
    const response = await fetch(`${import.meta.env.VITE_BASE_URL}announcements/notified_subscribe?email=${email}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(sendData),
    });

    if (response.status === 200) {
        return response;
    } else {
        const errorResponse = await response.json();
       console.log(errorResponse);
    }
}