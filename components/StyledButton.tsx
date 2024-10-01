import { Fonts } from "@/assets/fonts/fonts";
import { APP_VALUES } from "@/assets/styles/GeneralStyles";
import { sizeNormalizer, windowWidth } from "@/assets/styles/normalizator";
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
	primaryColor = APP_VALUES.colors.secondary,
	secondaryColor = APP_VALUES.colors.text,
}) => {
	return (
		<Button
			disabled={loading}
			mode="contained"
			style={{
				display: "flex",
				minWidth: windowWidth * 0.3,
				borderRadius: sizeNormalizer * 30,
			}}
			contentStyle={{
				height: sizeNormalizer * 65,
			}}
			labelStyle={{
				fontSize: sizeNormalizer * 18,
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
