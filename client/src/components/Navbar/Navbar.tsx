import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AppBar, Toolbar, IconButton } from "@material-ui/core";
import { AuthContext } from "../../contexts/auth.context";

import "./Navbar.css";

const Navbar: React.FC = () => {
  const { user, dispatch } = useContext(AuthContext);
  return (
    <div className="Navbar">
      <AppBar data-testid="navbar">
        <Toolbar>
        <nav>
          <Link to="/">
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              style={{ fontSize: "1.1em" }}
            >
              WIX Cars Challenge
            </IconButton>
          </Link>
         
            {user.isLoggedIn ? (
              <>
                <Link to="/carsboard">Cars Board</Link>
                <span className="Navbar_status_links">
                <Link
                  to="/"
                  onClick={() => {
                    localStorage.clear();
                    dispatch({ type: "logOut" });
                  }}
                >
                  Log Out
                </Link>
                </span>
              </>
            ) : (
              <span className="Navbar_status_links">
                <Link to="/login">Login</Link>
                <Link to="/signup">Sign Up</Link>
              </span>
            )}
          </nav>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;
