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
import WVFooter from "./WVFooter";
const Footer = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  const [openResourcesSection, setOpenResourcesSection] = useState(false);

  // Resource items (matching the MenuBar)
  const resourcesItems = [
    { title: 'SNAP + WIC', icon: <CreditCard sx={{ color: '#ffffff' }} />, description: 'SNAP + WIC', url: 'https://www.arcgis.com/apps/dashboards/f44ec87fbabf4697959012640dc2d29f' },
    { title: 'SNAP-ED', icon: <School sx={{ color: '#ffffff' }} />, description: 'SNAP-ED', url: 'https://wvu.maps.arcgis.com/apps/dashboards/a2bc19f10d9647c39992283e9ec4d851' },
    { title: 'Farmers Markets', icon: <Storefront sx={{ color: '#ffffff' }} />, description: 'Farmers Markets', url: 'https://www.arcgis.com/apps/dashboards/5095c3fd9b0c4934be43bc8f65c93b36' },
    { title: 'Find Food', icon: <ZoomIn sx={{ color: '#ffffff' }} />, description: 'Find Food', url: '/food' },
  ];

  // Main footer links
  const mainLinks = [
    { title: 'Home', url: '/' },
    { title: 'Food Atlas', url: 'https://experience.arcgis.com/experience/61e914cf99364188a23f20b46721f2a3' },
    { title: 'About Us', url: '/about' },
    { title: 'Organize', url: 'https://foodlink.wvu.edu/pages/organize-1' },
    { title: 'Contact', url: '/contact' },
  ];

  // Services links
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
    <Box
      component="footer"
      sx={{
        bgcolor: "#002855",
        color: "#ffffff",
        py: { xs: 3, md: 5 },
        mt: "auto",
        width: "100%",
        maxWidth: "100%",
      }}
    >
      <Container maxWidth={false} sx={{ px: { xs: 2, sm: 3, md: 4 } }}>
        <Grid container spacing={{ xs: 3, md: 4 }} justifyContent="space-between">
          
          {/* FoodLink Info */}
          <Grid 
            item 
            xs={12} 
            sm={6} 
            md={3} 
            sx={{
              textAlign: { xs: "center", md: "left" },
              mb: { xs: 2, sm: 0 }
            }}
          >
            <Box sx={{ display: "flex", flexDirection: "column", alignItems: { xs: "center", md: "flex-start" } }}>
              <img
                src="/foodlink_white.png"
                alt="Foodlink Logo"
                style={{ height: 50, marginBottom: 16 }}
              />
              <Typography variant="body2" sx={{ color: "rgba(255, 255, 255, 0.8)", maxWidth: 300 }}>
                Connecting communities through food access, education, and resources throughout West Virginia.
              </Typography>
              <Typography 
                variant="body2" 
                sx={{ 
                  color: "rgba(255, 255, 255, 0.8)", 
                  mt: 2,
                  fontSize: { xs: '0.875rem', sm: '0.875rem' },
                  wordBreak: "break-word"
                }}
              >
                A project of{" "}
                <Link
                  href="https://resilientcommunities.wvu.edu/"
                  color="inherit"
                  underline="always"
                  target="_blank"
                  rel="noopener"
                  sx={{ 
                    display: isMobile ? "inline-block" : "inline",
                    mt: isMobile ? 1 : 0
                  }}
                >
                  The Center for Resilient Communities, WVU
                </Link>
              </Typography>
            </Box>
          </Grid>

          {/* Site Links */}
          <Grid 
            item 
            xs={12} 
            sm={6} 
            md={2}
          >
            <Typography variant="h6" fontWeight="bold" gutterBottom sx={{ textAlign: { xs: "center", md: "left" } }}>
              Site Links
            </Typography>
            <List dense sx={{ p: 0 }}>
              {mainLinks.map((link, index) => (
                <ListItem 
                  key={index} 
                  disablePadding 
                  sx={{ 
                    py: 0.5,
                    textAlign: { xs: "center", md: "left" }
                  }}
                >
                  <Link
                    href={link.url}
                    color="inherit"
                    underline="none"
                    target={link.url.startsWith("http") ? "_blank" : "_self"}
                    rel={link.url.startsWith("http") ? "noopener" : ""}
                    sx={{
                      width: "100%",
                      display: "block",
                      transition: "0.2s",
                      "&:hover": {
                        pl: 1,
                        color: "rgba(255, 255, 255, 0.9)",
                        textDecoration: "underline"
                      }
                    }}
                  >
                    {link.title}
                  </Link>
                </ListItem>
              ))}
            </List>
          </Grid>

          {/* Services */}
          <Grid 
            item 
            xs={12} 
            sm={6} 
            md={3}
          >
            <Typography variant="h6" fontWeight="bold" gutterBottom sx={{ textAlign: { xs: "center", md: "left" } }}>
              Services
            </Typography>
            <List dense sx={{ p: 0 }}>
              {serviceLinks.map((link, index) => (
                <ListItem 
                  key={index} 
                  disablePadding 
                  sx={{ 
                    py: 0.5
                  }}
                >
                  <Link
                    href={link.url}
                    color="inherit"
                    underline="none"
                    target={link.url.startsWith("http") ? "_blank" : "_self"}
                    rel={link.url.startsWith("http") ? "noopener" : ""}
                    sx={{
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      transition: "0.2s",
                      justifyContent: { xs: "center", md: "flex-start" },
                      "&:hover": {
                        pl: 1,
                        color: "rgba(255, 255, 255, 0.9)",
                        bgcolor: "rgba(255, 255, 255, 0.1)",
                        borderRadius: 1
                      }
                    }}
                  >
                    {link.icon}
                    {link.title}
                  </Link>
                </ListItem>
              ))}
            </List>
            
            {/* Resources Section - Collapsible on mobile */}
            {isTablet ? (
              <>
                <ListItem 
                  button 
                  onClick={toggleResourcesSection}
                  sx={{ 
                    mt: 2,
                    display: "flex",
                    justifyContent: { xs: "center", sm: "flex-start" },
                    pl: { xs: 0, sm: 2 }
                  }}
                >
                  <ListItemText primary="Resources" />
                  {openResourcesSection ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={openResourcesSection} timeout="auto" unmountOnExit>
                  <List dense disablePadding>
                    {resourcesItems.map((resource, index) => (
                      <ListItem key={index} sx={{ pl: { xs: 0, sm: 4 } }}>
                        <Link
                          href={resource.url}
                          color="inherit"
                          underline="none"
                          target={resource.url.startsWith("http") ? "_blank" : "_self"}
                          rel={resource.url.startsWith("http") ? "noopener" : ""}
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                            p: 0.5,
                            width: "100%",
                            justifyContent: { xs: "center", sm: "flex-start" },
                            "&:hover": {
                              bgcolor: "rgba(255, 255, 255, 0.1)",
                              borderRadius: 1
                            }
                          }}
                        >
                          {resource.icon}
                          {resource.title}
                        </Link>
                      </ListItem>
                    ))}
                  </List>
                </Collapse>
              </>
            ) : null}
          </Grid>

          {/* Resources Grid - Desktop only */}
          {!isTablet && (
            <Grid 
              item 
              md={4}
              sx={{
                display: { xs: "none", md: "block" }
              }}
            >
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Popular Resources
              </Typography>
              <Grid container spacing={2}>
                {resourcesItems.map((resource, index) => (
                  <Grid item xs={12} sm={6} key={index}>
                    <Tooltip title={resource.description} placement="top">
                      <Paper
                        component="a"
                        href={resource.url}
                        target={resource.url.startsWith("http") ? "_blank" : "_self"}
                        rel={resource.url.startsWith("http") ? "noopener" : ""}
                        elevation={0}
                        sx={{
                          p: 1.5,
                          display: 'flex',
                          alignItems: 'center',
                          gap: 1.5,
                          bgcolor: 'rgba(255, 255, 255, 0.1)',
                          transition: 'all 0.2s',
                          textDecoration: 'none',
                          color: 'white',
                          borderRadius: 1,
                          '&:hover': {
                            bgcolor: 'rgba(255, 255, 255, 0.15)',
                            transform: 'translateY(-2px)'
                          }
                        }}
                      >
                        {resource.icon}
                        <Typography variant="body2" fontWeight="medium">
                          {resource.title}
                        </Typography>
                      </Paper>
                    </Tooltip>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          )}
          
          {/* Social Media */}
          <Grid 
            item 
            xs={12} 
            sm={6} 
            md={12} 
            sx={{
              textAlign: "center",
              mt: { xs: 3, md: 4 }
            }}
          >
            <Box 
              display="flex" 
              justifyContent="center" 
              gap={2}
            >
              <IconButton 
                href="https://www.facebook.com/WVUResilientCommunities/" 
                target="_blank" 
                rel="noopener"
                color="inherit"
                aria-label="Facebook"
                sx={{ 
                  bgcolor: "rgba(255, 255, 255, 0.1)",
                  "&:hover": { 
                    bgcolor: "rgba(255, 255, 255, 0.2)",
                    transform: "scale(1.1)"
                  },
                  transition: "all 0.2s",
                  p: { xs: 1, sm: 1.5 }
                }}
              >
                <Facebook />
              </IconButton>
              <IconButton 
                href="https://twitter.com/wvucrc" 
                target="_blank" 
                rel="noopener"
                color="inherit"
                aria-label="Twitter"
                sx={{ 
                  bgcolor: "rgba(255, 255, 255, 0.1)",
                  "&:hover": { 
                    bgcolor: "rgba(255, 255, 255, 0.2)",
                    transform: "scale(1.1)"
                  },
                  transition: "all 0.2s",
                  p: { xs: 1, sm: 1.5 }
                }}
              >
                <Twitter />
              </IconButton>
              <IconButton 
                href="https://www.instagram.com/wvuresilientcommunities" 
                target="_blank" 
                rel="noopener"
                color="inherit"
                aria-label="Instagram"
                sx={{ 
                  bgcolor: "rgba(255, 255, 255, 0.1)",
                  "&:hover": { 
                    bgcolor: "rgba(255, 255, 255, 0.2)",
                    transform: "scale(1.1)"
                  },
                  transition: "all 0.2s",
                  p: { xs: 1, sm: 1.5 }
                }}
              >
                <Instagram />
              </IconButton>
            </Box>
          </Grid>
        </Grid>

        {/* Divider */}
        

        {/* Copyright */}
        <WVFooter />
      </Container>
    </Box>
  );
};

export default Footer;