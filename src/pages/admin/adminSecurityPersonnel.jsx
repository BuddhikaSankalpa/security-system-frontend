import React from 'react';
import { FaUserShield, FaUserPlus } from "react-icons/fa";
import { MdOutlineLocalPhone } from "react-icons/md";

export default function AdminSecurityPersonnel() {
  const personnel = [
    { name: "Thimira Nimsara", email: "nimsara@security.com", phone: "0771234567", role: "Field Officer", status: "On Duty" },
    { name: "Buddhika Sankalpa", email: "buddhika@security.com", phone: "0719876543", role: "Admin", status: "Active" },
    { name: "Sasmitha Rashmitha", email: "kgpp@security.com", phone: "0701122334", role: "Field Officer", status: "Off Duty" },
  ];

  return (
    <div className="p-8 w-full min-h-screen bg-[#090D14] text-slate-300 relative overflow-hidden font-sans">
      {/* Background Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:40px_40px] opacity-20 pointer-events-none"></div>

      <div className="relative z-10">
        <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
              <FaUserShield className="text-blue-500 drop-shadow-[0_0_8px_rgba(59,130,246,0.8)]" /> Security Personnel
            </h1>
            <p className="text-slate-400 mt-1">Manage admin access and field officers.</p>
          </div>
          <button className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-2.5 rounded-lg font-bold hover:from-blue-500 hover:to-indigo-500 transition duration-300 shadow-[0_4px_15px_rgba(59,130,246,0.3)] hover:shadow-[0_4px_25px_rgba(59,130,246,0.5)] flex items-center gap-2 tracking-wide">
            <FaUserPlus /> REGISTER STAFF
          </button>
        </div>

        <div className="bg-[#111826] rounded-xl shadow-lg border border-slate-800 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#0d131f] text-slate-400 text-xs uppercase tracking-wider border-b border-slate-800">
                  <th className="p-5 font-bold">Officer Name</th>
                  <th className="p-5 font-bold">Contact Info</th>
                  <th className="p-5 font-bold">Role</th>
                  <th className="p-5 font-bold">Duty Status</th>
                  <th className="p-5 font-bold">Actions</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {personnel.map((person, index) => (
                  <tr key={index} className="hover:bg-[#161f33] transition duration-200 border-b border-slate-800/50 last:border-0">
                    <td className="p-5 flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/30 flex items-center justify-center font-bold text-lg shadow-[0_0_10px_rgba(59,130,246,0.15)]">
                        {person.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-bold text-slate-200 text-base">{person.name}</p>
                        <p className="text-xs text-slate-400 mt-0.5">{person.email}</p>
                      </div>
                    </td>
                    <td className="p-5 text-slate-300">
                      <div className="flex items-center gap-2">
                        <MdOutlineLocalPhone className="text-slate-500" /> {person.phone}
                      </div>
                    </td>
                    <td className="p-5 font-bold text-indigo-400">{person.role}</td>
                    <td className="p-5">
                      <span className={`px-3 py-1.5 rounded-md text-xs font-bold tracking-wide border ${
                        person.status === 'On Duty' || person.status === 'Active' 
                          ? 'bg-green-500/10 text-green-400 border-green-500/30 shadow-[0_0_8px_rgba(34,197,94,0.15)]' 
                          : 'bg-slate-500/10 text-slate-400 border-slate-500/30 shadow-[0_0_8px_rgba(100,116,139,0.15)]'
                      }`}>
                        {person.status}
                      </span>
                    </td>
                    <td className="p-5 flex gap-4">
                      <button className="text-blue-400 font-bold hover:text-blue-300 hover:drop-shadow-[0_0_5px_rgba(96,165,250,0.6)] transition">Edit</button>
                      <button className="text-red-400 font-bold hover:text-red-300 hover:drop-shadow-[0_0_5px_rgba(248,113,113,0.6)] transition">Remove</button>
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
// import { FaUserShield, FaUserPlus } from "react-icons/fa";
// import { MdOutlineLocalPhone } from "react-icons/md";

// export default function AdminSecurityPersonnel() {
//   const personnel = [
//     { name: "HGT Nimsara", email: "nimsara@security.com", phone: "0771234567", role: "Field Officer", status: "On Duty" },
//     { name: "Buddhika Sankalpa", email: "buddhika@security.com", phone: "0719876543", role: "Admin", status: "Active" },
//     { name: "KGPP Koralegama", email: "kgpp@security.com", phone: "0701122334", role: "Field Officer", status: "Off Duty" },
//   ];

//   return (
//     <div className="p-8 w-full">
//       <div className="mb-8 flex justify-between items-end">
//         <div>
//           <h1 className="text-3xl font-bold text-gray-800 tracking-tight flex items-center gap-3">
//             <FaUserShield className="text-blue-600" /> Security Personnel
//           </h1>
//           <p className="text-gray-500 mt-1">Manage admin access and field officers.</p>
//         </div>
//         <button className="bg-[#0F172A] text-white px-5 py-2.5 rounded-lg font-bold hover:bg-gray-800 transition shadow-md flex items-center gap-2">
//           <FaUserPlus /> Register Staff
//         </button>
//       </div>

//       <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
//         <table className="w-full text-left border-collapse">
//           <thead>
//             <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider border-b border-gray-100">
//               <th className="p-4 font-bold">Officer Name</th>
//               <th className="p-4 font-bold">Contact Info</th>
//               <th className="p-4 font-bold">Role</th>
//               <th className="p-4 font-bold">Duty Status</th>
//               <th className="p-4 font-bold">Actions</th>
//             </tr>
//           </thead>
//           <tbody className="text-sm">
//             {personnel.map((person, index) => (
//               <tr key={index} className="hover:bg-gray-50 border-b border-gray-50 last:border-0">
//                 <td className="p-4 flex items-center gap-3">
//                   <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold">{person.name.charAt(0)}</div>
//                   <div>
//                     <p className="font-bold text-gray-800">{person.name}</p>
//                     <p className="text-xs text-gray-400">{person.email}</p>
//                   </div>
//                 </td>
//                 <td className="p-4 text-gray-600 flex items-center gap-2"><MdOutlineLocalPhone /> {person.phone}</td>
//                 <td className="p-4 font-bold text-gray-700">{person.role}</td>
//                 <td className="p-4">
//                   <span className={`px-3 py-1 rounded-full text-xs font-bold ${person.status === 'On Duty' || person.status === 'Active' ? 'bg-green-100 text-green-600' : 'bg-gray-200 text-gray-600'}`}>{person.status}</span>
//                 </td>
//                 <td className="p-4 flex gap-3">
//                   <button className="text-blue-600 font-bold hover:underline">Edit</button>
//                   <button className="text-red-600 font-bold hover:underline">Remove</button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }