import { ExternalLink } from "@/components/ExternalLink";
import { Text, View } from "react-native";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Edit app/index.tsx to edit this screen.
        <ExternalLink href="+not-found" style={{ color: "blue" }}>Learn more</ExternalLink>
      </Text>
    </View>
  );
}
