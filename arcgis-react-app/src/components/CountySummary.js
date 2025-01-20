import React, { useEffect, useRef, useState } from "react";
import esriConfig from "@arcgis/core/config";
import Map from "@arcgis/core/Map";
import MapView from "@arcgis/core/views/MapView";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import UniqueValueRenderer from "@arcgis/core/renderers/UniqueValueRenderer";
import {
  Box,
  Typography,
  Grid,
  Chip,
  Avatar,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Paper,
  Stack,
} from "@mui/material";
import LocalGroceryStoreIcon from "@mui/icons-material/LocalGroceryStore";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import LocalConvenienceStoreIcon from "@mui/icons-material/LocalConvenienceStore";
import StorefrontIcon from "@mui/icons-material/Storefront";
import BusinessIcon from "@mui/icons-material/Business";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import AccessibilityNewIcon from "@mui/icons-material/AccessibilityNew";

const categoryStyles = {
  Grocery: { color: "#4285F4", icon: <LocalGroceryStoreIcon /> },
  "Farmers Market": { color: "#0F9D58", icon: <ShoppingBasketIcon /> },
  Convenience: { color: "#F4B400", icon: <LocalConvenienceStoreIcon /> },
  "Small Box": { color: "#DB4437", icon: <StorefrontIcon /> },
  Specialty: { color: "#9C27B0", icon: <BusinessIcon /> },
  "Big Box": { color: "#757575", icon: <BusinessIcon /> },
};

