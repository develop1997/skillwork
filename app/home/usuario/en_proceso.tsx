import { HomeGenerals } from "@/assets/styles/home/HomeGenerals";
import WorkCard from "@/components/workCards/WorkCard";
import { FunctionComponent } from "react";
import { StatusBar } from "react-native";
import {
	GestureHandlerRootView,
	ScrollView,
} from "react-native-gesture-handler";

interface InProgressProps {}

const InProgress: FunctionComponent<InProgressProps> = () => {
	return (
		<>
			<StatusBar barStyle="light-content" />
			<GestureHandlerRootView style={{ flex: 1 }}>
				<ScrollView
					style={HomeGenerals.background}
					centerContent
					contentContainerStyle={HomeGenerals.contentScroll}
				>
					{Array.from({ length: 20 }).map((_, index) => (
						<WorkCard
							key={index}
							status="En Proceso"
							title="Lorem ipsum"
							content="Lorem ipsum odor amet, consectetuer adipiscing elit. Dis malesuada placerat fusce, sagittis curae porta. Natoque cursus id integer dui ad. Vulputate lacus tellus."
						/>
					))}
				</ScrollView>
			</GestureHandlerRootView>
		</>
	);
};

export default InProgress;
