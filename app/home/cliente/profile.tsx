import { HomeGenerals } from "@/assets/styles/home/HomeGenerals";
import { useRootStore } from "@/store/RootStore";
import { Entypo, FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import { FunctionComponent, useEffect, useState } from "react";
import { Image, StatusBar, TouchableOpacity, View } from "react-native";
import {
	GestureHandlerRootView,
	ScrollView,
} from "react-native-gesture-handler";
import { ProfileStyles } from "@/assets/styles/profile/ProfileStyles";
import AuthInput from "@/components/StyledInput";
import AuthButton from "@/components/StyledButton";
import { sizeNormalizer } from "@/assets/styles/normalizator";
import { APP_VALUES, GeneralStyles } from "@/assets/styles/GeneralStyles";
import Dropdown from "@/components/Dropdown";
import {
	getCategories,
	getServices,
} from "@/api/Profile/CategoriesAndServices";
import { Button, Chip, Dialog, Portal } from "react-native-paper";
import { IconText } from "@/components/IconText";
import { useAuth } from "@/components/hooks/useAuth";
import { UpdateUserData } from "@/api/Profile/userData";
import {
	MediaTypeOptions,
	launchImageLibraryAsync,
	requestMediaLibraryPermissionsAsync,
} from "expo-image-picker";
import { uriToBuffer } from "@/utils/files/Image";
import { ThemedText } from "@/components/ThemedText";

interface ProfileProps {}

const Profile: FunctionComponent<ProfileProps> = () => {
	const { logOut } = useAuth();
	const [message, setMessage] = useState<{ title: string; message: string }>({
		title: "",
		message: "",
	});

	const [messageVisible, setMessageVisible] = useState(false);
	const hideModalMessage = () => {
		setMessageVisible(false);
	};

	const [services, setServices] = useState<string[]>([]);
	const [servicesSelected, setServicesSelected] = useState<string[]>([]);

	const [categories, setCategories] = useState<string[]>([]);
	const [categoriesSelected, setCategoriesSelected] = useState<string[]>([]);

	const { userData } = useRootStore();

	const [formData, setFormData] = useState<any>({
		name: "",
		description: "",
		email: "",
		phone: "",
		image: null,
	});

	useEffect(() => {
		getCategories()
			.then((res) => {
				setCategories(res);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	useEffect(() => {
		if (userData) {
			if (userData.categories) setCategoriesSelected(userData.categories);
			if (userData.services) setServicesSelected(userData.services);

			setFormData({
				name: userData.name || "",
				description: userData.description || "",
				email: userData.email || "",
				phone: userData.phone || "",
				image: userData.image || null,
			});
		}
	}, [userData]);

	useEffect(() => {
		if (categoriesSelected.length == 0) {
			setServices([]);
		} else {
			getServices(categoriesSelected)
				.then((res) => {
					setServices(res);
				})
				.catch((err) => {
					setServices([]);
				});
		}
	}, [categoriesSelected]);

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

		// if there is an image, convert it into a File
		if (!formData.image.startsWith("http")) {
			const imageFile = await uriToBuffer(formData.image);

			if (imageFile) {
				data["image"] = imageFile;
			}
		}

		data["categories"] = categoriesSelected;
		data["services"] = servicesSelected;

		UpdateUserData(data)
			.then((res) => {
				setMessage({ title: "Success", message: "Profile updated successfully" });
				setMessageVisible(true);
				setLoading(false);
			})
			.catch((err) => {
				setMessage({ title: "Error", message: "Something went wrong, please try again later" });
				setMessageVisible(true);
				console.log(err);
				setFormData({
					name: userData.name || "",
					description: userData.description || "",
					email: userData.email || "",
					phone: userData.phone || "",
					image: userData.image || null,
				});
				if (userData.categories)
					setCategoriesSelected(userData.categories);
				if (userData.services) setServicesSelected(userData.services);
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
		<>
			<StatusBar barStyle="dark-content" />
			
			<Portal>
				<Dialog visible={messageVisible} onDismiss={hideModalMessage}>
					<Dialog.Title>{message.title}</Dialog.Title>
					<Dialog.Content>
						<ThemedText>{message.message}</ThemedText>
					</Dialog.Content>
					<Dialog.Actions>
						<Button onPress={hideModalMessage}>OK</Button>
					</Dialog.Actions>
				</Dialog>
			</Portal>
			<GestureHandlerRootView style={{ flex: 1 }}>
				<ScrollView
					style={HomeGenerals.background}
					centerContent
					contentContainerStyle={HomeGenerals.contentScroll}
				>
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
					<View style={ProfileStyles.Horizontal}>
						<View
							style={{
								flex: 1,
							}}
						>
							<IconText icon="tag" text="Categorias" />
							{categories && (
								<Dropdown
									height={sizeNormalizer * 70}
									fontSize={sizeNormalizer * 22}
									textDefault="Agrega una Categoria"
									data={categories.map((c) => ({
										title: c,
										value: c,
										icon: "tag",
									}))}
									onSelect={(item) => {
										if (
											!categoriesSelected.includes(
												item.value
											)
										) {
											setCategoriesSelected((prev) => [
												...prev,
												item.value,
											]);
										}
									}}
									resetAfterSelect={true}
									showIcon={false}
								/>
							)}

							<View
								style={[
									GeneralStyles.horizontalWrap,
									{
										marginBottom: sizeNormalizer * 20,
									},
								]}
							>
								{categoriesSelected &&
									categoriesSelected.map((c) => (
										<Chip
											key={c}
											mode="outlined"
											textStyle={{
												fontSize: sizeNormalizer * 20,
											}}
											onClose={() => {
												setCategoriesSelected(
													categoriesSelected.filter(
														(cc) => cc !== c
													)
												);
											}}
											closeIcon={() => (
												<Entypo
													name="cross"
													size={sizeNormalizer * 20}
													color={
														APP_VALUES.colors.text
													}
												/>
											)}
										>
											{c}
										</Chip>
									))}
							</View>
						</View>
					</View>
					<View style={ProfileStyles.Horizontal}>
						<View
							style={{
								flex: 1,
							}}
						>
							<IconText icon="cog" text="Servicios" />
							{services && (
								<Dropdown
									height={sizeNormalizer * 70}
									fontSize={sizeNormalizer * 22}
									textDefault="Agrega un Servicio"
									data={services.map((c) => ({
										title: c,
										value: c,
										icon: "tag",
									}))}
									onSelect={(item) => {
										if (
											!servicesSelected.includes(
												item.value
											)
										) {
											setServicesSelected((prev) => [
												...prev,
												item.value,
											]);
										}
									}}
									resetAfterSelect={true}
									showIcon={false}
								/>
							)}

							<View
								style={[
									GeneralStyles.horizontalWrap,
									{
										marginBottom: sizeNormalizer * 20,
									},
								]}
							>
								{servicesSelected &&
									servicesSelected.map((c) => (
										<Chip
											key={c}
											mode="outlined"
											textStyle={{
												fontSize: sizeNormalizer * 20,
											}}
											onClose={() => {
												setServicesSelected(
													categoriesSelected.filter(
														(cc) => cc !== c
													)
												);
											}}
											closeIcon={() => (
												<Entypo
													name="cross"
													size={sizeNormalizer * 20}
													color={
														APP_VALUES.colors.text
													}
												/>
											)}
										>
											{c}
										</Chip>
									))}
							</View>
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
				</ScrollView>
			</GestureHandlerRootView>
		</>
	);
};

export default Profile;
