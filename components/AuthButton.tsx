import { Fonts } from "@/assets/fonts/fonts";
import { FunctionComponent } from "react";
import { Button } from "react-native-paper";

interface AuthButtonProps {
	onPress: () => void;
	text: string;
}

const AuthButton: FunctionComponent<AuthButtonProps> = ({ onPress, text }) => {
	return (
		<Button
			mode="contained"
			style={{
				width: "50%",
				height: 60,
				borderRadius: 30,
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
			}}
			labelStyle={{
				fontSize: 20,
				lineHeight: 20,
                fontFamily: Fonts.RobotoBold
			}}
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
