import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { View, StyleSheet } from "react-native";
import StyledTextInput from "../components/Forms/StyledTextInput";
import StyledContainer from "../components/UI/StyledContainer";
import { RootStackParamList } from "../navigation/RootStackPrams";
import * as yup from "yup";
import { nameValidation, phoneNumberValidation } from "../shared/validations";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useContext, useEffect } from "react";
import StyledButton from "../components/UI/StyledButton";
import AgendaMultiuso from "../components/AgendaMultiuso/AgendaMultiuse";
import contactsServices from "../shared/services/contacts-services";
import AuthContext from "../shared/context/authContext/authContext";
import { ContactModel } from "../domain/contacts";

import Toast from "react-native-toast-message";

type ContactRegistrationModel = {
  name: string;
  phoneNumber: string;
};

const yupSchema = yup
  .object({
    ...nameValidation,
    ...phoneNumberValidation,
  })
  .required();

const NewContactScreen = () => {
  const { userId } = useContext(AuthContext);
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactRegistrationModel>({
    resolver: yupResolver(yupSchema),
  });

  useEffect(() => {
    register("name");
    register("phoneNumber");
  }, [register]);

  const onSubmitHandler = handleSubmit((data) => {
    const createContactBody: Omit<ContactModel, "id"> = {
      name: data.name,
      phone: data.phoneNumber,
    };
    contactsServices
      .createContact(userId!, createContactBody)
      .then(() => {
        Toast.show({
          type: "success",
          text1: "Contato adicionado com sucesso!",
          onPress: () => {
            Toast.hide();
          },
        });
        navigateContactsPage();
      })
      .catch((error) => {
        console.log(error);
      });
  });

  const navigateContactsPage = () => {
    navigation.navigate("Contacts");
  };

  return (
    <StyledContainer>
      <AgendaMultiuso />
      <View style={styles.form}>
        <StyledTextInput
          label="Nome:"
          placeHolder="Nome do Contato..."
          onChangeTextHandler={(text) => setValue("name", text)}
          errors={errors.name}
        />
        <StyledTextInput
          label="Telefone:"
          placeHolder="Telefone do Contato..."
          onChangeTextHandler={(text) => setValue("phoneNumber", text)}
          errors={errors.phoneNumber}
        />
        <StyledButton
          title="Adicionar Contato"
          style={styles.button}
          onPressHandler={onSubmitHandler}
        />
      </View>
    </StyledContainer>
  );
};

const styles = StyleSheet.create({
  form: {
    width: "100%",
    height: "fill",
    padding: 10,
  },
  button: {
    alignSelf: "center",
  },
});

export default NewContactScreen;
