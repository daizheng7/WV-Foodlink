import React, { useEffect, useState, useMemo } from "react";
import { Box, useMediaQuery, useTheme, alpha } from "@mui/material";
import IssuesSection from "../components/IssuesSection";
import WestVirginiaFoodLandscape from "../components/WestVirginiaFoodLandscape";
import InteractiveWheel from "../components/InteractiveWheel";
import IntroModal from "../components/IntroModal";
import FoodRetailer from "../components/FoodRetailer";
import CountyReport from "../components/CountyReport";
import PartnerHome from "../components/PartnerHome";
import WestVirginiaFoodSecurityTabs from "../components/WestVirginiaFoodSecurityTab";

// Simple section component
const Section = ({ backgroundColor, children, fullWidth = true, containContent = false }) => (
  <Box
    sx={{
      width: "100%",
      backgroundColor,
      py: { xs: 3, md: 4 },
      display: "flex",
      justifyContent: "center", // Center the content horizontally
    }}
  >
    <Box
      sx={{
        width: "100%",
        maxWidth: "1200px", // Set a maximum width
        px: { xs: 2, md: 4 },
        ...(containContent && {
          maxWidth: { xs: "100%", md: "1200px" },
          mx: "auto"
        })
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

  // Simple color palette
  const colors = {
    base: "#f8f9fa",
    alternate: "#f1f3f5",
  };

  // Core sections configuration
  const sections = [
    {
      component: <IssuesSection />,
      backgroundColor: colors.base,
    },
    {
      component: <WestVirginiaFoodLandscape />,
      backgroundColor: colors.alternate,
    },
    {
      component: <CountyReport />,
      backgroundColor: colors.base,
    },
    {
      component: <InteractiveWheel />,
      backgroundColor: colors.alternate,
    },
    {
      component: <PartnerHome />,
      backgroundColor: colors.base,
    },
    {
      component: <WestVirginiaFoodSecurityTabs />,
      backgroundColor: colors.alternate,
    }
  ];

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        maxWidth: "100vw",
        overflowX: "hidden",
      }}
    >
      {/* Intro Modal */}
      <IntroModal />

      {/* Hero Section */}
      <Box
        sx={{
          width: `calc(100vw - ${scrollbarWidth}px)`,
          height: { xs: "60vh", md: "100vh" },
          position: "relative",
          overflow: "hidden",
        }}
      >
        <FoodRetailer />
      </Box>

      {/* Content Sections */}
      {sections.map((section, index) => (
        <Section
          key={index}
          backgroundColor={section.backgroundColor}
          fullWidth={true}
          containContent={index === 5} // Apply containment to WestVirginiaFoodSecurityTabs
        >
          {section.component}
        </Section>
      ))}
      
      {/* Footer space */}
      <Box sx={{ height: { xs: 3, md: 5 } }} />
    </Box>
  );
};

export default HomePage;