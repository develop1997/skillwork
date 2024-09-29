import { APP_VALUES } from "@/assets/styles/GeneralStyles";
import { sizeNormalizer } from "@/assets/styles/normalizator";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function HomeLayout() {
	return (
		<Tabs
			screenOptions={{
				tabBarActiveTintColor: APP_VALUES.colors.primary,
				tabBarInactiveTintColor: APP_VALUES.colors.disabledTextDark,
				tabBarStyle: {
					backgroundColor: APP_VALUES.colors.secondary,
					height: 60,
				},
				headerStyle: {
					backgroundColor: APP_VALUES.colors.primary,
					height: sizeNormalizer * 80,
				},
				headerTitleStyle: {
					color: APP_VALUES.colors.secondary,
					fontSize: sizeNormalizer * 30,
				},
				headerTitleAlign: "center",
			}}
		>
			<Tabs.Screen
				name="index"
				options={{
					title: "Trabajos",
					tabBarIcon: ({ color }) => (
						<MaterialIcons
							name="work-outline"
							size={28}
							color={color}
						/>
					),
				}}
			/>
			<Tabs.Screen
				name="profile"
				options={{
					title: "Perfil",
					tabBarIcon: ({ color }) => (
						<AntDesign name="profile" size={28} color={color} />
					),
				}}
			/>
		</Tabs>
	);
}
