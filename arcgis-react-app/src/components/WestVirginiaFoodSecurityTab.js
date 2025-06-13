import React, { useState } from 'react';
import {
  Box,
  Button,
  Paper,
  useTheme,
  useMediaQuery,
  Typography,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  LinearProgress,
  Chip,
  Card,
  CardContent,
  Divider,
  Tooltip
} from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import DescriptionIcon from '@mui/icons-material/Description';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import { Link as RouterLink } from 'react-router-dom';

// Import your components
import FoodSecuritySummary from './FoodSecuritySummary';

const WestVirginiaFoodSecurityTabs = () => {
  const [activeView, setActiveView] = useState(0);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  // Budget data
  const wvStateBudget = 4900000000;
  const wvArpaFunds = 1350000000;
  const yearlyOperationalPercentOfStateBudget = ((1000000 + 3500000) / wvStateBudget) * 100;
  const arpaPercentOfTotal = (60000000 / wvArpaFunds) * 100;
  
  const grantPriorities = [
    'SNAP Stretch', 
    'Community-Owned Grocers', 
    'K-12 Nutrition', 
    'Produce Prescriptions', 
    'Emergency Food Networks', 
    'Community Food Hubs'
  ];

  // Budget Section Component (inline)
  const BudgetSection = () => (
    <Box sx={{ p: 4 }}>
      <Grid container spacing={4}>
        {/* Left Column - Budget Breakdown */}
        <Grid item xs={12} md={6}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            <AttachMoneyIcon 
              sx={{ color: '#002855', mr: 1, fontSize: '1.5rem' }} 
              aria-hidden="true"
            />
            <Typography 
              variant="h5" 
              fontWeight="bold" 
              component="h3"
              id="proposed-budget-heading"
              sx={{ color: '#002855' }}
            >
              Proposed Budget
            </Typography>
          </Box>

          <TableContainer 
            component={Paper} 
            elevation={2} 
            sx={{ 
              mb: 4,
              borderRadius: 2,
              border: '1px solid rgba(0,40,85,0.1)'
            }}
            aria-labelledby="proposed-budget-heading"
          >
            <Table size="small">
              <TableHead sx={{ bgcolor: '#002855' }}>
                <TableRow>
                  <TableCell sx={{ fontWeight: 'bold', color: 'white' }} scope="col">
                    Component
                  </TableCell>
                  <TableCell align="right" sx={{ fontWeight: 'bold', color: 'white' }} scope="col">
                    Amount
                  </TableCell>
                  <TableCell align="right" sx={{ fontWeight: 'bold', color: 'white' }} scope="col">
                    Timeframe
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow sx={{ '&:hover': { bgcolor: 'rgba(0,40,85,0.02)' } }}>
                  <TableCell scope="row" sx={{ fontWeight: 500 }}>Office Administration</TableCell>
                  <TableCell align="right" sx={{ fontWeight: 600, color: '#002855' }}>$1,000,000</TableCell>
                  <TableCell align="right">Yearly</TableCell>
                </TableRow>
                <TableRow sx={{ '&:hover': { bgcolor: 'rgba(0,40,85,0.02)' } }}>
                  <TableCell scope="row">
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <span style={{ fontWeight: 500 }}>55 county-level coordinators at $40,000 plus benefits</span>
                      
                    </Box>
                  </TableCell>
                  <TableCell align="right" sx={{ fontWeight: 600, color: '#002855' }}>$3,500,000</TableCell>
                  <TableCell align="right">Yearly</TableCell>
                </TableRow>
                <TableRow sx={{ bgcolor: 'rgba(0,40,85,0.08)', '&:hover': { bgcolor: 'rgba(0,40,85,0.12)' } }}>
                  <TableCell sx={{ fontWeight: 'bold' }} scope="row">
                    Yearly Operational Total
                  </TableCell>
                  <TableCell align="right" sx={{ fontWeight: 'bold', fontSize: '1.1rem', color: '#002855' }}>$4,500,000</TableCell>
                  <TableCell align="right" sx={{ fontWeight: 'bold' }}>Annual</TableCell>
                </TableRow>
                <TableRow sx={{ bgcolor: 'rgba(0,136,0,0.08)', '&:hover': { bgcolor: 'rgba(0,136,0,0.12)' } }}>
                  <TableCell sx={{ fontWeight: 'bold' }} scope="row">
                    ARPA Investment Grants
                  </TableCell>
                  <TableCell align="right" sx={{ fontWeight: 'bold', fontSize: '1.1rem', color: '#002855' }}>$60,000,000</TableCell>
                  <TableCell align="right" sx={{ fontWeight: 'bold' }}>3 Years</TableCell>
                </TableRow>
                <TableRow sx={{ bgcolor: 'rgba(255,184,28,0.15)', '&:hover': { bgcolor: 'rgba(255,184,28,0.25)' } }}>
                  <TableCell sx={{ fontWeight: 'bold', fontSize: '1.05rem' }} scope="row">
                    Total Investment
                  </TableCell>
                  <TableCell align="right" sx={{ fontWeight: 'bold', fontSize: '1.2rem', color: '#002855' }}>$73,500,000</TableCell>
                  <TableCell align="right" sx={{ fontWeight: 'bold' }}>3 Years</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>

          {/* Budget Context */}
          <Box sx={{ mb: 3 }}>
            <Typography 
              variant="h6" 
              gutterBottom 
              sx={{ fontWeight: 'bold', color: '#002855', mb: 3 }}
              component="h4"
            >
              Percentage of West Virginia's Budget
            </Typography>
            
            <Box sx={{ mb: 3, p: 2, bgcolor: 'rgba(0,40,85,0.03)', borderRadius: 2, border: '1px solid rgba(0,40,85,0.1)' }}>
              <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
                Yearly Operations: {yearlyOperationalPercentOfStateBudget.toFixed(2)}% of WV's ${(wvStateBudget/1000000000).toFixed(1)} billion annual budget
              </Typography>
              <LinearProgress 
                variant="determinate" 
                value={yearlyOperationalPercentOfStateBudget} 
                sx={{ 
                  height: 12, 
                  borderRadius: 6,
                  bgcolor: 'rgba(0,0,0,0.1)',
                  '& .MuiLinearProgress-bar': {
                    backgroundColor: '#002855',
                    borderRadius: 6
                  }
                }}
                aria-valuetext={`${yearlyOperationalPercentOfStateBudget.toFixed(2)} percent`}
              />
              <Typography variant="caption" sx={{ display: 'block', textAlign: 'right', mt: 0.5, fontWeight: 600 }}>
                {yearlyOperationalPercentOfStateBudget.toFixed(2)}%
              </Typography>
            </Box>
            
            <Box sx={{ p: 2, bgcolor: 'rgba(0,136,0,0.05)', borderRadius: 2, border: '1px solid rgba(0,136,0,0.2)' }}>
              <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
                ARPA Investment: {arpaPercentOfTotal.toFixed(2)}% of WV's ${(wvArpaFunds/1000000000).toFixed(2)} billion ARPA funds
              </Typography>
              <LinearProgress 
                variant="determinate" 
                value={arpaPercentOfTotal} 
                sx={{ 
                  height: 12, 
                  borderRadius: 6,
                  bgcolor: 'rgba(0,0,0,0.1)',
                  '& .MuiLinearProgress-bar': {
                    backgroundColor: '#008800',
                    borderRadius: 6
                  }
                }}
                aria-valuetext={`${arpaPercentOfTotal.toFixed(2)} percent`}
              />
              <Typography variant="caption" sx={{ display: 'block', textAlign: 'right', mt: 0.5, fontWeight: 600 }}>
                {arpaPercentOfTotal.toFixed(2)}%
              </Typography>
            </Box>
          </Box>
        </Grid>

        {/* Right Column - Impact */}
        <Grid item xs={12} md={6}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            <TrendingUpIcon sx={{ color: '#002855', mr: 1, fontSize: '1.5rem' }} aria-hidden="true" />
            <Typography variant="h5" fontWeight="bold" component="h3" sx={{ color: '#002855' }}>
              Strategic Impact
            </Typography>
          </Box>

          <Card 
            variant="outlined" 
            sx={{ 
              mb: 4, 
              bgcolor: 'rgba(0,40,85,0.02)',
              border: '2px solid rgba(0,40,85,0.1)',
              borderRadius: 3,
              transition: 'all 0.3s ease',
              '&:hover': {
                bgcolor: 'rgba(0,40,85,0.04)',
                borderColor: 'rgba(0,40,85,0.2)',
                transform: 'translateY(-2px)',
                boxShadow: '0 4px 12px rgba(0,40,85,0.15)'
              }
            }}
            tabIndex={0}
          >
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', color: '#002855' }} component="h4">
                ARPA Funding Purpose
              </Typography>
              <Typography variant="body2" paragraph sx={{ lineHeight: 1.6 }}>
                American Rescue Plan funds must invest in initiatives that promote a <strong>strong and equitable recovery</strong> from the COVID-19 pandemic while directly addressing the severe impacts, including food insecurity, among low-income communities.
              </Typography>
              <Typography variant="body2" sx={{ fontWeight: 500, fontSize: '0.95rem' }}>
                The proposed allocation represents only <strong style={{ color: '#002855', fontSize: '1.1rem' }}>{arpaPercentOfTotal.toFixed(1)}%</strong> of West Virginia's total ARPA funds, yet would create a comprehensive statewide food security system.
              </Typography>
            </CardContent>
          </Card>

          <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', color: '#002855', mb: 2 }} component="h4">
            Grant Priorities
          </Typography>
          
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5, mb: 3 }}>
            {grantPriorities.map((priority) => (
              <Chip 
                key={priority}
                label={priority}
                sx={{ 
                  bgcolor: 'rgba(0,40,85,0.08)',
                  color: '#002855',
                  fontWeight: 600,
                  fontSize: '0.85rem',
                  height: '36px',
                  transition: 'all 0.3s ease',
                  border: '1px solid rgba(0,40,85,0.2)',
                  '&:hover': {
                    bgcolor: '#FFB81C',
                    color: '#002855',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 2px 8px rgba(255,184,28,0.3)'
                  },
                  '&:focus': {
                    bgcolor: '#FFB81C',
                    color: '#002855',
                    outline: '2px solid #002855',
                    outlineOffset: '2px',
                  }
                }}
                tabIndex={0}
              />
            ))}
          </Box>

          <Divider sx={{ my: 3, borderColor: 'rgba(0,40,85,0.2)' }} />
          
          <Typography variant="body2" sx={{ fontStyle: 'italic', color: 'rgba(0,40,85,0.7)', textAlign: 'center' }}>
            This comprehensive approach addresses food security at every level of West Virginia's communities.
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );

  return (
    <Box sx={{ width: '100%', maxWidth: 'xl', mx: 'auto' }}>
      <Paper 
        elevation={4}
        sx={{ 
          width: '100%', 
          mb: 4,
          borderRadius: 3,
          overflow: 'hidden',
          border: '1px solid rgba(0,40,85,0.1)'
        }}
      >
        {/* Tab-style Navigation */}
        <Box
  sx={{
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    borderBottom: '1px solid #ccc',
    bgcolor: 'white',
  }}
>
  <Button 
    onClick={() => setActiveView(0)}
    startIcon={<InfoIcon />}
    disableRipple
    variant="text"
    sx={{
      flex: 1,
      maxWidth: 300,
      py: 2,
      px: 3,
      bgcolor: 'white',
      color: '#002855',
      fontWeight: 600,
      fontSize: '1rem',
      textTransform: 'none',
      borderRadius: 0,
      borderBottom: activeView === 0 ? '4px solid #002855' : '4px solid transparent',
      '&:focus-visible': {
        outline: '2px solid #FFB81C',
        outlineOffset: '2px',
      },
    }}
  >
    Overview
  </Button>

  <Button
    onClick={() => setActiveView(1)}
    startIcon={<AttachMoneyIcon />}
    disableRipple
    variant="text"
    sx={{
      flex: 1,
      maxWidth: 300,
      py: 2,
      px: 3,
      bgcolor: 'white',
      color: '#002855',
      fontWeight: 600,
      fontSize: '1rem',
      textTransform: 'none',
      borderRadius: 0,
      borderBottom: activeView === 1 ? '4px solid #002855' : '4px solid transparent',
      '&:focus-visible': {
        outline: '2px solid #FFB81C',
        outlineOffset: '2px',
      },
    }}
  >
    Budget Proposal
  </Button>
</Box>


        {/* Hidden descriptions for screen readers */}
        <div id="overview-desc" style={{ display: 'none' }}>
          Overview of West Virginia Food Security Initiative
        </div>
        <div id="budget-desc" style={{ display: 'none' }}>
          Detailed budget proposal and financial breakdown
        </div>

        {/* Content Areas */}
        <Box
          role="main"
          aria-live="polite"
          aria-label={activeView === 0 ? "Overview Content" : "Budget Proposal Content"}
          sx={{ bgcolor: 'white', minHeight: '500px' }}
        >
          {activeView === 0 && (
            <Box sx={{ p: 4 }}>
              <FoodSecuritySummary />
            </Box>
          )}

          {activeView === 1 && (
            <Box>
              <BudgetSection />
            </Box>
          )}
        </Box>
        <Box 
        sx={{ 
          display: 'flex', 
          justifyContent: 'center',
          mt: 4,
       
        }}
      >
        <Button
          variant="contained"
          component={RouterLink}
          to="/proposal"
          target="_blank"
          rel="noopener noreferrer"
          startIcon={<DescriptionIcon />}
          size="large"
          sx={{
            bgcolor: '#002855',
            color: 'white',
            fontWeight: 700,
            px: 6,
            py: 2.5,
            fontSize: '1.1rem',
            borderRadius: 3,
            textTransform: 'none',
            boxShadow: '0 4px 12px rgba(0,40,85,0.3)',
            transition: 'all 0.3s ease',
            '&:hover': {
              bgcolor: '#003366',
              color: 'white',
              transform: 'translateY(-2px)',
              boxShadow: '0 6px 20px rgba(0,40,85,0.4)'
            },
            '&:focus': {
              outline: '3px solid #FFB81C',
              outlineOffset: '3px'
            }
          }}
        >
          Read Our Full Proposal
        </Button>
      </Box>
      </Paper>
      
    </Box>
  );
};

export default WestVirginiaFoodSecurityTabs;