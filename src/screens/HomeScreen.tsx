import AgendaMultiuso from "../components/AgendaMultiuso/AgendaMultiuse";
import StyledButton from "../components/UI/StyledButton";
import StyledContainer from "../components/UI/StyledContainer";
import { Text, StyleSheet } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/RootStackPrams";
import { useNavigation } from "@react-navigation/native";

const HomeScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const navigateToSignupScreen = () => {
    navigation.navigate("Signup");
  };

  const navigateToLoginScreen = () => {
    navigation.navigate("Login");
  };

  return (
    <StyledContainer>
      <AgendaMultiuso />
      <StyledButton
        style={styles.button}
        title="Login"
        onPressHandler={navigateToLoginScreen}
      />
      <Text onPress={navigateToSignupScreen} style={styles.link}>
        Novo aqui? Criar conta.
      </Text>
    </StyledContainer>
  );
};

const styles = StyleSheet.create({
  button: {
    alignSelf: "center",
    position: "absolute",
    bottom: 100,
  },
  link: {
    textDecorationLine: "underline",
    alignSelf: "center",
    position: "absolute",
    bottom: 70,
  },
});

export default HomeScreen;
