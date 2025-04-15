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
  Divider,
  Grid,
  Typography,
  Paper,
  Tooltip
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
  ZoomIn,
  CreditCard,
  School,
  Restaurant,
  LocalMall,
  Storefront,
  Agriculture,
  NaturePeople,
  AccountBalance,
  Public,
  Diversity3,
  LightbulbCircle,
  RestaurantMenu,
  HelpCenter,
  FoodBank,
  GavelOutlined
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

const MenuBar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null); // For desktop dropdown menu
  const [resourcesAnchorEl, setResourcesAnchorEl] = useState(null); // For Resources dropdown
  const [openDropdowns, setOpenDropdowns] = useState({
    find: false,
    resources: false
  });
  
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
    // Close any open dropdowns when closing drawer
    if (!open) {
      setOpenDropdowns({
        find: false,
        resources: false
      });
    }
  };

  const handleMenuOpen = (menu) => (event) => {
    if (menu === 'find') {
      setAnchorEl(event.currentTarget);
    } else if (menu === 'resources') {
      setResourcesAnchorEl(event.currentTarget);
    }
  };

  const handleMenuClose = (menu) => () => {
    if (menu === 'find') {
      setAnchorEl(null);
    } else if (menu === 'resources') {
      setResourcesAnchorEl(null);
    }
  };

  const toggleMobileDropdown = (key) => () => {
    setOpenDropdowns(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const resourcesItems = [
    { title: 'SNAP + WIC', icon: <CreditCard sx={{ color: '#354F5B' }} />, description: 'Enrollment in Cash-Equivalent Public Nutrition Assistance Programs.', url: 'https://www.arcgis.com/apps/dashboards/f44ec87fbabf4697959012640dc2d29f' },
    { title: 'SNAP-ED', icon: <School sx={{ color: '#39897E' }} />, description: 'Food Policy, Systems and Environmental Change interventions for Healthy Food Access Programming.', url: 'https://wvu.maps.arcgis.com/apps/dashboards/a2bc19f10d9647c39992283e9ec4d851' },
    { title: 'Congregate Meals', icon: <Restaurant sx={{ color: '#B1B5AB' }} />, description: 'Public Meal programs in Schools, Daycares and Senior Centers.', url: 'https://wvu.maps.arcgis.com/apps/instant/portfolio/index.html?appid=b442bf3a130248938d3f4323840fe50e' },
    { title: 'Charitable Food', icon: <LocalMall sx={{ color: '#C84C23' }} />, description: 'Details food pantries, soup kitchens, and school backpack programs.', url: 'https://wvu.maps.arcgis.com/apps/dashboards/783922e1a38646bda92e8ddfbb37961b' },
    { title: 'Farmers Markets', icon: <Storefront sx={{ color: '#002855' }} />, description: 'Information on local farmer-to-consumer markets and nutrition incentives.', url: 'https://www.arcgis.com/apps/dashboards/5095c3fd9b0c4934be43bc8f65c93b36' },
    { title: 'Agricultural Data', icon: <Agriculture sx={{ color: '#445525' }} />, description: 'Insights into farming practices, land use, and expenditures.', url: 'https://www.arcgis.com/apps/dashboards/2100f46c379b49ba8d5d4184c68d0ab0'},
    { title: 'Self-Provisioning', icon: <NaturePeople sx={{ color: '#D4D2C2' }} />, description: 'Gardening and hunting data related to food self-sufficiency.', url: 'https://www.arcgis.com/apps/dashboards/60c2dc75756c485f9d135d14826464f4' },
    { title: 'Political Participation', icon: <AccountBalance sx={{ color: '#39897E' }} />, description: 'Voter registration and engagement.', url: 'https://www.arcgis.com/apps/dashboards/28258179da3a4fd0b1dcd0a053d402ec' },
    { title: 'County Summary', icon: <Public sx={{ color: '#354F5B' }} />, description: 'Data related to county-level food landscape.', url: '/county' },
    { title: 'Find Food', icon: <ZoomIn sx={{ color: '#C84C23' }} />, description: 'App to help you find fresh food based on your location.', url: '/food' },
    { title: 'Organize', icon: <Diversity3 sx={{ color: '#B1B5AB' }} />, description: 'Discover how to organize for the right to food in your community.', url: 'https://foodlink.wvu.edu/pages/organize-1' },
    { title: 'Learn', icon: <LightbulbCircle sx={{ color: '#002855' }} />, description: 'Learn how to create just and sustainable communities.', url: 'https://resilientcommunities.wvu.edu/' }
  ];

  const menuItems = [
    { label: "Home", path: "/", icon: <Home /> },
    {
      label: "Find",
      icon: <ZoomIn />,
      dropdown: [
        { label: "Food", icon: <RestaurantMenu />, path: "/food" },
        { label: "Assistance", icon: <HelpCenter />,path: "/assistance" },
        { label: "Charities", icon: <FoodBank />,path: "/charities" },
        
      ]
    },
    { label: "Food Atlas", path: "https://experience.arcgis.com/experience/61e914cf99364188a23f20b46721f2a3", icon: <Map /> }, 
    { label: "About Us", path: "/about", icon: <Info /> },
    { label: "Organize", path: "https://wvfoodlink-wvu.hub.arcgis.com/pages/organize-1", icon: <Group /> },
    { label: "Policies & Plans", path: "https://wvfoodlink-wvu.hub.arcgis.com/pages/nourishing-networks-reports", icon: <GavelOutlined /> },
    {
      label: "Resources",
      icon: <Book />,
      dropdown: resourcesItems
    }
  ];

  // Make this component more accessible by exposing labels in a screen reader friendly way
  const handleMenuItemKeyDown = (event, callback) => {
    if (event.key === "Enter" || event.key === " ") {
      callback();
    }
  };

  return (
    <AppBar position="fixed" sx={{ bgcolor: "#002855" }}>
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
                  width: "90%", 
                  maxWidth: 320,
                  height: "100%"
                } 
              }}
            >
              <Box sx={{ p: 2, bgcolor: "#002855", color: "white" }}>
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
                        onClick={toggleMobileDropdown(item.label.toLowerCase())}
                        aria-expanded={openDropdowns[item.label.toLowerCase()]}
                        aria-label={`${item.label} menu`}
                        onKeyDown={(e) => handleMenuItemKeyDown(e, toggleMobileDropdown(item.label.toLowerCase()))}
                      >
                        <ListItemIcon>{item.icon}</ListItemIcon>
                        <ListItemText primary={item.label} />
                        {openDropdowns[item.label.toLowerCase()] ? <ExpandLess /> : <ExpandMore />}
                      </ListItemButton>
                      <Collapse in={openDropdowns[item.label.toLowerCase()]} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                          {item.dropdown.map((subItem, subIndex) => (
                            <ListItemButton
                              key={subIndex}
                              component="a"
                              href={subItem.url || subItem.path}
                              target={(subItem.url || subItem.path).startsWith("http") ? "_blank" : "_self"}
                              sx={{ pl: 4 }}
                              onClick={toggleDrawer(false)}
                            >
                              <ListItemIcon sx={{ minWidth: '40px' }}>
                                {subItem.icon || null}
                              </ListItemIcon>
                              <ListItemText 
                                primary={subItem.title || subItem.label} 
                                secondary={item.label === "Resources" ? subItem.description : null}
                                primaryTypographyProps={{ 
                                  variant: "body1", 
                                  fontWeight: "medium"
                                }}
                                secondaryTypographyProps={{ 
                                  variant: "body2",
                                  sx: { 
                                    display: "-webkit-box",
                                    WebkitLineClamp: 2,
                                    WebkitBoxOrient: "vertical",
                                    overflow: "hidden"
                                  }
                                }}
                              />
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
                    onClick={handleMenuOpen(item.label.toLowerCase())}
                    aria-haspopup="true"
                    aria-expanded={item.label === "Find" ? Boolean(anchorEl) : Boolean(resourcesAnchorEl)}
                    sx={{ textTransform: "none", fontSize: "16px" }}
                  >
                    {item.label}
                  </Button>
                  {item.label === "Find" ? (
                    <Menu
                      anchorEl={anchorEl}
                      open={Boolean(anchorEl)}
                      onClose={handleMenuClose('find')}
                      MenuListProps={{
                        'aria-labelledby': 'find-dropdown-button',
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
                          onClick={handleMenuClose('find')}
                        >
                          {subItem.label}
                        </MenuItem>
                      ))}
                    </Menu>
                  ) : (
                    // Resources mega-menu
                    <Menu
                      anchorEl={resourcesAnchorEl}
                      open={Boolean(resourcesAnchorEl)}
                      onClose={handleMenuClose('resources')}
                      MenuListProps={{
                        'aria-labelledby': 'resources-dropdown-button',
                      }}
                      PaperProps={{
                        style: {
                          width: '680px',
                          maxWidth: '90vw',
                          padding: '16px'
                        }
                      }}
                      anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                      transformOrigin={{ vertical: "top", horizontal: "left" }}
                    >
                      <Grid container spacing={2}>
                        {resourcesItems.map((resource, idx) => (
                          <Grid item xs={6} sm={4} key={idx}>
                            <Tooltip title={resource.description} enterDelay={500} placement="top">
                              <Paper
                                component="a"
                                href={resource.url}
                                target={resource.url.startsWith("http") ? "_blank" : "_self"}
                                onClick={handleMenuClose('resources')}
                                elevation={1}
                                sx={{
                                p: 1.5,
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                transition: 'all 0.2s',
                                textDecoration: 'none',
                                color: 'inherit',
                                position: 'relative',
                                zIndex: 1,
                                '&:hover': {
                                  bgcolor: 'rgba(139, 0, 0, 0.08)',
                                  transform: 'translateY(-2px)',
                                  boxShadow: 2,
                                  zIndex: 2
                                }
                              }}
                            >
                              <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 1 }}>
                                <Box sx={{ mr: 1.5 }}>
                                  {resource.icon}
                                </Box>
                                <Typography variant="subtitle1" fontWeight="medium" gutterBottom>
                                  {resource.title}
                                </Typography>
                              </Box>
                              <Typography 
                                variant="body2"
                                color="text.secondary"
                                sx={{
                                  display: "-webkit-box",
                                  WebkitLineClamp: 2,
                                  WebkitBoxOrient: "vertical",
                                  overflow: "hidden",
                                  flex: 1
                                }}
                              >
                                {resource.description}
                              </Typography>
                            </Paper>
                            </Tooltip>
                          </Grid>
                        ))}
                      </Grid>
                    </Menu>
                  )}
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