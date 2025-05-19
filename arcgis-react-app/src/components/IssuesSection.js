import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  useMediaQuery,
  useTheme,
  Grid,
  IconButton,
  Alert,
  CircularProgress
} from "@mui/material";
import {
  LocationOn as LocationOnIcon,
  ShoppingCart as ShoppingCartIcon,
  PeopleAlt as PeopleAltIcon,
  TrendingUp as TrendingUpIcon,
  ChildFriendly as ChildFriendlyIcon,
  Restaurant as RestaurantIcon,
  DirectionsBus as DirectionsBusIcon,
  LocalAtm as LocalAtmIcon,
  Home as HomeIcon,
  Launch as LaunchIcon,
  ArrowBackIosNew as ArrowBackIosNewIcon,
  ArrowForwardIos as ArrowForwardIosIcon,
  Pause as PauseIcon,
  PlayArrow as PlayArrowIcon,
  KeyboardArrowRight as KeyboardArrowRightIcon
} from "@mui/icons-material";

const IssuesSection = ({ defaultView = "carousel" }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));

  const stats = [
    {
      title: "Poverty Rate",
      value: "16.7%",
      description: "West Virginia's poverty rate compared to the national average of 11.1%.",
      icon: <TrendingUpIcon sx={{ fontSize: 60, color: "#fff" }} />,
      bgColor: "#0062A3",
      link: "https://www.wvpolicy.org/data/poverty-in-west-virginia/",
      org: "WV Center on Budget & Policy"
    },
    {
      title: "Child Poverty",
      value: "1 in 5",
      description: "Children in poverty represent 20% of the state's population.",
      icon: <ChildFriendlyIcon sx={{ fontSize: 60, color: "#fff" }} />,
      bgColor: "#002855",
      link: "https://www.childrensdefense.org/state/west-virginia/",
      org: "Children's Defense Fund"
    },
    {
      title: "Food Insecurity",
      value: "16.3%",
      description: "Households affected by food insecurity from 2018 to 2022.",
      icon: <RestaurantIcon sx={{ fontSize: 60, color: "#fff" }} />,
      bgColor: "#1C2B39",
      link: "https://feedingamerica.org/hunger-in-america/west-virginia/",
      org: "Feeding America"
    },
    {
      title: "Fresh Produce Access",
      value: "12%",
      description: "Only 12% of food retailers in WV offer fresh produce.",
      icon: <ShoppingCartIcon sx={{ fontSize: 60, color: "#fff" }} />,
      bgColor: "#0062A3",
      link: "https://www.wvfarm2school.org/food-access",
      org: "WV Farm to School"
    },
    {
      title: "Food Deserts",
      value: "20%",
      description: "Residents live over 50 miles from the nearest fresh produce retailer.",
      icon: <LocationOnIcon sx={{ fontSize: 60, color: "#fff" }} />,
      bgColor: "#002855",
      link: "https://www.ruralhealthinfo.org/states/west-virginia",
      org: "Rural Health Info"
    },
    {
      title: "Population Decline",
      value: "-34,000",
      description: "From 2020–2023, births: 55,000, deaths: 89,000.",
      icon: <PeopleAltIcon sx={{ fontSize: 60, color: "#fff" }} />,
      bgColor: "#1C2B39",
      link: "https://www.wvpublic.org/section/population",
      org: "WV Public Broadcasting"
    },
    {
      title: "Transportation Barriers",
      value: "42%",
      description: "Rural residents with limited access to public transportation.",
      icon: <DirectionsBusIcon sx={{ fontSize: 60, color: "#fff" }} />,
      bgColor: "#0062A3",
      link: "https://www.transportation.wv.gov/publictransit/",
      org: "WV Dept of Transportation"
    },
    {
      title: "Income Disparity",
      value: "$13K",
      description: "Income gap between WV median income and national average.",
      icon: <LocalAtmIcon sx={{ fontSize: 60, color: "#fff" }} />,
      bgColor: "#002855",
      link: "https://www.wvpolicy.org/data/income-inequality/",
      org: "WV Center on Budget & Policy"
    },
    {
      title: "Rising Housing Costs",
      value: "+21%",
      description: "Increase in housing costs since 2020, outpacing wage growth.",
      icon: <HomeIcon sx={{ fontSize: 60, color: "#fff" }} />,
      bgColor: "#1C2B39",
      link: "https://www.wvhousing.org/data",
      org: "WV Housing Development Fund"
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [viewMode, setViewMode] = useState(defaultView);
  const timerRef = useRef(null);

  const itemsToShow = isMobile ? 1 : isTablet ? 2 : 3;

  useEffect(() => {
    if ((isMobile || isTablet) && stats.length <= 1 && viewMode === "carousel") {
      setViewMode("grid");
    }
  }, [isMobile, isTablet, stats, viewMode]);

  useEffect(() => {
    if (isPlaying && stats.length > 0) {
      timerRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % stats.length);
      }, 5000);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [isPlaying, stats]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % stats.length);
    setIsPlaying(false);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + stats.length) % stats.length);
    setIsPlaying(false);
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const goToCard = (index) => {
    setCurrentIndex(index);
    setIsPlaying(false);
  };

  const getVisibleItems = () => {
    const visible = [];
    for (let i = 0; i < itemsToShow; i++) {
      const itemIndex = (currentIndex + i) % stats.length;
      visible.push(stats[itemIndex]);
    }
    return visible;
  };

  const handleSkipToGrid = () => {
    const region = document.querySelector('[aria-label="Issues and Statistics"]');
    if (region) {
      region.scrollIntoView({ behavior: "smooth" });
      region.focus();
    }
  };

  const handleKeyboardNavigation = (e, callback) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      callback();
    }
  };

  const renderCard = (item, index) => (
    <Card
      key={index}
      component="a"
      href={item.link}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${item.title}: ${item.value} - ${item.description}`}
      tabIndex="0"
    sx={{
  p: { xs: 2, sm: 3 },
  backgroundColor: item.bgColor,
  color: "#fff",
  borderRadius: "12px",
  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
  textDecoration: "none", // disable default underline
  height: "100%",
  display: "flex",
  flexDirection: "column",
  transition: "transform 0.3s ease",
  "&:hover": {
    transform: "translateY(-5px)",
    boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
    color: "#fff", // force white text on hover
    textDecoration: "underline" // enforce no underline on hover
  },
  "&:visited": {
    color: "#fff" // ensure visited links stay white
  },
  "&:focus": {
    outline: `3px solid ${theme.palette.primary.main}`,
    outlineOffset: "2px"
  }
}}

    >
      <CardContent>
        {item.icon}
        <Typography variant="h5" sx={{ fontWeight: "bold", mt: 2 }}>
          {item.title}
        </Typography>
        <Typography variant="h3" sx={{ fontWeight: "bold", my: 1 }}>
          {item.value}
        </Typography>
        <Typography variant="body2">{item.description}</Typography>
        <Box sx={{ mt: 3, pt: 2, borderTop: "1px solid rgba(255,255,255,0.3)" }}>
          <Typography variant="caption">
            {item.org}
            <LaunchIcon sx={{ fontSize: "0.8rem", ml: 0.5, verticalAlign: "middle" }} />
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
return (
  <Box
    sx={{
      py: 6,
      px: { xs: 2, sm: 3 },
      background: "#f4f4f4",
      borderRadius: "12px",
      position: "relative"
    }}
    role="region"
    aria-label="Issues and Statistics"
  >
    <Button
      onClick={handleSkipToGrid}
      onKeyDown={(e) => handleKeyboardNavigation(e, handleSkipToGrid)}
      sx={{
        position: "absolute",
        top: "-9999px",
        left: "-9999px",
        zIndex: 9999
      }}
      aria-label="Skip to content"
    >
      Skip to Content
    </Button>

    {stats.length === 0 ? (
      <Box sx={{ textAlign: "center", p: 4 }}>
        <CircularProgress sx={{ mb: 2 }} />
        <Alert severity="info">Loading statistics data...</Alert>
      </Box>
    ) : (
      <>
        {/* Page Indicator */}
        <Box sx={{ textAlign: "center", mb: 2 }}>
          <Typography variant="body2" fontWeight="medium">
            Item {currentIndex + 1} of {stats.length}
          </Typography>
        </Box>

        {/* Carousel View */}
        <Box sx={{ position: "relative" }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              gap: 2,
              minHeight: { xs: "300px", sm: "320px", md: "340px" },
              px: 6
            }}
          >
            {getVisibleItems().map((item, i) => (
              <Box
                key={`carousel-item-${i}`}
                sx={{
                  width: isMobile ? "85vw" : isTablet ? "40vw" : "300px",
                  opacity: 1,
                  transition: "opacity 0.3s ease",
                  flexShrink: 0
                }}
              >
                {renderCard(item, i)}
              </Box>
            ))}
          </Box>

          {/* Navigation Buttons */}
          <IconButton
            onClick={handlePrev}
            aria-label="Previous slide"
            sx={{
              position: "absolute",
              left: 0,
              top: "50%",
              transform: "translateY(-50%)",
              backgroundColor: theme.palette.primary.main,
              color: "#fff",
              "&:hover": { backgroundColor: theme.palette.primary.dark }
            }}
          >
            <ArrowBackIosNewIcon />
          </IconButton>

          <IconButton
            onClick={handleNext}
            aria-label="Next slide"
            sx={{
              position: "absolute",
              right: 0,
              top: "50%",
              transform: "translateY(-50%)",
              backgroundColor: theme.palette.primary.main,
              color: "#fff",
              "&:hover": { backgroundColor: theme.palette.primary.dark }
            }}
          >
            <ArrowForwardIosIcon />
          </IconButton>
        </Box>
      </>
    )}
  </Box>
);};



export default IssuesSection;
