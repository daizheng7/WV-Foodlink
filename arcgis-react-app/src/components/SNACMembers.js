import React, { useState } from "react";
import { 
  Typography, 
  Box, 
  Grid, 
  Card, 
  CardContent, 
  CardActions,
  Button, 
  IconButton,
  Chip,
  Tabs,
  Tab,
  TextField,
  InputAdornment,
  Divider,
  useTheme,
  useMediaQuery
} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import LinkIcon from '@mui/icons-material/Link';
import PersonIcon from '@mui/icons-material/Person';
import BusinessIcon from '@mui/icons-material/Business';
import FilterListIcon from '@mui/icons-material/FilterList';

// SNAC Members data
const snacMembers = [
  {
    name: "Kristin McCartney",
    title: "WV SNAP-Ed Director",
    organization: "WVU Family Nutrition Program",
    category: "WVU Extension",
    link: "https://extension.wvu.edu/contact-us/directory/kristin-mccartney"
  },
  {
    name: "Laura Hill",
    title: "Program Coordinator",
    organization: "WVU Family Nutrition Program",
    category: "WVU Extension",
    link: null
  },
  {
    name: "Zack Harold",
    title: "Multimedia Specialist",
    organization: "WVU Family Nutrition Program",
    category: "WVU Extension",
    link: null
  },
  {
    name: "Susan Bratcher",
    title: "Operations Coordinator",
    organization: "WVU Family Nutrition Program",
    category: "WVU Extension",
    link: null
  },
  {
    name: "Gina Wood",
    title: "Extension Specialist, EFNEP Director",
    organization: "WVU Family Nutrition Program",
    category: "WVU Extension",
    link: "https://extension.wvu.edu/contact-us/directory/gina-wood"
  },
  {
    name: "Kerry Gabbert",
    title: "Public Health Training and Evaluation Specialist",
    organization: "WVU Family Nutrition Program",
    category: "WVU Extension",
    link: null
  },
  {
    name: "Christiaan Abildso",
    title: "Physical Activity Specialist",
    organization: "WVU Extension",
    category: "WVU Extension",
    link: "https://brownfields.wvu.edu/about/our-team/christiaan-abildso"
  },
  {
    name: "Josh Lohnes",
    title: "Research Assistant Professor",
    organization: "WVU Center for Resilient Communities",
    category: "WVU Academic",
    link: "https://www.geo.wvu.edu/faculty-and-staff/josh-lohnes"
  },
  {
    name: "Samantha Moyers",
    title: "Research Associate, CDC High Obesity Program grant",
    organization: "WVU College of Applied Human Sciences, Center for Active Life",
    category: "WVU Academic",
    link: "https://brownfields.wvu.edu/about/our-team/samantha-moyers-kinsella"
  },
  {
    name: "Udday Datta",
    title: "CDC High Obesity Program grant",
    organization: "Center for Active Life",
    category: "WVU Academic",
    link: null
  },
  {
    name: "Eloise Elliott",
    title: "Co-Investigator, CARDIAC",
    organization: "College of Applied Health Sciences",
    category: "WVU Academic",
    link: "https://appliedhumansciences.wvu.edu/about/faculty-and-staff/faculty-directory/school-of-sport-sciences/eloise-elliott"
  },
  {
    name: "Emily Murphy",
    title: "Co-Investigator, CARDIAC",
    organization: "College of Applied Health Sciences",
    category: "WVU Academic",
    link: "https://appliedhumansciences.wvu.edu/about/faculty-and-staff/faculty-directory/school-of-sport-sciences/emily-murphy"
  },
  {
    name: "Kailyn Shaffer",
    title: "Program Coordinator, CARDIAC",
    organization: "West Virginia University - College of Applied Human Sciences",
    category: "WVU Academic",
    link: null
  },
  {
    name: "Megan Govindan",
    title: "Research Scientist",
    organization: "West Virginia University Institute for Community and Rural Health",
    category: "WVU Academic",
    link: null
  },
  {
    name: "Kimberly Carr",
    title: "Research Associate",
    organization: "Institute for Community and Rural Health",
    category: "WVU Academic",
    link: null
  },
  {
    name: "Molly Linkous",
    title: "Program Manager",
    organization: "Institute for Community and Rural Health",
    category: "WVU Academic",
    link: null
  },
  {
    name: "Heidi Staats",
    title: "Director, WV WIC",
    organization: "Special Supplemental Nutrition Program for Women Infants and Children",
    category: "State Government",
    link: "https://www.linkedin.com/in/heidi-staats-msw-22ba0594"
  },
  {
    name: "Natasha Jones",
    title: "Deputy Director, Clinical services",
    organization: "Special Supplemental Nutrition Program for Women Infants and Children",
    category: "State Government",
    link: null
  },
  {
    name: "Jackie Hoppe",
    title: "Director, EBT",
    organization: "WV Department of Health and Human Services",
    category: "State Government",
    link: null
  },
  {
    name: "Ashley Puffenbarger",
    title: "Program Manager",
    organization: "Bureau for Family Assistance",
    category: "State Government",
    link: null
  },
  {
    name: "Norm Bailey",
    title: "Chief of Staff",
    organization: "West Virginia Dept of Agriculture",
    category: "State Government",
    link: null
  },
  {
    name: "Maggie Blankenship",
    title: "Assistant Director-Programs and Events",
    organization: "WV Department of Agriculture",
    category: "State Government",
    link: "https://www.linkedin.com/in/maggie-parsons-blankenship"
  },
  {
    name: "Leslie Boggess",
    title: "Assistant Director of Program",
    organization: "West Virginia Department of Agriculture",
    category: "State Government",
    link: null
  },
  {
    name: "Amanda Kittle",
    title: "Farm to School Coordinator",
    organization: "West Virginia Dept of Agriculture",
    category: "State Government",
    link: null
  },
  {
    name: "Kacey Gantzer",
    title: "Planning Coordinator",
    organization: "WV Department of Agriculture",
    category: "State Government",
    link: "https://www.linkedin.com/in/kacey-gantzer-955ba922a"
  },
  {
    name: "Melinda Francis",
    title: "Program Coordinator/Farm to School",
    organization: "WV Department of Education - Office of Child Nutrition",
    category: "Education",
    link: null
  },
  {
    name: "Janet Vinyard",
    title: "School Wellness Coordinator",
    organization: "Office of Child Nutrition",
    category: "Education",
    link: null
  },
  {
    name: "Cynthia Sorsaia",
    title: "Director, Office of Student Support and Well Being",
    organization: "Department of Education",
    category: "Education",
    link: "https://wvde.us/child-nutrition/"
  },
  {
    name: "Josh Grant",
    title: "Coordinator, Physical Education, Health Education, Physical Activity, Wellness Education",
    organization: "Department of Education",
    category: "Education",
    link: "https://www.linkedin.com/in/joshua-grant-30831868/"
  },
  {
    name: "Spencer Moss",
    title: "Executive Director",
    organization: "WV Food and Farm Coalition",
    category: "Non-Profit",
    link: null
  },
  {
    name: "Melissa Martin",
    title: "Director of Program Development and Evaluation",
    organization: "WV Food and Farm Coalition",
    category: "Non-Profit",
    link: null
  },
  {
    name: "Cordel Bostic",
    title: "Legal Affairs and Policy",
    organization: "WV Food and Farm Coalition",
    category: "Non-Profit",
    link: null
  },
  {
    name: "Bethany Lewis",
    title: "Operations Director",
    organization: "WVU Food and Farm Coalition",
    category: "Non-Profit",
    link: null
  },
  {
    name: "Cyndi Kirkhart",
    title: "Director",
    organization: "Facing Hunger Food Bank",
    category: "Non-Profit",
    link: null
  },
  {
    name: "Becky Conrad",
    title: "Program Coordinator",
    organization: "Mountaineer Food Bank",
    category: "Non-Profit",
    link: null
  },
  {
    name: "Laura Phillips",
    title: "Program Coordinator",
    organization: "Mountaineer Food Bank",
    category: "Non-Profit",
    link: null
  },
  {
    name: "Jamie Jeffery",
    title: "Director",
    organization: "KEYs 4 Healthy Kids",
    category: "Non-Profit",
    link: "https://www.linkedin.com/in/jamie-jeffrey-md-989ba2b"
  },
  {
    name: "Sommer Beane",
    title: "KEYS Program Coordinator",
    organization: "CAMC/KEYS",
    category: "Non-Profit",
    link: null
  },
  {
    name: "Chris Garner",
    title: "SNAP Outreach Coordinator",
    organization: "Catholic Charities",
    category: "Non-Profit",
    link: null
  },
  {
    name: "John Riggs",
    title: "Agriculture Director",
    organization: "WVU Parkersburg",
    category: "Higher Education",
    link: "https://theorg.com/org/west-virginia-university-at-parkersburg/org-chart/john-riggs"
  },
  {
    name: "Mary Kathryn Gould",
    title: "Professor",
    organization: "Marshall University Dietetics Program",
    category: "Higher Education",
    link: "https://www.marshall.edu/nutrition-and-dietetics/"
  },
  {
    name: "Gina Sharps",
    title: "Coalition Coordinator",
    organization: "Oral Health Coalition",
    category: "Non-Profit",
    link: null
  },
  {
    name: "Cathryn Miller",
    title: "State Director",
    organization: "Save the Children",
    category: "Non-Profit",
    link: null
  },
  {
    name: "Sharon Maynard",
    title: "Nutrition Affairs and School Wellness Coordinator",
    organization: "Dairy Council",
    category: "Industry",
    link: "https://www.drink-milk.com/author/sharon-maynard-rd-ld/"
  },
  {
    name: "Amanda Gomes",
    title: "Regional Coordinator",
    organization: "USDA, FNS",
    category: "Federal Government",
    link: null
  }
];

