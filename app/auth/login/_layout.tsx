import { Stack } from "expo-router";
import "react-native-reanimated";

export default function LoginLayout() {
	return (
		<Stack>
			<Stack.Screen name="index" options={{ headerShown: false, animation: "fade" }} />
		</Stack>
	);
}
