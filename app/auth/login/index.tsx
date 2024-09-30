import { GeneralStyles } from "@/assets/styles/GeneralStyles";
import { LoginStyles } from "@/assets/styles/auth/LoginStyles";
import { Image, StatusBar, View } from "react-native";
import AdaptativeLogo from "@/assets/images/adaptive-icon.png";
import { ThemedText } from "@/components/ThemedText";
import AuthInput from "@/components/StyledInput";
import { useEffect, useState } from "react";
import AuthButton from "@/components/StyledButton";
import { InternalLink } from "@/components/InternalLink";
import LoginUser from "@/api/Auth/Login";
import { useNavigation } from "expo-router";
import { Button, Dialog, Portal } from "react-native-paper";
import { isEmailValid, isPasswordValid } from "@/utils/forms/validate";
import {
	RootatoreKeys,
	deleteFromSecureStore,
	readFromSecureStore,
	saveToSecureStore,
	useRootStore,
} from "@/store/RootStore";
import type { RootStoreType } from "@/store/RootStore";
import { AxiosError } from "axios";
import { useAuth } from "@/components/hooks/useAuth";
import { ScrollView } from "react-native-gesture-handler";
import { HomeGenerals } from "@/assets/styles/home/HomeGenerals";

type FormDataType = {
	email?: string;
	password?: string;
};

export default function Login() {
	const [data, setData] = useState<FormDataType>();
	const router = useNavigation();
	const [error, setError] = useState<string>();
	const [visible, setVisible] = useState(false);
	const [verifying, setVerifying] = useState(true);
	const [loading, setLoading] = useState(false);
	const hideModal = () => setVisible(false);

	const setUser_role = useRootStore(
		(state: RootStoreType) => state.setUser_role
	);

	// const [sesion_token, setSesion_token] = useState<string | undefined>();
	const { token, setToken } = useAuth();

	const user_role = useRootStore((state: RootStoreType) => state.user_role);

	// verify if user is already logged in
	useEffect(() => {
		readFromSecureStore(RootatoreKeys.SESION_TOKEN).then((token) => {
			if (token) {
				readFromSecureStore(RootatoreKeys.USER_ROLE).then((role) => {
					if (role) {
						setUser_role(parseInt(role));
						setToken(token);
					} else {
						deleteFromSecureStore(RootatoreKeys.SESION_TOKEN).then(
							() => {
								setVerifying(false);
							}
						);
					}
				});
			} else {
				setVerifying(false);
			}
		});
	}, []);

	// redirect to home if user is already logged in
	useEffect(() => {
		if (token && user_role) {
			router.getParent()?.navigate("home" as never);
		}
	}, [token, user_role]);

	const handleLogin = () => {
		if (loading) return;

		setLoading(true);
		let error = undefined;

		if (!data?.email) {
			error = "Email is required";
		} else if (!data?.password) {
			error = "Password is required";
		} else if (!isEmailValid(data?.email)) {
			error = "Invalid email";
		} else if (!isPasswordValid(data?.password)) {
			error =
				"Invalid password, minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character (@$!%*?&)";
		} else {
			LoginUser(data.email, data.password)
				.then((res) => {
					saveToSecureStore(RootatoreKeys.SESION_TOKEN, res["token"])
						.then(() => {
							setToken(res["token"]);
							saveToSecureStore(
								RootatoreKeys.USER_ROLE,
								res["role"].toString()
							)
								.then(() => {
									setData({});
									setUser_role(res["role"]);
									setLoading(false);
								})
								.catch((err) => {
									console.log(err);
								});
						})
						.catch((err) => {
							console.log(err);
						});
				})
				.catch((err: AxiosError) => {
					error = "Something went wrong: " + err.response?.data;
					setError(error);
					setVisible(true);
					setLoading(false);
				});
		}

		if (error) {
			setError(error);
			setVisible(true);
			setLoading(false);
		}
	};

	if (verifying) {
		return null;
	}

	return (
		<>
			<StatusBar barStyle="dark-content" />
			<Portal>
				<Dialog visible={visible} onDismiss={hideModal}>
					<Dialog.Title>Error</Dialog.Title>
					<Dialog.Content>
						<ThemedText>{error}</ThemedText>
					</Dialog.Content>
					<Dialog.Actions>
						<Button onPress={hideModal}>OK</Button>
					</Dialog.Actions>
				</Dialog>
			</Portal>
			<ScrollView
				style={HomeGenerals.background}
				centerContent
				contentContainerStyle={HomeGenerals.contentScroll}
			>
				<View style={LoginStyles.loginContent}>
					<Image
						source={AdaptativeLogo as any}
						style={LoginStyles.logo}
					/>
					<View style={LoginStyles.formCard}>
						<View>
							<ThemedText
								type="title"
								style={LoginStyles.loginTittle}
							>
								Login
							</ThemedText>
							<ThemedText
								type="default"
								style={LoginStyles.loginText}
							>
								Ingresa los datos requeridos
							</ThemedText>
						</View>
						<View>
							<AuthInput
								icon="email"
								placeholder="Email"
								value={data?.email ? data?.email : ""}
								onChangeText={(value) =>
									setData({ ...data, email: value.trim() })
								}
							/>
							<AuthInput
								icon="lock"
								placeholder="Contraseña"
								secureTextEntry
								value={data?.password ? data?.password : ""}
								onChangeText={(value) =>
									setData({ ...data, password: value.trim() })
								}
							/>
						</View>

						<View style={GeneralStyles.centeredView}>
							<AuthButton
								text="LOGIN"
								loading={loading}
								onPress={handleLogin}
							/>
							<InternalLink
								href="/auth/forgotPassword"
								style={LoginStyles.loginLink}
							>
								Forgot your password?
							</InternalLink>
							<ThemedText
								style={LoginStyles.loginText}
								type="default"
							>
								Don't have an account?{" "}
								<InternalLink
									style={LoginStyles.loginLink}
									href="/auth/register"
								>
									Sign Up
								</InternalLink>
							</ThemedText>
						</View>
					</View>
				</View>
			</ScrollView>
		</>
	);
}
