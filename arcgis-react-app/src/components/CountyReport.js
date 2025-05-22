import React, { useEffect, useRef, useState, useCallback } from "react";
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
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import { saveAs } from "file-saver";
import Tooltip from "@mui/material/Tooltip";
import DownloadIcon from "@mui/icons-material/Download";
import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer";
import Graphic from "@arcgis/core/Graphic";
import { List, ListItem, ListItemText } from "@mui/material";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CloseIcon from '@mui/icons-material/Close';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import KeyboardIcon from '@mui/icons-material/Keyboard';
import { darken } from '@mui/material/styles';

const layersConfig = [
  {
    id: "6cabc6993a8f44f9aadd1d884cf9cf84",
    title: "DHHR Offices",
    icon: <LocalHospitalIcon sx={{ fontSize: 48 }} />,
    color: "#002855", // Red
  },
  {
    id: "37ec841dae7e46278d111f26a98b83cb",
    title: "WIC Offices",
    icon: <StorefrontIcon sx={{ fontSize: 48 }} />,
    color: "#1C2B39", // Blue
  },
  {
    id: "fe5b84fd9977470ea0a56be091175356",
    title: "Family Resource Network Offices",
    icon: <HomeRepairServiceIcon sx={{ fontSize: 48 }} />,
    color: "#0062A3", // Green
  },
  {
    id: "37fdc5c991f2443e9e30afc80745d00e",
    title: "Family Support Centers",
    icon: <RestaurantIcon sx={{ fontSize: 48 }} />,
    color: "#554741", // Orange
  },
  {
    id: "fdedf6d54b1c4bc9928af7fd3ec520c8",
    title: "Senior Services",
    icon: <ElderlyIcon sx={{ fontSize: 48 }} />,
    color: "#988E8B", // Purple
  },
  {
    id: "a6ff9a5145eb47f6aadc08170fc53bd5",
    title: "Food Resources",
    icon: <FastfoodIcon sx={{ fontSize: 48 }} />,
    color: "##BEB7B3", // Teal
  },
  {
    id: "d16bf58fe37747849a8536c7870c8d80",
    title: "Charitable Food Programs",
    icon: <VolunteerActivismIcon sx={{ fontSize: 48 }} />,
    color: "#7F6310", // Pink
  },
  {
    id: "82a68c3787dc4efaacdf98e00328ebed",
    title: "Congregate Meal Program",
    icon: <WorkIcon sx={{ fontSize: 48 }} />,
    color: "#B3A169", // Light Purple
  },
  {
    id: "bf72aea00c1445cca1356cdcee16aa8a",
    title: "Backpack Program",
    icon: <BackpackIcon sx={{ fontSize: 48 }} />,
    color: "#F2E6C2", // Light Blue
  },
  {
    id: "b93e8c7152204bfeac14dc9964bb37df",
    title: "Food Pantry",
    icon: <FoodBankIcon sx={{ fontSize: 48 }} />,
    color: "#EAAA00", // Light Green
  },
];



