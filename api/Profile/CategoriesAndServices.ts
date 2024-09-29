import axiosInstance from "../AxiosComponent";

const cache: any = {};

export async function getCategories() {
	if (cache.categories) {
		return cache.categories;
	}

	const response = await axiosInstance.get(`/api/v1/category`);

	if (response.status !== 200) {
		throw new Error(response.data);
	}

	cache.categories = response.data;
	return response.data;
}

export async function getServices(categories: string[]) {
	
	if (cache.categoryCacheSaved == categories.join(",")) {
		return cache.services;
	}

	cache.categoryCacheSaved = categories.join(",");

	const response = await axiosInstance.get(`/api/v1/service`, {
		params: {
			categories: categories.join(","),
		},
	});

	if (response.status !== 200) {
		throw new Error(response.data);
	}

	cache.services = response.data;
	return response.data;
}
