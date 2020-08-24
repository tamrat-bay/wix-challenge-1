import React, { useContext } from "react";
import FacebookLogin from "react-facebook-login";
import axios from "axios";
import { Redirect,  useHistory } from "react-router-dom";
import { AuthContext } from "../../../contexts/auth.context";

interface IUserData {
  fbUserID: string;
  name: string;
  token:string;
  authType:string;
}
interface ILoginWithFacebook{
  btnText:string;
}
const LoginWithFacebook: React.FC<ILoginWithFacebook> = ({btnText}) => {
    const { user, dispatch } = useContext(AuthContext);
    const history = useHistory();

  const authFacebookUser = (userData: IUserData) => {
    dispatch({type: "loading"})
    axios({
      method: "post",
      url: `/users/${userData.authType}`,
      data: userData,
      headers: {
        Authorization: `Bearer ${userData.token}`,
        fbUserID: userData.fbUserID
      },
    })
      .then(async (res) => {
        if (res.status === 200 || res.status === 201) {
         await localStorage.setItem("user", JSON.stringify({...res.data,token: userData.token}));          
          dispatch({type: "loggedIn"})
          history.push('/carsboard')
        }
      })
      .catch((err) => console.log(err.response.data));
  };

 type FacebookResponse = { status: string; userID: string ; name: string; accessToken: string; }

  const responseFacebook = (response: FacebookResponse) => {
    if (response.status !== "unknown") {
      const { userID, name, accessToken  } = response;
      const userData = { fbUserID: userID, name, token: accessToken , authType: 'facebook' };
      authFacebookUser(userData);
    }
  };

  if (user.isLoggedIn) return <Redirect to="/" />;

  return (
    <div>
      <FacebookLogin
        textButton={btnText} 
        appId="392408751721540"
        fields="name,email,picture"
        callback={responseFacebook}
        isMobile={false}      
      />
    </div>
  );
};

export default LoginWithFacebook;
