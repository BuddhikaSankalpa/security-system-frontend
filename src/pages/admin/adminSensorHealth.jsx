import React, { useState } from 'react';
import { MdSensors, MdCheckCircle, MdError, MdWarning, MdOutlineLocationOn, MdBuild } from "react-icons/md";
import { FaWifi, FaBatteryHalf } from "react-icons/fa";

export default function AdminSensorHealth() {
    //temporary data
  const [sensors] = useState([
    { id: "SNR-101", type: "Temperature & Humidity", location: "FLOW 01 - Room 02", status: "Online", battery: "98%", lastPing: "2 mins ago" },
    { id: "SNR-102", type: "Air Quality (AQI)", location: "FLOW 01 - Room 02", status: "Online", battery: "85%", lastPing: "1 min ago" },
    { id: "SNR-103", type: "Smoke Detector", location: "FLOW 02 - Room 04", status: "Warning", battery: "15%", lastPing: "5 mins ago", issue: "Low Battery" },
    { id: "BTN-201", type: "Emergency Wall Button", location: "FLOW 03 - Room 01", status: "Offline", battery: "0%", lastPing: "2 hours ago", issue: "Connection Lost" },
    { id: "WCH-005", type: "Employee Smart Watch", location: "Assigned: EMP-005", status: "Online", battery: "60%", lastPing: "Just now" },
    { id: "SNR-105", type: "Temperature & Humidity", location: "FLOW 04 - Room 03", status: "Online", battery: "100%", lastPing: "3 mins ago" },
  ]);

  const onlineCount = sensors.filter(s => s.status === "Online").length;
  const warningCount = sensors.filter(s => s.status === "Warning").length;
  const offlineCount = sensors.filter(s => s.status === "Offline").length;

  return (
    <div className="p-8 w-full min-h-screen bg-[#090D14] text-slate-300 relative overflow-hidden font-sans">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:40px_40px] opacity-20 pointer-events-none"></div>

      <div className="relative z-10">
        
        {/* ── Page Header ── */}
        <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
              <MdBuild className="text-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.5)]" /> Hardware & Sensor Health
            </h1>
            <p className="text-slate-400 mt-1 uppercase text-xs font-bold tracking-widest">
              System Diagnostics and Device Status
            </p>
          </div>
        </div>

        {/* ── Stats Summary ── */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-[#111826]/80 backdrop-blur-md p-5 rounded-2xl border border-slate-800 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400 border border-blue-500/20">
              <MdSensors size={24} />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-tighter">Total Devices</p>
              <h3 className="text-2xl font-black text-white">{sensors.length}</h3>
            </div>
          </div>
          
          <div className="bg-[#111826]/80 backdrop-blur-md p-5 rounded-2xl border border-slate-800 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center text-green-400 border border-green-500/20 shadow-[0_0_15px_rgba(34,197,94,0.15)]">
              <MdCheckCircle size={24} />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-tighter">Healthy / Online</p>
              <h3 className="text-2xl font-black text-green-400">{onlineCount}</h3>
            </div>
          </div>

          <div className="bg-[#111826]/80 backdrop-blur-md p-5 rounded-2xl border border-slate-800 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-400 border border-orange-500/20 shadow-[0_0_15px_rgba(249,115,22,0.15)]">
              <MdWarning size={24} />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-tighter">Warnings</p>
              <h3 className="text-2xl font-black text-orange-400">{warningCount}</h3>
            </div>
          </div>

          <div className="bg-[#111826]/80 backdrop-blur-md p-5 rounded-2xl border border-slate-800 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center text-red-400 border border-red-500/20 shadow-[0_0_15px_rgba(239,68,68,0.15)]">
              <MdError size={24} />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-tighter">Offline / Faulty</p>
              <h3 className="text-2xl font-black text-red-400">{offlineCount}</h3>
            </div>
          </div>
        </div>

        {/* ── Sensor Grid ── */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {sensors.map((sensor) => {
            const isOnline = sensor.status === "Online";
            const isWarning = sensor.status === "Warning";
            const isOffline = sensor.status === "Offline";

            return (
              <div 
                key={sensor.id} 
                className={`group bg-[#111826]/60 backdrop-blur-sm p-6 rounded-2xl border transition-all duration-300 relative overflow-hidden ${
                  isOffline ? 'border-red-500/50 shadow-[0_0_20px_rgba(239,68,68,0.1)]' 
                  : isWarning ? 'border-orange-500/50 shadow-[0_0_20px_rgba(249,115,22,0.1)]' 
                  : 'border-slate-800 hover:border-slate-600'
                }`}
              >
                <div className="flex flex-col sm:flex-row gap-6 relative z-10">
                  
                  {/* Status Icon */}
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-black shadow-inner shrink-0 border ${
                    isOffline ? 'bg-red-500/20 text-red-500 border-red-500/30' 
                    : isWarning ? 'bg-orange-500/20 text-orange-500 border-orange-500/30' 
                    : 'bg-green-500/10 text-green-500 border-green-500/20'
                  }`}>
                    {isOffline ? <MdError /> : isWarning ? <MdWarning /> : <MdCheckCircle />}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h2 className="text-lg font-black text-white tracking-wide uppercase truncate">
                          {sensor.type}
                        </h2>
                        <div className="flex items-center gap-2 text-slate-400 text-xs font-bold mt-1">
                          ID: {sensor.id}
                        </div>
                      </div>
                      <span className={`px-3 py-1 text-[10px] font-black rounded-full border uppercase tracking-tighter shrink-0 ml-2 ${
                        isOffline ? 'bg-red-500/20 text-red-400 border-red-500/30 animate-pulse' 
                        : isWarning ? 'bg-orange-500/20 text-orange-400 border-orange-500/30' 
                        : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                      }`}>
                        {sensor.status}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-6 mt-4 bg-slate-900/50 p-3 rounded-xl border border-slate-800/50">
                      <div className="flex items-center gap-3 text-slate-400 text-sm truncate">
                        <MdOutlineLocationOn className="text-blue-500 shrink-0" /> 
                        <span className="truncate text-white font-bold">{sensor.location}</span>
                      </div>
                      <div className="flex items-center gap-3 text-slate-400 text-sm truncate">
                        <FaWifi className={isOffline ? "text-red-500 shrink-0" : "text-green-500 shrink-0"} /> 
                        <span className="truncate">Last Ping: {sensor.lastPing}</span>
                      </div>
                      <div className="flex items-center gap-3 text-slate-400 text-sm truncate">
                        <FaBatteryHalf className={sensor.battery === "0%" ? "text-red-500 shrink-0" : "text-emerald-500 shrink-0"} /> 
                        <span className="truncate">Battery: <span className={sensor.battery === "0%" ? "text-red-400 font-bold" : ""}>{sensor.battery}</span></span>
                      </div>
                      {sensor.issue && (
                        <div className="flex items-center gap-3 text-red-400 text-sm truncate col-span-full mt-1">
                          <MdError className="shrink-0" /> 
                          <span className="font-bold">Issue: {sensor.issue}</span>
                        </div>
                      )}
                    </div>
                    
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}