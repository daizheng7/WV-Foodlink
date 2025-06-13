import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Info, MapPin, Filter, HelpCircle } from 'lucide-react';
import AssistanceMap from '../components/AssistanceMap';

import esriConfig from '@arcgis/core/config';
import {
  Box,
  Typography,
  Tooltip,
  IconButton,
  useTheme,
  useMediaQuery,
  Modal,
  Paper,
} from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import CloseIcon from '@mui/icons-material/Close';
import QuickAccessSection from '../components/QuickAccessSection';


const assistanceResourceLayers = [
  { id: '6cabc6993a8f44f9aadd1d884cf9cf84', title: 'DHHR Offices', color: 'bg-blue-500', icon: MapPin, description: 'Department of Health and Human Resources support services' },
  { id: '37ec841dae7e46278d111f26a98b83cb', title: 'WIC Offices', color: 'bg-green-500', icon: HelpCircle, description: 'Women, Infants, and Children nutritional support' },
  { id: 'fe5b84fd9977470ea0a56be091175356', title: 'Family Resource Network', color: 'bg-yellow-500', icon: Filter, description: 'Community support and family assistance programs' },
  { id: '37fdc5c991f2443e9e30afc80745d00e', title: 'Family Support Centers', color: 'bg-orange-500', icon: Info, description: 'Comprehensive family support and counseling services' },
  { id: '548531449ba2479aba6da213908e965f', title: 'Senior Services', color: 'bg-purple-500', icon: MapPin, description: 'Support and resources for senior citizens' }
];

const AssistancePage = () => {
  const theme = useTheme();
  const isMobileView = useMediaQuery(theme.breakpoints.down('md'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));

  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedArea, setSelectedArea] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const resourcesRef = useRef(null);

  useEffect(() => {
    esriConfig.apiKey = process.env.REACT_APP_ARCGIS_API_KEY;
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    if (isMobileView) resourcesRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleAreaSelect = (geometry) => {
    setSelectedArea(geometry);
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="min-h-screen bg-gray-50 flex flex-col pb-20">
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8 grid md:grid-cols-2 gap-8">
        {/* MAP */}
        <motion.div initial={{ x: -50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.2 }} className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col">
          <Box sx={{ padding: isMobileView ? 2 : 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h1" sx={{ color: '#002855', fontSize: isMobileView ? '2rem' : isTablet ? '2.7rem' : '3.2rem', fontWeight: 700 }}>
              Assistance Resources
            </Typography>
            <Tooltip title="Information about assistance resources">
              <IconButton onClick={() => setOpenModal(true)} aria-label="info" sx={{ backgroundColor: 'rgba(0, 40, 85, 0.1)', '&:hover': { backgroundColor: 'rgba(0, 40, 85, 0.2)' } }}>
                <InfoIcon sx={{ fontSize: isMobileView ? 28 : 36, color: '#002855' }} />
              </IconButton>
            </Tooltip>
          </Box>
          <Typography variant="body1" color="text.secondary" sx={{ px: isMobileView ? 2 : 3, mb: 2 }}>
            Use the map to explore DHHR, WIC, senior, and family support services in your area.
          </Typography>
          <div className="h-96 flex-grow">
            {isLoading ? (
              <div className="flex items-center justify-center h-full">
                <div className="animate-spin h-8 w-8 border-4 border-[#002855] border-t-transparent rounded-full" />
              </div>
            ) : (
              <AssistanceMap onCategorySelect={handleCategorySelect} onAreaSelect={handleAreaSelect} />
            )}
          </div>
        </motion.div>
          <Box>
            <QuickAccessSection/>
          </Box>
      </main>

      {/* MODAL */}
      <Modal open={openModal} onClose={() => setOpenModal(false)} aria-labelledby="info-modal-title" aria-describedby="info-modal-description">
        <Paper sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: isMobileView ? '90%' : 600,
          maxHeight: '90vh',
          overflowY: 'auto',
          p: 4,
          borderRadius: 2,
          outline: 'none',
        }}>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <Typography variant="h5" id="info-modal-title" sx={{ fontWeight: 700, color: '#002855' }}>
              About Assistance Resources
            </Typography>
            <IconButton onClick={() => setOpenModal(false)} aria-label="close modal">
              <CloseIcon />
            </IconButton>
          </Box>

          <Typography id="info-modal-description" sx={{ mb: 2 }}>
            This interactive map helps you find resources across West Virginia. Use filters to explore support categories.
          </Typography>

          <Box sx={{ pl: 2 }}>
            {assistanceResourceLayers.map((layer) => (
              <Box key={layer.id} sx={{ display: 'flex', alignItems: 'flex-start', mb: 1 }}>
                <span className={`inline-block w-3 h-3 mt-1.5 rounded-full ${layer.color} mr-2`} />
                <Typography variant="body2"><strong>{layer.title}:</strong> {layer.description}</Typography>
              </Box>
            ))}
          </Box>

          <Box mt={3} display="flex" justifyContent="flex-end">
            <button
  onClick={() => setOpenModal(false)}
  className="px-5 py-2 text-white rounded transition"
  style={{ backgroundColor: '#002855', color: 'white', important: true }}
>
  Got it
</button>
          </Box>
        </Paper>
      </Modal>
    </motion.div>
  );
};


export default AssistancePage;
