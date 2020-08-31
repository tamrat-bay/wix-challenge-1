import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../contexts/auth.context";
import { getUserCars } from "./PersonalAreaApi";
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

  const deleteCarHandler = async (carID: string) => {
    setIsLoading(true);
    try {
        await deleteCar(carID, user.fbUserID);
        deleteCarFromState(userCars, setUserCars, carID);
  } catch (error) {
      console.log(error)
  }
  setIsLoading(false);
  };

  useEffect(() => {
      (async() => {
        try {
            const res = await getUserCars(user.fbUserID);
            setUserCars(res.data);
            setIsLoading(false)
        } catch (error) {
            console.log(error);
            dispatch({type : 'logOut'});
            localStorage.clear()
        }
      })()

  }, [user, dispatch]);

  const formModalCloseRequest = () =>{
    setFormModalIsOpen(false);
    setSelectedCar(null);
  }

  const userName: string = JSON.parse(localStorage.user).name.toUpperCase();

  return (
    <div className="PersonalArea">
      <h1 className="PersonalArea_Heading">{userName}'S Cars List</h1>
      <Modal
        data-testid="car-form"
        isOpen={formModalIsOpen}
        onRequestClose={formModalCloseRequest}
        className="CarForm"
      >
        <CarForm
          method={formRequestMethod}
          setCars={setUserCars}
          cars={userCars}
          initialValues={selectedCar}
          setSelectedCar={setSelectedCar}
          formModalCloseRequest={formModalCloseRequest }
        />
      </Modal>

      {isLoading ? 
        <Loader />
        : 
        userCars.length ? (
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