const CountyReport = () => {
  const mapDiv = useRef(null);
  const countyLayerRef = useRef(null);
  const [view, setView] = useState(null);
  const [selectedCounty, setSelectedCounty] = useState(null);
  const [layerData, setLayerData] = useState({});
  const [layerCounts, setLayerCounts] = useState([]);
  const [visibleFeatures, setVisibleFeatures] = useState([]);
const [focusedPoiIndex, setFocusedPoiIndex] = useState(-1);
const [isPoiListVisible, setIsPoiListVisible] = useState(false);

const graphicsLayerRef = useRef(null); // ✅ Declare here

const [countyOptions, setCountyOptions] = useState([]);
const [selectedCountyOption, setSelectedCountyOption] = useState("");

  const theme = useTheme();
const loadCountyData = async (geometry, attributes) => {
  // Clear previous graphics
  if (graphicsLayerRef.current) {
    graphicsLayerRef.current.removeAll();
  }

  // First: get counts
  const counts = await Promise.all(
    layersConfig.map(async (layer) => {
      const queryLayer = new FeatureLayer({ portalItem: { id: layer.id } });
      const query = queryLayer.createQuery();
      query.geometry = geometry;
      query.spatialRelationship = "intersects";
      query.returnGeometry = false;
      return {
        title: layer.title,
        count: await queryLayer.queryFeatureCount(query),
        icon: layer.icon,
        color: layer.color,
      };
    })
  );

  // Second: get full features with geometry and add to map
  const allLayerData = await Promise.all(
  layersConfig.map(async (layer) => {
    const queryLayer = new FeatureLayer({ portalItem: { id: layer.id } });
    const query = queryLayer.createQuery();
    query.geometry = geometry;
    query.spatialRelationship = "intersects";
    query.returnGeometry = true; // Needed for rendering on map
    query.outFields = ["*"];

    const results = await queryLayer.queryFeatures(query);

    // Add each point as a graphic to the map
    results.features.forEach((feature) => {
      const graphic = new Graphic({
        geometry: feature.geometry,
        symbol: {
          type: "simple-marker",
          style: "circle",
          color: layer.color,
          size: 8,
          outline: {
            color: "white",
            width: 1,
          },
        },
        attributes: feature.attributes,
        popupTemplate: {
          title: layer.title,
          content: Object.entries(feature.attributes)
            .map(([k, v]) => `<b>${k}</b>: ${v}`)
            .join("<br>"),
        },
      });
      graphicsLayerRef.current.add(graphic);
    });

    return {
      id: layer.id,
      features: results.features.map((f) => f.attributes),
    };
  })
);


  const layerDataMap = allLayerData.reduce((acc, { id, features }) => {
    const layerInfo = layersConfig.find((layer) => layer.id === id);
    acc[layerInfo.title] = features;
    return acc;
  }, {});
const combinedVisible = allLayerData.flatMap(({ id, features }) =>
  features.map((f, idx) => ({
    attributes: f,
    layerId: id,
    index: idx,
  }))
);


setVisibleFeatures(combinedVisible);
setFocusedPoiIndex(combinedVisible.length > 0 ? 0 : -1);
  setSelectedCounty({ name: attributes.County_Nam || "Unknown" });
  setSelectedCountyOption(attributes.County_Nam || "");
  setLayerCounts(counts);
  setLayerData(layerDataMap);
};

const renderMapLegend = () => (
  <Paper
    elevation={3}
      role="region"
  aria-labelledby="map-legend-title"
    sx={{
      
      position: "absolute",
      bottom: 24,
      right: 24,
      padding: 2,
      borderRadius: 2,
      backgroundColor: theme.palette.background.paper,
      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
      maxWidth: 280,
      zIndex: 999,
    }}
  >
    <Typography id="map-legend-title" variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
      Resource Categories
    </Typography>
    <Grid container spacing={1}>
      {layersConfig.map(({ title, color }, index) => (
        <Grid item xs={12} key={index} sx={{ display: 'flex', alignItems: 'center' }}>
          <Box
            sx={{
              width: 16,
              height: 16,
              borderRadius: "50%",
              backgroundColor: color,
              marginRight: 1,
              border: "1px solid #ccc",
            }}
          />
          <Typography variant="body2" sx={{ fontSize: "0.8rem" }}>
            {title}
          </Typography>
        </Grid>
      ))}
    </Grid>
  </Paper>
);

const scrollToFeature = useCallback((feature) => {
  const graphic = findMatchingGraphic(feature);
  if (graphic && view) {
    view.graphics.removeAll();
    view.graphics.add(new Graphic({
      geometry: graphic.geometry,
      symbol: {
        type: "simple-marker",
        style: "circle",
        color: "#FFA500",
        size: 14,
        outline: { color: "white", width: 2 },
      },
    }));
    view.goTo({ target: graphic.geometry, zoom: view.zoom + 1 }, { duration: 600 }).then(() => {
      view.popup.features = [graphic];
      view.popup.location = graphic.geometry;
      view.popup.visible = true;
    });
  }
}, [view]);


  useEffect(() => {
    esriConfig.apiKey = process.env.REACT_APP_ARCGIS_API_KEY;

    const map = new Map({
      basemap: "arcgis-light-gray",
    });

    const mapView = new MapView({
      container: mapDiv.current,
      map: map,
      center: [-80.39, 39.109],
      zoom: 7,
      
      constraints: {
        snapToZoom: false,
        mouseWheelZoomEnabled: false,
      },
      ui: {
        components: ["zoom", "compass", "attribution"]
      }
    });

    const countyLayer = new FeatureLayer({
      portalItem: { id: "bbc434ff13854e76a9a5acc29bc1e025" },
      renderer: {
        type: "simple",
        symbol: {
          type: "simple-fill",
          color: [0, 40, 85, 0.2], // 🔵 Deep blue with 20% transparency
          outline: {
            color: [0, 40, 85, 1], // Solid deep blue outline
            width: 1.5,
          },
        },
      },
      labelingInfo: [
        {
          symbol: {
            type: "text",
            color: "white", 
            haloColor: "black", 
            haloSize: 1,
            font: {
              size: 12,
              weight: "bold",
            },
          },
          labelExpressionInfo: {
            expression: "$feature.NAME", 
          },
          labelPlacement: "always-horizontal", 
        },
      ],
      outFields: ["*"],
      popupTemplate: {
        title: "{NAME}", 
      },
      effect: "bloom(1.5, 0.5px, 0.2)", 
    });
    countyLayerRef.current = countyLayer;

    
    countyLayer.when(() => {
countyLayer.queryFeatures({
  where: "1=1",
  outFields: ["County_Nam"],
  returnGeometry: false,
}).then((results) => {
  const names = results.features.map(f => f.attributes.County_Nam).filter(Boolean).sort();
  setCountyOptions(names);
});
});


    map.add(countyLayer);
const graphicsLayer = new GraphicsLayer();
map.add(graphicsLayer);

graphicsLayerRef.current = graphicsLayer;

    mapView.when(() => {
      setView(mapView);
      mapView.navigation.mouseWheelZoomEnabled = false;
      mapView.on("click", async (event) => {
  const response = await mapView.hitTest(event);
  const results = response.results.filter(
    (result) => result.graphic && result.graphic.layer === countyLayer
  );

  if (results.length > 0) {
    const selectedCounty = results[0].graphic;
    const geometry = selectedCounty.geometry;
    const attributes = selectedCounty.attributes;

    mapView.goTo({ target: geometry, zoom: 10 }, { duration: 4000 });
    await loadCountyData(geometry, attributes);
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
useEffect(() => {
  const handleKeyDown = (e) => {
    if (!visibleFeatures.length) return;

    switch (e.key) {
      case "k":
      case "K":
        setIsPoiListVisible(true);
        setFocusedPoiIndex(0);
        break;
      case "ArrowRight":
      case "ArrowDown":
        if (isPoiListVisible) {
          e.preventDefault();
          setFocusedPoiIndex((prev) => (prev + 1) % visibleFeatures.length);
        }
        break;
      case "ArrowLeft":
      case "ArrowUp":
        if (isPoiListVisible) {
          e.preventDefault();
          setFocusedPoiIndex((prev) => (prev - 1 + visibleFeatures.length) % visibleFeatures.length);
        }
        break;
      case "Enter":
        if (isPoiListVisible && focusedPoiIndex >= 0 && focusedPoiIndex < visibleFeatures.length) {
          scrollToFeature(visibleFeatures[focusedPoiIndex]);
        }
        break;
      case "Escape":
        setIsPoiListVisible(false);
        setFocusedPoiIndex(-1);
        if (view && view.popup.visible) {
          view.popup.close();
        }
        break;
      default:
        break;
    }
  };
  window.addEventListener("keydown", handleKeyDown);
  return () => window.removeEventListener("keydown", handleKeyDown);
}, [visibleFeatures, isPoiListVisible, focusedPoiIndex, view, scrollToFeature]);



const findMatchingGraphic = (feature) => {
  if (!graphicsLayerRef.current) return null;
  
  // Get all graphics from the graphics layer
  const graphics = graphicsLayerRef.current.graphics.items;
  

  for (const graphic of graphics) {
    if (!graphic.attributes) continue;
    
    // Check if key attributes match
    const featureAttrs = feature.attributes;
    const graphicAttrs = graphic.attributes;
    
    // Look for common identifying fields
    const possibleIdFields = ['OBJECTID', 'FID', 'ID', 'Name', 'ADDRESS'];
    
    for (const field of possibleIdFields) {
      if (featureAttrs[field] && graphicAttrs[field] && featureAttrs[field] === graphicAttrs[field]) {
        return graphic;
      }
    }
    
    // If no ID field matched, try matching on coordinates if available
    if (featureAttrs.x && featureAttrs.y && 
        graphicAttrs.x && graphicAttrs.y && 
        featureAttrs.x === graphicAttrs.x && 
        featureAttrs.y === graphicAttrs.y) {
      return graphic;
    }
  }
  
  return null;
};


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
  const exportToCSV = () => {
  if (!selectedCounty || !layerData) return;

  const excludedKeys = [
    "New Location Since 2019", "ObjectId", "STATEFP", "TRACTCE", "BLKGRPCE",
    "AFFGEOID", "GEOID", "NAME", "LSAD", "ALAND", "State", "FID",
    "OBJECTID", "Shape", "GlobalID"
  ];

  const sanitize = (str) =>
    (str || "").toString().replace(/\n|\r/g, " ").replace(/,/g, ";");

  const rows = [];

  Object.entries(layerData).forEach(([title, features]) => {
    if (!features.length) return;
    const keys = Object.keys(features[0]).filter(
      (k) => !excludedKeys.includes(k) && !k.includes("__") && k.trim() !== ""
    );

    rows.push([`Category: ${title}`]);
    rows.push(keys);
    features.forEach((f) => rows.push(keys.map((k) => sanitize(f[k]))));
    rows.push([""]); // spacing between categories
  });

  const csvContent = rows.map((r) => r.join(",")).join("\n");
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  saveAs(blob, `${selectedCounty.name}_resources.csv`);
};
const KeyboardNavigationOverlay = ({ 
  isVisible, 
  features, 
  focusedIndex, 
  onClose, 
  onSelect, 
  onFocusChange,
  layersConfig
}) => {
  const theme = useTheme();
  
  if (!isVisible) return null;
  
  // Group features by their category/layer
const groupedFeatures = features.reduce((acc, feature) => {
  let layerTitle = "Unknown";
  let layerColor = theme.palette.primary.main;

  // ✅ Fix: define variables BEFORE using them
  let category = "Unknown";
  let color = theme.palette.primary.main;

  if (feature.layerId) {
    const match = layersConfig.find((layer) => layer.id === feature.layerId);
    if (match) {
      category = match.title;
      color = match.color;
      layerTitle = category;
      layerColor = color;
    }
  }

  if (!acc[layerTitle]) {
    acc[layerTitle] = {
      features: [],
      color: layerColor
    };
  }

  acc[layerTitle].features.push(feature);
  return acc;
}, {});

  // Sort features and enhance with better display attributes
  const enhancedFeatures = features.map(feature => {
    const attrs = feature.attributes;
    
    // Determine best name field
    const nameFields = ['Name', 'ADDRESS', 'OFFICE_NAM', 'Organization', 'ORGANIZATION', 'Program_Name', 'PROGRAM', 'FACILITY_N'];
    let name = "Unknown Location";
    for (const field of nameFields) {
      if (attrs[field] && typeof attrs[field] === 'string' && attrs[field].trim() !== '') {
        name = attrs[field];
        break;
      }
    }
    
    // Determine best description field
    const descFields = ['Address', 'LOCATION', 'City', 'Description', 'Services', 'SERVICES', 'Phone', 'PHONE'];
    let description = "";
    for (const field of descFields) {
      if (attrs[field] && typeof attrs[field] === 'string' && attrs[field].trim() !== '') {
        description = attrs[field];
        break;
      }
    }
    
    // Determine layer/category
    let category = "Unknown";
    let color = theme.palette.primary.main;
    for (const layer of layersConfig) {
      if (attrs && (
        (attrs.source_layer && attrs.source_layer.includes(layer.title)) ||
        (attrs.Layer && attrs.Layer.includes(layer.title)) ||
        (attrs.CATEGORY && attrs.CATEGORY.includes(layer.title))
      )) {
        category = layer.title;
        color = layer.color;
        break;
      }
    }
    
    return {
      ...feature,
      displayName: name,
      displayDescription: description,
      category,
      color
    };
  });
  
  return (
    <Box
      sx={{
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        zIndex: 1002,
        borderTop: '1px solid',
        borderColor: 'divider',
        boxShadow: '0 -4px 10px rgba(0,0,0,0.1)',
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
        maxHeight: '40vh',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <Box sx={{ 
        p: 2, 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        borderBottom: '1px solid',
        borderColor: 'divider'
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant="h6" sx={{ fontWeight: 600, mr: 2 }}>
            Resource Navigation
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Use ← → keys to browse • Enter to select • ESC to exit
          </Typography>
        </Box>
        <Button 
          variant="outlined" 
          onClick={onClose}
          size="small"
          startIcon={<CloseIcon />}
        >
          Close
        </Button>
      </Box>
      
      <Box sx={{ 
        overflowY: 'auto',
        flex: 1,
        px: 2,
        py: 1
      }}>
        <Grid container spacing={2}>
          {enhancedFeatures.map((feature, index) => {
            // Get a color based on the feature's category
            const categoryColor = feature.color || theme.palette.primary.main;
            
            return (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Paper
                  onClick={() => {
                    onFocusChange(index);
                    onSelect(feature);
                  }}
                  sx={{
                    p: 2,
                    borderRadius: 2,
                    cursor: 'pointer',
                    border: '2px solid',
                    borderColor: index === focusedIndex ? categoryColor : 'transparent',
                    boxShadow: index === focusedIndex 
                      ? `0 0 0 4px ${alpha(categoryColor, 0.2)}`
                      : '0 1px 3px rgba(0,0,0,0.1)',
                    transition: 'all 0.2s ease',
                    backgroundColor: index === focusedIndex 
                      ? alpha(categoryColor, 0.05)
                      : 'background.paper',
                    '&:hover': {
                      backgroundColor: alpha(categoryColor, 0.08),
                      transform: 'translateY(-2px)',
                      boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
                    },
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%'
                  }}
                >
                  <Box sx={{ 
                    mb: 1, 
                    pb: 1, 
                    borderBottom: '1px solid',
                    borderColor: 'divider',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}>
                    <Chip 
                      size="small" 
                      label={feature.category}
                      sx={{
                        backgroundColor: alpha(categoryColor, 0.1),
                        color: darken(categoryColor, 0.2),
                        borderColor: alpha(categoryColor, 0.3),
                        fontWeight: 500
                      }}
                    />
                    <Typography variant="caption" color="text.secondary">
                      Item {index + 1}/{enhancedFeatures.length}
                    </Typography>
                  </Box>
                  
                  <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
                    {feature.displayName}
                  </Typography>
                  
                  {feature.displayDescription && (
                    <Typography variant="body2" color="text.secondary" sx={{ 
                      mb: 1,
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical'
                    }}>
                      {feature.displayDescription}
                    </Typography>
                  )}
                  
                  <Box sx={{ 
                    mt: 'auto', 
                    pt: 1, 
                    display: 'flex',
                    justifyContent: 'flex-end',
                    alignItems: 'center'
                  }}>
                    <Button 
                      size="small" 
                      variant={index === focusedIndex ? "contained" : "text"}
                      sx={{ 
                        minWidth: 0, 
                        backgroundColor: index === focusedIndex ? categoryColor : 'transparent',
                        color: index === focusedIndex ? 'white' : categoryColor,
                        '&:hover': {
                          backgroundColor: index === focusedIndex 
                            ? darken(categoryColor, 0.1)
                            : alpha(categoryColor, 0.1)
                        }
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        onFocusChange(index);
                        onSelect(feature);
                      }}
                    >
                      <LocationOnIcon fontSize="small" />
                    </Button>
                  </Box>
                </Paper>
              </Grid>
            );
          })}
        </Grid>
      </Box>
      
      <Box sx={{ 
        p: 2, 
        borderTop: '1px solid',
        borderColor: 'divider',
        display: 'flex',
        justifyContent: 'space-between'
      }}>
        <Button
          disabled={focusedIndex <= 0}
          onClick={() => onFocusChange((focusedIndex - 1 + features.length) % features.length)}
          startIcon={<ArrowBackIcon />}
        >
          Previous
        </Button>
        
        <Typography variant="body2" sx={{ 
          alignSelf: 'center',
          fontWeight: 500 
        }}>
          {focusedIndex + 1} of {features.length}
        </Typography>
        
        <Button
          disabled={focusedIndex >= features.length - 1}
          onClick={() => onFocusChange((focusedIndex + 1) % features.length)}
          endIcon={<ArrowForwardIcon />}
        >
          Next
        </Button>
      </Box>
    </Box>
  );
};
  return (
   <Box sx={{ px: { xs: 2, md: 4 }, py: 3 }}>
    {/* County Selection Panel */}


<Paper
  elevation={1}
  sx={{
    p: { xs: 3, md: 4 },
    mb: 5,
    borderRadius: 3,
    boxShadow: '0 6px 20px rgba(0,0,0,0.05)',
    border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
    backgroundColor: alpha(theme.palette.primary.light, 0.04)
  }}
>
  <Box display="flex" alignItems="center" mb={3}>
    <MapIcon sx={{ fontSize: 32, color: theme.palette.primary.main, mr: 1 }} />
    <Box>
      <Typography variant="h5" fontWeight={700} gutterBottom>
        Explore County Resources
      </Typography>
      <Typography variant="body2" color="text.secondary">
        Choose a county to view available programs and download a detailed summary.
      </Typography>
    </Box>
  </Box>

  <Box
    sx={{
      display: 'flex',
      flexDirection: { xs: 'column', sm: 'row' },
      alignItems: 'flex-start',
      gap: 2,
      flexWrap: 'wrap',
      mb: 3
    }}
  >
    <FormControl fullWidth sx={{ maxWidth: 420 }}>
      <Autocomplete
        disablePortal
        autoHighlight
        fullWidth
        options={countyOptions}
        value={selectedCountyOption}
        onChange={async (event, newValue) => {
          if (!newValue) return;
          setSelectedCountyOption(newValue);
          const countyLayer = countyLayerRef.current;
          if (countyLayer && view) {
            try {
              const res = await countyLayer.queryFeatures({
                where: `County_Nam = '${newValue.replace(/'/g, "''")}'`,
                outFields: ["*"],
                returnGeometry: true,
              });
              if (res.features.length > 0) {
                const selected = res.features[0];
                await view.goTo({ target: selected.geometry, zoom: 10 }, { duration: 3000 });
                await loadCountyData(selected.geometry, selected.attributes);
              }
            } catch (err) {
              console.error("Error querying county layer:", err);
            }
          }
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Select County"
            variant="outlined"
            aria-label="Select a county"
            sx={{
              "& .MuiOutlinedInput-root": {
                backgroundColor: "#fff",
                borderRadius: 2,
                "& fieldset": {
                  borderColor: alpha(theme.palette.primary.main, 0.4),
                },
                "&:hover fieldset": {
                  borderColor: theme.palette.primary.main,
                },
                "&.Mui-focused fieldset": {
                  borderColor: theme.palette.primary.dark,
                },
              },
              "& .MuiInputLabel-root": {
                color: theme.palette.primary.main,
                "&.Mui-focused": {
                  color: theme.palette.primary.dark,
                },
              },
            }}
          />
        )}
      />
    </FormControl>

    <Button
      onClick={exportToCSV}
      startIcon={<DownloadIcon />}
      variant="outlined"
      size="large"
      disabled={!selectedCounty}
      sx={{
        height: '56px',
        px: 3,
        fontWeight: 500,
        mt: { xs: 1, sm: 0 },
        borderColor: theme.palette.primary.main,
        color: theme.palette.primary.main,
        '&:hover': {
          backgroundColor: alpha(theme.palette.primary.main, 0.05),
          borderColor: theme.palette.primary.dark,
          color: theme.palette.primary.dark,
        },
        '&.Mui-disabled': {
          color: theme.palette.grey[400],
          borderColor: theme.palette.grey[300],
        }
      }}
    >
      Download CSV
    </Button>
    <Button
  variant="outlined"
  size="small"
  onClick={() => {
    if (visibleFeatures.length > 0) {
      setFocusedPoiIndex(0);
      setIsPoiListVisible(true);
    }
  }}
  sx={{
    position: 'absolute',
    top: 16,
    left: 16,
    zIndex: 1001,
    backgroundColor: '#fff',
    '&:hover': {
      backgroundColor: '#f0f0f0'
    }
  }}
>
  Enter Keyboard Navigation (K)
</Button>
  </Box>

  {selectedCounty && (
    <>
      <Chip
        label={`Currently viewing: ${selectedCounty.name} County`}
        color="primary"
        variant="outlined"
        sx={{
          mb: 3,
          px: 2,
          py: 1,
          fontSize: '0.9rem',
          fontWeight: 500,
          borderRadius: 2,
          boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
        }}
      />

      <Typography
        variant="h6"
        fontWeight={600}
        sx={{
          mb: 2,
          color: theme.palette.text.primary,
        }}
      >
        Resource Summary
      </Typography>

      {renderLayerSummary()}
    </>
  )}
</Paper>



    {/* ArcGIS Map Box */}
<Box
  sx={{
    position: "relative",
    width: "100%",
    height: "70vh",
    mb: 5,
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: 3,
    overflow: "hidden",
    boxShadow: '0 6px 20px rgba(0,0,0,0.08)',
  }}
>
  {/* Improved keyboard navigation overlay */}
  <KeyboardNavigationOverlay
    isVisible={isPoiListVisible}
    features={visibleFeatures}
    focusedIndex={focusedPoiIndex}
    onClose={() => setIsPoiListVisible(false)}
    onSelect={(feature) => {
      const graphic = findMatchingGraphic(feature);
      if (graphic && view) {
        view.goTo({
          target: graphic.geometry,
          zoom: view.zoom + 1
        }, { duration: 1000 });
        
        // Show a popup for this feature - using the compatible API
       if (view && graphic) {
  view.popup.features = [graphic];
  view.popup.location = graphic.geometry;
  view.popup.visible = true;
}

      }
    }}
    onFocusChange={(index) => setFocusedPoiIndex(index)}
    layersConfig={layersConfig}
  />

  {/* Skip map button for accessibility */}
  <Button
    sx={{
      position: 'absolute',
      top: -100,
      left: 0,
      zIndex: 1000,
      '&:focus': {
        top: 0,
        left: 0,
        backgroundColor: '#fff',
      },
    }}
    onClick={() => {
      const focusable = document.querySelectorAll(
        'a[href], button, input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      for (let i = 0; i < focusable.length; i++) {
        if (focusable[i] === mapDiv.current && focusable[i + 1]) {
          focusable[i + 1].focus();
          break;
        }
      }
    }}
  >
    Skip Map
  </Button>

  {/* Keyboard navigation button with better positioning */}
  <Button
    id="keyboard-nav-button"
    variant="contained"
    size="small"
    onClick={() => {
      if (visibleFeatures.length > 0) {
        setFocusedPoiIndex(0);
        setIsPoiListVisible(true);
      }
    }}
    disabled={visibleFeatures.length === 0}
    startIcon={<KeyboardIcon />}
    sx={{
      position: 'absolute',
      top: 16,
      right: 16,
      zIndex: 1001,
      backgroundColor: theme.palette.primary.main,
      color: '#fff',
      '&:hover': {
        backgroundColor: theme.palette.primary.dark
      },
      '&.Mui-disabled': {
        backgroundColor: alpha(theme.palette.primary.main, 0.4),
        color: '#fff'
      }
    }}
  >
    Keyboard Navigation (K)
  </Button>

  <div 
    ref={mapDiv} 
    tabIndex={0}
    role="region"
    aria-label="Interactive map of county resources. Use tab to exit or press 'K' to enter keyboard navigation mode."
    onFocus={() => {
      if (view) view.focus();
    }} 
    style={{ width: "100%", height: "100%" }} 
  />
  {renderMapLegend()}
</Box>

    {/* Resource Summary */}
    {selectedCounty && (
      <Container maxWidth="xl" sx={{ mt: 2 }}>
       

          {/* <Grid container spacing={3}>
  <Grid item xs={12} sm={6} md={4}>
    <FormControl fullWidth sx={{ mb: 4 }}>
      <InputLabel id="county-select-label">Select County</InputLabel>
      <Select
  labelId="county-select-label"
  value={selectedCountyOption}
  label="Select County"
  onChange={(e) => {
    const name = e.target.value;
    const countyLayer = countyLayerRef.current;
    setSelectedCountyOption(name);
    if (countyLayer && view) {
      countyLayer.queryFeatures({
        where: `County_Nam = '${name}'`, 
        outFields: ["*"],
        returnGeometry: true,
      }).then(res => {
        if (res.features.length > 0) {
          const selected = res.features[0];
          const geometry = selected.geometry;
          view.goTo({ target: geometry, zoom: 10 }, { duration: 3000 });
        }
      });
    }
  }}
>
  {countyOptions.map((name) => (
    <MenuItem key={name} value={name}>{name}</MenuItem>
  ))}
</Select>
    </FormControl>
  </Grid>

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
                    <FormControl fullWidth sx={{ mb: 4 }}>
  <InputLabel id="county-select-label">Select County</InputLabel>
  <Select
    labelId="county-select-label"
    value={selectedCountyOption}
    label="Select County"
    onChange={(e) => {
      const name = e.target.value;
      const countyLayer = countyLayerRef.current;
      setSelectedCountyOption(name);
      const countyFeature = countyOptions.find(opt => opt === name);
      if (countyFeature && view) {
        countyLayer.queryFeatures({
          where: `NAME = '${name}'`,
          outFields: ["*"],
          returnGeometry: true
        }).then(res => {
          if (res.features.length > 0) {
            const selected = res.features[0];
            const geometry = selected.geometry;
            view.goTo({ target: geometry, zoom: 10 }, { duration: 3000 });
      
          }
        });
      }
    }}
  >
    {countyOptions.map((name) => (
      <MenuItem key={name} value={name}>{name}</MenuItem>
    ))}
  </Select>
</FormControl>

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
                                    key.trim() !== "" &&
                                    !key.startsWith(" ") &&
                                    !key.startsWith("OBJECTID") && 
                                    !key.includes("GlobalID") && 
                                    !key.includes("Shape") &&
                                    !key.includes("COUNTY") &&
                                    !key.includes("__") &&
                                     key.trim() !== "" &&
    !key.startsWith(" ") &&
    !key.startsWith("OBJECTID") && 
    !key.includes("GlobalID") && 
    !key.includes("Shape") &&
    !key.includes("COUNTY") &&
    !key.includes("__") &&
    !key.startsWith("SiteLat") && 
    !key.startsWith("DAYS") && 
    !key.startsWith("SiteLon") &&
    !key.startsWith("FAX") &&
    !key.startsWith("Hours") &&
    !key.startsWith("Days") &&
    !key.startsWith("Services") &&
    !key.startsWith("x") &&
    !key.startsWith("y") &&
    !key.startsWith("Zip Code") &&
    !key.startsWith("Latitu") &&
    !key.startsWith("Long") &&
    !key.startsWith("FHFB") &&
    !key.startsWith("Volunteer") &&
    !key.startsWith("MFB") &&
    !key.startsWith("SERVICES") &&
    key !== "FID" &&
    key !== "New Location Since 2019" &&
    key !== "ObjectId" &&
    key !== "STATEFP" &&
    key !== "TRACTCE" &&
    key !== "BLKGRPCE" &&
    key !== "AFFGEOID" &&
    key !== "GEOID" &&
    key !== "NAME" &&
    key !== "LSAD" &&
    key !== "ALAND" &&
    key !== "State" &&
                                    !key.startsWith("SiteLat") && 
                                    !key.startsWith("DAYS") && 
                                    !key.startsWith("SiteLon") &&
                                    !key.startsWith("FAX") &&
                                    !key.startsWith("Hours") &&
                                    !key.startsWith("Days") &&
                                    !key.startsWith("Services") &&
                                    !key.startsWith("x") &&
                                    !key.startsWith("y") &&
                                    !key.startsWith("Zip Code") &&
                                    !key.startsWith("Latitu") &&
                                    !key.startsWith("Long") &&
                                    !key.startsWith("FHFB") &&
                                    !key.startsWith("Volunteer") &&
                                    !key.startsWith("MFB") &&
                              
                                    !key.startsWith("SERVICES") &&
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
          </Grid> */}
        </Container>
      )}
    </Box>
  );
};

export default CountyReport;