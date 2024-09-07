import { GeneralStyles } from "@/assets/styles/GeneralStyles";
import { LoginStyles } from "@/assets/styles/auth/login/LoginStyles";
import { Image, StatusBar, View } from "react-native";
import AdaptativeLogo from "@/assets/images/adaptive-icon.png";
import { ThemedText } from "@/components/ThemedText";
import AuthInput from "@/components/AuthInput";
import { useEffect, useState } from "react";
import AuthButton from "@/components/AuthButton";
import { InternalLink } from "@/components/InternalLink";
import LoginUser from "@/api/Auth/Login";
import { useNavigation } from "expo-router";
import { Button, Dialog, Portal } from "react-native-paper";
import { isEmailValid, isPasswordValid } from "@/utils/forms/validate";
import {
	RootatoreKeys,
	readFromSecureStore,
	saveToSecureStore,
	useRootStore,
} from "@/store/RootStore";
import type { RootStoreType } from "@/store/RootStore";
import { AxiosError } from "axios";

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
	const setSesion_token = useRootStore(
		(state: RootStoreType) => state.setSesion_token
	);

	const sesion_token = useRootStore(
		(state: RootStoreType) => state.sesion_token
	);

	// verify if user is already logged in
	useEffect(() => {
		readFromSecureStore(RootatoreKeys.SESION_TOKEN).then((token) => {
			if (token) {
				setSesion_token(token);
			} else {
				setVerifying(false);
			}
		});
	}, []);

	// redirect to home if user is already logged in
	useEffect(() => {
		if (sesion_token) {
			router.getParent()?.navigate("home" as never);
		}
	}, [sesion_token]);

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
				"Invalid password, minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character";
		} else {
			LoginUser(data.email, data.password)
				.then((res) => {
					saveToSecureStore(RootatoreKeys.SESION_TOKEN, res).then(
						() => {
							setLoading(false);
							setData({});
							setSesion_token(res);
						}
					);
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
			<StatusBar barStyle="light-content" />

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
			<View
				style={{
					...GeneralStyles.centeredView,
					...LoginStyles.background,
				}}
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
			</View>
		</>
	);
}
