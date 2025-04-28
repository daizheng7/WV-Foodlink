import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Button,
  IconButton,
  Chip,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  CircularProgress,
  Alert,
  Fade,
  useMediaQuery,
  useTheme,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import StorefrontIcon from "@mui/icons-material/Storefront";
import HomeRepairServiceIcon from "@mui/icons-material/HomeRepairService";
import ElderlyIcon from "@mui/icons-material/Elderly";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import FilterListIcon from "@mui/icons-material/FilterList";
import DirectionsIcon from "@mui/icons-material/Directions";
import NearMeIcon from "@mui/icons-material/NearMe";
import CloseIcon from "@mui/icons-material/Close";

// Dynamically load ArcGIS modules
const loadArcGISModules = () => {
  return new Promise((resolve, reject) => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://js.arcgis.com/4.26/esri/themes/light/main.css';
    document.head.appendChild(link);

    const script = document.createElement('script');
    script.src = 'https://js.arcgis.com/4.26/';
    script.onload = () => {
      window.require([
        "esri/config",
        "esri/Map",
        "esri/views/MapView",
        "esri/layers/FeatureLayer",
        "esri/Graphic",
        "esri/layers/GraphicsLayer",
        "esri/widgets/Locate",
        "esri/widgets/Search",
        "esri/widgets/BasemapToggle",
        "esri/widgets/Legend"
      ], (
        esriConfig,
        Map,
        MapView,
        FeatureLayer,
        Graphic,
        GraphicsLayer,
        Locate,
        Search,
        BasemapToggle,
        Legend
      ) => {
        resolve({
          esriConfig,
          Map,
          MapView,
          FeatureLayer,
          Graphic,
          GraphicsLayer,
          Locate,
          Search,
          BasemapToggle,
          Legend
        });
      });
    };
    script.onerror = reject;
    document.head.appendChild(script);
  });
};

// Layer portal item IDs and categories
const LAYER_ID_TO_CATEGORY = {
  "DHHROffices": "DHHR Offices",
  "WICOffices": "WIC Offices",
  "FamilyResourceNetwork": "Family Resource Network",
  "FamilySupportCenters": "Family Support Centers",
  "SeniorServices": "Senior Services"
};

const LAYER_PORTAL_ITEMS = {
  "DHHROffices": "6cabc6993a8f44f9aadd1d884cf9cf84",
  "WICOffices": "37ec841dae7e46278d111f26a98b83cb",
  "FamilyResourceNetwork": "fe5b84fd9977470ea0a56be091175356",
  "FamilySupportCenters": "37fdc5c991f2443e9e30afc80745d00e",
  "SeniorServices": "548531449ba2479aba6da213908e965f"
};

const categoryStyles = {
  "DHHR Offices": {
    color: "#002855",
    icon: <LocalHospitalIcon />,
    description: "Department of Health and Human Resources service locations"
  },
  "WIC Offices": {
    color: "#7F6310",

    icon: <StorefrontIcon />,
    description: "Women, Infants, and Children (WIC) program offices"
  },
  "Family Resource Network": {
    color: "#1C2B39",
    icon: <HomeRepairServiceIcon />,
    description: "Community support and resource centers"
  },
  "Family Support Centers": {
    color: "#554741",
    icon: <RestaurantIcon />,
    description: "Centers providing family support services"
  },
  "Senior Services": {
    color: "#0062A3",
    icon: <ElderlyIcon />,
    description: "Services and support for senior citizens"
  }
};

