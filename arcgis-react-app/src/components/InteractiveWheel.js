import React, { useState, useEffect, useRef } from "react";
import { motion, useAnimation } from "framer-motion";
import { Users, DollarSign, MapPin, BookOpen, AlertCircle, ShoppingCart, HandHelping, Building, Factory, Home } from "lucide-react";
import { Card, CardContent, CardMedia, Typography, IconButton, Grid, Box, Paper } from "@mui/material";

// Refined Color Palette & Description
const barriers = [
    { name: "Crisis", icon: AlertCircle, color: "#D32F2F", video: "https://www.youtube.com/embed/qO0RVbK7DHs", description: "refers to disasters, unemployment, health issue or death that can undermine food access for an individual, household or community." },
    { name: "Income", icon: DollarSign, color: "#FFA000", video: "https://www.youtube.com/embed/v8ePPIownaI", description: "refers to the effect of someone’s resources in wages or assets as well as the costs of food, debts carried, and the time limits placed on those who work rather than growing food for themselves. As a majority of people in the U.S. work to earn money to buy food, this is the largest constraint on food access." },
    { name: "Identity", icon: Users, color: "#1976D2", video: "https://www.youtube.com/embed/OdMCPrPn5qo", description: "refers to the way someone’s gender, race, disability, sexuality, nationality or age affects their ability to access food." },
    { name: "Location", icon: MapPin, color: "#388E3C", video: "https://www.youtube.com/embed/AynwUOw45vo", description: "refers to people's proximity to healthy food outlets, the availability of particular foods, as well as the ability to grow food. " },
    { name: "Knowledge", icon: BookOpen, color: "#7B1FA2", video: "https://www.youtube.com/embed/UGilgNGvNd0", description: "refers to people's proximity and availability of education and information resources." },
  ];
  
  const strategies = [
    { name: "State", icon: Building, color: "#455A64", video: "https://www.youtube.com/embed/lYZBG4BTd0E", description: "refers to government programs such as SNAP, WIC and School programs that provide direct subsidies to offset the cost of food for individuals and households (especially children) who lack the money to access food in the market." },
    { name: "Charity", icon: HandHelping, color: "#8E24AA", video: "https://www.youtube.com/embed/WsJb8ZYxRAs", description: "refers to free food rations provided by food banks, food pantries, and soup kitchens that is funded by donation." },
    { name: "Market", icon: ShoppingCart, color: "#F57C00", video: "https://www.youtube.com/embed/GSf_odoe4kg", description: "refers to grocery stores, convenience stores, restaurants, dollar stores and the like where people exchanges wages for food." },
    { name: "Self-Provisioning", icon: Home, color: "#5D4037", video: "https://www.youtube.com/embed/XcDbcUslsNg", description: " refers to practices of hunting, foraging, fishing or growing food." },
    { name: "Farming", icon: Factory, color: "#2E7D32", video: "https://www.youtube.com/embed/WmgW6TPL9hI", description: "refers to grower-based initiatives to sell produce through farmers markets and other mechanisms." },
  ];

