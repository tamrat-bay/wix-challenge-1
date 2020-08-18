import React, { createContext, useReducer, useState } from "react";
import authReducer from "../reducers/auth.reducer";
import { ILoginState } from "../models/ILoginState";

let isLoggedIn = localStorage.getItem("user") ? true : false;

const initialState: ILoginState = {
  name: "",
  userID: "",
  isLoading: false,
  authType: "",
  isLoggedIn: isLoggedIn,
};

export const AuthContext: React.Context<any> = createContext(initialState);

export const AuthProvider = (props: { children: React.ReactNode }) => {
  const [user, dispatch] = useReducer(authReducer, initialState);

  return (
    <AuthContext.Provider value={{ user, dispatch }}>
      {props.children}
    </AuthContext.Provider>
  );
};
