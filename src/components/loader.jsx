import React from 'react';

export default function Loader() {
  return (
    // Dark transparent background with backdrop blur
    <div className="fixed inset-0 z-[100] bg-[#090D14]/80 backdrop-blur-md flex flex-col justify-center items-center gap-8">
      
      <div className="relative w-32 h-32 flex justify-center items-center">
        {/* Core Glow Effect (Underneath everything) */}
        <div className="absolute inset-0 bg-blue-600 rounded-full blur-[40px] opacity-30 animate-pulse"></div>

        {/* Outer Track Ring (Faded blue) */}
        <div className="absolute w-full h-full border-[5px] border-blue-900/40 rounded-full"></div>
        
        {/* Outer Spinning Ring (Bright Blue) */}
        <div className="absolute w-full h-full border-[5px] border-transparent border-t-blue-500 border-r-blue-500 rounded-full animate-[spin_2s_linear_infinite] drop-shadow-[0_0_15px_rgba(59,130,246,0.8)]"></div>

        {/* Inner Track Ring (Faded Cyan) */}
        <div className="absolute w-20 h-20 border-[5px] border-teal-900/40 rounded-full"></div>

        {/* Inner Spinning Ring (Cyan - Spins opposite direction) */}
        <div className="absolute w-20 h-20 border-[5px] border-transparent border-b-teal-400 border-l-teal-400 rounded-full animate-[spin_1.5s_linear_reverse_infinite] drop-shadow-[0_0_15px_rgba(45,212,191,0.8)]"></div>

        {/* Center Glowing Core */}
        <div className="w-6 h-6 bg-blue-400 rounded-full shadow-[0_0_25px_rgba(96,165,250,1)] animate-pulse"></div>
      </div>

      {/* Futuristic Loading Text */}
      <div className="flex flex-col items-center gap-2">
        <p className="text-blue-400 font-black tracking-[0.3em] text-xl uppercase drop-shadow-[0_0_10px_rgba(96,165,250,0.8)] animate-pulse">
          LOADING...
        </p>
        {/* Small subtitle or scanning effect line */}
        <div className="flex gap-1 items-center">
          <div className="w-12 h-0.5 bg-gradient-to-r from-transparent to-blue-500"></div>
          <p className="text-[10px] text-teal-400 tracking-widest font-mono uppercase opacity-80">Grid Core</p>
          <div className="w-12 h-0.5 bg-gradient-to-l from-transparent to-blue-500"></div>
        </div>
      </div>

    </div>
  );
}