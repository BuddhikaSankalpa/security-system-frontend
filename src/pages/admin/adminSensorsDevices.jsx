import React from 'react';
import { MdSensors, MdOutlineWifiTethering, MdOutlineBatteryAlert } from "react-icons/md";
import { FaFireAlt, FaWind } from "react-icons/fa";
import { BsSmartwatch } from "react-icons/bs";

export default function AdminSensorsDevices() {
  
  // Devices array updated with glowing icon effects
  const devices = [
    { id: "DEV-001", type: "Gas Sensor", zone: "Zone A", battery: "85%", status: "Online", icon: <FaWind className="text-blue-400 drop-shadow-[0_0_8px_rgba(96,165,250,0.6)]" /> },
    { id: "DEV-002", type: "Fire Detector", zone: "Zone B", battery: "Hardwired", status: "Online", icon: <FaFireAlt className="text-orange-400 drop-shadow-[0_0_8px_rgba(251,146,60,0.6)]" /> },
    { id: "DEV-003", type: "Wearable Tag", zone: "Assigned (Guard 1)", battery: "15%", status: "Low Battery", icon: <BsSmartwatch className="text-purple-400 drop-shadow-[0_0_8px_rgba(192,132,252,0.6)]" /> },
    { id: "DEV-004", type: "Gas Sensor", zone: "Zone C", battery: "90%", status: "Offline", icon: <FaWind className="text-blue-400 drop-shadow-[0_0_8px_rgba(96,165,250,0.6)]" /> },
  ];

  // Helper function for status badge styles
  const getStatusStyles = (status) => {
    if (status === 'Online') return 'bg-green-500/10 text-green-400 border border-green-500/30 shadow-[0_0_8px_rgba(34,197,94,0.15)]';
    if (status === 'Offline') return 'bg-red-500/10 text-red-400 border border-red-500/30 shadow-[0_0_8px_rgba(239,68,68,0.15)]';
    return 'bg-orange-500/10 text-orange-400 border border-orange-500/30 shadow-[0_0_8px_rgba(249,115,22,0.15)]';
  };

  return (
    // Main Dark Container with Grid Overlay
    <div className="p-8 w-full min-h-screen bg-[#090D14] text-slate-300 relative overflow-hidden font-sans">
      
      {/* Background Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:40px_40px] opacity-20 pointer-events-none"></div>

      <div className="relative z-10">
        
        {/* ── Page Header ── */}
        <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
              <MdSensors className="text-blue-500 drop-shadow-[0_0_8px_rgba(59,130,246,0.8)]" /> 
              Hardware & Devices
            </h1>
            <p className="text-slate-400 mt-1">Manage environmental sensors and wearable devices.</p>
          </div>
          <button className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-2.5 rounded-lg font-bold hover:from-blue-500 hover:to-indigo-500 transition duration-300 shadow-[0_4px_15px_rgba(59,130,246,0.3)] hover:shadow-[0_4px_25px_rgba(59,130,246,0.5)] tracking-wide">
            + ADD NEW DEVICE
          </button>
        </div>

        {/* ── Summary Cards ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {/* Card 1 */}
          <div className="bg-[#111826] p-5 rounded-xl border border-slate-800 flex items-center gap-5 hover:border-green-500/50 transition duration-300 shadow-lg">
            <div className="w-14 h-14 rounded-xl bg-green-500/10 flex items-center justify-center border border-green-500/30 shadow-[0_0_15px_rgba(34,197,94,0.15)] shrink-0">
              <MdOutlineWifiTethering size={28} className="text-green-400 drop-shadow-[0_0_5px_rgba(34,197,94,0.5)]" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Online Devices</p>
              <h3 className="text-2xl font-black text-white">120</h3>
            </div>
          </div>
          
          {/* Card 2 */}
          <div className="bg-[#111826] p-5 rounded-xl border border-slate-800 flex items-center gap-5 hover:border-orange-500/50 transition duration-300 shadow-lg">
            <div className="w-14 h-14 rounded-xl bg-orange-500/10 flex items-center justify-center border border-orange-500/30 shadow-[0_0_15px_rgba(249,115,22,0.15)] shrink-0">
              <MdOutlineBatteryAlert size={28} className="text-orange-400 drop-shadow-[0_0_5px_rgba(249,115,22,0.5)]" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Needs Charging</p>
              <h3 className="text-2xl font-black text-orange-400 drop-shadow-[0_0_5px_rgba(249,115,22,0.4)]">3</h3>
            </div>
          </div>
        </div>

        {/* ── Devices Table ── */}
        <div className="bg-[#111826] rounded-xl shadow-lg border border-slate-800 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#0d131f] text-slate-400 text-xs uppercase tracking-wider border-b border-slate-800">
                  <th className="p-5 font-bold">Device Info</th>
                  <th className="p-5 font-bold">Location/Assigned</th>
                  <th className="p-5 font-bold">Battery</th>
                  <th className="p-5 font-bold">Status</th>
                  <th className="p-5 font-bold">Actions</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {devices.map((device, index) => (
                  <tr key={index} className="hover:bg-[#161f33] transition duration-200 border-b border-slate-800/50 last:border-0">
                    <td className="p-5 flex items-center gap-3 font-bold text-slate-200">
                      <div className="p-2 bg-[#090D14] rounded-lg border border-slate-800">
                        {device.icon}
                      </div>
                      <div>
                        {device.type} 
                        <span className="block text-xs text-slate-500 font-normal mt-0.5">{device.id}</span>
                      </div>
                    </td>
                    <td className="p-5 text-slate-400">{device.zone}</td>
                    <td className="p-5 font-medium text-slate-400">{device.battery}</td>
                    <td className="p-5">
                      <span className={`px-3 py-1.5 rounded-md text-xs font-bold tracking-wide ${getStatusStyles(device.status)}`}>
                        {device.status}
                      </span>
                    </td>
                    <td className="p-5">
                      <button className="text-blue-400 font-bold hover:text-blue-300 hover:drop-shadow-[0_0_5px_rgba(96,165,250,0.6)] transition">
                        Configure
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        
      </div>
    </div>
  );
}
// import React from 'react';
// import { MdSensors, MdOutlineWifiTethering, MdOutlineBatteryAlert } from "react-icons/md";
// import { FaFireAlt, FaWind } from "react-icons/fa";
// import { BsSmartwatch } from "react-icons/bs";

// export default function AdminSensorsDevices() {
//   const devices = [
//     { id: "DEV-001", type: "Gas Sensor", zone: "Zone A", battery: "85%", status: "Online", icon: <FaWind className="text-blue-500" /> },
//     { id: "DEV-002", type: "Fire Detector", zone: "Zone B", battery: "Hardwired", status: "Online", icon: <FaFireAlt className="text-orange-500" /> },
//     { id: "DEV-003", type: "Wearable Tag", zone: "Assigned (Guard 1)", battery: "15%", status: "Low Battery", icon: <BsSmartwatch className="text-purple-500" /> },
//     { id: "DEV-004", type: "Gas Sensor", zone: "Zone C", battery: "90%", status: "Offline", icon: <FaWind className="text-blue-500" /> },
//   ];

//   return (
//     <div className="p-8 w-full">
//       <div className="mb-8 flex justify-between items-end">
//         <div>
//           <h1 className="text-3xl font-bold text-gray-800 tracking-tight flex items-center gap-3">
//             <MdSensors className="text-blue-600" /> Hardware & Devices
//           </h1>
//           <p className="text-gray-500 mt-1">Manage environmental sensors and wearable devices.</p>
//         </div>
//         <button className="bg-blue-600 text-white px-5 py-2.5 rounded-lg font-bold hover:bg-blue-700 transition shadow-md shadow-blue-600/30">+ Add New Device</button>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
//         <div className="bg-white p-5 rounded-xl border border-gray-100 flex items-center gap-4">
//           <MdOutlineWifiTethering size={40} className="text-green-500 bg-green-50 p-2 rounded-lg" />
//           <div><p className="text-sm font-bold text-gray-500 uppercase">Online Devices</p><h3 className="text-2xl font-black">120</h3></div>
//         </div>
//         <div className="bg-white p-5 rounded-xl border border-gray-100 flex items-center gap-4">
//           <MdOutlineBatteryAlert size={40} className="text-orange-500 bg-orange-50 p-2 rounded-lg" />
//           <div><p className="text-sm font-bold text-gray-500 uppercase">Needs Charging</p><h3 className="text-2xl font-black text-orange-500">3</h3></div>
//         </div>
//       </div>

//       <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
//         <table className="w-full text-left border-collapse">
//           <thead>
//             <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider border-b border-gray-100">
//               <th className="p-4 font-bold">Device Info</th>
//               <th className="p-4 font-bold">Location/Assigned</th>
//               <th className="p-4 font-bold">Battery</th>
//               <th className="p-4 font-bold">Status</th>
//               <th className="p-4 font-bold">Actions</th>
//             </tr>
//           </thead>
//           <tbody className="text-sm">
//             {devices.map((device, index) => (
//               <tr key={index} className="hover:bg-gray-50 border-b border-gray-50 last:border-0">
//                 <td className="p-4 flex items-center gap-3 font-bold text-gray-800">{device.icon} {device.type} <span className="text-xs text-gray-400 font-normal">({device.id})</span></td>
//                 <td className="p-4 text-gray-600">{device.zone}</td>
//                 <td className="p-4 font-medium text-gray-600">{device.battery}</td>
//                 <td className="p-4">
//                   <span className={`px-3 py-1 rounded-full text-xs font-bold ${device.status === 'Online' ? 'bg-green-100 text-green-600' : device.status === 'Offline' ? 'bg-red-100 text-red-600' : 'bg-orange-100 text-orange-600'}`}>{device.status}</span>
//                 </td>
//                 <td className="p-4"><button className="text-blue-600 font-bold hover:underline">Configure</button></td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }