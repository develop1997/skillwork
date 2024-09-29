import axiosInstance from "../AxiosComponent";

export async function GetUserData() {
	const response = await axiosInstance.get(`/api/v1/user`);

	if (response.status !== 200) {
		throw new Error(response.data);
	}

	return response.data;
}

export async function UpdateUserData(data: any) {
	const response = await axiosInstance.put(`/api/v1/user`, data);

	if (response.status !== 200) {
		throw new Error(response.data);
	}

	return response.data;
}
