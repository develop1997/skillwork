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
	const user_role = useRootStore((state: RootStoreType) => state.user_role);
	const router = useNavigation();

	const { token, logOut } = useAuth();

	useEffect(() => {
		if (token) {
			configureAxios(token, logOut);
		}
	}, [token]);

	const { setUserData } = useRootStore();

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
		GetUserData().then((res) => {
			setUserData(res);
		});
	}, []);

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
