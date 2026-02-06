import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      <Link to="/">Home</Link>
      {user && <span>Hello, {user.first_name}</span>}
      {user && <button onClick={() => { logout(); navigate("/"); }}>Logout</button>}
    </nav>
  );
};

export default Navbar;
