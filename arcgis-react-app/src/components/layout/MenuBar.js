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
  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);
  const [openIndex, setOpenIndex] = useState(null);
  const handleItemToggle = (index) =>
  setOpenIndex(openIndex === index ? null : index);

  const menuItems = [
    { label: "Home", icon: <Home />, href: "/" },
    {
      label: "Food Atlas",
      icon: <Map />,
      href:
        "https://experience.arcgis.com/experience/61e914cf99364188a23f20b46721f2a3",
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
      href:
        "https://wvfoodlink-wvu.hub.arcgis.com/pages/organize-1",
    },
    {
      label: "Policies",
      icon: <GavelOutlined />,
      href:
        "https://wvfoodlink-wvu.hub.arcgis.com/pages/nourishing-networks-reports",
    },
    {
      label: "Resources",
      icon: <Book />,
      children: [
        {
          label: "SNAP + WIC",
          href:
            "https://www.arcgis.com/apps/dashboards/f44ec87fbabf4697959012640dc2d29f",
          icon: <CreditCard />,
        },
        {
          label: "SNAP-ED",
          href:
            "https://wvu.maps.arcgis.com/apps/dashboards/a2bc19f10d9647c39992283e9ec4d851",
          icon: <School />,
        },
        {
          label: "Congregate Meals",
          href:
            "https://wvu.maps.arcgis.com/apps/instant/portfolio/index.html?appid=b442bf3a130248938d3f4323840fe50e",
          icon: <Restaurant />,
        },
        {
          label: "Charitable Food",
          href:
            "https://wvu.maps.arcgis.com/apps/dashboards/783922e1a38646bda92e8ddfbb37961b",
          icon: <LocalMall />,
        },
        {
          label: "Farmers Markets",
          href:
            "https://www.arcgis.com/apps/dashboards/5095c3fd9b0c4934be43bc8f65c93b36",
          icon: <Storefront />,
        },
        {
          label: "Agricultural Data",
          href:
            "https://www.arcgis.com/apps/dashboards/2100f46c379b49ba8d5d4184c68d0ab0",
          icon: <Agriculture />,
        },
        {
          label: "Self-Provisioning",
          href:
            "https://www.arcgis.com/apps/dashboards/60c2dc75756c485f9d135d14826464f4",
          icon: <NaturePeople />,
        },
        {
          label: "Political Participation",
          href:
            "https://www.arcgis.com/apps/dashboards/28258179da3a4fd0b1dcd0a053d402ec",
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
        <ul className="wvu-site-nav__items list-unstyled d-none d-lg-flex align-items-center mb-0 flex-wrap">
          {menuItems.map((item, i) => (
            <li
              key={i}
              className={`position-relative d-lg-flex ${
                item.children ? "wvu-site-nav__menu-item-has-children" : ""
              }`}
            >
              <a
                href={item.href}
                target={item.href?.startsWith("http") ? "_blank" : "_self"}
                rel={
                  item.href?.startsWith("http") ? "noopener noreferrer" : undefined
                }
                className="nav-link px-2 py-2 d-flex align-items-center gap-1"
              >
                {item.icon}
                {item.label}
              </a>
              {item.children && (
                <ul className="wvu-site-nav__sub-menu list-unstyled small bg-wvu-accent--blue-dark ms-2">
                  {item.children.map((child, ci) => (
                    <li key={ci}>
                      <a
                        href={child.href}
                        target={child.href?.startsWith("http") ? "_blank" : "_self"}
                        rel={
                          child.href?.startsWith("http")
                            ? "noopener noreferrer"
                            : undefined
                        }
                        className="nav-link px-2 py-2 d-flex align-items-center gap-1"
                      >
                        {child.icon}
                        {child.label}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>

        {/* Search toggle stays here */}
        <div className="ms-auto d-flex align-items-center">
          <button
            className="bg-transparent border-0 text-white py-2 px-2"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#wvuNavSearchCollapse2"
            aria-controls="wvuNavSearchCollapse2"
            aria-expanded="false"
          >
            <span className="fa-solid fa-magnifying-glass" />
            <span className="visually-hidden">Toggle Search</span>
          </button>
        </div>
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
            width: 260,
          },
        }}
      >
        <Box role="presentation" sx={{ p: 2 }}>
         <List>
  {menuItems.map((item, index) => (
    <React.Fragment key={index}>
      
      

      {item.children ? (
  <ListItem
    button
    onClick={() => handleItemToggle(index)}
    sx={{
      color: 'white',
      '&:hover': { backgroundColor: 'rgba(255,255,255,0.08)' }
    }}
  >
    <Box sx={{ mr: 1, color: 'white' }}>{item.icon}</Box>
    <ListItemText primary={item.label} sx={{ color: 'white' }} />
    {/* Indicate expanded/collapsed state */}
    <Box sx={{ ml: 1 }}>
      {openIndex === index ? '▾' : '▸'}
    </Box>
  </ListItem>
) : (
  <ListItem
    button
    component="a"
    href={item.href}
    onClick={() => setMobileOpen(false)}
    sx={{
      color: 'white',
      '&:hover': { backgroundColor: 'rgba(255,255,255,0.08)' }
    }}
  >
    <Box sx={{ mr: 1, color: 'white' }}>{item.icon}</Box>
    <ListItemText primary={item.label} sx={{ color: 'white' }} />
  </ListItem>
)}

{item.children && openIndex === index &&
  item.children.map((child, idx) => (
    <ListItem
      key={idx}
      button
      component="a"
      href={child.href}
      onClick={() => setMobileOpen(false)}
      sx={{
        pl: 6,
        color: 'white',
        '&:hover': { backgroundColor: 'rgba(255,255,255,0.08)' }
      }}
    >
      <Box sx={{ mr: 1, color: 'white' }}>{child.icon}</Box>
      <ListItemText primary={child.label} sx={{ color: 'white' }} />
    </ListItem>
  ))}

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
