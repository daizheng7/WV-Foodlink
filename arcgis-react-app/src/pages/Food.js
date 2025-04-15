import React, { useState } from "react"; 
import { 
  Box, 
  IconButton, 
  Modal, 
  Typography, 
  useMediaQuery,
  useTheme,
  Paper,
  Tooltip
} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";

import FoodRetailer from "../components/FoodRetailer";

const FoodPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));
  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  // Function to determine responsive spacing (matching HomePage)
  const getResponsiveSpacing = (mobileSm, tabletMd, desktopLg) => {
    if (isMobile) return mobileSm;
    if (isTablet) return tabletMd;
    return desktopLg;
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        width: "100%",
        overflow: "hidden",
        backgroundColor: "#f9f9f9",
      }}
    >
      {/* Main content container with proper padding */}
      <Box 
        sx={{ 
          display: "flex",
          flexDirection: "column",
          height: "100%",
          width: "100%",
          padding: getResponsiveSpacing(2, 3, 4),
          boxSizing: "border-box",
        }}
      >
        {/* Header with Info */}
        <Box 
          sx={{
            padding: getResponsiveSpacing(2, 2.5, 3),
            backgroundColor: "#ffffff",
            borderRadius: "8px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
            display: "flex",
            flexDirection: "column",
            width: "100%",
            boxSizing: "border-box",
            mb: 2
          }}
        >
          <Box 
            display="flex" 
            flexDirection="row"
            justifyContent="space-between" 
            alignItems="center" 
            width="100%"
          >
            <Typography 
              variant="h1" 
              component="h1" 
              sx={{ 
                color: "#002855",
                fontSize: isMobile ? "2.2rem" : isTablet ? "2.7rem" : "3.2rem",
                lineHeight: 1.2,
                fontWeight: 700,
                flexGrow: 1,
                pr: 2
              }}
            >
              Food Resources
            </Typography>
            <Tooltip title="Information about food resources">
              <IconButton 
                onClick={handleOpenModal} 
                aria-label="information about food resources"
                size="large"
                sx={{ 
                  backgroundColor: "rgba(153, 3, 30, 0.1)",
                  padding: isMobile ? 1 : 1.5,
                  flexShrink: 0,
                  '&:hover': {
                    backgroundColor: "rgba(153, 3, 30, 0.2)"
                  }
                }}
              >
                <InfoIcon sx={{ 
                  fontSize: isMobile ? 28 : 36, 
                  color: "#002855" 
                }} />
              </IconButton>
            </Tooltip>
          </Box>
          <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
            Explore our interactive map of food resources in West Virginia. Click the info icon for details on map categories and features.
          </Typography>
        </Box>
      
        {/* Map Section with fixed dimensions that stay within container */}
        <Box
          sx={{
            width: "100%",
            flexGrow: 1,
            position: "relative",
            borderRadius: "8px",
            overflow: "hidden",
            boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
          }}
        >
          <FoodRetailer />
        </Box>
      </Box>

      {/* Info Modal */}
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Paper sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: isMobile ? '90%' : 500,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          borderRadius: 2
        }}>
          <Typography id="modal-modal-title" variant="h5" component="h2" sx={{ color: "#002855", mb: 2, fontWeight: 600 }}>
            About Food Resources
          </Typography>
          <Typography id="modal-modal-description" sx={{ mb: 2 }}>
            This interactive map helps you locate various food resources throughout West Virginia. Use the category filters to find specific types of food assistance:
          </Typography>
          
          <Box sx={{ pl: 2, mb: 3 }}>
            <Typography sx={{ mb: 1 }}><strong>🛒 Grocery Stores:</strong> Traditional food retailers carrying a wide range of food items.</Typography>
            <Typography sx={{ mb: 1 }}><strong>🍅 Farmers Markets:</strong> Local markets offering fresh, seasonal produce directly from farmers.</Typography>
            <Typography sx={{ mb: 1 }}><strong>🏬 Food Pantries:</strong> Organizations providing free groceries to those in need.</Typography>
            <Typography sx={{ mb: 1 }}><strong>🍽️ Community Meals:</strong> Locations serving prepared meals, often at no cost.</Typography>
            <Typography sx={{ mb: 1 }}><strong>💳 SNAP/WIC Locations:</strong> Places that accept SNAP benefits (food stamps) and WIC vouchers.</Typography>
          </Box>
          
          <Typography>
            Click on any map marker to view detailed information including hours of operation, contact information, and available services. You can also search for locations by address or zip code.
          </Typography>
        </Paper>
      </Modal>
    </Box>
  );
};

export default FoodPage;