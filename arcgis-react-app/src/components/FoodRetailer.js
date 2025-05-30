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
  const mapViewRef = useRef(null);
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

  // Handle keyboard navigation for POI list
  const handlePoiKeyDown = useCallback((e) => {
    if (!isPoiListVisible || visibleFeatures.length === 0) {
      return;
    }

    // Allow Tab to work normally - don't prevent default
    if (e.key === 'Tab') {
      return;
    }

    const isNavKey = ['ArrowRight', 'ArrowLeft', 'Enter', ' ', 'Escape'].includes(e.key);
    if (!isNavKey) return;

    e.preventDefault();

    if (e.key === 'ArrowRight') {
      setFocusedPoiIndex(prev => prev >= visibleFeatures.length - 1 ? 0 : prev + 1);
    } else if (e.key === 'ArrowLeft') {
      setFocusedPoiIndex(prev => prev <= 0 ? visibleFeatures.length - 1 : prev - 1);
    } else if (e.key === 'Enter' || e.key === ' ') {
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
      }
    } else if (e.key === 'Escape') {
      setIsPoiListVisible(false);
      setFocusedPoiIndex(-1);
    }
  }, [isPoiListVisible, visibleFeatures, focusedPoiIndex]);

  // Global keyboard handler for 'K' key only
  const handleGlobalKeyDown = useCallback((e) => {
    // Skip if we're in an input field or textarea
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
      return;
    }
    
    // Only handle 'K' key globally for POI navigation toggle
    if (e.key === 'k' || e.key === 'K') {
      e.preventDefault();
      setIsPoiListVisible(prev => {
        const newValue = !prev;
        if (newValue && visibleFeatures.length > 0) {
          setFocusedPoiIndex(0);
        } else {
          setFocusedPoiIndex(-1);
        }
        return newValue;
      });
    }
    
    // Handle ESC key globally to exit POI navigation
    if (e.key === 'Escape' && isPoiListVisible) {
      e.preventDefault();
      setIsPoiListVisible(false);
      setFocusedPoiIndex(-1);
    }
  }, [isPoiListVisible, visibleFeatures]);

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
      // Disable all UI components
      ui: {
        components: []
      }
    });

    mapView.when(() => {
      setView(mapView);
      mapViewRef.current = mapView;
      
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
      
      // Add custom zoom controls that are not focusable
      const zoomControls = document.createElement('div');
      zoomControls.style.position = 'absolute';
      zoomControls.style.right = '20px';
      zoomControls.style.top = '20px';
      zoomControls.style.zIndex = '100';
      zoomControls.style.display = 'flex';
      zoomControls.style.flexDirection = 'column';
      zoomControls.style.gap = '5px';
      
      const zoomInBtn = document.createElement('button');
      zoomInBtn.innerHTML = '+';
      zoomInBtn.style.width = '40px';
      zoomInBtn.style.height = '40px';
      zoomInBtn.style.border = '1px solid #ccc';
      zoomInBtn.style.backgroundColor = 'white';
      zoomInBtn.style.cursor = 'pointer';
      zoomInBtn.style.fontSize = '18px';
      zoomInBtn.tabIndex = -1;
      zoomInBtn.setAttribute('aria-hidden', 'true');
      zoomInBtn.onclick = () => mapView.goTo({ zoom: mapView.zoom + 1 });
      
      const zoomOutBtn = document.createElement('button');
      zoomOutBtn.innerHTML = '−';
      zoomOutBtn.style.width = '40px';
      zoomOutBtn.style.height = '40px';
      zoomOutBtn.style.border = '1px solid #ccc';
      zoomOutBtn.style.backgroundColor = 'white';
      zoomOutBtn.style.cursor = 'pointer';
      zoomOutBtn.style.fontSize = '18px';
      zoomOutBtn.tabIndex = -1;
      zoomOutBtn.setAttribute('aria-hidden', 'true');
      zoomOutBtn.onclick = () => mapView.goTo({ zoom: mapView.zoom - 1 });
      
      zoomControls.appendChild(zoomInBtn);
      zoomControls.appendChild(zoomOutBtn);
      mapContainer.appendChild(zoomControls);
      
    }).catch(err => {
      console.error("Error initializing map view:", err);
    });

    // Clean up function
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
        returnGeometry: true
      }).then((result) => {
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
    window.addEventListener('keydown', handleGlobalKeyDown);
    
    return () => {
      window.removeEventListener('keydown', handleGlobalKeyDown);
    };
  }, [handleGlobalKeyDown]);

  // Add effect to highlight focused POI on the map
  useEffect(() => {
    if (!view || focusedPoiIndex < 0 || focusedPoiIndex >= visibleFeatures.length) {
      // Clear highlights when no POI is focused
      if (view && view.graphics) {
        view.graphics.removeAll();
      }
      return;
    }
    
    const retailerLayer = view.map.findLayerById("retailerLayer");
    if (!retailerLayer) return;
    
    // Clear any existing highlights
    if (view.graphics) {
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
          zoom: Math.max(view.zoom, 10) // Ensure minimum zoom level
        }, {
          duration: 500,
          easing: "ease-in-out"
        }).catch(err => {
          console.debug("Map navigation was interrupted", err);
        });
      }
      
      // Create a highlight graphic
      const category = attributes.Retail_Category || "N/A";
      const color = categoryStyles[category]?.color || "#cccccc";
      
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
    } catch (error) {
      console.error("Error highlighting POI:", error);
    }
    
  }, [view, focusedPoiIndex, visibleFeatures]);

  return (
    <Box sx={{ position: "relative", width: "100%", height: "85vh", overflow: "hidden" }}>
      
      {/* Map container */}
      <div
        ref={mapDiv}
        style={{ width: "100%", height: "100%" }}
        aria-label="Interactive map showing locations of food retailers. Press 'K' to enter keyboard navigation mode."
        role="img"
      />

      {/* ARIA live region for screen reader announcements */}
      <div
        aria-live="polite"
        aria-atomic="true"
        style={{ 
          position: 'absolute', 
          left: '-10000px',
          width: '1px', 
          height: '1px', 
          overflow: 'hidden' 
        }}
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
  variant="contained"
  color="primary"
  fullWidth
  startIcon={<NearMeIcon />}
  sx={{ 
    mt: 1,
    color: 'white',
    backgroundColor: 'primary.main',
    '&:hover': {
      backgroundColor: 'white'
    }
  }}
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
          role="dialog"
          aria-labelledby="keyboard-navigation-title"
          aria-describedby="keyboard-navigation-description"
          onKeyDown={handlePoiKeyDown}
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
            alignItems: "center",
            outline: 'none'
          }}
        >
          <Typography id="keyboard-navigation-title" variant="subtitle1" fontWeight="bold" gutterBottom>
            Keyboard Navigation ({focusedPoiIndex >= 0 ? focusedPoiIndex + 1 : 0} of {visibleFeatures.length})
          </Typography>
          
          <Typography id="keyboard-navigation-description" variant="body2" sx={{ mb: 2 }}>
            {focusedPoiIndex >= 0 && focusedPoiIndex < visibleFeatures.length ? 
              visibleFeatures[focusedPoiIndex].attributes.Store_Name || "Unknown Location" :
              "No location selected"}
          </Typography>
          
          <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
            <Button 
              onClick={() => setFocusedPoiIndex(prev => prev <= 0 ? visibleFeatures.length - 1 : prev - 1)}
              startIcon={<KeyboardArrowLeftIcon />}
              variant="contained"
              color="primary"
              size="small"
              sx={{ mr: 1 }}
            >
              Previous
            </Button>
            
            <Button 
              onClick={() => setFocusedPoiIndex(prev => prev >= visibleFeatures.length - 1 ? 0 : prev + 1)}
              endIcon={<KeyboardArrowRightIcon />}
              variant="contained"
              color="primary"
              size="small"
              sx={{ ml: 1 }}
            >
              Next
            </Button>
          </Box>
          
          <Button 
            onClick={() => {
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
              }
            }}
            variant="contained"
            color="primary"
            size="small"
            sx={{ mb: 1 }}
            disabled={focusedPoiIndex < 0}
          >
            View Details
          </Button>
          
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
        

        <Box sx={{ p: 2 }}>
          <Typography variant="h5" component="h1" fontWeight="bold" gutterBottom>
            Retailer Type
          </Typography>

          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: 1,
              mb: 2,
            }}
          >
            {Object.entries(categoryStyles).map(([category, style]) => (
              <Tooltip key={category} title={category} placement="top">
                <Button
                  onClick={() => toggleCategory(category)}
                  variant={activeCategories.includes(category) ? "contained" : "outlined"}
                  startIcon={style.icon}
                  size="small"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    px: 1.5,
                    py: 0.5,
                    fontSize: {
                      xs: "0.72rem",
                      sm: "0.8rem",
                    },
                    minWidth: 0,
                    maxWidth: "100%",
                    flex: "1 1 130px",
                    textTransform: "none",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    backgroundColor: activeCategories.includes(category) ? style.color : "transparent",
                    borderColor: style.color,
                    color: activeCategories.includes(category) ? style.textColor : style.color,
                    
                    '&:focus': {
                      outline: '2px solid #005fcc',
                      outlineOffset: '2px'
                    }
                  }}
                >
                  {category}
                </Button>
              </Tooltip>
            ))}
          </Box>

          <Divider sx={{ my: 2 }} />
          
          <Typography variant="h5" component="h1" fontWeight="bold"  gutterBottom>
            Food Access Options
          </Typography>
          
          <FormControlLabel
            control={
              <Switch
                checked={filterWIC}
                onChange={() => setFilterWIC((prev) => !prev)}
                color="primary"
                inputProps={{ 
                  'aria-label': 'Filter by WIC acceptance'
                }}
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
                inputProps={{ 
                  'aria-label': 'Filter by fresh produce availability'
                }}
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
            sx={{ 
              mb: 1,
              '&:focus': {
                outline: '2px solid #005fcc',
                outlineOffset: '2px'
              }
            }}
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
            sx={{ 
              mt: 1,
              '&:focus': {
                outline: '2px solid #005fcc',
                outlineOffset: '2px'
              }
            }}
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
            },
            '&:focus': {
              outline: '2px solid #005fcc',
              outlineOffset: '2px'
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
            },
            '&:focus': {
              outline: '2px solid #005fcc',
              outlineOffset: '2px'
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
          aria-modal="true"
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
            <li><Typography>Press <strong>K</strong> to toggle POI navigation mode</Typography></li>
            <li><Typography>Press <strong>Tab</strong> to navigate between interface elements</Typography></li>
            <li><Typography>Press <strong>← →</strong> arrow keys to navigate POIs when in navigation mode</Typography></li>
            <li><Typography>Press <strong>Enter</strong> to view details of selected point</Typography></li>
            <li><Typography>Press <strong>Esc</strong> to exit navigation mode</Typography></li>
          </Box>
          <Button 
            variant="contained"
            onClick={() => setIsHelpVisible(false)}
            sx={{ 
              mt: 2,
              '&:focus': {
                outline: '2px solid #005fcc',
                outlineOffset: '2px'
              }
            }}
          >
            Close
          </Button>
        </Paper>
      )}

      {/* Screen reader only: accessible list of POIs */}
      <div
        style={{
          position: 'absolute',
          left: '-10000px',
          width: '1px',
          height: '1px',
          overflow: 'hidden'
        }}
        aria-label="List of visible food retailers on the map"
      >
        <ul>
          {visibleFeatures.map((feature, i) => {
            const a = feature.attributes || {};
            return (
              <li key={i}>
                {a.Store_Name || 'Unknown'}, {a.Address}, {a.City}, {a.State} {a.Zip}.
                Category: {a.Retail_Category || 'N/A'}.
                SNAP: {a.SNAP}, WIC: {a.WIC}, Fresh Produce: {a.Fresh_Produce}
              </li>
            );
          })}
        </ul>
      </div>
    </Box>
  );
};

export default FoodRetailer;