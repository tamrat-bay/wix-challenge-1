import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../contexts/auth.context";
import { getUserCars } from "./PersonalAreaHelper";
import CarCard from "../CarCard/CarCard";
import { ICar } from "../../models/ICar";
import { Method } from "axios";
import Modal from "react-modal";
import { deleteCar, deleteCarFromState } from "../CarsBoard/CarBoardHelper";
import Loader from "../Loader/Loader";
import CarForm from "../CarForm/CarForm";

import "./PersonalArea.css";

const PersonalArea = () => {
  const [userCars, setUserCars] = useState<ICar[] | []>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [selectedCar, setSelectedCar] = useState<ICar | null>(null);
  const [formRequestMethod, setFormRequestMethod] = useState<Method>("put");
  const [formModalIsOpen, setFormModalIsOpen] = useState<boolean>(false);
  const { user, dispatch } = useContext(AuthContext);

  const deleteCarHandler = (carID: string): void => {
    setIsLoading(true);
    deleteCar(carID, user.fbUserID)
      .then(res => {
        if(res.status === 200){
          deleteCarFromState(userCars, setUserCars, carID);
        }else{
          console.log(res)//res = error
        }
        setIsLoading(false);
      })
  };

  useEffect(() => {
    if (user.isLoggedIn) {
      getUserCars(user.fbUserID).then(res => {
        if (res.status === 200) {
          setUserCars(res.data);
        } else {
          if (res.response.status === 503 || res.response.status === 401) {
            dispatch({ type: "logOut" });
            localStorage.clear();
          }
        }
        setIsLoading(false);
      });
    }

  }, [user, dispatch]);
  const userName: string = JSON.parse(localStorage.user).name.toUpperCase();

  return (
    <div className="PersonalArea">
      <h1 className="PersonalArea_Heading">{userName}'S Cars List</h1>
      <Modal
        data-testid="car-form"
        isOpen={formModalIsOpen}
        onRequestClose={() => {
          setFormModalIsOpen(false);
          setSelectedCar(null);
        }}
        className="CarForm"
      >
        <CarForm
          method={formRequestMethod}
          setCars={setUserCars}
          cars={userCars}
          initialValues={selectedCar}
          setSelectedCar={setSelectedCar}
          setFormModalIsOpen={setFormModalIsOpen}
        />
      </Modal>

      {isLoading ? (
        <Loader />
      ) : userCars.length ? (
        (userCars as Array<ICar>).map((car, i) => (
          <CarCard
            key={i}
            car={car}
            deleteCar={deleteCarHandler}
            setFormModalIsOpen={setFormModalIsOpen}
            setFormRequestMethod={setFormRequestMethod}
            setSelectedCar={setSelectedCar}
          />
        ))
      ) : (
        <h2>There are no cars to display</h2>
      )}
    </div>
  );
};

export default PersonalArea;
