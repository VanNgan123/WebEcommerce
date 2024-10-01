import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useEffect } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import loginImg from "../../assets/login.jpeg";
import "./Login.css";
import Header from "../../layout/Header";
import { useDispatch, useSelector } from "react-redux";
import { logninRequest } from "../../api/auth/auth.request";
import { login } from "../../store/slices/userSlices";
import {  useNavigate } from "react-router-dom";


const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isLoggedIn = localStorage.getItem("isLogin") === "true"; // Hoặc dùng Redux

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/"); // Chuyển hướng đến trang chính nếu đã đăng nhập
    }
  }, [isLoggedIn, navigate]);


  const formikLogin = useFormik({
    initialValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
    validationSchema: Yup.object().shape({
      email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
      password: Yup.string().required("Password is required"),
    }),
    onSubmit:async(values) => {
      const result = await logninRequest(values);
      console.log("🚀 ~ onSubmit:async ~ result :", result )
      if(!result){
        localStorage.setItem("isLogin", "false");
        alert("Tài khoản hoặc mật khách không hợp lệ");
        return;
      }
      const { id, email, token,role } = result;
      dispatch(login({ id, email, token, role }));
      localStorage.setItem('idUser', id);
      localStorage.setItem("isLogin", "true"); // Store isLogin as "true" string
      localStorage.setItem("userRole", role);

      navigate("/");
    },
  });

  return (
    <div className="container-fluid">
      <Header />

      <div className="login-container">
        <div className="login-image">
          <img src={loginImg} alt="" />
        </div>
        <div className="login-content">
          <form
            action=""
            className="login-form"
            onSubmit={formikLogin.handleSubmit}
          >
            <h2 style={{ fontFamily: "sans-serif" }}>
              LOGN IN
            </h2>
            <TextField
              fullWidth
              id="email"
              name="email"
              label="Email"
              margin="normal"
              onChange={formikLogin.handleChange}
              onBlur={formikLogin.handleBlur}
              value={formikLogin.values.email}
              error={
                formikLogin.touched.email &&
                Boolean(formikLogin.errors.email)
              }
              helperText={
                formikLogin.touched.email && formikLogin.errors.email
              }
            />
            <TextField
              fullWidth
              id="password"
              name="password"
              label="Password"
              type="password"
              margin="normal"
              onChange={formikLogin.handleChange}
              onBlur={formikLogin.handleBlur}
              value={formikLogin.values.password}
              error={
                formikLogin.touched.password &&
                Boolean(formikLogin.errors.password)
              }
              helperText={
                formikLogin.touched.password && formikLogin.errors.password
              }
              sx={{ marginBottom: "20px" }}
            />
            <Button
              variant="contained"
              type="submit"
              className="login-button"
              sx={{
                color: "white",
                backgroundColor: "black",
                "&:hover": { backgroundColor: "#898282" },
              }}
            >
              Logn In
            </Button>
            <Typography variant="body2" sx={{ mt: 3 }}>
              You do not have an account?{" "}
              <a href="/sign-up" style={{ textDecoration: "none" }}>
                Create Account
              </a>
            </Typography>
          </form>
        </div>
        
      </div>
    </div>
  );
};

export default Login;

