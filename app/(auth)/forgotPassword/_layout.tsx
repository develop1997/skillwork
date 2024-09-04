import { Stack } from "expo-router";
import "react-native-reanimated";

export default function ForgotPasswordLayout() {
	return (
		<Stack>
			<Stack.Screen name="index" options={{ headerShown: false }} />
		</Stack>
	);
}
