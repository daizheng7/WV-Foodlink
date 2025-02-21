import React from "react";
import { Box, Typography, Grid, Button, Card, CardContent } from "@mui/material";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import StorefrontIcon from "@mui/icons-material/Storefront";
import HomeRepairServiceIcon from "@mui/icons-material/HomeRepairService";
import RestaurantIcon from "@mui/icons-material/Restaurant";

const learnMoreCategories = [
  {
    title: "Assistance",
    description:
      "Find programs and services that provide food assistance to individuals and families in need.",
    icon: <LocalHospitalIcon sx={{ fontSize: 50, color: "#8B0000" }} />,
    actionText: "Learn About Assistance",
  },
  {
    title: "Food Retailer",
    description:
      "Discover nearby food retailers, including grocery stores and specialty markets, that accept assistance programs.",
    icon: <StorefrontIcon sx={{ fontSize: 50, color: "#2196F3" }} />,
    actionText: "Find Food Retailers",
  },
  {
    title: "County Summary",
    description:
      "Explore data and statistics about food security, resources, and demographics for your county.",
    icon: <HomeRepairServiceIcon sx={{ fontSize: 50, color: "#FFC107" }} />,
    actionText: "View County Summary",
  },
  {
    title: "Charities",
    description:
      "Learn about organizations and charities working to address food insecurity and how you can get involved.",
    icon: <RestaurantIcon sx={{ fontSize: 50, color: "#9C27B0" }} />,
    actionText: "Support Charities",
  },
];

const LearnMore = () => {
  return (
    <Box sx={{ py: 6, px: 4, backgroundColor: "#f9f9f9" }}>
      <Typography
        variant="h4"
        align="center"
        gutterBottom
        sx={{
          fontWeight: "bold",
          mb: 4,
        }}
      >
        Learn More
      </Typography>
      <Grid container spacing={4} justifyContent="center">
        {learnMoreCategories.map((category, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                alignItems: "center",
                textAlign: "center",
                p: 3,
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                "&:hover": {
                  transform: "scale(1.02)",
                  boxShadow: "0 6px 16px rgba(0,0,0,0.2)",
                  transition: "transform 0.3s ease-in-out",
                },
              }}
            >
              <CardContent>
                <Box sx={{ mb: 2 }}>{category.icon}</Box>
                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{ fontWeight: "bold" }}
                >
                  {category.title}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    mb: 3,
                    color: "#666",
                    fontSize: "0.95rem",
                  }}
                >
                  {category.description}
                </Typography>
              </CardContent>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#1976d2",
                  color: "#fff",
                  "&:hover": { backgroundColor: "#145ea8" },
                }}
              >
                {category.actionText}
              </Button>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default LearnMore;
