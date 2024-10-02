import React, { useEffect, useState } from "react";
import {
  Box,
  IconButton,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
  Pagination,
} from "@mui/material";
import Header from "../../../layout/Header";
import Footer from "../../../layout/Footer";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrders } from "../../../store/slices/orderSlice";
import { AppDispatch, RootState } from "../../../store/store";
import { Delete as DeleteIcon } from "@mui/icons-material";
import NavbarAdmin from "../components/navbar";
import Thead from "../components/THead";
import axiosProduct from "../../../api/axiosProduct";

const AdminOrder = () => {
  const [page, setPage] = useState(1);
  const limit = 12;
  const dispatch: AppDispatch = useDispatch();
  
  const headersOrder = ["ID","User Id", "Full Name", "Product", "Total Amount", "Address","Note", "Actions "];

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  const { orders, loading } = useSelector((state: RootState) => state.orderState);
  console.log("🚀 ~ AdminOrder ~ orders:", orders)
  const handleDelete = async (id: string) => {
    try {
      const confirm = window.confirm("Are you sure you want to delete this order?");
      if (confirm) {
        await axiosProduct.delete(`/orders/${id}`);
        dispatch(fetchOrders());
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Header />
      <Box sx={{ display: "flex", flex: 1, paddingTop: "121px" }}>
        <NavbarAdmin />
        <Box sx={{ flex: "1", padding: "0 30px" }}>
          <Typography
            variant="h4"
            gutterBottom
            sx={{
              textAlign: "center",
              mx: "auto",
              fontWeight: "bold",
              fontFamily: "monospace",
              padding: "20px 0",
            }}
          >
            Order Management
          </Typography>

          {loading ? (
            <Typography variant="h6">Loading...</Typography>
          ) : orders && orders.length > 0 ? (
            <TableContainer component={Paper}>
              <Table>
                <Thead headers={headersOrder} />
                <TableBody>
                  {orders.map((order: any) => (
                    <TableRow key={order.id}>
                      <TableCell>{order.id}</TableCell>
                      <TableCell>{order.userId}</TableCell>
                      <TableCell>{order.fullName}</TableCell>
                      <TableCell>
                        {order.products.map((product: any) => (
                          <Typography key={product.productId}>
                            ID: {product.productId}, Quantity: {product.quantity}
                          </Typography>
                        ))}
                      </TableCell>
                      <TableCell>{order.totalAmount}</TableCell>
                      <TableCell>{order.address}</TableCell>
                      <TableCell>{order.note}</TableCell>
                      <TableCell>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            gap: "10px",
                          }}
                        >
                          <IconButton
                            onClick={() => handleDelete(order.id.toString())}
                            sx={{
                              backgroundColor: "red",
                              color: "white",
                              "&:hover": {
                                backgroundColor: "darkred",
                              },
                            }}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            <Typography variant="h6">No orders found.</Typography>
          )}

          <Stack spacing={2} sx={{ marginTop: "20px", alignItems: "center" }}>
            <Pagination
              page={page}
              count={Math.ceil((orders?.length || 0) / limit)} // Tính tổng số trang dựa trên số lượng đơn hàng
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
        </Box>
      </Box>
      <Footer />
    </Box>
  );
};

export default AdminOrder;
