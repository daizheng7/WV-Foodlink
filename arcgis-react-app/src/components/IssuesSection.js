import React from "react";
import { Box, Typography, Card, CardContent, Link } from "@mui/material";
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
  return (
    <Box sx={{ py: 6, px: 3, background: "#f4f4f4", borderRadius: "12px", textAlign: "center", overflow: "hidden" }}>
      <Typography variant="h4" sx={{ fontWeight: "bold", mb: 2, color: "#333" }}>
        Challenges in West Virginia
      </Typography>
      <Typography variant="body1" sx={{ maxWidth: "700px", mx: "auto", mb: 4, color: "#555" }}>
        West Virginia faces significant challenges such as high poverty rates, food insecurity, and a declining population. Immediate action is needed to create a better future.
      </Typography>
      
      <Box sx={{ overflow: "hidden", width: "100%", position: "relative" }}>
        <motion.div
          style={{ display: "flex", gap: "20px", width: "max-content" }}
          animate={{ x: ["0%", `-${100 * (stats.length / (stats.length * 2))}%`] }}
          transition={{ repeat: Infinity, duration: stats.length * 13, ease: "linear" }}
        >
          {[...stats, ...stats].map((item, index) => (
            <Card
              key={index}
              component={Link}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              sx={{ 
                minWidth: 300, 
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
    </Box>
  );
};

export default IssuesSection;