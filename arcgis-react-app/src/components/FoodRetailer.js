import React, { useEffect, useRef, useState, useCallback } from "react";
import esriConfig from "@arcgis/core/config";
import Map from "@arcgis/core/Map";
import MapView from "@arcgis/core/views/MapView";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import UniqueValueRenderer from "@arcgis/core/renderers/UniqueValueRenderer";
import {
  Box,
  Typography,
  Grid,
  Button,
  IconButton,
  Switch,
  FormControlLabel,
  Card,
  CardContent,
  CardHeader,
  Chip,
  Divider,
  Paper,
  Tooltip,
  Fade,
  Badge
} from "@mui/material";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import LocalGroceryStoreIcon from "@mui/icons-material/LocalGroceryStore";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import LocalConvenienceStoreIcon from "@mui/icons-material/LocalConvenienceStore";
import StorefrontIcon from "@mui/icons-material/Storefront";
import BusinessIcon from "@mui/icons-material/Business";
import CloseIcon from "@mui/icons-material/Close";
import StoreIcon from "@mui/icons-material/Store";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import NearMeIcon from "@mui/icons-material/NearMe";
import FilterListIcon from "@mui/icons-material/FilterList";
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

const categoryStyles = {
  Grocery: { color: "#002855", textColor: "#ffffff", icon: <LocalGroceryStoreIcon /> }, // wvu-blue
  "Farmers Market": { color: "#9DDAE6", textColor: "#1C2B39", icon: <ShoppingBasketIcon /> }, // wvu-accent--blue-light
  Convenience: { color: "#EAAA00", textColor: "#1C2B39", icon: <LocalConvenienceStoreIcon /> }, // wvu-accent--blue
  "Small Box": { color: "#554741", textColor: "#ffffff", icon: <StorefrontIcon /> }, // warm-gray-dark
  Specialty: { color: "#F58672", textColor: "#1C2B39", icon: <BusinessIcon /> }, // sunset
  "Big Box": { color: "#7F6310", textColor: "#ffffff", icon: <BusinessIcon /> }, // old-gold
};

