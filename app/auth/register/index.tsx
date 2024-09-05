import { GeneralStyles } from "@/assets/styles/GeneralStyles";
import { LoginStyles } from "@/assets/styles/auth/login/LoginStyles";
import { StatusBar, View } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import AuthInput from "@/components/AuthInput";
import { useState } from "react";
import AuthButton from "@/components/AuthButton";
import { InternalLink } from "@/components/InternalLink";
import Dropdown from "@/components/AuthDropdown";
import { RolesConstants } from "@/constants/Roles";

type FormDataType = {
	email?: string;
	password?: string;
	confirmPassword?: string;
	role?: string;
};

export default function Register() {
	const [data, setData] = useState<FormDataType>();
	return (
		<>
			<StatusBar barStyle="light-content" />
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
							<AuthButton text="Registrarse" onPress={() => {}} />
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
