import React, { useState, useEffect } from 'react';
// Material UI imports
import {
  Box,
  Typography,
  Button,
  Paper,
  Grid,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Chip,
  Card,
  CardContent,
  CardHeader,
  CardActions,
  useTheme,
  useMediaQuery,
  Fade,
  Grow,
  Zoom,
  LinearProgress,
  Tooltip
} from '@mui/material';
import LaunchIcon from '@mui/icons-material/Launch';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import AssignmentIcon from '@mui/icons-material/Assignment';
import StorefrontIcon from '@mui/icons-material/Storefront';
import BusinessIcon from '@mui/icons-material/Business';
import WarningIcon from '@mui/icons-material/Warning';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import PeopleIcon from '@mui/icons-material/People';

const FoodSecuritySummary = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [animationReady, setAnimationReady] = useState(false);
  const [progress, setProgress] = useState(0);
  const [hoveredItem, setHoveredItem] = useState(null);
  
  // Animation sequence on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimationReady(true);
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Progress bar animation
  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          return 100;
        }
        const diff = Math.random() * 10;
        return Math.min(oldProgress + diff, 100);
      });
    }, 500);
    
    return () => {
      clearInterval(timer);
    };
  }, []);
  
  const openFullReport = () => {
    window.open('https://westvirginiauniversity-my.sharepoint.com/:b:/g/personal/jlohnes_mail_wvu_edu/EZFZYTYKi7BMoKriEEJdFLgBoUCVXh44eYkt58poE5H8iQ?e=HPln6v', '_blank');
  };
  
  const handleMouseEnter = (item) => {
    setHoveredItem(item);
  };
  
  const handleMouseLeave = () => {
    setHoveredItem(null);
  };

  return (
    <Fade in={animationReady} timeout={800}>
      <Paper 
        elevation={3} 
        sx={{ 
          overflow: 'hidden',
          borderRadius: 2,
          maxWidth: 1200,
          mx: 'auto',
          boxShadow: '0 8px 32px rgba(0, 51, 102, 0.1)',
          position: 'relative'
        }}
      >
        {/* Content */}
        <Grid container>
          {/* Left Column - The Challenge */}
          <Grid item xs={12} md={6} sx={{ p: 3, borderRight: { md: '1px solid rgba(0,0,0,0.1)' } }}>
            <Fade in={animationReady} timeout={800} style={{ transitionDelay: '200ms' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <WarningIcon sx={{ color: '#002855', mr: 1 }} />
                <Typography variant="h5" fontWeight="bold" color="#000000">
                  The Crisis
                </Typography>
              </Box>
            </Fade>
            
            <Grow in={animationReady} timeout={1000} style={{ transitionDelay: '400ms' }}>
              <Box sx={{ 
                borderLeft: '4px solid #FFB81C',
                pl: 2,
                py: 1,
                mb: 2,
                background: 'rgba(255, 184, 28, 0.05)'
              }}>
                <Typography variant="body1" fontWeight="medium">
                  West Virginia faces one of the <strong style={{ color: '#000000' }}>highest food insecurity rates</strong> in the country despite over <strong style={{ color: '#000000' }}>$700 million</strong> in yearly federal assistance.
                </Typography>
              </Box>
            </Grow>
            
            <Box sx={{ mb: 2 }}>
              <LinearProgress 
                variant="determinate" 
                value={progress} 
                sx={{ 
                  height: 8, 
                  borderRadius: 4,
                  bgcolor: 'rgba(0, 0, 0, 0.05)',
                  '& .MuiLinearProgress-bar': {
                    backgroundColor: '#002855'
                  },
                  mb: 1
                }} 
              />
              <Typography variant="caption" color="textSecondary" align="right" display="block">
                Current system effectiveness: <strong>Needs urgent improvement</strong>
              </Typography>
            </Box>
            
            <List disablePadding>
              <Fade in={animationReady} timeout={500} style={{ transitionDelay: '600ms' }}>
                <ListItem 
                  disableGutters 
                  onMouseEnter={() => handleMouseEnter('programs')}
                  onMouseLeave={handleMouseLeave}
                  sx={{
                    p: 1,
                    borderRadius: 1,
                    transition: 'all 0.2s',
                    bgcolor: hoveredItem === 'programs' ? 'rgba(0, 51, 102, 0.05)' : 'transparent',
                    mb: 1
                  }}
                >
                  <ListItemIcon sx={{ minWidth: 36 }}>
                    <AssignmentIcon sx={{ color: hoveredItem === 'programs' ? '#002855' : '#666666' }} />
                  </ListItemIcon>
                  <ListItemText 
                    primary={<>
                      <strong>15 federal programs</strong> split across <strong>4 state agencies</strong>
                    </>}
                    primaryTypographyProps={{ 
                      variant: 'body2',
                      sx: { fontWeight: hoveredItem === 'programs' ? 500 : 400 }
                    }}
                    secondary="Fragmented approach leads to inefficiency and gaps in service"
                    secondaryTypographyProps={{
                      variant: 'caption',
                      sx: { 
                        display: 'block', // CHANGED: Always show instead of on hover only
                        mt: 0.5,
                        color: '#666'
                      }
                    }}
                  />
                </ListItem>
              </Fade>
              
              <Fade in={animationReady} timeout={500} style={{ transitionDelay: '800ms' }}>
                <ListItem 
                  disableGutters
                  onMouseEnter={() => handleMouseEnter('funding')}
                  onMouseLeave={handleMouseLeave}
                  sx={{
                    p: 1,
                    borderRadius: 1,
                    transition: 'all 0.2s',
                    bgcolor: hoveredItem === 'funding' ? 'rgba(0, 51, 102, 0.05)' : 'transparent',
                    mb: 1
                  }}
                >
                  <ListItemIcon sx={{ minWidth: 36 }}>
                    <AttachMoneyIcon sx={{ color: hoveredItem === 'funding' ? '#002855' : '#666666' }} />
                  </ListItemIcon>
                  <ListItemText 
                    primary={<>
                      <strong>Funding captured</strong> by out-of-state businesses
                    </>} 
                    primaryTypographyProps={{ 
                      variant: 'body2',
                      sx: { fontWeight: hoveredItem === 'funding' ? 500 : 400 }
                    }}
                    secondary="Economic benefits leave our communities instead of being reinvested"
                    secondaryTypographyProps={{
                      variant: 'caption',
                      sx: { 
                        display: 'block', // CHANGED: Always show
                        mt: 0.5,
                        color: '#666'
                      }
                    }}
                  />
                </ListItem>
              </Fade>
              
              <Fade in={animationReady} timeout={500} style={{ transitionDelay: '1000ms' }}>
                <ListItem 
                  disableGutters
                  onMouseEnter={() => handleMouseEnter('initiatives')}
                  onMouseLeave={handleMouseLeave}
                  sx={{
                    p: 1,
                    borderRadius: 1,
                    transition: 'all 0.2s',
                    bgcolor: hoveredItem === 'initiatives' ? 'rgba(0, 51, 102, 0.05)' : 'transparent'
                  }}
                >
                  <ListItemIcon sx={{ minWidth: 36 }}>
                    <PeopleIcon sx={{ color: hoveredItem === 'initiatives' ? '#002855' : '#666666' }} />
                  </ListItemIcon>
                  <ListItemText 
                    primary={<>
                      <strong>Local initiatives</strong> rely on intermittent funding
                    </>} 
                    primaryTypographyProps={{ 
                      variant: 'body2',
                      sx: { fontWeight: hoveredItem === 'initiatives' ? 500 : 400 }
                    }}
                    secondary="Cannot build sustainable programs without consistent support"
                    secondaryTypographyProps={{
                      variant: 'caption',
                      sx: { 
                        display: 'block', // CHANGED: Always show
                        mt: 0.5,
                        color: '#666'
                      }
                    }}
                  />
                </ListItem>
              </Fade>
            </List>
          </Grid>
          
          {/* Right Column - The Solution */}
          <Grid item xs={12} md={6} sx={{ p: 3 }}>
            <Fade in={animationReady} timeout={800} style={{ transitionDelay: '200ms' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <TrendingUpIcon sx={{ color: '#344f5b', mr: 1 }} />
                <Typography variant="h5" fontWeight="bold" color="#000000">
                  Our Action Plan
                </Typography>
              </Box>
            </Fade>
            
            <Grow in={animationReady} timeout={1000} style={{ transitionDelay: '400ms' }}>
              <Box sx={{ 
                backgroundColor: 'rgba(0, 51, 102, 0.05)', 
                p: 2, 
                borderRadius: 2,
                mb: 3,
                position: 'relative',
                overflow: 'hidden'
              }}>
                <Box 
                  sx={{ 
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: 5,
                    height: '100%',
                    backgroundColor: '#344f5b'
                  }} 
                />
                
                <Typography variant="body1" paragraph sx={{ fontWeight: 500, pl: 1 }}>
                  Establish an <strong style={{ color: '#000000' }}>Office of Community Food Security (OCFS)</strong> to coordinate programs and leverage funding to build a stronger local food economy.
                </Typography>
              </Box>
            </Grow>
            
            <Zoom in={animationReady} timeout={500} style={{ transitionDelay: '600ms' }}>
              <Typography variant="subtitle2" color="#000000" gutterBottom sx={{ fontWeight: 600, mb: 2 }}>
                Take immediate action to:
              </Typography>
            </Zoom>
            
            <Grid container spacing={1} sx={{ mb: 3 }}>
              <Grid item xs={12} sm={6}>
                <Zoom in={animationReady} timeout={500} style={{ transitionDelay: '700ms' }}>
                  <Card 
                    elevation={1} 
                    sx={{ 
                      mb: 1, 
                      transition: 'all 0.3s',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: 3
                      }
                    }}
                  >
                    <CardContent sx={{ p: 1.5, '&:last-child': { pb: 1.5 } }}>
                      <ListItem disableGutters dense sx={{ px: 0 }}>
                        <ListItemIcon sx={{ minWidth: 36 }}>
                          <PeopleIcon sx={{ color: '#002855' }} />
                        </ListItemIcon>
                        <ListItemText 
                          primary="Engage low-income communities directly" 
                          primaryTypographyProps={{ 
                            variant: 'body2', 
                            sx: { fontWeight: 600 }
                          }}
                        />
                      </ListItem>
                    </CardContent>
                  </Card>
                </Zoom>
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <Zoom in={animationReady} timeout={500} style={{ transitionDelay: '800ms' }}>
                  <Card 
                    elevation={1} 
                    sx={{ 
                      mb: 1, 
                      transition: 'all 0.3s',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: 3
                      }
                    }}
                  >
                    <CardContent sx={{ p: 1.5, '&:last-child': { pb: 1.5 } }}>
                      <ListItem disableGutters dense sx={{ px: 0 }}>
                        <ListItemIcon sx={{ minWidth: 36 }}>
                          <AttachMoneyIcon sx={{ color: '#002855' }} />
                        </ListItemIcon>
                        <ListItemText 
                          primary="Secure multi-year grant funding" 
                          primaryTypographyProps={{ 
                            variant: 'body2', 
                            sx: { fontWeight: 600 }
                          }}
                        />
                      </ListItem>
                    </CardContent>
                  </Card>
                </Zoom>
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <Zoom in={animationReady} timeout={500} style={{ transitionDelay: '900ms' }}>
                  <Card 
                    elevation={1} 
                    sx={{ 
                      mb: 1, 
                      transition: 'all 0.3s',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: 3
                      }
                    }}
                  >
                    <CardContent sx={{ p: 1.5, '&:last-child': { pb: 1.5 } }}>
                      <ListItem disableGutters dense sx={{ px: 0 }}>
                        <ListItemIcon sx={{ minWidth: 36 }}>
                          <AssignmentIcon sx={{ color: '#002855' }} />
                        </ListItemIcon>
                        <ListItemText 
                          primary="Implement local food security plans" 
                          primaryTypographyProps={{ 
                            variant: 'body2', 
                            sx: { fontWeight: 600 }
                          }}
                        />
                      </ListItem>
                    </CardContent>
                  </Card>
                </Zoom>
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <Zoom in={animationReady} timeout={500} style={{ transitionDelay: '1000ms' }}>
                  <Card 
                    elevation={1} 
                    sx={{ 
                      mb: 1, 
                      transition: 'all 0.3s',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: 3
                      }
                    }}
                  >
                    <CardContent sx={{ p: 1.5, '&:last-child': { pb: 1.5 } }}>
                      <ListItem disableGutters dense sx={{ px: 0 }}>
                        <ListItemIcon sx={{ minWidth: 36 }}>
                          <StorefrontIcon sx={{ color: '#002855' }} />
                        </ListItemIcon>
                        <ListItemText 
                          primary="Grow WV's food and farm economy" 
                          primaryTypographyProps={{ 
                            variant: 'body2', 
                            sx: { fontWeight: 600 }
                          }}
                        />
                      </ListItem>
                    </CardContent>
                  </Card>
                </Zoom>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </Fade>
  );
};

export default FoodSecuritySummary;