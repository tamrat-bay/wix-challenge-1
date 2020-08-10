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
            TB - WIX Cars Challenge
          </IconButton>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;
