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
  const isMediumScreen = useMediaQuery('(max-width:900px)');
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
      // Use window.visualViewport for more accurate mobile viewport measurements
      const height = window.visualViewport ? window.visualViewport.height : window.innerHeight;
      setViewportHeight(height);
    };
    
    updateHeight();
    
    let debounceTimer;
    const handleResize = () => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(updateHeight, 100);
    };
    
    window.addEventListener('resize', handleResize);
    
    // Also update on orientation change for mobile devices
    window.addEventListener('orientationchange', () => {
      // Delay slightly to allow browser to complete orientation change
      setTimeout(updateHeight, 200);
    });
    
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
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
  scrollableElement.style.scrollBehavior = 'smooth';
  scrollableElement.style.overflow = originalStyles.overflow;
  scrollableElement.style.height = originalStyles.height;
}, 1500);

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
            top: { xs: 8, sm: 16 },
            right: { xs: 8, sm: 16 },
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
    position: 'relative', // <- KEY CHANGE
    width: '100%',
    height: '100vh',
    zIndex: 5,
    transformOrigin: '50% 40%',
    willChange: 'transform, opacity',
    overflow: 'hidden',
  }}
>
        <Box
          sx={{
            width: '100%',
            maxWidth: '100vw',
            height: '100%',
            background: 'linear-gradient(145deg, #002855 0%, #002855 100%)',
            color: '#ffffff',
            boxShadow: '0 4px 30px rgba(0,0,0,0.25)',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            boxSizing: 'border-box',
            p: { xs: 0, sm: 3 }
          }}
        >
          {/* Background Pattern with parallax effect */}
          <motion.div
  style={{
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    willChange: 'transform',
    y: prefersReducedMotion ? 0 : patternYPos, // keep your parallax if needed
    zIndex: 0,
    overflow: 'hidden'
  }}
>
  <Box
    sx={{
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundImage: `url('https://static.wvu.edu/global/images/patterns/wvu/background__topo-white--2.0.0.svg')`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center center',
        opacity: 1,
        zIndex: 0
      }
    }}
  />
</motion.div>

          
          <Container 
            maxWidth="lg"
            disableGutters={isSmallScreen}
            sx={{
              overflowY: 'auto',
              maxHeight: '100vh',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              py: { xs: 4, sm: 2 },
              px: { xs: 0, sm: 3 },
              pb: { xs: 6, sm: 2 },
              boxSizing: 'border-box',
              margin: '0 auto',
              width: '100%'
            }}
          >
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              style={{
                width: '100%',
                boxSizing: 'border-box',
                padding: isSmallScreen ? '0 16px' : 0
              }}
            >
              {/* Logo Section */}
              <motion.div variants={itemVariants}>
  <Box 
    sx={{ 
      textAlign: 'center',
      mb: 3,
      position: 'relative',
      width: '100%',
    }}
  >
    <motion.img
      src="/foodlink_white.png"
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
        maxHeight: isSmallScreen ? '80px' : '110px',
        marginBottom: '8px',
        filter: 'drop-shadow(0px 2px 6px rgba(0,0,0,0.3))'
      }}
    />

    {/* WVU Shout Bar instead of Yellow Line */}
    <Box 
      className="wvu-bar wvu-bar--center wvu-bar--bottom wvu-shout"
      sx={{
        mt: 1, // Small margin top from logo
        width: "100%",
        display: "flex",
        justifyContent: "center",
      }}
    >
      {/* Optional: If you want a tiny custom adjustment */}
    </Box>

  </Box>
