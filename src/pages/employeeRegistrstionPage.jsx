import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import Loader from "../components/loader";
import { 
  MdEmail, 
  MdLockOutline, 
  MdPersonOutline, 
  MdPhoneIphone, 
  MdBadge, 
  MdOutlineLocationOn, 
  MdFingerprint, 
  MdOutlineRoom 
} from "react-icons/md";

export default function EmployeeRegisterPage() {
  // All state variables needed for this form, including flow and room
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [employeeId, setEmployeeId] = useState("");
  const [flow, setFlow] = useState("FLOW 01"); 
  const [room, setRoom] = useState("Room 01"); 
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  // Register function and validation logic for this form
  async function register() {
      if (firstName.trim() === "") return toast.error("First name is required");
      if (lastName.trim() === "") return toast.error("Last name is required");
      if (employeeId.trim() === "") return toast.error("Employee ID is required");
      if (email.trim() === "") return toast.error("Email is required");
      if (phone.trim() === "") return toast.error("Phone number is required");
      if (password.trim() === "") return toast.error("Password is required");
      if (password !== confirmPassword) return toast.error("Passwords do not match");

      setIsLoading(true);

      // Build the environment URL
      const envUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000/api";

      try {
        await axios.post(`${envUrl}/employees/register`, {
          firstName: firstName.trim(),
          lastName: lastName.trim(),
          email: email.trim(),
          phone: phone.trim(),
          employeeId: employeeId.trim(),
          flow: flow,
          room: room,
          password: password.trim(),
          role: "Field Operator" // The role used by this form
        });

        toast.success("Identity Registered Successfully!");
        navigate("/admin/employers"); 

      } catch (err) {
        const errorMessage = err.response?.data?.message || "Registration failed!";
        toast.error(errorMessage);
        console.log(err);
      } finally {
        setIsLoading(false);
      }
  }

  return (
    <div className="relative min-h-screen bg-[#0B1121] bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] flex items-center justify-center p-4">
      
      {/* Emerald/Teal Glow Effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-emerald-600/10 rounded-full blur-[150px] pointer-events-none"></div>

      <div className="relative w-full max-w-5xl flex flex-col md:flex-row-reverse rounded-3xl shadow-[0_0_50px_-12px_rgba(16,185,129,0.2)] overflow-hidden bg-slate-900/80 backdrop-blur-xl border border-slate-700/50 z-10">
        
        {/* Left Side (Branding & Employee Core - the green UI section is unchanged) */}
        <div className="hidden md:flex w-1/2 bg-gradient-to-bl from-slate-900 to-slate-800 p-12 flex-col justify-between border-l border-slate-700/50 relative overflow-hidden">
          <MdFingerprint className="absolute -top-10 -right-20 text-[350px] text-emerald-900/10 -rotate-12 pointer-events-none" />
          
          <div className="relative z-10">
            <div className="flex items-center gap-3 text-emerald-400 mb-8">
                <MdBadge size={30} className="drop-shadow-[0_0_15px_rgba(16,185,129,0.8)]" />
                <span className="text-xl font-black tracking-widest uppercase">Personnel Hub</span>
            </div>
          </div>

          <div className="relative z-10 my-auto space-y-8">
            <div className="flex items-center gap-5 group cursor-default">
                <div className="p-4 bg-emerald-500/10 rounded-2xl text-emerald-400 border border-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.15)] group-hover:scale-110 transition-transform">
                    <MdBadge size={28} />
                </div>
                <div>
                    <h3 className="text-white font-bold tracking-wide">Identity Verification</h3>
                    <p className="text-slate-400 text-sm mt-1">Register official employee ID & clearance.</p>
                </div>
            </div>

            <div className="flex items-center gap-5 group cursor-default">
                <div className="p-4 bg-teal-500/10 rounded-2xl text-teal-400 border border-teal-500/20 shadow-[0_0_15px_rgba(20,184,166,0.15)] group-hover:scale-110 transition-transform">
                    <MdOutlineLocationOn size={28} />
                </div>
                <div>
                    <h3 className="text-white font-bold tracking-wide">Zone Assignment</h3>
                    <p className="text-slate-400 text-sm mt-1">Allocate field officers to specific facility zones.</p>
                </div>
            </div>
          </div>

          <div className="relative z-10 mt-12">
            <h1 className="text-4xl font-black text-white leading-tight mb-4 tracking-wide">
              Enroll <br/> Field Officer.
            </h1>
            <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
              Register field personnel to the security database for wearable tracking and zone deployment.
            </p>
          </div>
        </div>

        {/* Right Side: Form (Input fields are adapted for the new data, preserving the emerald style) */}
        <div className="w-full md:w-1/2 p-10 md:p-12 flex flex-col justify-center">
          
          <div className="mb-8 text-center md:text-left">
            <h2 className="text-3xl font-black text-white tracking-tight mb-2">Staff Enrollment</h2>
            <p className="text-slate-400 text-sm">Create a new field officer profile.</p>
          </div>

          <div className="space-y-4">
            
            {/* First Name & Last Name */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative group w-full">
                <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-slate-400 group-focus-within:text-emerald-400 transition-colors">
                  <MdPersonOutline size={20} />
                </div>
                <input type="text" placeholder="First Name" className="w-full pl-11 pr-4 py-3 bg-slate-800/50 border border-slate-700 text-white placeholder-slate-500 rounded-xl outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all shadow-inner" onChange={(e) => setFirstName(e.target.value)} />
              </div>
              <div className="relative group w-full">
                <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-slate-400 group-focus-within:text-emerald-400 transition-colors">
                  <MdPersonOutline size={20} />
                </div>
                <input type="text" placeholder="Last Name" className="w-full pl-11 pr-4 py-3 bg-slate-800/50 border border-slate-700 text-white placeholder-slate-500 rounded-xl outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all shadow-inner" onChange={(e) => setLastName(e.target.value)} />
              </div>
            </div>

            {/* Employee ID */}
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-slate-400 group-focus-within:text-emerald-400 transition-colors">
                <MdBadge size={20} />
              </div>
              <input type="text" placeholder="Employee ID (e.g. EMP-001)" className="w-full pl-11 pr-4 py-3 bg-slate-800/50 border border-slate-700 text-white placeholder-slate-500 rounded-xl outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all shadow-inner font-mono" onChange={(e) => setEmployeeId(e.target.value)} />
            </div>

            {/* Email Address */}
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-slate-400 group-focus-within:text-emerald-400 transition-colors">
                <MdEmail size={20} />
              </div>
              <input type="email" placeholder="Email Address" className="w-full pl-11 pr-4 py-3 bg-slate-800/50 border border-slate-700 text-white placeholder-slate-500 rounded-xl outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all shadow-inner" onChange={(e) => setEmail(e.target.value)} />
            </div>
            
            {/* Contact Number */}
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-slate-400 group-focus-within:text-emerald-400 transition-colors">
                <MdPhoneIphone size={20} />
              </div>
              <input type="text" placeholder="Contact Number" className="w-full pl-11 pr-4 py-3 bg-slate-800/50 border border-slate-700 text-white placeholder-slate-500 rounded-xl outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all shadow-inner" onChange={(e) => setPhone(e.target.value)} />
            </div>

            {/* Flow and Room selection section (styled to match the emerald theme) */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative group w-full">
                <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-slate-400 group-focus-within:text-emerald-400 transition-colors">
                  <MdOutlineRoom size={20} />
                </div>
                <select value={flow} onChange={(e) => setFlow(e.target.value)} className="w-full pl-11 pr-4 py-3 bg-slate-800/50 border border-slate-700 text-white rounded-xl outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all shadow-inner appearance-none cursor-pointer">
                  <option value="FLOW 01" className="bg-slate-800 text-white">FLOW 01</option>
                  <option value="FLOW 02" className="bg-slate-800 text-white">FLOW 02</option>
                  <option value="FLOW 03" className="bg-slate-800 text-white">FLOW 03</option>
                  <option value="FLOW 04" className="bg-slate-800 text-white">FLOW 04</option>
                </select>
              </div>
              
              <div className="relative group w-full">
                <select value={room} onChange={(e) => setRoom(e.target.value)} className="w-full pl-4 pr-4 py-3 bg-slate-800/50 border border-slate-700 text-white rounded-xl outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all shadow-inner appearance-none cursor-pointer">
                  <option value="Room 01" className="bg-slate-800 text-white">Room 01</option>
                  <option value="Room 02" className="bg-slate-800 text-white">Room 02</option>
                  <option value="Room 03" className="bg-slate-800 text-white">Room 03</option>
                  <option value="Room 04" className="bg-slate-800 text-white">Room 04</option>
                </select>
              </div>
            </div>

            {/* Passcode & Confirm Passcode */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative group w-full">
                <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-slate-400 group-focus-within:text-emerald-400 transition-colors">
                  <MdLockOutline size={20} />
                </div>
                <input type="password" placeholder="Passcode" className="w-full pl-11 pr-4 py-3 bg-slate-800/50 border border-slate-700 text-white placeholder-slate-500 rounded-xl outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all shadow-inner font-mono tracking-widest" onChange={(e) => setPassword(e.target.value)} />
              </div>
              <div className="relative group w-full">
                <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-slate-400 group-focus-within:text-emerald-400 transition-colors">
                  <MdLockOutline size={20} />
                </div>
                <input type="password" placeholder="Confirm" className="w-full pl-11 pr-4 py-3 bg-slate-800/50 border border-slate-700 text-white placeholder-slate-500 rounded-xl outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all shadow-inner font-mono tracking-widest" onChange={(e) => setConfirmPassword(e.target.value)} />
              </div>
            </div>

            {/* Submit Button (Emerald Style) */}
            <button onClick={register} disabled={isLoading} className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-4 rounded-xl font-bold uppercase tracking-widest hover:from-emerald-500 hover:to-teal-500 transition-all shadow-[0_0_20px_rgba(16,185,129,0.2)] hover:shadow-[0_0_30px_rgba(16,185,129,0.4)] mt-4 relative overflow-hidden group">
              <div className="absolute inset-0 w-full h-full bg-white/20 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></div>
              {isLoading ? "Processing..." : "Enroll Personnel"}
            </button>

          </div>

          {/* Return link with Emerald/Teal Color */}
          <p className="text-center mt-6 text-sm text-slate-400">
            <Link to="/admin/employers" className="text-emerald-400 font-bold hover:text-emerald-300 hover:underline transition-colors">Return to Dashboard</Link>
          </p>
        </div>
      </div>
      {isLoading && <Loader />}
    </div>
  );
}