import { ICar } from "../../models/ICar";
import { IServerRequestsInfo } from "../../models/IServerRequestsInfo";

const url = '/cars'

const editCarUrlAndResponseFunction: IServerRequestsInfo = {
    url,
    responseFunction: (cars: ICar[], newCar: ICar, id : string | null = null ): ICar[] => {
        const index: number = cars.findIndex((car) => car._id === id);
        let updatedCars: ICar[] = [...cars]
        updatedCars[index] = newCar 
        return updatedCars
      },
}

const postCarUrlAndResponseFunction: IServerRequestsInfo = {
    url,
    responseFunction: (cars: ICar[], newCar: ICar, id : string | null = null): ICar[] => {        
        let updatedCars: ICar[] = [newCar, ...cars]
        let carsOwnedByUser:string[] = JSON.parse(localStorage.user).cars;
         carsOwnedByUser = [newCar._id,...carsOwnedByUser]
         const newUserData = {...JSON.parse(localStorage.user), cars: carsOwnedByUser};
         localStorage.setItem('user',JSON.stringify(newUserData))
        return updatedCars
      },
}
  
export { editCarUrlAndResponseFunction, postCarUrlAndResponseFunction }