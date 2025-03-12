import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Button,
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem
} from "@mui/material";
import {
  Menu as MenuIcon,
  Home,
  Fastfood,
  Info,
  Map,
  Group,
  Book,
  LocationCity,
  ExpandMore,
  ZoomIn
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

const MenuBar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null); // For dropdown menu
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const menuItems = [
    { label: "Home", path: "/", icon: <Home /> },
    {
      label: "Find",
      icon: <ZoomIn />, // 🔍 Zoom icon for "Find"
      dropdown: [
        { label: "Food", path: "/food" },
        { label: "Assistance", path: "/assistance" },
        { label: "Charities", path: "/charities" },
        { label: "Senior Services", path: "/senior-services" }
      ]
    },
    { label: "Food Atlas", path: "https://experience.arcgis.com/experience/61e914cf99364188a23f20b46721f2a3", icon: <Map /> }, 
    { label: "About Us", path: "/about", icon: <Info /> },
    { label: "Organize", path: "https://foodlink.wvu.edu/pages/organize", icon: <Group /> },
    { label: "Resources", path: "/resources", icon: <Book /> },
    { label: "County", path: "/county", icon: <LocationCity /> }
  ];

  return (
    <AppBar position="fixed" sx={{ bgcolor: "#8b0000", padding: 1 }}>
      <Toolbar sx={{ justifyContent: "space-between", alignItems: "center" }}>
        {/* Foodlink Logo */}
        <Box>
          <img
            src="https://www.arcgis.com/sharing/rest/content/items/0c60d0d0fe1a4746a40284e0fdda8e87/resources/Foodlink_use_mePNG-e1497287846786.png?v=1734104308181"
            alt="Foodlink Logo"
            style={{ height: 40 }}
          />
        </Box>

        {isMobile ? (
          <>
            {/* Mobile Menu Button */}
            <IconButton edge="end" color="inherit" onClick={toggleDrawer(true)}>
              <MenuIcon />
            </IconButton>

            {/* Mobile Drawer */}
            <Drawer
              anchor="right"
              open={drawerOpen}
              onClose={toggleDrawer(false)}
              sx={{ "& .MuiDrawer-paper": { width: 250 } }} // Adjusted drawer width
            >
              <List>
                {menuItems.map((item, index) =>
                  item.dropdown ? (
                    <React.Fragment key={index}>
                      <ListItemButton onClick={handleMenuOpen}>
                        <ListItemIcon>{item.icon}</ListItemIcon>
                        <ListItemText primary={item.label} />
                        <ExpandMore />
                      </ListItemButton>
                      <Menu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={handleMenuClose}
                        anchorOrigin={{ vertical: "top", horizontal: "right" }}
                        transformOrigin={{ vertical: "top", horizontal: "right" }}
                      >
                        {item.dropdown.map((subItem, subIndex) => (
                          <MenuItem
                            key={subIndex}
                            component="a"
                            href={subItem.path}
                            target={subItem.path.startsWith("http") ? "_blank" : "_self"}
                          >
                            {subItem.label}
                          </MenuItem>
                        ))}
                      </Menu>
                    </React.Fragment>
                  ) : (
                    <ListItemButton
                      component="a"
                      href={item.path}
                      key={index}
                      onClick={toggleDrawer(false)}
                      sx={{ display: "flex", alignItems: "center", gap: 1, padding: "12px 16px" }}
                      target={item.path.startsWith("http") ? "_blank" : "_self"}
                    >
                      <ListItemIcon>{item.icon}</ListItemIcon>
                      <ListItemText primary={item.label} />
                    </ListItemButton>
                  )
                )}
              </List>
            </Drawer>
          </>
        ) : (
          // Desktop Menu
          <Box sx={{ display: "flex", gap: 2 }}>
            {menuItems.map((item, index) =>
              item.dropdown ? (
                <React.Fragment key={index}>
                  <Button
                    color="inherit"
                    startIcon={item.icon} // Zoom icon next to "Find"
                    endIcon={<ExpandMore />}
                    onClick={handleMenuOpen}
                    sx={{ textTransform: "none", fontSize: "16px" }}
                  >
                    {item.label}
                  </Button>
                  <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleMenuClose}
                    anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                    transformOrigin={{ vertical: "top", horizontal: "left" }}
                  >
                    {item.dropdown.map((subItem, subIndex) => (
                      <MenuItem
                        key={subIndex}
                        component="a"
                        href={subItem.path}
                        target={subItem.path.startsWith("http") ? "_blank" : "_self"}
                      >
                        {subItem.label}
                      </MenuItem>
                    ))}
                  </Menu>
                </React.Fragment>
              ) : (
                <Button
                  key={index}
                  component="a"
                  href={item.path}
                  color="inherit"
                  startIcon={item.icon}
                  sx={{ textTransform: "none", fontSize: "16px" }}
                  target={item.path.startsWith("http") ? "_blank" : "_self"}
                >
                  {item.label}
                </Button>
              )
            )}
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default MenuBar;
