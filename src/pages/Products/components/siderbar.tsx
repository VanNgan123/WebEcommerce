import React, { useEffect } from "react";
import {
  Box,
  Typography,
  Checkbox,
  FormControlLabel,
  Divider,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../../../store/slices/categoriesSlices";
import { RootState, AppDispatch } from "../../../store/store";
import { Link } from "react-router-dom";

const Sidebar: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);
  const categories = useSelector(
    (state: RootState) => state.categoryState.categories
  );
  return (
    <Box
      sx={{
        width: 220,
        bgcolor: "background.paper",
        paddingLeft: 2,

        textAlign: "left",
        height: "100%",
        fontFamily: "Roboto",
      }}
    >
      <Typography
        variant="h6"
        gutterBottom
        sx={{ fontWeight: "bold", fontSize: "18px", paddingTop: "40px" }}
      >
        Browse By
      </Typography>
      {/* All Products */}
      <Link to="/products" style={{ textDecoration: "none" }}>
        <Typography
          variant="body1"
          gutterBottom
          sx={{
            paddingTop: "10px",
            fontSize: "16px",
            color: "black",
            cursor: "pointer",
            "&:hover": {
              textDecoration: "underline",
            },
          }}
        >
          All Products
        </Typography>
      </Link>

      {/* Top Sellers */}
      <Link to="/products/top-sellers" style={{ textDecoration: "none" }}>
        <Typography
          variant="body1"
          gutterBottom
          sx={{
            paddingTop: "10px",
            fontSize: "16px",
            color: "black",
            cursor: "pointer",
            "&:hover": {
              textDecoration: "underline",
            },
          }}
        >
          Top Sellers
        </Typography>
      </Link>

      {/* New Products */}
      <Link to="/products/new-products" style={{ textDecoration: "none" }}>
        <Typography
          variant="body1"
          gutterBottom
          sx={{
            paddingTop: "10px",
            fontSize: "16px",
            color: "black",
            cursor: "pointer",
            "&:hover": {
              textDecoration: "underline",
            },
          }}
        >
          New Products
        </Typography>
      </Link>

      {/* Sale */}
      <Link to="/products/sale" style={{ textDecoration: "none" }}>
        <Typography
          variant="body1"
          gutterBottom
          sx={{
            paddingTop: "10px",
            fontSize: "16px",
            color: "black",
            cursor: "pointer",
            "&:hover": {
              textDecoration: "underline",
            },
          }}
        >
          Sale
        </Typography>
      </Link>

      <Divider sx={{ my: 2 }} />

      <Typography
        variant="subtitle1"
        gutterBottom
        sx={{ fontWeight: "bold", fontSize: "18px", paddingTop: "40px" }}
      >
        Filter By
      </Typography>
      <Typography variant="body2" gutterBottom>
        Product type
      </Typography>
      {categories &&
        categories.map((category: { id: string; name: string }) => (
          <FormControlLabel
            key={category.id}
            control={<Checkbox />}
            label={category.name}
            sx={{ typography: "body2", fontSize: "14px" }}
          />
        ))}

      <Divider sx={{ my: 2 }} />

      <Typography variant="subtitle1" gutterBottom>
        PRICE
      </Typography>
    </Box>
  );
};

export default Sidebar;
