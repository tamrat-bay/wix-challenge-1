import React from "react";
import Modal from "react-modal";
import { useFormik } from "formik";
import { ICar } from "../../models/ICar";
import { IServerRequestsInfo } from "../../models/IServerRequestsInfo";
import axios, { Method } from "axios";
import "./CarForm.css";

//M-UI
import { TextField, Button } from "@material-ui/core";

interface ICarForm {
  method: Method;
  setFormModalIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setCars: React.Dispatch<React.SetStateAction<ICar[] | []>>;
  initialValues: ICar | null;
  setSelectedCar: React.Dispatch<React.SetStateAction<ICar | null>>;
  serverRequestInfo: IServerRequestsInfo;
  cars: ICar[] | [];
}

Modal.setAppElement("#root");
const CarForm: React.FC<ICarForm> = ({
  serverRequestInfo,
  setFormModalIsOpen,
  setCars,
  cars,
  initialValues,
  method,
  setSelectedCar,
}) => {
  const handleSubmit: (values: ICar) => void = (values) => {
    let { url, requestFunction } = serverRequestInfo;

    url = initialValues ? `${url}/${initialValues._id}` : url;
    axios({ method: method, url: url, data: values })
      .then((res) => {
        if (res.status === 201 || 200) {
          setCars(
            requestFunction(
              cars,
              res.data,
              initialValues ? initialValues._id : null
            )
          );
          setFormModalIsOpen(false);
        }
      })
      .catch((err) => console.log("Error", err));
    setSelectedCar(null);
  };

  if (!initialValues) {
    initialValues = {
      car: "",
      car_model: "",
      car_model_year: "",
      car_color:"",
      img: "",
      price: "",
      _id: "",
    };
  }

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
    <form
      data-testid="car-form"
      onSubmit={(e) => {
        e.preventDefault();
        formik.handleSubmit();
      }}
    >
      <span
        className="CarForm_closeWindow"
        onClick={() => {
          setSelectedCar(null);
          setFormModalIsOpen(false);
        }}
      >
        Close window
      </span>
      <TextField
        id="car"
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
        id="car_model"
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
        id="car_model_year"
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
        id="car_color"
        value={formik.values.car_color}
        onChange={handleChange}
        required={true}
        name="car_color"
        inputProps={{ "data-testid": "car-form-input" }}
      />
      <TextField
        fullWidth
        label="Image URL"
        id="img"
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
        color="primary"
      >
        Submit
      </Button>
    </form>
  );
};

export default CarForm;
