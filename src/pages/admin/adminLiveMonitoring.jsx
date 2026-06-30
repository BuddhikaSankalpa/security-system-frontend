import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { MdOutlineSensors } from "react-icons/md";
import { FaTemperatureHigh, FaWind, FaVolumeUp } from "react-icons/fa";
import { io } from 'socket.io-client'; 

const envUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000/api";
const socketUrl = envUrl.replace(/\/api\/?$/, ''); 
const socket = io(socketUrl, { transports: ['websocket'] });

export default function AdminLiveMonitoring() {
  
  const [sensorData, setSensorData] = useState([]);
  const [isConnected, setIsConnected] = useState(false);
  const [activeMetric, setActiveMetric] = useState('all'); 

  useEffect(() => {
    socket.on('connect', () => setIsConnected(true));
    socket.on('disconnect', () => setIsConnected(false));

    socket.on('live-sensor-data', (incomingData) => {
      const now = new Date();
      const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
      
      const newDataPoint = {
        time: timeString,
        temp: incomingData.temp,
        airQuality: incomingData.airQuality,
        noise: incomingData.noise 
      };

      setSensorData((prevData) => {
        const updatedData = [...prevData, newDataPoint];
        if (updatedData.length > 15) return updatedData.slice(updatedData.length - 15);
        return updatedData;
      });
    });

    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('live-sensor-data');
    };
  }, []);

  return (
    <div className="p-8 w-full min-h-screen bg-[#090D14] text-slate-300 relative overflow-hidden font-sans">
      
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:40px_40px] opacity-20 pointer-events-none"></div>

      <div className="relative z-10">
        <div className="mb-8 flex justify-between items-end">
          <div>
            <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
              <MdOutlineSensors className="text-blue-500 drop-shadow-[0_0_8px_rgba(59,130,246,0.8)]" /> 
              Live Environment Monitoring
            </h1>
            <p className="text-slate-400 mt-1">Real time telemetry from environmental sensors.</p>
          </div>
          <div className="flex items-center gap-2 bg-[#111826] px-4 py-2 rounded-full border border-slate-800 shadow-lg">
              <span className="relative flex h-3 w-3">
                {isConnected && <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>}
                <span className={`relative inline-flex rounded-full h-3 w-3 ${isConnected ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,1)]' : 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,1)]'}`}></span>
              </span>
              {/* <span className="text-sm font-bold text-slate-400 uppercase tracking-wider">
                Connection: <span className={isConnected ? "text-green-400" : "text-red-400"}>{isConnected ? "Active" : "Offline"}</span>
              </span> */}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* ── Left Side: Real-time Data Plot ── */}
          <div className="lg:col-span-2 bg-[#111826] rounded-xl shadow-lg border border-slate-800 overflow-hidden">
            <div className="p-5 border-b border-slate-800 bg-[#0d131f] flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-500 shadow-[0_0_8px_rgba(6,182,212,0.8)]"></span>
              <h2 className="text-lg font-bold text-white">
                Live Telemetry 
                {activeMetric === 'all' && ' (Combined View)'}
                {activeMetric === 'temp' && ' (Temperature)'}
                {activeMetric === 'airQuality' && ' (Air Quality)'}
                {activeMetric === 'noise' && ' (Noise Level)'}
              </h2>
            </div>
            
            <div style={{ width: '100%', height: 420 }} className="p-6 pb-2">
              <ResponsiveContainer>
                <LineChart data={sensorData} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1e293b" />
                  
                  <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} dy={10} />
                  
                  <YAxis yAxisId="left" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                  {/* High values (Air Quality, Noise) on the right axis */}
                  <YAxis yAxisId="right" orientation="right" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                  
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#0f172a', 
                      borderColor: '#1e293b', 
                      borderRadius: '10px', 
                      color: '#f8fafc',
                      boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.5)' 
                    }}
                    itemStyle={{ fontWeight: 'bold' }}
                  />
                  <Legend iconType="circle" wrapperStyle={{ paddingTop: '20px', color: '#cbd5e1' }} />
                  
                  {(activeMetric === 'all' || activeMetric === 'temp') && (
                    <Line yAxisId="left" type="monotone" dataKey="temp" name="Temperature (°C)" stroke="#3B82F6" strokeWidth={3} activeDot={{ r: 6, stroke: '#60a5fa', strokeWidth: 2, fill: '#111826' }} style={{ filter: 'drop-shadow(0px 4px 6px rgba(59,130,246,0.4))' }}/>
                  )}
                  
                  {(activeMetric === 'all' || activeMetric === 'airQuality') && (
                    <Line yAxisId="right" type="monotone" dataKey="airQuality" name="Air Quality (Raw)" stroke="#EF4444" strokeWidth={3} activeDot={{ r: 6, stroke: '#f87171', strokeWidth: 2, fill: '#111826' }} style={{ filter: 'drop-shadow(0px 4px 6px rgba(239,68,68,0.4))' }} />
                  )}

                  {(activeMetric === 'all' || activeMetric === 'noise') && (
                    <Line yAxisId="right" type="monotone" dataKey="noise" name="Noise Level" stroke="#F97316" strokeWidth={3} activeDot={{ r: 6, stroke: '#fdba74', strokeWidth: 2, fill: '#111826' }} style={{ filter: 'drop-shadow(0px 4px 6px rgba(249,115,22,0.4))' }} />
                  )}
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* ── Right Side: Graph Controls ── */}
<div className="bg-[#111826] rounded-xl shadow-lg border border-slate-800 flex flex-col overflow-hidden h-full">
  <div className="p-5 border-b border-slate-800 bg-[#0d131f]">
    <h2 className="text-lg font-bold text-white flex items-center gap-2">
      <MdOutlineSensors className="text-indigo-500 drop-shadow-[0_0_5px_rgba(99,102,241,0.6)]" /> Graph Controls
    </h2>
  </div>
  
  <div className="flex-1 p-5 flex flex-col justify-between bg-[#0d131f]/20">
    
    {/* NEW: Time Range Selector */}
    <div className="mb-4">
      {/* <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 block">
        Time Range
      </label> */}
      {/* <div className="flex bg-[#0d131f] border border-slate-700 rounded-lg p-1 gap-1">
        <button className="flex-1 text-xs py-1.5 rounded-md bg-indigo-500/20 text-indigo-400 font-medium border border-indigo-500/30">
          1 Hour
        </button>
        <button className="flex-1 text-xs py-1.5 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 transition-colors border border-transparent">
          24 Hours
        </button>
        <button className="flex-1 text-xs py-1.5 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 transition-colors border border-transparent">
          7 Days
        </button>
      </div> */}
    </div>

    {/* EXISTING: Metric Selectors */}
    <div className="space-y-3">
      <button 
        onClick={() => setActiveMetric('all')}
        className={`w-full p-3 rounded-xl border flex items-center justify-between transition-all duration-300 font-bold ${activeMetric === 'all' ? 'bg-indigo-500/20 border-indigo-500 text-indigo-400 shadow-[0_0_15px_rgba(99,102,241,0.2)]' : 'bg-[#111826] border-slate-700 text-slate-400 hover:bg-slate-800'}`}
      >
        <div className="flex items-center gap-3"><MdOutlineSensors size={18} /> Combined View</div>
        {activeMetric === 'all' && <span className="flex h-3 w-3 relative"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span><span className="relative inline-flex rounded-full h-3 w-3 bg-indigo-500"></span></span>}
      </button>

      <button 
        onClick={() => setActiveMetric('temp')}
        className={`w-full p-3 rounded-xl border flex items-center justify-between transition-all duration-300 font-bold ${activeMetric === 'temp' ? 'bg-blue-500/20 border-blue-500 text-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.2)]' : 'bg-[#111826] border-slate-700 text-slate-400 hover:bg-slate-800'}`}
      >
        <div className="flex items-center gap-3"><FaTemperatureHigh size={18} /> Temperature</div>
        {activeMetric === 'temp' && <span className="flex h-3 w-3 relative"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span><span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span></span>}
      </button>

      <button 
        onClick={() => setActiveMetric('airQuality')}
        className={`w-full p-3 rounded-xl border flex items-center justify-between transition-all duration-300 font-bold ${activeMetric === 'airQuality' ? 'bg-red-500/20 border-red-500 text-red-400 shadow-[0_0_15px_rgba(239,68,68,0.2)]' : 'bg-[#111826] border-slate-700 text-slate-400 hover:bg-slate-800'}`}
      >
        <div className="flex items-center gap-3"><FaWind size={18} /> Air Quality</div>
        {activeMetric === 'airQuality' && <span className="flex h-3 w-3 relative"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span><span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span></span>}
      </button>

      <button 
        onClick={() => setActiveMetric('noise')}
        className={`w-full p-3 rounded-xl border flex items-center justify-between transition-all duration-300 font-bold ${activeMetric === 'noise' ? 'bg-orange-500/20 border-orange-500 text-orange-400 shadow-[0_0_15px_rgba(249,115,22,0.2)]' : 'bg-[#111826] border-slate-700 text-slate-400 hover:bg-slate-800'}`}
      >
        <div className="flex items-center gap-3"><FaVolumeUp size={18} /> Noise Level</div>
        {activeMetric === 'noise' && <span className="flex h-3 w-3 relative"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span><span className="relative inline-flex rounded-full h-3 w-3 bg-orange-500"></span></span>}
      </button>
    </div>

    {/* NEW: Live Auto-Refresh Toggle */}
    <div className="mt-4 pt-4 border-t border-slate-800 flex items-center justify-between">
      <div className="flex flex-col">
        <span className="text-sm font-bold text-slate-300">Live Environment Monitoring</span>
        <span className="text-xs text-slate-500">Gain total control with our Live Environment Monitoring dashboard. Stream real time telemetry from your sensors to track temperature, air quality, and noise levels as they change. This instant visibility allows your team to respond proactively to any anomaly, ensuring a safer and more optimized facility at all times.</span>
      </div>
      {/* Note: You can replace this with a real toggle component if you have one */}
      {/* <button className="w-10 h-5 bg-indigo-500 rounded-full relative transition-colors shadow-[0_0_10px_rgba(99,102,241,0.3)] flex items-center">
        <span className="absolute right-1 bg-white w-3.5 h-3.5 rounded-full transition-transform"></span>
      </button> */}
    </div>

  </div>
