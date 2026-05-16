import { Routes, Route } from "react-router-dom";
import { Toaster } from 'react-hot-toast';
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Admin from "./pages/adminPage";
import EmployeeRegisterPage from "./pages/employeeRegistrstionPage";

function App() {
  return (
    <div className="w-full h-screen">
      <Toaster position="top-center" />
      <Routes>
        <Route path="/admin/*" element={<Admin />} />        
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/employee-register" element={<EmployeeRegisterPage />} />
        <Route path="*" element={<LoginPage />} />
      </Routes>
    </div>
  );
}

export default App;