import React, { useState, useEffect, useRef } from "react";
import { motion, useAnimation, AnimatePresence } from "framer-motion";
import { 
  Users, 
  DollarSign, 
  MapPin, 
  BookOpen, 
  AlertCircle, 
  ShoppingCart, 
  HandHelping, 
  Building, 
  Factory, 
  Home,
  ChevronRight
} from "lucide-react";
import { 
  Card, 
  CardContent, 
  CardMedia, 
  Typography, 
  IconButton, 
  Grid, 
  Box, 
  Paper,
  Divider,
  Tooltip,
  Container,
  Button
} from "@mui/material";

// Data Arrays
const barriers = [
  { 
    id: "crisis", 
    name: "Crisis", 
    icon: AlertCircle, 
    color: "#0062A3", 
    video: "https://www.youtube.com/embed/qO0RVbK7DHs", 
    description: "Refers to disasters, unemployment, health issues, or death that can undermine food access for an individual, household, or community." 
  },
  { 
    id: "income", 
    name: "Income", 
    icon: DollarSign, 
    color: "#002855", 
    video: "https://www.youtube.com/embed/v8ePPIownaI", 
    description: "The effect of someone's wages or assets, costs of food, debts, and time constraints on accessing food." 
  },
  { 
    id: "identity", 
    name: "Identity", 
    icon: Users, 
    color: "#1C2B39", 
    video: "https://www.youtube.com/embed/OdMCPrPn5qo", 
    description: "How gender, race, disability, sexuality, nationality, or age affects access to food." 
  },
  { 
    id: "location", 
    name: "Location", 
    icon: MapPin, 
    color: "#554741", 
    video: "https://www.youtube.com/embed/AynwUOw45vo", 
    description: "Proximity to healthy food outlets, food availability, and the ability to grow food." 
  },
  { 
    id: "knowledge", 
    name: "Knowledge", 
    icon: BookOpen, 
    color: "#7F6310", 
    video: "https://www.youtube.com/embed/UGilgNGvNd0", 
    description: "Access to education and information about food resources." 
  },
];

const strategies = [
  { 
    id: "state", 
    name: "State", 
    icon: Building, 
    color: "#0062A3", 
    video: "https://www.youtube.com/embed/lYZBG4BTd0E", 
    description: "Government programs like SNAP, WIC, and school programs that provide direct subsidies for food." 
  },
  { 
    id: "charity", 
    name: "Charity", 
    icon: HandHelping, 
    color: "#002855", 
    video: "https://www.youtube.com/embed/WsJb8ZYxRAs", 
    description: "Food banks, pantries, and soup kitchens funded by donations." 
  },
  { 
    id: "market", 
    name: "Market", 
    icon: ShoppingCart, 
    color: "#1C2B39", 
    video: "https://www.youtube.com/embed/GSf_odoe4kg", 
    description: "Grocery stores, convenience stores, and restaurants where food is exchanged for money." 
  },
  { 
    id: "selfprovision", 
    name: "Self-Provisioning", 
    icon: Home, 
    color: "#554741", 
    video: "https://www.youtube.com/embed/XcDbcUslsNg", 
    description: "Hunting, foraging, fishing, or growing food independently." 
  },
  { 
    id: "farming", 
    name: "Farming", 
    icon: Factory, 
    color: "#7F6310", 
    video: "https://www.youtube.com/embed/WmgW6TPL9hI", 
    description: "Grower-based initiatives to sell produce through farmers' markets and other mechanisms." 
  },
];

