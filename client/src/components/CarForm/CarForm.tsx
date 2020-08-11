import React from "react";
import axios from "axios";
import './CarForm.css'

//M-UI
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { TextField, Button } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      flexWrap: "wrap",
    },
  })
);

interface ICarForm {}

const CarForm: React.FC<ICarForm> = () => {
  const classes = useStyles();

  return (
    <div className="CarForm"> 
     <span>Close window</span>
      <form className={classes.root}>
        <TextField
          id="standard-full-width"
          fullWidth
          label="Brand Name"
          placeholder="Toyota"
        />
        <TextField
          fullWidth
          label="Model"
          id="model"
          placeholder="Corolla"
        />
        <TextField
          fullWidth
          label="Model Year"
          id="year"
          type="number"
        />
        <TextField
          fullWidth
          label="Price"
          id="price"
          type="number"
        />
        <TextField
          fullWidth
          label="Color"
          id="color"
        />
        <TextField
          fullWidth
          label="Image URL"
          id="image"
        />
        <Button variant="outlined" type="submit" color="primary">
            Submit
        </Button>
      </form>
    </div>
  );
};

export default CarForm;
