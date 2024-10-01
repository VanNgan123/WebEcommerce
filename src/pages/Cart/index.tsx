import React, { useEffect } from "react";
import {
  Box,
  Typography,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { Add, Remove } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { fetchCarts } from "../../store/slices/cartSlices";
import { fetchProductById } from "../../store/slices/productDetailSlice";
import { Link, useNavigate } from "react-router-dom";
import Header from "../../layout/Header";
import Footer from "../../layout/Footer";
import axiosProduct from "../../api/axiosProduct";

const Cart = () => {
  const userId = localStorage.getItem("idUser");
  const isLogin = localStorage.getItem("isLogin") === "true";
  const dispatch: any = useDispatch();
  const navigate = useNavigate();
  const user = userId ? userId : null;

  useEffect(() => {
    if (!userId && !isLogin) {
      navigate("/login");
      return;
    }
    dispatch(fetchCarts(userId));
  }, [dispatch, userId]);
  const carts = useSelector((state: any) => state.cartState.carts) || [];

  const handleDelete = async (id: string) => {
    try {
      await axiosProduct.delete(`/carts/${id}`);
      dispatch(fetchCarts(userId));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Header />
      <Typography
        variant="h5"
        gutterBottom
        sx={{
          marginTop: "100px",
          textAlign: "left",
          maxWidth: "90%",
          mx: "auto",
          fontWeight: "bold",
          fontFamily: "monospace",
        }}
      >
        My Cart
      </Typography>
      <TableContainer
        component={Paper}
        sx={{
          maxWidth: "90%",
          mx: "auto",
          mt: 2,
          border: "1px solid gray",
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell
                sx={{ fontWeight: "bold", borderBottom: "1px solid black" }}
              >
                Product Image
              </TableCell>
              <TableCell
                sx={{ fontWeight: "bold", borderBottom: "1px solid black" }}
              >
                Name Product
              </TableCell>
              <TableCell
                sx={{ fontWeight: "bold", borderBottom: "1px solid black" }}
              >
                Price
              </TableCell>
              <TableCell
                sx={{ fontWeight: "bold", borderBottom: "1px solid black" }}
              >
                Quantity
              </TableCell>
              <TableCell
                sx={{ fontWeight: "bold", borderBottom: "1px solid black" }}
              >
                Color
              </TableCell>
              <TableCell
                sx={{ fontWeight: "bold", borderBottom: "1px solid black" }}
              >
                Place Order
              </TableCell>{" "}
              {/* Cột "Place Order" trước "Delete" */}
              <TableCell
                sx={{ fontWeight: "bold", borderBottom: "1px solid black" }}
              >
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {carts.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={7}
                  sx={{ textAlign: "center", fontStyle: "italic" }}
                >
                  Không có sản phẩm trong giỏ hàng
                </TableCell>
              </TableRow>
            ) : (
              carts.map((cart: any) => {
                const product = cart.product; // Lấy sản phẩm từ cart
                return product ? (
                  <TableRow key={product.id}>
                    <TableCell>
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <img
                          src={product.image}
                          alt={product.name}
                          style={{
                            borderRadius: "8px",
                            marginRight: "16px",
                            width: "80px",
                            height: "80px",
                          }} // Điều chỉnh kích thước
                        />
                      </Box>
                    </TableCell>
                    <TableCell>{product.name}</TableCell>
                    <TableCell>
                      <Typography>${product.price.toFixed(2)}</Typography>{" "}
                      {/* Giá sản phẩm */}
                    </TableCell>
                    <TableCell>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          border: "1px solid black",
                          width: "90px",
                        }}
                      >
                        <IconButton>
                          <Remove />
                        </IconButton>
                        <Typography variant="body2">{cart.quantity}</Typography>{" "}
                        {/* Số lượng sản phẩm */}
                        <IconButton>
                          <Add />
                        </IconButton>
                      </Box>
                    </TableCell>
                    <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                      {product.color || "N/A"}{" "}
                    </Typography>
                    <TableCell>
                      <Button
                        to="/buy"
                        component={Link}
                        variant="outlined"
                        sx={{
                          backgroundColor: "black",
                          color: "white",
                          "&:hover": {
                            color: "black",
                            borderColor: "black",
                            backgroundColor: "white",
                          },
                        }}
                      >
                        Place Order
                      </Button>
                    </TableCell>
                    <TableCell>
                      <IconButton
                        color="error"
                        onClick={() => handleDelete(cart.id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ) : null;
              })
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default Cart;
