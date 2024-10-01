import { Stack } from "expo-router";

export default function JobsLayout() {
	return (
		<Stack>
			<Stack.Screen
				name="cliente"
				options={{ headerShown: false, animation: "fade" }}
			/>
			<Stack.Screen
				name="usuario"
				options={{ headerShown: false, animation: "fade" }}
			/>
		</Stack>
	);
}
