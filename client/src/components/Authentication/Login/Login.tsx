import React, { useState, useContext } from "react";
import { useFormik } from "formik";
import axios from "axios";
import { Redirect, Link } from "react-router-dom";
import LoginWithFacebook from "../LoginWithFacebook/LoginWithFacebook";
import { AuthContext } from "../../../contexts/auth.context";
import '../Authentication.css'

//M-UI
import { TextField, Button } from "@material-ui/core";

interface ILogin {
  password: string;
  email: string;
}

const Login: React.FC = () => {
  const { user, dispatch } = useContext(AuthContext);
  const [errorMessage, setErrorMessage] = useState<string | null>();

  const handleSubmit: (values: any) => void = (values) => {
    axios.post('/users/login',values)
    .then(res => {
      if(res.status === 200){
        localStorage.setItem("user", JSON.stringify(res.data));
        dispatch({type: 'loggedIn'})
      }
    })
    .catch(err => {console.log(err); setErrorMessage(err.response.data)})
  };

  const handleChange = (e: string | React.ChangeEvent<any>) => {
    formik.handleChange(e);
  };

  const formik = useFormik({
    initialValues: {
      password: "",
      email: "",
    },
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  if (user.isLoggedIn) return <Redirect to="/" />;

  return (
    <div className="Authentication">
      <h3>Login</h3>
      <form
        data-testid="Login-form"
        onSubmit={(e) => {
          e.preventDefault();
          formik.handleSubmit();
        }}
      >
        {errorMessage ? <p className="auth_error">{errorMessage} </p> : null }
        <TextField
          id="email"
          fullWidth
          label="email"
          placeholder="johndoe@test.com"
          value={formik.values.email}
          onChange={handleChange}
          required={true}
          name="email"
          type="email"
          autoComplete="true"
          inputProps={{ "data-testid": "Login-form-input" }}
        />
        <TextField
          id="password"
          fullWidth
          label="Password"
          value={formik.values.password}
          onChange={handleChange}
          required={true}
          name="password"
          type="password"
          autoComplete="false"
          inputProps={{ "data-testid": "Login-form-input" }}
        />
        <Button
          data-testid="Login-form-submit-btn"
          variant="outlined"
          type="submit"
          color="primary"
        >
          Login
        </Button>
      </form>
      <Link to="/signup">
        <Button
          data-testid="signup-form-submit-btn"
          variant="outlined"
          type="submit"
          color="primary"
        >
          Don't have an account ?
        </Button>
      </Link>
      <LoginWithFacebook />
    </div>
  );
};

export default Login;
