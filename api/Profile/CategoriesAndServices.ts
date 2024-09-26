import axiosInstance from "../AxiosComponent";

export async function getCategories() {
	const response = await axiosInstance.get(`/api/v1/category`);

	if (response.status !== 200) {
		throw new Error(response.data);
	}
	return response.data;
}

export async function getServices(categories: string[]) {
	const response = await axiosInstance.get(`/api/v1/service`, {
		params: {
			categories: categories.join(","),
		},
	});

	if (response.status !== 200) {
		throw new Error(response.data);
	}

	return response.data;
}
