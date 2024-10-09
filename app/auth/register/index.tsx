import { GeneralStyles } from "@/assets/styles/GeneralStyles";
import { LoginStyles } from "@/assets/styles/auth/LoginStyles";
import { View } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import AuthInput from "@/components/StyledInput";
import { useState } from "react";
import AuthButton from "@/components/StyledButton";
import { InternalLink } from "@/components/InternalLink";
import Dropdown from "@/components/Dropdown";
import { RolesConstants } from "@/constants/Roles";
import RegisterUser, { sendVerificationCode, verifyCode } from "@/api/Auth/Register";
import { useNavigation } from "expo-router";
import { isEmailValid, isPasswordValid } from "@/utils/forms/validate";
import { sizeNormalizer } from "@/assets/styles/normalizator";
import Layout from "@/components/Layout";
import { useRootStore } from "@/store/RootStore";

type FormDataType = {
	email?: string;
	password?: string;
	confirmPassword?: string;
	role?: string;
};

export default function Register() {
	const [data, setData] = useState<FormDataType>();
	const { setMessage, setMessageVisible } = useRootStore();
	const [loading, setLoading] = useState(false);
	const router = useNavigation();
	const [stage, setStage] = useState(0);
	const [code, setCode] = useState("");

	const onSendcode = (email: string) => {
		let error = undefined;
		sendVerificationCode(email)
			.then(() => {
				setLoading(false);
				setStage(1);
			})
			.catch((err) => {
				error = "Something went wrong: " + err;
				setMessage({ title: "Error", message: error });
				setMessageVisible(true);
				setLoading(false);
			});

		if (error) {
			setMessage({ title: "Error", message: error });
			setMessageVisible(true);
			setLoading(false);
		}
	};

	const onVerifyCode = (email: string) => {
		let error = undefined;
		if (code.length !== 6) {
			error = "Code length should be 6";
		} else {
			verifyCode(code, email)
				.then(() => {
					if (!data || !data.email || !data.password || !data.role) {
						error = "Please try again later";
						setMessage({ title: "Error", message: error });
						setMessageVisible(true);
						return;
					}
					RegisterUser(data.email, data.password, data.role)
						.then((res) => {
							router.navigate("login" as never);
							setLoading(false);
						})
						.catch((err) => {
							if (err.status == 400) {
								//email already exist in db
								error = err.response.data;
							} else {
								error = err;
							}
							error = "Something went wrong: " + error;
							setMessage({ title: "Error", message: error });
							setMessageVisible(true);
							setLoading(false);
						});
				})
				.catch((err) => {
					error = "Something went wrong: " + err;
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

	const onSubmit = () => {
		if (loading) return;

		setLoading(true);
		let error = undefined;

		if (!data?.email) {
			error = "Email is required";
		} else if (!data?.password) {
			error = "Password is required";
		} else if (!data?.role) {
			error = "Role is required";
		} else if (!data?.confirmPassword) {
			error = "Confirm Password is required";
		} else if (data?.password !== data?.confirmPassword) {
			error = "Passwords do not match";
		} else if (!isEmailValid(data?.email)) {
			error = "Invalid email";
		} else if (!isPasswordValid(data?.password)) {
			error =
				"Invalid password, minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character (@$!%*?&)";
		} else {
			if (stage === 0) {
				onSendcode(data.email);
			} else if (stage === 1) {
				onVerifyCode(data.email);
			}
		}
		if (error) {
			setMessage({ title: "Error", message: error });
			setMessageVisible(true);
			setLoading(false);
		}
	};

	return (
		<>
			<Layout back>
				<View style={LoginStyles.loginContent}>
					<View style={LoginStyles.formCardNoImage}>
						<View>
							<ThemedText
								type="title"
								style={LoginStyles.loginTittle}
							>
								Crear Cuenta
							</ThemedText>
							<ThemedText
								type="default"
								style={LoginStyles.loginText}
							>
								{stage === 0
									? "Por favor ingresa los datos requeridos"
									: stage === 1 &&
									  "Ingresa el codigo enviado a tu correo"}
							</ThemedText>
						</View>
						<View>
							{stage == 0 ? (
								<>
									<Dropdown
										fontSize={sizeNormalizer * 26}
										height={sizeNormalizer * 70}
										data={[
											{
												title: "Cliente",
												icon:
													RolesConstants.CLIENTE_ICON,
												value: RolesConstants.CLIENTE,
											},
											{
												title: "Usuario",
												icon:
													RolesConstants.USUARIO_ICON,
												value: RolesConstants.USUARIO,
											},
										]}
										textDefault="Seleccione un rol"
										onSelect={(item) =>
											setData({
												...data,
												role: item.value,
											})
										}
									/>
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
										value={
											data?.password ? data?.password : ""
										}
										onChangeText={(value) =>
											setData({
												...data,
												password: value.trim(),
											})
										}
									/>
									<AuthInput
										icon="lock"
										placeholder="Confirmar Contraseña"
										secureTextEntry
										value={
											data?.confirmPassword
												? data?.confirmPassword
												: ""
										}
										onChangeText={(value) =>
											setData({
												...data,
												confirmPassword: value.trim(),
											})
										}
									/>
								</>
							) : (
								<>
									<AuthInput
										icon="lock"
										placeholder="Codigo"
										value={code}
										onChangeText={(value) =>
											setCode(value.trim())
										}
									/>
								</>
							)}
						</View>

						<View style={GeneralStyles.centeredView}>
							<AuthButton
								loading={loading}
								text="Registrarse"
								onPress={onSubmit}
							/>
							<ThemedText
								style={LoginStyles.loginText}
								type="default"
							>
								Already have an account?{" "}
								<InternalLink
									style={LoginStyles.loginLink}
									href="/auth/login"
								>
									Sign In
								</InternalLink>
							</ThemedText>
						</View>
					</View>
				</View>
			</Layout>
		</>
	);
}
