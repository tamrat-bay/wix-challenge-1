import axios from 'axios';
import { ICar } from '../../models/ICar';


const getCars = async (fbUserID: string) => {
  const { token, authType } = localStorage.user
    ? JSON.parse(localStorage.user)
    : null;
  const url = `/cars/${authType}`;

  return await axios({
    method: "get",
    url,
    headers: {
      Authorization: `Bearer ${token}`,
      fbUserID: fbUserID,
    },
  })

};


const deleteCarFromState = (carsState,setCarsState,carID) => {
      let temp: ICar[] = carsState.filter((car) => car._id !== carID);
      setCarsState(temp);
}
const deleteCar = async (carID: string, fbUserID:string) => {
     const {token, _id, authType, } = JSON.parse(localStorage.user); 
     const url = `/cars/${authType}/${_id}/${carID}`;

    return await axios({
        method: "delete",
        url,
        headers: {
          Authorization: `Bearer ${token}`,
          fbUserID: fbUserID,
        },
      })
      
  };

export { getCars, deleteCar, deleteCarFromState }