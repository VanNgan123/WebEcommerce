import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Rating,
  CircularProgress,
  IconButton,
} from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import Header from "../../layout/Header";
import { RootState } from "../../store/store";
import { fetchProductById } from "../../store/slices/productDetailSlice";
import Footer from "../../layout/Footer";
import { cartsRequest } from "../../api/auth/auth.cartRequest";


const ProductDetail: React.FC = () => {
  const [selectedColor, setSelectedColor] = useState<string>(""); // State for selected color
  const [quantity, setQuantity] = useState<number>(1); // State for quantity
  const navigate = useNavigate();
  const handleColorSelect = (color: string) => {
    setSelectedColor(color);
  };

  const handleQuantityChange = (type: "increase" | "decrease") => {
    if (type === "increase") {
      setQuantity((prev) => prev + 1);
    } else if (type === "decrease" && quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const { id } = useParams<{ id: string }>();
  const dispatch: any = useDispatch();
  const productDetail = useSelector(
    (state: RootState) => state.productDetailState.productDetail
  );
  const loading = useSelector((state: RootState) => state.productState.loading);

  useEffect(() => {
    if (id) {
      dispatch(fetchProductById(id));
    }
  }, [dispatch, id]);

  if (loading) {
    return <CircularProgress />;
  }

  if (!productDetail) {
    return <div>No product found</div>;
  }
  const handleAddCart = () => {
    const userId = localStorage.getItem("idUser"); // Retrieve userId from localStorage
    if (!userId) {
      navigate("/login");
      return;
    }
    const dataCart = {
      productId: productDetail.id,
      quantity: quantity,
      userId: String(userId),
      color: selectedColor,
    };
    try{
      const result = cartsRequest(dataCart as any);
      if(result) {
        console.log("🚀 ~ handleAddCart ~ result:", result)
        navigate("/cart");
      }else{
        alert("Thêm sản phẩm vào giỏ hàng thất bại");
      }
    }catch(error){
      console.log(error);
    }
    
  };

  return (
    <>
      <Header />
      <Box sx={{ padding: "70px 40px", marginBottom: "40px" }}>
        <Grid
          container
          spacing={2}
          justifyContent="center"
          sx={{ paddingTop: "30px" }}
        >
          <Grid item xs={12} sm={6} key={productDetail.id}>
            <Card
              sx={{
                borderRadius: 3,
                position: "relative",
                overflow: "hidden",
              }}
            >
              <CardMedia
                component="img"
                height="400"
                image={productDetail.image}
                alt={productDetail.name}
                sx={{ objectFit: "contain", maxWidth: "100%", height: "300" }}
              />
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} sx={{ textAlign: "left" }}>
            <Typography
              variant="h3"
              sx={{
                paddingTop: "50px ",
                // font: "var(--font_15)",

                fontSize: "24px",

                color: "rgb(var(--color_15))",
                letterSpacing: "0.05em",
              }}
            >
              {productDetail.name}
            </Typography>
            <Rating
              name="read-only"
              value={productDetail.rating || 4.5}
              precision={0.5}
              readOnly
              sx={{ color: "red", paddingTop: "10px" }}
            />
            <Typography variant="caption" color="textSecondary">
              {productDetail.reviewCount || 10} review
            </Typography>
            <Typography
              variant="body2"
              mt={2}
              color="textSecondary"
              fontSize={{ fontSize: "18px" }}
            >
              Pice: {productDetail.price} $
            </Typography>
            <Typography
              variant="caption"
              color="textSecondary"
              mt={3}
              sx={{ fontSize: "14px" }}
            >
              {productDetail.description}
            </Typography>

            {/* Color Selection */}
            <Typography variant="subtitle1" mt={2}>
              Color:
            </Typography>
            <Grid container spacing={1}>
              {["Silver", "Black", "Gold"].map((color) => (
                <Grid item key={color}>
                  <Button
                    onClick={() => handleColorSelect(color)}
                    sx={{
                      backgroundColor: color,
                      width: 40,
                      height: 40,
                      border:
                        selectedColor === color ? "2px solid black" : "none",
                    }}
                  />
                </Grid>
              ))}
            </Grid>

            {/* Quantity Selection */}
            <Typography variant="subtitle1" mt={2}>
              Quantity:
            </Typography>
            <Box display="flex" alignItems="center">
              <IconButton onClick={() => handleQuantityChange("decrease")}>
                <RemoveIcon />
              </IconButton>
              <Typography variant="body1" mx={2}>
                {quantity}
              </Typography>
              <IconButton onClick={() => handleQuantityChange("increase")}>
                <AddIcon />
              </IconButton>
            </Box>

            <Grid container spacing={2} sx={{ marginTop: 2 }}>
              <Grid item>
                <Button
                  onClick={handleAddCart}
                  variant="outlined"
                  color="primary"
                  sx={{
                    borderColor: "primary.main",
                    border: "1px solid black",
                    color: "black",
                    padding: "7px 90px",
                    "&:hover": { backgroundColor: "black", color: "white" },
                  }}
                >
                  Add to Cart
                </Button>
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: "black",
                    color: "white",
                    padding: "7px 90px",
                    "&:hover": { color: "Black", background: "white" },
                  }}
                >
                  Buy Now
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
      <Footer />
    </>
  );
};

export default ProductDetail;
