import { sizeNormalizer } from "@/assets/styles/normalizator";
import Layout from "@/components/Layout";
import WorkCard from "@/components/workCards/WorkCard";
import { FunctionComponent } from "react";
import { View } from "react-native";

interface InProgressProps {}

const InProgress: FunctionComponent<InProgressProps> = () => {
	return (
		<Layout
			haveTabs={true}
			haveTitle={true}
			TabsHeight={sizeNormalizer * 70}
			TitleHeight={sizeNormalizer * 80}
		>
			<View>
				{Array.from({ length: 20 }).map((_, index) => (
					<WorkCard
						key={index}
						status="En Proceso"
						title="Lorem ipsum"
						content="Lorem ipsum odor amet, consectetuer adipiscing elit. Dis malesuada placerat fusce, sagittis curae porta. Natoque cursus id integer dui ad. Vulputate lacus tellus."
					/>
				))}
			</View>
		</Layout>
	);
};

export default InProgress;
