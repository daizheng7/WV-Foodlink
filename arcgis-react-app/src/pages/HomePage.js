import React from "react";
import { Box, Divider, Typography } from "@mui/material"; 
import MapTabs from "../components/MapTab"; 
import AboutUs from "../components/AboutUs";
import WhatWeDo from "../components/WhatWeDo";
import SNAPwv from "../components/SNAPwv";
import LearnMore from "../components/LearnMore";
import IssuesSection from "../components/IssuesSection";
import { ResponsivePie } from "@nivo/pie";
import FoodSection from "../components/FoodSection";
import DataTable from "../components/DataTable";
import RankingCounties from "../components/RankingCounties";
import {Button } from '@mui/material';
import WestVirginiaFoodLandscape from "../components/WestVirginiaFoodLandscape";
import FoodAtlas from "../components/FoodAtlas";
import MapComponent from "../components/MapComponent";
import NourishingNetworks from "../components/NourishingNetworks";
import InteractiveWheel from "../components/InteractiveWheel";
import Partners from "../components/Partners";
import Footer from "../components/Footer"


const HomePage = () => {
  const webMapIds = [
    "51811ead9a794bcdae5007554a236c72", // WebMap 1
    "daf77188582b408ab40bd538a49ec438", // WebMap 2
    "ecd6f8533cbe4fa4990da3fac6254708", // WebMap 3
    "6b6afdd7287041199f09f03f0e55605f", // WebMap 4
  ];

  return (
    <Box
    sx={{
      display: "flex",
      flexDirection: "column",
      minHeight: "100%", // Ensure the entire viewport height is used
      width: "100%", // Occupy full width of the parent container
      backgroundColor: "#f9f9f9", // Neutral background color for the page
    }}
  >
    {/* Hero Section with MapTabs */}
    <Box
      sx={{
        width: "calc(100vw - <scrollbar width>)", // Full viewport width
        height: "calc(100vh - <scrollbar width>)", 
        padding: 4,
        marginTop: 2,
        backgroundColor: "#ffffff",
        borderRadius: "8px", // Rounded corners
        boxShadow: 3,// Remove default padding
        backgroundColor: "#e0e0e0", // Optional placeholder background
        position: "relative", // For overlaying elements
        display: "flex", // Flexbox for layout
        justifyContent: "center", // Center content horizontally
        alignItems: "center", // Center content vertically
        overflow: "auto", // Clip overflowing content
      }}
    >
      {/* MapTabs Component */}
      <MapTabs />
  
      
    </Box>
  
    {/* About Us Section */}
    <Box
        sx={{
          padding: 4,
          backgroundColor: "#ffffff",
          borderRadius: "8px",
          boxShadow: 3,
        }}
      >
        <WhatWeDo />
      </Box>

      {/* Divider with Text */}
      

      {/* Issues Section */}
      <Box sx={{ padding: 4, backgroundColor: "#f3f3f3", borderRadius: "8px" }}>
        <IssuesSection />
      </Box>

      {/* Gradient Divider */}
      <Box
        sx={{
          width: "100%",
          height: "6px",
          background: "linear-gradient(to right, #ffffff, #e0e0e0, #ffffff)",
          my: 3,
        }}
      ></Box>

      {/* Food Landscape Section */}
      <Box sx={{ padding: 4, backgroundColor: "#ffffff", borderRadius: "8px" }}>
        <WestVirginiaFoodLandscape />
      </Box>

      {/* Divider with Waves */}
      <Box
        sx={{
          position: "relative",
          width: "100%",
          overflow: "hidden",
          lineHeight: 0,
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
<Box sx={{ padding: 4, backgroundColor: "#ffffff", borderRadius: "8px" }}>
        <InteractiveWheel />
      </Box>
      {/* Nourishing Networks Section */}
      <Box sx={{ padding: 4, backgroundColor: "#f9f9f9", borderRadius: "8px" }}>
        <NourishingNetworks />
      </Box>

      <Partners />
      <Footer />

     
    </Box>
  );
};

export default HomePage;