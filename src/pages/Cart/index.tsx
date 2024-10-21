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
import Swal from "sweetalert2";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

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
    const result = (await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    })) as any;
    if (result.isConfirmed === true) {
      try {
        await axiosProduct.delete(`/carts/${id}`);
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
        dispatch(fetchCarts(userId));
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh", // Giúp đảm bảo nội dung luôn chiếm toàn bộ màn hình
      }}
    >
      <Header />
      <Box>
        <Typography
          variant="h5"
          gutterBottom
          sx={{
            marginTop: "130px",
            textAlign: "left",
            maxWidth: "90%",
            mx: "auto",
            fontWeight: "bold",
            fontFamily: "monospace",
          }}
        >
          My Cart <AddShoppingCartIcon sx={{ fontSize: 40 }} />
        </Typography>
      </Box>
      <TableContainer
        component={Paper}
        sx={{
          maxWidth: "90%",
          mx: "auto",
          mt: 2,
          mb: 2,
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
                  There are no products in the cart.
                </TableCell>
              </TableRow>
            ) : (
              carts.map((cart: any) => {
                const product = cart.product; // Lấy sản phẩm từ cart
                return product ? (
                  <>
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
                          <Typography variant="body2">
                            {cart.quantity}
                          </Typography>{" "}
                          {/* Số lượng sản phẩm */}
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                          {product.color || "N/A"}
                        </Typography>
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
                  </>
                ) : null;
              })
            )}
          </TableBody>
        </Table>
      </TableContainer>
      {carts.length > 0 && (<Box
        sx={{
          display: "flex",
          justifyContent: "end",
          maxWidth: "90%",

          mt: 2,
          mb: 2,
        }}
      >
        <Typography variant="h6" sx={{ fontFamily: "monospace"  }}>Please select buy here:
        <Button
          to="/buy"
          component={Link}
          variant="outlined"
          sx={{
            backgroundColor: "black",
            color: "white",
            ml: 2,
            "&:hover": {
              color: "black",
              borderColor: "black",
              backgroundColor: "white",
            },
          }}
        >
          Place Order
        </Button>
        </Typography>
      </Box>
      )}
      <Footer />
    </Box>
  );
};

export default Cart;
