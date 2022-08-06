import AppBar from "@mui/material/AppBar";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import React from "react";

export const Bar: React.FC = () => {
  return (
    <AppBar position="static" sx={{ mb: "1rem" }}>
      <Container maxWidth="md">
        <Toolbar>
          <Typography variant="h5">
            <Link underline="none" color="inherit" href="/">
              Skrap
            </Link>
          </Typography>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
