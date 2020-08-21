import React, { createContext, useReducer } from "react";
import authReducer from "../reducers/auth.reducer";
import { ILoginState } from "../models/ILoginState";

const isLoggedIn = localStorage.user ? true : false;
const authType: string = isLoggedIn ? JSON.parse(localStorage.user).authType : '';
const fbUserID: string = isLoggedIn ? JSON.parse(localStorage.user).fbUserID : '';

const initialState: ILoginState = {
  name: "",
  fbUserID: fbUserID,
  isLoading: false,
  authType: authType,
  isLoggedIn: isLoggedIn,
};

export const AuthContext: React.Context<any> = createContext(initialState); //try this {} as ILoginState

export const AuthProvider = (props: { children: React.ReactNode }) => {
  const [user, dispatch] = useReducer(authReducer, initialState);

  return (
    <AuthContext.Provider value={{ user, dispatch }}>
      {props.children}
    </AuthContext.Provider>
  );
};
