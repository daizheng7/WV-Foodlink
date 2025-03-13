import React, { useState, useEffect, useRef } from 'react';
import { Box, Container, Typography, Grid, Button, useMediaQuery, Link } from '@mui/material';
import { motion, useScroll, useTransform, useSpring, useMotionValueEvent } from 'framer-motion';
import SearchIcon from '@mui/icons-material/Search';
import LayersIcon from '@mui/icons-material/Layers';
import GroupIcon from '@mui/icons-material/Group';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

/**
 * IntroOverlay - A component that takes over the full viewport on the homepage
 * and gradually disappears when the user scrolls down
 * @param {Object} props
 * @param {boolean} props.hasScrolled - Whether the user has scrolled down
 * @param {Function} props.onExploreClick - Function to call when explore button is clicked
 */
const IntroOverlay = ({ hasScrolled, onExploreClick }) => {
  const overlayRef = useRef(null);
  const [viewportHeight, setViewportHeight] = useState(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const isSmallScreen = useMediaQuery('(max-width:600px)');
  const [scrollProgress, setScrollProgress] = useState(0);
  
  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    
    const handleChange = (e) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);
  
  // Update viewport height with debouncing for performance
  useEffect(() => {
    const updateHeight = () => {
      setViewportHeight(window.innerHeight);
    };
    
    updateHeight();
    
    let debounceTimer;
    const handleResize = () => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(updateHeight, 100);
    };
    
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(debounceTimer);
    };
  }, []);
  
  // Use IntersectionObserver for better performance than scroll events
  useEffect(() => {
    if (!overlayRef.current) return;
    
    const observerOptions = {
      root: null, // viewport
      threshold: Array.from({ length: 11 }, (_, i) => i / 10), // 0, 0.1, 0.2, ..., 1
    };
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        // IntersectionRatio gives us 0-1 value for how much is visible
        setScrollProgress(1 - entry.intersectionRatio);
      });
    }, observerOptions);
    
    observer.observe(overlayRef.current);
    return () => observer.disconnect();
  }, [overlayRef.current]);
  
  // Scroll animation logic with improved spring physics
  const { scrollY } = useScroll();
  
  // Track scroll position for performance debugging and optimizations
  useMotionValueEvent(scrollY, "change", (latest) => {
    // You could uncomment this for debugging performance
    // console.log("Scroll position:", latest);
  });
  
  // Create smoother transitions with springs
  const springConfig = { 
    stiffness: prefersReducedMotion ? 300 : 80, 
    damping: prefersReducedMotion ? 30 : 18, 
    mass: prefersReducedMotion ? 0.5 : 1 
  };
  
  // Y position transformation with spring physics for smoother movement
  const yPosRaw = useTransform(
    scrollY, 
    [0, viewportHeight * 0.8], 
    [0, -viewportHeight]
  );
  const yPos = useSpring(yPosRaw, springConfig);
  
  // Scale starts at 1 and very subtly reduces - more subtle than before
  const scaleRaw = useTransform(
    scrollY,
    [0, viewportHeight * 0.5],
    [1, 0.98]
  );
  const scale = useSpring(scaleRaw, { ...springConfig, stiffness: 200 });
  
  // Opacity transformation with spring physics
  const opacityRaw = useTransform(
    scrollY,
    [0, viewportHeight * 0.7],
    [1, 0]
  );
  const opacity = useSpring(opacityRaw, springConfig);
  
  // Background pattern subtle parallax effect
  const patternYPos = useTransform(
    scrollY,
    [0, viewportHeight],
    [0, viewportHeight * 0.1]
  );
  
  // Skip button visibility
  const [showSkipButton, setShowSkipButton] = useState(true);
  
  // Function to handle the explore button click with improved scroll physics
  const handleExploreClick = () => {
    // Hide the skip button when clicking explore
    setShowSkipButton(false);
    
    if (onExploreClick) {
      onExploreClick();
    } else {
      // Use the IntersectionObserver target element as the scroll target
      const targetScrollY = viewportHeight;
      
      // Use native smooth scrolling for better performance
      window.scrollTo({
        top: targetScrollY,
        behavior: prefersReducedMotion ? 'auto' : 'smooth'
      });
    }
  };

  // Create a more consistent scroll unlocking experience
  useEffect(() => {
    if (prefersReducedMotion) {
      // Skip animations for users who prefer reduced motion
      return;
    }
    
    const scrollableElement = document.scrollingElement || document.documentElement;
    const originalStyles = {
      overflow: scrollableElement.style.overflow,
      scrollBehavior: scrollableElement.style.scrollBehavior,
      height: scrollableElement.style.height
    };
    
    // Lock scrolling initially
    scrollableElement.style.overflow = 'hidden';
    scrollableElement.style.height = '100vh';
    
    // Release after a delay with smooth animation
    const timer = setTimeout(() => {
      // Apply smooth scrolling behavior for when scrolling is unlocked
      scrollableElement.style.scrollBehavior = 'smooth';
      scrollableElement.style.overflow = originalStyles.overflow;
      scrollableElement.style.height = originalStyles.height;
      
      // Create subtle scroll hint after unlocking
      setTimeout(() => {
        window.scrollTo({
          top: 10,
          behavior: 'smooth'
        });
      }, 300);
    }, 1500);
    
    return () => {
      clearTimeout(timer);
      // Restore original styles
      scrollableElement.style.overflow = originalStyles.overflow;
      scrollableElement.style.height = originalStyles.height;
      scrollableElement.style.scrollBehavior = originalStyles.scrollBehavior;
    };
  }, [prefersReducedMotion]);

  // Animation variants with better timing
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: prefersReducedMotion ? 0.05 : 0.15,
        delayChildren: prefersReducedMotion ? 0.1 : 0.2,
        duration: prefersReducedMotion ? 0.3 : 0.8,
        ease: [0.25, 0.1, 0.25, 1] // Cubic bezier for more natural timing
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: prefersReducedMotion ? 10 : 25, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { 
        type: "spring", 
        stiffness: prefersReducedMotion ? 100 : 60,
        damping: prefersReducedMotion ? 20 : 15,
        mass: prefersReducedMotion ? 0.8 : 1.2
      }
    }
  };

  return (
    <>
      {/* Skip animation button */}
      {showSkipButton && !prefersReducedMotion && (
        <Box 
          sx={{
            position: 'fixed',
            top: 16,
            right: 16,
            zIndex: 10000,
            opacity: 0.7,
            transition: 'opacity 0.2s',
            '&:hover': {
              opacity: 1
            }
          }}
        >
          <Button
            size="small"
            variant="outlined"
            onClick={handleExploreClick}
            sx={{
              color: 'white',
              borderColor: 'rgba(255,255,255,0.3)',
              fontSize: '0.75rem',
              py: 0.5,
              px: 1.5,
              backdropFilter: 'blur(4px)',
              backgroundColor: 'rgba(0,0,0,0.2)',
              '&:hover': {
                backgroundColor: 'rgba(0,0,0,0.4)',
                borderColor: 'white'
              }
            }}
          >
            Skip Intro
          </Button>
        </Box>
      )}
    
      <motion.div
        ref={overlayRef}
        style={{
          opacity,
          y: yPos,
          scale: prefersReducedMotion ? 1 : scale,
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: '100vh',
          zIndex: 9999,
          pointerEvents: hasScrolled ? 'none' : 'auto',
          transformOrigin: '50% 40%',
          willChange: 'transform, opacity', // Optimize GPU acceleration
        }}
        aria-hidden={hasScrolled} // Accessibility improvement
      >
        <Box
          sx={{
            width: '100%',
            height: '100%',
            background: 'linear-gradient(145deg, #8b0000 0%, #6a0000 100%)',
            color: '#ffffff',
            boxShadow: '0 4px 30px rgba(0,0,0,0.25)',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {/* Background Pattern with parallax effect */}
          <motion.div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '120%',
              y: prefersReducedMotion ? 0 : patternYPos,
              willChange: 'transform', // Optimize for layer composition
            }}
          >
            <Box 
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                opacity: 0.07,
                backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
              }}
            />
          </motion.div>
          
          <Container maxWidth="lg">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {/* Logo Section */}
              <motion.div variants={itemVariants}>
                <Box 
                  sx={{ 
                    textAlign: 'center',
                    mb: 3,
                    position: 'relative',
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      bottom: -12,
                      left: '35%',
                      width: '30%',
                      height: 4,
                      background: '#f8cb4c',
                      borderRadius: 2,
                      boxShadow: '0 2px 8px rgba(248,203,76,0.4)',
                    }
                  }}
                >
                  <motion.img
                    src="https://www.arcgis.com/sharing/rest/content/items/0c60d0d0fe1a4746a40284e0fdda8e87/resources/Foodlink_use_mePNG-e1497287846786.png?v=1734104308181"
                    alt="Foodlink Logo"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      type: "spring",
                      stiffness: 80,
                      damping: 10
                    }}
                    style={{
                      maxWidth: '100%',
                      height: 'auto',
                      maxHeight: '110px',
                      marginBottom: '8px',
                      filter: 'drop-shadow(0px 2px 6px rgba(0,0,0,0.3))'
                    }}
                  />
                </Box>
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
                    px: { xs: 1, sm: 2, md: 3 },
                    color: 'rgba(255,255,255,0.95)',
                    textAlign: 'center',
                  }}
                >
                  A joint project of the{' '}
                  <Button
                    component="a"
                    href="https://resilientcommunities.wvu.edu/"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    sx={{
                      color: '#f8cb4c',
                      textDecoration: 'none',
                      fontWeight: 500,
                      padding: '2px 4px',
                      minWidth: 'auto',
                      textTransform: 'none',
                      fontSize: 'inherit',
                      lineHeight: 'inherit',
                      zIndex: 10001, // Higher z-index to ensure clickability
                      '&:hover': {
                        color: '#ffe180',
                        textDecoration: 'underline',
                        background: 'transparent',
                      },
                      '&:focus': {
                        outline: '2px solid #ffe180',
                        outlineOffset: '2px',
                      }
                    }}
                  >
                    WVU Center for Resilient Communities
                  </Button>
                  {' '}and the{' '}
                  <Button
                    component="a"
                    href="https://extension.wvu.edu/food-health/nutrition/fnp"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    sx={{
                      color: '#f8cb4c',
                      textDecoration: 'none',
                      fontWeight: 500,
                      padding: '2px 4px',
                      minWidth: 'auto',
                      textTransform: 'none',
                      fontSize: 'inherit',
                      lineHeight: 'inherit',
                      zIndex: 10001, // Higher z-index to ensure clickability
                      '&:hover': {
                        color: '#ffe180',
                        textDecoration: 'underline',
                        background: 'transparent',
                      },
                      '&:focus': {
                        outline: '2px solid #ffe180',
                        outlineOffset: '2px',
                      }
                    }}
                  >
                    WVU Extension Family Nutrition Program
                  </Button>
                  .
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
              
              {/* Quick Access Cards with improved hover effects */}
              <Grid container spacing={isSmallScreen ? 2 : 3} justifyContent="center" sx={{ mb: 5 }}>
                {[
                  { icon: <SearchIcon sx={{ fontSize: 28 }} />, text: "Find Food Assistance", color: "#a71d1d", link: "#find-assistance" },
                  { icon: <LayersIcon sx={{ fontSize: 28 }} />, text: "Explore Food Atlas", color: "#354F5B", link: "#food-atlas" },
                  { icon: <GroupIcon sx={{ fontSize: 28 }} />, text: "Organize Communities", color: "#C84C23", link: "#organize" },
                  { icon: <AccessTimeFilledIcon sx={{ fontSize: 28 }} />, text: "Access Resources", color: "#39897E", link: "#resources" }
                ].map((item, index) => (
                  <Grid item xs={12} sm={6} md={3} key={index}>
                    <motion.div
                      variants={itemVariants}
                      whileHover={prefersReducedMotion ? {} : { 
                        scale: 1.05, 
                        y: -5,
                        transition: {
                          type: "spring",
                          stiffness: 300,
                          damping: 15
                        }
                      }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button
                        component="a"
                        href={item.link}
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          width: '100%',
                          height: '100%',
                          bgcolor: 'rgba(255,255,255,0.08)',
                          backdropFilter: 'blur(10px)',
                          border: '1px solid rgba(255,255,255,0.1)',
                          borderRadius: '16px',
                          p: 2,
                          gap: 2,
                          cursor: 'pointer',
                          transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
                          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                          textTransform: 'none',
                          justifyContent: 'flex-start',
                          '&:hover': {
                            bgcolor: 'rgba(255,255,255,0.15)',
                            boxShadow: `0 8px 20px rgba(0,0,0,0.15), 0 0 0 2px ${item.color}`,
                          },
                          // Optimize for compositing
                          willChange: 'transform, box-shadow, background-color',
                          zIndex: 10001,
                        }}
                        aria-label={item.text}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Box sx={{ 
                          bgcolor: item.color, 
                          p: 1.5, 
                          borderRadius: '12px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          boxShadow: '0 3px 6px rgba(0,0,0,0.2)',
                          flexShrink: 0
                        }}>
                          {item.icon}
                        </Box>
                        <Typography sx={{ fontWeight: 500, color: '#fff', textAlign: 'left' }}>
                          {item.text}
                        </Typography>
                      </Button>
                    </motion.div>
                  </Grid>
                ))}
              </Grid>
              
              {/* Scroll Down Button with Animation */}
              {!prefersReducedMotion && (
                <motion.div 
                  variants={itemVariants}
                  style={{ display: 'flex', justifyContent: 'center' }}
                  animate={{ 
                    y: [0, 8, 0], 
                    transition: { 
                      repeat: Infinity, 
                      duration: 2.2,
                      ease: "easeInOut"
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
                      py: 1.2,
                      fontSize: '0.95rem',
                      fontWeight: 500,
                      transition: 'all 0.3s ease',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                      '&:hover': {
                        borderColor: 'white',
                        bgcolor: 'rgba(255,255,255,0.1)',
                        transform: 'translateY(-2px)',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                      },
                      // Optimize for compositing
                      willChange: 'transform, box-shadow'
                    }}
                  >
                    Explore Food Map
                  </Button>
                </motion.div>
              )}
              
              {/* Non-animated button for reduced motion preference */}
              {prefersReducedMotion && (
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                  <Button
                    variant="outlined"
                    onClick={handleExploreClick}
                    endIcon={<KeyboardArrowDownIcon />}
                    sx={{
                      color: 'white',
                      borderColor: 'rgba(255,255,255,0.5)',
                      borderRadius: '24px',
                      px: 3,
                      py: 1.2,
                      fontSize: '0.95rem',
                      fontWeight: 500,
                      '&:hover': {
                        borderColor: 'white',
                        bgcolor: 'rgba(255,255,255,0.1)',
                      }
                    }}
                  >
                    Explore Food Map
                  </Button>
                </Box>
              )}
            </motion.div>
          </Container>
        </Box>
      </motion.div>
    </>
  );
};

export default IntroOverlay;