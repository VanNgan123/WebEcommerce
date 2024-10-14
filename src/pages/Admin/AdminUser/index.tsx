import {
  Backdrop,
  Box,
  Button,
  Fade,
  IconButton,
  Modal,
  Pagination,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import Header from "../../../layout/Header";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { fetchUser } from "../../../store/slices/userSlices";
import { RootState } from "../../../store/store";
import Thead from "../components/THead";
import { Delete as DeleteIcon } from "@mui/icons-material";
import { Close as CloseIcon } from "@mui/icons-material";
import Footer from "../../../layout/Footer";
import { useFormik } from "formik";
import * as Yup from "yup";
import axiosProduct from "../../../api/axiosProduct";
import NavbarAdmin from "../components/navbar";

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

const AdminUser = () => {
  const [page, setPage] = useState(1);
  const limit = 12;
  const [open, setOpen] = React.useState(false);
  const handleClose = () => setOpen(false);
  const [isEdit, setIsEdit] = useState(false);
  const headersUser = [
    "User Name",
    "Full Name",
    "Email",
    "role",
    "Password",
    "Action",
  ];
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);
  const { users, loading } = useSelector((state: RootState) => state.userState);

  const handleEdit = (user: any) => {
    setIsEdit(true);
    handleOpen(user);
  };

  const handleOpen = (user: any = null) => {
    setOpen(true);
    setIsEdit(!!user);
    if (user) {
      setSelectedUser(user);
      formik.setValues({
        username: user.username,
        fullname: user.fullname,
        email: user.email,
        password: user.password,
        role: user.role,
      });
    } else {
      formik.resetForm();
      setSelectedUser(null);
    }
  };
  const handleDelete = async (id: string) => {
    
    // Handle delete user
    try {
      await axiosProduct.delete(`/users/${id}`); // Delete user by ID
      dispatch(fetchUser()); // Fetch updated users
    } catch (error) {
      console.error("Error deleting user:", error); // Log any errors
    }
  };

  const formik = useFormik({
    initialValues: {
      username: "",
      fullname: "",
      email: "",
      password: "",
      role: "",
    },
    validationSchema: Yup.object().shape({
      username: Yup.string().required("User Name is required"),
      fullname: Yup.string().required("Full Name is required"),
      email: Yup.string().email("Invalid email").required("Email is required"),
      password: Yup.string().required("Password is required"),
    }),
    onSubmit: async (values) => {
      try {
        if (isEdit && selectedUser) {
          await axiosProduct.put(`/users/${selectedUser.id}`, values);
        } else {
          await axiosProduct.post("/users", values);
        }
        dispatch(fetchUser()); // Fetch updated users after submit
        handleClose();
      } catch (error) {
        console.error("Error submitting form:", error);
      }
    },
  });

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
            User Management
          </Typography>
          <Typography
            sx={{
              margin: "0 0 20px 0",
              paddingLeft: "20px",
              textAlign: "left",
              mx: "auto",
              fontWeight: "bold",
              fontFamily: "monospace",
            }}
          >
            <Button
              variant="outlined"
              sx={{
                backgroundColor: "black",
                color: "white",
                "&:hover": { color: "black", border: "2px solid black",backgroundColor: "white" },
              }}
              onClick={() => handleOpen()}
            >
              New User
            </Button>
          </Typography>
          {loading ? (
            <Typography variant="h6">Loading...</Typography>
          ) : (
            <TableContainer
              component={Paper}
              sx={{ boxShadow: 3, borderRadius: "8px" }}
            >
              <Table>
                <Thead headers={headersUser} />
                <TableBody>
                  {users.map((user: any, index) => (
                    <TableRow
                      key={user.id}
                      sx={{
                        "&:nth-of-type(odd)": { backgroundColor: "#f5f5f5" }, // Màu nền cho hàng lẻ
                        "&:hover": { backgroundColor: "#e0e0e0" },
                      }}
                    >
                      <TableCell>{user.username}</TableCell>

                      <TableCell>{user.fullname}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{user.role}</TableCell>
                      <TableCell>{user.password}</TableCell>
                      <TableCell>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            gap: "10px",
                          }}
                        >
                          <Button
                            variant="contained"
                            sx={{ backgroundColor: "#E0E008", color: "white" }}
                            fullWidth
                            onClick={() => {
                              handleEdit(user);
                            }}
                          >
                            Edit
                          </Button>

                          <IconButton
                            onClick={() => {
                              handleDelete(user.id.toString());
                            }}
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
          )}
          <Stack spacing={2} sx={{ marginTop: "20px", alignItems: "center" }}>
            <Pagination
              page={page}
              count={6}
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
          <Box sx={style}>
            <IconButton
              sx={{
                position: "absolute",
                top: "10px",
                right: "10px",
                color: "red", // Màu đỏ
              }}
              onClick={handleClose} // Đóng modal khi click
            >
              <CloseIcon />
            </IconButton>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              {isEdit ? "Edit User" : "Add User"}
            </Typography>
            <form onSubmit={formik.handleSubmit}>
              <TextField
                fullWidth
                margin="normal"
                label="User Name"
                name="username"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.username}
                error={
                  formik.touched.username && Boolean(formik.errors.username)
                }
                helperText={formik.touched.username && formik.errors.username}
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
              />
              <TextField
                fullWidth
                margin="normal"
                label="Email"
                name="email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
              <TextField
                fullWidth
                margin="normal"
                label="Password"
                name="password"
                type="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
                helperText={formik.touched.password && formik.errors.password}
              />
              <TextField
                fullWidth
                margin="normal"
                label="Role"
                name="role"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.role}
                error={formik.touched.role && Boolean(formik.errors.role)}
                helperText={formik.touched.role && formik.errors.role}
              />
              <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
                <Button type="submit" variant="contained" color="primary">
                  {isEdit ? "Edit User" : "Add User"}
                </Button>
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={() => formik.resetForm()}
                  sx={{ ml: 2 }}
                >
                  Reset
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
export default AdminUser;
