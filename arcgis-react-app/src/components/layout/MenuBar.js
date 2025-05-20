import React, { useState } from "react";
import {
  Box,
  useTheme,
  useMediaQuery,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Collapse,
  IconButton,
  Divider,
} from "@mui/material";
import {
  Menu as MenuIcon,
  ExpandLess,
  ExpandMore,
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
        <div className="col-md-6 col-lg-8 d-flex align-items-center">
          <a
            className="text-decoration-none d-flex align-items-center"
            href="https://www.wvu.edu"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="/foodlink_white.png"
              alt="WVU Logo"
              style={{ height: 64, maxHeight: "10vh", marginRight: "1rem" }}
            />
          </a>
        </div>
        <div className="col-md-6 col-lg-4 d-flex justify-content-md-end mt-3 mt-md-0">
          <a href="/food" className="btn btn-outline-wvu-accent--blue-light me-2">Find Food</a>
          <a href="/organize" className="btn btn-outline-wvu-accent--sunset me-2">Organize</a>
          <a
            href="https://resilientcommunities.wvu.edu"
            className="btn btn-outline-wvu-gold"
            target="_blank"
            rel="noopener noreferrer"
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
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);

  const toggleDropdown = (label) => {
    setOpenDropdown(openDropdown === label ? null : label);
  };

  const menuItems = [
    { label: "Home", icon: <Home />, href: "/" },
    { label: "Food Atlas", icon: <Map />, href: "https://experience.arcgis.com/experience/61e914cf99364188a23f20b46721f2a3" },
    { label: "About Us", icon: <Info />, href: "/about" },
    {
      label: "Find", icon: <ZoomIn />, children: [
        { label: "Food", href: "/food", icon: <RestaurantMenu /> },
        { label: "Assistance", href: "/assistance", icon: <HelpCenter /> },
        { label: "Charities", href: "/charities", icon: <FoodBank /> },
      ]
    },
    { label: "Organize", icon: <Group />, href: "https://wvfoodlink-wvu.hub.arcgis.com/pages/organize-1" },
    { label: "Policies", icon: <GavelOutlined />, href: "https://wvfoodlink-wvu.hub.arcgis.com/pages/nourishing-networks-reports" },
    {
      label: "Resources", icon: <Book />, children: [
        { label: "SNAP + WIC", href: "https://www.arcgis.com/apps/dashboards/f44ec87fbabf4697959012640dc2d29f", icon: <CreditCard /> },
        { label: "SNAP-ED", href: "https://wvu.maps.arcgis.com/apps/dashboards/a2bc19f10d9647c39992283e9ec4d851", icon: <School /> },
        { label: "Congregate Meals", href: "https://wvu.maps.arcgis.com/apps/instant/portfolio/index.html?appid=b442bf3a130248938d3f4323840fe50e", icon: <Restaurant /> },
        { label: "Charitable Food", href: "https://wvu.maps.arcgis.com/apps/dashboards/783922e1a38646bda92e8ddfbb37961b", icon: <LocalMall /> },
        { label: "Farmers Markets", href: "https://www.arcgis.com/apps/dashboards/5095c3fd9b0c4934be43bc8f65c93b36", icon: <Storefront /> },
        { label: "Agricultural Data", href: "https://www.arcgis.com/apps/dashboards/2100f46c379b49ba8d5d4184c68d0ab0", icon: <Agriculture /> },
        { label: "Self-Provisioning", href: "https://www.arcgis.com/apps/dashboards/60c2dc75756c485f9d135d14826464f4", icon: <NaturePeople /> },
        { label: "Political Participation", href: "https://www.arcgis.com/apps/dashboards/28258179da3a4fd0b1dcd0a053d402ec", icon: <AccountBalance /> },
        { label: "County Summary", href: "/county", icon: <Public /> },
      ]
    }
  ];

  const renderDesktopMenu = () => (
    <nav className="wvu-site-nav bg-wvu-accent--blue-dark navbar navbar-expand-lg p-0 navbar-dark w-100" id="nav-primary">
      <div className="container d-flex">
        {menuItems.map((item, index) => (
          <div key={index} className="position-relative me-3 dropdown">
            {item.children ? (
              <>
                <a
                  className="nav-link dropdown-toggle text-white d-flex align-items-center gap-2"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {item.icon} {item.label}
                </a>
                <ul className="dropdown-menu bg-wvu-accent--blue-dark border-0">
                  {item.children.map((child, i) => (
                    <li key={i}>
                      <a
                        className="dropdown-item text-white d-flex align-items-center gap-2"
                        href={child.href}
                        target={child.href?.startsWith("http") ? "_blank" : "_self"}
                        rel={child.href?.startsWith("http") ? "noopener noreferrer" : undefined}
                      >
                        {child.icon} {child.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </>
            ) : (
              <a
                className="nav-link text-white d-flex align-items-center gap-2"
                href={item.href}
                target={item.href?.startsWith("http") ? "_blank" : "_self"}
                rel={item.href?.startsWith("http") ? "noopener noreferrer" : undefined}
              >
                {item.icon} {item.label}
              </a>
            )}
          </div>
        ))}
      </div>
    </nav>
  );

  const renderMobileDrawer = () => (
    <>
      <IconButton
        edge="start"
        color="inherit"
        aria-label="menu"
        onClick={() => setDrawerOpen(true)}
        sx={{ ml: 2 }}
      >
        <MenuIcon />
      </IconButton>
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        PaperProps={{ sx: { backgroundColor: '#003865', color: 'white' } }}
      >
        <List sx={{ width: 280 }}>
          {menuItems.map((item, index) => (
            <React.Fragment key={index}>
              <ListItem
                button
                onClick={
                  item.children
                    ? () => toggleDropdown(item.label)
                    : () => setDrawerOpen(false)
                }
                component="a"
                href={item.href}
                target={item.href?.startsWith("http") ? "_blank" : "_self"}
                rel={item.href?.startsWith("http") ? "noopener noreferrer" : undefined}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.label} />
                {item.children && (openDropdown === item.label ? <ExpandLess /> : <ExpandMore />)}
              </ListItem>
              {item.children && (
                <Collapse in={openDropdown === item.label} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {item.children.map((child, idx) => (
                      <ListItem
                        button
                        key={idx}
                        sx={{ pl: 4 }}
                        component="a"
                        href={child.href}
                        target={child.href?.startsWith("http") ? "_blank" : "_self"}
                        rel={child.href?.startsWith("http") ? "noopener noreferrer" : undefined}
                      >
                        <ListItemIcon>{child.icon}</ListItemIcon>
                        <ListItemText primary={child.label} />
                      </ListItem>
                    ))}
                  </List>
                </Collapse>
              )}
              <Divider />
            </React.Fragment>
          ))}
        </List>
      </Drawer>
    </>
  );

  return isMobile ? renderMobileDrawer() : renderDesktopMenu();
};

const MenuBar = () => (
  <Box>
    <WVUHeader />
    <WVUMenuBar />
  </Box>
);

export default MenuBar;
