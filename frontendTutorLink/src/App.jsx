import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import StudentDashboard from "./Dashboard";
import TeacherDashboard from "./TeacherDashboard";
import StudentSignUp from "./SignUp";
import Login from "./LoginForm";

function App() {
  const handleLogin = (role, user) => {
    if (!role || !user) {
      console.error("Login error: Role or user data is missing");
      return;
    }

    localStorage.setItem("role", role);
    localStorage.setItem("user", JSON.stringify(user));

    window.location.href = `/${role}-dashboard`;
  };

  const handleLogout = () => {
    localStorage.removeItem("role");
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  const role = localStorage.getItem("role");
  const userData = localStorage.getItem("user");

  let user = null;
  try {
    if (userData && userData !== "undefined") {
      user = JSON.parse(userData);
    }
  } catch (error) {
    console.error("Error parsing user data:", error);
  }

  return (
    <Router>
      <Routes>
        {/* ✅ If there is no role, always redirect to login */}
        <Route path="/" element={<Navigate to={role ? `/${role}-dashboard` : "/login"} />} />

        {/* Student Dashboard Route */}
        <Route
          path="/student-dashboard/*"
          element={
            role === "student" ? (
              <StudentDashboard user={user} handleLogout={handleLogout} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        {/* Teacher Dashboard Route */}
        <Route
          path="/teacher-dashboard/*"
          element={
            role === "teacher" ? (
              <TeacherDashboard user={user} handleLogout={handleLogout} />  // ✅ Ensure `handleLogout` is passed
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        <Route path="/signup" element={<StudentSignUp />} />

        {/* Login Route */}
        <Route path="/login" element={<Login onLogin={handleLogin} />} />

        {/* Catch-All Redirect */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
