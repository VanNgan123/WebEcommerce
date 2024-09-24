import React from "react";
import {
  AppBar,
  Toolbar,
  Button,
  IconButton,
  InputBase,
  Box,
} from "@mui/material";
import { Link } from "react-router-dom";
import { Search, ShoppingCart } from "@mui/icons-material";

const Header = () => {
  return (
    <AppBar
      position="fixed"
      sx={{
        backgroundColor:"#383838" ,//"#515154",
        padding: "0 90px",
        zIndex: 10,
      }}
    >
      <Toolbar sx={{ padding: "0 90px" }}>
        <IconButton edge="start" color="inherit" aria-label="logo">
          <img
            src="https://shopdunk.com/images/thumbs/0027333_logo-shopdunk.png"
            alt=""
            style={{ height: "50px" }}
          />
        </IconButton>

        <Button
          color="inherit"
          component={Link}
          to="/"
          sx={{
            textTransform: "uppercase",
            marginRight: "20px",
            color: "white",
            "&:hover": { color: "#fff",backgroundColor:"#898282" },
          }}
        >
          Home
        </Button>
        <Button
          color="inherit"
          component={Link}
          to="/products"
          sx={{
            textTransform: "uppercase",
            marginRight: "20px",
            color: "white",
            "&:hover": { color: "#fff",backgroundColor:"#898282" },
          }}
        >
          Products
        </Button>
        <Button
          color="inherit"
          component={Link}
          to="/about"
          sx={{
            textTransform: "uppercase",
            marginRight: "20px",
            color: "white",
            "&:hover": { color: "#fff",backgroundColor:"#898282"},
          }}
        >
          About
        </Button>
        <Button
          color="inherit"
          component={Link}
          to="/contact"
          sx={{
            textTransform: "uppercase",
            marginRight: "20px",
            color: "white",
            "&:hover": { color: "#fff",backgroundColor:"#898282"},
          }}
        >
          Contact
        </Button>
        <Box sx={{ flexGrow: 1 }} />

        <Box sx={{ display: "flex", alignItems: "center" }}>
          <InputBase
            placeholder="Search for products"
            sx={{
              borderBottom: "2px solid white",
              color: "white",
              padding: "0 10px",
              width: "400px",
              "&::placeholder": {
                color: "#d2d2d7",
              },
            }}
          />
          <IconButton color="inherit" sx={{"&:hover":{backgroundColor:"#898282"}}}>
            <Search />
          </IconButton>

          <Button
            color="inherit"
            component={Link}
            to="/login"
            sx={{ margin: "0 10px",
              "&:hover":{backgroundColor:"#898282"}

             }}
          >
            Log In
          </Button>
          <Button
            color="inherit"
            variant="outlined"
            component={Link}
            to="/sign-up"
            sx={{
              marginRight: "10px",
              "&:hover": { color: "#515154", background: "white" },
            }}
          >
            Sign Up
          </Button>

          <IconButton color="inherit" sx={{"&:hover":{backgroundColor:"#898282"}}}>
            <ShoppingCart sx={{ fontSize: "24px" }} />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
