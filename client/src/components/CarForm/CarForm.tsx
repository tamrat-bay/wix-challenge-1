import React,{ useContext, useState } from "react";
import Modal from "react-modal";
import { useFormik } from "formik";
import { ICar } from "../../models/ICar";
import { IServerRequestsInfo } from "../../models/IServerRequestsInfo";
import axios, { Method } from "axios";
import { AuthContext } from "../../contexts/auth.context";
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

  const { user } = useContext(AuthContext);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = (values: ICar): void => {
    let { url, requestFunction } = serverRequestInfo;
    const { token, _id, authType} = JSON.parse(localStorage.user);
    const postURL:string = `${url}/${authType}/${_id}`;
    const editURL:string  = `${url}/${authType}/${initialValues!._id}`;
    url = initialValues!._id ? editURL : postURL;

    
    if(checkImageURL(values.img)){
    axios({
      method: method,
      url: url,
      data: values,
      headers: {
        Authorization: `Bearer ${token}`,
        fbUserID: user.fbUserID
      },
    })
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
  }else{
    setErrorMessage('Please use valid image URL')
  }
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
      <p>{errorMessage ? errorMessage : null}</p>
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
        InputProps={{ inputProps: { min: 1990, max: 2020 } }}
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
