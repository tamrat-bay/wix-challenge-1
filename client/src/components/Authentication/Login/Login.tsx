import React, { useState, useContext } from "react";
import { useFormik } from "formik";
import { Redirect, Link, useHistory } from "react-router-dom";
import LoginWithFacebook from "../LoginWithFacebook/LoginWithFacebook";
import { AuthContext } from "../../../contexts/auth.context";
import { loginWithJwt } from '../AuthenticationHelper'
import "../Authentication.css";

//M-UI
import { TextField, Button, Grid } from "@material-ui/core";


const Login: React.FC = () => {
  const { user, dispatch } = useContext(AuthContext);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const history = useHistory();

  interface ILoginInfo {
    password: string;
    email: string;
  }

  const handleSubmit = (userData: ILoginInfo) => {
    dispatch({ type: "loading" });

    loginWithJwt(userData)
      .then((res) => {
        if(res.status === 200){
          localStorage.setItem("user", JSON.stringify(res.data));
          dispatch({ type: "loggedIn" });
          history.push("/cars-board");
        }
        else{
        setErrorMessage(res.response.data);
        dispatch({ type: "error" });
        }
      })

  };

  const displayErrorIfNeeded = errorMessage ? <p className="Authentication_error">{errorMessage} </p> : null;
  const submitBtnText = user.isLoading ? "loading . . ." : "Login";

  const formik = useFormik({
    initialValues: {
      password: "",
      email: "",
    },
    onSubmit: handleSubmit,
  });

  if (user.isLoggedIn) return <Redirect to="/" />;

  return (
    <Grid item={true} md={4} sm={6} xs={10} className="Authentication">
      <form data-testid="Login-form" onSubmit={formik.handleSubmit}>
        {displayErrorIfNeeded}
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
          inputProps={{ "data-testid": "Login-form-input" }}
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
          inputProps={{ "data-testid": "Login-form-input" }}
        />
        <Button
          data-testid="Login-form-submit-btn"
          variant="outlined"
          type="submit"
          color="primary"
          disabled={user.isLoading}
        >
          {submitBtnText}
        </Button>
      </form>
      <div className="Authentication_links">
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
        <LoginWithFacebook btnText="Login With Facebook" />
      </div>
    </Grid>
  );
};

export default Login;
