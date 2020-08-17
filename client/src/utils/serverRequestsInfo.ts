import { ICar } from "../models/ICar";
import { IServerRequestsInfo } from "../models/IServerRequestsInfo";

const url = `/cars`

const editServerRequestInfo: IServerRequestsInfo = {
    url,
    requestFunction: (cars: ICar[], newCar: ICar, id : string | null = null ): ICar[] => {
        const index: number = cars.findIndex((car) => car._id === id);
        let updatedCars: ICar[] = [...cars]
        updatedCars[index] = newCar 
        return updatedCars
      },
}

const postServerRequestInfo: IServerRequestsInfo = {
    url,
    requestFunction: (cars: ICar[], newCar: ICar, id : string | null = null): ICar[] => {        
        let updatedCars: ICar[] = [newCar, ...cars]
        return updatedCars
      },
}
  
export { editServerRequestInfo, postServerRequestInfo }