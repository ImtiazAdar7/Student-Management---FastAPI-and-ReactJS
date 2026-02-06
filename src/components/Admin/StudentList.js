import { useEffect, useState } from "react";
import { getStudents, deleteStudentById } from "../../api/api";
import { Link, useNavigate } from "react-router-dom";
import BackButton from "../BackButton";

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const navigate = useNavigate();

  const fetchStudents = async () => {
    try {
      const res = await getStudents();
      setStudents(res.data);
    } catch (err) {
      alert("Error fetching students");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure?")) {
      try {
        await deleteStudentById(id);
        fetchStudents();
      } catch (err) {
        alert("Delete failed");
      }
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <div className="container">
      <h2>Student List</h2>
      <button onClick={() => navigate("/admin/students/add")}>
        Add Student
      </button>

      <button onClick={() => navigate("/admin/students/find")}>
        Find Student by ID
      </button>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((s) => (
            <tr key={s.id}>
              <td>{s.id}</td>
              <td>
                {s.first_name} {s.last_name}
              </td>
              <td>{s.email}</td>
              <td>
                <Link to={`/admin/students/edit/${s.id}`}>Edit</Link>
                <button onClick={() => handleDelete(s.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <BackButton />
    </div>
  );
};

export default StudentList;
