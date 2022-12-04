import { Text, StyleSheet } from "react-native";
import { DefaultStyles } from "../../styles";

const AgendaMultiuso = () => {
  return <Text style={styles.title}>Agenda{"\n"}Multiuso</Text>;
};

const styles = StyleSheet.create({
  title: {
    textAlign: "center",
    fontFamily: DefaultStyles.FontFamily,
    fontWeight: "bold",
    fontSize: 45,
    color: "#42423e",
    marginTop: 30,
    marginBottom: 20,
  },
});

export default AgendaMultiuso;
