import React, { useRef, useEffect, useState } from "react";
import esriConfig from "@arcgis/core/config";
import Map from "@arcgis/core/Map";
import MapView from "@arcgis/core/views/MapView";
import Extent from "@arcgis/core/geometry/Extent";


import {
  AppBar,
  Box,
  Typography,
  CircularProgress,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Checkbox,
  Grid,
  Card,
  Modal,
  Backdrop,
  Fade,
  Button,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import LayersIcon from "@mui/icons-material/Layers";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import GroupIcon from "@mui/icons-material/Group";
import Partners from "../components/Partners";
import SummaryWV from "../components/SummaryWV";
import ArcGISMap from "../components/ArcGISMap";
import MapFood from "../components/MapFood";


const HomePage = () => {
  const mapDiv = useRef(null);
  const viewRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState({
    SNAP: false,
    FreshProduce: false,
    ConvenienceStores: false,
  });
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    esriConfig.apiKey = process.env.REACT_APP_ARCGIS_API_KEY;
  
    const map = new Map({
      basemap: "arcgis-light-gray", // Basemap
    });
  
    const view = new MapView({
      container: mapDiv.current,
      map: map,
      center: [0, 0],
      zoom: 2,
      ui: {
        components: ["zoom"], // Keep zoom controls only
      },
    });
  
    const WVExtent = new Extent({
      xmin: -83.675,
      ymin: 37.2,
      xmax: -77.719,
      ymax: 40.638,
      spatialReference: { wkid: 4326 },
    });
  
    view.when(() => {
      requestAnimationFrame(() => {
        view
          .goTo(
            {
              target: WVExtent,
              zoom: 7,
            },
            {
              animate: true,
              duration: 8000, // Reduced duration to 2 seconds for better performance
              easing: "ease-in-out", // Smooth easing
            }
          )
          .then(() => setIsLoading(false)); // Stop loading spinner
      });
    });

  
    // Save reference to view
    viewRef.current = view;
  
    // Cleanup function
    return () => {
      if (view) {
        view.destroy();
        viewRef.current = null;
      }
    };
  }, []);
  
  
  

  const handleDrawerToggle = () => setIsDrawerOpen(!isDrawerOpen);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const categories = [
    { title: "Find Food", description: "Explore food assistance.", color: "#4CAF50", icon: <SearchIcon /> },
    { title: "Food Atlas", description: "Explore data.", color: "#2196F3", icon: <LayersIcon /> },
    { title: "Organize", description: "Organize for food security.", color: "#FFC107", icon: <GroupIcon /> },
    { title: "Resources", description: "Review food system maps.", color: "#9C27B0", icon: <FilterAltIcon /> },
  ];
  const featureIds = [
    "a3174b0356874e578c8b6f0864e06742", // Example Feature Layer ID 1
    "c488cad2620045e4905d21cfcec59128", // Example Feature Layer ID 2
  ];
  const webMapIds = [
    "51811ead9a794bcdae5007554a236c72", // WebMap 1
    "daf77188582b408ab40bd538a49ec438", // WebMap 2
    "ecd6f8533cbe4fa4990da3fac6254708", // WebMap 3
    "6b6afdd7287041199f09f03f0e55605f", // WebMap 4
  ];

  return (
    <Box sx={{ display: "flex", flexDirection: "column", overflow: "auto" }}>
      <AppBar position="fixed" color="default" sx={{ zIndex: 1201, padding: 2 }}>
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
          <img
            src="https://www.arcgis.com/sharing/rest/content/items/0c60d0d0fe1a4746a40284e0fdda8e87/resources/Foodlink_use_mePNG-e1497287846786.png?v=1734104308181"
            alt="Foodlink Logo"
            style={{ height: 80 }}
          />
        </Box>
        <IconButton
          color="inherit"
          onClick={handleDrawerToggle}
          sx={{ position: "absolute", top: 16, right: 16 }}
        >
          {isDrawerOpen ? <CloseIcon /> : <MenuIcon />}
        </IconButton>
      </AppBar>

      <Drawer
        variant="temporary"
        open={isDrawerOpen}
        onClose={handleDrawerToggle}
        sx={{
          "& .MuiDrawer-paper": {
            width: 240,
            boxSizing: "border-box",
          },
        }}
      >
        <List>
          <ListItem>
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              Filters
            </Typography>
          </ListItem>
          <ListItem button onClick={() => setFilters((prev) => ({ ...prev, SNAP: !prev.SNAP }))}>
            <ListItemIcon>
              <FilterAltIcon />
            </ListItemIcon>
            <ListItemText primary="Accepts SNAP" />
            <Checkbox checked={filters.SNAP} />
          </ListItem>
          <ListItem button onClick={() => setFilters((prev) => ({ ...prev, FreshProduce: !prev.FreshProduce }))}>
            <ListItemIcon>
              <LayersIcon />
            </ListItemIcon>
            <ListItemText primary="Fresh Produce Available" />
            <Checkbox checked={filters.FreshProduce} />
          </ListItem>
          <ListItem button onClick={() => setFilters((prev) => ({ ...prev, ConvenienceStores: !prev.ConvenienceStores }))}>
            <ListItemIcon>
              <SearchIcon />
            </ListItemIcon>
            <ListItemText primary="Convenience Stores" />
            <Checkbox checked={filters.ConvenienceStores} />
          </ListItem>
        </List>
      </Drawer>

      <Box sx={{ flexGrow: 1, marginTop: "120px", padding: 2 }}>
        <Grid container spacing={2} justifyContent="center" sx={{ mb: 3 }}>
          {categories.map((category, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: 2,
                  bgcolor: category.color,
                  color: "white",
                  transition: "0.3s",
                  "&:hover": {
                    transform: "scale(1.05)",
                    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
                  },
                }}
              >
                {category.icon}
                <Typography variant="h6" gutterBottom>
                  {category.title}
                </Typography>
                <Typography variant="body2" align="center">
                  {category.description}
                </Typography>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Box sx={{ height: "65vh", position: "relative", mb: 3 }}>
          {isLoading && (
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                zIndex: 1000,
              }}
            >
              <CircularProgress />
            </Box>
          )}
          <Box ref={mapDiv} sx={{ height: "100%", width: "100%" }}></Box>
        </Box>

        {/* Modal Trigger */}
        <IconButton
          onClick={handleOpenModal}
          sx={{
            position: "absolute",
            bottom: 20,
            right: 20,
            backgroundColor: "white",
            borderRadius: "50%",
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.3)",
            width: 70,
            height: 70,
            "&:hover": {
              transform: "scale(1.1)",
            },
          }}
        >
          <img
            src="https://www.un.org/sustainabledevelopment/wp-content/uploads/2019/08/cropped-SDG-Wheel_Transparent_WEB-400x400.png"
            alt="SDG Wheel"
            style={{ width: "100%", height: "100%" }}
          />
          
        </IconButton>

        {/* Modal */}
