import { GeneralStyles } from "@/assets/styles/GeneralStyles";
import { LoginStyles } from "@/assets/styles/auth/LoginStyles";
import { Image, View } from "react-native";
import AdaptativeLogo from "@/assets/images/adaptive-icon.png";
import { ThemedText } from "@/components/ThemedText";
import AuthInput from "@/components/StyledInput";
import { useEffect, useState } from "react";
import AuthButton from "@/components/StyledButton";
import { InternalLink } from "@/components/InternalLink";
import LoginUser from "@/api/Auth/Login";
import { useNavigation } from "expo-router";
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
import Layout from "@/components/Layout";
import { useAuth } from "@/components/hooks/useAuth";

type FormDataType = {
	email?: string;
	password?: string;
};

export default function Login() {
	const { setMessage, setMessageVisible, setUser_role } = useRootStore();
	const [data, setData] = useState<FormDataType>();
	const router = useNavigation();
	const [verifying, setVerifying] = useState(true);
	const [loading, setLoading] = useState(false);

	const { setToken, token } = useAuth();

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
					setMessage({ title: "Error", message: error });
					setMessageVisible(true);
					setLoading(false);
				});
		}

		if (error) {
			setMessage({ title: "Error", message: error });
			setMessageVisible(true);
			setLoading(false);
		}
	};

	if (verifying) {
		return null;
	}

	return (
		<Layout>
			<View style={GeneralStyles.centeredFullScreen}>
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
									setData({
										...data,
										email: value.trim(),
									})
								}
							/>
							<AuthInput
								icon="lock"
								placeholder="Contraseña"
								secureTextEntry
								value={data?.password ? data?.password : ""}
								onChangeText={(value) =>
									setData({
										...data,
										password: value.trim(),
									})
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
		</Layout>
	);
}
