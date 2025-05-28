import React, { useState } from "react";
import {
  Box,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemText,
  IconButton,
  useTheme,
  useMediaQuery,
  Collapse,
  Menu,
  MenuItem,
} from "@mui/material";
import {
  Menu as MenuIcon,
  ZoomIn,
  RestaurantMenu,
  HelpCenter,
  FoodBank,
  Home,
  Info,
  Group,
  Book,
  Map,
  GavelOutlined,
  CreditCard,
  School,
  Restaurant,
  LocalMall,
  Storefront,
  Agriculture,
  NaturePeople,
  AccountBalance,
  Public,
  ExpandMore,
  ExpandLess,
} from "@mui/icons-material";

const WVUHeader = () => (
  <header className="wvu-masthead bg-wvu-blue py-3">
    <div className="container">
      <div className="row align-items-center">
        {/* Logo */}
        <div className="col-md-6 col-lg-8 d-flex align-items-center">
          <a
            href="https://www.wvu.edu"
            target="_blank"
            rel="noopener noreferrer"
            className="d-flex align-items-center text-decoration-none"
          >
            <img
              src="/foodlink_white.png"
              alt="WVU Logo"
              style={{ height: 64, maxHeight: "10vh", marginRight: "1rem" }}
            />
          </a>
        </div>
        {/* Action buttons */}
        <div className="col-md-6 col-lg-4 d-flex justify-content-md-end mt-3 mt-md-0">
          <a href="/food" className="btn btn-outline-wvu-accent--blue-light me-2">
            Find Food
          </a>
          <a
            href="https://organize-communities-wvu.hub.arcgis.com/pages/organize"
            className="btn btn-outline-wvu-accent--sunset me-2"
          >
            Organize
          </a>
          <a
            href="https://resilientcommunities.wvu.edu"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline-wvu-gold"
          >
            Learn
          </a>
        </div>
      </div>
    </div>
  </header>
);