</div>
        </div>

        {/* ── Bottom Section: Individual Graphs ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          
          <div className="bg-[#111826] rounded-xl shadow-lg border border-slate-800 overflow-hidden">
            <div className="p-4 border-b border-slate-800 bg-[#0d131f] flex items-center gap-2">
              <FaTemperatureHigh className="text-blue-500" />
              <h2 className="text-sm font-bold text-white">Temperature (°C)</h2>
            </div>
            <div style={{ width: '100%', height: 200 }} className="p-2 pb-2">
              <ResponsiveContainer>
                <LineChart data={sensorData} margin={{ top: 5, right: 5, left: -25, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1e293b" />
                  <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 9}} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10}} />
                  <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '10px', color: '#f8fafc' }} />
                  <Line type="monotone" dataKey="temp" name="Temp" stroke="#3B82F6" strokeWidth={2} activeDot={{ r: 4, fill: '#111826', stroke: '#60a5fa', strokeWidth: 2 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-[#111826] rounded-xl shadow-lg border border-slate-800 overflow-hidden">
            <div className="p-4 border-b border-slate-800 bg-[#0d131f] flex items-center gap-2">
              <FaWind className="text-red-500" />
              <h2 className="text-sm font-bold text-white">Air Quality</h2>
            </div>
            <div style={{ width: '100%', height: 200 }} className="p-2 pb-2">
              <ResponsiveContainer>
                <LineChart data={sensorData} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1e293b" />
                  <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 9}} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10}} />
                  <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '10px', color: '#f8fafc' }} />
                  <Line type="monotone" dataKey="airQuality" name="AQI" stroke="#EF4444" strokeWidth={2} activeDot={{ r: 4, fill: '#111826', stroke: '#f87171', strokeWidth: 2 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-[#111826] rounded-xl shadow-lg border border-slate-800 overflow-hidden">
            <div className="p-4 border-b border-slate-800 bg-[#0d131f] flex items-center gap-2">
              <FaVolumeUp className="text-orange-500" />
              <h2 className="text-sm font-bold text-white">Noise Level</h2>
            </div>
            <div style={{ width: '100%', height: 200 }} className="p-2 pb-2">
              <ResponsiveContainer>
                <LineChart data={sensorData} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1e293b" />
                  <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 9}} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10}} />
                  <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '10px', color: '#f8fafc' }} />
                  <Line type="monotone" dataKey="noise" name="Noise" stroke="#F97316" strokeWidth={2} activeDot={{ r: 4, fill: '#111826', stroke: '#fdba74', strokeWidth: 2 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}