import { HomeGenerals } from "@/assets/styles/home/HomeGenerals";
import {
	RootStoreType,
	RootatoreKeys,
	deleteFromSecureStore,
	useRootStore,
} from "@/store/RootStore";
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import { FunctionComponent, useEffect, useState } from "react";
import { Image, StatusBar, View } from "react-native";
import {
	GestureHandlerRootView,
	ScrollView,
} from "react-native-gesture-handler";
import { ProfileStyles } from "@/assets/styles/profile/ProfileStyles";
import AuthInput from "@/components/StyledInput";
import AuthButton from "@/components/StyledButton";
import { sizeNormalizer } from "@/assets/styles/normalizator";
import { APP_VALUES } from "@/assets/styles/GeneralStyles";
import Dropdown from "@/components/Dropdown";
import { getCategories } from "@/api/Profile/CategoriesAndServices";
import { useRouter } from "expo-router";

interface ProfileProps {}

const Profile: FunctionComponent<ProfileProps> = () => {
	const router = useRouter();

	const setUser_role = useRootStore(
		(state: RootStoreType) => state.setUser_role
	);

	const handleLogout = async () => {
		deleteFromSecureStore(RootatoreKeys.SESION_TOKEN).then(() => {
			deleteFromSecureStore(RootatoreKeys.USER_ROLE).then(() => {
				setUser_role(undefined);
				router.replace("/auth/login");
			});
		});
	};

	const [services, setServices] = useState<string[]>([]);
	const [servicesSelected, setServicesSelected] = useState<string[]>([]);

	const [categories, setCategories] = useState<string[]>([]);
	const [categoriesSelected, setCategoriesSelected] = useState<string[]>([]);

	useEffect(() => {
		getCategories()
			.then((res) => {
				setCategories(res);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	console.log(categoriesSelected);

	return (
		<>
			<StatusBar barStyle="dark-content" />
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
						<View style={ProfileStyles.profileItem}>
							{false ? (
								<Image
									style={ProfileStyles.profileImage}
									source={{
										uri:
											"https://cdn.shopify.com/s/files/1/0273/8080/9781/products/shocked_face_meme_green_screen_creatorset.mp4_2023-01-27_03-57-29.901.jpg?v=1674791979",
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
						</View>
						<View
							style={{
								flex: 1,
								marginLeft: sizeNormalizer * 15,
							}}
						>
							<AuthInput
								placeholder="Descripción"
								numberOfLines={2}
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
							/>
						</View>
					</View>
					<View style={ProfileStyles.Horizontal}>
						<View
							style={{
								flex: 1,
							}}
						>
							<AuthInput placeholder="Telefono" icon="phone" />
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
								placeholder="Categorias"
								numberOfLines={3}
								icon="tag"
							/>
							<Dropdown
								height={sizeNormalizer * 70}
								fontSize={sizeNormalizer * 26}
								textDefault="Agrega una Categoria"
								data={categories.map((c) => ({
									title: c,
									value: c,
									icon: "tag",
								}))}
								onSelect={(item) => {
									setCategoriesSelected((prev) => [
										...prev,
										item.value,
									]);
								}}
								resetAfterSelect={true}
								showIcon={false}
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
								placeholder="Servicios"
								numberOfLines={3}
								icon="cog"
							/>
							<Dropdown
								height={sizeNormalizer * 70}
								fontSize={sizeNormalizer * 26}
								textDefault="Agrega un Servicio"
								data={services.map((c) => ({
									title: c,
									value: c,
									icon: "tag",
								}))}
								onSelect={(item) => {
									setServicesSelected((prev) => [
										...prev,
										item.value,
									]);
								}}
								resetAfterSelect={true}
								showIcon={false}
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
						<AuthButton text="Editar" onPress={() => {}} />
						<AuthButton
							text="Cerrar sesion"
							onPress={handleLogout}
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
