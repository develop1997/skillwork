import { useRootStore } from "@/store/RootStore";
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import { FunctionComponent, useEffect, useState } from "react";
import { Image, TouchableOpacity, View } from "react-native";
import { ProfileStyles } from "@/assets/styles/profile/ProfileStyles";
import AuthInput from "@/components/StyledInput";
import AuthButton from "@/components/StyledButton";
import { sizeNormalizer } from "@/assets/styles/normalizator";
import { APP_VALUES } from "@/assets/styles/GeneralStyles";
import { useAuth } from "@/components/hooks/useAuth";
import { UpdateUserData } from "@/api/Profile/userData";
import {
	MediaTypeOptions,
	launchImageLibraryAsync,
	requestMediaLibraryPermissionsAsync,
} from "expo-image-picker";
import { uriToBuffer } from "@/utils/files/Image";
import Layout from "@/components/Layout";
import { IconText } from "@/components/IconText";
import Dropdown from "@/components/Dropdown";
import { DocumentTypes } from "@/constants/Profile";

interface ProfileProps {}

const Profile: FunctionComponent<ProfileProps> = () => {
	const { logOut } = useAuth();
	const {
		setMessage,
		setMessageVisible,
		userData,
		setUserData,
	} = useRootStore();

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
			setMessage({ title: "Error", message: "Email Cannot be empty" });
			setMessageVisible(true);
		}

		data["name"] = formData.name;
		data["description"] = formData.description;
		data["email"] = formData.email;
		data["phone"] = formData.phone;
		data["document"] = formData.document;
		data["document_type"] = formData.document_type;

		// if there is an image, convert it into a File
		if (formData.image && !formData.image.startsWith("http")) {
			const imageFile = await uriToBuffer(formData.image);

			if (imageFile) {
				data["image"] = imageFile;
			}
		}

		UpdateUserData(data)
			.then((res) => {
				setMessage({
					title: "Success",
					message: "Profile updated successfully",
				});
				setMessageVisible(true);
				setLoading(false);

				setUserData({ ...userData, ...data });
			})
			.catch((err) => {
				setMessage({
					title: "Error",
					message: "Something went wrong, please try again later",
				});
				setMessageVisible(true);
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
		<Layout haveTabs={true} haveTitle={true}>
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
						<IconText
							icon="id-card"
							text="Tipo de identificación"
						/>
						<Dropdown
							height={sizeNormalizer * 70}
							fontSize={sizeNormalizer * 22}
							textDefault="Selecciona un tipo de identificación"
							data={DocumentTypes.map((c) => ({
								title: c,
								value: c,
								icon: "id-card",
							}))}
							selectedItem={{
								title: formData.document_type,
								value: formData.document_type,
								icon: "id-card",
							}}
							onSelect={(item) => {
								setFormData({
									...formData,
									document_type: item.value,
								});
							}}
							resetAfterSelect={true}
							showIcon={true}
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
									size={sizeNormalizer * 32}
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
							marginVertical: sizeNormalizer * 20,
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
						primaryColor={APP_VALUES.colors.error}
					/>
				</View>
			</>
		</Layout>
	);
};

export default Profile;
