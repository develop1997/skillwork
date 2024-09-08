import { ThemedText } from "@/components/ThemedText";
import {
	RootStoreType,
	RootatoreKeys,
	deleteFromSecureStore,
	useRootStore,
} from "@/store/RootStore";
import { useNavigation } from "expo-router";
import { FunctionComponent } from "react";
import { Button, StatusBar } from "react-native";

interface ProfileProps {}

const Profile: FunctionComponent<ProfileProps> = () => {
	const router = useNavigation().getParent();
	const setSesion_token = useRootStore(
		(state: RootStoreType) => state.setSesion_token
	);

	const setUser_role = useRootStore(
		(state: RootStoreType) => state.setUser_role
	);

	const handleLogout = async () => {
		deleteFromSecureStore(RootatoreKeys.SESION_TOKEN).then(() => {
			deleteFromSecureStore(RootatoreKeys.USER_ROLE).then(() => {
				setSesion_token(undefined);
				setUser_role(undefined);
				router?.goBack();
			});
		});
	};

	return (
		<>
			<StatusBar barStyle="light-content" />
			<ThemedText>Profile (usuario)</ThemedText>
			<Button title="Logout" onPress={handleLogout} />
		</>
	);
};

export default Profile;
