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
  const [carsForDisplay, setCarsForDisplay] = useState<ICar[] | []>([]);
  const [selectedCar, setSelectedCar] = useState<ICar | null>(null);
  const [formRequestMethod, setFormRequestMethod] = useState<Method>("post");
  const [formModalIsOpen, setFormModalIsOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { user, dispatch } = useContext(AuthContext);

  const deleteCarHandler = async (carID: string) => {
    setIsLoading(true);
    try {
        await deleteCar(carID, user.fbUserID);
        deleteCarFromState(cars, setCars, carID);
        deleteCarFromState(carsForDisplay, setCarsForDisplay, carID)
    } catch (error) {
       console.log(error)
    }
    setIsLoading(false); 
  };
  
  const formModalCloseRequest = () => {
    setFormModalIsOpen(false);
    setSelectedCar(null);
  }
  useEffect(() => {

    (async() => {
      try {
          const res = await getCars(user.fbUserID);
          setCars(res.data);
          setCarsForDisplay(res.data);
          setIsLoading(false)
      } catch (error) {
          console.log(error);
          dispatch({type : 'logOut'});
          localStorage.clear()
      }
    })()

  }, [dispatch, user]);

  const noAvailableCars = 'There are no available cars';

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
        setCarsForDisplay={setCarsForDisplay}
        carsForDisplay={carsForDisplay}
        cars={cars}
      />
      <Modal
        data-testid="car-form"
        isOpen={formModalIsOpen}
        onRequestClose={formModalCloseRequest}
        className="CarForm"
      >
        <CarForm
          method={formRequestMethod}
          setCars={setCars}
          cars={cars}
          initialValues={selectedCar}
          setSelectedCar={setSelectedCar}
          setCarsForDisplay={setCarsForDisplay}
          formModalCloseRequest={formModalCloseRequest}
        />
      </Modal>
      {isLoading ? 
        <Loader />
       : 
        <Grid container>
          {carsForDisplay.length ? (
            (carsForDisplay as Array<ICar>).map((car: ICar, i: number) => (
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
