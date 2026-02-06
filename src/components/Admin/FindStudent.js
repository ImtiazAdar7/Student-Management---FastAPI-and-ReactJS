import { useState } from "react";
import { getStudentById } from "../../api/api";
import BackButton from "../BackButton";

const FindStudent = () => {
  const [id, setId] = useState("");
  const [student, setStudent] = useState(null);

  const handleSearch = async () => {
    if (!id) return alert("Enter student ID");
    try {
      const res = await getStudentById(id);
      setStudent(res.data);
    } catch (err) {
      alert("Student not found");
      setStudent(null);
    }
  };

  return (
    <div className="container">
      <h2>Find Student by ID</h2>
      <input
        type="number"
        placeholder="Enter Student ID"
        value={id}
        onChange={e => setId(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>

      {student && (
        <div className="profile-card">
          <p><strong>ID:</strong> {student.id}</p>
          <p><strong>Name:</strong> {student.first_name} {student.last_name}</p>
          <p><strong>Email:</strong> {student.email}</p>
          <p><strong>Username:</strong> {student.username}</p>
          <p><strong>Gender:</strong> {student.gender}</p>
          <p><strong>Department:</strong> {student.department}</p>
          <p><strong>Role:</strong> {student.role}</p>
        </div>
      )}

      <BackButton />
    </div>
  );
};

export default FindStudent;
