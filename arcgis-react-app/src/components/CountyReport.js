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
  Divider,TableContainer,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  useTheme,
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
import { ResponsiveBar } from "@nivo/bar";

import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

const layersConfig = [
  {
    id: "6cabc6993a8f44f9aadd1d884cf9cf84",
    title: "DHHR Offices",
    icon: <LocalHospitalIcon sx={{ fontSize: 48 }} />,
  },
  {
    id: "37ec841dae7e46278d111f26a98b83cb",
    title: "WIC Offices",
    icon: <StorefrontIcon sx={{ fontSize: 48 }} />,
  },
  {
    id: "fe5b84fd9977470ea0a56be091175356",
    title: "Family Resource Network Offices",
    icon: <HomeRepairServiceIcon sx={{ fontSize: 48 }} />,
  },
  {
    id: "37fdc5c991f2443e9e30afc80745d00e",
    title: "Family Support Centers",
    icon: <RestaurantIcon sx={{ fontSize: 48 }} />,
  },
  {
    id: "fdedf6d54b1c4bc9928af7fd3ec520c8",
    title: "Senior Services",
    icon: <ElderlyIcon sx={{ fontSize: 48 }} />,
  },
  {
    id: "a6ff9a5145eb47f6aadc08170fc53bd5",
    title: "Food Resources",
    icon: <FastfoodIcon sx={{ fontSize: 48 }} />,
  },
  {
    id: "d16bf58fe37747849a8536c7870c8d80",
    title: "Charitable Food Programs",
    icon: <VolunteerActivismIcon sx={{ fontSize: 48 }} />,
  },
  {
    id: "82a68c3787dc4efaacdf98e00328ebed",
    title: "Congregate Meal Program",
    icon: <WorkIcon sx={{ fontSize: 48 }} />,
  },
  {
    id: "bf72aea00c1445cca1356cdcee16aa8a",
    title: "Backpack Program",
    icon: <BackpackIcon sx={{ fontSize: 48 }} />,
  },
  {
    id: "b93e8c7152204bfeac14dc9964bb37df",
    title: "Food Pantry",
    icon: <FoodBankIcon sx={{ fontSize: 48 }} />,
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
            width: 2, // Thick black border
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
        <Typography variant="h6" gutterBottom>
          Food Resources by Retail Category
        </Typography>
        <Box sx={{ height: 300 }}>
          <ResponsiveBar
            data={chartData}
            keys={["count"]}
            indexBy="category"
            margin={{ top: 20, right: 30, bottom: 50, left: 60 }}
            padding={0.3}
            valueScale={{ type: "linear" }}
            indexScale={{ type: "band", round: true }}
            colors={{ scheme: "nivo" }}
            axisTop={null}
            axisRight={null}
            axisBottom={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: "Retail Category",
              legendPosition: "middle",
              legendOffset: 32,
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
            legends={[]}
            animate={true}
          />
        </Box>
      </Box>
    );
  };

  const renderLayerSummary = () => (
    <Grid container spacing={2}>
      {layerCounts.map(({ title, count, icon }) => (
        <Grid item xs={12} sm={6} md={4} key={title}>
          <Paper
            sx={{
              padding: 2,
              display: "flex",
              alignItems: "center",
              borderRadius: 2,
              boxShadow: 3,
            }}
          >
            <Avatar sx={{ backgroundColor: "primary.main", marginRight: 2 }}>
              {icon}
            </Avatar>
            <Box>
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                {title}
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                {count}
              </Typography>
            </Box>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );

  return (
    <Box sx={{ padding: 4 }}>
      <Typography
  variant="h4"
  gutterBottom
  align="center"
  sx={{
    
    mb: 4,
  }}
>
  Select a county on the map to view the report.
</Typography>

      <Box
        sx={{
          position: "relative",
          width: "100%",
          height: "100vh",
          marginBottom: 4,
          border: `1px solid ${theme.palette.divider}`,
          borderRadius: 2,
          overflow: "hidden",
        }}
      >
        <div ref={mapDiv} style={{ width: "100%", height: "100%" }}></div>
      </Box>

      {selectedCounty && (
        <Paper
          sx={{
            padding: 3,
            marginTop: 4,
            borderRadius: 2,
            boxShadow: 4,
          }}
          elevation={3}
        >
          
          

          {/* Import required components and utilities */}
{/* Add these to your imports:
import { 
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, Typography, Box, Grid, Avatar, alpha
} from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'; // Use this instead of NoDataIcon
*/}

<Box sx={{ marginBottom: 3 }}>
  <Typography variant="h4" gutterBottom fontWeight="500" color="primary.dark">
    Summary
  </Typography>
  <Paper 
    elevation={1} 
    sx={{ 
      padding: 3, 
      borderRadius: 3, 
      background: 'linear-gradient(to right, rgba(255,255,255,0.95), rgba(245,247,250,0.95))',
      marginBottom: 4
    }}
  >
    {renderLayerSummary()}
  </Paper>
</Box>

<Grid container spacing={3}>
  {Object.entries(layerData).map(([title, features]) => (
    <Grid item xs={12} key={title}>
      <Paper
        sx={{
          padding: 3,
          borderRadius: 3,
          boxShadow: '0 6px 20px rgba(0, 0, 0, 0.05)',
          marginBottom: 3,
          transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: '0 10px 25px rgba(0, 0, 0, 0.08)',
          },
          overflow: 'hidden'
        }}
        elevation={0}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            marginBottom: 2.5,
            borderBottom: '1px solid',
            borderColor: 'divider',
            paddingBottom: 2
          }}
        >
          <Avatar
            sx={{ 
              marginRight: 2, 
              backgroundColor: 'primary.main',
              width: 48,
              height: 48,
              boxShadow: '0 3px 10px rgba(0, 0, 0, 0.1)'
            }}
          >
            {layersConfig.find((layer) => layer.title === title)?.icon}
          </Avatar>
          <Typography
            variant="h5"
            sx={{ 
              fontWeight: 600, 
              flexGrow: 1,
              color: 'text.primary'
            }}
          >
            {title}
          </Typography>
        </Box>
        
        {features && features.length > 0 ? (
          <>
            <TableContainer sx={{ maxHeight: 400, overflowY: 'auto', marginBottom: 2 }}>
              <Table size="small" sx={{ wordBreak: "break-word" }}>
                <TableHead>
                  <TableRow sx={{ backgroundColor: 'background.paper' }}>
                    {Object.keys(features[0]).map((key) => (
                      <TableCell
                        key={key}
                        sx={{ 
                          fontWeight: 600,
                          color: 'primary.dark',
                          backgroundColor: 'background.paper',
                          position: 'sticky',
                          top: 0,
                          zIndex: 1,
                          padding: '12px'
                        }}
                      >
                        {key}
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
                          backgroundColor: 'rgba(245, 245, 245, 0.2)',
                        },
                        '&:hover': {
                          backgroundColor: 'rgba(227, 242, 253, 0.3)',
                        },
                        transition: 'background-color 0.2s'
                      }}
                    >
                      {Object.entries(feature).map(
                        ([key, value]) => (
                          <TableCell
                            key={key}
                            sx={{
                              padding: '10px 12px',
                              fontSize: '0.9rem',
                              borderBottom: '1px solid',
                              borderColor: 'divider'
                            }}
                          >
                            {value}
                          </TableCell>
                        )
                      )}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            
            {title === "Food Resources" && (
              <Box sx={{ mt: 3, mb: 1 }}>
                <Typography variant="subtitle1" fontWeight={500} color="text.secondary" gutterBottom>
                  Food Resources Distribution
                </Typography>
                <Box sx={{ height: 300, p: 1 }}>
                  {renderFoodResourcesChart(features)}
                </Box>
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
              padding: 4
            }}
          >
            <InfoOutlinedIcon color="action" sx={{ fontSize: 60, opacity: 0.5, mb: 2 }} />
            <Typography
              variant="body1"
              color="text.secondary"
              align="center"
            >
              No data available for this layer.
            </Typography>
          </Box>
        )}
      </Paper>
    </Grid>
  ))}
</Grid>
        </Paper>
      )}

      
    </Box>
  );
};

export default CountyReport;