const FoodRetailer = () => {
  const mapDiv = useRef(null);
  const [view, setView] = useState(null);
  const [activeCategories, setActiveCategories] = useState(Object.keys(categoryStyles));
  const [filterWIC, setFilterWIC] = useState(false);
  const [filterFreshProduce, setFilterFreshProduce] = useState(false);
  const [userLocation, setUserLocation] = useState(null);
  const [popupContent, setPopupContent] = useState(null);
  const [visibleFeatures, setVisibleFeatures] = useState([]);
  const [isFilterOpen, setIsFilterOpen] = useState(true);
  const [activeFilters, setActiveFilters] = useState(0);
  
  // New state for keyboard navigation
  const [focusedPoiIndex, setFocusedPoiIndex] = useState(-1);
  const [isPoiListVisible, setIsPoiListVisible] = useState(false);
  const [isHelpVisible, setIsHelpVisible] = useState(false);

  // Calculate number of active filters
  useEffect(() => {
    let count = 0;
    if (activeCategories.length < Object.keys(categoryStyles).length) count += 1;
    if (filterWIC) count += 1;
    if (filterFreshProduce) count += 1;
    setActiveFilters(count);
  }, [activeCategories, filterWIC, filterFreshProduce]);

  // Memoize handler functions to prevent unnecessary rerenders
  const toggleCategory = useCallback((category) => {
    setActiveCategories((prev) => 
      prev.includes(category) ? 
        prev.filter(cat => cat !== category) : 
        [...prev, category]
    );
  }, []);

  const getUserLocation = useCallback(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation({ latitude, longitude });

        if (view) {
          view.goTo({
            center: [longitude, latitude],
            zoom: 12,
          }, {
            duration: 1000,
            easing: "ease-in-out"
          });
        }
      },
      (error) => {
        console.error("Error getting user location:", error);
      }
    );
  }, [view]);

  const showNearby = useCallback(async () => {
    if (!userLocation || !view) return;

    const retailerLayer = view.map.findLayerById("retailerLayer");
    if (retailerLayer) {
      const query = retailerLayer.createQuery();
      query.geometry = {
        type: "point",
        longitude: userLocation.longitude,
        latitude: userLocation.latitude,
      };
      query.distance = 50000; // 50 km radius
      query.units = "meters";
      query.spatialRelationship = "intersects";
      query.outFields = ["*"];

      try {
        const results = await retailerLayer.queryFeatures(query);
        console.log("Nearby retailers:", results.features);
      } catch (error) {
        console.error("Error querying nearby features:", error);
      }
    }
  }, [userLocation, view]);

  // Handle keyboard navigation
  const handleKeyDown = useCallback((e) => {
    // Only handle keyboard navigation when POI list is visible
    if (!isPoiListVisible || visibleFeatures.length === 0) return;
    
    switch (e.key) {
      case 'ArrowRight':
      case 'Tab':
        if (e.key === 'Tab' && !e.shiftKey) {
          e.preventDefault(); // Prevent default tab behavior
          setFocusedPoiIndex(prev => 
            prev >= visibleFeatures.length - 1 ? 0 : prev + 1
          );
        } else if (e.key === 'ArrowRight') {
          setFocusedPoiIndex(prev => 
            prev >= visibleFeatures.length - 1 ? 0 : prev + 1
          );
        }
        break;
      case 'ArrowLeft':
        if (e.key === 'Tab' && e.shiftKey) {
          e.preventDefault(); // Prevent default shift+tab behavior
          setFocusedPoiIndex(prev => 
            prev <= 0 ? visibleFeatures.length - 1 : prev - 1
          );
        } else if (e.key === 'ArrowLeft') {
          setFocusedPoiIndex(prev => 
            prev <= 0 ? visibleFeatures.length - 1 : prev - 1
          );
        }
        break;
      case 'Enter':
      case ' ':
        // Show popup for the selected POI
        if (focusedPoiIndex >= 0 && focusedPoiIndex < visibleFeatures.length) {
          const feature = visibleFeatures[focusedPoiIndex];
          const attributes = feature.attributes || {};
          setPopupContent({
            title: attributes.Store_Name || "No Name Available",
            category: attributes.Retail_Category || "N/A",
            address: attributes.Address || "N/A",
            city: attributes.City || "N/A",
            state: attributes.State || "N/A",
            zip: attributes.Zip || "N/A",
            freshProduce: attributes.Fresh_Produce === "Yes",
            snap: attributes.SNAP === "Yes",
            wic: attributes.WIC === "Yes"
          });
          e.preventDefault(); // Prevent default space behavior (scroll)
        }
        break;
      case 'Escape':
        // Exit POI navigation mode
        setIsPoiListVisible(false);
        setFocusedPoiIndex(-1);
        e.preventDefault();
        break;
      default:
        break;
    }
  }, [isPoiListVisible, visibleFeatures, focusedPoiIndex]);

  // Initialize map
  useEffect(() => {
    if (!mapDiv.current) return;

    // Set API key
    esriConfig.apiKey = process.env.REACT_APP_ARCGIS_API_KEY;

    const map = new Map({
      basemap: "arcgis-navigation",
    });

    const retailerLayer = new FeatureLayer({
      portalItem: { id: "a6ff9a5145eb47f6aadc08170fc53bd5" },
      id: "retailerLayer",
      outFields: ["*"],
      renderer: new UniqueValueRenderer({
        field: "Retail_Category",
        uniqueValueInfos: Object.entries(categoryStyles).map(([category, style]) => ({
          value: category,
          symbol: {
            type: "simple-marker",
            color: style.color,
            size: 10,
            outline: { color: "#ffffff", width: 1.5 },
          },
        })),
        defaultSymbol: {
          type: "simple-marker",
          color: "#cccccc",
          size: 8,
          outline: { color: "#ffffff", width: 1 },
        },
      }),
    });
    
    map.add(retailerLayer);

    const mapView = new MapView({
      container: mapDiv.current,
      map: map,
      center: [-80.39, 39.10],
      zoom: 7,
      padding: {
        left: 300, // Make room for filter panel
      },
      constraints: {
        snapToZoom: false,
      },
      ui: {
        components: ["zoom", "compass", "attribution"]
      }
    });

    mapView.when(() => {
      setView(mapView);
      mapView.navigation.mouseWheelZoomEnabled = false;
    }).catch(err => {
      console.error("Error initializing map view:", err);
    });

    // Clean up function
    return () => {
      if (mapView) {
        try {
          mapView.map.removeAll();
          mapView.destroy();
        } catch (error) {
          console.error("Error cleaning up map view:", error);
        }
      }
    };
  }, []);

  // Add click handler to map view
  useEffect(() => {
    if (!view) return;
    
    const clickHandler = view.on("click", (event) => {
      view.hitTest(event).then((response) => {
        if (response.results.length) {
          const graphic = response.results[0].graphic;
          
          const attributes = graphic.attributes || {};
          setPopupContent({
            title: attributes.Store_Name || "No Name Available",
            category: attributes.Retail_Category || "N/A",
            address: attributes.Address || "N/A",
            city: attributes.City || "N/A",
            state: attributes.State || "N/A",
            zip: attributes.Zip || "N/A",
            freshProduce: attributes.Fresh_Produce === "Yes",
            snap: attributes.SNAP === "Yes",
            wic: attributes.WIC === "Yes"
          });
        } else {
          setPopupContent(null);
        }
      });
    });
    
    // Return cleanup function
    return () => {
      clickHandler.remove();
    };
  }, [view]);

  // Update layer filtering
  useEffect(() => {
    if (!view) return;
    
    const retailerLayer = view.map.findLayerById("retailerLayer");
    if (retailerLayer) {
      // Only apply filter if there are active categories
      if (activeCategories.length === 0) {
        retailerLayer.definitionExpression = "1=0"; // Show nothing if no categories selected
        setVisibleFeatures([]);
        return;
      }
      
      const categoryExpression = activeCategories.length === Object.keys(categoryStyles).length ? 
        null : // Don't filter if all categories are selected
        `Retail_Category IN (${activeCategories.map((cat) => `'${cat}'`).join(",")})`;
        
      const wicExpression = filterWIC ? "WIC = 'Yes'" : null;
      const freshProduceExpression = filterFreshProduce ? "Fresh_Produce = 'Yes'" : null;
      
      const definitionExpression = [categoryExpression, wicExpression, freshProduceExpression]
        .filter(Boolean)
        .join(" AND ");

      retailerLayer.definitionExpression = definitionExpression;

      // Query features after filter is applied to update accessible list
      retailerLayer.queryFeatures({
        where: definitionExpression || "1=1",
        outFields: ["*"],
        returnGeometry: true // Changed to true to get geometry for highlighting
      }).then((result) => {
        // Reset focused POI index when filters change
        setFocusedPoiIndex(-1);
        setVisibleFeatures(result.features);
      }).catch((error) => {
        console.error("Failed to update visible features for accessibility:", error);
        setVisibleFeatures([]);
      });    
    }
  }, [activeCategories, filterWIC, filterFreshProduce, view]);

  // Effect for global keyboard events
  useEffect(() => {
    const handleGlobalKeyDown = (e) => {
      // Skip if we're in an input field or textarea
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
        return;
      }
      
      if (e.key === 'k' || e.key === 'K') {
        // Toggle keyboard navigation mode
        setIsPoiListVisible(prev => !prev);
        if (!isPoiListVisible && visibleFeatures.length > 0) {
          setFocusedPoiIndex(0);
        }
      } else if (isPoiListVisible) {
        handleKeyDown(e);
      }
    };
    
    window.addEventListener('keydown', handleGlobalKeyDown);
    
    return () => {
      window.removeEventListener('keydown', handleGlobalKeyDown);
    };
  }, [handleKeyDown, isPoiListVisible, visibleFeatures]);

  // Add effect to highlight focused POI on the map
  useEffect(() => {
    if (!view || focusedPoiIndex < 0 || focusedPoiIndex >= visibleFeatures.length) return;
    
    const retailerLayer = view.map.findLayerById("retailerLayer");
    if (!retailerLayer) return;
    
    // Clear any existing highlights
    if (view.graphics && typeof view.graphics.removeAll === 'function') {
      view.graphics.removeAll();
    }
    
    const focusedFeature = visibleFeatures[focusedPoiIndex];
    if (!focusedFeature) return;
    
    const attributes = focusedFeature.attributes || {};
    
    try {
      // Center the map on the focused POI with error handling
      if (focusedFeature.geometry) {
        view.goTo({
          target: focusedFeature.geometry,
          zoom: view.zoom // Maintain current zoom level
        }, {
          duration: 500,
          easing: "ease-in-out"
        }).catch(err => {
          // Silently handle any navigation errors
          console.debug("Map navigation was interrupted", err);
        });
      }
      
      // Create a highlight graphic
      const category = attributes.Retail_Category || "N/A";
      const color = categoryStyles[category]?.color || "#cccccc";
      
      if (view.graphics && typeof view.graphics.add === 'function') {
        const highlightGraphic = {
          geometry: focusedFeature.geometry,
          symbol: {
            type: "simple-marker",
            color: color,
            size: 16,
            outline: {
              color: "#ffffff",
              width: 3
            }
          }
        };
        
        view.graphics.add(highlightGraphic);
      }
      
      // Show details for the feature instead of using popup
      // This avoids using the problematic popup.open method
      if (focusedFeature.geometry) {
        // Instead of using popup, we'll just update our state to show the details card
        const poiData = {
          title: attributes.Store_Name || "No Name Available",
          category: attributes.Retail_Category || "N/A",
          address: attributes.Address || "N/A",
          city: attributes.City || "N/A",
          state: attributes.State || "N/A",
          zip: attributes.Zip || "N/A",
          freshProduce: attributes.Fresh_Produce === "Yes",
          snap: attributes.SNAP === "Yes",
          wic: attributes.WIC === "Yes"
        };
        
        // Only update popup content if Enter is pressed or explicit selection is made
        // This prevents every navigation from triggering a popup
        // We'll update this in the handleKeyDown function instead
      }
    } catch (error) {
      console.error("Error highlighting POI:", error);
    }
    
  }, [view, focusedPoiIndex, visibleFeatures, categoryStyles]);

  return (
    <Box sx={{ position: "relative", width: "100%", height: "85vh", overflow: "hidden" }}>
      {/* Skip link for keyboard accessibility */}
      <Button
        sx={{
          position: 'absolute',
          left: '0',
          top: '-100px',
          zIndex: 1500,
          '&:focus': {
            top: '0',
            left: '0',
            backgroundColor: 'white',
          },
        }}
        variant="contained"
        onClick={() => {
          // Find the next focusable element after the map and focus it
          const focusableElements = document.querySelectorAll('a[href], button, input, select, textarea, [tabindex]:not([tabindex="-1"])');
          let foundMap = false;
          for (let i = 0; i < focusableElements.length; i++) {
            if (foundMap) {
              focusableElements[i].focus();
              break;
            }
            if (focusableElements[i] === mapDiv.current) {
              foundMap = true;
            }
          }
        }}
      >
        Skip Map Navigation
      </Button>
      
      {/* Map container */}
      <div
        ref={mapDiv}
        style={{ width: "100%", height: "100%" }}
        tabIndex={0}
        aria-label="Interactive map showing locations of food retailers. Press 'K' to enter keyboard navigation mode, Tab to navigate away from map."
        onKeyDown={(e) => {
          // Global keyboard shortcuts
          if (e.key === 'k' || e.key === 'K') {
            // Toggle keyboard navigation mode
            setIsPoiListVisible(prev => !prev);
            if (!isPoiListVisible && visibleFeatures.length > 0) {
              setFocusedPoiIndex(0);
            }
            e.preventDefault();
          } else if (e.key === 'Tab' && !isPoiListVisible) {
            // Allow Tab navigation out of the map when not in POI navigation mode
            // The default behavior will work
          } else {
            handleKeyDown(e);
          }
        }}
        onFocus={() => {
          if (view) view.focus();
        }}
      ></div>

      {/* ARIA live region for screen reader announcements */}
      <div
        aria-live="polite"
        className="sr-only"
        style={{ position: 'absolute', width: '1px', height: '1px', overflow: 'hidden' }}
      >
        {isPoiListVisible && focusedPoiIndex >= 0 && focusedPoiIndex < visibleFeatures.length && (
          <span>
            {`Now focusing on ${visibleFeatures[focusedPoiIndex].attributes.Store_Name || "Unknown Location"}, 
            ${visibleFeatures[focusedPoiIndex].attributes.Address || ""}, 
            ${visibleFeatures[focusedPoiIndex].attributes.City || ""}. 
            Item ${focusedPoiIndex + 1} of ${visibleFeatures.length}.`}
          </span>
        )}
      </div>

      {/* Store details popup */}
      {popupContent && (
        <Fade in>
          <Card
            elevation={5}
            tabIndex={0}
            role="dialog"
            aria-modal="true"
            aria-labelledby="store-details-title"
            aria-describedby="store-details-description"
            onKeyDown={(e) => {
              if (e.key === "Escape") {
                setPopupContent(null);
              }
            }}
            sx={{
              position: "absolute",
              top: 20,
              right: 20,
              width: 320,
              borderRadius: 2,
              overflow: "visible",
              zIndex: 1000,
              backgroundColor: "rgba(255, 255, 255, 0.97)",
            }}
          >
            <CardHeader
              id="store-details-title"
              title={
                <Typography variant="h6" noWrap title={popupContent.title}>
                  {popupContent.title}
                </Typography>
              }
              subheader={
                <Chip 
                  icon={categoryStyles[popupContent.category]?.icon || <StoreIcon />}
                  label={popupContent.category}
                  size="small"
                  sx={{ 
                    backgroundColor: categoryStyles[popupContent.category]?.color || "#757575",
                    color: "white",
                    mt: 0.5
                  }}
                />
              }
              action={
                <IconButton 
                  onClick={() => setPopupContent(null)}
                  aria-label="Close details"
                >
                  <CloseIcon />
                </IconButton>
              }
            />
            <Divider />
            <CardContent id="store-details-description">
              <Typography variant="body2" gutterBottom>
                {popupContent.address}<br />
                {popupContent.city}, {popupContent.state} {popupContent.zip}
              </Typography>
              
              <Grid container spacing={1} sx={{ mt: 1 }}>
                <Grid item xs={12}>
                  <Chip
                    icon={popupContent.freshProduce ? <CheckCircleIcon /> : <CancelIcon />}
                    label="Fresh Produce"
                    size="small"
                    color={popupContent.freshProduce ? "success" : "default"}
                    variant={popupContent.freshProduce ? "filled" : "outlined"}
                    sx={{ mr: 1, mb: 1 }}
                  />
                  
                  <Chip
                    icon={popupContent.snap ? <CheckCircleIcon /> : <CancelIcon />}
                    label="SNAP"
                    size="small"
                    color={popupContent.snap ? "success" : "default"}
                    variant={popupContent.snap ? "filled" : "outlined"}
                    sx={{ mr: 1, mb: 1 }}
                  />
                  
                  <Chip
                    icon={popupContent.wic ? <CheckCircleIcon /> : <CancelIcon />}
                    label="WIC"
                    size="small"
                    color={popupContent.wic ? "success" : "default"}
                    variant={popupContent.wic ? "filled" : "outlined"}
                    sx={{ mb: 1 }}
                  />
                </Grid>
              </Grid>
              
              <Button 
                variant="outlined" 
                fullWidth
                startIcon={<NearMeIcon />}
                sx={{ mt: 1 }}
                onClick={() => {
                  window.open(`https://maps.google.com/?q=${popupContent.address}, ${popupContent.city}, ${popupContent.state} ${popupContent.zip}`, '_blank');
                }}
              >
                Directions
              </Button>
            </CardContent>
          </Card>
        </Fade>
      )}

      {/* Keyboard Navigation Panel */}
      {isPoiListVisible && visibleFeatures.length > 0 && (
        <Paper
          elevation={4}
          sx={{
            position: "absolute",
            bottom: 20,
            left: "50%",
            transform: "translateX(-50%)",
            width: "auto",
            maxWidth: "90%",
            p: 2,
            zIndex: 1000,
            backgroundColor: "rgba(255, 255, 255, 0.97)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
          }}
        >
          <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
            Keyboard Navigation ({focusedPoiIndex >= 0 ? focusedPoiIndex + 1 : 0} of {visibleFeatures.length})
          </Typography>
          
          <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
            <Button 
              onClick={() => setFocusedPoiIndex(prev => prev <= 0 ? visibleFeatures.length - 1 : prev - 1)}
              startIcon={<KeyboardArrowLeftIcon />}
              variant="outlined"
              size="small"
              sx={{ mr: 1 }}
            >
              Previous
            </Button>
            
            <Typography variant="body2" sx={{ mx: 2 }}>
              {focusedPoiIndex >= 0 && focusedPoiIndex < visibleFeatures.length ? 
                visibleFeatures[focusedPoiIndex].attributes.Store_Name || "Unknown Location" :
                "No location selected"}
            </Typography>
            
            <Button 
              onClick={() => setFocusedPoiIndex(prev => prev >= visibleFeatures.length - 1 ? 0 : prev + 1)}
              endIcon={<KeyboardArrowRightIcon />}
              variant="outlined"
              size="small"
              sx={{ ml: 1 }}
            >
              Next
            </Button>
          </Box>
          
          <Typography variant="caption" color="text.secondary">
            Use ← → arrow keys to navigate • Enter to select • Esc to exit navigation mode
          </Typography>
        </Paper>
      )}

      {/* Filter panel */}
      <Paper
        elevation={4}
        sx={{
          position: "absolute",
          top: 0,
          left: isFilterOpen ? 0 : -280,
          height: "100%",
          width: 280,
          borderRadius: 0,
          transition: "left 0.3s ease",
          overflow: "auto",
          zIndex: 1000,
          backgroundColor: "rgba(255, 255, 255, 0.97)"
        }}
      >
        <Box sx={{ p: 2, pb: 1 }}>
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            Food Retailers
          </Typography>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            Explore food access options in your area
          </Typography>
          <Divider sx={{ my: 1 }} />
        </Box>

        <Box sx={{ p: 2 }}>
          <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
            Retailer Type
          </Typography>

          <Grid container spacing={1} sx={{ mb: 2 }}>
            {Object.entries(categoryStyles).map(([category, style]) => (
              <Grid item xs={6} key={category}>
                <Tooltip title={category} placement="top">
                  <Button
                    onClick={() => toggleCategory(category)}
                    variant={activeCategories.includes(category) ? "contained" : "outlined"}
                    startIcon={style.icon}
                    size="small"
                    fullWidth
                    sx={{
                      backgroundColor: activeCategories.includes(category) ? style.color : "transparent",
                      borderColor: style.color,
                      color: activeCategories.includes(category) ? style.textColor : style.color,
                      justifyContent: "flex-start",
                      textTransform: "none",
                      mb: 1,
                      '&:hover': {
                        backgroundColor: activeCategories.includes(category) 
                          ? style.color 
                          : `${style.color}22`
                      }
                    }}
                  >
                    {category.length > 10 ? `${category.substring(0, 9)}...` : category}
                  </Button>
                </Tooltip>
              </Grid>
            ))}
          </Grid>

          <Divider sx={{ my: 2 }} />
          
          <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
            Food Access Options
          </Typography>
          
          <FormControlLabel
            control={
              <Switch
                checked={filterWIC}
                onChange={() => setFilterWIC((prev) => !prev)}
                color="primary"
              />
            }
            label={<Typography variant="body2">WIC Accepted</Typography>}
            sx={{ display: "block", mb: 1 }}
          />

          <FormControlLabel
            control={
              <Switch
                checked={filterFreshProduce}
                onChange={() => setFilterFreshProduce((prev) => !prev)}
                color="success"
              />
            }
            label={<Typography variant="body2">Fresh Produce Available</Typography>}
            sx={{ display: "block" }}
          />
        </Box>
        
        <Box sx={{ p: 2, pt: 0 }}>
          <Divider sx={{ my: 2 }} />
          <Button
            variant="contained"
            startIcon={<MyLocationIcon />}
            onClick={getUserLocation}
            fullWidth
            color="primary"
            sx={{ mb: 1 }}
          >
            Find My Location
          </Button>
          
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={() => {
              setIsPoiListVisible(true);
              if (visibleFeatures.length > 0) {
                setFocusedPoiIndex(0);
              }
            }}
            sx={{ mt: 1 }}
          >
            Enter Keyboard Navigation Mode
          </Button>
        </Box>
      </Paper>

      {/* Toggle filter panel button */}
      <Tooltip title={isFilterOpen ? "Hide Filters" : "Show Filters"}>
        <IconButton
          onClick={() => setIsFilterOpen(prev => !prev)}
          sx={{
            position: "absolute",
            left: isFilterOpen ? 280 : 0,
            top: "50%",
            transform: "translateY(-50%)",
            backgroundColor: "white",
            border: "1px solid #ddd",
            borderRadius: isFilterOpen ? "0 4px 4px 0" : "0 4px 4px 0",
            zIndex: 1001,
            transition: "left 0.3s ease",
            "&:hover": {
              backgroundColor: "#f5f5f5"
            }
          }}
        >
          <Badge badgeContent={activeFilters} color="primary" invisible={activeFilters === 0}>
            <FilterListIcon />
          </Badge>
        </IconButton>
      </Tooltip>

      {/* Help button */}
      <Tooltip title="Keyboard Help">
        <IconButton
          onClick={() => setIsHelpVisible(true)}
          sx={{
            position: "absolute",
            right: 20,
            bottom: 20,
            backgroundColor: "white",
            border: "1px solid #ddd",
            zIndex: 1001,
            "&:hover": {
              backgroundColor: "#f5f5f5"
            }
          }}
        >
          <HelpOutlineIcon />
        </IconButton>
      </Tooltip>

      {/* Help modal */}
      {isHelpVisible && (
        <Paper
          elevation={4}
          role="dialog"
          aria-labelledby="keyboard-help-title"
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            maxWidth: "90%",
            p: 3,
            zIndex: 1500,
            backgroundColor: "white",
          }}
        >
          <Typography id="keyboard-help-title" variant="h6" gutterBottom>
            Keyboard Navigation Help
          </Typography>
          <Box component="ul" sx={{ pl: 2 }}>
            <li><Typography>Press <strong>Enter</strong> to view details of selected point</Typography></li>
            <li><Typography>Press <strong>Esc</strong> to exit navigation mode</Typography></li>
            <li><Typography>Press <strong>Tab</strong> to navigate to the next element on the page</Typography></li>
          </Box>
          <Button 
            variant="contained"
            onClick={() => setIsHelpVisible(false)}
            sx={{ mt: 2 }}
          >
            Close
          </Button>
        </Paper>
      )}

      {/* Hidden accessible list of POIs for screen readers */}
      <Box
        component="ul"
        sx={{
          position: 'absolute',
          left: '-9999px',
          width: '1px',
          height: '1px',
          overflow: 'hidden'
        }}
        aria-label="List of visible food retailers on the map"
      >
        {visibleFeatures.map((feature, i) => {
          const a = feature.attributes || {};
          return (
            <li key={i} tabIndex={0}>
              {a.Store_Name || 'Unknown'}, {a.Address}, {a.City}, {a.State} {a.Zip}.
              Category: {a.Retail_Category || 'N/A'}.
              SNAP: {a.SNAP}, WIC: {a.WIC}, Fresh Produce: {a.Fresh_Produce}
            </li>
          );
        })}
      </Box>
    </Box>
  );
};

export default FoodRetailer;