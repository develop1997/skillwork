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
}

const Dropdown: FunctionComponent<DropdownProps> = ({
	data,
	textDefault = "Select",
	onSelect,
}) => {
	return (
		<SelectDropdown
			data={data}
			onSelect={onSelect}
			renderButton={(selectedItem: Item, isOpened) => {
				return (
					<View style={styles.dropdownButtonStyle}>
						{selectedItem ? (
							<>
								<View style={styles.dropdownButtonIconStyle}>
									{IconsObject[selectedItem.icon]()}
								</View>
								<Text style={styles.dropdownButtonTxtStyle}>
									{selectedItem.title}
								</Text>
							</>
						) : (
							<Text style={styles.dropdownButtonTxtStyle}>
								{textDefault}
							</Text>
						)}
						{isOpened ? (
							<Entypo name="chevron-up" size={24} color="white" />
						) : (
							<Entypo
								name="chevron-down"
								size={24}
								color="white"
							/>
						)}
					</View>
				);
			}}
			renderItem={(item: Item, isSelected) => {
				return (
					<View
						style={{
							...styles.dropdownItemStyle,
							...(isSelected && { backgroundColor: "#40346b" }),
						}}
					>
						<View style={styles.dropdownButtonIconStyle}>
							{IconsObject[item.icon]()}
						</View>
						<Text style={styles.dropdownItemTxtStyle}>
							{item.title}
						</Text>
					</View>
				);
			}}
			showsVerticalScrollIndicator={false}
			dropdownStyle={styles.dropdownMenuStyle}
		/>
	);
};

export default Dropdown;

const styles = StyleSheet.create({
	dropdownButtonStyle: {
		marginVertical: 15,
		fontSize: 26,
		lineHeight: 26,
		height: 80,
		backgroundColor: "#40346b",
		color: "#fff",
		borderRadius: 25,
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		paddingHorizontal: 12,
	},
	dropdownButtonTxtStyle: {
		flex: 1,
		fontSize: 26,
		lineHeight: 26,
		fontWeight: "500",
		color: "#fff",
	},
	dropdownButtonArrowStyle: {
		fontSize: 28,
	},
	dropdownButtonIconStyle: {
		fontSize: 28,
		marginLeft: 4,
		marginRight: 15,
	},
	dropdownMenuStyle: {
		backgroundColor: "#40346b",
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
		fontSize: 26,
		lineHeight: 26,
		fontWeight: "500",
		color: "#fff",
	},
	dropdownItemIconStyle: {
		fontSize: 28,
		marginHorizontal: 18,
	},
});
