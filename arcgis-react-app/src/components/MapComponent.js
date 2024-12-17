import React, { useRef, useEffect, useState } from "react";
import esriConfig from "@arcgis/core/config";
import Map from "@arcgis/core/Map";
import MapView from "@arcgis/core/views/MapView";
import Extent from "@arcgis/core/geometry/Extent";
import {
  Box,
  CircularProgress,
  Button,
  Modal,
  Backdrop,
  Fade,
  Typography,
  IconButton,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

const MapComponent = () => {
  const mapDiv = useRef(null);
  const viewRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [mapLoaded, setMapLoaded] = useState(false); // Track if the map is loaded

  // Initialize MapView
  useEffect(() => {
    esriConfig.apiKey = process.env.REACT_APP_ARCGIS_API_KEY;

    if (mapDiv.current && !viewRef.current) {
      const map = new Map({ basemap: "arcgis-light-gray" });

      const view = new MapView({
        container: mapDiv.current,
        map: map,
        center: [0, 0],
        zoom: 2,
      });

      const WVExtent = new Extent({
        xmin: -83.675,
        ymin: 37.2,
        xmax: -77.719,
        ymax: 40.638,
        spatialReference: { wkid: 4326 },
      });

      view.when(() => {
        view
          .goTo({ target: WVExtent, zoom: 7 }, { animate: true })
          .then(() => {
            setIsLoading(false);
            setMapLoaded(true);
          });
      });

      viewRef.current = view;
    }

    // Cleanup to avoid DOM conflicts
    return () => {
      if (viewRef.current) {
        viewRef.current.destroy();
        viewRef.current = null;
      }
    };
  }, []);

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  return (
    <Box sx={{ width: "100%", height: "100vh", position: "relative" }}>
      {/* Map Container */}
      <Box ref={mapDiv} sx={{ width: "100%", height: "100%" }}>
        {isLoading && (
          <CircularProgress
            sx={{ position: "absolute", top: "50%", left: "50%" }}
          />
        )}
      </Box>

      {/* Floating Modal Button */}
      <IconButton
        onClick={handleOpenModal}
        sx={{
          position: "absolute",
          bottom: 20,
          right: 20,
          backgroundColor: "white",
          borderRadius: "50%",
          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.3)",
          width: 70,
          height: 70,
          "&:hover": {
            transform: "scale(1.1)",
          },
        }}
      >
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/SDG_Wheel.svg/1200px-SDG_Wheel.svg.png"
          alt="SDG Wheel"
          style={{ width: "100%", height: "100%" }}
        />
      </IconButton>

      {/* About Modal */}
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{ timeout: 500 }}
      >
        <Fade in={openModal}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "90%",
              maxWidth: 800,
              bgcolor: "white",
              boxShadow: 24,
              p: 4,
              borderRadius: 2,
            }}
          >
            <Typography variant="h4" gutterBottom align="center">
              About WV Foodlink
            </Typography>
            <Typography variant="body1" paragraph>
              <strong>WV FOODLINK</strong> is a project of the Food Justice Lab
              housed in West Virginia University Center for Resilient
              Communities. In collaboration with our community partners, we have
              developed a resource hub and learning commons to support a
              people-centered, resilient food network in West Virginia.
            </Typography>
            <Button
              onClick={handleCloseModal}
              variant="contained"
              sx={{ display: "block", margin: "0 auto" }}
            >
              Close
            </Button>
          </Box>
        </Fade>
      </Modal>
    </Box>
  );
};

export default MapComponent;
