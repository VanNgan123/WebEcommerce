

import React from "react";
import { Box, Typography, Grid, Button, IconButton } from "@mui/material";
import { Facebook, YouTube, Instagram } from "@mui/icons-material";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        width: "100%",
        maxWidth: "100%",
        backgroundColor:"#092441",// "#608484",
        color: "#fff",
        padding: "20px 150px",
        overflow: "hidden",
        zIndex: 10,
        marginTop: "auto", // Để footer đẩy xuống dưới cùng
      }}
    >
      <Grid container spacing={5}>
        <Grid item xs={12} md={4}>
          <Typography variant="h6" sx={{ textAlign: "left" }}>
            <IconButton edge="start" color="inherit" aria-label="logo">
              <img
                src="https://shopdunk.com/images/thumbs/0027333_logo-shopdunk.png"
                alt=""
                style={{ height: "50px" }}
              />
            </IconButton>
          </Typography>
          <Typography variant="body2" sx={{ textAlign: "left",color:'#C6C6C6' }}>
            Năm 2020, ShopDunk trở thành đại lý ủy quyền của Apple. Chúng tôi
            phát triển chuỗi cửa hàng tiêu chuẩn và Apple Mono Store nhằm mang
            đến trải nghiệm tốt nhất về sản phẩm và dịch vụ của Apple cho người
            dùng Việt Nam.
          </Typography>
          <Box
            sx={{
              marginTop: "10px",
              textAlign: "left",
              color: "black",
              backgroundColor: "white",
              padding: "20px",
              borderRadius: "10px",
            }}
          >
            <Typography variant="body1" sx={{ fontWeight: "bold" }}>Tổng đài hỗ trợ:</Typography>
            <Typography variant="body2" color="primary" sx={{ color: "black",padding:'10px 0 0 20px' }}>
              -Mua hàng: <strong>1900.6626 (08:00 - 22:00)</strong>
            </Typography>
            <Typography variant="body2" color="primary" sx={{ color: "black",padding:'0px 0 0 20px' }}>
              -Bảo hành: <strong>1900.8036 (08:00 - 22:00)</strong>
            </Typography>
          </Box>
          <Box sx={{ display: "flex", marginTop: "10px" }}>
            <Button sx={{ color: "bluesky" }}>
              <Facebook />
            </Button>
            <Button sx={{ color: "white" }}>
              <Instagram />
            </Button>
            <Button sx={{ color: "red" }}>
              <YouTube />
            </Button>
          </Box>
        </Grid>
        <Grid item xs={12} md={2}>
          <Typography variant="h6" sx={{ textAlign: "left" }}>
            Chính sách
          </Typography>
          <Typography
            variant="body2"
            sx={{
              textAlign: "left",
              color: "rgba(255, 255, 255, 0.7)",
              "&:hover": {
                textDecoration: "underline",
                color: "white", // Khi hover màu trắng đậm lại
              },
            }}
          >
            Thu cũ đổi mới
          </Typography>
          <Typography
            variant="body2"
            sx={{
              textAlign: "left",
              color: "rgba(255, 255, 255, 0.7)",
              "&:hover": {
                textDecoration: "underline",
                color: "white",
              },
            }}
          >
            Giao hàng(ZaloPay)
          </Typography>
          <Typography
            variant="body2"
            sx={{
              textAlign: "left",
              color: "rgba(255, 255, 255, 0.7)",
              "&:hover": {
                textDecoration: "underline",
                color: "white",
              },
            }}
          >
            Hủy giao dịch
          </Typography>
          <Typography
            variant="body2"
            sx={{
              textAlign: "left",
              color: "rgba(255, 255, 255, 0.7)",
              "&:hover": {
                textDecoration: "underline",
                color: "white",
              },
            }}
          >
            Đổi trả
          </Typography>
          <Typography
            variant="body2"
            sx={{
              textAlign: "left",
              color: "rgba(255, 255, 255, 0.7)",
              "&:hover": {
                textDecoration: "underline",
                color: "white",
              },
            }}
          >
            Bảo hành
          </Typography>
          <Typography
            variant="body2"
            sx={{
              textAlign: "left",
              color: "rgba(255, 255, 255, 0.7)",
              "&:hover": {
                textDecoration: "underline",
                color: "white",
              },
            }}
          >
            Dịch vụ
          </Typography>
          <Typography
            variant="body2"
            sx={{
              textAlign: "left",
              color: "rgba(255, 255, 255, 0.7)",
              "&:hover": {
                textDecoration: "underline",
                color: "white",
              },
            }}
          >
            Giải quyết khiếu nại
          </Typography>
          <Typography
            variant="body2"
            sx={{
              textAlign: "left",
              color: "rgba(255, 255, 255, 0.7)",
              "&:hover": {
                textDecoration: "underline",
                color: "white",
              },
            }}
          >
            Bảo mật thông tin
          </Typography>
          <Typography
            variant="body2"
            sx={{
              textAlign: "left",
              color: "rgba(255, 255, 255, 0.7)",
              "&:hover": {
                textDecoration: "underline",
                color: "white",
              },
            }}
          >
            Hướng dẫn thanh toán 
          </Typography>
        </Grid>
        <Grid item xs={12} md={2}>
          <Typography variant="h6" sx={{ textAlign: "left" }}>
            Liên hệ
          </Typography>
          <Typography
            variant="body2"
            sx={{
              textAlign: "left",
              color: "rgba(255, 255, 255, 0.7)",
              "&:hover": {
                textDecoration: "underline",
                color: "white",
              },
            }}
          >
            Tài khoản của tôi
          </Typography>
          <Typography
            variant="body2"
            sx={{
              textAlign: "left",
              color: "rgba(255, 255, 255, 0.7)",
              "&:hover": {
                textDecoration: "underline",
                color: "white",
              },
            }}
          >
            Đơn đặt hàng
          </Typography>
          <Typography
            variant="body2"
            sx={{
              textAlign: "left",
              color: "rgba(255, 255, 255, 0.7)",
              "&:hover": {
                textDecoration: "underline",
                color: "white",
              },
            }}
          >
            Hệ thống cửa hàng
          </Typography>
          <Typography
            variant="body2"
            sx={{
              textAlign: "left",
              color: "rgba(255, 255, 255, 0.7)",
              "&:hover": {
                textDecoration: "underline",
                color: "white",
              },
            }}
          >
            Tìm Store trên Google Map
          </Typography>
          
        </Grid>
        <Grid item xs={12} md={4}>
          <Typography variant="h6" sx={{ textAlign: "left" }}>
            Địa chỉ 
          </Typography>
          <Typography
            variant="body2"
            sx={{ textAlign: "left", color: "rgba(255, 255, 255, 0.7)" }}
          >
            Địa chỉ: 17 Hoàng Thúc Trâm,Hoà Cường Bắc, Hải Châu,Đà Nẵng
          </Typography>
          <Typography
            variant="body2"
            sx={{ textAlign: "left", color: "rgba(255, 255, 255, 0.7)" }}
          >
            Doanh nghiệp: <strong>0387023315</strong>
          </Typography>
        </Grid>
      </Grid>
      <Box
        sx={{
          textAlign: "center",
          marginTop: "20px",
          borderBottom: "1px solid rgba(255, 255, 255, 0.7)",
        }}
      ></Box>
      <Box sx={{ textAlign: "center", marginTop: "20px" }}>
        <Typography variant="body2">
          ©2024 Công ty Cổ Phần HESMAN Việt Nam GPDKKD: 0123445667 do Sở KH & ĐT
          TP.Đà Nẵng cấp ngày 20/09/2024.
        </Typography>
      </Box>
    </Box>
  );
};

export default Footer;
