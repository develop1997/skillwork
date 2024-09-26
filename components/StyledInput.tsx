import { APP_VALUES } from "@/assets/styles/GeneralStyles";
import { sizeNormalizer } from "@/assets/styles/normalizator";
import { FunctionComponent } from "react";
import { View } from "react-native";
import { TextInput } from "react-native-paper";

interface AuthInputProps {
	icon?: any;
	placeholder: string;
	secureTextEntry?: boolean;
	onChangeText?: (value: string) => void;
	value?: string;
	numberOfLines?: number;
}

const AuthInput: FunctionComponent<AuthInputProps> = ({
	icon,
	placeholder,
	secureTextEntry,
	value,
	onChangeText,
	numberOfLines = 1,
}) => {
	return (
		<TextInput
			numberOfLines={numberOfLines}
			multiline={numberOfLines > 1}
			label={placeholder}
			style={{
				marginVertical: sizeNormalizer * 15,
				borderRadius: sizeNormalizer * 25,
				backgroundColor: APP_VALUES.colors.tertiary,
				fontSize: sizeNormalizer * 22,
				lineHeight: sizeNormalizer * 26,
				minHeight: sizeNormalizer * 70,
			}}
			theme={{
				roundness: sizeNormalizer * 25,
				colors: {
					onSurfaceVariant: APP_VALUES.colors.disabledTextDark,
					primary: APP_VALUES.colors.text,
					secondary: APP_VALUES.colors.text,
					onSurface: APP_VALUES.colors.text,
				},
			}}
			onChangeText={onChangeText ?? undefined}
			secureTextEntry={secureTextEntry}
			underlineStyle={{
				display: "none",
			}}
			value={value}
			left={
				icon && (
					<TextInput.Icon
					icon={icon}
					color={APP_VALUES.colors.text}
					size={sizeNormalizer * 32}
				/>
				)
			}
		/>
	);
};

export default AuthInput;
