import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { FaUserShield, FaUserPlus, FaTimes } from "react-icons/fa";
import { MdOutlineLocalPhone } from "react-icons/md";
import Loader from "../../components/loader"; 

export default function AdminSecurityPersonnel() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // States needed for the edit modal
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  // Retrieve all users from the backend
  async function fetchUsers() {
    try {
      const response = await axios.get(import.meta.env.VITE_BACKEND_URL + "/users/all");
      setUsers(response.data);
    } catch (err) {
      toast.error("Failed to load personnel data.");
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  // 🔴 Remove (delete) a user
  async function handleRemoveUser(id) {
    if (window.confirm("Are you sure you want to remove this operator/admin?")) {
      try {
        setIsLoading(true);
        await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/users/delete/${id}`);
        toast.success("Personnel removed successfully!");
        // Remove from the list and update state
        setUsers(users.filter(user => user._id !== id));
      } catch (err) {
        toast.error(err.response?.data?.message || "Failed to remove user.");
      } finally {
        setIsLoading(false);
      }
    }
  }

  // 🟡 Function to open the edit modal
  function openEditModal(user) {
    setSelectedUser({ ...user });
    setIsEditModalOpen(true);
  }

  // 🟡 Save the modified data to the backend
  async function handleUpdateUser(e) {
    e.preventDefault();
    try {
      setIsLoading(true);
      await axios.put(`${import.meta.env.VITE_BACKEND_URL}/users/update/${selectedUser._id}`, selectedUser);
      toast.success("Personnel updated successfully!");
      setIsEditModalOpen(false);
      fetchUsers(); // Refresh data
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update user.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="p-8 w-full min-h-screen bg-[#090D14] text-slate-300 relative overflow-hidden font-sans">
      {/* Background Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:40px_40px] opacity-20 pointer-events-none"></div>

      <div className="relative z-10">
        <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
              <FaUserShield className="text-blue-500 drop-shadow-[0_0_8px_rgba(59,130,246,0.8)]" /> Personnel Management
            </h1>
            <p className="text-slate-400 mt-1">Manage system admin access and all registered personnel profiles.</p>
          </div>
          
          {/* <button className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-2.5 rounded-lg font-bold hover:from-blue-500 hover:to-indigo-500 transition duration-300 shadow-[0_4px_15px_rgba(59,130,246,0.3)] hover:shadow-[0_4px_25px_rgba(59,130,246,0.5)] flex items-center gap-2 tracking-wide">
            <FaUserPlus /> REGISTER PERSONNEL
          </button> */}
          
          <Link 
              to="/register" 
              className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-2.5 rounded-lg font-bold hover:from-blue-500 hover:to-indigo-500 transition duration-300 shadow-[0_4px_15px_rgba(59,130,246,0.3)] hover:shadow-[0_4px_25px_rgba(59,130,246,0.5)] flex items-center gap-2 tracking-wide"
            >
              <FaUserPlus size={18} />
              <span>REGISTER PERSONNEL</span>
            </Link>
        </div>

            

        <div className="bg-[#111826] rounded-xl shadow-lg border border-slate-800 overflow-hidden">
          
          {isLoading ? (
            <div className="flex justify-center items-center py-20"><Loader /></div>
          ) : users.length === 0 ? (
            <div className="text-center py-20 text-slate-500 font-bold uppercase tracking-widest">
              No Personnel Found
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#0d131f] text-slate-400 text-xs uppercase tracking-wider border-b border-slate-800">
                    <th className="p-5 font-bold">Officer Name</th>
                    <th className="p-5 font-bold">Contact Info</th>
                    <th className="p-5 font-bold">Role</th>
                    <th className="p-5 font-bold">Account Status</th>
                    <th className="p-5 font-bold">Actions</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {users.map((person) => (
                    <tr key={person._id} className="hover:bg-[#161f33] transition duration-200 border-b border-slate-800/50 last:border-0">
                      <td className="p-5 flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/30 flex items-center justify-center font-bold text-lg shadow-[0_0_10px_rgba(59,130,246,0.15)]">
                          {person.firstName ? person.firstName.charAt(0).toUpperCase() : "U"}
                        </div>
                        <div>
                          <p className="font-bold text-slate-200 text-base">{person.firstName} {person.lastName}</p>
                          <p className="text-xs text-slate-400 mt-0.5">{person.email}</p>
                        </div>
                      </td>
                      <td className="p-5 text-slate-300">
                        <div className="flex items-center gap-2">
                          <MdOutlineLocalPhone className="text-slate-500" /> {person.phone}
                        </div>
                      </td>
                      <td className="p-5 font-bold text-indigo-400">
                        {person.role || (person.isAdmin ? "System Admin" : "User")}
                      </td>
                      <td className="p-5">
                        <span className={`px-3 py-1.5 rounded-md text-xs font-bold tracking-wide border ${
                          !person.isBlocked 
                            ? 'bg-green-500/10 text-green-400 border-green-500/30 shadow-[0_0_8px_rgba(34,197,94,0.15)]' 
                            : 'bg-red-500/10 text-red-400 border-red-500/30 shadow-[0_0_8px_rgba(239,68,68,0.15)]'
                        }`}>
                          {!person.isBlocked ? "Active" : "Blocked"}
                        </span>
                      </td>
                      <td className="p-5 flex gap-4">
                        <button 
                          onClick={() => openEditModal(person)}
                          className="text-blue-400 font-bold hover:text-blue-300 hover:drop-shadow-[0_0_5px_rgba(96,165,250,0.6)] transition"
                        >
                          Edit
                        </button>
                        <button 
                          onClick={() => handleRemoveUser(person._id)}
                          className="text-red-400 font-bold hover:text-red-300 hover:drop-shadow-[0_0_5px_rgba(248,113,113,0.6)] transition"
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* 🟢 EDIT MODAL POPUP (Styled to match page theme) */}
      {isEditModalOpen && selectedUser && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-[#111826] border border-slate-700/60 rounded-2xl w-full max-w-lg p-6 relative shadow-2xl animate-fade-in">
            <button 
              onClick={() => setIsEditModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white transition"
            >
              <FaTimes size={18} />
            </button>
            
            <h2 className="text-xl font-bold text-white mb-4 border-b border-slate-800 pb-2">
              Update Personnel Profile
            </h2>

            <form onSubmit={handleUpdateUser} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-400 uppercase">First Name</label>
                  <input 
                    type="text" 
                    value={selectedUser.firstName} 
                    onChange={(e) => setSelectedUser({...selectedUser, firstName: e.target.value})}
                    className="w-full mt-1 px-4 py-2 bg-slate-800/50 border border-slate-700 text-white rounded-lg outline-none focus:border-blue-500 transition"
                    required
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-400 uppercase">Last Name</label>
                  <input 
                    type="text" 
                    value={selectedUser.lastName} 
                    onChange={(e) => setSelectedUser({...selectedUser, lastName: e.target.value})}
                    className="w-full mt-1 px-4 py-2 bg-slate-800/50 border border-slate-700 text-white rounded-lg outline-none focus:border-blue-500 transition"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-400 uppercase">Email Address</label>
                <input 
                  type="email" 
                  value={selectedUser.email} 
                  onChange={(e) => setSelectedUser({...selectedUser, email: e.target.value})}
                  className="w-full mt-1 px-4 py-2 bg-slate-800/50 border border-slate-700 text-white rounded-lg outline-none focus:border-blue-500 transition"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-400 uppercase">Contact Number</label>
                <input 
                  type="text" 
                  value={selectedUser.phone} 
                  onChange={(e) => setSelectedUser({...selectedUser, phone: e.target.value})}
                  className="w-full mt-1 px-4 py-2 bg-slate-800/50 border border-slate-700 text-white rounded-lg outline-none focus:border-blue-500 transition"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-400 uppercase">System Role</label>
                  <select 
                    value={selectedUser.role} 
                    onChange={(e) => setSelectedUser({...selectedUser, role: e.target.value})}
                    className="w-full mt-1 px-3 py-2 bg-slate-800 border border-slate-700 text-white rounded-lg outline-none focus:border-blue-500"
                  >
                    <option value="Security Officer">Security Officer</option>
                    <option value="Field Operator">Field Operator</option>
                    <option value="System Admin">System Admin</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-400 uppercase">Account Status</label>
                  <select 
                    value={selectedUser.isBlocked ? "true" : "false"} 
                    onChange={(e) => setSelectedUser({...selectedUser, isBlocked: e.target.value === "true"})}
                    className="w-full mt-1 px-3 py-2 bg-slate-800 border border-slate-700 text-white rounded-lg outline-none focus:border-blue-500"
                  >
                    <option value="false">Active</option>
                    <option value="true">Blocked</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-800 mt-6">
                <button 
                  type="button" 
                  onClick={() => setIsEditModalOpen(false)}
                  className="px-4 py-2 bg-slate-800 text-slate-400 font-bold rounded-lg hover:bg-slate-700 transition"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="px-5 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-lg hover:from-blue-500 hover:to-indigo-500 transition shadow-lg"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}