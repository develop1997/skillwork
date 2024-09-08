import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import "react-native-reanimated";

export default function HomeLayout() {

	return (
		<Tabs screenOptions={{ tabBarActiveTintColor: "#fff",tabBarStyle:{
			backgroundColor: "#40346b",
			height: 60,
		} }}>
			<Tabs.Screen
				name="index"
				options={{
					title: "Trabajos",
					headerStyle: {
						backgroundColor: "#1f1a30",
					},
					headerTitleStyle: {
						color: "white",
					},
					headerTitleAlign: "center",
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
					headerStyle: {
						backgroundColor: "#1f1a30",
					},
					headerTitleStyle: {
						color: "white",
					},
					headerTitleAlign: "center",
					tabBarIcon: ({ color }) => (
						<AntDesign name="profile" size={28} color={color} />
					),
				}}
			/>
		</Tabs>
	);
}
