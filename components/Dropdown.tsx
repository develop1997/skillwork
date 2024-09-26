import { Entypo } from "@expo/vector-icons";
import { FunctionComponent, useRef } from "react";
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
	resetAfterSelect?: boolean;
	showIcon?: boolean;
}

const Dropdown: FunctionComponent<DropdownProps> = ({
	data,
	textDefault = "Select",
	onSelect,
	height,
	backgroundColor = APP_VALUES.colors.tertiary,
	foregroundColor = APP_VALUES.colors.text,
	roundness = sizeNormalizer * 25,
	fontSize = sizeNormalizer * 22,
	resetAfterSelect = false,
	showIcon = true,
}) => {
	const dropdownRef = useRef<SelectDropdown>(null);
	const clearSelect = () => {
		dropdownRef.current?.reset();
	};
	return (
		<SelectDropdown
			ref={dropdownRef}
			data={data}
			onSelect={(selectedItem: Item) => {
				onSelect(selectedItem);
				if (resetAfterSelect) {
					clearSelect();
				}
			}}
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
								{showIcon && (
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
								)}
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
								size={fontSize}
								color={foregroundColor}
							/>
						) : (
							<Entypo
								name="chevron-down"
								size={fontSize}
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
						{showIcon && (
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
						)}
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
