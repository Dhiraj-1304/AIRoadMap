
import { motion } from 'framer-motion';
import { BrainCircuit, LogOut, Bell, Search, User } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const DashboardNavbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    navigate("/login");
  };

  const isActive = (path) => location.pathname === path;

  return (
    <motion.nav 
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="sticky top-0 z-50 glass-nav backdrop-blur-xl border-b border-white/[0.08]"
    >
      <div className="max-w-[1600px] mx-auto px-6 h-16 flex items-center justify-between gap-4">
        
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-3 group shrink-0">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
            <BrainCircuit className="w-4 h-4 text-white" />
          </div>
          <span className="text-base font-bold tracking-tight text-white hidden md:block">
            AI Roadmap
          </span>
        </Link>
        
        {/* Middle Section: Search placeholder (Stripe/Linear style) */}
        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-white/5 border border-white/10 rounded-xl max-w-xs w-full cursor-pointer hover:border-white/15 transition-all text-slate-500 hover:text-slate-400 group">
          <Search className="w-3.5 h-3.5" />
          <span className="text-xs">Search roadmaps...</span>
          <span className="text-[10px] bg-white/5 border border-white/10 px-1.5 py-0.5 rounded font-mono ml-auto group-hover:border-white/20 transition-all">⌘K</span>
        </div>

        {/* Navigation Links */}
        <div className="flex items-center gap-6 text-sm font-medium">
          <Link 
            to="/" 
            className={`transition-colors ${isActive("/") ? 'text-white' : 'text-slate-400 hover:text-white'}`}
          >
            Home
          </Link>
          <Link 
            to="/generate" 
            className={`transition-colors ${isActive("/generate") ? 'text-white' : 'text-slate-400 hover:text-white'}`}
          >
            Generator
          </Link>
          <Link 
            to="/myroadmap" 
            className={`transition-colors ${isActive("/myroadmap") ? 'text-white' : 'text-slate-400 hover:text-white'}`}
          >
            My Roadmaps
          </Link>
        </div>

        {/* Right Section: Notifications, Profile Link, Logout */}
        <div className="flex items-center gap-4 shrink-0">
          

          {/* User Profile avatar */}
          <button 
            onClick={() => navigate("/profile")}
            className={`p-2 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center transition-colors text-slate-400 hover:text-white ${isActive("/profile") ? 'border-purple-500/50 text-white' : ''}`}
            title="Profile & Settings"
          >
            <User className="w-4 h-4" />
          </button>

          {/* Logout */}
          <button 
            onClick={handleLogout}
            className="h-9 px-3.5 bg-white/5 hover:bg-red-500/10 border border-white/10 hover:border-red-500/30 rounded-xl flex items-center justify-center text-xs font-semibold text-slate-300 hover:text-red-400 transition-all gap-1.5"
          >
            <span>Log Out</span>
            <LogOut className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </motion.nav>
  );
};

export default DashboardNavbar;
