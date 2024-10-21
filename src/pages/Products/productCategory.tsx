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


const productCategory = () => {
    const dispatch = useDispatch();
  
    useEffect(() => {
      dispatch(fetchProducts());
    }, [dispatch]);
  
    const productList = useSelector((state: any) => state.productState.products);
    const selectedCategories = useSelector((state: any) => state.categoryState.selectedCategories);
  
    // Lọc sản phẩm dựa trên danh mục đã chọn
    const filteredProducts = selectedCategories.length
      ? productList.filter((product: any) => {
          const foundCategory = selectedCategories.find(
            (categoryId: string) => categoryId === product.categoryId
          );
          return !!foundCategory;
        })
      : productList;
  
    if (productList.length === 0) {
      return <h1>Loading...</h1>;    }
  
    return (
      <>
        {/* Giao diện trang Products */}
        <Grid container spacing={2} mt={0} sx={{ marginBottom: "60px" }}>
          <Grid item xs={2}>
            <Sidebar />
          </Grid>
          <Grid item xs={10}>
            <Box component="section" py={0} textAlign="center" mt={0} minHeight={"90vh"}>
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
                {filteredProducts.map((product: any) => (
                  <Grid item xs={2.9} key={product.id}>
                    {/* Thẻ Card của sản phẩm */}
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
  
  export default productCategory;
  