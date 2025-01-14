import React, { useEffect, useRef, useState } from "react";
import esriConfig from "@arcgis/core/config";
import Map from "@arcgis/core/Map";
import MapView from "@arcgis/core/views/MapView";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  Checkbox,
  FormControlLabel,
  Grid,
} from "@mui/material";

const FoodFinderMap = () => {
  const mapDiv = useRef(null);
  const viewRef = useRef(null);
  const [layers, setLayers] = useState([]);

  const featureLayers = [
    { id: "6cabc6993a8f44f9aadd1d884cf9cf84", title: "DHHR Offices" },
    { id: "37ec841dae7e46278d111f26a98b83cb", title: "WIC Offices" },
    { id: "fe5b84fd9977470ea0a56be091175356", title: "Family Resource Network Offices" },
    { id: "37fdc5c991f2443e9e30afc80745d00e", title: "Family Support Centers" },
    { id: "f91bf41b36434a33b29eb0c18f3e8d4b", title: "Food Charities" },
    { id: "a6ff9a5145eb47f6aadc08170fc53bd5", title: "Food Retailers That Accept WIC" },
    { id: "a6ff9a5145eb47f6aadc08170fc53bd5", title: "Food Retailers That Offer Fresh Produce" },
    { id: "a6ff9a5145eb47f6aadc08170fc53bd5", title: "Food Retailers" },
    { id: "fdedf6d54b1c4bc9928af7fd3ec520c8", title: "Senior Services" },
    { id: "96db8ccac5534745af5a47937386bba7", title: "County Boundary" },
  ];

  useEffect(() => {
    esriConfig.apiKey = process.env.REACT_APP_ARCGIS_API_KEY;

    const map = new Map({ basemap: "arcgis-light-gray" });
    const view = new MapView({
      container: mapDiv.current,
      map: map,
      center: [-80, 38], // Adjust coordinates to focus on your area
      zoom: 7,
    });

    // Add all layers dynamically
    const layerObjects = featureLayers.map((layerInfo) => {
      const layer = new FeatureLayer({
        portalItem: { id: layerInfo.id },
        title: layerInfo.title,
        visible: false, // Default to hidden
      });
      map.add(layer);
      return { ...layerInfo, layer };
    });

    setLayers(layerObjects);
    viewRef.current = view;

    return () => {
      if (view) {
        view.destroy();
        viewRef.current = null;
      }
    };
  }, []);

  const handleToggle = (id) => {
    setLayers((prevLayers) =>
      prevLayers.map((layerInfo) => {
        if (layerInfo.id === id) {
          layerInfo.layer.visible = !layerInfo.layer.visible;
        }
        return layerInfo;
      })
    );
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Food Finder Web Map
          </Typography>
        </Toolbar>
      </AppBar>
      <Box sx={{ display: "flex", flex: 1 }}>
        <Box sx={{ width: 240, bgcolor: "#f9f9f9", padding: 2 }}>
          <Typography variant="h6" gutterBottom>
            Layers
          </Typography>
          {layers.map((layerInfo) => (
            <FormControlLabel
              key={layerInfo.id}
              control={
                <Checkbox
                  onChange={() => handleToggle(layerInfo.id)}
                  checked={layerInfo.layer?.visible || false}
                />
              }
              label={layerInfo.title}
            />
          ))}
        </Box>
        <Box
          ref={mapDiv}
          sx={{
            flex: 1,
            height: "100%",
            border: "1px solid #ddd",
          }}
        ></Box>
      </Box>
    </Box>
  );
};

export default FoodFinderMap;
