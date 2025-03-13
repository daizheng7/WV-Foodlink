import React from 'react';
import { Box } from '@mui/material';

/**
 * CurvedTransition - A component that creates a curved edge transition effect
 * @param {Object} props
 * @param {string} props.color - The color of the curved shape (default: white)
 * @param {string} props.position - The position of the curve ('top' or 'bottom')
 * @param {number} props.height - The height of the curve in pixels
 * @param {Object} props.sx - Additional styles to apply to the container
 */
const CurvedTransition = ({ 
  color = '#fff', 
  position = 'bottom',
  height = 120,
  sx = {}
}) => {
  // Determine if curve is at top or bottom
  const isTop = position === 'top';
  
  return (
    <Box
      sx={{
        position: 'absolute',
        [position]: -2,
        left: 0,
        width: '100%',
        height: `${height}px`,
        zIndex: 5,
        overflow: 'hidden',
        ...sx
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          [position]: 0,
          left: '-5%',
          width: '110%',
          height: '100%',
          borderRadius: isTop 
            ? '0 0 50% 50% / 0 0 100% 100%' 
            : '50% 50% 0 0 / 100% 100% 0 0',
          background: color,
          boxShadow: isTop 
            ? '0 10px 30px rgba(0,0,0,0.05)' 
            : '0 -10px 30px rgba(0,0,0,0.05)',
        }}
      />
    </Box>
  );
};

export default CurvedTransition;