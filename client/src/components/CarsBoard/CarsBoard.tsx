import React, { useState, useEffect, useContext } from "react";
import FilterBar from "../FilterBar/FilterBar";
import CarForm from "../CarForm/CarForm";
import CarCard from "../CarCard/CarCard";
import axios from "axios";
import { Method } from "axios";
import Modal from "react-modal";
import { Redirect } from "react-router-dom";
import { AuthContext } from "../../contexts/auth.context";
import {
  editServerRequestInfo,
  postServerRequestInfo,
} from "../../utils/serverRequestsInfo";
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
  const { user } = useContext(AuthContext);

  const deleteCar = (id: string): void => {
    axios
      .delete(`/cars/${id}`)
      .then((res) => {
        if (res.status === 200 && cars) {
          let temp: ICar[] = cars.filter((car) => car._id !== id);
          setCars(temp);
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    const getCars = () => {
      axios
        .get("/cars")
        .then((res) => {
          if (res.status === 200) {
            setCars(res.data);
          }
        })
        .catch((err) => console.log(err));
    };
    getCars();
  }, []);

  if (!user.isLoggedIn) return <Redirect to='/login' />;
  return (
    <div data-testid="cars-board" className="CarsBoard">
      <div>
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
          serverRequestInfo={
            formRequestMethod === "post"
              ? postServerRequestInfo
              : editServerRequestInfo
          }
          setFormModalIsOpen={setFormModalIsOpen}
        />
      </Modal>

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
              <p>Loading Cars. . .</p>
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
    </div>
  );
};

export default CarsBoard;
