import { View, Text, TextInput, StyleSheet } from "react-native";
import { DefaultStyles } from "../../styles";

type StyledTextInputProps = {
  label: string;
  placeHolder: string;
  onChangeTextHandler: (text: string) => void;
  errors?: any;
  secureTextEntry?: boolean;
};

const StyledTextInput = ({
  label,
  placeHolder,
  errors,
  onChangeTextHandler,
  secureTextEntry,
}: StyledTextInputProps) => {
  const styles = StyleSheet.create({
    container: {
      height: "fit-content",
      marginBottom: errors ? 10 : 20,
    },
    text: {
      fontFamily: DefaultStyles.FontFamily,
      color: DefaultStyles.PrymaryColor,
      fontSize: 15,
      marginBottom: 5,
    },
    textInput: {
      fontFamily: DefaultStyles.FontFamily,
      backgroundColor: "white",
      color: "grey",
      borderRadius: 5,
      padding: 10,
    },
    textError: {
      color: "red",
      fontSize: 10,
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{label}</Text>
      <TextInput
        style={styles.textInput}
        placeholder={placeHolder}
        keyboardType="default"
        onChangeText={onChangeTextHandler}
        secureTextEntry={secureTextEntry}
      />
      {errors && <Text style={styles.textError}>{errors.message}</Text>}
    </View>
  );
};

export default StyledTextInput;
