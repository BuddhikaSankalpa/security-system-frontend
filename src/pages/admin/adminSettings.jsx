import React, { useState, useEffect } from 'react';
import axios from 'axios'; 
import { toast } from 'react-hot-toast'; // Added for notifications
import { IoSettingsSharp, IoSave } from "react-icons/io5";
import { FaUserCog, FaBell, FaShieldAlt, FaUserShield, FaExclamationTriangle } from "react-icons/fa";
import { MdOutlineSensors, MdContactPhone, MdLocalHospital } from "react-icons/md"; 

export default function AdminSettings() {
  const [activeTab, setActiveTab] = useState('profile'); 
  const [autoAlarm, setAutoAlarm] = useState(true);
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [emailAlerts, setEmailAlerts] = useState(true);
  
  // Profile Data States
  const [adminId, setAdminId] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [adminPhone, setAdminPhone] = useState('Loading...');
  
  // Password States
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Confirmation Modal State
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const envUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000/api";

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const response = await axios.get(`${envUrl}/users/admins`);
        
        if (response.data && response.data.length > 0) {
          
          // 1. Get the token from LocalStorage
          const token = localStorage.getItem('token'); 

          if (token) {
            // 2. Decode the token to get the logged-in user's email
            const payload = JSON.parse(atob(token.split('.')[1]));
            const loggedInEmail = payload.email;

            // 3. Find the currently logged-in admin from the fetched admin list
            const currentAdmin = response.data.find(admin => admin.email === loggedInEmail);

            if (currentAdmin) {
              // Set the exact details for the logged-in user
              setAdminId(currentAdmin._id);
              setFirstName(currentAdmin.firstName);
              setLastName(currentAdmin.lastName);
              setEmail(currentAdmin.email);
              setAdminPhone(currentAdmin.phone); 
            } else {
              // Fallback if the specific admin is not found
              setAdminPhone(response.data[0].phone); 
            }
          } else {
            // Fallback if no token is found
            setAdminPhone(response.data[0].phone); 
          }

        } else {
          setAdminPhone("Not Found");
        }
      } catch (error) {
        console.error("Failed to fetch admin data", error);
        setAdminPhone("Error");
      }
    };

    fetchAdminData();
  }, [envUrl]);

  // Handle clicking the "SAVE CHANGES" button
  const handleSaveClick = () => {
    // Only validate passwords if the user is trying to change them
    if (newPassword || confirmPassword) {
      if (newPassword !== confirmPassword) {
        toast.error("Passwords do not match!");
        return;
      }
      if (newPassword.length < 6) {
        toast.error("Password must be at least 6 characters long.");
        return;
      }
    }
    
    // Open confirmation modal
    setShowConfirmModal(true);
  };

  // Execute the actual API update
  const handleConfirmSave = async () => {
    try {
      const updatePayload = {
        firstName,
        lastName,
        phone: adminPhone,
      };

      // Only send password if it has been filled out
      if (newPassword) {
        updatePayload.password = newPassword;
      }

      await axios.put(`${envUrl}/users/update/${adminId}`, updatePayload);
      
      toast.success("Profile updated successfully!");
      setShowConfirmModal(false);
      
      // Clear password fields after successful update
      setNewPassword('');
      setConfirmPassword('');
      
    } catch (error) {
      console.error("Failed to update profile", error);
      toast.error(error.response?.data?.message || "Failed to save changes.");
      setShowConfirmModal(false);
    }
  };

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
          <button 
            onClick={handleSaveClick}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-2.5 rounded-lg font-bold hover:from-blue-500 hover:to-indigo-500 transition duration-300 shadow-[0_4px_15px_rgba(59,130,246,0.3)] hover:shadow-[0_4px_25px_rgba(59,130,246,0.5)] flex items-center gap-2 tracking-wide"
          >
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
                    <input 
                      type="text" 
                      value={firstName} 
                      onChange={(e) => setFirstName(e.target.value)}
                      className="w-full px-4 py-3 bg-[#090D14] rounded-xl border border-slate-700 outline-none focus:border-blue-500 focus:shadow-[0_0_10px_rgba(59,130,246,0.2)] transition text-sm text-slate-200 font-medium" 
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 mb-2 uppercase tracking-wider">Last Name</label>
                    <input 
                      type="text" 
                      value={lastName} 
                      onChange={(e) => setLastName(e.target.value)}
                      className="w-full px-4 py-3 bg-[#090D14] rounded-xl border border-slate-700 outline-none focus:border-blue-500 focus:shadow-[0_0_10px_rgba(59,130,246,0.2)] transition text-sm text-slate-200 font-medium" 
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div>
                    <label className="block text-xs font-bold text-slate-500 mb-2 uppercase tracking-wider">Email Address</label>
                    <input 
                      type="email" 
                      value={email} 
                      className="w-full px-4 py-3 bg-[#0d131f] rounded-xl border border-slate-800 outline-none text-sm text-slate-500 font-medium cursor-not-allowed" 
                      disabled 
                    />
                    <p className="text-xs text-slate-600 mt-2">Email address cannot be changed.</p>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 mb-2 uppercase tracking-wider">Phone Number</label>
                    <input 
                      type="text" 
                      value={adminPhone} 
                      onChange={(e) => setAdminPhone(e.target.value)}
                      className="w-full px-4 py-3 bg-[#090D14] rounded-xl border border-slate-700 outline-none focus:border-blue-500 focus:shadow-[0_0_10px_rgba(59,130,246,0.2)] transition text-sm text-slate-200 font-medium" 
                    />
                  </div>
                </div>

                <h2 className="text-xl font-bold text-white mb-6 pb-4 border-b border-slate-800">Change Password</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold text-slate-500 mb-2 uppercase tracking-wider">New Password</label>
                    <input 
                      type="password" 
                      placeholder="Leave blank to keep current" 
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="w-full px-4 py-3 bg-[#090D14] rounded-xl border border-slate-700 outline-none focus:border-blue-500 focus:shadow-[0_0_10px_rgba(59,130,246,0.2)] transition text-sm text-white" 
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 mb-2 uppercase tracking-wider">Confirm Password</label>
                    <input 
                      type="password" 
                      placeholder="Leave blank to keep current" 
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full px-4 py-3 bg-[#090D14] rounded-xl border border-slate-700 outline-none focus:border-blue-500 focus:shadow-[0_0_10px_rgba(59,130,246,0.2)] transition text-sm text-white" 
                    />
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

                  {/* SMS Alerts Toggle */}
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

                <h2 className="text-xl font-bold text-white mb-6 mt-10 pb-4 border-b border-slate-800 flex items-center gap-2">
                  <MdContactPhone className="text-blue-500 drop-shadow-[0_0_8px_rgba(59,130,246,0.8)]" /> Emergency Escalation Contacts
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div className="flex items-center gap-5 p-5 bg-[#0d131f] rounded-xl border border-slate-800 shadow-sm">
                    <div className="w-14 h-14 rounded-full bg-blue-500/10 flex items-center justify-center border border-blue-500/30 text-blue-400 shrink-0">
                      <FaUserShield size={24} />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-400 text-sm uppercase tracking-wider">Security Officer</h3>
                      <p className="text-2xl font-black text-slate-200 tracking-wider mt-1">{adminPhone}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-5 p-5 bg-red-500/5 rounded-xl border border-red-500/20 shadow-sm">
                    <div className="w-14 h-14 rounded-full bg-red-500/10 flex items-center justify-center border border-red-500/30 text-red-500 shrink-0">
                      <MdLocalHospital size={28} />
                    </div>
                    <div>
                      <h3 className="font-bold text-red-400/80 text-sm uppercase tracking-wider">Emergency Services</h3>
                      <p className="text-2xl font-black text-red-500 drop-shadow-[0_0_5px_rgba(239,68,68,0.5)] tracking-wider mt-1">0764014474</p>
                    </div>
                  </div>
                </div>

                <div className="p-6 border border-red-500/30 bg-red-500/5 rounded-xl shadow-[inset_0_0_20px_rgba(239,68,68,0.05)] mt-10">
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

        {/* ── Confirmation Modal ── */}
        {showConfirmModal && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 p-4">
            <div className="bg-[#111826] border border-slate-700 rounded-2xl w-full max-w-sm p-6 shadow-[0_0_40px_rgba(0,0,0,0.8)] relative animate-[fadeIn_0.2s_ease-in-out]">
              <h2 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                 <FaExclamationTriangle className="text-yellow-500" /> Confirm Changes
              </h2>
              <p className="text-slate-400 text-sm mb-6 leading-relaxed">
                Are you sure you want to save these profile changes? This will update your administrator record.
              </p>
              
              <div className="flex justify-end gap-3">
                <button 
                  onClick={() => setShowConfirmModal(false)} 
                  className="px-5 py-2.5 rounded-lg text-sm font-bold text-slate-400 hover:text-white bg-slate-800/50 hover:bg-slate-700 border border-slate-700 transition"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleConfirmSave} 
                  className="px-5 py-2.5 rounded-lg text-sm font-bold bg-blue-600 text-white hover:bg-blue-500 transition shadow-[0_0_15px_rgba(59,130,246,0.3)] flex items-center gap-2"
                >
                  <IoSave size={16} /> Confirm
                </button>
              </div>
            </div>
          </div>
        )}

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