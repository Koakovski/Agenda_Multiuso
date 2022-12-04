import { StyleSheet, View } from "react-native";
import { DefaultStyles } from "../../styles";

type StyledContainerProps = {
  children: JSX.Element | JSX.Element[];
};

const StyledContainer = ({ children }: StyledContainerProps) => {
  return (
    <View style={styles.externalContainer}>
      <View style={styles.innerContainer}>{children}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  externalContainer: {
    flex: 1,
    backgroundColor: DefaultStyles.PrymaryColor,
    padding: 10,
  },
  innerContainer: {
    flex: 1,
    backgroundColor: DefaultStyles.BackgroundColor,
  },
});

export default StyledContainer;
