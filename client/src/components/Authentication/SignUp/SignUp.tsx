import React, { useState, useContext } from "react";
import { useFormik } from "formik";
import { Redirect, Link, useHistory  } from "react-router-dom";
import { AuthContext } from "../../../contexts/auth.context";
import { signUpWithJwt } from '../AuthenticationApi'
import "../Authentication.css";

//M-UI
import { TextField, Button, Grid } from "@material-ui/core";
import LoginWithFacebook from "../LoginWithFacebook/LoginWithFacebook";



const SignUp: React.FC = () => {
  const [isSignedUp, setIsSignedUp] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const history = useHistory();
  const { user, dispatch } = useContext(AuthContext);

  interface ISignUp {
    password: string;
    confirmPassword: string;
    name: string;
    email: string;
    authType?: string;
  }

  const handleSubmit = async (userData: ISignUp) => {
    dispatch({ type: "loading" });
    if (userData.password !== userData.confirmPassword) {
      dispatch({ type: "error" });
      return setErrorMessage("Passwords don`t match");
    }
    userData = { ...userData, authType: "jwt" };

    try {
        await signUpWithJwt(userData);
        setIsSignedUp(true);
        dispatch({ type: "loading" });
        history.push("/login");
    } catch (error) {
        setErrorMessage(error.response.data);
        dispatch({ type: "error" });
    }
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      password: "",
      confirmPassword: "",
      email: "",
    },
    onSubmit:handleSubmit
  });

  const displayErrorIfNeeded = errorMessage ? <p className="Authentication_error">{errorMessage} </p> : null;
  const submitBtnText = user.isLoading ? 'loading . . .' :  'Sign Up'

  if (isSignedUp) return <Redirect to="/login" />;

  return (
    <Grid item={true} md={4} sm={6} xs={10} className="Authentication">
      <form data-testid="signup-form" onSubmit={formik.handleSubmit}>
        {displayErrorIfNeeded}
        <TextField
          id="name"
          fullWidth
          label="User Name"
          placeholder="John Doe"
          value={formik.values.name}
          onChange={formik.handleChange}
          required
          name="name"
          inputProps={{ "data-testid": "signup-form-input" }}
        />
        <TextField
          id="email"
          fullWidth
          label="email"
          placeholder="johndoe@test.com"
          value={formik.values.email}
          onChange={formik.handleChange}
          required
          name="email"
          type="email"
          autoComplete="true"
          inputProps={{ "data-testid": "signup-form-input" }}
        />
        <TextField
          id="password"
          fullWidth
          label="Password"
          value={formik.values.password}
          onChange={formik.handleChange}
          required
          name="password"
          type="password"
          autoComplete="false"
          InputProps={{ inputProps: { minLength : 3 } }}
          inputProps={{ "data-testid": "signup-form-input" }}
        />
        <TextField
          id="confirmPassword"
          fullWidth
          label="Confirm Password"
          value={formik.values.confirmPassword}
          onChange={formik.handleChange}
          required
          name="confirmPassword"
          type="password"
          autoComplete="false"
          InputProps={{ inputProps: { minLength : 3 } }}
          inputProps={{ "data-testid": "signup-form-input" }}
        />
        <Button
          data-testid="signup-form-submit-btn"
          variant="outlined"
          type="submit"
          color="primary"
          disabled={user.isLoading}
        >
          {submitBtnText}
        </Button>
      </form>
      <div className="Authentication_links">
        <Link to="/login">
          <Button
            data-testid="signup-form-submit-btn"
            variant="outlined"
            color="primary"
          >
            Already have an account ?
          </Button>
        </Link>
        <LoginWithFacebook btnText="Sign Up With Facebook" />
      </div>
    </Grid>
  );
};

export default SignUp;
