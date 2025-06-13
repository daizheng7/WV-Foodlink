import React from 'react';
import {
  Box,
  Typography,
  Paper,
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
  Tooltip,
  useTheme
} from '@mui/material';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import BarChartIcon from '@mui/icons-material/BarChart';

const MUIBudgetSection = () => {
  const theme = useTheme();
  
  // Data for comparison and visualization
  const wvStateBudget = 4900000000; // $4.9 billion annual state budget
  const wvArpaFunds = 1350000000; // $1.35 billion in ARPA funds for WV
  
  // Calculate percentages
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

  return (
    <Paper 
      elevation={3} 
      sx={{ 
        borderRadius: 2, 
        overflow: 'hidden',
        maxWidth: 1200,
        mx: 'auto',
        mb: 4
      }}
      component="section"
      role="region"
      aria-labelledby="budget-section-title"
    >
      {/* Hidden heading for screen readers */}
      <Typography 
        id="budget-section-title" 
        variant="h2" 
        sx={{ 
          position: 'absolute',
          left: '-10000px',
          width: '1px',
          height: '1px',
          overflow: 'hidden'
        }}
      >
        West Virginia Food Security Budget Proposal
      </Typography>

      {/* Content */}
      <Box sx={{ p: 3 }}>
        <Grid container spacing={4}>
          {/* Left Column - Budget Breakdown */}
          <Grid item xs={12} md={6}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <AttachMoneyIcon 
                sx={{ color: '#002855', mr: 1 }} 
                aria-hidden="true"
              />
              <Typography 
                variant="h6" 
                fontWeight="bold" 
                color="#000000"
                component="h3"
                id="proposed-budget-heading"
              >
                Proposed Budget
              </Typography>
            </Box>

            <TableContainer 
              component={Paper} 
              elevation={1} 
              sx={{ mb: 3 }}
              role="table"
              aria-labelledby="proposed-budget-heading"
            >
              <Table size="small">
                <TableHead sx={{ bgcolor: 'rgba(0,51,102,0.05)' }}>
                  <TableRow>
                    <TableCell 
                      sx={{ fontWeight: 'bold' }}
                      scope="col"
                    >
                      Component
                    </TableCell>
                    <TableCell 
                      align="right" 
                      sx={{ fontWeight: 'bold' }}
                      scope="col"
                    >
                      Amount
                    </TableCell>
                    <TableCell 
                      align="right" 
                      sx={{ fontWeight: 'bold' }}
                      scope="col"
                    >
                      Timeframe
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell scope="row">Office Administration</TableCell>
                    <TableCell align="right">$1,000,000</TableCell>
                    <TableCell align="right">Yearly</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell scope="row">
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        Field Staff
                        <Tooltip 
                          title="55 county-level coordinators at $40,000 plus benefits" 
                          arrow
                          enterDelay={500}
                          leaveDelay={200}
                        >
                          <PeopleAltIcon 
                            sx={{ ml: 1, color: 'text.secondary', fontSize: '0.875rem' }} 
                            aria-label="Additional information about field staff"
                            tabIndex={0}
                            role="button"
                          />
                        </Tooltip>
                      </Box>
                    </TableCell>
                    <TableCell align="right">$3,500,000</TableCell>
                    <TableCell align="right">Yearly</TableCell>
                  </TableRow>
                  <TableRow sx={{ bgcolor: 'rgba(0,51,102,0.05)' }}>
                    <TableCell 
                      sx={{ fontWeight: 'bold' }}
                      scope="row"
                    >
                      Yearly Operational Total
                    </TableCell>
                    <TableCell align="right" sx={{ fontWeight: 'bold' }}>$4,500,000</TableCell>
                    <TableCell align="right">Annual</TableCell>
                  </TableRow>
                  <TableRow sx={{ bgcolor: 'rgba(0,136,0,0.05)' }}>
                    <TableCell 
                      sx={{ fontWeight: 'bold' }}
                      scope="row"
                    >
                      ARPA Investment Grants
                    </TableCell>
                    <TableCell align="right" sx={{ fontWeight: 'bold' }}>$60,000,000</TableCell>
                    <TableCell align="right">3 Years</TableCell>
                  </TableRow>
                  <TableRow sx={{ bgcolor: 'rgba(0,0,0,0.05)' }}>
                    <TableCell 
                      sx={{ fontWeight: 'bold' }}
                      scope="row"
                    >
                      Total Investment
                    </TableCell>
                    <TableCell align="right" sx={{ fontWeight: 'bold' }}>$73,500,000</TableCell>
                    <TableCell align="right">3 Years</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>

            {/* Budget Context */}
            <Box 
              sx={{ mb: 3 }}
              role="region"
              aria-labelledby="budget-context-heading"
            >
              <Typography 
                variant="subtitle2" 
                gutterBottom 
                sx={{ fontWeight: 'bold', color: '#000000' }}
                component="h4"
                id="budget-context-heading"
              >
                Percentage of West Virginia's Budget
              </Typography>
              
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Box sx={{ flexGrow: 1, mr: 2 }}>
                  <Typography 
                    variant="caption" 
                    sx={{ display: 'block', mb: 0.5 }}
                    id="yearly-ops-label"
                  >
                    Yearly Operations: {yearlyOperationalPercentOfStateBudget.toFixed(2)}% of WV's ${(wvStateBudget/1000000000).toFixed(1)} billion annual budget
                  </Typography>
                  <LinearProgress 
                    variant="determinate" 
                    value={yearlyOperationalPercentOfStateBudget} 
                    sx={{ 
                      height: 8, 
                      borderRadius: 4,
                      bgcolor: 'rgba(0,0,0,0.05)',
                      '& .MuiLinearProgress-bar': {
                        backgroundColor: '#002855'
                      }
                    }}
                    aria-labelledby="yearly-ops-label"
                    aria-valuenow={yearlyOperationalPercentOfStateBudget}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-valuetext={`${yearlyOperationalPercentOfStateBudget.toFixed(2)} percent`}
                    role="progressbar"
                  />
                </Box>
                <Typography 
                  variant="caption" 
                  sx={{ minWidth: '40px', textAlign: 'right' }}
                  aria-hidden="true"
                >
                  {yearlyOperationalPercentOfStateBudget.toFixed(2)}%
                </Typography>
              </Box>
              
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box sx={{ flexGrow: 1, mr: 2 }}>
                  <Typography 
                    variant="caption" 
                    sx={{ display: 'block', mb: 0.5 }}
                    id="arpa-investment-label"
                  >
                    ARPA Investment: {arpaPercentOfTotal.toFixed(2)}% of WV's ${(wvArpaFunds/1000000000).toFixed(2)} billion ARPA funds
                  </Typography>
                  <LinearProgress 
                    variant="determinate" 
                    value={arpaPercentOfTotal} 
                    sx={{ 
                      height: 8, 
                      borderRadius: 4,
                      bgcolor: 'rgba(0,0,0,0.05)',
                      '& .MuiLinearProgress-bar': {
                        backgroundColor: '#008800'
                      }
                    }}
                    aria-labelledby="arpa-investment-label"
                    aria-valuenow={arpaPercentOfTotal}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-valuetext={`${arpaPercentOfTotal.toFixed(2)} percent`}
                    role="progressbar"
                  />
                </Box>
                <Typography 
                  variant="caption" 
                  sx={{ minWidth: '40px', textAlign: 'right' }}
                  aria-hidden="true"
                >
                  {arpaPercentOfTotal.toFixed(2)}%
                </Typography>
              </Box>
            </Box>
          </Grid>

          {/* Right Column - Impact */}
          <Grid item xs={12} md={6}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <TrendingUpIcon 
                sx={{ color: '#002855', mr: 1 }} 
                aria-hidden="true"
              />
              <Typography 
                variant="h6" 
                fontWeight="bold" 
                color="#000000"
                component="h3"
                id="strategic-impact-heading"
              >
                Strategic Impact
              </Typography>
            </Box>

            <Card 
              variant="outlined" 
              sx={{ 
                mb: 3, 
                bgcolor: 'rgba(0,51,102,0.03)',
                border: '1px solid rgba(0,51,102,0.1)',
                borderRadius: 2
              }}
              role="region"
              aria-labelledby="arpa-funding-purpose"
              tabIndex={0}
            >
              <CardContent>
                <Typography 
                  variant="subtitle2" 
                  gutterBottom 
                  sx={{ fontWeight: 'bold', color: '#000000' }}
                  component="h4"
                  id="arpa-funding-purpose"
                >
                  ARPA Funding Purpose
                </Typography>
                <Typography variant="body2" paragraph>
                  American Rescue Plan funds must invest in initiatives that promote a <strong>strong and equitable recovery</strong> from the COVID-19 pandemic while directly addressing the severe impacts, including food insecurity, among low-income communities.
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                  The proposed allocation represents only <strong>{arpaPercentOfTotal.toFixed(1)}%</strong> of West Virginia's total ARPA funds, yet would create a comprehensive statewide food security system.
                </Typography>
              </CardContent>
            </Card>

            <Typography 
              variant="subtitle2" 
              gutterBottom 
              sx={{ fontWeight: 'bold', color: '#000000' }}
              component="h4"
              id="grant-priorities-heading"
            >
              Grant Priorities
            </Typography>
            
            <Box 
              sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 3 }}
              role="list"
              aria-labelledby="grant-priorities-heading"
            >
              {grantPriorities.map((priority, index) => (
                <Chip 
                  key={priority}
                  label={priority}
                  sx={{ 
                    bgcolor: 'rgba(0,51,102,0.08)',
                    color: '#000000',
                    fontWeight: 500,
                    '&:hover': {
                      bgcolor: 'rgba(0,51,102,0.12)',
                    },
                    '&:focus': {
                      bgcolor: 'rgba(0,51,102,0.12)',
                      outline: '2px solid #002855',
                      outlineOffset: '2px',
                    }
                  }}
                  tabIndex={0}
                  role="listitem"
                  aria-describedby={`priority-${index}-desc`}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      // Could add click handler here if needed
                    }
                  }}
                />
              ))}
            </Box>

            <Divider 
              sx={{ my: 2 }} 
              role="separator"
              aria-hidden="true"
            />
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
};

export default MUIBudgetSection;