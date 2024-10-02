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
    <AppBar
      position="fixed"
      sx={{
        backgroundColor: "#092441",
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

        {/* Các nút điều hướng */}
        <Button
          color="inherit"
          component={Link}
          to="/"
          sx={{
            textTransform: "uppercase",
            marginRight: "20px",
            color: "white",
            "&:hover": { color: "#fff", backgroundColor: "#898282" },
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
            "&:hover": { color: "#fff", backgroundColor: "#898282" },
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
            "&:hover": { color: "#fff", backgroundColor: "#898282" },
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
              textTransform: "uppercase",
              marginRight: "20px",
              color: "white",
              "&:hover": { color: "#fff", backgroundColor: "#898282" },
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
              textTransform: "uppercase",
              marginRight: "20px",
              color: "white",
              "&:hover": { color: "#fff", backgroundColor: "#898282" },
            }}
          >
            Order
          </Button>
        )}

        <Box sx={{ flexGrow: 1 }} />

        <Box
          sx={{ display: "flex", alignItems: "center", position: "relative" }}
        >
          {" "}
          {/* Thêm position: relative */}
          <InputBase
            placeholder="Search for products"
            value={search}
            onChange={handleSearch}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                handleSearchSubmit();
              }
            }}
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
          <IconButton
            color="inherit"
            onClick={handleSearchSubmit}
            sx={{
              marginRight: "30px",
              "&:hover": { backgroundColor: "#898282" },
            }}
          >
            <Search />
          </IconButton>
          {isLogin ? (
            <>
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
          <IconButton
            color="inherit"
            sx={{ "&:hover": { backgroundColor: "#898282" } }}
            to="/cart"
            component={Link}
          >
            <ShoppingCart sx={{ fontSize: "24px" }} />
          </IconButton>
        </Box>
      </Toolbar>
      {/* Hiển thị kết quả tìm kiếm */}
      {search && (
        <Box
          sx={{
            top: "50px",
            right: "27%", // Di chuyển danh sách kết quả
            position: "absolute",
            backgroundColor: "white",
            width: "400px",
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
                      primary={product.name}
                      secondary={`Price: $${product.price}`}
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
