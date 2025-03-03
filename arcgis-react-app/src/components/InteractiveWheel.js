import React, { useState, useEffect, useRef } from "react";
import { motion, useAnimation } from "framer-motion";
import { Users, DollarSign, MapPin, BookOpen, AlertCircle, ShoppingCart, HandHelping, Building, Factory, Home } from "lucide-react";
import { Card, CardContent, CardMedia, Typography, IconButton, Grid, Box, Paper } from "@mui/material";

// Data Arrays
const barriers = [
    { name: "Crisis", icon: AlertCircle, color: "#D32F2F", video: "https://www.youtube.com/embed/qO0RVbK7DHs", description: "Refers to disasters, unemployment, health issues, or death that can undermine food access for an individual, household, or community." },
    { name: "Income", icon: DollarSign, color: "#FFA000", video: "https://www.youtube.com/embed/v8ePPIownaI", description: "The effect of someone’s wages or assets, costs of food, debts, and time constraints on accessing food." },
    { name: "Identity", icon: Users, color: "#1976D2", video: "https://www.youtube.com/embed/OdMCPrPn5qo", description: "How gender, race, disability, sexuality, nationality, or age affects access to food." },
    { name: "Location", icon: MapPin, color: "#388E3C", video: "https://www.youtube.com/embed/AynwUOw45vo", description: "Proximity to healthy food outlets, food availability, and the ability to grow food." },
    { name: "Knowledge", icon: BookOpen, color: "#7B1FA2", video: "https://www.youtube.com/embed/UGilgNGvNd0", description: "Access to education and information about food resources." },
];

const strategies = [
    { name: "State", icon: Building, color: "#455A64", video: "https://www.youtube.com/embed/lYZBG4BTd0E", description: "Government programs like SNAP, WIC, and school programs that provide direct subsidies for food." },
    { name: "Charity", icon: HandHelping, color: "#8E24AA", video: "https://www.youtube.com/embed/WsJb8ZYxRAs", description: "Food banks, pantries, and soup kitchens funded by donations." },
    { name: "Market", icon: ShoppingCart, color: "#F57C00", video: "https://www.youtube.com/embed/GSf_odoe4kg", description: "Grocery stores, convenience stores, and restaurants where food is exchanged for money." },
    { name: "Self-Provisioning", icon: Home, color: "#5D4037", video: "https://www.youtube.com/embed/XcDbcUslsNg", description: "Hunting, foraging, fishing, or growing food independently." },
    { name: "Farming", icon: Factory, color: "#2E7D32", video: "https://www.youtube.com/embed/WmgW6TPL9hI", description: "Grower-based initiatives to sell produce through farmers' markets and other mechanisms." },
];

const InteractiveWheel = () => {
    const [selectedBarrier, setSelectedBarrier] = useState(barriers[0]);
    const [selectedStrategy, setSelectedStrategy] = useState(strategies[0]);
    const strategyRef = useRef(null);
    const strategyControls = useAnimation();

    // Scroll Animation for Strategy Section
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
            <Grid container spacing={4} className="w-full max-w-6xl text-center">
                <Grid item xs={12} sm={6}>
                    <Typography variant="h4" sx={{ fontWeight: "bold", color: "#000", mb: 2 }}>
                        Barriers
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Typography variant="h4" sx={{ fontWeight: "bold", color: "#000", mb: 2 }}>
                        Strategies
                    </Typography>
                </Grid>
            </Grid>

            {/* Content Section */}
            <Grid container spacing={4} className="w-full max-w-6xl">
                {/* Barriers Section */}
                <Grid item xs={12} sm={6}>
                    <Paper className="p-6 shadow-lg rounded-xl bg-white border">
                        <Box className="flex flex-col gap-4">
                            {barriers.map((barrier, index) => (
                                <IconButton
                                    key={index}
                                    onClick={() => setSelectedBarrier(barrier)}
                                    className="flex items-center gap-4 p-4 rounded-lg hover:shadow-md transition"
                                    sx={{ width: "100%" }}
                                >
                                    <barrier.icon size={40} color={barrier.color} />
                                    <Typography variant="h6">{barrier.name}</Typography>
                                </IconButton>
                            ))}
                        </Box>
                    </Paper>

                    {/* Selected Barrier Info */}
                    <Card className="mt-6 w-full shadow-lg rounded-xl p-6 text-center">
                        <selectedBarrier.icon size={60} color={selectedBarrier.color} />
                        <Typography variant="h5" sx={{ color: selectedBarrier.color, mt: 2 }}>
                            {selectedBarrier.name}
                        </Typography>
                        <Typography variant="body1" sx={{ mt: 2, px: 2 }}>
                            {selectedBarrier.description}
                        </Typography>
                        <Box sx={{ mt: 3, aspectRatio: "16/9", width: "100%" }}>
                            <CardMedia component="iframe" src={selectedBarrier.video} title="Barrier Video" className="rounded-lg" />
                        </Box>
                    </Card>
                </Grid>

                {/* Strategies Section */}
                <Grid item xs={12} sm={6}>
                    <motion.div ref={strategyRef} initial={{ opacity: 0, x: 30 }} animate={strategyControls} transition={{ duration: 0.8 }}>
                        <Paper className="p-6 shadow-lg rounded-xl bg-white border">
                            <Box className="flex flex-col gap-4">
                                {strategies.map((strategy, index) => (
                                    <IconButton
                                        key={index}
                                        onClick={() => setSelectedStrategy(strategy)}
                                        className="flex items-center gap-4 p-4 rounded-lg hover:shadow-md transition"
                                        sx={{ width: "100%" }}
                                    >
                                        <strategy.icon size={40} color={strategy.color} />
                                        <Typography variant="h6">{strategy.name}</Typography>
                                    </IconButton>
                                ))}
                            </Box>
                        </Paper>

                        {/* Selected Strategy Info */}
                        <Card className="mt-6 w-full shadow-lg rounded-xl p-6 text-center">
                            <selectedStrategy.icon size={60} color={selectedStrategy.color} />
                            <Typography variant="h5" sx={{ color: selectedStrategy.color, mt: 2 }}>
                                {selectedStrategy.name}
                            </Typography>
                            <Typography variant="body1" sx={{ mt: 2, px: 2 }}>
                                {selectedStrategy.description}
                            </Typography>
                            <Box sx={{ mt: 3, aspectRatio: "16/9", width: "100%" }}>
                                <CardMedia component="iframe" src={selectedStrategy.video} title="Strategy Video" className="rounded-lg" />
                            </Box>
                        </Card>
                    </motion.div>
                </Grid>
            </Grid>
        </motion.div>
    );
};

export default InteractiveWheel;
