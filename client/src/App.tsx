import React  from "react";
import CarsBoard from "./components/CarsBoard/CarsBoard";
import Navbar from "./components/Navbar/Navbar";
import Login from "./components/Authentication/Login/Login";
import SignUp from "./components/Authentication/SignUp/SignUp";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import "./App.css";

const App: React.FC = () => {

  return (
    <div data-testid="app" className="App">
      <Router>
        <Navbar />
        <Switch>
          <Route exact path='/' component={CarsBoard} />
          <Route exact path='/login' component={Login} />
          <Route exact path='/signup' component={SignUp} />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
