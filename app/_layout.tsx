import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { Fonts } from "@/assets/fonts/fonts";
import { PaperProvider } from "react-native-paper";
import "react-native-reanimated";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
	const [loaded] = useFonts({
		[Fonts.RobotoBold]: require("../assets/fonts/Roboto-Bold.ttf"),
		[Fonts.RobotoMedium]: require("../assets/fonts/Roboto-Medium.ttf"),
		[Fonts.RobotoRegular]: require("../assets/fonts/Roboto-Regular.ttf"),
		[Fonts.RobotoItalic]: require("../assets/fonts/Roboto-Italic.ttf"),
	});

	useEffect(() => {
		if (loaded) {
			SplashScreen.hideAsync();
		}
	}, [loaded]);

	if (!loaded) {
		return null;
	}

	return (
		<PaperProvider>
			<Stack>
				<Stack.Screen name="auth" options={{ headerShown: false }} />
				<Stack.Screen name="index" options={{ headerShown: false }} />
			</Stack>
		</PaperProvider>
	);
}
