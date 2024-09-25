import { APP_VALUES } from "@/assets/styles/GeneralStyles";
import { sizeNormalizer } from "@/assets/styles/normalizator";
import { useNavigation } from "expo-router";
import { FunctionComponent } from "react";
import { Dimensions, View } from "react-native";
import { Appbar } from "react-native-paper";

const windowWidth = Dimensions.get("window").width;

interface BackHeaderButtonProps {
	backgroundColor?: string;
	ArrowColor?: string;
}

const BackHeaderButton: FunctionComponent<BackHeaderButtonProps> = ({
	backgroundColor = APP_VALUES.colors.primary,
	ArrowColor = APP_VALUES.colors.text,
}) => {
	const navigation = useNavigation();
	return (
		<View
			style={{
				display: "flex",
				flexDirection: "row",
				width: windowWidth,
			}}
		>
			<Appbar.Header
				style={{
					backgroundColor: backgroundColor,
				}}
				theme={{
					colors: {
						onSurface: ArrowColor,
					},
				}}
			>
				<Appbar.BackAction
					size={sizeNormalizer * 30}
					onPress={() => navigation.goBack()}
				/>
			</Appbar.Header>
		</View>
	);
};

export default BackHeaderButton;
