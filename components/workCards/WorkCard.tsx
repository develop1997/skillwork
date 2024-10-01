import { FunctionComponent } from "react";
import { View } from "react-native";
import { Button, Text } from "react-native-paper";
import { Path, Svg } from "react-native-svg";
import { WorkCardStyles as styles } from "./WorkCardStyles";
import { APP_VALUES } from "@/assets/styles/GeneralStyles";

export class AvailableStatus {
	static readonly EN_PROCESO = "En Proceso";
	static readonly TERMINADO = "Terminado";
	static readonly CANCELADO = "Cancelado";
	static readonly EN_REVISION = "En Revision";
	static readonly PENDIENTE = "Pendiente";
}

const statusColors = {
	[AvailableStatus.EN_PROCESO]: "#0FA5EA",
	[AvailableStatus.TERMINADO]: "#2CF432",
	[AvailableStatus.CANCELADO]: "#EA0F0F",
	[AvailableStatus.EN_REVISION]: "#EA720F",
	[AvailableStatus.PENDIENTE]: "#CEF21B",
};

interface WorkCardProps {
	status?:
		| "En Proceso"
		| "Terminado"
		| "Cancelado"
		| "En Revision"
		| "Pendiente";
	title?: string;
	content?: string;
	onPress?: () => void;
}

const WorkCard: FunctionComponent<WorkCardProps> = ({
	status,
	title,
	content,
	onPress,
}) => {
	return (
		<View style={styles.deformedBox}>
			<Svg
				height="100%"
				width="100%"
				viewBox="0 0 26 17"
				preserveAspectRatio="none"
			>
				<Path
					d="M 0 0 L 0 16 C 0 16 0 17 1 17 L 25 17 C 26 17 26 16 26 16 L 26 4 C 26 4 26 3 25 3 L 1 0 C 0 0 0 1 0 1"
					fill={APP_VALUES.colors.secondaryLight}
				/>
			</Svg>
			<View style={styles.content}>
				<Text
					style={styles.title}
					numberOfLines={1}
					ellipsizeMode="tail"
				>
					{title}
				</Text>
				<View style={styles.textContainer}>
					<Text
						style={[
							styles.text,
							{
								width: status ? "85%" : "100%",
							},
						]}
						numberOfLines={2}
						ellipsizeMode="tail"
					>
						{content}
					</Text>
					{status && (
						<View
							style={[
								styles.status,
								{
									backgroundColor: statusColors[status],
								},
							]}
						></View>
					)}
				</View>
				<Button
					mode="contained"
					style={styles.button}
					textColor={APP_VALUES.colors.text}
					onPress={onPress}
				>
					Ver más
				</Button>
			</View>
		</View>
	);
};

export default WorkCard;
