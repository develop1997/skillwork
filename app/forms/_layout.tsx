import { Stack } from "expo-router";
import { FunctionComponent } from "react";

interface FormLayoutProps {}

const FormLayout: FunctionComponent<FormLayoutProps> = () => {
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
};

export default FormLayout;
