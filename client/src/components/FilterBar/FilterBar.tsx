import React, { useState } from "react";
import "./FilterBar.css";
import {
  filterCarsByBrandYearsAndPrices,
  sortCarsByPricesLowToHigh,
  sortCarsByPricesHighToLow,
  sortCarsByNewestYear,
  getUniqueBrandNames,
  filterCarsByPricesAndYears
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
  const [prices, setPrices] = useState<number[]>([200, 300000]);
  const [brand, setBrand] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("Choose");
  const brandNames = getUniqueBrandNames(cars);
  
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
  const pricesHandleChange = (event: any, newValue: number | number[]) => {        
    setPrices(newValue as number[]);
  };

  const brandHandelChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    setBrand(value);
  };

  const submitForm: (e: React.FormEvent<HTMLFormElement>) => void = (e) => {
    e.preventDefault();
    setFilterFlag(true);

    //!If brand has value then filter needs to be by all the options else only by years and price
    return brand
      ? setFilteredCars(
          filterCarsByBrandYearsAndPrices(brand, years, prices, cars)
        )
      : setFilteredCars(filterCarsByPricesAndYears(prices, years, cars));
  };
  
  const sortInputValue = sortBy ? sortBy : "Choose";
  const brandInputValue = brand ? brand : "Choose";
  
  return (
    <div data-testid="filter-bar" className="FilterBar">
      <form  autoComplete="off" onSubmit={(e) => submitForm(e)}>
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
          <FormControl>
          </FormControl>
            <Typography id="range-slider" gutterBottom>
              Price Range
            </Typography>
            <Slider
              style={{ zIndex: 0 }}
              min={200}
              max={300000}
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
              {brandNames.map((name,i) => (
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
