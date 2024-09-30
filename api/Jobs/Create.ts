import axiosInstance from "../AxiosComponent";

export async function CreateJob(data: any) {
	const response = await axiosInstance.post(`/api/v1/job`, data);

	if (response.status !== 201) {
		throw new Error(response.data);
	}

	return response.data;
}
