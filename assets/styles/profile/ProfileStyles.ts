

import { Dimensions, StyleSheet } from "react-native";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;



export const ProfileStyles = StyleSheet.create({
    Horizontal: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        width: windowWidth * 0.9,
    },
    profileImage: {
        width: 100, height: 100,
        borderRadius: 20
    },
    profileItem: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        backgroundColor: "#40346b",
        borderRadius: 20
    }
})