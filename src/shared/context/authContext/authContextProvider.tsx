import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import AuthContext, { authContextState } from "./authContext";

type AuthContextProps = {
  children: JSX.Element | JSX.Element[];
};

const AuthContextProvider = ({ children }: AuthContextProps) => {
  const [userId, setUserId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    async function retrieveUserId() {
      try {
        setIsLoading(true);
        const storedUserId = await AsyncStorage.getItem("userId");
        setUserId(storedUserId);
        setIsLoading(false);
      } catch (e) {
        console.log(e);
      }
    }

    retrieveUserId();
  }, []);

  const loginHandler = (userId: string) => {
    setIsLoading(true);
    AsyncStorage.setItem("userId", userId);
    setUserId(userId);
    setIsLoading(false);
  };

  const logoutHandler = () => {
    setIsLoading(true);
    AsyncStorage.removeItem("userId");
    setUserId(null);
    setIsLoading(false);
  };

  const authContext: authContextState = {
    isLoading,
    userId,
    login: loginHandler,
    logout: logoutHandler,
  };

  return (
    <AuthContext.Provider value={authContext}>{children}</AuthContext.Provider>
  );
};

export default AuthContextProvider;
