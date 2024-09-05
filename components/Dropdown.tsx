import { Entypo } from "@expo/vector-icons";
import { FunctionComponent } from "react";
import { StyleSheet, Text, View } from "react-native";
import SelectDropdown from "react-native-select-dropdown";
import { IconsObject } from "./Icons";

interface Item {
	title: string;
	value: any;
	icon: string;
}

interface DropdownProps {
	data: Item[];
	textDefault?: string;
	onSelect: (selectedItem: Item) => void;
	backgroundColor: string;
	foregroundColor: string;
	roundness: number;
	height: number;
	fontSize: number;
}

const Dropdown: FunctionComponent<DropdownProps> = ({
	data,
	textDefault = "Select",
	onSelect,
	backgroundColor = "#40346b",
	foregroundColor = "#fff",
	roundness = 25,
	height,
	fontSize = 26,
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
								color: foregroundColor,
								borderRadius: roundness,
								height: height,
								fontSize: fontSize,
								lineHeight: fontSize,
							} as any,
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
								size={24}
								color={foregroundColor}
							/>
						) : (
							<Entypo
								name="chevron-down"
								size={24}
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
			dropdownStyle={[
				styles.dropdownMenuStyle,
				{
					backgroundColor: backgroundColor,
				},
			]}
		/>
	);
};

export default Dropdown;

const styles = StyleSheet.create({
	dropdownButtonStyle: {
		marginVertical: 15,
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		paddingHorizontal: 12,
	},
	dropdownButtonTxtStyle: {
		flex: 1,
		fontWeight: "500",
	},
	dropdownButtonIconStyle: {
		marginLeft: 4,
		marginRight: 15,
	},
	dropdownMenuStyle: {
		borderRadius: 8,
	},
	dropdownItemStyle: {
		width: "100%",
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		padding: 20,
	},
	dropdownItemTxtStyle: {
		flex: 1,
		fontWeight: "500",
	},
});
