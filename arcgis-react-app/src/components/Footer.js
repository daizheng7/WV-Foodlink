import React from "react";
import { Box, Typography, Link, Container, Grid, Divider, IconButton } from "@mui/material";
import { Facebook, Twitter, Instagram, Info, ContactMail, Policy } from "@mui/icons-material";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: "#8b0000",
        color: "#ffffff",
        py: 5,
        mt: "auto",
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4} justifyContent="center">
          
          {/* FoodLink Info */}
          <Grid item xs={12} sm={4} textAlign={{ xs: "center", sm: "left" }}>
            <Typography variant="h5" fontWeight="bold" gutterBottom>
              FoodLink
            </Typography>
            <Typography variant="body2" sx={{ color: "rgba(255, 255, 255, 0.8)" }}>
              Connecting communities through food.
            </Typography>
            <Typography variant="body2" sx={{ color: "rgba(255, 255, 255, 0.8)", mt: 2 }}>
              A project of{" "}
              <Link
                href="https://resilientcommunities.wvu.edu/"
                color="inherit"
                underline="always"
              >
                The Center for Resilient Communities, WVU
              </Link>.
            </Typography>
          </Grid>

          {/* Quick Links */}
          <Grid item xs={12} sm={4} textAlign="center">
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Quick Links
            </Typography>
            <Box display="flex" flexDirection="column" alignItems="center">
              <Link
                href="/about"
                color="inherit"
                underline="none"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  mb: 1,
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
                  gap: 1,
                  mb: 1,
                }}
              >
                <ContactMail fontSize="small" /> Contact
              </Link>
              
            </Box>
          </Grid>

          {/* Social Media */}
          <Grid item xs={12} sm={4} textAlign={{ xs: "center", sm: "right" }}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Follow Us
            </Typography>
            <Box display="flex" justifyContent={{ xs: "center", sm: "right" }} gap={2}>
              <IconButton href="https://facebook.com" target="_blank" color="inherit">
                <Facebook />
              </IconButton>
              <IconButton href="https://twitter.com" target="_blank" color="inherit">
                <Twitter />
              </IconButton>
              <IconButton href="https://instagram.com" target="_blank" color="inherit">
                <Instagram />
              </IconButton>
            </Box>
          </Grid>
        </Grid>

        {/* Divider */}
        <Divider sx={{ bgcolor: "rgba(255, 255, 255, 0.2)", my: 3 }} />

        {/* Copyright */}
        <Box textAlign="center">
          <Typography variant="body2" sx={{ color: "rgba(255, 255, 255, 0.8)" }}>
            &copy; {new Date().getFullYear()} FoodLink. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
