import React, { useState } from 'react';
import {
  Box,
  Tabs,
  Tab,
  Paper,
  AppBar,
  useTheme,
  useMediaQuery,
  Container
} from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

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
    <Box sx={{ width: '100%', maxWidth: 1200, mx: 'auto' }}>
      {/* Animated urgent title - same width as tab content */}
      <AnimatedUrgentTitle />

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
        <AppBar position="static" sx={{ bgcolor: '#003366' }}>
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
    </Box>
  );
};

export default WestVirginiaFoodSecurityTabs;