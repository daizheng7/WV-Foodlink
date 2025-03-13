import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { Box } from "@mui/material";
import MenuBar from "./components/MenuBar";
import HomePage from "./pages/HomePage"; 
import Assistance from "./pages/Assistance";
import About from "./pages/About";
import County from "./pages/County";
import CharitiesPage from "./pages/Charities";
import FoodPage from "./pages/Food";
import Footer from "./components/Footer";
import IntroOverlay from "./components/IntroOverlay"; // Import the IntroOverlay component

// Wrapper component to check if we're on the homepage
const AppContent = () => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const [hasScrolled, setHasScrolled] = useState(false);
  const [showContent, setShowContent] = useState(!isHomePage); // Show content immediately if not homepage
  
  // Handle scroll events only on homepage
  useEffect(() => {
    if (isHomePage) {
      const handleScroll = () => {
        if (window.scrollY > 300 && !hasScrolled) {
          setHasScrolled(true);
          // Delay showing content slightly to ensure smooth transition
          setTimeout(() => {
            setShowContent(true);
            // Ensure we're at the top
            window.scrollTo(0, 0);
          }, 300);
        }
      };
      
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, [isHomePage, hasScrolled]);

  // Handle explore button click in IntroOverlay
  const handleExploreClick = () => {
    setHasScrolled(true);
    setTimeout(() => {
      setShowContent(true);
      // Ensure we're at the top
      window.scrollTo(0, 0);
    }, 300);
  };

  return (
    <>
      {/* Show intro overlay only on homepage and when content shouldn't be shown */}
      {isHomePage && !showContent && 
        <IntroOverlay 
          hasScrolled={hasScrolled}
          onExploreClick={handleExploreClick}
        />
      }
      
      {/* Regular website content */}
      <Box
        sx={{
          // Always render the content but control visibility with opacity
          visibility: isHomePage && !showContent ? 'hidden' : 'visible',
          opacity: isHomePage && !showContent ? 0 : 1,
          transition: 'opacity 0.5s ease-in-out',
          position: 'relative',
          zIndex: isHomePage && !showContent ? 1 : 10, // Ensure content is above intro when visible
        }}
      >
        {/* Navigation Menu */}
        <MenuBar />

        {/* Main Content Area */}
        <Box sx={{ 
          marginTop: "80px", 
          padding: 2
        }}>
          <Routes>
            {/* Define Routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/assistance" element={<Assistance />} />
            <Route path="/about" element={<About />} />
            <Route path="/county" element={<County />} />
            <Route path="/charities" element={<CharitiesPage />} />
            <Route path="/food" element={<FoodPage />} />
          </Routes>
        </Box>
        
        {/* Footer */}
        <Footer />
      </Box>
    </>
  );
};

const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;