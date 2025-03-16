import React, { useState, useEffect } from "react";
import { Box, Typography, Card, CardContent, Link, useMediaQuery, useTheme, Grid, IconButton } from "@mui/material";
import { motion } from "framer-motion";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import ChildFriendlyIcon from "@mui/icons-material/ChildFriendly";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import DirectionsBusIcon from "@mui/icons-material/DirectionsBus";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";
import HomeIcon from "@mui/icons-material/Home";
import LaunchIcon from "@mui/icons-material/Launch";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const stats = [
  {
    title: "Poverty Rate",
    value: "16.7%",
    description: "West Virginia's poverty rate compared to the national average of 11.1%.",
    icon: <TrendingUpIcon sx={{ fontSize: 60, color: "#fff" }} />,
    bgColor: "#8B0000",
    link: "https://www.wvpolicy.org/data/poverty-in-west-virginia/",
    org: "WV Center on Budget & Policy"
  },
  {
    title: "Child Poverty",
    value: "1 in 5",
    description: "Children in poverty represent 20% of the state's population.",
    icon: <ChildFriendlyIcon sx={{ fontSize: 60, color: "#fff" }} />,
    bgColor: "#C84C23",
    link: "https://www.childrensdefense.org/state/west-virginia/",
    org: "Children's Defense Fund"
  },
  {
    title: "Food Insecurity",
    value: "16.3%",
    description: "Households affected by food insecurity from 2018 to 2022.",
    icon: <RestaurantIcon sx={{ fontSize: 60, color: "#fff" }} />,
    bgColor: "#B1B5AB",
    link: "https://feedingamerica.org/hunger-in-america/west-virginia/",
    org: "Feeding America"
  },
  {
    title: "Fresh Produce Access",
    value: "12%",
    description: "Only 12% of food retailers in WV offer fresh produce.",
    icon: <ShoppingCartIcon sx={{ fontSize: 60, color: "#fff" }} />,
    bgColor: "#445525",
    link: "https://www.wvfarm2school.org/food-access",
    org: "WV Farm to School"
  },
  {
    title: "Food Deserts",
    value: "20%",
    description: "Residents live over 50 miles from the nearest fresh produce retailer.",
    icon: <LocationOnIcon sx={{ fontSize: 60, color: "#fff" }} />,
    bgColor: "#39897E",
    link: "https://www.ruralhealthinfo.org/states/west-virginia",
    org: "Rural Health Info"
  },
  {
    title: "Population Decline",
    value: "Net Loss: 34,000",
    description: "From 2020-2023, births: 55,000, deaths: 89,000.",
    icon: <PeopleAltIcon sx={{ fontSize: 60, color: "#fff" }} />,
    bgColor: "#354F5B",
    link: "https://www.wvpublic.org/section/population",
    org: "WV Public Broadcasting"
  },
  {
    title: "Transportation Barriers",
    value: "42%",
    description: "Rural residents with limited access to public transportation.",
    icon: <DirectionsBusIcon sx={{ fontSize: 60, color: "#fff" }} />,
    bgColor: "#5D4037",
    link: "https://www.transportation.wv.gov/publictransit/",
    org: "WV Dept of Transportation"
  },
  {
    title: "Income Disparity",
    value: "$13K",
    description: "Income gap between WV median income and national average.",
    icon: <LocalAtmIcon sx={{ fontSize: 60, color: "#fff" }} />,
    bgColor: "#1565C0",
    link: "https://www.wvpolicy.org/data/income-inequality/",
    org: "WV Center on Budget & Policy"
  },
  {
    title: "Rising Housing Costs",
    value: "+21%",
    description: "Increase in housing costs since 2020, outpacing wage growth.",
    icon: <HomeIcon sx={{ fontSize: 60, color: "#fff" }} />,
    bgColor: "#6A1B9A",
    link: "https://www.wvhousing.org/data",
    org: "WV Housing Development Fund"
  },
];

