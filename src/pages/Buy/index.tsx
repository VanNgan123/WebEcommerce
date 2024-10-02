import React, { useEffect } from "react";
import { Grid, Paper, TextField, Button, Typography, Box } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup"; // Import Yup for validation
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { CartItem, fetchCarts } from "../../store/slices/cartSlices";
import Header from "../../layout/Header";
import Footer from "../../layout/Footer";
import axiosProduct from "../../api/axiosProduct";

const Buy = () => {
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
  const shippingFee = 10;

  const deleteCartUser = async (carts: CartItem[]) => {
    try {
      const result = await Promise.all(
        carts.map(
          async (cart: CartItem) =>
            await axiosProduct.delete(`/carts/${cart.id}`)
        )
      );
      console.log(result);
    } catch (error) {}
  };

  const formik = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      phone: "",
      address: "",
      note: "",
    },
    validationSchema: Yup.object({
      // Define validation schema
      fullName: Yup.string().required("Họ và tên là bắt buộc"),
      email: Yup.string()
        .email("Email không hợp lệ")
        .required("Email là bắt buộc"),
      phone: Yup.string().required("Số điện thoại là bắt buộc"),
      address: Yup.string().required("Địa chỉ là bắt buộc"),
      note: Yup.string(),
    }),
    onSubmit: async (values) => {
      const orderData = {
        ...values,
        userId: userId,
        products: carts.map((cart: any) => ({
          img: cart.product.image,
          productId: cart.productId,
          quantity: cart.quantity,
          userId: cart.userId,
        })),
        totalAmount: finalTotal,
        date: new Date().toISOString(),
      };
      console.log("🚀 ~ Buy ~ orderData:", orderData)
      try {
        await axiosProduct.post("/orders", orderData);
        alert("Đơn đóng mua hàng thành cập");
        deleteCartUser(carts);
        navigate("/");
      } catch (error) {
        alert("Lưu đơn không thành công! Vui lòng thử lại.");
      }
    },
  });

  const totalAmount = carts.reduce(
    (total: number, cart: any) => total + cart.product.price * cart.quantity,
    0
  );
  const finalTotal = totalAmount + shippingFee;

  return (
    <>
      <Header />

      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={3} sx={{ marginTop: "120px", padding: "20px" }}>
          {/* Cột trái: Thông tin giao hàng */}
          <Grid item xs={12} md={7}>
            <Paper sx={{ padding: "20px" }}>
              <Typography
                variant="h5"
                sx={{ fontWeight: "bold", marginBottom: 3 }}
              >
                Thông tin giao hàng
              </Typography>
              <TextField
                label="Họ và tên"
                fullWidth
                sx={{ marginBottom: 2 }}
                name="fullName"
                value={formik.values.fullName}
                onChange={formik.handleChange}
                error={Boolean(
                  formik.touched.fullName && formik.errors.fullName
                )}
                helperText={formik.touched.fullName && formik.errors.fullName}
              />
              <Grid container spacing={2} sx={{ marginBottom: 2 }}>
                <Grid item xs={6}>
                  <TextField
                    label="Email"
                    fullWidth
                    name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    error={Boolean(formik.touched.email && formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    label="Số điện thoại"
                    fullWidth
                    name="phone"
                    value={formik.values.phone}
                    onChange={formik.handleChange}
                    error={Boolean(formik.touched.phone && formik.errors.phone)} // Check for error
                    helperText={formik.touched.phone && formik.errors.phone} // Display error message
                  />
                </Grid>
              </Grid>
              <TextField
                label="Địa chỉ"
                fullWidth
                sx={{ marginBottom: 2 }}
                name="address"
                value={formik.values.address}
                onChange={formik.handleChange}
                error={Boolean(formik.touched.address && formik.errors.address)} // Check for error
                helperText={formik.touched.address && formik.errors.address} // Display error message
              />
              <TextField
                label="Ghi chú sản phẩm"
                fullWidth
                multiline
                rows={4}
                sx={{ marginBottom: 2 }}
                name="note"
                value={formik.values.note}
                onChange={formik.handleChange}
              />
            </Paper>
          </Grid>

          {/* Cột phải: Tóm tắt giỏ hàng */}
          <Grid item xs={12} md={5}>
            <Paper sx={{ padding: "20px", backgroundColor: "#f7f7f7" }}>
              <Typography
                variant="h6"
                sx={{ fontWeight: "bold", marginBottom: 2 }}
              >
                Tóm tắt giỏ hàng
              </Typography>
              {carts.map((cart: any) => (
                <Box
                  key={cart.id}
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "10px",
                    borderBottom: "1px solid #e0e0e0",
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <img
                      src={cart.product.image}
                      alt={cart.product.name}
                      style={{
                        borderRadius: "8px",
                        marginRight: "16px",
                        width: "50px",
                        height: "50px",
                      }}
                    />
                    <Typography variant="body1">{cart.product.name}</Typography>
                  </Box>
                  <Typography variant="body1">
                    {cart.quantity} x {cart.product.price.toFixed(2)}₫
                  </Typography>
                </Box>
              ))}
              <Box sx={{ marginTop: 2 }}>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                    Tổng cộng:
                  </Typography>
                  <Typography variant="body1">
                    {totalAmount.toFixed(2)}$
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                    Phí ship:
                  </Typography>
                  <Typography variant="body1">
                    {shippingFee.toFixed(2)}$
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                    Tổng tiền thanh toán:
                  </Typography>
                  <Typography variant="body1">
                    {finalTotal.toFixed(2)}$
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", justifyContent: "right" }}>
                  <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    sx={{ width: "150px", marginTop: 2, alignSelf: "flex-end", backgroundColor:"black",color:"white", "&:hover": { backgroundColor: "white", color: "black" ,border:"1px solid black"}}}
                  >
                    Đặt hàng
                  </Button>
                </Box>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </form>

      <Footer />
    </>
  );
};

export default Buy;