</motion.div>
              
              <motion.div variants={itemVariants}>
                <Typography 
                  variant="h2" component="h5"
                  sx={{ 
                    fontWeight: 400,
                    maxWidth: '100%',
                    mx: 'auto',
                    lineHeight: 1.6,
                    mt: { xs: 2, sm: 4 },
                    mb: { xs: 3, sm: 5 },
                    px: { xs: 0, sm: 2, md: 3 },
                    color: 'rgba(255,255,255,0.95)',
                    textAlign: 'center',
                    fontSize: { xs: '1rem', sm: '1.25rem', md: 'h5.fontSize' },
                    boxSizing: 'border-box',
                    width: '100%'
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
                      color: "#EAAA00",
                      textDecoration: 'none',
                      fontWeight: 500,
                      padding: '2px 4px',
                      minWidth: 'auto',
                      textTransform: 'none',
                      fontSize: 'inherit',
                      lineHeight: 'inherit',
                      zIndex: 10001,
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
                      color: "#EAAA00",
                      textDecoration: 'none',
                      fontWeight: 500,
                      padding: '2px 4px',
                      minWidth: 'auto',
                      textTransform: 'none',
                      fontSize: 'inherit',
                      lineHeight: 'inherit',
                      zIndex: 10001,
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
                    maxWidth: '100%',
                    mx: 'auto',
                    mb: { xs: 4, sm: 6 },
                    fontWeight: 500,
                    lineHeight: 1.8,
                    fontSize: { xs: '0.95rem', sm: '1.1rem', md: '1.25rem' },
                  }}
                >
                  Dedicated to improving access to affordable, nutritious, sustainable, and culturally appropriate food in West Virginia and beyond.
                </Typography>
              </motion.div>
              
              {/* Quick Access Cards with improved hover effects and mobile layout */}
              <Grid 
                container 
                spacing={isSmallScreen ? 1 : 3} 
                justifyContent="center" 
                sx={{ 
                  mb: { xs: 3, sm: 5 },
                  width: '100%',
                  margin: 0, // Remove default margin
                  boxSizing: 'border-box'
                }}
              >
                {[
                  { 
                    icon: <SearchIcon sx={{ fontSize: { xs: 24, md: 28 }, fill: "white", color: "white" }} />, 
                    text: "Find Food Assistance", 
                    color: "#1C2B39", 
                    link: "/food" 
                  },
                  { 
                    icon: <LayersIcon sx={{ fontSize: { xs: 24, md: 28 }, fill: "white", color: "white" }} />, 
                    text: "Explore Food Atlas", 
                    color: "#0062A3", 
                    link: "https://experience.arcgis.com/experience/61e914cf99364188a23f20b46721f2a3" 
                  },
                  { 
                    icon: <GroupIcon sx={{ fontSize: { xs: 24, md: 28 }, fill: "white", color: "white" }} />, 
                    text: "Organize Communities", 
                    color: "#002855", 
                    link: "https://organize-communities-wvu.hub.arcgis.com/pages/organize" 
                  },
                  { 
                    icon: <AccessTimeFilledIcon sx={{ fontSize: { xs: 24, md: 28 }, fill: "white", color: "white" }} />, 
                    text: "Access Resources", 
                    color: "#554741", 
                    link: "/home" 
                  }
                ].map((item, index) => (
                  <Grid 
                    item 
                    xs={6} 
                    sm={6} 
                    md={3} 
                    key={index}
                    sx={{ 
                      display: 'flex',
                      flexDirection: 'column',
                      padding: isSmallScreen ? '4px 8px' : undefined // Explicit padding for mobile
                    }}
                  >
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
                      style={{ height: '100%' }}
                      tabIndex={-1}
  aria-hidden="true"
                    >
                      <Button
                        component="a"
                        href={item.link}
                        sx={{
                          display: 'flex',
                          flexDirection: isSmallScreen ? 'column' : 'row',
                          alignItems: 'center',
                          width: '100%',
                          height: '100%',
                          bgcolor: item.color,
                          backdropFilter: 'blur(10px)',
                          border: '1px solid rgba(255,255,255,0.1)',
                          borderRadius: '16px',
                          p: isSmallScreen ? 1 : 2, // Reduced padding for mobile
                          gap: isSmallScreen ? 1 : 2,
                          cursor: 'pointer',
                          transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
                          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                          textTransform: 'none',
                          justifyContent: 'center', // Always center content
                          '&:hover': {
                            bgcolor: item.color,
                            boxShadow: `0 8px 20px rgba(0,0,0,0.15), 0 0 0 2px ${item.color}`,
                          },
                          willChange: 'transform, box-shadow, background-color',
                          zIndex: 10001,
                          boxSizing: 'border-box'
                        }}
                        aria-label={item.text}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Box sx={{ 
                          bgcolor: item.color, 
                          p: isSmallScreen ? 0.75 : 1.5, // Reduced padding for mobile
                          borderRadius: '12px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          boxShadow: '0 3px 6px rgba(0,0,0,0.2)',
                          flexShrink: 0,
                          mb: isSmallScreen ? 1 : 0
                        }}>
                          {item.icon}
                        </Box>
                        <Typography 
                          sx={{ 
                            fontWeight: 500, 
                            color: '#fff', 
                            textAlign: 'center', // Always center text
                            fontSize: { xs: '0.8rem', sm: '0.9rem', md: '1rem' },
                            lineHeight: 1.2,
                            width: '100%' // Ensure full width
                          }}
                        >
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
                  style={{ display: 'flex', justifyContent: 'center', width: '100%' }}
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
  variant="contained"
  onClick={handleExploreClick}
  endIcon={<KeyboardArrowDownIcon />}
  sx={{
    backgroundColor: "#EAAA00",   // WVU Gold
    color: "#002855",              // WVU Blue text
    fontWeight: 700,
    fontSize: { xs: '1.1rem', sm: '1.3rem', md: '1.5rem' }, // Bigger for importance
    textTransform: 'none',
    paddingX: { xs: 4, sm: 6 },
    paddingY: { xs: 1.5, sm: 2 },
    borderRadius: "32px",          // Make it a strong pill shape
    mt: { xs: 4, sm: 6 },           // More spacing from cards above
    transition: 'all 0.3s ease',
    boxShadow: '0 6px 14px rgba(0,0,0,0.25)', // Stronger shadow
    '&:hover': {
      backgroundColor: "#FFD54F",   // Slightly lighter WVU Gold
      color: "#002855",             // Stay WVU Blue text
      boxShadow: '0 8px 20px rgba(0,0,0,0.3)',
      transform: 'translateY(-2px)',
    },
    '&:focus': {
      outline: '2px solid #002855',
      outlineOffset: '3px',
    },
    willChange: 'transform, background-color, box-shadow',
  }}
>
  Explore FoodLink
</Button>



                </motion.div>
              )}
              
              {/* Non-animated button for reduced motion preference */}
              {prefersReducedMotion && (
                <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                  <Button
                    variant="outlined"
                    onClick={handleExploreClick}
                    endIcon={<KeyboardArrowDownIcon />}
                    sx={{
                      color: 'white',
                      borderColor: 'rgba(255,255,255,0.5)',
                      borderRadius: '24px',
                      px: { xs: 2, sm: 3 },
                      py: { xs: 1, sm: 1.2 },
                      fontSize: { xs: '0.85rem', sm: '0.95rem' },
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
        {!prefersReducedMotion && scrollProgress > 0.25 && (
  <Box
    sx={{
      position: 'fixed',
      bottom: { xs: 16, sm: 24 },
      right: { xs: 16, sm: 24 },
      zIndex: 10000,
    }}
  >
    <Button
      variant="contained"
      aria-label="Back to top"
      onClick={() =>
        window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' })
      }
      sx={{
        backgroundColor: "#EAAA00",
        color: "#002855",
        borderRadius: "24px",
        fontWeight: 600,
        boxShadow: '0 4px 8px rgba(0,0,0,0.3)',
        '&:hover': {
          backgroundColor: "#FFD54F"
        }
      }}
    >
      ↑ Top
    </Button>
  </Box>
)}

      </motion.div>
    </>
  );
};

export default IntroOverlay;