const AssistanceMap = () => {
  const mapDiv = useRef(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  const [arcgis, setArcgis] = useState(null);
  const [view, setView] = useState(null);
  const [activeCategories, setActiveCategories] = useState(Object.keys(categoryStyles));
  const [userLocation, setUserLocation] = useState(null);
  const [nearbyResults, setNearbyResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [detailsDialogOpen, setDetailsDialogOpen] = useState(false);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [featureLayers, setFeatureLayers] = useState({});
  const [graphicsLayer, setGraphicsLayer] = useState(null);

  // Load ArcGIS modules when component mounts
  useEffect(() => {
    let isMounted = true;
    
    const loadModules = async () => {
      try {
        const modules = await loadArcGISModules();
        if (isMounted) {
          setArcgis(modules);
       
        }
      } catch (error) {
        console.error("Error loading ArcGIS modules:", error);
        
      }
    };
    
    loadModules();
    
    return () => {
      isMounted = false;
    };
  }, []);

  // Initialize map once ArcGIS modules are loaded
  useEffect(() => {
    if (!arcgis || !mapDiv.current) return;
    
    // Set up API key if needed
    if (process.env.REACT_APP_ARCGIS_API_KEY) {
      arcgis.esriConfig.apiKey = process.env.REACT_APP_ARCGIS_API_KEY;
    }
    
    // Create map
    const map = new arcgis.Map({
      basemap: "arcgis-navigation"
    });
    
    // Create graphics layer for user location
    const userGraphicsLayer = new arcgis.GraphicsLayer({
      id: "userGraphics"
    });
    map.add(userGraphicsLayer);
    setGraphicsLayer(userGraphicsLayer);
    
    // Create and setup map view
    const mapView = new arcgis.MapView({
      container: mapDiv.current,
      map: map,
      center: [-80.39, 39.10],
      zoom: 7,
      padding: {
        top: 50,
        right: isMobile ? 0 : 350,
        bottom: isMobile ? 200 : 50,
        left: 0
      },
      popup: {
        dockEnabled: true,
        dockOptions: {
          position: isMobile ? "bottom-center" : "top-left",
          buttonEnabled: true,
          breakpoint: false
        }
      }
    });
    
    // Add feature layers
    const layers = {};
    
    Object.entries(LAYER_ID_TO_CATEGORY).forEach(([id, category]) => {
      const layer = new arcgis.FeatureLayer({
        portalItem: { id: LAYER_PORTAL_ITEMS[id] },
        id: id,
        outFields: ["*"],
        visible: activeCategories.includes(category),
        renderer: {
          type: "simple",
          symbol: {
            type: "simple-marker",
            color: categoryStyles[category].color,
            size: 10,
            outline: { color: "#ffffff", width: 1.5 }
          }
        },
        popupTemplate: {
          title: "<div style='font-size: 16px; font-weight: bold;'>{SiteName}</div>",
          content: [
            {
              type: "fields",
              fieldInfos: [
                { fieldName: "Address1", label: "Address" },
                { fieldName: "Hours_of_Operation", label: "Operating Hours" },
                { fieldName: "Phone_Number", label: "Phone Number" },
                { fieldName: "Website", label: "Website", format: { 
                  urlTemplate: "{value}" 
                }},
                { fieldName: "Services_Provided", label: "Services Provided" }
              ]
            }
          ],
          actions: [
            {
              id: "directions",
              title: "Directions",
              className: "esri-icon-directions"
            },
            {
              id: "info",
              title: "More Info",
              className: "esri-icon-description"
            }
          ]
        }
      });
      
      map.add(layer);
      layers[id] = layer;
    });
    
    setFeatureLayers(layers);
    
    // Add widgets once view is ready
    mapView.when(() => {
      // Add locate widget
      const locateWidget = new arcgis.Locate({
        view: mapView,
        useHeadingEnabled: false,
        goToLocationEnabled: true
      });
      mapView.ui.add(locateWidget, "top-left");
      
      
      
      // Add basemap toggle widget
      const basemapToggle = new arcgis.BasemapToggle({
        view: mapView,
        nextBasemap: "satellite"
      });
      mapView.ui.add(basemapToggle, "bottom-left");
      
    
  
      
      
      
      // Handle locate success
      locateWidget.on("locate", (event) => {
        if (event.position) {
          const { latitude, longitude } = event.position.coords;
          
          setUserLocation({
            latitude,
            longitude
          });
          
          findNearbyLocations({
            longitude,
            latitude
          });
        }
      });
      
      // Handle popup actions
      mapView.popup.on("trigger-action", (event) => {
        if (event.action.id === "directions") {
          const attributes = mapView.popup.selectedFeature?.attributes;
          if (attributes && attributes.Address1) {
            const address = attributes.Address1;
            window.open(`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address)}`, "_blank");
          }
        } else if (event.action.id === "info") {
          const attributes = mapView.popup.selectedFeature?.attributes;
          if (attributes) {
            setSelectedLocation({
              name: attributes.SiteName || "Unknown",
              address: attributes.Address1 || "No address available",
              hours: attributes.Hours_of_Operation || "Not specified",
              phone: attributes.Phone_Number || "Not available",
              website: attributes.Website || "",
              services: attributes.Services_Provided || "Information not available",
              type: mapView.popup.selectedFeature.layer.id
            });
            setDetailsDialogOpen(true);
          }
        }
      });
      
      // Fix popup positioning and functionality
      mapView.popup.watch("visible", function(visible) {
        if (visible) {
          if (isMobile) {
            mapView.popup.dockOptions = {
              position: "bottom-center",
              buttonEnabled: true,
              breakpoint: false
            };
          } else {
            mapView.popup.dockOptions = {
              position: "top-left",
              buttonEnabled: true,
              breakpoint: false
            };
          }
          
          if (!mapView.popup.docked && !isMobile) {
            setTimeout(() => {
              try {
                mapView.popup.dock();
              } catch (e) {
                console.warn("Error docking popup:", e);
              }
            }, 200);
          }
        }
      });
      
      // Make popup explicitly dockable
      mapView.popup.dockOptions.buttonEnabled = true;
      mapView.popup.dockEnabled = true;
      
    });
    
    setView(mapView);
    
    // Cleanup on unmount
    return () => {
      if (mapView) {
        try {
          mapView.container = null;
          mapView.destroy();
        } catch (err) {
          console.warn("Error destroying map view:", err);
        }
      }
    };
  }, [arcgis, isMobile]);
  
  // Update layer visibility when active categories change
  useEffect(() => {
    if (!featureLayers || Object.keys(featureLayers).length === 0) return;
    
    Object.entries(featureLayers).forEach(([id, layer]) => {
      const category = LAYER_ID_TO_CATEGORY[id];
      if (category) {
        layer.visible = activeCategories.includes(category);
      }
    });
  }, [activeCategories, featureLayers]);
  
  // Toggle category visibility
  const toggleCategory = (category) => {
    setActiveCategories(prev => {
      if (prev.includes(category)) {
        return prev.filter(c => c !== category);
      } else {
        return [...prev, category];
      }
    });
  };

  // Select all categories
  const selectAllCategories = () => {
    setActiveCategories(Object.keys(categoryStyles));
  };

  // Clear all categories
  const clearAllCategories = () => {
    setActiveCategories([]);
  };
  
  // Get user's current location
  const getUserLocation = () => {
    if (!arcgis || !view) {
      showNotification("Map is still loading. Please try again in a moment.", "warning");
      return;
    }
    
    setLoading(true);
    
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation({ latitude, longitude });
        
        // Center map on user location
        view.goTo({
          center: [longitude, latitude],
          zoom: 12
        });
        
        // Add user location marker
        addUserLocationGraphic(longitude, latitude);
        
        // Find nearby locations
        findNearbyLocations({
          longitude,
          latitude
        });
        
        setLoading(false);
      },
      (error) => {
        console.error("Error getting user location:", error);
        showNotification("Unable to access your location. Please check your browser permissions.", "error");
        setLoading(false);
      }
    );
  };
  
  // Add user location graphic to map
  const addUserLocationGraphic = (longitude, latitude) => {
    if (!arcgis || !graphicsLayer) return;
    
    graphicsLayer.removeAll();
    
    const point = {
      type: "point",
      longitude,
      latitude
    };
    
    const symbol = {
      type: "simple-marker",
      color: [0, 102, 204],
      size: 12,
      outline: {
        color: [255, 255, 255],
        width: 2
      }
    };

    const graphic = new arcgis.Graphic({
      geometry: point,
      symbol: symbol
    });
    
    graphicsLayer.add(graphic);
    
    // Add a buffer around the user location
    const bufferGeometry = {
      type: "polygon",
      rings: generateCircle(longitude, latitude, 5)
    };
    
    const bufferSymbol = {
      type: "simple-fill",
      color: [0, 102, 204, 0.2],
      outline: {
        color: [0, 102, 204, 0.5],
        width: 2
      }
    };
    
    const bufferGraphic = new arcgis.Graphic({
      geometry: bufferGeometry,
      symbol: bufferSymbol
    });
    
    graphicsLayer.add(bufferGraphic);
  };
  
  // Generate circle coordinates for buffer
  const generateCircle = (lon, lat, radiusInKm, pointCount = 64) => {
    const earthRadius = 6371; // Earth's radius in kilometers
    const points = [];
    
    // Convert center coordinates to radians
    const centerLatRad = lat * Math.PI / 180;
    const centerLonRad = lon * Math.PI / 180;
    
    // Convert radius to angular distance
    const angularDistance = radiusInKm / earthRadius;
    
    for (let i = 0; i < pointCount; i++) {
      const angle = (i * 360) / pointCount;
      const bearingRad = angle * Math.PI / 180;
      
      // Calculate destination point using Haversine formula
      const destLatRad = Math.asin(
        Math.sin(centerLatRad) * Math.cos(angularDistance) + 
        Math.cos(centerLatRad) * Math.sin(angularDistance) * Math.cos(bearingRad)
      );
      
      const destLonRad = centerLonRad + Math.atan2(
        Math.sin(bearingRad) * Math.sin(angularDistance) * Math.cos(centerLatRad),
        Math.cos(angularDistance) - Math.sin(centerLatRad) * Math.sin(destLatRad)
      );
      
      // Convert back to degrees
      const destLat = destLatRad * 180 / Math.PI;
      const destLon = destLonRad * 180 / Math.PI;
      
      points.push([destLon, destLat]);
    }
    
    // Close the polygon
    points.push(points[0]);
    
    return points;
  };
  
  const findNearbyLocations = async (location) => {
    if (!arcgis || !view || !location || Object.keys(featureLayers).length === 0) return;
    
    setLoading(true);
    
    try {
      // Create a polygon geometry for the search area
      const bufferGeometry = {
        type: "polygon",
        rings: generateCircle(location.longitude, location.latitude, 10000000) // 10,000 km radius
      };
  
      const results = await Promise.all(
        Object.entries(featureLayers).map(async ([id, layer]) => {
          try {
            const query = layer.createQuery();
            
            // Use spatial intersection with the large buffer
            query.geometry = bufferGeometry;
            query.spatialRelationship = "intersects";
            query.outFields = ["*"];
            query.num = 250; // Increased result limit
            
            console.log(`Querying layer: ${id}`, {
              layerId: LAYER_PORTAL_ITEMS[id],
              bufferGeometry: bufferGeometry
            });
  
            const result = await layer.queryFeatures(query);
            
            console.log(`Raw results for ${id}:`, {
              featureCount: result.features.length,
              features: result.features.map(f => ({
                name: f.attributes.SiteName,
                address: f.attributes.Address1
              }))
            });
  
            return result.features.map(feature => {
              // Calculate distance manually
              const featureGeometry = feature.geometry;
              const distance = calculateDistance(
                location.latitude, 
                location.longitude, 
                featureGeometry.latitude, 
                featureGeometry.longitude
              );
  
              return {
                id: feature.getObjectId(),
                name: feature.attributes.SiteName || "Unnamed Location",
                address: feature.attributes.Address1 || "No address available",
                phone: feature.attributes.Phone_Number || "Not available",
                hours: feature.attributes.Hours_of_Operation || "Not specified",
                distance: distance.toFixed(1),
                category: LAYER_ID_TO_CATEGORY[id],
                feature: feature
              };
            });
          } catch (layerError) {
            console.error(`Error querying layer ${id}:`, layerError);
            return [];
          }
        })
      );
      
      const flatResults = results.flat();
      setNearbyResults(flatResults);
      
      if (flatResults.length > 0) {
        showNotification(`Found ${flatResults.length} assistance resources within 10,000 km of your location.`, "success");
      } else {
        showNotification("No assistance resources found. Possible reasons:\n- Layer might be empty\n- Location might be outside covered area", "info");
      }
    } catch (error) {
      console.error("Unexpected error finding nearby locations:", error);
      showNotification("Unexpected error searching for assistance resources.", "error");
    } finally {
      setLoading(false);
    }
  };
  
  // Haversine formula for distance calculation
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Earth's radius in kilometers
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  };
  
  // Show notification
  const showNotification = (message, severity = "info") => {
    setNotification({ message, severity });
    setTimeout(() => setNotification(null), 5000);
  };
  
  // Zoom to a specific location on the map
  const zoomToLocation = (result) => {
    if (!view) return;
    
    view.goTo({
      target: result.feature,
      zoom: 15
    });
    
    // Improved popup handling for result items
    view.popup.close();
    
    setTimeout(() => {
      view.popup.open({
        features: [result.feature],
        location: result.feature.geometry,
        updateLocationEnabled: true,
        visible: true
      });
      
      if (!view.popup.visible) {
        view.popup.visible = true;
      }
      
      if (!view.popup.docked && !isMobile) {
        view.popup.dock("top-left");
      }
    }, 200);
  };
  
  // Toggle mobile filters panel
  const toggleMobileFilters = () => {
    setMobileFiltersOpen(!mobileFiltersOpen);
  };

  return (
    <Box sx={{ position: "relative", width: "100%", height: "100vh", overflow: "hidden", display: "flex" }}>
      {/* Map Container */}
      <Box
        sx={{
          flexGrow: 1,
          height: "100%",
          width: isMobile ? "100%" : "80%",
          position: "relative"
        }}
      >
        <div ref={mapDiv} style={{ width: "100%", height: "100%" }}></div>
        
        {/* Main Toolbar */}
        <Paper 
          elevation={3}
          sx={{
            position: "absolute",
            top: 16,
            left: 16,
            zIndex: 1000,
            borderRadius: 2,
            p: 0.5,
            display: "flex",
            flexDirection: "row",
            gap: 1
          }}
        >
          <Button
            variant="contained"
            startIcon={<MyLocationIcon />}
            onClick={getUserLocation}
            sx={{
              backgroundColor: "#002855",
              color: "white",
              '&:hover': { backgroundColor: "#a00000" },
            }}
            disabled={loading || !arcgis}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : "Find Near Me"}
          </Button>
          
          {isMobile && (
            <Button
              variant="contained"
              startIcon={<FilterListIcon />}
              onClick={toggleMobileFilters}
              sx={{
                backgroundColor: "#333",
                color: "white",
                '&:hover': { backgroundColor: "#555" },
              }}
            >
              Filters
              {nearbyResults.length > 0 && (
                <span style={{
                  marginLeft: '8px',
                  background: '#4285F4',
                  borderRadius: '50%',
                  padding: '2px 8px',
                  fontSize: '0.8rem'
                }}>
                  {nearbyResults.length}
                </span>
              )}
            </Button>
          )}
        </Paper>
        
        {/* Notification */}
        <Fade in={notification !== null}>
          <Alert 
            severity={notification?.severity || "info"}
            sx={{
              position: "absolute",
              top: 80,
              left: "50%",
              transform: "translateX(-50%)",
              zIndex: 2000,
              width: "90%",
              maxWidth: 500,
              boxShadow: 3
            }}
            onClose={() => setNotification(null)}
          >
            {notification?.message}
          </Alert>
        </Fade>
        
        {/* Loading overlay */}
        {!arcgis && (
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "rgba(255, 255, 255, 0.7)",
              zIndex: 1000
            }}
          >
            <Box sx={{ textAlign: "center" }}>
              <CircularProgress size={60} />
              <Typography variant="h6" sx={{ mt: 2 }}>
                Loading Map...
              </Typography>
            </Box>
          </Box>
        )}
      </Box>
      
      {/* Fixed Filter Panel - desktop only */}
      {!isMobile && (
        <Paper
          elevation={3}
          sx={{
            width: "20%",
            maxWidth: 350,
            height: "100%",
            overflowY: "auto",
            p: 2,
            borderLeft: `1px solid ${theme.palette.divider}`,
            display: "flex",
            flexDirection: "column"
          }}
        >
          <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
            Assistance Resources
          </Typography>
          
          {/* Filters Section */}
          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: "bold" }}>
              Resource Types
            </Typography>
            
            <Grid container spacing={1} sx={{ mb: 1 }}>
              {Object.entries(categoryStyles).map(([category, style]) => (
                <Grid item xs={12} key={category}>
                  <Chip
                    icon={React.cloneElement(style.icon, { style: { color: activeCategories.includes(category) ? '#fff' : style.color } })}
                    label={category}
                    onClick={() => toggleCategory(category)}
                    color={activeCategories.includes(category) ? "primary" : "default"}
                    sx={{ 
                      width: "100%",
                      backgroundColor: activeCategories.includes(category) ? style.color : undefined,
                      "& .MuiChip-label": {
                        color: activeCategories.includes(category) ? '#fff' : undefined
                      }
                    }}
                  />
                </Grid>
              ))}
            </Grid>
            
            <Box sx={{ display: "flex", justifyContent: "space-between", mt: 1 }}>
              <Button size="small" onClick={selectAllCategories}>Select All</Button>
              <Button size="small" onClick={clearAllCategories}>Clear All</Button>
            </Box>
          </Box>
          
          <Divider sx={{ mb: 2 }} />
          
          {/* Results Section */}
          <Box sx={{ flexGrow: 1, overflowY: "auto" }}>
            <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: "bold" }}>
              {nearbyResults.length > 0 
                ? `Nearby Resources (${nearbyResults.length})`
                : userLocation 
                  ? "No resources found nearby" 
                  : "Find resources near you"
              }
            </Typography>
            
            {nearbyResults.length === 0 && userLocation && (
              <Alert severity="info" sx={{ mb: 2 }}>
                No assistance resources found within 10km. Try adjusting your filters or location.
              </Alert>
            )}
            
            {!userLocation && (
              <Alert severity="info" sx={{ mb: 2 }}>
                Click "Find Near Me" to locate assistance resources in your area.
              </Alert>
            )}
            
            <List>
              {nearbyResults
                .filter(result => activeCategories.includes(result.category))
                .sort((a, b) => parseFloat(a.distance) - parseFloat(b.distance))
                .map((result, index) => (
                  <ListItem 
                    key={`${result.id}-${index}`}
                    button
                    onClick={() => zoomToLocation(result)}
                    sx={{ 
                      mb: 1, 
                      borderRadius: 1,
                      border: "1px solid #eee",
                      "&:hover": { backgroundColor: "#f5f5f5" }
                    }}
                  >
                    <ListItemIcon>
                      <Box
                        sx={{
                          width: 40,
                          height: 40,
                          borderRadius: "50%",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          color: "white",
                          backgroundColor: categoryStyles[result.category]?.color || "#999"
                        }}
                      >
                        {categoryStyles[result.category]?.icon}
                      </Box>
                    </ListItemIcon>
                    <ListItemText 
                      primary={result.name}
                      secondary={
                        <>
                          <Typography variant="body2" component="span" sx={{ display: "block" }}>
                            {result.address}
                          </Typography>
                          <Typography variant="body2" component="span" sx={{ display: "block" }}>
                            {result.hours}
                          </Typography>
                          <Chip 
                            size="small" 
                            label={`${result.distance} miles`} 
                            icon={<NearMeIcon fontSize="small" />}
                            sx={{ mt: 1, fontSize: "0.75rem" }}
                          />
                        </>
                      }
                    />
                  </ListItem>
                ))
              }
            </List>
          </Box>
        </Paper>
      )}
      
      {/* Mobile bottom sheet */}
      {isMobile && (
        <Paper
          elevation={4}
          sx={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: mobileFiltersOpen ? "70%" : "30%",
            borderTopLeftRadius: 16,
            borderTopRightRadius: 16,
            padding: 2,
            overflowY: "auto",
            zIndex: 1000,
            transition: "height 0.3s ease-in-out"
          }}
        >
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
            <Typography variant="h6" component="h2">
              Assistance Resources
            </Typography>
            
            <IconButton onClick={toggleMobileFilters}>
              {mobileFiltersOpen ? <CloseIcon /> : <FilterListIcon />}
            </IconButton>
          </Box>
          
          {/* Filters Section - only show when expanded */}
          {mobileFiltersOpen && (
            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: "bold" }}>
                Resource Types
              </Typography>
              
              <Grid container spacing={1} sx={{ mb: 1 }}>
                {Object.entries(categoryStyles).map(([category, style]) => (
                  <Grid item xs={6} key={category}>
                    <Chip
                      icon={React.cloneElement(style.icon, { style: { color: activeCategories.includes(category) ? '#fff' : style.color } })}
                      label={category}
                      onClick={() => toggleCategory(category)}
                      color={activeCategories.includes(category) ? "primary" : "default"}
                      sx={{ 
                        width: "100%",
                        backgroundColor: activeCategories.includes(category) ? style.color : undefined,
                        "& .MuiChip-label": {
                          color: activeCategories.includes(category) ? '#fff' : undefined
                        }
                      }}
                    />
                  </Grid>
                ))}
              </Grid>
              
              <Box sx={{ display: "flex", justifyContent: "space-between", mt: 1 }}>
                <Button size="small" onClick={selectAllCategories}>Select All</Button>
                <Button size="small" onClick={clearAllCategories}>Clear All</Button>
              </Box>
              
              <Divider sx={{ my: 2 }} />
            </Box>
          )}
          
          {/* Results Section Summary */}
          <Box>
            <Typography variant="subtitle1" gutterBottom>
              {nearbyResults.length > 0 
                ? `${nearbyResults.filter(result => {
                    return activeCategories.includes(result.category);
                  }).length} resources found`
                : "No results"
              }
            </Typography>
            
            {/* Show results list on mobile when filters are open */}
            {mobileFiltersOpen && nearbyResults.length > 0 && (
              <List sx={{ maxHeight: "calc(100vh - 300px)", overflowY: "auto" }}>
                {nearbyResults
                  .filter(result => {
                    return activeCategories.includes(result.category);
                  })
                  .sort((a, b) => parseFloat(a.distance) - parseFloat(b.distance))
                  .map((result, index) => (
                    <ListItem 
                      key={`${result.id}-${index}`}
                      button
                      onClick={() => {
                        zoomToLocation(result);
                        setMobileFiltersOpen(false);
                      }}
                      sx={{ 
                        mb: 1, 
                        borderRadius: 1,
                        border: "1px solid #eee",
                        "&:hover": { backgroundColor: "#f5f5f5" }
                      }}
                    >
                      <ListItemIcon>
                        <Box
                          sx={{
                            width: 40,
                            height: 40,
                            borderRadius: "50%",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            color: "white",
                            backgroundColor: categoryStyles[result.category]?.color || "#999"
                          }}
                        >
                          {categoryStyles[result.category]?.icon}
                        </Box>
                      </ListItemIcon>
                      <ListItemText 
                        primary={result.name}
                        secondary={
                          <>
                            <Typography variant="body2" component="span" sx={{ display: "block" }}>
                              {result.address}
                            </Typography>
                            <Chip 
                              size="small" 
                              label={`${result.distance} miles`} 
                              icon={<NearMeIcon fontSize="small" />}
                              sx={{ mt: 1, fontSize: "0.75rem" }}
                            />
                          </>
                        }
                      />
                    </ListItem>
                  ))
                }
              </List>
            )}
            
            {!userLocation && (
              <Alert severity="info" sx={{ mt: 2 }}>
                Click "Find Near Me" to locate assistance resources in your area.
              </Alert>
            )}
          </Box>
        </Paper>
      )}
      
      {/* Details Dialog */}
      <Dialog 
        open={detailsDialogOpen} 
        onClose={() => setDetailsDialogOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        {selectedLocation && (
          <>
            <DialogTitle>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Typography variant="h6">{selectedLocation.name}</Typography>
                <IconButton onClick={() => setDetailsDialogOpen(false)}>
                  <CloseIcon />
                </IconButton>
              </Box>
            </DialogTitle>
            <DialogContent dividers>
              <Chip 
                icon={categoryStyles[selectedLocation.type]?.icon}
                label={selectedLocation.type}
                sx={{ 
                  mb: 2, 
                  backgroundColor: categoryStyles[selectedLocation.type]?.color,
                  color: "#fff"
                }}
              />
              
              <Typography variant="body1" gutterBottom>
                <strong>Address:</strong> {selectedLocation.address}
              </Typography>
              
              <Typography variant="body1" gutterBottom>
                <strong>Hours:</strong> {selectedLocation.hours}
              </Typography>
              
              <Typography variant="body1" gutterBottom>
                <strong>Phone:</strong> {selectedLocation.phone}
              </Typography>
              
              {selectedLocation.website && (
                <Typography variant="body1" gutterBottom>
                  <strong>Website:</strong>{" "}
                  <a href={selectedLocation.website} target="_blank" rel="noopener noreferrer">
                    {selectedLocation.website}
                  </a>
                </Typography>
              )}
              
              <Typography variant="body1" gutterBottom>
                <strong>Services:</strong> {selectedLocation.services}
              </Typography>
            </DialogContent>
            <DialogActions>
              <Button
                variant="contained"
                startIcon={<DirectionsIcon />}
                onClick={() => window.open(`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(selectedLocation.address)}`, "_blank")}
                sx={{ backgroundColor: "#0F9D58", "&:hover": { backgroundColor: "#0B8043" } }}
              >
                Get Directions
              </Button>
              
              <Button
                variant="text"
                onClick={() => setDetailsDialogOpen(false)}
              >
                Close
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Box>
  );
};

export default AssistanceMap;