import React, { useState, useEffect } from 'react';
// Material UI imports
import { 
  Box, 
  Typography, 
  AppBar, 
  Toolbar, 
  Card, 
  CardContent, 
  CardMedia, 
  Container, 
  Grid, 
  IconButton, 
  Button, 
  Chip, 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions,
  Divider,
  useMediaQuery,
  Slide,
  Paper,
  MobileStepper,
  Zoom,
  Fade,
  Tooltip,
  Popper,
  Grow,
} from '@mui/material';
import { createTheme, ThemeProvider, alpha } from '@mui/material/styles';
import { 
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  Fullscreen as FullscreenIcon,
  FullscreenExit as FullscreenExitIcon,
  Info as InfoIcon,
  KeyboardArrowLeft,
  KeyboardArrowRight,
  OpenInNew as OpenInNewIcon,
  ZoomIn as ZoomInIcon,
  Close as CloseIcon
} from '@mui/icons-material';

// Custom theme with Appalachian color scheme
const theme = createTheme({
  palette: {
    primary: {
      main: '#002855', // Dark red for Appalachian theme
      light: '#B22222',
      dark: '#600000',
      contrastText: '#fff',
    },
    secondary: {
      main: '#2E8B57', // Forest green as secondary color
      light: '#3CB371',
      dark: '#006400',
      contrastText: '#fff',
    },
    background: {
      default: '#f5f5f5',
      paper: '#ffffff',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
    },
    h2: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 500,
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundImage: 'linear-gradient(to right, #002855, #B22222)',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          transition: 'transform 0.3s, box-shadow 0.3s',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: '0 12px 20px -10px rgba(0,0,0,0.2)',
          },
        },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          '&:last-child': {
            paddingBottom: 16,
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
        elevation1: {
          boxShadow: '0px 2px 8px rgba(0,0,0,0.1)',
        },
        elevation4: {
          boxShadow: '0px 4px 16px rgba(0,0,0,0.1)',
        },
      },
    },
  },
});

  // Animation utilities without external dependencies
const fadeInAnimation = {
  transition: 'opacity 0.5s ease, transform 0.5s ease',
  transform: 'translateY(0)',
  opacity: 1
};

