import { getAppliedJobs } from "@/api/Jobs/getJobs";
import { GeneralStyles } from "@/assets/styles/GeneralStyles";
import { sizeNormalizer, windowWidth } from "@/assets/styles/normalizator";
import { IconText } from "@/components/IconText";
import Layout from "@/components/Layout";
import { ThemedText } from "@/components/ThemedText";
import WorkCard, {
	AvailableStatus,
	statusColors,
} from "@/components/workCards/WorkCard";
import { useRootStore } from "@/store/RootStore";
import { useFocusEffect, useRouter } from "expo-router";
import { FunctionComponent, useState } from "react";
import { View } from "react-native";

interface InProgressProps {}

const InProgress: FunctionComponent<InProgressProps> = () => {
	const { applyedJobs, userData, setApplyedJobs } = useRootStore();
	const router = useRouter();
	const getStatusFromJob = (job: any) => {
		if (!userData || !userData.id_user) return AvailableStatus.PENDIENTE;
		let status = "";

		job.applicants.forEach((applicant: any) => {
			if (applicant.id_user === userData.id_user) {
				status = applicant.status;
			}
		});

		return status;
	};
	const [refreshing, setRefreshing] = useState(false);

	useFocusEffect(() => {
		if (refreshing) {
			return;
		} else {
			setRefreshing(true);
		}
		setTimeout(() => {
			getAppliedJobs()
				.then((res) => {
					setApplyedJobs(res);
					setRefreshing(false);
				})
				.catch((err) => {
					setApplyedJobs([]);
				});
		}, 1000);
	});
	const statusList = [
		AvailableStatus.PENDIENTE,
		AvailableStatus.EN_COTIZACION,
		AvailableStatus.EN_PROCESO,
		AvailableStatus.TERMINADO,
		AvailableStatus.CANCELADO,
		AvailableStatus.EN_REVISION,
	];
	return (
		<Layout haveTabs={true} haveTitle={true}>
			<>
				<View
					style={[
						GeneralStyles.horizontalWrap,
						{
							width: windowWidth * 0.9,
							justifyContent: "center",
						},
					]}
				>
					{statusList.map((status) => (
						<IconText
							icon="checkbox-blank-circle"
							text={status}
							fontColor={statusColors[status]}
							fontSize={sizeNormalizer * 18}
						/>
					))}
				</View>
				<View>
					{applyedJobs.length !== 0 ? (
						<>
							{applyedJobs.map((job: any) => (
								<WorkCard
									key={job.id_job}
									title={job.title}
									content={job.description}
									status={getStatusFromJob(job) as any}
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
			</>
		</Layout>
	);
};

export default InProgress;
