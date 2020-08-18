import React, { useContext } from "react";
import { Link } from "react-router-dom";
import './Navbar.css'
import { AppBar, Toolbar, IconButton  } from "@material-ui/core";
import { AuthContext } from "../../contexts/auth.context";


const Navbar: React.FC = () => {
  const { user, dispatch } = useContext(AuthContext);

  return (
    <div className="Navbar">
      <AppBar data-testid="navbar">
        <Toolbar>
          <Link to="/">
          <IconButton 
            edge="start"
            color="inherit"
            aria-label="menu"
            style={{fontSize: "1.1em"}}
          >
            WIX Cars Challenge
          </IconButton>
          </Link>
          <nav>
            {user.isLoggedIn ? 
            <Link to="/" onClick={() => {localStorage.clear(); dispatch({type : 'logOut'}) }}>Log Out</Link>
             : 
            <>
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign Up</Link>
            </>
          }
          </nav>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;
