import React,{ useContext, useState } from "react";
import Modal from "react-modal";
import { useFormik } from "formik";
import { ICar } from "../../models/ICar";
import axios, { Method } from "axios";
import { AuthContext } from "../../contexts/auth.context";
import { editCarUrlAndResponseFunction, postCarUrlAndResponseFunction } from './formRequestHelper'
import "./CarForm.css";

//M-UI
import { TextField, Button } from "@material-ui/core";

interface ICarForm {
  method: Method;
  setFormModalIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setCars: React.Dispatch<React.SetStateAction<ICar[] | []>>;
  initialValues: ICar | null;
  setSelectedCar: React.Dispatch<React.SetStateAction<ICar | null>>;
  cars: ICar[] | [];
  filterFlag: boolean
  setFilteredCars: React.Dispatch<React.SetStateAction<ICar[] | []>>
}

Modal.setAppElement("#root");
const CarForm: React.FC<ICarForm> = ({
  setFormModalIsOpen,
  setCars,
  cars,
  initialValues,
  method,
  setSelectedCar,
  filterFlag,
  setFilteredCars
}) => {

  const { user } = useContext(AuthContext);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const isPostMethod = method === 'post'
  let { urlBuilder, responseHandler } = isPostMethod ? postCarUrlAndResponseFunction : editCarUrlAndResponseFunction

  const handleSubmit = (formValues: ICar): void => {
    const { token, _id, authType} = JSON.parse(localStorage.user);
    const postURL:string = urlBuilder(authType,_id);
    const editURL:string = urlBuilder(authType,initialValues!._id);
    const url = isPostMethod ? postURL : editURL;

    if(formValues.img && !checkImageURL(formValues.img)) return setErrorMessage('Please use valid image URL')

    axios({
      method: method,
      url: url,
      data: formValues,
      headers: {
        Authorization: `Bearer ${token}`,
        fbUserID: user.fbUserID
      },
    })
      .then((res) => {
        if (res.status === 201 || 200) {
          const carID = initialValues ? initialValues._id : null
          const updatedCars = responseHandler(cars, res.data, carID)
          setCars(updatedCars);
          if(filterFlag) {setFilteredCars(updatedCars)}
          setFormModalIsOpen(false);
        }
      })
      .catch((err) => console.log(err));
    setSelectedCar(null);
  };

  if (!initialValues) {
    initialValues = {
      car: "",
      car_model: "",
      car_model_year: 1990,
      car_color:"",
      img: "",
      price: "",
      _id: "",
    };
  }
  const checkImageURL = (url:string):boolean => {
      return url.match(/^http.*\.(jpeg|jpg|gif|png)$/) != null
  }
  
  const displayErrorIfNeeded = errorMessage ?<p> {errorMessage} </p>: null

  const formik = useFormik({
    initialValues,
    onSubmit: handleSubmit
  });

  return (
    <form
      data-testid="car-form"
      onSubmit={formik.handleSubmit}>
       {displayErrorIfNeeded}
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
        onChange={formik.handleChange}
        required
        name="car"
        inputProps={{ "data-testid": "car-form-input" }}
      />
      <TextField
        fullWidth
        label="Model"
        id="car_model"
        placeholder="Corolla"
        value={formik.values.car_model}
        onChange={formik.handleChange}
        required
        name="car_model"
        inputProps={{ "data-testid": "car-form-input" }}
      />
      <TextField
        fullWidth
        label="Model Year"
        id="car_model_year"
        type="number"
        value={formik.values.car_model_year}
        InputProps={{ inputProps: { min: 1990, max: 2020 } }}
        onChange={formik.handleChange}
        required
        name="car_model_year"
        inputProps={{ "data-testid": "car-form-input" }}
      />
      <TextField
        fullWidth
        label="Price"
        id="price"
        type="number"
        value={formik.values.price}
        onChange={formik.handleChange}
        required
        name="price"
        InputProps={{ inputProps: { min: 100, max: 900000 } }}
        inputProps={{ "data-testid": "car-form-input" }}
      />
      <TextField
        fullWidth
        label="Color"
        id="car_color"
        value={formik.values.car_color}
        onChange={formik.handleChange}
        required
        name="car_color"
        inputProps={{ "data-testid": "car-form-input" }}
      />
      <TextField
        fullWidth
        label="Image URL"
        id="img"
        value={formik.values.img}
        onChange={formik.handleChange}
        type="url"
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
