import { configureAxios } from "@/api/AxiosComponent";
import { APP_VALUES } from "@/assets/styles/GeneralStyles";
import { sizeNormalizer } from "@/assets/styles/normalizator";
import { AuthProvider, useAuth } from "@/components/hooks/useAuth";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { useEffect } from "react";

export default function HomeLayout() {
	const { token, logOut} = useAuth();

	useEffect(() => {
		if (token) {
			configureAxios(token, logOut);
		}
	}, [token]);
	
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
				name="en_proceso"
				options={{
					title: "Mis Aplicaciones",
					tabBarIcon: ({ color }) => (
						<MaterialIcons
							name="notifications-none"
							size={28}
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
