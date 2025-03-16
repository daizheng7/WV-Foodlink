import React, { useEffect, useState } from "react";
import { Box, useMediaQuery, useTheme, alpha } from "@mui/material";
import IssuesSection from "../components/IssuesSection";
import WestVirginiaFoodLandscape from "../components/WestVirginiaFoodLandscape";
import InteractiveWheel from "../components/InteractiveWheel";
import IntroModal from "../components/IntroModal";
import FoodRetailer from "../components/FoodRetailer";
import CountyReport from "../components/CountyReport";
import PartnerHome from "../components/PartnerHome";
import WestVirginiaFoodSecurityTabs from "../components/WestVirginiaFoodSecurityTab";
import AppalachianFoodSystemsExplorer from "../components/AppalachianFoodSystemsExplorer";

// Main color theme
const MAIN_COLOR = "#800404";

// Simple section component with minimal styling
const Section = ({ backgroundColor, children, fullWidth = true, containContent = false }) => (
  <Box
    sx={{
      width: "100%",
      backgroundColor,
      py: { xs: 4, md: 5 },
      display: "flex",
      justifyContent: "center",
      position: "relative",
      borderBottom: `1px solid ${alpha(MAIN_COLOR, 0.1)}`,
      margin: 0,
      padding: 0,
    }}
  >
    <Box
      sx={{
        width: "100%",
        maxWidth: containContent ? "1200px" : "none",
        mx: "auto",
        px: containContent ? { xs: 2, md: 3 } : 0,
      }}
    >
      {children}
    </Box>
  </Box>
);

const HomePage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [scrollbarWidth, setScrollbarWidth] = useState(0);

  // Calculate scrollbar width once on component mount
  useEffect(() => {
    const scrollDiv = document.createElement("div");
    scrollDiv.style.cssText = "width:100px;height:100px;overflow:scroll;position:absolute;top:-9999px;";
    document.body.appendChild(scrollDiv);
    
    const width = scrollDiv.offsetWidth - scrollDiv.clientWidth;
    document.body.removeChild(scrollDiv);
    
    setScrollbarWidth(width);
  }, []);

  // Minimal, clean color palette
  const colors = {
    base: "#ffffff",
    light: "#f9f9f9",
    medium: "#f2f2f2",
    accentVeryLight: alpha(MAIN_COLOR, 0.03),
  };

  // Core sections configuration
  const sections = [
    {
      component: <IssuesSection />,
      backgroundColor: colors.base,
    },
    {
      component: <WestVirginiaFoodLandscape />,
      backgroundColor: colors.light,
    },
    {
      component: <CountyReport />,
      backgroundColor: colors.medium,
    },
    {
      component: <InteractiveWheel />,
      backgroundColor: colors.light,
    },
    {
      component: <PartnerHome />,
      backgroundColor: colors.base,
    },
    {
      // Wrapping in a div to prevent auto-focus/scroll issues
      component: (
        <Box sx={{ outline: "none" }}>
          <div data-component="appalachian-explorer">
            <AppalachianFoodSystemsExplorer />
          </div>
        </Box>
      ),
      backgroundColor: colors.medium,
    },
    {
      component: <WestVirginiaFoodSecurityTabs />,
      backgroundColor: colors.accentVeryLight,
    }
  ];

  // Prevent automatic scrolling to specific components
  useEffect(() => {
    // Reset scroll position when the component mounts
    window.scrollTo(0, 0);
    
    // Prevent any programmatic focus that might cause scrolling
    const handleFocus = (e) => {
      // Check if the focused element is within the AppalachianFoodSystemsExplorer
      const isInExplorer = e.target.closest('[data-component="appalachian-explorer"]');
      if (isInExplorer) {
        // Only if the user didn't explicitly interact with the element
        if (!e.target.hasAttribute('data-user-focus')) {
          window.scrollTo(0, 0);
        }
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
      {/* Intro Modal */}
      <IntroModal />

      {/* Hero Section - Full Width Map with override styles and eliminated whitespace */}
      <Box
        sx={{
          width: `calc(100vw - ${scrollbarWidth}px)`,
          height: { xs: "65vh", md: "100vh" },
          position: "relative",
          overflow: "hidden",
          borderBottom: `2px solid ${alpha(MAIN_COLOR, 0.3)}`,
          margin: 0,
          padding: 0,
          display: "block",
          "& > div": { // Target direct child div from FoodRetailer
            height: "100% !important",
            margin: "0 !important",
            padding: "0 !important",
          },
          "& .mapDiv, & div[ref='mapDiv']": {
            padding: "0 !important",
            margin: "0 !important",
            width: "100% !important",
            height: "100% !important"
          },
          "& .esri-view": {
            width: "100% !important",
            height: "100% !important",
            padding: "0 !important",
            margin: "0 !important",
          },
          "& .esri-view-surface": {
            width: "100% !important",
            height: "100% !important"
          },
          "& .esri-ui": {
            inset: "auto !important"
          },
          "& canvas": {
            display: "block !important",
            height: "100% !important"
          }
        }}
      >
        {/* Pass inline styles to FoodRetailer directly to override internal styles */}
        <FoodRetailer />
      </Box>

      {/* Content Sections - No margin or padding that creates whitespace */}
      {sections.map((section, index) => (
        <Section
          key={index}
          backgroundColor={section.backgroundColor}
          fullWidth={true}
          containContent={index === 6} // Apply containment to WestVirginiaFoodSecurityTabs
        >
          {section.component}
        </Section>
      ))}
      
      
    </Box>
  );
};

export default HomePage;