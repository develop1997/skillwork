import { Fonts } from "@/assets/fonts/fonts";
import { FunctionComponent } from "react";
import { Button } from "react-native-paper";

interface AuthButtonProps {
	onPress: () => void;
	text: string;
	loading?: boolean;
	primaryColor?: string;
	secondaryColor?: string;
}

const AuthButton: FunctionComponent<AuthButtonProps> = ({
	onPress,
	text,
	loading = false,
	primaryColor = "#17f2de",
	secondaryColor = "#000",
}) => {
	return (
		<Button
			mode="contained"
			style={{
				minWidth: "40%",
				height: 60,
				borderRadius: 30,
			}}
			labelStyle={{
				fontSize: 20,
				height: 40,
				textAlignVertical: "center",
				fontFamily: Fonts.RobotoBold,
			}}
			loading={loading}
			theme={{
				colors: {
					primary: primaryColor,
					onPrimary: secondaryColor,
				},
			}}
			onPress={onPress}
		>
			{text}
		</Button>
	);
};

export default AuthButton;
