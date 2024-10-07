import { sizeNormalizer } from "@/assets/styles/normalizator";
import Layout from "@/components/Layout";
import { ThemedText } from "@/components/ThemedText";
import WorkCard from "@/components/workCards/WorkCard";
import { useRootStore } from "@/store/RootStore";
import { useRouter } from "expo-router";
import { FunctionComponent } from "react";
import { View } from "react-native";

interface InProgressProps {}

const InProgress: FunctionComponent<InProgressProps> = () => {
	const { applyedJobs } = useRootStore();
	const router = useRouter();
	return (
		<Layout
			haveTabs={true}
			haveTitle={true}
		>
			<View>
				{applyedJobs.length !== 0 ? (
					<>
						{applyedJobs.map((job: any) => (
							<WorkCard
								key={job.id_job}
								title={job.title}
								content={job.description}
								onPress={() =>
									router.push(
										`/jobs/usuario/job/${job.id_job}` as any
									)
								}
							/>
						))}
					</>
				) : (
					<>
						<View>
							<ThemedText>No hay trabajos disponibles</ThemedText>
						</View>
					</>
				)}
			</View>
		</Layout>
	);
};

export default InProgress;
