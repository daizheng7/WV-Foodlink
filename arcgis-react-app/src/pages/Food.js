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
  Tooltip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  CircularProgress
} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";

import Footer from "../components/Footer";
import esriConfig from "@arcgis/core/config";
import FoodResourcesPanel from "../components/FoodResourcePanel";
import FoodRetailer from "../components/FoodRetailer";

const FoodPage = () => {
  const [openModal, setOpenModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedArea, setSelectedArea] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [layerData, setLayerData] = useState([]);
  const [isTableLoading, setIsTableLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  // Initialize ArcGIS configuration
  useEffect(() => {
    // Ensure API key is properly set
    if (process.env.REACT_APP_ARCGIS_API_KEY) {
      esriConfig.apiKey = process.env.REACT_APP_ARCGIS_API_KEY;
    } else {
      console.error("ArcGIS API key is missing!");
    }
    
    // Reduce loading time to make map appear faster
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  // Load all layer data when the component mounts
  useEffect(() => {
    // Set table loading state
    setIsTableLoading(true);
    
    // This will be called after the map and layer are loaded in FoodRetailer
    const loadAllLayerData = async () => {
      try {
        // We'll implement the data loading in FoodRetailer and receive it via callback
        console.log("Waiting for layer data to load...");
      } catch (error) {
        console.error("Error loading layer data:", error);
        setIsTableLoading(false);
      }
    };
    
    loadAllLayerData();
  }, []);

  // Handle category selection
  const handleCategorySelect = (category) => {
    console.log("Food category selected:", category);
    setSelectedCategory(category);
  };

  // Handle area selection from map
  const handleAreaSelect = (geometry) => {
    setSelectedArea(geometry);
  };

  // Receive data from the map layer
  const handleLayerData = (data) => {
    setLayerData(data);
    setIsTableLoading(false);
  };

  // Handle table pagination
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
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
            Food Resources
          </Typography>
          <Tooltip title="Information about food resources">
            <IconButton onClick={handleOpenModal} color="primary">
              <InfoIcon />
            </IconButton>
          </Tooltip>
        </Box>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
        Find food resources by exploring the map or filtering by category. Discover shops that offer fresh produce and accept WIC benefits.
        </Typography>
      </Box>
      
      {/* Map Section - Full Width with improved visibility */}
      <Box
        sx={{
          width: "100%",
          height: isMobile ? "60vh" : "calc(100vh - 200px)", // Increased height, subtracting header and footer
          position: "relative",
          zIndex: 1,
          mb: 3,
          overflow: "visible", // Changed from "hidden" to ensure map controls are visible
          display: "flex",
          flexDirection: "column",
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
          <Box sx={{ flexGrow: 1, width: "100%", height: "100%" }}>
            <FoodRetailer
              onCategorySelect={handleCategorySelect} 
              onAreaSelect={handleAreaSelect}
              onLayerDataLoad={handleLayerData}
              setIsTableLoading={setIsTableLoading}
              // Ensure the component fills its container
              style={{ width: "100%", height: "100%" }}
            />
          </Box>
        )}
      </Box>

      {/* Table displaying layer data */}
      <Container maxWidth="xl" sx={{ mb: 4 }}>
        <Typography variant="h4" component="h2" sx={{ mb: 2 }}>
          Food Resources Data
        </Typography>
        
        <TableContainer component={Paper} sx={{ maxHeight: 440 }}>
          {isTableLoading ? (
            <Box display="flex" justifyContent="center" alignItems="center" p={3}>
              <CircularProgress />
            </Box>
          ) : layerData.length === 0 ? (
            <Box p={3}>
              <Typography variant="body1">No data available. Please interact with the map to load resources.</Typography>
            </Box>
          ) : (
            <>
              <Table stickyHeader aria-label="food resources table">
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Address</TableCell>
                    <TableCell>Category</TableCell>
                    <TableCell>Hours</TableCell>
                    <TableCell>Contact</TableCell>
                    <TableCell>Services</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {layerData
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, index) => (
                      <TableRow key={index} hover>
                        <TableCell>{row.name || 'N/A'}</TableCell>
                        <TableCell>{row.address || 'N/A'}</TableCell>
                        <TableCell>{row.category || 'N/A'}</TableCell>
                        <TableCell>{row.hours || 'N/A'}</TableCell>
                        <TableCell>{row.phone || 'N/A'}</TableCell>
                        <TableCell>{row.services || 'N/A'}</TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, 50]}
                component="div"
                count={layerData.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </>
          )}
        </TableContainer>
      </Container>

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
          
        </Paper>
      </Modal>

      {/* Footer */}
      <Footer />
    </Box>
  );
};

export default FoodPage;