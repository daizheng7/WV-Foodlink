import React from "react";
import { Box, Typography, Divider, Paper, useTheme, useMediaQuery, Button } from "@mui/material";
import CountyReport from "../components/CountyReport";
import WhatWeDo from "../components/WhatWeDo";
import DataTable from "../components/DataTable";
import SNAPwv from "../components/SNAPwv";
import RankingCounties from "../components/RankingCounties";
import HistoryIcon from '@mui/icons-material/History';

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
      <Box
  sx={{
    mt: 6,
    mb: 4,
    p: 3,
    backgroundColor: 'background.paper',
    borderRadius: 2,
    boxShadow: 3,
    textAlign: 'center',
  }}
>
  <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 'bold' }}>
    <HistoryIcon sx={{ verticalAlign: 'middle', mr: 1 }} />
    Discover Historical County Reports
  </Typography>

  <Typography variant="body1" sx={{ mb: 3 }}>
    Explore detailed profiles and data reports for counties across West Virginia.
  </Typography>

  <Button
    variant="contained"
    
    size="large"
    href="https://wvfoodlink-wvu.hub.arcgis.com/pages/County%20Profiles"
    target="_blank"
    rel="noopener"
    sx={{ px: 4, py: 1.5, fontSize: '1.1rem' }}
  >
    View County Profiles
  </Button>
</Box>
      
    </Box>
  );
};

export default County;