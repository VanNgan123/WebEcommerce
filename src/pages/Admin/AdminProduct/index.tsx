import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  Typography,
  Box,
  Button,
  IconButton,
  Modal,
  Fade,
  Backdrop,
  TextField,
  Pagination,
  Stack,
} from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";
import { Delete as DeleteIcon } from "@mui/icons-material";
import Thead from "../components/THead";
import Header from "../../../layout/Header";
import Footer from "../../../layout/Footer";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../../store/slices/productSlices";
import { RootState } from "../../../store/store";
import { useFormik } from "formik";
import * as Yup from "yup";
import { fetchCategories } from "../../../store/slices/categoriesSlices";
import axiosProduct from "../../../api/axiosProduct";
import AdminUser from "../AdminUser";
import NavbarAdmin from "../components/navbar";
import Swal from "sweetalert2";

// Schema validation with Yup

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

const AdminProduct = () => {
  const [page, setPage] = useState(1);
  const limit = 12;
  const [open, setOpen] = React.useState(false);
  const [isEdit, setIsEdit] = useState(false);
  // Thêm biến state để lưu thông tin sản phẩm đang chỉnh sửa
  const [selectedProduct, setSelectedProduct] = useState<any>(null);

  // Hàm mở modal
  const handleOpen = (product: any = null) => {
    setOpen(true);
    setIsEdit(!!product); // Nếu có sản phẩm thì set isEdit là true
    if (product) {
      setSelectedProduct({
        ...product,
        id: String(product.id),
      });
      formik.setValues({
        name: product.name,
        color: product.color,
        price: product.price,
        description: product.description,
        image: product.image,
        quantity: product.quantity,
        sold: product.sold,
      });
    } else {
      formik.resetForm(); // Nếu không có sản phẩm, reset form
      setSelectedProduct(null);
    }
  };
  const handleClose = () => setOpen(false);
  const headers = ["Name Product", "Image", "Price", "Description", "Actions"];
  const dispatch = useDispatch();
  const { products, loading } = useSelector(
    (state: RootState) => state.productState
  );

  useEffect(() => {
    const payload = {
      category: [],
      _page: page,
      _limit: limit,
    };
    dispatch(fetchProducts(payload));
  }, [dispatch, page]);

  const handleDelete = async (id: string) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      });
      if (result.isConfirmed) {
        await axiosProduct.delete(`/products/${id}`);
        Swal.fire("Deleted!", "The product has been deleted.", "success");
        // Gọi lại API để cập nhật danh sách sản phẩm sau khi xóa
        dispatch(fetchProducts()); // Cập nhật lại dữ liệu sản phẩm nếu bạn đang sử dụng Redux để quản lý state
      }
    } catch (error) {
      console.log(error);
      Swal.fire(
        "Error!",
        "An error occurred while deleting the product.",
        "error"
      );
    }
  };

  const handleEdit = (product: any) => {
    setIsEdit(true);
    handleOpen(product);
  };

  // Formik hook for handling form state and validation
  const formik = useFormik({
    initialValues: {
      name: "",
      color: "",
      price: 0,
      description: "",
      image: "",
      quantity: 0,
      sold: 0,
    },
    validationSchema: Yup.object().shape({
      name: Yup.string().required("Name is required"),
      color: Yup.string().required("Color is required"),
      price: Yup.number()
        .required("Price is required")
        .positive("Must be positive"),
      description: Yup.string().required("Description is required"),
      image: Yup.string()
        .url("Must be a valid URL")
        .required("Image URL is required"),
      quantity: Yup.number()
        .required("Quantity is required")
        .integer("Must be an integer")
        .min(0, "Must be at least 0"),
      sold: Yup.number()
        .required("Sold is required")
        .integer("Must be an integer")
        .min(0, "Must be at least 0"),
    }),
    onSubmit: async (values) => {
      try {
        if (isEdit && selectedProduct) {
          await axiosProduct.put(`/products/${selectedProduct.id}`, values);
        } else {
          await axiosProduct.post("/products", values);
        }
      } catch (error) {
        console.log("🚀 ~ onSubmit: ~ error:", error);
      }
    },
  });

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
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
            Manage Products
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
                "&:hover": {
                  color: "black",
                  border: "2px solid black",
                  backgroundColor: "white",
                },
              }}
              onClick={() => handleOpen()}
            >
              New Product
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
                <Thead headers={headers} />
                <TableBody>
                  {products.map((product, index) => (
                    <TableRow
                      key={product.id}
                      sx={{
                        "&:nth-of-type(odd)": { backgroundColor: "#f5f5f5" }, // Màu nền cho hàng lẻ
                        "&:hover": { backgroundColor: "#e0e0e0" },
                      }}
                    >
                      <TableCell>{product.name}</TableCell>
                      <TableCell>
                        <img
                          src={product.image}
                          alt={product.name}
                          style={{ width: "50px" }}
                        />
                      </TableCell>
                      <TableCell>${product.price}</TableCell>
                      <TableCell>{product.description}</TableCell>
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
                              handleEdit(product);
                            }}
                          >
                            Edit
                          </Button>

                          <IconButton
                            onClick={() => {
                              handleDelete(product.id.toString());
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
          <Stack spacing={2} sx={{ margin: "20px 0", alignItems: "center" }}>
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

      <Footer />

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
              {isEdit ? "Edit Product" : "New Product"}
            </Typography>
            <form onSubmit={formik.handleSubmit}>
              <TextField
                fullWidth
                margin="normal"
                label="Product Name"
                name="name"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.name}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
              />
              <TextField
                fullWidth
                margin="normal"
                label="Color"
                name="color"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.color}
                error={formik.touched.color && Boolean(formik.errors.color)}
                helperText={formik.touched.color && formik.errors.color}
              />
              <TextField
                fullWidth
                margin="normal"
                label="Price"
                name="price"
                type="number"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.price}
                error={formik.touched.price && Boolean(formik.errors.price)}
                helperText={formik.touched.price && formik.errors.price}
              />
              <TextField
                fullWidth
                margin="normal"
                label="Description"
                name="description"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.description}
                error={
                  formik.touched.description &&
                  Boolean(formik.errors.description)
                }
                helperText={
                  formik.touched.description && formik.errors.description
                }
              />
              <TextField
                fullWidth
                margin="normal"
                label="Image URL"
                name="image"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.image}
                error={formik.touched.image && Boolean(formik.errors.image)}
                helperText={formik.touched.image && formik.errors.image}
              />
              <TextField
                fullWidth
                margin="normal"
                label="Quantity"
                name="quantity"
                type="number"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.quantity}
                error={
                  formik.touched.quantity && Boolean(formik.errors.quantity)
                }
                helperText={formik.touched.quantity && formik.errors.quantity}
              />
              <TextField
                fullWidth
                margin="normal"
                label="Sold"
                name="sold"
                type="number"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.sold}
                error={formik.touched.sold && Boolean(formik.errors.sold)}
                helperText={formik.touched.sold && formik.errors.sold}
              />
              <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
                {isEdit ? (
                  <Button type="submit" variant="contained" className="btn">
                    Edit
                  </Button>
                ) : (
                  <Button type="submit" variant="contained" color="primary">
                    Add Product
                  </Button>
                )}
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={() => formik.resetForm()} // Reset form khi click
                  sx={{ ml: 2 }}
                >
                  Reset
                </Button>
              </Box>
            </form>
          </Box>
        </Fade>
      </Modal>
    </Box>
  );
};

export default AdminProduct;
