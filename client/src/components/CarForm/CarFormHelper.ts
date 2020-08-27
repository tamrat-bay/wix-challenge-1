import { ICar } from "../../models/ICar";
import { IServerRequestsInfo } from "../../models/IServerRequestsInfo";
import axios from 'axios';

const url = '/cars'
const urlBuilder = (authType,id) =>  `${url}/${authType}/${id}`

const editCarResponseHandler: IServerRequestsInfo = {
    urlBuilder,
    responseHandler: (cars: ICar[], newCar: ICar, id : string | null = null ): ICar[] => {
        const index: number = cars.findIndex((car) => car._id === id);
        let updatedCars: ICar[] = [...cars]
        updatedCars[index] = newCar 
        return updatedCars
      },
}

const postCarResponseHandler: IServerRequestsInfo = {
    urlBuilder,
    responseHandler: (cars: ICar[], newCar: ICar, id : string | null = null): ICar[] => {        
        let updatedCars: ICar[] = [newCar, ...cars]
        let carsOwnedByUser:string[] = JSON.parse(localStorage.user).cars;
         carsOwnedByUser = [newCar._id,...carsOwnedByUser]
         const newUserData = {...JSON.parse(localStorage.user), cars: carsOwnedByUser};
         localStorage.setItem('user',JSON.stringify(newUserData))
        return updatedCars
      },
}

const editAndPostRequestHandler = (method,formValues,fbUserID,url) => {
  const { token } = JSON.parse(localStorage.user);
 return axios({
    method: method,
    url: url,
    data: formValues,
    headers: {
      Authorization: `Bearer ${token}`,
      fbUserID:fbUserID
    },
  })
    .then(res => res)
    .catch(err=> err);
}
  
export { postCarResponseHandler, editCarResponseHandler, editAndPostRequestHandler }