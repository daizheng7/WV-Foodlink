import React from "react";
import { Box, Grid, Paper, Typography, Divider } from "@mui/material";
import { ResponsivePie } from "@nivo/pie";
import { ResponsiveLine } from "@nivo/line";

// Static data defined inside the component
const healthyFoodData = [
  { id: "Fresh Food Stores", label: "Fresh Food Stores", value: 1, color: "#4CAF50" },
  { id: "Other Stores", label: "Other Stores", value: 99, color: "#FFC107" },
];

const povertyData = [
  {
    id: "Poverty Rate",
    data: [
      { x: "2010", y: 16 },
      { x: "2012", y: 17 },
      { x: "2014", y: 18 },
      { x: "2016", y: 19 },
      { x: "2018", y: 20 },
      { x: "2020", y: 21 },
      { x: "2022", y: 22 },
    ],
  },
];

const ngoData = [
  { id: "Charities", label: "Charities", value: 50, color: "#9C27B0" },
  { id: "NGOs", label: "NGOs", value: 30, color: "#FFC107" },
  { id: "Community Groups", label: "Community Groups", value: 20, color: "#4CAF50" },
];

const SummaryWV = () => {
  // Fallback for empty or undefined data
  const isHealthyFoodDataValid = Array.isArray(healthyFoodData) && healthyFoodData.length > 0;
  const isPovertyDataValid = Array.isArray(povertyData) && povertyData.length > 0;
  const isNgoDataValid = Array.isArray(ngoData) && ngoData.length > 0;

  return (
    <Paper
      elevation={4}
      sx={{
        p: 4,
        mb: 4,
        borderRadius: 3,
        bgcolor: "#f9f9f9",
        boxShadow: "0 8px 20px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Typography
        variant="h4"
        gutterBottom
        align="center"
        sx={{
          fontWeight: "bold",
          color: "#333",
          mb: 3,
          textTransform: "uppercase",
          letterSpacing: "0.1rem",
        }}
      >
        What is Happening?
      </Typography>
      <Divider sx={{ mb: 4 }} />

      <Grid container spacing={4}>
        {/* Healthy Food */}
        <Grid item xs={12} sm={4}>
          <Typography
            variant="h6"
            gutterBottom
            sx={{
              fontWeight: "bold",
              color: "#4CAF50",
              textTransform: "uppercase",
              textAlign: "center",
            }}
          >
            No Healthy Food
          </Typography>
          <Box sx={{ height: 240, bgcolor: "#ffffff", borderRadius: 3, p: 2 }}>
            {isHealthyFoodDataValid ? (
              <ResponsivePie
                data={healthyFoodData}
                margin={{ top: 20, right: 20, bottom: 40, left: 20 }}
                innerRadius={0.5}
                padAngle={0.7}
                cornerRadius={3}
                colors={{ datum: "data.color" }}
                borderWidth={1}
                borderColor={{ from: "color", modifiers: [["darker", 0.2]] }}
                enableArcLabels={false}
              />
            ) : (
              <Typography variant="body2" align="center" sx={{ mt: 4, color: "#999" }}>
                No data available
              </Typography>
            )}
          </Box>
        </Grid>

        {/* Poverty Over Time */}
        <Grid item xs={12} sm={4}>
          <Typography
            variant="h6"
            gutterBottom
            sx={{
              fontWeight: "bold",
              color: "#2196F3",
              textTransform: "uppercase",
              textAlign: "center",
            }}
          >
            More Poverty Over Time
          </Typography>
          <Box sx={{ height: 240, bgcolor: "#ffffff", borderRadius: 3, p: 2 }}>
            {isPovertyDataValid ? (
              <ResponsiveLine
                data={povertyData}
                margin={{ top: 20, right: 20, bottom: 40, left: 50 }}
                xScale={{ type: "point" }}
                yScale={{ type: "linear", min: "auto", max: "auto", stacked: true, reverse: false }}
                axisBottom={{
                  tickPadding: 5,
                  tickRotation: 0,
                  legend: "Year",
                  legendOffset: 36,
                  legendPosition: "middle",
                }}
                axisLeft={{
                  tickPadding: 5,
                  tickRotation: 0,
                  legend: "Poverty Rate (%)",
                  legendOffset: -40,
                  legendPosition: "middle",
                }}
                colors="#2196F3"
                lineWidth={2}
                pointSize={10}
                pointColor="#2196F3"
                enableGridX={false}
                enableGridY={true}
              />
            ) : (
              <Typography variant="body2" align="center" sx={{ mt: 4, color: "#999" }}>
                No data available
              </Typography>
            )}
          </Box>
        </Grid>

        {/* Charities & NGOs */}
        <Grid item xs={12} sm={4}>
          <Typography
            variant="h6"
            gutterBottom
            sx={{
              fontWeight: "bold",
              color: "#FF9800",
              textTransform: "uppercase",
              textAlign: "center",
            }}
          >
            More Charities & NGOs (check josh)
          </Typography>
          <Box sx={{ height: 240, bgcolor: "#ffffff", borderRadius: 3, p: 2 }}>
            {isNgoDataValid ? (
              <ResponsivePie
                data={ngoData}
                margin={{ top: 20, right: 20, bottom: 40, left: 20 }}
                innerRadius={0.5}
                padAngle={0.7}
                cornerRadius={3}
                colors={{ datum: "data.color" }}
                borderWidth={1}
                borderColor={{ from: "color", modifiers: [["darker", 0.2]] }}
                enableArcLabels={false}
              />
            ) : (
              <Typography variant="body2" align="center" sx={{ mt: 4, color: "#999" }}>
                No data available
              </Typography>
            )}
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default SummaryWV;
