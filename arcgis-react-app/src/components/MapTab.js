import React, { useState } from "react";
import { Box, Tabs, Tab, Tooltip, useMediaQuery, useTheme, Paper, Typography } from "@mui/material";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import StorefrontIcon from "@mui/icons-material/Storefront";
import HomeRepairServiceIcon from "@mui/icons-material/HomeRepairService";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import DoorSlidingIcon from '@mui/icons-material/DoorSliding';

import FoodFinderMap from "./FoodFinderMap";
import FoodRetailer from "./FoodRetailer";
import CountySummary from "./CountySummary";
import Charities from "./Charities";

const MapTabs = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  // Tab options with descriptions
  const tabOptions = [
    { 
      label: "Food Retailer", 
      icon: <StorefrontIcon />, 
      description: "Find grocery stores, supermarkets, and food vendors"
    },
    { 
      label: "Food Access", 
      icon: <DoorSlidingIcon />, 
      description: "View food access points and services in your area"
    },
    { 
      label: "County Summary", 
      icon: <HomeRepairServiceIcon />, 
      description: "View county-level food resource information"
    },
    { 
      label: "Charities", 
      icon: <RestaurantIcon />, 
      description: "Locate food banks and donation centers"
    },
    { 
      label: "Assistance", 
      icon: <LocalHospitalIcon />, 
      description: "Find food assistance and support programs"
    },
  ];

  const renderTabContent = () => {
    switch (selectedTab) {
      case 0:
        return <FoodRetailer />;
      case 1:
        return <FoodFinderMap />;
      case 2:
        return <CountySummary />;
      case 3:
        return <Charities />;
      case 4:
        return <Charities />;
      default:
        return null;
    }
  };

  // Small info panel to show current tab description
  const renderTabInfo = () => {
    const currentTab = tabOptions[selectedTab];
    if (!currentTab) return null;
    
    return (
      <Paper
        elevation={3}
        sx={{
          position: "absolute",
          top: 16,
          left: 16,
          zIndex: 5,
          bgcolor: "rgba(0, 0, 0, 0.7)",
          color: "white",
          px: 2,
          py: 1,
          borderRadius: 2,
          maxWidth: 250,
          display: isMobile ? "none" : "block" // Only show on desktop
        }}
      >
        <Typography variant="body2">{currentTab.description}</Typography>
      </Paper>
    );
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100vh", // Full height of the viewport
        width: "100vw", // Full width of the viewport
        position: "relative",
      }}
    >
      {/* Map Content Area */}
      <Box
        sx={{
          flex: 1,
          width: "100%",
          height: "calc(100vh - 80px)",
          position: "relative",
        }}
      >
        {renderTabContent()}
        {renderTabInfo()}
      </Box>

      {/* Tabs Footer */}
      <Box
        sx={{
          bgcolor: "rgba(0, 0, 0, 0.7)", // Semi-transparent background
          color: "white",
          padding: isMobile ? 1 : 1.5,
          boxShadow: 3,
          position: "absolute",
          bottom: 0,
          width: "100%",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Tabs
          value={selectedTab}
          onChange={handleTabChange}
          variant={isMobile ? "scrollable" : "fullWidth"}
          scrollButtons={isMobile ? "auto" : false}
          indicatorColor="secondary"
          textColor="inherit"
          sx={{
            minHeight: isMobile ? 56 : 70,
          }}
        >
          {tabOptions.map((tab, index) => (
            <Tooltip 
              key={tab.label} 
              title={tab.description}
              placement="top"
              arrow
            >
              <Tab
                icon={React.cloneElement(tab.icon, {
                  sx: {
                    fontSize: isMobile ? 28 : 36, // Larger icons
                    mb: 0.5,
                    color: selectedTab === index ? "#FFD700" : "white",
                  },
                })}
                label={isMobile ? "" : tab.label}
                sx={{
                  fontSize: isMobile ? 10 : 14,
                  minHeight: isMobile ? 56 : 70,
                  padding: isMobile ? 0.5 : 1,
                  transition: "color 0.3s",
                  "&:hover": {
                    color: "#FFD700", // Bright yellow on hover
                  },
                  "&.Mui-selected": {
                    color: "#FFD700", // Bright yellow when selected
                  },
                }}
              />
            </Tooltip>
          ))}
        </Tabs>
      </Box>
    </Box>
  );
};

export default MapTabs;