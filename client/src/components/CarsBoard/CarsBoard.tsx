import React, { useState, useEffect } from "react";
import FilterBar from "../FilterBar/FilterBar";
import './CarsBoard.css'

//M-UI
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import CarCard from "../CarCard/CarCard";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    maxWidth: 345,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  media: {
    height: 140,
  },
}));

const CarsBoard = () => {
  const classes = useStyles();
  const [cars, setCars] = useState();

  useEffect(() => {
    //Get cars list from the Server
  }, []);

  return (
    <div className="CarsBoard ">
      CarsBoard
      <FilterBar />

      <div>
        <Grid container spacing={3}>
            {/*//! Map Cars List and render CarCard */}
          <CarCard />
          <CarCard />
          <CarCard />
          <CarCard />
        </Grid>
      </div>
    </div>
  );
};

export default CarsBoard;
