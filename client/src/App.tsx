import React from "react";
import CarsBoard from "./components/CarsBoard/CarsBoard";
import Navbar from "./components/Navbar/Navbar";
import Login from "./components/Authentication/Login/Login";
import SignUp from "./components/Authentication/SignUp/SignUp";
import PageNotFound from "./components/PageNotFound/PageNotFound";
import Home from "./components/Home/Home";
import PersonalArea from "./components/PersonalArea/PersonalArea";
import { BrowserRouter  , Route, Switch } from "react-router-dom";
import "./App.css";

const App: React.FC = () => {
  return (
    <div data-testid="app" className="App">
      <BrowserRouter>
        <Navbar />
        <div className="App_container">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/cars-board" component={CarsBoard} />
            <Route exact path="/personal-area" component={PersonalArea} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={SignUp} />
            <Route component={PageNotFound}/>
          </Switch>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
