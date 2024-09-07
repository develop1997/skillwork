import { ThemedText } from "@/components/ThemedText";
import { RootStoreType, RootatoreKeys, deleteFromSecureStore, useRootStore } from "@/store/RootStore";
import { useNavigation } from "expo-router";
import { FunctionComponent } from "react";
import { Button, StatusBar } from "react-native";

interface HomeProps {}

const Home: FunctionComponent<HomeProps> = () => {
	const router = useNavigation();
	const setSesion_token = useRootStore(
		(state: RootStoreType) => state.setSesion_token
	);

	const handleLogout = async () => {
		deleteFromSecureStore(RootatoreKeys.SESION_TOKEN).then(() => {
			setSesion_token(undefined);
			router.goBack();
		})
	};

	return (
		<>
			<StatusBar barStyle="light-content" />
			<ThemedText>Home</ThemedText>
			<Button title="log out" onPress={handleLogout} />
			
		</>
	);
};

export default Home;
