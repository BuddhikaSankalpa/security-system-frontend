import { Routes, Route } from "react-router-dom";
import { Toaster } from 'react-hot-toast';
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Admin from "./pages/adminPage";
import AuthPortal from "./pages/AuthPortalPage";

function App() {
  return (
    <div className="w-full h-screen">
      <Toaster position="top-center" />
      <Routes>
        {/* <Route path="/" element={<div>Main page</div>} /> */}
        <Route path="/*" element={<Admin />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/auth" element={<AuthPortal />} />{/* Login and Registration same page */}
      </Routes>
    </div>
  );
}

export default App;