import Toast from "react-native-toast-message";

import AuthContextProvider from "./src/shared/context/authContext/authContextProvider";
import AppNav from "./src/navigation/appNav";

const App = () => {
  return (
    <AuthContextProvider>
      <AppNav />
      <Toast />
    </AuthContextProvider>
  );
};

export default App;
