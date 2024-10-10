import { getJobApplicans, getJobs } from "@/api/Jobs/getJobs";
import { GeneralStyles } from "@/assets/styles/GeneralStyles";
import { FormsStyles } from "@/assets/styles/forms/FormsStyles";
import { windowWidth } from "@/assets/styles/normalizator";
import Layout from "@/components/Layout";
import Loader from "@/components/Loader";
import { ThemedText } from "@/components/ThemedText";
import UserItem from "@/components/userElement";
import { useRootStore } from "@/store/RootStore";
import { useFocusEffect, useLocalSearchParams } from "expo-router";
import { FunctionComponent, useEffect, useState } from "react";
import { View } from "react-native";

interface JobViewProps {}

const JobApplicationsView: FunctionComponent<JobViewProps> = () => {
	const { id } = useLocalSearchParams();
	const [fetching, setFetching] = useState(true);
	const { userJobs, setUserJobs } = useRootStore();
	const [applicants, setApplicants] = useState<any[]>([]);

	useEffect(() => {
		getJobApplicans(id as string)
			.then((res) => {
				setApplicants(res);
				setFetching(false);
			})
			.catch((err) => {
				setFetching(false);
				setApplicants([]);
			});
	}, [id]);

	const [refreshing, setRefreshing] = useState(false);

	useFocusEffect(() => {
		if (refreshing) {
			return;
		} else {
			setRefreshing(true);
		}
		setTimeout(() => {
			getJobs()
				.then((data) => {
					setUserJobs(data);
					setRefreshing(false);
				})
				.catch((err) => {
					setUserJobs([]);
				});
		}, 1000);
	});

	const getStatusFromJob = (job: any, user_id: string) => {
		let status = "";
		job.applicants.forEach((applicant: any) => {
			if (applicant.id_user === user_id) {
				status = applicant.status;
			}
		});

		return status;
	};

	return (
		<Layout back>
			<View>
				{!fetching ? (
					<View
						style={[
							GeneralStyles.centeredVertical,
							{
								paddingHorizontal: windowWidth * 0.05,
							},
						]}
					>
						<ThemedText type="title" style={FormsStyles.formTitle}>
							Aplicantes de la oferta
						</ThemedText>
						{applicants.length > 0 ? (
							<>
								{applicants.map((applicant) => (
									<UserItem
										status={getStatusFromJob(
											userJobs.find(
												(job: any) => job.id_job === id
											),
											applicant.id_user
										)}
										key={applicant.id_user}
										keyValue={applicant.id_user + ";" + id}
										image={applicant.image}
										name={applicant.name}
										email={applicant.email}
									/>
								))}
							</>
						) : (
							<>
								<ThemedText>No hay Aplicantes</ThemedText>
							</>
						)}
					</View>
				) : (
					<>
						<Loader />
					</>
				)}
			</View>
		</Layout>
	);
};

export default JobApplicationsView;
