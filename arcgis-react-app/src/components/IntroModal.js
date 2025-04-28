import React, { useState } from 'react';
import { Modal, IconButton, Box, Container, Typography, Grid, Button, Link, useMediaQuery } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import LayersIcon from '@mui/icons-material/Layers';
import GroupIcon from '@mui/icons-material/Group';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';

const IntroModal = () => {
  const [open, setOpen] = useState(false);
  const isSmallScreen = useMediaQuery('(max-width:600px)');

  const quickLinks = [
    { icon: <SearchIcon />, text: 'Find Food Assistance', color: '#1C2B39', path: '/food' },
    { icon: <LayersIcon />, text: 'Explore Food Data', color: '#0062A3', path: 'https://experience.arcgis.com/experience/61e914cf99364188a23f20b46721f2a3' },
    { icon: <GroupIcon />, text: 'Organize', color: '#002855', path: 'https://foodlink.wvu.edu/pages/organize-1' },
    { icon: <AccessTimeFilledIcon />, text: 'Access Resources', color: '#554741', path: '/home' }
  ];

  return (
    <>
      <IconButton
        onClick={() => setOpen(true)}
        sx={{
          position: 'fixed',
          bottom: 30,
          right: 30,
          backgroundColor: '#002855',
          color: 'white',
          width: 70,
          height: 70,
          transition: 'background-color 0.3s ease',
          '&:hover': { backgroundColor: '#6a0000' },
          zIndex: 1500,
        }}
      >
        <InfoIcon sx={{ fontSize: 50 }} />
      </IconButton>

      <Modal open={open} onClose={() => setOpen(false)}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '90vw',
            maxWidth: '900px',
            background: 'white',
            color: '#333',
            borderRadius: 3,
            boxShadow: 24,
            p: 4,
            maxHeight: '90vh',
            overflowY: 'auto',
          }}
        >
          <IconButton
            onClick={() => setOpen(false)}
            sx={{ position: 'absolute', top: 15, right: 15, color: '#333' }}
          >
            <CloseIcon fontSize="large" />
          </IconButton>

          <Box sx={{ textAlign: 'center', mb: 2 }}>
            <img
              src="https://www.arcgis.com/sharing/rest/content/items/0c60d0d0fe1a4746a40284e0fdda8e87/resources/Foodlink_use_mePNG-e1497287846786.png?v=1734104308181"
              alt="Foodlink Logo"
              style={{
                maxWidth: '100%',
                height: 'auto',
                maxHeight: '80px',
                filter: 'drop-shadow(0px 2px 6px rgba(0,0,0,0.3))'
              }}
            />
          </Box>

          <Box>
            <Typography 
              variant="h4" 
              sx={{
                fontWeight: 700,
                mb: 3,
                color: '#1a1a1a',
                textAlign: 'left',
                fontFamily: '"Montserrat", sans-serif',
                letterSpacing: '0.5px'
              }}
            >
              Welcome to FoodLink
            </Typography>

            <Typography 
              variant="body1"
              sx={{
                mb: 4,
                fontSize: '1.1rem',
                lineHeight: 1.8,
                color: '#333',
                maxWidth: '800px',
                textAlign: 'left'
              }}
            >
              A joint project of{' '}
              <Link
                href="https://resilientcommunities.wvu.edu/"
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  color: '#002855',
                  fontWeight: 600,
                  textDecoration: 'none',
                  '&:hover': { color: '#002855', textDecoration: 'underline' }
                }}
              >
                WVU Center for Resilient Communities
              </Link>{' '}and the{' '}
              <Link
                href="https://extension.wvu.edu/food-health/nutrition/fnp"
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  color: '#002855',
                  fontWeight: 600,
                  textDecoration: 'none',
                  '&:hover': { color: '#002855', textDecoration: 'underline' }
                }}
              >
                WVU Extension Family Nutrition Program
              </Link>.
            </Typography>

            <Typography
              variant="subtitle1"
              sx={{
                fontWeight: 700,
                fontSize: '1.25rem',
                lineHeight: 1.6,
                color: '#333',
                backgroundColor: 'rgba(0, 40, 85, 0.08)',
                borderLeft: '4px solid #002855',
                p: 2,
                borderRadius: '0 4px 4px 0',
                textAlign: 'left',
                mb: 4
              }}
            >
              Dedicated to improving access to affordable, nutritious, sustainable, and culturally appropriate food in West Virginia and beyond.
            </Typography>
          </Box>

          <Grid container spacing={2} justifyContent="center">
            {quickLinks.map((item, idx) => (
              <Grid item xs={6} sm={3} key={idx}>
                <Button
                  component="a"
                  href={item.path}
                  target={item.path.startsWith('http') ? '_blank' : '_self'}
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    bgcolor: item.color,
                    color: 'white',
                    borderRadius: 3,
                    textDecoration: 'none',
                    p: 2,
                    width: '100%',
                    transition: 'all 0.3s',
                    boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
                    '&:hover': {
                      bgcolor: item.color,
                      transform: 'translateY(-3px)',
                      boxShadow: '0 6px 15px rgba(0,0,0,0.3)'
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

          <Button
            variant="contained"
            onClick={() => setOpen(false)}
            sx={{
              backgroundColor: '#EAAA00',
              color: '#002855',
              borderRadius: '32px',
              px: 4,
              py: 1.5,
              fontSize: '1.1rem',
              fontWeight: 600,
              mt: 5,
              textTransform: 'none',
              boxShadow: '0 6px 14px rgba(0,0,0,0.25)',
              '&:hover': {
                backgroundColor: '#002855',
                textDecoration: 'underline',
                boxShadow: '0 8px 20px rgba(0,0,0,0.3)',
                transform: 'translateY(-2px)'
              }
            }}
          >
            Close & Explore
          </Button>
        </Box>
      </Modal>
    </>
  );
};

export default IntroModal;
