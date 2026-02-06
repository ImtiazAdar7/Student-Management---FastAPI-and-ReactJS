import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./contexts/AuthContext";

// Pages
import AddStudent from "./components/Admin/AddStudent";
import Home from "./components/Home";
import Login from "./components/Auth/Login";
import StudentRegister from "./components/Auth/StudentRegister";
import AdminRegister from "./components/Auth/AdminRegister";
import Profile from "./components/Profile/Profile";
import ProfileUpdate from "./components/Profile/ProfileUpdate";
import StudentList from "./components/Admin/StudentList";
import StudentEdit from "./components/Admin/StudentEdit";
import FindStudent from "./components/Admin/FindStudent";

import Navbar from "./components/Navbar";

function App() {
  const { user } = useContext(AuthContext);

  // Protect routes
  const PrivateRoute = ({ children, adminOnly }) => {
    if (!user) return <Navigate to="/login" />;
    if (adminOnly && user.role !== "admin") return <Navigate to="/profile" />;
    return children;
  };

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />

        {/* Auth */}
        <Route path="/login" element={<Login />} />
        <Route path="/register/student" element={<StudentRegister />} />
        <Route path="/register/admin" element={<AdminRegister />} />

        {/* Profile */}
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
        <Route
          path="/me-update"
          element={
            <PrivateRoute>
              <ProfileUpdate />
            </PrivateRoute>
          }
        />

        {/* Admin student CRUD */}
        <Route
          path="/admin/students"
          element={
            <PrivateRoute adminOnly={true}>
              <StudentList />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/students/add"
          element={
            <PrivateRoute adminOnly={true}>
              <AddStudent />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/students/edit/:id"
          element={
            <PrivateRoute adminOnly={true}>
              <StudentEdit />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/students/find"
          element={
            <PrivateRoute adminOnly={true}>
              <FindStudent />
            </PrivateRoute>
          }
        />

        {/* Catch-all redirect */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
