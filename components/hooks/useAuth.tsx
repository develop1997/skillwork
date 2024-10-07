// Configuración de contexto
import {
	RootatoreKeys,
	deleteFromSecureStore,
	useRootStore,
} from "@/store/RootStore";
import { useRouter } from "expo-router";
import { ReactNode, createContext, useContext, useState } from "react";

type AuthContextType = {
	token: string | null;
	logOut: () => void;
	setToken: (token: string | null) => void;
	tokenReady: boolean;
	setTokenReady: (tokenReady: boolean) => void;
};

const AuthContext = createContext<AuthContextType>({
	token: null,
	logOut: () => {},
	setToken: () => {},
	tokenReady: false,
	setTokenReady: () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
	const [token, set_token] = useState<string | null>(null);
	const [tokenReady, setTokenReady] = useState(false);
	const router = useRouter();
	const { setUser_role, setUserData } = useRootStore();

	function setToken(token: string | null) {
		set_token(token);
		setTokenReady(!!token); // if token is null, it would be not ready
	}

	const logOut = () => {
		setToken(null);
		setUserData(undefined);
		setUser_role(undefined);
		deleteFromSecureStore(RootatoreKeys.SESION_TOKEN).then(() => {
			deleteFromSecureStore(RootatoreKeys.USER_ROLE).then(() => {
				router.replace("/auth/login");
			});
		});
	};

	return (
		<AuthContext.Provider
			value={{ token, logOut, setToken, tokenReady, setTokenReady }}
		>
			{children}
		</AuthContext.Provider>
	);
};
