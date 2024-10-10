import { APP_VALUES, GeneralStyles } from "@/assets/styles/GeneralStyles";
import { sizeNormalizer, windowWidth } from "@/assets/styles/normalizator";
import { FontAwesome5 } from "@expo/vector-icons";
import { FunctionComponent } from "react";
import { Image, TouchableOpacity, View } from "react-native";
import { ThemedText } from "./ThemedText";
import { Icon } from "react-native-paper";
import { useRouter } from "expo-router";
import { statusColors } from "./workCards/WorkCard";

interface UserItemProps {
	image?: string;
	name?: string;
	email?: string;
	keyValue?: string;
	status: string;
}

const UserItem: FunctionComponent<UserItemProps> = ({
	image,
	name,
	email,
	status,
	keyValue,
}) => {
	const router = useRouter();
	return (
		<View
			style={[
				GeneralStyles.horizontal,
				{
					width: windowWidth * 0.8,
					marginVertical: sizeNormalizer * 10,
					padding: sizeNormalizer * 20,
					borderRadius: sizeNormalizer * 20,
					shadowOffset: {
						width: sizeNormalizer * -1,
						height: sizeNormalizer * 3,
					},
					shadowRadius: sizeNormalizer * 3,
					shadowOpacity: 0.2,
					// shadowColor: "#171717",
					shadowColor: statusColors[status],
					elevation: sizeNormalizer * 3,
				},
			]}
		>
			{image && image != "" ? (
				<Image
					style={{
						padding: sizeNormalizer * 5,
						width: sizeNormalizer * 40,
						height: sizeNormalizer * 40,
						borderRadius: sizeNormalizer * 20,
					}}
					source={{
						uri: image,
					}}
				/>
			) : (
				<View
					style={{
						padding: sizeNormalizer * 5,
						width: sizeNormalizer * 40,
						height: sizeNormalizer * 40,
						borderRadius: sizeNormalizer * 20,
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
					}}
				>
					<FontAwesome5
						name="user-alt"
						size={sizeNormalizer * 30}
						color={APP_VALUES.colors.text}
					/>
				</View>
			)}

			<View style={{ marginLeft: sizeNormalizer * 10 }}>
				<ThemedText type="default">{name}</ThemedText>
				<ThemedText type="defaultSemiBold">({email})</ThemedText>
			</View>

			<View
				style={{
					position: "absolute",
					right: sizeNormalizer * 20,
					top: "50%",
					flexDirection: "row",
					alignItems: "center",
					display: "flex",
				}}
			>
				<TouchableOpacity
					onPress={() => {
						router.push(
							`/jobs/cliente/applications/status/${keyValue}` as any
						);
					}}
					style={{
						height: sizeNormalizer * 36,
						width: sizeNormalizer * 36,
						borderRadius: sizeNormalizer * 16,
						borderColor: statusColors[status],
						borderWidth: sizeNormalizer * 2,
						marginHorizontal: sizeNormalizer * 10,
					}}
				>
					<Icon
						source="alert-rhombus-outline"
						color={statusColors[status]}
						size={sizeNormalizer * 32}
					/>
				</TouchableOpacity>
				<TouchableOpacity
					onPress={() => {
						router.push(
							`/jobs/cliente/applications/users/${keyValue}` as any
						);
					}}
					style={{
						height: sizeNormalizer * 36,
						width: sizeNormalizer * 36,
						borderRadius: sizeNormalizer * 16,
						borderColor: APP_VALUES.colors.text,
						borderWidth: sizeNormalizer * 2,
					}}
				>
					<Icon
						source="arrow-right"
						color={APP_VALUES.colors.text}
						size={sizeNormalizer * 32}
					/>
				</TouchableOpacity>
			</View>
		</View>
	);
};

export default UserItem;
