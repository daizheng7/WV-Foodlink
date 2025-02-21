import React, { useEffect, useRef, useState } from "react";
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
} from "@mui/material";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import LocalGroceryStoreIcon from "@mui/icons-material/LocalGroceryStore";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import LocalConvenienceStoreIcon from "@mui/icons-material/LocalConvenienceStore";
import StorefrontIcon from "@mui/icons-material/Storefront";
import BusinessIcon from "@mui/icons-material/Business";

const categoryStyles = {
  Grocery: { color: "#4285F4", icon: <LocalGroceryStoreIcon /> },
  "Farmers Market": { color: "#0F9D58", icon: <ShoppingBasketIcon /> },
  Convenience: { color: "#F4B400", icon: <LocalConvenienceStoreIcon /> },
  "Small Box": { color: "#DB4437", icon: <StorefrontIcon /> },
  Specialty: { color: "#9C27B0", icon: <BusinessIcon /> },
  "Big Box": { color: "#757575", icon: <BusinessIcon /> },
};

const FoodRetailer = () => {
  const mapDiv = useRef(null);
  const [view, setView] = useState(null);
  const [activeCategories, setActiveCategories] = useState(Object.keys(categoryStyles));
  const [filterWIC, setFilterWIC] = useState(false);
  const [filterFreshProduce, setFilterFreshProduce] = useState(false);
  const [userLocation, setUserLocation] = useState(null);
  const [popupContent, setPopupContent] = useState(null);

  useEffect(() => {
    esriConfig.apiKey = process.env.REACT_APP_ARCGIS_API_KEY;

    const map = new Map({
      basemap: "arcgis-light-gray",
    });

    const mapView = new MapView({
      container: mapDiv.current,
      map: map,
      center: [-80.39, 39.10],
      zoom: 7,
      overflow: false,
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
            size: 8,
            outline: { color: "#ffffff", width: 1 },
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

    mapView.when(() => {
      setView(mapView);
      
      mapView.on("click", (event) => {
        mapView.hitTest(event).then((response) => {
          console.log("HitTest response:", response);
      
          if (response.results.length) {
            const graphic = response.results[0].graphic;
            console.log("Graphic attributes:", graphic.attributes);
      
            const attributes = graphic.attributes || {};
            setPopupContent({
              title: attributes.Store_Name || "No Name Available",
              content: `
                <div style="font-size: 14px;">
                  <b>Store Name:</b> ${attributes.Store_Name || "N/A"}<br>
                  <b>Address:</b> ${attributes.Address || "N/A"}<br>
                  <b>City:</b> ${attributes.City || "N/A"}<br>
                  <b>State:</b> ${attributes.State || "N/A"}<br>
                  <b>Zip:</b> ${attributes.Zip || "N/A"}<br>
                  <b>Retail Category:</b> ${attributes.Retail_Category || "N/A"}<br>
                  <b>Fresh Produce Available:</b> ${attributes.Fresh_Produce || "N/A"}<br>
                  <b>Accepts SNAP:</b> ${attributes.SNAP || "N/A"}<br>
                  <b>Accepts WIC:</b> ${attributes.WIC || "N/A"}<br>
                </div>
              `,
            });
          } else {
            console.log("No graphic found");
            setPopupContent(null);
          }
        });
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
    if (view) {
      const retailerLayer = view.map.findLayerById("retailerLayer");
      if (retailerLayer) {
        const categoryExpression = `Retail_Category IN (${activeCategories.map((cat) => `'${cat}'`).join(",")})`;
        const wicExpression = filterWIC ? "WIC = 'Yes'" : null;
        const freshProduceExpression = filterFreshProduce ? "Fresh_Produce = 'Yes'" : null;
        const definitionExpression = [categoryExpression, wicExpression, freshProduceExpression]
          .filter(Boolean)
          .join(" AND ");

        retailerLayer.definitionExpression = definitionExpression;
      }
    }
  }, [activeCategories, filterWIC, filterFreshProduce, view]);

  const toggleCategory = (category) => {
    setActiveCategories([category]);
  };

  const getUserLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation({ latitude, longitude });

        view?.goTo({
          center: [longitude, latitude],
          zoom: 12,
        });
      },
      (error) => {
        console.error("Error getting user location:", error);
      }
    );
  };

  const showNearby = async () => {
    if (!userLocation) return;

    const retailerLayer = view?.map.findLayerById("retailerLayer");
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

      const results = await retailerLayer.queryFeatures(query);
      console.log("Nearby retailers:", results.features);
    }
  };

  return (
    <div style={{ position: "relative", width: "100%", height: "80vh" }}>
      <div ref={mapDiv} style={{ width: "100%", height: "100%" }}></div>

      {popupContent && (
        <Box
          sx={{
            position: "absolute",
            top: 20,
            left: 20,
            backgroundColor: "white",
            padding: 2,
            borderRadius: 2,
            boxShadow: "0 2px 4px rgba(0,0,0,0.3)",
            zIndex: 1000,
            maxWidth: "300px",
          }}
        >
          <Typography variant="h6">{popupContent.title}</Typography>
          <div dangerouslySetInnerHTML={{ __html: popupContent.content }} />
        </Box>
      )}

      <Box
        sx={{
          position: "absolute",
          bottom: 20,
          left: 20,
          backgroundColor: "rgba(255, 255, 255, 0.9)",
          padding: 2,
          borderRadius: 2,
          boxShadow: "0 2px 4px rgba(0,0,0,0.3)",
          zIndex: 1000,
        }}
      >
        <Typography variant="h6" gutterBottom>
          Filters
        </Typography>
        <Grid container spacing={1}>
          {Object.keys(categoryStyles).map((category) => (
            <Grid item key={category}>
              <IconButton
                onClick={() => toggleCategory(category)}
                sx={{
                  backgroundColor: activeCategories.includes(category)
                    ? categoryStyles[category].color
                    : "#ddd",
                  color: "#fff",
                  borderRadius: 1,
                  p: 1,
                }}
              >
                {categoryStyles[category].icon}
              </IconButton>
              <Typography variant="caption" sx={{ display: "block", textAlign: "center" }}>
                {category}
              </Typography>
            </Grid>
          ))}
        </Grid>
        <FormControlLabel
          control={
            <Switch
              checked={filterWIC}
              onChange={() => setFilterWIC((prev) => !prev)}
            />
          }
          label="WIC Accepted"
        />
        <FormControlLabel
          control={
            <Switch
              checked={filterFreshProduce}
              onChange={() => setFilterFreshProduce((prev) => !prev)}
            />
          }
          label="Fresh Produce Available"
        />
      </Box>

      <Box
        sx={{
          position: "absolute",
          top: 20,
          right: 20,
          display: "flex",
          flexDirection: "column",
          gap: 1,
          zIndex: 1000,
        }}
      >
        <Button
          variant="contained"
          startIcon={<MyLocationIcon />}
          onClick={getUserLocation}
          sx={{
            backgroundColor: "darkred",
            color: "white",
            fontSize: "1rem",
            padding: "0.5rem 1rem",
            '&:hover': { backgroundColor: "#a00000" },
          }}
        >
          Locate Me
        </Button>
        <Button
          variant="contained"
          onClick={showNearby}
          sx={{
            backgroundColor: "darkred",
            color: "white",
            fontSize: "1rem",
            padding: "0.5rem 1rem",
            '&:hover': { backgroundColor: "#a00000" },
          }}
        >
          Show Nearby
        </Button>
      </Box>
    </div>
  );
};

export default FoodRetailer;
