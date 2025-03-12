import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Box } from "@mui/material";
import MenuBar from "./components/MenuBar"; // Ensure the path is correct
import HomePage from "./pages/HomePage"; // Ensure the path is correct
import Assistance from "./pages/Assistance"; // Ensure the path is correct
import About from "./pages/About";
import County from "./pages/County";
import CharitiesPage from "./pages/Charities";
import FoodPage from "./pages/Food";
import Footer from "./components/Footer";
const App = () => {
  return (
    <Router>
      {/* Navigation Menu */}
      <MenuBar />

      {/* Main Content Area */}
      <Box sx={{ marginTop: "80px", padding: 2 }}>
        <Routes>
          {/* Define Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/assistance" element={<Assistance />} />
          <Route path = "/about" element = {<About />} />
          <Route path = "/county" element = {<County />} />
          <Route path="/charities" element={<CharitiesPage />} />
          <Route path="/food" element={<FoodPage />} />
        </Routes>
      </Box>
      <Footer />
    </Router>
  );
};

export default App;
