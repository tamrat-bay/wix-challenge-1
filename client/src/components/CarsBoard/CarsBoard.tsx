import React, { useState, useEffect, useContext } from "react";
import FilterBar from "../FilterBar/FilterBar";
import CarForm from "../CarForm/CarForm";
import CarCard from "../CarCard/CarCard";
import Loader from "../Loader/Loader";
import { Method } from "axios";
import Modal from "react-modal";
import { Redirect } from "react-router-dom";
import { AuthContext } from "../../contexts/auth.context";
import { getCars, deleteCar, deleteCarFromState } from './CarBoardHelper'
import "./CarsBoard.css";

//Models
import { ICar } from "../../models/ICar";
//M-UI
import { Grid, Button } from "@material-ui/core";


const CarsBoard: React.FC = () => {
  const [cars, setCars] = useState<ICar[] | []>([]);
  const [filteredCars, setFilteredCars] = useState<ICar[] | []>([]);
  const [filterFlag, setFilterFlag] = useState<boolean>(false);
  const [selectedCar, setSelectedCar] = useState<ICar | null>(null);
  const [formRequestMethod, setFormRequestMethod] = useState<Method>("post");
  const [formModalIsOpen, setFormModalIsOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { user, dispatch } = useContext(AuthContext);
  
 const noAvailableCars = 'There are no available cars'

 const deleteCarHandler = (carID: string): void => {
  setIsLoading(true);
  deleteCar(carID, user.fbUserID)
    .then(res=> {
      if(res.status === 200) {
       deleteCarFromState(cars, setCars, carID);
       if (filterFlag) {deleteCarFromState(filteredCars, setFilteredCars, carID)}
     }else {
       console.log(res)//res = error
      }
      setIsLoading(false);
    })
};

  useEffect(() => {
      getCars(user.fbUserID ).then( res => {
        setIsLoading(true)
        if(res.status === 200) {
          setCars(res.data);
          setIsLoading(false)
        }else{          
          dispatch({type : 'logOut'});
          localStorage.clear()
        }
      })
  }, [dispatch, user]);

  if (!user.isLoggedIn) return <Redirect to='/login' />;
 
  return (
    <div data-testid="cars-board" className="CarsBoard">
      <div className="CarsBoard_addBtn">
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            setFormRequestMethod("post");
            setFormModalIsOpen(true);
          }}
        >
          Add New Car
        </Button>
      </div>

      <FilterBar
        setFilterFlag={setFilterFlag}
        setFilteredCars={setFilteredCars}
        setCars={setCars}
        filteredCars={filteredCars}
        filterFlag={filterFlag}
        cars={cars}
      />
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
          setCars={setCars}
          cars={cars}
          initialValues={selectedCar}
          setSelectedCar={setSelectedCar}
          filterFlag={filterFlag}                               
          setFilteredCars={setFilteredCars}
          setFormModalIsOpen={setFormModalIsOpen}
        />
      </Modal>
     {isLoading
      ? 
      <Loader /> 
      : 
      <Grid container>
          {!filterFlag ? (
            cars.length ? (
              (cars as Array<ICar>).map((car: ICar, i: number) => (
                <CarCard
                  key={i}
                  car={car}
                  setFormRequestMethod={setFormRequestMethod}
                  setFormModalIsOpen={setFormModalIsOpen}
                  deleteCar={deleteCarHandler}
                  setSelectedCar={setSelectedCar}
                />
              ))
            ) : (
              <h2>{noAvailableCars}</h2>
              )
          ) : filteredCars.length ? (
            (filteredCars as ICar[]).map((car: ICar, i: number) => (
              <CarCard
                key={i}
                car={car}
                setFormRequestMethod={setFormRequestMethod}
                setFormModalIsOpen={setFormModalIsOpen}
                deleteCar={deleteCarHandler}
                setSelectedCar={setSelectedCar}
              />
            ))
          ) : (
            <h2>{noAvailableCars}</h2>
          )}
      </Grid>
      }
    </div>
  );
};

export default CarsBoard;
