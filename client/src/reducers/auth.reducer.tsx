import { ILoginState } from '../models/ILoginState';

type LoginAction = { type: 'login' | 'loggedIn' | 'logOut' }

const reducer = (state:ILoginState, action:LoginAction) =>{
    switch (action.type) {
      case "loggedIn":
        return {
            ...state,
            isLoggedIn: true,
            authType: JSON.parse(localStorage.user).authType,
            fbUserID: JSON.parse(localStorage.user).fbUserID
          };
  
      case "logOut":
        return {
            ...state,
            isLoggedIn: false,
          };
  
      default:
        return state
    }
  }
  
  export default reducer;