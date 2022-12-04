import AgendaMultiuso from "../components/AgendaMultiuso/AgendaMultiuse";
import StyledContainer from "../components/UI/StyledContainer";
import { useEffect, useState } from "react";
import { Text, StyleSheet, View } from "react-native";
import { DefaultStyles } from "../styles";
import StyledTextInput from "../components/Forms/StyledTextInput";
import StyledButton from "../components/UI/StyledButton";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  confirmPasswordValidation,
  emailValidation,
  nameValidation,
  passwordValidation,
} from "../shared/validations";
import userServices from "../shared/services/user-services";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/RootStackPrams";
import { ContactModel } from "../domain/contacts";
import { UserModel } from "../domain/user";

import Toast from "react-native-toast-message";

type UserRegistrationModel = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const yupSchema = yup
  .object({
    ...nameValidation,
    ...emailValidation,
    ...passwordValidation,
    ...confirmPasswordValidation,
  })
  .required();

const SignupScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [isLoading, setIsloading] = useState<boolean>(true);
  const [users, setUsers] = useState<UserModel[]>([]);

  const navigateToHomePage = () => {
    navigation.navigate("Home");
  };

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<UserRegistrationModel>({
    resolver: yupResolver(yupSchema),
  });

  useEffect(() => {
    register("name");
    register("email");
    register("password");
    register("confirmPassword");
  }, [register]);

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

  const onSubmitHandler = handleSubmit((data) => {
    if (users.some((user) => user.email === data.email)) {
      Toast.show({
        type: "error",
        text1: "Email em uso!",
        onPress: () => {
          Toast.hide();
        },
      });
      return;
    }

    const createUserBody: Omit<UserModel, "id"> = {
      name: data.name,
      email: data.email,
      password: data.password,
    };

    userServices
      .createUser(createUserBody)
      .then(() => {
        navigateToHomePage();
      })
      .catch((error) => {
        console.log(error);
      });
  });

  return (
    <StyledContainer>
      <AgendaMultiuso />
      <View style={styles.header}>
        <Text>
          <Text style={styles.headerText}>CADASTRO</Text>
        </Text>
      </View>
      <View style={styles.form}>
        <StyledTextInput
          label="Nome:"
          placeHolder="Seu nome..."
          onChangeTextHandler={(text) => setValue("name", text)}
          errors={errors.name}
        />
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
        <StyledTextInput
          label="Confirmar Senha:"
          placeHolder="Confirmar senha..."
          onChangeTextHandler={(text) => setValue("confirmPassword", text)}
          errors={errors.confirmPassword}
          secureTextEntry
        />
        <StyledButton
          title="Cadastrar"
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

export default SignupScreen;
