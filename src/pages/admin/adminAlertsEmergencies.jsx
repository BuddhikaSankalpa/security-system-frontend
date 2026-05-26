import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { io } from 'socket.io-client';
import { IoAlertCircle, IoCheckmarkCircle } from "react-icons/io5";
import { FaFireExtinguisher } from "react-icons/fa";
import { MdOutlineEmergencyShare } from "react-icons/md";
import { TbHandClick } from "react-icons/tb";
import Loader from "../../components/loader";

const envUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000/api";
const socketUrl = envUrl.replace(/\/api\/?$/, ''); 
const socket = io(socketUrl, { transports: ['websocket'] });

export default function AdminAlertsEmergencies() {
  const [alerts, setAlerts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchAlerts();

    // Listen for new incoming alerts and keep only the latest 20
    socket.on('new-emergency', (alertData) => {
      setAlerts((prev) => [alertData, ...prev].slice(0, 20));
    });

    return () => socket.off('new-emergency');
  }, []);

  const fetchAlerts = async () => {
    try {
      const response = await axios.get(`${envUrl}/alerts`);
      // Keep only the first 20 alerts for the UI
      setAlerts(response.data.slice(0, 20));
    } catch (err) {
      console.log(err);
      toast.error("Failed to load alerts.");
    } finally {
      setIsLoading(false);
    }
  };

  const resolveAlert = async (id) => {
    try {
      await axios.put(`${envUrl}/alerts/${id}/resolve`);
      
      setAlerts((prev) => prev.map(alert => 
        alert._id === id ? { ...alert, status: 'Resolved' } : alert
      ));
      
      toast.success("Alert Marked as Resolved!");
    } catch (err) {
      console.log(err);
      toast.error("Failed to resolve alert.");
    }
  };

  const resolveAllAlerts = async () => {
    const pendingAlerts = alerts.filter(alert => alert.status !== 'Resolved');
    if (pendingAlerts.length === 0) return;

    try {
      await Promise.all(
        pendingAlerts.map(alert => axios.put(`${envUrl}/alerts/${alert._id}/resolve`))
      );

      setAlerts((prev) => prev.map(alert => ({ ...alert, status: 'Resolved' })));
      toast.success("All Alerts Marked as Resolved!");
    } catch (err) {
      console.log(err);
      toast.error("Failed to resolve all alerts.");
    }
  };

  const getAlertIcon = (type) => {
    if (type?.includes("Fire")) return <FaFireExtinguisher size={24} className="text-red-500" />;
    if (type?.includes("Employee") || type?.includes("Man Down")) return <MdOutlineEmergencyShare size={24} className="text-orange-500" />;
    return <TbHandClick size={24} className="text-red-400" />; 
  };

  const hasPendingAlerts = alerts.some(alert => alert.status !== 'Resolved');

  return (
    <div className="p-8 w-full min-h-screen bg-[#090D14] text-slate-300 relative overflow-hidden font-sans">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:40px_40px] opacity-20 pointer-events-none"></div>

      <div className="relative z-10">
        <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
              <IoAlertCircle className="text-red-500 drop-shadow-[0_0_8px_rgba(239,68,68,0.8)]" /> 
              Incident Command Log
            </h1>
            <p className="text-slate-400 mt-1">Review and manage all critical security and environmental alerts.</p>
          </div>
          
          {hasPendingAlerts && (
            <button 
              onClick={resolveAllAlerts}
              className="px-6 py-2.5 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white rounded-lg font-bold tracking-wide uppercase transition-all shadow-[0_0_15px_rgba(34,197,94,0.3)] flex items-center justify-center gap-2"
            >
              <IoCheckmarkCircle size={20} /> Mark as Resolved All
            </button>
          )}
        </div>

        <div className="space-y-4">
          {isLoading ? (
            <div className="flex justify-center py-20"><Loader /></div>
          ) : alerts.length === 0 ? (
            <div className="text-center py-20 bg-[#111826]/50 rounded-xl border border-dashed border-slate-800 text-slate-500 font-bold uppercase tracking-widest">
              No Incidents Recorded
            </div>
          ) : (
            alerts.map((alert, index) => {
              const isResolved = alert.status === 'Resolved';

              return (
                <div 
                  key={alert._id || index} 
                  className={`p-6 rounded-xl border flex flex-col md:flex-row items-start md:items-center justify-between gap-4 transition-all ${
                    isResolved 
                    ? 'bg-[#111826]/80 border-slate-800 opacity-70' 
                    : 'bg-red-500/10 border-red-500/40 shadow-[0_0_15px_rgba(239,68,68,0.15)]' 
                  }`}
                >
                  <div className="flex items-center gap-5">
                    <div className={`w-14 h-14 rounded-xl flex items-center justify-center shrink-0 border ${
                      isResolved ? 'bg-slate-800 border-slate-700' : 'bg-red-500/20 border-red-500/50'
                    }`}>
                      {isResolved ? <IoCheckmarkCircle size={28} className="text-green-500" /> : getAlertIcon(alert.type)}
                    </div>

                    <div>
                      <div className="flex items-center gap-3">
                        <h3 className={`text-lg font-black uppercase tracking-wide ${isResolved ? 'text-slate-300' : 'text-red-400'}`}>
                          {alert.type}
                        </h3>
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                          isResolved ? 'bg-green-500/20 text-green-400 border border-green-500/30' : 'bg-red-500 text-white animate-pulse'
                        }`}>
                          {alert.status}
                        </span>
                      </div>
                      
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 mt-1 text-sm text-slate-400 font-medium">
                        <p>📍 Location: <strong className="text-white">{alert.location}</strong></p>
                        <p>⏱️ Time: {new Date(alert.createdAt || Date.now()).toLocaleString()}</p>
                      </div>
                      
                      {alert.description && (
                         <p className="text-xs text-slate-500 mt-2 bg-slate-900/50 inline-block px-3 py-1 rounded">
                           Details: {alert.description}
                         </p>
                      )}
                    </div>
                  </div>

                  {!isResolved && (
                    <button 
                      onClick={() => resolveAlert(alert._id)}
                      className="w-full md:w-auto px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white rounded-lg font-bold tracking-wide uppercase transition-all shadow-lg flex items-center justify-center gap-2"
                    >
                      <IoCheckmarkCircle size={20} /> Mark as Resolved
                    </button>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}