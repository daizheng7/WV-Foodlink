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
import * as XLSX from "xlsx"; 
// Step 1: Add the same highlighting graphic helper function from FoodRetailer
const createHighlightGraphic = (geometry, color) => {
  return new Graphic({
    geometry: geometry,
    symbol: {
      type: "simple-marker",
      color: color,
      size: 16,
      outline: {
        color: "#ffffff",
        width: 3
      }
    }
  });
};

const layersConfig = [
  {
    id: "6cabc6993a8f44f9aadd1d884cf9cf84",
    title: "DHHR Offices",
    icon: <LocalHospitalIcon sx={{ fontSize: 48 }} />,
    color: "#002855",
  },
  {
    id: "37ec841dae7e46278d111f26a98b83cb",
    title: "WIC Offices",
    icon: <StorefrontIcon sx={{ fontSize: 48 }} />,
    color: "#1C2B39",
  },
  {
    id: "fe5b84fd9977470ea0a56be091175356",
    title: "Family Resource Network Offices",
    icon: <HomeRepairServiceIcon sx={{ fontSize: 48 }} />,
    color: "#0062A3",
  },
  {
    id: "37fdc5c991f2443e9e30afc80745d00e",
    title: "Family Support Centers",
    icon: <RestaurantIcon sx={{ fontSize: 48 }} />,
    color: "#554741",
  },
  {
    id: "fdedf6d54b1c4bc9928af7fd3ec520c8",
    title: "Senior Services",
    icon: <ElderlyIcon sx={{ fontSize: 48 }} />,
    color: "#988E8B",
  },
  {
    id: "a6ff9a5145eb47f6aadc08170fc53bd5",
    title: "Food Resources",
    icon: <FastfoodIcon sx={{ fontSize: 48 }} />,
    color: "#BEB7B3",
  },
  {
    id: "d16bf58fe37747849a8536c7870c8d80",
    title: "Charitable Food Programs",
    icon: <VolunteerActivismIcon sx={{ fontSize: 48 }} />,
    color: "#7F6310",
  },
  {
    id: "82a68c3787dc4efaacdf98e00328ebed",
    title: "Congregate Meal Program",
    icon: <WorkIcon sx={{ fontSize: 48 }} />,
    color: "#B3A169",
  },
  {
    id: "bf72aea00c1445cca1356cdcee16aa8a",
    title: "Backpack Program",
    icon: <BackpackIcon sx={{ fontSize: 48 }} />,
    color: "#F2E6C2",
  },
  {
    id: "b93e8c7152204bfeac14dc9964bb37df",
    title: "Food Pantry",
    icon: <FoodBankIcon sx={{ fontSize: 48 }} />,
    color: "#EAAA00",
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
  const [countyOptions, setCountyOptions] = useState([]);
  const [selectedCountyOption, setSelectedCountyOption] = useState("");

  const graphicsLayerRef = useRef(null);
  const theme = useTheme();

  // Step 2: Add the enhanced scrollToFeature function with proper graphics handling
  const scrollToFeature = useCallback((feature) => {
    const graphic = findMatchingGraphic(feature);
    if (graphic && view) {
      // Step 2a: Clear existing graphics first
      if (view.graphics && typeof view.graphics.removeAll === 'function') {
        view.graphics.removeAll();
      }

      // Step 2b: Get the layer color for this feature
      const layerConfig = layersConfig.find(layer => layer.id === feature.layerId);
      const color = layerConfig?.color || "#002855";

      // Step 2c: Create highlight graphic
      const highlightGraphic = createHighlightGraphic(graphic.geometry, color);
      
      // Step 2d: Add highlight to view
      if (view.graphics && typeof view.graphics.add === 'function') {
        view.graphics.add(highlightGraphic);
      }

      // Step 2e: Navigate to the feature with smooth animation
      view.goTo({ 
        target: graphic.geometry, 
        zoom: Math.max(view.zoom, 12) // Ensure minimum zoom level
      }, { 
        duration: 800,
        easing: "ease-in-out" 
      }).then(() => {
        // Step 2f: Show popup after navigation completes
        view.popup.features = [graphic];
        view.popup.location = graphic.geometry;
        view.popup.visible = true;
      }).catch(err => {
        console.debug("Navigation was interrupted", err);
      });
    }
  }, [view]);

  // Step 3: Improve the keyboard event handling with proper state management
  useEffect(() => {
  const handleKeyDown = (e) => {
    // Skip if we're in an input field
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
      return;
    }

    if (!visibleFeatures.length) return;

    switch (e.key) {
      case "k":
      case "K":
        e.preventDefault();
        if (!isPoiListVisible) {
          // Enter navigation mode - start with first item
          setIsPoiListVisible(true);
          setFocusedPoiIndex(0);
        } else {
          // Exit navigation mode
          setIsPoiListVisible(false);
          setFocusedPoiIndex(-1);
          if (view && view.graphics) {
            view.graphics.removeAll();
          }
        }
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
      case " ":
        if (isPoiListVisible && focusedPoiIndex >= 0) {
          e.preventDefault();
          scrollToFeature(visibleFeatures[focusedPoiIndex]);
        }
        break;
        
      case "Escape":
        e.preventDefault();
        setIsPoiListVisible(false);
        setFocusedPoiIndex(-1);
        if (view) {
          if (view.graphics) view.graphics.removeAll();
          if (view.popup.visible) view.popup.close();
        }
        break;
    }
  };

  window.addEventListener("keydown", handleKeyDown);
  return () => window.removeEventListener("keydown", handleKeyDown);
}, [visibleFeatures, isPoiListVisible, focusedPoiIndex, view, scrollToFeature]);

  // Step 4: Add effect to handle highlighting focused POI (similar to FoodRetailer)
  useEffect(() => {
    if (!view || focusedPoiIndex < 0 || focusedPoiIndex >= visibleFeatures.length || !isPoiListVisible) {
      return;
    }
    
    // Clear any existing highlights
    if (view.graphics && typeof view.graphics.removeAll === 'function') {
      view.graphics.removeAll();
    }
    
    const focusedFeature = visibleFeatures[focusedPoiIndex];
    if (!focusedFeature) return;
    
    try {
      const graphic = findMatchingGraphic(focusedFeature);
      if (!graphic) return;

      // Get the appropriate color for this layer
      const layerConfig = layersConfig.find(layer => layer.id === focusedFeature.layerId);
      const color = layerConfig?.color || "#002855";
      
      // Create and add highlight graphic
      const highlightGraphic = createHighlightGraphic(graphic.geometry, color);
      
      if (view.graphics && typeof view.graphics.add === 'function') {
        view.graphics.add(highlightGraphic);
      }
      
      // Center the map on the focused POI
      if (graphic.geometry) {
        view.goTo({
          target: graphic.geometry,
          zoom: Math.max(view.zoom, 11) // Maintain reasonable zoom
        }, {
          duration: 500,
          easing: "ease-in-out"
        }).catch(err => {
          console.debug("Map navigation was interrupted", err);
        });
      }
      
    } catch (error) {
      console.error("Error highlighting POI:", error);
    }
    
  }, [view, focusedPoiIndex, visibleFeatures, isPoiListVisible]);

  // Step 5: Enhance the loadCountyData function to better organize visible features
  const loadCountyData = async (geometry, attributes) => {
    // Clear previous graphics
    if (graphicsLayerRef.current) {
      graphicsLayerRef.current.removeAll();
    }

    // Clear view graphics as well
    if (view && view.graphics) {
      view.graphics.removeAll();
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
        query.returnGeometry = true;
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

    // Step 5a: Enhanced visible features with better metadata
    const combinedVisible = allLayerData.flatMap(({ id, features }) =>
      features.map((f, idx) => ({
        attributes: f,
        layerId: id,
        index: idx,
        // Add display helpers
        displayName: getDisplayName(f),
        displayAddress: getDisplayAddress(f),
        category: layersConfig.find(layer => layer.id === id)?.title || "Unknown"
      }))
    );

    setVisibleFeatures(combinedVisible);
    setFocusedPoiIndex(-1); // Reset focus
    setSelectedCounty({ name: attributes.County_Nam || "Unknown" });
    setSelectedCountyOption(attributes.County_Nam || "");
    setLayerCounts(counts);
    setLayerData(layerDataMap);
  };

  // Step 6: Add helper functions for better display
  const getDisplayName = (attributes) => {
    const nameFields = ['Name','Store_Name', 'OFFICE_NAME', 'SiteName','Title', 'ADDRESS', 'OFFICE_NAM', 'Organization', 'ORGANIZATION', 'Program_Name', 'PROGRAM', 'FACILITY_N'];
    for (const field of nameFields) {
      if (attributes[field] && typeof attributes[field] === 'string' && attributes[field].trim() !== '') {
        return attributes[field];
      }
    }
    return "Unknown Location";
  };

  const getDisplayAddress = (attributes) => {
    const addressFields = ['Address', 'LOCATION', 'City', 'ADDRESS'];
    for (const field of addressFields) {
      if (attributes[field] && typeof attributes[field] === 'string' && attributes[field].trim() !== '') {
        return attributes[field];
      }
    }
    return "";
  };

  const findMatchingGraphic = (feature) => {
    if (!graphicsLayerRef.current) return null;
    
    const graphics = graphicsLayerRef.current.graphics.items;
    
    for (const graphic of graphics) {
      if (!graphic.attributes) continue;
      
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

  // Step 7: Enhanced KeyboardNavigationOverlay with better styling
 const KeyboardNavigationOverlay = ({ 
  isVisible, 
  features, 
  focusedIndex, 
  onClose, 
  onSelect, 
  onFocusChange,
  layersConfig
}) => {
  if (!isVisible || focusedIndex < 0 || focusedIndex >= features.length) return null;
  
  // Show only the currently focused feature
  const focusedFeature = features[focusedIndex];
  const layerConfig = layersConfig.find(layer => layer.id === focusedFeature.layerId);
  const categoryColor = layerConfig?.color || theme.palette.primary.main;
  
  return (
    <Box
      sx={{
        position: 'absolute',
        left: '50%',
        bottom: 20,
        transform: 'translateX(-50%)',
        backgroundColor: 'rgba(255, 255, 255, 0.97)',
        zIndex: 1002,
        borderRadius: 3,
        boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
        border: '2px solid',
        borderColor: '#002855',
        minWidth: 350,
        maxWidth: '90vw'
      }}
    >
      {/* Header with navigation controls */}
      <Box sx={{ 
        p: 2, 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        borderBottom: '1px solid',
        borderColor: 'divider',
        backgroundColor: alpha(categoryColor, 0.05)
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <KeyboardIcon sx={{ mr: 1, color: '#002855' }} />
          <Typography variant="subtitle1" sx={{ fontWeight: 600, color:'#002855'  }}>
            {focusedIndex + 1} of {features.length}
          </Typography>
        </Box>
        
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button
            size="small"
            onClick={() => onFocusChange((focusedIndex - 1 + features.length) % features.length)}
            startIcon={<ArrowBackIcon />}
            variant="outlined"
            sx={{ borderColor:'#002855' , color: '#002855'  }}
          >
            Prev
          </Button>
          
          <Button
            size="small"
            onClick={() => onFocusChange((focusedIndex + 1) % features.length)}
            endIcon={<ArrowForwardIcon />}
            variant="outlined"
            sx={{ borderColor: '#002855' , color: '#002855'  }}
          >
            Next
          </Button>
          
          <Button 
            size="small"
            variant="outlined" 
            onClick={onClose}
            startIcon={<CloseIcon />}
            sx={{ borderColor: '#002855' , color: '#002855' }}
          >
            ESC
          </Button>
        </Box>
      </Box>
      
      {/* Single POI Details */}
      <Box sx={{ p: 3 }}>
        <Box sx={{ mb: 2 }}>
          <Chip 
            size="small" 
            label={focusedFeature.category}
            sx={{
              backgroundColor: alpha(categoryColor, 0.15),
              color:'#002855',
              fontWeight: 600,
              mb: 1
            }}
          />
          
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
            {focusedFeature.displayName}
          </Typography>
          
          {focusedFeature.displayAddress && (
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              {focusedFeature.displayAddress}
            </Typography>
          )}
        </Box>
        
        
      </Box>
      
      {/* Instructions */}
      <Box sx={{ 
        px: 3, 
        pb: 2,
        borderTop: '1px solid',
        borderColor: 'divider',
        backgroundColor: alpha(theme.palette.grey[100], 0.5)
      }}>
        <Typography variant="caption" color="text.secondary" sx={{ display: 'block', textAlign: 'center' }}>
          Use ← → keys to navigate • Enter to view • ESC to exit
        </Typography>
      </Box>
    </Box>
  );
};

  // Original map initialization code continues here...
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
        color: [0, 40, 85, 0.2],
        outline: {
          color: [0, 40, 85, 1],
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
    
    // ===== FOCUS MANAGEMENT FIXES (copied from FoodRetailer) =====
    
    // Disable mouse wheel zoom
    mapView.navigation.mouseWheelZoomEnabled = false;
    
    // Remove focus from the map view completely
    const mapContainer = mapView.container;
    
    // Make map non-focusable but still clickable
    mapContainer.setAttribute('tabindex', '-1');
    mapContainer.setAttribute('aria-hidden', 'true');
    
    // Override focus method to prevent focus trapping
    mapView.focus = () => {};
    
    // Remove all focusable elements from the map
    const removeFocusFromElements = (element) => {
      if (element.nodeType === Node.ELEMENT_NODE) {
        if (element.tabIndex >= 0) {
          element.tabIndex = -1;
        }
        // Remove focus outline
        element.style.outline = 'none';
        
        // Process child elements
        Array.from(element.children).forEach(removeFocusFromElements);
      }
    };
    
    // Apply to map container and all its children
    removeFocusFromElements(mapContainer);
    
    // Add mutation observer to handle dynamically added elements
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === Node.ELEMENT_NODE) {
            removeFocusFromElements(node);
          }
        });
      });
    });
    
    observer.observe(mapContainer, {
      childList: true,
      subtree: true
    });
    
    // Store observer reference for cleanup
    mapView._focusObserver = observer;
    
    // ===== END FOCUS MANAGEMENT FIXES =====
    
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
      try {
        // Clean up observer
        if (mapView._focusObserver) {
          mapView._focusObserver.disconnect();
        }
        mapView.map.removeAll();
        mapView.destroy();
      } catch (error) {
        console.error("Error cleaning up map view:", error);
      }
    }
  };
}, []);

  // Rest of your existing functions (renderMapLegend, renderFoodResourcesChart, etc.)
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
        display: { xs: 'none', md: 'block' },
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
            background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.08)} 0%, ${alpha(theme.palette.primary.main, 0.02)} 100%)`, // Use primary color
            border: '1px solid',
            borderColor: alpha(theme.palette.primary.main, 0.2), // Use primary color
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
              backgroundColor: `${theme.palette.primary.main} !important`, // Force primary color for all icons
              color: '#fff !important', // Force white for icon color
              marginRight: 2,
              width: 56,
              height: 56,
              boxShadow: `0 4px 10px ${alpha(theme.palette.primary.main, 0.4)}`, // Primary shadow
              '& svg': {
                color: '#fff !important' // Force white for SVG icons
              }
            }}
          >
            {icon}
          </Avatar>
          <Box>
            <Typography 
              variant="subtitle1" 
              sx={{ 
                fontWeight: 500, 
                color: `${theme.palette.primary.main} !important`, // Force primary color for title
                fontSize: '0.85rem',
              }}
            >
              {title}
            </Typography>
            <Typography 
              variant="h4" 
              sx={{ 
                fontWeight: 700,
                color: `${theme.palette.primary.main} !important`, // Force primary color for numbers
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

const exportToExcel = () => {
  if (!selectedCounty || !layerData) return;

  const excludedKeys = [
    "New Location Since 2019", "ObjectId", "STATEFP", "TRACTCE", "BLKGRPCE",
    "AFFGEOID", "GEOID", "NAME", "LSAD", "ALAND", "State", "FID",
    "OBJECTID", "Shape", "GlobalID"
  ];

  const workbook = XLSX.utils.book_new();

  // Create a summary sheet first
  const summaryData = [
    ["🏛️ County Resource Report"],
    [`📍 ${selectedCounty.name} County, West Virginia`],
    [`📅 Generated: ${new Date().toLocaleDateString('en-US', { 
      year: 'numeric', month: 'long', day: 'numeric' 
    })}`],
    [`⏰ Time: ${new Date().toLocaleTimeString('en-US')}`],
    [""],
    ["📊 Resource Summary"],
    ["Category", "Total Resources"]
  ];

  // Add summary counts
  Object.entries(layerData).forEach(([title, features]) => {
    if (features.length > 0) {
      summaryData.push([title, features.length]);
    }
  });

  summaryData.push(
    [""],
    [`📈 Total Resources Found: ${Object.values(layerData).reduce((sum, features) => sum + features.length, 0)}`],
    [""],
    ["💡 Navigate to individual sheets below for detailed listings"]
  );

  const summarySheet = XLSX.utils.aoa_to_sheet(summaryData);

  // Enhanced summary sheet styling
  summarySheet['A1'].s = {
    font: { bold: true, size: 18, color: { rgb: "FFFFFF" } },
    fill: { fgColor: { rgb: "002855" } },
    alignment: { horizontal: "center", vertical: "center" }
  };

  summarySheet['A2'].s = {
    font: { bold: true, size: 14, color: { rgb: "FFFFFF" } },
    fill: { fgColor: { rgb: "0062A3" } },
    alignment: { horizontal: "center", vertical: "center" }
  };

  // Style the summary table header
  summarySheet['A7'].s = {
    font: { bold: true, size: 12, color: { rgb: "FFFFFF" } },
    fill: { fgColor: { rgb: "554741" } },
    alignment: { horizontal: "center", vertical: "center" },
    border: {
      top: { style: "medium", color: { rgb: "000000" } },
      bottom: { style: "medium", color: { rgb: "000000" } },
      left: { style: "medium", color: { rgb: "000000" } },
      right: { style: "thin", color: { rgb: "000000" } }
    }
  };

  summarySheet['B7'].s = {
    font: { bold: true, size: 12, color: { rgb: "FFFFFF" } },
    fill: { fgColor: { rgb: "554741" } },
    alignment: { horizontal: "center", vertical: "center" },
    border: {
      top: { style: "medium", color: { rgb: "000000" } },
      bottom: { style: "medium", color: { rgb: "000000" } },
      left: { style: "thin", color: { rgb: "000000" } },
      right: { style: "medium", color: { rgb: "000000" } }
    }
  };

  summarySheet['!cols'] = [{ width: 40 }, { width: 18 }];
  summarySheet['!rows'] = [
    { hpt: 25 }, // Row 1 height
    { hpt: 20 }, // Row 2 height
  ];

  XLSX.utils.book_append_sheet(workbook, summarySheet, "📊 Summary");

  // Process each category with enhanced table formatting
  Object.entries(layerData).forEach(([title, features]) => {
    if (!features.length) return;

    const keys = Object.keys(features[0]).filter(
      (k) => !excludedKeys.includes(k) && !k.includes("__") && k.trim() !== ""
    );

    // Clean up header names for better presentation
    const cleanHeaders = keys.map(key => {
      return key
        .replace(/_/g, ' ')
        .replace(/([A-Z])/g, ' $1')
        .replace(/^\w/, c => c.toUpperCase())
        .trim();
    });

    const sanitizedData = features.map((f) => {
      const row = {};
      keys.forEach((key, index) => {
        let value = (f[key] || "").toString().replace(/\n|\r/g, " ").replace(/,/g, ";");
        
        // Enhanced data formatting
        if (key.toLowerCase().includes('phone') && value.length === 10) {
          value = `(${value.slice(0,3)}) ${value.slice(3,6)}-${value.slice(6)}`;
        }
        
        if (key.toLowerCase().includes('email') && value.includes('@')) {
          // Keep email formatting clean
          value = value.toLowerCase().trim();
        }
        
        if (key.toLowerCase().includes('website') || key.toLowerCase().includes('url')) {
          if (value && !value.startsWith('http')) {
            value = `https://${value}`;
          }
        }
        
        row[cleanHeaders[index]] = value;
      });
      return row;
    });

    // Create sheet with title section
    const titleData = [
      [`📋 ${title} Resources`],
      [`📍 ${selectedCounty.name} County, West Virginia`],
      [`📊 Total Locations: ${features.length}`],
      [`📅 Generated: ${new Date().toLocaleDateString()}`],
      [""] // Empty row before table
    ];

    const sheet = XLSX.utils.aoa_to_sheet(titleData);
    
    // Add the data table starting from row 6
    XLSX.utils.sheet_add_json(sheet, sanitizedData, { 
      origin: 'A6',
      header: cleanHeaders
    });

    const range = XLSX.utils.decode_range(sheet['!ref']);

    // Enhanced title styling
    sheet['A1'].s = {
      font: { bold: true, size: 16, color: { rgb: "FFFFFF" } },
      fill: { fgColor: { rgb: "002855" } },
      alignment: { horizontal: "center", vertical: "center" }
    };

    sheet['A2'].s = {
      font: { bold: true, size: 12, color: { rgb: "FFFFFF" } },
      fill: { fgColor: { rgb: "0062A3" } },
      alignment: { horizontal: "center", vertical: "center" }
    };

    sheet['A3'].s = {
      font: { bold: true, size: 11, color: { rgb: "002855" } },
      fill: { fgColor: { rgb: "E6F3FF" } },
      alignment: { horizontal: "center", vertical: "center" }
    };

    sheet['A4'].s = {
      font: { size: 10, color: { rgb: "666666" } },
      alignment: { horizontal: "center", vertical: "center" }
    };

    // **Enhanced Table Header Styling (Row 6)**
    for (let C = 0; C < cleanHeaders.length; ++C) {
      const headerCell = XLSX.utils.encode_cell({ r: 5, c: C }); // Row 6 (0-indexed as 5)
      if (sheet[headerCell]) {
        sheet[headerCell].s = {
          font: { 
            bold: true, 
            size: 11, 
            color: { rgb: "FFFFFF" } 
          },
          fill: { fgColor: { rgb: "554741" } },
          alignment: { 
            horizontal: "center", 
            vertical: "center",
            wrapText: true 
          },
          border: {
            top: { style: "medium", color: { rgb: "000000" } },
            bottom: { style: "medium", color: { rgb: "000000" } },
            left: { style: "medium", color: { rgb: "000000" } },
            right: { style: "medium", color: { rgb: "000000" } }
          }
        };
      }
    }

    // **Enhanced Data Row Styling with Table Format**
    const dataStartRow = 6; // Row 7 (0-indexed as 6)
    for (let R = dataStartRow; R <= range.e.r; ++R) {
      const isEvenRow = (R - dataStartRow) % 2 === 0;
      
      for (let C = 0; C < cleanHeaders.length; ++C) {
        const cellRef = XLSX.utils.encode_cell({ r: R, c: C });
        if (sheet[cellRef]) {
          sheet[cellRef].s = {
            font: { size: 10 },
            fill: { 
              fgColor: { 
                rgb: isEvenRow ? "FFFFFF" : "F8F9FA" 
              } 
            },
            alignment: { 
              horizontal: "left", 
              vertical: "center",
              wrapText: true 
            },
            border: {
              top: { style: "thin", color: { rgb: "CCCCCC" } },
              bottom: { style: "thin", color: { rgb: "CCCCCC" } },
              left: { style: "thin", color: { rgb: "CCCCCC" } },
              right: { style: "thin", color: { rgb: "CCCCCC" } }
            }
          };
          
          // Special formatting for specific column types
          const headerName = cleanHeaders[C].toLowerCase();
          if (headerName.includes('phone')) {
            sheet[cellRef].s.alignment.horizontal = "center";
          } else if (headerName.includes('email') || headerName.includes('website')) {
            sheet[cellRef].s.font.color = { rgb: "0066CC" };
          } else if (headerName.includes('address')) {
            sheet[cellRef].s.alignment.wrapText = true;
          }
        }
      }
    }

    // **Auto-size columns with intelligent width calculation**
    const colWidths = cleanHeaders.map((header, index) => {
      const headerWidth = header.length;
      const dataWidths = sanitizedData.map(row => 
        (row[header] || "").toString().length
      );
      const maxDataWidth = Math.max(...dataWidths);
      const optimalWidth = Math.max(headerWidth, maxDataWidth) + 3;
      
      // Set smart column width limits based on content type
      const headerLower = header.toLowerCase();
      if (headerLower.includes('phone')) {
        return { width: 15 };
      } else if (headerLower.includes('email')) {
        return { width: Math.min(optimalWidth, 35) };
      } else if (headerLower.includes('address')) {
        return { width: Math.min(optimalWidth, 45) };
      } else if (headerLower.includes('name') || headerLower.includes('organization')) {
        return { width: Math.min(optimalWidth, 40) };
      } else {
        return { width: Math.min(optimalWidth, 25) };
      }
    });
    
    sheet['!cols'] = colWidths;

    // **Set row heights for better readability**
    const rowHeights = [];
    rowHeights[0] = { hpt: 25 }; // Title row
    rowHeights[1] = { hpt: 20 }; // Subtitle row
    rowHeights[2] = { hpt: 18 }; // Count row
    rowHeights[3] = { hpt: 15 }; // Date row
    rowHeights[5] = { hpt: 22 }; // Header row
    
    // Data rows
    for (let i = dataStartRow; i <= range.e.r; i++) {
      rowHeights[i] = { hpt: 18 };
    }
    
    sheet['!rows'] = rowHeights;

    // **Add professional footer section**
    const footerStartRow = range.e.r + 3;
    const footerData = [
      [""],
      ["📍 Data Sources & Attribution"],
      ["This data was compiled from verified government and community sources."],
      ["For the most current information, please contact locations directly."],
      [""],
      ["🏛️ Center for Resilient Communities, West Virginia University"],
      ["🌐 Website: https://resilientcommunities.wvu.edu/"],
      [`📧 Contact: foodjustice@mail.wvu.edu`],
      [""],
      [`📅 Report Generated: ${new Date().toLocaleString()}`]
    ];

    XLSX.utils.sheet_add_aoa(sheet, footerData, { origin: `A${footerStartRow}` });

    // Style footer section
    const footerHeaderCell = `A${footerStartRow + 1}`;
    if (sheet[footerHeaderCell]) {
      sheet[footerHeaderCell].s = {
        font: { bold: true, size: 11, color: { rgb: "002855" } },
        fill: { fgColor: { rgb: "F0F8FF" } }
      };
    }

    // Get category emoji for sheet tab
    const categoryEmojis = {
      "DHHR Offices": "🏥",
      "WIC Offices": "🏪", 
      "Family Resource Network Offices": "🏠",
      "Family Support Centers": "🤝",
      "Senior Services": "👴",
      "Food Resources": "🍎",
      "Charitable Food Programs": "❤️",
      "Congregate Meal Program": "🍽️",
      "Backpack Program": "🎒",
      "Food Pantry": "📦"
    };

    const emoji = categoryEmojis[title] || "📍";
    const sheetName = `${emoji} ${title}`.substring(0, 31);
    
    XLSX.utils.book_append_sheet(workbook, sheet, sheetName);
  });

  // Enhanced attribution sheet (keeping existing code but with better formatting)
  const attributionData = [
    ["📍 FoodLink County Resource Report"],
    [""],
    ["🏛️ About This Report"],
    ["This comprehensive resource directory was generated using FoodLink,"],
    ["a geospatial analysis tool developed by the Center for Resilient"],
    ["Communities at West Virginia University."],
    [""],
    ["🎯 Purpose"],
    ["To provide community members, service providers, and policymakers"],
    ["with accessible information about available resources in their county."],
    [""],
    ["📊 Data Sources"],
    ["• West Virginia Department of Health and Human Resources"],
    ["• Local community organizations"],
    ["• Government databases"],
    ["• Verified community submissions"],
    [""],
    ["⚠️ Important Notes"],
    ["• Resource availability may change - please contact locations directly"],
    ["• This report reflects data available at time of generation"],
    ["• For the most current information, visit our website"],
    [""],
    ["📞 Contact Information"],
    ["Center for Resilient Communities"],
    ["West Virginia University"],
    ["Website: https://resilientcommunities.wvu.edu/projects/foodlink"],
    ["Email: resilient@mail.wvu.edu"],
    [""],
    [`📅 Report Generated: ${new Date().toLocaleString()}`],
    [`🏛️ County: ${selectedCounty.name}, West Virginia`]
  ];

  const attributionSheet = XLSX.utils.aoa_to_sheet(attributionData);

  // Enhanced attribution sheet styling
  attributionSheet['A1'].s = {
    font: { bold: true, size: 18, color: { rgb: "FFFFFF" } },
    fill: { fgColor: { rgb: "002855" } },
    alignment: { horizontal: "center", vertical: "center" }
  };

  ['A3', 'A8', 'A13', 'A18', 'A22'].forEach(cellRef => {
    if (attributionSheet[cellRef]) {
      attributionSheet[cellRef].s = {
        font: { bold: true, size: 13, color: { rgb: "002855" } },
        fill: { fgColor: { rgb: "E6F3FF" } }
      };
    }
  });

  attributionSheet['!cols'] = [{ width: 85 }];
  attributionSheet['!rows'] = [{ hpt: 25 }]; // Title row height

  XLSX.utils.book_append_sheet(workbook, attributionSheet, "ℹ️ About");

  // Write and save
  const timestamp = new Date().toISOString().slice(0, 10);
  const filename = `${selectedCounty.name}_County_Resources_${timestamp}.xlsx`;
  
  const excelBuffer = XLSX.write(workbook, { 
    bookType: "xlsx", 
    type: "array", 
    cellStyles: true 
  });
  
  const blob = new Blob([excelBuffer], { 
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" 
  });
  
  saveAs(blob, filename);
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
        

        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'center',
            alignItems: 'center',
            gap: 2,
            flexWrap: 'wrap',
            mb: 3
          }}
        >
          <FormControl fullWidth sx={{ maxWidth: 720 }}>
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
  onClick={exportToExcel}
  startIcon={<DownloadIcon />}
  variant="contained"
  color="primary"
  size="large"
  disabled={!selectedCounty}
  sx={{
    height: '56px',
    px: 3,
    fontWeight: 600,
    mt: { xs: 1, sm: 0 },
    color: '#fff !important', // Force white text
    backgroundColor: '#002855 !important', // Force blue background
    border: `2px solid #002855 !important`, // Force blue border
    '&:hover': {
      backgroundColor: '#1C2B39 !important', // Force darker blue on hover
      borderColor: '#1C2B39 !important', // Force darker blue border on hover
      color: '#fff !important', // Force white text on hover
    },
    '&:focus': {
      outline: '2px solid #EAAA00',
      outlineOffset: '2px',
      backgroundColor: '#002855 !important', // Force blue background on focus
      borderColor: '#002855 !important', // Force blue border on focus
      color: '#fff !important', // Force white text on focus
    },
    '&.Mui-focusVisible': {
      backgroundColor: '#002855 !important', // Force blue background when focused
      borderColor: '#002855 !important', // Force blue border when focused
      color: '#fff !important', // Force white text when focused
    },
    '&:active': {
      backgroundColor: '#002855 !important', // Force blue background when clicked
      borderColor: '#002855 !important', // Force blue border when clicked
      color: '#fff !important', // Force white text when clicked
    },
    '&.Mui-disabled': {
      backgroundColor: '#e0e0e0 !important', // Force gray background when disabled
      borderColor: '#e0e0e0 !important', // Force gray border when disabled
      color: '#9e9e9e !important', // Force gray text when disabled
    }
  }}
