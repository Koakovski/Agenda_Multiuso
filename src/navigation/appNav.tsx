import { NavigationContainer } from "@react-navigation/native";

import AppStack from "./appStack";
import AuthStack from "./authStack";

import { useContext } from "react";
import AuthContext from "../shared/context/authContext/authContext";

import StyledActivityIndicator from "../components/UI/StyledActivityIndicator";

const AppNav = () => {
  const authCtx = useContext(AuthContext);

  const { userId, isLoading} = authCtx;

  if(isLoading){
    return <StyledActivityIndicator/>
  }

  return (
    <NavigationContainer>
      {userId !== null ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default AppNav;
