import React, { useState, useEffect } from 'react';
import { Box, Container, Typography, Grid, Button, useTheme, useMediaQuery } from '@mui/material';
import { motion, useScroll, useTransform } from 'framer-motion';
import SearchIcon from '@mui/icons-material/Search';
import LayersIcon from '@mui/icons-material/Layers';
import GroupIcon from '@mui/icons-material/Group';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import CurvedTransition from './CurvedTransition';

/**
 * IntroSection - A component that completely takes over the full page initially
 * and gradually disappears on scroll to reveal the website content
 * @param {Object} props
 * @param {Function} props.onExploreClick - Function to handle click on explore button
 * @param {Function} props.getResponsiveSpacing - Function to get responsive spacing
 */
const IntroSection = ({ onExploreClick, getResponsiveSpacing }) => {
  const theme = useTheme();
  const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
  
  // Enhanced scroll animation logic
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 400], [1, 0]); // Slower fade out
  const yPos = useTransform(scrollY, [0, 400], [0, -150]); // More movement
  const scale = useTransform(scrollY, [0, 400], [1, 0.9]); // More dramatic scaling
  
  // Set initial body style to prevent scrolling at first view
  useEffect(() => {
    // Store original styles
    const originalOverflow = document.body.style.overflow;
    const originalHeight = document.body.style.height;
    
    // Apply initial styles
    document.body.style.overflow = 'hidden';
    document.body.style.height = '100vh';
    
    // Return to normal after a delay to allow intro to be seen
    const timer = setTimeout(() => {
      document.body.style.overflow = originalOverflow;
      document.body.style.height = originalHeight;
    }, 1500);
    
    return () => {
      clearTimeout(timer);
      document.body.style.overflow = originalOverflow;
      document.body.style.height = originalHeight;
    };
  }, []);
  
  // Function to scroll to content when button is clicked
  const handleExploreClick = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    });
    
    if (onExploreClick) {
      onExploreClick();
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 }
    }
  };

  return (
    <motion.div
      style={{
        opacity,
        y: yPos,
        scale,
        position: 'fixed', // Fixed position to cover everything
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 1000, // Very high z-index to ensure it's above everything
        pointerEvents: opacity.get() < 0.1 ? 'none' : 'auto', // Disable interaction when nearly invisible
      }}
    >
      <Box
        sx={{
          width: '100vw',
          height: '100vh',
          background: 'linear-gradient(135deg, rgba(0,79,157,0.98) 0%, rgba(0,106,77,0.95) 100%)',
          color: '#ffffff',
          position: 'relative',
          boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {/* Background Pattern */}
        <Box 
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            opacity: 0.05,
            backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
          }}
        />
        
        <Container maxWidth="lg">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Title Section */}
            <motion.div variants={itemVariants}>
              <Typography 
                variant="h2" 
                component="h1" 
                sx={{ 
                  fontWeight: 800,
                  fontSize: { xs: '2.5rem', sm: '3rem', md: '3.75rem' },
                  letterSpacing: '-0.02em',
                  mb: 2,
                  textAlign: 'center',
                  textShadow: '0 2px 10px rgba(0,0,0,0.2)',
                  position: 'relative',
                  display: 'inline-block',
                  width: '100%',
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    bottom: -12,
                    left: '35%',
                    width: '30%',
                    height: 4,
                    background: '#f8cb4c',
                    borderRadius: 2
                  }
                }}
              >
                WV FOODLINK
              </Typography>
            </motion.div>
            
            <motion.div variants={itemVariants}>
              <Typography 
                variant="h5" 
                sx={{ 
                  fontWeight: 400,
                  maxWidth: '900px',
                  mx: 'auto',
                  lineHeight: 1.6,
                  mt: 4,
                  mb: 5,
                  px: getResponsiveSpacing ? getResponsiveSpacing(1, 2, 3) : { xs: 1, sm: 2, md: 3 },
                  color: 'rgba(255,255,255,0.95)',
                  textAlign: 'center',
                }}
              >
                A joint project of the WVU Center for Resilient Communities and the WVU Extension Family Nutrition program.
              </Typography>
            </motion.div>
            
            <motion.div variants={itemVariants}>
              <Typography 
                variant="h6"
                align="center" 
                sx={{ 
                  maxWidth: '950px',
                  mx: 'auto',
                  mb: 6,
                  fontWeight: 500,
                  lineHeight: 1.8,
                  fontSize: { xs: '1.1rem', md: '1.25rem' },
                }}
              >
                Dedicated to improving access to affordable, nutritious, sustainable, and culturally appropriate food in West Virginia and beyond.
              </Typography>
            </motion.div>
            
            {/* Quick Access Cards */}
            <Grid container spacing={3} justifyContent="center" sx={{ mb: 5 }}>
              {[
                { icon: <SearchIcon sx={{ fontSize: 28 }} />, text: "Find Food Assistance", color: "#002855" },
                { icon: <LayersIcon sx={{ fontSize: 28 }} />, text: "Explore Food Atlas", color: "#354F5B" },
                { icon: <GroupIcon sx={{ fontSize: 28 }} />, text: "Organize Communities", color: "#C84C23" },
                { icon: <AccessTimeFilledIcon sx={{ fontSize: 28 }} />, text: "Access Resources", color: "#39897E" }
              ].map((item, index) => (
                <Grid item xs={12} sm={6} md={3} key={index}>
                  <motion.div
                    variants={itemVariants}
                    whileHover={{ scale: 1.05, y: -5 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    <Box 
                      sx={{
                        bgcolor: 'rgba(255,255,255,0.08)',
                        backdropFilter: 'blur(10px)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: '16px',
                        p: 2,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 2,
                        height: '100%',
                        cursor: 'pointer',
                        '&:hover': {
                          bgcolor: 'rgba(255,255,255,0.15)',
                          boxShadow: `0 0 0 2px ${item.color}`,
                        }
                      }}
                    >
                      <Box sx={{ 
                        bgcolor: item.color, 
                        p: 1.5, 
                        borderRadius: '12px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        {item.icon}
                      </Box>
                      <Typography sx={{ fontWeight: 500, color: '#fff' }}>
                        {item.text}
                      </Typography>
                    </Box>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
            
            {/* Scroll Down Button with Animation */}
            <motion.div 
              variants={itemVariants}
              style={{ display: 'flex', justifyContent: 'center' }}
              animate={{ 
                y: [0, 8, 0], 
                transition: { 
                  repeat: Infinity, 
                  duration: 2 
                } 
              }}
            >
              <Button
                variant="outlined"
                onClick={handleExploreClick}
                endIcon={<KeyboardArrowDownIcon />}
                sx={{
                  color: 'white',
                  borderColor: 'rgba(255,255,255,0.5)',
                  borderRadius: '24px',
                  px: 3,
                  py: 1,
                  '&:hover': {
                    borderColor: 'white',
                    bgcolor: 'rgba(255,255,255,0.1)',
                  }
                }}
              >
                Explore Food Map
              </Button>
            </motion.div>
          </motion.div>
        </Container>
        
        {/* Curved bottom edge for smooth transition */}
        <CurvedTransition position="bottom" color="#fff" height={120} />
      </Box>
    </motion.div>
  );
};

export default IntroSection;