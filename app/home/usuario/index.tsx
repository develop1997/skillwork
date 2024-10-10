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
	const router = useRouter();
	const { userData, userJobs, setUserJobs, setApplyedJobs } = useRootStore();
	const [noAppliedJobs, setNoAppliedJobs] = useState([]);

	useEffect(() => {
		if (userJobs.length !== 0) {
			if (!userData || !userData.id_user) return;
			setNoAppliedJobs(
				userJobs.filter((job: any) => {
					if (job.applicants && job.applicants.length !== 0) {
						return job.applicants.find(
							(app: any) => app.id_user !== userData.id_user
						);
					}
				})
			);
		}
	}, [userJobs]);

	useEffect(() => {
		getJobs()
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
		<Layout haveTabs={true} haveTitle={true}>
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
					{noAppliedJobs.length !== 0 ? (
						<>
							{noAppliedJobs.map((job: any) => (
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
