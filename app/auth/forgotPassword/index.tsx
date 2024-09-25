import { GeneralStyles } from "@/assets/styles/GeneralStyles";
import { LoginStyles } from "@/assets/styles/auth/login/LoginStyles";
import { Image, StatusBar, View } from "react-native";
import AdaptativeLogo from "@/assets/images/adaptive-icon.png";
import { ThemedText } from "@/components/ThemedText";
import AuthInput from "@/components/StyledInput";
import { useState } from "react";
import AuthButton from "@/components/StyledButton";
import BackHeaderButton from "@/components/BackAction";
import { Button, Dialog, Portal } from "react-native-paper";
import { useNavigation } from "expo-router";
import { isEmailValid, isPasswordValid } from "@/utils/forms/validate";
import {
	ForgotPasswordCode,
	ForgotPasswordEmail,
	ForgotPasswordReset,
} from "@/api/Auth/ForgotPassword";

export default function ForgotPassword() {
	const [email, setEmail] = useState("");
	const [code, setCode] = useState("");
	const [newPassword, setNewPassword] = useState("");
	const [loading, setLoading] = useState(false);
	const router = useNavigation();
	const [stage, setStage] = useState(0); // 0 for email, 1 for code, 2 for password
	const [error, setError] = useState<string>();
	const [visible, setVisible] = useState(false);
	const hideModal = () => setVisible(false);

	const onSendcode = () => {
		let error = undefined;
		if (!isEmailValid(email)) {
			error = "Please enter a valid email";
		} else {
			ForgotPasswordEmail(email)
				.then(() => {
					setLoading(false);
					setStage(1);
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

	const onVerifyCode = () => {
		let error = undefined;
		if (code.length !== 6) {
			error = "Code length should be 6";
		} else {
			ForgotPasswordCode(code, email)
				.then(() => {
					setLoading(false);
					setStage(2);
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

	const onResetPassword = () => {
		let error = undefined;
		if (!isPasswordValid(newPassword)) {
			error =
				"Invalid password, minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character (@$!%*?&)";
		} else {
			ForgotPasswordReset(email, code, newPassword)
				.then(() => {
					setLoading(false);
					router.goBack();
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
								{stage === 0
									? "Ingresa tu correo electronico"
									: stage === 1
									? "Ingresa el codigo enviado a tu correo"
									: "Ingresa tu nueva contraseña"}
							</ThemedText>
						</View>
						<View>
							{stage === 0 ? (
								<AuthInput
									icon="email"
									placeholder="Email"
									value={email}
									onChangeText={(value) =>
										setEmail(value.trim())
									}
								/>
							) : stage === 1 ? (
								<AuthInput
									icon="lock"
									placeholder="Codigo"
									value={code}
									onChangeText={(value) =>
										setCode(value.trim())
									}
								/>
							) : (
								<AuthInput
									icon="lock"
									placeholder="Nueva Contraseña"
									value={newPassword}
									secureTextEntry
									onChangeText={(value) =>
										setNewPassword(value.trim())
									}
								/>
							)}
						</View>

						<View style={GeneralStyles.centeredView}>
							<AuthButton
								loading={loading}
								text="Enviar"
								onPress={() => {
									if (loading) return;
									setLoading(true);
									if (stage === 0) {
										onSendcode();
									} else if (stage === 1) {
										onVerifyCode();
									} else if (stage === 2) {
										onResetPassword();
									}
								}}
							/>
						</View>
					</View>
				</View>
			</View>
		</>
	);
}
