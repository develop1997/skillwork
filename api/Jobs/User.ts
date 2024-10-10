import axiosInstance from "../AxiosComponent";

export async function valorateUser(user_id: string, rate: number) {
	const response = await axiosInstance.post(`/api/v1/user/valorateuser`, {
		user_id,
		rate,
	});

	if (response.status !== 201) {
		if(response.status === 409){
			throw new Error("You already rated this user");
		}
		throw new Error(response.data);
	}

	return response.data;
}
