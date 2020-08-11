import React, { useState, useEffect } from "react";
import FilterBar from "../FilterBar/FilterBar";
import CreateCar from "../CreateCar/CreateCar";
import EditCar from "../EditCar/EditCar";
import CarCard from "../CarCard/CarCard";
import Navbar from "../Navbar/Navbar";
import axios from "axios";
import "./CarsBoard.css";

//Models
import { ICar } from "../../models/ICar";

//M-UI
import { Grid, Button } from "@material-ui/core";


const CarsBoard: React.FC = () => {
  const [cars, setCars] = useState<ICar[] | null>();
  const [filteredCars, setFilteredCars] = useState<ICar[] | []>([]);
  const [filterFlag, setFilterFlag] = useState<boolean>(false);
  const [addCarFlag, setAddCarFlag] = useState<boolean>(false);
  const [editCarFlag, setEditCarFlag] = useState<boolean>(false);
  const [selectedCar, setSelectedCar] = useState<ICar>( {
    _id:'',
    car:'',
    car_model:'',
    car_model_year:'',
    img:'',
    price:'',
  });


  const deleteCar = (id:string): void => {
    axios.delete(`/cars/${id}`)
    .then((res) => {
      if (res.status === 200 && cars) {
        let temp:ICar[] = cars.filter(car => car._id  !== id)
        setCars(temp);
      }
    })
    .catch(err => console.log(err))
  }

  useEffect(() => {
    const getCars = () => {
      axios.get("/cars")
        .then((res) => {
          if (res.status === 200) {
            setCars(res.data);
          }
        })
        .catch((err) => console.log(
        err));
    };
    getCars();
  }, []);

  
  return (
    <div className="CarsBoard ">
      <Navbar />

      <div>
      <Button variant="contained" color="primary" onClick={() => setAddCarFlag(true)}>
        Add New Car
      </Button>
      </div>
      <FilterBar setFilterFlag={setFilterFlag} setFilteredCars={setFilteredCars} cars={cars ? cars : []} />

        {addCarFlag ? <CreateCar setAddCarFlag={setAddCarFlag} cars={cars} setCars={setCars} /> : null}

        {editCarFlag ? <EditCar setEditCarFlag={setEditCarFlag} selectedCar={selectedCar} cars={cars} setCars={setCars} /> : null}

      <div>
        <Grid container >
          {!filterFlag
            ?
            (cars 
              ?
               cars.map((car: ICar,i:number) => <CarCard key={i} car={car} setEditCarFlag={setEditCarFlag} deleteCar={deleteCar} setSelectedCar={setSelectedCar} />)
              :
               <p key="loading">Loading . . .</p>
               )
            : 
            (filteredCars.length
               ?
            (filteredCars as ICar[]).map((car: ICar,i:number) => (
                <CarCard key={i}  car={car} setEditCarFlag={setEditCarFlag} deleteCar={deleteCar} setSelectedCar={setSelectedCar} />
              ))
              : 
              <h2 key="NoCars">There are no available cars</h2>)
            }
        </Grid>
      </div>
    </div>
  );
};

export default CarsBoard;
