import { configureAxios } from "@/api/AxiosComponent";
import { GetUserData } from "@/api/Profile/userData";
import { useAuth } from "@/components/hooks/useAuth";
import { RolesConstants } from "@/constants/Roles";
import {
	RootStoreType,
	RootatoreKeys,
	deleteFromSecureStore,
	useRootStore,
} from "@/store/RootStore";
import { Redirect, useNavigation } from "expo-router";
import { FunctionComponent, useEffect } from "react";

interface HomeProps {}

const Home: FunctionComponent<HomeProps> = () => {
	const router = useNavigation();

	const { logOut, token, setTokenReady, tokenReady } = useAuth();
	const { setUserData, user_role } = useRootStore();

	const setUser_role = useRootStore(
		(state: RootStoreType) => state.setUser_role
	);

	const handleLogout = async () => {
		deleteFromSecureStore(RootatoreKeys.SESION_TOKEN).then(() => {
			deleteFromSecureStore(RootatoreKeys.USER_ROLE).then(() => {
				setUser_role(undefined);
				router?.goBack();
			});
		});
	};

	useEffect(() => {
		if (token) {
			configureAxios(token, logOut, setTokenReady);
		}
	}, [token]);

	useEffect(() => {
		if (tokenReady) {
			GetUserData().then((res) => {
				setUserData(res);
			});
		}
	}, [tokenReady]);

	useEffect(() => {
		if (!user_role) {
			handleLogout();
		}
	}, []);

	if (!user_role) return null;

	if (user_role === RolesConstants.CLIENTE) {
		return <Redirect href={"/home/cliente" as any} />;
	} else if (user_role === RolesConstants.USUARIO) {
		return <Redirect href={"/home/usuario" as any} />;
	}

	// if (user_role === RolesConstants.USUARIO) {
	// 	return <Redirect href={"/home/cliente" as any} />;
	// } else if (user_role === RolesConstants.CLIENTE) {
	// 	return <Redirect href={"/home/usuario" as any} />;
	// }
};

export default Home;
