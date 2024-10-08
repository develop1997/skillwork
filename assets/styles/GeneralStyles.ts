import { Platform, StyleSheet } from "react-native";
import { sizeNormalizer, windowHeight, windowWidth } from "./normalizator";

export const GeneralStyles = StyleSheet.create({
	centeredView: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
	},
	centeredFullScreen: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		width: windowWidth,
		height: windowHeight,
	},
	horizontal: {
		display: "flex",
		gap: sizeNormalizer * 10,
		flexDirection: "row",
	},
	horizontalWrap: {
		display: "flex",
		flexDirection: "row",
		flexWrap: "wrap",
		gap: sizeNormalizer * 10,
	},
	centeredVertical: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		flexDirection: "column",
	},
	centeredVerticalNoAlign: {
		display: "flex",
		justifyContent: "center",
		flexDirection: "column",
	},
	vertical: {
		display: "flex",
		gap: sizeNormalizer * 10,
		flexDirection: "column",
	},
	centeredHorizontal: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		flexDirection: "row",
	},
	centeredHorizontalNoAlign: {
		display: "flex",
		justifyContent: "center",
		flexDirection: "row",
	},
});


export const APP_VALUES = {
	colors: {
		primary: "#fff",
		secondary: "#34A3DF",
		secondaryLight: "#85C8EC",
		tertiary: "#D9D9D9",
		text: "#000",
		disabledTextDark: "#2c2a2a",
		disabledTextLight: "#7b7b7b",
		error: "#f94e4e",
	},
	globalElemtSize: {
		tabHeight: windowHeight * 0.08,
		headerBarHeight: windowHeight * 0.1,
	},
};
