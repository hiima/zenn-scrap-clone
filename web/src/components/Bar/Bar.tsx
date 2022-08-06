import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import React from "react";
import { useRouter } from "next/router";

export const Bar: React.FC = () => {
  const router = useRouter();

  const handleAddNewClick = () => router.push("/scraps/new");

  return (
    <AppBar position="static" sx={{ mb: "1rem" }}>
      <Container maxWidth="md">
        <Toolbar>
          {/* NOTE: 左側に配置 */}
          <Box display="flex" flexGrow={1}>
            <Typography variant="h5">
              <Link underline="none" color="inherit" href="/">
                Skrap
              </Link>
            </Typography>
          </Box>
          {/* NOTE: 右側に配置 */}
          <Button
            variant="contained"
            startIcon={<ModeEditIcon />}
            onClick={handleAddNewClick}
          >
            ADD NEW
          </Button>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
