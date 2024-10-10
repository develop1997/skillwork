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

const UserJobStatusView: FunctionComponent<UserViewProps> = () => {
	const { setMessage, setMessageVisible, userData } = useRootStore();
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

	useEffect(() => {
		setUser(
			applicants.find(
				(user: any) => user.id_user === (data as string).split(";")[0]
			)
		);
	}, [applicants]);

	return (
		<Layout back>
			<View>{user && !fetching ? <></> : <Loader />}</View>
		</Layout>
	);
};

export default UserJobStatusView;
