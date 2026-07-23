import { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Award, Flame, Calendar, BookOpen, Clock, Shield, Sliders, Check } from 'lucide-react';

const ACHIEVEMENTS = [
  { id: 1, title: "AI Pathfinder", desc: "Generated your very first custom path.", unlocked: true, icon: Award, color: "text-amber-400 bg-amber-500/10 border-amber-500/20" },
  { id: 2, title: "Consistent Builder", desc: "Completed your first phase project.", unlocked: true, icon: Flame, color: "text-orange-400 bg-orange-500/10 border-orange-500/20" },
  { id: 3, title: "Deep Thinker", desc: "Wrote your first annotated notebook note.", unlocked: true, icon: BookOpen, color: "text-cyan-400 bg-cyan-500/10 border-cyan-500/20" },
  { id: 4, title: "Path Master", desc: "Complete 100% of any learning phase.", unlocked: false, icon: Shield, color: "text-slate-500 bg-slate-500/10 border-slate-500/20" }
];

const Profile = () => {
  const [profileData, setProfileData] = useState({
    name: "Auth Tester",
    email: "authtester22@example.com",
    role: "Aspiring AI Developer"
  });

  const [autosaveMsg, setAutosaveMsg] = useState("");

  const handleInputChange = (field, val) => {
    setProfileData({ ...profileData, [field]: val });
    setAutosaveMsg("Saving...");
    setTimeout(() => {
      setAutosaveMsg("Changes saved");
    }, 500);
  };

  return (
    <div className="flex-1 bg-[#020617] text-white min-h-screen relative p-6 md:p-10 lg:p-12 max-w-[1600px] w-full mx-auto font-sans flex flex-col justify-start">
      {/* Background radial highlight */}
      <div className="absolute top-0 right-10 w-96 h-96 bg-purple-500/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Header section */}
      <div className="mb-10 pb-6 border-b border-white/[0.08] relative z-10">
        <h1 className="text-3xl font-black tracking-tight">My Profile & Settings</h1>
        <p className="text-slate-400 text-sm mt-1.5 leading-relaxed">Customize your learner card, view analytics metrics, and unlock achievement benchmarks.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start relative z-10">
        
        {/* Left Column: Account Info Card & Achievements (2/3 cols on desktop) */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          
          {/* Main User Card */}
          <div className="p-6 md:p-8 rounded-[24px] bg-white/[0.02] border border-white/[0.06] shadow-md flex flex-col sm:flex-row items-center gap-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-blue-500/10 to-purple-500/10 blur-2xl rounded-full" />
            
            {/* Avatar Circle */}
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-2xl font-black text-white shrink-0 shadow-lg shadow-blue-500/20">
              {profileData.name.charAt(0)}
            </div>

            <div className="text-center sm:text-left flex-1 space-y-1">
              <h2 className="text-xl font-bold text-white">{profileData.name}</h2>
              <div className="text-xs text-slate-400 flex items-center justify-center sm:justify-start gap-1.5">
                <Mail className="w-3.5 h-3.5 shrink-0" /> {profileData.email}
              </div>
              <div className="text-xs text-slate-400 flex items-center justify-center sm:justify-start gap-1.5">
                <Sliders className="w-3.5 h-3.5 shrink-0" /> {profileData.role}
              </div>
            </div>

            {/* Streak Metrics Badge 
            <div className="shrink-0 p-4 rounded-2xl bg-orange-500/10 border border-orange-500/20 flex items-center gap-3">
              <Flame className="w-6 h-6 text-orange-400 animate-bounce" />
              <div>
                <div className="text-[10px] font-bold text-orange-400 uppercase tracking-wide">Daily Streak</div>
                <div className="text-base font-bold text-white mt-0.5">5 Learning Days</div>
              </div>
            </div>
            */}
          </div>
          
{/*
          
          <div className="p-6 md:p-8 rounded-[24px] bg-white/[0.02] border border-white/[0.06] shadow-md">
            <h3 className="text-sm font-bold tracking-wider text-slate-500 uppercase mb-6">Learning Achievements</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {ACHIEVEMENTS.map((a) => {
                const Icon = a.icon;
                return (
                  <div 
                    key={a.id}
                    className={`p-4 rounded-2xl border flex items-start gap-4 transition-all duration-300 ${
                      a.unlocked 
                        ? 'bg-white/[0.02] border-white/[0.08] hover:border-white/15' 
                        : 'bg-white/[0.005] border-white/[0.04] opacity-50'
                    }`}
                  >
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center border shrink-0 ${a.color}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white flex items-center gap-1.5">
                        {a.title}
                        {a.unlocked && <Check className="w-3 h-3 text-green-400" />}
                      </div>
                      <div className="text-[10px] text-slate-400 mt-1 leading-snug">{a.desc}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
*/}
        </div>

        {/* Right Column: Settings configuration (1/3 col on desktop) */}
        <div className="lg:col-span-1 flex flex-col gap-6">
          
          {/* User Settings Forms */}
          <div className="p-6 rounded-[24px] bg-white/[0.02] border border-white/[0.06] shadow-md flex flex-col gap-5">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold tracking-wider text-slate-500 uppercase">Profile Settings</h3>
              {autosaveMsg && (
                <span className="text-[10px] font-bold text-green-400">{autosaveMsg}</span>
              )}
            </div>

            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold tracking-wider text-slate-400 uppercase">Learner Name</label>
                <input 
                  type="text"
                  value={profileData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:ring-2 focus:ring-purple-500/40 focus:border-purple-500 transition-all"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold tracking-wider text-slate-400 uppercase">Target Learning Title</label>
                <input 
                  type="text"
                  value={profileData.role}
                  onChange={(e) => handleInputChange("role", e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:ring-2 focus:ring-purple-500/40 focus:border-purple-500 transition-all"
                />
              </div>
            </div>
          </div>

          {/* Quick Learning Stats Sidebar details *
          <div className="p-6 rounded-[24px] bg-white/[0.02] border border-white/[0.06] shadow-md">
            <h3 className="text-xs font-bold tracking-wider text-slate-500 uppercase mb-4">Metric Insights</h3>
            
            <div className="space-y-3.5 text-xs text-slate-300">
              <div className="flex justify-between items-center pb-2.5 border-b border-white/5">
                <span className="flex items-center gap-1.5 text-slate-400"><Clock className="w-3.5 h-3.5 text-blue-400" /> Commited hours/wk</span>
                <span className="font-mono font-bold text-white">10 Hrs</span>
              </div>
              <div className="flex justify-between items-center pb-2.5 border-b border-white/5">
                <span className="flex items-center gap-1.5 text-slate-400"><BookOpen className="w-3.5 h-3.5 text-purple-400" /> Saved paths</span>
                <span className="font-mono font-bold text-white">2 Paths</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="flex items-center gap-1.5 text-slate-400"><Calendar className="w-3.5 h-3.5 text-cyan-400" /> Streak checkpoints</span>
                <span className="font-mono font-bold text-white">5 Milestones</span>
              </div>
            </div>
          </div>
            */}
        </div>

      </div>
    </div>
  );
};

export default Profile;
