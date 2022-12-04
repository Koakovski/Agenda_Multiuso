import StyledContainer from "../components/UI/StyledContainer";
import { Text, View, StyleSheet } from "react-native";
import AgendaMultiuso from "../components/AgendaMultiuso/AgendaMultiuse";
import { DefaultStyles } from "../styles";
import StyledButton from "../components/UI/StyledButton";
import { useContext, useEffect, useState } from "react";
import userServices from "../shared/services/user-services";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/RootStackPrams";
import { UserModel } from "../domain/user";
import * as yup from "yup";

import Toast from "react-native-toast-message";
import StyledTextInput from "../components/Forms/StyledTextInput";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import AuthContext from "../shared/context/authContext/authContext";
import { emailValidation, passwordValidation } from "../shared/validations";

type UserLoginModel = {
  email: string;
  password: string;
};

const yupSchema = yup
  .object({
    ...emailValidation,
    ...passwordValidation,
  })
  .required();

const LoginScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [isLoading, setIsloading] = useState<boolean>(true);
  const [users, setUsers] = useState<UserModel[]>([]);

  const authContext = useContext(AuthContext);

  const navigateToHomePage = () => {
    navigation.navigate("Home");
  };

  useEffect(() => {
    async function loadUsers() {
      const users = await userServices.loadUsers();
      return users;
    }

    loadUsers()
      .then((users) => {
        setUsers(users);
        setIsloading(false);
      })
      .catch(() => {
        Toast.show({
          type: "error",
          text1: "Error no servidor!",
          text2: "Tente novamente mais tarde.",
          onPress: () => {
            Toast.hide();
          },
        });

        navigateToHomePage();
      });
  }, []);

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<UserLoginModel>({
    resolver: yupResolver(yupSchema),
  });

  useEffect(() => {
    register("email");
    register("password");
  }, [register]);

  const onSubmitHandler = handleSubmit((data) => {
    const user = users.find((user) => user.email === data.email);
    if (!user) {
      Toast.show({
        type: "error",
        text1: "Email não existe no sistema!",
        onPress: () => {
          Toast.hide();
        },
      });
      return;
    }

    if (user.password !== data.password) {
      Toast.show({
        type: "error",
        text1: "Senha incorreta!",
        onPress: () => {
          Toast.hide();
        },
      });
      return;
    }

    authContext.login(user.id);
    navigateToHomePage();
    Toast.show({
      type: "success",
      text1: "Seja Bem-Vindo(a)!",
      onPress: () => {
        Toast.hide();
      },
    });
  });
  return (
    <StyledContainer>
      <AgendaMultiuso />
      <View style={styles.header}>
        <Text>
          <Text style={styles.headerText}>LOGIN</Text>
        </Text>
      </View>
      <View style={styles.form}>
        <StyledTextInput
          label="Email:"
          placeHolder="Seu email..."
          onChangeTextHandler={(text) => setValue("email", text)}
          errors={errors.email}
        />
        <StyledTextInput
          label="Senha:"
          placeHolder="Sua senha..."
          onChangeTextHandler={(text) => setValue("password", text)}
          errors={errors.password}
          secureTextEntry
        />
        <StyledButton
          title="Entrar"
          style={styles.button}
          onPressHandler={onSubmitHandler}
          disabled={isLoading}
        />
      </View>
    </StyledContainer>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: "white",
    width: "100%",
    height: "10%",
    alignItems: "center",
    justifyContent: "center",
  },
  headerText: {
    color: DefaultStyles.PrymaryColor,
    fontFamily: DefaultStyles.FontFamily,
    fontSize: 20,
    fontWeight: "bold",
  },
  form: {
    width: "100%",
    height: "fill",
    padding: 10,
  },
  button: {
    alignSelf: "center",
  },
});

export default LoginScreen;
