import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Classroom from "./pages/Classroom/Classroom";
import Login from "./pages/Login/Login";
import Admin from "./pages/Admin/Admin";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/classroom" element={<Classroom />} />
      <Route path="/login" element={<Login />} />
      <Route element={<ProtectedRoute role="ADMIN" />}>
        <Route path="/admin" element={<Admin />} />
      </Route>
    </Routes>
  );
}

export default App;