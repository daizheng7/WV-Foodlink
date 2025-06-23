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
import EmojiFoodBeverageIcon from "@mui/icons-material/EmojiFoodBeverage";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import BackpackIcon from "@mui/icons-material/Backpack";
import LocalDiningIcon from "@mui/icons-material/LocalDining";
import FilterListIcon from "@mui/icons-material/FilterList";
import DirectionsIcon from "@mui/icons-material/Directions";
import NearMeIcon from "@mui/icons-material/NearMe";
import CloseIcon from "@mui/icons-material/Close";

// Dynamically load ArcGIS modules
const loadArcGISModules = () => {
  return new Promise((resolve, reject) => {
    // Load ArcGIS CSS
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://js.arcgis.com/4.26/esri/themes/light/main.css';
    document.head.appendChild(link);

    // Load ArcGIS JS API
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

// Map of layer IDs to category names
const LAYER_ID_TO_CATEGORY = {
  "CharitableFoodPrograms": "Charitable Food Programs",
  "CongregateMealProgram": "Congregate Meal Program",
  "BackpackProgram": "Backpack Program",
  "FoodPantry": "Food Pantry"
};

// Layer portal item IDs
const LAYER_PORTAL_ITEMS = {
  "CharitableFoodPrograms": "d16bf58fe37747849a8536c7870c8d80",
  "CongregateMealProgram": "82a68c3787dc4efaacdf98e00328ebed",
  "BackpackProgram": "bf72aea00c1445cca1356cdcee16aa8a",
  "FoodPantry": "b93e8c7152204bfeac14dc9964bb37df"
};

const categoryStyles = {
  "Charitable Food Programs": {
    color: "#002855",
    icon: <EmojiFoodBeverageIcon />,
    description: "Programs providing food assistance to those in need",
  },
  "Congregate Meal Program": {
    color: "#7F6310",
    icon: <RestaurantIcon />,
    description: "Community meal services for groups of people",
  },
  "Backpack Program": {
    color: "#554741",
    icon: <BackpackIcon />,
    description: "Programs sending food home with children for weekends/holidays",
  },
  "Food Pantry": {
    color: "#0062A3",
    icon: <LocalDiningIcon />,
    description: "Locations distributing groceries to individuals and families",
  },
};

const Charities = () => {
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
  const [selectedCharity, setSelectedCharity] = useState(null);
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
      
      // Add search widget
     
      
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
          
          findNearbyCharities({
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
            setSelectedCharity({
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
        
        // Find nearby charities
        findNearbyCharities({
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
    const earthRadius = 6378.137; // Earth's radius in km
    const points = [];
    
    for (let i = 0; i < pointCount; i++) {
      const angle = (i * 360) / pointCount;
      const dx = radiusInKm / (earthRadius * Math.cos(Math.PI * lat / 180)) * Math.cos(angle * Math.PI / 180);
      const dy = radiusInKm / earthRadius * Math.sin(angle * Math.PI / 180);
      points.push([lon + dx * 180 / Math.PI, lat + dy * 180 / Math.PI]);
    }
    
    // Close the ring
    points.push(points[0]);
    
    return points;
  };
  
  // Find nearby charities
  const findNearbyCharities = async (location) => {
    if (!arcgis || !view || !location || Object.keys(featureLayers).length === 0) return;
    
    setLoading(true);
    
    try {
      const results = await Promise.all(
        Object.entries(featureLayers).map(async ([id, layer]) => {
          const query = layer.createQuery();
          query.geometry = {
            type: "point",
            longitude: location.longitude,
            latitude: location.latitude,
          };
          query.distance = 10000; // 10 kilometers
          query.units = "meters";
          query.spatialRelationship = "intersects";
          query.outFields = ["*"];
          query.orderByFields = ["DISTANCE"];
          query.num = 50; // Limit results
          
          const result = await layer.queryFeatures(query);
          return result.features.map(feature => ({
            id: feature.getObjectId(),
            name: feature.attributes.SiteName || "Unnamed Location",
            address: feature.attributes.Address1 || "No address available",
            phone: feature.attributes.Phone_Number || "Not available",
            hours: feature.attributes.Hours_of_Operation || "Not specified",
            distance: feature.attributes.DISTANCE ? 
              (feature.attributes.DISTANCE / 1609.34).toFixed(1) : "Unknown", // Convert meters to miles
            category: id,
            feature: feature
          }));
        })
      );
      
      const flatResults = results.flat();
      setNearbyResults(flatResults);
      
      if (flatResults.length > 0) {
        showNotification(`Found ${flatResults.length} food resources within 10km of your location.`, "success");
      } else {
        showNotification("No food resources found nearby. Try expanding your search.", "info");
      }
    } catch (error) {
      console.error("Error finding nearby charities:", error);
      showNotification("Error searching for nearby food resources.", "error");
    } finally {
      setLoading(false);
    }
  };
  
  // Show notification
  const showNotification = (message, severity = "info") => {
    setNotification({ message, severity });
    setTimeout(() => setNotification(null), 5000);
  };
  
  // Zoom to a specific charity on the map
  const zoomToCharity = (result) => {
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
              '&:hover': { backgroundColor: "white" , color: "#002855"},
              '&:focus-visible': {
      outline: '#002855', // Or any high contrast color
      outlineOffset: '2px',
      backgroundColor: "#002855",
      color: "#002855"
    }
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
  <List>
    {nearbyResults.map((result, index) => (
      <ListItem key={index}>...</ListItem>
    ))}
  </List>
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
            Food Resources
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
                No food resources found within 10km. Try adjusting your filters or location.
              </Alert>
            )}
            
            {!userLocation && (
              <Alert severity="info" sx={{ mb: 2 }}>
                Click "Find Near Me" to locate food resources in your area.
              </Alert>
            )}
            
            <List>
              {nearbyResults
                .filter(result => {
                  const category = LAYER_ID_TO_CATEGORY[result.category];
                  return activeCategories.includes(category);
                })
                .sort((a, b) => parseFloat(a.distance) - parseFloat(b.distance))
                .map((result, index) => {
                  const category = LAYER_ID_TO_CATEGORY[result.category];
                  return (
                    <ListItem 
                      key={`${result.id}-${index}`}
                      button
                      onClick={() => zoomToCharity(result)}
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
                            backgroundColor: categoryStyles[category]?.color || "#999"
                          }}
                        >
                          {categoryStyles[category]?.icon}
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
                  );
                })
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
              Food Resources
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
                    const category = LAYER_ID_TO_CATEGORY[result.category];
                    return activeCategories.includes(category);
                  }).length} resources found`
                : "No results"
              }
            </Typography>
            
            {/* Show results list on mobile when filters are open */}
            {mobileFiltersOpen && nearbyResults.length > 0 && (
              <List sx={{ maxHeight: "calc(100vh - 300px)", overflowY: "auto" }}>
                {nearbyResults
                  .filter(result => {
                    const category = LAYER_ID_TO_CATEGORY[result.category];
                    return activeCategories.includes(category);
                  })
                  .sort((a, b) => parseFloat(a.distance) - parseFloat(b.distance))
                  .map((result, index) => {
                    const category = LAYER_ID_TO_CATEGORY[result.category];
                    return (
                      <ListItem 
                        key={`${result.id}-${index}`}
                        button
                        onClick={() => {
                          zoomToCharity(result);
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
                              backgroundColor: categoryStyles[category]?.color || "#999"
                            }}
                          >
                            {categoryStyles[category]?.icon}
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
                    );
                  })
                }
              </List>
            )}
            
            {!userLocation && (
              <Alert severity="info" sx={{ mt: 2 }}>
                Click "Find Near Me" to locate food resources in your area.
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
        {selectedCharity && (
          <>
            <DialogTitle>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Typography variant="h6">{selectedCharity.name}</Typography>
                <IconButton onClick={() => setDetailsDialogOpen(false)}>
                  <CloseIcon />
                </IconButton>
              </Box>
            </DialogTitle>
            <DialogContent dividers>
              <Chip 
                icon={categoryStyles[LAYER_ID_TO_CATEGORY[selectedCharity.type]]?.icon}
                label={LAYER_ID_TO_CATEGORY[selectedCharity.type]}
                sx={{ 
                  mb: 2, 
                  backgroundColor: categoryStyles[LAYER_ID_TO_CATEGORY[selectedCharity.type]]?.color,
                  color: "#fff"
                }}
              />
              
              <Typography variant="body1" gutterBottom>
                <strong>Address:</strong> {selectedCharity.address}
              </Typography>
              
              <Typography variant="body1" gutterBottom>
                <strong>Hours:</strong> {selectedCharity.hours}
              </Typography>
              
              <Typography variant="body1" gutterBottom>
                <strong>Phone:</strong> {selectedCharity.phone}
              </Typography>
              
              {selectedCharity.website && (
                <Typography variant="body1" gutterBottom>
                  <strong>Website:</strong>{" "}
                  <a href={selectedCharity.website} target="_blank" rel="noopener noreferrer">
                    {selectedCharity.website}
                  </a>
                </Typography>
              )}
              
              <Typography variant="body1" gutterBottom>
                <strong>Services:</strong> {selectedCharity.services}
              </Typography>
            </DialogContent>
            <DialogActions>
              <Button
                variant="contained"
                startIcon={<DirectionsIcon />}
                onClick={() => window.open(`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(selectedCharity.address)}`, "_blank")}
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

export default Charities;