const CountySummary = () => {
  const mapDiv = useRef(null);
  const [view, setView] = useState(null);
  const [selectedCountyStats, setSelectedCountyStats] = useState(null);
  const [retailers, setRetailers] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState({ category: "", fresh: false, wic: false });
  const [allCountyStats, setAllCountyStats] = useState(null);
  const [countyTotals, setCountyTotals] = useState({ totalCounties: 0 });

  const filterRetailerLayer = () => {
    if (view) {
      const retailerLayer = view.map.findLayerById("retailerLayer");
      let filters = [];
      if (selectedFilters.category) {
        filters.push(`Retail_Category = '${selectedFilters.category}'`);
      }
      if (selectedFilters.fresh) {
        filters.push(`Fresh_Produce = 'Yes'`);
      }
      if (selectedFilters.wic) {
        filters.push(`WIC = 'Yes'`);
      }
      retailerLayer.definitionExpression = filters.join(" AND ") || ""; // Combine filters
    }
  };

  useEffect(() => {
    esriConfig.apiKey = process.env.REACT_APP_ARCGIS_API_KEY;

    const map = new Map({
      basemap: "arcgis-light-gray",
    });

    const mapView = new MapView({
      container: mapDiv.current,
      map: map,
      center: [-79, 39],
      zoom: 6,
    });

    const countyLayer = new FeatureLayer({
      portalItem: { id: "bbc434ff13854e76a9a5acc29bc1e025" },
    });

    const retailerLayer = new FeatureLayer({
      portalItem: { id: "a6ff9a5145eb47f6aadc08170fc53bd5" },
      id: "retailerLayer",
    });

    const retailerRenderer = new UniqueValueRenderer({
      field: "Retail_Category",
      uniqueValueInfos: Object.entries(categoryStyles).map(([category, style]) => ({
        value: category,
        symbol: {
          type: "simple-marker",
          color: style.color,
          size: 8,
          outline: { color: "#ffffff", width: 1 },
        },
        label: category,
      })),
    });

    retailerLayer.renderer = retailerRenderer;

    map.addMany([countyLayer, retailerLayer]);

    const loadAllPolygonsSummary = async () => {
      const query = countyLayer.createQuery();
      query.returnGeometry = false;
      query.outFields = ["*"];

      const countyStats = await countyLayer.queryFeatures(query);
      if (countyStats.features.length > 0) {
        const totalCounties = countyStats.features.length;
        const totalRetailers = countyStats.features.reduce((sum, feature) => sum + (feature.attributes.Total_Retailers || 0), 0);
        const freshProduceCount = countyStats.features.reduce((sum, feature) => sum + (feature.attributes.Fresh_Produce_Count || 0), 0);
        const wicCount = countyStats.features.reduce((sum, feature) => sum + (feature.attributes.WIC_Count || 0), 0);

        setAllCountyStats({
          totalRetailers,
          freshProducePercentage: totalRetailers > 0 ? (freshProduceCount / totalRetailers) * 100 : 0,
          wicPercentage: totalRetailers > 0 ? (wicCount / totalRetailers) * 100 : 0,
        });
        setCountyTotals({ totalCounties });
      }
    };

    mapView.when(() => {
      setView(mapView);

      mapView.on("click", async (event) => {
        const response = await mapView.hitTest(event);
        const results = response.results.filter(
          (result) => result.graphic && result.graphic.layer === countyLayer
        );

        if (results.length > 0) {
          const selectedCounty = results[0].graphic;
          const countyGeometry = selectedCounty.geometry;

          mapView.goTo(
            { target: countyGeometry, zoom: 10 },
            { duration: 2000, easing: "ease-in-out" }
          );

          const retailerQuery = retailerLayer.createQuery();
          retailerQuery.geometry = countyGeometry;
          retailerQuery.spatialRelationship = "intersects";
          retailerQuery.returnGeometry = false;
          retailerQuery.outFields = ["Store_Name", "Address", "Fresh_Produce", "WIC", "Retail_Category"];

          const retailerStats = await retailerLayer.queryFeatures(retailerQuery);

          if (retailerStats.features.length > 0) {
            const retailersData = retailerStats.features.map((feature) => ({
              storeName: feature.attributes.Store_Name,
              address: feature.attributes.Address,
              freshProduce: feature.attributes.Fresh_Produce,
              wic: feature.attributes.WIC,
              category: feature.attributes.Retail_Category,
            }));

            const categoryCounts = retailersData.reduce((acc, retailer) => {
              acc[retailer.category] = (acc[retailer.category] || 0) + 1;
              return acc;
            }, {});

            setRetailers(retailersData);

            setSelectedCountyStats({
              countyName: selectedCounty.attributes.County || "Unknown",
              totalRetailers: retailersData.length,
              freshProducePercentage:
                (retailersData.filter((r) => r.freshProduce === "Yes").length / retailersData.length) * 100 || 0,
              wicPercentage:
                (retailersData.filter((r) => r.wic === "Yes").length / retailersData.length) * 100 || 0,
              categoryCounts,
            });
          }
        }
      });

      loadAllPolygonsSummary();
    });

    return () => {
      if (mapView) {
        mapView.map.removeAll();
        mapView.destroy();
      }
    };
  }, []);

  useEffect(() => {
    filterRetailerLayer();
  }, [selectedFilters]);

  const toggleFilter = (key, value) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [key]: key === "category" ? (prev[key] === value ? "" : value) : !prev[key],
    }));
  };

  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      <div ref={mapDiv} style={{ width: "100%", height: "80vh", position: "relative" }}></div>

      <Box
        sx={{
          position: "absolute",
          top: 20,
          left: 20,
          background: "white",
          padding: 2,
          borderRadius: 2,
          boxShadow: "0 2px 5px rgba(0,0,0,0.3)",
          zIndex: 1000,
          maxWidth: 200,
        }}
      >
        <Typography variant="h6" sx={{ mb: 2 }}>
          Filters
        </Typography>
        <Stack spacing={2}>
          {Object.entries(categoryStyles).map(([key, style]) => (
            <Box
              key={key}
              display="flex"
              alignItems="center"
              sx={{
                cursor: "pointer",
                background: selectedFilters.category === key ? style.color : "#f5f5f5",
                borderRadius: 2,
                padding: 1,
                color: selectedFilters.category === key ? "white" : "black",
              }}
              onClick={() => toggleFilter("category", key)}
            >
              <Avatar
                sx={{
                  backgroundColor: selectedFilters.category === key ? "white" : style.color,
                  color: selectedFilters.category === key ? style.color : "white",
                  marginRight: 1,
                }}
              >
                {style.icon}
              </Avatar>
              <Typography>{key}</Typography>
            </Box>
          ))}
          <Box
            display="flex"
            alignItems="center"
            sx={{
              cursor: "pointer",
              background: selectedFilters.fresh ? "#0F9D58" : "#f5f5f5",
              borderRadius: 2,
              padding: 1,
              color: selectedFilters.fresh ? "white" : "black",
            }}
            onClick={() => toggleFilter("fresh")}
          >
            <Avatar
              sx={{
                backgroundColor: selectedFilters.fresh ? "white" : "#0F9D58",
                color: selectedFilters.fresh ? "#0F9D58" : "white",
                marginRight: 1,
              }}
            >
              <LocalOfferIcon />
            </Avatar>
            <Typography>Fresh Produce</Typography>
          </Box>
          <Box
            display="flex"
            alignItems="center"
            sx={{
              cursor: "pointer",
              background: selectedFilters.wic ? "#4285F4" : "#f5f5f5",
              borderRadius: 2,
              padding: 1,
              color: selectedFilters.wic ? "white" : "black",
            }}
            onClick={() => toggleFilter("wic")}
          >
            <Avatar
              sx={{
                backgroundColor: selectedFilters.wic ? "white" : "#4285F4",
                color: selectedFilters.wic ? "#4285F4" : "white",
                marginRight: 1,
              }}
            >
              <AccessibilityNewIcon />
            </Avatar>
            <Typography>WIC</Typography>
          </Box>
        </Stack>
      </Box>

      {allCountyStats && (
        <Box
          sx={{
            position: "absolute",
            top: 20,
            right: 20,
            background: "white",
            padding: 2,
            borderRadius: 2,
            boxShadow: "0 2px 5px rgba(0,0,0,0.3)",
            zIndex: 1000,
            maxWidth: 300,
          }}
        >
          <Typography variant="h6">All Counties Summary</Typography>
          <Typography>Total Counties: {countyTotals.totalCounties}</Typography>
          <Typography>Total Retailers: {allCountyStats.totalRetailers}</Typography>
          <Typography>Fresh Produce: {allCountyStats.freshProducePercentage.toFixed(2)}%</Typography>
          <Typography>WIC: {allCountyStats.wicPercentage.toFixed(2)}%</Typography>
        </Box>
      )}

      {selectedCountyStats && (
        <Box
          sx={{
            position: "absolute",
            bottom: 0,
            left: 0,
            width: "100%",
            background: "white",
            padding: 2,
            borderTop: "1px solid #ddd",
            boxShadow: "0 -2px 5px rgba(0,0,0,0.3)",
            zIndex: 1000,
          }}
        >
          <Typography variant="h6" gutterBottom>
            County Summary
          </Typography>
          <Typography>
            <strong>County:</strong> {selectedCountyStats.countyName}
          </Typography>
          <Typography>
            <strong>Total Retailers:</strong> {selectedCountyStats.totalRetailers}
          </Typography>
          <Typography>
            <strong>Fresh Produce (%):</strong> {selectedCountyStats.freshProducePercentage.toFixed(2)}%
          </Typography>
          <Typography>
            <strong>WIC (%):</strong> {selectedCountyStats.wicPercentage.toFixed(2)}%
          </Typography>
          <Grid container spacing={2}>
            {Object.entries(selectedCountyStats.categoryCounts).map(([category, count]) => (
              <Grid item xs={6} key={category}>
                <Chip
                  avatar={<Avatar>{categoryStyles[category]?.icon || <BusinessIcon />}</Avatar>}
                  label={`${category}: ${count}`}
                  sx={{ backgroundColor: categoryStyles[category]?.color || "#757575", color: "#fff" }}
                />
              </Grid>
            ))}
          </Grid>
        </Box>
      )}

      {retailers.length > 0 && (
        <Box sx={{ padding: 2 }}>
          <Typography variant="h6" gutterBottom>
            Detailed Retailer Information
          </Typography>
          <Table component={Paper}>
            <TableBody>
              {retailers.map((retailer, index) => (
                <TableRow key={index}>
                  <TableCell>{retailer.storeName || "Unknown Store"}</TableCell>
                  <TableCell>{retailer.address || "No Address"}</TableCell>
                  <TableCell>
                    Fresh Produce: {retailer.freshProduce === "Yes" ? "Available" : "Not Available"}
                  </TableCell>
                  <TableCell>WIC: {retailer.wic === "Yes" ? "Accepted" : "Not Accepted"}</TableCell>
                  <TableCell>{retailer.category || "No Category"}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      )}
    </div>
  );
};

export default CountySummary;
