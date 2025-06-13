import React, { useState, useEffect } from "react";
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
  TextField,
  InputAdornment,
  Divider,
  useTheme,
  useMediaQuery,
  Paper,
  Stack,
  Pagination
} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import LinkIcon from '@mui/icons-material/Link';
import PersonIcon from '@mui/icons-material/Person';
import BusinessIcon from '@mui/icons-material/Business';
import GroupsIcon from '@mui/icons-material/Groups';
import CategoryIcon from '@mui/icons-material/Category';
import WorkIcon from '@mui/icons-material/Work';
import SchoolIcon from '@mui/icons-material/School';

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
  "WVU Extension": "#002855",
  "WVU Academic": "#0062A3",
  "State Government": "#002855",
  "Federal Government": "#0062A3",
  "Education": "#002855",
  "Higher Education": "#0062A3",
  "Non-Profit": "#002855",
  "Industry": "#0062A3"
};

const SNACMembers = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredMembers, setFilteredMembers] = useState(snacMembers);
  const [page, setPage] = useState(1);
  const [statistics, setStatistics] = useState({});
  const rowsPerPage = 9;
  
  // Calculate statistics on component mount and when filtered members change
  useEffect(() => {
    calculateStatistics();
  }, [filteredMembers]);
  
  // Calculate key statistics
  const calculateStatistics = () => {
    const categoryCount = {};
    const organizationCount = {};
    
    // Count occurrences
    snacMembers.forEach(member => {
      categoryCount[member.category] = (categoryCount[member.category] || 0) + 1;
      organizationCount[member.organization] = (organizationCount[member.organization] || 0) + 1;
    });
    
    // Get unique counts
    const uniqueCategories = Object.keys(categoryCount).length;
    const uniqueOrganizations = Object.keys(organizationCount).length;
    
    setStatistics({
      totalMembers: snacMembers.length,
      uniqueCategories,
      uniqueOrganizations,
      categoryBreakdown: categoryCount,
      filteredCount: filteredMembers.length
    });
  };
  
  // Handle search change
  const handleSearchChange = (event) => {
    const term = event.target.value;
    setSearchTerm(term);
    filterMembers(term);
    setPage(1); // Reset to first page when search changes
  };
  
  // Filter members based on search term
  const filterMembers = (term) => {
    if (!term) {
      setFilteredMembers(snacMembers);
      return;
    }
    
    const lowerCaseTerm = term.toLowerCase();
    const filtered = snacMembers.filter(member => 
      member.name.toLowerCase().includes(lowerCaseTerm) ||
      member.title.toLowerCase().includes(lowerCaseTerm) ||
      member.organization.toLowerCase().includes(lowerCaseTerm) ||
      member.category.toLowerCase().includes(lowerCaseTerm)
    );
    
    setFilteredMembers(filtered);
  };
  
  // Handle page change
  const handlePageChange = (event, value) => {
    setPage(value);
  };
  
  // Get current page items
  const getCurrentPageItems = () => {
    const startIndex = (page - 1) * rowsPerPage;
    return filteredMembers.slice(startIndex, startIndex + rowsPerPage);
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
      {/* Header Section */}
      <Box sx={{ mb: 5, textAlign: "center" }}>
        <Typography
                    variant="h2"
                    className="text-wvu-blue display-3 wvu-bar wvu-bar--center wvu-bar--bottom wvu-shout"
                    sx={{
                      
                     
                      mb: 3,
                  
                      width: "auto",
                     
                    }}
                  >
          The State Nutrition Action Council (SNAC)
        </Typography>
        
        <Box sx={{ 
           
          mx: "auto",
          mt: 5,
          mb: 3,
          px: { xs: 2, sm: 4 },
          py: { xs: 2, sm: 3 },
          backgroundColor: "#f9f9f9",
          borderRadius: "8px",
          border: "1px solid #eaeaea"
        }}>
          <Typography
            variant="body1"
            align="left"
            sx={{
              color: "#555",
              fontSize: { xs: "0.95rem", sm: "1rem" },
              lineHeight: 1.8,
              textAlign: "justify"
            }}
          >
            The State Nutrition Action Council (SNAC) seeks to coordinate state level nutrition and obesity interventions 
            by bringing together representatives from all state government agencies and nonprofit agencies that implement 
            United States Department of Agriculture Nutrition Programs. Coordinated by the West Virginia University Extension 
            Family Nutrition Program, SNAC meetings take place twice a year.
          </Typography>
          
          <Typography
            variant="body1"
            align="left"
            sx={{
              color: "#555",
              fontSize: { xs: "0.95rem", sm: "1rem" },
              lineHeight: 1.8,
              mt: 2,
              textAlign: "justify"
            }}
          >
            SNAC facilitates the implementation and monitoring of short, medium and long-term planning processes to reach 
            underserved communities with nutrition education and assistance programs, improve and create healthy food environments, 
            encourage physical activity, prevent obesity and reduce food insecurity.
          </Typography>
        </Box>
      </Box>
      
      {/* Statistics Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={4}>
          <Paper elevation={2} sx={{ p: 2, textAlign: "center", height: "100%" }}>
            <GroupsIcon sx={{ fontSize: "2.5rem", color: "#002855", mb: 1 }} />
            <Typography variant="h2" sx={{ fontWeight: "bold" }}>{statistics.totalMembers}</Typography>
            <Typography variant="body2" color="text.primary">Active Members</Typography>
          </Paper>
        </Grid>
        
        <Grid item xs={12} sm={6} md={4}>
          <Paper elevation={2} sx={{ p: 2, textAlign: "center", height: "100%" }}>
            <WorkIcon sx={{ fontSize: "2.5rem", color: "#002855", mb: 1 }} />
            <Typography variant="h2" sx={{ fontWeight: "bold" }}>{statistics.uniqueOrganizations}</Typography>
            <Typography variant="body2" color="text.primary">Organizations</Typography>
          </Paper>
        </Grid>
        
        <Grid item xs={12} sm={6} md={4}>
          <Paper elevation={2} sx={{ p: 2, textAlign: "center", height: "100%" }}>
            <CategoryIcon sx={{ fontSize: "2.5rem", color: "#002855", mb: 1 }} />
            <Typography variant="h2" sx={{ fontWeight: "bold" }}>{statistics.uniqueCategories}</Typography>
            <Typography variant="body2" color="text.primary">Member Categories</Typography>
          </Paper>
        </Grid>
      </Grid>
      
      {/* Search Control */}
      <Box sx={{ mb: 4 }}>
        <TextField
          placeholder="Search members by name, title, organization, or category..."
          variant="outlined"
          fullWidth
          value={searchTerm}
          onChange={handleSearchChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </Box>
      
      <Divider sx={{ mb: 3 }} />
      
      {/* Results Count */}
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
        <Typography 
          variant="body2" 
          sx={{ color: "text.primary" }}
        >
          Showing {filteredMembers.length} of {snacMembers.length} members
        </Typography>
        
        <Pagination 
          count={Math.ceil(filteredMembers.length / rowsPerPage)} 
          page={page} 
          onChange={handlePageChange}
          color="primary"
          size={isMobile ? "small" : "medium"}
        />
      </Box>
      
      {/* Members Grid - Paginated */}
      <Grid container spacing={3}>
        {getCurrentPageItems().map((member, index) => (
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
                  <Typography variant="h3" component="h3" gutterBottom sx={{ fontWeight: "600", fontSize: { xs: "1rem", sm: "1.1rem", md: "1.2rem" } }}>
                    {member.name}
                  </Typography>
                  
                  {member.link && (
                    <IconButton 
                      href={member.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      size="small"
                      aria-label={`Link to ${member.name}'s profile`}
                      sx={{ color: categories[member.category] || "text.primary" }}
                    >
                      <LinkIcon />
                    </IconButton>
                  )}
                </Box>
                
                <Typography variant="body2" color="text.primary" gutterBottom>
                  <PersonIcon fontSize="small" sx={{ mr: 0.5, verticalAlign: "middle", fontSize: "1rem" }} />
                  {member.title}
                </Typography>
                
                <Typography variant="body2" color="text.primary">
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
          <Typography variant="h3" color="text.primary">No members found</Typography>
          <Typography variant="body2" color="text.primary">Try adjusting your search criteria</Typography>
        </Box>
      )}
      
      {/* Pagination Controls */}
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <Pagination 
          count={Math.ceil(filteredMembers.length / rowsPerPage)} 
          page={page} 
          onChange={handlePageChange}
          color="primary"
          size={isMobile ? "small" : "medium"}
        />
      </Box>
      
      {/* Legend */}
      <Box sx={{ mt: 5, pt: 3, borderTop: "1px solid #eee" }}>
        <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: "600", mb: 2 }}>
          Member Categories
        </Typography>
        <Grid container spacing={1}>
          {Object.entries(categories).map(([category, color], index) => (
            <Grid item key={index}>
              <Chip 
                label={category} 
                size="small" 
                sx={{ 
                  backgroundColor: '#002855',
                  color: 'white',
                  fontWeight: "500",
                  fontSize: "0.75rem",
                  mb: 1
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