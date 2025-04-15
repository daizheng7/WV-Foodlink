import { useState } from "react";
import { Box, Typography, Paper, Button } from "@mui/material";
import { motion } from "framer-motion";
import { PlayArrow, PictureAsPdf, ExpandMore } from "@mui/icons-material";

const NourishingNetworks = () => {
  const [hovered, setHovered] = useState(false);

  return (
    <Box
      component={motion.section}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        minHeight: "100vh",
        width: "100%",
        px: { xs: 2, sm: 3 },
        py: { xs: 2, sm: 3 },
      }}
    >
      {/* Title Section */}
      <Box sx={{ width: "100%", maxWidth: "900px", mb: 2 }}>
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          sx={{ fontWeight: "bold", letterSpacing: "1px" }}
        >
          Nourishing Networks: Organizing for Food Security
        </Typography>
      </Box>

      {/* Main Layout: Video and PDFs */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          maxWidth: "1200px",
          gap: 2,
        }}
      >
        {/* Video Section */}
        <Box
          component={motion.div}
          whileHover={{ scale: 1.02 }}
          sx={{
            position: "relative",
            width: { xs: "100%", md: "70%" },
            height: { xs: "35vh", sm: "45vh", md: "55vh" },
            borderRadius: 2,
            overflow: "hidden",
            boxShadow: 2,
            border: "2px solid #ddd",
          }}
        >
          {/* Play Button Overlay */}
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              backgroundColor: "rgba(255,255,255,0.6)",
              borderRadius: "50%",
              width: 50,
              height: 50,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: 1,
              zIndex: 5,
            }}
          >
            <PlayArrow sx={{ fontSize: 35, color: "#333" }} />
          </Box>

          {/* Embedded YouTube Video */}
          <iframe
            style={{ width: "100%", height: "100%", borderRadius: "8px" }}
            src="https://www.youtube.com/embed/foHN0Vxqpz4?start=33"
            title="Nourishing Networks Organizing Process"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </Box>

        {/* PDF Resources Section */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 2,
            width: { xs: "100%", md: "30%" },
          }}
        >
          <Typography variant="h6" fontWeight="bold">
            Explore Resources
          </Typography>

          {/* PDF Links */}
          {[1, 2].map((index) => (
            <Paper
              key={index}
              component={motion.a}
              href="https://foodlink.wvu.edu/documents/ab5abfa8d5ad452bbfe477da81d06b6f"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                p: 2,
                width: "100%",
                maxWidth: "240px",
                backgroundColor: "#f5f5f5",
                borderRadius: 2,
                boxShadow: 2,
                textDecoration: "none",
                color: "#333",
                "&:hover": { backgroundColor: "#e0e0e0" },
              }}
            >
              <PictureAsPdf sx={{ fontSize: 35, color: "#d32f2f", mb: 1 }} />
              <Typography variant="body1" fontWeight="bold">
                Download PDF {index}
              </Typography>
              {hovered && (
                <Typography variant="body2" sx={{ opacity: 0.75 }}>
                  Click to view
                </Typography>
              )}
            </Paper>
          ))}

          {/* View More PDFs Button */}
          <Button
            variant="contained"
            color="#002855"
            href="https://foodlink.wvu.edu/documents/"
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mt: 1,
              px: 3,
              py: 1.2,
              borderRadius: 2,
              fontWeight: "bold",
            }}
          >
            <ExpandMore sx={{ mr: 1 }} />
            View More Resources
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default NourishingNetworks;
