import axiosInstance from "../AxiosComponent";

export async function getCategories() {

	const response = await axiosInstance.get(`/api/v1/category`, {
	});

	if (response.status !== 200) {
		throw new Error(response.data);
	}
	return response.data;
}