>
  Download County Data
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
        {/* Step 8: Enhanced KeyboardNavigationOverlay */}
        <KeyboardNavigationOverlay
          isVisible={isPoiListVisible}
          features={visibleFeatures}
          focusedIndex={focusedPoiIndex}
          onClose={() => {
            setIsPoiListVisible(false);
            setFocusedPoiIndex(-1);
            // Clear graphics when closing
            if (view && view.graphics) {
              view.graphics.removeAll();
            }
          }}
          onSelect={(feature) => {
            scrollToFeature(feature);
          }}
          onFocusChange={(index) => setFocusedPoiIndex(index)}
          layersConfig={layersConfig}
        />

        {/* Skip map button for accessibility */}
      <Button
  sx={{
    position: 'absolute',
    top: -100, // Hidden by default
    left: 20,   // Move away from left edge where zoom controls might be
    zIndex: 1000,
    backgroundColor: '#fff',
    color: '#002855',
    border: '2px solid #002855',
    fontWeight: 600,
    px: 3,
    py: 1,
    '&:focus': {
      top: 20,    // Position below the top edge when focused
      left: 20,   // Consistent left positioning
      backgroundColor: '#fff',
      color: '#002855',
      outline: '2px solid #EAAA00', // WVU gold outline for visibility
      outlineOffset: '2px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.3)', // Strong shadow for visibility
    },
    '&:hover:focus': {
      backgroundColor: '#f5f5f5',
    }
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

<Button
  id="keyboard-nav-button"
  variant="contained"
  size="medium"
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
    backgroundColor: '#002855 !important', // Force blue background
    color: '#fff !important', // Force white text
    padding: '0.75em 1.5em',
    fontWeight: 600,
    borderRadius: 3,
    boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
    '&:hover': {
      backgroundColor: '#1C2B39 !important', // Force darker blue on hover
      transform: 'translateY(-2px)',
      boxShadow: '0 6px 16px rgba(0,0,0,0.25)',
      color: '#fff !important', // Force white text on hover
    },
    '&:focus': {
      outline: '2px solid #EAAA00',
      outlineOffset: '2px',
      backgroundColor: '#002855 !important', // Force blue background on focus
      color: '#fff !important', // Force white text on focus
    },
    '&.Mui-focusVisible': {
      backgroundColor: '#002855 !important', // Force blue background when focused
      color: '#fff !important', // Force white text when focused
    },
    '&:active': {
      backgroundColor: '#002855 !important', // Force blue background when clicked
      color: '#fff !important', // Force white text when clicked
    },
    '&.Mui-disabled': {
      backgroundColor: 'rgba(0, 40, 85, 0.4) !important', // Force semi-transparent blue when disabled
      color: '#fff !important', // Force white text when disabled
    },
    transition: 'all 0.2s ease'
  }}
>
  Navigation (K)
</Button>

        {/* ARIA live region for screen reader announcements */}
        <div
          aria-live="polite"
          className="sr-only"
          style={{ position: 'absolute', width: '1px', height: '1px', overflow: 'hidden' }}
        >
          {isPoiListVisible && focusedPoiIndex >= 0 && focusedPoiIndex < visibleFeatures.length && (
            <span>
              {`Now focusing on ${visibleFeatures[focusedPoiIndex].displayName}, 
              ${visibleFeatures[focusedPoiIndex].displayAddress}. 
              Item ${focusedPoiIndex + 1} of ${visibleFeatures.length}.`}
            </span>
          )}
        </div>

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
  <Container maxWidth="xl" sx={{ mt: 4 }}>
  

    {renderLayerSummary()}
  </Container>
)}

    </Box>
  );
  };

  export default CountyReport;