import React, { useEffect, useRef, useState } from "react";
import esriConfig from "@arcgis/core/config";
import WebMap from "@arcgis/core/WebMap";
import MapView from "@arcgis/core/views/MapView";
import Locate from "@arcgis/core/widgets/Locate";
import Legend from "@arcgis/core/widgets/Legend";
import "@arcgis/core/assets/esri/themes/light/main.css";
import { Box, Button, Paper, Typography } from "@mui/material";

const MapFood = ({ mapIds }) => {
  const mapDivRef = useRef(null); // Reference to the map container
  const viewRef = useRef(null); // MapView reference
  const [currentMapId, setCurrentMapId] = useState(mapIds[0]); // Active WebMap ID
  const webMaps = useRef([]); // Static array to store all preloaded WebMaps

  // Preload all WebMaps once when the component mounts
  useEffect(() => {
    esriConfig.apiKey = process.env.REACT_APP_ARCGIS_API_KEY;

    // Preload WebMaps only once
    if (webMaps.current.length === 0) {
      webMaps.current = mapIds.map((id) => new WebMap({ portalItem: { id } }));
    }

    // Initialize MapView only once
    if (!viewRef.current && mapDivRef.current) {
      viewRef.current = new MapView({
        container: mapDivRef.current,
        map: webMaps.current[0], // Set the first map as default
        center: [-80, 39],
        zoom: 7,
      });

      // Add widgets only once
      const locateWidget = new Locate({ view: viewRef.current });
      viewRef.current.ui.add(locateWidget, "top-left");

      const legend = new Legend({ view: viewRef.current });
      viewRef.current.ui.add(legend, "bottom-right");
    }
  }, [mapIds]);

  // Switch between preloaded maps
  const handleMapSwitch = (index) => {
    if (viewRef.current) {
      viewRef.current.map = webMaps.current[index];
      setCurrentMapId(mapIds[index]);
    }
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      {/* Buttons to switch between maps */}
      <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
        {mapIds.map((id, index) => (
          <Button
            key={id}
            variant={id === currentMapId ? "contained" : "outlined"}
            onClick={() => handleMapSwitch(index)}
          >
            Map {index + 1}
          </Button>
        ))}
      </Box>

      {/* Map Container */}
      <Box
        sx={{
          width: "100%",
          height: "60vh",
          position: "relative",
          border: "1px solid #ccc",
        }}
      >
        <div ref={mapDivRef} style={{ width: "100%", height: "100%" }}></div>
        <Paper
          elevation={3}
          sx={{
            position: "absolute",
            bottom: 20,
            left: 20,
            padding: 2,
            backgroundColor: "rgba(255, 255, 255, 0.9)",
          }}
        >
          <Typography variant="h6">Active Map</Typography>
          <Typography variant="body2">WebMap ID: {currentMapId}</Typography>
        </Paper>
      </Box>
    </Box>
  );
};

export default MapFood;
