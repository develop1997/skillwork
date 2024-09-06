import { GeneralStyles } from "@/assets/styles/GeneralStyles";
import { LoginStyles } from "@/assets/styles/auth/login/LoginStyles";
import { Image, StatusBar, View } from "react-native";
import AdaptativeLogo from "@/assets/images/adaptive-icon.png";
import { ThemedText } from "@/components/ThemedText";
import AuthInput from "@/components/AuthInput";
import { useState } from "react";
import AuthButton from "@/components/AuthButton";
import { InternalLink } from "@/components/InternalLink";

type FormDataType = {
	email?: string;
	password?: string;
};

export default function Login() {
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
						</View>

						<View style={GeneralStyles.centeredView}>
							<AuthButton text="LOGIN" onPress={() => {}} />
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
