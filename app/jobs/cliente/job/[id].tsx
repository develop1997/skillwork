import { DeleteJob } from "@/api/Jobs/DeleteJob";
import { APP_VALUES, GeneralStyles } from "@/assets/styles/GeneralStyles";
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
import { useRootStore } from "@/store/RootStore";
import { useLocalSearchParams, useRouter } from "expo-router";
import { FunctionComponent, useEffect, useState } from "react";
import { View } from "react-native";

interface JobViewProps {}

const JobView: FunctionComponent<JobViewProps> = () => {
	const { setMessage, setMessageVisible, setConfirmVisible } = useRootStore();
	const [loading, setLoading] = useState(false);
	const { id } = useLocalSearchParams();
	const { userJobs } = useRootStore();
	const router = useRouter();

	const [job, setJob] = useState<any>();

	useEffect(() => {
		setJob(userJobs.find((job: any) => job.id_job === id));
	}, [id]);

	const onDelete = () => {
		setLoading(true);
		DeleteJob(id as string)
			.then(() => {
				setLoading(false);
				setMessage({ title: "Eliminado", message: "Oferta eliminada" });
				setMessageVisible(true);
				router.replace("/home/cliente");
			})
			.catch((err) => {
				setLoading(false);
				setMessage({ title: "Error", message: err.message });
				setMessageVisible(true);
			});
	};

	const onViewApplicants = () => {
		router.push(`/jobs/cliente/applications/${id}` as any);
	};

	return (
		<Layout back onConfirm={onDelete}>
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
							<View style={JobsGenerals.JobInformationItem}>
								<IconText
									icon="cash"
									text="Salario"
									margin={sizeNormalizer * 5}
								/>
								<ThemedText type="default">
									${job.salary}
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
							<AuthButton
								text="Ver Postulantes"
								loading={loading}
								onPress={onViewApplicants}
							/>
							<AuthButton
								text="Eliminar"
								loading={loading}
								primaryColor={APP_VALUES.colors.error}
								onPress={() => setConfirmVisible(true)}
							/>
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
