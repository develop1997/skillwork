import { APP_VALUES } from "@/assets/styles/GeneralStyles";
import { sizeNormalizer, windowWidth } from "@/assets/styles/normalizator";
import { Dimensions, StyleSheet } from "react-native";
export const WorkCardStyles = StyleSheet.create({
	deformedBox: {
		position: "relative",
		width: (windowWidth * 0.90) - sizeNormalizer * 10,
		height: sizeNormalizer * 170,
		margin: sizeNormalizer * 10
	},
	svg: {
		position: "absolute",
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
	},
	content: {
		position: "absolute",
		margin: sizeNormalizer * 20,
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		display: "flex",
		justifyContent: "flex-start",
		paddingHorizontal: sizeNormalizer * 20,
	},
	title: {
		color: APP_VALUES.colors.text,
		fontWeight: "bold",
		fontSize: sizeNormalizer * 20,
		lineHeight: sizeNormalizer * 25,
		marginBottom: sizeNormalizer * 10,
	},
	text: {
		color: APP_VALUES.colors.text,
		fontSize: sizeNormalizer * 16,
		lineHeight: sizeNormalizer * 20,
	},
	button: {
		marginVertical: sizeNormalizer * 10,
		backgroundColor: "#D9D9D9",
		width: "50%",
		fontSize: sizeNormalizer * 16,
		alignSelf: "center",
	},
	status: {
		width: sizeNormalizer * 20,
		height: sizeNormalizer * 20,
		borderRadius: sizeNormalizer * 10,
		marginVertical: sizeNormalizer * 10,
		marginHorizontal: sizeNormalizer * 20,
	},
	textContainer: {
		display: "flex",
		flexDirection: "row",
	},
});
