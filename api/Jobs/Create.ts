import axiosInstance from "../AxiosComponent";

export async function CreateJob(data: any) {
	const response = await axiosInstance.post(`/api/v1/job`, data);

	if (response.status !== 201) {
		throw new Error(response.data);
	}

	return response.data;
}

export async function ApplyToJob(job_id: string) {
	const response = await axiosInstance.post(`/api/v1/job/apply/${job_id}`);

	if (response.status !== 201) {
		throw new Error(response.data);
	}

	return response.data;
}
