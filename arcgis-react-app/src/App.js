import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { Box } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import MenuBar from "./components/layout/MenuBar";
import HomePage from "./pages/HomePage"; 
import Assistance from "./pages/Assistance";
import About from "./pages/About";
import County from "./pages/County";
import CharitiesPage from "./pages/Charities";
import FoodPage from "./pages/Food";
import Footer from "./components/layout/Footer"
import IntroOverlay from "./components/IntroOverlay"; // Import the IntroOverlay component

const theme = createTheme({
  palette: {
    primary: {
      main: "#002855",
      contrastText: "#ffffff"
    }
  },
  components: {
    MuiButton: { styleOverrides: { root: { color: "white", textTransform: "none", fontSize: "16px", '&:hover': { color: "#002854", backgroundColor: "transparent" } } } },
    MuiMenuItem: { styleOverrides: { root: { color: "white", '&:hover': { color: "#f0f0f0", backgroundColor: "#003366" } } } },
    MuiListItemButton: { styleOverrides: { root: { color: "white", '&:hover': { color: "#f0f0f0", backgroundColor: "#003366" } } } },
    MuiPaper: { styleOverrides: { root: { '&[component="a"]': { color: "white", textDecoration: "none", '&:hover': { color: "#f0f0f0", backgroundColor: "#003366", textDecoration: "underline" } } } } }
  }
});
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
        <main id="main-content" tabIndex={-1}>
  <Box sx={{ 
    
    padding: 2
  }}>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/assistance" element={<Assistance />} />
      <Route path="/about" element={<About />} />
      <Route path="/county" element={<County />} />
      <Route path="/charities" element={<CharitiesPage />} />
      <Route path="/food" element={<FoodPage />} />
    </Routes>
  </Box>
</main>
        
        {/* Footer */}
        <Footer />
      </Box>
    </>
  );
};

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <AppContent />
      </Router>
    </ThemeProvider>
  );
};

export default App;