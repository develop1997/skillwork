import axiosInstance from "../AxiosComponent";

export async function getJobsOfUser() {
    const response = await axiosInstance.get(`/api/v1/job/user`)

    if (response.status !== 200) {
        throw new Error(response.data);
    }

    return response.data
}