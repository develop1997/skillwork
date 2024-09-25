import { APP_VALUES } from "@/assets/styles/GeneralStyles";
import { sizeNormalizer } from "@/assets/styles/normalizator";
import { FontAwesome5, FontAwesome6 } from "@expo/vector-icons";

interface Icons {
	[key: string]: () => JSX.Element;
}

export const IconsObject: Icons = {
	"building-user": () => (
		<FontAwesome6
			name="building-user"
			size={sizeNormalizer * 24}
			color={APP_VALUES.colors.text}
		/>
	),
	"user-alt": () => (
		<FontAwesome5
			name="user-alt"
			size={sizeNormalizer * 24}
			color={APP_VALUES.colors.text}
		/>
	),
};
