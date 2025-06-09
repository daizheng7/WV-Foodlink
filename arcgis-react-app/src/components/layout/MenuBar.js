import React, { useState, useRef, useEffect } from "react";
import {
  Home,
  Map,
  Info,
  Search,
  Restaurant,
  HelpCenter,
  FoodBank,
  Group,
  Gavel,
  Book,
  CreditCard,
  School,
  ShoppingBag,
  Storefront,
  Agriculture,
  NaturePeople,
  AccountBalance,
  Public,
  ExpandMore,
  ExpandLess,
  Menu as MenuIcon,
} from "@mui/icons-material";

// Skip to Main Content component
const SkipToMain = () => (
  <a 
    href="#main-content" 
    className="skip-to-main visually-hidden-focusable position-absolute"
    style={{
      zIndex: 9999,
      top: '10px',
      left: '10px'
    }}
  >
    Skip to main content
  </a>
);

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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [openSubMenus, setOpenSubMenus] = useState(new Set());
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const menuRef = useRef(null);
  const itemRefs = useRef([]);

  const menuItems = [
    { 
      label: "Home", 
      href: "/",
      icon: <Home />
    },
    {
      label: "Food Atlas",
      href: "https://experience.arcgis.com/experience/61e914cf99364188a23f20b46721f2a3",
      icon: <Map />
    },
    { 
      label: "About Us", 
      href: "/about",
      icon: <Info />
    },
    {
      label: "Find",
      icon: <Search />,
      children: [
        { label: "Food", href: "/food", icon: <Restaurant /> },
        { label: "Assistance", href: "/assistance", icon: <HelpCenter /> },
        { label: "Charities", href: "/charities", icon: <FoodBank /> },
      ],
    },
    {
      label: "Organize",
      href: "https://wvfoodlink-wvu.hub.arcgis.com/pages/organize-1",
      icon: <Group />
    },
    {
      label: "Policies",
      href: "https://wvfoodlink-wvu.hub.arcgis.com/pages/nourishing-networks-reports",
      icon: <Gavel />
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
          icon: <ShoppingBag />,
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
        { 
          label: "County Summary", 
          href: "/county", 
          icon: <Public />
        },
      ],
    },
  ];

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const toggleSearch = () => {
    setSearchOpen(!searchOpen);
  };

  const toggleSubMenu = (index) => {
    const newOpenSubMenus = new Set(openSubMenus);
    if (newOpenSubMenus.has(index)) {
      newOpenSubMenus.delete(index);
    } else {
      newOpenSubMenus.add(index);
    }
    setOpenSubMenus(newOpenSubMenus);
  };

  const handleKeyDown = (event, index, isChild = false, childIndex = null) => {
    switch (event.key) {
      case 'Enter':
      case ' ':
        event.preventDefault();
        if (menuItems[index].children && !isChild) {
          toggleSubMenu(index);
        }
        break;
      case 'ArrowDown':
        event.preventDefault();
        if (menuItems[index].children && !isChild && !openSubMenus.has(index)) {
          toggleSubMenu(index);
        }
        // Navigate to next item
        const nextIndex = index + 1;
        if (nextIndex < itemRefs.current.length && itemRefs.current[nextIndex]) {
          itemRefs.current[nextIndex].focus();
        }
        break;
      case 'ArrowUp':
        event.preventDefault();
        // Navigate to previous item
        const prevIndex = index - 1;
        if (prevIndex >= 0 && itemRefs.current[prevIndex]) {
          itemRefs.current[prevIndex].focus();
        }
        break;
      case 'Escape':
        if (openSubMenus.has(index)) {
          toggleSubMenu(index);
        } else {
          setMobileMenuOpen(false);
        }
        break;
    }
  };

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMobileMenuOpen(false);
        setOpenSubMenus(new Set());
      }
    };

    if (mobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [mobileMenuOpen]);

  return (
    <>
      <nav 
        ref={menuRef}
        aria-label="Main navigation" 
        className="wvu-site-nav bg-wvu-accent--blue-dark navbar navbar-expand-lg p-0 navbar-dark w-100"
      >
        <div className="container">
          {/* Mobile hamburger button */}
          <button 
            aria-controls="wvu-site-nav__items" 
            aria-expanded={mobileMenuOpen}
            type="button" 
            className="wvu-site-nav__toggle border-0 bg-wvu-accent--blue-dark text-white position-relative ps-0 pe-2 d-flex d-lg-none align-items-center"
            onClick={toggleMobileMenu}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleMobileMenu();
              }
            }}
          >
            <span aria-hidden="true" className={`wvu-hamburger ${mobileMenuOpen ? 'active' : ''}`}>
              <MenuIcon style={{ fontSize: '1.5rem' }} />
            </span>
            <span className="ms-2">{mobileMenuOpen ? 'Close Menu' : 'Open Menu'}</span>
          </button>

          {/* Desktop and Mobile Menu Items */}
          <ul 
            id="wvu-site-nav__items"
            className={`wvu-site-nav__items position-static list-unstyled d-lg-flex align-items-lg-center flex-lg-wrap mb-0 ${
              mobileMenuOpen ? 'd-block' : 'd-none d-lg-flex'
            }`}
            role="menubar"
          >
            {menuItems.map((item, index) => (
              <li 
                key={index}
                className={`${item.children ? 'wvu-site-nav__menu-item-has-children position-relative d-lg-flex' : ''}`}
                role="none"
              >
                {item.children ? (
                  <>
                    <button
                      ref={el => itemRefs.current[index] = el}
                      className="nav-link px-1 py-2 fw-normal flex-grow-1 border-0 bg-transparent text-white d-flex align-items-center justify-content-between w-100"
                      onClick={() => toggleSubMenu(index)}
                      onKeyDown={(e) => handleKeyDown(e, index)}
                      aria-expanded={openSubMenus.has(index)}
                      aria-haspopup="true"
                      role="menuitem"
                      tabIndex="0"
                    >
                      <span className="d-flex align-items-center">
                        <span className="me-2" style={{ display: 'flex', alignItems: 'center', fontSize: '1.2rem' }}>
                          {item.icon}
                        </span>
                        {item.label}
                      </span>
                      <span className="dropdown-indicator" style={{ display: 'flex', alignItems: 'center', fontSize: '1rem' }}>
                        {openSubMenus.has(index) ? <ExpandLess /> : <ExpandMore />}
                      </span>
                    </button>
                    <ul 
                      className={`wvu-site-nav__sub-menu small bg-wvu-accent--blue-dark list-unstyled ms-2 ms-lg-0 ${
                        openSubMenus.has(index) ? 'd-block' : 'd-none'
                      } d-lg-block`}
                      role="menu"
                      aria-labelledby={`menu-${index}`}
                    >
                      {item.children.map((child, childIndex) => (
                        <li key={childIndex} role="none">
                          <a 
                            ref={el => itemRefs.current[`${index}-${childIndex}`] = el}
                            className="nav-link px-1 py-2 fw-normal flex-grow-1 d-flex align-items-center text-decoration-none text-white"
                            href={child.href}
                            target={child.href?.startsWith("http") ? "_blank" : "_self"}
                            rel={child.href?.startsWith("http") ? "noopener noreferrer" : undefined}
                            role="menuitem"
                            tabIndex="0"
                            onKeyDown={(e) => handleKeyDown(e, index, true, childIndex)}
                          >
                            <span className="me-2" style={{ display: 'flex', alignItems: 'center', fontSize: '1.1rem' }}>
                              {child.icon}
                            </span>
                            {child.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </>
                ) : (
                  <a 
                    ref={el => itemRefs.current[index] = el}
                    className="nav-link px-1 py-2 fw-normal flex-grow-1 d-flex align-items-center text-decoration-none text-white"
                    href={item.href}
                    target={item.href?.startsWith("http") ? "_blank" : "_self"}
                    rel={item.href?.startsWith("http") ? "noopener noreferrer" : undefined}
                    role="menuitem"
                    tabIndex="0"
                    onKeyDown={(e) => handleKeyDown(e, index)}
                  >
                    <span className="me-2" style={{ display: 'flex', alignItems: 'center', fontSize: '1.2rem' }}>
                      {item.icon}
                    </span>
                    {item.label}
                  </a>
                )}
              </li>
            ))}
          </ul>

          {/* Search toggle */}
          <div className="d-flex align-items-center">
            <button 
              className="bg-transparent border-0 text-white py-2 px-2 py-lg-0 px-lg-0" 
              type="button" 
              onClick={toggleSearch}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  toggleSearch();
                }
              }}
              aria-expanded={searchOpen}
              aria-controls="wvuNavSearchCollapse"
              tabIndex="0"
            >
              <Search style={{ fontSize: '1.5rem' }} />
              <span className="visually-hidden">Toggle Search</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Search Section */}
      <section 
        aria-label="nav-quicklinks" 
        className={`collapse multi-collapse ${searchOpen ? 'show' : ''}`} 
        id="wvuNavSearchCollapse"
      >
        <div className="bg-light py-4 w-100 text-white bg-wvu-accent--blue-dark wvu-bg-vignetting--20">
          <div className="container wvu-z-index-content">
            <div className="row d-flex justify-content-center">
              <div className="col-md-6">
                <div className="row">
                  <div className="col-md-12">
                    <form className="form-inline w-100" role="search" aria-label="Site Search">
                      <label id="search-label" htmlFor="q">
                        <span className="visually-hidden">Search</span>
                      </label>
                      <div className="input-group shadow-sm w-100">
                        <input 
                          id="q" 
                          className="form-control p-2" 
                          name="q" 
                          type="search" 
                          placeholder="Search" 
                          aria-label="Search"
                          tabIndex="0"
                        />
                        <button className="btn btn-primary px-3 px-lg-4" type="submit" tabIndex="0">
                          <span className="h5 mb-0" style={{ display: 'flex', alignItems: 'center' }}>
                            <Search />
                          </span>
                          <span className="visually-hidden">Search</span>
                        </button>
                      </div>
                      <div className="row pt-1">
                        <fieldset className="col-12">
                          <legend className="visually-hidden">
                            Would you like to search this site specifically, or all WVU websites?
                          </legend>
                          <div className="d-inline-block pe-2">
                            <input 
                              id="form-search__sitesearch" 
                              type="radio" 
                              name="as_sitesearch" 
                              value="foodlink.wvu.edu" 
                              defaultChecked
                              tabIndex="0"
                            />
                            <label className="d-inline-block" htmlFor="form-search__sitesearch">
                              Search this site
                            </label>
                          </div>
                          <div className="d-inline-block">
                            <input 
                              id="form-search__wvusearch" 
                              type="radio" 
                              name="as_sitesearch" 
                              value="wvu.edu"
                              tabIndex="0"
                            />
                            <label className="d-inline-block" htmlFor="form-search__wvusearch">
                              Search WVU
                            </label>
                          </div>
                        </fieldset>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        /* Skip to main content styles */
        .skip-to-main {
          background: #000;
          color: #fff;
          padding: 8px 16px;
          text-decoration: none;
          border-radius: 4px;
          font-weight: bold;
          z-index: 9999;
        }

        .skip-to-main:focus {
          outline: 2px solid #fff;
          outline-offset: 2px;
          color: #fff;
          text-decoration: none;
        }

        .visually-hidden-focusable:not(:focus):not(:focus-within) {
          position: absolute !important;
          width: 1px !important;
          height: 1px !important;
          padding: 0 !important;
          margin: -1px !important;
          overflow: hidden !important;
          clip: rect(0, 0, 0, 0) !important;
          white-space: nowrap !important;
          border: 0 !important;
        }

        .wvu-hamburger {
          width: 20px;
          height: 16px;
          position: relative;
          transform: rotate(0deg);
          transition: .5s ease-in-out;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .wvu-site-nav__sub-menu {
          position: static;
        }

        @media (min-width: 992px) {
          .wvu-site-nav__sub-menu {
            position: absolute;
            top: 100%;
            left: 0;
            min-width: 200px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            z-index: 1000;
          }

          .wvu-site-nav__menu-item-has-children:hover .wvu-site-nav__sub-menu {
            display: block !important;
          }
        }

        .nav-link:hover {
          background-color: rgba(255,255,255,0.08);
        }

        .nav-link:focus {
          outline: 2px solid #fff;
          outline-offset: 2px;
          background-color: rgba(255,255,255,0.15);
        }

        button:focus {
          outline: 2px solid #fff;
          outline-offset: 2px;
          background-color: rgba(255,255,255,0.15) !important;
        }

        input:focus {
          outline: 2px solid #0066cc;
          outline-offset: 2px;
        }

        .dropdown-indicator {
          margin-left: auto;
        }

        @media (max-width: 991px) {
          .wvu-site-nav__items {
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background-color: inherit;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            z-index: 1000;
          }

          .wvu-site-nav__sub-menu {
            padding-left: 1rem;
          }

          .dropdown-indicator {
            display: block !important;
          }
        }

        @media (min-width: 992px) {
          .dropdown-indicator {
            display: none;
          }
        }
      `}</style>
    </>
  );
};

const MenuBar = () => (
  <>
    {/* Skip to Main Content - MUST be first focusable element */}
    <SkipToMain />
    <WVUHeader />
    <WVUMenuBar />
  </>
);

export default MenuBar;