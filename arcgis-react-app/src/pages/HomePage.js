import React from "react";
import { Box, Divider, useMediaQuery, useTheme } from "@mui/material";
import MapTabs from "../components/MapTab";
import WhatWeDo from "../components/WhatWeDo";
import IssuesSection from "../components/IssuesSection";
import WestVirginiaFoodLandscape from "../components/WestVirginiaFoodLandscape";
import InteractiveWheel from "../components/InteractiveWheel";
import NourishingNetworks from "../components/NourishingNetworks";
import Partners from "../components/Partners";
import Footer from "../components/Footer";

const HomePage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh", // Ensure the entire viewport height is used
        width: "100vw", // Ensure full viewport width
        overflowX: "hidden", // Prevent horizontal overflow
        backgroundColor: "#f9f9f9", // Neutral background color for the page
      }}
    >
      {/* Hero Section with MapTabs */}
      <Box
        sx={{
          width: "calc(100vw - <scrollbar width>)", // Full viewport width
          height: "calc(100vh - <scrollbar width>)",
          position: "relative", // For overlaying elements
          overflow: "hidden", // Prevent overflow
        }}
      >
        {/* MapTabs Component */}
        <MapTabs />
      </Box>

      {/* About Us Section */}
      <Box
        sx={{
          padding: isMobile ? 2 : 4, // Adjust padding for mobile
          backgroundColor: "#ffffff",
          borderRadius: "8px",
          mt: isMobile ? 2 : 4, // Adjust margin for mobile
          mx: isMobile ? 1 : 4, // Add horizontal margin for better spacing
        }}
      >
        <WhatWeDo />
      </Box>

      {/* Divider with Text */}
      <Divider sx={{ my: isMobile ? 2 : 4 }} />

      {/* Issues Section */}
      <Box
        sx={{
          padding: isMobile ? 2 : 4, // Adjust padding for mobile
          backgroundColor: "#f3f3f3",
          borderRadius: "8px",
          mt: isMobile ? 2 : 4, // Adjust margin for mobile
          mx: isMobile ? 1 : 4, // Add horizontal margin for better spacing
        }}
      >
        <IssuesSection />
      </Box>

      {/* Gradient Divider */}
      <Box
        sx={{
          width: "100%",
          height: "6px",
          background: "linear-gradient(to right, #ffffff, #e0e0e0, #ffffff)",
          my: isMobile ? 2 : 3, // Adjust margin for mobile
        }}
      ></Box>

      {/* Food Landscape Section */}
      <Box
        sx={{
          padding: isMobile ? 2 : 4, // Adjust padding for mobile
          backgroundColor: "#ffffff",
          borderRadius: "8px",
          mt: isMobile ? 2 : 4, // Adjust margin for mobile
          mx: isMobile ? 1 : 4, // Add horizontal margin for better spacing
        }}
      >
        <WestVirginiaFoodLandscape />
      </Box>

      {/* Divider with Waves */}
      <Box
        sx={{
          position: "relative",
          width: "100%",
          overflow: "hidden",
          lineHeight: 0,
          mt: isMobile ? 2 : 4, // Adjust margin for mobile
        }}
      >
        <svg
          viewBox="0 0 1440 320"
          xmlns="http://www.w3.org/2000/svg"
          style={{ display: "block", width: "100%", height: "80px" }}
        >
          <path
            fill="#f9f9f9"
            d="M0,160L60,154.7C120,149,240,139,360,149.3C480,160,600,192,720,208C840,224,960,224,1080,224C1200,224,1320,224,1380,218.7L1440,213V320H1380C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320H0Z"
          ></path>
        </svg>
      </Box>

      {/* Interactive Wheel Section */}
      <Box
        sx={{
          padding: isMobile ? 2 : 4, // Adjust padding for mobile
          backgroundColor: "#ffffff",
          borderRadius: "8px",
          mt: isMobile ? 2 : 4, // Adjust margin for mobile
          mx: isMobile ? 1 : 4, // Add horizontal margin for better spacing
        }}
      >
        <InteractiveWheel />
      </Box>

      {/* Nourishing Networks Section */}
      <Box
        sx={{
          padding: isMobile ? 2 : 4, // Adjust padding for mobile
          backgroundColor: "#f9f9f9",
          borderRadius: "8px",
          mt: isMobile ? 2 : 4, // Adjust margin for mobile
          mx: isMobile ? 1 : 4, // Add horizontal margin for better spacing
        }}
      >
        <NourishingNetworks />
      </Box>

      {/* Partners Section */}
      <Partners />

      {/* Footer Section */}
      <Footer />
    </Box>
  );
};

export default HomePage;