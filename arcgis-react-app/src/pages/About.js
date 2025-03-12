import React, { useState } from "react";
import { Typography, Box, Grid, Button, Paper, useTheme, useMediaQuery } from "@mui/material";
import WhatWeDo from "../components/WhatWeDo";

const timelineEvents = [
  { year: "2013", description: "Seed Funding from WVU Public Service Award" },
  { year: "2014", description: "Funding from Benedum Foundation" },
  { year: "2020", description: "Updated Website Version Released" },
  { year: "2023", description: "Current Version in Development" },
];

const About = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));
  const [selectedEvent, setSelectedEvent] = useState(timelineEvents[0]);

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
        padding: getResponsiveSpacing(2, 3, 4),
        boxSizing: "border-box",
      }}
    >
      {/* Main content container */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          backgroundColor: "#ffffff",
          borderRadius: "8px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
          padding: getResponsiveSpacing(2, 3, 4),
          width: "100%",
          boxSizing: "border-box",
        }}
      >
        {/* Page Title */}
        <Typography
          variant="h1"
          component="h1"
          align="center"
          sx={{
            color: "#99031e",
            fontSize: isMobile ? "2.2rem" : isTablet ? "2.7rem" : "3.2rem",
            lineHeight: 1.2,
            fontWeight: 700,
            mb: 3,
          }}
        >
          About WV FOODLINK
        </Typography>

        <Typography
          variant="body1"
          sx={{
            textAlign: "center",
            mb: 6,
            lineHeight: 1.8,
            maxWidth: "800px",
            color: "#555",
          }}
        >
          WV FOODLINK is a project of the Food Justice Lab housed in West Virginia
          University Center for Resilient Communities. In collaboration with our
          community partners, we have developed a resource hub and learning
          commons to support a people-centered, resilient food network in West
          Virginia.
        </Typography>

        {/* Timeline Navigation */}
        <Box 
          sx={{ 
            display: "flex", 
            justifyContent: "center", 
            mb: 4,
            flexWrap: isMobile ? "wrap" : "nowrap",
            gap: 1
          }}
        >
          {timelineEvents.map((event, index) => (
            <Button
              key={index}
              variant={selectedEvent.year === event.year ? "contained" : "outlined"}
              color="primary"
              onClick={() => setSelectedEvent(event)}
              sx={{
                mx: isMobile ? 0.5 : 1,
                mb: isMobile ? 1 : 0,
                textTransform: "none",
                fontWeight: "bold",
                fontSize: isMobile ? "12px" : "14px",
                padding: "8px 16px",
                borderRadius: "8px",
                transition: "all 0.3s ease",
                backgroundColor: selectedEvent.year === event.year ? "#99031e" : "transparent",
                borderColor: "#99031e",
                color: selectedEvent.year === event.year ? "#ffffff" : "#99031e",
                '&:hover': {
                  backgroundColor: selectedEvent.year === event.year ? "#7a0218" : "rgba(153, 3, 30, 0.1)",
                  borderColor: "#99031e",
                },
              }}
            >
              {event.year}
            </Button>
          ))}
        </Box>

        {/* Selected Timeline Event Display */}
        <Paper
          elevation={3}
          sx={{
            p: getResponsiveSpacing(2, 3, 4),
            textAlign: "center",
            mb: 6,
            maxWidth: "600px",
            width: "100%",
            backgroundColor: "#f9f9f9",
            borderRadius: "8px",
            boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Typography
            variant="h5"
            sx={{ fontWeight: "bold", color: "#99031e" }}
          >
            {selectedEvent.year}
          </Typography>
          <Typography variant="body1" sx={{ mt: 2, color: "#555" }}>
            {selectedEvent.description}
          </Typography>
        </Paper>

        {/* Partners Section */}
        <Typography
          variant="h5"
          align="center"
          gutterBottom
          sx={{ fontWeight: "bold", color: "#99031e", mt: 4 }}
        >
          Partners and Support
        </Typography>
        <Typography
          variant="body1"
          sx={{ 
            textAlign: "center", 
            lineHeight: 1.8, 
            color: "#555", 
            maxWidth: "800px",
            px: getResponsiveSpacing(1, 2, 3)
          }}
        >
          WV FOODLINK is a product of partnerships with organizations such as
          Facing Hunger Food Bank, Mountaineer Food Bank, WV Food and Farm
          Coalition, WV Center for Budget and Policy, and many others.
        </Typography>

        {/* Data Sharing Partners */}
        <Typography
          variant="h5"
          align="center"
          gutterBottom
          sx={{ fontWeight: "bold", color: "#99031e", mt: 6 }}
        >
          Data-Sharing Partners
        </Typography>
        <Grid 
          container 
          spacing={getResponsiveSpacing(2, 3, 4)} 
          justifyContent="center" 
          sx={{ mt: 1, width: "100%" }}
        >
          <Grid item xs={12} sm={6} md={3}>
            <Button
              href="#"
              variant="outlined"
              fullWidth
              sx={{
                textTransform: "none",
                fontWeight: "bold",
                color: "#99031e",
                borderColor: "#99031e",
                '&:hover': {
                  backgroundColor: "rgba(153, 3, 30, 0.1)",
                  borderColor: "#99031e",
                },
              }}
            >
              Partner 1 Placeholder
            </Button>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Button
              href="#"
              variant="outlined"
              fullWidth
              sx={{
                textTransform: "none",
                fontWeight: "bold",
                color: "#99031e",
                borderColor: "#99031e",
                '&:hover': {
                  backgroundColor: "rgba(153, 3, 30, 0.1)",
                  borderColor: "#99031e",
                },
              }}
            >
              Partner 2 Placeholder
            </Button>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Button
              href="#"
              variant="outlined"
              fullWidth
              sx={{
                textTransform: "none",
                fontWeight: "bold",
                color: "#99031e",
                borderColor: "#99031e",
                '&:hover': {
                  backgroundColor: "rgba(153, 3, 30, 0.1)",
                  borderColor: "#99031e",
                },
              }}
            >
              Partner 3 Placeholder
            </Button>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Button
              href="#"
              variant="outlined"
              fullWidth
              sx={{
                textTransform: "none",
                fontWeight: "bold",
                color: "#99031e",
                borderColor: "#99031e",
                '&:hover': {
                  backgroundColor: "rgba(153, 3, 30, 0.1)",
                  borderColor: "#99031e",
                },
              }}
            >
              Partner 4 Placeholder
            </Button>
          </Grid>
        </Grid>
        
        {/* What We Do Component */}
        <Box sx={{ width: "100%", mt: 6 }}>
          <WhatWeDo />
        </Box>
      </Box>
    </Box>
  );
};

export default About;