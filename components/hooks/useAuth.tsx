// Configuración de contexto
import {
	RootatoreKeys,
	deleteFromSecureStore,
	readFromSecureStore,
} from "@/store/RootStore";
import { useRouter } from "expo-router";
import {
	ReactNode,
	createContext,
	useContext,
	useEffect,
	useState,
} from "react";

type AuthContextType = {
	token: string | null;
	logOut: () => void;
	setToken: (token: string | null) => void;
};

const AuthContext = createContext<AuthContextType>({
	token: null,
	logOut: () => {},
	setToken: () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
	const [token, setToken] = useState<string | null>(null);
	const router = useRouter();

	const logOut = () => {
		setToken(null);
		deleteFromSecureStore(RootatoreKeys.SESION_TOKEN).then(() => {
			deleteFromSecureStore(RootatoreKeys.USER_ROLE).then(() => {
				router.replace("/auth/login");
			});
		});
	};

	return (
		<AuthContext.Provider value={{ token, logOut, setToken }}>
			{children}
		</AuthContext.Provider>
	);
};
