import React from 'react';
import { Box, Typography, useMediaQuery, useTheme } from '@mui/material';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import SearchIcon from '@mui/icons-material/Search';

/**
 * MapRevealSection - A component that displays a map with a reveal animation
 * @param {Object} props
 * @param {React.ReactNode} props.mapComponent - The map component to display (e.g., FoodRetailer)
 * @param {string} props.title - Optional title to display above the map
 * @param {Object} props.sx - Additional styles to apply to the container
 */
const MapRevealSection = ({ mapComponent, title = "Interactive Food Access Map", sx = {} }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
  
  // Use Intersection Observer for better scroll detection
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: false,
    rootMargin: "-100px 0px"
  });
  
  return (
    <Box
      id="map-section"
      ref={ref}
      sx={{
        position: 'relative',
        width: `calc(100vw - ${scrollbarWidth}px)`,
        height: isMobile ? "70vh" : isTablet ? "80vh" : `calc(100vh - ${scrollbarWidth}px)`,
        overflow: 'hidden',
        mt: { xs: -5, md: -10 }, // Negative margin to create overlap with section above
        zIndex: 10,
        borderRadius: { xs: '24px 24px 0 0', md: '40px 40px 0 0' },
        boxShadow: '0 -20px 40px rgba(0,0,0,0.1)',
        ...sx
      }}
    >
      {/* Map Container with Animation */}
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={inView ? { y: 0, opacity: 1 } : { y: 100, opacity: 0 }}
        transition={{ 
          type: "spring", 
          stiffness: 60, 
          damping: 20,
          delay: 0.1
        }}
        style={{ width: '100%', height: '100%' }}
      >
        {/* Map Floating Header */}
        {title && (
          <Box
            sx={{
              position: 'absolute',
              top: 20,
              left: '50%',
              transform: 'translateX(-50%)',
              zIndex: 100,
              background: 'rgba(255,255,255,0.9)',
              backdropFilter: 'blur(8px)',
              borderRadius: '12px',
              boxShadow: '0 4px 30px rgba(0,0,0,0.1)',
              py: 1.5,
              px: 3,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '1px solid rgba(0,0,0,0.05)',
            }}
          >
            <Typography 
              variant="h6" 
              sx={{ 
                fontWeight: 600, 
                color: '#333',
                display: 'flex',
                alignItems: 'center',
                gap: 1
              }}
            >
              <SearchIcon color="primary" />
              {title}
            </Typography>
          </Box>
        )}
        
        {/* The map component */}
        {mapComponent}
      </motion.div>
    </Box>
  );
};

export default MapRevealSection;