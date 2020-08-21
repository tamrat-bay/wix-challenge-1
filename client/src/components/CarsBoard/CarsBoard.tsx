import React, { useState, useEffect, useContext } from "react";
import FilterBar from "../FilterBar/FilterBar";
import CarForm from "../CarForm/CarForm";
import CarCard from "../CarCard/CarCard";
import Loader from "../Loader/Loader";
import axios from "axios";
import { Method } from "axios";
import Modal from "react-modal";
import { Redirect } from "react-router-dom";
import { AuthContext } from "../../contexts/auth.context";
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

  const deleteCar = (carID: string): void => {
    setIsLoading(true)
    const {token, _id} = JSON.parse(localStorage.user); //todo=> change  to user ID
    const url = `/cars/${user.authType}/${_id}/${carID}`
    axios({
      method: "delete",
      url: url,
      headers: {
        Authorization: `Bearer ${token}`,
        fbUserID: user.fbUserID
      },
    })
      .then((res) => {
        if (res.status === 200 && cars) {
          let temp: ICar[] = cars.filter((car) => car._id !== carID);
          setCars(temp);
          setIsLoading(false)
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    const getCars = () => {
      setIsLoading(true)
      const {token, authType} = localStorage.user ? JSON.parse(localStorage.user) : dispatch({type : 'logOut'}); //!modify
      
      axios({
        method: "get",
        url: `/cars/${authType}`,
        headers: {
          Authorization: `Bearer ${token}`,
          fbUserID: user.fbUserID 
        },
      })
        .then((res) => {
          if (res.status === 200) {
            setCars(res.data);
            setIsLoading(false)
          }
        })
        .catch((err) => {console.log(err); 
          if(err.response.data === 'Invalid token'){
              dispatch({type : 'logOut'});
              localStorage.clear()
          }
          });
    };
    if (user.isLoggedIn) {getCars();}
      
    
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
      <div>
        <Grid container>
          {!filterFlag ? (
            cars.length ? (
              (cars as Array<ICar>).map((car: ICar, i: number) => (
                <CarCard
                  key={i}
                  car={car}
                  setFormRequestMethod={setFormRequestMethod}
                  setFormModalIsOpen={setFormModalIsOpen}
                  deleteCar={deleteCar}
                  setSelectedCar={setSelectedCar}
                />
              ))
            ) : (
              <p>There are no available cars</p>
            )
          ) : filteredCars.length ? (
            (filteredCars as ICar[]).map((car: ICar, i: number) => (
              <CarCard
                key={i}
                car={car}
                setFormRequestMethod={setFormRequestMethod}
                setFormModalIsOpen={setFormModalIsOpen}
                deleteCar={deleteCar}
                setSelectedCar={setSelectedCar}
              />
            ))
          ) : (
            <h2>There are no available cars</h2>
          )}
        </Grid>
      </div>
      }
    </div>
  );
};

export default CarsBoard;
