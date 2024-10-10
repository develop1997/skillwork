import { changeCandidateStatus, valorateUser } from "@/api/Jobs/User";
import { getJobApplicans, getJobs } from "@/api/Jobs/getJobs";
import { APP_VALUES, GeneralStyles } from "@/assets/styles/GeneralStyles";
import { FormsStyles } from "@/assets/styles/forms/FormsStyles";
import { JobsGenerals } from "@/assets/styles/jobs/geerals";
import { sizeNormalizer, windowWidth } from "@/assets/styles/normalizator";
import { ProfileStyles } from "@/assets/styles/profile/ProfileStyles";
import { IconText } from "@/components/IconText";
import Layout from "@/components/Layout";
import Loader from "@/components/Loader";
import AuthButton from "@/components/StyledButton";
import AuthInput from "@/components/StyledInput";
import { ThemedText } from "@/components/ThemedText";
import UnorderedList from "@/components/UnorderedList";
import { AvailableStatus } from "@/components/workCards/WorkCard";
import { useRootStore } from "@/store/RootStore";
import { useLocalSearchParams, useRouter } from "expo-router";
import { FunctionComponent, useEffect, useState } from "react";
import { View, Image } from "react-native";
import { AirbnbRating } from "react-native-ratings";

interface UserViewProps {}

const UserJobStatusView: FunctionComponent<UserViewProps> = () => {
	const {
		setMessage,
		setMessageVisible,
		userData,
		userJobs,
	} = useRootStore();
	const [loading, setLoading] = useState(false);
	const { data } = useLocalSearchParams();
	const [fetching, setFetching] = useState(true);
	const [applicants, setApplicants] = useState<any[]>([]);

	useEffect(() => {
		getJobApplicans((data as string).split(";")[1])
			.then((res) => {
				setApplicants(res);
				setFetching(false);
			})
			.catch((err) => {
				setFetching(false);
				setApplicants([]);
			});
	}, [data]);

	const [user, setUser] = useState<any>();
	const [job, setJob] = useState<any>();

	useEffect(() => {
		setJob(
			userJobs.find(
				(job: any) => job.id_job === (data as string).split(";")[1]
			)
		);
	}, [userJobs]);

	useEffect(() => {
		setUser(
			applicants.find(
				(user: any) => user.id_user === (data as string).split(";")[0]
			)
		);
	}, [applicants]);

	const [rejectCotization, setRejectCotization] = useState(false);
	const [salary, setSalary] = useState<any>(0);

	const onChangeStatus = (status: string, dataSent: any) => {
		setLoading(true);
		changeCandidateStatus(
			(data as string).split(";")[1],
			user.id_user,
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
				setUser({ ...user, status: status, data: dataSent });
				setMessageVisible(true);
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

	const onRejectCandidate = () => {
		onChangeStatus(AvailableStatus.CANCELADO, undefined);
	};

	const onAceptResult = () => {
		onChangeStatus(AvailableStatus.TERMINADO, undefined);
	};

	const onRejectResult = () => {
		onChangeStatus(AvailableStatus.EN_PROCESO, undefined);
	};

	return (
		<Layout back>
			<View style={GeneralStyles.centeredVertical}>
				{user && !fetching ? (
					<>
						<ThemedText type="title" style={FormsStyles.formTitle}>
							{job.title} - {user.status}
						</ThemedText>
						<View>
							{user.status == AvailableStatus.PENDIENTE ? (
								<View style={GeneralStyles.centeredVertical}>
									<ThemedText type="default">
										{rejectCotization
											? "proponiendo una cotización"
											: "Esperando a que el usuario proponga una cotización"}
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
											text="Rechazar Candidato"
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
											? "Propone una cotización"
											: user.data?.proposer_id ===
											  userData.id_user
											? "Esperando a que el usuario acepte la cotización que propusiste"
											: "El usuario esta esperando a que aceptes su cotización"}
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
											text="Rechazar Candidato"
											loading={loading}
											onPress={onRejectCandidate}
											primaryColor={
												APP_VALUES.colors.error
											}
										/>
									</View>
								</View>
							) : user.status == AvailableStatus.TERMINADO ? (
								<View style={GeneralStyles.centeredVertical}>
									<ThemedText type="default">
										Completado, recuerda calificar al
										candidato
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
								</View>
							) : user.status == AvailableStatus.EN_REVISION ? (
								<View style={GeneralStyles.centeredVertical}>
									<IconText
										icon="check"
										text="EL usuario esta esperando que confirmes la terminación del acuerdo"
										margin={sizeNormalizer * 5}
									/>
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
											text="Aceptar respuesta"
											loading={loading}
											onPress={onAceptResult}
										/>
										<AuthButton
											text="Rechazar respuesta"
											loading={loading}
											onPress={onRejectResult}
											primaryColor={
												APP_VALUES.colors.error
											}
										/>
									</View>
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
