import React, { useEffect, useState } from "react";
import { Box, useMediaQuery, useTheme, alpha, Typography, Container, Grid, Divider, Fade } from "@mui/material";
import IssuesSection from "../components/IssuesSection";
import WestVirginiaFoodLandscape from "../components/WestVirginiaFoodLandscape";
import InteractiveWheel from "../components/InteractiveWheel";
import IntroModal from "../components/IntroModal";
import FoodRetailer from "../components/FoodRetailer";
import CountyReport from "../components/CountyReport";
import PartnerHome from "../components/PartnerHome";
import WestVirginiaFoodSecurityTabs from "../components/WestVirginiaFoodSecurityTab";
import AppalachianFoodSystemsExplorer from "../components/AppalachianFoodSystemsExplorer";
import IntroOverlay from "../components/IntroOverlay";
import HeroSection from "../components/HeroSection";

// Main color theme
const MAIN_COLOR = "#002855";
const SECONDARY_COLOR = "#3C6E71";

// Enhanced color palette with better contrast
const colors = {
  base: "#ffffff",
  light: "#f9f9f9",
  medium: "#f2f2f2", 
  dark: "#efefef",
  accentVeryLight: alpha(MAIN_COLOR, 0.03),
  accentUltraLight: alpha(MAIN_COLOR, 0.015),
  sectionBorder: alpha(MAIN_COLOR, 0.1),
  sectionHighlight: alpha(SECONDARY_COLOR, 0.1),
};