<Modal
  open={openModal}
  onClose={handleCloseModal}
  closeAfterTransition
  BackdropComponent={Backdrop}
  BackdropProps={{ timeout: 500 }}
>
  <Fade in={openModal}>
    <Box
      sx={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "90%",
        maxWidth: 800,
        bgcolor: "white",
        boxShadow: 24,
        p: 4,
        borderRadius: 2,
      }}
    >
      <Typography variant="h4" gutterBottom align="center" sx={{ fontWeight: "bold" }}>
        About WV Foodlink
      </Typography>
      <Typography variant="body1" paragraph sx={{ textAlign: "justify" }}>
        <strong>WV FOODLINK</strong> is a project of the Food Justice Lab housed in West Virginia University Center for Resilient Communities. In collaboration with our community partners, we have developed a resource hub and learning commons to support a people-centered, resilient food network in West Virginia.
      </Typography>
      <Typography variant="body1" paragraph sx={{ textAlign: "justify" }}>
        Our work is motivated by a vision that all people must have access to safe, nutritious, and culturally appropriate food in sufficient quantity and quality to sustain a healthy life with human dignity. Today, many West Virginians face critical challenges in meeting their basic nutritional needs. A variety of organizations work to address this issue from different angles—from food charities to state government programs, social entrepreneurs, and nutrition advocates to specialty crop producers.
      </Typography>
      <Typography variant="body1" paragraph sx={{ textAlign: "justify" }}>
        WV FOODLINK serves as an information center for these many different groups and is used by program directors, social workers, and policymakers.
      </Typography>

      {/* SDG Section */}
      <Box sx={{ mt: 4 }}>
        <Typography variant="h5" gutterBottom align="center" sx={{ fontWeight: "bold", mb: 3 }}>
          Our Work Aligns with the Sustainable Development Goals
        </Typography>
        <Grid container spacing={3} justifyContent="center">
          {[
            {
              src: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Sustainable_Development_Goal_01NoPoverty.svg/299px-Sustainable_Development_Goal_01NoPoverty.svg.png",
              alt: "SDG 1: No Poverty",
              title: "No Poverty",
            },
            {
              src: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Sustainable_Development_Goal_01NoPoverty.svg/299px-Sustainable_Development_Goal_01NoPoverty.svg.png",
              alt: "SDG 2: Zero Hunger",
              title: "Zero Hunger",
            },
            {
              src: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Sustainable_Development_Goal_01NoPoverty.svg/299px-Sustainable_Development_Goal_01NoPoverty.svg.png",
              alt: "SDG 3: Good Health",
              title: "Good Health",
            },
          ].map((goal, index) => (
            <Grid item xs={12} sm={4} key={index}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                  p: 2,
                  bgcolor: "#f5f5f5",
                  borderRadius: 2,
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                  transition: "0.3s",
                  "&:hover": {
                    transform: "scale(1.05)",
                    boxShadow: "0 6px 12px rgba(0, 0, 0, 0.2)",
                  },
                }}
              >
                <img
                  src={goal.src}
                  alt={goal.alt}
                  style={{
                    width: "100px",
                    height: "100px",
                    marginBottom: 8,
                  }}
                />
                <Typography variant="h6" sx={{ fontWeight: "bold", fontSize: "1rem" }}>
                  {goal.title}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>

      <Button
        onClick={handleCloseModal}
        variant="contained"
        sx={{ display: "block", margin: "30px auto 0" }}
      >
        Close
      </Button>
    </Box>
  </Fade>
</Modal>


<SummaryWV />
<Partners />
<MapFood  mapIds={webMapIds} />

        
        
      </Box>
    </Box>
  );
};

export default HomePage;
