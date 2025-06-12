import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import { red, blue, grey } from '@mui/material/colors';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import InfoIcon from '@mui/icons-material/Info';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Paper from '@mui/material/Paper';
import Chip from '@mui/material/Chip';
import { ThemeProvider, createTheme, responsiveFontSizes } from '@mui/material/styles';
import BusinessIcon from '@mui/icons-material/Business';
import SchoolIcon from '@mui/icons-material/School';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import useMediaQuery from '@mui/material/useMediaQuery';

// Create a responsive theme instance
let theme = createTheme({
  palette: {
    primary: {
      main: '#c84d24',
      light: '#e57c52',
      dark: '#8c3519',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#344f5b',
      light: '#5c7787',
      dark: '#0e2833',
      contrastText: '#ffffff',
    },
    background: {
      default: '#f8f8f8',
      paper: '#ffffff',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 700,
    },
    h6: {
      fontWeight: 600,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          fontWeight: 600,
          boxShadow: 'none',
          padding: '10px 16px',
        },
        containedPrimary: {
          '&:hover': {
            boxShadow: '0 4px 12px rgba(200, 77, 36, 0.2)',
          },
        },
        containedSecondary: {
          '&:hover': {
            boxShadow: '0 4px 12px rgba(52, 79, 91, 0.2)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          overflow: 'hidden',
          borderRadius: 12,
          transition: 'transform 0.3s ease, box-shadow 0.3s ease',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: '0 12px 20px rgba(0, 0, 0, 0.1)',
          },
        },
      },
    },
    MuiCardHeader: {
      styleOverrides: {
        root: {
          padding: '20px 24px',
        },
      },
    },
  },
});

// Make typography responsive
theme = responsiveFontSizes(theme);

const PartnerHome = () => {
  const [openDialog, setOpenDialog] = useState({
    resilient: false,
    nutrition: false
  });
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleOpenDialog = (dialog) => {
    setOpenDialog({ ...openDialog, [dialog]: true });
  };

  const handleCloseDialog = (dialog) => {
    setOpenDialog({ ...openDialog, [dialog]: false });
  };

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="xl" sx={{ py: 6 }}>
        
        
        <Grid container spacing={4} justifyContent="center">
          {/* WVU Center for Resilient Communities */}
          <Grid item xs={12} md={6}>
            <Card 
              elevation={3} 
              sx={{ 
                height: '100%', 
                display: 'flex', 
                flexDirection: 'column',
                position: 'relative',
                overflow: 'visible',
              }}
            >
               <Box
  component="img"
  src="/crc.png"
  alt="WVU CRC Logo"
  sx={{
    width: '100%',
    maxHeight: 120,
    objectFit: 'contain',
    mx: 'auto',
    my: 2
  }}
/>
              
              <CardHeader
  title={
    <>
      WVU Center for Resilient Communities
    </>
  }
  titleTypographyProps={{
    align: "left",
    fontWeight: "bold",
    fontSize: { xs: "1.25rem", md: "1.4rem" },
  }}
                sx={{ 
                  bgcolor: '#002855', 
                  color: 'white', 
                  pl: { xs: 10, md: 12 }
                }}
              />
              
              <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', p: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                  
                 
                </Box>
                
                <Typography variant="body1" paragraph sx={{ mb: 3 }}>
                  Advancing community resilience and sustainable development in West Virginia through research, education, and community engagement initiatives.
                </Typography>
                
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, my: 2 }}>
                  <Chip 
                    label="Community Economies" 
                    size="small" 
                    variant="outlined" 
                    color="#002855" 
                  />
                  <Chip 
                    label="Environmental Justice" 
                    size="small" 
                    variant="outlined" 
                    color="#002855" 
                  />
                  <Chip 
                    label="Climate Action" 
                    size="small" 
                    variant="outlined" 
                    color="#002855" 
                  />
                </Box>
                
                <Box sx={{ display: 'flex', gap: 2, flexDirection: 'column', mt: 'auto' }}>
                  <List dense disablePadding>
                    <ListItem disableGutters sx={{ px: 0, py: 0.5 }}>
                      <CheckCircleIcon color="#002855" fontSize="small" sx={{ mr: 1 }} />
                      <ListItemText 
                        primary="Community-engaged research and education programs" 
                        primaryTypographyProps={{ variant: 'body2' }}
                      />
                    </ListItem>
                    <ListItem disableGutters sx={{ px: 0, py: 0.5 }}>
                      <CheckCircleIcon color="#002855" fontSize="small" sx={{ mr: 1 }} />
                      <ListItemText 
                        primary="Building just, equitable, and vibrant communities" 
                        primaryTypographyProps={{ variant: 'body2' }}
                      />
                    </ListItem>
                    <ListItem disableGutters sx={{ px: 0, py: 0.5 }}>
                      <CheckCircleIcon color="#002855" fontSize="small" sx={{ mr: 1 }} />
                      <ListItemText 
                        primary="Transformative change through partnership" 
                        primaryTypographyProps={{ variant: 'body2' }}
                      />
                    </ListItem>
                  </List>
                </Box>
              </CardContent>
              
              <Divider />
            <CardActions sx={{ p: 3, gap: 2, justifyContent: isMobile ? 'center' : 'flex-end' }}>
  <Button 
    variant="outlined" 
    color="#002855" 
    onClick={() => handleOpenDialog('resilient')}
    startIcon={<InfoIcon />}
  >
    Learn More About WVU Center for Resilient Communities
  </Button>
  <Button 
    variant="contained" 
    color="#002855" 
    href="https://resilientcommunities.wvu.edu/"
    target="_blank"
    rel="noopener noreferrer"
    endIcon={<OpenInNewIcon />}
  >
    Visit WVU Center for Resilient Communities Website
  </Button>
