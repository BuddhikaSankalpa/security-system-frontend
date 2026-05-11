import { Routes, Route, Link } from 'react-router-dom';

import { MdDashboard, MdSensors, MdOutlineSecurity } from "react-icons/md";
import { FaMapMarkedAlt, FaUsers } from "react-icons/fa";
import { IoAlertCircle, IoDocumentText, IoSettingsSharp } from "react-icons/io5";

import AdminDashboard from "./admin/adminDashboard";
import AdminLiveMonitoring from './admin/adminLiveMonitoring';
import AdminSensorsDevices from './admin/adminSensorsDevices';
import AdminAlertsEmergencies from './admin/adminAlertsEmergencies';
import AdminSecurityPersonnel from './admin/adminSecurityPersonnel';
import AdminReportsAnalytics from './admin/adminReportsAnalytics';
import AdminSettings from './admin/adminSettings';

export default function Admin() {
  return (
    <div className="w-screen h-screen flex overflow-hidden">

      {/* ── Sidebar ── */}
      <div className="fixed top-0 left-0 h-screen w-[250px] bg-[#0F172A] flex flex-col z-50">
        
        {/* Header Area */}
        <Link
          className="w-full h-[60px] bg-[#0F172A] text-[#60A5FA] border-b border-white/10 flex items-center justify-center font-bold text-lg tracking-wide shrink-0 hover:text-white transition"
          to="/"
        >
          <MdOutlineSecurity className="mr-2" size={24} /> Security Grid
        </Link>
        
        {/* Navigation Links */}
        <nav className="flex flex-col p-4 gap-2 flex-1 overflow-y-auto mt-2">
          
          <Link className="h-[46px] flex items-center gap-3 px-4 text-gray-300 hover:text-white hover:bg-blue-600 rounded-lg transition text-sm font-medium" to="/">
            <MdDashboard size={20} /> Dashboard
          </Link>
          
          <Link className="h-[46px] flex items-center gap-3 px-4 text-gray-300 hover:text-white hover:bg-blue-600 rounded-lg transition text-sm font-medium" to="/monitoring">
            <FaMapMarkedAlt size={18} /> Live Monitoring
          </Link>
          
          <Link className="h-[46px] flex items-center gap-3 px-4 text-gray-300 hover:text-white hover:bg-blue-600 rounded-lg transition text-sm font-medium" to="/sensors">
            <MdSensors size={20} /> Sensors & Devices
          </Link>
          
          <Link className="h-[46px] flex items-center gap-3 px-4 text-gray-300 hover:text-white hover:bg-red-600 rounded-lg transition text-sm font-medium" to="/alerts">
            <IoAlertCircle size={20} /> Alerts & Emergencies
          </Link>
          
          <Link className="h-[46px] flex items-center gap-3 px-4 text-gray-300 hover:text-white hover:bg-blue-600 rounded-lg transition text-sm font-medium" to="/personnel">
            <FaUsers size={18} /> Security Personnel
          </Link>
          
          <Link className="h-[46px] flex items-center gap-3 px-4 text-gray-300 hover:text-white hover:bg-blue-600 rounded-lg transition text-sm font-medium" to="/reports">
            <IoDocumentText size={18} /> Reports & Analytics
          </Link>

          {/* Settings එක පල්ලෙහාටම යවන්න */}
          <div className="mt-auto pt-4 border-t border-white/10">
            <Link className="h-[46px] flex items-center gap-3 px-4 text-gray-300 hover:text-white hover:bg-gray-700 rounded-lg transition text-sm font-medium" to="/settings">
              <IoSettingsSharp size={18} /> Settings
            </Link>
          </div>

        </nav>
      </div>

      {/* ── Main Content Area ── */}
      <div className="ml-[250px] flex-1 h-screen overflow-y-auto bg-[#F9FAFB]">
        <Routes>
          <Route path="/" element={<AdminDashboard />} />
          <Route path="/monitoring" element={<AdminLiveMonitoring />} />
          <Route path="/sensors" element={<AdminSensorsDevices />} />
          <Route path="/alerts" element={<AdminAlertsEmergencies />} />
          <Route path="/personnel" element={<AdminSecurityPersonnel />} />
          <Route path="/reports" element={<AdminReportsAnalytics />} />
          <Route path="/settings" element={<AdminSettings />} />
        </Routes>
      </div>

    </div>
  );
}