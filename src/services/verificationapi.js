import Swal from 'sweetalert2';

export const emailverification = async (sendData) => {
    const response = await fetch(`${import.meta.env.VITE_BASE_URL}subscribes/notified_subscribe`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(sendData),
    });

    if (response.status === 200) {
        const data = await response.json();
        localStorage.setItem("tokenOtp", `Bearer ${data.tokenOtp}`);
        return response;
    } else {
        const errorResponse = await response.json();
        console.log(errorResponse);
    }
}

export const otpverification = async (otp, clearInput) => {

    const token = localStorage.getItem("tokenOtp");
    const response = await fetch(`${import.meta.env.VITE_BASE_URL}subscribes/confirm_otp`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            AuthorizationOtp: `${token}`,
            Otp: `${otp}`,
        },
    });

    if (response.status === 200) {
        return response;
    } else if (response.status === 401) {
        Swal.fire({
            icon: 'error',
            title: 'OTP is incorrect',
            showConfirmButton: false,
            timer: 1500
        });
        clearInput();
    } else {
        const errorResponse = await response.json();
        console.log(errorResponse);
    }
}
export const getSubscribes = async (email) => {
    const response = await fetch(`${import.meta.env.VITE_BASE_URL}subscribes/email?email=${email}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
    if (response.status === 200) {
        return response.json();
    } else {
        const errorResponse = await response.json();
        console.log(errorResponse);
    }
}
export const unsubscribes = async (email, subscribes) => {
    if (subscribes) {
        console.log(JSON.stringify({email, subscribes}))
        const response = await fetch(`${import.meta.env.VITE_BASE_URL}subscribes/unsubscribe/id`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({email, subscribes}),
        });
        if (response.status === 200) {
            if (!response.bodyUsed) {
                const text = await response.text();
                console.log(text);
                return text;
            } else {
                console.error('Response body has already been consumed');
            }
        } else {
            const errorResponse = await response.json();
            console.log(errorResponse);
        }
    } else {
        const response = await fetch(`${import.meta.env.VITE_BASE_URL}subscribes/unsubscribes`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({email}),
        });
        if (response.status === 200) {
            if (!response.bodyUsed) {
                const text = await response.text();
                console.log(text);
                return text;
            } else {
                console.error('Response body has already been consumed');
            }
            return response;
        } else {
            const errorResponse = await response.json();
            console.log(errorResponse);
        }
    }
}