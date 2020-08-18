import React, { useContext } from "react";
import FacebookLogin from "react-facebook-login";
import axios from "axios";
import { Redirect } from "react-router-dom";
import { AuthContext } from "../../../contexts/auth.context";

interface IUserData {
  userID: string;
  name: string;
  accessToken:string;
  authType:string;
}

const LoginWithFacebook: React.FC = () => {
    const { user, dispatch } = useContext(AuthContext);

  const checkIfUserExistsInDB = (userData: IUserData, response: any) => {
    axios
      .post("/users/viafacebook", userData)
      .then((res) => {
        if (res.status === 200 || res.status === 201) {
          console.log("res data", res.data);
          localStorage.setItem("user", JSON.stringify(res.data));
          dispatch({type: "loggedIn"})
        }
      })
      .catch((err) => console.log(err));
  };

  const componentClicked = (data: any) => {
    console.log("data", data);
  };

  const responseFacebook = (response: any) => {
    if (response.status !== "unknown") {
      const { userID, name, accessToken }: IUserData = response;
      checkIfUserExistsInDB({ userID, name, accessToken, authType: 'facebook' }, response);
    }
  };

  if (user.isLoggedIn) return <Redirect to="/" />;

  return (
    <div>
      <FacebookLogin
        appId="392408751721540"
        autoLoad={false}
        fields="name,email,picture"
        onClick={componentClicked}
        callback={responseFacebook}
      />
    </div>
  );
};

export default LoginWithFacebook;
