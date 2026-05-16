
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import Loader from "../components/loader";
// Remove MdOutlineSensors, MdNotificationsActive, MdOutlineWatch icons — they are no longer used
import { MdEmail, MdLockOutline, MdSecurity, MdPersonOutline, MdPhoneIphone } from "react-icons/md";

export default function RegisterPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  async function register() {
      if (firstName.trim() === "") return toast.error("First name is required");
      if (lastName.trim() === "") return toast.error("Last name is required");
      if (email.trim() === "") return toast.error("Email is required");
      if (phone.trim() === "") return toast.error("Phone number is required");
      if (password.trim() === "") return toast.error("Password is required");
      if (password !== confirmPassword) return toast.error("Passwords do not match");

      setIsLoading(true);

      try {
        await axios.post(import.meta.env.VITE_BACKEND_URL + "/users/register", {
          firstName: firstName.trim(),
          lastName: lastName.trim(),
          email: email.trim(),
          phone: phone.trim(),
          password: password.trim(),
          role: "Security Officer" 
        });

        toast.success("Identity Registered Successfully!");
        navigate("/login"); 

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
      
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-blue-600/10 rounded-full blur-[150px] pointer-events-none"></div>

      <div className="relative w-full max-w-5xl flex flex-col md:flex-row-reverse rounded-3xl shadow-[0_0_50px_-12px_rgba(59,130,246,0.2)] overflow-hidden bg-slate-900/80 backdrop-blur-xl border border-slate-700/50 z-10">
        
        {/* Left Side (Branding & New Central Core) */}
        <div className="hidden md:flex w-1/2 bg-gradient-to-bl from-slate-900 to-slate-800 p-12 flex-col justify-between border-l border-slate-700/50 relative overflow-hidden">
          <MdSecurity className="absolute -top-20 -right-20 text-[350px] text-blue-900/10 -rotate-12 pointer-events-none" />
          
          <div className="relative z-10">
            <div className="flex items-center gap-3 text-blue-400 mb-8">
                <MdSecurity size={30} className="drop-shadow-[0_0_15px_rgba(59,130,246,0.8)]" />
                <span className="text-xl font-black tracking-widest uppercase">Grid Core</span>
            </div>
          </div>

          {/* New: Beautiful, Appropriate Grid Core Central Design */}
          <div className="relative z-10 my-auto w-full flex items-center justify-center -translate-y-8">
            <div className="relative w-72 h-72 scale-110 group cursor-default"> {/* Container for the core with a group hover */}
              
              {/* Central Core element with integrated, smaller MdSecurity */}
              <div className="absolute inset-0 flex items-center justify-center p-8 bg-blue-950/40 rounded-full border-2 border-blue-500/20 shadow-[0_0_50px_rgba(59,130,246,0.2)] z-20 transition-transform duration-500 group-hover:scale-105">
                <MdSecurity size={60} className="text-blue-400 drop-shadow-[0_0_20px_rgba(59,130,246,0.9)]" />
              </div>
              
              {/* Concentric rings using pseudo-elements for efficiency */}
              <div className="absolute inset-[-20%] border-2 border-blue-600/10 rounded-full scale-90 animate-spin" style={{animationDuration: '20s'}}></div>
              <div className="absolute inset-[-40%] border-2 border-blue-600/10 rounded-full scale-80 animate-spin-reverse" style={{animationDuration: '15s'}}></div>
              <div className="absolute inset-[-60%] border-2 border-blue-600/10 rounded-full scale-70 animate-spin" style={{animationDuration: '25s'}}></div>
              
              {/* Radiating animated data nodes (circles) using absolute positioning */}
              {[
                { top: '10%', left: '10%', color: 'border-cyan-400' },
                { top: '15%', left: '80%', color: 'border-red-400' },
                { top: '80%', left: '15%', color: 'border-green-400' },
                { top: '85%', left: '85%', color: 'border-cyan-400' },
                { top: '50%', left: '-15%', color: 'border-red-400' },
                { top: '50%', left: '115%', color: 'border-green-400' },
                // Add more points for a grid feel
                { top: '30%', left: '30%', color: 'border-cyan-400/50' },
                { top: '30%', left: '70%', color: 'border-red-400/50' },
                { top: '70%', left: '30%', color: 'border-green-400/50' },
                { top: '70%', left: '70%', color: 'border-cyan-400/50' }
              ].map((point, index) => (
                <div key={index} className={`absolute w-3 h-3 rounded-full border-2 ${point.color} shadow-[0_0_15px_rgba(59,130,246,0.4)] animate-pulse`} style={{ top: point.top, left: point.left, animationDelay: `${index * 0.2}s` }} />
              ))}

              {/* Faint Connecting grid pattern lines (using CSS background) */}
              <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] bg-[size:1.5rem_1.5rem] opacity-40 z-10"></div>
            
            </div>
          </div>

          <div className="relative z-10 mt-12">
            <h1 className="text-4xl font-black text-white leading-tight mb-4 tracking-wide">
              Join the <br/> Defense Grid.
            </h1>
            <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
              Register your identity to become an authorized operator in the facility's rapid response network.
            </p>
          </div>
        </div>

        {/* Right Side: Form (no changes were made here) */}
        <div className="w-full md:w-1/2 p-10 md:p-12 flex flex-col justify-center">
          
          <div className="mb-8 text-center md:text-left">
            <h2 className="text-3xl font-black text-white tracking-tight mb-2">Register Identity</h2>
            <p className="text-slate-400 text-sm">Create a new operator profile.</p>
          </div>

          <div className="space-y-4">
            
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative group w-full">
                <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-slate-400 group-focus-within:text-blue-400 transition-colors">
                  <MdPersonOutline size={20} />
                </div>
                <input type="text" placeholder="First Name" className="w-full pl-11 pr-4 py-3 bg-slate-800/50 border border-slate-700 text-white placeholder-slate-500 rounded-xl outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all shadow-inner" onChange={(e) => setFirstName(e.target.value)} />
              </div>
              <div className="relative group w-full">
                <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-slate-400 group-focus-within:text-blue-400 transition-colors">
                  <MdPersonOutline size={20} />
                </div>
                <input type="text" placeholder="Last Name" className="w-full pl-11 pr-4 py-3 bg-slate-800/50 border border-slate-700 text-white placeholder-slate-500 rounded-xl outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all shadow-inner" onChange={(e) => setLastName(e.target.value)} />
              </div>
            </div>

            <div className="relative group">
              <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-slate-400 group-focus-within:text-blue-400 transition-colors">
                <MdEmail size={20} />
              </div>
              <input type="email" placeholder="Official Email Address" className="w-full pl-11 pr-4 py-3 bg-slate-800/50 border border-slate-700 text-white placeholder-slate-500 rounded-xl outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all shadow-inner" onChange={(e) => setEmail(e.target.value)} />
            </div>
            
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-slate-400 group-focus-within:text-blue-400 transition-colors">
                <MdPhoneIphone size={20} />
              </div>
              <input type="text" placeholder="Secure Comm Number (Phone)" className="w-full pl-11 pr-4 py-3 bg-slate-800/50 border border-slate-700 text-white placeholder-slate-500 rounded-xl outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all shadow-inner" onChange={(e) => setPhone(e.target.value)} />
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative group w-full">
                <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-slate-400 group-focus-within:text-blue-400 transition-colors">
                  <MdLockOutline size={20} />
                </div>
                <input type="password" placeholder="Passcode" className="w-full pl-11 pr-4 py-3 bg-slate-800/50 border border-slate-700 text-white placeholder-slate-500 rounded-xl outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all shadow-inner font-mono tracking-widest" onChange={(e) => setPassword(e.target.value)} />
              </div>
              <div className="relative group w-full">
                <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-slate-400 group-focus-within:text-blue-400 transition-colors">
                  <MdLockOutline size={20} />
                </div>
                <input type="password" placeholder="Confirm" className="w-full pl-11 pr-4 py-3 bg-slate-800/50 border border-slate-700 text-white placeholder-slate-500 rounded-xl outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all shadow-inner font-mono tracking-widest" onChange={(e) => setConfirmPassword(e.target.value)} />
              </div>
            </div>

            <button onClick={register} disabled={isLoading} className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 rounded-xl font-bold uppercase tracking-widest hover:from-blue-500 hover:to-indigo-500 transition-all shadow-[0_0_20px_rgba(59,130,246,0.2)] hover:shadow-[0_0_30px_rgba(59,130,246,0.4)] mt-4 relative overflow-hidden group">
              <div className="absolute inset-0 w-full h-full bg-white/20 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></div>
              {isLoading ? "Processing..." : "Submit Identity"}
            </button>

          </div>

          <p className="text-center mt-6 text-sm text-slate-400">
            Already verified? <Link to="/login" className="text-blue-400 font-bold hover:text-blue-300 hover:underline transition-colors">Access Portal</Link>
          </p>
        </div>
      </div>
      {isLoading && <Loader />}
    </div>
  );
} 