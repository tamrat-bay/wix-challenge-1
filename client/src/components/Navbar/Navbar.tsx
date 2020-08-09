import React from "react";
import { AppBar, Toolbar, IconButton } from "@material-ui/core";

const Navbar: React.SFC = () => {
  return (
    <div>
      <AppBar>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            href="#home"
            aria-label="menu"
          >
            TB - Cars Challenge
          </IconButton>
          <nav>
            <a color="inherit" href="#About">
              About
            </a>
            <a color="inherit" href="#Projects">
              Projects
            </a>
            <a color="inherit" href="#Contact">
              Contact
            </a>
          </nav>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;
