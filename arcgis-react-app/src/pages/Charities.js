import React, { useState, useEffect } from "react"; 
import { 
  Box, 
  IconButton, 
  Modal, 
  Typography, 
  useMediaQuery,
  useTheme,
  Container,
  Paper,
  Divider,
  Tooltip
} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import Charities from "../components/Charities";
import Footer from "../components/Footer";
import esriConfig from "@arcgis/core/config";
import FoodResourcesPanel from "../components/FoodResourcePanel";

// WebMap ID (Replace with your actual WebMap ID)
const webmapId = "YOUR_WEBMAP_ID_HERE"; 

// Food resource layer configurations
const foodResourceLayers = [
  {
    id: "d16bf58fe37747849a8536c7870c8d80",
    title: "Charitable Food Programs",
    color: "#4285F4"
  },
  {
    id: "82a68c3787dc4efaacdf98e00328ebed",
    title: "Congregate Meal Program",
    color: "#0F9D58"
  },
  {
    id: "bf72aea00c1445cca1356cdcee16aa8a",
    title: "Backpack Program",
    color: "#F4B400"
  },
  {
    id: "b93e8c7152204bfeac14dc9964bb37df",
    title: "Food Pantry",
    color: "#DB4437"
  }
];

const CharitiesPage = () => {
  const [openModal, setOpenModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedArea, setSelectedArea] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  // Initialize ArcGIS configuration
  useEffect(() => {
    esriConfig.apiKey = process.env.REACT_APP_ARCGIS_API_KEY;
    
    // Simulate loading time for map
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  // Handle category selection (called from FoodFinderMap component)
  const handleCategorySelect = (category) => {
    console.log("Food category selected:", category);
    setSelectedCategory(category);
  };

  // Handle area selection from map (could be a county, region, or custom area)
  const handleAreaSelect = (geometry) => {
    setSelectedArea(geometry);
  };

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        bgcolor: theme.palette.background.default,
      }}
    >
      {/* Header with Info - Full Width */}
      <Box sx={{ width: "100%", px: 2, pt: 2, pb: 1 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" maxWidth="100%">
          <Typography variant="h1" component="h1" color="primary">
            Charities Resources
          </Typography>
          <Tooltip title="Information about food resources">
            <IconButton onClick={handleOpenModal} color="primary">
              <InfoIcon />
            </IconButton>
          </Tooltip>
        </Box>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
          Find food banks, pantries, and soup kitchens funded by donations in your area by exploring the map or filtering by category.
        </Typography>
      </Box>
      
      {/* Map Section - Full Width */}
      <Box
        sx={{
          width: "100%",
          height: isMobile ? "50vh" : "70vh",
          position: "relative",
          zIndex: 1,
          mb: 3,
          overflow: "hidden",
        }}
      >
        {isLoading ? (
          <Box 
            display="flex" 
            justifyContent="center" 
            alignItems="center" 
            height="100%"
          >
            <Typography variant="h6">Loading map...</Typography>
          </Box>
        ) : (
          <Charities
            onCategorySelect={handleCategorySelect} 
            onAreaSelect={handleAreaSelect}
            layerConfigs={foodResourceLayers}
          />
        )}
      </Box>

      {/* Information Modal */}
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="info-modal-title"
        aria-describedby="info-modal-description"
      >
        <Paper 
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: isMobile ? '90%' : 500,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          <Typography id="info-modal-title" variant="h6" component="h2" gutterBottom>
            About Food Resources
          </Typography>
          <Divider sx={{ mb: 2 }} />
          <Typography id="info-modal-description" sx={{ mb: 2 }}>
            This tool helps you locate food assistance programs in your area. The map displays various types of food resources including:
          </Typography>
          <Box component="ul" sx={{ pl: 2 }}>
            {foodResourceLayers.map((layer) => (
              <Box 
                component="li" 
                key={layer.id}
                sx={{ 
                  mb: 1,
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                <Box 
                  component="span" 
                  sx={{ 
                    display: 'inline-block',
                    width: 12,
                    height: 12,
                    borderRadius: '50%',
                    bgcolor: layer.color,
                    mr: 1
                  }} 
                />
                <Typography>{layer.title}</Typography>
              </Box>
            ))}
          </Box>
        </Paper>
      </Modal>

      {/* Food Resources Panel - Now with Proper Props */}
      <Container maxWidth="100%" sx={{ mb: 4 }}>
        <FoodResourcesPanel 
          foodResourceLayers={foodResourceLayers}
          selectedCategory={selectedCategory}
          selectedArea={selectedArea}
          onCategorySelect={handleCategorySelect}
          webmapId={webmapId}
          isMobile={isMobile}
        />
      </Container>

      {/* Footer */}
      <Footer />
    </Box>
  );
};

export default CharitiesPage;