</CardActions>
            </Card>
            
            {/* Dialog for CRC */}
            <Dialog
              open={openDialog.resilient}
              onClose={() => handleCloseDialog('resilient')}
              scroll="paper"
              aria-labelledby="crc-dialog-title"
              fullWidth
              maxWidth="md"
            >
              <DialogTitle 
                id="crc-dialog-title" 
                sx={{ 
                  bgcolor: "#002855", 
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <BusinessIcon sx={{ mr: 1 }} />
                  About the WVU Center for Resilient Communities
                </Box>
                <IconButton 
                  edge="end" 
                  color="inherit" 
                  onClick={() => handleCloseDialog('resilient')} 
                  aria-label="close"
                >
                  <CloseIcon />
                </IconButton>
              </DialogTitle>
              
              <DialogContent dividers>
                <DialogContentText component="div">
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                    
                    <Typography variant="h5" gutterBottom color="#002855" fontWeight="bold">
                      Center for Resilient Communities
                    </Typography>
                  </Box>
                  
                  <Typography paragraph>
                    The Center for Resilient Communities (CRC) is dedicated to advancing community-engaged research and education programs that generate knowledge and empower individuals, with the goal of building more just, equitable, and vibrant communities in West Virginia, the greater Appalachian region, and beyond.
                  </Typography>
                  
                  <Typography paragraph>
                    Through long-term commitments and cooperative agreements, the CRC collaborates with students, scholars, and community partners, both locally and globally, to foster transformative change in our communities.
                  </Typography>
                  
                  <Box sx={{ my: 4, p: 3, bgcolor: grey[50], borderRadius: 2 }}>
                    <Typography variant="h6" gutterBottom sx={{ color: "#002855", display: 'flex', alignItems: 'center' }}>
                      <InfoIcon sx={{ mr: 1 }} /> Mission & Vision
                    </Typography>
                    <Typography variant="body1" paragraph>
                      The CRC's mission is to build partnerships that enhance the social, economic, and environmental well-being of communities through collaborative research and education.
                    </Typography>
                    <Typography variant="body1">
                      Their vision is a network of resilient communities empowered to address challenges and create sustainable futures for all residents.
                    </Typography>
                  </Box>
                  
                  <Typography variant="h6" gutterBottom sx={{ mt: 4, color: "#002855", fontWeight: 'bold' }}>
                    Areas of Inquiry
                  </Typography>
                  
                  <Typography paragraph>
                    The CRC pursues work in three distinct "Areas of Inquiry." Collaborators unite to explore a particular problem, conduct research, and generate innovative analyses or potential solutions to advance projects. In this collaborative process community partners, scholars, and/or students actively engage in collective study, action, reflection, consultation, and long-term planning spanning many years, or even decades.
                  </Typography>
                  
                  <Box sx={{ mt: 3, mb: 2 }}>
                    <Paper elevation={2} sx={{ p: 3, mb: 3, borderRadius: 2, borderLeft: `4px solid ${theme.palette.primary.main}` }}>
                      <Typography variant="subtitle1" fontWeight="bold" color="#002855" gutterBottom>
                        Community Economies and Sustainable Regional Development
                      </Typography>
                      <Typography variant="body2">
                        Advancing the role of social entrepreneurs, cooperative enterprises and community-oriented financing initiatives in building local wealth and promoting social and economic justice and sustainable development at regional, national, and global levels.
                      </Typography>
                    </Paper>
                    
                    <Paper elevation={2} sx={{ p: 3, mb: 3, borderRadius: 2, borderLeft: `4px solid ${theme.palette.primary.main}` }}>
                      <Typography variant="subtitle1" fontWeight="bold" color="#002855" gutterBottom>
                        Environmental Justice, Climate Action and Community Well-being
                      </Typography>
                      <Typography variant="body2">
                        Advancing social action to address health disparities, environmental hazards, water quality and flood disasters related to past environmental degradation and ongoing climate impacts in WV and Appalachia.
                      </Typography>
                    </Paper>
                    
                    <Paper elevation={2} sx={{ p: 3, borderRadius: 2, borderLeft: `4px solid ${theme.palette.primary.main}` }}>
                      <Typography variant="subtitle1" fontWeight="bold" color="#002855" gutterBottom>
                        Food System Transformation
                      </Typography>
                      <Typography variant="body2">
                        Advancing food system resilience at a local, regional, and even global scale by supporting economic cooperation and equitable development, agroecology practices and methods that mitigate climate change and promote food sovereignty.
                      </Typography>
                    </Paper>
                  </Box>
                </DialogContentText>
              </DialogContent>
              <DialogActions sx={{ p: 2 }}>
                <Button onClick={() => handleCloseDialog('resilient')} color="#002855">
                  Close
                </Button>
                <Button 
                  href="https://resilientcommunities.wvu.edu/" 
                  target="_blank"
                  rel="noopener noreferrer"
                  color="#002855" 
                  variant="contained"
                  endIcon={<OpenInNewIcon />}
                >
                  Visit Website
                </Button>
              </DialogActions>
            </Dialog>
          </Grid>
          
          {/* WVU Extension Family Nutrition Program */}
          <Grid item xs={12} md={6}>
            <Card 
              elevation={3} 
              sx={{ 
                height: '100%', 
                display: 'flex', 
                flexDirection: 'column',
                position: 'relative',
                overflow: 'visible',
              }}
            >
              <Box
  component="img"
  src="/wvuext_fnp_color.jpg"
  alt="WVU Extension Family Nutrition Program Logo"
  sx={{
    width: '100%',
    maxHeight: 120,
    objectFit: 'contain',
    mx: 'auto',
    my: 2
  }}
/>
              
              <CardHeader
                title="WVU Extension Family Nutrition Program"
                titleTypographyProps={{ 
                  align: 'left', 
                  fontWeight: 'bold', 
                  fontSize: { xs: '1.25rem', md: '1.4rem' }
                }}
                sx={{ 
                  bgcolor: '#002855', 
                  color: 'white', 
                  pl: { xs: 10, md: 12 }
                }}
              />
              
              <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', p: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                  
                </Box>
                
                <Typography variant="body1" paragraph sx={{ mb: 3 }}>
                  Empowering families with knowledge and resources for healthy food choices and improved nutrition through education and community outreach programs.
                </Typography>
                
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, my: 2 }}>
                  <Chip 
                    label="Healthy Eating" 
                    size="small" 
                    variant="outlined" 
                    color="#002855" 
                  />
                  <Chip 
                    label="Food Resources" 
                    size="small" 
                    variant="outlined" 
                    color="#002855" 
                  />
                  <Chip 
                    label="Physical Activity" 
                    size="small" 
                    variant="outlined" 
                    color="#002855" 
                  />
                </Box>
                
                <Box sx={{ display: 'flex', gap: 2, flexDirection: 'column', mt: 'auto' }}>
                  <List dense disablePadding>
                    <ListItem disableGutters sx={{ px: 0, py: 0.5 }}>
                      <CheckCircleIcon color="#002855" fontSize="small" sx={{ mr: 1 }} />
                      <ListItemText 
                        primary="Nutrition education using USDA guidelines" 
                        primaryTypographyProps={{ variant: 'body2' }}
                      />
                    </ListItem>
                    <ListItem disableGutters sx={{ px: 0, py: 0.5 }}>
                      <CheckCircleIcon color="#002855" fontSize="small" sx={{ mr: 1 }} />
                      <ListItemText 
                        primary="Food demonstrations and practical skills" 
                        primaryTypographyProps={{ variant: 'body2' }}
                      />
                    </ListItem>
                    <ListItem disableGutters sx={{ px: 0, py: 0.5 }}>
                      <CheckCircleIcon color="#002855" fontSize="small" sx={{ mr: 1 }} />
                      <ListItemText 
                        primary="Serving over 40 counties in West Virginia" 
                        primaryTypographyProps={{ variant: 'body2' }}
                      />
                    </ListItem>
                  </List>
                </Box>
              </CardContent>
              
              <Divider />
              <CardActions sx={{ p: 3, gap: 2, justifyContent: isMobile ? 'center' : 'flex-end' }}>
  <Button 
    variant="outlined" 
    color="#002855" 
    onClick={() => handleOpenDialog('nutrition')}
    startIcon={<InfoIcon />}
  >
    Learn More About Family Nutrition Program
  </Button>
  <Button 
    variant="contained" 
    color="#002855" 
    href="https://extension.wvu.edu/food-health/nutrition/fnp"
    target="_blank"
    rel="noopener noreferrer"
    endIcon={<OpenInNewIcon />}
  >
    Visit Family Nutrition Program Website
  </Button>
