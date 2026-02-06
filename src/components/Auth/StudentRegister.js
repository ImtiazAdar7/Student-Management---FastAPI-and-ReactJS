import { useState } from "react";
import { registerStudent } from "../../api/api";
import BackButton from "../BackButton";
import { useNavigate } from "react-router-dom";



const StudentRegister = () => {
const navigate = useNavigate();
  const [form, setForm] = useState({
    first_name: "", last_name: "", email: "", username: "",
    gender: "male", department: "", password: "", confirm_password: ""
  });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerStudent(form);
      alert("Registration successful!");
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.detail || "Registration failed");
    }
  };

  return (
    <div className="container">
      <h2>Student Registration</h2>
      <form onSubmit={handleSubmit}>
        <input name="first_name" placeholder="First Name" value={form.first_name} onChange={handleChange} />
        <input name="last_name" placeholder="Last Name" value={form.last_name} onChange={handleChange} />
        <input name="email" placeholder="Email" value={form.email} onChange={handleChange} />
        <input name="username" placeholder="Username" value={form.username} onChange={handleChange} />
        <select name="gender" value={form.gender} onChange={handleChange}>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
        <input name="department" placeholder="Department" value={form.department} onChange={handleChange} />
        <input type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} />
        <input type="password" name="confirm_password" placeholder="Confirm Password" value={form.confirm_password} onChange={handleChange} />
        <button type="submit">Register</button>
      </form>
      <button onClick={() => navigate("/login")}>Go to Login</button>

      <BackButton />
    </div>
  );
};

export default StudentRegister;
