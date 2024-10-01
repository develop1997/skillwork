import { APP_VALUES } from "@/assets/styles/GeneralStyles";
import { FunctionComponent } from "react";
import { ActivityIndicator } from "react-native-paper";

interface LoaderProps {}

const Loader: FunctionComponent<LoaderProps> = () => {
	return (
		<ActivityIndicator
			animating={true}
			color={APP_VALUES.colors.secondary}
		/>
	);
};

export default Loader;
