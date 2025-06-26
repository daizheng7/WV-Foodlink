import React from 'react';
import {
  Box,
  Card,
  CardContent,
  CardActionArea,
  Typography,
  Tooltip,
  useMediaQuery,
  useTheme
} from '@mui/material';
import {
  CreditCard,
  School,
  Restaurant,
  LocalMall,
  Storefront,
  Agriculture,
  NaturePeople,
  AccountBalance,
  Public
} from '@mui/icons-material';

const categories = [
  {
    title: 'SNAP + WIC',
    icon: CreditCard,
    color: '#002855',
    description: 'Enrollment in Cash-Equivalent Public Nutrition Assistance Programs.',
    url: 'https://www.arcgis.com/apps/dashboards/f44ec87fbabf4697959012640dc2d29f',
  },
  {
    title: 'SNAP-ED',
    icon: School,
    color: '#0062A3',
    description: 'Food Policy, Systems and Environmental Change interventions for Healthy Food Access Programming.',
    url: 'https://wvu.maps.arcgis.com/apps/instant/portfolio/index.html?appid=59e0598fe7404e4f91874f1d344b6c1c',
  },
  {
    title: 'Congregate Meals',
    icon: Restaurant,
    color: '#FFE539',
    description: 'Public Meal programs in Schools, Daycares and Senior Centers.',
    url: 'https://wvu.maps.arcgis.com/apps/instant/portfolio/index.html?appid=b442bf3a130248938d3f4323840fe50e',
  },
  {
    title: 'Charitable Food',
    icon: LocalMall,
    color: '#F58672',
    description: 'Details food pantries, soup kitchens, and school backpack programs.',
    url: 'https://wvu.maps.arcgis.com/apps/dashboards/783922e1a38646bda92e8ddfbb37961b',
  },
  {
    title: 'Farmers Markets',
    icon: Storefront,
    color: '#002855',
    description: 'Information on local farmer-to-consumer markets and nutrition incentives.',
    url: 'https://www.arcgis.com/apps/dashboards/5095c3fd9b0c4934be43bc8f65c93b36',
  },
  {
    title: 'Agricultural Data',
    icon: Agriculture,
    color: '#7F6310',
    description: 'Insights into farming practices, land use, and expenditures.',
    url: 'https://www.arcgis.com/apps/dashboards/2100f46c379b49ba8d5d4184c68d0ab0',
  },
  {
    title: 'Self-Provisioning',
    icon: NaturePeople,
    color: '#9DDAE6',
    description: 'Gardening and hunting data related to food self-sufficiency.',
    url: 'https://www.arcgis.com/apps/dashboards/60c2dc75756c485f9d135d14826464f4',
  },
  {
    title: 'Political Participation',
    icon: AccountBalance,
    color: '#1C2B39',
    description: 'Voter registration and engagement.',
    url: 'https://www.arcgis.com/apps/dashboards/28258179da3a4fd0b1dcd0a053d402ec',
  },
  {
    title: 'County Summary',
    icon: Public,
    color: '#002855',
    description: 'Data related to county-level food landscape.',
    url: '/county',
  },
];

const WestVirginiaFoodLandscape = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box sx={{ p: 3 }} role="region" aria-label="West Virginia Food Landscape Categories">
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: 3,
        }}
      >
        {categories.map(({ title, icon: Icon, color, description, url }) => (
          <Card
            key={title}
            component="article"
            sx={{
              flex: '1 1 240px',
              maxWidth: 320,
              borderRadius: 3,
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              '&:hover': {
                transform: 'scale(1.05)',
                boxShadow: '0px 14px 40px rgba(0, 0, 0, 0.3)',
              },
            }}
          >
            <CardActionArea
              onClick={() => window.open(url, '_blank')}
              sx={{ display: 'flex', flexDirection: 'column', p: { xs: 2, sm: 3 } }}
              aria-label={`${title}: ${description}`}
            >
              <Tooltip title={description} arrow>
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <Icon sx={{ fontSize: { xs: 80, sm: 120, md: 160 }, color }} />
                </Box>
              </Tooltip>

              <CardContent sx={{ textAlign: 'center' }}>
                <Typography
                  variant="h6"
                  component="h3"
                  sx={{
                    fontWeight: 'bold',
                    fontSize: { xs: '1.1rem', sm: '1.3rem', md: '1.5rem' },
                  }}
                >
                  {title}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default WestVirginiaFoodLandscape;
