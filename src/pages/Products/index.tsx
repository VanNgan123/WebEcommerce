import React, { useEffect, useState } from "react";
import {
  Grid,
  Box,
  Typography,
  Checkbox,
  FormControlLabel,
  Divider,
  Card,
  CardMedia,
  CardContent,
  Rating,
  IconButton,
  Stack,
  Pagination,
} from "@mui/material";

import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../../store/slices/categoriesSlices";
import Sidebar from "./components/siderbar";
import { fetchProducts } from "../../store/slices/productSlices";
import { ArrowForward } from "@mui/icons-material";
import Header from "../../layout/Header";
import Footer from "../../layout/Footer";
import { RootState } from "../../store/store";

const Products = () => {
  const [page, setPage] = useState(1);
  const limit = 12;
  const productList = useSelector(
    (state: RootState) => state.productState.products
  );
  const category = useSelector(
    (state: RootState) => state.productState.category
  );
  const loading = useSelector((state: RootState) => state.productState.loading);
  const dispatch = useDispatch();

  useEffect(() => {
    const payload = {
      category: category,
      _page: page,
      _limit: limit,
    };
    dispatch(fetchProducts(payload));
    console.log("🚀 ~ useEffect ~ payload:", payload);
  }, [dispatch,page , category]);

  return (
    <>
      <Header />
      <h2
        style={{
          textAlign: "center",
          marginTop: "120px",
          fontFamily: "monospace",
          fontWeight: "bold",
        }}
        className="allProduct"
      >
        All Products
      </h2>
      <Grid container spacing={2} mt={0} sx={{ marginBottom: "60px" }}>
        <Grid item xs={2}>
          <Sidebar />
        </Grid>
        <Grid item xs={10}>
          <Box
            component="section"
            py={0}
            textAlign="center"
            mt={0}
            minHeight={"90vh"}
          >
            {loading && <div>Loading....</div>}
            {productList.length === 0 ? (
              <div>Product not found....</div>
            ) : (
              <Grid
                container
                spacing={4}
                sx={{
                  justifyContent: "center",
                  gap: "10px",
                  marginTop: "0",
                }}
                justifyContent="center"
              >
                {productList.map((product: any) => (
                  <Grid item xs={2.9} key={product.id}>
                    <Card
                      style={{ height: 500 }}
                      sx={{
                        "&:hover": { transform: "scale(1.05)" },
                        transition: "transform 0.6s",
                      }}
                    >
                      <Link
                        to={`/product/detail/${product.id}`}
                        key={product.id}
                        style={{ textDecoration: "none", color: "black" }}
                      >
                        <CardMedia
                          component="img"
                          height="385"
                          image={product.image} // Make sure `product.image` is a valid URL
                          alt={product.name}
                          style={{ objectFit: "cover" }}
                          sx={{ objectFit: "cover", height: "330px" }}
                        />
                        <CardContent sx={{ textAlign: "left" }}>
                          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                            {product.name}
                          </Typography>
                          <Typography
                            variant="body2"
                            mt={1}
                            color="textSecondary"
                          >
                            Pice: {product.price} $
                          </Typography>
                          <Rating
                            name="read-only"
                            value={product.rating || 4.5} // Ensure there's a `rating` field in your product data, default to 4.5 if missing
                            precision={0.5}
                            readOnly
                            sx={{ color: "red" }}
                          />
                          <Typography variant="caption" color="textSecondary">
                            {product.reviewCount || 10} review
                          </Typography>
                        </CardContent>
                      </Link>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            )}
          </Box>
          <Stack spacing={2} sx={{ marginTop: "20px",alignItems:"center" }}>
            <Pagination
              page={page}
              count={6}
              variant="outlined"
              shape="rounded"
              onChange={(event, value) => setPage(value)}
              sx={{
                "& .MuiPaginationItem-root": {
                  height: "30px",
                  borderRadius: 0,
                  border: "1px solid black",
                  backgroundColor: "white",
                  color: "black",
                  "&:hover": {
                    backgroundColor: "black",
                    color: "white",
                  },
                },
              }}
            />
          </Stack>
        </Grid>
      </Grid>

      <Footer />
    </>
  );
};

export default Products;
