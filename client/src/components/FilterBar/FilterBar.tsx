import React, { useState } from "react";
import "./FilterBar.css";

//Models
import { ICar } from "../../models/ICar";

//M-Ui
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { TextField, Button, Slider, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      "& > *": {
        marginTop: theme.spacing(1),
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
  const classes = useStyles();
  const [years, setYears] = React.useState<number[]>([1990, 2020]);
  const [brand, setBrand] = useState<string>("");

  const yearHandleChange = (event: any, newValue: number | number[]) => {
    setYears(newValue as number[]);
  };

  const brandHandelChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const { value } = e.target;
    setBrand(value);
  };

  const filterCarsByBrand = (brand: string, cars: ICar[]): ICar[] => {
    const filteredCars: ICar[] = cars.filter(
      (car: ICar) => car.car.toLowerCase() === brand.toLowerCase()
    );
    setFilteredCars(filteredCars);
    return filteredCars;
  };

  const filterCarsByYears = (years: number[], cars: ICar[]): ICar[] => {
    const filteredCars: ICar[] = cars.filter(
      (car: ICar) =>
        years[0] <= car.car_model_year && years[1] >= car.car_model_year
    );
    setFilteredCars(filteredCars);
    return filteredCars;
  };

  const filterCarsByBrandAndYears = (brand: string, years: number[]) => {
    let filteredByBrand: ICar[] = filterCarsByBrand(brand, cars);
    let filteredByBrandAndYears: ICar[] = filterCarsByYears(
      years,
      filteredByBrand
    );
    setFilteredCars(filteredByBrandAndYears);
  };

  const submitForm: (e: React.FormEvent<HTMLFormElement>) => void = (e) => {
    e.preventDefault();

    setFilterFlag(true);

    if (brand && years) return filterCarsByBrandAndYears(brand, years);
    if (brand) return filterCarsByBrand(brand, cars);
    if (years[0]) return filterCarsByYears(years, cars);
  };

  return (
    <div data-testid="filter-bar" className="FilterBar">
      <form
        className={classes.root}
        noValidate
        autoComplete="off"
        onSubmit={(e) => submitForm(e)}
      >
        <div className="FilterBar_selectors">
          <TextField
            id="brand"
            name="brand"
            label="Brand Name"
            defaultValue={brand}
            color="secondary"
            onChange={(e) => brandHandelChange(e)}
            inputProps={{ "data-testid": "filter-bar-input" }}
          />

          <div className="FilterBar_yearsSlider">
            <Typography id="range-slider" gutterBottom>
              Years Range
            </Typography>
            <Slider
              min={1990}
              max={2020}
              value={years}
              onChange={yearHandleChange}
              valueLabelDisplay="on"
              aria-labelledby="discrete-slider-always"
            />
          </div>
        </div>
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
