import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import Loader from "../components/loader";
// අලුත් icons ටික
import { MdEmail, MdLockOutline, MdSecurity } from "react-icons/md";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  async function login() {
      // 1. Basic input validation
      if (email.trim() === "") return toast.error("Email is required");
      if (password.trim() === "") return toast.error("Password is required");

      setIsLoading(true);

      try {
        const response = await axios.post(import.meta.env.VITE_BACKEND_URL + "/users/login", {
          email: email.trim(),
          password: password.trim(),
        });

        // 3. Check if the authenticated user has Admin privileges
        if (response.data.isAdmin === true) {
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("isAdmin", response.data.isAdmin);
          localStorage.setItem("role", response.data.role);

          toast.success("Authentication Verified!");
          navigate("/"); 

        } else {
          toast.error("Access Denied: Administrative privileges required.");
          localStorage.clear();
        }

      } catch (err) {
        const errorMessage = err.response?.data?.message || "Connection refused. Secure link failed.";
        toast.error(errorMessage);
        console.log("Login Error:", err);
      } finally {
        setIsLoading(false);
      }
  }

  return (
    // Dark tech background with a grid pattern
    <div className="relative min-h-screen bg-[#0B1121] bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] flex items-center justify-center p-4">
      
      {/* Glow effect behind the card */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-600/20 rounded-full blur-[120px] pointer-events-none"></div>

      {/* Main Card Container */}
      <div className="relative w-full max-w-5xl flex flex-col md:flex-row rounded-3xl shadow-[0_0_50px_-12px_rgba(6,182,212,0.3)] overflow-hidden bg-slate-900/80 backdrop-blur-xl border border-slate-700/50 z-10">
        
        {/* Left Side: Branding / Security Graphic */}
        <div className="hidden md:flex w-1/2 bg-gradient-to-br from-slate-900 to-slate-800 p-12 flex-col justify-between border-r border-slate-700/50 relative overflow-hidden">
          {/* Subtle background overlay logo */}
          <MdSecurity className="absolute -bottom-20 -left-20 text-[350px] text-cyan-900/10 rotate-12" />
          
          <div className="relative z-10">
            <div className="flex items-center gap-3 text-cyan-400 mb-8">
              <MdSecurity size={36} className="drop-shadow-[0_0_15px_rgba(6,182,212,0.8)]" />
              <span className="text-2xl font-black tracking-widest uppercase">Grid Core</span>
            </div>
            <h1 className="text-4xl font-black text-white leading-tight mb-4 tracking-wide">
              Industrial <br/> Security & <br/> Rapid Response.
            </h1>
            <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
              Real-time environmental monitoring, personnel safety tracking, and automated emergency protocols.
            </p>
          </div>

          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 bg-slate-800/80 border border-slate-700 rounded-full px-4 py-2">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-500"></span>
              </span>
              <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">System Online</span>
            </div>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="w-full md:w-1/2 p-10 md:p-14 flex flex-col justify-center">
          
          <div className="mb-10 text-center md:text-left">
            <h2 className="text-3xl font-black text-white tracking-tight mb-2">Access Portal</h2>
            <p className="text-slate-400 text-sm">Enter your credentials to access the security grid.</p>
          </div>

          <div className="space-y-5">
            {/* Email Input */}
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-slate-400 group-focus-within:text-cyan-400 transition-colors">
                <MdEmail size={20} />
              </div>
              <input 
                type="email" 
                placeholder="Operator Email" 
                className="w-full pl-12 pr-4 py-3.5 bg-slate-800/50 border border-slate-700 text-white placeholder-slate-500 rounded-xl outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all shadow-inner"
                onChange={(e) => setEmail(e.target.value)} 
              />
            </div>
            
            {/* Password Input */}
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-slate-400 group-focus-within:text-cyan-400 transition-colors">
                <MdLockOutline size={20} />
              </div>
              <input 
                type="password" 
                placeholder="Passcode" 
                className="w-full pl-12 pr-4 py-3.5 bg-slate-800/50 border border-slate-700 text-white placeholder-slate-500 rounded-xl outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all shadow-inner tracking-widest font-mono"
                onChange={(e) => setPassword(e.target.value)} 
              />
            </div>

            {/* Login Button */}
            <button 
              onClick={login} 
              disabled={isLoading} 
              className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 text-white py-4 rounded-xl font-bold uppercase tracking-widest hover:from-cyan-500 hover:to-blue-500 transition-all shadow-[0_0_20px_rgba(6,182,212,0.2)] hover:shadow-[0_0_30px_rgba(6,182,212,0.4)] relative overflow-hidden group mt-4"
            >
              <div className="absolute inset-0 w-full h-full bg-white/20 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></div>
              {isLoading ? "Authenticating..." : "Initialize Session"}
            </button>
          </div>

          <p className="text-center mt-8 text-sm text-slate-400">
            Unauthorized access is strictly prohibited. <br className="hidden md:block"/>
            Require access? <Link to="/register" className="text-cyan-400 font-bold hover:text-cyan-300 hover:underline transition-colors">Register Identity</Link>
          </p>
        </div>
      </div>
      {isLoading && <Loader />}
    </div>
  );
}