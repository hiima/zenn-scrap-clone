import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import React from "react";

export const Bar: React.FC = () => {
  return (
    <AppBar position="static" sx={{ mb: "1rem" }}>
      <Toolbar>
        <Typography variant="h6">Skrap</Typography>
      </Toolbar>
    </AppBar>
  );
};
