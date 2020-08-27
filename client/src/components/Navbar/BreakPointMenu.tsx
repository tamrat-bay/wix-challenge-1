import React from 'react'
import {Button,Menu,MenuItem, Fade} from '@material-ui/core';
import { Link } from "react-router-dom";

interface IBreakPointMenu {
    open: boolean;
    dispatch: any;
    anchorEl: HTMLElement | null;
    handleClick: (event: React.MouseEvent<HTMLElement>) => void;
    handleClose: () => void;
}

const BreakPointMenu:React.FC<IBreakPointMenu> = ({handleClick,anchorEl,handleClose,open,dispatch}) => {
    return (
        <div className="Navbar_dropMenu">
        <Button
          aria-controls="fade-menu"
          aria-haspopup="true"
          onClick={handleClick}
        >
          <i
            style={{ color: "white" }}
            className="fab fa-buromobelexperte"
          ></i>
        </Button>
        <Menu
          id="fade-menu"
          anchorEl={anchorEl}
          keepMounted
          open={open}
          onClose={handleClose}
          TransitionComponent={Fade}
        >
          <Link to="/cars-board">
            <MenuItem
              className="Navbar_authMenu_link"
              onClick={handleClose}
            >
              CARS-BOARD
            </MenuItem>
          </Link>
          <Link to="/personal-area">
            <MenuItem
              className="Navbar_authMenu_link"
              onClick={handleClose}
            >
              PERSONAL-AREA
            </MenuItem>
          </Link>
          <Link to="/">
            <MenuItem
              className="Navbar_dropMenu_link"
              onClick={() => {
                handleClose();
                localStorage.clear();
                dispatch({ type: "logOut" });
              }}
            >
              LOG OUT
            </MenuItem>
          </Link>
        </Menu>
      </div>
    )
}

export default BreakPointMenu
