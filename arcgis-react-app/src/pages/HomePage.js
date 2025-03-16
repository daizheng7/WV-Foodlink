import React, { useEffect, useState } from "react";
import { Box, Divider, useMediaQuery, useTheme, Container, Paper, alpha } from "@mui/material";
import WhatWeDo from "../components/WhatWeDo";
import IssuesSection from "../components/IssuesSection";
import WestVirginiaFoodLandscape from "../components/WestVirginiaFoodLandscape";
import InteractiveWheel from "../components/InteractiveWheel";
import IntroModal from "../components/IntroModal";
import FoodRetailer from "../components/FoodRetailer";
import CountyReport from "../components/CountyReport";
import PartnerHome from "../components/PartnerHome";
import AppalachianFoodSystemsExplorer from "../components/AppalachianFoodSystemsExplorer";
import FoodSecuritySummary from "../components/FoodSecuritySummary";
import MUIBudgetSection from "../components/MUIBudgetSection";
import WestVirginiaFoodSecurityTabs from "../components/WestVirginiaFoodSecurityTab";

const HomePage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));
  const [scrollbarWidth, setScrollbarWidth] = useState(0);

  // Calculate scrollbar width on component mount to fix layout issues
  useEffect(() => {
    const scrollDiv = document.createElement("div");
    scrollDiv.style.width = "100px";
    scrollDiv.style.height = "100px";
    scrollDiv.style.overflow = "scroll";
    scrollDiv.style.position = "absolute";
    scrollDiv.style.top = "-9999px";
    document.body.appendChild(scrollDiv);
    
    const scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
    setScrollbarWidth(scrollbarWidth);
    
    document.body.removeChild(scrollDiv);
  }, []);

  // Function to determine responsive spacing
  const getResponsiveSpacing = (mobileSm, tabletMd, desktopLg) => {
    if (isMobile) return mobileSm;
    if (isTablet) return tabletMd;
    return desktopLg;
  };

  // Define modern color palette
  const colors = {
    base: "#ffffff",
    alternate: "#f7fafc", 
    divider: alpha(theme.palette.primary.main || "#1976d2", 0.07)
  };

  // Section component with clean styling
  const Section = ({ 
    backgroundColor = colors.base, 
    children, 
    elevation = 0, 
    marginTop = 0,
    marginBottom = 0,
    hasBorder = false,
    sectionWidth = "lg"
  }) => (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        backgroundColor: backgroundColor,
        mt: marginTop,
        mb: marginBottom,
        py: getResponsiveSpacing(2, 3, 4),
        zIndex: 1,
      }}
    >
      <Container maxWidth={sectionWidth} disableGutters={false}>
        <Box
          sx={{
            backgroundColor: "transparent",
            p: getResponsiveSpacing(2, 3, 4),
            borderRadius: "8px",
            position: "relative",
            overflow: "hidden",
            boxShadow: elevation ? `0 ${elevation * 2}px ${elevation * 4}px rgba(0,0,0,0.05)` : "none",
            border: hasBorder ? `1px solid ${alpha(theme.palette.divider, 0.08)}` : "none",
          }}
        >
          {children}
        </Box>
      </Container>
    </Box>
  );

  // Simple divider component
  const SimpleDivider = () => (
    <Box
      sx={{
        width: "100%",
        height: "1px",
        background: `linear-gradient(to right, transparent, ${colors.divider}, transparent)`,
        my: getResponsiveSpacing(1, 1.5, 2),
      }}
    />
  );

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        maxWidth: "100vw",
        overflowX: "hidden",
        backgroundColor: colors.base,
      }}
    >
      {/* Intro Modal */}
      <IntroModal />

      {/* Hero Section with FoodRetailer - Full Width */}
      <Box
        sx={{
          width: `calc(100vw - ${scrollbarWidth}px)`,
          height: isMobile ? "70vh" : `calc(100vh - ${scrollbarWidth}px)`,
          position: "relative",
          overflow: "hidden",
          backgroundColor: colors.base,
        }}
      >
        <FoodRetailer />
      </Box>

      {/* Issues Section - White Background */}
      <Section 
        backgroundColor={colors.base} 
        marginTop={getResponsiveSpacing(1, 1.5, 2)}
        elevation={1}
        hasBorder={true}
      >
        <IssuesSection />
      </Section>

      <SimpleDivider />

      {/* Food Landscape Section - Alternate Background */}
      <Section 
        backgroundColor={colors.alternate}
        elevation={1}
      >
        <WestVirginiaFoodLandscape />
      </Section>

      <SimpleDivider />

      {/* County Report Section - Base Background */}
      <Section 
        backgroundColor={colors.base}
        elevation={1}
      >
        <CountyReport />
      </Section>

      <SimpleDivider />

      {/* Interactive Wheel Section - Alternate Background */}
      <Section 
        backgroundColor={colors.alternate}
        elevation={1}
      >
        <InteractiveWheel />
      </Section>

      <SimpleDivider />

      {/* Partners Section - Base Background */}
      <Section 
        backgroundColor={colors.base}
        elevation={1}
      >
        <PartnerHome />
      </Section>

      <SimpleDivider />

      {/* Appalachian Food Systems Explorer - Alternate Background */}
      <Section 
        backgroundColor={colors.alternate}
        elevation={1}
      >
        <AppalachianFoodSystemsExplorer />
      </Section>

      <SimpleDivider />

      {/* Food Security Tabs - White Background */}
      <Section 
        backgroundColor={colors.base}
        elevation={1}
      >
        <WestVirginiaFoodSecurityTabs />
      </Section>
      
      {/* Footer space */}
      <Box sx={{ height: getResponsiveSpacing(3, 4, 5), backgroundColor: colors.base }} />
    </Box>
  );
};

export default HomePage;