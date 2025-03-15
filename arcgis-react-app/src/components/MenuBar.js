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
  MenuItem,
  Collapse,
  Divider
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
  ExpandLess,
  ZoomIn
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

const MenuBar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null); // For desktop dropdown menu
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false); // For mobile submenu
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
    // Close any open dropdowns when closing drawer
    if (!open) setMobileDropdownOpen(false);
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const toggleMobileDropdown = () => {
    setMobileDropdownOpen(!mobileDropdownOpen);
  };

  const menuItems = [
    { label: "Home", path: "/", icon: <Home /> },
    {
      label: "Find",
      icon: <ZoomIn />,
      dropdown: [
        { label: "Food", path: "/food" },
        { label: "Assistance", path: "/assistance" },
        { label: "Charities", path: "/charities" },
        { label: "Senior Services", path: "/senior-services" }
      ]
    },
    { label: "Food Atlas", path: "https://experience.arcgis.com/experience/61e914cf99364188a23f20b46721f2a3", icon: <Map /> }, 
    { label: "About Us", path: "/about", icon: <Info /> },
    { label: "Organize", path: "https://foodlink.wvu.edu/pages/organize-1", icon: <Group /> },
    { label: "Resources", path: "/resources", icon: <Book /> },
    { label: "County", path: "/county", icon: <LocationCity /> }
  ];

  // Make this component more accessible by exposing labels in a screen reader friendly way
  const handleMenuItemKeyDown = (event, callback) => {
    if (event.key === "Enter" || event.key === " ") {
      callback();
    }
  };

  return (
    <AppBar position="fixed" sx={{ bgcolor: "#8b0000" }}>
      <Toolbar sx={{ justifyContent: "space-between", alignItems: "center", py: { xs: 1, sm: 1.5 } }}>
        {/* Foodlink Logo */}
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <img
            src="https://www.arcgis.com/sharing/rest/content/items/0c60d0d0fe1a4746a40284e0fdda8e87/resources/Foodlink_use_mePNG-e1497287846786.png?v=1734104308181"
            alt="Foodlink Logo"
            style={{ height: isMobile ? 32 : 40 }}
          />
        </Box>

        {isMobile ? (
          <>
            {/* Mobile Menu Button */}
            <IconButton 
              edge="end" 
              color="inherit" 
              onClick={toggleDrawer(true)}
              aria-label="Open navigation menu"
              sx={{ padding: 1 }}
            >
              <MenuIcon fontSize="large" />
            </IconButton>

            {/* Mobile Drawer - Full Height */}
            <Drawer
              anchor="right"
              open={drawerOpen}
              onClose={toggleDrawer(false)}
              sx={{ 
                "& .MuiDrawer-paper": { 
                  width: "80%", 
                  maxWidth: 300,
                  height: "100%"
                } 
              }}
            >
              <Box sx={{ p: 2, bgcolor: "#8b0000", color: "white" }}>
                <img
                  src="https://www.arcgis.com/sharing/rest/content/items/0c60d0d0fe1a4746a40284e0fdda8e87/resources/Foodlink_use_mePNG-e1497287846786.png?v=1734104308181"
                  alt="Foodlink Logo"
                  style={{ height: 40 }}
                />
              </Box>
              <Divider />
              <List sx={{ pt: 0 }}>
                {menuItems.map((item, index) =>
                  item.dropdown ? (
                    <React.Fragment key={index}>
                      <ListItemButton 
                        onClick={toggleMobileDropdown}
                        aria-expanded={mobileDropdownOpen}
                        aria-label={`${item.label} menu`}
                        onKeyDown={(e) => handleMenuItemKeyDown(e, toggleMobileDropdown)}
                      >
                        <ListItemIcon>{item.icon}</ListItemIcon>
                        <ListItemText primary={item.label} />
                        {mobileDropdownOpen ? <ExpandLess /> : <ExpandMore />}
                      </ListItemButton>
                      <Collapse in={mobileDropdownOpen} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                          {item.dropdown.map((subItem, subIndex) => (
                            <ListItemButton
                              key={subIndex}
                              component="a"
                              href={subItem.path}
                              target={subItem.path.startsWith("http") ? "_blank" : "_self"}
                              sx={{ pl: 4 }}
                              onClick={toggleDrawer(false)}
                            >
                              <ListItemText primary={subItem.label} />
                            </ListItemButton>
                          ))}
                        </List>
                      </Collapse>
                    </React.Fragment>
                  ) : (
                    <ListItemButton
                      component="a"
                      href={item.path}
                      key={index}
                      onClick={toggleDrawer(false)}
                      target={item.path.startsWith("http") ? "_blank" : "_self"}
                      sx={{ py: 1.5 }}
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
          <Box sx={{ display: "flex", gap: 1 }}>
            {menuItems.map((item, index) =>
              item.dropdown ? (
                <React.Fragment key={index}>
                  <Button
                    color="inherit"
                    startIcon={item.icon}
                    endIcon={<ExpandMore />}
                    onClick={handleMenuOpen}
                    aria-haspopup="true"
                    aria-expanded={Boolean(anchorEl)}
                    sx={{ textTransform: "none", fontSize: "16px" }}
                  >
                    {item.label}
                  </Button>
                  <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleMenuClose}
                    MenuListProps={{
                      'aria-labelledby': 'dropdown-button',
                    }}
                    anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                    transformOrigin={{ vertical: "top", horizontal: "left" }}
                  >
                    {item.dropdown.map((subItem, subIndex) => (
                      <MenuItem
                        key={subIndex}
                        component="a"
                        href={subItem.path}
                        target={subItem.path.startsWith("http") ? "_blank" : "_self"}
                        onClick={handleMenuClose}
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
                  target={item.path.startsWith("http") ? "_blank" : "_self"}
                  sx={{ 
                    textTransform: "none", 
                    fontSize: "16px",
                    whiteSpace: "nowrap"
                  }}
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