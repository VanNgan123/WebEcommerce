import React, { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  Button,
  IconButton,
  InputBase,
  Box,
  Tooltip,
  List,
  ListItem,
  ListItemText,
  CircularProgress,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import {
  AccountCircle,
  Logout,
  Search,
  ShoppingCart,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";

import { AppDispatch, RootState } from "../../store/store"; // Đảm bảo đường dẫn đúng
import {
  fetchProductSearch,
  Product,
} from "../../store/slices/productSeachSlices";

const Header = () => {
  const navigate = useNavigate();
  const role = localStorage.getItem("userRole");
  const isLogin = localStorage.getItem("isLogin") === "true";
  const [search, setSearch] = useState("");
  const dispatch: AppDispatch = useDispatch();

  // Lấy kết quả tìm kiếm từ Redux
  const { productSearch, loading, error } = useSelector(
    (state: RootState) => state.productSearchState
  );

  const handleLogout = () => {
    localStorage.removeItem("isLogin");
    localStorage.removeItem("idUser");
    localStorage.removeItem("userRole");
    navigate("/login");
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    dispatch(fetchProductSearch({ name: e.target.value }));
  };

  const handleSearchSubmit = () => {
    if (search.trim()) {
      dispatch(fetchProductSearch({ name: search }));
    }
  };

  useEffect(() => {
    if (!search.trim()) {
      dispatch(fetchProductSearch({ name: "" }));
    }
  }, [search, dispatch]);

  return (
    <AppBar position="fixed" sx={{ backgroundColor: "#092441", zIndex: 10 }}>
      <Toolbar
        sx={{
          justifyContent: "space-between",
          padding: "0 90px",
          alignItems: "center",
        }}
      >
        {/* Logo Center */}
        <Box sx={{ textAlign: "center", flexGrow: 1 }}>
          <IconButton
            color="inherit"
            aria-label="logo"
            sx={{
              fontFamily: "YourCustomFont, sans-serif",
              fontWeight: "bold",
              fontSize: "24px",
              color: "white",
              marginLeft: "350px",
            }}
          >
            EXPLORE
          </IconButton>
        </Box>

        {/* Right-aligned Icons */}
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <InputBase
            placeholder="Search"
            value={search}
            onChange={handleSearch}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                handleSearchSubmit();
              }
            }}
            sx={{
              borderBottom: "1px solid white",
              color: "white",
              padding: "0 10px",
              width: "200px",
              marginRight: "10px",
            }}
          />
          <IconButton
            color="inherit"
            onClick={handleSearchSubmit}
            sx={{ color: "white", "&:hover": { backgroundColor: "#f0f0f0" } }}
          >
            <Search />
          </IconButton>
          {isLogin ? (
            <>
              <>
                <Tooltip title="Account">
                  <IconButton
                    color="inherit"
                    component={Link}
                    to="/profile"
                    sx={{
                      color: "white",
                      "&:hover": { backgroundColor: "#898282" },
                    }}
                  >
                    <AccountCircle sx={{ fontSize: "24px" }} />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Logout">
                  <IconButton
                    color="inherit"
                    onClick={handleLogout}
                    sx={{
                      color: "white",
                      "&:hover": { backgroundColor: "#898282" },
                    }}
                  >
                    <Logout sx={{ fontSize: "24px" }} />
                  </IconButton>
                </Tooltip>
              </>
            </>
          ) : (
            <Button
              color="inherit"
              component={Link}
              to="/login"
              sx={{ color: "white", "&:hover": { backgroundColor: "#f0f0f0" } }}
            >
              Log In
            </Button>
          )}
          <IconButton
            color="inherit"
            component={Link}
            to="/cart"
            sx={{ color: "white", "&:hover": { backgroundColor: "#f0f0f0" } }}
          >
            <ShoppingCart sx={{ fontSize: "24px" }} />
          </IconButton>
        </Box>
      </Toolbar>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          padding: "10px 0",
          backgroundColor: "#f9f9f9",
        }}
      >
        {/* Các nút điều hướng */}
        <Button
          color="inherit"
          component={Link}
          to="/"
          sx={{
            fontWeight: "bold",
            textTransform: "uppercase",
            marginRight: "20px",
            color: "black",
            textDecoration: "none", // No underline by default
            "&:hover": {
              textDecoration: "underline", // Add underline on hover
              backgroundColor: "transparent", // No background change
            },
          }}
        >
          Home
        </Button>
        <Button
          color="inherit"
          component={Link}
          to="/products"
          sx={{
            fontWeight: "bold",
            textTransform: "uppercase",
            marginRight: "20px",
            color: "black",
            textDecoration: "none", // No underline by default
            "&:hover": {
              textDecoration: "underline", // Add underline on hover
              backgroundColor: "transparent", // No background change
            },
          }}
        >
          Products
        </Button>
        <Button
          color="inherit"
          component={Link}
          to="/about"
          sx={{
            fontWeight: "bold",
            textTransform: "uppercase",
            marginRight: "20px",
            color: "black",
            textDecoration: "none", // No underline by default
            "&:hover": {
              textDecoration: "underline", // Add underline on hover
              backgroundColor: "transparent", // No background change
            },
          }}
        >
          About
        </Button>
        {isLogin && role === "admin" ? (
          <Button
            color="inherit"
            component={Link}
            to="/admin/user"
            sx={{
              fontWeight: "bold",
              textTransform: "uppercase",
              marginRight: "20px",
              color: " black",
              textDecoration: "none", // No underline by default
              "&:hover": {
                textDecoration: "underline", // Add underline on hover
                backgroundColor: "transparent", // No background change
              },
            }}
          >
            Admin
          </Button>
        ) : (
          <Button
            color="inherit"
            component={Link}
            to="/order"
            sx={{
              fontWeight: "bold",
              textTransform: "uppercase",
              marginRight: "20px",
              color: "black",
              textDecoration: "none", // No underline by default
              "&:hover": {
                textDecoration: "underline", // Add underline on hover
                backgroundColor: "transparent", // No background change
              },
            }}
          >
            Order
          </Button>
        )}
      </Box>
      {/* </Toolbar> */}
      {/* Hiển thị kết quả tìm kiếm */}
      {search && (
        <Box
          sx={{
            top: "50px",
            left: "70%",
            position: "absolute",
            backgroundColor: "white",
            width: "350px",
            zIndex: 1,
            marginTop: "5px",
            borderRadius: "4px",
            boxShadow: 2,
            maxHeight: "406px",
            overflowY: "auto",
          }}
        >
          {loading && <CircularProgress />}
          {error && <p>{error}</p>}
          <List>
            {productSearch.map((product: Product) => (
              <ListItem
                component={Link}
                to={`/product/${product.id}`}
                key={product.id}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    width: "100%",
                    height: "50px",
                    textDecoration: "none",
                    color: "black",
                  }}
                >
                  {/* Hiển thị ảnh sản phẩm */}
                  <img
                    src={product.image}
                    alt={product.name}
                    style={{
                      width: "50px",
                      height: "50px",
                      marginRight: "10px",
                      borderRadius: "4px",
                    }}
                  />

                  {/* Thông tin sản phẩm */}
                  <Box sx={{ flexGrow: 1 }}>
                    <ListItemText
                      primary={
                        <span
                          style={{
                            fontWeight: "bold",
                            fontFamily: "YourCustomFont, sans-serif",
                          }}
                        >
                          {product.name}
                        </span>
                      }
                      secondary={
                        <span
                          style={{ fontFamily: "YourCustomFont, sans-serif" }}
                        >
                          Price: ${product.price}
                        </span>
                      }
                    />
                  </Box>
                </Box>
              </ListItem>
            ))}
          </List>
        </Box>
      )}
    </AppBar>
  );
};

export default Header;
