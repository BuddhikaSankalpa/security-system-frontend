import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import Loader from "../components/loader";
import { MdEmail, MdLockOutline, MdSecurity, MdPersonOutline, MdPhoneIphone } from "react-icons/md";

export default function AuthPortal() {
  // Toggle between Login and Register views
  const [isLoginView, setIsLoginView] = useState(true);

  // Shared state
  const [isLoading, setIsLoading] = useState(false);
  
  // Form states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  // Switch View Handler (Clears inputs when switching)
  const toggleView = () => {
    setIsLoginView(!isLoginView);
    setEmail("");
    setPassword("");
    setFirstName("");
    setLastName("");
    setPhone("");
    setConfirmPassword("");
  };

  // --- LOGIN LOGIC ---
  async function login() {
    if (email.trim() === "") return toast.error("Email is required");
    if (password.trim() === "") return toast.error("Password is required");

    setIsLoading(true);
    try {
      const response = await axios.post(import.meta.env.VITE_BACKEND_URL + "/users/login", {
        email: email.trim(),
        password: password.trim(),
      });

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
    } finally {
      setIsLoading(false);
    }
  }

  // --- REGISTER LOGIC ---
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
      // Automatically switch to login view after successful registration
      setIsLoginView(true);
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Registration failed!";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="relative min-h-screen bg-[#0B1121] bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] flex items-center justify-center p-4">
      
      {/* Dynamic Glow effect behind the card */}
      <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[120px] pointer-events-none transition-colors duration-1000 ${isLoginView ? 'bg-cyan-600/20' : 'bg-blue-600/15'}`}></div>

      {/* Key Prop is important here! Changing the key unmounts and remounts the div, 
        triggering our custom 'animate-cyber-fade' CSS animation every time the view switches.
      */}
      <div 
        key={isLoginView ? 'login' : 'register'} 
        className={`relative w-full max-w-5xl flex flex-col rounded-3xl overflow-hidden bg-slate-900/80 backdrop-blur-xl border border-slate-700/50 z-10 animate-cyber-fade ${isLoginView ? 'md:flex-row shadow-[0_0_50px_-12px_rgba(6,182,212,0.3)]' : 'md:flex-row-reverse shadow-[0_0_50px_-12px_rgba(59,130,246,0.2)]'}`}
      >
        
        {/* ======================= LEFT SIDE GRAPHICS (DYNAMIC) ======================= */}
        {isLoginView ? (
          /* LOGIN GRAPHIC (CYAN) */
          <div className="hidden md:flex w-1/2 bg-gradient-to-br from-slate-900 to-slate-800 p-12 flex-col justify-between border-r border-slate-700/50 relative overflow-hidden">
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
        ) : (
          /* REGISTER GRAPHIC (BLUE) */
          <div className="hidden md:flex w-1/2 bg-gradient-to-bl from-slate-900 to-slate-800 p-12 flex-col justify-between border-l border-slate-700/50 relative overflow-hidden">
            <MdSecurity className="absolute -top-20 -right-20 text-[350px] text-blue-900/10 -rotate-12 pointer-events-none" />
            <div className="relative z-10">
              <div className="flex items-center gap-3 text-blue-400 mb-8">
                  <MdSecurity size={30} className="drop-shadow-[0_0_15px_rgba(59,130,246,0.8)]" />
                  <span className="text-xl font-black tracking-widest uppercase">Grid Core</span>
              </div>
            </div>
            <div className="relative z-10 my-auto w-full flex items-center justify-center -translate-y-8">
              <div className="relative w-72 h-72 scale-110 group cursor-default">
                <div className="absolute inset-0 flex items-center justify-center p-8 bg-blue-950/40 rounded-full border-2 border-blue-500/20 shadow-[0_0_50px_rgba(59,130,246,0.2)] z-20 transition-transform duration-500 group-hover:scale-105">
                  <MdSecurity size={60} className="text-blue-400 drop-shadow-[0_0_20px_rgba(59,130,246,0.9)]" />
                </div>
                <div className="absolute inset-[-20%] border-2 border-blue-600/10 rounded-full scale-90 animate-spin" style={{animationDuration: '20s'}}></div>
                <div className="absolute inset-[-40%] border-2 border-blue-600/10 rounded-full scale-80 animate-[spin_15s_linear_reverse_infinite]"></div>
                <div className="absolute inset-[-60%] border-2 border-blue-600/10 rounded-full scale-70 animate-spin" style={{animationDuration: '25s'}}></div>
                
                {[
                  { top: '10%', left: '10%', color: 'border-cyan-400' },
                  { top: '15%', left: '80%', color: 'border-red-400' },
                  { top: '80%', left: '15%', color: 'border-green-400' },
                  { top: '85%', left: '85%', color: 'border-cyan-400' },
                  { top: '50%', left: '-15%', color: 'border-red-400' },
                  { top: '50%', left: '115%', color: 'border-green-400' }
                ].map((point, index) => (
                  <div key={index} className={`absolute w-3 h-3 rounded-full border-2 ${point.color} shadow-[0_0_15px_rgba(59,130,246,0.4)] animate-pulse`} style={{ top: point.top, left: point.left, animationDelay: `${index * 0.2}s` }} />
                ))}
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
        )}

        {/* ======================= RIGHT SIDE FORM (DYNAMIC) ======================= */}
        <div className="w-full md:w-1/2 p-10 md:p-14 flex flex-col justify-center">
          
          <div className="mb-8 md:mb-10 text-center md:text-left">
            <h2 className="text-3xl font-black text-white tracking-tight mb-2">
              {isLoginView ? "Access Portal" : "Register Identity"}
            </h2>
            <p className="text-slate-400 text-sm">
              {isLoginView ? "Enter your credentials to access the security grid." : "Create a new operator profile."}
            </p>
          </div>

          <div className="space-y-4 md:space-y-5">
            
            {/* Show Name & Phone Fields ONLY if Registering */}
            {!isLoginView && (
              <>
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="relative group w-full">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-slate-400 group-focus-within:text-blue-400 transition-colors">
                      <MdPersonOutline size={20} />
                    </div>
                    <input type="text" placeholder="First Name" value={firstName} className="w-full pl-11 pr-4 py-3.5 bg-slate-800/50 border border-slate-700 text-white placeholder-slate-500 rounded-xl outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all shadow-inner" onChange={(e) => setFirstName(e.target.value)} />
                  </div>
                  <div className="relative group w-full">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-slate-400 group-focus-within:text-blue-400 transition-colors">
                      <MdPersonOutline size={20} />
                    </div>
                    <input type="text" placeholder="Last Name" value={lastName} className="w-full pl-11 pr-4 py-3.5 bg-slate-800/50 border border-slate-700 text-white placeholder-slate-500 rounded-xl outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all shadow-inner" onChange={(e) => setLastName(e.target.value)} />
                  </div>
                </div>

                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-slate-400 group-focus-within:text-blue-400 transition-colors">
                    <MdPhoneIphone size={20} />
                  </div>
                  <input type="text" placeholder="Secure Comm Number (Phone)" value={phone} className="w-full pl-11 pr-4 py-3.5 bg-slate-800/50 border border-slate-700 text-white placeholder-slate-500 rounded-xl outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all shadow-inner" onChange={(e) => setPhone(e.target.value)} />
                </div>
              </>
            )}

            {/* Email Field (Shared) */}
            <div className="relative group">
              <div className={`absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-slate-400 transition-colors ${isLoginView ? 'group-focus-within:text-cyan-400' : 'group-focus-within:text-blue-400'}`}>
                <MdEmail size={20} />
              </div>
              <input 
                type="email" 
                placeholder={isLoginView ? "Operator Email" : "Official Email Address"} 
                value={email}
                className={`w-full pl-12 pr-4 py-3.5 bg-slate-800/50 border border-slate-700 text-white placeholder-slate-500 rounded-xl outline-none transition-all shadow-inner ${isLoginView ? 'focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500' : 'focus:border-blue-500 focus:ring-1 focus:ring-blue-500'}`}
                onChange={(e) => setEmail(e.target.value)} 
              />
            </div>
            
            {/* Password Field(s) */}
            {isLoginView ? (
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-slate-400 group-focus-within:text-cyan-400 transition-colors">
                  <MdLockOutline size={20} />
                </div>
                <input 
                  type="password" 
                  placeholder="Passcode" 
                  value={password}
                  className="w-full pl-12 pr-4 py-3.5 bg-slate-800/50 border border-slate-700 text-white placeholder-slate-500 rounded-xl outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all shadow-inner tracking-widest font-mono"
                  onChange={(e) => setPassword(e.target.value)} 
                />
              </div>
            ) : (
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative group w-full">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-slate-400 group-focus-within:text-blue-400 transition-colors">
                    <MdLockOutline size={20} />
                  </div>
                  <input type="password" placeholder="Passcode" value={password} className="w-full pl-11 pr-4 py-3.5 bg-slate-800/50 border border-slate-700 text-white placeholder-slate-500 rounded-xl outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all shadow-inner font-mono tracking-widest" onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div className="relative group w-full">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-slate-400 group-focus-within:text-blue-400 transition-colors">
                    <MdLockOutline size={20} />
                  </div>
                  <input type="password" placeholder="Confirm" value={confirmPassword} className="w-full pl-11 pr-4 py-3.5 bg-slate-800/50 border border-slate-700 text-white placeholder-slate-500 rounded-xl outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all shadow-inner font-mono tracking-widest" onChange={(e) => setConfirmPassword(e.target.value)} />
                </div>
              </div>
            )}

            {/* Action Button */}
            <button 
              onClick={isLoginView ? login : register} 
              disabled={isLoading} 
              className={`w-full text-white py-4 rounded-xl font-bold uppercase tracking-widest transition-all relative overflow-hidden group mt-4 ${
                isLoginView 
                  ? 'bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 shadow-[0_0_20px_rgba(6,182,212,0.2)] hover:shadow-[0_0_30px_rgba(6,182,212,0.4)]'
                  : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 shadow-[0_0_20px_rgba(59,130,246,0.2)] hover:shadow-[0_0_30px_rgba(59,130,246,0.4)]'
              }`}
            >
              <div className="absolute inset-0 w-full h-full bg-white/20 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></div>
              {isLoading ? (isLoginView ? "Authenticating..." : "Processing...") : (isLoginView ? "Initialize Session" : "Submit Identity")}
            </button>
          </div>

          {/* Toggle Text Button */}
          <p className="text-center mt-8 text-sm text-slate-400">
            {isLoginView ? (
              <>
                Unauthorized access is strictly prohibited. <br className="hidden md:block"/>
                Require access? <button onClick={toggleView} className="text-cyan-400 font-bold hover:text-cyan-300 hover:underline transition-colors ml-1">Register Identity</button>
              </>
            ) : (
              <>
                Already verified? <button onClick={toggleView} className="text-blue-400 font-bold hover:text-blue-300 hover:underline transition-colors ml-1">Access Portal</button>
              </>
            )}
          </p>
        </div>
      </div>
      
      {isLoading && <Loader />}

      {/* Embedded CSS for custom cyber animation */}
      <style>{`
        @keyframes cyberFadeIn {
          0% { opacity: 0; transform: scale(0.98) translateY(15px); filter: blur(4px); }
          100% { opacity: 1; transform: scale(1) translateY(0); filter: blur(0); }
        }
        .animate-cyber-fade {
          animation: cyberFadeIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
    </div>
  );
}