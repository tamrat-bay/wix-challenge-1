import { ILoginState } from '../models/ILoginState';

type LoginAction = { type: 'login' | 'loggedIn' | 'logOut' }

const reducer = (state:ILoginState, action:LoginAction) =>{
    switch (action.type) {
      case "loggedIn":
        return {
            ...state,
            isLoggedIn: true,
            authType: JSON.parse(localStorage.user).authType
          };
  
      case "logOut":
        return {
            ...state,
            isLoggedIn: false,
          };
    
      default:
        return state
        break;
    }
  }
  
  export default reducer;