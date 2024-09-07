import axios from "axios";

const apiUrl = process.env.EXPO_PUBLIC_BACKEND_API;

export default async function RegisterUser(email: string, password: string, role: string) {
    const response = await axios.post(`${apiUrl}/api/v1/user`, {
        email,
        password,
        role
    })
    if (response.status!==201) {
        throw new Error(response.statusText);
    }

    return response.data
}