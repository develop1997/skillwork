import { StyleSheet } from "react-native";
import { sizeNormalizer, windowHeight, windowWidth } from "../normalizator";
import { APP_VALUES, GeneralStyles } from "../GeneralStyles";

export const FormsStyles = StyleSheet.create({
	background: {
        height: windowHeight,
		backgroundColor: APP_VALUES.colors.primary,
	},
    formCard: {
        ...GeneralStyles.centeredVertical,
		width: windowWidth * 0.9,
		padding: sizeNormalizer * 20,
        marginVertical: sizeNormalizer * 50,
    },
    formInput: {
        display: "flex",
        flexDirection: "row",
    },
    formTitle: {
        color: APP_VALUES.colors.secondary,
        marginBottom: sizeNormalizer * 15,
    },
    formDateInput: {
		width: windowWidth * 0.8,
    },
});
