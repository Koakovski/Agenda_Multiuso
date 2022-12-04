import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ContactsScreen from "../screens/ContactsScreen";
import NewContactScreen from "../screens/NewContactScreen";
import { RootStackParamList } from "./RootStackPrams";

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Contacts" component={ContactsScreen} />
      <Stack.Screen name="NewContact" component={NewContactScreen} />
    </Stack.Navigator>
  );
};

export default AppStack;
