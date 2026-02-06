import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

const Home = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const requireAdmin = (path) => {
    if (!user) {
      alert("Please login as admin first");
      navigate("/login");
      return;
    }

    if (user.role !== "admin") {
      alert("Admin access only");
      return;
    }

    navigate(path);
  };

  return (
    <div className="container">
      <h1>Student Management - Imtiaz Adar</h1>

      {/* --------------------
          Not logged in
      -------------------- */}
      {!user && (
        <div className="button-group">
          <button className="btn-login" onClick={() => navigate("/login")}>
            Login
          </button>
          <button className="btn-register" onClick={() => navigate("/register/student")}>
            Student Registration
          </button>
          <button className="btn-register" onClick={() => navigate("/register/admin")}>
            Admin Registration
          </button>

          {/* Admin-only features (login required) */}
          <button className="secondary" onClick={() => requireAdmin("/admin/students")}>
            Student List (Admin)
          </button>
          <button className="secondary" onClick={() => requireAdmin("/admin/students/find")}>
            Find Student by ID (Admin)
          </button>
        </div>
      )}

      {/* --------------------
          Logged in
      -------------------- */}
      {user && (
        <div className="button-group">
          <h2>
            Welcome, {user.first_name} ({user.role})
          </h2>

          <button className="secondary" onClick={() => navigate("/profile")}>
            My Profile
          </button>

          {user.role === "admin" && (
            <>
              <hr />
              <h3>Admin Actions</h3>

              <button className="secondary" onClick={() => navigate("/admin/students")}>
                Student List
              </button>

              <button className="secondary" onClick={() => navigate("/admin/students/find")}>
                Find Student by ID
              </button>

              <button className="secondary" onClick={() => navigate("/admin/students/add")}>
                Add Student
              </button>
            </>
          )}

          <button className="btn-logout" onClick={() => { logout(); navigate("/"); }}>
            Logout
          </button>
        </div>
      )}

      {/* --------------------
          Footer with Portfolio
      -------------------- */}
      <p className="footer-text">
        All rights reserved by Imtiaz Adar
      </p>
      <p className="footer-text">
        Visit my website:{" "}
        <a
          href="https://tinyurl.com/Portfolio1Imtiaz"
          target="_blank"
          rel="noopener noreferrer"
        >
          Portfolio
        </a>
      </p>
    </div>
  );
};

export default Home;