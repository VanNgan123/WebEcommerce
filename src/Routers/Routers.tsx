import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import { About, AccountSetting, AdminProducts, AdminUser, Buy, ByCategoryProducts, Cart, Home, Login, OrderHistoryPage, ProductDetail, Products, Shop, SignUp } from '../pages';
import ScrollToTop from '../components/ScrollToTop';
import AdminOrder from '../pages/Admin/AdminOrder';
import WithAdminAuth from '../hocs/WithAdminAuth';
import WithAuthHome from '../hocs/WithAuthHome';



// Protected routes Admin
const ProtectedAdminProducts = WithAdminAuth(AdminProducts);
const ProtectedAdminUser = WithAdminAuth(AdminUser);
const ProtectedAdminOrder = WithAdminAuth(AdminOrder);

//Protected routes Home 
const ProtectedCart = WithAuthHome(Cart);
const ProtectedBuy = WithAuthHome(Buy);
const ProtectedOrderHistory = WithAuthHome(OrderHistoryPage);


const Routers = () => {
  return (
    <div>
      <Router>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} >
          </Route>
          <Route path="/products/category/:categoryId" element={<ByCategoryProducts />} />
          <Route path="/product/detail/:id" element={<ProductDetail />} />
          {/* <Route path="/products/:category" element={<ProductCategory />} /> */}
          <Route path="/login" element={<Login />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/cart" element={<ProtectedCart />} />
          <Route path='/about' element={<About />} />
          <Route path='/order' element={<ProtectedOrderHistory />} />
          <Route path='/buy' element={<ProtectedBuy />} />
          <Route path='/profile' element={<AccountSetting />} />
        {/* admin */}
          <Route path='/admin/product' element={<ProtectedAdminProducts />} />
          <Route path='/admin/user' element={<ProtectedAdminUser />} />
          <Route path='/admin/order' element={<ProtectedAdminOrder />} />
          {/* <Route path="*" element={<ErrorPage />} /> */}
        </Routes>
      </Router>
    </div>
  );
};

export default Routers;