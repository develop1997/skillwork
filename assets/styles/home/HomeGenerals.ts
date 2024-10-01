import { StyleSheet } from "react-native";
import { APP_VALUES } from "../GeneralStyles";
import { sizeNormalizer, windowHeight, windowWidth } from "../normalizator";

export const HomeGenerals = StyleSheet.create({
	background: {
		backgroundColor: APP_VALUES.colors.primary,
		width: windowWidth,
		height: windowHeight,
	},
	fab: {
		position: "absolute",
		margin: sizeNormalizer * 16,
		right: 0,
		bottom: 0,
		backgroundColor: APP_VALUES.colors.secondary,
	},
	scrollContainer: {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		width: windowWidth,
	},
});