const AppalachianFoodSystemsExplorer = () => {
  const [activeMap, setActiveMap] = useState(0);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [infoDialogOpen, setInfoDialogOpen] = useState(false);
  const [enlargedImageOpen, setEnlargedImageOpen] = useState(false); // State for enlarged iframe dialog
  const [previewAnchorEl, setPreviewAnchorEl] = useState(null);
  const [previewIndex, setPreviewIndex] = useState(null);
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  // Add touch handling for mobile swipe
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  // Minimum swipe distance threshold in pixels
  const minSwipeDistance = 50;

  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    
    if (isLeftSwipe && activeMap < maps.length - 1) {
      handleNext();
    } else if (isRightSwipe && activeMap > 0) {
      handleBack();
    }
  };

  const maps = [
    {
      id: 0,
      title: "Food System Futures in Appalachia",
      description: "Explore the future of food systems across the Appalachian region with interactive data visualization. This comprehensive map highlights regional food production, distribution networks, and sustainability initiatives.",
      url: "https://resiliencelink-wvu.hub.arcgis.com/apps/6851ae0f62a14137a443e37ede3dd4e9/explore",
      thumbnail: "https://wvu.maps.arcgis.com/sharing/rest/content/items/6851ae0f62a14137a443e37ede3dd4e9/info/thumbnail/thumbnail.jpeg?w=800"
    },
    {
      id: 1,
      title: "ARPA Allocations in West Virginia",
      description: "American Rescue Plan Act funding allocations throughout West Virginia counties and municipalities. Track how federal recovery funds are being distributed and utilized across different regions of the state.",
      url: "https://resiliencelink-wvu.hub.arcgis.com/apps/63a5215d19304d6f939d847aa298f82c/explore",
      thumbnail: "https://www.arcgis.com/sharing/rest/content/items/63a5215d19304d6f939d847aa298f82c/resources/DSC01129__1652099102644__w1920.jpg"
    },
    {
      id: 2,
      title: "Food Retail Change (2014-2019)",
      description: "Track the evolution of food retail across a five-year period across the region. This visualization shows the changing landscape of food access, including grocery stores, farmers markets, and other retail options.",
      url: "https://storymaps.arcgis.com/stories/e4a4cefa01ba4476b8a0fcc79d6a27af",
      thumbnail: "https://wvu.maps.arcgis.com/sharing/rest/content/items/8d3a4fd2cd4041408932d99ca3ccc7a8/info/thumbnail/thumbnail.jpeg?token=3NKHt6i2urmWtqOuugvr9WtJU0B9cpuTILtAZbdw6gc-CUfx3eZBokyIvYyRueQTpdLJzKwBk_AVtUjEOAKbwZ88hWol1DT_zidZ65BVC8yA2ls2QOw8O3tyUPfGamPDjVSDNLNVnf1R6Bo9FpMk2tJYJMVp10ZfnY-ps4xvRkE47uYZuhTDBGSo2tA-YwEu1yH_YZBUOpmRpC8_4MBjgg..&w=800"
    },
    {
      id: 3,
      title: "Right to Food Analysis: West Virginia",
      description: "Comprehensive analysis of food access and rights in West Virginia. This map examines food security, policy frameworks, and community initiatives designed to ensure equitable food access for all residents.",
      url: "https://resiliencelink-wvu.hub.arcgis.com/apps/86b6e9f79bcc417f8b374d905716e35f/explore",
      thumbnail: "https://wvu.maps.arcgis.com/sharing/rest/content/items/86b6e9f79bcc417f8b374d905716e35f/info/thumbnail/thumbnail.jpeg?w=800"
    },
  ];

  const toggleFullScreen = () => {
    setIsFullScreen(!isFullScreen);
  };

  const handleNext = () => {
    const nextIndex = (activeMap + 1) % maps.length;
    setActiveMap(nextIndex);
    
    // If the enlarged view is open, we need to refresh the iframe
    if (enlargedImageOpen) {
      // Close and reopen the dialog to force iframe refresh
      setEnlargedImageOpen(false);
      setTimeout(() => setEnlargedImageOpen(true), 100);
    }
  };

  const handleBack = () => {
    const prevIndex = (activeMap - 1 + maps.length) % maps.length;
    setActiveMap(prevIndex);
    
    // If the enlarged view is open, we need to refresh the iframe
    if (enlargedImageOpen) {
      // Close and reopen the dialog to force iframe refresh
      setEnlargedImageOpen(false);
      setTimeout(() => setEnlargedImageOpen(true), 100);
    }
  };

  const handlePreviewOpen = (event, index) => {
    setPreviewAnchorEl(event.currentTarget);
    setPreviewIndex(index);
  };

  const handlePreviewClose = () => {
    setPreviewAnchorEl(null);
    setPreviewIndex(null);
  };

  const handleCardClick = (index) => {
    // Set the active map
    setActiveMap(index);
    // Open the enlarged image view instead of scrolling to iframe
    setEnlargedImageOpen(true);
  };

  // Check if the preview is open
  const isPreviewOpen = Boolean(previewAnchorEl) && previewIndex !== null;
  
  return (
    <ThemeProvider theme={theme}>
      <Box 
        sx={{
          position: isFullScreen ? 'fixed' : 'relative',
          top: isFullScreen ? 0 : 'auto',
          left: isFullScreen ? 0 : 'auto',
          right: isFullScreen ? 0 : 'auto',
          bottom: isFullScreen ? 0 : 'auto',
          zIndex: isFullScreen ? 1300 : 1,
          height: isFullScreen ? '100vh' : 'auto',
          width: isFullScreen ? '100vw' : 'auto',
          bgcolor: 'background.default',
          borderRadius: isFullScreen ? 0 : 2,
          overflow: 'hidden',
          boxShadow: isFullScreen ? 'none' : '0 8px 30px rgba(0,0,0,0.12)',
          transition: 'all 0.3s ease-in-out'
        }}
      >
        
        
        {/* Explore Maps Section at the top */}
        {!isFullScreen && (
          <Box sx={{ 
            backgroundColor: 'white',
            py: 3,
            px: 3,
            borderBottom: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`
          }}>
           
            
            {isMobile ? (
              // Mobile View with Custom Carousel - Larger thumbnails
              <Box sx={{ maxWidth: '100%', flexGrow: 1 }}>
                <Box 
                  sx={{ 
                    display: 'flex',
                    overflowX: 'auto',
                    scrollSnapType: 'x mandatory',
                    scrollBehavior: 'smooth',
                    WebkitOverflowScrolling: 'touch',
                    '&::-webkit-scrollbar': { display: 'none' },
                    msOverflowStyle: 'none',
                    scrollbarWidth: 'none',
                    pb: 2,
                    mx: -1
                  }}
                >
                  {maps.map((map, index) => (
                    <Box 
                      key={map.id} 
                      sx={{ 
                        flexShrink: 0,
                        width: '280px',
                        scrollSnapAlign: 'start',
                        px: 1
                      }}
                    >
                      <Card 
                        onClick={() => handleCardClick(index)}
                        onMouseEnter={(e) => handlePreviewOpen(e, index)}
                        onMouseLeave={handlePreviewClose}
                        sx={{ 
                          borderColor: activeMap === index ? 'primary.main' : 'transparent',
                          borderWidth: activeMap === index ? 2 : 0,
                          borderStyle: 'solid',
                          height: '100%',
                          cursor: 'pointer',
                          position: 'relative'
                        }}
                      >
                        <CardMedia
                          component="img"
                          height="160"
                          image={map.thumbnail}
                          alt={map.title}
                          sx={{
                            position: 'relative',
                            '&::after': activeMap === index ? {
                              content: '""',
                              position: 'absolute',
                              top: 0,
                              left: 0,
                              right: 0,
                              bottom: 0,
                              backgroundColor: alpha(theme.palette.primary.main, 0.2)
                            } : {}
                          }}
                        />
                        <Box
                          sx={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            backgroundColor: 'rgba(0,0,0,0.5)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            opacity: 0,
                            transition: 'opacity 0.3s',
                            '&:hover': {
                              opacity: 1,
                            }
                          }}
                        >
                          <Button
                            variant="contained"
                            color="primary"
                            startIcon={<OpenInNewIcon />}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleCardClick(index);
                            }}
                          >
                            View Map
                          </Button>
                        </Box>
                        <CardContent sx={{ p: 2 }}>
                          <Typography variant="subtitle1" component="div" fontWeight={500}>
                            {map.title}
                          </Typography>
                          {activeMap === index && (
                            <Chip 
                              label="Active" 
                              size="small" 
                              color="primary" 
                              sx={{ mt: 1 }} 
                            />
                          )}
                        </CardContent>
                      </Card>
                    </Box>
                  ))}
                </Box>
                
                {/* Navigation Controls for Mobile */}
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                  {maps.map((_, index) => (
                    <Box
                      key={index}
                      onClick={() => {
                        setActiveMap(index);
                        if (enlargedImageOpen) {
                          setEnlargedImageOpen(false);
                          setTimeout(() => setEnlargedImageOpen(true), 100);
                        }
                      }}
                      sx={{
                        width: 12,
                        height: 12,
                        mx: 0.5,
                        borderRadius: '50%',
                        bgcolor: activeMap === index ? 'primary.main' : 'grey.300',
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                        transform: activeMap === index ? 'scale(1.2)' : 'scale(1)'
                      }}
                    />
                  ))}
                </Box>
              </Box>
            ) : (
              // Desktop Grid - Larger thumbnails in a better layout
              <>
                <Grid container spacing={2}>
                  {maps.map((map, index) => (
                    <Grid item xs={12} sm={6} md={3} key={map.id}>
                      <Card 
                        onClick={() => handleCardClick(index)}
                        onMouseEnter={(e) => handlePreviewOpen(e, index)}
                        onMouseLeave={handlePreviewClose}
                        sx={{ 
                          cursor: 'pointer',
                          borderColor: activeMap === index ? 'primary.main' : 'transparent',
                          borderWidth: activeMap === index ? 2 : 0,
                          borderStyle: 'solid',
                          transform: activeMap === index ? 'scale(1.03)' : 'scale(1)',
                          transition: 'transform 0.2s ease-in-out',
                          height: '100%',
                          position: 'relative'
                        }}
                      >
                        <CardMedia
                          component="img"
                          height="200"
                          image={map.thumbnail}
                          alt={map.title}
                          sx={{
                            position: 'relative',
                            '&::after': activeMap === index ? {
                              content: '""',
                              position: 'absolute',
                              top: 0,
                              left: 0,
                              right: 0,
                              bottom: 0,
                              backgroundColor: alpha(theme.palette.primary.main, 0.2)
                            } : {}
                          }}
                        />
                        <Box
                          sx={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            backgroundColor: 'rgba(0,0,0,0.5)',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: 2,
                            opacity: 0,
                            transition: 'opacity 0.3s',
                            '&:hover': {
                              opacity: 1,
                            }
                          }}
                        >
                          <Typography variant="body2" color="white" sx={{ mb: 2, textAlign: 'center' }}>
                            {map.description.split('.')[0] + '.'}
                          </Typography>
                          
                        </Box>
                        <CardContent sx={{ p: 2 }}>
                          <Typography variant="subtitle1" component="div" fontWeight={600} gutterBottom>
                            {map.title}
                          </Typography>
                          {activeMap === index && (
                            <Chip 
                              label="Active" 
                              size="small" 
                              color="primary" 
                              sx={{ mt: 0.5 }} 
                            />
                          )}
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
                
                {/* Navigation Controls for Desktop - Moved under thumbnails */}
                <Paper
                  elevation={2}
                  sx={{
                    mt: 3,
                    mx: 'auto',
                    borderRadius: 8,
                    overflow: 'hidden',
                    width: 'fit-content'
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', px: 2, py: 1 }}>
                    <IconButton size="small" onClick={handleBack} disabled={activeMap === 0}>
                      <KeyboardArrowLeft />
                    </IconButton>
                    {maps.map((_, index) => (
                      <Box
                        key={index}
                        onClick={() => {
                          setActiveMap(index);
                          // If the enlarged view is open, refresh iframe
                          if (enlargedImageOpen) {
                            setEnlargedImageOpen(false);
                            setTimeout(() => setEnlargedImageOpen(true), 100);
                          }
                        }}
                        sx={{
                          width: 12,
                          height: 12,
                          mx: 0.5,
                          borderRadius: '50%',
                          bgcolor: activeMap === index ? 'primary.main' : 'grey.300',
                          cursor: 'pointer',
                          transition: 'all 0.2s',
                          transform: activeMap === index ? 'scale(1.2)' : 'scale(1)'
                        }}
                      />
                    ))}
                    <IconButton size="small" onClick={handleNext} disabled={activeMap === maps.length - 1}>
                      <KeyboardArrowRight />
                    </IconButton>
                  </Box>
                </Paper>
              </>
            )}
          </Box>
        )}

        {/* Quick info callout removed */}

        {/* Enlarged Map Dialog with iframe */}
        <Dialog
          open={enlargedImageOpen}
          onClose={() => setEnlargedImageOpen(false)}
          maxWidth="xl"
          fullWidth
          fullScreen={isMobile}
          TransitionComponent={Zoom}
        >
          <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h6" component="div" fontWeight="bold" color="primary">
              {maps[activeMap].title}
            </Typography>
            <IconButton 
              edge="end" 
              color="inherit" 
              onClick={() => setEnlargedImageOpen(false)} 
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent dividers sx={{ p: 0, height: '75vh' }}>
            <Box
              component="iframe"
              src={maps[activeMap].url}
              title={maps[activeMap].title}
              sx={{
                width: '100%',
                height: '100%',
                border: 'none',
              }}
              allowFullScreen
            />
          </DialogContent>
          <DialogActions>
            <Button 
              onClick={handleBack} 
              disabled={activeMap === 0} 
              startIcon={<ChevronLeftIcon />}
            >
              Previous
            </Button>
            <Button 
              onClick={() => setEnlargedImageOpen(false)} 
              color="primary"
            >
              Close
            </Button>
            <Button 
              onClick={handleNext} 
              disabled={activeMap === maps.length - 1} 
              endIcon={<ChevronRightIcon />}
            >
              Next
            </Button>
          </DialogActions>
        </Dialog>

        {/* Info Dialog */}
        <Dialog
          open={infoDialogOpen}
          onClose={() => setInfoDialogOpen(false)}
          maxWidth="md"
          TransitionComponent={Slide}
          TransitionProps={{ direction: 'up' }}
        >
          <DialogTitle>
            <Typography variant="h5" component="div" fontWeight="bold" color="primary">
              {maps[activeMap].title}
            </Typography>
          </DialogTitle>
          <DialogContent dividers>
            <Typography variant="body1" paragraph>
              {maps[activeMap].description}
            </Typography>
            <Typography variant="body1" paragraph>
              This interactive map is part of a comprehensive study on food systems in the Appalachian region. 
              The data visualized here represents extensive research conducted by regional universities and 
              community partners working together to improve food access and sustainability.
            </Typography>
            <Box
              component="img"
              src={maps[activeMap].thumbnail}
              alt={`Preview of ${maps[activeMap].title}`}
              sx={{
                width: '100%',
                height: 'auto',
                maxHeight: 300,
                objectFit: 'cover',
                borderRadius: 1,
                mt: 2
              }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setInfoDialogOpen(false)} color="primary">
              Close
            </Button>
            <Button 
              variant="contained" 
              color="primary"
              onClick={() => {
                setInfoDialogOpen(true);
                setActiveMap(activeMap);
                setEnlargedImageOpen(true); // Open the enlarged image instead
              }}
            >
              View Map
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </ThemeProvider>
  );
};

export default AppalachianFoodSystemsExplorer;