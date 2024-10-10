import { ApplyToJob } from "@/api/Jobs/Create";
import { DeleteJob } from "@/api/Jobs/DeleteJob";
import { APP_VALUES, GeneralStyles } from "@/assets/styles/GeneralStyles";
import { FormsStyles } from "@/assets/styles/forms/FormsStyles";
import { JobsGenerals } from "@/assets/styles/jobs/geerals";
import { sizeNormalizer, windowWidth } from "@/assets/styles/normalizator";
import { IconText } from "@/components/IconText";
import Layout from "@/components/Layout";
import Loader from "@/components/Loader";
import AuthButton from "@/components/StyledButton";
import { ThemedText } from "@/components/ThemedText";
import UnorderedList from "@/components/UnorderedList";
import { useRootStore } from "@/store/RootStore";
import { useLocalSearchParams, useRouter } from "expo-router";
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
		userData, userJobs
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
		setJob(userJobs.find((job: any) => job.id_job === id));
	}, [id]);

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
							style={{
								marginTop: sizeNormalizer * 20,
							}}
						>
							{!hasBeenApplied ? (
								<AuthButton
									text="Aplicar"
									loading={loading}
									onPress={() => setConfirmVisible(true)}
								/>
							) : (
								<ThemedText type="default">
									Ya aplicaste
								</ThemedText>
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
