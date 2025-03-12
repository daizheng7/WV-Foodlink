import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Info, MapPin, Filter, HelpCircle, ChevronDown } from 'lucide-react';
import FoodResourcesPanel from '../components/FoodResourcePanel';
import AssistanceMap from '../components/AssistanceMap';  // ✅ Ensure correct import
import esriConfig from "@arcgis/core/config";
import { Box, Typography, Tooltip, IconButton } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
// Assistance resource layer configurations
const assistanceResourceLayers = [
  {
    id: "6cabc6993a8f44f9aadd1d884cf9cf84",
    title: "DHHR Offices",
    color: "bg-blue-500",
    icon: MapPin,
    description: "Department of Health and Human Resources support services"
  },
  {
    id: "37ec841dae7e46278d111f26a98b83cb",
    title: "WIC Offices",
    color: "bg-green-500",
    icon: HelpCircle,
    description: "Women, Infants, and Children nutritional support"
  },
  {
    id: "fe5b84fd9977470ea0a56be091175356",
    title: "Family Resource Network",
    color: "bg-yellow-500",
    icon: Filter,
    description: "Community support and family assistance programs"
  },
  {
    id: "37fdc5c991f2443e9e30afc80745d00e",
    title: "Family Support Centers",
    color: "bg-orange-500",
    icon: Info,
    description: "Comprehensive family support and counseling services"
  },
  {
    id: "548531449ba2479aba6da213908e965f",
    title: "Senior Services",
    color: "bg-purple-500",
    icon: MapPin,
    description: "Support and resources for senior citizens"
  }
];

const AssistancePage = () => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedArea, setSelectedArea] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const resourcesRef = useRef(null);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Initialize ArcGIS configuration
  useEffect(() => {
    esriConfig.apiKey = process.env.REACT_APP_ARCGIS_API_KEY;
    
    // Simulate loading time for map
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  // Scroll to resources when category is selected
  const scrollToResources = () => {
    if (resourcesRef.current) {
      resourcesRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Handle category selection
  const handleCategorySelect = (category) => {
    console.log("Assistance category selected:", category);
    setSelectedCategory(category);
    
    // Mobile view: close menu and scroll to resources
    if (isMobile) {
      setShowMobileMenu(false);
      scrollToResources();
    }
  };

  // Handle area selection from map
  const handleAreaSelect = (geometry) => {
    setSelectedArea(geometry);
  };
 
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col"
    >
      {/* Main Content */}
<main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8 grid md:grid-cols-2 gap-8">
  {/* Map Section */}
  <motion.div
    initial={{ x: -50, opacity: 0 }}
    animate={{ x: 0, opacity: 1 }}
    transition={{ duration: 0.5, delay: 0.2 }}
    className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col"
  >
    <Box p={3}>
      <Typography variant="h1" component="h1" color="primary">
        Assistance Resources
      </Typography>
      <Tooltip title="Information about food resources">
        <IconButton  color="primary">
          <InfoIcon />
        </IconButton>
      </Tooltip>
    </Box>
    <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }} px={3}>
    Find DHHR offices, WIC services, family resources, and senior resources in your area by using the interactive map or filtering by category.
    </Typography>
    <div className="h-96 flex-grow">
      {isLoading ? (
        <div className="flex items-center justify-center h-full">
          <p className="text-gray-500">Loading map...</p>
        </div>
      ) : (
        <AssistanceMap  // ✅ Using AssistanceMap without redeclaring
          onCategorySelect={handleCategorySelect}
          onAreaSelect={handleAreaSelect}
        />
      )}
    </div>
  </motion.div>

        {/* Resources Panel */}
        <motion.div 
          ref={resourcesRef}
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col"
        >
          <FoodResourcesPanel 
            foodResourceLayers={assistanceResourceLayers}
            selectedCategory={selectedCategory}
            selectedArea={selectedArea}
            onCategorySelect={handleCategorySelect}
            isMobile={isMobile}
          />
        </motion.div>
      </main>
    </motion.div>
  );
};

export default AssistancePage;
