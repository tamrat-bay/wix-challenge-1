import React, { useState } from "react";
import "./FilterBar.css";
import {
  filterCarsByBrandYearsAndPrices,
  sortCarsByPricesLowToHigh,
  sortCarsByPricesHighToLow,
  sortCarsByNewestYear,
  getUniqueBrandNames,
  filterCarsByPricesAndYears,
} from "./FilterBarHelper";

//Models
import { ICar } from "../../models/ICar";

//M-Ui
import {
  Button,
  Slider,
  Typography,
  FormControl,
  InputLabel,
  NativeSelect,
  Grid,
} from "@material-ui/core";

interface IFilterBar {
  cars: ICar[] | [];
  carsForDisplay: ICar[] | [];
  setCarsForDisplay: React.Dispatch<React.SetStateAction<ICar[] | []>>;
}

const FilterBar: React.FC<IFilterBar> = ({
  cars,
  setCarsForDisplay,
  carsForDisplay,
}) => {
  const [years, setYears] = useState<number[]>([1990, 2020]);
  const [prices, setPrices] = useState<number[]>([200, 90000]);
  const [brand, setBrand] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<string>("");
  const brandNames = getUniqueBrandNames(cars);

  const sortHandleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const { value } = event.target;
    setSortBy(value as string);
    // I use spread operator due to runtime issue when the state changes
    sortCars(value)
  };

  const sortCars = (key) => {
    console.log('sortCars key', key);
    
    switch (key) {
      case "prices-lth":
        return setCarsForDisplay([...sortCarsByPricesLowToHigh(carsForDisplay)])
      case "prices-htl":
        return setCarsForDisplay([...sortCarsByPricesHighToLow(carsForDisplay)])
      case "newest":
        return setCarsForDisplay([...sortCarsByNewestYear(carsForDisplay)])
      default:
        return carsForDisplay;
    }
  }

  const yearsHandleChange = (event: any, newValue: number | number[]) => {
    setYears(newValue as number[]);
  };
  const pricesHandleChange = (event: any, newValue: number | number[]) => {
    setPrices(newValue as number[]);
  };

  const brandHandelChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    setBrand(value);
  };

  const submitForm: (e: React.FormEvent<HTMLFormElement>) => void = (e) => {
    e.preventDefault();
    setIsLoading(true);

    //!If brand has value then filter needs to be by all the options else only by years and price
    console.log('Cars Before Filt',cars);
    
    if (brand) {
      console.log('Cars Before FilterbyBerand',cars);
      setCarsForDisplay(
        filterCarsByBrandYearsAndPrices(brand, years, prices, cars)
      );
    } else {
      setCarsForDisplay(filterCarsByPricesAndYears(prices, years, cars));
    }
    setIsLoading(false);
  };

  const sortInputValue = sortBy ? sortBy : "Choose";
  const brandInputValue = brand ? brand : "Choose";
  const filterBtnText = isLoading ? "Loading . . ." : "FILTER";

  return (
    <div data-testid="filter-bar" className="FilterBar">
      <form autoComplete="off" onSubmit={(e) => submitForm(e)}>
        <Grid item sm={12} xs={8} className="FilterBar_selectors">
          <div className="FilterBar_Slider">
            <Typography id="range-slider" gutterBottom>
              Years Range
            </Typography>
            <Slider
              style={{ zIndex: 0 }}
              min={1990}
              max={2020}
              value={years}
              onChange={yearsHandleChange}
              valueLabelDisplay="on"
              aria-labelledby="discrete-slider-always"
            />
            <FormControl></FormControl>
            <Typography id="range-slider" gutterBottom>
              Price Range
            </Typography>
            <Slider
              style={{ zIndex: 0 }}
              min={200}
              max={90000}
              value={prices}
              onChange={pricesHandleChange}
              valueLabelDisplay="on"
              aria-labelledby="discrete-slider-always"
            />
          </div>
          <div className="FilterBar_Select">
            <FormControl>
              <InputLabel htmlFor="demo-customized-Input-native">
                Car Brand
              </InputLabel>
              <NativeSelect
                id="demo-customized-select-native"
                value={brandInputValue}
                onChange={brandHandelChange}
              >
                <option disabled aria-label="Brand name" value="Choose">
                  Choose
                </option>
                <option value="">All Brands</option>
                {brandNames.map((name, i) => (
                  <option key={i} aria-label="Sort By" value={name}>
                    {name}
                  </option>
                ))}
              </NativeSelect>
            </FormControl>
            <FormControl>
              <InputLabel htmlFor="demo-customized-Input-native">
                Sort By
              </InputLabel>
              <NativeSelect
                id="demo-customized-select-native"
                value={sortInputValue}
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
        </Grid>
        <div className="FilterBar_formButtons">
          <Button
            variant="outlined"
            disabled={isLoading}
            type="submit"
            color="primary"
          >
            {filterBtnText}
          </Button>
          <Button
            variant="outlined"
            onClick={() => setCarsForDisplay(cars)}
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
