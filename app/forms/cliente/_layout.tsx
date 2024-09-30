import { Stack } from "expo-router";
import { FunctionComponent } from "react";

interface FormLayoutProps {}

const FormLayout: FunctionComponent<FormLayoutProps> = () => {
	return (
		<Stack>
			<Stack.Screen
				name="jobForm"
				options={{ headerShown: false, animation: "fade" }}
			/>
		</Stack>
	);
};

export default FormLayout;
