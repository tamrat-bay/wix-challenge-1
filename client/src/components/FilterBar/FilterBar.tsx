import React, { useState } from "react";
import "./FilterBar.css";
import {
  filterCarsByBrand,
  filterCarsByYears,
  filterCarsByBrandAndYears,
  sortCarsByPricesLowToHigh,
  sortCarsByPricesHighToLow,
  sortCarsByNewestYear,
} from "./filterAndSortFunctions";

//Models
import { ICar } from "../../models/ICar";

//M-Ui
import {
  TextField,
  Button,
  Slider,
  Typography,
  FormControl,
  InputLabel,
  NativeSelect,
} from "@material-ui/core";

interface IFilterBar {
  cars: ICar[] | [];
  filteredCars: ICar[] | [];
  setCars: React.Dispatch<React.SetStateAction<ICar[] | []>>;
  setFilteredCars: React.Dispatch<React.SetStateAction<ICar[] | []>>;
  setFilterFlag: React.Dispatch<React.SetStateAction<boolean>>;
  filterFlag: boolean;

}

const FilterBar: React.FC<IFilterBar> = ({
  cars,
  setFilteredCars,
  setFilterFlag,
  filteredCars,
  setCars,
  filterFlag
}) => {
  const [years, setYears] = useState<number[]>([1990, 2020]);
  const [brand, setBrand] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("Choose");

  const sortHandleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const { value } = event.target 
    setSortBy(value as string);
    // I use spread operator due to runtime issue when the state changes
    switch (value) {
      case 'prices-lth':
        filterFlag ? setFilteredCars([...sortCarsByPricesLowToHigh(filteredCars)]) :
        setCars([...sortCarsByPricesLowToHigh(cars)])
        break;
      case 'prices-htl':
        filterFlag ? setFilteredCars([...sortCarsByPricesHighToLow(filteredCars)]) :
        setCars([...sortCarsByPricesHighToLow(cars)])
        break;
      case 'newest':
        filterFlag ? setFilteredCars([...sortCarsByNewestYear(filteredCars)]) :
        setCars([...sortCarsByNewestYear(cars)]);
        break;
      default:
        break;
    }
  };

  const yearsHandleChange = (event: any, newValue: number | number[]) => {
    setYears(newValue as number[]);
  };

  const brandHandelChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const { value } = e.target;
    setBrand(value);
  };

  const submitForm: (e: React.FormEvent<HTMLFormElement>) => void = (e) => {
    e.preventDefault();
    setFilterFlag(true);

    if (brand && years) return setFilteredCars(filterCarsByBrandAndYears(brand, years, cars));
    if (brand) return setFilteredCars(filterCarsByBrand(brand, cars)) 
    if (years) return setFilteredCars(filterCarsByYears(years, cars)) 
  };
 

  return (
    <div data-testid="filter-bar" className="FilterBar">
      <form noValidate autoComplete="off" onSubmit={(e) => submitForm(e)}>
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
            <Slider style={{zIndex : 0}}
              min={1990}
              max={2020}
              value={years}
              onChange={yearsHandleChange}
              valueLabelDisplay="on"
              aria-labelledby="discrete-slider-always"
            />
          </div>
          <FormControl>
            <InputLabel htmlFor="demo-customized-Input-native">
              Sort By
            </InputLabel>
            <NativeSelect
              id="demo-customized-select-native"
              value={sortBy ? sortBy : "Choose"}
              onChange={sortHandleChange}
            >
              <option disabled aria-label="Sort By" value="Choose">
                Choose
              </option>
              <option value={"prices-htl"}>Prices High To Low</option>
              <option value={"prices-lth"}>Prices Low To High</option>
              <option value={"newest"}>Newest Year</option>
            </NativeSelect>
          </FormControl>
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
