import React from "react";
import CarForm from "../CarForm/CarForm";
import { ICar } from "../../models/ICar";
import { IAxiosInfo } from "../../models/IAxiosInfo";

interface ICreateCar {
  setAddCarFlag: React.Dispatch<React.SetStateAction<boolean>>;
  cars: ICar[] | null | undefined ;
  setCars: React.Dispatch<React.SetStateAction<ICar[] | null | undefined>>;
  }

const CreateCar: React.FC<ICreateCar> = ({ setAddCarFlag, cars, setCars }) => {

    const initialValue: ICar = {
        car:'',
        car_model:'',
        car_model_year:'',
        img:'',
        price:'',
        _id:""
      };

      const axiosInfo: IAxiosInfo = {
        method: "post",
        url: `/cars/`,
        requestFunction: (newCar: ICar) => {
          if (cars) {
            setCars([newCar,...cars])
          }
          setAddCarFlag(false);
        },
      };


    return (
      <CarForm 
        axiosInfo={axiosInfo}
        initialValues={initialValue}
        closeWindow={setAddCarFlag}
      />
    )
}

export default CreateCar;
