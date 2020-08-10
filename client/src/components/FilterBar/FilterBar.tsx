import React from "react";

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
        width: "25ch",
      },
    },
  })
);

//!Need to FIX handelChange Func to get type number for the year 
//! Check handelChange on refresh

interface IFilterBar {
  cars: ICar[] | [];
  setFilteredCars: React.Dispatch<
    React.SetStateAction<ICar[] | null | undefined>>;
  setFilterFlag: React.Dispatch<React.SetStateAction<boolean>>;
}

const FilterBar: React.SFC<IFilterBar> = ({
  cars,
  setFilteredCars,
  setFilterFlag,
}) => {

interface IFormData  {
    brand: string;
    year: number;
    [key: string]: string | number;
}
  const classes = useStyles();

  let formData: IFormData  = {
      brand:'',
      year:0
  }

  const handelChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => formData[e.target.name] = e.target.value

     
  const filterCarsByBrand = (brand : string) => {
      const filteredCars: ICar[] = cars.filter(car => car.car.toLowerCase() ===  brand.toLowerCase());
      setFilteredCars(filteredCars)
      setFilterFlag(true)
  }
  const filterCarsByByYear = (year : number) => {
      const filteredCars: ICar[] = cars.filter(car => car.car_model_year ===  year);
      setFilteredCars(filteredCars)
      setFilterFlag(true)
  }
  const filterCarsByByBrandAndYear = (brand : string, year : number) => {
    const filteredCars: ICar[] =  cars.filter(car => (car.car_model_year ===  year && car.car.toLowerCase() ===  brand.toLowerCase()));
      setFilteredCars(filteredCars)
      setFilterFlag(true)
  }


  const submitForm: (e: React.FormEvent<HTMLFormElement>) => void = (e) =>{
      e.preventDefault()
    const carBrand : string = formData.brand 
    const modelYear : number = Number(formData.year) 
    
    if (carBrand && modelYear) return filterCarsByByBrandAndYear(carBrand, modelYear);
    if (carBrand) return filterCarsByBrand(carBrand);
    if (modelYear) return filterCarsByByYear(modelYear);
  }

  return (
      <div>
    <form className={classes.root} noValidate autoComplete="off" onSubmit={(e) => submitForm(e)}>
      <TextField id="brand" name="brand" label="Brand Name" color="secondary" onChange={(e)=> handelChange(e)} />
      <TextField id="year" name="year" label="Year" type="number" color="secondary" onChange={(e)=> handelChange(e)} />
      {/* <TextField id="standard-secondary" label="Until" color="secondary" /> */}
      <Button variant="outlined" type="submit" color="primary">
        Search
      </Button>
      <Button variant="outlined" onClick={() => setFilterFlag(false)} color="primary">
        Display All
      </Button>
    </form>

    </div>
  );
};

export default FilterBar;
