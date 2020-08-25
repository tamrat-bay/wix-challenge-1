import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AppBar, Toolbar, IconButton } from "@material-ui/core";
import { AuthContext } from "../../contexts/auth.context";

import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Fade from '@material-ui/core/Fade';

import "./Navbar.css";

const Navbar: React.FC = () => {
  const { user, dispatch } = useContext(AuthContext);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
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
                Drive-Happier
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
              <div>
             <div className="Navbar_authMenu">
                <Button
                  aria-controls="fade-menu"
                  aria-haspopup="true"
                  onClick={handleClick}
                >
                  <i style={{color:'white'}} className="fas fa-users"></i>
                </Button>
                <Menu
                  id="fade-menu"
                  anchorEl={anchorEl}
                  keepMounted
                  open={open}
                  onClose={handleClose}
                  TransitionComponent={Fade}
                >
                  <Link to="/signup">
                    <MenuItem className="Navbar_authMenu_link" onClick={handleClose}>Sign Up
                  </MenuItem></Link>
                  <Link to="/login">
                    <MenuItem className="Navbar_authMenu_link" onClick={handleClose}>Login</MenuItem>
                  </Link>
                </Menu>
              </div>
              </div>
            )}
          </nav>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;

