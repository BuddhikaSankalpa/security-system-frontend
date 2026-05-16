import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { MdBadge, MdOutlineLocationOn, MdPhoneIphone, MdEmail } from "react-icons/md";
import { FaUserShield, FaUsers, FaUserPlus } from "react-icons/fa";
import { IoAlertCircle, IoCheckmarkCircle } from "react-icons/io5"; // New
import { io } from 'socket.io-client'; // New
import Loader from "../../components/loader";

const envUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000/api";
const socketUrl = envUrl.replace(/\/api\/?$/, '');

export default function AdmineEployers() {
  const [employees, setEmployees] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // New: State to store active alerts
  const [activeAlerts, setActiveAlerts] = useState([]); 

  useEffect(() => {
    // 1. Fetch Employees
    async function fetchEmployees() {
      try {
        const response = await axios.get(`${envUrl}/employees`);
        setEmployees(response.data);
      } catch (err) {
        toast.error("Failed to load employee records.");
      } finally {
        setIsLoading(false);
      }
    }

    // 2. Fetch pending alerts (to identify people currently in trouble)
    async function fetchPendingAlerts() {
      try {
        const response = await axios.get(`${envUrl}/alerts`);
        setActiveAlerts(response.data.filter(a => a.status !== 'Resolved' && a.type === 'Employee Emergency'));
      } catch (err) {
        console.error("Failed to load alerts", err);
      }
    }

    fetchEmployees();
    fetchPendingAlerts();

    // 3. Socket Setup
    const socket = io(socketUrl, { transports: ['websocket'] });

    socket.on('new-emergency', (alertData) => {
      if (alertData.type === 'Employee Emergency') {
        setActiveAlerts((prev) => [...prev, alertData]);
      }
    });

    socket.on('alert-resolved', (resolvedAlertId) => {
      setActiveAlerts((prev) => prev.filter(alert => alert._id !== resolvedAlertId));
    });

    return () => socket.disconnect();
  }, []);

  // Function to resolve an employee alert
  const resolveEmployeeAlert = async (alertId) => {
    try {
      await axios.put(`${envUrl}/alerts/${alertId}/resolve`);
      toast.success("Employee Emergency Resolved!");
    } catch (err) {
      console.log(err);
      toast.error("Failed to resolve emergency.");
    }
  };

  return (
    <div className="p-8 w-full min-h-screen bg-[#090D14] text-slate-300 relative overflow-hidden font-sans">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:40px_40px] opacity-20 pointer-events-none"></div>

      <div className="relative z-10">
        
        <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
              <FaUserShield className="text-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.5)]" /> Security Personnel
            </h1>
            <p className="text-slate-400 mt-1 uppercase text-xs font-bold tracking-widest">
              Authorized Field Operators Database
            </p>
          </div>
          
          <div className="flex gap-3 w-full md:w-auto mt-4 md:mt-0">
            <Link 
              to="/employee-register" 
              className="flex items-center gap-2 bg-blue-600/10 border border-blue-500/30 text-blue-400 hover:bg-blue-600 hover:text-white px-6 py-2.5 rounded-xl font-bold transition-all shadow-[0_0_15px_rgba(59,130,246,0.15)] hover:shadow-[0_0_25px_rgba(59,130,246,0.4)]"
            >
              <FaUserPlus size={18} />
              <span>Add Employer</span>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-[#111826]/80 backdrop-blur-md p-5 rounded-2xl border border-slate-800 flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400 border border-blue-500/20">
                    <FaUsers size={24} />
                </div>
                <div>
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-tighter">Total Staff</p>
                    <h3 className="text-2xl font-black text-white">{employees.length}</h3>
                </div>
            </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-20"><Loader /></div>
        ) : employees.length === 0 ? (
          <div className="text-center py-20 bg-[#111826]/50 rounded-3xl border border-dashed border-slate-800">
            <p className="text-slate-500 font-bold uppercase tracking-widest">No Records Found in Database</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            {employees.map((emp) => {
              
              // Check whether there is an active alert for this employee
              const employeeAlert = activeAlerts.find(a => a.employeeId === emp._id);
              const isEmergency = !!employeeAlert;

              return (
                <div 
                  key={emp._id} 
                  className={`group backdrop-blur-sm p-6 rounded-2xl border transition-all duration-300 relative overflow-hidden ${
                    isEmergency 
                    ? 'bg-red-500/10 border-red-500/50 shadow-[0_0_30px_rgba(239,68,68,0.2)]' // Emergency Style
                    : 'bg-[#111826]/60 border-slate-800 hover:border-blue-500/30' // Normal Style
                  }`}
                >
                  <div className={`absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl -mr-10 -mt-10 transition-colors ${
                    isEmergency ? 'bg-red-500/30 animate-pulse' : 'bg-blue-500/5 group-hover:bg-blue-500/10'
                  }`}></div>

                  <div className="flex flex-col sm:flex-row gap-6 relative z-10">
                    
                    <div className={`w-20 h-20 rounded-2xl border flex items-center justify-center text-3xl font-black shadow-inner shrink-0 ${
                      isEmergency ? 'bg-red-900/50 border-red-500 text-red-400 animate-bounce' : 'bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700 text-blue-400'
                    }`}>
                      {emp.firstName.charAt(0)}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h2 className={`text-xl font-black tracking-wide uppercase truncate ${isEmergency ? 'text-red-400' : 'text-white'}`}>
                            {emp.firstName} {emp.lastName}
                          </h2>
                          <div className={`flex items-center gap-2 text-xs font-bold mt-1 ${isEmergency ? 'text-red-300' : 'text-cyan-400/80'}`}>
                            <MdBadge /> {emp.employeeId}
                          </div>
                        </div>
                        
                        {isEmergency ? (
                           <span className="px-3 py-1 bg-red-500 text-white text-[10px] font-black rounded-full uppercase tracking-tighter shrink-0 ml-2 animate-pulse flex items-center gap-1">
                             <IoAlertCircle /> SOS SIGNAL
                           </span>
                        ) : (
                           <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 text-[10px] font-black rounded-full border border-emerald-500/20 uppercase tracking-tighter shrink-0 ml-2">
                             Active Agent
                           </span>
                        )}
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-6">
                        <div className="flex items-center gap-3 text-slate-400 text-sm truncate">
                          <MdEmail className="text-slate-600 shrink-0" /> 
                          <span className="truncate">{emp.email}</span>
                        </div>
                        <div className="flex items-center gap-3 text-slate-400 text-sm truncate">
                          <MdPhoneIphone className="text-slate-600 shrink-0" /> 
                          <span className="truncate">{emp.phone}</span>
                        </div>
                        <div className="flex items-center gap-3 col-span-full truncate">
                          <MdOutlineLocationOn className={isEmergency ? "text-red-500 shrink-0" : "text-blue-500 shrink-0"} /> 
                          <span className={`font-bold uppercase tracking-wide truncate ${isEmergency ? "text-red-400" : "text-slate-300"}`}>
                            {isEmergency ? `LAST SEEN: ${employeeAlert.location}` : `Assigned: ${emp.assignedZone || 'Unknown'}`}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-800/50 flex justify-end gap-3 relative z-10">
                    
                    {/* Show the Resolve button if there is an emergency */}
                    {isEmergency ? (
                       <button 
                         onClick={() => resolveEmployeeAlert(employeeAlert._id)}
                         className="px-6 py-2 rounded-lg text-sm font-bold bg-green-600 text-white border border-green-500 hover:bg-green-500 transition shadow-[0_0_15px_rgba(34,197,94,0.4)] flex items-center gap-2"
                       >
                         <IoCheckmarkCircle size={18} /> Resolve Emergency
                       </button>
                    ) : (
                      <>
                        <button className="px-4 py-1.5 rounded-lg text-xs font-bold text-slate-400 hover:text-white hover:bg-slate-800 transition">View Logs</button>
                        <button className="px-4 py-1.5 rounded-lg text-xs font-bold bg-blue-600/10 text-blue-400 border border-blue-500/20 hover:bg-blue-600 hover:text-white transition">Full Profile</button>
                      </>
                    )}

                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}