import React from "react";
import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";

const NavbarAdmin = () => {
  return (
    <Box
      sx={{
        width: 220,
        bgcolor: "#f0f0f0", // Màu nền xám nhạt
        paddingLeft: 2,
        paddingRight: 2,
        textAlign: "left",
        fontFamily: "Roboto",
        borderRight: "1px solid #ccc",
        minHeight: "100vh",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          paddingTop: "20px",
          marginBottom: "20px",
        }}
      >
        <PersonIcon sx={{ fontSize: 40, marginRight: "10px", color: "#333" ,paddingBottom: "10px" }} />{" "}
        {/* Màu icon người dùng */}
        <Typography
          variant="h6"
          gutterBottom
          sx={{ fontWeight: "bold", fontSize: "18px", color: "#333" }}
        >
          Admin
        </Typography>
      </Box>

      {/* Link tới Admin Product */}
      <Link to="/" style={{ textDecoration: "none" }}>
        <Typography
          variant="body1"
          gutterBottom
          sx={{
            fontSize: "16px",
            color: "#333", // Màu chữ đen nhạt
            cursor: "pointer",
            backgroundColor: "#e0e0e0", // Nền xám
            border: "1px solid #ccc",
            borderRadius: "5px",
            padding: "10px",
            transition: "all 0.3s ease", // Hiệu ứng chuyển đổi mượt mà
            "&:hover": {
              backgroundColor: "#d0d0d0", // Nền xám đậm hơn khi hover
              color: "#000", // Chữ đen đậm khi hover
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)", // Tạo đổ bóng nhẹ
            },
          }}
        >
          Home 
        </Typography>
      </Link>

      <Link to="/admin/product" style={{ textDecoration: "none" }}>
        <Typography
          variant="body1"
          gutterBottom
          sx={{
            fontSize: "16px",
            color: "#333", // Màu chữ đen nhạt
            cursor: "pointer",
            backgroundColor: "#e0e0e0", // Nền xám
            border: "1px solid #ccc",
            borderRadius: "5px",
            padding: "10px",
            transition: "all 0.3s ease", // Hiệu ứng chuyển đổi mượt mà
            "&:hover": {
              backgroundColor: "#d0d0d0", // Nền xám đậm hơn khi hover
              color: "#000", // Chữ đen đậm khi hover
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)", // Tạo đổ bóng nhẹ
            },
          }}
        >
          Admin Product
        </Typography>
      </Link>

      {/* Link tới Admin User */}
      <Link to="/admin/user" style={{ textDecoration: "none" }}>
        <Typography
          variant="body1"
          gutterBottom
          sx={{
            fontSize: "16px",
            color: "#333",
            cursor: "pointer",
            backgroundColor: "#e0e0e0",
            border: "1px solid #ccc",
            borderRadius: "5px",
            padding: "10px",
            marginTop: "10px",
            transition: "all 0.3s ease",
            "&:hover": {
              backgroundColor: "#d0d0d0",
              color: "#000",
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
            },
          }}
        >
          Admin User
        </Typography>
      </Link>
      <Link to="/admin/order" style={{ textDecoration: "none" }}>
        <Typography
          variant="body1"
          gutterBottom
          sx={{
            fontSize: "16px",
            color: "#333", // Màu chữ đen nhạt
            cursor: "pointer",
            backgroundColor: "#e0e0e0", // Nền xám
            border: "1px solid #ccc",
            borderRadius: "5px",
            padding: "10px",
            transition: "all 0.3s ease", // Hiệu ứng chuyển đổi mượt mà
            "&:hover": {
              backgroundColor: "#d0d0d0", // Nền xám đậm hơn khi hover
              color: "#000", // Chữ đen đậm khi hover
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)", // Tạo đổ bóng nhẹ
            },
          }}
        >
          Admin Order
        </Typography>
      </Link>
    </Box>
  );
};

export default NavbarAdmin;
