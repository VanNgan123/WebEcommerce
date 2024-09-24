import React, { useEffect } from "react";
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
} from "@mui/material";

import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../../store/slices/categoriesSlices";
import Sidebar from "./components/siderbar";
import { fetchProducts } from "../../store/slices/productSlices";
import { ArrowForward } from "@mui/icons-material";
import Header from "../../layout/Header";
import Footer from "../../layout/Footer";

const Products = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);
  const productList = useSelector((state: any) => state.productState.products);
  if (productList.length === 0) {
    return <h1>Loading...</h1>;
  }
  return (
    <>
      <Header />
      <h2 style={{ textAlign: "center",marginTop:'100px', fontFamily: "sans-serif",fontWeight:'bold' }} className="allProduct">All Products</h2>
      <Grid container spacing={2} mt={0} sx={{marginBottom:'60px'}}>
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
            <Grid
              container
              spacing={4}
              sx={{
                justifyContent: "center",
                gap: "10px",
                marginTop: "0",
                paddingTop: "10px",
              }}
              justifyContent="center"
            >
              {productList.map((product: any) => (
                <Grid item xs={2.9} key={product.id}>
                  <Card
                    style={{ height:500 }}
                    sx={{
                      "&:hover": { transform: "scale(1.05)" },
                      transition: "transform 0.6s",
                    }}
                  >
                    <Link
                      to={`/product/${product.id}`}
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
          </Box>
        </Grid>
      </Grid>

      <Footer />
    </>
  );
};

export default Products;
