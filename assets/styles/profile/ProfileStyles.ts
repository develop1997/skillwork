import { StyleSheet } from "react-native";
import { APP_VALUES } from "../GeneralStyles";
import { sizeNormalizer, windowWidth } from "../normalizator";

export const ProfileStyles = StyleSheet.create({
	Horizontal: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-around",
		alignItems: "center",
		width: windowWidth * 0.9,
	},
	profileImage: {
		width: sizeNormalizer * 100,
		height: sizeNormalizer * 100,
		borderRadius: sizeNormalizer * 20,
	},
	profileItem: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-around",
		alignItems: "center",
		backgroundColor: APP_VALUES.colors.tertiary,
		borderRadius: sizeNormalizer * 20,
	},
});
