import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Info, MapPin, Filter, HelpCircle, ChevronDown } from 'lucide-react';
import FoodResourcesPanel from '../components/FoodResourcePanel';
import AssistanceMap from '../components/AssistanceMap';
import esriConfig from "@arcgis/core/config";
import { Box, Typography, Tooltip, IconButton, useTheme, useMediaQuery } from '@mui/material';
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
  const theme = useTheme();
  const isMobileView = useMediaQuery(theme.breakpoints.down('md'));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));
  
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
  
  // Function to handle opening modal
  const handleOpenModal = () => {
    setOpenModal(true);
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
          <Box 
            sx={{
              padding: isMobileView ? 2 : 3,
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
              boxSizing: "border-box"
            }}
          >
            <Typography 
              variant="h1" 
              component="h1" 
              sx={{ 
                color: "#002855",
                fontSize: isMobileView ? "2.2rem" : isTablet ? "2.7rem" : "3.2rem",
                lineHeight: 1.2,
                fontWeight: 700,
                flexGrow: 1,
                pr: 2
              }}
            >
              Assistance Resources
            </Typography>
            <Tooltip title="Information about assistance resources">
              <IconButton 
                onClick={handleOpenModal}
                aria-label="information about assistance resources"
                size={isMobileView ? "medium" : "large"}
                sx={{ 
                  backgroundColor: "rgba(153, 3, 30, 0.1)",
                  padding: isMobileView ? 1 : 1.5,
                  flexShrink: 0,
                  '&:hover': {
                    backgroundColor: "rgba(153, 3, 30, 0.2)"
                  }
                }}
              >
                <InfoIcon sx={{ 
                  fontSize: isMobileView ? 28 : 36, 
                  color: "#002855" 
                }} />
              </IconButton>
            </Tooltip>
          </Box>
          <Typography 
            variant="body1" 
            color="text.secondary" 
            sx={{ 
              px: isMobileView ? 2 : 3, 
              mb: 2 
            }}
          >
            Find DHHR offices, WIC services, family resources, and senior resources in your area by using the interactive map or filtering by category.
          </Typography>
          <div className="h-96 flex-grow">
            {isLoading ? (
              <div className="flex items-center justify-center h-full">
                <p className="text-gray-500">Loading map...</p>
              </div>
            ) : (
              <AssistanceMap
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
      
      {/* Preserve AnimatePresence for potential modal or popup animations */}
      <AnimatePresence>
        {openModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
            onClick={() => setOpenModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="bg-white rounded-lg p-6 max-w-md mx-4 max-h-[90vh] overflow-y-auto"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-[#002855]">About Assistance Resources</h2>
                <button
                  onClick={() => setOpenModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="mb-4">
                <p className="text-gray-700 mb-3">This tool helps you locate assistance resources throughout West Virginia. The map displays various types of support services:</p>
                <ul className="space-y-2 mb-4">
                  {assistanceResourceLayers.map((layer) => (
                    <li key={layer.id} className="flex items-center">
                      <span className={`inline-block w-3 h-3 rounded-full ${layer.color} mr-2`}></span>
                      <span className="font-medium">{layer.title}:</span> 
                      <span className="ml-1 text-gray-600">{layer.description}</span>
                    </li>
                  ))}
                </ul>
                <p className="text-gray-700">Click on any map marker to view detailed information including hours of operation, contact information, and available services.</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default AssistancePage;