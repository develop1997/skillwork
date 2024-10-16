import { Stack } from "expo-router";

export default function JobsLayout() {
	return (
		<Stack>
			<Stack.Screen
				name="job"
				options={{ headerShown: false, animation: "fade" }}
			/>
			<Stack.Screen
				name="status"
				options={{ headerShown: false, animation: "fade" }}
			/>
		</Stack>
	);
}
