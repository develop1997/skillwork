import { sizeNormalizer } from "@/assets/styles/normalizator";
import { FunctionComponent } from "react";
import { StyleSheet, Text, View } from "react-native";

interface UnorderedListProps {
	items: string[];
}

const UnorderedList: FunctionComponent<UnorderedListProps> = ({ items }) => {
	return (
		<View style={styles.listContainer}>
			{items.map((item, index) => (
				<View key={index} style={styles.listItem}>
					<Text style={styles.bullet}>•</Text>
					<Text style={styles.itemText}>{item}</Text>
				</View>
			))}
		</View>
	);
};

const styles = StyleSheet.create({
	listContainer: {
		padding: sizeNormalizer * 10,
	},
	listItem: {
		flexDirection: "row",
		marginBottom: sizeNormalizer * 5,
	},
	bullet: {
		marginRight: sizeNormalizer * 5,
	},
	itemText: {
		flex: 1,
	},
});

export default UnorderedList;
