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
    });

    // Clean up function
    return () => {
      if (mapView) {
        mapView.map.removeAll();
        mapView.destroy();
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
          returnGeometry: false
        }).then((result) => {
          setVisibleFeatures(result.features);
        }).catch((error) => {
          console.error("Failed to update visible features for accessibility:", error);
        });    }
  }, [activeCategories, filterWIC, filterFreshProduce, view]);

  return (
    <Box sx={{ position: "relative", width: "100%", height: "85vh", overflow: "hidden" }}>
      {/* Map container */}
      <div
  ref={mapDiv}
  style={{ width: "100%", height: "100%" }}
  tabIndex={0}
  aria-label="Interactive map showing locations of food retailers. Use arrow keys to navigate."
  onFocus={() => {
    if (view) view.focus();
  }}
></div>
      {/* Store details popup */}
      {popupContent && (
  <Fade in>
    <Card
      elevation={5}
      tabIndex={0}
      role="dialog"
      aria-label={`Store details for ${popupContent.title}`}
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
                <IconButton onClick={() => setPopupContent(null)}>
                  <CloseIcon />
                </IconButton>
              }
            />
            <Divider />
            <CardContent>
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