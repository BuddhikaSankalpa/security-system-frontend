import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MdSensors, MdCheckCircle, MdOutlineEmergencyShare, MdOutlineRoom, MdClose, MdVolumeUp, MdVolumeOff } from "react-icons/md";
import { IoAlertCircle, IoWarning } from "react-icons/io5";
import { FaUserShield, FaFireExtinguisher, FaUsers } from "react-icons/fa";
import { TbHandClick } from "react-icons/tb";
import { io } from 'socket.io-client';
import { toast } from 'react-hot-toast';

const envUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000/api";
const socketUrl = envUrl.replace(/\/api\/?$/, ''); 

export default function AdminDashboard() {
  const [selectedFlow, setSelectedFlow] = useState(null);
  const [activeAlerts, setActiveAlerts] = useState([]); 
  
  const [isMuted, setIsMuted] = useState(localStorage.getItem('systemMuted') === 'true'); 

  const closeModal = () => setSelectedFlow(null);

  useEffect(() => {
    const fetchPendingAlerts = async () => {
        try {
            const response = await axios.get(`${envUrl}/alerts`);
            setActiveAlerts(response.data.filter(a => a.status !== 'Resolved'));
        } catch (err) {
            console.error("Failed to load initial alerts", err);
        }
    };
    fetchPendingAlerts();

    const socket = io(socketUrl, { transports: ['websocket'] });

    socket.on('new-emergency', (alertData) => {
      toast.error(`EMERGENCY: ${alertData.type || 'Unknown'} at ${alertData.location || 'Unknown Location'}`, {
        duration: 8000,
        position: 'top-right',
      });
      setActiveAlerts((prev) => [...prev, alertData]);
    });

    socket.on('alert-resolved', (resolvedAlertId) => {
        setActiveAlerts((prev) => prev.filter(alert => alert._id !== resolvedAlertId));
    });

    return () => socket.disconnect();
  }, []); 

  const toggleMute = () => {
    const newMutedState = !isMuted;
    setIsMuted(newMutedState);
    localStorage.setItem('systemMuted', newMutedState);
    window.dispatchEvent(new Event('mute-toggled')); 
  };

  const flowList = ["FLOW 01", "FLOW 02", "FLOW 03", "FLOW 04"];
  const hasActiveAlerts = activeAlerts.length > 0;

  const empAlert = activeAlerts.find(a => a.type === "Employee Emergency");
  const fireAlert = activeAlerts.find(a => a.type?.includes("Fire"));
  const btnAlert = activeAlerts.find(a => a.type === "Button Emergency");

  return (
    <div className="p-8 w-full min-h-screen bg-[#090D14] text-slate-300 relative overflow-hidden font-sans">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:40px_40px] opacity-20 pointer-events-none"></div>

      <div className="relative z-10">
        <div className="mb-8 flex justify-between items-end">
          <div>
            <h1 className="text-3xl font-bold text-white tracking-tight">Dashboard Overview</h1>
            <p className="text-slate-400 mt-1">Welcome back, Admin. Here is what's happening today.</p>
          </div>
          <div className="text-right flex items-center gap-4">
            
            <button 
              onClick={toggleMute}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-bold transition-all border ${
                isMuted 
                ? 'bg-slate-800 text-slate-400 border-slate-700 hover:bg-slate-700' 
                : hasActiveAlerts
                  ? 'bg-red-500/20 text-red-400 border-red-500/50 hover:bg-red-500/30 shadow-[0_0_15px_rgba(239,68,68,0.3)] animate-pulse'
                  : 'bg-green-500/10 text-green-400 border-green-500/30 hover:bg-green-500/20'
              }`}
            >
              {isMuted ? <><MdVolumeOff size={20} /> ALARM MUTED</> : <><MdVolumeUp size={20} /> SYSTEM SOUND ON</>}
            </button>

            <p className="text-sm font-bold text-blue-400 drop-shadow-[0_0_5px_rgba(59,130,246,0.4)]">
              {new Date().toDateString()}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-[#111826] p-6 rounded-xl shadow-lg border border-slate-800 flex items-center justify-between hover:border-blue-500/50 transition duration-300">
            <div>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Total</p>
              <h3 className="text-xl font-black text-white">Employees</h3>
            </div>
            <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-400 shrink-0 border border-blue-500/30">
              <FaUsers size={24} />
            </div>
          </div>
          <div className="bg-[#111826] p-6 rounded-xl shadow-lg border border-slate-800 flex items-center justify-between hover:border-indigo-500/50 transition duration-300">
            <div>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Monitored</p>
              <h3 className="text-xl font-black text-white">Flows & Rooms</h3>
            </div>
            <div className="w-12 h-12 rounded-full bg-indigo-500/10 flex items-center justify-center text-indigo-400 shrink-0 border border-indigo-500/30">
              <MdOutlineRoom size={24} />
            </div>
          </div>
          <div className="bg-[#111826] p-6 rounded-xl shadow-lg border border-slate-800 flex items-center justify-between hover:border-emerald-500/50 transition duration-300">
            <div>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Active Duty</p>
              <h3 className="text-xl font-black text-white">Security Officers</h3>
            </div>
            <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-400 shrink-0 border border-emerald-500/30">
              <FaUserShield size={24} />
            </div>
          </div>
          <div className="bg-[#111826] p-6 rounded-xl shadow-lg border border-slate-800 flex items-center justify-between hover:border-green-500/50 transition duration-300">
            <div>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">System Grid</p>
              <h3 className="text-xl font-black text-green-400 drop-shadow-[0_0_8px_rgba(34,197,94,0.3)]">Online</h3>
            </div>
            <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center text-green-400 shrink-0 border border-green-500/30 shadow-[0_0_15px_rgba(34,197,94,0.15)]">
              <MdCheckCircle size={24} />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-[#111826] rounded-xl shadow-lg border border-slate-800 overflow-hidden flex flex-col">
            <div className="p-6 border-b border-slate-800 bg-[#0d131f] flex justify-between items-center">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <MdSensors className="text-blue-500" /> Flows and Rooms
              </h2>
              {hasActiveAlerts && (
                <span className="bg-red-500/20 text-red-400 border border-red-500/50 px-3 py-1 rounded-full text-xs font-bold animate-pulse">
                  {activeAlerts.length} Active Alerts
                </span>
              )}
            </div>
            
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6 flex-1 bg-[#090D14]/50">
              {flowList.map((flowName) => {
                // Extract the number from "FLOW 01" as "1"
                const flowNum = parseInt(flowName.replace(/\D/g, ''), 10).toString(); 

                // Filter for both "FLOW 1" and "FLOW 01"
                const flowAlerts = activeAlerts.filter(alert => {
                  if (!alert?.location) return false;
                  const locUpper = alert.location.toUpperCase();
                  return locUpper.includes(`FLOW 0${flowNum}`) || locUpper.includes(`FLOW ${flowNum}`) || locUpper.includes(`FLOW${flowNum}`);
                });

                const isCritical = flowAlerts.length > 0; 
                
                const roomsInDanger = flowAlerts.map(a => a.location.includes('-') ? a.location.split('-')[1].trim() : a.location);
                const uniqueRooms = [...new Set(roomsInDanger)].join(', ');

                return (
                  <div 
                    key={flowName}
                    onClick={() => setSelectedFlow(flowName)}
                    className={`rounded-xl p-8 flex flex-col items-center justify-center relative overflow-hidden group cursor-pointer transition-all ${
                      isCritical 
                      ? 'bg-red-500/10 border-2 border-red-500/50 shadow-[0_0_20px_rgba(239,68,68,0.25)] hover:bg-red-500/20' 
                      : 'bg-green-500/5 border border-green-500/20 hover:border-green-500/40 hover:bg-green-500/10'
                    }`}
                  >
                    {isCritical && <div className="absolute inset-0 bg-red-500/10 animate-pulse pointer-events-none"></div>}
                    {isCritical ? (
                       <IoAlertCircle size={40} className="text-red-500 mb-3 drop-shadow-[0_0_8px_rgba(239,68,68,0.8)] relative z-10 group-hover:scale-110 transition-transform" />
                    ) : (
                       <MdCheckCircle size={30} className="text-green-500/50 mb-3 group-hover:scale-110 transition-transform" />
                    )}
                    <h3 className={`text-2xl font-black tracking-wider relative z-10 ${isCritical ? 'text-red-400' : 'text-green-400/80'}`}>
                      {flowName}
                    </h3>
                    
                    <span className={`mt-2 px-3 py-1 text-xs font-bold rounded-full uppercase relative z-10 border ${
                      isCritical ? 'bg-red-500/20 text-red-300 border-red-500/30' : 'text-slate-500 border-transparent'
                    }`}>
                      {isCritical ? `CRITICAL - ${uniqueRooms}` : 'Secured'}
                    </span>

                  </div>
                );
              })}
            </div>
          </div>

          <div className="bg-[#111826] rounded-xl shadow-lg border border-slate-800 flex flex-col">
            <div className="p-6 border-b border-slate-800 bg-[#0d131f]">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <IoWarning className="text-orange-500" /> Quick Actions Needed
              </h2>
            </div>
            <div className="p-6 space-y-4 flex-1 flex flex-col justify-center">
              
              <button className={`w-full py-4 px-4 rounded-xl font-black text-lg transition-all flex items-center justify-between group uppercase tracking-wide border shadow-[0_0_15px_rgba(249,115,22,0.05)] ${
                  empAlert
                  ? 'bg-red-600 text-white border-red-400 shadow-[0_0_30px_rgba(239,68,68,0.8)] animate-pulse'
                  : 'bg-orange-500/10 border-orange-500/30 text-orange-400 hover:bg-orange-500/20 hover:border-orange-500/50'
              }`}>
                <span className="flex items-center gap-3">
                  <MdOutlineEmergencyShare size={24} className="group-hover:scale-110 transition-transform shrink-0" /> 
                  <div className="flex flex-col text-left leading-tight">
                    <span>Employee Emergency</span>
                    {empAlert && <span className="text-[12px] text-white font-bold mt-1 tracking-widest">{empAlert.location}</span>}
                  </div>
                </span>
              </button>

              <button className={`w-full py-4 px-4 rounded-xl font-black text-lg transition-all flex items-center justify-between group uppercase tracking-wide border shadow-[0_0_15px_rgba(239,68,68,0.05)] ${
                  fireAlert
                  ? 'bg-red-600 text-white border-red-400 shadow-[0_0_30px_rgba(239,68,68,0.8)] animate-pulse'
                  : 'bg-red-500/10 border-red-500/30 text-red-400 hover:bg-red-500/20 hover:border-red-500/50'
              }`}>
                <span className="flex items-center gap-3">
                  <FaFireExtinguisher size={22} className="group-hover:scale-110 transition-transform shrink-0" /> 
                  <div className="flex flex-col text-left leading-tight">
                    <span>Fire Emergency</span>
                    {fireAlert && <span className="text-[12px] text-white font-bold mt-1 tracking-widest">{fireAlert.location}</span>}
                  </div>
                </span>
              </button>

              <button className={`w-full py-4 px-4 rounded-xl font-black text-lg transition-all flex items-center justify-between group uppercase tracking-wide mt-2 border shadow-[0_0_20px_rgba(239,68,68,0.3)] ${
                  btnAlert
                  ? 'bg-red-600 text-white border-red-400 shadow-[0_0_30px_rgba(239,68,68,0.8)] animate-pulse'
                  : 'bg-gradient-to-r from-red-600 to-red-800 text-white hover:from-red-500 hover:to-red-700 border-red-500'
              }`}>
                <span className="flex items-center gap-3">
                  <TbHandClick size={24} className="group-hover:scale-110 transition-transform shrink-0" /> 
                  <div className="flex flex-col text-left leading-tight">
                    <span>Button Emergency</span>
                    {btnAlert && <span className="text-[12px] text-white font-bold mt-1 tracking-widest">{btnAlert.location}</span>}
                  </div>
                </span>
              </button>

            </div>
          </div>
        </div>
      </div>

      {selectedFlow && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 animate-[fadeIn_0.2s_ease-in-out]">
          <div className="bg-[#111826] border border-slate-700 rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.8)] w-full max-w-2xl overflow-hidden relative">
            <div className="flex justify-between items-center p-6 border-b border-slate-800 bg-[#0d131f]">
              <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                <MdOutlineRoom className="text-blue-500" /> Rooms of {selectedFlow}
              </h2>
              <button onClick={closeModal} className="text-slate-400 hover:text-white hover:bg-slate-800 p-2 rounded-full transition-colors">
                <MdClose size={24} />
              </button>
            </div>

            <div className="p-8 grid grid-cols-1 sm:grid-cols-2 gap-6 bg-[#090D14]/80">
              {[1, 2, 3, 4].map(roomNum => {
                const roomName = `Room 0${roomNum}`;
                const roomNameSingle = `Room ${roomNum}`; // For values like "Room 2"
                
                // ✔️ This is the changed section
                const isRoomCritical = activeAlerts.some(alert => {
                  const loc = (alert?.location || "").toUpperCase();
                  
                  // 1. Check if the flow matches exactly
                  const isCorrectFlow = loc.includes(selectedFlow.toUpperCase()) || loc.includes(`FLOW ${parseInt(selectedFlow.replace(/\D/g, ''))}`);
                  
                  // 2. Check if the room matches exactly
                  const isCorrectRoom = loc.includes(roomName.toUpperCase()) || loc.includes(roomNameSingle.toUpperCase());

                  // 3. Return true only if both flow and room match
                  return isCorrectFlow && isCorrectRoom;
                });

                return (
                  <div key={roomNum} className={`border rounded-xl p-8 flex flex-col items-center justify-center transition-all ${isRoomCritical ? 'bg-red-500/10 border-red-500/40 shadow-[0_0_15px_rgba(239,68,68,0.15)] animate-pulse' : 'bg-slate-800/30 border-slate-700'}`}>
                    <h4 className="text-xl font-bold text-white mb-2">{roomName}</h4>
                    {isRoomCritical ? (
                      <span className="text-red-400 font-bold flex items-center gap-1"><IoAlertCircle /> Danger Detected</span>
                    ) : (
                      <span className="text-green-400 font-bold flex items-center gap-1"><MdCheckCircle /> Safe Status</span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}