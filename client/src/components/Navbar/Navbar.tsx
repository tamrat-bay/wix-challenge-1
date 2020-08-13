import React from "react";
import { AppBar, Toolbar, IconButton } from "@material-ui/core";

const Navbar: React.FC = () => {
  return (
    <div>
      <AppBar data-testid="navbar">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            href="#home"
            aria-label="menu"
            style={{fontSize: "1.1em"}}
          >
            WIX Cars Challenge
          </IconButton>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;