// Categories with colors
const categories = {
  "WVU Extension": "#003399",
  "WVU Academic": "#0033BB",
  "State Government": "#990000",
  "Federal Government": "#660000",
  "Education": "#006633",
  "Higher Education": "#009933",
  "Non-Profit": "#663399",
  "Industry": "#CC6600"
};

const SNACMembers = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  
  const [searchTerm, setSearchTerm] = useState("");
  const [tabValue, setTabValue] = useState(0);
  const [filteredMembers, setFilteredMembers] = useState(snacMembers);
  
  // Handle tab change
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
    filterMembers(newValue, searchTerm);
  };
  
  // Handle search change
  const handleSearchChange = (event) => {
    const term = event.target.value;
    setSearchTerm(term);
    filterMembers(tabValue, term);
  };
  
  // Filter members based on tab and search term
  const filterMembers = (tab, term) => {
    let filtered = [...snacMembers];
    
    // First filter by tab
    if (tab === 1) { // With links
      filtered = filtered.filter(member => member.link !== null);
    } else if (tab === 2) { // No links
      filtered = filtered.filter(member => member.link === null);
    }
    
    // Then filter by search term
    if (term) {
      const lowerCaseTerm = term.toLowerCase();
      filtered = filtered.filter(member => 
        member.name.toLowerCase().includes(lowerCaseTerm) ||
        member.title.toLowerCase().includes(lowerCaseTerm) ||
        member.organization.toLowerCase().includes(lowerCaseTerm) ||
        member.category.toLowerCase().includes(lowerCaseTerm)
      );
    }
    
    setFilteredMembers(filtered);
  };
  
  // Dynamic grid sizing
  const getGridSize = () => {
    if (isMobile) return 12;
    if (isTablet) return 6;
    return 4;
  };
  
  return (
    <Box
      sx={{
        width: "100%",
        padding: { xs: 2, sm: 3, md: 4 },
        backgroundColor: "#ffffff",
        borderRadius: "8px",
        boxShadow: "0 4px 8px rgba(0,0,0,0.05)",
        marginTop: 4,
        marginBottom: 6
      }}
    >
        <Typography
              variant="h4"
              component="h2"
              align="center"
              sx={{
                color: "#333",
                fontWeight: "600",
                mb: 1,
                fontSize: { xs: "1.8rem", sm: "2rem", md: "2.2rem" },
                position: "relative",
                "&:after": {
                  content: '""',
                  position: "absolute",
                  bottom: "-12px",
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: { xs: "60px", sm: "80px" },
                  height: "3px",
                  backgroundColor: "#99031e",
                  borderRadius: "2px"
                }
              }}
            >
        The State Nutrition Action Council (SNAC)
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
The State Nutrition Action Council (SNAC) seeks to coordinate state level nutrition and obesity interventions by bringing together representatives from all state government agencies and nonprofit agencies that implement United States Department of Agriculture Nutrition Programs. Coordinated by the West Virginia University Extension Family Nutrition Program, SNAC meetings take place twice a year. There are currently 47 active members of this collaborative representing 26 different organizations. SNAC facilitates the implementation and monitoring of  short, medium and long-term planning processes to reach underserved communities with nutrition education and assistance programs, improve and create healthy food environments, encourage physical activity, prevent obesity and reduce food insecurity. 
</Typography>
      
      {/* Search and Filter Controls */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          alignItems: { xs: "stretch", sm: "center" },
          justifyContent: "space-between",
          mb: 3,
          gap: 2
        }}
      >
        <TextField
          placeholder="Search members..."
          variant="outlined"
          size="small"
          fullWidth
          value={searchTerm}
          onChange={handleSearchChange}
          sx={{ maxWidth: { xs: "100%", sm: "300px" } }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
        
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <FilterListIcon sx={{ mr: 1, color: "#666" }} />
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            variant="scrollable"
            scrollButtons="auto"
            aria-label="member filter tabs"
          >
            <Tab label="All Members" />
            <Tab label="With Links" />
            <Tab label="Without Links" />
          </Tabs>
        </Box>
      </Box>
      
      <Divider sx={{ mb: 3 }} />
      
      {/* Results Count */}
      <Typography 
        variant="body2" 
        sx={{ mb: 2, color: "#666", fontStyle: "italic" }}
      >
        Showing {filteredMembers.length} of {snacMembers.length} members
      </Typography>
      
      {/* Members Grid */}
      <Grid container spacing={3}>
        {filteredMembers.map((member, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card 
              elevation={2}
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                transition: "transform 0.2s, box-shadow 0.2s",
                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: "0 8px 16px rgba(0,0,0,0.1)"
                },
                borderTop: `4px solid ${categories[member.category] || "#999"}`
              }}
            >
              <CardContent sx={{ flexGrow: 1 }}>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 1 }}>
                  <Typography variant="h6" component="h3" gutterBottom sx={{ fontWeight: "600", fontSize: { xs: "1rem", sm: "1.1rem", md: "1.2rem" } }}>
                    {member.name}
                  </Typography>
                  
                  {member.link && (
                    <IconButton 
                      href={member.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      size="small"
                      aria-label={`Link to ${member.name}'s profile`}
                      sx={{ color: categories[member.category] || "#666" }}
                    >
                      <LinkIcon />
                    </IconButton>
                  )}
                </Box>
                
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  <PersonIcon fontSize="small" sx={{ mr: 0.5, verticalAlign: "middle", fontSize: "1rem" }} />
                  {member.title}
                </Typography>
                
                <Typography variant="body2" color="text.secondary">
                  <BusinessIcon fontSize="small" sx={{ mr: 0.5, verticalAlign: "middle", fontSize: "1rem" }} />
                  {member.organization}
                </Typography>
              </CardContent>
              
              <CardActions sx={{ pt: 0, pb: 1.5, px: 2 }}>
                <Chip 
                  label={member.category} 
                  size="small" 
                  sx={{ 
                    backgroundColor: `${categories[member.category]}22`,
                    color: categories[member.category],
                    fontWeight: "500",
                    fontSize: "0.75rem"
                  }}
                />
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
      
      {filteredMembers.length === 0 && (
        <Box sx={{ textAlign: "center", py: 4 }}>
          <Typography variant="h6" color="text.secondary">No members found</Typography>
          <Typography variant="body2" color="text.secondary">Try adjusting your search criteria</Typography>
        </Box>
      )}
      
      {/* Legend */}
      <Box sx={{ mt: 4, pt: 2, borderTop: "1px solid #eee" }}>
        <Typography variant="subtitle2" gutterBottom sx={{ fontWeight: "600" }}>
          Member Categories
        </Typography>
        <Grid container spacing={1} sx={{ mt: 1 }}>
          {Object.entries(categories).map(([category, color], index) => (
            <Grid item key={index}>
              <Chip 
                label={category} 
                size="small" 
                sx={{ 
                  backgroundColor: `${color}22`,
                  color: color,
                  fontWeight: "500",
                  fontSize: "0.75rem"
                }}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default SNACMembers;