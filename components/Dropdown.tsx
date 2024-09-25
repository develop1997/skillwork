import { Entypo } from "@expo/vector-icons";
import { FunctionComponent } from "react";
import { StyleSheet, Text, View } from "react-native";
import SelectDropdown from "react-native-select-dropdown";
import { IconsObject } from "./Icons";
import { sizeNormalizer, windowWidth } from "@/assets/styles/normalizator";
import { APP_VALUES } from "@/assets/styles/GeneralStyles";

interface Item {
	title: string;
	value: any;
	icon: string;
}

interface DropdownProps {
	data: Item[];
	textDefault?: string;
	onSelect: (selectedItem: Item) => void;
	backgroundColor?: string;
	foregroundColor?: string;
	roundness?: number;
	height: number;
	fontSize: number;
}

const Dropdown: FunctionComponent<DropdownProps> = ({
	data,
	textDefault = "Select",
	onSelect,
	height,
	backgroundColor = APP_VALUES.colors.tertiary,
	foregroundColor = APP_VALUES.colors.text,
	roundness = sizeNormalizer * 25,
	fontSize = sizeNormalizer * 26,
}) => {
	return (
		<SelectDropdown
			data={data}
			onSelect={onSelect}
			renderButton={(selectedItem: Item, isOpened) => {
				return (
					<View
						style={[
							styles.dropdownButtonStyle,
							{
								backgroundColor: backgroundColor,
								borderRadius: roundness,
								height: height,
							},
						]}
					>
						{selectedItem ? (
							<>
								<View
									style={[
										styles.dropdownButtonIconStyle,
										{
											fontSize: fontSize,
										} as any,
									]}
								>
									{IconsObject[selectedItem.icon]()}
								</View>
								<Text
									style={[
										styles.dropdownButtonTxtStyle,
										{
											color: foregroundColor,
											fontSize: fontSize,
											lineHeight: fontSize,
										},
									]}
								>
									{selectedItem.title}
								</Text>
							</>
						) : (
							<Text
								style={[
									styles.dropdownButtonTxtStyle,
									{
										color: foregroundColor,
										fontSize: fontSize,
										lineHeight: fontSize,
									},
								]}
							>
								{textDefault}
							</Text>
						)}
						{isOpened ? (
							<Entypo
								name="chevron-up"
								size={sizeNormalizer * 24}
								color={foregroundColor}
							/>
						) : (
							<Entypo
								name="chevron-down"
								size={sizeNormalizer * 24}
								color={foregroundColor}
							/>
						)}
					</View>
				);
			}}
			renderItem={(item: Item) => {
				return (
					<View
						style={{
							...styles.dropdownItemStyle,
							...{
								backgroundColor: backgroundColor,
							},
						}}
					>
						<View
							style={[
								styles.dropdownButtonIconStyle,
								{
									fontSize: fontSize,
								} as any,
							]}
						>
							{IconsObject[item.icon]()}
						</View>
						<Text
							style={[
								styles.dropdownItemTxtStyle,
								{
									fontSize: fontSize,
									lineHeight: fontSize,
									color: foregroundColor,
								},
							]}
						>
							{item.title}
						</Text>
					</View>
				);
			}}
			showsVerticalScrollIndicator={false}
			dropdownStyle={{
				...styles.dropdownMenuStyle,
				backgroundColor: backgroundColor,
			}}
			statusBarTranslucent
		/>
	);
};

export default Dropdown;

const styles = StyleSheet.create({
	dropdownButtonStyle: {
		marginVertical: sizeNormalizer * 15,
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		paddingHorizontal: sizeNormalizer * 12,
	},
	dropdownButtonTxtStyle: {
		flex: 1,
		fontWeight: "400",
	},
	dropdownButtonIconStyle: {
		marginLeft: sizeNormalizer * 4,
		marginRight: sizeNormalizer * 15,
	},
	dropdownMenuStyle: {
		borderRadius: sizeNormalizer * 8,
	},
	dropdownItemStyle: {
		width: windowWidth,
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		padding: sizeNormalizer * 20,
	},
	dropdownItemTxtStyle: {
		flex: 1,
		fontWeight: "400",
	},
});
