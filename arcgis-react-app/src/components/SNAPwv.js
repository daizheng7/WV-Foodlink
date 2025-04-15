import React, { useState, useEffect } from "react";
import { ResponsiveLine } from "@nivo/line";
import PeopleIcon from "@mui/icons-material/People";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import { Box, Typography, Grid, Paper, CircularProgress, useTheme, useMediaQuery } from "@mui/material";

const SNAPwv = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));
  
  const [data, setData] = useState([]);
  const [summaryStats, setSummaryStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [comparison, setComparison] = useState(null);

  const FEATURE_SERVICE_URL =
    "https://services1.arcgis.com/cTNi34MxOdcfum3A/arcgis/rest/services/SNAP_WV_FY15_Jan24/FeatureServer/0/query";

  // Function to determine responsive spacing
  const getResponsiveSpacing = (mobileSm, tabletMd, desktopLg) => {
    if (isMobile) return mobileSm;
    if (isTablet) return tabletMd;
    return desktopLg;
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `${FEATURE_SERVICE_URL}?where=1=1&outFields=County,SNAP_All_Households_Public_Assi,SNAP_All_Total_Actual_PA___Non_,Month_Year&f=json`
        );
        const result = await response.json();

        if (result.error) {
          throw new Error(result.error.message);
        }

        const features = result.features.map((feature) => feature.attributes);
        const sortedFeatures = features.sort(
          (a, b) => new Date(a.Month_Year) - new Date(b.Month_Year)
        );

        setData(sortedFeatures);
        calculateSummaryStats(sortedFeatures);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const calculateSummaryStats = (features) => {
    const aggregated = features.reduce((acc, item) => {
      const year = new Date(item.Month_Year).getFullYear();
      if (!acc[year]) {
        acc[year] = {
          totalParticipation: 0,
          totalIssuance: 0,
        };
      }
      acc[year].totalParticipation += item.SNAP_All_Households_Public_Assi || 0;
      acc[year].totalIssuance += item.SNAP_All_Total_Actual_PA___Non_ || 0;
      return acc;
    }, {});

    const years = Object.keys(aggregated).sort((a, b) => a - b);
    const trends = years.map((year) => ({
      year: parseInt(year, 10),
      participation: aggregated[year].totalParticipation,
      issuance: aggregated[year].totalIssuance,
    }));

    const totalReductionParticipation =
      trends[0]?.participation - trends[trends.length - 1]?.participation || 0;
    const totalReductionIssuance =
      trends[0]?.issuance - trends[trends.length - 1]?.issuance || 0;

    const data2022 = trends.find((t) => t.year === 2022) || {};
    const data2023 = trends.find((t) => t.year === 2023) || {};

    setSummaryStats({
      trends,
      totalReductionParticipation,
      totalReductionIssuance,
    });

    setComparison({
      participationChange:
        data2023.participation && data2022.participation
          ? data2023.participation - data2022.participation
          : "Data not available",
      issuanceChange:
        data2023.issuance && data2022.issuance
          ? data2023.issuance - data2022.issuance
          : "Data not available",
    });
  };

  const prepareParticipationData = () => {
    if (!summaryStats || !summaryStats.trends) return [];
    return [
      {
        id: "Public Assistance Participation",
        data: summaryStats.trends.map((t) => ({
          x: t.year,
          y: t.participation,
        })),
      },
    ];
  };

  const prepareIssuanceData = () => {
    if (!summaryStats || !summaryStats.trends) return [];
    return [
      {
        id: "Issuance (USD)",
        data: summaryStats.trends.map((t) => ({
          x: t.year,
          y: t.issuance,
        })),
      },
    ];
  };

  return (
    <Box sx={{ width: "100%", boxSizing: "border-box" }}>
      <Typography
        variant="h4"
        component="h2"
        align="center"
        sx={{
          mb: 2,
          color: "#002855",
          fontSize: isMobile ? "1.5rem" : "2rem",
          fontWeight: 600
        }}
      >
        SNAP Trends in West Virginia
      </Typography>
      
      <Typography
        variant="body1"
        align="center"
        sx={{
          mb: 4,
          fontSize: isMobile ? "0.9rem" : "1rem",
          color: "#555",
          px: getResponsiveSpacing(1, 2, 3)
        }}
      >
        Explore how public assistance participation and issuance have evolved in
        West Virginia, especially after the COVID-19 pandemic.
      </Typography>

      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
          <CircularProgress color="primary" />
        </Box>
      ) : error ? (
        <Typography color="error" align="center" sx={{ my: 3 }}>
          Error loading data: {error}
        </Typography>
      ) : (
        <>
          {summaryStats && comparison && (
            <>
              {/* Big Boxes */}
              <Grid container spacing={getResponsiveSpacing(2, 3, 4)} sx={{ mb: 4 }}>
                <Grid item xs={12} md={6}>
                  <Paper
                    elevation={2}
                    sx={{
                      borderRadius: "8px",
                      p: getResponsiveSpacing(2, 2.5, 3),
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                    }}
                  >
                    <PeopleIcon
                      sx={{
                        fontSize: isMobile ? "40px" : "50px",
                        color: "#002855",
                        mb: 1,
                      }}
                    />
                    <Typography
                      variant="h5"
                      component="h3"
                      sx={{
                        color: "#002855",
                        fontSize: isMobile ? "1.3rem" : "1.5rem",
                        fontWeight: 600,
                      }}
                    >
                      2022 to 2023
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{
                        fontSize: isMobile ? "0.9rem" : "1.1rem",
                        color: "#555",
                        mt: 1,
                      }}
                    >
                      Households Lost Support
                    </Typography>
                    <Typography
                      variant="h6"
                      component="p"
                      sx={{
                        fontSize: isMobile ? "1.2rem" : "1.5rem",
                        fontWeight: "bold",
                        color: "#333",
                        mt: 1,
                      }}
                    >
                      {typeof comparison.participationChange === "string"
                        ? comparison.participationChange
                        : `${Math.abs(comparison.participationChange).toLocaleString()} households`}
                    </Typography>
                  </Paper>
                </Grid>

                <Grid item xs={12} md={6}>
                  <Paper
                    elevation={2}
                    sx={{
                      borderRadius: "8px",
                      p: getResponsiveSpacing(2, 2.5, 3),
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                    }}
                  >
                    <AttachMoneyIcon
                      sx={{
                        fontSize: isMobile ? "40px" : "50px",
                        color: "#002855",
                        mb: 1,
                      }}
                    />
                    <Typography
                      variant="h5"
                      component="h3"
                      sx={{
                        color: "#002855",
                        fontSize: isMobile ? "1.3rem" : "1.5rem",
                        fontWeight: 600,
                      }}
                    >
                      2022 to 2023
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{
                        fontSize: isMobile ? "0.9rem" : "1.1rem",
                        color: "#555",
                        mt: 1,
                      }}
                    >
                      Funding Lost
                    </Typography>
                    <Typography
                      variant="h6"
                      component="p"
                      sx={{
                        fontSize: isMobile ? "1.2rem" : "1.5rem",
                        fontWeight: "bold",
                        color: "#333",
                        mt: 1,
                      }}
                    >
                      {typeof comparison.issuanceChange === "string"
                        ? comparison.issuanceChange
                        : `$${Math.abs(comparison.issuanceChange).toLocaleString()}`}
                    </Typography>
                  </Paper>
                </Grid>
              </Grid>

              {/* Charts */}
              <Grid container spacing={getResponsiveSpacing(2, 3, 4)} sx={{ mb: 3 }}>
                <Grid item xs={12} lg={6}>
                  <Paper
                    elevation={2}
                    sx={{
                      
                      borderRadius: "8px",
                      p: getResponsiveSpacing(2, 2.5, 3),
                      boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                      height: "100%",
                    }}
                  >
                    <Typography
                      variant="h5"
                      component="h3"
                      align="center"
                      sx={{
                        mb: 2,
                        
                        fontSize: isMobile ? "1.3rem" : "1.5rem",
                        fontWeight: 600,
                      }}
                    >
                      Public Assistance Participation
                    </Typography>
                    <Box sx={{ 
                      height: isMobile ? "250px" : "400px",
                      width: "100%"
                    }}>
                      <ResponsiveLine
                        data={prepareParticipationData()}
                        margin={{ 
                          top: isMobile ? 30 : 50, 
                          right: isMobile ? 30 : 50, 
                          bottom: isMobile ? 50 : 50, 
                          left: isMobile ? 50 : 60 
                        }}
                        axisBottom={{
                          legend: "Year",
                          legendPosition: "middle",
                          legendOffset: 40,
                          tickRotation: isMobile ? -45 : 0,
                        }}
                        axisLeft={{
                          legend: "Households",
                          legendPosition: "middle",
                          legendOffset: -40,
                          format: value => isMobile ? 
                            value.toLocaleString(undefined, { notation: 'compact', compactDisplay: 'short' }) : 
                            value.toLocaleString()
                        }}
                        pointSize={isMobile ? 6 : 10}
                        pointBorderWidth={2}
                        useMesh={true}
                        colors={["#1976d2"]}
                        theme={{
                          fontSize: isMobile ? 10 : 12,
                          axis: {
                            legend: {
                              text: {
                                fontSize: isMobile ? 10 : 12
                              }
                            }
                          }
                        }}
                      />
                    </Box>
                  </Paper>
                </Grid>

                <Grid item xs={12} lg={6}>
                  <Paper
                    elevation={2}
                    sx={{
                      
                      borderRadius: "8px",
                      p: getResponsiveSpacing(2, 2.5, 3),
                      boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                      height: "100%",
                    }}
                  >
                    <Typography
                      variant="h5"
                      component="h3"
                      align="center"
                      sx={{
                        mb: 2,
                        
                        fontSize: isMobile ? "1.3rem" : "1.5rem",
                        fontWeight: 600,
                      }}
                    >
                      Total Issuance (USD)
                    </Typography>
                    <Box sx={{ 
                      height: isMobile ? "250px" : "400px",
                      width: "100%"
                    }}>
                      <ResponsiveLine
                        data={prepareIssuanceData()}
                        margin={{ 
                          top: isMobile ? 30 : 50, 
                          right: isMobile ? 30 : 50, 
                          bottom: isMobile ? 50 : 50, 
                          left: isMobile ? 50 : 60 
                        }}
                        axisBottom={{
                          legend: "Year",
                          legendPosition: "middle",
                          legendOffset: 40,
                          tickRotation: isMobile ? -45 : 0,
                        }}
                        axisLeft={{
                          legend: "USD",
                          legendPosition: "middle",
                          legendOffset: -40,
                          format: value => isMobile ? 
                            `$${value.toLocaleString(undefined, { notation: 'compact', compactDisplay: 'short' })}` : 
                            `$${value.toLocaleString()}`
                        }}
                        pointSize={isMobile ? 6 : 10}
                        pointBorderWidth={2}
                        useMesh={true}
                        colors={["#ed6c02"]}
                        theme={{
                          fontSize: isMobile ? 10 : 12,
                          axis: {
                            legend: {
                              text: {
                                fontSize: isMobile ? 10 : 12
                              }
                            }
                          }
                        }}
                      />
                    </Box>
                  </Paper>
                </Grid>
              </Grid>

              {/* Why Section */}
              <Paper
                elevation={2}
                sx={{
                 
                  borderRadius: "8px",
                  p: getResponsiveSpacing(2, 2.5, 3),
                  boxShadow: "2 4px 12px rgba(0,0,0,0.05)",
                }}
              >
                <Typography
                  variant="h5"
                  component="h3"
                  sx={{
                    
                    fontSize: isMobile ? "1.3rem" : "1.5rem",
                    fontWeight: 600,
                    mb: 1,
                    mt:2,
                  }}
                >
                  Why the Changes?
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    fontSize: isMobile ? "0.9rem" : "1rem",
                    mt:2,
                    mb: 2,
                  }}
                >
                  The expiration of COVID-19-related SNAP flexibilities in May
                  2023 resulted in stricter eligibility and reporting requirements.
                  Emergency allotments, which provided extra benefits during the
                  pandemic, ended in February 2023, leading to a sharp decline in
                  participation and issuance levels.
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    fontSize: isMobile ? "0.9rem" : "1rem",
                    
                  }}
                >
                  These changes underscore the need for robust support to address
                  food insecurity in West Virginia.
                </Typography>
              </Paper>
            </>
          )}
        </>
      )}
    </Box>
  );
};

export default SNAPwv;