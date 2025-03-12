import React from "react";
import { Box, Typography, Link, Container, Grid, Divider, IconButton, useMediaQuery, useTheme } from "@mui/material";
import { Facebook, Twitter, Instagram, Info, ContactMail, Policy } from "@mui/icons-material";

const Footer = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: "#8b0000",
        color: "#ffffff",
        py: { xs: 3, md: 5 },
        mt: "auto",
        width: "100%",
        maxWidth: "100%",
      }}
    >
      <Container maxWidth={false} sx={{ px: { xs: 2, sm: 3, md: 4 } }}>
        <Grid container spacing={{ xs: 2, md: 4 }} justifyContent="center">
          
          {/* FoodLink Info */}
          <Grid 
            item 
            xs={12} 
            sm={6} 
            md={4} 
            sx={{
              textAlign: { xs: "center", md: "left" },
              mb: { xs: 2, sm: 0 }
            }}
          >
            <Typography variant="h5" fontWeight="bold" gutterBottom>
              FoodLink
            </Typography>
            <Typography variant="body2" sx={{ color: "rgba(255, 255, 255, 0.8)" }}>
              Connecting communities through food.
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
                sx={{ 
                  display: isMobile ? "inline-block" : "inline",
                  mt: isMobile ? 1 : 0
                }}
              >
                The Center for Resilient Communities, WVU
              </Link>.
            </Typography>
          </Grid>

          {/* Quick Links */}
          <Grid 
            item 
            xs={12} 
            sm={6} 
            md={4} 
            sx={{
              textAlign: "center",
              mb: { xs: 2, sm: 0 }
            }}
          >
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Quick Links
            </Typography>
            <Box 
              display="flex" 
              flexDirection="column" 
              alignItems="center"
              sx={{ gap: 1 }}
            >
              <Link
                href="/about"
                color="inherit"
                underline="none"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 1,
                  mb: 1,
                  py: 0.5,
                  width: { xs: "70%", sm: "auto" },
                  minWidth: "120px",
                  "&:hover": {
                    bgcolor: "rgba(255, 255, 255, 0.1)",
                    borderRadius: 1
                  }
                }}
              >
                <Info fontSize="small" /> About Us
              </Link>
              <Link
                href="/contact"
                color="inherit"
                underline="none"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 1,
                  mb: 1,
                  py: 0.5,
                  width: { xs: "70%", sm: "auto" },
                  minWidth: "120px",
                  "&:hover": {
                    bgcolor: "rgba(255, 255, 255, 0.1)",
                    borderRadius: 1
                  }
                }}
              >
                <ContactMail fontSize="small" /> Contact
              </Link>
            </Box>
          </Grid>

          {/* Social Media */}
          <Grid 
            item 
            xs={12} 
            sm={6} 
            md={4} 
            sx={{
              textAlign: { xs: "center", md: "right" }
            }}
          >
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Follow Us
            </Typography>
            <Box 
              display="flex" 
              justifyContent={{ xs: "center", md: "flex-end" }} 
              gap={2}
            >
              <IconButton 
                href="https://facebook.com" 
                target="_blank" 
                color="inherit"
                sx={{ 
                  "&:hover": { 
                    bgcolor: "rgba(255, 255, 255, 0.1)" 
                  },
                  p: { xs: 1, sm: 1.5 }
                }}
              >
                <Facebook />
              </IconButton>
              <IconButton 
                href="https://twitter.com" 
                target="_blank" 
                color="inherit"
                sx={{ 
                  "&:hover": { 
                    bgcolor: "rgba(255, 255, 255, 0.1)" 
                  },
                  p: { xs: 1, sm: 1.5 }
                }}
              >
                <Twitter />
              </IconButton>
              <IconButton 
                href="https://instagram.com" 
                target="_blank" 
                color="inherit"
                sx={{ 
                  "&:hover": { 
                    bgcolor: "rgba(255, 255, 255, 0.1)" 
                  },
                  p: { xs: 1, sm: 1.5 }
                }}
              >
                <Instagram />
              </IconButton>
            </Box>
          </Grid>
        </Grid>

        {/* Divider */}
        <Divider sx={{ bgcolor: "rgba(255, 255, 255, 0.2)", my: { xs: 2, md: 3 } }} />

        {/* Copyright */}
        <Box textAlign="center">
          <Typography 
            variant="body2" 
            sx={{ 
              color: "rgba(255, 255, 255, 0.8)",
              fontSize: { xs: '0.75rem', sm: '0.875rem' }
            }}
          >
            &copy; {new Date().getFullYear()} FoodLink. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;