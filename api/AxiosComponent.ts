// define a default config
import axios from "axios";
import { Enviroment } from "../store/enviroment";
import { useAuth } from "@/components/hooks/useAuth";

const axiosInstance = axios.create({
	baseURL: Enviroment.BACKEND_API,
	headers: {
		"Content-Type": "application/json",
	},
});

export function configureAxios(token: string, logOut: () => void) {
	if (token) {
		// add the token to the header
		axiosInstance.interceptors.request.use(
			(config) => {
				config.headers["Authorization"] = `Bearer ${token}`;
				return config;
			},
			(error) => {
				return Promise.reject(error);
			}
		);

		// interceptor for 403
		axiosInstance.interceptors.response.use(
			(response) => {
				return response;
			},
			(error) => {
				const { logOut } = useAuth();
				if (error.response.status === 403) {
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
