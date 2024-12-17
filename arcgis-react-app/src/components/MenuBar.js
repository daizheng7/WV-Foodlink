import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
  Menu,
  MenuItem,
  Button,
  useMediaQuery,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { Menu as MenuIcon, Search, AccountCircle, Close, ExpandMore } from "@mui/icons-material";

const MenuBar = () => {
  const [anchorEl, setAnchorEl] = useState(null); // For dropdown menu
  const [mobileOpen, setMobileOpen] = useState(false); // For mobile drawer

  const isMobile = useMediaQuery("(max-width:900px)");

  // Menu handling
  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);
  const toggleDrawer = () => setMobileOpen(!mobileOpen);

  // Menu items
  const navItems = [
    { name: "Home", link: "/" },
    { name: "Features", submenu: ["Feature 1", "Feature 2", "Feature 3"] },
    { name: "About", link: "/about" },
    { name: "Contact", link: "/contact" },
  ];

  return (
    <Box>
      {/* Top Navigation Bar */}
      <AppBar position="fixed" color="primary" sx={{ boxShadow: 3 }}>
        <Toolbar>
          {/* Logo */}
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, fontWeight: "bold", display: "flex", alignItems: "center" }}
          >
            <img
              src="https://example.com/logo.png"
              alt="Logo"
              style={{ height: 40, marginRight: 10 }}
            />
            MapFood
          </Typography>

          {/* Navigation Links */}
          {!isMobile &&
            navItems.map((item) =>
              item.submenu ? (
                <Button
                  key={item.name}
                  color="inherit"
                  endIcon={<ExpandMore />}
                  onClick={handleMenuOpen}
                >
                  {item.name}
                </Button>
              ) : (
                <Button key={item.name} color="inherit" href={item.link}>
                  {item.name}
                </Button>
              )
            )}

          {/* Search and Profile Icons */}
          <IconButton color="inherit">
            <Search />
          </IconButton>
          <IconButton color="inherit">
            <AccountCircle />
          </IconButton>

          {/* Mobile Menu Button */}
          {isMobile && (
            <IconButton color="inherit" edge="end" onClick={toggleDrawer}>
              <MenuIcon />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>

      {/* Dropdown Menu */}
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
        {navItems
          .find((item) => item.submenu)
          ?.submenu.map((subItem, index) => (
            <MenuItem key={index} onClick={handleMenuClose}>
              {subItem}
            </MenuItem>
          ))}
      </Menu>

      {/* Mobile Drawer */}
      <Drawer anchor="right" open={mobileOpen} onClose={toggleDrawer}>
        <Box sx={{ width: 250 }}>
          <IconButton onClick={toggleDrawer} sx={{ ml: "auto", display: "block" }}>
            <Close />
          </IconButton>
          <List>
            {navItems.map((item, index) => (
              <React.Fragment key={index}>
                <ListItem disablePadding>
                  <ListItemButton href={item.link || "#"}>
                    <ListItemText primary={item.name} />
                  </ListItemButton>
                </ListItem>
                {item.submenu &&
                  item.submenu.map((subItem, idx) => (
                    <ListItem key={idx} sx={{ pl: 4 }}>
                      <ListItemText primary={subItem} />
                    </ListItem>
                  ))}
              </React.Fragment>
            ))}
          </List>
        </Box>
      </Drawer>
    </Box>
  );
};

export default MenuBar;
