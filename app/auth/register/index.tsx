import { GeneralStyles } from "@/assets/styles/GeneralStyles";
import { LoginStyles } from "@/assets/styles/auth/login/LoginStyles";
import { StatusBar, View } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import AuthInput from "@/components/StyledInput";
import { useState } from "react";
import AuthButton from "@/components/StyledButton";
import { InternalLink } from "@/components/InternalLink";
import Dropdown from "@/components/Dropdown";
import { RolesConstants } from "@/constants/Roles";
import RegisterUser from "@/api/Auth/Register";
import { Button, Dialog, Portal } from "react-native-paper";
import { useNavigation } from "expo-router";
import BackHeaderButton from "@/components/BackAction";
import { isEmailValid, isPasswordValid } from "@/utils/forms/validate";
import { sizeNormalizer } from "@/assets/styles/normalizator";

type FormDataType = {
	email?: string;
	password?: string;
	confirmPassword?: string;
	role?: string;
};

export default function Register() {
	const [data, setData] = useState<FormDataType>();
	const [error, setError] = useState<string>();
	const [visible, setVisible] = useState(false);
	const [loading, setLoading] = useState(false);
	const router = useNavigation();

	const hideModal = () => setVisible(false);

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
			RegisterUser(data.email, data.password, data.role)
				.then((res) => {
					router.navigate("login" as never);
					setLoading(false);
				})
				.catch((err) => {
					error = "Something went wrong: " + err;
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

	return (
		<>
			<StatusBar barStyle="dark-content" />
			<Portal>
				<BackHeaderButton />
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
								Por favor ingresa los datos requeridos
							</ThemedText>
						</View>
						<View>
							<Dropdown
								fontSize={sizeNormalizer * 26}
								height={sizeNormalizer * 70}
								data={[
									{
										title: "Cliente",
										icon: RolesConstants.CLIENTE_ICON,
										value: RolesConstants.CLIENTE,
									},
									{
										title: "Usuario",
										icon: RolesConstants.USUARIO_ICON,
										value: RolesConstants.USUARIO,
									},
								]}
								textDefault="Seleccione un rol"
								onSelect={(item) =>
									setData({ ...data, role: item.value })
								}
							/>
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
			</View>
		</>
	);
}
