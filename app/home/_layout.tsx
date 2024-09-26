import { AuthProvider } from "@/components/hooks/useAuth";
import { Stack } from "expo-router";

export default function HomeLayout() {
	return (
		<AuthProvider>
			<Stack>
				<Stack.Screen
					name="index"
					options={{ headerShown: false, animation: "fade" }}
				/>
				<Stack.Screen
					name="cliente"
					options={{ headerShown: false, animation: "fade" }}
				/>
				<Stack.Screen
					name="usuario"
					options={{ headerShown: false, animation: "fade" }}
				/>
			</Stack>
		</AuthProvider>
	);
}
