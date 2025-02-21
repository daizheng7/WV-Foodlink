import React, { useState } from "react";
import { Box, IconButton, Modal, Typography, Divider } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import FoodFinderMap from "../components/FoodFinderMap";
import AssistanceLegend from "../components/AssistanceLegend";

const Food = () => {
  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row", // Layout map and food section side by side
        height: "100vh", // Full viewport height
        
      }}
    >
      {/* Map Section */}
      <Box
        sx={{
          flex: "1",
          position: "relative",
          zIndex: 1, // Ensure map container stays beneath popups
        }}
      >
        <FoodFinderMap />
        {/* Info Icon Overlay */}
        <IconButton
          onClick={handleOpenModal}
          sx={{
            position: "absolute",
            bottom: 16,
            right: 16,
            backgroundColor: "white",
            width: 60,
            height: 60,
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
            zIndex: 20, // Higher than the map container
            "&:hover": {
              backgroundColor: "#f4f6f8",
            },
          }}
        >
          <InfoIcon sx={{ color: "#007bff", fontSize: 36 }} />
        </IconButton>
      </Box>

      

      {/* Modal for AssistanceLegend */}
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="assistance-legend-modal"
        aria-describedby="assistance-legend-description"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            width: "90%",
            maxWidth: "600px",
            maxHeight: "80%",
            backgroundColor: "white",
            padding: 3,
            borderRadius: "12px",
            boxShadow: "0px 6px 15px rgba(0, 0, 0, 0.2)",
            overflowY: "auto",
            zIndex: 10, // Higher than all other elements
          }}
        >
          <Typography
            id="assistance-legend-modal"
            variant="h6"
            sx={{ marginBottom: 2, fontWeight: "bold", color: "#007bff" }}
          >
            Assistance Legend
          </Typography>
          <Divider sx={{ marginBottom: 2 }} />
          <AssistanceLegend />
        </Box>
      </Modal>
    </Box>
  );
};

export default Food;
