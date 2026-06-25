import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { MdOutlineSensors } from "react-icons/md";
import { FaTemperatureHigh, FaTint, FaWind, FaSmog } from "react-icons/fa";
import { io } from 'socket.io-client'; 

const envUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000/api";
const socketUrl = envUrl.replace(/\/api\/?$/, ''); 
const socket = io(socketUrl, { transports: ['websocket'] });

export default function AdminLiveMonitoring() {
  
  const [sensorData, setSensorData] = useState([]);
  const [isConnected, setIsConnected] = useState(false);
  const [activeMetric, setActiveMetric] = useState('all'); 

  useEffect(() => {
    // 1. Listen for connection status
    socket.on('connect', () => setIsConnected(true));
    socket.on('disconnect', () => setIsConnected(false));

    // 2. Listen for real-time sensor data from the backend
    socket.on('live-sensor-data', (incomingData) => {
      const now = new Date();
      const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
      
      const newDataPoint = {
        time: timeString,
        temp: incomingData.temp,
        humidity: incomingData.humidity,
        airQuality: incomingData.airQuality,
        noic: incomingData.noic
      };

      setSensorData((prevData) => {
        const updatedData = [...prevData, newDataPoint];
        // Keep only the last 15 points so the graph doesn't get cluttered
        if (updatedData.length > 15) return updatedData.slice(updatedData.length - 15);
        return updatedData;
      });
    });

    // 3. Cleanup on unmount
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
            <p className="text-slate-400 mt-1">Real-time telemetry from environmental sensors.</p>
          </div>
          <div className="flex items-center gap-2 bg-[#111826] px-4 py-2 rounded-full border border-slate-800 shadow-lg">
              <span className="relative flex h-3 w-3">
                {isConnected && <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>}
                <span className={`relative inline-flex rounded-full h-3 w-3 ${isConnected ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,1)]' : 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,1)]'}`}></span>
              </span>
              <span className="text-sm font-bold text-slate-400 uppercase tracking-wider">
                Connection: <span className={isConnected ? "text-green-400" : "text-red-400"}>{isConnected ? "Active" : "Offline"}</span>
              </span>
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
                {activeMetric === 'humidity' && ' (Humidity)'}
                {activeMetric === 'airQuality' && ' (Air Quality)'}
                {activeMetric === 'noic' && ' (NOICs)'}
              </h2>
            </div>
            
            <div style={{ width: '100%', height: 350 }} className="p-6 pb-2">
              <ResponsiveContainer>
                <LineChart data={sensorData} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1e293b" />
                  
                  <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} dy={10} />
                  
                  <YAxis yAxisId="left" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
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
                  
                  {(activeMetric === 'all' || activeMetric === 'humidity') && (
                    <Line yAxisId="left" type="monotone" dataKey="humidity" name="Humidity (%)" stroke="#10B981" strokeWidth={3} activeDot={{ r: 6, stroke: '#34d399', strokeWidth: 2, fill: '#111826' }} style={{ filter: 'drop-shadow(0px 4px 6px rgba(16,185,129,0.4))' }} />
                  )}

                  {(activeMetric === 'all' || activeMetric === 'airQuality') && (
                    <Line yAxisId="right" type="monotone" dataKey="airQuality" name="Air Quality (AQI)" stroke="#EF4444" strokeWidth={3} activeDot={{ r: 6, stroke: '#f87171', strokeWidth: 2, fill: '#111826' }} style={{ filter: 'drop-shadow(0px 4px 6px rgba(239,68,68,0.4))' }} />
                  )}

                  {(activeMetric === 'all' || activeMetric === 'noic') && (
                    <Line yAxisId="left" type="monotone" dataKey="noic" name="NOICs (ppm)" stroke="#A855F7" strokeWidth={3} activeDot={{ r: 6, stroke: '#d8b4fe', strokeWidth: 2, fill: '#111826' }} style={{ filter: 'drop-shadow(0px 4px 6px rgba(168,85,247,0.4))' }} />
                  )}
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* ── Right Side: Graph Controls ── */}
          <div className="bg-[#111826] rounded-xl shadow-lg border border-slate-800 flex flex-col overflow-hidden">
            <div className="p-5 border-b border-slate-800 bg-[#0d131f]">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <MdOutlineSensors className="text-indigo-500 drop-shadow-[0_0_5px_rgba(99,102,241,0.6)]" /> Graph Controls
              </h2>
            </div>
            
            <div className="flex-1 p-5 space-y-4 flex flex-col justify-center bg-[#0d131f]/20">
              
              <button 
                onClick={() => setActiveMetric('all')}
                className={`w-full p-4 rounded-xl border flex items-center justify-between transition-all duration-300 font-bold ${activeMetric === 'all' ? 'bg-indigo-500/20 border-indigo-500 text-indigo-400 shadow-[0_0_15px_rgba(99,102,241,0.2)]' : 'bg-[#111826] border-slate-700 text-slate-400 hover:bg-slate-800'}`}
              >
                <div className="flex items-center gap-3"><MdOutlineSensors size={20} /> Combined View</div>
                {activeMetric === 'all' && <span className="flex h-3 w-3 relative"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span><span className="relative inline-flex rounded-full h-3 w-3 bg-indigo-500"></span></span>}
              </button>

              <button 
                onClick={() => setActiveMetric('temp')}
                className={`w-full p-4 rounded-xl border flex items-center justify-between transition-all duration-300 font-bold ${activeMetric === 'temp' ? 'bg-blue-500/20 border-blue-500 text-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.2)]' : 'bg-[#111826] border-slate-700 text-slate-400 hover:bg-slate-800'}`}
              >
                <div className="flex items-center gap-3"><FaTemperatureHigh size={20} /> Temperature</div>
                {activeMetric === 'temp' && <span className="flex h-3 w-3 relative"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span><span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span></span>}
              </button>

              <button 
                onClick={() => setActiveMetric('humidity')}
                className={`w-full p-4 rounded-xl border flex items-center justify-between transition-all duration-300 font-bold ${activeMetric === 'humidity' ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.2)]' : 'bg-[#111826] border-slate-700 text-slate-400 hover:bg-slate-800'}`}
              >
                <div className="flex items-center gap-3"><FaTint size={20} /> Humidity</div>
                {activeMetric === 'humidity' && <span className="flex h-3 w-3 relative"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span><span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span></span>}
              </button>

              <button 
                onClick={() => setActiveMetric('airQuality')}
                className={`w-full p-4 rounded-xl border flex items-center justify-between transition-all duration-300 font-bold ${activeMetric === 'airQuality' ? 'bg-red-500/20 border-red-500 text-red-400 shadow-[0_0_15px_rgba(239,68,68,0.2)]' : 'bg-[#111826] border-slate-700 text-slate-400 hover:bg-slate-800'}`}
              >
                <div className="flex items-center gap-3"><FaWind size={20} /> Air Quality</div>
                {activeMetric === 'airQuality' && <span className="flex h-3 w-3 relative"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span><span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span></span>}
              </button>

              <button 
                onClick={() => setActiveMetric('noic')}
                className={`w-full p-4 rounded-xl border flex items-center justify-between transition-all duration-300 font-bold ${activeMetric === 'noic' ? 'bg-purple-500/20 border-purple-500 text-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.2)]' : 'bg-[#111826] border-slate-700 text-slate-400 hover:bg-slate-800'}`}
              >
                <div className="flex items-center gap-3"><FaSmog size={20} /> NOICs</div>
                {activeMetric === 'noic' && <span className="flex h-3 w-3 relative"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span><span className="relative inline-flex rounded-full h-3 w-3 bg-purple-500"></span></span>}
              </button>

            </div>
          </div>
        </div>

        {/* ── Bottom Section: Individual Graphs ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 mt-8">
          
          <div className="bg-[#111826] rounded-xl shadow-lg border border-slate-800 overflow-hidden">
            <div className="p-4 border-b border-slate-800 bg-[#0d131f] flex items-center gap-2">
              <FaTemperatureHigh className="text-blue-500" />
              <h2 className="text-md font-bold text-white">Temperature (°C)</h2>
            </div>
            <div style={{ width: '100%', height: 250 }} className="p-4 pb-2">
              <ResponsiveContainer>
                <LineChart data={sensorData} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1e293b" />
                  <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10}} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                  <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '10px', color: '#f8fafc' }} />
                  <Line type="monotone" dataKey="temp" name="Temp" stroke="#3B82F6" strokeWidth={2} activeDot={{ r: 5, fill: '#111826', stroke: '#60a5fa', strokeWidth: 2 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-[#111826] rounded-xl shadow-lg border border-slate-800 overflow-hidden">
            <div className="p-4 border-b border-slate-800 bg-[#0d131f] flex items-center gap-2">
              <FaTint className="text-emerald-500" />
              <h2 className="text-md font-bold text-white">Humidity (%)</h2>
            </div>
            <div style={{ width: '100%', height: 250 }} className="p-4 pb-2">
              <ResponsiveContainer>
                <LineChart data={sensorData} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1e293b" />
                  <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10}} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                  <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '10px', color: '#f8fafc' }} />
                  <Line type="monotone" dataKey="humidity" name="Humidity" stroke="#10B981" strokeWidth={2} activeDot={{ r: 5, fill: '#111826', stroke: '#34d399', strokeWidth: 2 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-[#111826] rounded-xl shadow-lg border border-slate-800 overflow-hidden">
            <div className="p-4 border-b border-slate-800 bg-[#0d131f] flex items-center gap-2">
              <FaWind className="text-red-500" />
              <h2 className="text-md font-bold text-white">Air Quality (AQI)</h2>
            </div>
            <div style={{ width: '100%', height: 250 }} className="p-4 pb-2">
              <ResponsiveContainer>
                <LineChart data={sensorData} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1e293b" />
                  <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10}} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                  <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '10px', color: '#f8fafc' }} />
                  <Line type="monotone" dataKey="airQuality" name="AQI" stroke="#EF4444" strokeWidth={2} activeDot={{ r: 5, fill: '#111826', stroke: '#f87171', strokeWidth: 2 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-[#111826] rounded-xl shadow-lg border border-slate-800 overflow-hidden">
            <div className="p-4 border-b border-slate-800 bg-[#0d131f] flex items-center gap-2">
              <FaSmog className="text-purple-500" />
              <h2 className="text-md font-bold text-white">NOICs (ppm)</h2>
            </div>
            <div style={{ width: '100%', height: 250 }} className="p-4 pb-2">
              <ResponsiveContainer>
                <LineChart data={sensorData} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1e293b" />
                  <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10}} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                  <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '10px', color: '#f8fafc' }} />
                  <Line type="monotone" dataKey="noic" name="NOICs" stroke="#A855F7" strokeWidth={2} activeDot={{ r: 5, fill: '#111826', stroke: '#d8b4fe', strokeWidth: 2 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}









// import React, { useState, useEffect } from 'react';
// import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
// import { MdOutlineSensors } from "react-icons/md";
// import { FaMapMarkerAlt } from "react-icons/fa";
// import { io } from 'socket.io-client'; 

// // 1. Create the socket connection using the backend URL from .env (same as other pages)
// const envUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000/api";
// const socketUrl = envUrl.replace(/\/api\/?$/, ''); 
// const socket = io(socketUrl, { transports: ['websocket'] });

// export default function AdminLiveMonitoring() {
  
//   // Chart Data State
//   const [sensorData, setSensorData] = useState([
//     { time: 'Wait...', temp: 0, humidity: 0, airQuality: 0 } 
//   ]);
//   const [isConnected, setIsConnected] = useState(socket.connected);

//   useEffect(() => {
//     socket.on('connect', () => {
//       console.log('🟢 Connected to Live Data Stream');
//       setIsConnected(true);
//     });

//     socket.on('disconnect', () => {
//       console.log('🔴 Disconnected from stream');
//       setIsConnected(false);
//     });

//     // 2. Capture sensor data emitted from the backend
//     socket.on('live-sensor-data', (data) => {
//       console.log('📡 Sensor Data Received:', data); // I added this to inspect the console output

//       const now = new Date();
//       const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
      
//       const newDataPoint = {
//         time: timeString,
//         temp: data.temp || 0,
//         humidity: data.hum || 0, 
//         airQuality: data.aqi || 0
//       };

//       setSensorData((prevData) => {
//         // Remove the old 'Wait...' placeholder
//         const filteredData = prevData.filter(d => d.time !== 'Wait...');
//         const updatedData = [...filteredData, newDataPoint];
//         // Keep only the last 10 items
//         if (updatedData.length > 10) return updatedData.slice(updatedData.length - 10);
//         return updatedData;
//       });
//     });

//     return () => {
//       socket.off('connect');
//       socket.off('disconnect');
//       socket.off('live-sensor-data');
//     };
//   }, []);

//   const zones = [
//     { id: 1, name: "Zone A - Chemical Storage", status: "Safe", color: "bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.8)]", bgColor: "bg-green-500/10 border-green-500/30 text-green-400" },
//     { id: 2, name: "Zone B - Boiler Room", status: "Warning", color: "bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.8)]", bgColor: "bg-orange-500/10 border-orange-500/30 text-orange-400" },
//     { id: 3, name: "Zone C - Assembly Line", status: "Safe", color: "bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.8)]", bgColor: "bg-green-500/10 border-green-500/30 text-green-400" },
//     { id: 4, name: "Zone D - Generator Area", status: "Critical", color: "bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.8)]", bgColor: "bg-red-500/10 border-red-500/40 text-red-400", pulse: true },
//   ];

//   return (
//     <div className="p-8 w-full min-h-screen bg-[#090D14] text-slate-300 relative overflow-hidden font-sans">
      
//       <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:40px_40px] opacity-20 pointer-events-none"></div>

//       <div className="relative z-10">
//         <div className="mb-8 flex justify-between items-end">
//           <div>
//             <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
//               <MdOutlineSensors className="text-blue-500 drop-shadow-[0_0_8px_rgba(59,130,246,0.8)]" /> 
//               Live Environment Monitoring
//             </h1>
//             <p className="text-slate-400 mt-1">Real-time telemetry from environmental sensors.</p>
//           </div>
//           <div className="flex items-center gap-2 bg-[#111826] px-4 py-2 rounded-full border border-slate-800 shadow-lg">
//               <span className="relative flex h-3 w-3">
//                 {isConnected && <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>}
//                 <span className={`relative inline-flex rounded-full h-3 w-3 ${isConnected ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,1)]' : 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,1)]'}`}></span>
//               </span>
//               <span className="text-sm font-bold text-slate-400 uppercase tracking-wider">
//                 Connection: <span className={isConnected ? "text-green-400" : "text-red-400"}>{isConnected ? "Active" : "Offline"}</span>
//               </span>
//           </div>
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
//           {/* ── Left Side: Real-time Data Plot ── */}
//           <div className="lg:col-span-2 bg-[#111826] rounded-xl shadow-lg border border-slate-800 overflow-hidden">
//             <div className="p-5 border-b border-slate-800 bg-[#0d131f] flex items-center gap-2">
//               <span className="w-2 h-2 rounded-full bg-cyan-500 shadow-[0_0_8px_rgba(6,182,212,0.8)]"></span>
//               <h2 className="text-lg font-bold text-white">Live Telemetry (Temp, Humidity, Air Quality)</h2>
//             </div>
            
//             <div style={{ width: '100%', height: 350 }} className="p-6 pb-2">
//               <ResponsiveContainer>
//                 <LineChart data={sensorData} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
//                   <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1e293b" />
                  
//                   <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} dy={10} />
                  
//                   <YAxis yAxisId="left" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
//                   <YAxis yAxisId="right" orientation="right" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                  
//                   <Tooltip 
//                     contentStyle={{ 
//                       backgroundColor: '#0f172a', 
//                       borderColor: '#1e293b', 
//                       borderRadius: '10px', 
//                       color: '#f8fafc',
//                       boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.5)' 
//                     }}
//                     itemStyle={{ fontWeight: 'bold' }}
//                   />
//                   <Legend iconType="circle" wrapperStyle={{ paddingTop: '20px', color: '#cbd5e1' }} />
                  
//                   <Line yAxisId="left" type="monotone" dataKey="temp" name="Temperature (°C)" stroke="#3B82F6" strokeWidth={3} activeDot={{ r: 6, stroke: '#60a5fa', strokeWidth: 2, fill: '#111826' }} style={{ filter: 'drop-shadow(0px 4px 6px rgba(59,130,246,0.4))' }}/>
//                   <Line yAxisId="left" type="monotone" dataKey="humidity" name="Humidity (%)" stroke="#10B981" strokeWidth={3} activeDot={{ r: 6, stroke: '#34d399', strokeWidth: 2, fill: '#111826' }} style={{ filter: 'drop-shadow(0px 4px 6px rgba(16,185,129,0.4))' }} />
//                   <Line yAxisId="right" type="monotone" dataKey="airQuality" name="Air Quality (AQI)" stroke="#EF4444" strokeWidth={3} activeDot={{ r: 6, stroke: '#f87171', strokeWidth: 2, fill: '#111826' }} style={{ filter: 'drop-shadow(0px 4px 6px rgba(239,68,68,0.4))' }} />
//                 </LineChart>
//               </ResponsiveContainer>
//             </div>
//           </div>

//           {/* ── Right Side: Live Zones Status ── */}
//           <div className="bg-[#111826] rounded-xl shadow-lg border border-slate-800 flex flex-col overflow-hidden">
//             <div className="p-5 border-b border-slate-800 bg-[#0d131f]">
//               <h2 className="text-lg font-bold text-white flex items-center gap-2">
//                 <FaMapMarkerAlt className="text-indigo-500 drop-shadow-[0_0_5px_rgba(99,102,241,0.6)]" /> Facility Zones Map
//               </h2>
//             </div>
            
//             <div className="flex-1 overflow-y-auto p-5 space-y-4">
//               {zones.map((zone) => (
//                 <div key={zone.id} className={`p-4 rounded-xl border ${zone.bgColor} flex items-center justify-between transition-all duration-300 hover:shadow-[0_0_15px_rgba(0,0,0,0.2)] hover:brightness-110`}>
//                   <div>
//                     <h3 className="font-bold text-white text-sm">{zone.name}</h3>
//                     <p className="text-xs text-slate-400 mt-1">Status: <span className="font-bold uppercase tracking-wide drop-shadow-md">{zone.status}</span></p>
//                   </div>
                  
//                   <span className="relative flex h-3.5 w-3.5 shrink-0 ml-4">
//                     {zone.pulse && (
//                       <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${zone.color.split(' ')[0]}`}></span>
//                     )}
//                     <span className={`relative inline-flex rounded-full h-3.5 w-3.5 ${zone.color}`}></span>
//                   </span>
//                 </div>
//               ))}
//             </div>

//             <div className="p-5 border-t border-slate-800 bg-[#0d131f]/50">
//               <button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-lg font-bold hover:from-blue-500 hover:to-indigo-500 transition duration-300 shadow-[0_4px_15px_rgba(59,130,246,0.3)] hover:shadow-[0_4px_25px_rgba(59,130,246,0.5)] tracking-wide">
//                 VIEW FULL FLOOR PLAN
//               </button>
//             </div>
//           </div>

//         </div>
//       </div>
//     </div>
//   );
// }