const IssuesSection = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  
  // For manual navigation on mobile
  const [currentIndex, setCurrentIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  
  // Calculate items to show based on screen size
  const itemsToShow = isMobile ? 1 : isTablet ? 2 : 3;
  
  // Handle manual navigation
  const handleNext = () => {
    setPaused(true);
    setCurrentIndex((prev) => (prev + 1) % stats.length);
  };
  
  const handlePrev = () => {
    setPaused(true);
    setCurrentIndex((prev) => (prev - 1 + stats.length) % stats.length);
  };
  
  // Resume animation after pause
  useEffect(() => {
    if (paused) {
      const timer = setTimeout(() => setPaused(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [paused]);

  // Calculate card width based on screen size
  const getCardWidth = () => {
    if (isMobile) return "85vw";
    if (isTablet) return "45vw";
    return "300px";
  };

  // Render either grid or carousel based on screen size
  return (
    <Box sx={{ py: 6, px: { xs: 2, sm: 3 }, background: "#f4f4f4", borderRadius: "12px", textAlign: "center" }}>
      <Typography variant="h4" sx={{ fontWeight: "bold", mb: 2, color: "#333", fontSize: { xs: "1.5rem", md: "2rem" } }}>
        Challenges in West Virginia
      </Typography>
      <Typography variant="body1" sx={{ maxWidth: "700px", mx: "auto", mb: 4, color: "#555" }}>
        West Virginia faces significant challenges such as high poverty rates, food insecurity, and a declining population. Immediate action is needed to create a better future.
      </Typography>
      
      {isMobile || isTablet ? (
        // Mobile and Tablet View: Manual Carousel with Navigation Buttons
        <Box sx={{ position: "relative", overflow: "hidden", width: "100%" }}>
          <Box 
            sx={{ 
              display: "flex", 
              overflowX: "hidden",
              width: "100%", 
              justifyContent: "center",
              alignItems: "center",
              px: 1
            }}
          >
            {Array.from({ length: itemsToShow }).map((_, i) => {
              const itemIndex = (currentIndex + i) % stats.length;
              const item = stats[itemIndex];
              
              return (
                <Box 
                  key={`item-${itemIndex}`} 
                  sx={{ 
                    width: getCardWidth(), 
                    mx: 1, 
                    flexShrink: 0 
                  }}
                >
                  <Card
                    component={Link}
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{ 
                      p: { xs: 2, sm: 3 }, 
                      backgroundColor: item.bgColor, 
                      color: "#fff", 
                      borderRadius: "12px", 
                      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                      textDecoration: "none",
                      transition: "transform 0.3s ease, box-shadow 0.3s ease",
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      "&:hover": {
                        transform: "translateY(-5px)",
                        boxShadow: "0 8px 20px rgba(0,0,0,0.15)"
                      }
                    }}
                  >
                    <CardContent>
                      <Box sx={{ flexGrow: 1 }}>
                        {item.icon}
                        <Typography variant="h5" sx={{ fontWeight: "bold", mt: 2, fontSize: { xs: "1.2rem", sm: "1.5rem" } }}>
                          {item.title}
                        </Typography>
                        <Typography variant="h3" sx={{ fontWeight: "bold", my: 1, fontSize: { xs: "1.8rem", sm: "2.5rem" } }}>
                          {item.value}
                        </Typography>
                        <Typography variant="body2" sx={{ fontSize: { xs: "0.8rem", sm: "0.875rem" } }}>
                          {item.description}
                        </Typography>
                      </Box>
                      
                      <Box sx={{ 
                        display: "flex", 
                        alignItems: "center", 
                        justifyContent: "center", 
                        mt: 3,
                        pt: 2, 
                        borderTop: "1px solid rgba(255,255,255,0.3)"
                      }}>
                        <Typography variant="caption" sx={{ fontSize: "0.8rem", opacity: 0.9 }}>
                          {item.org} <LaunchIcon sx={{ fontSize: "0.8rem", ml: 0.5, verticalAlign: "middle" }} />
                        </Typography>
                      </Box>
                    </CardContent>
                  </Card>
                </Box>
              );
            })}
          </Box>
          
          {/* Navigation buttons */}
          <IconButton 
            onClick={handlePrev}
            sx={{ 
              position: "absolute", 
              left: 0, 
              top: "50%", 
              transform: "translateY(-50%)",
              backgroundColor: "rgba(255,255,255,0.7)",
              "&:hover": { backgroundColor: "rgba(255,255,255,0.9)" },
              zIndex: 2
            }}
          >
            <ArrowBackIosNewIcon />
          </IconButton>
          
          <IconButton 
            onClick={handleNext}
            sx={{ 
              position: "absolute", 
              right: 0, 
              top: "50%", 
              transform: "translateY(-50%)",
              backgroundColor: "rgba(255,255,255,0.7)",
              "&:hover": { backgroundColor: "rgba(255,255,255,0.9)" },
              zIndex: 2
            }}
          >
            <ArrowForwardIosIcon />
          </IconButton>
          
          {/* Pagination dots */}
          <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
            {stats.map((_, i) => (
              <Box 
                key={`dot-${i}`}
                onClick={() => {
                  setPaused(true);
                  setCurrentIndex(i);
                }}
                sx={{ 
                  width: 8, 
                  height: 8, 
                  borderRadius: "50%", 
                  mx: 0.5,
                  backgroundColor: i === currentIndex ? "#333" : "#ccc",
                  cursor: "pointer"
                }} 
              />
            ))}
          </Box>
        </Box>
      ) : (
        // Desktop View: Continuous Auto-scrolling Animation
        <Box sx={{ overflow: "hidden", width: "100%", position: "relative" }}>
          <motion.div
            style={{ display: "flex", gap: "20px", width: "max-content" }}
            animate={{ 
              x: paused ? "0%" : [`0%`, `-${100 * (stats.length / (stats.length * 2))}%`] 
            }}
            transition={{ 
              repeat: Infinity, 
              duration: stats.length * 13, 
              ease: "linear",
              repeatType: "loop"
            }}
          >
            {[...stats, ...stats].map((item, index) => (
              <Card
                key={index}
                component={Link}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                sx={{ 
                  width: "300px", 
                  p: 3, 
                  backgroundColor: item.bgColor, 
                  color: "#fff", 
                  borderRadius: "12px", 
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                  textDecoration: "none",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-5px)",
                    boxShadow: "0 8px 20px rgba(0,0,0,0.15)"
                  }
                }}
              >
                <CardContent>
                  {item.icon}
                  <Typography variant="h5" sx={{ fontWeight: "bold", mt: 2 }}>{item.title}</Typography>
                  <Typography variant="h3" sx={{ fontWeight: "bold", my: 1 }}>{item.value}</Typography>
                  <Typography variant="body2">{item.description}</Typography>
                  
                  <Box sx={{ 
                    display: "flex", 
                    alignItems: "center", 
                    justifyContent: "center", 
                    mt: 3,
                    pt: 2, 
                    borderTop: "1px solid rgba(255,255,255,0.3)"
                  }}>
                    <Typography variant="caption" sx={{ fontSize: "0.8rem", opacity: 0.9 }}>
                      {item.org} <LaunchIcon sx={{ fontSize: "0.8rem", ml: 0.5, verticalAlign: "middle" }} />
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            ))}
          </motion.div>
        </Box>
      )}
    </Box>
  );
};

export default IssuesSection;