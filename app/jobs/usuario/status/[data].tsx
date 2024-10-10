import { changeCandidateStatus } from "@/api/Jobs/User";
import { getJobApplicans } from "@/api/Jobs/getJobs";
import { APP_VALUES, GeneralStyles } from "@/assets/styles/GeneralStyles";
import { FormsStyles } from "@/assets/styles/forms/FormsStyles";
import { sizeNormalizer, windowWidth } from "@/assets/styles/normalizator";
import { ProfileStyles } from "@/assets/styles/profile/ProfileStyles";
import { IconText } from "@/components/IconText";
import Layout from "@/components/Layout";
import Loader from "@/components/Loader";
import AuthButton from "@/components/StyledButton";
import AuthInput from "@/components/StyledInput";
import { ThemedText } from "@/components/ThemedText";
import { AvailableStatus } from "@/components/workCards/WorkCard";
import { useRootStore } from "@/store/RootStore";
import { useLocalSearchParams, useRouter } from "expo-router";
import { FunctionComponent, useEffect, useState } from "react";
import { View } from "react-native";

interface UserViewProps {}

const UserJobStatusView: FunctionComponent<UserViewProps> = () => {
	const {
		setMessage,
		setMessageVisible,
		userData,
		applyedJobs,
		setApplyedJobs,
	} = useRootStore();
	const [loading, setLoading] = useState(false);
	const { data } = useLocalSearchParams();
	const [fetching, setFetching] = useState(true);
	const [job, setJob] = useState<any>();
	const router = useRouter();
	const [rejectCotization, setRejectCotization] = useState(false);
	const [salary, setSalary] = useState<any>(0);
	const [user, setUser] = useState<any>();

	useEffect(() => {
		setJob(applyedJobs.find((job: any) => job.id_job === (data as string)));
	}, [applyedJobs]);

	useEffect(() => {
		if (job) {
			setFetching(false);
			setUser(
				job.applicants.find(
					(applicant: any) => applicant.id_user === userData.id_user
				)
			);
		}
	}, [job]);

	const onChangeStatus = (status: string, dataSent: any) => {
		setLoading(true);
		changeCandidateStatus(
			data as string,
			userData.id_user,
			status,
			dataSent
		)
			.then(() => {
				setLoading(false);
				setRejectCotization(false);
				setMessage({
					title: "Ok",
					message: "Aceptado",
				});
				setMessageVisible(true);
				const updatedJob = {
					...job,
					applicants: [
						job.applicants.filter(
							(applicant: any) =>
								applicant.id_user !== userData.id_user
						),
						{
							id_user: userData.id_user,
							status: status,
							data: dataSent,
						},
					],
				};

				setApplyedJobs([
					...applyedJobs.filter(
						(job: any) => job.id_job !== updatedJob.id_job
					),
					updatedJob,
				]);
			})
			.catch((err) => {
				setLoading(false);
				setRejectCotization(false);
				setMessage({
					title: "Error",
					message: err.message,
				});
				setMessageVisible(true);
			});
	};

	console.log(applyedJobs);

	const onRejectCandidate = () => {
		onChangeStatus(AvailableStatus.CANCELADO, undefined);
	};

	const onAceptResult = () => {
		onChangeStatus(AvailableStatus.TERMINADO, undefined);
	};

	const onRejectResult = () => {
		onChangeStatus(AvailableStatus.EN_PROCESO, undefined);
	};

	const onAceptCotization = (salary: any) => {
		onChangeStatus(AvailableStatus.EN_PROCESO, {
			salary: salary,
		});
	};

	return (
		<Layout back>
			<View style={GeneralStyles.centeredVertical}>
				{!fetching ? (
					<>
						<ThemedText type="title" style={FormsStyles.formTitle}>
							{job.title} - {user.status}
						</ThemedText>
						<View>
							{user.status == AvailableStatus.PENDIENTE ? (
								<View style={GeneralStyles.centeredVertical}>
									<ThemedText type="default">
										{rejectCotization
											? "Proponiendo una cotización"
											: "El cliente esta esperando que propongas una cotización"}
									</ThemedText>
									{rejectCotization && (
										<>
											<View
												style={{
													...FormsStyles.formInput,
													...{
														width:
															windowWidth * 0.8,
													},
												}}
											>
												<AuthInput
													icon="cash"
													placeholder="Salario"
													value={salary}
													onChangeText={(value) =>
														setSalary(value)
													}
												/>
											</View>
										</>
									)}
									<View
										style={[
											ProfileStyles.Horizontal,
											{
												marginVertical:
													sizeNormalizer * 30,
											},
										]}
									>
										<AuthButton
											text={
												rejectCotization
													? "Enviar"
													: "Propón una cotización"
											}
											loading={loading}
											onPress={() => {
												if (rejectCotization) {
													onChangeStatus(
														AvailableStatus.EN_COTIZACION,
														{
															salary,
															proposer_id:
																userData.id_user,
														}
													);
												} else {
													setRejectCotization(true);
												}
											}}
										/>
										<AuthButton
											text="Rechazar Oferta"
											loading={loading}
											onPress={onRejectCandidate}
											primaryColor={
												APP_VALUES.colors.error
											}
										/>
									</View>
								</View>
							) : user.status == AvailableStatus.EN_COTIZACION ? (
								<View style={GeneralStyles.centeredVertical}>
									<ThemedText type="default">
										{rejectCotization
											? "Propón una cotización"
											: user.data?.proposer_id ===
											  userData.id_user
											? "Esperando a que el cliente acepte la cotización que propusiste"
											: "El cliente esta esperando a que aceptes su cotización"}
									</ThemedText>

									<IconText
										icon="cash"
										text={
											"Cotización propuesta: $" +
											user.data.salary
										}
										margin={sizeNormalizer * 5}
									/>

									{rejectCotization && (
										<>
											<View
												style={{
													...FormsStyles.formInput,
													...{
														width:
															windowWidth * 0.8,
													},
												}}
											>
												<AuthInput
													icon="cash"
													placeholder="Salario"
													value={salary}
													onChangeText={(value) =>
														setSalary(value)
													}
												/>
											</View>
										</>
									)}
									<View
										style={[
											ProfileStyles.Horizontal,
											{
												marginVertical:
													sizeNormalizer * 30,
											},
										]}
									>
										<AuthButton
											text={
												rejectCotization
													? "Enviar"
													: "Propón otra cotización"
											}
											loading={loading}
											onPress={() => {
												if (rejectCotization) {
													onChangeStatus(
														AvailableStatus.EN_COTIZACION,
														{
															salary,
															proposer_id:
																userData.id_user,
														}
													);
												} else {
													setRejectCotization(true);
												}
											}}
										/>
										<AuthButton
											text="Rechazar Oferta"
											loading={loading}
											onPress={onRejectCandidate}
											primaryColor={
												APP_VALUES.colors.error
											}
										/>
									</View>
									{user.data?.proposer_id !==
										userData.id_user && (
										<AuthButton
											text="Aceptar Cotización"
											loading={loading}
											onPress={() =>
												onAceptCotization(
													user.data.salary
												)
											}
										/>
									)}
								</View>
							) : user.status == AvailableStatus.TERMINADO ? (
								<View style={GeneralStyles.centeredVertical}>
									<ThemedText type="default">
										Completado.
									</ThemedText>
								</View>
							) : user.status == AvailableStatus.CANCELADO ? (
								<View style={GeneralStyles.centeredVertical}>
									<ThemedText type="default">
										Cancelado
									</ThemedText>
								</View>
							) : user.status == AvailableStatus.EN_PROCESO ? (
								<View style={GeneralStyles.centeredVertical}>
									<ThemedText type="default">
										En proceso
									</ThemedText>
									<View
										style={[
											ProfileStyles.Horizontal,
											{
												marginVertical:
													sizeNormalizer * 30,
											},
										]}
									>
										<AuthButton
											text="Marcar para revisión"
											loading={loading}
											onPress={() => {
												onChangeStatus(
													AvailableStatus.EN_REVISION,
													{
														salary,
														proposer_id:
															userData.id_user,
													}
												);
											}}
										/>
									</View>
								</View>
							) : user.status == AvailableStatus.EN_REVISION ? (
								<View style={GeneralStyles.centeredVertical}>
									<IconText
										icon="check"
										text="EL cliente esta revisando tu respuesta"
										margin={sizeNormalizer * 30}
									/>
								</View>
							) : (
								<View style={GeneralStyles.centeredVertical}>
									<ThemedText type="default">
										Error
									</ThemedText>
								</View>
							)}
						</View>
					</>
				) : (
					<Loader />
				)}
			</View>
		</Layout>
	);
};

export default UserJobStatusView;
