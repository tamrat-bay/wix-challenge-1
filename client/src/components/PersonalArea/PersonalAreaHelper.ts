import axios from 'axios';

const getUserCars = (fbUserID: string) => {
    const { token, authType, _id } = localStorage.user
      ? JSON.parse(localStorage.user)
      : null;
    const url = `/cars/${authType}/${_id}`;
    return axios({
      method: "get",
      url,
      headers: {
        Authorization: `Bearer ${token}`,
        fbUserID: fbUserID,
      },
    })
      .then(res => res)
      .catch(err => err);
  };

  export { getUserCars }