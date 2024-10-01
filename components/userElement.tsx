import { APP_VALUES, GeneralStyles } from "@/assets/styles/GeneralStyles";
import { sizeNormalizer } from "@/assets/styles/normalizator";
import { FontAwesome5 } from "@expo/vector-icons";
import { FunctionComponent } from "react";
import { Image, View } from "react-native";
import { ThemedText } from "./ThemedText";

interface UserItemProps {
	image?: string;
	name?: string;
	email?: string;
	key?: string;
}

const UserItem: FunctionComponent<UserItemProps> = ({
	image,
	name,
	email,
	key,
}) => {
	return (
		<View key={key} style={GeneralStyles.horizontal}>
			{image && image != "" ? (
				<Image
					style={{
						width: sizeNormalizer * 30,
						height: sizeNormalizer * 30,
						borderRadius: sizeNormalizer * 15,
					}}
					source={{
						uri: image,
					}}
				/>
			) : (
				<View
					style={{
						padding: sizeNormalizer * 5,
						width: sizeNormalizer * 30,
						height: sizeNormalizer * 30,
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
					}}
				>
					<FontAwesome5
						name="user-alt"
						size={sizeNormalizer * 20}
						color={APP_VALUES.colors.text}
					/>
				</View>
			)}

			<View style={{ marginLeft: sizeNormalizer * 10 }}>
				<ThemedText type="default">{name}</ThemedText>
				<ThemedText type="defaultSemiBold">({email})</ThemedText>
			</View>
		</View>
	);
};

export default UserItem;
