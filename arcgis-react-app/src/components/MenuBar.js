import React from "react";
import { AppBar, Toolbar, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";

const MenuBar = () => {
  return (
    <AppBar position="fixed" color="default" sx={{ padding: 2 }}>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        {/* Foodlink Logo */}
        <Box>
          <img
            src="https://www.arcgis.com/sharing/rest/content/items/0c60d0d0fe1a4746a40284e0fdda8e87/resources/Foodlink_use_mePNG-e1497287846786.png?v=1734104308181"
            alt="Foodlink Logo"
            style={{ height: 60 }}
          />
        </Box>

        {/* Navigation Links */}
        <Box sx={{ display: "flex", gap: 2 }}>
          <Button component={Link} to="/" color="inherit">
            Home
          </Button>
          <Button component={Link} to="/food" color="inherit">
            Food
          </Button>
          <Button component={Link} to="/about" color="inherit">
            About Us
          </Button>
          <Button component={Link} to="https://experience.arcgis.com/experience/61e914cf99364188a23f20b46721f2a3" color="inherit">
            Food Atlas
          </Button>
          <Button component={Link} to="https://foodlink.wvu.edu/pages/organize" color="inherit">
            Organize
          </Button>
          <Button component={Link} to="/about" color="inherit">
            Resources
          </Button>
          <Button component={Link} to="/county" color="inherit">
            County
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default MenuBar;
