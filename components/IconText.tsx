import { APP_VALUES, GeneralStyles } from "@/assets/styles/GeneralStyles";
import { sizeNormalizer } from "@/assets/styles/normalizator";
import { FunctionComponent } from "react";
import { View } from "react-native";
import { Icon } from "react-native-paper";
import { ThemedText } from "./ThemedText";

interface IconTextProps {
	icon: string;
	text: string;
	fontSize?: number;
	margin?: number;
	fontColor?: string;
}

export const IconText: FunctionComponent<IconTextProps> = ({
	icon,
	text = "",
	fontSize = sizeNormalizer * 24,
	margin = sizeNormalizer * 10,
	fontColor = APP_VALUES.colors.text,
}) => {
	return (
		<View
			style={[
				GeneralStyles.horizontal,
				{
					margin: margin,
					alignItems: "center",
				},
			]}
		>
			<Icon
				source={icon}
				color={fontColor}
				size={sizeNormalizer * 32}
			/>
			<ThemedText
				type="default"
				style={{ fontSize: fontSize, color: fontColor }}
			>
				{text}
			</ThemedText>
		</View>
	);
};
