import React, { useContext } from "react";
import FacebookLogin from "react-facebook-login";
import axios from "axios";
import { Redirect } from "react-router-dom";
import { AuthContext } from "../../../contexts/auth.context";

interface IUserData {
  fbUserID: string;
  name: string;
  token:string;
  authType:string;
}

const LoginWithFacebook: React.FC = () => {
    const { user, dispatch } = useContext(AuthContext);

  const checkIfUserExistsInDB = (userData: IUserData, response: any) => {
    axios({
      method: "post",
      url: `/users/viafacebook`,
      data: userData,
      headers: {
        Authorization: `Bearer ${userData.token}3`,
        fbUserID: userData.fbUserID
      },
    })
      .then((res) => {
        if (res.status === 200 || res.status === 201) {
          localStorage.setItem("user", JSON.stringify({...res.data,token: userData.token}));
          dispatch({type: "loggedIn"})
        }
      })
      .catch((err) => console.log(err.response.data));
  };

  const componentClicked = (data: any) => {
  };

  const responseFacebook = (response: any) => {
    if (response.status !== "unknown") {
      const { userID, name, accessToken  } = response;
      checkIfUserExistsInDB({ fbUserID:userID, name, token :accessToken , authType: 'facebook' }, response);
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
