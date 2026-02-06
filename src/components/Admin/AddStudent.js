import { useState } from "react";
import { registerStudent } from "../../api/api";
import { useNavigate } from "react-router-dom";

const AddStudent = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    username: "",
    gender: "male",
    department: "",
    password: "",
    confirm_password: ""
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerStudent(form);
      alert("Student added successfully!");
      navigate("/admin/students");
    } catch (err) {
      alert(err.response?.data?.detail || "Failed to add student");
    }
  };

  return (
    <div className="container">
      <h2>Add Student</h2>

      <form onSubmit={handleSubmit}>
        <input name="first_name" placeholder="First Name" onChange={handleChange} />
        <input name="last_name" placeholder="Last Name" onChange={handleChange} />
        <input name="email" placeholder="Email" onChange={handleChange} />
        <input name="username" placeholder="Username" onChange={handleChange} />

        <select name="gender" onChange={handleChange}>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>

        <input name="department" placeholder="Department" onChange={handleChange} />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} />
        <input type="password" name="confirm_password" placeholder="Confirm Password" onChange={handleChange} />

        <button type="submit">Add Student</button>
      </form>

      <button onClick={() => navigate(-1)}>Back</button>
    </div>
  );
};

export default AddStudent;
