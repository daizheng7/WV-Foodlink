import React from 'react';
import { Box, Typography, Grid } from '@mui/material';

const partners = [
  {
    name: 'Partner 1',
    logo: 'https://via.placeholder.com/100',
    description: 'A leader in community development and food security programs.',
  },
  {
    name: 'Partner 2',
    logo: 'https://via.placeholder.com/100',
    description: 'Dedicated to improving access to healthy food for all.',
  },
  {
    name: 'Partner 3',
    logo: 'https://via.placeholder.com/100',
    description: 'Focused on sustainability and empowering local communities.',
  },
  // Add more partners as needed
];

const Partners = () => {
  return (
    <Box sx={{ p: 4, mb: 4, textAlign: 'center' }}>
      <Typography variant="h5" gutterBottom>
        Our Partners
      </Typography>
      <Typography variant="body2" sx={{ mb: 3 }}>
        We collaborate with organizations and communities dedicated to improving food security and sustainability.
      </Typography>
      <Grid container spacing={4} justifyContent="center">
        {partners.map((partner, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                p: 3,
                bgcolor: '#f5f5f5',
                borderRadius: 2,
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                transition: '0.3s',
                '&:hover': {
                  transform: 'scale(1.05)',
                  boxShadow: '0 6px 12px rgba(0, 0, 0, 0.2)',
                },
              }}
            >
              <img
                src={partner.logo}
                alt={`${partner.name} Logo`}
                style={{ width: 100, height: 100, marginBottom: 16 }}
              />
              <Typography variant="h6" sx={{ mb: 1 }}>
                {partner.name}
              </Typography>
              <Typography variant="body2">
                {partner.description}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Partners;
