import { getJobsOfUser } from "@/api/Jobs/getJobs";
import { APP_VALUES, GeneralStyles } from "@/assets/styles/GeneralStyles";
import { HomeGenerals } from "@/assets/styles/home/HomeGenerals";
import { sizeNormalizer } from "@/assets/styles/normalizator";
import Layout from "@/components/Layout";
import Loader from "@/components/Loader";
import { ThemedText } from "@/components/ThemedText";
import WorkCard from "@/components/workCards/WorkCard";
import { useRootStore } from "@/store/RootStore";
import { useRouter } from "expo-router";
import { FunctionComponent, useEffect, useState } from "react";
import { View } from "react-native";
import { AnimatedFAB } from "react-native-paper";

interface HomeProps {}

const Home: FunctionComponent<HomeProps> = () => {
	const [isExtended, setIsExtended] = useState(true);
	const router = useRouter();
	const [fetching, setFetching] = useState(true);

	const {
		userJobs,
		setUserJobs,
		userData,
		setMessage,
		setMessageVisible,
	} = useRootStore();

	useEffect(() => {
		getJobsOfUser()
			.then((data) => {
				setUserJobs(data);
				setFetching(false);
			})
			.catch((err) => {
				setUserJobs([]);
				setFetching(false);
			});
	}, []);

	const onScroll = ({ nativeEvent }: { nativeEvent: any }) => {
		const currentScrollPosition =
			Math.floor(nativeEvent?.contentOffset?.y) ?? 0;

		setIsExtended(currentScrollPosition <= 0);
	};

	const onAdd = () => {
		if (
			userData &&
			(userData.name == "" ||
				userData.email == "" ||
				userData.phone == "" ||
				userData.document == "" ||
				userData.document_type == "" ||
				userData.description == "")
		) {
			setMessage({
				title: "Error",
				message:
					"Complete todos los campos del Perfil antes de publicar un trabajo",
			});
			setMessageVisible(true);
		} else {
			router.push("/forms/cliente/jobForm");
		}
	};

	return (
		<>
			<Layout onScroll={onScroll} haveTabs={true} haveTitle={true}>
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
												`/jobs/cliente/job/${job.id_job}` as any
											)
										}
									/>
								))}
							</>
						) : (
							<>
								<View>
									<ThemedText>
										No hay trabajos registrados
									</ThemedText>
								</View>
							</>
						)}
					</View>
				)}
			</Layout>
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
		</>
	);
};

export default Home;
