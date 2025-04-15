import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Fade,
  Grow,
  Slide,
  Zoom,
  Chip
} from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';

const AnimatedUrgentTitle = () => {
  const [mainTitleVisible, setMainTitleVisible] = useState(false);
  const [subTitleVisible, setSubTitleVisible] = useState(false);
  const [chipVisible, setChipVisible] = useState(false);
  const [pulseEffect, setPulseEffect] = useState(false);
  
  // Animation sequence
  useEffect(() => {
    const mainTitleTimer = setTimeout(() => setMainTitleVisible(true), 300);
    const subTitleTimer = setTimeout(() => setSubTitleVisible(true), 1000);
    const chipTimer = setTimeout(() => setChipVisible(true), 1800);
    const pulseTimer = setTimeout(() => setPulseEffect(true), 2500);
    
    return () => {
      clearTimeout(mainTitleTimer);
      clearTimeout(subTitleTimer);
      clearTimeout(chipTimer);
      clearTimeout(pulseTimer);
    };
  }, []);

  return (
    <Paper 
      elevation={4} 
      sx={{ 
        position: 'relative',
        overflow: 'hidden',
        borderRadius: 2,
        mb: 4,
        width: '100%',
        background: 'linear-gradient(135deg, #002855 0%, #002855 70%, #A50000 100%)',
        boxShadow: '0 8px 32px rgba(139, 0, 0, 0.2)',
        border: '1px solid rgba(139, 0, 0, 0.3)'
      }}
    >
      {/* Background elements */}
      <Box 
        sx={{ 
          position: 'absolute',
          top: 0,
          right: 0,
          width: '300px',
          height: '300px',
          background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 70%)',
          zIndex: 1
        }} 
      />
      
      {/* Content */}
      <Box sx={{ position: 'relative', zIndex: 2, p: { xs: 3, md: 4 } }}>
        <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
          <Zoom in={chipVisible}>
            <PriorityHighIcon 
              sx={{ 
                color: '#FFD700', 
                fontSize: '2.2rem', 
                mr: 2, 
                mt: 0.5,
                animation: pulseEffect ? 'pulse 2s infinite ease-in-out' : 'none',
                '@keyframes pulse': {
                  '0%': { opacity: 1, transform: 'scale(1)' },
                  '50%': { opacity: 0.6, transform: 'scale(1.1)' },
                  '100%': { opacity: 1, transform: 'scale(1)' }
                }
              }} 
            />
          </Zoom>
          
          <Box sx={{ width: { xs: '100%', sm: 'auto' } }}>
            <Slide direction="down" in={mainTitleVisible} timeout={800}>
              <Typography 
                variant="h4" 
                component="h1" 
                sx={{ 
                  color: 'white', 
                  fontWeight: 800,
                  textShadow: '0 2px 4px rgba(0,0,0,0.2)',
                  mb: 1,
                  lineHeight: 1.3,
                  fontSize: { xs: '1.5rem', sm: '1.8rem', md: '2.125rem' }
                }}
              >
                Proposal for a West Virginia Office of Community Food Security
              </Typography>
            </Slide>
            
            <Fade in={subTitleVisible} timeout={1000}>
              <Typography 
                variant="subtitle1" 
                sx={{ 
                  color: 'rgba(255,255,255,0.9)', 
                  ml: 1,
                  fontWeight: 400,
                  fontSize: { xs: '0.95rem', sm: '1.1rem' }
                }}
              >
                Addressing the urgent need for coordinated action on food insecurity
              </Typography>
            </Fade>
          </Box>
        </Box>
        
        <Box 
          sx={{ 
            display: 'flex', 
            gap: 2, 
            flexWrap: 'wrap',
            mt: 3,
            justifyContent: { xs: 'center', sm: 'flex-start' }
          }}
        >
          <Grow in={chipVisible} timeout={600} style={{ transformOrigin: '0 0 0' }}>
            <Chip 
              icon={<ErrorOutlineIcon />} 
              label="Urgent Action Needed" 
              sx={{ 
                bgcolor: 'rgba(255,255,255,0.15)', 
                color: 'white',
                fontWeight: 600,
                '& .MuiChip-icon': { color: '#FFD700' },
                backdropFilter: 'blur(4px)',
                border: '1px solid rgba(255,255,255,0.2)'
              }} 
            />
          </Grow>
          
          <Grow in={chipVisible} timeout={800} style={{ transformOrigin: '0 0 0', transitionDelay: '200ms' }}>
            <Chip 
              icon={<AccessTimeFilledIcon />} 
              label="Time-Sensitive Funding Opportunity" 
              sx={{ 
                bgcolor: 'rgba(255,255,255,0.15)', 
                color: 'white',
                fontWeight: 600,
                '& .MuiChip-icon': { color: '#FFD700' },
                backdropFilter: 'blur(4px)',
                border: '1px solid rgba(255,255,255,0.2)'
              }} 
            />
          </Grow>
        </Box>
      </Box>
      
      {/* Bottom accent bar */}
      <Box 
        sx={{ 
          height: 4,
          width: '100%',
          background: 'linear-gradient(to right, #FFD700, #FFA500)'
        }} 
      />
    </Paper>
  );
};

export default AnimatedUrgentTitle;