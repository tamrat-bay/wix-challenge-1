import React, { useState, useEffect } from "react";
import FilterBar from "../FilterBar/FilterBar";
import CarForm from "../CarForm/CarForm";
import axios from "axios";
import "./CarsBoard.css";

//Models
import { ICar } from "../../models/ICar";

//M-UI
import Grid from "@material-ui/core/Grid";
import CarCard from "../CarCard/CarCard";
import Navbar from "../Navbar/Navbar";

const CarsBoard: React.FC = () => {
  const [cars, setCars] = useState<ICar[] | null>();
  const [filteredCars, setFilteredCars] = useState<ICar[] | []>([]);
  const [filterFlag, setFilterFlag] = useState<boolean>(false);
  const [addCarFlag, setAddCarFlag] = useState<boolean>(true);

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
      <FilterBar setFilterFlag={setFilterFlag} setFilteredCars={setFilteredCars} cars={cars ? cars : []} />

        {addCarFlag ? <CarForm /> : null}

      <div>
        <Grid container >
          {!filterFlag
            ?
            ( cars 
              ?
               cars.map((car: ICar) => <CarCard key={car._id} car={car} />)
              :
               "Loading . . .")
            : 
            (filteredCars.length
               ?
            (filteredCars as ICar[]).map((car: ICar) => (
                <CarCard key={car._id} car={car} />
              ))
              : 
              <h2>There are no available cars</h2>)
            }
        </Grid>
      </div>
    </div>
  );
};

export default CarsBoard;
