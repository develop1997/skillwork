import { Fonts } from "@/assets/fonts/fonts";
import { Dimensions, StyleSheet } from "react-native";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export const LoginStyles = StyleSheet.create({
    background: {
        backgroundColor: "#1f1a30",
        flex: 1,
    },
    loginContent: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        width: windowWidth * 0.8,
        height: windowHeight * 0.85,
    },
    logo: {
        width: windowHeight * 0.3,
        height: windowHeight * 0.20
    },
    formCard: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-evenly",
        width: windowWidth * 0.8,
        height: ((windowHeight * 0.8) - (windowHeight * 0.2)),
        padding: 20,
    },
    loginTittle: {
        color: "white",
        fontSize: 48,
        lineHeight: 48,
        fontFamily: Fonts.RobotoBold,
    },
    loginText: {
        color: "white",
        marginTop: 10,
        fontFamily: Fonts.RobotoRegular,
    },
    loginLink: {
        fontWeight: "bold",
        color: "#17f2de",
        fontFamily: Fonts.RobotoBold,
        fontSize: 18,
        lineHeight: 18,
    }

}
)
