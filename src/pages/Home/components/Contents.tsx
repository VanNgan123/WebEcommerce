import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCategory, fetchProducts } from "../../../store/slices/productSlices";
import { ArrowForward } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Rating,
  Typography,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

const Contents: React.FC = () => {
  const dispatch = useDispatch();
  const bycatagories = [
    {
      id: '5',
      title: "Mobile and Wearable Tech",
      image:
        "https://static.wixstatic.com/media/c837a6_5b37c6d9828241aa804f2e0af2334a7c~mv2.jpeg/v1/fill/w_886,h_419,fp_0.50_0.50,q_85,usm_0.66_1.00_0.01,enc_auto/templatesdrive_smartphone_--ar_169_--style_raw_--sref_httpss_mj_fae1610e-8d4e-469f-ba15-d7.jpeg", // Đặt URL của ảnh ở đây
      link: "/shop/mobile",
    },
    {
      id: '3',
      title: "Drones and Cameras",
      image:
        "https://static.wixstatic.com/media/c837a6_85bb5adcb80b4125b8a0f5214ef04365~mv2.jpeg/v1/fill/w_886,h_419,fp_0.64_0.67,q_85,usm_0.66_1.00_0.01,enc_auto/templatesdrive_still_camera_yellow_toned_background_--ar_169_--_428ffea2-e625-405e-a844-20.jpeg",
      link: "/shop/cameras",
    },
    {
      id: '4',
      title: "Headphones and Speakers",
      image:
        "https://static.wixstatic.com/media/c837a6_386fa17e5e6d4012bcef90f32b15624d~mv2.jpeg/v1/fill/w_886,h_419,fp_0.60_0.61,q_85,usm_0.66_1.00_0.01,enc_auto/templatesdrive_headphoes_green_toned_background_--ar_169_--styl_3f2a235f-221a-40d3-a420-96.jpeg",
      link: "/shop/headphones",
    },
    {
      id: '2',
      title: "Computers",
      image:
        "https://static.wixstatic.com/media/c837a6_08bb311bff82496da18ec5b8e6e0f864~mv2.jpeg/v1/fill/w_886,h_419,fp_0.50_0.59,q_85,usm_0.66_1.00_0.01,enc_auto/templatesdrive_laptop_--ar_169_--style_raw_--sref_httpss_mj_run_3eb1f332-e4c9-4c29-8986-92.jpeg",
      link: "/shop/computers",
    },
    {
      id: '7',
      title: "Tablets",
      image:
        "https://static.wixstatic.com/media/c837a6_f812686c1dc144ae890d6ac29193522d~mv2.jpeg/v1/fill/w_886,h_419,fp_0.48_0.51,q_85,usm_0.66_1.00_0.01,enc_auto/templatesdrive_tablet_--ar_169_--style_raw_--sref_httpss_mj_run_edc85ecf-ad3a-4a7c-9b04-11.jpeg",
      link: "/shop/tablets",
    },
    {
      id:'8',
      title: "TV and Home Cinema",
      image:
        "https://static.wixstatic.com/media/c837a6_b34b9247aa3a44dfa1fae48f7699bc39~mv2.jpeg/v1/fill/w_886,h_419,fp_0.76_0.59,q_85,usm_0.66_1.00_0.01,enc_auto/templatesdrive_projector_--ar_169_--style_raw_--sref_httpss_mj__5db03932-2daf-40b9-8e02-b1.jpeg",
      link: "/shop/tv",
    },
  ];
  const Spotlight = [
    {
      id: 1,
      title: "Pantony 6P Activity Tracker",
      image:
        "https://static.wixstatic.com/media/c837a6_e5bbe5af2f99449c95beef06d49920d0~mv2.jpg/v1/fill/w_868,h_606,fp_0.47_0.38,q_85,usm_0.66_1.00_0.01,enc_auto/c837a6_e5bbe5af2f99449c95beef06d49920d0~mv2.jpg", // Đặt URL của ảnh ở đây
      link: "/shop/mobile",
    },
    {
      id: 2,
      title: "Studio 8 Portable Bluetooth Speaker",
      image:
        "https://static.wixstatic.com/media/c837a6_787ae33e92e54dbd834feddf9d78df23~mv2.jpg/v1/fill/w_868,h_606,fp_0.48_0.47,q_85,usm_0.66_1.00_0.01,enc_auto/templatesdrive_3d_model_of_a_disc_shaped_portable_speaker_shot__a4876fca-fd77-4e24-be0b-58.jpg",
      link: "/shop/cameras",
    },
  ];
  const productList = useSelector((state: any) => state.productState.products);
  const products =
    productList?.filter((product: any) => product?.categoryId === 6) || [];
  const productTop =
    productList?.filter((product: any) => product?.categoryId === 1) || [];

  useEffect(() => {
    const payload = {
      _page: 1,
      _limit: 12,
      category:[],
    }
    dispatch(fetchProducts(payload));
  }, [dispatch]);

  const navigate = useNavigate();



  const handleCategoryClick = (categoryId: string) => {
    try {
      navigate(`/products/category/${categoryId}`);
    } catch (error) {
      console.log("🚀 ~ handleCategoryClick ~ error:", error)
    }
  }
  return (
    <>
      <Box
        component="section"
        py={5}
        textAlign="center"
        mt={5}
        minHeight={"90vh"}
      >
        <Typography
          variant="h4"
          gutterBottom
          sx={{
            fontWeight: "bold",
            textAlign: "Left",
            margin: 0,
            paddingLeft: "40px",
            fontFamily: "monospace",
          }}
        >
          New Products
        </Typography>
        <Grid
          container
          spacing={4}
          sx={{
            justifyContent: "center",
            gap: "10px",
            marginTop: "0",
            paddingTop: "10px",
          }}
          justifyContent="center"
        >
          {products.map((product: any) => (
            <Grid item key={product.id}>
              <Card
                style={{ width: 333 }}
                sx={{
                  "&:hover": { transform: "scale(1.05)" },
                  transition: "transform 0.6s",
                }}
              >
                <Link
                  to={`/product/detail/${product.id}`}
                  key={product.id}
                  style={{ textDecoration: "none", color: "black" }}
                >
                  <CardMedia
                    component="img"
                    height="300"
                    image={product.image} // Make sure `product.image` is a valid URL
                    alt={product.name}
                    style={{ objectFit: "cover" }}
                    sx={{ objectFit: "cover", width: 333, height: 400 }}
                  />
                  <CardContent sx={{ textAlign: "left" }}>
                    <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                      {product.name}
                    </Typography>
                    <Typography variant="body2" mt={1} color="textSecondary">
                      Pice: {product.price} $
                    </Typography>
                    <Rating
                      name="read-only"
                      value={product.rating || 4.5} // Ensure there's a `rating` field in your product data, default to 4.5 if missing
                      precision={0.5}
                      readOnly
                      sx={{ color: "red" }}
                    />
                    <Typography variant="caption" color="textSecondary">
                      {product.reviewCount || 10} review
                    </Typography>
                  </CardContent>
                </Link>
              </Card>
            </Grid>
          ))}
          <Button
            component={Link}
            to="/products"
            variant="outlined"
            sx={{
              margin: "20px 0 0 30px",
              width: "300px",
              height: "40px",
              border: "1px solid #0066CC",
              color: "#0066CC",
              "&:hover": { background: "#0066CC", color: "white" },
            }}
            endIcon={<ArrowForward />}
          >
            View More{" "}
          </Button>
        </Grid>
      </Box>
      {/* phần nội dung  bycatagories */}
      <Box sx={{ padding: "0 40px", marginBottom: "40px" }}>
        <Typography
          variant="h4"
          gutterBottom
          sx={{
            fontWeight: "bold",
            textAlign: "Left",
            margin: 0,
            fontFamily: "monospace",
            paddingBottom: "10px",
          }}
        >
          By Categories
        </Typography>
        <Grid
          container
          spacing={2}
          justifyContent="center"
          sx={{ paddingTop: "30px" }}
        >
          {bycatagories.map((bycatagories) => (
            <Grid item xs={12} sm={6} key={bycatagories.id}>
              <Card
                sx={{
                  borderRadius: 3,
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <CardMedia
                  component="img"
                  height="300"
                  image={bycatagories.image} // Đường dẫn ảnh
                  alt={bycatagories.title}
                  sx={{
                    objectFit: "cover",
                    transition: "filter 0.3s ease",
                    filter: "brightness(1.5)",
                  }}
                />
                <CardContent
                  sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    color: "white",
                    backgroundColor: "rgba(0, 0, 0, 0.4)", // Hiệu ứng làm mờ
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    padding: "40px",
                    flexDirection: "column",
                    textAlign: "center",
                  }}
                >
                  <Typography
                    variant="h5"
                    component="div"
                    sx={{ fontWeight: "bold", fontFamily: "revert" }}
                  >
                    {bycatagories.title}
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleCategoryClick(bycatagories.id)}
                    sx={{
                      color: "white",
                      backgroundColor: "#0066CC",
                      borderRadius: "50px",
                      alignSelf: "flex-end",
                      marginTop: "auto", // Đẩy nút xuống đáy
                    }}
                  >
                    Shop Now
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
      <Box component="section" py={5} textAlign="center" mt={5}>
        <Typography
          variant="h4"
          gutterBottom
          sx={{
            fontWeight: "bold",
            textAlign: "Left",
            margin: 0,
            paddingLeft: "40px",
            fontFamily: "monospace",
          }}
        >
          Top Seller
        </Typography>
        <Grid
          container
          spacing={4}
          sx={{
            justifyContent: "center",
            gap: "10px",
            marginTop: "0",
            paddingTop: "0 20px",
          }}
          justifyContent="center"
        >
          {productTop.map((product: any) => (
            <Grid item key={product.id}>
              <Card
                style={{ width: 333 }}
                sx={{
                  "&:hover": { transform: "scale(1.05)" },
                  transition: "transform 0.6s",
                }}
              >
                <Link
                  to={`/product/detail/${product.id}`}
                  key={product.id}
                  style={{ textDecoration: "none", color: "black" }}
                >
                  <CardMedia
                    component="img"
                    height="300"
                    image={product.image} // Make sure `product.image` is a valid URL
                    alt={product.name}
                    style={{ objectFit: "cover" }}
                    sx={{ objectFit: "cover", width: 333, height: 400 }}
                  />
                  <CardContent sx={{ textAlign: "left" }}>
                    <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                      {product.name}
                    </Typography>
                    <Typography variant="body2" mt={1} color="textSecondary">
                      Pice: {product.price} $
                    </Typography>
                    <Rating
                      name="read-only"
                      value={product.rating || 4.5} // Ensure there's a `rating` field in your product data, default to 4.5 if missing
                      precision={0.5}
                      readOnly
                      sx={{ color: "red" }}
                    />
                    <Typography variant="caption" color="textSecondary">
                      {product.reviewCount || 86} review
                    </Typography>
                  </CardContent>
                </Link>
              </Card>
            </Grid>
          ))}
          <Button
            component={Link}
            to="/products"
            variant="outlined"
            sx={{
              margin: "20px 0 0 30px",
              width: "300px",
              height: "40px",
              border: "1px solid #0066CC",
              color: "#0066CC",
              "&:hover": { background: "#0066CC", color: "white" },
            }}
            endIcon={<ArrowForward />}
          >
            View More{" "}
          </Button>
        </Grid>
      </Box>

      {/* phần nội dung  bycatagories */}
      <Box sx={{ padding: "0 40px", marginBottom: "40px" }}>
        <Typography
          variant="h4"
          gutterBottom
          sx={{
            fontWeight: "bold",
            textAlign: "Left",
            margin: 0,
            fontFamily: "monospace",
            paddingBottom: "10px",
          }}
        >
          Product Spotlight
        </Typography>
        <Grid
          container
          spacing={2}
          justifyContent="center"
          sx={{ paddingTop: "30px" }}
        >
          {Spotlight.map((Spotlight) => (
            <Grid item xs={12} sm={6} key={Spotlight.id}>
              <Card
                sx={{
                  borderRadius: 3,
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <CardMedia
                  component="img"
                  height="400"
                  image={Spotlight.image} // Đường dẫn ảnh
                  alt={Spotlight.title}
                  sx={{
                    objectFit: "cover",
                    transition: "filter 0.3s ease",
                    filter: "brightness(1.5)",
                  }}
                />
                <CardContent
                  sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    color: "white",
                    backgroundColor: "rgba(0, 0, 0, 0.4)", // Hiệu ứng làm mờ
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    padding: "40px",
                    flexDirection: "column",
                    textAlign: "center",
                  }}
                >
                  <Typography
                    variant="h5"
                    component="div"
                    sx={{ fontWeight: "bold", fontFamily: "revert" }}
                  >
                    {Spotlight.title}
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    component={Link} // Link khi bấm nút sẽ chuyển trang
                    to={Spotlight.link} // Link chuyển trang
                    sx={{
                      color: "white",
                      backgroundColor: "#0066CC",
                      borderRadius: "50px",
                      alignSelf: "flex-end",
                      marginTop: "auto", // Đẩy nút xuống đáy
                    }}
                  >
                    Shop Now
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
};

export default Contents;
