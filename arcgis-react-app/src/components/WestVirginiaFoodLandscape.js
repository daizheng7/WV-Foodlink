import React from 'react';
import { Card, CardContent, CardActionArea, Typography, Tooltip } from '@mui/material';
import { AccessAlarm, Info, Restaurant, LocalMall, Agriculture, Home, AccountBalance, Public, LocalDining, Lightbulb, Diversity3, LightbulbCircle, ZoomIn } from '@mui/icons-material';

const categories = [
  { title: 'SNAP + WIC', icon: <AccessAlarm sx={{ fontSize: 160, color: '#354F5B' }} />, description: 'Covers nutrition assistance programs supporting food access.', url: 'https://www.arcgis.com/apps/dashboards/5095c3fd9b0c4934be43bc8f65c93b36' },
  { title: 'SNAP-ED', icon: <Info sx={{ fontSize: 160, color: '#39897E' }} />, description: 'Education programs to improve nutrition and policy awareness.', url: 'https://www.arcgis.com/apps/dashboards/2100f46c379b49ba8d5d4184c68d0ab0' },
  { title: 'Congregate Meals', icon: <Restaurant sx={{ fontSize: 160, color: '#B1B5AB' }} />, description: 'Includes school meal programs, daycare food services, and senior meals.', url: 'https://www.arcgis.com/apps/dashboards/28258179da3a4fd0b1dcd0a053d402ec' },
  { title: 'Charitable Food', icon: <LocalMall sx={{ fontSize: 160, color: '#C84C23' }} />, description: 'Details food pantries, soup kitchens, and school backpack programs.', url: 'https://www.arcgis.com/apps/dashboards/60c2dc75756c485f9d135d14826464f4' },
  { title: 'Farmers Markets', icon: <Agriculture sx={{ fontSize: 160, color: '#8B0000' }} />, description: 'Information on local farmer-to-consumer markets and nutrition incentives.', url: 'https://www.arcgis.com/apps/dashboards/5095c3fd9b0c4934be43bc8f65c93b36' },
  { title: 'Agricultural Data', icon: <Home sx={{ fontSize: 160, color: '#445525' }} />, description: 'Insights into farming practices, land use, and expenditures.', url: 'https://www.arcgis.com/apps/dashboards/28258179da3a4fd0b1dcd0a053d402ec' },
  { title: 'Self-Provisioning', icon: <Info sx={{ fontSize: 160, color: '#D4D2C2' }} />, description: 'Gardening and hunting data related to food self-sufficiency.', url: 'https://www.arcgis.com/apps/dashboards/a2bc19f10d9647c39992283e9ec4d851' },
  { title: 'Political Participation', icon: <AccountBalance sx={{ fontSize: 160, color: '#39897E' }} />, description: 'Maps and data related to food policy engagement.', url: 'https://www.arcgis.com/apps/dashboards/f44ec87fbabf4697959012640dc2d29f' },
  { title: 'County Summary', icon: <Public sx={{ fontSize: 160, color: '#354F5B' }} />, description: 'Data related to county-level food landscape.', url: 'https://www.arcgis.com/apps/dashboards/f44ec87fbabf4697959012640dc2d29f' },
  { title: 'Find Food', icon: <ZoomIn sx={{ fontSize: 160, color: '#C84C23' }} />, description: 'App to help you find fresh food based on your location.', url: 'https://www.arcgis.com/apps/dashboards/f44ec87fbabf4697959012640dc2d29f' },
  { title: 'Organize', icon: <Diversity3 sx={{ fontSize: 160, color: '#B1B5AB' }} />, description: 'Discove', url: 'https://www.arcgis.com/apps/dashboards/f44ec87fbabf4697959012640dc2d29f' },
  { title: 'Learn', icon: <LightbulbCircle sx={{ fontSize: 160, color: '#8B0000' }} />, description: 'Discove', url: 'https://www.arcgis.com/apps/dashboards/f44ec87fbabf4697959012640dc2d29f' }
];

const WestVirginiaFoodLandscape = () => {
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <Typography
          variant="h2"
          component="h1"
          gutterBottom
          sx={{
            fontWeight: 'bold',
            letterSpacing: '1px',
            marginBottom: '10px',
          }}
        >
          Discover West Virginia's Food Landscape
        </Typography>
        <Typography
          variant="h5"
          component="h2"
          sx={{
            fontStyle: 'italic',
            marginBottom: '30px',
          }}
        >
          Navigate through key themes shaping food access, nutrition, and sustainability.
        </Typography>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '20px',
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
                  variant="h6"
                  component="div"
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