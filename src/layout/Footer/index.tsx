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
        backgroundColor: "#092441", // "#608484",
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
              EXPLORE
            </IconButton>
          </Typography>
          <Typography
            variant="body2"
            sx={{ textAlign: "left", color: "#C6C6C6" }}
          >
            In 2020, ShopDunk became an authorized reseller of Apple. We develop
            a standard chain of stores and Apple Mono Store to bring to the best
            experience of Apple products and services for people use Vietnam.
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
            <Typography variant="body1" sx={{ fontWeight: "bold" }}>
              Call Center Support:
            </Typography>
            <Typography
              variant="body2"
              color="primary"
              sx={{ color: "black", padding: "10px 0 0 20px" }}
            >
              -Purchase: <strong>1900.6626 (08:00 - 22:00)</strong>
            </Typography>
            <Typography
              variant="body2"
              color="primary"
              sx={{ color: "black", padding: "0px 0 0 20px" }}
            >
              -Warranty: <strong>1900.8036 (08:00 - 22:00)</strong>
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
            Policy
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
            Old Autumn Renewal
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
            Delivery(ZaloPay)
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
            Cancel a transaction
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
            Returns
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
            Warranty
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
            Service
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
            Complaint Resolution
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
            Information Security
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
            Payment Instructions
          </Typography>
        </Grid>
        <Grid item xs={12} md={2}>
          <Typography variant="h6" sx={{ textAlign: "left" }}>
            Contact
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
            My Account
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
            Orders
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
            Store system
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
            Find a Store on Google Map
          </Typography>
        </Grid>
        <Grid item xs={12} md={4}>
          <Typography variant="h6" sx={{ textAlign: "left" }}>
            Address
          </Typography>
          <Typography
            variant="body2"
            sx={{ textAlign: "left", color: "rgba(255, 255, 255, 0.7)" }}
          >
            Address: 17 Hoang Thuc Tram, Hoa Cuong Bac, Hai Chau, Da Nang
          </Typography>
          <Typography
            variant="body2"
            sx={{ textAlign: "left", color: "rgba(255, 255, 255, 0.7)" }}
          >
            Enterprise: <strong>0387023315</strong>
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
          ©2024 HESMAN Vietnam Joint Stock Company Business License: 0123445667
          by the Department of Planning and Investment Da Nang City issued on
          20/09/2024.
        </Typography>
      </Box>
    </Box>
  );
};

export default Footer;
