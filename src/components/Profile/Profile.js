import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";

const Profile = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  if (!user) return <p>Loading...</p>;

  return (
    <div className="container">
      <h2>My Profile</h2>
      <div className="profile-card">
        <p><strong>First Name:</strong> {user.first_name}</p>
        <p><strong>Last Name:</strong> {user.last_name}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Username:</strong> {user.username}</p>
        <p><strong>Gender:</strong> {user.gender}</p>
        {user.role === "student" && (
          <p><strong>Department:</strong> {user.department}</p>
        )}
        <p><strong>Role:</strong> {user.role}</p>
      </div>
      <button onClick={() => navigate("/me-update")}>Update Profile</button>
      <button className="back-btn" onClick={() => navigate(-1)}>Back</button>
    </div>
  );
};

export default Profile;
