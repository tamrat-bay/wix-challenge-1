import axios from 'axios'

const loginWithJwt = (userData) => {
  return axios
    .post("/users/login", userData)
    .then(res => res)
    .catch(err =>err) 
};

const signUpWithJwt = (userData) => {
  return  axios.post("/users/signup", userData)
    .then(res => res)
    .catch(err => err);
}

const authWIthFb = (userData) =>{
  const url =  `/users/${userData.authType}`
  return  axios({
        method: "post",
        url,
        data: userData,
        headers: {
          Authorization: `Bearer ${userData.token}`,
          fbUserID: userData.fbUserID
        },
      })
        .then(res => res )
        .catch(err => err);
}

export { loginWithJwt,signUpWithJwt, authWIthFb }