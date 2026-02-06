import axios from "axios";

const API = axios.create({
  baseURL: "https://student-management-fastapi-and-reactjs-89hn.onrender.com/api",
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");

  const publicRoutes = [
    "/login",
    "/register/student",
    "/register/admin"
  ];

  const isPublic = publicRoutes.some(route =>
    config.url?.includes(route)
  );

  if (token && !isPublic) {
    config.headers.Authorization = `Bearer ${token}`;
  } else {
    delete config.headers.Authorization;
  }

  return config;
});

export const registerStudent = (data) => API.post("/register/student", data);
export const registerAdmin = (data) => API.post("/register/admin", data);
export const loginUser = (data) => API.post("/login", data);
export const getProfile = () => API.get("/me");
export const updateProfile = (data) => API.put("/me", data);

export const getStudents = (page = 1, size = 10) =>
  API.get(`/students?page=${page}&size=${size}`);
export const getStudentById = (id) => API.get(`/students/${id}`);
export const updateStudentById = (id, data) => API.put(`/students/${id}`, data);
export const deleteStudentById = (id) => API.delete(`/students/${id}`);

export default API; // ✅ THIS FIXES THE ERROR

