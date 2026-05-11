import React from 'react';
import { IoDocumentText } from "react-icons/io5";
import { FaFilePdf, FaChartLine, FaBolt } from "react-icons/fa";

export default function AdminReportsAnalytics() {
  const reports = [
    { title: "Efficiency Analysis Report", date: "Oct 15, 2026", type: "Analytics", size: "1.2 MB" },
    { title: "System Power Consumption", date: "Oct 14, 2026", type: "Power Analysis", size: "850 KB" },
    { title: "System User Manual v1.0", date: "Oct 01, 2026", type: "Documentation", size: "3.5 MB" },
  ];

  return (
    <div className="p-8 w-full min-h-screen bg-[#090D14] text-slate-300 relative overflow-hidden font-sans">
      {/* Background Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:40px_40px] opacity-20 pointer-events-none"></div>

      <div className="relative z-10">
        <div className="mb-8 flex justify-between items-end">
          <div>
            <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
              <IoDocumentText className="text-blue-500 drop-shadow-[0_0_8px_rgba(59,130,246,0.8)]" /> Reports & Analytics
            </h1>
            <p className="text-slate-400 mt-1">Export system documentation and performance data.</p>
          </div>
        </div>

        {/* ── Main Report Cards ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Analytics Card */}
          <div className="bg-[#111826] p-6 rounded-xl border border-blue-500/30 shadow-[0_0_20px_rgba(59,130,246,0.1)] hover:border-blue-500/60 hover:shadow-[0_0_25px_rgba(59,130,246,0.2)] transition duration-300 group">
            <FaChartLine size={32} className="mb-4 text-blue-400 drop-shadow-[0_0_8px_rgba(96,165,250,0.6)] group-hover:scale-110 transition-transform" />
            <h3 className="text-xl font-bold text-white">Efficiency Analysis</h3>
            <p className="text-sm text-slate-400 mt-2 mb-5">Evaluate event detection accuracy and false alarms.</p>
            <button className="bg-blue-500/10 text-blue-400 border border-blue-500/30 font-bold px-5 py-2.5 rounded-lg hover:bg-blue-500/20 hover:shadow-[0_0_15px_rgba(59,130,246,0.3)] transition duration-300 text-sm tracking-wide">
              GENERATE NEW REPORT
            </button>
          </div>
          
          {/* Power Analysis Card */}
          <div className="bg-[#111826] p-6 rounded-xl border border-teal-500/30 shadow-[0_0_20px_rgba(20,184,166,0.1)] hover:border-teal-500/60 hover:shadow-[0_0_25px_rgba(20,184,166,0.2)] transition duration-300 group">
            <FaBolt size={32} className="mb-4 text-teal-400 drop-shadow-[0_0_8px_rgba(45,212,191,0.6)] group-hover:scale-110 transition-transform" />
            <h3 className="text-xl font-bold text-white">Power Analysis</h3>
            <p className="text-sm text-slate-400 mt-2 mb-5">Calculate energy consumption under normal/peak usage.</p>
            <button className="bg-teal-500/10 text-teal-400 border border-teal-500/30 font-bold px-5 py-2.5 rounded-lg hover:bg-teal-500/20 hover:shadow-[0_0_15px_rgba(20,184,166,0.3)] transition duration-300 text-sm tracking-wide">
              GENERATE NEW REPORT
            </button>
          </div>
        </div>

        {/* ── Document List ── */}
        <div className="bg-[#111826] rounded-xl shadow-lg border border-slate-800 p-6">
          <h2 className="text-lg font-bold text-white mb-5 border-b border-slate-800 pb-3 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.8)]"></span>
            Available Documents
          </h2>
          <div className="space-y-3">
            {reports.map((report, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-[#0d131f] rounded-lg border border-slate-800/50 hover:border-indigo-500/30 hover:bg-[#161f33] transition duration-200 group">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-[#090D14] rounded-lg border border-slate-800 group-hover:border-red-500/30 transition">
                    <FaFilePdf size={24} className="text-red-500 drop-shadow-[0_0_5px_rgba(239,68,68,0.5)]" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-200 text-sm">{report.title}</h4>
                    <p className="text-xs text-slate-500 mt-0.5">{report.type} • {report.date}</p>
                  </div>
                </div>
                <button className="text-indigo-400 font-bold text-sm hover:text-indigo-300 hover:drop-shadow-[0_0_5px_rgba(129,140,248,0.6)] transition">
                  Download PDF
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
// import React from 'react';
// import { IoDocumentText } from "react-icons/io5";
// import { FaFilePdf, FaChartLine, FaBolt } from "react-icons/fa";

// export default function AdminReportsAnalytics() {
//   const reports = [
//     { title: "Efficiency Analysis Report", date: "Oct 15, 2026", type: "Analytics", size: "1.2 MB" },
//     { title: "System Power Consumption", date: "Oct 14, 2026", type: "Power Analysis", size: "850 KB" },
//     { title: "System User Manual v1.0", date: "Oct 01, 2026", type: "Documentation", size: "3.5 MB" },
//   ];

//   return (
//     <div className="p-8 w-full">
//       <div className="mb-8 flex justify-between items-end">
//         <div>
//           <h1 className="text-3xl font-bold text-gray-800 tracking-tight flex items-center gap-3">
//             <IoDocumentText className="text-blue-600" /> Reports & Analytics
//           </h1>
//           <p className="text-gray-500 mt-1">Export system documentation and performance data.</p>
//         </div>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
//         <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-6 rounded-xl text-white shadow-lg">
//           <FaChartLine size={30} className="mb-4 opacity-80" />
//           <h3 className="text-xl font-bold">Efficiency Analysis</h3>
//           <p className="text-sm text-blue-100 mt-2 mb-4">Evaluate event detection accuracy and false alarms.</p>
//           <button className="bg-white text-blue-700 font-bold px-4 py-2 rounded hover:bg-gray-100 transition text-sm">Generate New Report</button>
//         </div>
//         <div className="bg-gradient-to-br from-teal-500 to-emerald-600 p-6 rounded-xl text-white shadow-lg">
//           <FaBolt size={30} className="mb-4 opacity-80" />
//           <h3 className="text-xl font-bold">Power Analysis</h3>
//           <p className="text-sm text-teal-100 mt-2 mb-4">Calculate energy consumption under normal/peak usage.</p>
//           <button className="bg-white text-teal-700 font-bold px-4 py-2 rounded hover:bg-gray-100 transition text-sm">Generate New Report</button>
//         </div>
//       </div>

//       <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
//         <h2 className="text-lg font-bold text-gray-800 mb-4 border-b border-gray-100 pb-3">Available Documents</h2>
//         <div className="space-y-3">
//           {reports.map((report, index) => (
//             <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition border border-gray-200">
//               <div className="flex items-center gap-4">
//                 <FaFilePdf size={24} className="text-red-500" />
//                 <div>
//                   <h4 className="font-bold text-gray-800 text-sm">{report.title}</h4>
//                   <p className="text-xs text-gray-500">{report.type} • {report.date}</p>
//                 </div>
//               </div>
//               <button className="text-blue-600 font-bold text-sm hover:underline">Download PDF</button>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }