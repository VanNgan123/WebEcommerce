import React from "react";
import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import SettingsIcon from "@mui/icons-material/Settings";
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';


const NavbarSetting = () => {
  return (
    <Box
      sx={{
        width: 280,
        bgcolor: "#ffffff", // Màu nền xám nhạt
        paddingLeft: 2,
        paddingRight: 2,
        textAlign: "left",
        fontFamily: "Roboto",
        borderRight: "1px solid #ccc",
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
        <SettingsIcon sx={{ fontSize: 40, marginRight: "10px", color: "#333" ,paddingBottom: "10px" }} />{" "}
        {/* Màu icon người dùng */}
        <Typography
          variant="h6"
          gutterBottom
          sx={{ fontWeight: "bold", fontSize: "18px", color: "#333" }}
        >
          Setting
          <Link to="/" style={{textDecoration: "none", color: "#333" ,marginLeft: "50px", fontWeight: "bold"}}><ExitToAppIcon sx={{"&:hover": {color: "red"}}}/></Link>
        </Typography>
        
      </Box>

      

      <Link to="/profile" style={{ textDecoration: "none" }}>
        <Typography
          variant="body1"
          gutterBottom
          sx={{
            fontSize: "16px",
            color: "#333", // Màu chữ đen nhạt
            cursor: "pointer",
            backgroundColor: "#efefef", // Nền xám
            border: "1px solid #ccc",
            borderRadius: "5px",
            padding: "10px",
            transition: "all 0.3s ease", // Hiệu ứng chuyển đổi mượt mà
            "&:hover": {
              backgroundColor: "#d0d0d0", // Nền xám đậm hơn khi hover
              color: "#001", // Chữ đen đậm khi hover
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)", // Tạo đổ bóng nhẹ
            },
          }}
        >
          <AccountCircleIcon sx={{marginRight: "10px",fontSize: "40px"}}/>  Personal information
        </Typography>
      </Link>

      {/* Link tới Admin User */}
      <Link to="" style={{ textDecoration: "none" }}>
        <Typography
          variant="body1"
          gutterBottom
          sx={{
            fontSize: "16px",
            color: "#333",
            cursor: "pointer",
            backgroundColor: "#efefef",
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
          <AdminPanelSettingsIcon sx={{marginRight: "10px",fontSize: "40px"}}/> Password
        </Typography>
      </Link>
    </Box>
  );
};

export default NavbarSetting;
