import React from "react";
import { 
  Typography, 
  Box, 
  Grid, 
  Card, 
  CardContent,
  Divider,
  Chip,
  useTheme,
  useMediaQuery
} from "@mui/material";
import StorageIcon from '@mui/icons-material/Storage';
import AssessmentIcon from '@mui/icons-material/Assessment';
import PublicIcon from '@mui/icons-material/Public';

// Data Partners categorized
const dataPartners = [
  {
    name: "US Census Bureau",
    category: "Federal",
    logo: null, // Add logo path when available
    website: "https://www.census.gov/"
  },
  {
    name: "US Bureau of Labor Statistics",
    category: "Federal",
    logo: null,
    website: "https://www.bls.gov/"
  },
  {
    name: "US Department of Agriculture",
    category: "Federal",
    logo: null,
    website: "https://www.usda.gov/"
  },
  {
    name: "West Virginia Secretary of State",
    category: "State",
    logo: null,
    website: "https://sos.wv.gov/"
  },
  {
    name: "West Virginia Department of Health and Human Resources",
    category: "State",
    logo: null,
    website: "https://dhhr.wv.gov/"
  },
  {
    name: "West Virginia Department of Education",
    category: "State",
    logo: null,
    website: "https://wvde.us/"
  },
  {
    name: "West Virginia Department of Agriculture",
    category: "State",
    logo: null,
    website: "https://agriculture.wv.gov/"
  },
  {
    name: "West Virginia Bureau of Senior Services",
    category: "State",
    logo: null,
    website: "http://www.wvseniorservices.gov/"
  },
  {
    name: "West Virginia Department of Natural Resources",
    category: "State",
    logo: null,
    website: "https://wvdnr.gov/"
  },
  {
    name: "West Virginia Food and Farm Coalition",
    category: "Non-Profit",
    logo: null,
    website: "https://www.wvfoodandfarm.org/"
  },
  {
    name: "Mountaineer Food Bank",
    category: "Non-Profit",
    logo: null,
    website: "https://www.mountaineerfoodbank.org/"
  },
  {
    name: "Facing Hunger Food Bank",
    category: "Non-Profit",
    logo: null,
    website: "https://facinghunger.org/"
  },
  {
    name: "WVU Extension Family Nutrition Program (SNAP-Ed)",
    category: "University",
    logo: null,
    website: "https://extension.wvu.edu/food-health/nutrition/fnp"
  }
];

// Category colors and icons
const categoryConfig = {
  "Federal": {
    color: "#002855", // Dark blue
    icon: <PublicIcon />
  },
  "State": {
    color: "#002855", // Medium blue
    icon: <StorageIcon />
  },
  "Non-Profit": {
    color: "#002855", // Light blue
    icon: <AssessmentIcon />
  },
  "University": {
    color: "#002855", // WVU blue
    icon: <StorageIcon />
  }
};

const DataPartners = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  // Group partners by category
  const groupedPartners = {};
  dataPartners.forEach(partner => {
    if (!groupedPartners[partner.category]) {
      groupedPartners[partner.category] = [];
    }
    groupedPartners[partner.category].push(partner);
  });
  
  return (
    <Box
      sx={{
        width: "100%",
        padding: { xs: 2, sm: 3, md: 4 },
        backgroundColor: "#ffffff",
        borderRadius: "8px",
        boxShadow: "0 4px 8px rgba(0,0,0,0.05)",
        marginTop: 5,
        marginBottom: 5
      }}
    >
      <Typography
            variant="h1"
            className="text-wvu-blue display-3 wvu-bar wvu-bar--center wvu-bar--bottom wvu-shout"
            sx={{
              
             
              mb: 3,
          
              width: "auto",
             
            }}
          >
        Our Data Partners
      </Typography>
      
      <Typography
        variant="body1"
        align="center"
        sx={{
          mt: 3,
          mb: 4,
          color: "#555",
          maxWidth: "800px",
          mx: "auto",
          fontSize: { xs: "0.95rem", sm: "1rem" },
          lineHeight: 1.6,
          padding: { xs: "0 8px", sm: "0" }
        }}
      >
        The data in this portal is collected and curated in partnership with a number of different organizations.
      </Typography>
      
      {/* Partners by Category */}
      {Object.keys(groupedPartners).map((category, index) => (
        <Box key={category} sx={{ mb: 5, pb: 2, borderBottom: index < Object.keys(groupedPartners).length - 1 ? "1px solid #eee" : "none" }}>
          <Box 
            sx={{ 
              display: "flex", 
              alignItems: "center", 
              mb: 2,
              backgroundColor: `${categoryConfig[category].color}10`,
              borderLeft: `4px solid ${categoryConfig[category].color}`,
              padding: "10px 16px",
              borderRadius: "0 4px 4px 0"
            }}
          >
            <Box sx={{ color: categoryConfig[category].color, mr: 1, display: "flex", alignItems: "center" }}>
              {categoryConfig[category].icon}
            </Box>
            <Typography 
              variant="h6" 
              component="h3"
              sx={{ 
                fontWeight: "600", 
                color: categoryConfig[category].color,
                fontSize: { xs: "1.1rem", sm: "1.2rem" }
              }}
            >
              {category} Data Partners
            </Typography>
          </Box>
          
          <Grid container spacing={2}>
            {groupedPartners[category].map((partner, partnerIndex) => (
              <Grid item xs={12} sm={6} md={4} key={partnerIndex}>
                <Card 
                  elevation={1}
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    transition: "transform 0.2s, box-shadow 0.2s",
                    "&:hover": {
                      transform: "translateY(-3px)",
                      boxShadow: "0 6px 12px rgba(0,0,0,0.08)"
                    },
                    borderBottom: `3px solid ${categoryConfig[category].color}`
                  }}
                >
                  <CardContent>
                    {partner.logo ? (
                      <Box 
                        component="img" 
                        src={partner.logo}
                        alt={`${partner.name} logo`}
                        sx={{
                          height: 50,
                          objectFit: "contain",
                          mb: 2
                        }}
                      />
                    ) : (
                      <Box 
                        sx={{ 
                          height: 50, 
                          display: "flex", 
                          alignItems: "center", 
                          justifyContent: "center",
                          mb: 1
                        }}
                      >
                        <Chip 
                          icon={categoryConfig[category].icon} 
                          label={category}
                          size="small"
                          sx={{ 
                            backgroundColor: `${categoryConfig[category].color}15`,
                            color: categoryConfig[category].color,
                            fontWeight: "500"
                          }}
                        />
                      </Box>
                    )}
                    
                    <Typography 
                      variant="h6" 
                      component="h4"
                      align="center"
                      sx={{ 
                        fontWeight: "500", 
                        fontSize: "1rem",
                        lineHeight: 1.3,
                        minHeight: "2.6rem",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center"
                      }}
                    >
                      {partner.name}
                    </Typography>
                    
                    <Box 
                      component="a"
                      href={partner.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{
                        display: "block",
                        textAlign: "center",
                        mt: 1,
                        fontSize: "0.8rem",
                        color: categoryConfig[category].color,
                        textDecoration: "none",
                        "&:hover": {
                          textDecoration: "underline"
                        }
                      }}
                    >
                      Visit Website
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      ))}
      
      {/* Legend */}
      <Box sx={{ mt: 4, pt: 2, borderTop: "1px solid #eee" }}>
        <Typography variant="body2" align="center" sx={{ color: "#666"}}>
          These partners provide essential data that enables WV FOODLINK to offer comprehensive food system information.
        </Typography>
      </Box>
    </Box>
  );
};

export default DataPartners;