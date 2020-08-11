import React from "react";
import CarForm from "../CarForm/CarForm";
import { ICar } from "../../models/ICar";
import { IAxiosInfo } from "../../models/IAxiosInfo";

interface IEditCar {
  setEditCarFlag: React.Dispatch<React.SetStateAction<boolean>>;
  cars: ICar[] | null | undefined ;
  setCars: React.Dispatch<React.SetStateAction<ICar[] | null | undefined>>;
  selectedCar: ICar;
  }

const EditCar: React.FC<IEditCar> = ({ setEditCarFlag, cars, setCars, selectedCar }) => {


      const axiosInfo: IAxiosInfo = {
        method: "put",
        url: `/cars/${selectedCar ? selectedCar._id : '1'}`,
        methodFunction: (newCar: ICar) => {
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
        axiosInfo={axiosInfo}
        initialValues={selectedCar}
        closeWindow={setEditCarFlag}
      />
    )
}

export default EditCar;
