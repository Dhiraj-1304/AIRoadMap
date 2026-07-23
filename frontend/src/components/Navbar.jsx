import { motion } from 'framer-motion';
import { BrainCircuit, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <motion.nav 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 right-0 z-50 glass-nav backdrop-blur-md"
    >
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate("/")}>
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
            <BrainCircuit className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight text-white">
            AI <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">Roadmap</span>
          </span>
        </div>
        
        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
          <a href="#home" className="hover:text-white transition-colors">Home</a>
          <a href="#features" className="hover:text-white transition-colors">Features</a>
          <a href="#about" className="hover:text-white transition-colors">About</a>
        </div>

        {/* Action Buttons */}
        <div className="hidden md:flex items-center gap-4">
          <button 
            onClick={() => navigate("/login")} 
            className="text-sm font-medium text-slate-300 hover:text-white transition-colors py-2.5 px-5"
          >
            Login
          </button>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/register")} 
            className="bg-white/10 hover:bg-white/20 text-white px-5 py-2.5 rounded-xl text-sm font-medium transition-all border border-white/10 hover:border-white/20"
          >
            Get Started
          </motion.button>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-slate-300 hover:text-white transition-colors"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Panel */}
      {mobileMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-20 left-0 right-0 bg-[#020617]/95 border-b border-white/10 backdrop-blur-xl p-6 flex flex-col gap-5 md:hidden"
        >
          <a 
            href="#home" 
            onClick={() => setMobileMenuOpen(false)}
            className="text-slate-300 hover:text-white text-base font-medium py-1"
          >
            Home
          </a>
          <a 
            href="#features" 
            onClick={() => setMobileMenuOpen(false)}
            className="text-slate-300 hover:text-white text-base font-medium py-1"
          >
            Features
          </a>
          <a 
            href="#about" 
            onClick={() => setMobileMenuOpen(false)}
            className="text-slate-300 hover:text-white text-base font-medium py-1"
          >
            About
          </a>
          <div className="h-px bg-white/10 my-1" />
          <div className="flex flex-col gap-3">
            <button 
              onClick={() => { setMobileMenuOpen(false); navigate("/login"); }}
              className="text-center text-slate-300 hover:text-white text-base font-medium py-2.5 border border-white/5 rounded-xl"
            >
              Login
            </button>
            <button 
              onClick={() => { setMobileMenuOpen(false); navigate("/register"); }}
              className="text-center bg-gradient-to-r from-blue-500 to-purple-600 text-white text-base font-medium py-2.5 rounded-xl shadow-lg shadow-purple-500/20"
            >
              Get Started
            </button>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;
