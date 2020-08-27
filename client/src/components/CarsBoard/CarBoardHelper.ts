import axios from 'axios';
import { ICar } from '../../models/ICar';


const getCars = (fbUserID: string) => {
  const { token, authType } = localStorage.user
    ? JSON.parse(localStorage.user)
    : null;
  const url = `/cars/${authType}`;
  return axios({
    method: "get",
    url,
    headers: {
      Authorization: `Bearer ${token}`,
      fbUserID: fbUserID,
    },
  })
    .then((res) => res)
    .catch((err) => err);
};


const deleteCarFromState = (carsState,setCarsState,carID) => {
        let temp: ICar[] = carsState.filter((car) => car._id !== carID);
        setCarsState(temp);
}
const deleteCar = (carID: string, fbUserID:string) => {
     const {token, _id, authType, } = JSON.parse(localStorage.user); 
     const url = `/cars/${authType}/${_id}/${carID}`;

  return  axios({
      method: "delete",
      url,
      headers: {
        Authorization: `Bearer ${token}`,
        fbUserID: fbUserID,
      },
    })
      .then(res => res)
      .catch(err => err);
  };

export { getCars, deleteCar, deleteCarFromState }