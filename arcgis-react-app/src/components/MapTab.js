import React, { useState } from "react";
import { Box, Tabs, Tab, Tooltip, useMediaQuery, useTheme } from "@mui/material";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import StorefrontIcon from "@mui/icons-material/Storefront";
import HomeRepairServiceIcon from "@mui/icons-material/HomeRepairService";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import HealthAndSafetyIcon from "@mui/icons-material/HealthAndSafety";

import FoodFinderMap from "./FoodFinderMap";
import FoodRetailer from "./FoodRetailer";
import CountySummary from "./CountySummary";
import Charities from "./Charities";
import HealthInitiativesMap from "./HealthInitiativesMap";
import CountyReport from "./CountyReport";
const MapTabs = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // Detect small screen sizes

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const renderTabContent = () => {
    switch (selectedTab) {
      case 0:
        return <FoodFinderMap />;
      case 1:
        return <FoodRetailer />;
      case 2:
        return <CountyReport />;
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
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#f0f2f5", // Light gray background for contrast
      }}
    >
      {/* Tabs Header */}
      <Box
        sx={{
          bgcolor: "#8B0000", // Dark red background for tabs
          color: "white",
          padding: isMobile ? 1 : 2,
          boxShadow: 3,
        }}
      >
        <Tabs
          value={selectedTab}
          onChange={handleTabChange}
          variant={isMobile ? "scrollable" : "fullWidth"}
          scrollButtons={isMobile ? "auto" : false}
          indicatorColor="secondary"
          textColor="inherit"
          centered={!isMobile}
        >
          {[
            { label: "Assistance", icon: <LocalHospitalIcon /> },
            { label: "Food Retailer", icon: <StorefrontIcon /> },
            { label: "County Summary", icon: <HomeRepairServiceIcon /> },
            { label: "Charities", icon: <RestaurantIcon /> }
            
          ].map((tab, index) => (
            <Tooltip key={tab.label} title={tab.label}>
              <Tab
                icon={React.cloneElement(tab.icon, {
                  sx: { fontSize: isMobile ? 40 : 80 },
                })}
                label={isMobile ? "" : tab.label}
                sx={{
                  fontSize: isMobile ? 12 : 16,
                  transition: "transform 0.3s, color 0.3s",
                  "&:hover": {
                    color: "#FFD700", // Bright yellow on hover
                  },
                  "&.Mui-selected": {
                    color: "#FFD700", // Bright yellow for the selected tab
                  },
                }}
              />
            </Tooltip>
          ))}
        </Tabs>
      </Box>

      {/* Flexible Map Content Area */}
      <Box
        sx={{
          flex: 1, // Expands to fill the remaining vertical space
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: isMobile ? 0.5 : 1,
          bgcolor: "white",
        }}
      >
        <Box
          sx={{
            width: "100%", // Fully utilize available width
            height: "100%", // Fully utilize available height
            maxWidth: "1400px", // Optional: Limit maximum width for larger screens
            bgcolor: "#ffffff",
            borderRadius: isMobile ? 0 : 2, // Rounded corners for desktop
            boxShadow: isMobile ? 0 : 2, // Subtle shadow for desktop
            overflow: "hidden",
          }}
        >
          {renderTabContent()}
        </Box>
      </Box>
    </Box>
  );
};

export default MapTabs;
