import { Enviroment } from "@/store/enviroment";
import axios from "axios";

const apiUrl = Enviroment.BACKEND_API

export default async function LoginUser(email: string, password: string) {

    const response = await axios.post(`${apiUrl}/api/v1/user/signin`, {
        email,
        password
    })
    if (response.status !== 200) {
        throw new Error(response.data);
    }
    return response.data
}