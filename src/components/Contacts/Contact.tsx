import { useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import { ContactModel } from "../../domain/contacts";
import AuthContext from "../../shared/context/authContext/authContext";
import contactsServices from "../../shared/services/contacts-services";
import { DefaultStyles } from "../../styles";
import StyledButton from "../UI/StyledButton";

import Toast from "react-native-toast-message";

type ContactProps = {
  contact: ContactModel;
  forceUpdate: () => void;
};

const Contact = ({ contact, forceUpdate }: ContactProps) => {
  const { userId } = useContext(AuthContext);

  const { id, name, phone } = contact;

  const getFormatedPhone = () => {
    const areaCod = phone.slice(0, 2);
    const numberFirst = phone.slice(3, 7);
    const numberSecond = phone.slice(7);

    return `(${areaCod}) 9 ${numberFirst}-${numberSecond}`;
  };

  const deleteContactHandler = () => {
    contactsServices.deleteContact(userId!, id).then(() => {
      Toast.show({
        type: "success",
        text1: "Contato deletedo com sucesso!",
        onPress: () => {
          Toast.hide();
        },
      });
      forceUpdate();
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.text}>Nome: {name}</Text>
        <Text style={styles.text}>Telefone: {getFormatedPhone()}</Text>
      </View>
      <View style={styles.deleteButtonContainer}>
        <StyledButton
          title="X"
          style={styles.button}
          onPressHandler={deleteContactHandler}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 80,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: DefaultStyles.PrymaryColor,
    marginBottom: 5,
    flexDirection: "row",
  },
  textContainer: {
    flex: 0.7,
    padding: 5,
    flexDirection: "column",
    justifyContent: "center",
  },
  deleteButtonContainer: {
    flex: 0.3,
    padding: 5,
  },
  text: {
    color: DefaultStyles.PrymaryColor,
    fontFamily: DefaultStyles.FontFamily,
    fontWeight: "bold",
    fontSize: 15,
    marginBottom: 5,
  },
  button: {
    height: "100%",
    width: "100%",
    color: "red",
  },
});

export default Contact;
