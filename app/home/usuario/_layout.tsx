import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { Dimensions } from "react-native";
import "react-native-reanimated";
const windowWidth = Dimensions.get('window').width;

export default function HomeLayout() {

	return (
		<Tabs screenOptions={{ tabBarActiveTintColor: "#fff" }}>
			<Tabs.Screen
				name="en_proceso"
				options={{
					title: "En Proceso",
					headerStyle: {
						backgroundColor: "#1f1a30",
					},
					headerTitleStyle: {
						color: "white",
					},
					tabBarStyle: {
						backgroundColor: "#40346b",
					},
					headerTitleAlign: "center",
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
					headerStyle: {
						backgroundColor: "#1f1a30",
					},
					headerTitleStyle: {
						color: "white",
					},
					tabBarStyle: {
						backgroundColor: "#40346b",
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
					title: "Profile",
					headerStyle: {
						backgroundColor: "#1f1a30",
					},
					headerTitleStyle: {
						color: "white",
					},
					tabBarStyle: {
						backgroundColor: "#40346b",
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