// Animations
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const DetailCard = ({ item }) => (
  <motion.div
    key={item.id}
    initial="hidden"
    animate="visible"
    exit="hidden"
    variants={fadeInUp}
    transition={{ duration: 0.4 }}
    layout
  >
    <Card sx={{ 
      mt: 3, 
      p: 3, 
      borderRadius: 3, 
      boxShadow: '0 8px 24px rgba(0,0,0,0.12)', 
      borderTop: `4px solid ${item.color}`,
      height: '100%',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <Box sx={{ 
          backgroundColor: `${item.color}15`, 
          p: 1.5, 
          borderRadius: '50%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          mr: 2
        }}>
          <item.icon size={32} color={item.color} />
        </Box>
        <Typography variant="h5" sx={{ fontWeight: 600, color: item.color }}>
          {item.name}
        </Typography>
      </Box>
      
      <Typography variant="body1" sx={{ mb: 3, color: 'text.secondary', lineHeight: 1.6 }}>
        {item.description}
      </Typography>
      
      <Box sx={{ mt: 'auto', aspectRatio: "16/9", width: "100%", borderRadius: 2, overflow: 'hidden', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}>
        <CardMedia 
          component="iframe" 
          src={item.video} 
          title={`${item.name} Video`} 
          sx={{ border: 0, height: '100%', width: '100%' }}
        />
      </Box>
    </Card>
  </motion.div>
);

const SelectionButton = ({ item, isSelected, onClick }) => (
  <Tooltip title={item.description} placement="right" arrow>
    <Button
      fullWidth
      variant="text"
      onClick={() => onClick(item)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick(item);
        }
      }}
      sx={{ 
        p: 1.5, 
        mb: 1.5, 
        borderRadius: 2,
        textAlign: 'left',
        justifyContent: 'flex-start',
        transition: 'all 0.2s ease',
        borderLeft: isSelected ? `4px solid ${item.color}` : '4px solid transparent',
        backgroundColor: isSelected ? `${item.color}10` : 'white',
        boxShadow: isSelected ? '0 2px 8px rgba(0,0,0,0.12)' : '0 1px 3px rgba(0,0,0,0.08)',
        textTransform: 'none',
        '&:hover': {
          backgroundColor: `${item.color}15`,
          transform: 'translateX(5px)',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
        },
        '&:focus': {
          outline: '2px solid #005fcc',
          outlineOffset: '2px',
          backgroundColor: `${item.color}15`
        }
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <item.icon size={24} color={item.color} style={{ marginRight: 12 }} />
          <Typography variant="subtitle1" sx={{ fontWeight: isSelected ? 600 : 400, color: 'text.primary' }}>
            {item.name}
          </Typography>
        </Box>
        {isSelected && <ChevronRight size={16} color={item.color} />}
      </Box>
    </Button>
  </Tooltip>
);

const InteractiveWheel = () => {
  const [selectedBarrier, setSelectedBarrier] = useState(barriers[0]);
  const [selectedStrategy, setSelectedStrategy] = useState(strategies[0]);
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.2 }
    );
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  // Keyboard navigation handlers
  const handleBarrierKeyDown = (e, currentIndex) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      const nextIndex = (currentIndex + 1) % barriers.length;
      setSelectedBarrier(barriers[nextIndex]);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const prevIndex = (currentIndex - 1 + barriers.length) % barriers.length;
      setSelectedBarrier(barriers[prevIndex]);
    }
  };

  const handleStrategyKeyDown = (e, currentIndex) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      const nextIndex = (currentIndex + 1) % strategies.length;
      setSelectedStrategy(strategies[nextIndex]);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const prevIndex = (currentIndex - 1 + strategies.length) % strategies.length;
      setSelectedStrategy(strategies[prevIndex]);
    }
  };

  return (
    <Container maxWidth="xl" sx={{ py: 6 }}>
      <motion.div 
        ref={sectionRef}
        className="interactive-wheel"
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={{
          visible: { opacity: 1 },
          hidden: { opacity: 0 }
        }}
        transition={{ duration: 0.6 }}
      >
        
        
        <Grid container spacing={4}>
          {/* Left Column - Barriers */}
          <Grid item xs={12} md={6}>
            <motion.div
              variants={fadeInUp}
              transition={{ delay: 0.1 }}
            >
              <Paper sx={{ p: 3, borderRadius: 3, mb: 3, boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
                <Typography variant="h5" sx={{ fontWeight: 600, mb: 2, display: 'flex', alignItems: 'center' }}>
                  <AlertCircle size={24} style={{ marginRight: 8 }} />
                  Barriers to Food Access
                </Typography>
                <Divider sx={{ mb: 2 }} />
                
                <Box 
                  role="group" 
                  aria-label="Barriers to Food Access"
                  onKeyDown={(e) => {
                    const currentIndex = barriers.findIndex(b => b.id === selectedBarrier.id);
                    handleBarrierKeyDown(e, currentIndex);
                  }}
                >
                  {barriers.map((barrier, index) => (
                    <Box key={barrier.id} onKeyDown={(e) => handleBarrierKeyDown(e, index)}>
                      <SelectionButton 
                        item={barrier}
                        isSelected={selectedBarrier.id === barrier.id}
                        onClick={setSelectedBarrier}
                      />
                    </Box>
                  ))}
                </Box>
              </Paper>

              {/* Selected Barrier Detail */}
              <AnimatePresence mode="wait">
                <DetailCard item={selectedBarrier} />
              </AnimatePresence>
            </motion.div>
          </Grid>
          
          {/* Right Column - Strategies */}
          <Grid item xs={12} md={6}>
            <motion.div
              variants={fadeInUp}
              transition={{ delay: 0.3 }}
            >
              <Paper sx={{ p: 3, borderRadius: 3, mb: 3, boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
                <Typography variant="h5" sx={{ fontWeight: 600, mb: 2, display: 'flex', alignItems: 'center' }}>
                  <HandHelping size={24} style={{ marginRight: 8 }} />
                  Strategies for Improvement
                </Typography>
                <Divider sx={{ mb: 2 }} />
                
                <Box 
                  role="group" 
                  aria-label="Strategies for Improvement"
                  onKeyDown={(e) => {
                    const currentIndex = strategies.findIndex(s => s.id === selectedStrategy.id);
                    handleStrategyKeyDown(e, currentIndex);
                  }}
                >
                  {strategies.map((strategy, index) => (
                    <Box key={strategy.id} onKeyDown={(e) => handleStrategyKeyDown(e, index)}>
                      <SelectionButton 
                        item={strategy}
                        isSelected={selectedStrategy.id === strategy.id}
                        onClick={setSelectedStrategy}
                      />
                    </Box>
                  ))}
                </Box>
              </Paper>

              {/* Selected Strategy Detail */}
              <AnimatePresence mode="wait">
                <DetailCard item={selectedStrategy} />
              </AnimatePresence>
            </motion.div>
          </Grid>
        </Grid>
      </motion.div>
    </Container>
  );
};

export default InteractiveWheel;