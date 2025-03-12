import React, { useEffect, useRef, useState } from "react";
import esriConfig from "@arcgis/core/config";
import Map from "@arcgis/core/Map";
import MapView from "@arcgis/core/views/MapView";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import {
  Box,
  Typography,
  Grid,
  Paper,
  Avatar,
  Divider,
  TableContainer,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  useTheme,
  alpha,
  Container,
  Chip,
} from "@mui/material";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import StorefrontIcon from "@mui/icons-material/Storefront";
import HomeRepairServiceIcon from "@mui/icons-material/HomeRepairService";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import ElderlyIcon from "@mui/icons-material/Elderly";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";
import WorkIcon from "@mui/icons-material/Work";
import BackpackIcon from "@mui/icons-material/Backpack";
import FoodBankIcon from "@mui/icons-material/FoodBank";
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import MapIcon from '@mui/icons-material/Map';
import { ResponsiveBar } from "@nivo/bar";

const layersConfig = [
  {
    id: "6cabc6993a8f44f9aadd1d884cf9cf84",
    title: "DHHR Offices",
    icon: <LocalHospitalIcon sx={{ fontSize: 48 }} />,
    color: "#e57373", // Red
  },
  {
    id: "37ec841dae7e46278d111f26a98b83cb",
    title: "WIC Offices",
    icon: <StorefrontIcon sx={{ fontSize: 48 }} />,
    color: "#64b5f6", // Blue
  },
  {
    id: "fe5b84fd9977470ea0a56be091175356",
    title: "Family Resource Network Offices",
    icon: <HomeRepairServiceIcon sx={{ fontSize: 48 }} />,
    color: "#81c784", // Green
  },
  {
    id: "37fdc5c991f2443e9e30afc80745d00e",
    title: "Family Support Centers",
    icon: <RestaurantIcon sx={{ fontSize: 48 }} />,
    color: "#ffb74d", // Orange
  },
  {
    id: "fdedf6d54b1c4bc9928af7fd3ec520c8",
    title: "Senior Services",
    icon: <ElderlyIcon sx={{ fontSize: 48 }} />,
    color: "#9575cd", // Purple
  },
  {
    id: "a6ff9a5145eb47f6aadc08170fc53bd5",
    title: "Food Resources",
    icon: <FastfoodIcon sx={{ fontSize: 48 }} />,
    color: "#4db6ac", // Teal
  },
  {
    id: "d16bf58fe37747849a8536c7870c8d80",
    title: "Charitable Food Programs",
    icon: <VolunteerActivismIcon sx={{ fontSize: 48 }} />,
    color: "#f06292", // Pink
  },
  {
    id: "82a68c3787dc4efaacdf98e00328ebed",
    title: "Congregate Meal Program",
    icon: <WorkIcon sx={{ fontSize: 48 }} />,
    color: "#ba68c8", // Light Purple
  },
  {
    id: "bf72aea00c1445cca1356cdcee16aa8a",
    title: "Backpack Program",
    icon: <BackpackIcon sx={{ fontSize: 48 }} />,
    color: "#4fc3f7", // Light Blue
  },
  {
    id: "b93e8c7152204bfeac14dc9964bb37df",
    title: "Food Pantry",
    icon: <FoodBankIcon sx={{ fontSize: 48 }} />,
    color: "#aed581", // Light Green
  },
];

