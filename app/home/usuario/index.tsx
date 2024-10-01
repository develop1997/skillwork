import { getAppliedJobs, getJobs } from "@/api/Jobs/getJobs";
import { GeneralStyles } from "@/assets/styles/GeneralStyles";
import { sizeNormalizer } from "@/assets/styles/normalizator";
import Layout from "@/components/Layout";
import Loader from "@/components/Loader";
import { ThemedText } from "@/components/ThemedText";
import WorkCard from "@/components/workCards/WorkCard";
import { useRootStore } from "@/store/RootStore";
import { useRouter } from "expo-router";
import { FunctionComponent, useEffect, useState } from "react";
import { View } from "react-native";

interface HomeProps {}

const Home: FunctionComponent<HomeProps> = () => {
	const [fetching, setFetching] = useState(true);
	const [page, setPage] = useState(1);
	const router = useRouter();
	const {
		userJobs,
		setUserJobs,
		setApplyedJobs,
	} = useRootStore();

	useEffect(() => {
		getJobs(page)
			.then((data) => {
				setUserJobs(data);
				setFetching(false);
			})
			.catch((err) => {
				setUserJobs([]);
				setFetching(false);
			});
		getAppliedJobs()
			.then((res) => {
				setApplyedJobs(res);
			})
			.catch((err) => {
				setApplyedJobs([]);
			});
	}, []);

	return (
		<Layout
			haveTabs={true}
			haveTitle={true}
			TabsHeight={sizeNormalizer * 70}
			TitleHeight={sizeNormalizer * 80}
		>
			{fetching ? (
				<View
					style={[
						GeneralStyles.centeredView,
						{
							paddingVertical: "20%",
						},
					]}
				>
					<Loader />
				</View>
			) : (
				<View>
					{userJobs.length !== 0 ? (
						<>
							{userJobs.map((job: any) => (
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
								<ThemedText>
									No hay trabajos disponibles
								</ThemedText>
							</View>
						</>
					)}
				</View>
			)}
		</Layout>
	);
};

export default Home;