const QuickAccessSection = () => {
  const isSmallScreen = window.innerWidth <= 768;
  
  const quickAccessItems = [
    {
      title: "Find Food Assistance",
      description: "Locate food assistance programs, pantries, and SNAP retailers near you in West Virginia.",
      link: "https://foodlink.wvu.edu/",
      bgColor: "bg-wvu-accent--blue"
    },
    {
      title: "Explore Food Atlas",
      description: "Interactive maps showing West Virginia's food landscape, retailers, and accessibility data.",
      link: "https://experience.arcgis.com/experience/61e914cf99364188a23f20b46721f2a3",
      bgColor: "bg-wvu-blue"
    },
    {
      title: "Organize Communities",
      description: "Connect with tools and resources to strengthen your community's food security initiatives.",
      link: "https://organize-communities-wvu.hub.arcgis.com/pages/organize",
      bgColor: "bg-wvu-accent--blue-dark"
    },
  ];

  return (
    <section 
      id="quick-access-section" 
      aria-labelledby="quick-access-label" 
      style={{ marginBottom: '3rem' }}
    >  
      <div className="wvu-z-index-content">
        <div className="container-fluid p-3">
          <div className="row justify-content-left">          
            {quickAccessItems.map((item, index) => (
              <div key={index} className="d-flex flex-column col-lg-4 mb-3">
                <div 
                  className={`position-relative h-100 p-3 p-xl-4 link-white ${item.bgColor}`}
                  style={{
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                    cursor: 'pointer'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.transform = 'translateY(-4px)';
                    e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.15)';
                    const arrow = e.currentTarget.querySelector('.arrow-icon');
                    if (arrow) arrow.style.transform = 'translateX(6px)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                    const arrow = e.currentTarget.querySelector('.arrow-icon');
                    if (arrow) arrow.style.transform = 'translateX(0)';
                  }}
                >
                  <div className="d-flex justify-content-between align-items-start mb-2">
                    <h3 
                      className="card-title h2 mb-0 text-decoration-none flex-grow-1" 
                      id={`quick-access-${index}`}
                      style={{
                        fontSize: isSmallScreen ? '1.4rem' : '1.6rem',
                        fontWeight: '700',
                        lineHeight: '1.2'
                      }}
                    >
                      <a 
                        className="stretched-link link-white text-decoration-none" 
                        href={item.link}
                        target={item.link.startsWith('http') ? '_blank' : '_self'}
                        rel={item.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                        aria-describedby={`quick-access-desc-${index}`}
                        style={{
                          color: 'inherit',
                          display: 'block'
                        }}
                        onFocus={(e) => {
                          e.currentTarget.style.outline = '3px solid #EAAA00';
                          e.currentTarget.style.outlineOffset = '2px';
                        }}
                        onBlur={(e) => {
                          e.currentTarget.style.outline = 'none';
                        }}
                      >
                        {item.title}
                      </a>
                    </h3>
                    
                    {/* Modern SVG Arrow */}
                    <svg 
                      className="arrow-icon"
                      width="28" 
                      height="28" 
                      viewBox="0 0 24 24" 
                      fill="currentColor"
                      aria-hidden="true"
                      style={{
                        marginLeft: '1rem',
                        marginTop: '0.25rem',
                        transition: 'transform 0.3s ease',
                        flexShrink: 0,
                        opacity: '0.9'
                      }}
                    >
                      <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/>
                    </svg>
                  </div>
                  
                  <p 
                    className="flex-grow-1 mb-3"
                    id={`quick-access-desc-${index}`}
                    style={{
                      fontSize: isSmallScreen ? '0.95rem' : '1rem',
                      lineHeight: '1.5',
                      opacity: '0.95',
                      marginBottom: '1rem'
                    }}
                  >
                    {item.description}
                  </p>              
                  
                  {/* External link indicator */}
                  {item.link.startsWith('http') && (
                    <div 
                      className="d-flex align-items-center"
                      style={{
                        fontSize: '0.875rem',
                        opacity: '0.8',
                        fontWeight: '500'
                      }}
                    >
                      <svg 
                        width="16" 
                        height="16" 
                        viewBox="0 0 24 24" 
                        fill="currentColor"
                        style={{ marginRight: '0.5rem' }}
                        aria-hidden="true"
                      >
                        <path d="M14,3V5H17.59L7.76,14.83L9.17,16.24L19,6.41V10H21V3M19,19H5V5H12V3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V12H19V19Z"/>
                      </svg>
                      <span>Opens in new tab</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
// Section title component with enhanced design
const SectionTitle = ({ title, subtitle, align = "center", light = false, variant = "featured" }) => {
  const titleStyles = {
    featured: {
      position: "relative",
      display: "inline-block",
      fontSize: { xs: "1.85rem", md: "2.75rem" },
      fontWeight: 800,
      color: light ? "#fff" : "#222",
      mb: 1.5,
      letterSpacing: "-0.02em",
      pl: 2,
      ml: -2,
      transition: "all 0.3s ease",
      "&:hover": {
        transform: "translateX(5px)",
      },
    },
  };
  
  const subtitleStyles = {
    featured: {
      fontSize: { xs: "1.1rem", md: "1.25rem" },
      fontWeight: 400,
      color: light ? alpha("#fff", 0.9) : alpha("#333", 0.8),
      maxWidth: "800px",
      mx: align === "center" ? "auto" : 0,
      mt: 1.5,
      lineHeight: 1.6,
      transition: "all 0.3s ease",
    },
  };

  return (
    <Box
      sx={{
        mb: 5,
        position: "relative",
        textAlign: align,
        transition: "all 0.3s ease-in-out",
      }}
    >
      <Typography
        variant="h1"
        component="h2"
        className="text-wvu-blue display-3 wvu-bar wvu-bar--center wvu-bar--bottom wvu-shout"
        sx={{
          ...titleStyles[variant],
          fontFamily: 'inherit', 
        }}
      >
        {title}
      </Typography>
      <Typography
        variant="h6"
        component="p"
        sx={subtitleStyles[variant]}
      >
        {subtitle}
      </Typography>
    </Box>
  );
};

// Enhanced section component with improved transitions and borders
const Section = ({ 
  backgroundColor, 
  children, 
  fullWidth = true, 
  containContent = false, 
  title, 
  subtitle, 
  align = "center",
  layout = "standard",
  variant = "featured",
  dividerStyle = "none",
  containerPadding = true,
  customSx = {},
  isMapSection = false,
  isTabComponent = false  // ← Add this prop
}) => {
  const isLight = backgroundColor === colors.base || backgroundColor === colors.light || backgroundColor === colors.medium;
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  // ← ADD THIS: Special rendering for tab components
  if (isTabComponent) {
    return (
      <Box
        sx={{
          width: "100%",
          backgroundColor,
          py: { xs: 6, md: 8 },
          display: "flex",
          justifyContent: "center",
          position: "relative",
          margin: 0,
          padding: 0,
          // Minimal styling to avoid tab conflicts
          ...customSx
        }}
      >
        <Container
          maxWidth="xl"
          sx={{
            width: "100%",
            mx: "auto",
            px: { xs: 2, md: 3 },
          }}
        >
          {/* Render title separately for tab components */}
          {title && (
            <Box sx={{ mb: 4, textAlign: align }}>
              <Typography
                variant="h2"
                component="h2"
                className="text-wvu-blue display-3 wvu-bar wvu-bar--center wvu-bar--bottom wvu-shout"
                sx={{
                  fontSize: { xs: "1.85rem", md: "2.75rem" },
                  fontWeight: 800,
                  color: isLight ? "#222" : "#fff",
                  mb: 1.5,
                  letterSpacing: "-0.02em",
                }}
              >
                {title}
              </Typography>
              {subtitle && (
                <Typography
                  variant="h6"
                  component="p"
                  sx={{
                    fontSize: { xs: "1.1rem", md: "1.25rem" },
                    fontWeight: 400,
                    color: isLight ? alpha("#333", 0.8) : alpha("#fff", 0.9),
                    maxWidth: "800px",
                    mx: align === "center" ? "auto" : 0,
                    mt: 1.5,
                    lineHeight: 1.6,
                  }}
                >
                  {subtitle}
                </Typography>
              )}
            </Box>
          )}
          
          {/* Render children with minimal wrapping */}
          <Box sx={{ width: "100%" }}>
            {children}
          </Box>
        </Container>
      </Box>
    );
  }


  const TopDivider = () => {
    if (dividerStyle === "none") return null;
    
    const dividerColor = backgroundColor;
    const height = dividerStyle === "wave" ? 40 : 30;
    
    if (dividerStyle === "curve") {
      return (
        <Box sx={{ 
          position: "absolute", 
          top: -height + 1,
          left: 0, 
          width: "100%", 
          height: `${height}px`,
          overflow: "hidden",
          zIndex: 2
        }}>
          <svg viewBox="0 0 1200 30" preserveAspectRatio="none" style={{ width: "100%", height: "100%", display: "block" }}>
            <path
              d="M0,0 C300,30 900,30 1200,0 L1200,30 L0,30 Z"
              fill={dividerColor}
            />
          </svg>
        </Box>
      );
    }
    
    if (dividerStyle === "angle") {
      return (
        <Box sx={{ 
          position: "absolute", 
          top: -height + 1, 
          left: 0, 
          width: "100%", 
          height: `${height}px`,
          overflow: "hidden",
          zIndex: 2
        }}>
          <svg viewBox="0 0 1200 30" preserveAspectRatio="none" style={{ width: "100%", height: "100%", display: "block" }}>
            <polygon
              points="0,30 1200,30 1200,0"
              fill={dividerColor}
            />
          </svg>
        </Box>
      );
    }
    
    if (dividerStyle === "wave") {
      return (
        <Box sx={{ 
          position: "absolute", 
          top: -height + 1, 
          left: 0, 
          width: "100%", 
          height: `${height}px`,
          overflow: "hidden",
          zIndex: 2
        }}>
          <svg viewBox="0 0 1200 40" preserveAspectRatio="none" style={{ width: "100%", height: "100%", display: "block" }}>
            <path
              d="M0,0 C150,40 350,0 500,20 C650,40 750,0 900,10 C1050,20 1150,40 1200,10 L1200,40 L0,40 Z"
              fill={dividerColor}
            />
          </svg>
        </Box>
      );
    }
    
    return null;
  };
  
  const renderContent = () => {
    if (layout === "standard" || isMobile) {
      return (
        <>
          {title && (
            <Box sx={{ px: { xs: 2, md: 4 }, mb: 3 }}>
              <SectionTitle title={title} subtitle={subtitle} align={align} light={!isLight} variant={variant} />
            </Box>
          )}
          <Box 
            sx={{ 
              px: containContent && containerPadding ? { xs: 2, md: 4 } : 0,
              transition: "all 0.3s ease"
            }}
          >
            {children}
          </Box>
        </>
      );
    }
    
    if (layout === "split-left") {
      return (
        <Grid container spacing={4} sx={{ px: containerPadding ? { xs: 2, md: 4 } : 0 }}>
          <Grid item xs={12} md={4} lg={3} sx={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
            {title && (
              <SectionTitle title={title} subtitle={subtitle} align="left" light={!isLight} variant={variant} />
            )}
          </Grid>
          <Grid item xs={12} md={8} lg={9}>
            {children}
          </Grid>
        </Grid>
      );
    }
    
    if (layout === "split-right") {
      return (
        <Grid container spacing={4} sx={{ px: containerPadding ? { xs: 2, md: 4 } : 0 }}>
          <Grid item xs={12} md={8} lg={9} order={{ xs: 2, md: 1 }}>
            {children}
          </Grid>
          <Grid item xs={12} md={4} lg={3} order={{ xs: 1, md: 2 }} sx={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
            {title && (
              <SectionTitle title={title} subtitle={subtitle} align="left" light={!isLight} variant={variant} />
            )}
          </Grid>
        </Grid>
      );
    }
    
    if (layout === "stacked") {
      return (
        <>
          {title && (
            <Box sx={{ px: { xs: 2, md: 4 }, mb: 5 }}>
              <SectionTitle title={title} subtitle={subtitle} align={align} light={!isLight} variant={variant} />
              <Divider sx={{ 
                my: 3, 
                width: "80px", 
                mx: align === "center" ? "auto" : 0,
                borderColor: alpha(MAIN_COLOR, 0.3),
                borderWidth: "2px"
              }} />
            </Box>
          )}
          <Box 
            sx={{ 
              px: containContent && containerPadding ? { xs: 2, md: 4 } : 0,
              transition: "all 0.3s ease"
            }}
          >
            {children}
          </Box>
        </>
      );
    }
    
    return children;
  };
  
  return (
    <Box
      sx={{
        width: "100%",
        backgroundColor,
        py: isMapSection ? 0 : { xs: 6, md: 8 },
        display: "flex",
        justifyContent: "center",
        position: "relative",
        borderBottom: `1px solid ${colors.sectionBorder}`,
        margin: 0,
        padding: 0,
        overflow: "hidden",
        transition: "background-color 0.5s ease, border-color 0.5s ease",
        "&:hover": {
          borderColor: colors.sectionHighlight,
        },
        ...customSx
      }}
    >
      <TopDivider />
      
      <Container
        maxWidth={containContent ? "xl" : false}
        disableGutters={!containContent}
        sx={{
          width: "100%",
          mx: "auto",
          px: fullWidth && !containContent ? 0 : { xs: 2, md: 3 },
        }}
      >
        <Fade in={true} timeout={800}>
          <Box sx={{ width: "100%" }}>
            {renderContent()}
          </Box>
        </Fade>
      </Container>
    </Box>
  );
};

const HomePage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [scrollbarWidth, setScrollbarWidth] = useState(0);

  useEffect(() => {
    const scrollDiv = document.createElement("div");
    scrollDiv.style.cssText = "width:100px;height:100px;overflow:scroll;position:absolute;top:-9999px;";
    document.body.appendChild(scrollDiv);
    
    const width = scrollDiv.offsetWidth - scrollDiv.clientWidth;
    document.body.removeChild(scrollDiv);
    
    setScrollbarWidth(width);
  }, []);

  const sections = [
    {
      component: (
        <Box
          sx={{
            width: `calc(100vw - ${scrollbarWidth}px)`,
            height: { xs: "65vh", md: "100vh" },
            position: "relative",
            overflow: "hidden",
            margin: 0,
            padding: 0,
            display: "block",
            "& > div": {
              width: "100%",
              height: "100%",
            },
            "& .esri-view, & .esri-view-root, & .esri-view-surface, & .esri-ui": {
              width: "100%",
              height: "100%",
            },
            "& canvas": {
              width: "100%",
              height: "100%",
              display: "block",
            },
            "& .esri-view": {
              outline: "none !important"
            }
          }}
          tabIndex={-1}
        >
          <FoodRetailer />
        </Box>
      ),
      backgroundColor: colors.base,
      title: "Interactive Food Map",
      subtitle: "Explore food retailers, resources, and accessibility across West Virginia",
      align: "center",
      layout: "standard",
      variant: "featured",
      dividerStyle: "none",
      isMapSection: true
    },
    {
      component: <IssuesSection />,
      backgroundColor: colors.base,
      title: "Challenges in West Virginia",
      subtitle: "West Virginia faces significant challenges such as high poverty rates, food insecurity, and a declining population. Immediate action is needed to create a better future.",
      align: "center",
      layout: "standard",
      variant: "featured",
      dividerStyle: "none"
    },
    {
      component: <WestVirginiaFoodLandscape />,
      backgroundColor: colors.light,
      title: "West Virginia Food Landscape",
      subtitle: "Navigate through key themes shaping food access, nutrition, and sustainability.",
      align: "left", 
      layout: "split-left", 
      variant: "featured",
      dividerStyle: "none"
    },
    {
      component: <CountyReport />,
      backgroundColor: colors.medium,
      title: "Interactive County Report",
      subtitle: "Select a county on the map below to view detailed resource information and statistics.",
      align: "center", 
      layout: "standard",
      variant: "featured",
      dividerStyle: "none"
    },
    {
      component: <InteractiveWheel />,
      backgroundColor: colors.light,
      title: "Food System Dynamics",
      subtitle: "Interactive exploration of the interconnected factors in our local food systems",
      align: "center",
      layout: "standard",
      variant: "featured",
      dividerStyle: "none"
    },
    {
      component: <PartnerHome />,
      backgroundColor: colors.base,
      title: "Our Key Partners",
      subtitle: "FoodLink is maintained in partnership between the WVU Center for Resilient Communities and the WVU Extension Family Nutrition Program (SNAP-Ed) .",
      align: "left", 
      layout: "split-left", 
      variant: "featured",
      dividerStyle: "none"
    },
    {
      component: (
        <Box sx={{ outline: "none" }}>
          <div data-component="appalachian-explorer">
            <AppalachianFoodSystemsExplorer />
          </div>
        </Box>
      ),
      backgroundColor: colors.medium,
      title: "Explore Food Resilience in Appalachia",
      subtitle: "Visualize and analyze regional food system data with our analysis.",
      align: "right", 
      
      variant: "featured",
      dividerStyle: "none"
    },
    {
      component: <WestVirginiaFoodSecurityTabs />,
      backgroundColor: colors.medium,
      title: "Proposal for a West Virginia Office of Community Food Security",
      subtitle: "Addressing the urgent need for coordinated action on food insecurity",
      align: "center",
      isTabComponent: true,
      variant: "featured",
      dividerStyle: "none"
    }
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
    
    const handleFocus = (e) => {
      const isInExplorer = e.target.closest('[data-component="appalachian-explorer"]');
      if (isInExplorer) {
        // if (!e.target.hasAttribute('data-user-focus')) {
        //   window.scrollTo(0, 0);
        // }
      }
    };
    
    document.addEventListener('focus', handleFocus, true);
    return () => {
      document.removeEventListener('focus', handleFocus, true);
    };
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        maxWidth: "100vw",
        overflowX: "hidden",
        backgroundColor: colors.base,
        margin: 0,
        padding: 0,
      }}
    >
      {/* Hero Section with no bottom margin */}
      <Box sx={{ marginBottom: 0 }}>
        <HeroSection/>
      </Box>
<QuickAccessSection />
      {/* All sections including FoodRetailer as first section */}
      {sections.map((section, index) => (
        <Section
          key={index}
          backgroundColor={section.backgroundColor}
          fullWidth={true}
          containContent={index === 6} // Adjust for new indexing
          title={section.title}
          subtitle={section.subtitle}
          align={section.align}
          layout={section.layout}
          variant={section.variant}
          dividerStyle={section.dividerStyle}
          isMapSection={section.isMapSection}
        >
          {section.component}
        </Section>
      ))}
    </Box>
  );
};

export default HomePage;