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
import IconButton from '@mui/material/IconButton';
import { red, blue } from '@mui/material/colors';
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
import { ThemeProvider, createTheme } from '@mui/material/styles';

// Create a theme instance
const theme = createTheme({
  palette: {
    primary: {
      main: '#99031e',
    },
    secondary: {
      main: '#004990',
    },
  },
});

const PartnerHome = () => {
  const [openDialog, setOpenDialog] = useState({
    resilient: false,
    nutrition: false
  });

  const handleOpenDialog = (dialog) => {
    setOpenDialog({ ...openDialog, [dialog]: true });
  };

  const handleCloseDialog = (dialog) => {
    setOpenDialog({ ...openDialog, [dialog]: false });
  };

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="lg" sx={{ my: 8 }}>
        <Typography 
          variant="h4" 
          component="h2" 
          align="center" 
          gutterBottom
          sx={{ mb: 6, fontWeight: 'bold', position: 'relative' }}
        >
          FoodLink Key Partners
          <Box 
            sx={{ 
              width: 60, 
              height: 3, 
              bgcolor: 'primary.main', 
              position: 'absolute', 
              bottom: -10, 
              left: '50%', 
              transform: 'translateX(-50%)', 
              borderRadius: 1 
            }} 
          />
        </Typography>
        
        <Box sx={{ mb: 6, maxWidth: 800, mx: 'auto' }}>
          <Typography variant="body1" paragraph>
            This website is now maintained in partnership between the WVU Center for Resilient Communities and the <Box component="span" fontWeight="bold" color="secondary.main">WVU Extension Family Nutrition Program (SNAP-Ed)</Box> and its development continues to be motivated by a vision that <Box component="span" fontStyle="italic">all people must have access to safe, nutritious, and culturally appropriate food in sufficient quantity and quality to sustain a healthy life with human dignity</Box>.
          </Typography>
        </Box>
        
        <Grid container spacing={4}>
          {/* WVU Center for Resilient Communities */}
          <Grid item xs={12} md={6}>
            <Card elevation={3} sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardHeader
                title="WVU Center for Resilient Communities"
                titleTypographyProps={{ align: 'center', fontWeight: 'bold' }}
                sx={{ bgcolor: 'primary.main', color: 'white' }}
              />
              <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', py: 4 }}>
                <Avatar sx={{ width: 80, height: 80, mb: 2, bgcolor: red[50], color: 'primary.main' }}>
                  <Typography variant="h6" fontWeight="bold">CRC</Typography>
                </Avatar>
                <Typography variant="h6" component="h3" gutterBottom>
                  Center for Resilient Communities
                </Typography>
                <Typography variant="body1" align="center" paragraph>
                  Advancing community resilience and sustainable development in West Virginia
                </Typography>
                <CardActions sx={{ mt: 'auto', width: '100%', display: 'flex', flexDirection: 'column', gap: 1 }}>
                  <Button 
                    variant="contained" 
                    color="primary" 
                    fullWidth
                    href="https://resilientcommunities.wvu.edu/"
                    target="_blank"
                    rel="noopener noreferrer"
                    endIcon={<OpenInNewIcon />}
                  >
                    Visit Website
                  </Button>
                  <Button 
                    variant="outlined" 
                    color="primary" 
                    fullWidth
                    onClick={() => handleOpenDialog('resilient')}
                    endIcon={<InfoIcon />}
                  >
                    Learn More
                  </Button>
                </CardActions>
              </CardContent>
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
              <DialogTitle id="crc-dialog-title" sx={{ bgcolor: 'primary.main', color: 'white' }}>
                About the WVU Center for Resilient Communities
              </DialogTitle>
              <DialogContent dividers>
                <DialogContentText component="div">
                  <Typography paragraph>
                    The Center for Resilient Communities (CRC) is dedicated to advancing community-engaged research and education programs that generate knowledge and empower individuals, with the goal of building more just, equitable, and vibrant communities in West Virginia, the greater Appalachian region, and beyond.
                  </Typography>
                  
                  <Typography paragraph>
                    Through long-term commitments and cooperative agreements, the CRC collaborates with students, scholars, and community partners, both locally and globally, to foster transformative change in our communities.
                  </Typography>
                  
                  <Typography variant="h6" gutterBottom sx={{ mt: 3, color: 'primary.main' }}>
                    Areas of Inquiry
                  </Typography>
                  
                  <Typography paragraph>
                    The CRC pursues work in three distinct "Areas of Inquiry." Collaborators unite to explore a particular problem, conduct research, and generate innovative analyses or potential solutions to advance projects. In this collaborative process community partners, scholars, and/or students actively engage in collective study, action, reflection, consultation, and long-term planning spanning many years, or even decades.
                  </Typography>
                  
                  <Box sx={{ mt: 3, mb: 2 }}>
                    <Paper elevation={0} sx={{ p: 2, mb: 2, bgcolor: red[50] }}>
                      <Typography variant="subtitle1" fontWeight="bold" color="primary.main" gutterBottom>
                        Community Economies and Sustainable Regional Development
                      </Typography>
                      <Typography variant="body2">
                        Advancing the role of social entrepreneurs, cooperative enterprises and community-oriented financing initiatives in building local wealth and promoting social and economic justice and sustainable development at regional, national, and global levels.
                      </Typography>
                    </Paper>
                    
                    <Paper elevation={0} sx={{ p: 2, mb: 2, bgcolor: red[50] }}>
                      <Typography variant="subtitle1" fontWeight="bold" color="primary.main" gutterBottom>
                        Environmental Justice, Climate Action and Community Well-being
                      </Typography>
                      <Typography variant="body2">
                        Advancing social action to address health disparities, environmental hazards, water quality and flood disasters related to past environmental degradation and ongoing climate impacts in WV and Appalachia.
                      </Typography>
                    </Paper>
                    
                    <Paper elevation={0} sx={{ p: 2, bgcolor: red[50] }}>
                      <Typography variant="subtitle1" fontWeight="bold" color="primary.main" gutterBottom>
                        Food System Transformation
                      </Typography>
                      <Typography variant="body2">
                        Advancing food system resilience at a local, regional, and even global scale by supporting economic cooperation and equitable development, agroecology practices and methods that mitigate climate change and promote food sovereignty.
                      </Typography>
                    </Paper>
                  </Box>
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={() => handleCloseDialog('resilient')} color="primary">
                  Close
                </Button>
                <Button 
                  href="https://resilientcommunities.wvu.edu/" 
                  target="_blank"
                  rel="noopener noreferrer"
                  color="primary" 
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
            <Card elevation={3} sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardHeader
                title="WVU Extension Family Nutrition Program"
                titleTypographyProps={{ align: 'center', fontWeight: 'bold' }}
                sx={{ bgcolor: 'secondary.main', color: 'white' }}
              />
              <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', py: 4 }}>
                <Avatar sx={{ width: 80, height: 80, mb: 2, bgcolor: blue[50], color: 'secondary.main' }}>
                  <Typography variant="h6" fontWeight="bold">FNP</Typography>
                </Avatar>
                <Typography variant="h6" component="h3" gutterBottom>
                  Family Nutrition Program
                </Typography>
                <Typography variant="body1" align="center" paragraph>
                  Empowering families with knowledge and resources for healthy food choices and improved nutrition
                </Typography>
                <CardActions sx={{ mt: 'auto', width: '100%', display: 'flex', flexDirection: 'column', gap: 1 }}>
                  <Button 
                    variant="contained" 
                    color="secondary" 
                    fullWidth
                    href="https://extension.wvu.edu/food-health/nutrition/fnp"
                    target="_blank"
                    rel="noopener noreferrer"
                    endIcon={<OpenInNewIcon />}
                  >
                    Visit Website
                  </Button>
                  <Button 
                    variant="outlined" 
                    color="secondary" 
                    fullWidth
                    onClick={() => handleOpenDialog('nutrition')}
                    endIcon={<InfoIcon />}
                  >
                    Learn More
                  </Button>
                </CardActions>
              </CardContent>
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
              <DialogTitle id="fnp-dialog-title" sx={{ bgcolor: 'secondary.main', color: 'white' }}>
                About the WVU Extension Family Nutrition Program
              </DialogTitle>
              <DialogContent dividers>
                <DialogContentText component="div">
                  <Typography variant="h6" gutterBottom sx={{ color: 'secondary.main' }}>
                    What is the WVU Extension Family Nutrition Program (FNP)?
                  </Typography>
                  
                  <Typography paragraph>
                    The Family Nutrition Program is comprised of numerous nutrition, food and physical activity projects designed to help limited resource families, youths, and adults improve their health. FNP targets risk factors associated with obesity, cardiovascular disease, diabetes, hypertension and other chronic diseases.
                  </Typography>
                  
                  <Typography paragraph>
                    FNP encourages the adoption of healthy lifestyle behaviors by:
                  </Typography>
                  
                  <List dense>
                    <ListItem>
                      <ListItemText primary="Teaching nutrition education using the USDA's MyPlate and Dietary Guidelines" />
                    </ListItem>
                    <ListItem>
                      <ListItemText primary="Providing food demonstrations" />
                    </ListItem>
                    <ListItem>
                      <ListItemText primary="Improving access and availability to local community resources" />
                    </ListItem>
                    <ListItem>
                      <ListItemText primary="Helping participants to stretch their food dollars, plan menus and read food labels" />
                    </ListItem>
                    <ListItem>
                      <ListItemText primary="Encouraging participants to devote more time to being physically active" />
                    </ListItem>
                  </List>
                  
                  <Divider sx={{ my: 3 }} />
                  
                  <Typography variant="h6" gutterBottom sx={{ color: 'secondary.main' }}>
                    Target Audiences
                  </Typography>
                  
                  <Typography paragraph>
                    FNP targets limited resource adults living at or below 185% of the federal poverty level and youths at schools, groups or summer camps where more than 50% of participants are eligible for the free/reduced lunch program.
                  </Typography>
                  
                  <Typography variant="h6" gutterBottom sx={{ mt: 3, color: 'secondary.main' }}>
                    Program Delivery
                  </Typography>
                  
                  <Typography paragraph>
                    The Family Nutrition Program is located in more than 40 counties with:
                  </Typography>
                  
                  <List dense>
                    <ListItem>
                      <ListItemText primary="Approximately 50 Nutrition Outreach Instructors and Health Educators" />
                    </ListItem>
                    <ListItem>
                      <ListItemText primary="50 County Extension Agents" />
                    </ListItem>
                    <ListItem>
                      <ListItemText primary="More than 2,000 skilled partners" />
                    </ListItem>
                  </List>
                  
                  <Typography paragraph>
                    Programs range from the direct delivery of nutrition information to social marketing campaigns.
                  </Typography>
                  
                  <Box sx={{ mt: 3, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                    <Chip label="Nutrition Education" color="secondary" variant="outlined" />
                    <Chip label="Food Demonstrations" color="secondary" variant="outlined" />
                    <Chip label="Health Resources" color="secondary" variant="outlined" />
                    <Chip label="Community Outreach" color="secondary" variant="outlined" />
                    <Chip label="Youth Programs" color="secondary" variant="outlined" />
                  </Box>
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={() => handleCloseDialog('nutrition')} color="secondary">
                  Close
                </Button>
                <Button 
                  href="https://extension.wvu.edu/food-health/nutrition/fnp" 
                  target="_blank"
                  rel="noopener noreferrer"
                  color="secondary" 
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