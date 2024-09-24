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
        alert("Tài khoản hoặc mật khách hợp lệ");
        return;
      }
      dispatch(login(values));
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

// import React from "react";
// import { Button, TextField, Typography } from "@mui/material";
// import { useFormik } from "formik";
// import * as Yup from "yup";
// import { useDispatch, useSelector } from "react-redux";
// import { loginUser } from "../../store/slices/userSlices";
// import { AppDispatch, RootState } from "../../store/store"; // Import RootState nếu cần

// const Login = () => {
//   const dispatch = useDispatch<AppDispatch>();
//   const userStatus = useSelector((state: RootState) => state.user.status);
//   const loginError = useSelector((state: RootState) => state.user.error);

//   const formikLogin = useFormik({
//     initialValues: {
//       email: "",
//       password: "",
//     },
//     validationSchema: Yup.object({
//       email: Yup.string()
//         .email("Email không hợp lệ")
//         .required("Vui lòng nhập email"),
//       password: Yup.string().required("Vui lòng nhập mật khẩu"),
//     }),
//     onSubmit: (values: any) => {
//       dispatch(loginUser(values)); // Gửi thông tin đăng nhập
//     },
//   });

//   return (
//     <div className="login-container">
//       <form onSubmit={formikLogin.handleSubmit}>
//         <h2>Đăng Nhập</h2>
//         <TextField
//           fullWidth
//           id="email"
//           name="email"
//           label="Email"
//           margin="normal"
//           onChange={formikLogin.handleChange}
//           onBlur={formikLogin.handleBlur}
//           value={formikLogin.values.email}
//           error={formikLogin.touched.email && Boolean(formikLogin.errors.email)}
//           helperText={formikLogin.touched.email && formikLogin.errors.email}
//         />
//         <TextField
//           fullWidth
//           id="password"
//           name="password"
//           label="Password"
//           type="password"
//           margin="normal"
//           onChange={formikLogin.handleChange}
//           onBlur={formikLogin.handleBlur}
//           value={formikLogin.values.password}
//           error={formikLogin.touched.password && Boolean(formikLogin.errors.password)}
//           helperText={formikLogin.touched.password && formikLogin.errors.password}
//         />
//         <Button variant="contained" type="submit">
//           Đăng Nhập
//         </Button>

//         {userStatus === "loading" && <p>Đang xử lý...</p>}
//         {userStatus === "failed" && <p style={{ color: "red" }}>{loginError}</p>}
//       </form>
//     </div>
//   );
// };

// export default Login;