const CountyReport = () => {
  const mapDiv = useRef(null);
  const [view, setView] = useState(null);
  const [selectedCounty, setSelectedCounty] = useState(null);
  const [layerData, setLayerData] = useState({});
  const [layerCounts, setLayerCounts] = useState([]);

  const theme = useTheme();

  useEffect(() => {
    esriConfig.apiKey = process.env.REACT_APP_ARCGIS_API_KEY;

    const map = new Map({
      basemap: "arcgis-light-gray",
    });

    const mapView = new MapView({
      container: mapDiv.current,
      map: map,
      center: [-79, 39],
      zoom: 6,
    });

    const countyLayer = new FeatureLayer({
      portalItem: { id: "bbc434ff13854e76a9a5acc29bc1e025" },
      renderer: {
        type: "simple",
        symbol: {
          type: "simple-fill",
          color: [0, 0, 0, 0], // Transparent fill
          outline: {
            color: "black",
            width: 1, // Thick black border
          },
        },
      },
    });

    map.add(countyLayer);

    mapView.when(() => {
      setView(mapView);

      mapView.on("click", async (event) => {
        const response = await mapView.hitTest(event);
        const results = response.results.filter(
          (result) => result.graphic && result.graphic.layer === countyLayer
        );

        if (results.length > 0) {
          const selectedCounty = results[0].graphic;
          const countyGeometry = selectedCounty.geometry;

          mapView.goTo(
            { target: countyGeometry, zoom: 10 },
            { duration: 2000, easing: "ease-in-out" }
          );

          const counts = await Promise.all(
            layersConfig.map(async (layer) => {
              const queryLayer = new FeatureLayer({
                portalItem: { id: layer.id },
              });
              const query = queryLayer.createQuery();
              query.geometry = countyGeometry;
              query.spatialRelationship = "intersects";
              query.returnGeometry = false;

              const count = await queryLayer.queryFeatureCount(query);
              return {
                title: layer.title,
                count,
                icon: layer.icon,
                color: layer.color,
              };
            })
          );

          const layerQueries = layersConfig.map(async (layer) => {
            const queryLayer = new FeatureLayer({
              portalItem: { id: layer.id },
            });
            const query = queryLayer.createQuery();
            query.geometry = countyGeometry;
            query.spatialRelationship = "intersects";
            query.returnGeometry = false;
            query.outFields = ["*"];

            const results = await queryLayer.queryFeatures(query);
            return {
              id: layer.id,
              features: results.features.map((feature) => feature.attributes),
            };
          });

          const allLayerData = await Promise.all(layerQueries);
          const layerDataMap = allLayerData.reduce((acc, { id, features }) => {
            const layerInfo = layersConfig.find((layer) => layer.id === id);
            acc[layerInfo.title] = features;
            return acc;
          }, {});

          setSelectedCounty({ name: selectedCounty.attributes.County_Nam || "Unknown" });
          setLayerCounts(counts);
          setLayerData(layerDataMap);
        }
      });
    });

    return () => {
      if (mapView) {
        mapView.map.removeAll();
        mapView.destroy();
      }
    };
  }, []);

  const renderFoodResourcesChart = (features) => {
    const groupedData = features.reduce((acc, feature) => {
      const category = feature.Retail_Category;
      if (!acc[category]) {
        acc[category] = { category, count: 0 };
      }
      acc[category].count += 1;
      return acc;
    }, {});

    const chartData = Object.values(groupedData);

    return (
      <Box sx={{ marginTop: 4 }}>
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: theme.palette.primary }}>
          Food Resources by Retail Category
        </Typography>
        <Box sx={{ height: 300, borderRadius: 2, overflow: 'hidden', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
          <ResponsiveBar
            data={chartData}
            keys={["count"]}
            indexBy="category"
            margin={{ top: 20, right: 30, bottom: 50, left: 60 }}
            padding={0.3}
            valueScale={{ type: "linear" }}
            indexScale={{ type: "band", round: true }}
            colors={{ scheme: "nivo" }}
            borderRadius={4}
            borderWidth={1}
            borderColor={{ from: "color", modifiers: [["darker", 0.5]] }}
            axisTop={null}
            axisRight={null}
            axisBottom={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: -45,
              legend: "Retail Category",
              legendPosition: "middle",
              legendOffset: 40,
            }}
            axisLeft={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: "Count",
              legendPosition: "middle",
              legendOffset: -40,
            }}
            labelSkipWidth={12}
            labelSkipHeight={12}
            labelTextColor={{ from: "color", modifiers: [["darker", 1.6]] }}
            animate={true}
            motionStiffness={90}
            motionDamping={15}
          />
        </Box>
      </Box>
    );
  };

  const renderLayerSummary = () => (
    <Grid container spacing={2}>
      {layerCounts.map(({ title, count, icon, color }) => (
        <Grid item xs={12} sm={6} md={4} key={title}>
          <Paper
            sx={{
              padding: 2,
              display: "flex",
              alignItems: "center",
              borderRadius: 2,
              boxShadow: '0 4px 14px rgba(0,0,0,0.08)',
              background: `linear-gradient(135deg, ${alpha(color || theme.palette.primary.main, 0.08)} 0%, ${alpha(color || theme.palette.primary.main, 0.02)} 100%)`,
              border: '1px solid',
              borderColor: alpha(color || theme.palette.primary.main, 0.2),
              transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
              '&:hover': {
                transform: 'translateY(-3px)',
                boxShadow: '0 8px 20px rgba(0,0,0,0.12)',
              },
            }}
            elevation={0}
          >
            <Avatar 
              sx={{ 
                backgroundColor: color || theme.palette.primary.main, 
                marginRight: 2,
                width: 56,
                height: 56,
                boxShadow: `0 4px 10px ${alpha(color || theme.palette.primary.main, 0.4)}`,
              }}
            >
              {icon}
            </Avatar>
            <Box>
              <Typography 
                variant="subtitle1" 
                sx={{ 
                  fontWeight: 500, 
                  color: 'text.secondary',
                  fontSize: '0.85rem',
                }}
              >
                {title}
              </Typography>
              <Typography 
                variant="h4" 
                sx={{ 
                  fontWeight: 700,
                  color: color || theme.palette.primary.main,
                }}
              >
                {count}
              </Typography>
            </Box>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );

  return (
    <Box sx={{ padding: { xs: 2, md: 4 } }}>
      <Paper 
        elevation={0} 
        sx={{ 
          padding: 3, 
          marginBottom: 4, 
          borderRadius: 3,
          boxShadow: '0 6px 20px rgba(0,0,0,0.07)',
          background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.05)} 0%, ${alpha(theme.palette.background.default, 0.8)} 100%)`,
          border: '1px solid',
          borderColor: alpha(theme.palette.primary.main, 0.12),
        }}
      >
        <Box 
          sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            flexDirection: { xs: 'column', sm: 'row' },
            gap: 2,
            mb: 3,
          }}
        >
          <Avatar 
            sx={{ 
              backgroundColor: alpha(theme.palette.primary.main, 0.1), 
              width: 64,
              height: 64,
              color: theme.palette.primary.main,
            }}
          >
            <MapIcon sx={{ fontSize: 36 }} />
          </Avatar>
          <Typography
            variant="h4"
            align="center"
            sx={{
              fontWeight: 600,
              color: theme.palette.primary,
              letterSpacing: '-0.5px',
            }}
          >
            Interactive County Report
          </Typography>
        </Box>
        
        <Typography 
          variant="body1" 
          align="center" 
          gutterBottom
          sx={{ 
            color: theme.palette.text.secondary,
            maxWidth: '700px',
            mx: 'auto',
            mb: 4,
          }}
        >
          Select a county on the map below to view detailed resource information and statistics.
        </Typography>
        
        {selectedCounty && (
          <Chip 
            label={`Viewing: ${selectedCounty.name} County`} 
            color="primary" 
            variant="outlined"
            sx={{ 
              fontSize: '1rem', 
              py: 2.5, 
              px: 2, 
              borderRadius: 5,
              fontWeight: 600,
              marginBottom: 3,
              boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
            }} 
          />
        )}
      </Paper>

      <Box
        sx={{
          position: "relative",
          width: "100%",
          height: "70vh",
          marginBottom: 4,
          border: `1px solid ${theme.palette.divider}`,
          borderRadius: 3,
          overflow: "hidden",
          boxShadow: '0 6px 18px rgba(0,0,0,0.1)',
        }}
      >
        <div ref={mapDiv} style={{ width: "100%", height: "100%" }}></div>
      </Box>

      {selectedCounty && (
        <Container maxWidth="xl" sx={{ mt: 6, mb: 8 }}>
          <Box sx={{ marginBottom: 5 }}>
            <Typography 
              variant="h4" 
              gutterBottom 
              fontWeight="600" 
              color="#000000"
              sx={{ 
                mb: 3,
                position: 'relative',
                display: 'inline-block',
                '&:after': {
                  content: '""',
                  position: 'absolute',
                  bottom: '-8px',
                  left: 0,
                  width: '60px',
                  height: '4px',
                  backgroundColor: theme.palette.primary,
                  borderRadius: '2px',
                }
              }}
            >
              Resource Summary
            </Typography>
            <Paper 
              elevation={0} 
              sx={{ 
                padding: 3, 
                borderRadius: 3, 
                background: alpha(theme.palette.background.paper, 0.8),
                marginBottom: 4,
                boxShadow: '0 6px 20px rgba(0,0,0,0.05)',
                border: '1px solid',
                borderColor: theme.palette.divider,
              }}
            >
              {renderLayerSummary()}
            </Paper>
          </Box>

          <Grid container spacing={3}>
            {Object.entries(layerData).map(([title, features]) => {
              const layerConfig = layersConfig.find((layer) => layer.title === title);
              const layerColor = layerConfig?.color || theme.palette.primary.main;
              
              return (
                <Grid item xs={12} key={title}>
                  <Paper
                    sx={{
                      padding: 0,
                      borderRadius: 3,
                      boxShadow: '0 6px 20px rgba(0, 0, 0, 0.05)',
                      marginBottom: 3,
                      transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.08)',
                      },
                      overflow: 'hidden',
                      border: '1px solid',
                      borderColor: alpha(layerColor, 0.2),
                    }}
                    elevation={0}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        padding: 3,
                        background: `linear-gradient(135deg, ${alpha(layerColor, 0.12)} 0%, ${alpha(layerColor, 0.03)} 100%)`,
                        borderBottom: '1px solid',
                        borderColor: alpha(layerColor, 0.15),
                      }}
                    >
                      <Avatar
                        sx={{ 
                          marginRight: 2, 
                          backgroundColor: layerColor,
                          width: 56,
                          height: 56,
                          boxShadow: `0 4px 12px ${alpha(layerColor, 0.4)}`,
                        }}
                      >
                        {layerConfig?.icon}
                      </Avatar>
                      <Typography
                        variant="h5"
                        sx={{ 
                          fontWeight: 600, 
                          flexGrow: 1,
                          color: theme.palette.text.primary,
                        }}
                      >
                        {title}
                      </Typography>
                      <Chip 
                        label={`${features?.length || 0} items`} 
                        variant="outlined"
                        sx={{ 
                          borderColor: alpha(layerColor, 0.4),
                          color: layerColor,
                          fontWeight: 600,
                        }} 
                      />
                    </Box>
                    
                    <Box sx={{ padding: 3 }}>
                      {features && features.length > 0 ? (
                        <>
                          <TableContainer 
                            sx={{ 
                              maxHeight: 400, 
                              overflowY: 'auto', 
                              marginBottom: 2,
                              borderRadius: 2,
                              border: '1px solid',
                              borderColor: alpha(theme.palette.divider, 0.8),
                            }}
                          >
                            <Table size="small" sx={{ tableLayout: "fixed", width: "100%" }}>
                              <TableHead>
                                <TableRow>
                                  {Object.keys(features[0]).filter(key => 
                                    // Filter out some common internal fields that make tables messy
                                    !key.startsWith("OBJECTID") && 
                                    !key.includes("GlobalID") && 
                                    !key.includes("Shape") &&
                                    !key.includes("__") &&
                                    key !== "FID"
                                  ).map((key) => (
                                    <TableCell
                                      key={key}
                                      sx={{ 
                                        fontWeight: 600,
                                        color: theme.palette.primary,
                                        backgroundColor: theme.palette.background.paper,
                                        position: 'sticky',
                                        top: 0,
                                        zIndex: 1,
                                        padding: '10px 8px',
                                        fontSize: '0.75rem',
                                        whiteSpace: 'nowrap',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        borderBottom: '2px solid',
                                        borderColor: alpha(layerColor, 0.6),
                                        maxWidth: '150px',
                                      }}
                                    >
                                      {key.replace(/_/g, ' ')}
                                    </TableCell>
                                  ))}
                                </TableRow>
                              </TableHead>
                              <TableBody>
                                {features.map((feature, index) => (
                                  <TableRow 
                                    key={index}
                                    sx={{
                                      '&:nth-of-type(odd)': {
                                        backgroundColor: alpha(theme.palette.background.default, 0.5),
                                      },
                                      '&:hover': {
                                        backgroundColor: alpha(layerColor, 0.08),
                                      },
                                      transition: 'background-color 0.2s'
                                    }}
                                  >
                                    {Object.entries(feature)
                                      .filter(([key]) => 
                                        // Filter out the same internal fields from the row data
                                        !key.startsWith("OBJECTID") && 
                                        !key.includes("GlobalID") && 
                                        !key.includes("Shape") &&
                                        !key.includes("__") &&
                                        key !== "FID"
                                      )
                                      .map(([key, value]) => (
                                        <TableCell
                                          key={key}
                                          sx={{
                                            padding: '8px',
                                            fontSize: '0.75rem',
                                            borderBottom: '1px solid',
                                            borderColor: alpha(theme.palette.divider, 0.7),
                                            whiteSpace: 'nowrap',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            maxWidth: '150px',
                                          }}
                                          title={value ? String(value) : ""}
                                        >
                                          {value === null ? "—" : String(value)}
                                        </TableCell>
                                      )
                                    )}
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
                          </TableContainer>
                          
                          {title === "Food Resources" && (
                            <Box 
                              sx={{ 
                                mt: 4,
                                pt: 3,
                                borderTop: '1px solid',
                                borderColor: theme.palette.divider,
                              }}
                            >
                              {renderFoodResourcesChart(features)}
                            </Box>
                          )}
                        </>
                      ) : (
                        <Box 
                          sx={{ 
                            display: 'flex', 
                            alignItems: 'center', 
                            justifyContent: 'center',
                            flexDirection: 'column',
                            padding: 6,
                            backgroundColor: alpha(theme.palette.background.default, 0.5),
                            borderRadius: 2,
                          }}
                        >
                          <InfoOutlinedIcon sx={{ fontSize: 60, color: alpha(layerColor, 0.6), mb: 2 }} />
                          <Typography
                            variant="body1"
                            sx={{
                              color: theme.palette.text.secondary,
                              textAlign: 'center',
                              fontWeight: 500,
                            }}
                          >
                            No data available for this resource category.
                          </Typography>
                        </Box>
                      )}
                    </Box>
                  </Paper>
                </Grid>
              );
            })}
          </Grid>
        </Container>
      )}
    </Box>
  );
};

export default CountyReport;