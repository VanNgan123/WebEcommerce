import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import { Home, Login, ProductDetail, Products, Shop, SignUp } from '../pages';
import ScrollToTop from '../components/ScrollToTop';

const Routers = () => {
  return (
    <div>
      <Router>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          {/* <Route path="/products/:category" element={<ProductCategory />} /> */}
          <Route path="/login" element={<Login />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/sign-up" element={<SignUp />} />
          {/* <Route path="*" element={<ErrorPage />} /> */}
        </Routes>
      </Router>
    </div>
  );
};

export default Routers;