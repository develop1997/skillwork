import { APP_VALUES, GeneralStyles } from "@/assets/styles/GeneralStyles";
import { sizeNormalizer, windowWidth } from "@/assets/styles/normalizator";
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
		<View key={key} style={[GeneralStyles.horizontal,{
			borderWidth: 1,
			borderColor: APP_VALUES.colors.secondaryLight,
			width: windowWidth * 0.8,
			marginVertical: sizeNormalizer * 10,
			padding: sizeNormalizer * 10,
			borderRadius: sizeNormalizer * 10,
		}]}>
			{image && image != "" ? (
				<Image
					style={{
						padding: sizeNormalizer * 5,
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
