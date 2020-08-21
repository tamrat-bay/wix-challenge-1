import { ILoginState } from '../models/ILoginState';

type LoginAction = { type: 'loggedIn' | 'logOut' | 'loading' |'error' }

const reducer = (state:ILoginState, action:LoginAction) =>{
    switch (action.type) {
      case "loading":
        return {
            ...state,
            isLoading: !state.isLoading,
          };
      case "loggedIn":
        return {
            ...state,
            isLoggedIn: true,
            isLoading: false,
            fbUserID: JSON.parse(localStorage.user).fbUserID
          };
  
      case "logOut":
        return {
            ...state,
            isLoggedIn: false,
          };
      case "error":
        return {
            ...state,
            isLoading: false,
          };
  
      default:
        return state
    }
  }
  
  export default reducer;