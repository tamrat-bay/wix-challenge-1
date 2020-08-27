import React, { useContext } from "react";
import FacebookLogin from "react-facebook-login";
import { Redirect,  useHistory } from "react-router-dom";
import { AuthContext } from "../../../contexts/auth.context";
import { authWIthFb } from '../AuthenticationHelper'


interface ILoginWithFacebook{
  btnText:string;
}
const LoginWithFacebook: React.FC<ILoginWithFacebook> = ({btnText}) => {
    const { user, dispatch } = useContext(AuthContext);
    const history = useHistory();

    interface IUserData {
      fbUserID: string;
      name: string;
      token:string;
      authType:string;
    }

  const authFacebookUser = (userData: IUserData) => {
    dispatch({type: "loading"})

    authWIthFb(userData)
    .then(res => {
         if (res.status === 200 || res.status === 201) {
          localStorage.setItem("user", JSON.stringify({...res.data,token: userData.token}));          
          dispatch({type: "loggedIn"})
          history.push('/cars-board')
        } else{
           console.log(res)//res = error
        }
    })
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
