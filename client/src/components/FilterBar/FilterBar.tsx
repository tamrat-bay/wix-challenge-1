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
    year: string;
    [key: string]: string;
}
  const classes = useStyles();

  let formData: IFormData  = {
      brand:'',
      year:''
  }

  const handelChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => formData[e.target.name] = e.target.value

  const filterCarsByBrand = (brand : string) => {
      const filteredCars: ICar[] = cars.filter(car => car.car ===  brand);
      setFilteredCars(filteredCars)
  }


  const submitForm: (e: React.FormEvent<HTMLFormElement>) => void = (e) =>{
      e.preventDefault()
    console.log(formData)
    // setFilterFlag(true)
  }

  return (
    <form className={classes.root} noValidate autoComplete="off" onSubmit={(e) => submitForm(e)}>
      <TextField id="brand" name="brand" label="Brand Name" color="secondary" onChange={(e)=> handelChange(e)} />
      <TextField id="year" name="year" label="Year" color="secondary" onChange={(e)=> handelChange(e)} />
      {/* <TextField id="standard-secondary" label="Until" color="secondary" /> */}
      <Button variant="outlined" type="submit" color="primary">
        Search
      </Button>
    </form>
  );
};

export default FilterBar;
