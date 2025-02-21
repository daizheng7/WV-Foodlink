import React from "react";
import { Box, Typography, Divider, Paper } from "@mui/material";
import CountyReport from "../components/CountyReport";
import WhatWeDo from "../components/WhatWeDo";
import DataTable from "../components/DataTable";
import SNAPwv from "../components/SNAPwv";
import RankingCounties from "../components/RankingCounties";

const County = () => {
  return (
    <Box
      sx={{
        padding: 4,
        backgroundColor: "#f7f9fc", // Neutral light background for better readability
        minHeight: "100vh",
      }}
    >
      <Typography
        variant="h2"
        gutterBottom
        align="center"
        sx={{ fontWeight: "bold", color: "#354f5b", mb: 4 }}
      >
        County Dashboard
      </Typography>

      <Paper
        sx={{
          padding: 3,
          marginBottom: 4,
          borderRadius: 2,
          boxShadow: 3,
          backgroundColor: "#ffffff", // White background for contrast
        }}
      >
        <Typography
          variant="h5"
          sx={{
            fontWeight: "bold",
            mb: 2,
            color: "#354f5b", // Consistent heading color
          }}
        >
          SNAP Overview
        </Typography>
        <Divider sx={{ mb: 2, borderColor: "#c84c23" }} />
        <SNAPwv />
      </Paper>

      <Paper
        sx={{
          padding: 3,
          marginBottom: 4,
          borderRadius: 2,
          boxShadow: 3,
          backgroundColor: "#ffffff", // White background for contrast
        }}
      >
        <Typography
          variant="h5"
          sx={{
            fontWeight: "bold",
            mb: 2,
            color: "#354f5b", // Consistent heading color
          }}
        >
          County Report
        </Typography>
        <Divider sx={{ mb: 2, borderColor: "#c84c23" }} />
        <CountyReport />
      </Paper>

      <Paper
        sx={{
          padding: 3,
          marginBottom: 4,
          borderRadius: 2,
          boxShadow: 3,
          backgroundColor: "#ffffff", // White background for contrast
        }}
      >
        <Typography
          variant="h5"
          sx={{
            fontWeight: "bold",
            mb: 2,
            color: "#354f5b", // Consistent heading color
          }}
        >
          Data Table
        </Typography>
        <Divider sx={{ mb: 2, borderColor: "#c84c23" }} />
        <DataTable />
      </Paper>
      <Paper
        sx={{
          padding: 3,
          marginBottom: 4,
          borderRadius: 2,
          boxShadow: 3,
          backgroundColor: "#ffffff", // White background for contrast
        }}
      >
        <Typography
          variant="h5"
          sx={{
            fontWeight: "bold",
            mb: 2,
            color: "#354f5b", // Consistent heading color
          }}
        >
          2022-2023 Reduction in SNAP (funding and participation)
        </Typography>
        <Divider sx={{ mb: 2, borderColor: "#c84c23" }} />
        <RankingCounties />
      </Paper>
      <Paper
        sx={{
          padding: 3,
          marginBottom: 4,
          borderRadius: 2,
          boxShadow: 3,
          backgroundColor: "#ffffff", // White background for contrast
        }}
      >
        <Typography
          variant="h5"
          sx={{
            fontWeight: "bold",
            mb: 2,
            color: "#354f5b", // Consistent heading color
          }}
        >
          What We Do
        </Typography>
        <Divider sx={{ mb: 2, borderColor: "#c84c23" }} />
        <WhatWeDo />
      </Paper>
    </Box>
  );
};

export default County;