</CardActions>
            </Card>
            
            {/* Dialog for FNP */}
            <Dialog
              open={openDialog.nutrition}
              onClose={() => handleCloseDialog('nutrition')}
              scroll="paper"
              aria-labelledby="fnp-dialog-title"
              fullWidth
              maxWidth="md"
            >
              <DialogTitle 
                id="fnp-dialog-title" 
                sx={{ 
                  bgcolor: "#002855", 
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <SchoolIcon sx={{ mr: 1 }} />
                  About the WVU Extension Family Nutrition Program
                </Box>
                <IconButton 
                  edge="end" 
                  color="inherit" 
                  onClick={() => handleCloseDialog('nutrition')} 
                  aria-label="close"
                >
                  <CloseIcon />
                </IconButton>
              </DialogTitle>
              
              <DialogContent dividers>
                <DialogContentText component="div">
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                    
                  </Box>
                  
                  <Typography variant="h6" gutterBottom sx={{ color: "#002855" }}>
                    What is the WVU Extension Family Nutrition Program (FNP)?
                  </Typography>
                  
                  <Typography paragraph>
                    The Family Nutrition Program is comprised of numerous nutrition, food and physical activity projects designed to help limited resource families, youths, and adults improve their health. FNP targets risk factors associated with obesity, cardiovascular disease, diabetes, hypertension and other chronic diseases.
                  </Typography>
                  
                  <Box sx={{ my: 4, p: 3, bgcolor: grey[50], borderRadius: 2 }}>
                    <Typography variant="h6" gutterBottom sx={{ color: "#002855", display: 'flex', alignItems: 'center' }}>
                      <InfoIcon sx={{ mr: 1 }} /> Program Goals
                    </Typography>
                    <Typography variant="body1">
                      FNP encourages the adoption of healthy lifestyle behaviors by:
                    </Typography>
                    
                    <List>
                      <ListItem>
                        <CheckCircleIcon color="#002855" sx={{ mr: 2 }} />
                        <ListItemText primary="Teaching nutrition education using the USDA's MyPlate and Dietary Guidelines" />
                      </ListItem>
                      <ListItem>
                        <CheckCircleIcon color="#002855" sx={{ mr: 2 }} />
                        <ListItemText primary="Providing food demonstrations" />
                      </ListItem>
                      <ListItem>
                        <CheckCircleIcon color="#002855" sx={{ mr: 2 }} />
                        <ListItemText primary="Improving access and availability to local community resources" />
                      </ListItem>
                      <ListItem>
                        <CheckCircleIcon color="#002855" sx={{ mr: 2 }} />
                        <ListItemText primary="Helping participants to stretch their food dollars, plan menus and read food labels" />
                      </ListItem>
                      <ListItem>
                        <CheckCircleIcon color="#002855" sx={{ mr: 2 }} />
                        <ListItemText primary="Encouraging participants to devote more time to being physically active" />
                      </ListItem>
                    </List>
                  </Box>
                  
                  <Divider sx={{ my: 3 }} />
                  
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                      <Paper elevation={2} sx={{ p: 3, height: '100%', borderRadius: 2, borderLeft: `4px solid ${theme.palette.secondary.main}` }}>
                        <Typography variant="h6" gutterBottom sx={{ color: "#002855" }}>
                          Target Audiences
                        </Typography>
                        
                        <Typography variant="body2">
                          FNP targets limited resource adults living at or below 185% of the federal poverty level and youths at schools, groups or summer camps where more than 50% of participants are eligible for the free/reduced lunch program.
                        </Typography>
                      </Paper>
                    </Grid>
                    
                    <Grid item xs={12} md={6}>
                      <Paper elevation={2} sx={{ p: 3, height: '100%', borderRadius: 2, borderLeft: `4px solid ${theme.palette.secondary.main}` }}>
                        <Typography variant="h6" gutterBottom sx={{ color: "#002855" }}>
                          Program Delivery
                        </Typography>
                        
                        <Typography variant="body2" paragraph>
                          The Family Nutrition Program is located in more than 40 counties with approximately 50 Nutrition Outreach Instructors, 50 County Extension Agents, and more than 2,000 skilled partners.
                        </Typography>
                      </Paper>
                    </Grid>
                  </Grid>
                  
                  <Box sx={{ mt: 10 }}>
                    <Typography variant="h6" gutterBottom sx={{ color: "#002855" }}>
                      Program Focus Areas
                    </Typography>
                    
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 2 }}>
                      <Chip label="Nutrition Education" color="#002855" />
                      <Chip label="Food Demonstrations" color="#002855" />
                      <Chip label="Health Resources" color="#002855" />
                      <Chip label="Community Outreach" color="#002855" />
                      <Chip label="Youth Programs" color="#002855" />
                      <Chip label="Meal Planning" color="#002855" />
                      <Chip label="Budget Management" color="#002855" />
                      <Chip label="Food Safety" color="#002855" />
                    </Box>
                  </Box>
                </DialogContentText>
              </DialogContent>
              <DialogActions sx={{ p: 2 }}>
                <Button onClick={() => handleCloseDialog('nutrition')} color="#002855">
                  Close
                </Button>
                <Button 
                  href="https://extension.wvu.edu/food-health/nutrition/fnp" 
                  target="_blank"
                  rel="noopener noreferrer"
                  color="#002855" 
                  variant="contained"
                  endIcon={<OpenInNewIcon />}
                >
                  Visit Website
                </Button>
              </DialogActions>
            </Dialog>
          </Grid>
        </Grid>
      </Container>
    </ThemeProvider>
  );
};

export default PartnerHome;