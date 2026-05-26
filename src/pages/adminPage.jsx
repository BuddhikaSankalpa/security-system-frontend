import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import React, { useState, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';
import axios from 'axios';

import { MdDashboard, MdSensors, MdOutlineSecurity, MdLogout } from "react-icons/md";
import { FaMapMarkedAlt, FaUsers } from "react-icons/fa";
import { IoAlertCircle, IoDocumentText, IoSettingsSharp } from "react-icons/io5";

import AdminDashboard from "./admin/adminDashboard";
import AdminLiveMonitoring from './admin/adminLiveMonitoring';
import AdminSensorsDevices from './admin/AdmineEployers';
import AdminAlertsEmergencies from './admin/adminAlertsEmergencies';
import AdminSecurityPersonnel from './admin/adminSecurityPersonnel';
import AdminReportsAnalytics from './admin/adminReportsAnalytics';
import AdminSettings from './admin/adminSettings';

const envUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000/api";
const socketUrl = envUrl.replace(/\/api\/?$/, '');

export default function Admin() {
  const navigate = useNavigate();

  const [pendingAlerts, setPendingAlerts] = useState([]);
  
  // CHANGED: New state for the logout confirmation modal
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  
  const [isMuted, setIsMuted] = useState(localStorage.getItem('systemMuted') === 'true');
  const audioRef = useRef(null);

  useEffect(() => {
    audioRef.current = new Audio('/siren.mp3');
    audioRef.current.loop = true;

    const fetchAlerts = async () => {
      try {
        const res = await axios.get(`${envUrl}/alerts`);
        setPendingAlerts(res.data.filter(a => a.status !== 'Resolved'));
      } catch(e) { console.error(e); }
    };
    fetchAlerts();

    const socket = io(socketUrl, { transports: ['websocket'] });
    
    socket.on('new-emergency', (alert) => {
      setPendingAlerts(prev => [alert, ...prev]);
    });
    
    socket.on('alert-resolved', (id) => {
      setPendingAlerts(prev => prev.filter(a => a._id !== id));
    });

    const handleMuteToggle = () => {
      setIsMuted(localStorage.getItem('systemMuted') === 'true');
    };
    window.addEventListener('mute-toggled', handleMuteToggle);

    return () => {
      socket.disconnect();
      if(audioRef.current) audioRef.current.pause();
      window.removeEventListener('mute-toggled', handleMuteToggle);
    };
  }, []);

  useEffect(() => {
    if (pendingAlerts.length > 0 && !isMuted) {
      if (audioRef.current) audioRef.current.play().catch(e => console.log("Play blocked:", e));
    } else {
      if (audioRef.current) audioRef.current.pause();
    }
  }, [pendingAlerts.length, isMuted]);

  // --- CHANGED: Triggers the modal instead of logging out immediately ---
  const handleLogoutClick = () => {
    setShowLogoutConfirm(true);
  };

  // --- CHANGED: The actual logout logic ---
  const executeLogout = () => {
    localStorage.removeItem('token'); 
    localStorage.removeItem('user'); 
    setShowLogoutConfirm(false);
    navigate('/login'); 
  };

  const hasActiveAlerts = pendingAlerts.length > 0;

  return (
    <div className="w-screen h-screen flex overflow-hidden relative">
      {/* ── Sidebar ── */}
      <div className="fixed top-0 left-0 h-screen w-[250px] bg-[#0F172A] flex flex-col z-40">
        <Link className="w-full h-[60px] bg-[#0F172A] text-[#60A5FA] border-b border-white/10 flex items-center justify-center font-bold text-lg tracking-wide shrink-0 hover:text-white transition" to="/admin">
          <MdOutlineSecurity className="mr-2" size={24} /> Security Grid
        </Link>
        
        <nav className="flex flex-col p-4 gap-2 flex-1 overflow-y-auto mt-2">
          <Link className="h-[46px] flex items-center gap-3 px-4 text-gray-300 hover:text-white hover:bg-blue-600 rounded-lg transition text-sm font-medium" to="/admin">
            <MdDashboard size={20} /> Dashboard
          </Link>
          <Link className="h-[46px] flex items-center gap-3 px-4 text-gray-300 hover:text-white hover:bg-blue-600 rounded-lg transition text-sm font-medium" to="/admin/monitoring">
            <FaMapMarkedAlt size={18} /> Live Monitoring
          </Link>
          <Link className="h-[46px] flex items-center gap-3 px-4 text-gray-300 hover:text-white hover:bg-blue-600 rounded-lg transition text-sm font-medium" to="/admin/employers">
            <MdSensors size={20} /> Employers  
          </Link>
          
          <Link 
            className={`h-[46px] flex items-center gap-3 px-4 rounded-lg transition text-sm font-medium ${
              hasActiveAlerts 
              ? 'bg-red-600/80 text-white animate-pulse shadow-[0_0_15px_rgba(239,68,68,0.5)] border border-red-500' 
              : 'text-gray-300 hover:text-white hover:bg-red-600'
            }`} 
            to="/admin/alerts"
          >
            <IoAlertCircle size={20} /> Alerts & Emergencies 
            {hasActiveAlerts && <span className="ml-auto w-2 h-2 rounded-full bg-white"></span>}
          </Link>
          
          <Link className="h-[46px] flex items-center gap-3 px-4 text-gray-300 hover:text-white hover:bg-blue-600 rounded-lg transition text-sm font-medium" to="/admin/personnel">
            <FaUsers size={18} /> Security Personnel
          </Link>
          <Link className="h-[46px] flex items-center gap-3 px-4 text-gray-300 hover:text-white hover:bg-blue-600 rounded-lg transition text-sm font-medium" to="/admin/reports">
            <IoDocumentText size={18} /> Reports & Analytics
          </Link>

          <div className="mt-auto pt-4 border-t border-white/10 flex flex-col gap-1">
            <Link className="h-[46px] flex items-center gap-3 px-4 text-gray-300 hover:text-white hover:bg-gray-700 rounded-lg transition text-sm font-medium" to="/admin/settings">
              <IoSettingsSharp size={18} /> Settings
            </Link>
            
            {/* CHANGED: Now calls handleLogoutClick to open modal */}
            <button 
              onClick={handleLogoutClick} 
              className="w-full h-[46px] flex items-center gap-3 px-4 text-red-400 hover:text-white hover:bg-red-600/80 rounded-lg transition text-sm font-medium outline-none"
            >
              <MdLogout size={18} /> Logout
            </button>
          </div>
        </nav>
      </div>

      {/* ── Main Content Area ── */}
      <div className="ml-[250px] flex-1 h-screen overflow-y-auto bg-[#F9FAFB]">
        <Routes>
          <Route path="/" element={<AdminDashboard />} />
          <Route path="/monitoring" element={<AdminLiveMonitoring />} />
          <Route path="/employers" element={<AdminSensorsDevices />} />
          <Route path="/alerts" element={<AdminAlertsEmergencies />} />
          <Route path="/personnel" element={<AdminSecurityPersonnel />} />
          <Route path="/reports" element={<AdminReportsAnalytics />} />
          <Route path="/settings" element={<AdminSettings />} />
        </Routes>
      </div>

      {/* --- CHANGED: New Logout Confirmation Modal --- */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 p-4">
          <div className="bg-[#111826] border border-slate-700 rounded-2xl w-full max-w-sm p-6 shadow-[0_0_40px_rgba(0,0,0,0.8)] relative">
            <h2 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
               <MdLogout className="text-red-500" /> Confirm Logout
            </h2>
            <p className="text-slate-400 text-sm mb-6">Are you sure you want to securely log out of the Security Grid dashboard?</p>
            
            <div className="flex justify-end gap-3">
              <button 
                onClick={() => setShowLogoutConfirm(false)} 
                className="px-5 py-2.5 rounded-lg text-sm font-bold text-slate-400 hover:text-white bg-slate-800/50 hover:bg-slate-700 border border-slate-700 transition"
              >
                Cancel
              </button>
              <button 
                onClick={executeLogout} 
                className="px-5 py-2.5 rounded-lg text-sm font-bold bg-red-600 text-white hover:bg-red-500 transition shadow-[0_0_15px_rgba(220,38,38,0.3)]"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}