import React from 'react';
import { MdSensors, MdCheckCircle } from "react-icons/md";
import { IoAlertCircle } from "react-icons/io5";
import { FaUserShield } from "react-icons/fa";

export default function AdminDashboard() {
  // Alert colors updated to match the dark theme with glowing borders
  const recentAlerts = [
    { id: 1, type: "Gas Leak", location: "Zone A - Chemical Storage", time: "10:24 AM", status: "Critical", color: "text-red-400 bg-red-500/10 border border-red-500/30" },
    { id: 2, type: "Man Down", location: "Zone C - Assembly Line", time: "09:15 AM", status: "Resolved", color: "text-green-400 bg-green-500/10 border border-green-500/30" },
    { id: 3, type: "Fire Warning", location: "Zone B - Generator Room", time: "08:40 AM", status: "Investigating", color: "text-orange-400 bg-orange-500/10 border border-orange-500/30" },
    { id: 4, type: "High Temp", location: "Zone A - Boiler Room", time: "Yesterday", status: "Resolved", color: "text-green-400 bg-green-500/10 border border-green-500/30" },
  ];

  return (
    // Main Container with dark background and grid pattern similar to the image
    <div className="p-8 w-full min-h-screen bg-[#090D14] text-slate-300 relative overflow-hidden font-sans">
      
      {/* Background Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:40px_40px] opacity-20 pointer-events-none"></div>

      <div className="relative z-10">
        {/* ── Page Header ── */}
        <div className="mb-8 flex justify-between items-end">
          <div>
            <h1 className="text-3xl font-bold text-white tracking-tight">Dashboard Overview</h1>
            <p className="text-slate-400 mt-1">Welcome back, Admin. Here is what's happening today.</p>
          </div>
          <div className="text-right">
            <p className="text-sm font-bold text-blue-400 drop-shadow-[0_0_5px_rgba(59,130,246,0.4)]">{new Date().toDateString()}</p>
          </div>
        </div>

        {/* ── Top Stat Cards ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          
          {/* Card 1 */}
          <div className="bg-[#111826] p-6 rounded-xl shadow-lg border border-slate-800 flex items-center gap-5 hover:border-blue-500/50 transition duration-300">
            <div className="w-14 h-14 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-400 shrink-0 border border-blue-500/30 shadow-[0_0_15px_rgba(59,130,246,0.15)]">
              <MdSensors size={28} />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Active Sensors</p>
              <h3 className="text-2xl font-black text-white">124 <span className="text-slate-600 text-lg">/ 128</span></h3>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-[#111826] p-6 rounded-xl shadow-lg border border-slate-800 flex items-center gap-5 hover:border-red-500/50 transition duration-300 relative overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-red-500 shadow-[0_0_15px_rgba(239,68,68,0.8)]"></div>
            <div className="w-14 h-14 rounded-full bg-red-500/10 flex items-center justify-center text-red-400 shrink-0 border-2 border-red-500/40 animate-pulse shadow-[0_0_15px_rgba(239,68,68,0.2)]">
              <IoAlertCircle size={28} />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Active Alerts</p>
              <h3 className="text-2xl font-black text-red-400 drop-shadow-[0_0_8px_rgba(239,68,68,0.5)]">3</h3>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-[#111826] p-6 rounded-xl shadow-lg border border-slate-800 flex items-center gap-5 hover:border-indigo-500/50 transition duration-300">
            <div className="w-14 h-14 rounded-full bg-indigo-500/10 flex items-center justify-center text-indigo-400 shrink-0 border border-indigo-500/30 shadow-[0_0_15px_rgba(99,102,241,0.15)]">
              <FaUserShield size={26} />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Guards on Duty</p>
              <h3 className="text-2xl font-black text-white">18</h3>
            </div>
          </div>

          {/* Card 4 */}
          <div className="bg-[#111826] p-6 rounded-xl shadow-lg border border-slate-800 flex items-center gap-5 hover:border-green-500/50 transition duration-300">
            <div className="w-14 h-14 rounded-full bg-green-500/10 flex items-center justify-center text-green-400 shrink-0 border border-green-500/30 shadow-[0_0_15px_rgba(34,197,94,0.15)]">
              <MdCheckCircle size={28} />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">System Status</p>
              <h3 className="text-2xl font-black text-green-400 drop-shadow-[0_0_8px_rgba(34,197,94,0.3)]">Online</h3>
            </div>
          </div>

        </div>

        {/* ── Main Content Grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Side: Recent Alerts Table */}
          <div className="lg:col-span-2 bg-[#111826] rounded-xl shadow-lg border border-slate-800 overflow-hidden">
            <div className="p-5 border-b border-slate-800 flex justify-between items-center bg-[#0d131f]">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.8)]"></span>
                Recent Incidents & Alerts
              </h2>
              <button className="text-sm text-blue-400 font-bold hover:text-blue-300 hover:drop-shadow-[0_0_5px_rgba(96,165,250,0.5)] transition">View All</button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#0f1523] text-slate-400 text-xs uppercase tracking-wider">
                    <th className="p-4 font-bold border-b border-slate-800">Type</th>
                    <th className="p-4 font-bold border-b border-slate-800">Location</th>
                    <th className="p-4 font-bold border-b border-slate-800">Time</th>
                    <th className="p-4 font-bold border-b border-slate-800">Status</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {recentAlerts.map((alert) => (
                    <tr key={alert.id} className="hover:bg-[#161f33] transition duration-200 border-b border-slate-800/50 last:border-0">
                      <td className="p-4 font-bold text-slate-200">{alert.type}</td>
                      <td className="p-4 text-slate-400">{alert.location}</td>
                      <td className="p-4 text-slate-500 font-medium">{alert.time}</td>
                      <td className="p-4">
                        <span className={`px-3 py-1 rounded-md text-xs font-bold ${alert.color}`}>
                          {alert.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Right Side: System Health / Quick Actions */}
          <div className="bg-[#111826] rounded-xl shadow-lg border border-slate-800">
            <div className="p-5 border-b border-slate-800 bg-[#0d131f]">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.8)]"></span>
                System Health
              </h2>
            </div>
            
            <div className="p-5 space-y-6">
              {/* Health Item 1 */}
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="font-bold text-slate-400">Network Connectivity</span>
                  <span className="font-bold text-green-400 drop-shadow-[0_0_5px_rgba(34,197,94,0.4)]">98%</span>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                  <div className="bg-green-500 h-1.5 rounded-full shadow-[0_0_10px_rgba(34,197,94,0.8)]" style={{ width: '98%' }}></div>
                </div>
              </div>

              {/* Health Item 2 */}
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="font-bold text-slate-400">Wearable Battery Levels</span>
                  <span className="font-bold text-orange-400 drop-shadow-[0_0_5px_rgba(249,115,22,0.4)]">45%</span>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                  <div className="bg-orange-500 h-1.5 rounded-full shadow-[0_0_10px_rgba(249,115,22,0.8)]" style={{ width: '45%' }}></div>
                </div>
                <p className="text-xs text-slate-500 mt-2 flex items-center gap-1">
                  <IoAlertCircle className="text-orange-400" /> 3 guards need to recharge soon.
                </p>
              </div>
              
              {/* Quick Action Button matching the image */}
              <div className="pt-5 border-t border-slate-800 mt-4">
                <button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-lg font-bold hover:from-blue-500 hover:to-indigo-500 transition duration-300 shadow-[0_4px_15px_rgba(59,130,246,0.3)] hover:shadow-[0_4px_25px_rgba(59,130,246,0.5)] flex items-center justify-center gap-2 tracking-wide">
                   <MdSensors size={18} /> RUN DIAGNOSTICS
                </button>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
// import React from 'react';
// import { MdSensors, MdCheckCircle } from "react-icons/md";
// import { IoAlertCircle } from "react-icons/io5";
// import { FaUserShield } from "react-icons/fa";

// export default function AdminDashboard() {
//   // පස්සේ backend එකෙන් ගේන්න පුළුවන් විදිහට දැනට dummy data ටිකක් දාලා තියෙන්නේ
//   const recentAlerts = [
//     { id: 1, type: "Gas Leak", location: "Zone A - Chemical Storage", time: "10:24 AM", status: "Critical", color: "text-red-600 bg-red-100" },
//     { id: 2, type: "Man Down", location: "Zone C - Assembly Line", time: "09:15 AM", status: "Resolved", color: "text-green-600 bg-green-100" },
//     { id: 3, type: "Fire Warning", location: "Zone B - Generator Room", time: "08:40 AM", status: "Investigating", color: "text-orange-600 bg-orange-100" },
//     { id: 4, type: "High Temp", location: "Zone A - Boiler Room", time: "Yesterday", status: "Resolved", color: "text-green-600 bg-green-100" },
//   ];

//   return (
//     <div className="p-8 w-full">
      
//       {/* ── Page Header ── */}
//       <div className="mb-8 flex justify-between items-end">
//         <div>
//           <h1 className="text-3xl font-bold text-gray-800 tracking-tight">Dashboard Overview</h1>
//           <p className="text-gray-500 mt-1">Welcome back, Admin. Here is what's happening today.</p>
//         </div>
//         <div className="text-right">
//           <p className="text-sm font-bold text-gray-500">{new Date().toDateString()}</p>
//         </div>
//       </div>

//       {/* ── Top Stat Cards ── */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        
//         {/* Card 1 */}
//         <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-5 hover:shadow-md transition">
//           <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 shrink-0">
//             <MdSensors size={28} />
//           </div>
//           <div>
//             <p className="text-sm font-bold text-gray-500 uppercase tracking-wider">Active Sensors</p>
//             <h3 className="text-2xl font-black text-gray-800">124 / 128</h3>
//           </div>
//         </div>

//         {/* Card 2 */}
//         <div className="bg-white p-6 rounded-xl shadow-sm border border-red-100 flex items-center gap-5 hover:shadow-md transition relative overflow-hidden">
//           <div className="absolute left-0 top-0 bottom-0 w-1 bg-red-500"></div>
//           <div className="w-14 h-14 rounded-full bg-red-100 flex items-center justify-center text-red-600 shrink-0 border-2 border-red-200 animate-pulse">
//             <IoAlertCircle size={28} />
//           </div>
//           <div>
//             <p className="text-sm font-bold text-gray-500 uppercase tracking-wider">Active Alerts</p>
//             <h3 className="text-2xl font-black text-red-600">3</h3>
//           </div>
//         </div>

//         {/* Card 3 */}
//         <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-5 hover:shadow-md transition">
//           <div className="w-14 h-14 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 shrink-0">
//             <FaUserShield size={26} />
//           </div>
//           <div>
//             <p className="text-sm font-bold text-gray-500 uppercase tracking-wider">Guards on Duty</p>
//             <h3 className="text-2xl font-black text-gray-800">18</h3>
//           </div>
//         </div>

//         {/* Card 4 */}
//         <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-5 hover:shadow-md transition">
//           <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center text-green-600 shrink-0">
//             <MdCheckCircle size={28} />
//           </div>
//           <div>
//             <p className="text-sm font-bold text-gray-500 uppercase tracking-wider">System Status</p>
//             <h3 className="text-2xl font-black text-green-600">Online</h3>
//           </div>
//         </div>

//       </div>

//       {/* ── Main Content Grid ── */}
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
//         {/* Left Side: Recent Alerts Table (Takes up 2 columns) */}
//         <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
//           <div className="p-5 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
//             <h2 className="text-lg font-bold text-gray-800">Recent Incidents & Alerts</h2>
//             <button className="text-sm text-blue-600 font-bold hover:underline">View All</button>
//           </div>
          
//           <div className="overflow-x-auto">
//             <table className="w-full text-left border-collapse">
//               <thead>
//                 <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider">
//                   <th className="p-4 font-bold border-b border-gray-100">Type</th>
//                   <th className="p-4 font-bold border-b border-gray-100">Location</th>
//                   <th className="p-4 font-bold border-b border-gray-100">Time</th>
//                   <th className="p-4 font-bold border-b border-gray-100">Status</th>
//                 </tr>
//               </thead>
//               <tbody className="text-sm">
//                 {recentAlerts.map((alert) => (
//                   <tr key={alert.id} className="hover:bg-gray-50 transition border-b border-gray-50 last:border-0">
//                     <td className="p-4 font-bold text-gray-800">{alert.type}</td>
//                     <td className="p-4 text-gray-600">{alert.location}</td>
//                     <td className="p-4 text-gray-500 font-medium">{alert.time}</td>
//                     <td className="p-4">
//                       <span className={`px-3 py-1 rounded-full text-xs font-bold ${alert.color}`}>
//                         {alert.status}
//                       </span>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>

//         {/* Right Side: System Health / Quick Actions (Takes up 1 column) */}
//         <div className="bg-white rounded-xl shadow-sm border border-gray-100">
//           <div className="p-5 border-b border-gray-100 bg-gray-50/50">
//             <h2 className="text-lg font-bold text-gray-800">System Health</h2>
//           </div>
          
//           <div className="p-5 space-y-5">
//             {/* Health Item 1 */}
//             <div>
//               <div className="flex justify-between text-sm mb-1">
//                 <span className="font-bold text-gray-600">Network Connectivity</span>
//                 <span className="font-bold text-green-600">98%</span>
//               </div>
//               <div className="w-full bg-gray-200 rounded-full h-2">
//                 <div className="bg-green-500 h-2 rounded-full" style={{ width: '98%' }}></div>
//               </div>
//             </div>

//             {/* Health Item 2 */}
//             <div>
//               <div className="flex justify-between text-sm mb-1">
//                 <span className="font-bold text-gray-600">Wearable Battery Levels (Avg)</span>
//                 <span className="font-bold text-orange-500">45%</span>
//               </div>
//               <div className="w-full bg-gray-200 rounded-full h-2">
//                 <div className="bg-orange-400 h-2 rounded-full" style={{ width: '45%' }}></div>
//               </div>
//               <p className="text-xs text-gray-400 mt-1">3 guards need to recharge soon.</p>
//             </div>
            
//             {/* Quick Action Button */}
//             <div className="pt-4 border-t border-gray-100 mt-4">
//               <button className="w-full bg-[#0F172A] text-white py-3 rounded-lg font-bold hover:bg-blue-600 transition flex items-center justify-center gap-2">
//                  <MdSensors size={18} /> Run System Diagnostics
//               </button>
//             </div>

//           </div>
//         </div>

//       </div>

//     </div>
//   );
// }