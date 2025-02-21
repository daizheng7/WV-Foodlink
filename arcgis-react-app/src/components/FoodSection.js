import React from "react";
import { Box, Typography, Grid } from "@mui/material";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import StorefrontIcon from "@mui/icons-material/Storefront";
import HomeRepairServiceIcon from "@mui/icons-material/HomeRepairService";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard"; // Icon for SNAP

const FoodSection = () => {
  const boxes = [
    {
      label: "Assistance",
      icon: <LocalHospitalIcon sx={{ fontSize: 64 }} />,
      color: "#007bff",
      description: "Explore assistance programs available for food security.",
    },
    {
      label: "Food Retailer",
      icon: <StorefrontIcon sx={{ fontSize: 64 }} />,
      color: "#28a745",
      description: "Find local food retailers in your area.",
    },
    {
      label: "County Summary",
      icon: <HomeRepairServiceIcon sx={{ fontSize: 64 }} />,
      color: "#ffc107",
      description: "View food security statistics and resources by county.",
    },
    {
      label: "Charities",
      icon: <RestaurantIcon sx={{ fontSize: 64 }} />,
      color: "#ff5722",
      description: "Discover charities providing food assistance near you.",
    },
    {
      label: "SNAP",
      icon: <CardGiftcardIcon sx={{ fontSize: 64 }} />,
      color: "#6a1b9a",
      description: "Learn about SNAP benefits and how to apply for assistance.",
    },
  ];

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        width: "100%",
        backgroundColor: "#f0f2f5",
        padding: 4,
        borderRadius: "8px",
      }}
    >
      <Typography
        variant="h4"
        gutterBottom
        sx={{
          textAlign: "center",
          fontWeight: "bold",
          marginBottom: 4,
          color: "#333",
        }}
      >
        Explore Food Resources
      </Typography>

      <Grid container spacing={4}>
        {boxes.map((box, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
            <Box
              sx={{
                backgroundColor: box.color,
                color: "#fff",
                padding: 3,
                borderRadius: "12px",
                boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
                textAlign: "center",
                transition: "transform 0.3s, box-shadow 0.3s",
                "&:hover": {
                  transform: "translateY(-5px)",
                  boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.2)",
                },
              }}
            >
              {box.icon}
              <Typography
                variant="h6"
                sx={{
                  fontWeight: "bold",
                  marginTop: 2,
                  marginBottom: 1,
                }}
              >
                {box.label}
              </Typography>
              <Typography variant="body2" sx={{ color: "rgba(255, 255, 255, 0.9)" }}>
                {box.description}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default FoodSection;
