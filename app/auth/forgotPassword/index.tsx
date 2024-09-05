import { GeneralStyles } from "@/assets/styles/GeneralStyles";
import { LoginStyles } from "@/assets/styles/auth/login/LoginStyles";
import { Image, StatusBar, View } from "react-native";
import AdaptativeLogo from "@/assets/images/adaptive-icon.png";
import { ThemedText } from "@/components/ThemedText";
import AuthInput from "@/components/AuthInput";
import { useState } from "react";
import AuthButton from "@/components/AuthButton";
import BackHeaderButton from "@/components/BackAction";

type FormDataType = {
	email?: string;
};

export default function ForgotPassword() {
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
				<BackHeaderButton backgroundColor="#1f1a30" />

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
								Recuperar Contraseña
							</ThemedText>
							<ThemedText
								type="default"
								style={LoginStyles.loginText}
							>
								Ingresa el correo registrado con la cuenta
							</ThemedText>
						</View>
						<View>
							<AuthInput
								icon="email"
								placeholder="Email"
								value={data?.email ? data?.email : ""}
								onChangeText={(value) =>
									setData({ ...data, email: value })
								}
							/>
						</View>

						<View style={GeneralStyles.centeredView}>
							<AuthButton text="ENVIAR" onPress={() => {}} />
						</View>
					</View>
				</View>
			</View>
		</>
	);
}
