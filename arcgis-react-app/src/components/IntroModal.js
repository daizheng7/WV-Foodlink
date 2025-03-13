import React, { useState } from 'react';
import { Modal, IconButton, Box, Container, Typography, Grid, Button, Link } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import LayersIcon from '@mui/icons-material/Layers';
import GroupIcon from '@mui/icons-material/Group';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';

const IntroModal = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Floating Info Button - Bigger and #8b0000 */}
      <IconButton
        onClick={() => setOpen(true)}
        sx={{
          position: 'fixed',
          bottom: 30,
          right: 30,
          backgroundColor: '#8b0000',
          color: 'white',
          width: 70,
          height: 70,
          '&:hover': { backgroundColor: '#6a0000' },
          zIndex: 1500,
        }}
      >
        <InfoIcon sx={{ fontSize: 50 }} />
      </IconButton>

      {/* Modal */}
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '90vw',
            maxWidth: '900px',
            background: 'white', // Updated to white for better readability
            color: '#333', // Ensures text is clearly visible
            borderRadius: 3,
            boxShadow: 24,
            p: 4,
            textAlign: 'center',
            maxHeight: '90vh',
            overflowY: 'auto',
          }}
        >
          {/* Close Button */}
          <IconButton
            onClick={() => setOpen(false)}
            sx={{ position: 'absolute', top: 15, right: 15, color: '#333' }}
          >
            <CloseIcon fontSize="large" />
          </IconButton>

          {/* Logo - Now smaller */}
          <Box sx={{ textAlign: 'center', mb: 2 }}>
            <img
              src="https://www.arcgis.com/sharing/rest/content/items/0c60d0d0fe1a4746a40284e0fdda8e87/resources/Foodlink_use_mePNG-e1497287846786.png?v=1734104308181"
              alt="Foodlink Logo"
              style={{
                maxWidth: '100%',
                height: 'auto',
                maxHeight: '80px', // Smaller logo
                marginBottom: '8px',
                filter: 'drop-shadow(0px 2px 6px rgba(0,0,0,0.3))',
              }}
            />
          </Box>

          {/* Title */}
          <Box sx={{ textAlign: 'left', pl: 0 }}>
  <Typography 
    variant="h4" 
    sx={{ 
      fontWeight: 700, 
      mb: 3,
      color: '#1a1a1a',
      fontFamily: '"Montserrat", sans-serif',
      letterSpacing: '0.5px',
      textAlign: 'left'
    }}
  >
    Welcome to Our Platform
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
  A joint project of the{' '}
  <Link
    href="https://resilientcommunities.wvu.edu/"
    target="_blank"
    rel="noopener noreferrer"
    sx={{
      color: '#8b0000',
      fontWeight: 600,
      textDecoration: 'none',
      position: 'relative',
      '&:after': {
        content: '""',
        position: 'absolute',
        width: '100%',
        height: '2px',
        bottom: -2,
        left: 0,
        backgroundColor: '#8b0000',
        transform: 'scaleX(0)',
        transformOrigin: 'bottom right',
        transition: 'transform 0.3s ease-out'
      },
      '&:hover': { 
        color: '#6a0000',
        '&:after': {
          transform: 'scaleX(1)',
          transformOrigin: 'bottom left'
        }
      },
    }}
  >
    WVU Center for Resilient Communities
  </Link>{' '}
  and the{' '}
  <Link
    href="https://extension.wvu.edu/food-health/nutrition/fnp"
    target="_blank"
    rel="noopener noreferrer"
    sx={{
      color: '#8b0000',
      fontWeight: 600,
      textDecoration: 'none',
      position: 'relative',
      '&:after': {
        content: '""',
        position: 'absolute',
        width: '100%',
        height: '2px',
        bottom: -2,
        left: 0,
        backgroundColor: '#8b0000',
        transform: 'scaleX(0)',
        transformOrigin: 'bottom right',
        transition: 'transform 0.3s ease-out'
      },
      '&:hover': { 
        color: '#6a0000',
        '&:after': {
          transform: 'scaleX(1)',
          transformOrigin: 'bottom left'
        }
      },
    }}
  >
    WVU Extension Family Nutrition Program
  </Link>
</Typography>

<Typography 
  variant="subtitle1" 
  sx={{ 
    fontWeight: 700,
    fontSize: '1.25rem',
    lineHeight: 1.6,
    color: '#333',
    maxWidth: '700px',
    p: 3,
    borderLeft: '4px solid #8b0000',
    backgroundColor: 'rgba(139, 0, 0, 0.05)',
    borderRadius: '0 4px 4px 0',
    textAlign: 'left'
  }}
>
  Dedicated to improving access to affordable, nutritious, sustainable, and culturally appropriate food in West Virginia and beyond.
</Typography>
</Box>

          {/* Quick Access Grid */}
          <Grid container spacing={3} justifyContent="center">
            {[
              { icon: <SearchIcon />, text: 'Find Food', color: '#a71d1d' },
              { icon: <LayersIcon />, text: 'Explore Food Data', color: '#354F5B' },
              { icon: <GroupIcon />, text: 'Organize', color: '#C84C23' },
              { icon: <AccessTimeFilledIcon />, text: 'Access Resources', color: '#39897E' },
            ].map((item, index) => (
              <Grid item xs={6} sm={3} key={index}>
                <Button
                  variant="contained"
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    width: '100%',
                    bgcolor: item.color,
                    color: 'white',
                    borderRadius: 3,
                    p: 2,
                    '&:hover': { bgcolor: 'black' },
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

          {/* Explore Button */}
          <Button
            variant="outlined"
            onClick={() => setOpen(false)}
            sx={{
              color: '#8b0000',
              borderColor: '#8b0000',
              borderRadius: '24px',
              px: 3,
              py: 1.2,
              fontSize: '1rem',
              fontWeight: 500,
              mt: 4,
              '&:hover': { borderColor: '#6a0000', bgcolor: '#f8f8f8' },
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
