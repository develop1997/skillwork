import { ApplyToJob } from "@/api/Jobs/Create";
import { getAppliedJobs } from "@/api/Jobs/getJobs";
import { GeneralStyles } from "@/assets/styles/GeneralStyles";
import { FormsStyles } from "@/assets/styles/forms/FormsStyles";
import { JobsGenerals } from "@/assets/styles/jobs/geerals";
import { sizeNormalizer, windowWidth } from "@/assets/styles/normalizator";
import { ProfileStyles } from "@/assets/styles/profile/ProfileStyles";
import { IconText } from "@/components/IconText";
import Layout from "@/components/Layout";
import Loader from "@/components/Loader";
import AuthButton from "@/components/StyledButton";
import { ThemedText } from "@/components/ThemedText";
import UnorderedList from "@/components/UnorderedList";
import { statusColors } from "@/components/workCards/WorkCard";
import { useRootStore } from "@/store/RootStore";
import { useFocusEffect, useLocalSearchParams, useRouter } from "expo-router";
import { FunctionComponent, useEffect, useState } from "react";
import { View } from "react-native";

interface JobViewProps {}

const JobView: FunctionComponent<JobViewProps> = () => {
	const {
		setMessage,
		setMessageVisible,
		setConfirmVisible,
		setApplyedJobs,
		applyedJobs,
		userData,
	} = useRootStore();
	const [loading, setLoading] = useState(false);
	const { id } = useLocalSearchParams();
	const router = useRouter();

	const [hasBeenApplied, setHasBeenApplied] = useState(false);

	useEffect(() => {
		setHasBeenApplied(applyedJobs.some((job: any) => job.id_job === id));
	}, [applyedJobs]);

	const [job, setJob] = useState<any>();

	useEffect(() => {
		setJob(applyedJobs.find((job: any) => job.id_job === id));
	}, [id, applyedJobs]);

	const onApply = () => {
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
					"Complete todos los campos del Perfil antes de aplicar a un trabajo",
			});
			setMessageVisible(true);
		} else {
			setLoading(true);
			ApplyToJob(id as string)
				.then(() => {
					setLoading(false);
					setApplyedJobs([...applyedJobs, job]);
					setMessage({
						title: "Aprobado",
						message: "Oferta aprobada",
					});
					setMessageVisible(true);
					router.replace("/home/usuario");
				})
				.catch((err) => {
					setLoading(false);
					setMessage({
						title: "Error",
						message: "No se pudo aprobar la oferta",
					});
					setMessageVisible(true);
				});
		}
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

	return (
		<Layout back onConfirm={onApply}>
			<View>
				{job ? (
					<View
						style={[
							GeneralStyles.centeredVertical,
							{
								paddingHorizontal: windowWidth * 0.05,
							},
						]}
					>
						<ThemedText type="title" style={FormsStyles.formTitle}>
							{job.title}
						</ThemedText>

						<View>
							<View style={JobsGenerals.JobInformationItem}>
								<IconText
									fontColor={
										statusColors[
											job.applicants.find(
												(app: any) =>
													app.id_user ===
													userData.id_user
											)?.status
										]
									}
									icon="alert-rhombus-outline"
									text={
										"Estado: " +
										job.applicants.find(
											(app: any) =>
												app.id_user === userData.id_user
										)?.status
									}
									margin={sizeNormalizer * 5}
								/>
							</View>
							<View style={JobsGenerals.JobInformationItem}>
								<IconText
									icon="briefcase"
									text="Descripción"
									margin={sizeNormalizer * 5}
								/>
								<ThemedText type="default">
									{job.description}
								</ThemedText>
							</View>
							<View style={JobsGenerals.JobInformationItem}>
								<IconText
									icon="check"
									text="Requisitos"
									margin={sizeNormalizer * 5}
								/>
								<UnorderedList items={job.required_skills} />
							</View>
							<View style={JobsGenerals.JobInformationItem}>
								<IconText
									icon="briefcase"
									text="Servicios"
									margin={sizeNormalizer * 5}
								/>
								<UnorderedList items={job.services} />
							</View>

							<View style={JobsGenerals.JobInformationItem}>
								<IconText
									icon="tag"
									text="Categorías"
									margin={sizeNormalizer * 5}
								/>
								<UnorderedList items={job.categories} />
							</View>

							<View style={JobsGenerals.JobInformationItem}>
								<IconText
									icon="map-marker"
									text="Ubicación"
									margin={sizeNormalizer * 5}
								/>
								<ThemedText type="default">
									{job.location}
								</ThemedText>
							</View>
							<View style={JobsGenerals.JobInformationItem}>
								<IconText
									icon="calendar-month"
									text="Fecha de publicación"
									margin={sizeNormalizer * 5}
								/>
								<ThemedText type="default">
									{job.created_at}
								</ThemedText>
							</View>
							<View style={JobsGenerals.JobInformationItem}>
								<IconText
									icon="calendar-month"
									text="Disponible hasta"
									margin={sizeNormalizer * 5}
								/>
								<ThemedText type="default">
									{job.expired_at}
								</ThemedText>
							</View>
						</View>
						<View
							style={[
								ProfileStyles.Horizontal,
								{
									marginVertical: sizeNormalizer * 30,
								},
							]}
						>
							{!hasBeenApplied ? (
								<AuthButton
									text="Aplicar"
									loading={loading}
									onPress={() => setConfirmVisible(true)}
								/>
							) : (
								<AuthButton
									text="Cambiar estado"
									loading={loading}
									onPress={() =>
										router.push(
											`/jobs/usuario/status/${id}` as any
										)
									}
								/>
							)}
						</View>
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

export default JobView;
