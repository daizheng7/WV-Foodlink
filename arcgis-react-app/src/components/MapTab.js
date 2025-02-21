import React, { useState } from "react";
import { Box, Tabs, Tab, Tooltip, useMediaQuery, useTheme } from "@mui/material";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import StorefrontIcon from "@mui/icons-material/Storefront";
import HomeRepairServiceIcon from "@mui/icons-material/HomeRepairService";
import RestaurantIcon from "@mui/icons-material/Restaurant";

import FoodFinderMap from "./FoodFinderMap";
import FoodRetailer from "./FoodRetailer";
import CountySummary from "./CountySummary";
import Charities from "./Charities";
import HealthInitiativesMap from "./HealthInitiativesMap";

const MapTabs = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

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
        return <HealthInitiativesMap />;
      default:
        return null;
    }
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
          height: "100%",
          position: "relative",
        }}
      >
        {renderTabContent()}
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
            minHeight: isMobile ? 48 : 64,
          }}
        >
          {[
            { label: "Food Retailer", icon: <StorefrontIcon /> },
            { label: "Assistance", icon: <LocalHospitalIcon /> },
            { label: "County Summary", icon: <HomeRepairServiceIcon /> },
            { label: "Charities", icon: <RestaurantIcon /> },
          ].map((tab, index) => (
            <Tooltip key={tab.label} title={tab.label}>
              <Tab
                icon={React.cloneElement(tab.icon, {
                  sx: {
                    fontSize: isMobile ? 20 : 32, // Slightly smaller icons
                    color: "white",
                  },
                })}
                label={isMobile ? "" : tab.label}
                sx={{
                  fontSize: isMobile ? 10 : 14,
                  minHeight: isMobile ? 48 : 64,
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
