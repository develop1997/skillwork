import { GeneralStyles } from "@/assets/styles/GeneralStyles";
import { LoginStyles } from "@/assets/styles/auth/login/LoginStyles";
import { StatusBar, View } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import AuthInput from "@/components/AuthInput";
import { useState } from "react";
import AuthButton from "@/components/AuthButton";
import { InternalLink } from "@/components/InternalLink";
import Dropdown from "@/components/Dropdown";
import { RolesConstants } from "@/constants/Roles";
import RegisterUser from "@/api/Auth/Register";
import { Button, Dialog, Portal } from "react-native-paper";
import { useNavigation } from "expo-router";
import BackHeaderButton from "@/components/BackAction";

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
	const router = useNavigation();

	const hideModal = () => setVisible(false);

	const onSubmit = () => {
		if (
			data?.email &&
			data?.password &&
			data?.confirmPassword &&
			data?.role &&
			data?.password === data?.confirmPassword
		) {
			RegisterUser(data?.email, data?.password, data?.role)
				.then((res) => {
					router.navigate("login" as never);
				})
				.catch((err) => {
					setError("Something went wrong: " + err);
				});
		} else {
			if (!data?.email) {
				setError("Email is required");
			} else if (!data?.password) {
				setError("Password is required");
			} else if (!data?.role) {
				setError("Role is required");
			} else if (!data?.confirmPassword) {
				setError("Confirm Password is required");
			} else if (data?.password !== data?.confirmPassword) {
				setError("Passwords do not match");
			}
			setVisible(true);
		}
	};

	return (
		<>
			<StatusBar barStyle="light-content" />

			<Portal>
				<BackHeaderButton backgroundColor="#1f1a30" />
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
								backgroundColor="#40346b"
								fontSize={26}
								foregroundColor="#fff"
								height={80}
								roundness={25}
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
									setData({ ...data, role: item.title })
								}
							/>
							<AuthInput
								icon="email"
								placeholder="Email"
								value={data?.email ? data?.email : ""}
								onChangeText={(value) =>
									setData({ ...data, email: value })
								}
							/>
							<AuthInput
								icon="lock"
								placeholder="Contraseña"
								secureTextEntry
								value={data?.password ? data?.password : ""}
								onChangeText={(value) =>
									setData({ ...data, password: value })
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
									setData({ ...data, confirmPassword: value })
								}
							/>
						</View>

						<View style={GeneralStyles.centeredView}>
							<AuthButton text="Registrarse" onPress={onSubmit} />
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
