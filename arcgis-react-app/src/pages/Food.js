import React from "react";
import { Box, Typography, Button } from "@mui/material";
import FoodFinderMap from "./FoodFinderMap"; // Adjust the path as per your folder structure

const Food = () => {
  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h3" gutterBottom sx={{ textAlign: "center", fontWeight: "bold" }}>
        Welcome to the Food Page
      </Typography>
      <Typography variant="body1" sx={{ marginTop: 2, textAlign: "justify" }}>
        This page provides information about food systems, sustainable practices, and resources 
        for food security. Explore the various resources available to support a sustainable and 
        equitable food system for everyone.
      </Typography>
      <Button
        variant="contained"
        color="primary"
        sx={{ marginTop: 4, display: "block", marginLeft: "auto", marginRight: "auto" }}
      >
        Learn More
      </Button>

      {/* Food Finder Map Section */}
      <Box sx={{ marginTop: 8 }}>
        <Typography variant="h4" gutterBottom sx={{ textAlign: "center", fontWeight: "bold" }}>
          Food Finder Map
        </Typography>
        <Typography variant="body1" sx={{ marginBottom: 4, textAlign: "justify" }}>
          Use the interactive map below to explore food assistance resources, sustainable practices, 
          and locations supporting food security.
        </Typography>
        <FoodFinderMap />
      </Box>
    </Box>
  );
};

export default Food;
