import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { MdOutlineSensors } from "react-icons/md";
import { FaMapMarkerAlt } from "react-icons/fa";

export default function AdminLiveMonitoring() {
  
  // 1. Chart Data
  const sensorData = [
    { time: '10:00 AM', gasLevel: 15, temperature: 30 },
    { time: '10:05 AM', gasLevel: 18, temperature: 31 },
    { time: '10:10 AM', gasLevel: 25, temperature: 31 },
    { time: '10:15 AM', gasLevel: 45, temperature: 33 }, // Spike
    { time: '10:20 AM', gasLevel: 20, temperature: 32 },
    { time: '10:25 AM', gasLevel: 16, temperature: 30 },
    { time: '10:30 AM', gasLevel: 14, temperature: 29 },
  ];

  // 2. Updated Zones with Dark Theme Colors & Glow effects
  const zones = [
    { id: 1, name: "Zone A - Chemical Storage", status: "Safe", color: "bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.8)]", bgColor: "bg-green-500/10 border-green-500/30 text-green-400" },
    { id: 2, name: "Zone B - Boiler Room", status: "Warning", color: "bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.8)]", bgColor: "bg-orange-500/10 border-orange-500/30 text-orange-400" },
    { id: 3, name: "Zone C - Assembly Line", status: "Safe", color: "bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.8)]", bgColor: "bg-green-500/10 border-green-500/30 text-green-400" },
    { id: 4, name: "Zone D - Generator Area", status: "Critical", color: "bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.8)]", bgColor: "bg-red-500/10 border-red-500/40 text-red-400", pulse: true },
  ];

  return (
    // Main Container with dark background and grid pattern
    <div className="p-8 w-full min-h-screen bg-[#090D14] text-slate-300 relative overflow-hidden font-sans">
      
      {/* Background Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:40px_40px] opacity-20 pointer-events-none"></div>

      <div className="relative z-10">
        {/* ── Page Header ── */}
        <div className="mb-8 flex justify-between items-end">
          <div>
            <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
              <MdOutlineSensors className="text-blue-500 drop-shadow-[0_0_8px_rgba(59,130,246,0.8)]" /> 
              Live Environment Monitoring
            </h1>
            <p className="text-slate-400 mt-1">Real-time data from environmental sensors and wearables.</p>
          </div>
          <div className="flex items-center gap-2 bg-[#111826] px-4 py-2 rounded-full border border-slate-800 shadow-lg">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500 shadow-[0_0_8px_rgba(34,197,94,1)]"></span>
              </span>
              <span className="text-sm font-bold text-slate-400 uppercase tracking-wider">
                Connection: <span className="text-green-400 drop-shadow-[0_0_5px_rgba(34,197,94,0.4)]">Active</span>
              </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* ── Left Side: Real-time Data Plot ── */}
          <div className="lg:col-span-2 bg-[#111826] rounded-xl shadow-lg border border-slate-800 overflow-hidden">
            <div className="p-5 border-b border-slate-800 bg-[#0d131f] flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.8)]"></span>
              <h2 className="text-lg font-bold text-white">Gas Levels & Temperature Trend (Last 30 Mins)</h2>
            </div>
            
            {/* Recharts Container */}
            <div className="w-full h-[380px] p-6 pb-2">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={sensorData} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
                  {/* Dark Grid Lines */}
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1e293b" />
                  
                  <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} dy={10} />
                  <YAxis yAxisId="left" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                  <YAxis yAxisId="right" orientation="right" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                  
                  {/* Dark Theme Tooltip */}
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
                  
                  {/* Glowing Lines */}
                  <Line yAxisId="left" type="monotone" dataKey="gasLevel" name="Gas Level (ppm)" stroke="#EF4444" strokeWidth={3} activeDot={{ r: 6, stroke: '#f87171', strokeWidth: 2, fill: '#111826' }} style={{ filter: 'drop-shadow(0px 4px 6px rgba(239,68,68,0.4))' }} />
                  
                  <Line yAxisId="right" type="monotone" dataKey="temperature" name="Temperature (°C)" stroke="#3B82F6" strokeWidth={3} activeDot={{ r: 6, stroke: '#60a5fa', strokeWidth: 2, fill: '#111826' }} style={{ filter: 'drop-shadow(0px 4px 6px rgba(59,130,246,0.4))' }}/>
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* ── Right Side: Live Zones Status ── */}
          <div className="bg-[#111826] rounded-xl shadow-lg border border-slate-800 flex flex-col overflow-hidden">
            <div className="p-5 border-b border-slate-800 bg-[#0d131f]">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <FaMapMarkerAlt className="text-indigo-500 drop-shadow-[0_0_5px_rgba(99,102,241,0.6)]" /> Facility Zones Map
              </h2>
            </div>
            
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {zones.map((zone) => (
                <div key={zone.id} className={`p-4 rounded-xl border ${zone.bgColor} flex items-center justify-between transition-all duration-300 hover:shadow-[0_0_15px_rgba(0,0,0,0.2)] hover:brightness-110`}>
                  <div>
                    <h3 className="font-bold text-white text-sm">{zone.name}</h3>
                    <p className="text-xs text-slate-400 mt-1">Status: <span className="font-bold uppercase tracking-wide drop-shadow-md">{zone.status}</span></p>
                  </div>
                  
                  {/* Status Indicator (Pulse effect for critical) */}
                  <span className="relative flex h-3.5 w-3.5 shrink-0 ml-4">
                    {zone.pulse && (
                      <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${zone.color.split(' ')[0]}`}></span>
                    )}
                    <span className={`relative inline-flex rounded-full h-3.5 w-3.5 ${zone.color}`}></span>
                  </span>
                </div>
              ))}
            </div>

            {/* Gradient Action Button (Matches Admin Dashboard) */}
            <div className="p-5 border-t border-slate-800 bg-[#0d131f]/50">
              <button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-lg font-bold hover:from-blue-500 hover:to-indigo-500 transition duration-300 shadow-[0_4px_15px_rgba(59,130,246,0.3)] hover:shadow-[0_4px_25px_rgba(59,130,246,0.5)] tracking-wide">
                VIEW FULL FLOOR PLAN
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
// import React from 'react';
// // Recharts වලින් අපිට ඕන කරන දේවල් import කරගන්නවා
// import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
// import { MdOutlineSensors } from "react-icons/md";
// import { FaMapMarkerAlt } from "react-icons/fa";

// export default function AdminLiveMonitoring() {
  
//   // 1. Chart එකට ඕන කරන Dummy Data (පස්සේ DB එකෙන් ගේමු)
//   const sensorData = [
//     { time: '10:00 AM', gasLevel: 15, temperature: 30 },
//     { time: '10:05 AM', gasLevel: 18, temperature: 31 },
//     { time: '10:10 AM', gasLevel: 25, temperature: 31 },
//     { time: '10:15 AM', gasLevel: 45, temperature: 33 }, // පොඩි Gas අගය වැඩි වීමක්
//     { time: '10:20 AM', gasLevel: 20, temperature: 32 },
//     { time: '10:25 AM', gasLevel: 16, temperature: 30 },
//     { time: '10:30 AM', gasLevel: 14, temperature: 29 },
//   ];

//   // 2. Industrial Zones වල Live තත්වය
//   const zones = [
//     { id: 1, name: "Zone A - Chemical Storage", status: "Safe", color: "bg-green-500", bgColor: "bg-green-50 border-green-200" },
//     { id: 2, name: "Zone B - Boiler Room", status: "Warning", color: "bg-orange-500", bgColor: "bg-orange-50 border-orange-200" },
//     { id: 3, name: "Zone C - Assembly Line", status: "Safe", color: "bg-green-500", bgColor: "bg-green-50 border-green-200" },
//     { id: 4, name: "Zone D - Generator Area", status: "Critical", color: "bg-red-500", bgColor: "bg-red-50 border-red-200", pulse: true },
//   ];

//   return (
//     <div className="p-8 w-full">
      
//       {/* ── Page Header ── */}
//       <div className="mb-8 flex justify-between items-end">
//         <div>
//           <h1 className="text-3xl font-bold text-gray-800 tracking-tight flex items-center gap-3">
//             <MdOutlineSensors className="text-blue-600" /> Live Environment Monitoring
//           </h1>
//           <p className="text-gray-500 mt-1">Real-time data from environmental sensors and wearables.</p>
//         </div>
//         <div className="flex items-center gap-2">
//             <span className="relative flex h-3 w-3">
//               <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
//               <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
//             </span>
//             <span className="text-sm font-bold text-gray-500 uppercase">Live Connection Status: <span className="text-green-600">Active</span></span>
//         </div>
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
//         {/* ── Left Side: Real-time Data Plot (Takes up 2 columns) ── */}
//         <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
//           <div className="mb-6 border-b border-gray-100 pb-4">
//             <h2 className="text-lg font-bold text-gray-800">Gas Levels & Temperature Trend (Last 30 Mins)</h2>
//           </div>
          
//           {/* Recharts Container */}
//           <div className="w-full h-[350px]">
//             <ResponsiveContainer width="100%" height="100%">
//               <LineChart data={sensorData} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
//                 <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
//                 <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{fill: '#6B7280', fontSize: 12}} dy={10} />
//                 <YAxis yAxisId="left" axisLine={false} tickLine={false} tick={{fill: '#6B7280', fontSize: 12}} />
//                 <YAxis yAxisId="right" orientation="right" axisLine={false} tickLine={false} tick={{fill: '#6B7280', fontSize: 12}} />
//                 <Tooltip 
//                   contentStyle={{ borderRadius: '10px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
//                 />
//                 <Legend iconType="circle" wrapperStyle={{ paddingTop: '20px' }} />
                
//                 {/* Gas Level Line */}
//                 <Line yAxisId="left" type="monotone" dataKey="gasLevel" name="Gas Level (ppm)" stroke="#EF4444" strokeWidth={3} activeDot={{ r: 8 }} />
                
//                 {/* Temperature Line */}
//                 <Line yAxisId="right" type="monotone" dataKey="temperature" name="Temperature (°C)" stroke="#3B82F6" strokeWidth={3} />
//               </LineChart>
//             </ResponsiveContainer>
//           </div>
//         </div>

//         {/* ── Right Side: Live Zones Status ── */}
//         <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col">
//           <div className="mb-6 border-b border-gray-100 pb-4">
//             <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
//               <FaMapMarkerAlt className="text-gray-400" /> Facility Zones Map
//             </h2>
//           </div>
          
//           <div className="flex-1 overflow-y-auto pr-2 space-y-4">
//             {zones.map((zone) => (
//               <div key={zone.id} className={`p-4 rounded-xl border ${zone.bgColor} flex items-center justify-between transition-all hover:shadow-md`}>
//                 <div>
//                   <h3 className="font-bold text-gray-800 text-sm">{zone.name}</h3>
//                   <p className="text-xs text-gray-500 mt-1">Status: <span className="font-bold">{zone.status}</span></p>
//                 </div>
                
//                 {/* Status Indicator (Pulse effect for critical) */}
//                 <span className="relative flex h-4 w-4">
//                   {zone.pulse && (
//                     <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${zone.color} opacity-75`}></span>
//                   )}
//                   <span className={`relative inline-flex rounded-full h-4 w-4 ${zone.color}`}></span>
//                 </span>
//               </div>
//             ))}
//           </div>

//           <button className="mt-6 w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition shadow-lg shadow-blue-600/30">
//             View Full Floor Plan
//           </button>
//         </div>

//       </div>
//     </div>
//   );
// }