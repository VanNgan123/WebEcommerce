import React from 'react';
import { Navigate } from 'react-router-dom';

// HOC WithAuthHome để bảo vệ các trang Cart, Buy, và Order
const WithAuthHome = <P extends object>(Component: React.ComponentType<P>): React.FC<P> => {
  return (props: P) => {
    const isAuthenticated = localStorage.getItem('isLogin') === 'true'; // Kiểm tra xem người dùng đã đăng nhập chưa

    // Nếu chưa đăng nhập, chuyển hướng về trang đăng nhập
    if (!isAuthenticated) {
      return <Navigate to="/login" />;
    }

    // Nếu đã đăng nhập, render component
    return <Component {...props} />;
  };
};

export default WithAuthHome;
