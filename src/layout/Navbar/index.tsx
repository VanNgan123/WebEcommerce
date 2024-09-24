import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav  >
      <ul style={{ listStyle: "none" , display: "flex",margin:"66px 0 0 0",backgroundColor:"#E8E8E8" }}>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/login">Login</Link></li>
        <li><Link to="/shop">Shop</Link></li>
        <li><Link to="/sign-up">Sign Up</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
