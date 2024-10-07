import { FunctionComponent } from "react";
import { ScrollView, StatusBar, View } from "react-native";
import { Button, Dialog, Portal } from "react-native-paper";
import BackHeaderButton from "./BackAction";
import { ThemedText } from "./ThemedText";
import { useRootStore } from "@/store/RootStore";
import { HomeGenerals } from "@/assets/styles/home/HomeGenerals";
import {
	sizeNormalizer,
	windowHeight,
	windowWidth,
} from "@/assets/styles/normalizator";
import { Fonts } from "@/assets/fonts/fonts";
import { APP_VALUES } from "@/assets/styles/GeneralStyles";

interface LayoutProps {
	onConfirm?: () => void;
	children: JSX.Element;
	back?: boolean;
	onScroll?: ({ nativeEvent }: { nativeEvent: any }) => void;
	haveTabs?: boolean;
	haveTitle?: boolean;
	TabsHeight?: number;
	TitleHeight?: number;
}

const Layout: FunctionComponent<LayoutProps> = ({
	onConfirm = () => {},
	onScroll = () => {},
	children,
	back = false,
	haveTabs = false,
	haveTitle = false,
	TabsHeight = APP_VALUES.globalElemtSize.tabHeight,
	TitleHeight = APP_VALUES.globalElemtSize.headerBarHeight,
}) => {
	const {
		messageVisible,
		setMessageVisible,
		confirmVisible,
		setConfirmVisible,
		message,
	} = useRootStore();

	const hideModalConfirm = () => {
		setConfirmVisible(false);
	};

	const hideModalMessage = () => {
		setMessageVisible(false);
	};

	let minHeight;

	if (back) {
		minHeight = windowHeight - sizeNormalizer * 96;
	} else {
		if (!haveTitle && !haveTabs) {
			minHeight = windowHeight;
		}

		if (haveTitle && !haveTabs) {
			minHeight = windowHeight - TabsHeight;
		}

		if (!haveTitle && haveTabs) {
			minHeight = windowHeight - TitleHeight;
		}

		if (haveTitle && haveTabs) {
			minHeight = windowHeight - TitleHeight - TabsHeight;
		}
	}

	return (
		<>
			<StatusBar barStyle="dark-content" />
			<Portal>
				<Dialog visible={messageVisible} onDismiss={hideModalMessage}>
					<Dialog.Title>{message.title}</Dialog.Title>
					<Dialog.Content>
						<ThemedText>{message.message}</ThemedText>
					</Dialog.Content>
					<Dialog.Actions>
						<Button
							onPress={hideModalMessage}
							mode="contained"
							style={{
								display: "flex",
								minWidth: windowWidth * 0.2,
								borderRadius: sizeNormalizer * 30,
							}}
							contentStyle={{
								height: sizeNormalizer * 65,
							}}
							labelStyle={{
								fontSize: sizeNormalizer * 18,
								lineHeight: sizeNormalizer * 20,
								fontFamily: Fonts.RobotoBold,
							}}
							theme={{
								colors: {
									primary: APP_VALUES.colors.secondary,
									onPrimary: APP_VALUES.colors.text,
								},
							}}
						>
							OK
						</Button>
					</Dialog.Actions>
				</Dialog>
				<Dialog visible={confirmVisible} onDismiss={hideModalConfirm}>
					<Dialog.Title>Confirmación</Dialog.Title>
					<Dialog.Content>
						<ThemedText>¿Deseas continuar?</ThemedText>
					</Dialog.Content>
					<Dialog.Actions>
						<Button
							onPress={hideModalConfirm}
							mode="contained"
							style={{
								display: "flex",
								minWidth: windowWidth * 0.2,
								borderRadius: sizeNormalizer * 30,
							}}
							contentStyle={{
								height: sizeNormalizer * 65,
							}}
							labelStyle={{
								fontSize: sizeNormalizer * 18,
								lineHeight: sizeNormalizer * 20,
								fontFamily: Fonts.RobotoBold,
							}}
							theme={{
								colors: {
									primary: APP_VALUES.colors.error,
									onPrimary: APP_VALUES.colors.text,
								},
							}}
						>
							No
						</Button>
						<Button
							mode="contained"
							style={{
								display: "flex",
								minWidth: windowWidth * 0.2,
								borderRadius: sizeNormalizer * 30,
							}}
							contentStyle={{
								height: sizeNormalizer * 65,
							}}
							labelStyle={{
								fontSize: sizeNormalizer * 18,
								lineHeight: sizeNormalizer * 20,
								fontFamily: Fonts.RobotoBold,
							}}
							theme={{
								colors: {
									primary: APP_VALUES.colors.secondary,
									onPrimary: APP_VALUES.colors.text,
								},
							}}
							onPress={() => {
								hideModalConfirm();
								onConfirm();
							}}
						>
							Sí
						</Button>
					</Dialog.Actions>
				</Dialog>
			</Portal>

			<ScrollView style={[HomeGenerals.background]} onScroll={onScroll}>
				{back && <BackHeaderButton />}

				<View
					style={[
						HomeGenerals.scrollContainer,
						{
							minHeight: minHeight,
						},
					]}
				>
					{children}
				</View>
			</ScrollView>
		</>
	);
};

export default Layout;
