import { StyleSheet } from "react-native";
import { sizeNormalizer, windowWidth } from "../normalizator";

export const JobsGenerals = StyleSheet.create({
	JobInformationItem: {
		width: windowWidth * 0.8,
        marginVertical: sizeNormalizer * 10,
	},
});
