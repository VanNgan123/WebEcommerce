import { Button, TextField, Typography } from "@mui/material";
import React, { useEffect } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import signUpImg from "../../assets/signup.jpeg";
import "./SignUp.css";
import Header from "../../layout/Header";
import Navbar from "../../layout/Navbar";
import { signupRequest } from "../../api/auth/auth.requestSignuo";
import axiosUser from "../../api/axiosUser";
import { useNavigate } from "react-router-dom";
import Footer from "../../layout/Footer";
import Swal from "sweetalert2";


const SignUp = () => {
  const navigate = useNavigate();


  const isLoggedIn = localStorage.getItem("isLogin") === "true"; // Hoặc dùng Redux

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/"); // Chuyển hướng đến trang chính nếu đã đăng nhập
    }
  }, [isLoggedIn, navigate]);
  const formikSignUp = useFormik({
    initialValues: {
      username: "",
      fullname: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object().shape({
      username: Yup.string().required("Username is required"),
      fullname: Yup.string().required("Full name is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string().required("Password is required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), undefined], "Passwords do not match")
        .required("Password confirmation is required"),
    }),
    onSubmit: async (values) => {

      const result = await signupRequest(values);
      if(!result) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Account already exists!',
        });
        return;
      }
      try {
        await axiosUser.post("/users", values);
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: 'Registration successful!',
          timer: 1500,
          showConfirmButton: false,
        });
        navigate("/login");

      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Đăng ký thất bại',
          text: 'Please try again later!',
        });
      }
    },
  });

  return (
    <>
      <Header />
      <div className="container-fluid">
        <div className="signup-container">
          <div className="signup-image">
            <img src={signUpImg} alt="Đăng ký" />
          </div>
          <div className="signup-content">
            <form onSubmit={formikSignUp.handleSubmit} className="signup-form">
              <h2>SIGN UP</h2>
              <TextField
                fullWidth
                id="username"
                name="username"
                label="User Name"
                margin="normal"
                onChange={formikSignUp.handleChange}
                onBlur={formikSignUp.handleBlur}
                value={formikSignUp.values.username}
                error={
                  formikSignUp.touched.username &&
                  Boolean(formikSignUp.errors.username)
                }
                helperText={
                  formikSignUp.touched.username && formikSignUp.errors.username
                }
              />
              <TextField
                fullWidth
                id="fullname"
                name="fullname"
                label="Full Name"
                margin="normal"
                onChange={formikSignUp.handleChange}
                onBlur={formikSignUp.handleBlur}
                value={formikSignUp.values.fullname}
                error={
                  formikSignUp.touched.fullname &&
                  Boolean(formikSignUp.errors.fullname)
                }
                helperText={
                  formikSignUp.touched.fullname && formikSignUp.errors.fullname
                }
              />
              <TextField
                fullWidth
                id="email"
                name="email"
                label="Email"
                margin="normal"
                onChange={formikSignUp.handleChange}
                onBlur={formikSignUp.handleBlur}
                value={formikSignUp.values.email}
                error={
                  formikSignUp.touched.email &&
                  Boolean(formikSignUp.errors.email)
                }
                helperText={
                  formikSignUp.touched.email && formikSignUp.errors.email
                }
              />
              <TextField
                fullWidth
                id="password"
                name="password"
                label="Password"
                type="password"
                margin="normal"
                onChange={formikSignUp.handleChange}
                onBlur={formikSignUp.handleBlur}
                value={formikSignUp.values.password}
                error={
                  formikSignUp.touched.password &&
                  Boolean(formikSignUp.errors.password)
                }
                helperText={
                  formikSignUp.touched.password && formikSignUp.errors.password
                }
              />
              <TextField
                fullWidth
                id="confirmPassword"
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                margin="normal"
                onChange={formikSignUp.handleChange}
                onBlur={formikSignUp.handleBlur}
                value={formikSignUp.values.confirmPassword}
                error={
                  formikSignUp.touched.confirmPassword &&
                  Boolean(formikSignUp.errors.confirmPassword)
                }
                helperText={
                  formikSignUp.touched.confirmPassword &&
                  formikSignUp.errors.confirmPassword
                }
                sx={{ marginBottom: "20px" }}
              />
              <Button
                variant="contained"
                type="submit"
                className="signup-button"
                sx={{
                  color: "white",
                  backgroundColor: "black",
                  "&:hover": { backgroundColor: "#898282" },
                }}
              >
                SIGN UP
              </Button>
              <Typography variant="body2" sx={{ mt: 3 }}>
                You already have an account?{" "}
                <a href="/login" style={{ textDecoration: "none" }}>
                  Login Account Now
                </a>
              </Typography>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default SignUp;
