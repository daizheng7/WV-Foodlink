import React from 'react';
import { Card, CardContent, CardActionArea, Typography, Tooltip } from '@mui/material';
import { AccessAlarm, Info, Restaurant, LocalMall, Agriculture, Home, AccountBalance, Public, LocalDining, Lightbulb, Diversity3, LightbulbCircle, ZoomIn, CreditCard, School, Storefront, AgricultureOutlined, NaturePeople } from '@mui/icons-material';

const categories = [
  {
    title: 'SNAP + WIC',
    icon: <CreditCard sx={{ fontSize: 160, color: '#002855' }} />, // wvu-blue
    description: 'Enrollment in Cash-Equivalent Public Nutrition Assistance Programs.',
    url: 'https://www.arcgis.com/apps/dashboards/f44ec87fbabf4697959012640dc2d29f',
  },
  {
    title: 'SNAP-ED',
    icon: <School sx={{ fontSize: 160, color: '#0062A3' }} />, // wvu-accent--blue
    description: 'Food Policy, Systems and Environmental Change interventions for Healthy Food Access Programming.',
    url: 'https://wvu.maps.arcgis.com/apps/dashboards/a2bc19f10d9647c39992283e9ec4d851',
  },
  {
    title: 'Congregate Meals',
    icon: <Restaurant sx={{ fontSize: 160, color: '#FFE539' }} />, // wvu-accent--yellow
    description: 'Public Meal programs in Schools, Daycares and Senior Centers.',
    url: 'https://wvu.maps.arcgis.com/apps/instant/portfolio/index.html?appid=b442bf3a130248938d3f4323840fe50e',
  },
  {
    title: 'Charitable Food',
    icon: <LocalMall sx={{ fontSize: 160, color: '#F58672' }} />, // wvu-accent--sunset
    description: 'Details food pantries, soup kitchens, and school backpack programs.',
    url: 'https://wvu.maps.arcgis.com/apps/dashboards/783922e1a38646bda92e8ddfbb37961b',
  },
  {
    title: 'Farmers Markets',
    icon: <Storefront sx={{ fontSize: 160, color: '#002855' }} />, // wvu-blue
    description: 'Information on local farmer-to-consumer markets and nutrition incentives.',
    url: 'https://www.arcgis.com/apps/dashboards/5095c3fd9b0c4934be43bc8f65c93b36',
  },
  {
    title: 'Agricultural Data',
    icon: <Agriculture sx={{ fontSize: 160, color: '#7F6310' }} />, // wvu-accent--old-gold
    description: 'Insights into farming practices, land use, and expenditures.',
    url: 'https://www.arcgis.com/apps/dashboards/2100f46c379b49ba8d5d4184c68d0ab0',
  },
  {
    title: 'Self-Provisioning',
    icon: <NaturePeople sx={{ fontSize: 160, color: '#9DDAE6' }} />, // wvu-accent--blue-light
    description: 'Gardening and hunting data related to food self-sufficiency.',
    url: 'https://www.arcgis.com/apps/dashboards/60c2dc75756c485f9d135d14826464f4',
  },
  {
    title: 'Political Participation',
    icon: <AccountBalance sx={{ fontSize: 160, color: '#1C2B39' }} />, // wvu-accent--blue-dark
    description: 'Voter registration and engagement.',
    url: 'https://www.arcgis.com/apps/dashboards/28258179da3a4fd0b1dcd0a053d402ec',
  },
  {
    title: 'County Summary',
    icon: <Public sx={{ fontSize: 160, color: '#002855' }} />, // wvu-blue
    description: 'Data related to county-level food landscape.',
    url: '/county',
  },
  
];


const WestVirginiaFoodLandscape = () => {
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '10px',
            justifyContent: 'center',
          }}
        >
          {categories.map((category) => (
            <Card
              key={category.title}
              sx={{
                borderRadius: 3,
                boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.15)',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                '&:hover': {
                  transform: 'scale(1.08)',
                  boxShadow: '0px 14px 40px rgba(0, 0, 0, 0.3)',
                },
              }}
            >
              <CardActionArea
                sx={{ display: 'flex', flexDirection: 'column', padding: '20px' }}
                onClick={() => window.open(category.url, '_blank')}
              >
                <Tooltip title={category.description} placement="top">
                  <div style={{ transition: 'transform 0.3s ease', fontSize: '200px' }}>
                    {category.icon}
                  </div>
                </Tooltip>
                <Typography
                  variant='h4'
                  component="div"
                  className="iowan-old-style-black-italic mt-3"
                  sx={{ fontWeight: 'bold', textAlign: 'center', marginTop: '10px' }}
                >
                  {category.title}
                </Typography>
              </CardActionArea>
            </Card>
          ))}
        </div>
      </div>
    );
  };
  
  export default WestVirginiaFoodLandscape;