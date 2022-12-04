import { Text, TouchableOpacity, StyleSheet, StyleProp, ViewStyle } from "react-native";
import { DefaultStyles } from "../../styles";

type StyledButtonProps = {
  title: string;
  onPressHandler: () => void;
  style?: StyleProp<ViewStyle>;
  disabled?: boolean;
};

const StyledButton = ({ onPressHandler, title, style, disabled }: StyledButtonProps) => {
  const styles = StyleSheet.create({
    button: {
      padding: 20,
      backgroundColor: disabled ? "grey" : DefaultStyles.SecondaryColor,
      alignItems: "center",
      width: 200,
      borderRadius: 20,
    },
    shadow: {
      shadowColor: "#171717",
      shadowOffset: { width: 2, height: 4 },
      shadowOpacity: 0.2,
      shadowRadius: 3,
    },
    text: {
      fontSize: 20,
      fontFamily: DefaultStyles.FontFamily,
      fontWeight: "bold",
      color: DefaultStyles.PrymaryColor,
    },
  });

  const touchableOpacityStyle = [styles.button, styles.shadow];

  return (
    <TouchableOpacity
      disabled={disabled || false}
      style={[touchableOpacityStyle, style]}
      onPress={onPressHandler}
    >
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

export default StyledButton;
