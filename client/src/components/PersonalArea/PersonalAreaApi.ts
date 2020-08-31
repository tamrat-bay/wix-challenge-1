import axios from 'axios';

const getUserCars = async (fbUserID: string) => {
    const { token, authType, _id } = localStorage.user
      ? JSON.parse(localStorage.user)
      : null;
    const url = `/cars/${authType}/${_id}`;
    
    return await axios({
      method: "get",
      url,
      headers: {
        Authorization: `Bearer ${token}`,
        fbUserID: fbUserID,
      },
    })

  };

  export { getUserCars }