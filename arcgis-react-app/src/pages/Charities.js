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
import Footer from "../components/layout/Footer";
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
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));

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
  
  // Function to determine responsive spacing
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
        minHeight: "100vh",
        bgcolor: theme.palette.background.default,
      }}
    >
      {/* Main content container with proper padding */}
      <Box 
        sx={{ 
          display: "flex",
          flexDirection: "column",
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
              Charities Resources
            </Typography>
            <Tooltip title="Information about charity resources">
              <IconButton 
                onClick={handleOpenModal}
                aria-label="information about charity resources"
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
            Find food banks, pantries, and soup kitchens funded by donations in your area by exploring the map or filtering by category.
          </Typography>
        </Box>
        
        {/* Map Section with proper container */}
        <Box
          sx={{
            width: "100%",
            height: isMobile ? "50vh" : "70vh",
            position: "relative",
            borderRadius: "8px",
            overflow: "hidden",
            boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
            mb: 3,
            backgroundColor: "#ffffff"
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

        {/* Food Resources Panel - Now with Proper Props */}
        <Box 
          sx={{
            backgroundColor: "#ffffff",
            borderRadius: "8px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
            width: "100%",
            mb: 4,
            overflow: "hidden"
          }}
        >
          <FoodResourcesPanel 
            foodResourceLayers={foodResourceLayers}
            selectedCategory={selectedCategory}
            selectedArea={selectedArea}
            onCategorySelect={handleCategorySelect}
            webmapId={webmapId}
            isMobile={isMobile}
          />
        </Box>
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
          <Typography id="info-modal-title" variant="h5" component="h2" sx={{ color: "#002855", mb: 2, fontWeight: 600 }}>
            About Charity Resources
          </Typography>
          <Typography id="info-modal-description" sx={{ mb: 2 }}>
            This tool helps you locate food assistance programs in your area. The map displays various types of food resources including:
          </Typography>
          <Box component="ul" sx={{ pl: 2, mb: 2 }}>
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
          <Typography>
            Click on any map marker to view detailed information including contact details and available services. You can also search for locations by address or zip code.
          </Typography>
        </Paper>
      </Modal>

    </Box>
  );
};

export default CharitiesPage;