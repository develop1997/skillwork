import axiosInstance from "../AxiosComponent";

export async function valorateUser(user_id: string, rate: number) {
	const response = await axiosInstance.post(`/api/v1/user/valorateuser`, {
		user_id,
		rate,
	});

	if (response.status !== 201) {
		throw new Error(response.data);
	}

	return response.data;
}

export async function changeCandidateStatus(
	job_id: string,
	user_id: string,
	status: string,
	data: any
) {
	const response = await axiosInstance.put(
		`/api/v1/job/application/` + job_id,
		{
			user_id,
			status,
			data,
		}
	);

	if (response.status !== 200) {
		throw new Error(response.data);
	}

	return response.data;
}
