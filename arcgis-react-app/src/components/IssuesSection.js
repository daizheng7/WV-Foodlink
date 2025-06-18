import React, { useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  useMediaQuery,
  useTheme,
  Grid,
  Collapse,
  Alert,
  Chip
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
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
  ViewModule as ViewModuleIcon,
  ViewList as ViewListIcon
} from "@mui/icons-material";

const IssuesSection = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));

  const [showAll, setShowAll] = useState(false);
  const [viewMode, setViewMode] = useState("grid"); // "grid" or "list"

  const stats = [
    {
      title: "Poverty Rate",
      value: "16.7%",
      description: "West Virginia's poverty rate compared to the national average of 11.1%.",
      icon: <TrendingUpIcon sx={{ fontSize: { xs: 40, sm: 60 }, color: "#fff" }} />,
      bgColor: "#0062A3",
      link: "https://www.wvpolicy.org/data/poverty-in-west-virginia/",
      org: "WV Center on Budget & Policy",
      priority: "high"
    },
    {
      title: "Child Poverty",
      value: "1 in 5",
      description: "Children in poverty represent 20% of the state's population.",
      icon: <ChildFriendlyIcon sx={{ fontSize: { xs: 40, sm: 60 }, color: "#fff" }} />,
      bgColor: "#002855",
      link: "https://www.childrensdefense.org/state/west-virginia/",
      org: "Children's Defense Fund",
      priority: "critical"
    },
    {
      title: "Food Insecurity",
      value: "16.3%",
      description: "Households affected by food insecurity from 2018 to 2022.",
      icon: <RestaurantIcon sx={{ fontSize: { xs: 40, sm: 60 }, color: "#fff" }} />,
      bgColor: "#1C2B39",
      link: "https://feedingamerica.org/hunger-in-america/west-virginia/",
      org: "Feeding America",
      priority: "critical"
    },
    {
      title: "Fresh Produce Access",
      value: "12%",
      description: "Only 12% of food retailers in WV offer fresh produce.",
      icon: <ShoppingCartIcon sx={{ fontSize: { xs: 40, sm: 60 }, color: "#fff" }} />,
      bgColor: "#0062A3",
      link: "https://www.wvfarm2school.org/food-access",
      org: "WV Farm to School",
      priority: "critical"
    },
    {
      title: "Food Deserts",
      value: "20%",
      description: "Residents live over 50 miles from the nearest fresh produce retailer.",
      icon: <LocationOnIcon sx={{ fontSize: { xs: 40, sm: 60 }, color: "#fff" }} />,
      bgColor: "#002855",
      link: "https://www.ruralhealthinfo.org/states/west-virginia",
      org: "Rural Health Info",
      priority: "critical"
    },
    {
      title: "Population Decline",
      value: "-34,000",
      description: "From 2020–2023, births: 55,000, deaths: 89,000.",
      icon: <PeopleAltIcon sx={{ fontSize: { xs: 40, sm: 60 }, color: "#fff" }} />,
      bgColor: "#1C2B39",
      link: "https://www.wvpublic.org/section/population",
      org: "WV Public Broadcasting",
      priority: "medium"
    },
    {
      title: "Transportation Barriers",
      value: "42%",
      description: "Rural residents with limited access to public transportation.",
      icon: <DirectionsBusIcon sx={{ fontSize: { xs: 40, sm: 60 }, color: "#fff" }} />,
      bgColor: "#0062A3",
      link: "https://www.transportation.wv.gov/publictransit/",
      org: "WV Dept of Transportation",
      priority: "high"
    },
    {
      title: "Income Disparity",
      value: "$13K",
      description: "Income gap between WV median income and national average.",
      icon: <LocalAtmIcon sx={{ fontSize: { xs: 40, sm: 60 }, color: "#fff" }} />,
      bgColor: "#002855",
      link: "https://www.wvpolicy.org/data/income-inequality/",
      org: "WV Center on Budget & Policy",
      priority: "high"
    },
    {
      title: "Rising Housing Costs",
      value: "+21%",
      description: "Increase in housing costs since 2020, outpacing wage growth.",
      icon: <HomeIcon sx={{ fontSize: { xs: 40, sm: 60 }, color: "#fff" }} />,
      bgColor: "#1C2B39",
      link: "https://www.wvhousing.org/data",
      org: "WV Housing Development Fund",
      priority: "high"
    }
  ];

  // Sort by priority: critical first, then high, then medium
  const sortedStats = [...stats].sort((a, b) => {
    const priorityOrder = { critical: 0, high: 1, medium: 2 };
    return priorityOrder[a.priority] - priorityOrder[b.priority];
  });

  const displayedStats = isMobile 
    ? (showAll ? sortedStats : sortedStats.slice(0, 3))
    : sortedStats;

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "critical": return "#d32f2f";
      case "high": return "#f57c00";
      case "medium": return "#1976d2";
      default: return "#757575";
    }
  };

  const renderCard = (item, index) => (
  <Grid 
    item 
    xs={12} 
    sm={viewMode === "list" ? 12 : 6} 
    lg={viewMode === "list" ? 12 : 4} 
    key={index}
  >
    <Card
      component="a"
      href={item.link}
      target="_blank"
      rel="noopener noreferrer"
      aria-labelledby={`card-title-${index}`}
      sx={{
        p: { xs: 1.5, sm: 2 }, // Reduced from { xs: 2, sm: 3 }
        backgroundColor: item.bgColor,
        color: "#fff",
        borderRadius: { xs: "12px", sm: "16px" }, // Reduced from { xs: "16px", sm: "20px" }
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        textDecoration: "none",
        height: "100%",
        maxHeight: { xs: "280px", sm: "320px" }, // Add max height constraint
        display: "flex",
        flexDirection: viewMode === "list" && !isMobile ? "row" : "column",
        alignItems: viewMode === "list" && !isMobile ? "center" : "stretch",
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        position: "relative",
        "&:hover": {
          transform: isMobile ? "translateY(-2px)" : "translateY(-4px)", // Reduced hover effect
          boxShadow: "0 6px 20px rgba(0,0,0,0.15)", // Reduced shadow
          color: "#fff",
          textDecoration: "none"
        },
        "&:visited": {
          color: "#fff"
        },
        "&:focus": {
          outline: `3px solid #EAAA00`,
          outlineOffset: "2px",
          transform: "translateY(-2px)" // Reduced focus effect
        }
      }}
    >
      {/* Priority Badge */}
      <Chip
        label={item.priority.toUpperCase()}
        size="small"
        sx={{
          position: "absolute",
          top: { xs: 6, sm: 8 }, // Reduced from { xs: 8, sm: 12 }
          right: { xs: 6, sm: 8 }, // Reduced from { xs: 8, sm: 12 }
          backgroundColor: getPriorityColor(item.priority),
          color: "white",
          fontWeight: "bold",
          fontSize: { xs: "0.6rem", sm: "0.65rem" }, // Smaller font
          height: { xs: "20px", sm: "24px" }, // Smaller height
          zIndex: 1
        }}
      />

      <CardContent 
        sx={{ 
          p: { xs: 1.5, sm: 2 }, // Reduced padding
          display: "flex",
          flexDirection: viewMode === "list" && !isMobile ? "row" : "column",
          alignItems: viewMode === "list" && !isMobile ? "center" : "flex-start",
          gap: viewMode === "list" && !isMobile ? 2 : 0, // Reduced gap
          width: "100%"
        }}
      >
        {/* Icon and Title Section */}
        <Box 
          sx={{ 
            display: "flex",
            flexDirection: viewMode === "list" && !isMobile ? "row" : "column",
            alignItems: viewMode === "list" && !isMobile ? "center" : "flex-start",
            gap: viewMode === "list" && !isMobile ? 1.5 : 0.5, // Reduced gap
            mb: viewMode === "list" && !isMobile ? 0 : 1.5, // Reduced margin
            minWidth: viewMode === "list" && !isMobile ? "180px" : "auto" // Reduced width
          }}
        >
          {/* Smaller icon */}
          <Box sx={{ 
            '& svg': { 
              fontSize: { xs: 32, sm: 40 } // Reduced from { xs: 40, sm: 60 }
            }
          }}>
            {item.icon}
          </Box>
          <Typography 
            id={`card-title-${index}`}
            variant={isMobile ? "subtitle1" : "h6"} // Smaller variant
            component="h3"
            sx={{ 
              fontWeight: "bold", 
              mt: viewMode === "list" && !isMobile ? 0 : 0.5,
              fontSize: { xs: "1rem", sm: "1.1rem" }, // Reduced font size
              lineHeight: 1.2
            }}
          >
            {item.title}
          </Typography>
        </Box>

        {/* Value */}
        <Box 
          sx={{ 
            textAlign: viewMode === "list" && !isMobile ? "center" : "left",
            minWidth: viewMode === "list" && !isMobile ? "100px" : "auto", // Reduced width
            mb: 1 // Add margin bottom
          }}
        >
          <Typography 
            variant={isMobile ? "h5" : "h4"} // Smaller variant
            sx={{ 
              fontWeight: "bold", 
              mb: 0.5, // Reduced margin
              fontSize: { xs: "1.5rem", sm: "2rem" }, // Reduced font size
              color: "#fff"
            }}
          >
            {item.value}
          </Typography>
        </Box>

        {/* Description and Source */}
        <Box sx={{ flexGrow: 1 }}>
          <Typography 
            variant="body2" 
            sx={{ 
              mb: 1.5, // Reduced margin
              fontSize: { xs: "0.85rem", sm: "0.9rem" }, // Smaller font
              lineHeight: 1.4, // Tighter line height
              display: "-webkit-box",
              WebkitLineClamp: 3, // Limit to 3 lines
              WebkitBoxOrient: "vertical",
              overflow: "hidden"
            }}
          >
            {item.description}
          </Typography>
          
          <Box 
            sx={{ 
              pt: 1, // Reduced padding
              borderTop: "1px solid rgba(255,255,255,0.3)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between"
            }}
          >
            <Typography 
              variant="caption"
              sx={{ 
                fontSize: { xs: "0.7rem", sm: "0.75rem" }, // Smaller font
                fontWeight: "medium"
              }}
            >
              {item.org}
            </Typography>
            <LaunchIcon sx={{ fontSize: { xs: "0.8rem", sm: "0.9rem" }, opacity: 0.8 }} />
          </Box>
        </Box>
      </CardContent>
    </Card>
  </Grid>
);

  return (
    <Box
      sx={{
        py: { xs: 4, sm: 6 },
        px: { xs: 2, sm: 3 },

        borderRadius: { xs: "16px", sm: "20px" },
        position: "relative"
      }}
      role="region"
      aria-label="West Virginia Issues and Statistics"
    >
      

      {/* View Controls - Desktop Only */}
      {!isMobile && (
        <Box sx={{ display: "flex", justifyContent: "center", mb: 4 }}>
          <Box 
            sx={{ 
              display: "flex", 
              backgroundColor: "white",
              borderRadius: "12px",
              p: 0.5,
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
            }}
          >
        

<Button
  variant={viewMode === "grid" ? "contained" : "text"}
  startIcon={<ViewModuleIcon />}
  onClick={() => setViewMode("grid")}
  sx={{
    textTransform: "none",
    borderRadius: "8px",
    px: 3,
    backgroundColor: viewMode === "grid" ? "#002855 !important" : "white !important", 
    color: viewMode === "grid" ? "white !important" : "#002855 !important", 
    "&:hover": {
      backgroundColor: viewMode === "grid" ? "#1C2B39 !important" : "rgba(0, 40, 85, 0.08) !important",
      color: viewMode === "grid" ? "white !important" : "#002855 !important"
    },
    "&:focus": {
      outline: "2px solid #EAAA00",
      outlineOffset: "2px",
      backgroundColor: viewMode === "grid" ? "#002855 !important" : "white !important",
      color: viewMode === "grid" ? "white !important" : "#002855 !important"
    },
    "&.Mui-focusVisible": {
      backgroundColor: viewMode === "grid" ? "#002855 !important" : "white !important",
      color: viewMode === "grid" ? "white !important" : "#002855 !important"
    },
    "&:active": {
      backgroundColor: viewMode === "grid" ? "#002855 !important" : "white !important",
      color: viewMode === "grid" ? "white !important" : "#002855 !important"
    }
  }}
>
  Grid View
</Button>

<Button
  variant={viewMode === "list" ? "contained" : "text"}
  startIcon={<ViewListIcon />}
  onClick={() => setViewMode("list")}
  sx={{
    textTransform: "none",
    borderRadius: "8px",
    px: 3,
    backgroundColor: viewMode === "list" ? "#002855 !important" : "white !important", // Force white background when not active
    color: viewMode === "list" ? "white !important" : "#002855 !important", // Force blue text when not active
    "&:hover": {
      backgroundColor: viewMode === "list" ? "#1C2B39 !important" : "rgba(0, 40, 85, 0.08) !important",
      color: viewMode === "list" ? "white !important" : "#002855 !important"
    },
    "&:focus": {
      outline: "2px solid #EAAA00",
      outlineOffset: "2px",
      backgroundColor: viewMode === "list" ? "#002855 !important" : "white !important",
      color: viewMode === "list" ? "white !important" : "#002855 !important"
    },
    "&.Mui-focusVisible": {
      backgroundColor: viewMode === "list" ? "#002855 !important" : "white !important",
      color: viewMode === "list" ? "white !important" : "#002855 !important"
    },
    "&:active": {
      backgroundColor: viewMode === "list" ? "#002855 !important" : "white !important",
      color: viewMode === "list" ? "white !important" : "#002855 !important"
    }
  }}
>
  List View
</Button>

          </Box>
        </Box>
      )}

      {/* Mobile Summary */}
      {isMobile && !showAll && (
        <Alert 
          severity="info" 
          sx={{ 
            mb: 3,
            backgroundColor: "rgba(0, 40, 85, 0.05)",
            border: "1px solid rgba(0, 40, 85, 0.1)",
            borderRadius: "12px"
          }}
        >
          Showing 3 most critical issues. Tap "Show All Issues" to see the complete list.
        </Alert>
      )}

      {/* Issues Grid */}
      <Grid container spacing={{ xs: 2, sm: 3 }}>
        {displayedStats.map((item, index) => renderCard(item, index))}
      </Grid>

      {/* Mobile Show More/Less Button */}
      {isMobile && (
        <Box sx={{ textAlign: "center", mt: 3 }}>
          <Button
            variant="outlined"
            size="large"
            onClick={() => setShowAll(!showAll)}
            startIcon={showAll ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            sx={{
              textTransform: "none",
              borderColor: "#002855",
              color: "#002855",
              borderRadius: "12px",
              px: 4,
              py: 1.5,
              fontSize: "1rem",
              fontWeight: "medium",
              "&:hover": {
                backgroundColor: "rgba(0, 40, 85, 0.08)",
                borderColor: "#002855"
              }
            }}
            aria-expanded={showAll}
            aria-controls="issues-list"
          >
            {showAll ? "Show Fewer Issues" : "Show All Issues"} ({stats.length})
          </Button>
        </Box>
      )}



      {/* Call to Action */}
      
    </Box>
  );
};

export default IssuesSection;