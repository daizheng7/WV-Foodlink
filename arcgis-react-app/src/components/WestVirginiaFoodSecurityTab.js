import React, { useState } from 'react';
import {
  Box,
  Tabs,
  Tab,
  Paper,
  AppBar,
  useTheme,
  useMediaQuery,
  Container,
  Button
} from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import DescriptionIcon from '@mui/icons-material/Description';
import { keyframes } from '@mui/system';

// Import your components
import FoodSecuritySummary from './FoodSecuritySummary';
import MUIBudgetSection from './MUIBudgetSection';
import AnimatedUrgentTitle from './AnimatedUrgentTitle';



// TabPanel component to handle tab content
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`foodsecurity-tabpanel-${index}`}
      aria-labelledby={`foodsecurity-tab-${index}`}
      {...other}
      style={{ width: '100%' }}
    >
      {value === index && (
        <Box sx={{ p: 0 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

// Tab accessibility props
function a11yProps(index) {
  return {
    id: `foodsecurity-tab-${index}`,
    'aria-controls': `foodsecurity-tabpanel-${index}`,
  };
}

const WestVirginiaFoodSecurityTabs = () => {
  const [tabValue, setTabValue] = useState(0);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <Box sx={{ width: '100%', maxWidth: 'xl', mx: 'auto' }}>
     


      {/* Tabbed content */}
      <Paper 
        elevation={3}
        sx={{ 
          width: '100%', 
          mb: 4,
          borderRadius: 2,
          overflow: 'hidden'
        }}
      >
        <AppBar position="static" sx={{ bgcolor: '#002855' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs 
              value={tabValue} 
              onChange={handleTabChange} 
              aria-label="Food Security Initiative Tabs"
              variant={isMobile ? "fullWidth" : "standard"}
              centered={!isMobile}
              sx={{ 
                '& .MuiTab-root': {
                  color: 'rgba(255, 255, 255, 0.7)',
                  fontWeight: 500,
                  fontSize: '0.95rem',
                  textTransform: 'none',
                  '&.Mui-selected': {
                    color: 'white',
                    fontWeight: 600
                  }
                },
                '& .MuiTabs-indicator': {
                  backgroundColor: '#FFB81C',
                  height: 3
                }
              }}
            >
              <Tab 
                icon={<InfoIcon />} 
                iconPosition="start" 
                label="Overview" 
                {...a11yProps(0)} 
              />
              <Tab 
                icon={<AttachMoneyIcon />} 
                iconPosition="start" 
                label="Budget Proposal" 
                {...a11yProps(1)} 
              />
            </Tabs>
          </Box>
        </AppBar>

        <TabPanel value={tabValue} index={0}>
          <FoodSecuritySummary />
        </TabPanel>

        <TabPanel value={tabValue} index={1}>
          <MUIBudgetSection />
        </TabPanel>
      </Paper>
      
      {/* Improved button at the bottom of the tabs */}
      <Box 
        sx={{ 
          display: 'flex', 
          justifyContent: 'center',
          width: '100%',
          mt: 4,
          mb: 5,
          px: 2,
        }}
      >
        <Button
          variant="contained"
          href="https://westvirginiauniversity-my.sharepoint.com/:b:/g/personal/jlohnes_mail_wvu_edu/EZFZYTYKi7BMoKriEEJdFLgBoUCVXh44eYkt58poE5H8iQ?e=HPln6v"
          target="_blank"
          rel="noopener noreferrer"
          startIcon={<DescriptionIcon />}
          size="large"
          disableElevation
          sx={{
            bgcolor: '#002855',
            color: 'white',
            fontWeight: 600,
            px: { xs: 4, sm: 5 },
            py: { xs: 1.5, sm: 2 },
            fontSize: { xs: '1rem', sm: '1.1rem' },
            borderRadius: 2,
            textTransform: 'none',
            boxShadow: '0 2px 4px rgba(0,0,0,0.2), 0 1px 3px rgba(0,0,0,0.3)',
            position: 'relative',
            overflow: 'hidden',
            '&::after': {
              content: '""',
              position: 'absolute',
              bottom: 0,
              left: 0,
              width: '100%',
              height: '2px',
              backgroundColor: '#FFB81C',
              transform: 'scaleX(0)',
              transformOrigin: 'bottom right',
              transition: 'transform 0.3s',
            },
            '&:hover': {
              bgcolor: '#a50000',
              '&::after': {
                transform: 'scaleX(1)',
                transformOrigin: 'bottom left',
              }
            },
            transition: 'background-color 0.3s',
            width: { xs: '100%', sm: 'auto' },
            maxWidth: { xs: '100%', sm: '320px' },
            
          }}
        >
          Read Our Full Proposal
        </Button>
      </Box>
    </Box>
  );
};

export default WestVirginiaFoodSecurityTabs;