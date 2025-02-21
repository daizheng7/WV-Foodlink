import React from "react";
import { Box } from "@mui/material";
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
import {Typography, Button } from '@mui/material';

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
        marginTop: 2,
        backgroundColor: "#ffffff",
        borderRadius: "8px", // Rounded corners
        boxShadow: 3, // Shadow for depth
      }}
    >
      <WhatWeDo />
      <IssuesSection />
      <RankingCounties />
      <LearnMore />
      <DataTable />
    </Box>
  </Box>
  
  );
};

export default HomePage;
