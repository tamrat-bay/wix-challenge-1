import React from "react";
import CarsBoard from "./components/CarsBoard/CarsBoard";
import Navbar from "./components/Navbar/Navbar";
import Login from "./components/Authentication/Login/Login";
import SignUp from "./components/Authentication/SignUp/SignUp";
import Home from "./components/Home/Home";
import PageNotFound from "./components/PageNotFound/PageNotFound";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import "./App.css";

const App: React.FC = () => {
  return (
    <div data-testid="app" className="App">
      <Router>
        <Navbar />
        <div className="App_container">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/carsboard" component={CarsBoard} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={SignUp} />
            <Route component={PageNotFound}/>
          </Switch>
        </div>
      </Router>
    </div>
  );
};

export default App;
