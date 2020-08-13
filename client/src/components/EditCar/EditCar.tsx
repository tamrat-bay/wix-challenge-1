import React from "react";
import CarForm from "../CarForm/CarForm";
import { ICar } from "../../models/ICar";
import { IServerRequestsInfo } from "../../models/IServerRequestsInfo";

interface IEditCar {
  setEditCarFlag: React.Dispatch<React.SetStateAction<boolean>>;
  cars: ICar[] | null | undefined ;
  setCars: React.Dispatch<React.SetStateAction<ICar[] | null | undefined>>;
  selectedCar: ICar;
  }

const EditCar: React.FC<IEditCar> = ({ setEditCarFlag, cars, setCars, selectedCar }) => {

      const serverRequestInfo: IServerRequestsInfo = {
        method: "put",
        url: `/cars/${selectedCar ? selectedCar._id : '1'}`,
        requestFunction: (newCar: ICar) => {
          if (cars && selectedCar) {
            const index: number = cars.findIndex((car) => car._id === selectedCar._id);
            let temp: ICar[] = [...cars]
            temp[index] = newCar 
            setCars(temp)
          }
          setEditCarFlag(false);
        },
      };


    return (
      <CarForm
       serverRequestInfo={serverRequestInfo}
        initialValues={selectedCar}
        closeWindow={setEditCarFlag}
      />
    )
}

export default EditCar;
