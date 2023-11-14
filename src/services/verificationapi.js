import Swal from 'sweetalert2';

export const emailverification = async (sendData,email) => {
    const response = await fetch(`${import.meta.env.VITE_BASE_URL}subscribes/notified_subscribe?email=${email}`, {
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
    } 
    else if( response.status === 401){
        Swal.fire({
            icon: 'error',
            title: 'OTP is incorrect',
            showConfirmButton: false,
            timer: 1500
          });
        clearInput();
      } 
    else {
        const errorResponse = await response.json();
       console.log(errorResponse);
    }
}