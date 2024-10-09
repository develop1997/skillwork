import { Enviroment } from "@/store/enviroment";
import axios from "axios";

const apiUrl = Enviroment.BACKEND_API;

export default async function RegisterUser(
	email: string,
	password: string,
	role: string
) {
	const response = await axios.post(`${apiUrl}/api/v1/user`, {
		email,
		password,
		role,
	});
	if (response.status !== 201) {
		throw new Error(response.statusText);
	}

	return response.data;
}

export async function sendVerificationCode(email: string) {
	const response = await axios.post(`${apiUrl}/api/v1/user/send_code`, {
		email,
	});

	if (response.status !== 200) {
		throw new Error(response.data);
	}

	return response.data;
}

export async function verifyCode(code: string, email: string) {
	const response = await axios.post(`${apiUrl}/api/v1/user/verify_code`, {
		email,
		code,
	});

	if (response.status !== 200) {
		throw new Error(response.data);
	}

	return response.data;
}
