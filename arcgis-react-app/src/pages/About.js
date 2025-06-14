import React, { useState } from "react";
import { Typography, Box, Grid, Button, Paper, useTheme } from "@mui/material";
import WhatWeDo from "../components/WhatWeDo";
import SNACMembers from "../components/SNACMembers";
import DataPartners from "../components/DataPartners";

const fundingPartners = [
  { name: "Eberly College Public Service Award", year: "2016" },
  { name: "Benedum Foundation", year: "2016+" },
  { name: "Sisters Health Foundation", year: "2016+" },
  { name: "Parkersburg Area Community Foundation", year: "2016+" },
  { name: "Bernard McDonough Foundation", year: "2016+" },
  { name: "Mazon", year: "2016+" },
];

const About = () => {
  const theme = useTheme();
  const [selectedPartner, setSelectedPartner] = useState(fundingPartners[0]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        padding: { xs: 2, sm: 3, md: 4 },
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
          padding: { xs: 2, sm: 3, md: 4 },
          width: "100%",
          boxSizing: "border-box",
          overflow: "hidden",
          textAlign: 'center',
        }}
      >
        {/* Page Title */}
        <Typography
            variant="h1"
            className="text-wvu-blue display-3 wvu-bar wvu-bar--center wvu-bar--bottom wvu-shout"
            sx={{
              
             
              mb: 3,
          
              width: "auto",
             
            }}
          >
          ABOUT
        </Typography>

        {/* Main About Text - First Paragraph */}
        <Typography
          variant="body1"
          sx={{
            textAlign: "left",
            mb: 3,
            lineHeight: 1.8,
            maxWidth: "800px",
            color: "#333",
            fontSize: { xs: "1rem", sm: "1.05rem" },
            fontFamily: "'Source Sans Pro', sans-serif",
            padding: { xs: "0 16px", sm: "0" },
          }}
        >
          The <Box component="span" sx={{ fontWeight: "bold", color: "#002855" }}>WVU Center for Resilient Communities</Box> launched WV FOODLINK in 2015 following two years of action research with anti-hunger organizations across the state of West Virginia who expressed a desire for an online resource to make their work visible and a place to better understand the scope and reach of public nutrition assistance programs.
        </Typography>

        {/* Main About Text - Second Paragraph */}
        <Typography
          variant="body1"
          sx={{
            textAlign: "left",
            mb: 3,
            lineHeight: 1.8,
            maxWidth: "800px",
            color: "#333",
            fontSize: { xs: "1rem", sm: "1.05rem" },
            fontFamily: "'Source Sans Pro', sans-serif",
            padding: { xs: "0 16px", sm: "0" },
          }}
        >
          This website is now maintained in partnership with the <Box component="span" sx={{ fontWeight: "bold", color: "#004990" }}>WVU Extension Family Nutrition Program (SNAP-Ed)</Box> and its development continues to be motivated by a vision that <Box component="span" sx={{ fontStyle: "italic" }}>all people must have access to safe, nutritious, and culturally appropriate food in sufficient quantity and quality to sustain a healthy life with human dignity</Box>.
        </Typography>

        {/* Main About Text - Third Paragraph */}
        <Typography
          variant="body1"
          sx={{
            textAlign: "left",
            mb: 4,
            lineHeight: 1.8,
            maxWidth: "800px",
            color: "#333",
            fontSize: { xs: "1rem", sm: "1.05rem" },
            fontFamily: "'Source Sans Pro', sans-serif",
            padding: { xs: "0 16px", sm: "0" },
          }}
        >
          Too many West Virginians continue to face <Box component="span" sx={{ fontWeight: "bold" }}>critical challenges in meeting their basic nutritional needs</Box> and information about our food system is splintered across a number of public and private agencies. By providing a central data repository about the state's food environments and nutrition programs, WV FOODLINK aims to foster <Box component="span" sx={{ fontWeight: "600" }}>knowledge exchange, informed policy decisions, support the development of community food security plans</Box> and monitor the equitable distribution of resources.
        </Typography>

        {/* Main Logo Partners - Enhanced Design */}
        
        {/* Page Title */}
        <Typography
            variant="h2"
            className="text-wvu-blue display-3 wvu-bar wvu-bar--center wvu-bar--bottom wvu-shout"
            sx={{
              
             
              mb: 3,
          
              width: "auto",
             
            }}
          >
          Our Key Partners
        </Typography>
          
        <Grid 
          container 
          spacing={{ xs: 3, sm: 4, md: 6 }}
          justifyContent="center" 
          sx={{ 
            mt: 4, 
            mb: 6, 
            width: "100%", 
            maxWidth: "1000px",
            px: { xs: 2, sm: 3, md: 0 }
          }}
        >
          <Grid item xs={12} md={6} sx={{ 
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}>
            <Paper
              elevation={4}
              sx={{
                p: 0,
                width: "100%",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "stretch",
                borderRadius: "12px",
                overflow: "hidden",
                transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
                "&:hover": {
                  transform: { xs: "none", sm: "translateY(-5px)" },
                  boxShadow: "0 15px 30px rgba(0,0,0,0.15)",
                }
              }}
            >
              {/* Header Banner */}
              <Box 
                sx={{
                  bgcolor: "#002855",
                  p: { xs: 1.5, sm: 2 },
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                <Typography
                  variant="h2"
                  component="a"
                  href="https://resilientcommunities.wvu.edu/"
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{ 
                    fontWeight: "bold", 
                    color: "white", 
                    textDecoration: "none",
                    textAlign: "center",
                    fontSize: { xs: "1.2rem", sm: "1.3rem", md: "1.5rem" },
                    "&:hover": {
                      textDecoration: "underline",
                    }
                  }}
                >
                  WVU Center for Resilient Communities
                </Typography>
              </Box>
              
              {/* Content Area */}
              <Box 
                sx={{
                  p: { xs: 2, sm: 3 },
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  bgcolor: "#f8f8f8",
                  flexGrow: 1
                }}
              >
                {/* Placeholder for logo - uncomment when you have the actual logo */}
                {/* <Box 
                  component="img"
                  sx={{
                    height: 80,
                    width: "auto",
                    mb: 2
                  }}
                  alt="WVU Center Logo"
                  src="/path-to-logo.png"
                /> */}
                
                <Typography 
                  variant="body1" 
                  sx={{ 
                    color: "#333",
                    textAlign: "center",
                    fontWeight: "500",
                    fontSize: { xs: "1rem", sm: "1.1rem" },
                    lineHeight: 1.6,
                    mb: 2
                  }}
                >
                  Advancing community resilience and sustainable development in West Virginia
                </Typography>
                
                <Button
                  variant="outlined"
                  href="https://resilientcommunities.wvu.edu/"
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    mt: 2,
                    color: "#002855",
                    borderColor: "#002855",
                    fontWeight: "bold",
                    fontSize: { xs: "0.8rem", sm: "0.875rem" },
                    "&:hover": {
                      backgroundColor: "rgba(0, 40, 85, 0.1)",
                      borderColor: "#002855",
                    }
                  }}
                >
                  Visit WVU Center for Resilient Communities Website
                </Button>
              </Box>
            </Paper>
          </Grid>
          
          <Grid item xs={12} md={6} sx={{ 
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}>
            <Paper
              elevation={4}
              sx={{
                p: 0,
                width: "100%",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "stretch",
                borderRadius: "12px",
                overflow: "hidden",
                transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
                "&:hover": {
                  transform: { xs: "none", sm: "translateY(-5px)" },
                  boxShadow: "0 15px 30px rgba(0,0,0,0.15)",
                }
              }}
            >
              {/* Header Banner */}
              <Box 
                sx={{
                  bgcolor: "#004990", // WVU blue color
                  p: { xs: 1.5, sm: 2 },
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                <Typography
                  variant="h2"
                  component="a"
                  href="https://extension.wvu.edu/food-health/nutrition/fnp"
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{ 
                    fontWeight: "bold", 
                    color: "white", 
                    textDecoration: "none",
                    textAlign: "center",
                    fontSize: { xs: "1.2rem", sm: "1.3rem", md: "1.5rem" },
                    "&:hover": {
                      textDecoration: "underline",
                    }
                  }}
                >
                  WVU Extension Family Nutrition Program
                </Typography>
              </Box>
              
              {/* Content Area */}
              <Box 
                sx={{
                  p: { xs: 2, sm: 3 },
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  bgcolor: "#f8f8f8",
                  flexGrow: 1
                }}
              >
                {/* Placeholder for logo - uncomment when you have the actual logo */}
                {/* <Box 
                  component="img"
                  sx={{
                    height: 80,
                    width: "auto",
                    mb: 2
                  }}
                  alt="WVU Extension Logo"
                  src="/path-to-logo.png"
                /> */}
                
                <Typography 
                  variant="body1" 
                  sx={{ 
                    color: "#333",
                    textAlign: "center",
                    fontWeight: "500",
                    fontSize: { xs: "1rem", sm: "1.1rem" },
                    lineHeight: 1.6,
                    mb: 2
                  }}
                >
                  Promoting healthy eating and active lifestyles for limited-resource West Virginians
                </Typography>
                
                <Button
                  variant="outlined"
                  href="https://extension.wvu.edu/food-health/nutrition/fnp"
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    mt: 2,
                    color: "#004990",
                    borderColor: "#004990",
                    fontWeight: "bold",
                    fontSize: { xs: "0.8rem", sm: "0.875rem" },
                    "&:hover": {
                      backgroundColor: "rgba(0, 73, 144, 0.1)",
                      borderColor: "#004990",
                    }
                  }}
                >
                  Visit WVU Extension Family Nutrition Program Website
                </Button>
              </Box>
            </Paper>
          </Grid>
        </Grid>

        {/* Funding Partners */}
        <Box sx={{ 
          width: "100%", 
          maxWidth: "800px", 
          mt: 5, 
          mb: 6, 
          backgroundColor: "#f8f8f8",
          borderRadius: "12px",
          padding: { xs: 2, sm: 3, md: 5 },
          boxShadow: "0 4px 8px rgba(0,0,0,0.05)",
          mx: { xs: 2, sm: 3, md: "auto" },
          textAlign: "center",
        }}>
          <Typography
            variant="h2"
            className="text-wvu-blue display-3 wvu-bar wvu-bar--center wvu-bar--bottom wvu-shout"
            sx={{
              
             
              mb: 3,
          
              width: "auto",
             
            }}
          >
            Our Supporters
          </Typography>
          
          <Typography
            variant="body1"
            sx={{
              textAlign: "center",
              mb: 4,
              lineHeight: 1.6,
              color: "#333",
              fontSize: { xs: "0.95rem", sm: "1.05rem" },
              fontWeight: "500",
              fontFamily: "'Source Sans Pro', sans-serif",
            }}
          >
            Seed funding came from an <Box component="span" sx={{ fontWeight: "bold" }}>Eberly College Public Service Award</Box>. Since 2016, other funders have included the Benedum Foundation, the Sisters Health Foundation, The Parkersburg Area Community Foundation, the Bernard McDonough Foundation and Mazon.
          </Typography>

          {/* Funding Partner Slider - Improved Layout */}
          {/* Funding Partners - Chip Style */}
<Box sx={{ mt: 2, display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 1 }}>
  {fundingPartners.map((partner, index) => (
    <Typography
      key={index}
      variant="body2"
      sx={{
        color: '#002855',
        bgcolor: 'rgba(0,40,85,0.08)',
        fontWeight: 600,
        px: 2,
        py: 0.5,
        borderRadius: 3,
        border: '1px solid rgba(0,40,85,0.2)'
      }}
    >
      {partner.name}
    </Typography>
  ))}
</Box>
        </Box>
        
        {/* What We Do Component */}
        <Box sx={{ width: "100%", mt: 6, px: { xs: 2, sm: 0 } }}>
          <SNACMembers />
        </Box>
        <Box sx={{ width: "100%", mt: 6, px: { xs: 2, sm: 0 } }}>
          <DataPartners />
        </Box>
      </Box>
    </Box>
  );
};

export default About;