import React, { useState } from "react";
import { useFormik } from "formik";
import axios from "axios";
import { Redirect, Link } from "react-router-dom";
//M-UI
import { TextField, Button } from "@material-ui/core";
import LoginWithFacebook from "../LoginWithFacebook/LoginWithFacebook";
import '../Authentication.css'
import { log } from "util";

interface ISignUp {
  password: string;
  name: string;
  email: string;
}

const SignUp: React.FC = () => {
  const [isSignedUp, setIsSignedUp] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>();

  const handleSubmit: (values: any) => void = (values) => {
    if (values.password !== values.confirmPassword  ) {
      setErrorMessage('Passwords don`t match')
    }else{
         values = {...values, authType: 'signupForm'}
         axios.post('/users/signup',values)
         .then(res => {
           if(res.status === 201){
            setIsSignedUp(true)
           }
         })
         .catch(err => {console.log(err); setErrorMessage(err.response.data)})
    }
  };

  const handleChange = (e: string | React.ChangeEvent<any>) => {
    formik.handleChange(e);
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      password: "",
      confirmPassword: "",
      email: "",
    },
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  if(isSignedUp) return <Redirect to="/login" />

  return (
    <div className="Authentication">
        <h3>Sign up here</h3>
      <form
        data-testid="signup-form"
        onSubmit={(e) => {
          e.preventDefault();
          formik.handleSubmit();
        }}
      >
        {errorMessage ? <p className="auth_error">{errorMessage} </p> : null }
        <TextField
          id="name"
          fullWidth
          label="User Name"
          placeholder="John Doe"
          value={formik.values.name}
          onChange={handleChange}
          required={true}
          name="name"
          inputProps={{ "data-testid": "signup-form-input" }}
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
          inputProps={{ "data-testid": "signup-form-input" }}
        />
        <TextField
          id="confirmPassword"
          fullWidth
          label="Confirm Password"
          value={formik.values.confirmPassword}
          onChange={handleChange}
          required={true}
          name="confirmPassword"
          type="password"
          autoComplete="false"
          inputProps={{ "data-testid": "signup-form-input" }}
        />
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
          inputProps={{ "data-testid": "signup-form-input" }}
        />
        <Button
          data-testid="signup-form-submit-btn"
          variant="outlined"
          type="submit"
          color="primary"
        >
          Sign Up
        </Button>
      </form>
      <Link to="/login">
      <Button
            data-testid="signup-form-submit-btn"
            variant="outlined"
            type="submit"
            color="primary"
          >
            Already have an account ?
          </Button>
      </Link>
      <LoginWithFacebook />
    </div>
  );
};

export default SignUp;
