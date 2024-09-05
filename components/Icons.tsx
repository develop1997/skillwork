import { FontAwesome5, FontAwesome6 } from "@expo/vector-icons";

interface Icons {
	[key: string]: () => JSX.Element;
}

export const IconsObject: Icons = {
	"building-user": () => (
		<FontAwesome6 name="building-user" size={24} color="white" />
	),
	"user-alt": () => <FontAwesome5 name="user-alt" size={24} color="white" />,
};
