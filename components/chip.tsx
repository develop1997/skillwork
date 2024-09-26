import { APP_VALUES } from "@/assets/styles/GeneralStyles";
import { FunctionComponent, useRef, useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { ThemedText } from "./ThemedText";
import { Entypo } from "@expo/vector-icons";
import { sizeNormalizer } from "@/assets/styles/normalizator";

interface ChipProps {
	title: string;
}

export const Chip: FunctionComponent<ChipProps> = ({ title }) => {
	const [visible, setVisible] = useState(true);
	if (!visible) return null;
	return (
		<View style={styles.chip}>
			<ThemedText type="defaultSemiBold">
				{title}
				<TouchableOpacity onPress={() => setVisible(false)}>
					<Entypo name="cross" size={10} color="white" />
				</TouchableOpacity>
			</ThemedText>
		</View>
	);
};

const styles = StyleSheet.create({
	chip: {
		backgroundColor: APP_VALUES.colors.primary,
		borderRadius: sizeNormalizer * 5,
		paddingHorizontal: sizeNormalizer * 10,
		paddingVertical: sizeNormalizer * 5,
	},
});
