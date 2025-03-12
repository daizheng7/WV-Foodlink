import React, { useState, useEffect, useMemo } from "react";
import { 
  Box, 
  Typography, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper, 
  TextField,
  Tabs,
  Tab,
  IconButton,
  CircularProgress,
  Tooltip,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TablePagination
} from "@mui/material";
import { 
  Download as DownloadIcon, 
  Info as InfoIcon, 
  Close as CloseIcon, 
  Map as MapIcon,
  Language as WebsiteIcon,
  NavigateBefore as PrevIcon,
  NavigateNext as NextIcon
} from "@mui/icons-material";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";

const FoodResourcesPanel = ({ 
  foodResourceLayers, 
  selectedCategory, 
  selectedArea, 
  onCategorySelect,
  webmapId,
  isMobile 
}) => {
  const [allFoodResources, setAllFoodResources] = useState([]);
  const [activeTab, setActiveTab] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedResource, setSelectedResource] = useState(null);
  const [detailsOpen, setDetailsOpen] = useState(false);

  // Pagination state
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Load categories from layer configuration
  useEffect(() => {
    const categoryTitles = foodResourceLayers.map(layer => layer.title);
    setCategories(categoryTitles);
    
    // Set default category if available and none is selected
    if (categoryTitles.length > 0 && !selectedCategory) {
      onCategorySelect(categoryTitles[0]);
    }
  }, [foodResourceLayers, onCategorySelect, selectedCategory]);

  // Update active tab when selected category changes
  useEffect(() => {
    if (selectedCategory) {
      const categoryIndex = categories.indexOf(selectedCategory);
      if (categoryIndex !== -1) {
        setActiveTab(categoryIndex);
        // Reset pagination when category changes
        setPage(0);
      }
    }
  }, [selectedCategory, categories]);

  // Fetch resources when selected category or area changes
  useEffect(() => {
    if (selectedCategory) {
      fetchFoodResources(selectedCategory);
    }
  }, [selectedCategory, selectedArea]);

  // Function to fetch resources for a category using ArcGIS FeatureLayer
  const fetchFoodResources = async (categoryTitle) => {
    setLoading(true);
    setError(null);
    
    try {
      // Find the layer configuration that matches the selected category
      const layerConfig = foodResourceLayers.find(layer => layer.title === categoryTitle);
      
      if (!layerConfig) {
        throw new Error(`No layer configuration found for category: ${categoryTitle}`);
      }
      
      // Create a feature layer using the portal item ID or webmapId if provided
      const featureLayer = new FeatureLayer({
        portalItem: { id: layerConfig.id }
      });
      
      // Create a query to get all features from the layer
      const query = featureLayer.createQuery();
      query.outFields = ["*"];
      query.returnGeometry = false;
      
      // If we have a selected area (county or region), filter by that geometry
      if (selectedArea) {
        query.geometry = selectedArea;
        query.spatialRelationship = "intersects";
      }
      
      // Execute the query
      const results = await featureLayer.queryFeatures(query);
      
      // Transform the features into a more usable format
      const resources = results.features.map(feature => {
        const attributes = feature.attributes;
        
        // Create a standardized resource object
        return {
          id: attributes.OBJECTID || attributes.FID || Math.random().toString(36).substr(2, 9),
          name: attributes.Name || attributes.SiteName || attributes.SITE_NAME || "Unknown",
          address: `${attributes.Address1 || attributes.ADDRESS || ""}, ${attributes.City || attributes.CITY || ""}, ${attributes.State || attributes.STATE || "WV"} ${attributes.Zip || attributes.ZIP || ""}`,
          phone: attributes.Phone_Number || attributes.PHONE || attributes.Phone || "",
          hours: attributes.Hours_of_Operation || attributes.HOURS || attributes.Hours || "Not specified",
          website: attributes.Website || attributes.WEBSITE || "",
          email: attributes.Email || attributes.EMAIL || "",
          description: attributes.Description || attributes.DESCRIPTION || "",
          // Include all original attributes for reference
          rawData: attributes,
          category: categoryTitle
        };
      });
      
      setAllFoodResources(resources);
      
    } catch (err) {
      console.error(`Error fetching data for food category ${categoryTitle}:`, err);
      setError(`Failed to load ${categoryTitle} resources. Please try again later.`);
      setAllFoodResources([]);
    } finally {
      setLoading(false);
    }
  };
  
  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
    // Get category name from tab index
    if (categories[newValue]) {
      onCategorySelect(categories[newValue]);
    }
  };

  // Download food resource information as a text file
  const handleDownloadResource = (resource) => {
    try {
      // Create a JSON string with formatted resource data
      const resourceData = JSON.stringify(resource.rawData, null, 2);
      
      // Create a blob with the data
      const blob = new Blob([resourceData], { type: 'application/json' });
      const url = window.URL.createObjectURL(blob);
      
      // Create a temporary link and trigger the download
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      a.download = `${resource.name.replace(/\s+/g, '-')}-info.json`;
      document.body.appendChild(a);
      a.click();
      
      // Clean up
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (err) {
      console.error(`Error downloading ${resource.name} information:`, err);
      alert(`Error downloading information for ${resource.name}. Please try again later.`);
    }
  };

  // Open detailed view of a resource
  const handleOpenDetails = (resource) => {
    setSelectedResource(resource);
    setDetailsOpen(true);
  };

  // Filter and search resources
  const filteredResources = useMemo(() => {
    return allFoodResources.filter(resource => 
      // Search across all fields and categories
      (searchTerm === '' || 
        resource.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        resource.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
        resource.phone.toLowerCase().includes(searchTerm.toLowerCase()) ||
        resource.category.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  }, [allFoodResources, searchTerm]);

  // Paginated resources
  const paginatedResources = useMemo(() => {
    const startIndex = page * rowsPerPage;
    return filteredResources.slice(startIndex, startIndex + rowsPerPage);
  }, [filteredResources, page, rowsPerPage]);

  // Pagination change handlers
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Render resource details dialog
  const renderResourceDetailsDialog = () => {
    if (!selectedResource) return null;

    return (
      <Dialog 
        open={detailsOpen} 
        onClose={() => setDetailsOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          {selectedResource.name}
          <IconButton
            aria-label="close"
            onClick={() => setDetailsOpen(false)}
            sx={{ position: 'absolute', right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Typography variant="body1">
              <strong>Category:</strong> {selectedResource.category}
            </Typography>
            <Typography variant="body1">
              <strong>Address:</strong> {selectedResource.address}
            </Typography>
            <Typography variant="body1">
              <strong>Phone:</strong> {selectedResource.phone || 'Not available'}
            </Typography>
            <Typography variant="body1">
              <strong>Hours:</strong> {selectedResource.hours}
            </Typography>
            {selectedResource.email && (
              <Typography variant="body1">
                <strong>Email:</strong> {selectedResource.email}
              </Typography>
            )}
            {selectedResource.description && (
              <Typography variant="body1">
                <strong>Description:</strong> {selectedResource.description}
              </Typography>
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          {selectedResource.website && (
            <Button
              startIcon={<WebsiteIcon />}
              href={selectedResource.website}
              target="_blank"
              rel="noopener noreferrer"
            >
              Visit Website
            </Button>
          )}
          <Button 
            startIcon={<DownloadIcon />}
            onClick={() => handleDownloadResource(selectedResource)}
          >
            Download Info
          </Button>
        </DialogActions>
      </Dialog>
    );
  };

  return (
    <Box
      sx={{
        width: "100%",
        padding: 2,
        backgroundColor: "#f0f4f8",
        border: "1px solid #e0e4e8",
        borderRadius: 3,
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.08)",
      }}
    >
      {/* Search Field */}
      <TextField
        fullWidth
        variant="outlined"
        label="Search All Resources"
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          setPage(0); // Reset to first page when searching
        }}
        sx={{ marginBottom: 2 }}
        InputProps={{
          sx: {
            borderRadius: 2,
            backgroundColor: 'white'
          }
        }}
      />
      
      {/* Tabs for Categories */}
      {categories.length > 0 && (
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons="auto"
          sx={{ 
            marginBottom: 2,
            '& .MuiTabs-indicator': { 
              backgroundColor: '#2c3e50' 
            }
          }}
        >
          {categories.map((category, index) => (
            <Tab 
              key={index} 
              label={category} 
              sx={{
                '&.Mui-selected': {
                  color: '#2c3e50',
                  fontWeight: 600
                }
              }}
            />
          ))}
        </Tabs>
      )}
      
      {/* Error and Loading States */}
      {error && (
        <Typography variant="body1" color="error" sx={{ marginTop: 2, textAlign: 'center' }}>
          {error}
        </Typography>
      )}
      
      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", marginTop: 4 }}>
          <CircularProgress color="primary" />
        </Box>
      ) : (
        <>
          {/* Resources Table */}
          {filteredResources.length > 0 ? (
            <>
              <TableContainer component={Paper} elevation={0} sx={{ borderRadius: 2 }}>
                <Table sx={{ minWidth: 300 }} aria-label="food resources table">
                  <TableHead sx={{ backgroundColor: '#f1f5f9' }}>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 600 }}>Name</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>Category</TableCell>
                      {!isMobile && <TableCell sx={{ fontWeight: 600 }}>Address</TableCell>}
                      <TableCell sx={{ fontWeight: 600 }}>Phone</TableCell>
                      {!isMobile && <TableCell sx={{ fontWeight: 600 }}>Hours</TableCell>}
                      <TableCell sx={{ fontWeight: 600 }}>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {paginatedResources.map((resource) => (
                      <TableRow 
                        key={resource.id} 
                        hover
                        sx={{ 
                          '&:last-child td, &:last-child th': { border: 0 },
                          transition: 'background-color 0.2s',
                          '&:hover': { backgroundColor: '#f4f4f4' }
                        }}
                      >
                        <TableCell component="th" scope="row">
                          {resource.name}
                        </TableCell>
                        <TableCell>{resource.category}</TableCell>
                        {!isMobile && <TableCell>{resource.address}</TableCell>}
                        <TableCell>{resource.phone}</TableCell>
                        {!isMobile && <TableCell>{resource.hours}</TableCell>}
                        <TableCell>
                          <Tooltip title="View Details">
                            <IconButton 
                              size="small" 
                              color="primary"
                              onClick={() => handleOpenDetails(resource)}
                              sx={{ mr: 1 }}
                            >
                              <InfoIcon />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Download Resource Info">
                            <IconButton 
                              size="small" 
                              color="secondary"
                              onClick={() => handleDownloadResource(resource)}
                            >
                              <DownloadIcon />
                            </IconButton>
                          </Tooltip>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>

              {/* Pagination */}
              <TablePagination
                rowsPerPageOptions={[10, 25, 50]}
                component="div"
                count={filteredResources.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </>
          ) : (
            <Typography 
              variant="body1" 
              sx={{ 
                textAlign: "center", 
                marginTop: 4, 
                color: '#6b7280',
                fontStyle: 'italic'
              }}
            >
              No resources found 
              {searchTerm ? ` matching "${searchTerm}"` : ''}
            </Typography>
          )}
          
          {/* Empty state when no category is selected */}
          {!selectedCategory && (
            <Typography 
              variant="body1" 
              sx={{ 
                textAlign: "center", 
                marginTop: 4, 
                color: '#6b7280',
                fontStyle: 'italic'
              }}
            >
              Select a category from the map or tabs above to view assistance resources
            </Typography>
          )}
        </>
      )}

      {/* Resource Details Dialog */}
      {renderResourceDetailsDialog()}
    </Box>
  );
};

export default FoodResourcesPanel;