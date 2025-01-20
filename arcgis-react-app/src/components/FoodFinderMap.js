import React, { useEffect, useRef, useState } from "react";
import esriConfig from "@arcgis/core/config";
import Map from "@arcgis/core/Map";
import MapView from "@arcgis/core/views/MapView";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import SimpleRenderer from "@arcgis/core/renderers/SimpleRenderer";
import PictureMarkerSymbol from "@arcgis/core/symbols/PictureMarkerSymbol";
import {
  Box,
  Typography,
  Grid,
  IconButton,
  Button,
  FormControlLabel,
  Switch,
} from "@mui/material";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import StorefrontIcon from "@mui/icons-material/Storefront";
import HomeRepairServiceIcon from "@mui/icons-material/HomeRepairService";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import ElderlyIcon from "@mui/icons-material/Elderly";

const resourceStyles = {
  "DHHR Offices": {
    id: "6cabc6993a8f44f9aadd1d884cf9cf84",
    color: "#007bff",
    icon: <LocalHospitalIcon sx={{ fontSize: 48, color: "#007bff" }} />, 
    symbolUrl: "https://static.arcgis.com/images/Symbols/Shapes/BlueCircleLargeB.png",
  },
  "WIC Offices": {
    id: "37ec841dae7e46278d111f26a98b83cb",
    color: "#28a745",
    icon: <StorefrontIcon sx={{ fontSize: 48, color: "#28a745" }} />,
    symbolUrl: "https://static.arcgis.com/images/Symbols/Shapes/GreenCircleLargeB.png",
  },
  "Family Resource Network": {
    id: "fe5b84fd9977470ea0a56be091175356",
    color: "#ffc107",
    icon: <HomeRepairServiceIcon sx={{ fontSize: 48, color: "#ffc107" }} />,
    symbolUrl: "https://static.arcgis.com/images/Symbols/Shapes/YellowCircleLargeB.png",
  },
  "Family Support Centers": {
    id: "37fdc5c991f2443e9e30afc80745d00e",
    color: "#ff5722",
    icon: <RestaurantIcon sx={{ fontSize: 48, color: "#ff5722" }} />,
    symbolUrl: "https://static.arcgis.com/images/Symbols/Shapes/RedCircleLargeB.png",
  },
  "Senior Services": {
    id: "fdedf6d54b1c4bc9928af7fd3ec520c8",
    color: "#795548",
    icon: <ElderlyIcon sx={{ fontSize: 48, color: "#795548" }} />,
    symbolUrl: "https://static.arcgis.com/images/Symbols/Shapes/BrownCircleLargeB.png",
  },
};

const FoodFinderMap = () => {
  const mapDiv = useRef(null);
  const [view, setView] = useState(null);
  const [activeResource, setActiveResource] = useState(null);
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

    Object.entries(resourceStyles).forEach(([key, style]) => {
      const layer = new FeatureLayer({
        portalItem: { id: style.id },
        renderer: new SimpleRenderer({
          symbol: new PictureMarkerSymbol({
            url: style.symbolUrl,
            width: "24px",
            height: "24px",
          }),
        }),
        popupTemplate: {
          title: "<div style='font-size: 16px; font-weight: bold;'>{OFFICE_NAME}</div>",
          content: `
            <b>County:</b> {COUNTY}<br>
            <b>Office Name:</b> {OFFICE_NAME}<br>
            <b>Physical Address:</b> {PHYS_ADDRESS}<br>
            <b>City:</b> {City}<br>
            <b>Phone:</b> {PHONE}<br>
            <b>Hours Open:</b> {Hours_Open}<br>
            <b>Hours Close:</b> {Hours_Close}<br>
            <b>Days:</b> {DAYS}<br>
            <b>Services:</b> {SERVICES}<br>
            <b>First Name:</b> {First_Name}<br>
            <b>Last Name:</b> {Last_Name}<br>
            <b>Email:</b> {Email}<br>
            <b>Title:</b> {Title}<br>
            <b>Region:</b> {Region}<br>
            <b>Organization:</b> {Organization}<br>
            <b>Contact:</b> {Contact}<br>
            <b>Address:</b> {Address}<br>
            <b>Website:</b> <a href="{Website}" target="_blank">More Info</a><br>
          `
        },
        visible: activeResource === key,
      });
      map.add(layer);
    });

    mapView.when(() => setView(mapView));

    return () => {
      if (mapView) {
        mapView.destroy();
      }
    };
  }, [activeResource]);

  const toggleResource = (key) => {
    setActiveResource((prev) => (prev === key ? null : key));
  };

  const locateUser = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation({ latitude, longitude });
        view?.goTo({ center: [longitude, latitude], zoom: 12 });
      },
      (error) => console.error("Error locating user:", error)
    );
  };

  const showNearby = async () => {
    if (!userLocation || !activeResource) return;

    const layer = view.map.findLayerById(resourceStyles[activeResource].id);
    if (layer) {
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

      const results = await layer.queryFeatures(query);
      console.log("Nearby resources:", results.features);
    }
  };

  return (
    <div style={{ position: "relative", width: "100%", height: "100vh" }}>
      <div ref={mapDiv} style={{ width: "100%", height: "100%" }}></div>

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
        <Typography variant="h6">Resources</Typography>
        <Grid container spacing={2}>
          {Object.entries(resourceStyles).map(([key, style]) => (
            <Grid item key={key}>
              <IconButton
                onClick={() => toggleResource(key)}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  backgroundColor: activeResource === key ? style.color : "#ddd",
                  color: "#fff",
                  borderRadius: 1,
                  p: 1,
                }}
              >
                {style.icon}
                <Typography variant="caption" sx={{ mt: 1 }}>
                  {key}
                </Typography>
              </IconButton>
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
          onClick={locateUser}
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

export default FoodFinderMap;
