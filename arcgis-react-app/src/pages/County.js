import React from "react";
import { Box, Typography, Divider, Paper, useTheme, useMediaQuery } from "@mui/material";
import CountyReport from "../components/CountyReport";
import WhatWeDo from "../components/WhatWeDo";
import DataTable from "../components/DataTable";
import SNAPwv from "../components/SNAPwv";
import RankingCounties from "../components/RankingCounties";

const County = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));

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
        backgroundColor: "#f7f9fc",
        minHeight: "100vh",
      }}
    >
      {/* Page Title */}
      <Typography
        variant="h1"
        component="h1"
        align="center"
        sx={{
          color: "#000000",
          fontSize: isMobile ? "2.2rem" : isTablet ? "2.7rem" : "3.2rem",
          lineHeight: 1.2,
          fontWeight: 700,
          mb: getResponsiveSpacing(3, 4, 5),
        }}
      >
        County Dashboard
      </Typography>

      {/* SNAP Overview Section */}
      <Paper
        sx={{
          padding: getResponsiveSpacing(2, 2.5, 3),
          marginBottom: getResponsiveSpacing(2, 3, 4),
          borderRadius: "8px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
          backgroundColor: "#ffffff",
        }}
      >
        <Typography
          variant="h5"
          sx={{
            fontWeight: "bold",
            mb: 2,
            color: "#000000",
          }}
        >
          SNAP Overview
        </Typography>
        <Divider sx={{ mb: 2, borderColor: "#000000" }} />
        <SNAPwv />
      </Paper>

      {/* County Report Section */}
      <Paper
        sx={{
          padding: getResponsiveSpacing(2, 2.5, 3),
          marginBottom: getResponsiveSpacing(2, 3, 4),
          borderRadius: "8px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
          backgroundColor: "#ffffff",
        }}
      >
        <Typography
          variant="h5"
          sx={{
            fontWeight: "bold",
            mb: 2,
            color: "#000000",
          }}
        >
          County Report
        </Typography>
        <Divider sx={{ mb: 2, borderColor: "#000000" }} />
        <CountyReport />
      </Paper>

      {/* Data Table Section */}
      <Paper
        sx={{
          padding: getResponsiveSpacing(2, 2.5, 3),
          marginBottom: getResponsiveSpacing(2, 3, 4),
          borderRadius: "8px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
          backgroundColor: "#ffffff",
        }}
      >
        <Typography
          variant="h5"
          sx={{
            fontWeight: "bold",
            mb: 2,
            color: "#000000",
          }}
        >
          Data Table
        </Typography>
        <Divider sx={{ mb: 2, borderColor: "#000000" }} />
        <DataTable />
      </Paper>

      {/* SNAP Reduction Section */}
      <Paper
        sx={{
          padding: getResponsiveSpacing(2, 2.5, 3),
          marginBottom: getResponsiveSpacing(2, 3, 4),
          borderRadius: "8px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
          backgroundColor: "#ffffff",
        }}
      >
        <Typography
          variant="h5"
          sx={{
            fontWeight: "bold",
            mb: 2,
            color: "#000000",
          }}
        >
          2022-2023 Reduction in SNAP (funding and participation)
        </Typography>
        <Divider sx={{ mb: 2, borderColor: "#000000" }} />
        <RankingCounties />
      </Paper>

      {/* What We Do Section */}
      <Paper
        sx={{
          padding: getResponsiveSpacing(2, 2.5, 3),
          marginBottom: getResponsiveSpacing(2, 3, 4),
          borderRadius: "8px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
          backgroundColor: "#ffffff",
        }}
      >
        <Typography
          variant="h5"
          sx={{
            fontWeight: "bold",
            mb: 2,
            color: "#000000",
          }}
        >
          What We Do
        </Typography>
        <Divider sx={{ mb: 2, borderColor: "#000000" }} />
        <WhatWeDo />
      </Paper>
    </Box>
  );
};

export default County;