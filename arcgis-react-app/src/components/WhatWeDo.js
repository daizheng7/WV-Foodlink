import React from "react";
import { Grid, Typography, Box } from "@mui/material";
import { motion } from "framer-motion";
import SearchIcon from "@mui/icons-material/Search";
import LayersIcon from "@mui/icons-material/Layers";
import GroupIcon from "@mui/icons-material/Group";
import FilterAltIcon from "@mui/icons-material/FilterAlt";

const categories = [
  {
    title: "Find Food",
    description: "Explore food assistance.",
    gradient: "linear-gradient(135deg, #8B0000, #8B0000)",
    icon: <SearchIcon />,
    url: "https://foodlink-map.vercel.app/",
  },
  {
    title: "Food Atlas",
    description: "Explore data.",
    gradient: "linear-gradient(135deg, #354F5B, #354F5B)",
    icon: <LayersIcon />,
    url: "https://foodlink.wvu.edu/pages/wv-food-environment-atlas",
  },
  {
    title: "Organize",
    description: "Organize for food security.",
    gradient: "linear-gradient(135deg, #C84C23, #C84C23)",
    icon: <GroupIcon />,
    url: "https://foodlink.wvu.edu/pages/organize",
  },
  {
    title: "Resources",
    description: "Review food system maps.",
    gradient: "linear-gradient(135deg, #39897E, #39897E)",
    icon: <FilterAltIcon />,
    url: "https://foodlink.wvu.edu/pages/planning-resources",
  },
];

const cardVariants = {
  initial: { opacity: 0, y: 50 },
  animate: (index) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: index * 0.2,
      type: "spring",
      stiffness: 300,
    },
  }),
  hover: {
    scale: 1.1,
    rotate: 2,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 10,
    },
  },
};

const iconVariants = {
  hover: {
    scale: 1.2,
    rotate: 10,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 10,
    },
  },
};

const WhatWeDo = () => {
  return (
    <Box sx={{ py: 6, px: 4, backgroundColor: "#f5f5f5" }}>
      <Typography
        variant="h3"
        align="center"
        gutterBottom
        sx={{
          fontWeight: "bold",
          color: "#333",
          mb: 4,
          textShadow: "1px 1px 2px rgba(0, 0, 0, 0.2)",
        }}
      >
        WV FOODLINK is dedicated to improving access to affordable, nutritious, sustainable, and culturally appropriate food in West Virginia and beyond.
      </Typography>
      <Grid container spacing={4} justifyContent="center">
        {categories.map((category, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <motion.div
              variants={cardVariants}
              initial="initial"
              animate="animate"
              whileHover="hover"
              custom={index}
              style={{
                background: category.gradient,
                borderRadius: "20px",
                color: "white",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                padding: "30px",
                height: "250px",
                boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
                position: "relative",
                cursor: "pointer",
                overflow: "hidden",
              }}
              onClick={() => window.open(category.url, "_blank")}
            >
              {/* Icon with animation */}
              <motion.div
                variants={iconVariants}
                style={{
                  fontSize: "3rem",
                  marginBottom: "20px",
                }}
              >
                {category.icon}
              </motion.div>
              {/* Title */}
              <Typography
                variant="h5"
                gutterBottom
                sx={{
                  fontWeight: "bold",
                  textShadow: "1px 1px 2px rgba(0, 0, 0, 0.3)",
                }}
              >
                {category.title}
              </Typography>
              {/* Description */}
              <Typography
                variant="body1"
                sx={{
                  textAlign: "center",
                  px: 1,
                  fontSize: "0.95rem",
                }}
              >
                {category.description}
              </Typography>
              {/* Glow effect */}
              <Box
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  width: "300%",
                  height: "300%",
                  background: "radial-gradient(circle, rgba(255,255,255,0.3), transparent)",
                  transform: "translate(-50%, -50%)",
                  filter: "blur(80px)",
                  zIndex: 0,
                }}
              />
            </motion.div>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default WhatWeDo;
