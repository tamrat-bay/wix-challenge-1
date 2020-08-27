import React, { useContext,useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { AppBar, Toolbar, IconButton } from "@material-ui/core";
import { AuthContext } from "../../contexts/auth.context";
import BreakPointMenu from "./BreakPointMenu";
import BeforeLoginMenu from "./BeforeLoginMenu";

import "./Navbar.css";


const Navbar: React.FC = () => {
  const { user, dispatch } = useContext(AuthContext);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [width, setWidth] = useState<number>(window.innerWidth);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const navbarBreakPoint = 600;

    useEffect(() => {
      window.addEventListener('resize',() =>{
        setWidth(window.innerWidth)
      })
      
    }, [width])

    const isBreakPoint = navbarBreakPoint >= width
    
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
                DRIVE-HAPPIER
              </IconButton>
            </Link>

            {user.isLoggedIn ? (
              <>
                {isBreakPoint ? (
                  <BreakPointMenu
                    open={open}
                    anchorEl={anchorEl}
                    dispatch={dispatch}
                    handleClick={handleClick}
                    handleClose={handleClose}
                  />
                ) : (
                  <>
                    <Link to="/cars-board">CARS-BOARD</Link>
                    <Link to="/personal-area">PERSONAL-AREA</Link>
                    <span className="Navbar_status_links">
                      <Link
                        to="/"
                        onClick={() => {
                          localStorage.clear();
                          dispatch({ type: "logOut" });
                        }}
                      >
                        LOG OUT
                      </Link>
                    </span>
                  </>
                )}
              </>
            ) : (
                <BeforeLoginMenu
                  open={open}
                  anchorEl={anchorEl}
                  handleClick={handleClick}
                  handleClose={handleClose}
                />
            )}
          </nav>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;