const InteractiveWheel = () => {
  const [selectedBarrier, setSelectedBarrier] = useState(barriers[0]);
  const [selectedStrategy, setSelectedStrategy] = useState(strategies[0]);
  const strategyRef = useRef(null);
  const strategyControls = useAnimation();

  // Detect Scroll to Reveal Strategies
  useEffect(() => {
    const handleScroll = () => {
      if (strategyRef.current) {
        const { top } = strategyRef.current.getBoundingClientRect();
        if (top < window.innerHeight * 0.75) {
          strategyControls.start({ opacity: 1, x: 0 });
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [strategyControls]);

  return (
    <motion.div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-50">
      {/* Header Section */}
      <Grid container spacing={6} className="w-full max-w-6xl mb-6">
        <Grid item xs={6} textAlign="center">
        <Typography
    variant="h3"
    sx={{ fontWeight: "bold", color: "#000000", mb: 2 }} // Adjust "mb" value as needed
  >
    Barriers
  </Typography>
</Grid>
<Grid item xs={6} textAlign="center">
  <Typography
    variant="h3"
    sx={{ fontWeight: "bold", color: "#000000", mb: 2 }} // Adjust "mb" value as needed
  >
    Strategies
  </Typography>
        </Grid>
      </Grid>

      <Grid container spacing={6} className="w-full max-w-6xl">
        {/* Barriers Section - Left */}
        <Grid item xs={6}>
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
            <Paper className="p-6 shadow-lg rounded-xl bg-white border">
              <Box className="flex flex-col gap-4">
                {barriers.map((barrier, index) => (
                  <IconButton
                    key={index}
                    onClick={() => setSelectedBarrier(barrier)}
                    className="flex items-center gap-4 p-4 rounded-lg hover:shadow-md transition"
                    sx={{ backgroundColor: "#F5F5F5", color: "#333", width: "100%", borderRadius: "10px" }}
                  >
                    <barrier.icon size={40} color={barrier.color} />
                    <Typography variant="h6" sx={{ fontWeight: "bold" }}>{barrier.name}</Typography>
                  </IconButton>
                ))}
              </Box>
            </Paper>
            <Card className="mt-6 w-full shadow-lg rounded-xl p-6 text-center">
              <selectedBarrier.icon size={60} color={selectedBarrier.color} />
              <Typography variant="h5" className="mt-3 font-bold" sx={{ color: selectedBarrier.color }}>
                {selectedBarrier.name}
              </Typography>
              <Box className="mt-4 p-4 bg-gray-100 border-l-4 border-gray-400 italic text-gray-700 rounded-lg">
                <Typography variant="body1">
                  {selectedBarrier.description}
                </Typography>
              </Box>
              <Box className="mt-4">
                <CardMedia component="iframe" height="200" src={selectedBarrier.video} title="Barrier Video" className="rounded-lg" />
              </Box>
            </Card>
          </motion.div>
        </Grid>

        {/* Strategies Section - Right (Reveals on Scroll) */}
        <Grid item xs={6}>
          <motion.div
            ref={strategyRef}
            initial={{ opacity: 0, x: 30 }}
            animate={strategyControls}
            transition={{ duration: 0.8 }}
          >
            <Paper className="p-6 shadow-lg rounded-xl bg-white border">
              <Box className="flex flex-col gap-4">
                {strategies.map((strategy, index) => (
                  <IconButton
                    key={index}
                    onClick={() => setSelectedStrategy(strategy)}
                    className="flex items-center gap-4 p-4 rounded-lg hover:shadow-md transition"
                    sx={{ backgroundColor: "#F5F5F5", color: "#333", width: "100%", borderRadius: "10px" }}
                  >
                    <strategy.icon size={40} color={strategy.color} />
                    <Typography variant="h6" sx={{ fontWeight: "bold" }}>{strategy.name}</Typography>
                  </IconButton>
                ))}
              </Box>
            </Paper>
            <Card className="mt-6 w-full shadow-lg rounded-xl p-6 text-center">
              <selectedStrategy.icon size={60} color={selectedStrategy.color} />
              <Typography variant="h5" className="mt-3 font-bold" sx={{ color: selectedStrategy.color }}>
                {selectedStrategy.name}
              </Typography>
              <Box className="mt-4 p-4 bg-gray-100 border-l-4 border-gray-400 italic text-gray-700 rounded-lg">
                <Typography variant="body1">
                  {selectedStrategy.description}
                </Typography>
              </Box>
              <Box className="mt-4">
                <CardMedia component="iframe" height="200" src={selectedStrategy.video} title="Strategy Video" className="rounded-lg" />
              </Box>
            </Card>
          </motion.div>
        </Grid>
      </Grid>
    </motion.div>
  );
};

export default InteractiveWheel;