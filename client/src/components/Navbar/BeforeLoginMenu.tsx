import React from 'react'
import {Button,Menu,MenuItem, Fade} from '@material-ui/core';
import { Link } from "react-router-dom";

interface IBeforeLoginMenu {
    open: boolean;
    anchorEl: HTMLElement | null;
    handleClick: (event: React.MouseEvent<HTMLElement>) => void;
    handleClose: () => void;
}

const BeforeLoginMenu:React.FC<IBeforeLoginMenu> = ({handleClick,anchorEl,handleClose,open}) => {
    return (
        <div className="Navbar_dropMenu">
        <Button
          aria-controls="fade-menu"
          aria-haspopup="true"
          onClick={handleClick}
        >
          <i style={{ color: "white" }} className="fas fa-users"></i>
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
            <MenuItem
              className="Navbar_authMenu_link"
              onClick={handleClose}
            >
              Sign Up
            </MenuItem>
          </Link>
          <Link to="/login">
            <MenuItem
              className="Navbar_dropMenu_link"
              onClick={handleClose}
            >
              Login
            </MenuItem>
          </Link>
        </Menu>
      </div>
    )
}

export default BeforeLoginMenu
