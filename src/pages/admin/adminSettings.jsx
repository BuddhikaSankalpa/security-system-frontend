import React, { useState } from 'react';
import { IoSettingsSharp, IoSave } from "react-icons/io5";
import { FaUserCog, FaBell, FaShieldAlt } from "react-icons/fa";
import { MdOutlineSensors } from "react-icons/md";

export default function AdminSettings() {
  const [activeTab, setActiveTab] = useState('profile');
  const [autoAlarm, setAutoAlarm] = useState(true);
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [emailAlerts, setEmailAlerts] = useState(true);

  return (
    <div className="p-8 w-full min-h-screen bg-[#090D14] text-slate-300 relative overflow-hidden font-sans">
      {/* Background Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:40px_40px] opacity-20 pointer-events-none"></div>

      <div className="relative z-10">
        {/* ── Page Header ── */}
        <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
              <IoSettingsSharp className="text-blue-500 drop-shadow-[0_0_8px_rgba(59,130,246,0.8)] animate-[spin_10s_linear_infinite]" /> System Settings
            </h1>
            <p className="text-slate-400 mt-1">Configure system parameters and administrator preferences.</p>
          </div>
          <button className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-2.5 rounded-lg font-bold hover:from-blue-500 hover:to-indigo-500 transition duration-300 shadow-[0_4px_15px_rgba(59,130,246,0.3)] hover:shadow-[0_4px_25px_rgba(59,130,246,0.5)] flex items-center gap-2 tracking-wide">
            <IoSave size={20} /> SAVE CHANGES
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* ── Left Sidebar (Tabs) ── */}
          <div className="w-full lg:w-1/4">
            <div className="bg-[#111826] rounded-xl shadow-lg border border-slate-800 overflow-hidden flex flex-col">
              <button 
                onClick={() => setActiveTab('profile')}
                className={`w-full flex items-center gap-3 px-5 py-4 text-sm font-bold transition-all duration-300 ${activeTab === 'profile' ? 'bg-blue-500/10 text-blue-400 border-l-4 border-blue-500 shadow-[inset_15px_0_20px_-15px_rgba(59,130,246,0.3)]' : 'text-slate-400 hover:bg-[#161f33] border-l-4 border-transparent'}`}
              >
                <FaUserCog size={18} /> Admin Profile
              </button>
              <button 
                onClick={() => setActiveTab('notifications')}
                className={`w-full flex items-center gap-3 px-5 py-4 text-sm font-bold transition-all duration-300 border-t border-slate-800/50 ${activeTab === 'notifications' ? 'bg-blue-500/10 text-blue-400 border-l-4 border-blue-500 shadow-[inset_15px_0_20px_-15px_rgba(59,130,246,0.3)]' : 'text-slate-400 hover:bg-[#161f33] border-l-4 border-transparent'}`}
              >
                <FaBell size={18} /> Notifications
              </button>
              <button 
                onClick={() => setActiveTab('system')}
                className={`w-full flex items-center gap-3 px-5 py-4 text-sm font-bold transition-all duration-300 border-t border-slate-800/50 ${activeTab === 'system' ? 'bg-blue-500/10 text-blue-400 border-l-4 border-blue-500 shadow-[inset_15px_0_20px_-15px_rgba(59,130,246,0.3)]' : 'text-slate-400 hover:bg-[#161f33] border-l-4 border-transparent'}`}
              >
                <FaShieldAlt size={18} /> System Config
              </button>
            </div>
          </div>

          {/* ── Right Content Area ── */}
          <div className="w-full lg:w-3/4">
            
            {/* Profile Settings Tab */}
            {activeTab === 'profile' && (
              <div className="bg-[#111826] rounded-xl shadow-lg border border-slate-800 p-6 animate-[fadeIn_0.3s_ease-in-out]">
                <h2 className="text-xl font-bold text-white mb-6 pb-4 border-b border-slate-800">Profile Information</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-xs font-bold text-slate-500 mb-2 uppercase tracking-wider">First Name</label>
                    <input type="text" defaultValue="admin" className="w-full px-4 py-3 bg-[#090D14] rounded-xl border border-slate-700 outline-none focus:border-blue-500 focus:shadow-[0_0_10px_rgba(59,130,246,0.2)] transition text-sm text-slate-200 font-medium" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 mb-2 uppercase tracking-wider">Last Name</label>
                    <input type="text" defaultValue="admin" className="w-full px-4 py-3 bg-[#090D14] rounded-xl border border-slate-700 outline-none focus:border-blue-500 focus:shadow-[0_0_10px_rgba(59,130,246,0.2)] transition text-sm text-slate-200 font-medium" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div>
                    <label className="block text-xs font-bold text-slate-500 mb-2 uppercase tracking-wider">Email Address</label>
                    <input type="email" defaultValue="admin@gmail.com" className="w-full px-4 py-3 bg-[#0d131f] rounded-xl border border-slate-800 outline-none text-sm text-slate-500 font-medium cursor-not-allowed" disabled />
                    <p className="text-xs text-slate-600 mt-2">Email address cannot be changed.</p>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 mb-2 uppercase tracking-wider">Phone Number</label>
                    <input type="text" defaultValue="0715668974" className="w-full px-4 py-3 bg-[#090D14] rounded-xl border border-slate-700 outline-none focus:border-blue-500 focus:shadow-[0_0_10px_rgba(59,130,246,0.2)] transition text-sm text-slate-200 font-medium" />
                  </div>
                </div>

                <h2 className="text-xl font-bold text-white mb-6 pb-4 border-b border-slate-800">Change Password</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold text-slate-500 mb-2 uppercase tracking-wider">New Password</label>
                    <input type="password" placeholder="••••••••" className="w-full px-4 py-3 bg-[#090D14] rounded-xl border border-slate-700 outline-none focus:border-blue-500 focus:shadow-[0_0_10px_rgba(59,130,246,0.2)] transition text-sm text-white" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 mb-2 uppercase tracking-wider">Confirm Password</label>
                    <input type="password" placeholder="••••••••" className="w-full px-4 py-3 bg-[#090D14] rounded-xl border border-slate-700 outline-none focus:border-blue-500 focus:shadow-[0_0_10px_rgba(59,130,246,0.2)] transition text-sm text-white" />
                  </div>
                </div>
              </div>
            )}

            {/* Notifications Tab */}
            {activeTab === 'notifications' && (
              <div className="bg-[#111826] rounded-xl shadow-lg border border-slate-800 p-6 animate-[fadeIn_0.3s_ease-in-out]">
                <h2 className="text-xl font-bold text-white mb-6 pb-4 border-b border-slate-800">Alert Preferences</h2>
                
                <div className="space-y-4">
                  {/* Email Alerts Toggle */}
                  <div className="flex items-center justify-between p-5 bg-[#0d131f] rounded-xl border border-slate-800">
                    <div>
                      <h3 className="font-bold text-slate-200">Critical Email Alerts</h3>
                      <p className="text-sm text-slate-500 mt-1">Receive immediate emails for 'Man Down' and 'Gas Leak' events.</p>
                    </div>
                    <div 
                      onClick={() => setEmailAlerts(!emailAlerts)}
                      className={`w-14 h-7 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-300 ${emailAlerts ? 'bg-blue-600 shadow-[0_0_10px_rgba(59,130,246,0.6)]' : 'bg-slate-700'}`}
                    >
                      <div className={`bg-white w-5 h-5 rounded-full shadow-md transform transition-transform duration-300 ${emailAlerts ? 'translate-x-7' : 'translate-x-0'}`}></div>
                    </div>
                  </div>

                  {/* SMS Alerts Toggle (Static visual based on your original code) */}
                  <div className="flex items-center justify-between p-5 bg-[#0d131f] rounded-xl border border-slate-800">
                    <div>
                      <h3 className="font-bold text-slate-200">SMS Notifications</h3>
                      <p className="text-sm text-slate-500 mt-1">Send SMS to on-duty guards during an emergency.</p>
                    </div>
                    <div className="w-14 h-7 flex items-center rounded-full p-1 cursor-pointer bg-blue-600 shadow-[0_0_10px_rgba(59,130,246,0.6)]">
                      <div className="bg-white w-5 h-5 rounded-full shadow-md transform translate-x-7"></div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* System Config Tab */}
            {activeTab === 'system' && (
              <div className="bg-[#111826] rounded-xl shadow-lg border border-slate-800 p-6 animate-[fadeIn_0.3s_ease-in-out]">
                <h2 className="text-xl font-bold text-white mb-6 pb-4 border-b border-slate-800 flex items-center gap-2">
                  <MdOutlineSensors className="text-indigo-500 drop-shadow-[0_0_8px_rgba(99,102,241,0.8)]" /> Grid Configurations
                </h2>
                
                <div className="space-y-4 mb-8">
                  {/* Auto Alarm Toggle */}
                  <div className="flex items-center justify-between p-5 bg-[#0d131f] rounded-xl border border-slate-800">
                    <div>
                      <h3 className="font-bold text-slate-200">Automated Facility Alarm</h3>
                      <p className="text-sm text-slate-500 mt-1">Automatically sound the physical sirens when a critical hazard is detected.</p>
                    </div>
                    <div 
                      onClick={() => setAutoAlarm(!autoAlarm)}
                      className={`w-14 h-7 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-300 ${autoAlarm ? 'bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.6)]' : 'bg-slate-700'}`}
                    >
                      <div className={`bg-white w-5 h-5 rounded-full shadow-md transform transition-transform duration-300 ${autoAlarm ? 'translate-x-7' : 'translate-x-0'}`}></div>
                    </div>
                  </div>

                  {/* Maintenance Mode */}
                  <div className={`flex items-center justify-between p-5 rounded-xl border transition-colors duration-300 ${maintenanceMode ? 'bg-orange-500/10 border-orange-500/50 shadow-[0_0_15px_rgba(249,115,22,0.15)]' : 'bg-[#0d131f] border-slate-800'}`}>
                    <div>
                      <h3 className={`font-bold ${maintenanceMode ? 'text-orange-400 drop-shadow-[0_0_5px_rgba(249,115,22,0.5)]' : 'text-slate-200'}`}>Maintenance Mode</h3>
                      <p className="text-sm text-slate-500 mt-1">Temporarily disable alerts during system testing or sensor calibration.</p>
                    </div>
                    <div 
                      onClick={() => setMaintenanceMode(!maintenanceMode)}
                      className={`w-14 h-7 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-300 ${maintenanceMode ? 'bg-orange-500 shadow-[0_0_10px_rgba(249,115,22,0.6)]' : 'bg-slate-700'}`}
                    >
                      <div className={`bg-white w-5 h-5 rounded-full shadow-md transform transition-transform duration-300 ${maintenanceMode ? 'translate-x-7' : 'translate-x-0'}`}></div>
                    </div>
                  </div>
                </div>

                {/* Danger Zone */}
                <div className="p-6 border border-red-500/30 bg-red-500/5 rounded-xl shadow-[inset_0_0_20px_rgba(239,68,68,0.05)]">
                  <h3 className="font-bold text-red-400 drop-shadow-[0_0_5px_rgba(239,68,68,0.5)] mb-2">Danger Zone</h3>
                  <p className="text-sm text-slate-400 mb-5">Actions here can affect the historical data and active state of the security grid.</p>
                  <div className="flex flex-wrap gap-4">
                    <button className="bg-red-600/90 text-white font-bold py-2.5 px-5 rounded-lg text-sm hover:bg-red-500 transition shadow-[0_0_15px_rgba(239,68,68,0.3)]">
                      Clear Alert History
                    </button>
                    <button className="bg-transparent text-red-400 border border-red-500/50 font-bold py-2.5 px-5 rounded-lg text-sm hover:bg-red-500/10 transition">
                      Factory Reset Grid
                    </button>
                  </div>
                </div>

              </div>
            )}

          </div>
        </div>
        
        {/* Custom Keyframe animation for smooth tab switching */}
        <style>{`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}</style>

      </div>
    </div>
  );
}
// import React, { useState } from 'react';
// import { IoSettingsSharp, IoSave } from "react-icons/io5";
// import { FaUserCog, FaBell, FaShieldAlt } from "react-icons/fa";
// import { MdOutlineSensors } from "react-icons/md";

// export default function AdminSettings() {
//   // Tabs මාරු කරන්න state එකක්
//   const [activeTab, setActiveTab] = useState('profile');

//   // Toggle buttons වල state (දැනට UI එකට විතරයි)
//   const [autoAlarm, setAutoAlarm] = useState(true);
//   const [maintenanceMode, setMaintenanceMode] = useState(false);
//   const [emailAlerts, setEmailAlerts] = useState(true);

//   return (
//     <div className="p-8 w-full">
      
//       {/* ── Page Header ── */}
//       <div className="mb-8 flex justify-between items-end">
//         <div>
//           <h1 className="text-3xl font-bold text-gray-800 tracking-tight flex items-center gap-3">
//             <IoSettingsSharp className="text-blue-600" /> System Settings
//           </h1>
//           <p className="text-gray-500 mt-1">Configure system parameters and administrator preferences.</p>
//         </div>
//         <button className="bg-blue-600 text-white px-5 py-2.5 rounded-lg font-bold hover:bg-blue-700 transition shadow-md shadow-blue-600/30 flex items-center gap-2">
//           <IoSave size={20} /> Save Changes
//         </button>
//       </div>

//       <div className="flex flex-col lg:flex-row gap-8">
        
//         {/* ── Left Sidebar (Tabs) ── */}
//         <div className="w-full lg:w-1/4">
//           <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
//             <button 
//               onClick={() => setActiveTab('profile')}
//               className={`w-full flex items-center gap-3 px-5 py-4 text-sm font-bold transition-colors ${activeTab === 'profile' ? 'bg-blue-50 text-blue-600 border-l-4 border-blue-600' : 'text-gray-600 hover:bg-gray-50 border-l-4 border-transparent'}`}
//             >
//               <FaUserCog size={18} /> Admin Profile
//             </button>
//             <button 
//               onClick={() => setActiveTab('notifications')}
//               className={`w-full flex items-center gap-3 px-5 py-4 text-sm font-bold transition-colors ${activeTab === 'notifications' ? 'bg-blue-50 text-blue-600 border-l-4 border-blue-600' : 'text-gray-600 hover:bg-gray-50 border-l-4 border-transparent border-t border-gray-100'}`}
//             >
//               <FaBell size={18} /> Notifications
//             </button>
//             <button 
//               onClick={() => setActiveTab('system')}
//               className={`w-full flex items-center gap-3 px-5 py-4 text-sm font-bold transition-colors ${activeTab === 'system' ? 'bg-blue-50 text-blue-600 border-l-4 border-blue-600' : 'text-gray-600 hover:bg-gray-50 border-l-4 border-transparent border-t border-gray-100'}`}
//             >
//               <FaShieldAlt size={18} /> System Config
//             </button>
//           </div>
//         </div>

//         {/* ── Right Content Area ── */}
//         <div className="w-full lg:w-3/4">
          
//           {/* Profile Settings Tab */}
//           {activeTab === 'profile' && (
//             <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 animate-[fadeIn_0.3s_ease-in-out]">
//               <h2 className="text-xl font-bold text-gray-800 mb-6 pb-4 border-b border-gray-100">Profile Information</h2>
              
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
//                 <div>
//                   <label className="block text-xs font-bold text-gray-500 mb-2 uppercase tracking-wider">First Name</label>
//                   <input type="text" defaultValue="admin" className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 outline-none focus:border-blue-500 transition text-sm text-gray-800 font-medium" />
//                 </div>
//                 <div>
//                   <label className="block text-xs font-bold text-gray-500 mb-2 uppercase tracking-wider">Last Name</label>
//                   <input type="text" defaultValue="admin" className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 outline-none focus:border-blue-500 transition text-sm text-gray-800 font-medium" />
//                 </div>
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
//                 <div>
//                   <label className="block text-xs font-bold text-gray-500 mb-2 uppercase tracking-wider">Email Address</label>
//                   <input type="email" defaultValue="admin@gmail.com" className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 outline-none focus:border-blue-500 transition text-sm text-gray-800 font-medium" disabled />
//                   <p className="text-xs text-gray-400 mt-1">Email address cannot be changed.</p>
//                 </div>
//                 <div>
//                   <label className="block text-xs font-bold text-gray-500 mb-2 uppercase tracking-wider">Phone Number</label>
//                   <input type="text" defaultValue="0715668974" className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 outline-none focus:border-blue-500 transition text-sm text-gray-800 font-medium" />
//                 </div>
//               </div>

//               <h2 className="text-xl font-bold text-gray-800 mb-6 pb-4 border-b border-gray-100">Change Password</h2>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <div>
//                   <label className="block text-xs font-bold text-gray-500 mb-2 uppercase tracking-wider">New Password</label>
//                   <input type="password" placeholder="Enter new password" className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 outline-none focus:border-blue-500 transition text-sm" />
//                 </div>
//                 <div>
//                   <label className="block text-xs font-bold text-gray-500 mb-2 uppercase tracking-wider">Confirm Password</label>
//                   <input type="password" placeholder="Confirm new password" className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 outline-none focus:border-blue-500 transition text-sm" />
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* Notifications Tab */}
//           {activeTab === 'notifications' && (
//             <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 animate-[fadeIn_0.3s_ease-in-out]">
//               <h2 className="text-xl font-bold text-gray-800 mb-6 pb-4 border-b border-gray-100">Alert Preferences</h2>
              
//               <div className="space-y-6">
//                 {/* Email Alerts Toggle */}
//                 <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100">
//                   <div>
//                     <h3 className="font-bold text-gray-800">Critical Email Alerts</h3>
//                     <p className="text-sm text-gray-500 mt-1">Receive immediate emails for 'Man Down' and 'Gas Leak' events.</p>
//                   </div>
//                   <div 
//                     onClick={() => setEmailAlerts(!emailAlerts)}
//                     className={`w-14 h-7 flex items-center rounded-full p-1 cursor-pointer transition-colors ${emailAlerts ? 'bg-blue-600' : 'bg-gray-300'}`}
//                   >
//                     <div className={`bg-white w-5 h-5 rounded-full shadow-md transform transition-transform ${emailAlerts ? 'translate-x-7' : 'translate-x-0'}`}></div>
//                   </div>
//                 </div>

//                 {/* SMS Alerts Toggle */}
//                 <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100">
//                   <div>
//                     <h3 className="font-bold text-gray-800">SMS Notifications</h3>
//                     <p className="text-sm text-gray-500 mt-1">Send SMS to on-duty guards during an emergency.</p>
//                   </div>
//                   <div className="w-14 h-7 flex items-center rounded-full p-1 cursor-pointer bg-blue-600">
//                     <div className="bg-white w-5 h-5 rounded-full shadow-md transform translate-x-7"></div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* System Config Tab */}
//           {activeTab === 'system' && (
//             <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 animate-[fadeIn_0.3s_ease-in-out]">
//               <h2 className="text-xl font-bold text-gray-800 mb-6 pb-4 border-b border-gray-100 flex items-center gap-2">
//                 <MdOutlineSensors className="text-gray-400" /> Grid Configurations
//               </h2>
              
//               <div className="space-y-6 mb-8">
//                 {/* Auto Alarm Toggle */}
//                 <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100">
//                   <div>
//                     <h3 className="font-bold text-gray-800">Automated Facility Alarm</h3>
//                     <p className="text-sm text-gray-500 mt-1">Automatically sound the physical sirens when a critical hazard is detected.</p>
//                   </div>
//                   <div 
//                     onClick={() => setAutoAlarm(!autoAlarm)}
//                     className={`w-14 h-7 flex items-center rounded-full p-1 cursor-pointer transition-colors ${autoAlarm ? 'bg-green-500' : 'bg-gray-300'}`}
//                   >
//                     <div className={`bg-white w-5 h-5 rounded-full shadow-md transform transition-transform ${autoAlarm ? 'translate-x-7' : 'translate-x-0'}`}></div>
//                   </div>
//                 </div>

//                 {/* Maintenance Mode */}
//                 <div className="flex items-center justify-between p-4 bg-orange-50 rounded-xl border border-orange-100">
//                   <div>
//                     <h3 className="font-bold text-orange-800">Maintenance Mode</h3>
//                     <p className="text-sm text-orange-600 mt-1">Temporarily disable alerts during system testing or sensor calibration.</p>
//                   </div>
//                   <div 
//                     onClick={() => setMaintenanceMode(!maintenanceMode)}
//                     className={`w-14 h-7 flex items-center rounded-full p-1 cursor-pointer transition-colors ${maintenanceMode ? 'bg-orange-500' : 'bg-orange-200'}`}
//                   >
//                     <div className={`bg-white w-5 h-5 rounded-full shadow-md transform transition-transform ${maintenanceMode ? 'translate-x-7' : 'translate-x-0'}`}></div>
//                   </div>
//                 </div>
//               </div>

//               <div className="p-5 border border-red-200 bg-red-50 rounded-xl">
//                 <h3 className="font-bold text-red-800 mb-2">Danger Zone</h3>
//                 <p className="text-sm text-red-600 mb-4">Actions here can affect the historical data and active state of the security grid.</p>
//                 <div className="flex gap-4">
//                   <button className="bg-red-600 text-white font-bold py-2 px-4 rounded-lg text-sm hover:bg-red-700 transition">Clear Alert History</button>
//                   <button className="bg-white text-red-600 border border-red-200 font-bold py-2 px-4 rounded-lg text-sm hover:bg-red-100 transition">Factory Reset Grid</button>
//                 </div>
//               </div>

//             </div>
//           )}

//         </div>
//       </div>
      
//       {/* Custom Keyframe animation for smooth tab switching (Tailwind doesn't have fadeIn by default) */}
//       <style>{`
//         @keyframes fadeIn {
//           from { opacity: 0; transform: translateY(5px); }
//           to { opacity: 1; transform: translateY(0); }
//         }
//       `}</style>

//     </div>
//   );
// }