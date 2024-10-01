import { APP_VALUES, GeneralStyles } from "@/assets/styles/GeneralStyles";
import { FunctionComponent, useState } from "react";
import { StatusBar, View } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { Button, Chip, Dialog, Portal } from "react-native-paper";
import BackHeaderButton from "@/components/BackAction";
import { FormsStyles } from "@/assets/styles/forms/FormsStyles";
import AuthInput from "@/components/StyledInput";
import AuthButton from "@/components/StyledButton";
import dayjs from "dayjs";
import DateTimePicker, { DateType } from "react-native-ui-datepicker";
import { IconText } from "@/components/IconText";
import { sizeNormalizer } from "@/assets/styles/normalizator";
import {
	GestureHandlerRootView,
	ScrollView,
} from "react-native-gesture-handler";
import { Entypo } from "@expo/vector-icons";
import { CreateJob } from "@/api/Jobs/Create";
import { isNumercic } from "@/utils/forms/validate";
import { useRootStore } from "@/store/RootStore";
import Layout from "@/components/Layout";

interface JobFormProps {}

const JobForm: FunctionComponent<JobFormProps> = () => {
	const { userJobs, setUserJobs } = useRootStore();

	const [data, setData] = useState({
		title: "",
		description: "",
		city: "",
		location: "",
		salary: "",
	});
	const [requisitos, setRequisitos] = useState<string[]>([]);
	const [date, setDate] = useState<DateType>(dayjs());

	const [requisito, setRequisito] = useState<string>("");
	const [loading, setLoading] = useState(false);

	const { setMessage, setMessageVisible, setConfirmVisible } = useRootStore();

	const createJob = () => {
		setLoading(true);

		if (!data.title) {
			setMessage({
				title: "Error",
				message: "El tiúlo es requerido",
			});
			setMessageVisible(true);
			setLoading(false);
			return;
		}

		if (!data.description) {
			setMessage({
				title: "Error",
				message: "La descripción es requerida",
			});
			setMessageVisible(true);
			setLoading(false);
			return;
		}

		if (!data.city) {
			setMessage({
				title: "Error",
				message: "La ciudad es requerida",
			});
			setMessageVisible(true);
			setLoading(false);
			return;
		}

		if (!data.location) {
			setMessage({
				title: "Error",
				message: "La ubicación es requerida",
			});
			setMessageVisible(true);
			setLoading(false);
			return;
		}

		if (!data.salary || isNumercic(data.salary) === false) {
			setMessage({
				title: "Error",
				message: "El salário es requerido y debe ser numérico",
			});
			setMessageVisible(true);
			setLoading(false);
			return;
		}

		if (requisitos.length === 0) {
			setMessage({
				title: "Error",
				message: "Los requisitos son requeridos",
			});
			setMessageVisible(true);
			setLoading(false);
			return;
		}

		if (!date) {
			setMessage({
				title: "Error",
				message: "La fecha es requerida",
			});
			setMessageVisible(true);
			setLoading(false);
			return;
		}

		const job = {
			title: data.title,
			description: data.description,
			location: data.city + ", " + data.location,
			salary: data.salary,
			required_skills: requisitos,
			expired_at: date,
		};

		CreateJob(job)
			.then((res) => {
				setMessage({
					title: "Exito",
					message: "Oferta Creada Correctamente",
				});
				setMessageVisible(true);
				setLoading(false);
				setUserJobs([
					...userJobs,
					{
						...job,
						id_job: res,
						created_at: dayjs().format("YYYY-MM-DD"),
					},
				]);
				setData({
					title: "",
					description: "",
					city: "",
					location: "",
					salary: "",
				});
				setRequisitos([]);
				setRequisito("");
				setDate(dayjs());
			})
			.catch((err) => {
				setMessage({
					title: "Error",
					message: "Ocurrio un error al crear la Oferta",
				});
				setMessageVisible(true);
				console.log(err);
				setLoading(false);
			});
	};

	const handleDateChange = (params: any) => {
		const formattedDate = dayjs(params.date).format("YYYY-MM-DD");
		setDate(formattedDate);
	};

	return (
		<Layout back onConfirm={createJob}>
			<View style={FormsStyles.formCard}>
				<ThemedText type="title" style={FormsStyles.formTitle}>
					Crear Oferta
				</ThemedText>

				<View style={FormsStyles.formInput}>
					<AuthInput
						icon="format-title"
						placeholder="Titulo"
						value={data.title}
						onChangeText={(value) =>
							setData({ ...data, title: value })
						}
					/>
				</View>
				<View style={FormsStyles.formInput}>
					<AuthInput
						icon="briefcase"
						placeholder="Descripción"
						numberOfLines={4}
						value={data.description}
						onChangeText={(value) =>
							setData({ ...data, description: value })
						}
					/>
				</View>
				<View style={FormsStyles.formInput}>
					<AuthInput
						icon="check"
						placeholder="Requisito"
						value={requisito}
						onChangeText={(value) => setRequisito(value)}
					/>
				</View>
				<View
					style={[
						FormsStyles.formInput,
						{
							marginBottom: sizeNormalizer * 20,
						},
					]}
				>
					<AuthButton
						text="Añadir"
						onPress={() => {
							if (!requisitos.includes(requisito) && requisito)
								setRequisitos([...requisitos, requisito]);
							setRequisito("");
						}}
					/>
				</View>

				<View
					style={[
						GeneralStyles.horizontalWrap,
						{
							marginBottom: sizeNormalizer * 20,
						},
					]}
				>
					{requisitos &&
						requisitos.map((c) => (
							<Chip
								key={c}
								mode="outlined"
								textStyle={{
									fontSize: sizeNormalizer * 20,
								}}
								onClose={() => {
									setRequisitos(
										requisitos.filter((cc) => cc !== c)
									);
								}}
								closeIcon={() => (
									<Entypo
										name="cross"
										size={sizeNormalizer * 20}
										color={APP_VALUES.colors.text}
									/>
								)}
							>
								{c}
							</Chip>
						))}
				</View>
				<View style={FormsStyles.formInput}>
					<AuthInput
						icon="city"
						placeholder="Ciudad"
						value={data.city}
						onChangeText={(value) =>
							setData({ ...data, city: value })
						}
					/>
				</View>
				<View style={FormsStyles.formInput}>
					<AuthInput
						icon="map-marker"
						placeholder="Dirección"
						value={data.location}
						onChangeText={(value) =>
							setData({ ...data, location: value })
						}
					/>
				</View>
				<View style={FormsStyles.formInput}>
					<View style={GeneralStyles.vertical}>
						<IconText
							icon="calendar-month"
							text="Fecha limite"
							margin={sizeNormalizer * 5}
						/>

						<View style={FormsStyles.formDateInput}>
							<DateTimePicker
								mode="single"
								timePickerTextStyle={{
									color: APP_VALUES.colors.text,
								}}
								calendarTextStyle={{
									color: APP_VALUES.colors.text,
								}}
								headerContainerStyle={{
									backgroundColor: APP_VALUES.colors.tertiary,
								}}
								dayContainerStyle={{
									backgroundColor: APP_VALUES.colors.tertiary,
								}}
								yearContainerStyle={{
									backgroundColor: APP_VALUES.colors.tertiary,
								}}
								monthContainerStyle={{
									backgroundColor: APP_VALUES.colors.tertiary,
								}}
								minDate={dayjs().subtract(1, "day").toDate()}
								date={date}
								onChange={handleDateChange}
							/>
						</View>
					</View>
				</View>
				<View style={FormsStyles.formInput}>
					<AuthInput
						icon="cash"
						placeholder="Salario"
						value={data.salary}
						onChangeText={(value) =>
							setData({ ...data, salary: value })
						}
					/>
				</View>

				<AuthButton
					text="Crear"
					loading={loading}
					onPress={() => setConfirmVisible(true)}
				/>
			</View>
		</Layout>
	);
};

export default JobForm;
