import { Enviroment } from "@/store/enviroment";
import axios from "axios";

const apiUrl = Enviroment.BACKEND_API

export async function ForgotPasswordEmail(email: string) {

    const response = await axios.post(`${apiUrl}/api/v1/user/forgot_password`, {
        email
    })

    if (response.status !== 200) {
        throw new Error(response.data);
    }

    return response.data

}


export async function ForgotPasswordCode(code: string, email: string) {

    const response = await axios.post(`${apiUrl}/api/v1/user/forgot_password/verify_code`, {
        email,
        code
    })

    if (response.status !== 200) {
        throw new Error(response.data);
    }

    return response.data

}



export async function ForgotPasswordReset(email: string, code: string, password: string) {

    const response = await axios.post(`${apiUrl}/api/v1/user/forgot_password/reset`, {
        email,
        password,
        code
    })

    if (response.status !== 200) {
        throw new Error(response.data);
    }

    return response.data

}