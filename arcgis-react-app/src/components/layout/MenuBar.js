import { Box, Button, useTheme, useMediaQuery } from "@mui/material";
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
  GavelOutlined, CreditCard,
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
        {/* WVU Logo */}
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
              style={{ height: 64, maxHeight: '10vh', marginRight: '1rem' }}
            />
          </a>
        </div>

        {/* Action Buttons */}
        <div className="col-md-6 col-lg-4 d-flex justify-content-md-end mt-3 mt-md-0">
          <a
            href="/food"
            className="btn btn-outline-wvu-accent--blue-light me-2"
          >
            Find Food
          </a>
          <a
            href="/organize"
            className="btn btn-outline-wvu-accent--sunset me-2"
          >
            Organize
          </a>
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

  const menuItems = [
    {
      label: "Home",
      icon: <Home />,
      href: "/"
    },
    
    {
      label: "Food Atlas",
      icon: <Map />,
      href: "https://experience.arcgis.com/experience/61e914cf99364188a23f20b46721f2a3"
    },
    {
      label: "About Us",
      icon: <Info />,
      href: "/about"
    },{
      label: "Find",
      icon: <ZoomIn />,
      children: [
        { label: "Food", href: "/food", icon: <RestaurantMenu /> },
        { label: "Assistance", href: "/assistance", icon: <HelpCenter /> },
        { label: "Charities", href: "/charities", icon: <FoodBank /> }
      ]
    },
    {
      label: "Organize",
      icon: <Group />,
      href: "https://wvfoodlink-wvu.hub.arcgis.com/pages/organize-1"
    },
    {
      label: "Policies",
      icon: <GavelOutlined />,
      href: "https://wvfoodlink-wvu.hub.arcgis.com/pages/nourishing-networks-reports"
    },
    {
      label: "Resources",
      icon: <Book />,
      children: [
        { label: "SNAP + WIC", href: "https://www.arcgis.com/apps/dashboards/f44ec87fbabf4697959012640dc2d29f", icon: <CreditCard />  },
        { label: "SNAP-ED", href: "https://wvu.maps.arcgis.com/apps/dashboards/a2bc19f10d9647c39992283e9ec4d851" , icon: <School /> },
        { label: "Congregate Meals", href: "https://wvu.maps.arcgis.com/apps/instant/portfolio/index.html?appid=b442bf3a130248938d3f4323840fe50e" , icon: <Restaurant /> },
        { label: "Charitable Food", href: "https://wvu.maps.arcgis.com/apps/dashboards/783922e1a38646bda92e8ddfbb37961b", icon: <LocalMall />  },
        { label: "Farmers Markets", href: "https://www.arcgis.com/apps/dashboards/5095c3fd9b0c4934be43bc8f65c93b36" , icon: <Storefront /> },
        { label: "Agricultural Data", href: "https://www.arcgis.com/apps/dashboards/2100f46c379b49ba8d5d4184c68d0ab0" , icon: <Agriculture /> },
        { label: "Self-Provisioning", href: "https://www.arcgis.com/apps/dashboards/60c2dc75756c485f9d135d14826464f4" , icon: <NaturePeople /> },
        { label: "Political Participation", href: "https://www.arcgis.com/apps/dashboards/28258179da3a4fd0b1dcd0a053d402ec" , icon: <AccountBalance />},
        { label: "County Summary", href: "/county" , icon: <Public /> },
      ]
    }
  ];

  return (
    <nav
      aria-label="Main navigation"
      id="nav-primary"
      className="wvu-site-nav bg-wvu-accent--blue-dark navbar navbar-expand-lg p-0 navbar-dark w-100"
    >
      <div className="container">
        {/* Mobile toggle button */}
        <button
          className="wvu-site-nav__toggle js-wvu-site-nav-toggle border-0 bg-wvu-accent--blue-dark text-white position-relative ps-0 pe-2 d-flex d-lg-none align-items-center"
          aria-controls="wvu-site-nav__items"
          aria-expanded="false"
          type="button"
        >
          <span aria-hidden="true" className="wvu-hamburger js-wvu-hamburger">
            <span className="wvu-hamburger__line wvu-hamburger__line--top" />
            <span className="wvu-hamburger__line wvu-hamburger__line--middle" />
            <span className="wvu-hamburger__line wvu-hamburger__line--bottom" />
          </span>
          <span className="js-wvu-site-nav-toggle-text">Open Menu</span>
        </button>

        {/* Main Menu */}
        <ul className="wvu-site-nav__items js-wvu-site-nav-items position-static list-unstyled d-lg-flex align-items-lg-center flex-lg-wrap mb-0">
          {menuItems.map((item, index) => (
            <li
              key={index}
              className={`position-relative d-lg-flex ${
                item.children ? "wvu-site-nav__menu-item-has-children" : ""
              }`}
            >
              <a
                className="nav-link px-1 py-2 fw-normal d-flex align-items-center gap-2"
                href={item.href}
                target={item.href?.startsWith("http") ? "_blank" : "_self"}
                rel={item.href?.startsWith("http") ? "noopener noreferrer" : undefined}
              >
                {item.icon}
                {item.label}
              </a>
              {item.children && (
                <ul className="wvu-site-nav__sub-menu small bg-wvu-accent--blue-dark list-unstyled ms-2 ms-lg-0">
                  {item.children.map((child, idx) => (
                    <li key={idx}>
                      <a
                        className="nav-link px-1 py-2 fw-normal d-flex align-items-center gap-2"
                        href={child.href}
                        target={child.href?.startsWith("http") ? "_blank" : "_self"}
                        rel={child.href?.startsWith("http") ? "noopener noreferrer" : undefined}
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

        {/* Search toggle */}
        <div className="d-flex align-items-center">
          <button
            className="bg-transparent border-0 text-white py-2 px-2 py-lg-0 px-lg-0"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#wvuNavSearchCollapse2"
            aria-expanded="false"
            aria-controls="wvuNavSearchCollapse2"
          >
            <span aria-hidden="true" className="fa-solid fa-magnifying-glass"></span>
            <span className="visually-hidden">Toggle Search</span>
          </button>
        </div>
      </div>
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
