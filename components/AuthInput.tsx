import { FunctionComponent } from "react";
import { TextInput } from "react-native-paper";

interface AuthInputProps {
	icon: string;
	placeholder: string;
	secureTextEntry?: boolean;
	onChangeText?: (value: string) => void;
	value?: string;
}

const AuthInput: FunctionComponent<AuthInputProps> = ({
	icon,
	placeholder,
	secureTextEntry,
	value,
	onChangeText,
}) => {
	return (
		<TextInput
			label={placeholder}
			style={{
				marginVertical: 15,
				borderRadius: 25,
				backgroundColor: "#40346b",
				fontSize: 26,
				lineHeight: 26,
				height: 80,
			}}
			theme={{
				roundness: 25,
				colors: {
					onSurfaceVariant: "#fff",
					primary: "#fff",
					secondary: "#fff",
					outline: "#fff",
					onSurface: "#fff",
				},
			}}
			onChangeText={onChangeText ?? undefined}
			secureTextEntry={secureTextEntry}
			underlineStyle={{
				display: "none",
			}}
			value={value}
			left={
				<TextInput.Icon
					icon={icon}
					color="white"
					size={36}
				/>
			}
		/>
	);
};

export default AuthInput;
