import { Fonts } from "@/assets/fonts/fonts";
import { FunctionComponent } from "react";
import { Button } from "react-native-paper";

interface AuthButtonProps {
	onPress: () => void;
	text: string;
	loading?: boolean;
}

const AuthButton: FunctionComponent<AuthButtonProps> = ({ onPress, text, loading=false }) => {
	return (
		<Button
			mode="contained"
			style={{
				width: "50%",
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
					primary: "#17f2de",
					onPrimary: "#000",
				},
			}}
			onPress={onPress}
		>
			{text}
		</Button>
	);
};

export default AuthButton;
