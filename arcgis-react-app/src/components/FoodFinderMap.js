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
  Modal,
  Divider,
} from "@mui/material";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import InfoIcon from "@mui/icons-material/Info";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import StorefrontIcon from "@mui/icons-material/Storefront";
import HomeRepairServiceIcon from "@mui/icons-material/HomeRepairService";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import ElderlyIcon from "@mui/icons-material/Elderly";
import AssistanceLegend from "../components/AssistanceLegend";

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
    id: "548531449ba2479aba6da213908e965f",
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
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  const openLegendModal = () => {
    setModalContent({
      title: "Assistance Legend",
      content: <AssistanceLegend />,
    });
    setModalOpen(true);
  };

  useEffect(() => {
    esriConfig.apiKey = process.env.REACT_APP_ARCGIS_API_KEY;

    const map = new Map({ basemap: "arcgis-light-gray" });
    const mapView = new MapView({
      container: mapDiv.current,
      map: map,
      center: [-80.39, 39.10],
      zoom: 7,
    });

    Object.entries(resourceStyles).forEach(([key, style]) => {
      const layer = new FeatureLayer({
        portalItem: { id: style.id },
        outFields: ["*"],
        renderer: new SimpleRenderer({
          symbol: new PictureMarkerSymbol({
            url: style.symbolUrl,
            width: "24px",
            height: "24px",
          }),
        }),
        visible: false,
      });
      map.add(layer);
    });

    mapView.when(() => {
      setView(mapView);
      console.log("Map and View are ready");

      mapView.on("click", (event) => {
        mapView.hitTest(event).then((response) => {
          if (response.results.length > 0) {
            const graphic = response.results[0].graphic;
            const attributes = graphic.attributes;
            setModalContent({
              title: attributes.OFFICE_NAME || attributes.Title || "Resource Information",
              content: `
                <p><strong>County:</strong> ${attributes.COUNTY || "N/A"}</p>
                <p><strong>Address:</strong> ${attributes.PHYS_ADDRESS || ""}, ${
                attributes.City || ""
              }</p>
                <p><strong>Phone:</strong> ${attributes.PHONE || "N/A"}</p>
                <p><strong>Contact:</strong> ${attributes.MAIL_ADDRESS || "N/A"}</p>
              `,
            });
            setModalOpen(true);
          }
        });
      });
    });

    return () => {
      if (mapView) {
        mapView.destroy();
      }
    };
  }, []);

  useEffect(() => {
    if (view) {
      view.map.layers.forEach((layer) => {
        if (layer.portalItem) {
          layer.visible = layer.portalItem.id === resourceStyles[activeResource]?.id;
        }
      });
    }
  }, [activeResource, view]);

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

    const layer = view.map.layers.find(
      (layer) => layer.portalItem?.id === resourceStyles[activeResource].id
    );
    if (layer) {
      const query = layer.createQuery();
      query.geometry = {
        type: "point",
        longitude: userLocation.longitude,
        latitude: userLocation.latitude,
      };
      query.distance = 5000;
      query.units = "meters";
      query.spatialRelationship = "intersects";
      query.outFields = ["*"];

      try {
        const results = await layer.queryFeatures(query);
        console.log("Nearby resources:", results.features);
      } catch (error) {
        console.error("Error querying nearby features:", error);
      }
    }
  };

  return (
    <div style={{ position: "relative", width: "100%", height: "80vh" }}>
      <div ref={mapDiv} style={{ width: "100%", height: "100%" }}></div>

      {/* Resource Buttons */}
      <Box
        sx={{
          position: "absolute",
          bottom: 20,
          left: 20,
          backgroundColor: "rgba(255, 255, 255, 0.9)",
          padding: 0,
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

      {/* Locate & Show Nearby Buttons */}
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
            "&:hover": { backgroundColor: "#a00000" },
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
            "&:hover": { backgroundColor: "#a00000" },
          }}
        >
          Show Nearby
        </Button>
      </Box>

      {/* Info Icon for Assistance Legend */}
      <IconButton
        onClick={openLegendModal}
        sx={{
          position: "absolute",
          bottom: 20,
          right: 20,
          backgroundColor: "white",
          width: 60,
          height: 60,
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
          zIndex: 1000,
          "&:hover": { backgroundColor: "#f4f6f8" },
        }}
      >
        <InfoIcon sx={{ color: "#007bff", fontSize: 36 }} />
      </IconButton>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
      <Box
    sx={{
      position: "absolute", // For modal positioning
      top: "50%", // Center vertically
      left: "50%", // Center horizontally
      transform: "translate(-50%, -50%)", // Adjust for width and height
      width: { xs: "90%", sm: "80%", md: "60%" }, // Responsive width
      maxHeight: "90vh", // Prevent the modal from exceeding viewport height
      bgcolor: "background.paper", // Modal background
      borderRadius: 2, // Rounded corners
      boxShadow: 24, // Material-UI shadow
      p: { xs: 2, md: 4 }, // Responsive padding
      overflowY: "auto", // Enable vertical scrolling if content exceeds height
      display: "flex", // Flexbox for layout
      flexDirection: "column", // Vertical stacking
      gap: 2, // Space between child elements
    }}
  >
    {/* Close Button */}
    <Box
      sx={{
        alignSelf: "flex-end",
        mb: 1,
      }}
    >
      <Button
        onClick={() => setModalOpen(false)}
        variant="text"
        sx={{
          fontSize: "1rem",
          color: "text.secondary",
          "&:hover": { color: "text.primary" },
        }}
      >
        Close
      </Button>
    </Box>


    {/* Content */}
    <Box sx={{ flexGrow: 1 }}>
      {typeof modalContent?.content === "string" ? (
        <Typography
          sx={{ color: "text.secondary", lineHeight: 1.6 }}
          dangerouslySetInnerHTML={{ __html: modalContent.content }}
        />
      ) : (
        modalContent?.content
      )}
    </Box>
  </Box>
</Modal>

    </div>
  );
};

export default FoodFinderMap;
