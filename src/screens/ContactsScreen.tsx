import AgendaMultiuso from "../components/AgendaMultiuso/AgendaMultiuse";
import StyledButton from "../components/UI/StyledButton";
import StyledContainer from "../components/UI/StyledContainer";
import { View, Text, FlatList, StyleSheet, ListRenderItem } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/RootStackPrams";
import { useNavigation } from "@react-navigation/native";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../shared/context/authContext/authContext";
import { ContactModel } from "../domain/contacts";
import contactsServices from "../shared/services/contacts-services";
import Contact from "../components/Contacts/Contact";
import { DefaultStyles } from "../styles";

const ContactsScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [contacts, setContacts] = useState<ContactModel[]>([]);
  const [updateState, setUpdateState] = useState<number>(1);
  const forceUpdate = () => setUpdateState((n) => n + 1);

  const { userId, logout } = useContext(AuthContext);

  const logoutHandler = () => {
    logout();
    navigation.navigate("Home");
  };

  const navigateToNewContactScreen = () => {
    navigation.navigate("NewContact");
  };

  async function getContacts() {
    contactsServices.getAllContacts(userId!).then((data) => {
      setContacts(data);
    });
  }

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      getContacts();
    });

    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    getContacts();
  }, [updateState]);

  const renderContacts: ListRenderItem<ContactModel> = ({ item }) => {
    return <Contact contact={item} forceUpdate={forceUpdate} />;
  };

  return (
    <StyledContainer>
      <AgendaMultiuso />
      <View style={styles.contactsContainer}>
        {contacts.length > 0 && (
          <FlatList
            data={contacts}
            renderItem={renderContacts}
            keyExtractor={(item) => item.id}
          />
        )}

        {contacts.length === 0 && (
          <>
            <Text style={styles.text}>Nenhum contato encontrado.</Text>
            <Text style={styles.text}>Adicione um novo contato!</Text>
          </>
        )}
      </View>
      <StyledButton
        style={[styles.button, { bottom: 100 }]}
        title="Adicionar Contato"
        onPressHandler={navigateToNewContactScreen}
      />
      <StyledButton
        style={[styles.button, { bottom: 10 }]}
        title="Sair"
        onPressHandler={logoutHandler}
      />
    </StyledContainer>
  );
};

const styles = StyleSheet.create({
  button: {
    alignSelf: "center",
    position: "absolute",
  },
  link: {
    textDecorationLine: "underline",
    alignSelf: "center",
    position: "absolute",
    bottom: 70,
  },
  contactsContainer: {
    backgroundColor: "white",
    padding: 5,
    height: 320,
    paddingLeft: 20,
    paddingRight: 20,
  },
  text: {
    alignSelf: "center",
    color: DefaultStyles.PrymaryColor,
    fontFamily: DefaultStyles.FontFamily,
    fontWeight: "bold",
    fontSize: 20,
    marginBottom: 5,
  },
});

export default ContactsScreen;
