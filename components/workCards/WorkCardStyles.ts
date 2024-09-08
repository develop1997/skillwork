import { Dimensions, StyleSheet } from "react-native";

const windowWidth = Dimensions.get("window").width;
export const WorkCardStyles = StyleSheet.create({
	deformedBox: {
		position: "relative",
		width: (windowWidth * 0.90) - 10,
		height: 170,
		margin: 10
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
		margin: 20,
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		display: "flex",
		justifyContent: "flex-start",
		paddingHorizontal: 20,
	},
	title: {
		color: "#1fc8db",
		fontWeight: "bold",
		fontSize: 20,
		lineHeight: 25,
		marginBottom: 10,
	},
	text: {
		color: "#fff",
		fontSize: 16,
		lineHeight: 20,
	},
	button: {
		marginVertical: 10,
		backgroundColor: "#D9D9D9",
		width: "50%",
		alignSelf: "center",
	},
	status: {
		width: 20,
		height: 20,
		borderRadius: 10,
		marginVertical: 10,
		marginHorizontal: 20,
	},
	textContainer: {
		display: "flex",
		flexDirection: "row",
	},
});
