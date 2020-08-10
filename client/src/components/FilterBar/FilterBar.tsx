import React, { useState } from "react";
import './FilterBar.css'

//Models
import { ICar } from "../../models/ICar";

//M-Ui
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { TextField, Button } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      "& > *": {
        margin: theme.spacing(1),
      },
    },
  })
);


interface IFilterBar {
  cars: ICar[] | [];
  setFilteredCars: React.Dispatch<React.SetStateAction<ICar[] | []>>;
  setFilterFlag: React.Dispatch<React.SetStateAction<boolean>>;
}

const FilterBar: React.FC<IFilterBar> = ({
  cars,
  setFilteredCars,
  setFilterFlag,
}) => {

  interface IFormData {
    brand: string;
    year: string;
    [key: string]: string;
  }

  const classes = useStyles();
  const [formData, setFormData] = useState<IFormData>({
    brand: "",
    year: "",
  });

  const handelChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const filterCarsByBrand = (brand: string) => {
    const filteredCars: ICar[] = cars.filter((car :ICar) => car.car.toLowerCase() === brand.toLowerCase());
    setFilteredCars(filteredCars);
    setFilterFlag(true);
  };

  const filterCarsByByYear = (year: string) => {
    const filteredCars: ICar[] = cars.filter((car :ICar) => Number(car.car_model_year) === Number(year) );
    setFilteredCars(filteredCars);
    setFilterFlag(true);
  };

  const filterCarsByByBrandAndYear = (brand: string, year: string) => {
    const filteredCars: ICar[] = cars.filter((car :ICar) => 
    Number(car.car_model_year) === Number(year) && car.car.toLowerCase() === brand.toLowerCase());
    setFilteredCars(filteredCars);
    setFilterFlag(true);
  };

  const submitForm: (e: React.FormEvent<HTMLFormElement>) => void = (e) => {
    e.preventDefault();
    const carBrand: string = formData.brand;
    const modelYear: string = formData.year

    if (carBrand && modelYear) return filterCarsByByBrandAndYear(carBrand, modelYear);
    if (carBrand) return filterCarsByBrand(carBrand);
    if (modelYear) return filterCarsByByYear(modelYear);
  };

  return (
    <div className="FilterBar">
      <form
        className={classes.root}
        noValidate
        autoComplete="off"
        onSubmit={(e) => submitForm(e)}
      >
        <TextField
          id="brand"
          name="brand"
          label="Brand Name"
          defaultValue={formData.brand}
          color="secondary"
          onChange={(e) => handelChange(e)}
        />
        <TextField
          id="year"
          name="year"
          label="Model Year"
          defaultValue={formData.year}
          type="number"
          color="secondary"
          onChange={(e) => handelChange(e)}
        />
        <div className="FilterBar_formButtons">
          <Button variant="outlined" type="submit" color="primary">
            Filter
          </Button>
          <Button
            variant="outlined"
            onClick={() => setFilterFlag(false)}
            color="primary"
          >
            Display All
          </Button>
        </div>
      </form>
    </div>
  );
};
export default FilterBar;
