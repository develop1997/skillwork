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
					height: APP_VALUES.globalElemtSize.tabHeight,
				},
				tabBarLabelStyle: {
					fontSize: sizeNormalizer * 12,
					paddingBottom: sizeNormalizer * 10,
				},
				headerStyle: {
					backgroundColor: APP_VALUES.colors.primary,
					height: APP_VALUES.globalElemtSize.headerBarHeight,
				},
				headerTitleStyle: {
					color: APP_VALUES.colors.secondary,
					fontSize: sizeNormalizer * 28,
				},
				headerTitleAlign: "center",
			}}
		>
			<Tabs.Screen
				name="en_proceso"
				options={{
					title: "Mis Aplicaciones",
					tabBarIcon: ({ color }) => (
						<MaterialIcons
							name="notifications-none"
							size={sizeNormalizer * 28}
							color={color}
						/>
					),
				}}
			/>
			<Tabs.Screen
				name="index"
				options={{
					title: "Trabajos",
					tabBarIcon: ({ color }) => (
						<MaterialIcons
							name="work-outline"
							size={sizeNormalizer * 28}
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
						<AntDesign
							name="profile"
							size={sizeNormalizer * 28}
							color={color}
						/>
					),
				}}
			/>
		</Tabs>
	);
}
