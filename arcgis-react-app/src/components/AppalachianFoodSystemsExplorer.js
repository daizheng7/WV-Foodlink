import React from 'react';
import {
  Box,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Grid,
  useTheme,
  useMediaQuery,
  Button,
  Link,
} from '@mui/material';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

const maps = [
  {
    id: 0,
    title: "Food System Futures in Appalachia",
    description: "Explore the future of food systems across the Appalachian region with interactive data visualization.",
    url: "https://resiliencelink-wvu.hub.arcgis.com/apps/6851ae0f62a14137a443e37ede3dd4e9/explore",
    thumbnail: "https://wvu.maps.arcgis.com/sharing/rest/content/items/6851ae0f62a14137a443e37ede3dd4e9/info/thumbnail/thumbnail.jpeg?w=800"
  },
  {
    id: 1,
    title: "ARPA Allocations in West Virginia",
    description: "Track how federal recovery funds are being distributed and utilized across the state.",
    url: "https://resiliencelink-wvu.hub.arcgis.com/apps/63a5215d19304d6f939d847aa298f82c/explore",
    thumbnail: "https://www.arcgis.com/sharing/rest/content/items/63a5215d19304d6f939d847aa298f82c/resources/DSC01129__1652099102644__w1920.jpg"
  },
  {
    id: 3,
    title: "Right to Food Analysis: West Virginia",
    description: "A deep dive into food access, rights, and equity across West Virginia communities.",
    url: "https://resiliencelink-wvu.hub.arcgis.com/apps/86b6e9f79bcc417f8b374d905716e35f/explore",
    thumbnail: "https://wvu.maps.arcgis.com/sharing/rest/content/items/86b6e9f79bcc417f8b374d905716e35f/info/thumbnail/thumbnail.jpeg?w=800"
  },
];

const AppalachianFoodSystemsExplorer = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box>
      
      <Grid container spacing={3}>
        {maps.map(({ id, title, description, url, thumbnail }) => (
          <Grid item xs={12} sm={6} md={4} key={id}>
            <Card
              component="article"
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                borderRadius: 2,
                boxShadow: 2,
                backgroundColor: 'background.paper',
              }}
              aria-labelledby={`map-title-${id}`}
              aria-describedby={`map-desc-${id}`}
            >
              <CardMedia
                component="img"
                image={thumbnail}
                alt={title}
                sx={{ height: 160, objectFit: 'cover' }}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography
                  id={`map-title-${id}`}
                  variant="subtitle1"
                  fontWeight={600}
                  gutterBottom
                >
                  <Link
  href={url}
  target="_blank"
  rel="noopener noreferrer"
  underline="hover"
  color="inherit"
  aria-label={`Open map: ${title}`} // optional
  sx={{
    '&:focus': {
      outline: '2px solid #FFB81C',
      outlineOffset: '2px',
    },
  }}
>
  {title}
</Link>

                </Typography>
                <Typography
                  id={`map-desc-${id}`}
                  variant="body2"
                  color="text.secondary"
                  sx={{ minHeight: 60 }}
                >
                  {description}
                </Typography>
              </CardContent>
              <Box sx={{ p: 2, pt: 0 }}>
                <Button
  fullWidth
  endIcon={<OpenInNewIcon />}
  onClick={() => window.open(url, '_blank')}
  sx={{
    backgroundColor: '#002855',
    color: '#FFFFFF',
    textTransform: 'none',
    fontWeight: 600,
    '&:hover': {
      backgroundColor: '#002855',
    },
    '&:focus': {
      outline: '2px solid #FFB81C',
      outlineOffset: '2px',
    },
  }}
>
  Open '{title}' Story Map
</Button>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default AppalachianFoodSystemsExplorer;
