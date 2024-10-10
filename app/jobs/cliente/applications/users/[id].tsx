import { valorateUser } from "@/api/Jobs/User";
import { getJobApplicans } from "@/api/Jobs/getJobs";
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
import { View, Image } from "react-native";
import { AirbnbRating } from "react-native-ratings";

interface UserViewProps {}

const UserView: FunctionComponent<UserViewProps> = () => {
	const { setMessage, setMessageVisible, userData } = useRootStore();
	const [loading, setLoading] = useState(false);
	const { id } = useLocalSearchParams();
	const [fetching, setFetching] = useState(true);
	const [applicants, setApplicants] = useState<any[]>([]);
	const [valoration, setValoration] = useState(0);

	useEffect(() => {
		getJobApplicans((id as string).split(";")[1])
			.then((res) => {
				setApplicants(res);
				setFetching(false);
			})
			.catch((err) => {
				setFetching(false);
				setApplicants([]);
			});
	}, [id]);

	const [user, setUser] = useState<any>();

	useEffect(() => {
		setUser(
			applicants.find(
				(user: any) => user.id_user === (id as string).split(";")[0]
			)
		);
	}, [applicants]);

	const [valorations, setValorations] = useState({
		amount: 0,
		average: 0,
	});
	useEffect(() => {
		if (user && user.valorations && user.valorations.length > 0) {
			//calculate valorations
			let average = 0;
			user.valorations.forEach((valoration: any) => {
				average += valoration.rate / user.valorations.length;
			});
			setValorations({ amount: user.valorations.length, average });

			//get if user has already valorated
			const myValoration = user.valorations.find(
				(valoration: any) => valoration.user_id === userData.id
			);

			if (myValoration) {
				setValoration(myValoration);
			}
		}
	}, [user]);

	const onValoration = () => {
		setLoading(true);
		valorateUser((id as string).split(";")[0], valoration).then(() => {
			setMessage({
				title: "Valorado",
				message: "Usuario valorado",
			});
			setMessageVisible(true);
			setUser({
				...user,
				valorations: [
					...user?.valorations,
					{
						user_id: userData.id,
						rate: valoration,
					},
				],
			});
			setLoading(false);
		}).catch((err) => {
			setLoading(false);
			setMessage({
				title: "Error",
				message: err.message,
			});
			setMessageVisible(true);
		})
	};

	return (
		<Layout back>
			<View>
				{user && !fetching ? (
					<View
						style={[
							GeneralStyles.centeredVertical,
							{
								paddingHorizontal: windowWidth * 0.05,
							},
						]}
					>
						{/* Mostrar la imagen si empieza con "http" */}
						{user.image?.startsWith("http") && (
							<Image
								source={{ uri: user.image }}
								style={{
									width: sizeNormalizer * 100,
									height: sizeNormalizer * 100,
									borderRadius: sizeNormalizer * 50, // Para hacerlo redondeado
									alignSelf: "center",
									marginBottom: sizeNormalizer * 20,
								}}
							/>
						)}

						<ThemedText type="title" style={FormsStyles.formTitle}>
							{user.name}
						</ThemedText>

						<View>
							<View style={JobsGenerals.JobInformationItem}>
								<IconText
									icon="account"
									text="Correo"
									margin={sizeNormalizer * 5}
								/>
								<ThemedText type="default">
									{user.email}
								</ThemedText>
							</View>

							<View style={JobsGenerals.JobInformationItem}>
								<IconText
									icon="card-text"
									text="Descripción"
									margin={sizeNormalizer * 5}
								/>
								<ThemedText type="default">
									{user.description}
								</ThemedText>
							</View>

							<View style={JobsGenerals.JobInformationItem}>
								<IconText
									icon="card-account-details"
									text="Tipo de documento"
									margin={sizeNormalizer * 5}
								/>
								<ThemedText type="default">
									{user.document_type}
								</ThemedText>
							</View>

							<View style={JobsGenerals.JobInformationItem}>
								<IconText
									icon="card-text"
									text="Documento"
									margin={sizeNormalizer * 5}
								/>
								<ThemedText type="default">
									{user.document}
								</ThemedText>
							</View>

							<View style={JobsGenerals.JobInformationItem}>
								<IconText
									icon="phone"
									text="Teléfono"
									margin={sizeNormalizer * 5}
								/>
								<ThemedText type="default">
									{user.phone}
								</ThemedText>
							</View>

							<View style={JobsGenerals.JobInformationItem}>
								<IconText
									icon="calendar-month"
									text="Fecha de creación"
									margin={sizeNormalizer * 5}
								/>
								<ThemedText type="default">
									{user.created_at}
								</ThemedText>
							</View>

							<View style={JobsGenerals.JobInformationItem}>
								<IconText
									icon="briefcase"
									text="Servicios"
									margin={sizeNormalizer * 5}
								/>
								<UnorderedList items={user.services} />
							</View>

							<View style={JobsGenerals.JobInformationItem}>
								<IconText
									icon="tag"
									text="Categorías"
									margin={sizeNormalizer * 5}
								/>
								<UnorderedList items={user.categories} />
							</View>
						</View>

						<View style={JobsGenerals.JobInformationItem}>
							<IconText
								icon="star"
								text={
									"Calificacion (" +
									valorations.amount +
									" valoraciones)"
								}
								margin={sizeNormalizer * 5}
							/>
							<AirbnbRating
								count={5}
								reviews={[
									"Peor",
									"Pobre",
									"Regular",
									"Buena",
									"Excelente",
								]}
								defaultRating={valorations.average}
								size={sizeNormalizer * 30}
								onFinishRating={(valoration) =>
									setValoration(valoration)
								}
							/>
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
								text="Calificar Usuario"
								loading={loading}
								onPress={onValoration}
							/>
						</View>
					</View>
				) : (
					<Loader />
				)}
			</View>
		</Layout>
	);
};

export default UserView;
