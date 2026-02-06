import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getStudentById, updateStudentById } from "../../api/api";

const StudentEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({});

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const res = await getStudentById(id);
        setForm(res.data);
      } catch (err) {
        alert("Error fetching student");
      }
    };
    fetchStudent();
  }, [id]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateStudentById(id, form);
      alert("Student updated!");
      navigate("/admin/students");
    } catch (err) {
      alert("Update failed");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="first_name" value={form.first_name || ""} onChange={handleChange} />
      <input name="last_name" value={form.last_name || ""} onChange={handleChange} />
      <input name="email" value={form.email || ""} onChange={handleChange} />
      <input name="username" value={form.username || ""} onChange={handleChange} />
      <select name="gender" value={form.gender || "male"} onChange={handleChange}>
        <option value="male">Male</option>
        <option value="female">Female</option>
        <option value="other">Other</option>
      </select>
      <input name="department" value={form.department || ""} onChange={handleChange} />
      <input type="password" name="password" placeholder="New Password" value={form.password || ""} onChange={handleChange} />
      <button type="submit">Save</button>
    </form>
  );
};

export default StudentEdit;
