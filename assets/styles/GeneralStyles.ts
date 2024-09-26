import { StyleSheet } from "react-native";

export const GeneralStyles = StyleSheet.create({
	centeredView: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
	},
	horizontal: {
		display: "flex",
		gap: 10,
		flexDirection: "row",
	},
	horizontalWrap: {
		display: "flex",
		flexDirection: "row",
		flexWrap: "wrap",
		gap: 10,
	}
});

export const APP_VALUES = {
	colors: {
		primary: "#fff",
		secondary: "#34A3DF",
		secondaryLight: "#85C8EC",
        tertiary: "#c7c7c7",
		text: "#000",
		disabledTextDark: "#2c2a2a",
		disabledTextLight: "#7b7b7b",

	},
};
