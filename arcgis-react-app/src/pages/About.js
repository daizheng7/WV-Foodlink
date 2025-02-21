import React, { useState } from "react";
import { Typography, Box, Grid, Button, Paper } from "@mui/material";
import FoodRetailer from "../components/FoodRetailer";
import FoodFinderMap from "../components/FoodFinderMap";
import WhatWeDo from "../components/WhatWeDo"
const timelineEvents = [
  { year: "2013", description: "Seed Funding from WVU Public Service Award" },
  { year: "2014", description: "Funding from Benedum Foundation" },
  { year: "2020", description: "Updated Website Version Released" },
  { year: "2023", description: "Current Version in Development" },
];

const About = () => {
  const [selectedEvent, setSelectedEvent] = useState(timelineEvents[0]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "#ffffff",
        borderRadius: "8px",
        boxShadow: 3,
        mx: "16px",
        mt: "16px",
        mb: "8px",
        padding: 4,
        width: "100%",
      }}
    >
      <Typography
        variant="h3"
        align="center"
        gutterBottom
        sx={{
          fontWeight: "bold",
          color: "#354F5B",
          mb: 4,
          textShadow: "1px 1px 2px rgba(0, 0, 0, 0.2)",
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

      <Box sx={{ display: "flex", justifyContent: "center", mb: 4 }}>
        {timelineEvents.map((event, index) => (
          <Button
            key={index}
            variant={selectedEvent.year === event.year ? "contained" : "outlined"}
            color="primary"
            onClick={() => setSelectedEvent(event)}
            sx={{
              mx: 1,
              textTransform: "none",
              fontWeight: "bold",
              fontSize: "14px",
              padding: "8px 16px",
              borderRadius: "8px",
              transition: "all 0.3s ease",
              '&:hover': {
                backgroundColor: selectedEvent.year === event.year ? "#1565c0" : "#e3f2fd",
              },
            }}
          >
            {event.year}
          </Button>
        ))}
      </Box>

      <Paper
        elevation={3}
        sx={{
          p: 4,
          textAlign: "center",
          mb: 6,
          maxWidth: "600px",
          backgroundColor: "#f9f9f9",
          borderRadius: "8px",
          boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Typography
          variant="h5"
          sx={{ fontWeight: "bold", color: "#354F5B" }}
        >
          {selectedEvent.year}
        </Typography>
        <Typography variant="body1" sx={{ mt: 2, color: "#555" }}>
          {selectedEvent.description}
        </Typography>
      </Paper>

      <Typography
        variant="h5"
        align="center"
        gutterBottom
        sx={{ fontWeight: "bold", color: "#354F5B", mt: 4 }}
      >
        Partners and Support
      </Typography>
      <Typography
        variant="body1"
        sx={{ textAlign: "center", lineHeight: 1.8, color: "#555", maxWidth: "800px" }}
      >
        WV FOODLINK is a product of partnerships with organizations such as
        Facing Hunger Food Bank, Mountaineer Food Bank, WV Food and Farm
        Coalition, WV Center for Budget and Policy, and many others.
      </Typography>

      <Typography
        variant="h5"
        align="center"
        gutterBottom
        sx={{ fontWeight: "bold", color: "#354F5B", mt: 6 }}
      >
        Data-Sharing Partners
      </Typography>
      <Grid container spacing={4} justifyContent="center" sx={{ mt: 2 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Button
            href="#"
            variant="outlined"
            fullWidth
            sx={{
              textTransform: "none",
              fontWeight: "bold",
              color: "#354F5B",
              borderColor: "#354F5B",
              '&:hover': {
                backgroundColor: "#e3f2fd",
                borderColor: "#354F5B",
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
              color: "#354F5B",
              borderColor: "#354F5B",
              '&:hover': {
                backgroundColor: "#e3f2fd",
                borderColor: "#354F5B",
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
              color: "#354F5B",
              borderColor: "#354F5B",
              '&:hover': {
                backgroundColor: "#e3f2fd",
                borderColor: "#354F5B",
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
              color: "#354F5B",
              borderColor: "#354F5B",
              '&:hover': {
                backgroundColor: "#e3f2fd",
                borderColor: "#354F5B",
              },
            }}
          >
            Partner 4 Placeholder
          </Button>
        </Grid>
      </Grid>
      <WhatWeDo />
    </Box>
  );
};

export default About;
