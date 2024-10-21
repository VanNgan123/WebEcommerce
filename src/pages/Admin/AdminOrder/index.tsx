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
import Swal from "sweetalert2";

const AdminOrder = () => {
  const [page, setPage] = useState(1);
  const limit = 12;
  const dispatch: AppDispatch = useDispatch();

  const headersOrder = [
    "ID",
    "User Id",
    "User Information",
    "Product",
    "Total Amount",
    "Actions ",
  ];

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  const { orders, loading } = useSelector(
    (state: RootState) => state.orderState
  );
  console.log("🚀 ~ AdminOrder ~ orders:", orders);
  const handleDelete = async (id: string) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await axiosProduct.delete(`/orders/${id}`);
        Swal.fire("Deleted!", "The order has been deleted.", "success");
        dispatch(fetchOrders());
      } catch (error) {
        console.log(error);
        Swal.fire("Error!", "There was an error deleting the order.", "error");
      }
    }
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Header />
      <Box sx={{ display: "flex", flex: 1, paddingTop: "102px" }}>
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
            <TableContainer
              component={Paper}
              sx={{ boxShadow: 3, borderRadius: "8px" }}
            >
              <Table>
                <Thead headers={headersOrder} />
                <TableBody>
                  {orders.map((order: any) => (
                    <TableRow
                      key={order.id}
                      sx={{
                        "&:nth-of-type(odd)": { backgroundColor: "#f5f5f5" }, // Màu nền cho hàng lẻ
                        "&:hover": { backgroundColor: "#e0e0e0" }, // Hiệu ứng hover
                      }}
                    >
                      <TableCell>{order.id}</TableCell>
                      <TableCell>{order.userId}</TableCell>
                      <TableCell align="left">
                        Full Name: {order.fullName} <br />
                        Email: {order.email} <br />
                        Phone: {order.phone} <br />
                        Address: {order.address} <br />
                        {order.note ? `Note: {order.note}: ` : "Note: none"}
                      </TableCell>
                      <TableCell>
                        {order.products.map((product: any, index: number) => (
                          <Box
                            key={index}
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              marginBottom: "8px",
                              padding: "8px",
                              border: "1px solid #ccc",
                            }}
                          >
                            {product.img && (
                              <img
                                src={product.img}
                                alt={`Sản phẩm ID: ${product.productId}`}
                                style={{
                                  width: "50px",
                                  height: "50px",
                                  marginRight: "10px",
                                  borderRadius: "4px",
                                  boxShadow: "0px 0px 5px rgba(0,0,0,0.2)",
                                }}
                              />
                            )}
                            <Typography sx={{ marginRight: "8px" }}>
                              - Name Product: {product.nameProduct}
                            </Typography>
                            <Typography>
                              - Quantity: {product.quantity}
                            </Typography>
                          </Box>
                        ))}
                      </TableCell>
                      <TableCell>{order.totalAmount}</TableCell>
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

          <Stack spacing={2} sx={{ margin: "20px 0", alignItems: "center" }}>
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
