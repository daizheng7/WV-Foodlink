import React, { useEffect, useState } from "react";
import { Box, Divider, useMediaQuery, useTheme, Container, Paper, Typography } from "@mui/material";
import WhatWeDo from "../components/WhatWeDo";
import IssuesSection from "../components/IssuesSection";
import WestVirginiaFoodLandscape from "../components/WestVirginiaFoodLandscape";
import InteractiveWheel from "../components/InteractiveWheel";
import NourishingNetworks from "../components/NourishingNetworks";
import Partners from "../components/Partners";
import FoodRetailer from "../components/FoodRetailer";
import CountyReport from "../components/CountyReport";

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

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        maxWidth: "100vw",
        overflowX: "hidden",
        backgroundColor: "#f9f9f9",
      }}
    >
      {/* Hero Section with FoodRetailer */}
      <Box
        sx={{
          width: `calc(100vw - ${scrollbarWidth}px)`,
          height: isMobile ? "70vh" : `calc(100vh - ${scrollbarWidth}px)`,
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* FoodRetailer Component */}
        <FoodRetailer />
      </Box>

      {/* Container for consistent margins and responsive behavior */}
      <Container 
        maxWidth={false} 
        disableGutters={true}
        sx={{ 
          px: getResponsiveSpacing(1, 2, 4),
          width: `calc(100vw - ${scrollbarWidth}px)`,
        }}
      >


        {/* Divider with Text */}
        <Divider sx={{ 
          my: getResponsiveSpacing(3, 4, 5),
          "&::before, &::after": {
            borderColor: "rgba(0, 0, 0, 0.1)",
          }
        }} />

        {/* Issues Section */}
        <Box
          sx={{
            padding: getResponsiveSpacing(3, 4, 5),
            backgroundColor: "#f3f3f3",
            borderRadius: "8px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
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
            my: getResponsiveSpacing(3, 4, 5),
          }}
        />

        {/* Food Landscape Section */}
        <Box
          sx={{
            padding: getResponsiveSpacing(3, 4, 5),
            backgroundColor: "#ffffff",
            borderRadius: "8px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
            transition: "transform 0.3s ease-in-out",
            "&:hover": {
              transform: "translateY(-5px)",
            },
          }}
        >
          <WestVirginiaFoodLandscape />
        </Box>

        {/* Wave Divider - Responsive size */}
        <Box
          sx={{
            position: "relative",
            width: "100%",
            overflow: "hidden",
            lineHeight: 0,
            mt: getResponsiveSpacing(3, 4, 5),
          }}
        >
          <svg
            viewBox="0 0 1440 320"
            xmlns="http://www.w3.org/2000/svg"
            style={{ 
              display: "block", 
              width: "100%", 
              height: isMobile ? "40px" : isTablet ? "60px" : "80px" 
            }}
          >
            <path
              fill="#f9f9f9"
              d="M0,160L60,154.7C120,149,240,139,360,149.3C480,160,600,192,720,208C840,224,960,224,1080,224C1200,224,1320,224,1380,218.7L1440,213V320H1380C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320H0Z"
            />
          </svg>
        </Box>

        {/* County Report Section */}
        <Paper
          sx={{
            padding: getResponsiveSpacing(2, 2.5, 3),
            marginBottom: getResponsiveSpacing(2, 3, 4),
            borderRadius: "8px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
            backgroundColor: "#ffffff",
          }}
        >
          <Typography
            variant="h5"
            sx={{
              fontWeight: "bold",
              mb: 2,
              color: "#000000",
            }}
          >
            County Report
          </Typography>
          <Divider sx={{ mb: 2, borderColor: "#000000" }} />
          <CountyReport />
        </Paper>

        {/* Interactive Wheel Section */}
        <Box
          sx={{
            padding: getResponsiveSpacing(3, 4, 5),
            backgroundColor: "#ffffff",
            borderRadius: "8px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
            transition: "transform 0.3s ease-in-out",
            "&:hover": {
              transform: "translateY(-5px)",
            },
          }}
        >
          <InteractiveWheel />
        </Box>

        {/* Nourishing Networks Section */}
        <Box
          sx={{
            padding: getResponsiveSpacing(3, 4, 5),
            backgroundColor: "#f9f9f9",
            borderRadius: "8px",
            mt: getResponsiveSpacing(3, 4, 5),
            boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
          }}
        >
          <NourishingNetworks />
        </Box>
      </Container>

      {/* Partners Section - Full width */}
      <Box
        sx={{
          mt: getResponsiveSpacing(3, 4, 5),
          py: getResponsiveSpacing(3, 4, 5),
          backgroundColor: "#f3f3f3",
          width: `calc(100vw - ${scrollbarWidth}px)`,
        }}
      >
        <Container maxWidth={false} disableGutters={true} sx={{ px: getResponsiveSpacing(1, 2, 4) }}>
          <Partners />
        </Container>
      </Box>
    </Box>
  );
};

export default HomePage;