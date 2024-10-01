// define a default config
import axios from "axios";
import { Enviroment } from "../store/enviroment";

const axiosInstance = axios.create({
	baseURL: Enviroment.BACKEND_API,
	headers: {
		"Content-Type": "application/json",
	},
});
let requestInterceptor: number | null = null;
let responseInterceptor: number | null = null;

export function configureAxios(token: string, logOut: () => void) {
	if (requestInterceptor !== null) {
		axiosInstance.interceptors.request.eject(requestInterceptor);
	}
	if (responseInterceptor !== null) {
		axiosInstance.interceptors.response.eject(responseInterceptor);
	}

	if (token) {
		requestInterceptor = axiosInstance.interceptors.request.use(
			(config) => {
				config.headers["Authorization"] = `Bearer ${token}`;
				return config;
			},
			(error) => {
				return Promise.reject(error);
			}
		);

		responseInterceptor = axiosInstance.interceptors.response.use(
			(response) => {
				return response;
			},
			(error) => {
				if (error.response && error.response.status === 403) {
					logOut();
				}
				return Promise.reject(error);
			}
		);
	} else {
		logOut();
	}
}
export default axiosInstance;
