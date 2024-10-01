import React from "react";
import {
  AppBar,
  Toolbar,
  Button,
  IconButton,
  InputBase,
  Box,
  Tooltip,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { AccountCircle, Logout, Search, ShoppingCart } from "@mui/icons-material";

const Header = () => {
  const navigate = useNavigate();
  const role = localStorage.getItem("userRole");
  const isLogin = localStorage.getItem("isLogin") === "true";
  const handleLogout = () => {
    localStorage.removeItem("isLogin");
    localStorage.removeItem("idUser");
    localStorage.removeItem("userRole");
    navigate("/login");
  };
  return (
    <AppBar
      position="fixed"
      sx={{
        backgroundColor:"#092441" ,//"#515154",
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
        {isLogin && role === "admin" ?(
          <Button
            color="inherit"
            component={Link}
            to="/admin/user"
            sx={{
              textTransform: "uppercase",
              marginRight: "20px",
              color: "white",
              "&:hover": { color: "#fff",backgroundColor:"#898282"},
            }}
          >
            Admin
          </Button>
        ): (
        <Button
          color="inherit"
          component={Link}
          to="/order"
          sx={{
            textTransform: "uppercase",
            marginRight: "20px",
            color: "white",
            "&:hover": { color: "#fff",backgroundColor:"#898282"},
          }}
        >
          Order
        </Button>) }

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
          <IconButton color="inherit" sx={{marginRight:"30px","&:hover":{backgroundColor:"#898282"}}}>
            <Search />
          </IconButton>
          

          {isLogin ? (
            <>
              {/* User icon when logged in */}
              <Tooltip title="Account">
                <IconButton
                  color="inherit"
                  component={Link}
                  to="/profile"
                  sx={{ "&:hover": { backgroundColor: "#898282" } }}
                >
                  <AccountCircle sx={{ fontSize: "24px" }} />
                </IconButton>
              </Tooltip>
              {/* Logout button */}
              <Tooltip title="Logout">
                <IconButton
                  color="inherit"
                  onClick={handleLogout}
                  sx={{ "&:hover": { backgroundColor: "#898282" } }}
                >
                  <Logout sx={{ fontSize: "24px" }} />
                </IconButton>
              </Tooltip>
            </>
          ) : (
            <>
              {/* Login button when not logged in */}
              <Button
                color="inherit"
                component={Link}
                to="/login"
                sx={{
                  margin: "0 10px",
                  "&:hover": { backgroundColor: "#898282" },
                }}
              >
                Log In
              </Button>
              {/* Sign Up button when not logged in */}
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
            </>
          )}

          <IconButton color="inherit" sx={{"&:hover":{backgroundColor:"#898282"}}} to= "/cart" component={Link}>
            <ShoppingCart sx={{ fontSize: "24px" }} />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
