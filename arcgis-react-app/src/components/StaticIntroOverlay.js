import React from 'react';
import { Box, Container, Typography, Grid, Button, useMediaQuery } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import LayersIcon from '@mui/icons-material/Layers';
import GroupIcon from '@mui/icons-material/Group';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const StaticIntroOverlay = () => {
  const isSmallScreen = useMediaQuery('(max-width:600px)');

  return (
    <Box
      sx={{
        width: '100%',
        minHeight: '100vh',
        background: 'linear-gradient(145deg, #002855 0%, #002855 100%)',
        color: '#ffffff',
        boxShadow: '0 4px 30px rgba(0,0,0,0.25)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        p: { xs: 0, sm: 3 }
      }}
    >
      {/* Background pattern */}
      <Box
        sx={{
          position: 'absolute',
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundImage: `url('https://static.wvu.edu/global/images/patterns/wvu/background__topo-white--2.0.0.svg')`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          opacity: 0.4,
          zIndex: 0
        }}
      />

      <Container
        maxWidth="lg"
        sx={{
          position: 'relative',
          zIndex: 1,
          py: { xs: 6, sm: 8 },
          px: { xs: 2, sm: 4 },
          textAlign: 'center',
        }}
      >
        <Box mb={4}>
          <img
            src="/foodlink_white.png"
            alt="Foodlink Logo"
            style={{
              maxHeight: isSmallScreen ? '80px' : '110px',
              marginBottom: '1rem'
            }}
          />
        </Box>

        <Typography variant="h5" sx={{ mb: 2, color: '#fff' }}>
          A joint project of the{' '}
          <Button
            href="https://resilientcommunities.wvu.edu/"
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              color: "#EAAA00", textTransform: 'none', fontWeight: 600,
              '&:hover': { textDecoration: 'underline' }
            }}
          >
            WVU Center for Resilient Communities
          </Button>{' '}
          and the{' '}
          <Button
            href="https://extension.wvu.edu/food-health/nutrition/fnp"
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              color: "#EAAA00", textTransform: 'none', fontWeight: 600,
              '&:hover': { textDecoration: 'underline' }
            }}
          >
            WVU Extension Family Nutrition Program
          </Button>.
        </Typography>

        <Typography variant="h6" sx={{ mb: 4, color: '#ddd' }}>
          Dedicated to improving access to affordable, nutritious, sustainable, and culturally appropriate food in West Virginia and beyond.
        </Typography>

        <Grid container spacing={3} justifyContent="center">
          {[
            {
              icon: <SearchIcon sx={{ color: 'white' }} />,
              text: "Find Food Assistance",
              link: "/food",
              color: "#1C2B39"
            },
            {
              icon: <LayersIcon sx={{ color: 'white' }} />,
              text: "Explore Food Atlas",
              link: "https://experience.arcgis.com/experience/61e914cf99364188a23f20b46721f2a3",
              color: "#0062A3"
            },
            {
              icon: <GroupIcon sx={{ color: 'white' }} />,
              text: "Organize Communities",
              link: "https://organize-communities-wvu.hub.arcgis.com/pages/organize",
              color: "#002855"
            },
            {
              icon: <AccessTimeFilledIcon sx={{ color: 'white' }} />,
              text: "Access Resources",
              link: "/home",
              color: "#554741"
            }
          ].map((item, idx) => (
            <Grid item xs={6} sm={3} key={idx}>
              <Button
                fullWidth
                href={item.link}
                sx={{
                  bgcolor: item.color,
                  color: 'white',
                  p: 2,
                  borderRadius: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textTransform: 'none',
                  fontWeight: 500,
                  minHeight: 120,
                  '&:hover': {
                    bgcolor: item.color,
                    boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
                  }
                }}
              >
                {item.icon}
                <Typography sx={{ mt: 1, fontSize: '0.9rem', textAlign: 'center' }}>
                  {item.text}
                </Typography>
              </Button>
            </Grid>
          ))}
        </Grid>

        <Box mt={6}>
          <Button
            variant="contained"
            href="#main-content"
            endIcon={<KeyboardArrowDownIcon />}
            sx={{
              backgroundColor: "#EAAA00",
              color: "#002855",
              fontWeight: 700,
              fontSize: '1.2rem',
              px: 4,
              py: 1.5,
              borderRadius: '32px',
              '&:hover': {
                backgroundColor: "#FFD54F",
              }
            }}
          >
            Explore FoodLink
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default StaticIntroOverlay;
