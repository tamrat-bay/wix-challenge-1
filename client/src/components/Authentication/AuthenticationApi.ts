import axios from 'axios'

const loginWithJwt = async (userData) => {
  return  await axios.post("/users/login", userData)
};

const signUpWithJwt = async (userData) => {
  return await axios.post("/users/signup", userData)
}

const authWIthFb = async (userData) =>{
  const url =  `/users/${userData.authType}`
  return await axios({
        method: "post",
        url,
        data: userData,
        headers: {
          Authorization: `Bearer ${userData.token}`,
          fbUserID: userData.fbUserID
        },
      })
}

export { loginWithJwt,signUpWithJwt, authWIthFb }