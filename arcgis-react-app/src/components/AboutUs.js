import React from "react";
import { Paper, Typography, Grid, Box } from "@mui/material";

const AboutUs = () => {
  const cardStyles = {
    position: "relative",
    width: "100%",
    height: "250px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    borderRadius: 2,
    overflow: "hidden",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    transition: "transform 0.3s, box-shadow 0.3s",
    "&:hover": {
      transform: "scale(1.05)",
      boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
    },
  };

  const cardImageStyles = {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover",
    opacity: 0.8,
  };

  const cardTextStyles = {
    zIndex: 1,
    textAlign: "center",
    color: "white",
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    padding: "10px",
    borderRadius: "5px",
  };

  return (
    <Paper elevation={3} sx={{ p: 4, mb: 4, bgcolor: "#f9f9f9" }}>
      {/* Section Title */}
      <Typography
        variant="h4"
        gutterBottom
        align="center"
        sx={{ fontWeight: "bold", mb: 3 }}
      >
        About WV Foodlink
      </Typography>

      {/* Text Section */}
      <Grid container spacing={4} alignItems="center">
        <Grid item xs={12} md={6}>
          <Typography variant="body1" sx={{ mb: 2, textAlign: "justify" }}>
            <strong>WV FOODLINK</strong> is a project of the Food Justice Lab
            housed in West Virginia University's Center for Resilient
            Communities. In collaboration with our community partners, we have
            developed a resource hub and learning commons to support a
            people-centered, resilient food network in West Virginia.
          </Typography>
          <Typography variant="body1" sx={{ mb: 2, textAlign: "justify" }}>
            Our work is motivated by a vision that all people must have access
            to safe, nutritious, and culturally appropriate food in sufficient
            quantity and quality to sustain a healthy life with human dignity.
            Today, many West Virginians face critical challenges in meeting
            their basic nutritional needs.
          </Typography>
          <Typography variant="body1" sx={{ textAlign: "justify" }}>
            WV FOODLINK serves as an information center for food charities,
            government programs, social workers, and policymakers.
          </Typography>
        </Grid>

        {/* Static Cards with Images */}
        <Grid item xs={12} md={6}>
          <Grid container spacing={3} justifyContent="center">
            {[
              {
                src: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Sustainable_Development_Goal_01NoPoverty.svg/299px-Sustainable_Development_Goal_01NoPoverty.svg.png",
                title: "No Poverty",
                description: "End poverty in all its forms everywhere.",
              },
              {
                src: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Sustainable_Development_Goal_2.svg/299px-Sustainable_Development_Goal_2.svg.png",
                title: "Zero Hunger",
                description: "Achieve food security and improved nutrition.",
              },
              {
                src: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Sustainable_Development_Goal_3.svg/299px-Sustainable_Development_Goal_3.svg.png",
                title: "Good Health",
                description: "Ensure healthy lives and promote well-being.",
              },
            ].map((goal, index) => (
              <Grid item xs={12} sm={6} key={index}>
                <Box sx={cardStyles}>
                  <img src={goal.src} alt={goal.title} style={cardImageStyles} />
                  <Box sx={cardTextStyles}>
                    <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                      {goal.title}
                    </Typography>
                    <Typography variant="body2">{goal.description}</Typography>
                  </Box>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default AboutUs;
