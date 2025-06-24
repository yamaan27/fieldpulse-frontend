import React from "react";
import { Box, Typography } from "@mui/material";

const StatCard = ({ title, value, color = "#2563eb" }) => (
  <Box
    sx={{
      background: "white",
      padding: "20px",
      borderRadius: "10px",
      boxShadow: "0 1px 4px rgba(0, 0, 0, 0.1)",
      textAlign: "center",
    }}
  >
    <Typography variant="subtitle1" color="textSecondary">
      {title}
    </Typography>
    <Typography variant="h4" fontWeight="bold" sx={{ color }}>
      {value}
    </Typography>
  </Box>
);

export default StatCard;
