import React from 'react';
import { IoAlertCircle } from "react-icons/io5";
import { FaUserInjured, FaFireExtinguisher } from "react-icons/fa";
import { MdDoneAll } from "react-icons/md";

export default function AdminAlertsEmergencies() {
  const alerts = [
    { id: "ALT-892", type: "Man Down", severity: "Critical", location: "Zone C", time: "2 mins ago", description: "Fall detected from Guard Wearable ID: W-012" },
    { id: "ALT-891", type: "Gas Warning", severity: "High", location: "Chemical Storage", time: "15 mins ago", description: "Gas level crossed 40ppm threshold." },
    { id: "ALT-890", type: "Fire Alarm", severity: "Resolved", location: "Generator Room", time: "2 hrs ago", description: "False alarm triggered by welding smoke." },
  ];

  return (
    <div className="p-8 w-full min-h-screen bg-[#090D14] text-slate-300 relative overflow-hidden font-sans">
      {/* Background Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:40px_40px] opacity-20 pointer-events-none"></div>

      <div className="relative z-10">
        <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
              <IoAlertCircle className="text-red-500 drop-shadow-[0_0_8px_rgba(239,68,68,0.8)]" /> Alerts & Emergencies
            </h1>
            <p className="text-slate-400 mt-1">Real-time incident response and historical event logs.</p>
          </div>
          <button className="bg-red-500/10 text-red-400 px-6 py-2.5 rounded-lg font-bold hover:bg-red-500/20 transition duration-300 border border-red-500/30 shadow-[0_0_15px_rgba(239,68,68,0.2)] tracking-wide flex items-center gap-2">
            <IoAlertCircle size={20} /> SOUND FACILITY ALARM
          </button>
        </div>

        <div className="space-y-5">
          {alerts.map((alert, index) => (
            <div key={index} className={`bg-[#111826] p-6 rounded-xl border-l-4 shadow-lg flex flex-col md:flex-row justify-between items-start md:items-center gap-4 transition duration-300 hover:scale-[1.01] ${
              alert.severity === 'Critical' ? 'border-red-500 shadow-[0_0_15px_rgba(239,68,68,0.15)]' : 
              alert.severity === 'High' ? 'border-orange-500 shadow-[0_0_15px_rgba(249,115,22,0.15)]' : 
              'border-green-500 shadow-[0_0_15px_rgba(34,197,94,0.15)]'
            }`}>
              
              <div className="flex gap-5">
                <div className={`p-3 rounded-xl h-14 w-14 flex items-center justify-center shrink-0 border ${
                  alert.severity === 'Critical' ? 'bg-red-500/20 text-red-400 border-red-500/50 shadow-[0_0_15px_rgba(239,68,68,0.4)] animate-pulse' : 
                  alert.severity === 'High' ? 'bg-orange-500/20 text-orange-400 border-orange-500/50 shadow-[0_0_15px_rgba(249,115,22,0.3)]' : 
                  'bg-green-500/20 text-green-400 border-green-500/50 shadow-[0_0_15px_rgba(34,197,94,0.3)]'
                }`}>
                  {alert.type === 'Man Down' ? <FaUserInjured size={24} /> : <FaFireExtinguisher size={24} />}
                </div>
                
                <div>
                  <div className="flex items-center gap-3">
                    <h3 className="text-xl font-black text-white">{alert.type}</h3>
                    <span className="text-xs font-bold text-slate-500 bg-[#090D14] px-2 py-1 rounded border border-slate-800">{alert.time}</span>
                  </div>
                  <p className="text-sm text-slate-300 mt-2"><span className="font-bold text-slate-500">Location:</span> {alert.location}</p>
                  <p className="text-sm text-slate-400 mt-1">{alert.description}</p>
                </div>
              </div>
              
              <div className="flex gap-3 w-full md:w-auto mt-4 md:mt-0 border-t border-slate-800 md:border-0 pt-4 md:pt-0">
                {alert.severity !== 'Resolved' && (
                  <>
                    <button className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-5 py-2.5 rounded-lg font-bold text-sm hover:from-blue-500 hover:to-indigo-500 transition duration-300 shadow-[0_4px_15px_rgba(59,130,246,0.3)] w-full md:w-auto">
                      Dispatch Team
                    </button>
                    <button className="bg-green-500/10 text-green-400 border border-green-500/30 px-5 py-2.5 rounded-lg font-bold text-sm hover:bg-green-500/20 transition duration-300 shadow-[0_0_10px_rgba(34,197,94,0.15)] flex items-center justify-center gap-2 w-full md:w-auto">
                      <MdDoneAll size={18} /> Resolve
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
// import React from 'react';
// import { IoAlertCircle } from "react-icons/io5";
// import { FaUserInjured, FaFireExtinguisher } from "react-icons/fa";
// import { MdDoneAll } from "react-icons/md";

// export default function AdminAlertsEmergencies() {
//   const alerts = [
//     { id: "ALT-892", type: "Man Down", severity: "Critical", location: "Zone C", time: "2 mins ago", description: "Fall detected from Guard Wearable ID: W-012" },
//     { id: "ALT-891", type: "Gas Warning", severity: "High", location: "Chemical Storage", time: "15 mins ago", description: "Gas level crossed 40ppm threshold." },
//     { id: "ALT-890", type: "Fire Alarm", severity: "Resolved", location: "Generator Room", time: "2 hrs ago", description: "False alarm triggered by welding smoke." },
//   ];

//   return (
//     <div className="p-8 w-full">
//       <div className="mb-8 flex justify-between items-end">
//         <div>
//           <h1 className="text-3xl font-bold text-gray-800 tracking-tight flex items-center gap-3">
//             <IoAlertCircle className="text-red-600" /> Alerts & Emergencies
//           </h1>
//           <p className="text-gray-500 mt-1">Real-time incident response and historical event logs.</p>
//         </div>
//         <button className="bg-red-100 text-red-600 px-5 py-2.5 rounded-lg font-bold hover:bg-red-200 transition border border-red-200">Sound Facility Alarm</button>
//       </div>

//       <div className="space-y-4">
//         {alerts.map((alert, index) => (
//           <div key={index} className={`bg-white p-6 rounded-xl border-l-4 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4 ${alert.severity === 'Critical' ? 'border-red-500' : alert.severity === 'High' ? 'border-orange-500' : 'border-green-500'}`}>
//             <div className="flex gap-4">
//               <div className={`p-3 rounded-full h-12 w-12 flex items-center justify-center text-white ${alert.severity === 'Critical' ? 'bg-red-500 animate-pulse' : alert.severity === 'High' ? 'bg-orange-500' : 'bg-green-500'}`}>
//                 {alert.type === 'Man Down' ? <FaUserInjured size={20} /> : <FaFireExtinguisher size={20} />}
//               </div>
//               <div>
//                 <div className="flex items-center gap-3">
//                   <h3 className="text-lg font-black text-gray-800">{alert.type}</h3>
//                   <span className="text-xs font-bold text-gray-400">{alert.time}</span>
//                 </div>
//                 <p className="text-sm text-gray-600 mt-1"><span className="font-bold">Location:</span> {alert.location}</p>
//                 <p className="text-sm text-gray-500 mt-1">{alert.description}</p>
//               </div>
//             </div>
            
//             <div className="flex gap-2 w-full md:w-auto">
//               {alert.severity !== 'Resolved' && (
//                 <>
//                   <button className="bg-blue-600 text-white px-4 py-2 rounded font-bold text-sm hover:bg-blue-700 w-full md:w-auto">Dispatch Team</button>
//                   <button className="bg-green-100 text-green-700 border border-green-200 px-4 py-2 rounded font-bold text-sm hover:bg-green-200 flex items-center gap-2 w-full md:w-auto"><MdDoneAll /> Resolve</button>
//                 </>
//               )}
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }