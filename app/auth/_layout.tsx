import { Stack } from "expo-router";
import "react-native-reanimated";

export default function AuthLayout() {
	return (
		<Stack>
			<Stack.Screen name="login" options={{ headerShown: false, animation: "fade" }} />
			<Stack.Screen name="register" options={{ headerShown: false, animation: "fade" }} />
			<Stack.Screen name="forgotPassword" options={{ headerShown: false, animation: "fade" }} />
		</Stack>
	);
}
