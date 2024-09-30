import { APP_VALUES } from "@/assets/styles/GeneralStyles";
import { HomeGenerals } from "@/assets/styles/home/HomeGenerals";
import WorkCard from "@/components/workCards/WorkCard";
import { useRouter } from "expo-router";
import { FunctionComponent, useEffect, useState } from "react";
import { SafeAreaView, StatusBar } from "react-native";
import {
	GestureHandlerRootView,
	ScrollView,
} from "react-native-gesture-handler";
import { AnimatedFAB } from "react-native-paper";

interface HomeProps {}

const Home: FunctionComponent<HomeProps> = () => {
	const [isExtended, setIsExtended] = useState(true);
	const router = useRouter();

	const onScroll = ({ nativeEvent }: { nativeEvent: any }) => {
		const currentScrollPosition =
			Math.floor(nativeEvent?.contentOffset?.y) ?? 0;

		setIsExtended(currentScrollPosition <= 0);
	};

	const onAdd = () => {
		router.push("/forms/cliente/jobForm");
	};

	return (
		<>
			<StatusBar barStyle="dark-content" />
			<GestureHandlerRootView style={{ flex: 1 }}>
				<ScrollView
					style={HomeGenerals.background}
					centerContent
					contentContainerStyle={HomeGenerals.contentScroll}
					onScroll={onScroll}
				>
					{Array.from({ length: 20 }).map((_, index) => (
						<WorkCard
							key={index}
							title="Lorem ipsum"
							content="Lorem ipsum odor amet, consectetuer adipiscing elit. Dis malesuada placerat fusce, sagittis curae porta. Natoque cursus id integer dui ad. Vulputate lacus tellus."
						/>
					))}
				</ScrollView>

				<AnimatedFAB
					icon={"plus"}
					label={"Add"}
					extended={isExtended}
					onPress={onAdd}
					visible={true}
					animateFrom={"right"}
					iconMode={"dynamic"}
					style={HomeGenerals.fab}
					color={APP_VALUES.colors.text}
				/>
			</GestureHandlerRootView>
		</>
	);
};

export default Home;