const WVUMenuBar = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("lg"));
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openIndex, setOpenIndex] = useState(null);
  const [anchorEls, setAnchorEls] = useState({});

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);
  const handleItemToggle = (index) => setOpenIndex(openIndex === index ? null : index);

  const handleDesktopMenuOpen = (event, index) => {
    setAnchorEls(prev => ({ ...prev, [index]: event.currentTarget }));
  };

  const handleDesktopMenuClose = (index) => {
    setAnchorEls(prev => ({ ...prev, [index]: null }));
  };

  const menuItems = [
    { label: "Home", icon: <Home />, href: "/" },
    {
      label: "Food Atlas",
      icon: <Map />,
      href: "https://experience.arcgis.com/experience/61e914cf99364188a23f20b46721f2a3",
    },
    { label: "About Us", icon: <Info />, href: "/about" },
    {
      label: "Find",
      icon: <ZoomIn />,
      children: [
        { label: "Food", href: "/food", icon: <RestaurantMenu /> },
        { label: "Assistance", href: "/assistance", icon: <HelpCenter /> },
        { label: "Charities", href: "/charities", icon: <FoodBank /> },
      ],
    },
    {
      label: "Organize",
      icon: <Group />,
      href: "https://wvfoodlink-wvu.hub.arcgis.com/pages/organize-1",
    },
    {
      label: "Policies",
      icon: <GavelOutlined />,
      href: "https://wvfoodlink-wvu.hub.arcgis.com/pages/nourishing-networks-reports",
    },
    {
      label: "Resources",
      icon: <Book />,
      children: [
        {
          label: "SNAP + WIC",
          href: "https://www.arcgis.com/apps/dashboards/f44ec87fbabf4697959012640dc2d29f",
          icon: <CreditCard />,
        },
        {
          label: "SNAP-ED",
          href: "https://wvu.maps.arcgis.com/apps/dashboards/a2bc19f10d9647c39992283e9ec4d851",
          icon: <School />,
        },
        {
          label: "Congregate Meals",
          href: "https://wvu.maps.arcgis.com/apps/instant/portfolio/index.html?appid=b442bf3a130248938d3f4323840fe50e",
          icon: <Restaurant />,
        },
        {
          label: "Charitable Food",
          href: "https://wvu.maps.arcgis.com/apps/dashboards/783922e1a38646bda92e8ddfbb37961b",
          icon: <LocalMall />,
        },
        {
          label: "Farmers Markets",
          href: "https://www.arcgis.com/apps/dashboards/5095c3fd9b0c4934be43bc8f65c93b36",
          icon: <Storefront />,
        },
        {
          label: "Agricultural Data",
          href: "https://www.arcgis.com/apps/dashboards/2100f46c379b49ba8d5d4184c68d0ab0",
          icon: <Agriculture />,
        },
        {
          label: "Self-Provisioning",
          href: "https://www.arcgis.com/apps/dashboards/60c2dc75756c485f9d135d14826464f4",
          icon: <NaturePeople />,
        },
        {
          label: "Political Participation",
          href: "https://www.arcgis.com/apps/dashboards/28258179da3a4fd0b1dcd0a053d402ec",
          icon: <AccountBalance />,
        },
        { label: "County Summary", href: "/county", icon: <Public /> },
      ],
    },
  ];

  return (
    <nav
      aria-label="Main navigation"
      className="wvu-site-nav bg-wvu-accent--blue-dark navbar navbar-expand-lg p-0 navbar-dark w-100"
    >
      <div className="container d-flex align-items-center">
        {/* Mobile hamburger */}
        {isMobile && (
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { lg: "none" }, color: '#fff' }}
          >
            <MenuIcon />
          </IconButton>
        )}

        {/* Desktop menu */}
        <Box sx={{ display: { xs: 'none', lg: 'flex' }, alignItems: 'center', flexGrow: 1 }}>
          {menuItems.map((item, index) => (
            <Box key={index} sx={{ position: 'relative' }}>
              {item.children ? (
                <>
                  <Button
                    onClick={(e) => handleDesktopMenuOpen(e, index)}
                    onMouseEnter={(e) => handleDesktopMenuOpen(e, index)}
                    sx={{
                      color: 'white',
                      textTransform: 'none',
                      px: 2,
                      py: 1,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1,
                      '&:hover': {
                        backgroundColor: 'rgba(255,255,255,0.08)'
                      },
                      '&:focus': {
                        outline: '2px solid #fff',
                        outlineOffset: '2px'
                      }
                    }}
                    endIcon={<ExpandMore />}
                    aria-haspopup="true"
                    aria-expanded={Boolean(anchorEls[index])}
                    aria-controls={`menu-${index}`}
                  >
                    {item.icon}
                    {item.label}
                  </Button>
                  <Menu
                    id={`menu-${index}`}
                    anchorEl={anchorEls[index]}
                    open={Boolean(anchorEls[index])}
                    onClose={() => handleDesktopMenuClose(index)}
                    MenuListProps={{
                      onMouseLeave: () => handleDesktopMenuClose(index),
                    }}
                    sx={{
                      '& .MuiPaper-root': {
                        backgroundColor: theme.palette.primary.dark,
                        color: 'white',
                        minWidth: 200
                      }
                    }}
                  >
                    {item.children.map((child, childIndex) => (
                      <MenuItem
                        key={childIndex}
                        onClick={() => handleDesktopMenuClose(index)}
                        component="a"
                        href={child.href}
                        target={child.href?.startsWith("http") ? "_blank" : "_self"}
                        rel={child.href?.startsWith("http") ? "noopener noreferrer" : undefined}
                        sx={{
                          color: 'white',
                          textDecoration: 'none',
                          display: 'flex',
                          alignItems: 'center',
                          gap: 1,
                          '&:hover': {
                            backgroundColor: 'rgba(255,255,255,0.08)'
                          },
                          '&:focus': {
                            outline: '2px solid #fff',
                            outlineOffset: '2px'
                          }
                        }}
                      >
                        {child.icon}
                        {child.label}
                      </MenuItem>
                    ))}
                  </Menu>
                </>
              ) : (
                <Button
                  component="a"
                  href={item.href}
                  target={item.href?.startsWith("http") ? "_blank" : "_self"}
                  rel={item.href?.startsWith("http") ? "noopener noreferrer" : undefined}
                  sx={{
                    color: 'white',
                    textTransform: 'none',
                    px: 2,
                    py: 1,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    textDecoration: 'none',
                    '&:hover': {
                      backgroundColor: 'rgba(255,255,255,0.08)'
                    },
                    '&:focus': {
                      outline: '2px solid #fff',
                      outlineOffset: '2px'
                    }
                  }}
                >
                  {item.icon}
                  {item.label}
                </Button>
              )}
            </Box>
          ))}
        </Box>

        {/* Search toggle */}
        <Box sx={{ ml: 'auto', display: 'flex', alignItems: 'center' }}>
          <IconButton
            sx={{ 
              color: 'white',
              '&:focus': {
                outline: '2px solid #fff',
                outlineOffset: '2px'
              }
            }}
            data-bs-toggle="collapse"
            data-bs-target="#wvuNavSearchCollapse2"
            aria-controls="wvuNavSearchCollapse2"
            aria-expanded="false"
            aria-label="Toggle Search"
          >
            <span className="fa-solid fa-magnifying-glass" />
          </IconButton>
        </Box>
      </div>

      {/* Mobile drawer */}
      <Drawer
        anchor="left"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        sx={{
          "& .MuiDrawer-paper": {
            backgroundColor: theme.palette.primary.dark,
            color: "#fff",
            width: 280,
          },
        }}
      >
        <Box role="presentation" sx={{ p: 2 }}>
          <List>
            {menuItems.map((item, index) => (
              <React.Fragment key={index}>
                {item.children ? (
                  <>
                    <ListItem
                      button
                      onClick={() => handleItemToggle(index)}
                      sx={{
                        color: 'white',
                        '&:hover': { backgroundColor: 'rgba(255,255,255,0.08)' },
                        '&:focus': {
                          outline: '2px solid #fff',
                          outlineOffset: '2px'
                        }
                      }}
                    >
                      <Box sx={{ mr: 2, display: 'flex', alignItems: 'center', color: 'white' }}>
                        {item.icon}
                      </Box>
                      <ListItemText primary={item.label} sx={{ color: 'white' }} />
                      {openIndex === index ? <ExpandLess /> : <ExpandMore />}
                    </ListItem>
                    <Collapse in={openIndex === index} timeout="auto" unmountOnExit>
                      <List component="div" disablePadding>
                        {item.children.map((child, childIndex) => (
                          <ListItem
                            key={childIndex}
                            button
                            component="a"
                            href={child.href}
                            target={child.href?.startsWith("http") ? "_blank" : "_self"}
                            rel={child.href?.startsWith("http") ? "noopener noreferrer" : undefined}
                            onClick={() => setMobileOpen(false)}
                            sx={{
                              pl: 6,
                              color: 'white',
                              textDecoration: 'none',
                              '&:hover': { backgroundColor: 'rgba(255,255,255,0.08)' },
                              '&:focus': {
                                outline: '2px solid #fff',
                                outlineOffset: '2px'
                              }
                            }}
                          >
                            <Box sx={{ mr: 2, display: 'flex', alignItems: 'center', color: 'white' }}>
                              {child.icon}
                            </Box>
                            <ListItemText primary={child.label} sx={{ color: 'white' }} />
                          </ListItem>
                        ))}
                      </List>
                    </Collapse>
                  </>
                ) : (
                  <ListItem
                    button
                    component="a"
                    href={item.href}
                    target={item.href?.startsWith("http") ? "_blank" : "_self"}
                    rel={item.href?.startsWith("http") ? "noopener noreferrer" : undefined}
                    onClick={() => setMobileOpen(false)}
                    sx={{
                      color: 'white',
                      textDecoration: 'none',
                      '&:hover': { backgroundColor: 'rgba(255,255,255,0.08)' },
                      '&:focus': {
                        outline: '2px solid #fff',
                        outlineOffset: '2px'
                      }
                    }}
                  >
                    <Box sx={{ mr: 2, display: 'flex', alignItems: 'center', color: 'white' }}>
                      {item.icon}
                    </Box>
                    <ListItemText primary={item.label} sx={{ color: 'white' }} />
                  </ListItem>
                )}
              </React.Fragment>
            ))}
          </List>
        </Box>
      </Drawer>
    </nav>
  );
};

const MenuBar = () => (
  <Box>
    <WVUHeader />
    <WVUMenuBar />
  </Box>
);

export default MenuBar;