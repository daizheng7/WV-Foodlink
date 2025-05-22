import React, { useState } from "react";
import { 
  Box, 
  Typography, 
  Link, 
  Container, 
  Grid, 
  Divider, 
  IconButton, 
  useMediaQuery, 
  useTheme,
  Paper,
  Tooltip,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Collapse
} from "@mui/material";
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Info, 
  ContactMail, 
  ExpandMore, 
  ExpandLess,
  CreditCard,
  School,
  Restaurant,
  LocalMall,
  Storefront,
  Agriculture,
  NaturePeople,
  AccountBalance,
  Public,
  Diversity3,
  LightbulbCircle,
  RestaurantMenu,
  HelpCenter,
  FoodBank,
  ZoomIn,
  Map
} from "@mui/icons-material";

const WVFooter = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  const [openResourcesSection, setOpenResourcesSection] = useState(false);

  const wvuLinksFooter = [
    { title: "Accreditations", url: "https://about.wvu.edu/wvu-facts" },
    { title: "Web Standards", url: "https://webstandards.wvu.edu" },
    { title: "Privacy Notice", url: "https://www.wvu.edu/privacy" },
    { title: "Questions or Comments?", url: "mailto:web_services@mail.wvu.edu" },
    { title: "A-Z Site Index", url: "https://www.wvu.edu/SiteIndex/" },
    { title: "Campus Map", url: "https://campusmap.wvu.edu" },
    { title: "WVU Careers", url: "https://careers.wvu.edu/career-opportunities" },
    { title: "WVU Directory", url: "https://directory.wvu.edu" },
    { title: "Give", url: "https://give.wvu.edu/" },
    { title: "Handshake", url: "https://careerservices.wvu.edu/students/handshake-login" },
    { title: "WVU Alert", url: "https://alert.wvu.edu/" },
    { title: "WVU Today", url: "https://wvutoday.wvu.edu" },
    { title: "WVU Portal", url: "https://portal.wvu.edu" }
  ];

  const resourcesItems = [
    { title: 'SNAP + WIC', icon: <CreditCard sx={{ color: '#ffffff' }} />, description: 'Enrollment in Cash-Equivalent Public Nutrition Assistance Programs.', url: 'https://www.arcgis.com/apps/dashboards/f44ec87fbabf4697959012640dc2d29f' },
    { title: 'SNAP-ED', icon: <School sx={{ color: '#ffffff' }} />, description: 'Food Policy, Systems and Environmental Change interventions.', url: 'https://wvu.maps.arcgis.com/apps/dashboards/a2bc19f10d9647c39992283e9ec4d851' },
    { title: 'Farmers Markets', icon: <Storefront sx={{ color: '#ffffff' }} />, description: 'Local farmer-to-consumer markets and nutrition incentives.', url: 'https://www.arcgis.com/apps/dashboards/5095c3fd9b0c4934be43bc8f65c93b36' },
    { title: 'Find Food', icon: <ZoomIn sx={{ color: '#ffffff' }} />, description: 'App to help you find fresh food based on your location.', url: '/food' },
  ];

  const mainLinks = [
    { title: 'Home', url: '/' },
    { title: 'Food Atlas', url: 'https://experience.arcgis.com/experience/61e914cf99364188a23f20b46721f2a3' },
    { title: 'About Us', url: '/about' },
    { title: 'Organize', url: 'https://organize-communities-wvu.hub.arcgis.com/pages/organize' },
    { title: 'Contact', url: '/contact' },
  ];

  const serviceLinks = [
    { title: 'Find Food', icon: <RestaurantMenu fontSize="small" />, url: '/food' },
    { title: 'Get Assistance', icon: <HelpCenter fontSize="small" />, url: '/assistance' },
    { title: 'Charities', icon: <FoodBank fontSize="small" />, url: '/charities' },
    { title: 'View Map', icon: <Map fontSize="small" />, url: 'https://experience.arcgis.com/experience/61e914cf99364188a23f20b46721f2a3' },
  ];

  const toggleResourcesSection = () => {
    setOpenResourcesSection(!openResourcesSection);
  };

  return (
    <Box component="footer" sx={{ bgcolor: "#002855", color: "#ffffff", py: { xs: 3, md: 5 }, mt: "auto", width: "100%" }}>
  <Container maxWidth="xl" sx={{ px: { xs: 2, sm: 3, md: 4 } }}>
    
    {/* Divider */}
    <Divider sx={{ bgcolor: "rgba(255, 255, 255, 0.2)", my: { xs: 3, md: 4 } }} />

    {/* Bottom Section */}
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        rowGap: 2,
      }}
    >
      {/* Copyright */}
      <Typography
        variant="body2"
        sx={{
          color: "rgba(255, 255, 255, 0.8)",
          fontSize: { xs: "0.75rem", sm: "0.875rem" },
          textAlign: { xs: "center", sm: "left" },
        }}
      >
        &copy; {new Date().getFullYear()} FoodLink. All rights reserved.
      </Typography>

      {/* WVU Links */}
      <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: { xs: "center", sm: "flex-end" }, gap: 2 }}>
        {wvuLinksFooter.map((link, index) => (
          <Link
            key={index}
            href={link.url}
            color="inherit"
            underline="hover"
            variant="caption"
            sx={{
              fontSize: "0.75rem",
              color: "rgba(255, 255, 255, 0.8)",
              "&:hover": {
                color: "#ffffff",
                textDecoration: "underline",
              },
              "&:focus": {
                color: "#ffffff",
                outline: "2px solid #EAAA00",
                outlineOffset: "2px",
              },
            }}
          >
            {link.title}
          </Link>
        ))}
      </Box>
    </Box>
  </Container>
</Box>

  );
};

export default WVFooter;
