import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";

export default function Header() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color={"transparent"}>
        <Toolbar>
          <img
            src="https://assets-global.website-files.com/60a807564289c14d374c12f3/60a807564289c10fd84c136a_full-logoAsset%2019.svg"
            alt="open house white logo"
            style={{ maxWidth: "200px" }}
          />
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          ></IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
