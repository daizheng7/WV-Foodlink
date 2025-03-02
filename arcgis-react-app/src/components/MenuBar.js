import React, { useState } from "react";
import { AppBar, Toolbar, Button, Box, IconButton, Drawer, List, ListItem, ListItemText } from "@mui/material";
import { Menu as MenuIcon, Home, Fastfood, Info, Map, Group, Book, LocationCity } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

const MenuBar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  const menuItems = [
    { label: "Home", path: "/", icon: <Home /> },
    { label: "Food", path: "/food", icon: <Fastfood /> },
    { label: "About Us", path: "/about", icon: <Info /> },
    { label: "Food Atlas", path: "https://experience.arcgis.com/experience/61e914cf99364188a23f20b46721f2a3", icon: <Map /> },
    { label: "Organize", path: "https://foodlink.wvu.edu/pages/organize", icon: <Group /> },
    { label: "Resources", path: "/about", icon: <Book /> },
    { label: "County", path: "/county", icon: <LocationCity /> },
  ];

  return (
    <AppBar position="fixed" sx={{ bgcolor: "#8b0000", padding: 1 }}>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        {/* Foodlink Logo */}
        <Box>
          <img
            src="https://www.arcgis.com/sharing/rest/content/items/0c60d0d0fe1a4746a40284e0fdda8e87/resources/Foodlink_use_mePNG-e1497287846786.png?v=1734104308181"
            alt="Foodlink Logo"
            style={{ height: 50 }}
          />
        </Box>

        {isMobile ? (
          <>
            <IconButton edge="end" color="inherit" onClick={toggleDrawer(true)}>
              <MenuIcon />
            </IconButton>
            <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
              <List>
                {menuItems.map((item, index) => (
                  <ListItem button component={Link} to={item.path} key={index} onClick={toggleDrawer(false)}>
                    {item.icon} &nbsp;
                    <ListItemText primary={item.label} />
                  </ListItem>
                ))}
              </List>
            </Drawer>
          </>
        ) : (
          <Box sx={{ display: "flex", gap: 2 }}>
            {menuItems.map((item, index) => (
              <Button key={index} component={Link} to={item.path} color="inherit" startIcon={item.icon}>
                {item.label}
              </Button>
            ))}
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default MenuBar;
