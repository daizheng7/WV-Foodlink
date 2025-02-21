import React from "react";
import { Box, Typography, Grid, Card, CardContent } from "@mui/material";
import { ResponsiveBar } from "@nivo/bar";
import { ResponsivePie } from "@nivo/pie";
import { motion } from "framer-motion";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import ChildCareIcon from "@mui/icons-material/ChildCare";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import ChildFriendlyIcon from '@mui/icons-material/ChildFriendly';
// Data for Nivo Charts
const povertyBarData = [
  { location: "West Virginia", povertyRate: 16.7 },
  { location: "National Average", povertyRate: 11.1 },
];

const foodInsecurityBarData = [
  {
    year: "2018-2020",
    "Food Insecure Households": 15.1,
    "Secure Households": 84.9,
  },
  {
    year: "2022",
    "Food Insecure Households": 16.3,
    "Secure Households": 83.7,
  },
];

const freshProducePieData = [
  { id: "With Fresh Produce", value: 12, color: "#FF5733" },
  { id: "Without Fresh Produce", value: 88, color: "#C70039" },
];

// Motion Variants
const containerVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { staggerChildren: 0.2 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const IssuesSection = () => {
  return (
    <Box
      sx={{
        py: 8,
        px: 4,
        background: "linear-gradient(135deg, #ffffff, #f9f9f9)",
        borderRadius: "20px",
        boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
      }}
    >
      {/* Title and Description */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          sx={{ fontWeight: "bold", mb: 4, color: "#333" }}
        >
          Challenges in West Virginia
        </Typography>
        <Typography
          variant="body1"
          align="center"
          sx={{
            maxWidth: "800px",
            mx: "auto",
            mb: 6,
            lineHeight: 1.6,
            color: "#555",
          }}
        >
          West Virginia faces challenges such as high poverty rates, significant food insecurity, and rising costs of living. These issues require immediate attention and collective action to create a better future for all residents.
        </Typography>
      </motion.div>

      {/* Highlights Section */}
<Box
  sx={{
    display: "flex",
    flexWrap: "wrap",
    gap: "20px",
    justifyContent: "space-evenly",
    marginBottom: "40px",
  }}
>
  <Box
    sx={{
      flex: "1",
      minWidth: "300px",
      backgroundColor: "#39897e",
      borderRadius: "12px",
      padding: "20px",
      boxShadow: "0 6px 12px rgba(0, 0, 0, 0.15)",
      textAlign: "center",
      color: "#d4d2c2",
    }}
  >
    <Typography variant="h4" gutterBottom color="white">
      From 2022 to 2023
    </Typography>
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mt: 3 }}>
      <PeopleAltIcon sx={{ fontSize: 80, color: "#fff", mb: 2 }} />
      <Typography variant="h3" sx={{ fontWeight: "bold", color: "#fff", mb: 1 }}>
        33,621 households Lost Support
      </Typography>
    </Box>
    
  </Box>

  <Box
    sx={{
      flex: "1",
      minWidth: "300px",
      backgroundColor: "#c84c23",
      borderRadius: "12px",
      padding: "20px",
      boxShadow: "0 6px 12px rgba(0, 0, 0, 0.15)",
      textAlign: "center",
      color: "#d4d2c2",
    }}
  >
    <Typography variant="h4" gutterBottom color="white">
    From 2022 to 2023
    </Typography>
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mt: 3 }}>
      <TrendingUpIcon sx={{ fontSize: 80, color: "#fff", mb: 2 }} />
      <Typography variant="h3" sx={{ fontWeight: "bold", color: "#fff", mb: 1 }}>
        $59,579,361 SNAP Funding Lost
      </Typography>
    </Box>
    
  </Box>
</Box>



      {/* Cards with Graphs */}
<motion.div
  variants={containerVariants}
  initial="hidden"
  animate="visible"
>
  <Grid container spacing={4} justifyContent="center">
    {/* Poverty Rates */}
    <Grid item xs={12} sm={6} md={4}>
      <motion.div variants={cardVariants}>
        <Card
          sx={{
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            height: 400,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            background: "linear-gradient(135deg,#8B0000,#8B0000)",
          }}
        >
          <CardContent sx={{ color: "#FFFFFF" }}>
            <TrendingUpIcon sx={{ fontSize: 60, color: "#FFFFFF", mb: 2 }}/>
            <Typography variant="h6" gutterBottom>
              Poverty Rates
            </Typography>
            <Typography variant="body2" gutterBottom>
              In 2023, West Virginia's poverty rate was 16.7%, compared to the national average of 11.1%.
            </Typography>
            
          </CardContent>
        </Card>
      </motion.div>
    </Grid>

          {/* Child Poverty */}
