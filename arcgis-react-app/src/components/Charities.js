import React, { useEffect, useRef, useState } from "react";
import esriConfig from "@arcgis/core/config";
import Map from "@arcgis/core/Map";
import MapView from "@arcgis/core/views/MapView";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
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
import EmojiFoodBeverageIcon from "@mui/icons-material/EmojiFoodBeverage";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import BackpackIcon from "@mui/icons-material/Backpack";
import LocalDiningIcon from "@mui/icons-material/LocalDining";

const categoryStyles = {
  "Charitable Food Programs": {
    color: "#4285F4",
    icon: <EmojiFoodBeverageIcon />,
  },
  "Congregate Meal Program": {
    color: "#0F9D58",
    icon: <RestaurantIcon />,
  },
  "Backpack Program": {
    color: "#F4B400",
    icon: <BackpackIcon />,
  },
  "Food Pantry": {
    color: "#DB4437",
    icon: <LocalDiningIcon />,
  },
};

const Charities = () => {
  const mapDiv = useRef(null);
  const [view, setView] = useState(null);
  const [activeCategories, setActiveCategories] = useState(Object.keys(categoryStyles));
  const [userLocation, setUserLocation] = useState(null);

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
    });

    const layers = [
      {
        id: "CharitableFoodPrograms",
        portalItemId: "d16bf58fe37747849a8536c7870c8d80",
        category: "Charitable Food Programs",
      },
      {
        id: "CongregateMealProgram",
        portalItemId: "82a68c3787dc4efaacdf98e00328ebed",
        category: "Congregate Meal Program",
      },
      {
        id: "BackpackProgram",
        portalItemId: "bf72aea00c1445cca1356cdcee16aa8a",
        category: "Backpack Program",
      },
      {
        id: "FoodPantry",
        portalItemId: "b93e8c7152204bfeac14dc9964bb37df",
        category: "Food Pantry",
      },
    ];

    layers.forEach(({ id, portalItemId, category }) => {
      const layer = new FeatureLayer({
        portalItem: { id: portalItemId },
        id,
        renderer: {
          type: "simple",
          symbol: {
            type: "simple-marker",
            color: categoryStyles[category].color,
            size: 8,
            outline: { color: "#ffffff", width: 1 },
          },
        },
        popupTemplate: {
          title: `<div style='font-size: 16px; font-weight: bold;'>{Name}</div>`,
          content: `
            <div style="font-size: 14px;">
              <b>Name:</b> {SiteName}<br>
              <b>Address:</b> {Address1}<br>
              <b>Operating Hours:</b> {Hours_of_Operation}<br>
              <b>Phone Number:</b> {Phone_Number}<br>
              
            </div>
          `,
        },
      });

      map.add(layer);
    });

    mapView.when(() => {
      setView(mapView);
    });

    return () => {
      if (mapView) {
        mapView.map.removeAll();
        mapView.destroy();
      }
    };
  }, []);

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

    const results = await Promise.all(
      view.map.layers.map(async (layer) => {
        if (layer.type === "feature") {
          const query = layer.createQuery();
          query.geometry = {
            type: "point",
            longitude: userLocation.longitude,
            latitude: userLocation.latitude,
          };
          query.distance = 5000; // 5 km radius
          query.units = "meters";
          query.spatialRelationship = "intersects";
          query.outFields = ["*"];

          return layer.queryFeatures(query);
        }
        return null;
      })
    );

    console.log("Nearby features:", results.flat());
  };

  return (
    <div style={{ position: "relative", width: "100%", height: "80vh" }}>
      <div ref={mapDiv} style={{ width: "100%", height: "100%" }}></div>

      <Box
  sx={{
    position: "absolute",
    bottom: 20, // Distance from the bottom of the screen
    right: 20,  // Distance from the right of the screen
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

export default Charities;
