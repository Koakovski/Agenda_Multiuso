import { View, ActivityIndicator } from "react-native";

const StyledActivityIndicator = () => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator size="large" />
    </View>
  );
};

export default StyledActivityIndicator;
