import axiosInstance from "../AxiosComponent";

export async function getJobsOfUser() {
	const response = await axiosInstance.get(`/api/v1/job/user`);

	if (response.status !== 200) {
		throw new Error(response.data);
	}

	return response.data;
}

export async function getJobs() {
	const response = await axiosInstance.get(`/api/v1/job`);

	if (response.status !== 200) {
		throw new Error(response.data);
	}

	return response.data;
}

export async function getAppliedJobs() {
	const response = await axiosInstance.get(`/api/v1/job/applied`);

	if (response.status !== 200) {
		throw new Error(response.data);
	}

	return response.data;
}

export async function getJobApplicans(job_id: string) {
	const response = await axiosInstance.get(
		`/api/v1/job/applicants/${job_id}`
	);

	if (response.status !== 200) {
		throw new Error(response.data);
	}

	return response.data;
}
