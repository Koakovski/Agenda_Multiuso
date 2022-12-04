import { createContext } from "react";

export type authContextState = {
  isLoading: boolean;
  userId: null | string;
  login: (userId: string) => void;
  logout: () => void;
};

export const initialAuthState: authContextState = {
  isLoading: false,
  userId: null,
  login: (userId: string) => {},
  logout: () => {},
};

const AuthContext = createContext(initialAuthState);

export default AuthContext;
