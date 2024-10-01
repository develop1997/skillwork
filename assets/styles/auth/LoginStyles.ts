import { Fonts } from "@/assets/fonts/fonts";
import { StyleSheet } from "react-native";
import { sizeNormalizer, windowHeight, windowWidth } from "../normalizator";
import { APP_VALUES } from "../GeneralStyles";

export const LoginStyles = StyleSheet.create({
	background: {
		backgroundColor: APP_VALUES.colors.primary,
	},
	loginContent: {
		display: "flex",
		flexDirection: "column",
		justifyContent: "space-between",
		alignItems: "center",
		width: windowWidth * 0.8,
		height: windowHeight * 0.80,
	},
	logo: {
		width: windowHeight * 0.3,
		height: windowHeight * 0.2,
	},
	formCard: {
		display: "flex",
		flexDirection: "column",
		justifyContent: "space-evenly",
		width: windowWidth * 0.8,
		height: windowHeight * 0.8 - windowHeight * 0.2,
		padding: sizeNormalizer * 20,
	},
	formCardNoImage: {
		display: "flex",
		flexDirection: "column",
		justifyContent: "space-evenly",
		width: windowWidth * 0.8,
		height: windowHeight * 0.8,
		padding: sizeNormalizer * 20,
	},
	loginTittle: {
		color: APP_VALUES.colors.text,
		fontSize: sizeNormalizer * 48,
		lineHeight: sizeNormalizer * 48,
		fontFamily: Fonts.RobotoBold,
	},
	loginText: {
		color: APP_VALUES.colors.text,
		marginTop: sizeNormalizer * 10,
		fontFamily: Fonts.RobotoRegular,
	},
	loginLink: {
		fontWeight: "bold",
		color: APP_VALUES.colors.secondary,
		fontFamily: Fonts.RobotoBold,
		fontSize: 18,
		lineHeight: 18,
	},
});
