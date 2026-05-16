import { Routes, Route, Link } from 'react-router-dom';
import React, { useState, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';
import axios from 'axios';

import { MdDashboard, MdSensors, MdOutlineSecurity } from "react-icons/md";
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
  const [pendingAlerts, setPendingAlerts] = useState([]);
  
  // Check localStorage to see whether it was muted before
  const [isMuted, setIsMuted] = useState(localStorage.getItem('systemMuted') === 'true');
  const audioRef = useRef(null);

  useEffect(() => {
    // Initialize system-wide audio here
    audioRef.current = new Audio('/siren.mp3');
    audioRef.current.loop = true;

    // Load pending alerts from the database
    const fetchAlerts = async () => {
      try {
        const res = await axios.get(`${envUrl}/alerts`);
        setPendingAlerts(res.data.filter(a => a.status !== 'Resolved'));
      } catch(e) { console.error(e); }
    };
    fetchAlerts();

    const socket = io(socketUrl, { transports: ['websocket'] });
    
    // Add new alerts to the list as they arrive
    socket.on('new-emergency', (alert) => {
      setPendingAlerts(prev => [alert, ...prev]);
    });
    
    // Remove alerts from the list when resolved
    socket.on('alert-resolved', (id) => {
      setPendingAlerts(prev => prev.filter(a => a._id !== id));
    });

    // Listen for mute toggle events from the dashboard
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

  // Auto play/pause audio based on active alerts and mute state
  useEffect(() => {
    if (pendingAlerts.length > 0 && !isMuted) {
      if (audioRef.current) audioRef.current.play().catch(e => console.log("Play blocked:", e));
    } else {
      if (audioRef.current) audioRef.current.pause();
    }
  }, [pendingAlerts.length, isMuted]);

  // This becomes true as long as there is at least one unresolved alert
  const hasActiveAlerts = pendingAlerts.length > 0;

  return (
    <div className="w-screen h-screen flex overflow-hidden">
      {/* ── Sidebar ── */}
      <div className="fixed top-0 left-0 h-screen w-[250px] bg-[#0F172A] flex flex-col z-50">
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
          
          {/* 🚨 Alerts Link: Blink red while unresolved */}
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
          <div className="mt-auto pt-4 border-t border-white/10">
            <Link className="h-[46px] flex items-center gap-3 px-4 text-gray-300 hover:text-white hover:bg-gray-700 rounded-lg transition text-sm font-medium" to="/admin/settings">
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
          <Route path="/employers" element={<AdminSensorsDevices />} />
          <Route path="/alerts" element={<AdminAlertsEmergencies />} />
          <Route path="/personnel" element={<AdminSecurityPersonnel />} />
          <Route path="/reports" element={<AdminReportsAnalytics />} />
          <Route path="/settings" element={<AdminSettings />} />
        </Routes>
      </div>
    </div>
  );
}