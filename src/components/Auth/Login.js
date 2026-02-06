import { useState, useContext, useEffect } from "react";
import { loginUser } from "../../api/api";
import { AuthContext } from "../../contexts/AuthContext";
import BackButton from "../BackButton";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { fetchProfile, user } = useContext(AuthContext);

  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
      navigate("/profile"); // already logged in
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (user) {
    alert("You are already logged in. Please logout first.");
    return;
  }
    try {
      const res = await loginUser({ username, password });
      localStorage.setItem("access_token", res.data.access_token);
      await fetchProfile();
      alert("Login successful!");
      navigate("/profile", { replace: true });
    } catch (err) {
      alert(err.response?.data?.detail || "Login failed");
    }
  };

  return (
    <div className="container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
        <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
        <button type="submit">Login</button>
      </form>
      <button onClick={() => navigate("/register/student")}>Student Register</button>
      <button onClick={() => navigate("/register/admin")}>Admin Register</button>

      <BackButton />
    </div>
  );
};

export default Login;
