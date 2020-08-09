import React, { useState, useEffect } from "react";
import FilterBar from "../FilterBar/FilterBar";
import axios from "axios";
import "./CarsBoard.css";

//Models
import { ICar } from "../../models/ICar";

//M-UI
import Grid from "@material-ui/core/Grid";
import CarCard from "../CarCard/CarCard";

const CarsBoard: React.FC = () => {
  const [cars, setCars] = useState<ICar[] | null>();
  const [filteredCars, setFilteredCars] = useState<ICar[] | null>();
  const [filterFlag, setFilterFlag] = useState<boolean>(false);

  useEffect(() => {
    //Get cars list from the Server
    const getCars = () => {
      axios
        .get("/cars")
        .then((res) => {
          console.log("Res Data", res.data);
          if (res.status === 200) {
            setCars(res.data.cars);
          }
        })
        .catch((err) => console.log(err));
    };

    getCars();
    console.log("after set", cars);
  }, []);

  return (
    <div className="CarsBoard ">
      CarsBoard
      <FilterBar />
      <div>
        <Grid container spacing={3}>
          {cars
            ? cars.map((car: ICar) => <CarCard key={car.id} car={car} />)
            : "Loading . . ."}
        </Grid>
      </div>
    </div>
  );
};

export default CarsBoard;
