import React from "react";
import { useFormik } from "formik";
import { ICar } from "../../models/ICar";
import { IAxiosInfo } from "../../models/IAxiosInfo";
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

interface ICarForm {
    closeWindow: React.Dispatch<React.SetStateAction<boolean>>;
    initialValues: ICar;
    axiosInfo: IAxiosInfo;
}

const CarForm: React.FC<ICarForm> = ({ closeWindow, axiosInfo, initialValues }) => {
  const classes = useStyles();

  const handleSubmit: (values: ICar) => void = (values) => {
    const { method, url, methodFunction } = axiosInfo;
    switch (method) {
      case "post":
        axios({ method: "post",url: url,data: values,})
          .then((res) => {
            if (res.status === 201) {
              methodFunction(res.data);
            }
          })
          .catch((err) => console.log("Error", err));
        break;

      case "put":
        axios({method: "put",url: url,data: values, })
        .then((res) => {
            if (res.status === 200) {
              methodFunction(res.data);
            }
          })
          .catch((error) => {
            console.log(error);
          });
        break;
      default:
        break;
    }
  };

  const formik = useFormik({
    initialValues,
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  const handleChange = (e: string | React.ChangeEvent<any>) => {
    formik.handleChange(e);
  };

  return (
    <div data-testid="car-form" className="CarForm"> 
     <span className="CarForm_closeWindow" onClick={() => closeWindow(false)}>Close window</span>
      <form className={classes.root} onSubmit={(e) => {e.preventDefault(); formik.handleSubmit()}}>
        <TextField
          id="brand"
          fullWidth
          label="Brand Name"
          placeholder="Toyota"
          value={formik.values.car}
          onChange={handleChange}
          required={true}
          name="car"
          inputProps={{ "data-testid": "car-form-input" }}
        />
        <TextField
          fullWidth
          label="Model"
          id="model"
          placeholder="Corolla"
          value={formik.values.car_model}
          onChange={handleChange}
          required={true}
          name="car_model"
          inputProps={{ "data-testid": "car-form-input" }}

        />
        <TextField
          fullWidth
          label="Model Year"
          id="year"
          type="number"
          value={formik.values.car_model_year}
          onChange={handleChange}
          required={true}
          name="car_model_year"
          inputProps={{ "data-testid": "car-form-input" }}

        />
        <TextField
          fullWidth
          label="Price"
          id="price"
          type="number"
          value={formik.values.price}
          onChange={handleChange}
          required={true}
          name="price"
          inputProps={{ "data-testid": "car-form-input" }}

        />
        <TextField
          fullWidth
          label="Color"
          id="color"
          value={formik.values.car_color}
          onChange={handleChange}
          required={true}
          name="car_color"
          inputProps={{ "data-testid": "car-form-input" }}

        />
        <TextField
          fullWidth
          label="Image URL"
          id="image"
          value={formik.values.img}
          onChange={handleChange}
          required={true}
          name="img"
          inputProps={{ "data-testid": "car-form-input" }}
        />
        <Button 
          data-testid="car-form-submit-btn"
          variant="outlined" 
          type="submit" 
          color="primary">
            Submit
        </Button>
      </form>
    </div>
  );
};

export default CarForm;
