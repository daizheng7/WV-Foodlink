import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Box } from "@mui/material";
import MenuBar from "./components/MenuBar"; // Ensure the path is correct
import HomePage from "./pages/HomePage"; // Ensure the path is correct
import Food from "./pages/Food"; // Ensure the path is correct
import About from "./pages/About";
import County from "./pages/County";
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
          <Route path="/food" element={<Food />} />
          <Route path = "/about" element = {<About />} />
          <Route path = "/county" element = {<County />} />
        </Routes>
      </Box>
    </Router>
  );
};

export default App;
