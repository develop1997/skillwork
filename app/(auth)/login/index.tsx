import { GeneralStyles } from "@/assets/styles/GeneralStyles";
import { LoginStyles } from "@/assets/styles/auth/login/LoginStyles";
import { StatusBar, Text, View } from "react-native";

export default function Login() {
	return (
		<>
			<StatusBar barStyle="light-content" />
			<View
				style={{
					...GeneralStyles.centeredView,
					...LoginStyles.background,
				}}
			>
				
			</View>
		</>
	);
}
