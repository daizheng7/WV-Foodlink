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
  ListItemText,
  Collapse,
} from "@mui/material";
import {
  Facebook,
  Twitter,
  Instagram,
  ExpandMore,
  ExpandLess,
  CreditCard,
  School,
  Storefront,
  ZoomIn,
  RestaurantMenu,
  HelpCenter,
  FoodBank,
  Map,
} from "@mui/icons-material";
import WVFooter from "./WVFooter";

const Footer = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  const [openResourcesSection, setOpenResourcesSection] = useState(false);

  const resourcesItems = [
    { title: 'SNAP + WIC', icon: <CreditCard sx={{ color: 'white' }} />, url: 'https://www.arcgis.com/apps/dashboards/f44ec87fbabf4697959012640dc2d29f' },
    { title: 'SNAP-ED', icon: <School sx={{ color: 'white' }} />, url: 'https://wvu.maps.arcgis.com/apps/instant/portfolio/index.html?appid=59e0598fe7404e4f91874f1d344b6c1c' },
    { title: 'Farmers Markets', icon: <Storefront sx={{ color: 'white' }} />, url: 'https://www.arcgis.com/apps/dashboards/5095c3fd9b0c4934be43bc8f65c93b36' },
    { title: 'Find Food', icon: <ZoomIn sx={{ color: 'white' }} />, url: '/food' },
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
    <Box component="footer" sx={{ bgcolor: "#002855", color: "white", mt: "auto", width: "100%" }}>
      <Container maxWidth="xl" sx={{ pt: 5, pb: 2, px: { xs: 2, sm: 3, md: 4 } }}>
        <Grid container spacing={4}>
          {/* FoodLink Info */}
          <Grid item xs={12} sm={6} md={3}>
            <Box sx={{ textAlign: { xs: "center", md: "left" } }}>
              <img src="/foodlink_white.png" alt="FoodLink Logo" style={{ height: 50, marginBottom: 16 }} />
              <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.8)", maxWidth: 300 }}>
                Connecting communities through food access, education, and resources throughout West Virginia.
              </Typography>
              <Typography variant="body2" sx={{ mt: 2, color: "rgba(255,255,255,0.8)", wordBreak: "break-word" }}>
                A project of{" "}
                <Link href="https://resilientcommunities.wvu.edu/" target="_blank" rel="noopener" color="inherit" underline="hover">
                  The Center for Resilient Communities, WVU
                </Link>
              </Typography>
            </Box>
          </Grid>

          {/* Site Links */}
          <Grid item xs={12} sm={6} md={2}>
            <Typography variant="h6" fontWeight="bold" gutterBottom textAlign={{ xs: "center", md: "left" }}>
              Site Links
            </Typography>
            <List dense disablePadding>
              {mainLinks.map((link, index) => (
                <ListItem key={index} disablePadding>
                  <Link
                    href={link.url}
                    underline="none"
                    color="inherit"
                    target={link.url.startsWith('http') ? '_blank' : '_self'}
                    rel={link.url.startsWith('http') ? 'noopener' : ''}
                    sx={{
                      width: "100%",
                      display: "block",
                      py: 0.5,
                      textAlign: { xs: "center", md: "left" },
                      "&:hover": {
                        color: "rgba(255,255,255,0.9)",
                        textDecoration: "underline",
                      },
                    }}
                  >
                    {link.title}
                  </Link>
                </ListItem>
              ))}
            </List>
          </Grid>

          {/* Services */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" fontWeight="bold" gutterBottom textAlign={{ xs: "center", md: "left" }}>
              Services
            </Typography>
            <List dense disablePadding>
              {serviceLinks.map((link, index) => (
                <ListItem key={index} disablePadding>
                  <Link
                    href={link.url}
                    underline="none"
                    color="inherit"
                    target={link.url.startsWith('http') ? '_blank' : '_self'}
                    rel={link.url.startsWith('http') ? 'noopener' : ''}
                    sx={{
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      py: 0.5,
                      justifyContent: { xs: "center", md: "flex-start" },
                      "&:hover": {
                        color: "rgba(255,255,255,0.9)",
                        textDecoration: "underline",
                      },
                    }}
                  >
                    {link.icon}
                    {link.title}
                  </Link>
                </ListItem>
              ))}
            </List>

            {/* Resources (Tablet/mobile collapsible) */}
            {isTablet && (
              <>
                <ListItem button onClick={toggleResourcesSection} sx={{ mt: 2 }}>
                  <ListItemText primary="Resources" />
                  {openResourcesSection ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={openResourcesSection} timeout="auto" unmountOnExit>
                  <List dense disablePadding>
                    {resourcesItems.map((item, idx) => (
                      <ListItem key={idx} disablePadding>
                        <Link
                          href={item.url}
                          underline="none"
                          color="inherit"
                          target={item.url.startsWith('http') ? '_blank' : '_self'}
                          rel={item.url.startsWith('http') ? 'noopener' : ''}
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                            py: 0.5,
                            justifyContent: { xs: "center", sm: "flex-start" },
                            "&:hover": {
                              color: "rgba(255,255,255,0.9)",
                              textDecoration: "underline",
                            },
                          }}
                        >
                          {item.icon}
                          {item.title}
                        </Link>
                      </ListItem>
                    ))}
                  </List>
                </Collapse>
              </>
            )}
          </Grid>

          {/* Popular Resources (Desktop only) */}
          {!isTablet && (
            <Grid item md={4}>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Popular Resources
              </Typography>
              <Grid container spacing={2}>
                {resourcesItems.map((item, idx) => (
                  <Grid item xs={6} key={idx}>
                    <Tooltip title={item.title} placement="top">
                      <Paper
                        component="a"
                        href={item.url}
                        target={item.url.startsWith('http') ? '_blank' : '_self'}
                        rel={item.url.startsWith('http') ? 'noopener' : ''}
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          p: 1.5,
                          gap: 1,
                          bgcolor: "rgba(255,255,255,0.1)",
                          borderRadius: 1,
                          textDecoration: "none",
                          color: "white",
                          "&:hover": {
                            bgcolor: "rgba(255,255,255,0.15)",
                            transform: "translateY(-2px)",
                          },
                        }}
                      >
                        {item.icon}
                        <Typography variant="body2" fontWeight="medium">
                          {item.title}
                        </Typography>
                      </Paper>
                    </Tooltip>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          )}
        </Grid>

        {/* Divider */}
        <Divider sx={{ my: 4, bgcolor: "rgba(255,255,255,0.2)" }} />

        {/* Copyright + WVU Footer links */}
        <WVFooter />
      </Container>
    </Box>
  );
};

export default Footer;
