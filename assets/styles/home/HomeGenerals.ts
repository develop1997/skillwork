
import { Dimensions, StyleSheet } from "react-native";
import { APP_VALUES } from "../GeneralStyles";
import { windowWidth } from "../normalizator";

export const HomeGenerals = StyleSheet.create({
    background: {
        backgroundColor: APP_VALUES.colors.primary,
        width: windowWidth,
    },
    contentScroll: {
        alignItems: "center",
        justifyContent: "center",
    }
}
)
