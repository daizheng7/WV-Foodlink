import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Box } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import MenuBar from "./components/layout/MenuBar";
import Footer from "./components/layout/Footer";

import HomePage from "./pages/HomePage";
import Assistance from "./pages/Assistance";
import About from "./pages/About";
import County from "./pages/County";
import CharitiesPage from "./pages/Charities";
import FoodPage from "./pages/Food";

const theme = createTheme({
  palette: {
    primary: {
      main: "#002855",
      contrastText: "#ffffff"
    }
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          color: "white",
          textTransform: "none",
          fontSize: "16px",
          '&:hover': {
            color: "#002854",
            backgroundColor: "transparent"
          }
        }
      }
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          color: "white",
          '&:hover': {
            color: "#f0f0f0",
            backgroundColor: "#003366"
          }
        }
      }
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          color: "white",
          '&:hover': {
            color: "#f0f0f0",
            backgroundColor: "#003366"
          }
        }
      }
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          '&[component="a"]': {
            color: "white",
            textDecoration: "none",
            '&:hover': {
              color: "#f0f0f0",
              backgroundColor: "#003366",
              textDecoration: "underline"
            }
          }
        }
      }
    }
  }
});

const AppContent = () => {
  return (
    <Box sx={{ position: "relative", zIndex: 10 }}>
      <MenuBar />

      <main id="main-content" tabIndex={-1}>
        <Box>
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

      <Footer />
    </Box>
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
