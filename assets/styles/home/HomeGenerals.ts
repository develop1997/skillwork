
import { Dimensions, StyleSheet } from "react-native";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export const HomeGenerals = StyleSheet.create({
    background: {
        backgroundColor: "#1f1a30",
        width: windowWidth,
    },
    contentScroll: {
        alignItems: "center",
        justifyContent: "center",
    }
}
)
