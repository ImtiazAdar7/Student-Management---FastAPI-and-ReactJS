import { useContext, useState, useEffect } from "react";
import { updateProfile, getProfile } from "../../api/api";
import { AuthContext } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import BackButton from "../BackButton";

const ProfileUpdate = () => {
  const { user, fetchProfile } = useContext(AuthContext);
  const [form, setForm] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setForm({
        first_name: user.first_name || "",
        last_name: user.last_name || "",
        email: user.email || "",
        username: user.username || "",
        gender: user.gender || "male",
        department: user.department || "",
        password: ""
      });
    }
  }, [user]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateProfile(form);
      await fetchProfile(); // refresh context user
      alert("Profile updated!");
      navigate("/profile");
    } catch (err) {
      alert(err.response?.data?.detail || "Update failed");
    }
  };

  if (!user) return <p>Loading...</p>;

  return (
    <div className="container">
      <h2>Update Profile</h2>
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

        {/* Only students have department */}
        {user.role === "student" && (
          <input name="department" placeholder="Department" value={form.department} onChange={handleChange} />
        )}

        <input type="password" name="password" placeholder="New Password (optional)" value={form.password} onChange={handleChange} />

        <button type="submit">Save</button>
      </form>

      <BackButton />
    </div>
  );
};

export default ProfileUpdate;
