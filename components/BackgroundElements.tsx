import React from 'react';

export const BackgroundElements: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
      {/* Main gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-[#0f172a] to-slate-900" />
      
      {/* Grid pattern */}
      <div className="absolute inset-0 opacity-[0.03]" 
           style={{ 
             backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', 
             backgroundSize: '40px 40px' 
           }} 
      />

      {/* Floating Orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[120px] animate-float" />
      <div className="absolute bottom-[-10%] right-[-5%] w-[600px] h-[600px] bg-cyan-600/10 rounded-full blur-[100px] animate-float-delay" />
      <div className="absolute top-[40%] left-[60%] w-[300px] h-[300px] bg-pink-600/15 rounded-full blur-[80px] animate-pulse" />

      {/* 3D Emoji-like shapes (CSS only) */}
      <div className="absolute top-20 right-[10%] opacity-20 hidden lg:block">
        <div className="w-24 h-24 rounded-2xl bg-gradient-to-tr from-cyan-400 to-blue-600 rotate-12 animate-float shadow-2xl shadow-cyan-500/50 backdrop-blur-sm border border-white/10" />
      </div>
      <div className="absolute bottom-40 left-[5%] opacity-20 hidden lg:block">
        <div className="w-20 h-20 rounded-full bg-gradient-to-bl from-yellow-400 to-orange-500 -rotate-12 animate-float-delay shadow-2xl shadow-orange-500/50 backdrop-blur-sm border border-white/10" />
      </div>
    </div>
  );
};
