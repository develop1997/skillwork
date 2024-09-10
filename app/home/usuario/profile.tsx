import { HomeGenerals } from "@/assets/styles/home/HomeGenerals";
import {
	RootStoreType,
	RootatoreKeys,
	deleteFromSecureStore,
	useRootStore,
} from "@/store/RootStore";
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import { useNavigation } from "expo-router";
import { FunctionComponent } from "react";
import { Image, StatusBar, View } from "react-native";
import {
	GestureHandlerRootView,
	ScrollView,
} from "react-native-gesture-handler";
import { ProfileStyles } from "@/assets/styles/profile/ProfileStyles";
import AuthInput from "@/components/StyledInput";
import AuthButton from "@/components/StyledButton";

interface ProfileProps {}

const Profile: FunctionComponent<ProfileProps> = () => {
	const router = useNavigation().getParent();
	const setSesion_token = useRootStore(
		(state: RootStoreType) => state.setSesion_token
	);

	const setUser_role = useRootStore(
		(state: RootStoreType) => state.setUser_role
	);

	const handleLogout = async () => {
		deleteFromSecureStore(RootatoreKeys.SESION_TOKEN).then(() => {
			deleteFromSecureStore(RootatoreKeys.USER_ROLE).then(() => {
				setSesion_token(undefined);
				setUser_role(undefined);
				router?.navigate("auth");
			});
		});
	};

	return (
		<>
			<StatusBar barStyle="light-content" />
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
								marginTop: 30,
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
										padding: 20,
										width: 100,
										height: 100,
										display: "flex",
										justifyContent: "center",
										alignItems: "center",
									}}
								>
									<FontAwesome5
										name="user-alt"
										size={48}
										color="white"
									/>
								</View>
							)}
						</View>
						<View
							style={{
								flex: 1,
								marginLeft: 15,
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
										size={34}
										color="white"
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
						</View>
					</View>
					<View
						style={[
							ProfileStyles.Horizontal,
							{
								marginVertical: 30,
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
