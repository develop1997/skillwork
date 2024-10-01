import { HomeGenerals } from "@/assets/styles/home/HomeGenerals";
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import { FunctionComponent, useEffect, useState } from "react";
import { Alert, Image, StatusBar, TouchableOpacity, View } from "react-native";
import {
	GestureHandlerRootView,
	ScrollView,
} from "react-native-gesture-handler";
import { ProfileStyles } from "@/assets/styles/profile/ProfileStyles";
import AuthInput from "@/components/StyledInput";
import AuthButton from "@/components/StyledButton";
import { sizeNormalizer } from "@/assets/styles/normalizator";
import { APP_VALUES } from "@/assets/styles/GeneralStyles";
import { useAuth } from "@/components/hooks/useAuth";
import { GetUserData, UpdateUserData } from "@/api/Profile/userData";
import { useRootStore } from "@/store/RootStore";
import { uriToBuffer } from "@/utils/files/Image";
import {
	MediaTypeOptions,
	launchImageLibraryAsync,
	requestMediaLibraryPermissionsAsync,
} from "expo-image-picker";
import Layout from "@/components/Layout";

interface ProfileProps {}

const Profile: FunctionComponent<ProfileProps> = () => {
	const { logOut } = useAuth();

	const { userData } = useRootStore();

	const [formData, setFormData] = useState<any>({
		name: "",
		description: "",
		email: "",
		phone: "",
		image: null,
		document: "",
		document_type: "",
	});

	useEffect(() => {
		if (userData) {
			setFormData({
				name: userData.name || "",
				description: userData.description || "",
				email: userData.email || "",
				phone: userData.phone || "",
				image: userData.image || null,
				document: userData.document || "",
				document_type: userData.document_type || "",
			});
		}
	}, [userData]);

	const [loading, setLoading] = useState(false);
	const onEditProfile = async () => {
		const data: any = {};
		setLoading(true);
		// only email is required (login)
		if (!formData.email) {
			Alert.alert("Error", "Email Cannot be empty");
		}

		data["name"] = formData.name;
		data["description"] = formData.description;
		data["email"] = formData.email;
		data["phone"] = formData.phone;
		data["document"] = formData.document;
		data["document_type"] = formData.document_type;

		// if there is an image, convert it into a File
		if (!formData.image.startsWith("http")) {
			const imageFile = await uriToBuffer(formData.image);

			if (imageFile) {
				data["image"] = imageFile;
			}
		}

		UpdateUserData(data)
			.then((res) => {
				Alert.alert("Success", "Profile updated successfully");
				setLoading(false);
			})
			.catch((err) => {
				Alert.alert("Error", err.message);
				setFormData({
					name: userData.name || "",
					description: userData.description || "",
					email: userData.email || "",
					phone: userData.phone || "",
					image: userData.image || null,
					document: userData.document || "",
					document_type: userData.document_type || "",
				});
				setLoading(false);
			});
	};

	const onSelectImage = async () => {
		const { status } = await requestMediaLibraryPermissionsAsync();
		if (status == "granted") {
			let result = await launchImageLibraryAsync({
				mediaTypes: MediaTypeOptions.Images,
				allowsEditing: true,
				aspect: [4, 3],
				quality: 1,
			});

			if (!result.canceled) {
				setFormData({ ...formData, image: result.assets[0].uri });
			}
		}
	};

	return (
		<Layout
			haveTabs={true}
			haveTitle={true}
			TabsHeight={sizeNormalizer * 70}
			TitleHeight={sizeNormalizer * 80}
		>
			<>
				<View
					style={[
						ProfileStyles.Horizontal,
						{
							marginTop: sizeNormalizer * 30,
						},
					]}
				>
					<TouchableOpacity
						style={ProfileStyles.profileItem}
						onPress={onSelectImage}
					>
						{formData.image && formData.image != "" ? (
							<Image
								style={ProfileStyles.profileImage}
								source={{
									uri: formData.image,
								}}
							/>
						) : (
							<View
								style={{
									padding: sizeNormalizer * 20,
									width: sizeNormalizer * 100,
									height: sizeNormalizer * 100,
									display: "flex",
									justifyContent: "center",
									alignItems: "center",
								}}
							>
								<FontAwesome5
									name="user-alt"
									size={sizeNormalizer * 48}
									color={APP_VALUES.colors.text}
								/>
							</View>
						)}
					</TouchableOpacity>
					<View
						style={{
							flex: 1,
							marginLeft: sizeNormalizer * 15,
						}}
					>
						<AuthInput
							placeholder="Descripción"
							numberOfLines={2}
							value={formData.description}
							onChangeText={(value: string) => {
								setFormData({
									...formData,
									description: value,
								});
							}}
						/>
					</View>
				</View>
				<View style={ProfileStyles.Horizontal}>
					<View
						style={{
							flex: 1,
						}}
					>
						<AuthInput
							placeholder="Tipo de identificación"
							icon="id-card"
							value={formData.document_type}
							onChangeText={(value: string) => {
								setFormData({
									...formData,
									document_type: value,
								});
							}}
						/>
					</View>
				</View>
				<View style={ProfileStyles.Horizontal}>
					<View
						style={{
							flex: 1,
						}}
					>
						<AuthInput
							placeholder="Numero de identificación"
							icon="id-card"
							value={formData.document}
							onChangeText={(value: string) => {
								setFormData({
									...formData,
									document: value,
								});
							}}
						/>
					</View>
				</View>
				<View style={ProfileStyles.Horizontal}>
					<View
						style={{
							flex: 1,
						}}
					>
						<AuthInput
							placeholder="Nombre o razón social"
							icon={(props: any) => (
								<FontAwesome
									name="user"
									size={sizeNormalizer * 34}
									color={APP_VALUES.colors.text}
								/>
							)}
							value={formData.name}
							onChangeText={(value: string) => {
								setFormData({ ...formData, name: value });
							}}
						/>
					</View>
				</View>
				<View style={ProfileStyles.Horizontal}>
					<View
						style={{
							flex: 1,
						}}
					>
						<AuthInput
							placeholder="Telefono"
							icon="phone"
							value={formData.phone}
							onChangeText={(value: string) => {
								setFormData({ ...formData, phone: value });
							}}
						/>
					</View>
				</View>
				<View style={ProfileStyles.Horizontal}>
					<View
						style={{
							flex: 1,
						}}
					>
						<AuthInput
							placeholder="Correo electronico"
							icon="email"
							value={formData.email}
							onChangeText={(value: string) => {
								setFormData({
									...formData,
									email: value.trim(),
								});
							}}
						/>
					</View>
				</View>
				<View
					style={[
						ProfileStyles.Horizontal,
						{
							marginVertical: sizeNormalizer * 30,
						},
					]}
				>
					<AuthButton
						text="Editar"
						loading={loading}
						onPress={onEditProfile}
					/>
					<AuthButton
						text="Cerrar sesion"
						onPress={logOut}
						primaryColor="#ff5252"
						secondaryColor="#fff"
					/>
				</View>
			</>
		</Layout>
	);
};

export default Profile;
