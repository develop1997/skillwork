import axiosInstance from "../AxiosComponent";

export async function DeleteJob(id: string) {
	const response = await axiosInstance.delete(`/api/v1/job/${id}`);
	if (response.status !== 200) {
		throw new Error(response.data);
	}
	return response.data;
}