<Grid item xs={12} sm={6} md={4}>
  <motion.div variants={cardVariants}>
    <Card className="card-child-poverty"
      sx={{
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        height: 400,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        background: "linear-gradient(135deg, #C84C23, #C84C23)",
      }}
    >
      <CardContent sx={{ color: "#FFFFFF" }}>
        <ChildFriendlyIcon sx={{ fontSize: 60, color: "#FFFFFF", mb: 2 }} />
        <Typography variant="h6" gutterBottom>
          Child Poverty Rates
        </Typography>
        <Typography variant="body2" gutterBottom>
          Children living in poverty in West Virginia:
        </Typography>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
          style={{ fontSize: "4rem", fontWeight: "bold", color: "#FFFFFF", margin: "20px 0" }}
        >
          1 in 5
        </motion.div>
        <Typography variant="body2">
          This represents 20% of children in the state.
        </Typography>
      </CardContent>
    </Card>
  </motion.div>
</Grid>


          {/* Food Insecurity */}
<Grid item xs={12} sm={6} md={4}>
  <motion.div variants={cardVariants}>
    <Card
      sx={{
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        height: 400,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #B1B5AB,rgb(35, 37, 31))",
      }}
    >
      <CardContent sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <RestaurantIcon sx={{ fontSize: 60, color: "#FFFFFF", mb: 2 }}  />
        <Typography variant="h6" gutterBottom sx={{ color: "#FFFFFF" }}>
          Food Insecurity
        </Typography>
        <Typography variant="body2" sx={{ color: "#FFFFFF", textAlign: 'center', mb: 3 }}>
          Between 2018 and 2022, food insecurity rose in West Virginia:
        </Typography>
        <Typography variant="h3" sx={{ fontWeight: "bold", color: "#FFFFFF" , alignSelf: 'center', my: 2 }}>
          16.3%
        </Typography>
        <Typography variant="body2" sx={{ color: "#FFFFFF" }}>
          of households impacted
        </Typography>
        
      </CardContent>
    </Card>
  </motion.div>
</Grid>

          {/* Fresh Produce Accessibility */}
<Grid item xs={12} sm={6} md={4}>
  <motion.div variants={cardVariants}>
    <Card
      sx={{
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        height: 400,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #445525, #445525)",
      }}
    >
      <CardContent sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <ShoppingCartIcon sx={{ fontSize: 60, color: "#FFFFFF", mb: 2 }} />
        <Typography variant="h6" gutterBottom sx={{ color: "#FFFFFF" }}>
          Fresh Produce Availability
        </Typography>
        <Typography variant="body2" sx={{ color: "#FFFFFF", textAlign: 'center', mb: 3 }}>
          Food retailers in West Virginia offering fresh produce:
        </Typography>
        <Typography variant="h3" sx={{ fontWeight: "bold", color: "#FFFFFF", mb: 3 }}>
          12%
        </Typography>
        
      </CardContent>
    </Card>
  </motion.div>
</Grid>



          {/* Food Desert Statistic */}
<Grid item xs={12} sm={6} md={4}>
  <motion.div variants={cardVariants}>
    <Card
      sx={{
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        height: 400,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #39897E, #39897E)",
      }}
    >
      <CardContent>
        <LocationOnIcon sx={{ fontSize: 60, color: "#FFFFFF", mb: 2 }} />
        <Typography variant="h6" gutterBottom sx={{ color: "#FFFFFF" }}>
          Food Desert Statistic
        </Typography>
        <Typography variant="body2" sx={{ color: "#FFFFFF", mb: 3 }}>
          West Virginians living in food deserts:
        </Typography>
        <Typography variant="h3" sx={{ fontWeight: "bold", color: "#FFFFFF", mb: 3 }}>
          20%
        </Typography>
        <Typography variant="body2" sx={{ color: "#FFFFFF" }}>
          Nearest fresh produce retailer is over 50 miles away
        </Typography>
      </CardContent>
    </Card>
  </motion.div>
</Grid>

{/* Population Loss */}
<Grid item xs={12} sm={6} md={4}>
  <motion.div variants={cardVariants}>
    <Card
      sx={{
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        height: 400,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #354F5B, #354F5B)",
      }}
    >
      <CardContent>
        <PeopleAltIcon sx={{ fontSize: 60, color: "#FFFFFF", mb: 2 }} />
        <Typography variant="h6" gutterBottom sx={{ color: "#FFFFFF" }}>
          Population Change (2020-2023)
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "space-around", width: "100%", mb: 3 }}>
          <Box>
            <Typography variant="h4" sx={{ fontWeight: "bold", color: "#FFFFFF" }}>
              55,000
            </Typography>
            <Typography variant="body2" sx={{ color: "#FFFFFF" }}>
              Births
            </Typography>
          </Box>
          <Box>
            <Typography variant="h4" sx={{ fontWeight: "bold", color: "#FFFFFF" }}>
              89,000
            </Typography>
            <Typography variant="body2" sx={{ color: "#FFFFFF" }}>
              Deaths
            </Typography>
          </Box>
        </Box>
        <Typography variant="h5" sx={{ fontWeight: "bold", color: "#FFFFFF" }}>
          Net Loss: 34,000
        </Typography>
      </CardContent>
    </Card>
  </motion.div>
</Grid>


        </Grid>
      </motion.div>
    </Box>
  );
};

export default IssuesSection;
