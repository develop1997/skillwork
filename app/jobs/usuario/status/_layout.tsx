import { Stack } from "expo-router";

export default function JobsLayout() {
	return (
		<Stack>
			<Stack.Screen
				name="[data]"
				options={{ headerShown: false, animation: "fade" }}
			/>
		</Stack>
	);
}
