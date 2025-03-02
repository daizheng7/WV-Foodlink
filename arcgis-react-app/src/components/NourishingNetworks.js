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
        px: 4,
        py: 6,
      }}
    >
      {/* Title Section */}
      <Box sx={{ width: "100%", maxWidth: "900px", mb: 4 }}>
        <Typography
          variant="h2"
          component="h1"
          gutterBottom
          sx={{
            fontWeight: "bold",
            letterSpacing: "1px",
            marginBottom: "10px",
          }}
        >
          Nourishing Networks: Organizing for Food Security
        </Typography>
      </Box>

      {/* Main Layout: Video Left, PDFs Right */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", lg: "row" },
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          maxWidth: "1200px",
          gap: 4,
        }}
      >
        {/* Left Side - Large Video */}
        <Box
          component={motion.div}
          whileHover={{ scale: 1.02 }}
          sx={{
            position: "relative",
            width: { xs: "100%", lg: "75%" },
            height: { xs: "50vh", lg: "70vh" },
            borderRadius: 2,
            overflow: "hidden",
            boxShadow: 3,
            border: "4px solid #ddd",
          }}
        >
          {/* Play Button Overlay (Non-Blocking) */}
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              backgroundColor: "rgba(255,255,255,0.6)",
              borderRadius: "50%",
              width: 80,
              height: 80,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: 2,
              zIndex: 5,
            }}
          >
            <PlayArrow sx={{ fontSize: 50, color: "#333" }} />
          </Box>

          {/* Embedded YouTube Video */}
          <iframe
            style={{
              width: "100%",
              height: "100%",
              borderRadius: "8px",
            }}
            src="https://www.youtube.com/embed/foHN0Vxqpz4?start=33"
            title="Nourishing Networks Organizing Process"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </Box>

        {/* Right Side - PDF Previews */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 3,
            width: { xs: "100%", lg: "25%" },
          }}
        >
          <Typography variant="h5" fontWeight="bold">
            Explore Resources
          </Typography>

          {/* PDF 1 */}
          <Paper
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
              p: 3,
              width: "100%",
              maxWidth: "280px",
              backgroundColor: "#f5f5f5",
              borderRadius: 2,
              boxShadow: 3,
              textDecoration: "none",
              color: "#333",
              "&:hover": { backgroundColor: "#e0e0e0" },
            }}
          >
            <PictureAsPdf sx={{ fontSize: 50, color: "#d32f2f", mb: 1 }} />
            <Typography variant="h6" fontWeight="bold">
              Download PDF 1
            </Typography>
            {hovered && (
              <Typography variant="body2" sx={{ opacity: 0.75 }}>
                Click to view
              </Typography>
            )}
          </Paper>

          {/* PDF 2 */}
          <Paper
            component={motion.a}
            href="https://foodlink.wvu.edu/documents/ab5abfa8d5ad452bbfe477da81d06b6f"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              p: 3,
              width: "100%",
              maxWidth: "280px",
              backgroundColor: "#f5f5f5",
              borderRadius: 2,
              boxShadow: 3,
              textDecoration: "none",
              color: "#333",
              "&:hover": { backgroundColor: "#e0e0e0" },
            }}
          >
            <PictureAsPdf sx={{ fontSize: 50, color: "#d32f2f", mb: 1 }} />
            <Typography variant="h6" fontWeight="bold">
              Download PDF 2
            </Typography>
          </Paper>

          {/* View More PDFs Button */}
          <Button
            variant="contained"
            color="primary"
            href="https://foodlink.wvu.edu/documents/"
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mt: 2,
              px: 3,
              py: 1.5,
              borderRadius: 2,
              fontWeight: "bold",
            }}
          >
            <ExpandMore sx={{ mr: 1 }} />
            View More PDFs
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default NourishingNetworks;
