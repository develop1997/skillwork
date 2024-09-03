import { Stack } from "expo-router";
import { StyleSheet, View } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ExternalLink } from "@/components/ExternalLink";


export default function NotFoundScreen() {
	return (
		<>
			<Stack.Screen options={{ title: "Oops!" }} />
			<View style={styles.container}>
				<ThemedText type="title">This screen doesn't exist.</ThemedText>
				<ExternalLink href="/">
					<ThemedText type="link">Go to home screen!</ThemedText>
				</ExternalLink>
			</View>
		</>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		padding: 20,
	}
});
