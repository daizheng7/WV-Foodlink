import React from "react";
import {
  Box,
  Grid,
  Typography,
  Card,
  CardContent,
  useTheme,
} from "@mui/material";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import StorefrontIcon from "@mui/icons-material/Storefront";
import HomeRepairServiceIcon from "@mui/icons-material/HomeRepairService";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import ElderlyIcon from "@mui/icons-material/Elderly";

const styles = {
  "DHHR Offices": {
    id: "6cabc6993a8f44f9aadd1d884cf9cf84",
    color: "#007bff",
    icon: <LocalHospitalIcon />,
    description:
      "Access health care services, social benefits, and emergency assistance. Available support includes Medicaid, SNAP (food assistance), and temporary cash benefits for eligible families.",
  },
  "WIC Offices": {
    id: "37ec841dae7e46278d111f26a98b83cb",
    color: "#28a745",
    icon: <StorefrontIcon />,
    description:
      "Nutrition assistance for women, infants, and children. Includes vouchers for healthy food, breastfeeding support, and nutritional education.",
  },
  "Family Resource Network": {
    id: "fe5b84fd9977470ea0a56be091175356",
    color: "#ffc107",
    icon: <HomeRepairServiceIcon />,
    description:
      "Connect with parenting classes, childcare resources, job training, and access to local community programs for family support.",
  },
  "Family Support Centers": {
    id: "37fdc5c991f2443e9e30afc80745d00e",
    color: "#ff5722",
    icon: <RestaurantIcon />,
    description:
      "Free hot meals, food pantries, and essential items for families in crisis. Additional services include after-school programs and community kitchens.",
  },
  "Senior Services": {
    id: "fdedf6d54b1c4bc9928af7fd3ec520c8",
    color: "#795548",
    icon: <ElderlyIcon />,
    description:
      "Support for seniors including meal delivery, social activities, wellness checks, and transportation for medical appointments or errands.",
  },
};

const AssistanceLegend = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        backgroundColor: "#f4f6f8",
        padding: { xs: "15px", sm: "20px", md: "30px" },
        marginTop: "0px",
        borderRadius: "12px",
        boxShadow: "0px 6px 10px rgba(0, 0, 0, 0.15)",
        height: "auto", // Allow the content to determine the height
        width: "auto", // Ensure it fits within its container
        maxWidth: "600px", // Optional: limit the width if needed
      }}
    >
      <Grid container spacing={3}>
        {Object.entries(styles).map(([key, value]) => (
          <Grid item xs={12} key={value.id}>
            <Card
              sx={{
                display: "flex",
                flexDirection: "column",
                padding: { xs: "15px", sm: "20px" },
                borderLeft: `5px solid ${value.color}`,
                boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
                borderRadius: "10px",
                transition: "all 0.3s",
                "&:hover": {
                  boxShadow: `0px 8px 16px ${value.color}`,
                  transform: "translateY(-5px)",
                },
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", marginBottom: 2 }}>
                {React.cloneElement(value.icon, {
                  sx: { fontSize: { xs: 36, sm: 42, md: 48 }, color: value.color },
                })}
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: "bold",
                    color: value.color,
                    marginLeft: 2,
                  }}
                >
                  {key}
                </Typography>
              </Box>
              <CardContent
                sx={{
                  padding: 0,
                  "&:last-child": { paddingBottom: 0 },
                }}
              >
                <Typography
                  variant="body2"
                  color="textSecondary"
                  sx={{
                    fontSize: { xs: "0.9rem", sm: "1rem", md: "1.1rem" },
                  }}
                >
                  {value.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default AssistanceLegend;
