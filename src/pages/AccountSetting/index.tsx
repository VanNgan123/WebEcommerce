import {
  Backdrop,
  Box,
  Button,
  Fab,
  Fade,
  Grid,
  IconButton,
  Modal,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { AppDispatch, RootState } from "../../store/store";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { fetchUser } from "../../store/slices/userSlices";
import Header from "../../layout/Header";
import Footer from "../../layout/Footer";
import SettingsIcon from "@mui/icons-material/Settings";
import PersonIcon from "@mui/icons-material/Person";
import EditIcon from "@mui/icons-material/Edit";
import * as Yup from "yup";
import NavbarSetting from "./components/navbar";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import { useFormik } from "formik";
import axiosProduct from "../../api/axiosProduct";
import { Close as CloseIcon } from "@mui/icons-material";
import Swal from "sweetalert2";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 700,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const AccountSetting = () => {
  const userId = localStorage.getItem("idUser");
  const isLogin = localStorage.getItem("isLogin") === "true";
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const [isEditProfile, setIsEditProfile] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  useEffect(() => {
    if (!userId && !isLogin) {
      navigate("/login");
      return;
    }
    dispatch(fetchUser());
  }, [userId, fetchUser]);
  const users = useSelector((state: RootState) => state.userState.users);
  const user = users.find((user: any) => user.id === userId);
  console.log("🚀 ~ AccountSetting ~  user:", user);
  const handleOpen = (user: any = null) => {
    setOpen(true);
    setIsEditProfile(!!user);
    if (user) {
      setSelectedUser(user);
      formik.setValues({
        username: user.username,
        fullname: user.fullname,
        email: user.email,
        oldpassword: "",
        newpassword: "",
        role: user.role,
      });
    } else {
      formik.resetForm();
      setSelectedUser(null);
      handleClose();
    }
  };

  const formik = useFormik({
    initialValues: {
      username: "",
      fullname: "",
      email: "",
      oldpassword: "",
      newpassword: "",
      role: "",
    },
    validationSchema: Yup.object().shape({
      username: Yup.string().required("User Name is required"),
      fullname: Yup.string().required("Full Name is required"),
      email: Yup.string().email("Invalid email").required("Email is required"),
      oldpassword: Yup.string().required("Old Password is required"),
      newpassword: Yup.string()
        .required("New Password is required")
        .min(6, "Password should be at least 6 characters"),
    }),
    onSubmit: async (values) => {
      try {
        if (isEditProfile && selectedUser) {
          if (values.newpassword && values.oldpassword === user?.password) {
            await axiosProduct.put(`/users/${selectedUser.id}`, {
              ...values,
              password: values.newpassword,
            });
          } else {
            Swal.fire({
              icon: "error",
              text: "Old password is not correct!",
            });
          }
        }
        dispatch(fetchUser());
        formik.resetForm();
        handleClose();
      } catch (error) {
        console.error("Error submitting form:", error);
      }
    },
  });
  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Header />
      <Box sx={{ display: "flex", flex: 1, paddingTop: "109px" }}>
        <Link
          to="/"
          style={{
            textDecoration: "none",
            backgroundColor: "#f5f5f5",
            padding: "10px 0 10px 30px  ",
            color: "black",
          }}
        >
          <ArrowBackIosIcon />BACK
        </Link>
        {/* <NavbarSetting /> */}
        <Box
          sx={{
            flex: 1,
          }}
        >
          <Box
            sx={{
              backgroundColor: "#f5f5f5",
              minHeight: "100vh",
              p: 5,
            }}
          >
            <Grid container spacing={2} justifyContent="center">
              {/* Profile settings form */}
              <Grid item xs={12} md={7}>
                <Box p={3} bgcolor="white" borderRadius={2} height={370}>
                  <Typography
                    variant="h6"
                    gutterBottom
                    sx={{ mb: 2, textAlign: "left", fontWeight: 550 }}
                  >
                    Profile Settings
                  </Typography>

                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={12}>
                      <TextField
                        label="Full Name"
                        fullWidth
                        variant="outlined"
                        value={user?.fullname}
                        InputProps={{
                          readOnly: true,
                        }}
                        InputLabelProps={{
                          shrink: true, // Giúp label không chồng lên value
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12}>
                      <TextField
                        label="User Name:"
                        fullWidth
                        variant="outlined"
                        value={user?.username}
                        InputProps={{
                          readOnly: true,
                        }}
                        InputLabelProps={{
                          shrink: true, // Giúp label không chồng lên value
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="Email"
                        fullWidth
                        variant="outlined"
                        value={user?.email}
                        InputProps={{
                          readOnly: true,
                        }}
                        InputLabelProps={{
                          shrink: true, // Giúp label không chồng lên value
                        }}
                      />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="Password"
                        fullWidth
                        variant="outlined"
                        value="********"
                        InputProps={{
                          readOnly: true,
                        }}
                        InputLabelProps={{
                          shrink: true, // Giúp label không chồng lên value
                        }}
                      />
                    </Grid>
                  </Grid>
                  <Box mt={4} textAlign="center">
                    <Button
                      type="button"
                      onClick={() => handleOpen(user)}
                      variant="contained"
                      sx={{
                        width: 200,
                        color: "white",
                        backgroundColor: "black",
                        "&:hover": {
                          backgroundColor: "white",
                          color: "black",
                          border: "1px solid black",
                        },
                      }}
                    >
                      Change Password
                    </Button>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12} md={5}>
                <Box
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                  p={3}
                  bgcolor="white"
                  borderRadius={2}
                  height={370}
                >
                  <Avatar
                    sx={{ width: 150, height: 150, mt: 5 }}
                    src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"
                  />
                  <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                    {user?.fullname}
                  </Typography>
                  <Typography color="textSecondary">{user?.email}</Typography>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Box>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: { xs: "90%", sm: "500px" }, // Responsive width
              bgcolor: "background.paper",
              boxShadow: 24,
              borderRadius: "12px", // Smooth corners
              padding: "30px", // Generous padding for spacing
              outline: "none",
            }}
          >
            <IconButton
              sx={{
                position: "absolute",
                top: "10px",
                right: "10px",
                color: "red", // Close button color
              }}
              onClick={handleClose}
            >
              <CloseIcon />
            </IconButton>
            <Typography
              id="transition-modal-title"
              variant="h6"
              component="h2"
              sx={{
                fontWeight: "bold",
                textAlign: "center",
                marginBottom: "20px",
              }}
            >
              Edit Profile
            </Typography>
            <form onSubmit={formik.handleSubmit}>
              <TextField
                fullWidth
                margin="normal"
                label="User Name"
                name="username"
                InputProps={{
                  readOnly: true, // Read-only field
                }}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.username}
                error={
                  formik.touched.username && Boolean(formik.errors.username)
                }
                helperText={formik.touched.username && formik.errors.username}
                sx={{
                  backgroundColor: "#f9f9f9",
                  borderRadius: "8px",
                }}
              />
              <TextField
                fullWidth
                margin="normal"
                label="Email"
                name="email"
                InputProps={{
                  readOnly: true, // Read-only field
                }}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
                sx={{
                  backgroundColor: "#f9f9f9",
                  borderRadius: "8px",
                }}
              />
              <TextField
                fullWidth
                margin="normal"
                label="Full Name"
                name="fullname"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.fullname}
                error={
                  formik.touched.fullname && Boolean(formik.errors.fullname)
                }
                helperText={formik.touched.fullname && formik.errors.fullname}
                sx={{
                  backgroundColor: "#f9f9f9",
                  borderRadius: "8px",
                }}
              />
              <TextField
                fullWidth
                margin="normal"
                label="Old Password"
                name="oldpassword"
                type="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.oldpassword}
                error={
                  formik.touched.oldpassword &&
                  Boolean(formik.errors.oldpassword)
                }
                helperText={
                  formik.touched.oldpassword && formik.errors.oldpassword
                }
                sx={{
                  backgroundColor: "#f9f9f9",
                  borderRadius: "8px",
                }}
              />
              <TextField
                fullWidth
                margin="normal"
                label="New Password"
                name="newpassword"
                type="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.newpassword}
                error={
                  formik.touched.newpassword &&
                  Boolean(formik.errors.newpassword)
                }
                helperText={
                  formik.touched.newpassword && formik.errors.newpassword
                }
                sx={{
                  backgroundColor: "#f9f9f9",
                  borderRadius: "8px",
                }}
              />
              <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  sx={{
                    backgroundColor: "#007BFF", // Custom primary color
                    "&:hover": {
                      backgroundColor: "#0056b3", // Darker on hover
                    },
                    padding: "10px 20px", // Increased padding
                  }}
                >
                  Save
                </Button>
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={handleClose}
                  sx={{
                    ml: 2,
                    padding: "10px 20px", // Increased padding
                    borderColor: "#FF4081", // Custom border color
                    color: "#FF4081", // Custom text color
                    "&:hover": {
                      borderColor: "#FF80AB",
                      color: "#FF80AB",
                    },
                  }}
                >
                  Cancel
                </Button>
              </Box>
            </form>
          </Box>
        </Fade>
      </Modal>

      <Footer />
    </Box>
  );
};
export default AccountSetting;
