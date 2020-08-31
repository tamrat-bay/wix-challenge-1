import React,{ useContext, useState} from "react";
import Modal from "react-modal";
import { useFormik } from "formik";
import { ICar } from "../../models/ICar";
import { Method } from "axios";
import { AuthContext } from "../../contexts/auth.context";
import { postCarResponseHandler, editCarResponseHandler, editAndPostRequestHandler } from './CarFormHelper'
import "./CarForm.css";

//M-UI
import { TextField, Button } from "@material-ui/core";

interface ICarForm {
  method: Method;
  formModalCloseRequest: () => void;
  setCars: React.Dispatch<React.SetStateAction<ICar[] | []>>;
  initialValues: ICar | null;
  setSelectedCar: React.Dispatch<React.SetStateAction<ICar | null>>;
  cars: ICar[] | [];
  filterFlag?: boolean
  setCarsForDisplay?: React.Dispatch<React.SetStateAction<ICar[] | []>>
}

Modal.setAppElement("#root");
const CarForm: React.FC<ICarForm> = ({
  formModalCloseRequest,
  setCars,
  cars,
  initialValues,
  method,
  setSelectedCar,
  setCarsForDisplay
  // filterFlag,
  // setFilteredCars
}) => {

  const { user } = useContext(AuthContext);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const isPostMethod = method === 'post'
  let { urlBuilder, responseHandler } = isPostMethod ? postCarResponseHandler : editCarResponseHandler

  const handleSubmit = async (formValues: ICar) => {
    const { _id, authType } = JSON.parse(localStorage.user);
    const postURL:string = urlBuilder(authType,_id);
    const editURL:string = urlBuilder(authType,initialValues!._id);
    const url = isPostMethod ? postURL : editURL;
    setIsLoading(true);
    
    if(formValues.img && !checkImageURL(formValues.img)) return setErrorMessage('Please use valid image URL');

    try {
        const result = await editAndPostRequestHandler(method, formValues, user.fbUserID, url)
        const carID = initialValues ? initialValues._id : null;
        const updatedCars = responseHandler(cars, result.data, carID);
        setCars(updatedCars);
        if (setCarsForDisplay) {setCarsForDisplay(updatedCars)}
        formModalCloseRequest();
    } catch (err) {
        console.log(err)
        setIsLoading(false)
    }
  };

  const submitBtnText = isLoading ? 'Loading . . .' : 'SUBMIT'

  if (!initialValues) {
    initialValues = {
      car: "",
      car_model: "",
      car_model_year: '',
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
        onClick={formModalCloseRequest}
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
        InputProps={{ inputProps: { min: 200, max: 900000 } }}
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
        disabled={isLoading}
      >
        {submitBtnText}
      </Button>
    </form>
  );
};

export default CarForm;
